import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteiraService } from '../../services/carteira.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements AfterViewInit {
  saldo: number = 0;
  carteiraTotal: number = 0;
  transacoesTotal: number = 0;
  variacaoTotal: number = 0;

  constructor(private carteiraService: CarteiraService) {}

  ngAfterViewInit() {
    this.carregarDashboard();
  }

  carregarDashboard() {
    this.saldo = this.carteiraService.getSaldo();
    this.transacoesTotal = this.carteiraService.getTransacoes().length;

    this.carteiraService.getCarteira().subscribe(acoes => {
      this.carteiraTotal = acoes.reduce((acc, a) => acc + (a.precoCompra * a.quantidade), 0);
      this.variacaoTotal = Math.random() * 10;

      const labels = acoes.map(a => a.ticker);
      const valores = acoes.map(a => a.precoCompra * a.quantidade);

      this.gerarGraficoBarra(labels, valores);
      this.gerarGraficoLinha();
      this.gerarGraficoPizza(labels, valores);
    });
  }

  gerarGraficoBarra(labels: string[], valores: number[]) {
    const ctx = (document.getElementById('graficoBarra') as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Valor Investido (€)',
            data: valores,
            backgroundColor: '#0d6efd'
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    }
  }

  gerarGraficoLinha() {
    const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const valores = Array.from({ length: 7 }, () => Math.floor(100000 + Math.random() * 20000));

    const ctx = (document.getElementById('graficoLinha') as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dias,
          datasets: [{
            label: 'Valor da Carteira (€)',
            data: valores,
            borderColor: '#198754',
            backgroundColor: 'rgba(25,135,84,0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  gerarGraficoPizza(labels: string[], valores: number[]) {
    const ctx = (document.getElementById('graficoPizza') as HTMLCanvasElement)?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: 'Distribuição (%)',
            data: valores,
            backgroundColor: ['#0d6efd', '#ffc107', '#dc3545', '#198754', '#6f42c1', '#20c997', '#6610f2']
          }]
        },
        options: { responsive: true }
      });
    }
  }
}
