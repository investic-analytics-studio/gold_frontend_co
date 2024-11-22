// src/api/fetchHistoricalData.ts 
import axios from "axios";
import { TradingViewSymbol } from "@/types/tradingview";
import { getApiUrl } from "@/utils/api";

// Single symbol parameters interface
interface HistoricalDataParams {
  symbol: string;
  exchange: string;
  interval?: string;
  bars?: string | number;
  from?: string;
  to?: string;
}

interface HistoricalDataResponse {
  datetime: string;
  symbol: string;  // "OANDA:XAUUSD" format
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface MetaData {
  bars: number;
  count: number;
  exchange: string;
  interval: string;
  symbol: string;
}

interface ApiResponse {
  data: HistoricalDataResponse[];
  meta: MetaData;
}

// Single symbol fetch
export const fetchHistoricalData = async ({
  symbol,
  exchange,
  interval = "60",
  bars = "50",
  from,
  to
}: HistoricalDataParams): Promise<ApiResponse> => {
  const params = new URLSearchParams({
    symbol,
    exchange,
    interval: interval.toString(),
    bars: bars.toString()
  });

  if (from) params.append("from", from);
  if (to) params.append("to", to);
  
  try {
    // Using direct URL since getApiUrl might be causing issues
    const response = await axios.get<ApiResponse>(
      `http://localhost:8080/tradingview/historical?${params.toString()}`
    );
    
    if (!response.data) {
      throw new Error('No data received from API');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching historical data:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    } else {
      console.error("Error fetching historical data:", error);
    }
    // Return empty data with proper structure
    return {
      data: [],
      meta: {
        bars: 0,
        count: 0,
        exchange,
        interval,
        symbol
      }
    };
  }
};

// Multiple symbols fetch
export const fetchMultiHistoricalData = async (
  symbols: HistoricalDataParams[]
): Promise<Record<string, HistoricalDataResponse[]>> => {
  if (!symbols.length) return {};

  try {
    const results = await Promise.all(
      symbols.map(params => fetchHistoricalData(params))
    );

    return results.reduce((acc, result, index) => {
      const symbol = symbols[index].symbol;
      acc[symbol] = result.data;
      return acc;
    }, {} as Record<string, HistoricalDataResponse[]>);
  } catch (error) {
    console.error("Error fetching multi historical data:", error);
    return {};
  }
};

// Batch fetch with rate limiting
export const fetchBatchHistoricalData = async ({
  symbols,
  interval = "60",
  bars = "50",
  from,
  to,
  batchSize = 1, // Changed to 1 for XAUUSD case
  delayMs = 0    // No delay needed for single symbol
}: {
  symbols: { symbol: string; exchange: string }[];
  interval?: string;
  bars?: string | number;
  from?: string;
  to?: string;
  batchSize?: number;
  delayMs?: number;
}): Promise<{ data: Record<string, HistoricalDataResponse[]> }> => {
  const results: Record<string, HistoricalDataResponse[]> = {};
  
  try {
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      
      // Process batch
      const batchPromises = batch.map(({ symbol, exchange }) => 
        fetchHistoricalData({
          symbol,
          exchange,
          interval,
          bars,
          from,
          to
        })
      );

      const batchResults = await Promise.all(batchPromises);

      // Merge results
      batchResults.forEach((result, index) => {
        const symbol = batch[index].symbol;
        if (result.data && result.data.length > 0) {
          results[symbol] = result.data;
        }
      });

      // Add delay between batches (except for the last batch)
      if (i + batchSize < symbols.length && delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  } catch (error) {
    console.error("Error in batch historical data fetch:", error);
  }

  return { data: results };
};

export type { 
  HistoricalDataParams, 
  HistoricalDataResponse, 
  MetaData, 
  ApiResponse 
};
