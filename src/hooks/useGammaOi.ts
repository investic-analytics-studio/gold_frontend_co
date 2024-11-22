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

const fetchHistoricalData = async (timeframe: string) => {
  const response = await axios.get<HistoricalDataTradingview>(
    getApiUrl(`tradingview/historical?symbol=XAUUSD&exchange=OANDA&interval=${timeframe}&bars=300`)
  );
  return response.data;
};

const fetchOiData = async () => {
  const response = await axios.get<OIData[]>(
    getApiUrl('investic-weighted-oi-graph')
  );
  return response.data;
};

export const useGammaOi = (selectedMonth: string, timeframe: string = "60"): UseGammaOiResult => {
  const {
    data: historicalData,
    isLoading: isHistoricalLoading,
    error: historicalError
  } = useQuery({
    queryKey: ['historical', timeframe],
    queryFn: () => fetchHistoricalData(timeframe),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    data: oiData,
    isLoading: isOiLoading,
    error: oiError
  } = useQuery({
    queryKey: ['oi-data', selectedMonth],
    queryFn: fetchOiData,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const currentPrice = historicalData?.data?.[historicalData.data.length - 1]?.close ?? 2000;

  const filteredOiData = oiData?.filter(item => item.month_year === selectedMonth) ?? [];

  const availableMonths = [...new Set(oiData?.map(item => item.month_year) ?? [])];

  return {
    oiData: filteredOiData,
    priceData: historicalData?.data ?? [],
    currentPrice,
    loading: isHistoricalLoading || isOiLoading,
    error: (historicalError || oiError) as Error | null,
    availableMonths,
  };
};

export type { OIData, PriceData }; 