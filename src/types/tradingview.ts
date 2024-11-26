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

export type ResolutionString =
  | '1'
  | '5'
  | '15'
  | '30'
  | '60'
  | '240'
  | '1D'
  | '1W'
  | '1M'
  | string;

export interface CustomIndicator {
  _context?: IndicatorContext;
  _input?: (name: string) => any;
  init: (context: IndicatorContext, input: (name: string) => any) => void;
  main: (context: IndicatorContext, input: (name: string) => any) => number[];
}

export interface IndicatorContext {
  new_var: (value: any) => any;
  select_sym: (symbol: string) => any;
  // Add any other methods provided by TradingView's PineJS context
}
