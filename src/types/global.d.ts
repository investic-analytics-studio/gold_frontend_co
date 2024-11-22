import { widget } from './tradingview';

declare global {
  interface Window {
    TradingView: {
      widget: typeof widget;
    };
  }
} 