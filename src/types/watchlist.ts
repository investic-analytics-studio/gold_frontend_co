import { TradingViewSymbol } from './tradingview';

export interface WatchlistItem {
  id: string;
  name: string;
  symbols: TradingViewSymbol[];
}

export interface CreateWatchlistInput {
  name: string;
  symbols: TradingViewSymbol[];
}

export interface UpdateWatchlistInput extends WatchlistItem {} 