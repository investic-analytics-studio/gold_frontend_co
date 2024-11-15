export interface TradingViewSymbol {
  symbol: string;
  description: string;
  exchange: string;
  type: string;
  currency_code: string;
  prefix: string;
  provider_id: string;
  source2: {
    id: string;
    name: string;
    description: string;
  };
  source_id: string;
  typespecs: string[];
}

export interface SearchResponse {
  data: {
    symbols: TradingViewSymbol[];
    symbols_remaining: number;
  };
}

export interface TradingViewSearchResponse {
  data: {
    symbols_remaining: number;
    symbols: TradingViewSymbol[];
  };
}
