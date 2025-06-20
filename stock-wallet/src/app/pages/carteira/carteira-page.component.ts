import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioTableComponent } from '../../components/portfolio-table/portfolio-table.component';
import { CarteiraService } from '../../services/carteira.service';
import { signal } from '@angular/core';
import { StockComCotacao } from '../../models/portfolio.model';

@Component({
  selector: 'app-carteira-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PortfolioTableComponent],
  template: `
    <div class="container mt-4">
      <h2 class="mb-3">Carteira Atual</h2>
      <button class="btn btn-primary mb-3" (click)="atualizarCotacoes()">
        Atualizar Cotações
      </button>
      <div class="card shadow-sm">
        <div class="card-body">
          <app-portfolio-table [carteira]="carteira()"></app-portfolio-table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CarteiraPageComponent {
  carteira = signal<StockComCotacao[]>([]);

  constructor(private carteiraService: CarteiraService) {
    this.atualizarCarteira();
  }

  atualizarCarteira(): void {
    this.carteiraService.getCarteira().subscribe((dados) => {
      const atualizada: StockComCotacao[] = [];

      dados.forEach((stock) => {
        this.carteiraService.getCotacaoAtual(stock.ticker).subscribe((cotacaoAtual) => {
          const totalCompra = stock.precoCompra * stock.quantidade;
          const totalAtual = cotacaoAtual * stock.quantidade;
          const variacao = ((totalAtual - totalCompra) / totalCompra) * 100;
          const variacaoCor: 'green' | 'red' | 'black' =
            variacao > 0 ? 'green' : variacao < 0 ? 'red' : 'black';

          atualizada.push({
            ...stock,
            cotacaoAtual: Number(cotacaoAtual.toFixed(2)),
            totalCompra: Number(totalCompra.toFixed(2)),
            totalAtual: Number(totalAtual.toFixed(2)),
            variacaoPercentual: Number(variacao.toFixed(2)),
            variacaoCor
          });

          if (atualizada.length === dados.length) {
            this.carteira.set(atualizada);
          }
        });
      });
    });
  }

  atualizarCotacoes(): void {
    this.atualizarCarteira();
  }
}
