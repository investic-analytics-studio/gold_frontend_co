export interface RawDataPoint {
  title: string;
  text: { String: string; Valid: boolean };
  source_name: string;
  date: string;
  topics: string;
  sentiment: string;
  type: string;
  tickers: string;
  last_update: string;
  news_id: string;
  rank_score: number;
  positive_count: number;
  negative_count: number;
  net_sentiment: number;
  total_sentiments: number;
}

export interface ProcessedDataPoint {
  date: string;
  Positive: number;
  Negative: number;
  Neutral: number;
  Net: number;
  price: number;  // Add this field
  [key: string]: string | number;
}

export interface AnnotationLine {
  value: number;
  color: string;
}

export interface CryptoTicker {
  symbol: string;
  name: string;
}

export type TimeframeType = '1M' | '3M' | '6M' | '1Y' | '2Y' | 'ALL';

export interface TradingViewSymbol {
  symbol: string;
  exchange: string;
  source_id: string;
  description: string;
  type: string;
  currency_code: string;
  prefix: string;
  provider_id: string;
  typespecs: string[];
  source2: {
    name: string;
  };
}

export interface ExchangeOption {
  source_id: string;
  exchange: string;
  name: string;
}

export interface SearchResponse {
  data: {
    symbols: TradingViewSymbol[];
  };
}
