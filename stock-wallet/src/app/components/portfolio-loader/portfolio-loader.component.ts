import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Stock, StockComCotacao } from '../../models/portfolio.model';
import { CarteiraService } from '../../services/carteira.service';
import { PortfolioTableComponent } from '../portfolio-table/portfolio-table.component';
import { AcoesFormComponent } from '../acoes-form/acoes-form.component';
import { HistoricoTransacoesComponent } from '../historico-transacoes/historico-transacoes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    PortfolioTableComponent,
    AcoesFormComponent,
    HistoricoTransacoesComponent,
  ],
  templateUrl: './portfolio-loader.component.html',
  styleUrls: ['./portfolio-loader.component.css'],
})
export class PortfolioLoaderComponent implements OnInit {
  carteira = signal<StockComCotacao[]>([]);
  saldo = signal<number>(0);

  constructor(private carteiraService: CarteiraService) {}

  ngOnInit(): void {
    // ✅ Atualiza o saldo imediatamente, mesmo antes da carteira
    this.saldo.set(this.carteiraService.getSaldo());
    this.atualizarCarteira();
  }

  atualizarCarteira(): void {
    this.carteiraService.getCarteira().subscribe((dados: Stock[]) => {
      const atualizada: StockComCotacao[] = dados.map((stock) => {
        const cotacaoAtual = stock.precoCompra * (0.9 + Math.random() * 0.2);
        const totalCompra = stock.precoCompra * stock.quantidade;
        const totalAtual = cotacaoAtual * stock.quantidade;
        const variacao = ((totalAtual - totalCompra) / totalCompra) * 100;
        const variacaoCor: 'green' | 'red' | 'black' =
          variacao > 0 ? 'green' : variacao < 0 ? 'red' : 'black';
        return {
          ...stock,
          cotacaoAtual: Number(cotacaoAtual.toFixed(2)),
          totalCompra: Number(totalCompra.toFixed(2)),
          totalAtual: Number(totalAtual.toFixed(2)),
          variacaoPercentual: Number(variacao.toFixed(2)),
          variacaoCor,
        };
      });

      // Mesmo que a carteira esteja vazia, atualiza o signal saldo:
      this.carteira.set(atualizada);
      this.saldo.set(this.carteiraService.getSaldo());
    });
  }

  atualizarCotacoesSimuladas(): void {
    const atualizada = this.carteira().map((stock) => {
      const cotacaoAtual = stock.precoCompra * (0.9 + Math.random() * 0.2);
      const totalAtual = cotacaoAtual * stock.quantidade;
      const variacao =
        ((totalAtual - stock.totalCompra) / stock.totalCompra) * 100;
      const variacaoCor: 'green' | 'red' | 'black' =
        variacao > 0 ? 'green' : variacao < 0 ? 'red' : 'black';

      return {
        ...stock,
        cotacaoAtual: Number(cotacaoAtual.toFixed(2)),
        totalAtual: Number(totalAtual.toFixed(2)),
        variacaoPercentual: Number(variacao.toFixed(2)),
        variacaoCor,
      };
    });

    this.carteira.set(atualizada);
  }
}
