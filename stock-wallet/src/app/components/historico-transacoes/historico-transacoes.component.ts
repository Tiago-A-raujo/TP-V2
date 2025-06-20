import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteiraService, Transacao } from '../../services/carteira.service';

@Component({
selector: 'app-historico-transacoes',
standalone: true,
imports: [CommonModule],
templateUrl: './historico-transacoes.component.html',
styleUrls: []
})
export class HistoricoTransacoesComponent {
transacoes: Transacao[] = [];

constructor(private carteiraService: CarteiraService) {
this.transacoes = this.carteiraService.getTransacoes();
}
}