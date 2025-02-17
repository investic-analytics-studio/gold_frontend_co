import { TradingViewSymbol } from "@/types/tradingview";

export const DEFAULT_SYMBOLS: TradingViewSymbol[] = [
  {
    symbol: "BTCUSDT",
    exchange: "BINANCE",
    source_id: "BINANCE",
    description: "Bitcoin USDT",
    type: "crypto",
    currency_code: "USDT",
    prefix: "BINANCE:",
    source2: {
      id: "BINANCE",
      name: "Binance",
      description: "Binance",
    },
    provider_id: "binance",
    typespecs: ["crypto"],
  },
  {
    symbol: "ETHUSDT",
    exchange: "BINANCE",
    source_id: "BINANCE",
    description: "Ethereum USDT",
    type: "crypto",
    currency_code: "USDT",
    prefix: "BINANCE:",
    source2: {
      id: "BINANCE",
      name: "Binance",
      description: "Binance",
    },
    provider_id: "binance",
    typespecs: ["crypto"],
  },
  {
    symbol: "SOLUSDT",
    exchange: "BINANCE",
    source_id: "BINANCE",
    description: "Solana USDT",
    type: "crypto",
    currency_code: "USDT",
    prefix: "BINANCE:",
    source2: {
      id: "BINANCE",
      name: "Binance",
      description: "Binance",
    },
    provider_id: "binance",
    typespecs: ["crypto"],
  },
  {
    symbol: "BNBUSDT",
    exchange: "BINANCE",
    source_id: "BINANCE",
    description: "BNB USDT",
    type: "crypto",
    currency_code: "USDT",
    prefix: "BINANCE:",
    source2: {
      id: "BINANCE",
      name: "Binance",
      description: "Binance",
    },
    provider_id: "binance",
    typespecs: ["crypto"],
  },
];

export const TIMEFRAME_OPTIONS = [
  { value: "1H", label: "1 H", interval: "1H" },
  { value: "4H", label: "4 H", interval: "4H" },
  { value: "1D", label: "1 D", interval: "1D" },
] as const;

export const ALL_EXCHANGES = "ALL_EXCHANGES";

export const FIFTEEN_MINUTES = 1000 * 60 * 15;

export const MESSENGER_URL = "https://m.me/gold.analytics";
