import { getApiUrl } from "@/utils/api";
import axios from "axios";
import { TradingViewSymbol } from "@/types/tradingview";

interface HistoricalDataParams {
  symbols: {
    symbol: string;
    exchange: string;
  }[];
  interval?: string;
  bars?: string;
  from?: string;
  to?: string;
}

interface PriceData {
  datetime: string;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
}

export type { HistoricalDataParams, PriceData };

const PRIORITY_EXCHANGES = [
  {
    symbol: "BINANCE",
    exchange: "BINANCE",
    source_id: "BINANCE",
    source2: {
      id: "BINANCE",
      name: "Binance",
      description: "Binance",
    },
  },
  {
    symbol: "OKX",
    exchange: "OKX",
    source_id: "OKX",
    source2: {
      id: "OKX",
      name: "OKX",
      description: "OKX",
    },
  },
  {
    symbol: "BYBIT",
    exchange: "BYBIT",
    source_id: "BYBIT",
    source2: {
      id: "BYBIT",
      name: "Bybit",
      description: "Bybit",
    },
  },
 
  {
    symbol: "COINBASE",
    exchange: "COINBASE",
    source_id: "COINBASE",
    source2: {
      id: "COINBASE",
      name: "Coinbase",
      description: "Coinbase",
    },
  },
  {
    symbol: "UNISWAP",
    exchange: "UNISWAP",
    source_id: "UNISWAP",
    source2: {
      id: "UNISWAP",
      name: "Uniswap",
      description: "Uniswap",
    },
  },
  {
    symbol: "RAYDIUM",
    exchange: "RAYDIUM",
    source_id: "RAYDIUM",
    source2: {
      id: "RAYDIUM",
      name: "Raydium",
      description: "Raydium",
    },
  },
  {
    symbol: "UNISWAP3BASE",
    exchange: "UNISWAP3BASE",
    source_id: "UNISWAP3BASE",
    source2: {
      id: "UNISWAP3BASE",
      name: "Uniswap v3 (Base)",
      description: "Uniswap v3 (Base)",
    },
  },
  {
    symbol: "TRADERJOE",
    exchange: "TRADERJOE",
    source_id: "TRADERJOE",
    source2: {
      id: "TRADERJOE",
      name: "Trader Joe",
      description: "Trader Joe",
    },
  },
  {
    symbol: "UNISWAP3ETH",
    exchange: "UNISWAP3ETH",
    source_id: "UNISWAP3ETH",
    source2: {
      id: "UNISWAP3ETH",
      name: "Uniswap v3 (ETH)",
      description: "Uniswap v3 (ETH)",
    },
  },
  {
    symbol: "ORCA",
    exchange: "ORCA",
    source_id: "ORCA",
    source2: {
      id: "ORCA",
      name: "Orca",
      description: "Orca",
    },
  },
  {
    symbol: "MEXC",
    exchange: "MEXC",
    source_id: "MEXC",
    source2: {
      id: "MEXC",
      name: "MEXC",
      description: "MEXC",
    },
  },
  {
    symbol: "GATEIO",
    exchange: "GATEIO",
    source_id: "GATEIO",
    source2: {
      id: "GATEIO",
      name: "Gate.io",
      description: "Gate.io",
    },
  },
];

export const fetchMultiHistoricalData = async ({
  symbols,
  interval = "1D",
  bars = "30",
  from,
  to
}: HistoricalDataParams): Promise<Record<string, PriceData[]>> => {
  if (!symbols.length) return {};

  try {
    const response = await axios.post(
      getApiUrl(`/api/v2/tradingview/historical/multi`),
      {
        symbols,
        interval: interval.toString(),
        bars: bars.toString(),
        from,
        to
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data?.data || {};
  } catch (error) {
    console.error("Error fetching multi historical data:", error);
    return {};
  }
};

export const fetchMultiSymbolSearch = async (
  tokens: string[]
): Promise<Record<string, TradingViewSymbol>> => {
  try {
    const results: Record<string, TradingViewSymbol> = {};

    await Promise.all(
      tokens.map(async (token) => {
        try {
          // Add USDT suffix for better matching
          const searchTerm = `${token.toUpperCase()}USDT`;
          const response = await axios.get(
            getApiUrl(`/api/v2/tradingview/search?text=${searchTerm}&exchange=&start=0&limit=10`)
          );

          const symbols = response.data?.data?.symbols || [];
          
          // Find exact match first with priority exchanges
          for (const exchange of PRIORITY_EXCHANGES) {
            const exactMatch = symbols.find((s: TradingViewSymbol) => 
              s.source_id === exchange.source_id && 
              (s.symbol === searchTerm || s.symbol === `${token.toUpperCase()}USD`)
            );

            if (exactMatch) {
              results[token] = exactMatch;
              console.log(`Found exact match for ${token}:`, exactMatch);
              break;
            }
          }

          // If no exact match found, try fuzzy match
          if (!results[token] && symbols.length > 0) {
            const fuzzyMatch = symbols.find((s: TradingViewSymbol) => 
              s.symbol.startsWith(token.toUpperCase())
            );
            if (fuzzyMatch) {
              results[token] = fuzzyMatch;
              console.log(`Found fuzzy match for ${token}:`, fuzzyMatch);
            }
          }
        } catch (error) {
          console.error(`Failed to fetch ${token}`, error);
        }
      })
    );

    return results;
  } catch (error) {
    console.error("Error in fetchMultiSymbolSearch:", error);
    return {};
  }
};

// Normalize token based on search results
export const normalizeToken = (token: string): string => {
  // Remove common suffixes and convert to uppercase
  return token.replace(/USDT$|USD$|PERP$/, "").toUpperCase();
};

const multiHistoricalData = {
  fetchMultiHistoricalData,
  fetchMultiSymbolSearch,
};

export default multiHistoricalData; 