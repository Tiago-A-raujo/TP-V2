import { Routes } from '@angular/router';
import { CarteiraPageComponent } from './pages/carteira/carteira-page.component';
import { FormularioPageComponent } from './pages/formulario/formulario-page.component';
import { TransacoesPageComponent } from './pages/transacoes/transacoes-page.component';
import { GraficosPageComponent } from './pages/graficos/graficos-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'carteira', pathMatch: 'full' },
  { path: 'carteira', component: CarteiraPageComponent },
  { path: 'formulario', component: FormularioPageComponent },
  { path: 'transacoes', component: TransacoesPageComponent },
  { path: 'graficos', component: GraficosPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },

];
