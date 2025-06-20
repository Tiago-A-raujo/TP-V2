import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark px-3">
      <a class="navbar-brand" routerLink="/">Stock Wallet</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" routerLink="/dashboard">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/carteira">Carteira</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/formulario">Negociação</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/transacoes">Histórico</a>
        </li>
      </ul>
    </nav>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
