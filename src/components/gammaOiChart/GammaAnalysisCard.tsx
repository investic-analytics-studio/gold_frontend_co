import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp as StockUpIcon, TrendingDown as StockDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { getCurrentGoldContractOption } from "@/hooks/useGammaOi";

interface GammaAnalysis {
    price: number;
    spot_price: number;
    delta: number;
    created_at: string;
    trading_range: number;
    bullish_entry: number;
    bullish_sl: number;
    bullish_tp: number;
    bearish_entry: number;
    bearish_sl: number;
    bearish_tp: number;
    major_support_level: number;
    minor_support_level: number;
    major_resistance_level: number;
    minor_resistance_level: number;
}

interface PriceData {
  datetime: string;
  price: number;
}

interface GammaAnalysisCardProps {
  gammaAnalysis: GammaAnalysis[];
  priceData: PriceData[];
  currentPrice: number;
}

// Add this helper function at the top of the file, outside the component
function formatChartData(priceData: PriceData[]) {
  return priceData.map(item => ({
    timestamp: new Date(item.datetime).getTime(),
    price: item.price,
    datetime: item.datetime
  }));
}

// Add this type for position visibility
interface PositionVisibility {
  bullish: boolean;
  bearish: boolean;
}

// Update the filterDataFromTimestamp function
function filterDataFromTimestamp(data: any[], timestamp: string) {
  const selectedTime = new Date(timestamp).getTime();
  const selectedIndex = data.findIndex(item => 
    new Date(item.datetime).getTime() >= selectedTime
  );
  
  if (selectedIndex === -1) return data;
  
  // Always show 20 previous points
  const startIndex = Math.max(0, selectedIndex - 20);
  
  return data.slice(startIndex);
}

// Add this custom dot component at the top of the file
const CustomDot = ({ cx, cy, payload, selectedDataPoint }: any) => {
  const isSelected = payload.timestamp === new Date(selectedDataPoint).getTime();
  
  if (!isSelected) {
    return (
      <svg x={cx - 2} y={cy - 2} width={4} height={4} viewBox="0 0 4 4">
        <circle
          cx="2"
          cy="2"
          r="2"
          fill="#2563EB"
          opacity={0.5}
        />
      </svg>
    );
  }

  return (
    <svg x={cx - 6} y={cy - 6} width={12} height={12} viewBox="0 0 12 12">
      <circle
        cx="6"
        cy="6"
        r="5"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
    </svg>
  );
};

