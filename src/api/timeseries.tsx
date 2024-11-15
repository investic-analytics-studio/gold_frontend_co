import { getApiUrl } from '@/utils/api';

export interface CryptoData {
    title: string;
    data: { name: string; value: number }[];
    trendPercentage: number;
    dateRange: string;
  }
  
  export const fetchCryptoData = async (): Promise<CryptoData[]> => {
    // This is a mock function. In a real application, you would fetch data from an API.
    return [
      {
        title: 'Lorem - Ipsum 1',
        data: [
          { name: 'Jan', value: 4000 },
          { name: 'Feb', value: 3000 },
          { name: 'Mar', value: 2000 },
          { name: 'Apr', value: 2780 },
          { name: 'May', value: 1890 },
          { name: 'Jun', value: 2390 },
        ],
        trendPercentage: 5.2,
        dateRange: 'January - June 2024',
      },
      // ... add more mock data for other charts
    ];
  };
  
  export const fetchCryptoStatsData = async (): Promise<any[]> => {
    // This is a mock function. Implement the actual data fetching logic here.
    return [
      {
        title: 'Crypto Stat 1',
        data: [
          { name: 'Jan', value: 1000 },
          { name: 'Feb', value: 1500 },
          { name: 'Mar', value: 1200 },
        ],
        winRate: 65,
        totalTrades: 100,
      },
      // ... add more mock data for other stats
    ];
  };
  
  export interface TimeseriesData {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  export const fetchCryptoTimeseriesData = async (
    ticker: string,
    timeframe: string,
    startDate: string
  ): Promise<TimeseriesData[]> => {
    const endDate = new Date().toISOString();
    const response = await fetch(
      getApiUrl(`/api/v2/timescale/crypto?ticker=${ticker}&tf=${timeframe}&start_date=${startDate}&end_date=${endDate}&all_pair=false`)
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    if (!data.success || !Array.isArray(data.result)) {
      throw new Error('Invalid data format');
    }
    
    return data.result.map((item: any) => ({
      time: new Date(item.time).toLocaleString(),
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
      volume: parseFloat(item.volume)
    }));
  };