import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getApiUrl } from '@/utils/api';

export interface SummaryData {
  date_time: string;
  response_summary: string;
  created_at: string;
  updated_at: string;
}

export const useCryptoSummary = () => {
  const queryParams = new URLSearchParams({
    start: '0',
    limit: '24',
    sort_by: 'date_time',
    sort_order: 'desc'
  });

  return useQuery({
    queryKey: ['crypto-summary'],
    queryFn: async () => {
      const response = await axios.get(
        getApiUrl(`/api/v2/twitter-crypto/tweets-summaries-1h?${queryParams.toString()}`)
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}; 