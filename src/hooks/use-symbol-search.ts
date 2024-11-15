import { TradingViewSearchResponse } from "@/types/tradingview";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "./use-debounce";
import { getApiUrl } from "@/utils/api";

export function useSymbolSearch(searchValue: string, exchange?: string, initialPage = 0, itemsPerPage = 50) {
  const debouncedSearch = useDebounce(searchValue, 300);

  return useInfiniteQuery<TradingViewSearchResponse>({
    queryKey: ["symbolSearch", debouncedSearch, exchange],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("text", debouncedSearch);
      if (exchange) params.append("exchange", exchange);
      params.append("start", String((pageParam as number) * itemsPerPage));
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
    enabled: Boolean(debouncedSearch) || Boolean(exchange),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
