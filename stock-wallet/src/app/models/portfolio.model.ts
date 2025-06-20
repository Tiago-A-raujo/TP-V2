export interface Stock {
  ticker: string;
  empresa: string;
  quantidade: number;
  precoCompra: number;
  dataCompra: string;
}

  export interface Cotacao {
    ticker: string;
    precoAtual: number;
    variacao: number;
  }

export interface StockComCotacao extends Stock {
  totalCompra: number;
  cotacaoAtual: number;
  totalAtual: number;
  variacaoPercentual: number;
  variacaoCor: 'red' | 'green' | 'black';
}

export interface Transacao {
  ticker: string;
  quantidade: number;
  preco: number;
  tipo: 'compra' | 'venda';
  data: string;
}

export interface CarteiraEstado {
  saldo: number;
  acoes: Stock[];
  transacoes: Transacao[];
}
