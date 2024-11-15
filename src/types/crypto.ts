export interface CryptoHistoricalData {
  datetime: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CryptoHistoricalDataMap {
  [symbol: string]: CryptoHistoricalData[];
}

export interface CryptoHistoricalDataResponse {
  data: CryptoHistoricalDataMap;
} 