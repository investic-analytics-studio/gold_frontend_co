// src/api/fetchHistoricalData.ts 
import axios from "axios";
import { TradingViewSymbol } from "@/types/tradingview";
import { getApiUrl } from "@/utils/api";

// Single symbol parameters interface
interface HistoricalDataParams {
  selectedSymbol: TradingViewSymbol | null;
  interval?: string;
  bars?: string | number;
  from?: string;
  to?: string;
}

// Multiple symbols parameters interface
interface MultiHistoricalDataParams {
  symbols: Array<TradingViewSymbol | null>;
  interval?: string;
  bars?: string | number;
  from?: string;
  to?: string;
}

// Single symbol fetch
export const fetchHistoricalData = async ({
  selectedSymbol,
  interval = "1D",
  bars = "365",
  from,
  to
}: HistoricalDataParams) => {
  const symbol = selectedSymbol?.symbol || "BTCUSDT";
  const sourceId = selectedSymbol?.source_id || "BINANCE";

  const params = new URLSearchParams({
    symbol: symbol,
    exchange: sourceId,
    interval: interval.toString(),
    bars: bars.toString()
  });

  if (from) params.append("from", from);
  if (to) params.append("to", to);
  
  const response = await axios.get(
    getApiUrl(`/api/v2/tradingview/historical?${params.toString()}`)
  );
  return response.data;
};

// Multiple symbols fetch
export const fetchMultiHistoricalData = async ({
  symbols,
  interval = "1D",
  bars = "365",
  from,
  to
}: MultiHistoricalDataParams) => {
  if (!symbols.length) return { data: {} };

  const symbolsData = symbols.map(symbol => ({
    symbol: symbol?.symbol || "BTCUSDT",
    exchange: symbol?.source_id || "BINANCE"
  }));

  const response = await axios.post(
    getApiUrl(`/api/v2/tradingview/historical/multi`),
    {
      symbols: symbolsData,
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
  return response.data;
};

// Batch fetch (useful for rate limiting)
export const fetchBatchHistoricalData = async ({
  symbols,
  interval = "1D",
  bars = "365",
  from,
  to,
  batchSize = 5, // Process 5 symbols at a time
  delayMs = 200  // 200ms delay between batches
}: MultiHistoricalDataParams & { batchSize?: number; delayMs?: number }) => {
  const results: { [key: string]: any } = {};
  
  for (let i = 0; i < symbols.length; i += batchSize) {
    const batch = symbols.slice(i, i + batchSize);
    
    // Process batch
    const batchResults = await fetchMultiHistoricalData({
      symbols: batch,
      interval,
      bars,
      from,
      to
    });

    // Merge results
    Object.assign(results, batchResults.data);

    // Add delay between batches (except for the last batch)
    if (i + batchSize < symbols.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return { data: results };
};
