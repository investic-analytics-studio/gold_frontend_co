import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { TradingViewSearchResponse } from "@/types/tradingview";
import { getApiUrl } from "@/utils/api";
interface MultiSymbolHistoricalParams {
  symbols: Array<{
    symbol: string;
    exchange: string;
  }>;
  interval: string;
  bars?: number;
  from?: string;
  to?: string;
}

interface HistoricalDataPoint {
  datetime: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface MultiSymbolResponse {
  data: {
    [key: string]: HistoricalDataPoint[];
  };
}

export function useMultiSymbolSearch(searchValue: string, exchange?: string, initialPage = 0, itemsPerPage = 50) {
  return useInfiniteQuery({
    queryKey: ["multiSymbolSearch", searchValue, exchange],
    queryFn: async ({ pageParam = initialPage }) => {
      const params = new URLSearchParams();
      if (searchValue) params.append("text", searchValue);
      if (exchange) params.append("exchange", exchange);
      params.append("start", String(pageParam * itemsPerPage));
      params.append("limit", String(itemsPerPage));
      
      const response = await axios.get<TradingViewSearchResponse>(
        getApiUrl(`/api/v2/tradingview/search?${params.toString()}`)  
      );
      return response.data;
    },
    initialPageParam: initialPage,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.symbols_remaining > 0) {
        return pages.length;
      }
      return undefined;
    },
  });
}

export function useMultiSymbolHistorical(
  symbols: MultiSymbolHistoricalParams["symbols"],
  interval: string = "1D",
  bars: number = 100,
  from?: string,
  to?: string
) {
  return useInfiniteQuery({
    queryKey: ["multiSymbolHistorical", symbols, interval, bars, from, to],
    queryFn: async () => {
      if (!symbols.length) return { data: {} };
      
      const response = await axios.post<MultiSymbolResponse>(
        getApiUrl(`/api/v2/tradingview/historical/multi`),
        {
          symbols,
          interval,
          bars: String(bars),
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
    },
    initialPageParam: 0,
    getNextPageParam: () => undefined,
    enabled: symbols.length > 0,
  });
} 