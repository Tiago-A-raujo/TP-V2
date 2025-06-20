import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComCotacao } from '../../models/portfolio.model';

@Component({
  selector: 'app-portfolio-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.css']
})
export class PortfolioTableComponent {
  @Input() carteira: StockComCotacao[] = [];

  get totalCompra() {
    return this.carteira.reduce((acc, s) => acc + s.totalCompra, 0);
  }

  get totalAtual() {
    return this.carteira.reduce((acc, s) => acc + s.totalAtual, 0);
  }

  get variacaoTotal() {
    return ((this.totalAtual - this.totalCompra) / this.totalCompra) * 100;
  }

  get corVariacaoTotal() {
    return this.variacaoTotal > 0 ? 'green' :
           this.variacaoTotal < 0 ? 'red' : 'black';
  }
}
