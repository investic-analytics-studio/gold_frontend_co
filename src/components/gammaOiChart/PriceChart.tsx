import TradingViewChart from "@/components/TradingViewChart";
import { useGammaOi } from "@/hooks/useGammaOi";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface PriceChartProps {
  symbol?: string;
  exchange?: string;
  interval?: string;
}

const PriceChart: React.FC<PriceChartProps> = ({
  symbol = "XAUUSD",
  exchange = "OANDA",
  interval = "60"
}) => {
  const { currentPrice, loading, error } = useGammaOi(
    "2024-12",
    interval,
    symbol,
    exchange
  );

  if (loading) {
    return (
      <Card className="w-full h-auto bg-[#030816] border-none lg:rounded-[12px]">
        <CardContent className="flex items-center justify-center h-[400px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full h-auto bg-[#030816] border-none lg:rounded-[12px]">
        <CardContent className="flex items-center justify-center h-[400px] text-red-500">
          Error: {error.message}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-auto bg-[#030816] border-none lg:rounded-[12px]">
      <CardHeader className="mb-4">
        <CardTitle className="text-[#FAFAFA] text-[16px] font-medium">
          <div className="flex items-center justify-between">
            <div className="text-[#FAFAFA] text-[16px] font-medium">
              {symbol} Price Chart
            </div>
            <div className="text-primary text-[14px] font-normal border-none bg-primary/10 rounded-[6px] px-2 py-1">
              {symbol}: ${currentPrice.toFixed(2)}
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-[#A1A1AA] text-[14px]">
          Real-time price chart with technical analysis tools
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* TradingView Chart */}
        <div className="w-full bg-transparent p-0 rounded-xl mb-4">
          <TradingViewChart 
            symbol={symbol}
            interval={interval}
            exchange={exchange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
