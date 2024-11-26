import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '../utils/api';

interface GammaAnalysis {
  price: number;
  spot_price: number;
  delta: number;
  created_at: string;
  trading_range: number;
  bullish_entry: number;
  bullish_sl: number;
  bullish_tp: number;
  bearish_entry: number;
  bearish_sl: number;
  bearish_tp: number;
  major_support_level: number;
  minor_support_level: number;
  major_resistance_level: number;
  minor_resistance_level: number;
}

const fetchGammaAnalysis = async () => {
  const response = await axios.get<GammaAnalysis[]>(getApiUrl('gamma-oi'));
  return response.data;
};

export const useGammaAnalysis = () => {
  return useQuery({
    queryKey: ['gamma-analysis'],
    queryFn: fetchGammaAnalysis,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

export type { GammaAnalysis }; 