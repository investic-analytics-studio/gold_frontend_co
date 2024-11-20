import { ChartArea } from "lucide-react";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  Brush,
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useGammaOi } from "@/hooks/useGammaOi";
import TradingViewChart from '@/components/TradingViewChart';

const GammaOiPage: React.FC = () => {
  const { oiData: data, priceData, currentPrice, loading, error } = useGammaOi();

  // Process data for side-by-side bars
  const processedData = useMemo(() => {
    const combinedData = data.reduce((acc, item) => {
      const existingItem = acc.find(i => i.strike === item.strike);
      if (existingItem) {
        existingItem[item.type.toLowerCase()] = item.atclose_weighted;
      } else {
        acc.push({
          strike: item.strike,
          calls: item.type === 'Calls' ? item.atclose_weighted : 0,
          puts: item.type === 'Puts' ? item.atclose_weighted : 0,
        });
      }
      return acc;
    }, [] as any[]).sort((a, b) => a.strike - b.strike);

    return combinedData.map((item, index) => ({ ...item, index }));
  }, [data]);

  const brushDomain = useMemo(() => {
    const currentPriceIndex = processedData.findIndex(d => d.strike >= currentPrice);
    const lowerBound = Math.max(0, currentPriceIndex - 20);
    const upperBound = Math.min(processedData.length - 1, currentPriceIndex + 20);
    return [lowerBound, upperBound];
  }, [processedData, currentPrice]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const strikePrice = processedData[label].strike;
      return (
        <div className="custom-tooltip bg-gray-800 p-4 border border-gray-600 rounded shadow-lg text-gray-200">
          <p className="label font-bold">{`Strike: $${strikePrice.toFixed(2)}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className="w-full h-auto bg-[#030816] border border-[#20293A] lg:rounded-[12px]">
        <CardContent className="flex items-center justify-center h-[400px]">
          Loading...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full h-auto bg-[#030816] border border-[#20293A] lg:rounded-[12px]">
        <CardContent className="flex items-center justify-center h-[400px] text-red-500">
          Error: {error.message}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-auto bg-[#030816] border border-[#20293A] lg:rounded-[12px]">
      <div className="border-b border-[#20293A] p-3 pl-4 pr-2 text-[13px] text-[#A1A1AA] flex items-center justify-between h-[50px]">
        <div className="flex items-center gap-2">
          <ChartArea className="size-4" />
          <div>Gamma OI</div>
        </div>
        <div className="text-[#FAFAFA] font-medium">
          XAUUSD: ${currentPrice.toFixed(2)}
        </div>
      </div>
      
      <CardHeader className="mb-4">
        <CardTitle className="text-[#FAFAFA] text-[16px] font-medium">
          XAUUSD Price Chart
        </CardTitle>
        <CardDescription className="text-[#A1A1AA] text-[14px]">
          Real-time price chart with technical analysis tools
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* TradingView Chart */}
        <div className="w-full bg-[#030816] p-4 rounded-xl mb-4">
          <TradingViewChart 
            symbol="XAUUSD"
            interval="60"
          />
        </div>

      

        {/* OI Distribution Chart */}
        <div className="w-full h-[600px] bg-[#030816] p-4 rounded-xl">
          <CardTitle className="text-[#FAFAFA] text-[16px] font-medium mb-4">
            Options Open Interest Distribution
          </CardTitle>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={processedData}
              margin={{ top: 40, right: 30, bottom: 60, left: 20 }}
            >
              <XAxis
                dataKey="index"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(index) => processedData[index]?.strike.toFixed(0)}
                stroke="#888"
                tick={{ fill: '#888' }}
              />
              <YAxis
                tickFormatter={(value) => value.toLocaleString()}
                stroke="#888"
                tick={{ fill: '#888' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <ReferenceLine
                x={processedData.findIndex(d => d.strike >= currentPrice)}
                stroke="#FF6B6B"
                strokeDasharray="3 3"
              >
                <Label
                  value={`Current Price: $${currentPrice.toFixed(2)}`}
                  position="top"
                  fill="#FF6B6B"
                  fontSize={12}
                  offset={20}
                />
              </ReferenceLine>
              <Bar dataKey="calls" name="Calls" fill="#A78BFA" radius={[4, 4, 0, 0]} />
              <Bar dataKey="puts" name="Puts" fill="#34D399" radius={[4, 4, 0, 0]} />
              <Brush
                dataKey="index"
                height={30}
                tickFormatter={(index: number) => processedData[index]?.strike.toFixed(0)}
                startIndex={brushDomain[0]}
                endIndex={brushDomain[1]}
                fill="#1F2937"
                stroke="#4B5563"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GammaOiPage;
