import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarteiraService } from '../../services/carteira.service';

@Component({
  selector: 'app-acoes-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acoes-form.component.html',
  styleUrls: ['./acoes-form.component.css'],
})
export class AcoesFormComponent {
  tipo: 'COMPRA' | 'VENDA' = 'COMPRA';
  ticker: string = '';
  empresa: string = '';
  quantidade: number = 0;
  preco: number = 0;
  mensagem: string = '';

  @Output() transacaoFinalizada = new EventEmitter<void>();

  constructor(private carteiraService: CarteiraService) {}

  executarTransacao(): void {
    if (
      !this.ticker ||
      this.quantidade <= 0 ||
      this.preco <= 0 ||
      (this.tipo === 'COMPRA' && !this.empresa)
    ) {
      this.mensagem = 'Preencha todos os campos corretamente';
      return;
    }

    const acao = {
      ticker: this.ticker.toUpperCase(),
      empresa: this.empresa,
      quantidade: this.quantidade,
      precoCompra: this.preco,
    };

    if (this.tipo === 'COMPRA') {
      this.mensagem = this.carteiraService.comprar(acao);
    } else {
      this.mensagem = this.carteiraService.vender(
        acao.ticker,
        acao.quantidade,
        acao.precoCompra
      );
    }

    this.transacaoFinalizada.emit();

    // Limpar formulário
    this.ticker = '';
    this.empresa = '';
    this.quantidade = 0;
    this.preco = 0;
  }
  atualizarPrecoPorTicker(): void {
    if (this.ticker.trim()) {
      const precoAtual = this.carteiraService.getCotacaoAtual(this.ticker);
this.carteiraService.getCotacaoAtual(this.ticker).subscribe(precoAtual => {
  this.preco = precoAtual;
});
    }
  }
}
