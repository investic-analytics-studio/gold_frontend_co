import { useState, useEffect } from 'react';
import { fetchBatchHistoricalData } from './fetchHistoricalData';

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
}

export const useGammaOi = (): UseGammaOiResult => {
  const [oiData, setOiData] = useState<OIData[]>([]);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch OI data
        const oiResponse = await fetch('http://localhost:8080/investic-weighted-oi-graph');
        const oiData = await oiResponse.json();
        setOiData(oiData);

        // Fetch XAUUSD price data using fetchBatchHistoricalData
        const priceResponse = await fetchBatchHistoricalData({
          symbols: [{
            symbol: 'XAUUSD',
            exchange: 'OANDA'
          }],
          interval: '60',
          bars: '50',
          batchSize: 1,  // Since we're only fetching one symbol
          delayMs: 0     // No delay needed for single symbol
        });

        const xauusdData = priceResponse.data['XAUUSD'] || [];
        setPriceData(xauusdData);

        // Set current price from the latest XAUUSD data
        if (xauusdData.length > 0) {
          const latestPrice = xauusdData[xauusdData.length - 1].close;
          setCurrentPrice(latestPrice);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();

    // Set up an interval to refresh the price data every minute
    const intervalId = setInterval(async () => {
      try {
        const priceResponse = await fetchBatchHistoricalData({
          symbols: [{
            symbol: 'XAUUSD',
            exchange: 'OANDA'
          }],
          interval: '60',
          bars: '1',  // Only get the latest bar for updates
          batchSize: 1,
          delayMs: 0
        });

        const xauusdData = priceResponse.data['XAUUSD'] || [];
        if (xauusdData.length > 0) {
          const latestPrice = xauusdData[xauusdData.length - 1].close;
          setCurrentPrice(latestPrice);
        }
      } catch (error) {
        console.error('Error updating price:', error);
      }
    }, 60000); // Update every minute

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return {
    oiData,
    priceData,
    currentPrice,
    loading,
    error
  };
};

export type { OIData, PriceData }; 