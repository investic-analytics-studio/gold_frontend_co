import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../utils/api';

interface OIData {
  type: string;
  strike: number;
  month_year: string;
  atclose_weighted: number;
}

interface PriceData {
  datetime: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface UseGammaOiResult {
  oiData: OIData[];
  priceData: PriceData[];
  currentPrice: number;
  loading: boolean;
  error: Error | null;
  availableMonths: string[];
}

interface HistoricalDataTradingview {
  data: PriceData[];
  meta: {
    bars: number;
    count: number;
    exchange: string;
    interval: string;
    symbol: string;
  };
}

const fetchHistoricalData = async (symbol: string, timeframe: string, exchange: string) => {
  const response = await axios.get<HistoricalDataTradingview>(
    getApiUrl(`tradingview/historical?symbol=${symbol}&exchange=${exchange}&interval=${timeframe}&bars=200`)
  );
  return response.data;
};

const fetchOiData = async () => {
  const response = await axios.get<OIData[]>(
    getApiUrl('investic-weighted-oi-graph')
  );
  return response.data;
};

export function useAvailableMonths() {
  return useQuery({
    queryKey: ['available-months'],
    queryFn: async () => {
      const response = await axios.get<OIData[]>(
        getApiUrl('investic-weighted-oi-graph')
      );
      return [...new Set(response.data.map(item => item.month_year))];
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
export function getCurrentContract(){
  return useQuery({
    queryKey: ['oi-contract'],
    queryFn: async () => {
      const response = await axios.get<any>(
        getApiUrl('gold-oi-current-contract')
      );
      return response.data
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}
export const useGammaOi = (
  selectedMonth: string, 
  timeframe: string = "60", 
  symbol: string = "GC1!", 
  exchange: string = "COMEX"
): UseGammaOiResult => {
  const priceQuery = useQuery({
    queryKey: ['historical', timeframe],
    queryFn: () => fetchHistoricalData(symbol, timeframe, exchange),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const oiQuery = useQuery({
    queryKey: ['oi-data', selectedMonth],
    queryFn: fetchOiData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!selectedMonth,
    select: (data) => data.filter(item => item.month_year === selectedMonth),
  });

  const currentPrice = priceQuery.data?.data?.[priceQuery.data.data.length - 1]?.close ?? 2000;

  return {
    oiData: oiQuery.data ?? [],
    priceData: priceQuery.data?.data ?? [],
    currentPrice,
    loading: priceQuery.isLoading || oiQuery.isLoading,
    error: (priceQuery.error || oiQuery.error) as Error | null,
    availableMonths: [],
  };
};

export type { OIData, PriceData };

export function getCurrentGoldContractOption() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Gold futures months are: Feb(G), Apr(J), Jun(M), Aug(Q), Oct(V), Dec(Z)
  const futuresMonths = [
    { month: 1, code: 'G' },  // February
    { month: 3, code: 'J' },  // April
    { month: 5, code: 'M' },  // June
    { month: 7, code: 'Q' },  // August
    { month: 9, code: 'V' },  // October
    { month: 11, code: 'Z' }, // December
  ];

  // Find the next valid futures month
  let selectedMonth = futuresMonths.find(m => m.month > currentMonth);
  if (!selectedMonth) {
    selectedMonth = futuresMonths[0]; // If we're past December, use February of next year
  }

  // Format the year to two digits
  const yearCode = (selectedMonth.month > currentMonth ? currentYear : currentYear + 1)
    .toString()
    .slice(-2);

  return `GC${selectedMonth.code}${yearCode}`;
} 