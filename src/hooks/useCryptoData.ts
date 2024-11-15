import { useQuery } from '@tanstack/react-query'
import { CryptoHistoricalDataMap, CryptoHistoricalDataResponse } from '../types/crypto'

export function useCryptoHistoricalData(symbol: string) {
  return useQuery<CryptoHistoricalDataMap>({
    queryKey: ['crypto', 'historical', symbol],
    queryFn: async () => {
      const response = await fetch(`/api/endpoint/${symbol}`)
      const data: CryptoHistoricalDataResponse = await response.json()
      return data.data || {} // Return empty object if no data
    }
  })
} 