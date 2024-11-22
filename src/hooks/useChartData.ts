import { useState, useEffect } from 'react';

interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const useChartData = (symbol: string, interval: string) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `http://localhost:8080/tradingview/historical?symbol=${symbol}&exchange=OANDA&interval=${interval}&bars=1000`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.data || !Array.isArray(result.data)) {
          throw new Error('Invalid data format received');
        }

        const formattedData = result.data.map((bar: any) => ({
          time: new Date(bar.datetime).getTime(),
          open: parseFloat(bar.open),
          high: parseFloat(bar.high),
          low: parseFloat(bar.low),
          close: parseFloat(bar.close),
          volume: parseFloat(bar.volume)
        }));

        setData(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval]);

  return { data, error, isLoading };
}; 