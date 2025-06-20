import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { CarteiraService } from '../../services/carteira.service';
import { Stock } from '../../models/portfolio.model';

@Component({
  selector: 'app-graficos-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">Gráficos</h2>

      <div class="mb-4">
        <button class="btn btn-danger" (click)="limparCarteira()">Limpar Carteira</button>
        <h4 class="mt-3">Saldo: {{ saldo | currency:'EUR' }}</h4>
      </div>

      <canvas id="graficoDonut" width="400" height="400"></canvas>
      <canvas id="graficoLinha" width="600" height="300" class="mt-4"></canvas>
    </div>
  `
})
export class GraficosPageComponent {
  saldo: number = 0;

  constructor(private carteiraService: CarteiraService, private http: HttpClient) {}

  ngOnInit(): void {
    this.saldo = this.carteiraService.getSaldo();
    this.gerarGraficoDonut();
    this.gerarGraficoLinha();
  }

  limparCarteira(): void {
    localStorage.clear();
    location.reload();
  }

  gerarGraficoDonut(): void {
    this.carteiraService.getCarteira().subscribe((dados: Stock[]) => {
      const labels = dados.map(s => s.ticker);
      const valores = dados.map(s => s.precoCompra * s.quantidade);

      new Chart('graficoDonut', {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data: valores,
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    });
  }

  gerarGraficoLinha(): void {
    this.carteiraService.getCarteira().subscribe((dados: Stock[]) => {
      const labels = dados.map(s => s.ticker);
      const valores = dados.map(s => s.precoCompra);

      new Chart('graficoLinha', {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Preço de Compra',
            data: valores,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    });
  }
}
