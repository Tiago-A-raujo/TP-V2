import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Stock } from '../models/portfolio.model';
import { StockApiService } from './stock-api.service';

export interface Transacao {
tipo: 'COMPRA' | 'VENDA';
ticker: string;
quantidade: number;
preco: number;
data: string;
}

@Injectable({ providedIn: 'root' })
export class CarteiraService {
private saldo = signal(100000);
private carteira: Stock[] = [];
private transacoes: Transacao[] = [];
private carteira$ = new BehaviorSubject<Stock[]>([]);

constructor(private stockApi: StockApiService) {
const carteiraSalva = localStorage.getItem('carteira');
const transacoesSalvas = localStorage.getItem('transacoes');
const saldoSalvo = localStorage.getItem('saldo');

if (carteiraSalva) {
  this.carteira = JSON.parse(carteiraSalva);
  this.carteira$.next(this.carteira);
}

if (transacoesSalvas) {
  this.transacoes = JSON.parse(transacoesSalvas);
}

if (saldoSalvo) {
  this.saldo.set(Number(saldoSalvo));
}
}

getCarteira(): Observable<Stock[]> {
return this.carteira$.asObservable();
}

getSaldo(): number {
return this.saldo();
}

getTransacoes(): Transacao[] {
return this.transacoes;
}

comprar(acao: Omit<Stock, 'dataCompra'>): string {
const total = acao.precoCompra * acao.quantidade;
if (total > this.saldo()) return 'Saldo insuficiente';

const existente = this.carteira.find((s) => s.ticker === acao.ticker);
const data = new Date().toISOString().substring(0, 10);

if (existente) {
  existente.quantidade += acao.quantidade;
  existente.precoCompra = (existente.precoCompra + acao.precoCompra) / 2;
} else {
  this.carteira.push({ ...acao, dataCompra: data });
}

this.transacoes.push({
  tipo: 'COMPRA',
  ...acao,
  preco: acao.precoCompra,
  data,
});

this.saldo.update((v) => v - total);
this.carteira$.next(this.carteira);
this.guardarEstado();
return 'Compra realizada com sucesso';
}

vender(ticker: string, quantidade: number, preco: number): string {
const existente = this.carteira.find((s) => s.ticker === ticker);
if (!existente || existente.quantidade < quantidade)
return 'Ação não disponível ou quantidade insuficiente';

const total = quantidade * preco;
existente.quantidade -= quantidade;
if (existente.quantidade === 0) {
  this.carteira = this.carteira.filter((s) => s.ticker !== ticker);
}

const data = new Date().toISOString().substring(0, 10);
this.transacoes.push({ tipo: 'VENDA', ticker, quantidade, preco, data });

this.saldo.update((v) => v + total);
this.carteira$.next(this.carteira);
this.guardarEstado();
return 'Venda realizada com sucesso';
}

getCotacaoAtual(ticker: string): Observable<number> {
return this.stockApi.obterCotacao(ticker).pipe(
map(cot => cot.precoAtual),
catchError(err => {
console.error("Erro ao obter cotação para ${ticker}:, err");
return of(0); // devolve 0 para não quebrar a carteira
})
);
}
limparCarteira(): void {
  this.carteira = [];
  this.transacoes = [];
  this.saldo.set(100000);
  this.carteira$.next(this.carteira);
  this.guardarEstado();
}

private guardarEstado(): void {
localStorage.setItem('carteira', JSON.stringify(this.carteira));
localStorage.setItem('transacoes', JSON.stringify(this.transacoes));
localStorage.setItem('saldo', String(this.saldo()));
}
}