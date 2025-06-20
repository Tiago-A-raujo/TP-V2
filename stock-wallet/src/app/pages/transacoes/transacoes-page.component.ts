import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarteiraService, Transacao } from '../../services/carteira.service';

@Component({
  selector: 'app-transacoes-page',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  template: `
    <h2>Histórico de Transações</h2>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>Data</th>
          <th>Tipo</th>
          <th>Ticker</th>
          <th>Quantidade</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let t of transacoes">
          <td>{{ t.data }}</td>
          <td>{{ t.tipo }}</td>
          <td>{{ t.ticker }}</td>
          <td>{{ t.quantidade }}</td>
          <td>{{ t.preco | number: '1.2-2' }} €</td>
        </tr>
      </tbody>
    </table>
  `
})
export class TransacoesPageComponent {
  transacoes: Transacao[] = [];

  constructor(private carteiraService: CarteiraService) {
    this.transacoes = this.carteiraService.getTransacoes();
  }
}
