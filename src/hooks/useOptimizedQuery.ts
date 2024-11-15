import { useQuery, QueryKey, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

export function useOptimizedQuery<TData>(
  key: QueryKey,
  fetchFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData> {
  const [localData, setLocalData] = useState<TData | undefined>(undefined);

  useEffect(() => {
    const cachedData = localStorage.getItem(JSON.stringify(key));
    if (cachedData) {
      setLocalData(JSON.parse(cachedData));
    }
  }, [key]);

  const query = useQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      const data = await fetchFn();
      localStorage.setItem(JSON.stringify(key), JSON.stringify(data));
      return data;
    },
    ...options,
    enabled: localData === undefined,
    staleTime: Infinity,
  });

  return {
    ...query,
    data: localData !== undefined ? localData : query.data,
    isLoading: localData === undefined && query.isLoading,
  } as UseQueryResult<TData>;
}
