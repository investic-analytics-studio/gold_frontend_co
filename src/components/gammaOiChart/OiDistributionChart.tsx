import { useGammaOi } from "@/hooks/useGammaOi";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Label,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

const OiDistributionChart: React.FC = () => {
  const {
    oiData: data,
    currentPrice,
    loading,
    error,
  } = useGammaOi();

  // Process data for side-by-side bars
  const processedData = useMemo(() => {
    const combinedData = data
      .reduce((acc, item) => {
        const existingItem = acc.find((i) => i.strike === item.strike);
        if (existingItem) {
          existingItem[item.type.toLowerCase()] = item.atclose_weighted;
        } else {
          acc.push({
            strike: item.strike,
            calls: item.type === "Calls" ? item.atclose_weighted : 0,
            puts: item.type === "Puts" ? item.atclose_weighted : 0,
          });
        }
        return acc;
      }, [] as any[])
      .sort((a, b) => a.strike - b.strike);

    return combinedData.map((item, index) => ({ ...item, index }));
  }, [data]);

  const brushDomain = useMemo(() => {
    const currentPriceIndex = processedData.findIndex(
      (d) => d.strike >= currentPrice
    );
    const lowerBound = Math.max(0, currentPriceIndex - 20);
    const upperBound = Math.min(
      processedData.length - 1,
      currentPriceIndex + 20
    );
    return [lowerBound, upperBound];
  }, [processedData, currentPrice]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const strikePrice = processedData[label].strike;
      return (
        <div className="custom-tooltip bg-gray-800 p-4 border border-gray-600 rounded shadow-lg text-gray-200">
          <p className="label font-bold">{`Strike: $${strikePrice.toFixed(
            2
          )}`}</p>
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
    <div className="pt-10">
      <Card className="w-full h-auto bg-[#030816] border-none lg:rounded-[12px]">
        <CardContent>
          {/* OI Distribution Chart */}
          <div className="w-full h-[600px] bg-[#030816] p-4 rounded-xl">
            <CardTitle className="text-[#FAFAFA] text-[16px] font-medium mb-4">
              Options Open Interest Distribution
            </CardTitle>
            <CardDescription className="text-[#A1A1AA] text-[14px]">
              Real-time price chart with technical analysis tools
            </CardDescription>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={processedData}
                margin={{ top: 40, right: 30, bottom: 60, left: 20 }}
              >
                <CartesianGrid stroke="#121623" horizontal={true} vertical={false} />
                <XAxis
                  dataKey="index"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  tickFormatter={(index) =>
                    processedData[index]?.strike.toFixed(0)
                  }
                  stroke="#20293A"
                  tick={{ fill: "#A1A1AA" }}
                />
                <YAxis
                  tickFormatter={(value) => value.toLocaleString()}
                  stroke="#121623"
                  tick={{ fill: "#A1A1AA" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <ReferenceLine
                  x={processedData.findIndex((d) => d.strike >= currentPrice)}
                  stroke="#F23645"
                  strokeDasharray="3 3"
                >
                  <Label
                    value={`Current Price: $${currentPrice.toFixed(2)}`}
                    position="top"
                    fill="#F23645"
                    fontSize={12}
                    offset={20}
                  />
                </ReferenceLine>
                <Bar
                  dataKey="calls"
                  name="Calls"
                  fill="#2662D9"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="puts"
                  name="Puts"
                  fill="#089981"
                  radius={[2, 2, 0, 0]}
                />
                <Brush
                  dataKey="index"
                  height={30}
                  tickFormatter={(index: number) =>
                    processedData[index]?.strike.toFixed(0)
                  }
                  startIndex={brushDomain[0]}
                  endIndex={brushDomain[1]}
                  fill="#040B1C"
                  stroke="#20293A"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OiDistributionChart;