const GammaAnalysisCard: React.FC<GammaAnalysisCardProps> = ({ 
  gammaAnalysis: data,
  priceData ,
  currentPrice,
}) => {
  const [tradingRange, setTradingRange] = useState(10);
  const [selectedDataPoint, setSelectedDataPoint] = useState<string>("");
  const [showPositionsSelected, setShowPositionsSelected] = useState<PositionVisibility>({
    bullish: false,
    bearish: false
  });

  // Filter data based on trading range
  const filteredData = useMemo(() => {
    console.log(priceData);
    return data.filter(item => item.trading_range === tradingRange);
  }, [data, tradingRange]);

  // Get the analysis point to display (either selected or latest)
  const displayedAnalysis = useMemo(() => {
    if (selectedDataPoint) {
      return filteredData.find(item => item.created_at === selectedDataPoint) || filteredData[0];
    }
    return filteredData[0];
  }, [filteredData, selectedDataPoint]);

  // Set initial selected point when data changes
  useEffect(() => {
    if (filteredData.length > 0 && !selectedDataPoint) {
      setSelectedDataPoint(filteredData[0].created_at);
    }
  }, [filteredData]);

  // Add this before the return statement
  const formattedPriceData = useMemo(() => formatChartData(priceData), [priceData]);

  // Add these helper functions
  const toggleBullishPosition = () => {
    setShowPositionsSelected(prev => ({
      ...prev,
      bullish: !prev.bullish
    }));
  };

  const toggleBearishPosition = () => {
    setShowPositionsSelected(prev => ({
      ...prev,
      bearish: !prev.bearish
    }));
  };

  // Update the filteredChartData calculation
  const filteredChartData = useMemo(() => {
    if (!selectedDataPoint || !formattedPriceData.length) return formattedPriceData;
    return filterDataFromTimestamp(formattedPriceData, selectedDataPoint);
  }, [formattedPriceData, selectedDataPoint]);

  // Inside the GammaAnalysisCard component, add this function to calculate the domain
  const calculateYAxisDomain = (data: any[], analysis: GammaAnalysis | undefined) => {
    if (!data.length || !analysis) return ['auto', 'auto'];
    
    // Get min/max from price data
    let minPrice = Math.min(...data.map(d => d.price));
    let maxPrice = Math.max(...data.map(d => d.price));
    
    // Consider stop losses and take profits
    if (analysis) {
      const levels = [
        analysis.bullish_sl,
        analysis.bullish_tp,
        analysis.bearish_sl,
        analysis.bearish_tp,
        analysis.major_support_level,
        analysis.major_resistance_level,
        analysis.minor_support_level,
        analysis.minor_resistance_level
      ];
      
      minPrice = Math.min(minPrice, ...levels);
      maxPrice = Math.max(maxPrice, ...levels);
    }
    
    // Add some padding (5%)
    const padding = (maxPrice - minPrice) * 0.05;
    return [minPrice - padding, maxPrice + padding];
  };

  const currentContract = useMemo(() => getCurrentGoldContractOption(), []);

  return (
    <div className="space-y-4">
      {/* Latest Analysis Summary */}
      <Card className="bg-[#030816] border-[#20293A] hover:bg-[#0A1122] transition-colors">
        <CardHeader>
          <CardTitle className="text-[#FAFAFA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Current Analysis - {currentContract}
            </div>
            <div className="flex items-center gap-4">
              {/* Time Selection Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#A1A1AA]">Time:</span>
                <Select 
                  value={selectedDataPoint} 
                  onValueChange={setSelectedDataPoint}
                >
                  <SelectTrigger className="w-[200px] bg-[#0A1122] border-[#20293A]">
                    <SelectValue>
                      {selectedDataPoint ? 
                        format(new Date(selectedDataPoint), 'HH:mm:ss dd/MM') : 
                        'Select time'
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {filteredData.map((item) => (
                      <SelectItem 
                        key={item.created_at} 
                        value={item.created_at}
                        className="text-sm"
                      >
                        {format(new Date(item.created_at), 'HH:mm:ss dd/MM')} - ${item.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Trading Range Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#A1A1AA]">Trading Range:</span>
                <div className="flex gap-1">
                  <Button
                    variant={tradingRange === 10 ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setTradingRange(10);
                      setSelectedDataPoint(""); // Reset selection when changing range
                    }}
                    className={`px-3 py-1 ${
                      tradingRange === 10 
                        ? 'bg-[#2563EB] text-white' 
                        : 'bg-transparent text-[#A1A1AA] border-[#20293A] hover:bg-[#0A1122]'
                    }`}
                  >
                    10
                  </Button>
                  <Button
                    variant={tradingRange === 20 ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setTradingRange(20);
                      setSelectedDataPoint(""); // Reset selection when changing range
                    }}
                    className={`px-3 py-1 ${
                      tradingRange === 20 
                        ? 'bg-[#2563EB] text-white' 
                        : 'bg-transparent text-[#A1A1AA] border-[#20293A] hover:bg-[#0A1122]'
                    }`}
                  >
                    20
                  </Button>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Section */}
          <div className="space-y-3 p-4 rounded-lg bg-[#0A1122] border border-[#20293A]">
            <p className="text-[#A1A1AA] font-medium">Price Analysis</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-[#FAFAFA]">
                ${displayedAnalysis?.price.toFixed(2)}
              </p>
            </div>
            <Badge className="text-md text-[#FAFAFA]">
              trading range: {tradingRange}
            </Badge>
            <div className="flex gap-2 flex-wrap">
              {displayedAnalysis?.delta !== undefined && (
                <Badge 
                  variant={displayedAnalysis.delta > 0 ? "default" : "destructive"}
                  className="text-sm"
                >
                  Delta: {displayedAnalysis.delta.toFixed(2)}
                </Badge>
              )}
            </div>
            <div className="space-y-2 pt-2 border-t border-[#20293A]">
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Major Support</span>
                <span className="text-sm font-medium">${displayedAnalysis?.major_support_level.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Major Resistance</span>
                <span className="text-sm font-medium">${displayedAnalysis?.major_resistance_level.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Minor Support</span>
                <span className="text-sm font-medium">${displayedAnalysis?.minor_support_level.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Minor Resistance</span>
                <span className="text-sm font-medium">${displayedAnalysis?.minor_resistance_level.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Bullish Scenario */}
          <div className="space-y-3 p-4 rounded-lg bg-[#0A1122] border border-[#20293A]">
            <div className="flex justify-between items-center">
              <p className="text-[#A1A1AA] font-medium flex items-center gap-2">
                <span className="text-green-500"><StockUpIcon /></span> Bullish Scenario
              </p>
              <Button
                variant={showPositionsSelected.bullish ? "default" : "outline"}
                size="sm"
                onClick={toggleBullishPosition}
                className={`px-3 py-1 ${
                  showPositionsSelected.bullish 
                    ? 'bg-green-500 text-white' 
                    : 'bg-transparent text-[#A1A1AA] border-[#20293A]'
                }`}
              >
                Show Long
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Entry</span>
                <span className="text-sm font-medium">${displayedAnalysis?.bullish_entry.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Target</span>
                <span className="text-sm font-medium text-green-500">${displayedAnalysis?.bullish_tp.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Stop Loss</span>
                <span className="text-sm font-medium text-red-500">${displayedAnalysis?.bullish_sl.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Bearish Scenario */}
          <div className="space-y-3 p-4 rounded-lg bg-[#0A1122] border border-[#20293A]">
            <div className="flex justify-between items-center">
              <p className="text-[#A1A1AA] font-medium flex items-center gap-2">
                <span className="text-red-500"><StockDownIcon /></span> Bearish Scenario
              </p>
              <Button
                variant={showPositionsSelected.bearish ? "default" : "outline"}
                size="sm"
                onClick={toggleBearishPosition}
                className={`px-3 py-1 ${
                  showPositionsSelected.bearish 
                    ? 'bg-red-500 text-white' 
                    : 'bg-transparent text-[#A1A1AA] border-[#20293A]'
                }`}
              >
                Show Short
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Entry</span>
                <span className="text-sm font-medium">${displayedAnalysis?.bearish_entry.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Target</span>
                <span className="text-sm font-medium text-green-500">${displayedAnalysis?.bearish_tp.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#A1A1AA]">Stop Loss</span>
                <span className="text-sm font-medium text-red-500">${displayedAnalysis?.bearish_sl.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart */}
      <Card className="bg-[#030816] border-[#20293A] hover:bg-[#0A1122] transition-colors">
        <CardHeader>
          <CardTitle className="text-[#FAFAFA] flex items-center justify-between">
            <span>Price Analysis</span>
            <div className="flex items-center gap-4">
              {selectedDataPoint && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDataPoint("")}
                  className="text-xs bg-transparent text-[#A1A1AA] border-[#20293A] hover:bg-[#0A1122]"
                >
                  Reset Zoom
                </Button>
              )}
              {filteredData[0] && (
                <Badge variant="outline" className="text-xs">
                  Last updated: {format(new Date(filteredData[0].created_at), 'HH:mm:ss')}
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredChartData}
                margin={{ top: 5, right: 120, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#20293A" />
                <XAxis 
                  dataKey="timestamp"
                  stroke="#A1A1AA"
                  type="number"
                  scale="time"
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => format(new Date(value), 'yyyy-MM-dd HH:mm')}
                />
                <YAxis 
                  stroke="#A1A1AA"
                  domain={calculateYAxisDomain(filteredChartData, displayedAnalysis)}
                  tickFormatter={(value) => value.toFixed(0)}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0A1122',
                    border: '1px solid #20293A',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                  labelStyle={{
                    color: '#A1A1AA'
                  }}
                  labelFormatter={(value) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss')}
                  formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
                />
                <Legend />
                
                {/* Bullish Position Lines */}
                {showPositionsSelected.bullish && displayedAnalysis && (
                  <>
                    <ReferenceLine 
                      y={displayedAnalysis.bullish_entry} 
                      stroke="#10B981" 
                      strokeDasharray="3 3"
                      label={{ 
                        value: `Long Entry ($${displayedAnalysis.bullish_entry.toFixed(2)})`, 
                        position: 'right', 
                        fill: '#10B981',
                        fontSize: 12,
                        offset: 5
                      }}
                    />
                    <ReferenceLine 
                      y={displayedAnalysis.bullish_tp} 
                      stroke="#10B981"
                      strokeDasharray="3 3"
                      label={{ 
                        value: `Take Profit ($${displayedAnalysis.bullish_tp.toFixed(2)})`, 
                        position: 'right', 
                        fill: '#10B981',
                        fontSize: 12,
                        offset: 5
                      }}
                    />
                    <ReferenceLine 
                      y={displayedAnalysis.bullish_sl} 
                      stroke="#EF4444"
                      strokeDasharray="3 3"
                      label={{ 
                        value: `Stop Loss ($${displayedAnalysis.bullish_sl.toFixed(2)})`, 
                        position: 'right', 
                        fill: '#EF4444',
                        fontSize: 12,
                        offset: 5
                      }}
                    />
                  </>
                )}

                {/* Bearish Position Lines */}
                {showPositionsSelected.bearish && displayedAnalysis && (
                  <>
                    <ReferenceLine 
                      y={displayedAnalysis.bearish_entry} 
                      stroke="#EF4444" 
                      strokeDasharray="3 3"
                      label={{ 
                        value: `Short Entry ($${displayedAnalysis.bearish_entry.toFixed(2)})`, 
                        position: 'right', 
                        fill: '#EF4444',
                        fontSize: 12,
                        offset: 5
                      }}
                    />
                    <ReferenceLine 
                      y={displayedAnalysis.bearish_tp} 
                      stroke="#10B981"
                      strokeDasharray="3 3"
                      label={{ 
                        value: `Take Profit ($${displayedAnalysis.bearish_tp.toFixed(2)})`, 
                        position: 'right', 
                        fill: '#10B981',
                        fontSize: 12,
                        offset: 5
                      }}
                    />
                    <ReferenceLine 
                      y={displayedAnalysis.bearish_sl} 
                      stroke="#EF4444"
                      strokeDasharray="3 3"
                      label={{ 
                        value: `Stop Loss ($${displayedAnalysis.bearish_sl.toFixed(2)})`, 
                        position: 'right', 
                        fill: '#EF4444',
                        fontSize: 12,
                        offset: 5
                      }}
                    />
                  </>
                )}

                {selectedDataPoint && (
                  <ReferenceLine
                    x={new Date(selectedDataPoint).getTime()}
                    stroke="#FFFFFF"
                    strokeDasharray="3 3"
                    label={{ 
                      value: format(new Date(selectedDataPoint), 'HH:mm:ss'), 
                      position: 'top',
                      fill: "#FFFFFF",
                      fontSize: 12,
                      offset: 5
                    }}
                  />
                )}

                <Line 
                  type="linear" 
                  dataKey="price"
                  stroke="#2563EB" 
                  strokeWidth={2}
                  name="Price"
                  animationDuration={300}
                  connectNulls={true}
                  isAnimationActive={false}
                  dot={(props) => (
                    <CustomDot 
                      {...props} 
                      selectedDataPoint={selectedDataPoint}
                    />
                  )}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>


    </div>
  );
};

export default GammaAnalysisCard; 