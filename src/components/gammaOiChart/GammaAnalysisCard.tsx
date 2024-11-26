import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  TrendingDown as StockDownIcon,
  TrendingUp as StockUpIcon,
  RotateCcw,
  ListFilter,
  ChartArea,

} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { getCurrentGoldContractOption } from "@/hooks/useGammaOi";
import { format } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ShimmerButton from "@/components/ui/shimmer-button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SegmentedControl } from "@/components/ui/segmented-control";

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
  currentPrice?: number;
}

// Add this helper function at the top of the file, outside the component
function formatChartData(priceData: PriceData[]) {
  return priceData.map((item) => ({
    timestamp: new Date(item.datetime).getTime(),
    price: item.price,
    datetime: item.datetime,
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
  const selectedIndex = data.findIndex(
    (item) => new Date(item.datetime).getTime() >= selectedTime
  );

  if (selectedIndex === -1) return data;

  // Always show 20 previous points
  const startIndex = Math.max(0, selectedIndex - 20);

  return data.slice(startIndex);
}

// Add this custom dot component at the top of the file
const CustomDot = ({ cx, cy, payload, selectedDataPoint }: any) => {
  const isSelected =
    payload.timestamp === new Date(selectedDataPoint).getTime();

  if (!isSelected) {
    return (
      <svg x={cx - 2} y={cy - 2} width={4} height={4} viewBox="0 0 4 4">
        <circle cx="2" cy="2" r="2" fill="#2563EB" opacity={0.5} />
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
  priceData,

}) => {
  const [tradingRange, setTradingRange] = useState(10);
  const [selectedDataPoint, setSelectedDataPoint] = useState<string>("");
  const [showPositionsSelected, setShowPositionsSelected] =
    useState<PositionVisibility>({
      bullish: false,
      bearish: false,
    });
  const [showSpotPrice, setShowSpotPrice] = useState(false);

  // Filter data based on trading range
  const filteredData = useMemo(() => {
    console.log(priceData);
    return data.filter((item) => item.trading_range === tradingRange);
  }, [data, tradingRange]);

  // Get the analysis point to display (either selected or latest)
  const displayedAnalysis = useMemo(() => {
    if (selectedDataPoint) {
      return (
        filteredData.find((item) => item.created_at === selectedDataPoint) ||
        filteredData[0]
      );
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
  const formattedPriceData = useMemo(
    () => formatChartData(priceData),
    [priceData]
  );

  // Add these helper functions
  const toggleBullishPosition = () => {
    setShowPositionsSelected((prev) => ({
      ...prev,
      bullish: !prev.bullish,
    }));
  };

  const toggleBearishPosition = () => {
    setShowPositionsSelected((prev) => ({
      ...prev,
      bearish: !prev.bearish,
    }));
  };

  // Update the filteredChartData calculation
  const filteredChartData = useMemo(() => {
    if (!selectedDataPoint || !formattedPriceData.length)
      return formattedPriceData;
    return filterDataFromTimestamp(formattedPriceData, selectedDataPoint);
  }, [formattedPriceData, selectedDataPoint]);

  // Inside the GammaAnalysisCard component, add this function to calculate the domain
  const calculateYAxisDomain = (
    data: any[],
    analysis: GammaAnalysis | undefined
  ) => {
    if (!data.length || !analysis) return ["auto", "auto"];

    // Get min/max from price data
    let minPrice = Math.min(...data.map((d) => d.price));
    let maxPrice = Math.max(...data.map((d) => d.price));

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
        analysis.minor_resistance_level,
      ];

      minPrice = Math.min(minPrice, ...levels);
      maxPrice = Math.max(maxPrice, ...levels);
    }

    // Add some padding (5%)
    const padding = (maxPrice - minPrice) * 0.05;
    return [minPrice - padding, maxPrice + padding];
  };

  const currentContract = useMemo(() => getCurrentGoldContractOption(), []);

  const adjustPriceWithDelta = (
    price: number,
    delta: number,
    isSpot: boolean
  ) => {
    return isSpot ? price - delta : price;
  };

  const adjustedChartData = useMemo(() => {
    return filteredChartData.map((point) => ({
      ...point,
      price: adjustPriceWithDelta(
        point.price,
        displayedAnalysis?.delta ?? 0,
        showSpotPrice
      ),
    }));
  }, [filteredChartData, displayedAnalysis?.delta, showSpotPrice]);

  return (
    <div className="space-y-4">
      {/* Latest Analysis Summary */}
      <Card className="bg-[#030816] border-none rounded-[12px]">
        <div className="border-b border-[#20293A] p-3 pl-4 pr-2 text-[13px] text-[#A1A1AA] flex items-center justify-between h-[50px]">
          <div className="flex items-center gap-2">
            <div>
            <ChartArea className="size-4" />

            </div>
            <div>Gamma AI</div>
          </div>

          <div className="lg:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <div className="z-10 flex items-center justify-center">
                  <ShimmerButton className="shadow-2xl w-auto px-4">
                    <span className="text-[#209CFF]">
                      <ListFilter className="size-4" />
                    </span>
                  </ShimmerButton>
                </div>
              </DrawerTrigger>
              <DrawerContent className="h-[40%] bg-[#030816] border-t border-[#20293A]">
                <DrawerHeader>
                  <DrawerTitle className="text-[#FAFAFA] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ListFilter className="h-4 w-4" />
                      Filter
                    </div>
                    <Button
                      // onClick={handleResetAllFilters}
                      variant="outline"
                      className="font-normal text-[#209CFF] border-none hover:bg-[#172036] hover:text-[#209CFF] group"
                    >
                      <RotateCcw className="transition-transform duration-200 group-hover:-rotate-180" />
                      Default Filters
                    </Button>
                  </DrawerTitle>
                </DrawerHeader>
                <div className="bg-[#030816] px-4">
                  <div className="mt-4">
                    <label className="text-[14px] font-normal text-[#A1A1AA]/70">
                      Timeframe
                    </label>
                  </div>
                  <Select
                    value={selectedDataPoint}
                    onValueChange={setSelectedDataPoint}
                  >
                    <SelectTrigger className="w-full mt-2 bg-transparent border-[#20293A]">
                      <SelectValue>
                        {selectedDataPoint
                          ? format(
                              new Date(selectedDataPoint),
                              "HH:mm:ss dd/MM"
                            )
                          : "Select time"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {filteredData.map((item) => (
                        <SelectItem
                          key={item.created_at}
                          value={item.created_at}
                          className="text-sm"
                        >
                          {format(new Date(item.created_at), "HH:mm:ss dd/MM")}{" "}
                          - ${item.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-4">
                    <label className="text-[14px] font-normal text-[#A1A1AA]/70">
                      Trading Range
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <SegmentedControl
                      value={tradingRange}
                      onChange={(value) => {
                        setTradingRange(Number(value));
                        setSelectedDataPoint("");
                      }}
                      segments={[
                        { value: 10, label: "10" },
                        { value: 20, label: "20" },
                      ]}
                    />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="hidden lg:block">
            <Popover>
              <PopoverTrigger asChild>
                <div className="z-10 flex items-center justify-center">
                  <ShimmerButton className="shadow-2xl w-[90px] gap-2">
                    <span className="text-[#209CFF]">
                      <ListFilter className="size-4" />
                    </span>
                    <span className="whitespace-pre-wrap text-center text-sm font-normal leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
                      Filter
                    </span>
                  </ShimmerButton>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-[350px] h-auto overflow-y-auto scrollbar-track-transparent custom-scrollbar bg-[#030816] border-[#20293A] rounded-[12px] backdrop-blur-[10px] pt-0"
                align="end"
                side="bottom"
                sideOffset={5}
              >
                <div className="sticky top-0 z-10 bg-[#030816] p-0 pb-2 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium leading-none text-[#FAFAFA]">
                        Filter
                      </h4>
                    </div>
                    <div>
                      <Button
                        // onClick={handleResetAllFilters}
                        variant="outline"
                        className="font-normal text-[#209CFF] border-none hover:bg-[#172036] hover:text-[#209CFF] group"
                      >
                        <RotateCcw className="transition-transform duration-200 group-hover:-rotate-180" />
                        Default Filters
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-[14px] font-normal text-[#A1A1AA]/70">
                      Timeframe
                    </label>
                  </div>
                  <Select
                    value={selectedDataPoint}
                    onValueChange={setSelectedDataPoint}
                  >
                    <SelectTrigger className="w-full mt-2 bg-transparent border-[#20293A]">
                      <SelectValue>
                        {selectedDataPoint
                          ? format(
                              new Date(selectedDataPoint),
                              "HH:mm:ss dd/MM"
                            )
                          : "Select time"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {filteredData.map((item) => (
                        <SelectItem
                          key={item.created_at}
                          value={item.created_at}
                          className="text-sm"
                        >
                          {format(new Date(item.created_at), "HH:mm:ss dd/MM")}{" "}
                          - ${item.price.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-4">
                    <label className="text-[14px] font-normal text-[#A1A1AA]/70">
                      Trading Range
                    </label>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <SegmentedControl
                      value={tradingRange}
                      onChange={(value) => {
                        setTradingRange(Number(value));
                        setSelectedDataPoint("");
                      }}
                      segments={[
                        { value: 10, label: "10" },
                        { value: 20, label: "20" },
                      ]}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-[#FAFAFA]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4">
              {/* Left side content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#209CFF] animate-pulse" />
                  <div className="font-medium text-[16px] text-[#FAFAFA]">
                    Current Analysis
                  </div>
                </div>
              </div>

              {/* Right side controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-row sm:items-center gap-2 text-[14px] font-normal flex-wrap">
                  <span className="text-[#A1A1AA]">{currentContract}</span>
                  <div className="h-4 w-[1px] bg-[#20293A]" />
                  <div className="flex items-center gap-1">
                    <span className="text-[#A1A1AA]">Futures:</span>
                    <span className="font-normal text-[#209CFF]">
                      ${displayedAnalysis?.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-4 w-[1px] bg-[#20293A]" />
                  <div className="flex items-center gap-1">
                    <span className="text-[#A1A1AA]">Spot:</span>
                    <span className="font-normal text-[#209CFF]">
                      ${displayedAnalysis?.spot_price.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-4 w-[1px] bg-[#20293A]" />
                  <div className="flex items-center gap-1">
                    <span className="text-[#A1A1AA]">Delta:</span>
                    <span className="font-normal text-[#209CFF]">
                      ${displayedAnalysis?.delta.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#A1A1AA]">
                      (
                      {(
                        (displayedAnalysis.delta / displayedAnalysis.price) *
                        100
                      ).toFixed(2)}
                      %)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Analysis Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Section */}
            <div className="space-y-0 pt-3 px-0 rounded-lg bg-[#030816] border border-[#20293A]">
              <div className="flex justify-between items-center border-b border-[#20293A] pb-3 px-4">
                <p className="text-[#A1A1AA] font-normal text-[14px]">
                  {showSpotPrice
                    ? "Spot Price Analysis"
                    : "Futures Price Analysis"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#A1A1AA]">Show Spot</span>
                  <Switch
                    checked={showSpotPrice}
                    onCheckedChange={setShowSpotPrice}
                    className="data-[state=checked]:bg-[#209CFF]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 items-center h-[120px]">
                <div className="col-span-5 flex flex-col gap-2 bg-[#060E21] h-full">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-[12px] text-[#A1A1AA]">
                      {showSpotPrice ? "Spot Price" : "Futures Price"}
                    </div>
                    <div className="text-[22px] font-semibold text-[#FAFAFA]">
                      $
                      {adjustPriceWithDelta(
                        displayedAnalysis?.price ?? 0,
                        displayedAnalysis?.delta ?? 0,
                        showSpotPrice
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 border-l border-r border-[#20293A] h-full flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="text-[12px] text-[#A1A1AA] text-center">
                      Trading Range
                    </div>
                    <div className="text-[20px] font-semibold text-[#FAFAFA]">
                      {tradingRange}
                    </div>
                  </div>
                </div>
                <div className="col-span-3 flex gap-2 flex-wrap justify-center">
                  <div className="flex flex-col items-center w-full">
                    <div className="text-[12px] text-[#A1A1AA] text-center w-full">
                      Delta
                    </div>
                    {displayedAnalysis?.delta !== undefined && (
                      <Badge
                        variant={
                          displayedAnalysis.delta > 0
                            ? "default"
                            : "destructive"
                        }
                        className="text-[20px] font-semibold text-[#FAFAFA] py-0"
                      >
                        {displayedAnalysis.delta.toFixed(2)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Major Section */}
              <div className="pt-0 w-full border-t border-[#20293A] bg-[#0A1020]/30 px-4 h-auto">
                <div className="w-[100%] py-1 h-full flex justify-center">
                  <span className="text-[12px] text-[#A1A1AA]">Major</span>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-[#20293A] h-[60px]">
                <div className="flex flex-col justify-center items-center border-r border-[#20293A]">
                  <span className="text-[12px] text-[#A1A1AA]">
                    Major Support
                  </span>
                  <span className="text-sm font-medium">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.major_support_level ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[12px] text-[#A1A1AA]">
                    Major Resistance
                  </span>
                  <span className="text-sm font-medium">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.major_resistance_level ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Minor Section */}
              <div className="pt-0 w-full border-t border-[#20293A] bg-[#0A1020]/30 px-4 h-auto">
                <div className="w-[100%] py-1 h-full flex justify-center">
                  <span className="text-[12px] text-[#A1A1AA]">Minor</span>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-[#20293A] h-[60px]">
                <div className="flex flex-col justify-center items-center border-r border-[#20293A]">
                  <span className="text-[12px] text-[#A1A1AA]">
                    Minor Support
                  </span>
                  <span className="text-sm font-medium">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.minor_support_level ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[12px] text-[#A1A1AA]">
                    Minor Resistance
                  </span>
                  <span className="text-sm font-medium">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.minor_resistance_level ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bullish Scenario */}
            <div className="min-h-[350px] md:min-h-auto space-y-0 pt-3 rounded-lg bg-[#030816] border border-[#20293A] overflow-hidden">
              <div className="flex justify-between items-center border-b border-[#20293A] pb-3 px-4">
                <p className="text-[#A1A1AA] font-normal text-[14px] flex items-center gap-2">
                  <span className="text-green-500">
                    <StockUpIcon size={16} />
                  </span>{" "}
                  Bullish Scenario
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#A1A1AA]">Show Long</span>
                  <Switch
                    checked={showPositionsSelected.bullish}
                    onCheckedChange={toggleBullishPosition}
                    className="data-[state=checked]:bg-[#209CFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 h-[40%] border-b border-[#20293A]">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[12px] text-[#A1A1AA]">Entry</div>
                  <div className="text-[20px] font-semibold text-[#FAFAFA]">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.bullish_entry ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 h-[50%]">
                <div className="flex flex-col justify-center items-center border-r border-[#20293A]">
                  <div className="text-[12px] text-[#A1A1AA]">Target</div>
                  <div className="text-[20px] font-semibold text-green-500">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.bullish_tp ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[12px] text-[#A1A1AA]">Stop Loss</div>
                  <div className="text-[20px] font-semibold text-red-500">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.bullish_sl ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Bearish Scenario */}
            <div className="min-h-[350px] md:min-h-auto space-y-0 pt-3 rounded-lg bg-[#030816] border border-[#20293A] overflow-hidden">
              <div className="flex justify-between items-center border-b border-[#20293A] pb-3 px-4">
                <p className="text-[#A1A1AA] font-normal text-[14px] flex items-center gap-2">
                  <span className="text-red-500">
                    <StockDownIcon size={16} />
                  </span>{" "}
                  Bearish Scenario
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#A1A1AA]">Show Short</span>
                  <Switch
                    checked={showPositionsSelected.bearish}
                    onCheckedChange={toggleBearishPosition}
                    className="data-[state=checked]:bg-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 h-[40%] border-b border-[#20293A]">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[12px] text-[#A1A1AA]">Entry</div>
                  <div className="text-[20px] font-semibold text-[#FAFAFA]">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.bearish_entry ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 h-[50%]">
                <div className="flex flex-col justify-center items-center border-r border-[#20293A]">
                  <div className="text-[12px] text-[#A1A1AA]">Target</div>
                  <div className="text-[20px] font-semibold text-green-500">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.bearish_tp ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[12px] text-[#A1A1AA]">Stop Loss</div>
                  <div className="text-[20px] font-semibold text-red-500">
                    $
                    {adjustPriceWithDelta(
                      displayedAnalysis?.bearish_sl ?? 0,
                      displayedAnalysis?.delta ?? 0,
                      showSpotPrice
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart */}
      <div className="rounded-none border-t border-[#20293A]">
        <Card className="bg-[#030816] rounded-[12px] border-none">
          <CardHeader>
            <CardTitle className="text-[#FAFAFA] text-[16px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span>Price Analysis</span>
              <div className="flex flex-wrap items-center gap-4">
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
                    Last updated:{" "}
                    {format(new Date(filteredData[0].created_at), "HH:mm:ss")}
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={adjustedChartData}
                  margin={{ top: 5, right: 120, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#20293A" />
                  <XAxis
                    dataKey="timestamp"
                    stroke="#A1A1AA"
                    type="number"
                    scale="time"
                    domain={["auto", "auto"]}
                    tickFormatter={(value) =>
                      format(new Date(value), "yyyy-MM-dd HH:mm")
                    }
                  />
                  <YAxis
                    stroke="#A1A1AA"
                    domain={calculateYAxisDomain(
                      adjustedChartData,
                      displayedAnalysis
                    )}
                    tickFormatter={(value) => value.toFixed(0)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0A1122",
                      border: "1px solid #20293A",
                      borderRadius: "8px",
                      padding: "8px",
                    }}
                    labelStyle={{
                      color: "#A1A1AA",
                    }}
                    labelFormatter={(value) =>
                      format(new Date(value), "yyyy-MM-dd HH:mm:ss")
                    }
                    formatter={(value: number, name: string) => [
                      `$${value.toFixed(2)}`,
                      name,
                    ]}
                  />
                  <Legend />

                  {/* Bullish Position Lines */}
                  {showPositionsSelected.bullish && displayedAnalysis && (
                    <>
                      <ReferenceLine
                        y={adjustPriceWithDelta(
                          displayedAnalysis.bullish_entry,
                          displayedAnalysis.delta,
                          showSpotPrice
                        )}
                        stroke="#10B981"
                        strokeDasharray="3 3"
                        label={{
                          value: `Long Entry ($${adjustPriceWithDelta(
                            displayedAnalysis.bullish_entry,
                            displayedAnalysis.delta,
                            showSpotPrice
                          ).toFixed(2)})`,
                          position: "right",
                          fill: "#10B981",
                          fontSize: 12,
                          offset: 5,
                        }}
                      />
                      <ReferenceLine
                        y={adjustPriceWithDelta(
                          displayedAnalysis.bullish_tp,
                          displayedAnalysis.delta,
                          showSpotPrice
                        )}
                        stroke="#10B981"
                        strokeDasharray="3 3"
                        label={{
                          value: `Take Profit ($${adjustPriceWithDelta(
                            displayedAnalysis.bullish_tp,
                            displayedAnalysis.delta,
                            showSpotPrice
                          ).toFixed(2)})`,
                          position: "right",
                          fill: "#10B981",
                          fontSize: 12,
                          offset: 5,
                        }}
                      />
                      <ReferenceLine
                        y={adjustPriceWithDelta(
                          displayedAnalysis.bullish_sl,
                          displayedAnalysis.delta,
                          showSpotPrice
                        )}
                        stroke="#EF4444"
                        strokeDasharray="3 3"
                        label={{
                          value: `Stop Loss ($${adjustPriceWithDelta(
                            displayedAnalysis.bullish_sl,
                            displayedAnalysis.delta,
                            showSpotPrice
                          ).toFixed(2)})`,
                          position: "right",
                          fill: "#EF4444",
                          fontSize: 12,
                          offset: 5,
                        }}
                      />
                    </>
                  )}

                  {/* Bearish Position Lines */}
                  {showPositionsSelected.bearish && displayedAnalysis && (
                    <>
                      <ReferenceLine
                        y={adjustPriceWithDelta(
                          displayedAnalysis.bearish_entry,
                          displayedAnalysis.delta,
                          showSpotPrice
                        )}
                        stroke="#EF4444"
                        strokeDasharray="3 3"
                        label={{
                          value: `Short Entry ($${adjustPriceWithDelta(
                            displayedAnalysis.bearish_entry,
                            displayedAnalysis.delta,
                            showSpotPrice
                          ).toFixed(2)})`,
                          position: "right",
                          fill: "#EF4444",
                          fontSize: 12,
                          offset: 5,
                        }}
                      />
                      <ReferenceLine
                        y={adjustPriceWithDelta(
                          displayedAnalysis.bearish_tp,
                          displayedAnalysis.delta,
                          showSpotPrice
                        )}
                        stroke="#10B981"
                        strokeDasharray="3 3"
                        label={{
                          value: `Take Profit ($${adjustPriceWithDelta(
                            displayedAnalysis.bearish_tp,
                            displayedAnalysis.delta,
                            showSpotPrice
                          ).toFixed(2)})`,
                          position: "right",
                          fill: "#10B981",
                          fontSize: 12,
                          offset: 5,
                        }}
                      />
                      <ReferenceLine
                        y={adjustPriceWithDelta(
                          displayedAnalysis.bearish_sl,
                          displayedAnalysis.delta,
                          showSpotPrice
                        )}
                        stroke="#EF4444"
                        strokeDasharray="3 3"
                        label={{
                          value: `Stop Loss ($${adjustPriceWithDelta(
                            displayedAnalysis.bearish_sl,
                            displayedAnalysis.delta,
                            showSpotPrice
                          ).toFixed(2)})`,
                          position: "right",
                          fill: "#EF4444",
                          fontSize: 12,
                          offset: 5,
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
                        value: format(new Date(selectedDataPoint), "HH:mm:ss"),
                        position: "top",
                        fill: "#FFFFFF",
                        fontSize: 12,
                        offset: 5,
                      }}
                    />
                  )}

                  <Line
                    type="linear"
                    dataKey="price"
                    data={adjustedChartData}
                    stroke="#2563EB"
                    strokeWidth={2}
                    name={showSpotPrice ? "Spot Price" : "Futures Price"}
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
    </div>
  );
};

export default GammaAnalysisCard;
