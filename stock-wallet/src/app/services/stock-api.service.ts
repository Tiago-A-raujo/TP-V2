import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cotacao } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {
  private readonly apiKey = '735329dc21fe7aa613bc8459882c4891';
  private readonly baseUrl = 'http://api.marketstack.com/v1';

  constructor(private http: HttpClient) {}

  obterCotacao(ticker: string): Observable<Cotacao> {
    const url = `${this.baseUrl}/eod/latest?access_key=${this.apiKey}&symbols=${ticker}`;
    return this.http.get<any>(url).pipe(
      map(res => ({
        ticker,
        precoAtual: res.data[0].close,
        variacao: res.data[0].change_percent
      }))
    );
  }
}
