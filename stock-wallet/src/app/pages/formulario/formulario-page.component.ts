import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AcoesFormComponent } from '../../components/acoes-form/acoes-form.component';

@Component({
  selector: 'app-formulario-page',
  standalone: true,
  imports: [CommonModule, AcoesFormComponent, HttpClientModule],
  template: `
    <h2>Comprar ou Vender Ações</h2>
    <app-acoes-form (transacaoFinalizada)="refrescar()"></app-acoes-form>
  `
})
export class FormularioPageComponent {
  refrescar() {
    // pode ser usado para emitir evento ou atualizar outras partes no futuro
  }
}
