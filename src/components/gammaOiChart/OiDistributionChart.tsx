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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// Add these type definitions
interface GoldOptionContract {
  "Contract Month": string;
  "Product Code": string;
  Settlement: string;
}

// Add these interfaces at the top of the file
interface OIDataItem {
  type: string;
  strike: number;
  atclose_weighted: number;
}

interface ProcessedDataItem {
  strike: number;
  calls: number;
  puts: number;
  index: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

// Update the props interface
interface OiDistributionChartProps {
  oiData: OIDataItem[]; // Replace any with OIDataItem
  currentPrice: number;
  availableMonths: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const OiDistributionChart: React.FC<OiDistributionChartProps> = ({
  oiData: data,
  currentPrice,
  availableMonths,
  selectedMonth,
  onMonthChange,
}) => {
  // Add the gold options calendar constant
  const goldOptCalendarConstant: GoldOptionContract[] = [
    {
      "Contract Month": "May 2024 Gold Option",
      "Product Code": "OGK24",
      Settlement: "2024-04-25",
    },
    {
      "Contract Month": "June 2024 Gold Option",
      "Product Code": "OGM24",
      Settlement: "2024-05-28",
    },
    {
      "Contract Month": "July 2024 Gold Option",
      "Product Code": "OGN24",
      Settlement: "2024-06-25",
    },
    {
      "Contract Month": "August 2024 Gold Option",
      "Product Code": "OGQ24",
      Settlement: "2024-07-25",
    },
    {
      "Contract Month": "September 2024 Gold Option",
      "Product Code": "OGU24",
      Settlement: "2024-08-27",
    },
    {
      "Contract Month": "October 2024 Gold Option",
      "Product Code": "OGV24",
      Settlement: "2024-09-25",
    },
    {
      "Contract Month": "November 2024 Gold Option",
      "Product Code": "OGX24",
      Settlement: "2024-10-28",
    },
    {
      "Contract Month": "December 2024 Gold Option",
      "Product Code": "OGZ24",
      Settlement: "2024-11-25",
    },
    {
      "Contract Month": "January 2025 Gold Option",
      "Product Code": "OGF25",
      Settlement: "2024-12-26",
    },
    {
      "Contract Month": "February 2025 Gold Option",
      "Product Code": "OGG25",
      Settlement: "2025-01-28",
    },
    {
      "Contract Month": "March 2025 Gold Option",
      "Product Code": "OGH25",
      Settlement: "2025-02-25",
    },
    {
      "Contract Month": "April 2025 Gold Option",
      "Product Code": "OGJ25",
      Settlement: "2025-03-26",
    },
    {
      "Contract Month": "May 2025 Gold Option",
      "Product Code": "OGK25",
      Settlement: "2025-04-24",
    },
    {
      "Contract Month": "June 2025 Gold Option",
      "Product Code": "OGM25",
      Settlement: "2025-05-27",
    },
    {
      "Contract Month": "July 2025 Gold Option",
      "Product Code": "OGN25",
      Settlement: "2025-06-25",
    },
    {
      "Contract Month": "August 2025 Gold Option",
      "Product Code": "OGQ25",
      Settlement: "2025-07-28",
    },
    {
      "Contract Month": "September 2025 Gold Option",
      "Product Code": "OGU25",
      Settlement: "2025-08-26",
    },
    {
      "Contract Month": "October 2025 Gold Option",
      "Product Code": "OGV25",
      Settlement: "2025-09-25",
    },
    {
      "Contract Month": "December 2025 Gold Option",
      "Product Code": "OGZ25",
      Settlement: "2025-11-24",
    },
    {
      "Contract Month": "June 2026 Gold Option",
      "Product Code": "OGM26",
      Settlement: "2026-05-26",
    },
    {
      "Contract Month": "December 2026 Gold Option",
      "Product Code": "OGZ26",
      Settlement: "2026-11-24",
    },
    {
      "Contract Month": "June 2027 Gold Option",
      "Product Code": "OGM27",
      Settlement: "2027-05-25",
    },
    {
      "Contract Month": "December 2027 Gold Option",
      "Product Code": "OGZ27",
      Settlement: "2027-11-23",
    },
    {
      "Contract Month": "June 2028 Gold Option",
      "Product Code": "OGM28",
      Settlement: "2028-05-25",
    },
    {
      "Contract Month": "December 2028 Gold Option",
      "Product Code": "OGZ28",
      Settlement: "2028-11-27",
    },
    {
      "Contract Month": "June 2029 Gold Option",
      "Product Code": "OGM29",
      Settlement: "2029-05-24",
    },
    {
      "Contract Month": "December 2029 Gold Option",
      "Product Code": "OGZ29",
      Settlement: "2029-11-27",
    },
  ];

  // Function to get current gold contract optionß∂
  const getCurrentGoldContractOption = (): string => {
    const currentDate = new Date();

    // Find the first contract that hasn't settled yet
    const currentContract = goldOptCalendarConstant.find((contract) => {
      const settlementDate = new Date(contract.Settlement);
      return settlementDate > currentDate;
    });

    if (!currentContract) {
      return getCurrentYearMonth(); // Fallback to current month if no contract found
    }

    // Extract month and year from contract month string
    const match = currentContract["Contract Month"].match(/(\w+)\s+(\d{4})/);
    if (!match) {
      return getCurrentYearMonth(); // Fallback to current month if parsing fails
    }

    const [_, month, year] = match;
    return `${year}-${month.padStart(2, "0")}`;
  };

  // Modify your existing getCurrentYearMonth function to be a fallback
  const getCurrentYearMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  // Add this helper function to parse month codes
  const parseMonthCode = (monthCode: string) => {
    // Extract month and year from codes like "DEC2024"
    const match = monthCode.match(/([A-Z]+)(\d{4})/);
    if (!match) return { month: 0, year: 0 };

    const monthMap: { [key: string]: number } = {
      JAN: 1,
      FEB: 2,
      MAR: 3,
      APR: 4,
      MAY: 5,
      JUN: 6,
      JUL: 7,
      AUG: 8,
      SEP: 9,
      OCT: 10,
      NOV: 11,
      DEC: 12,
    };

    return {
      month: monthMap[match[1]] || 0,
      year: parseInt(match[2]),
    };
  };

  // Update the sort function
  const sortMonths = (months: string[]): string[] => {
    return months.sort((currentMonth, nextMonth) => {
      const parseCurrentMonth = parseMonthCode(currentMonth);
      const parseNextMonth = parseMonthCode(nextMonth);

      if (parseCurrentMonth.year !== parseNextMonth.year) {
        return parseCurrentMonth.year - parseNextMonth.year;
      }

      return parseCurrentMonth.month - parseNextMonth.month;
    });
  };

  // Sort the months before rendering
  const sortedMonths = useMemo(
    () => sortMonths(availableMonths),
    [availableMonths]
  );

  // Process data for side-by-side bars
  const processedData = useMemo<ProcessedDataItem[]>(() => {
    const combinedData = data
      .reduce<ProcessedDataItem[]>((acc, item: OIDataItem) => {
        const existingItem = acc.find(
          (i: ProcessedDataItem) => i.strike === item.strike
        );
        if (existingItem) {
          existingItem[item.type.toLowerCase() as "calls" | "puts"] =
            item.atclose_weighted;
        } else {
          acc.push({
            strike: item.strike,
            calls: item.type === "Calls" ? item.atclose_weighted : 0,
            puts: item.type === "Puts" ? item.atclose_weighted : 0,
            index: 0, // This will be updated in the map
          });
        }
        return acc;
      }, [])
      .sort(
        (a: ProcessedDataItem, b: ProcessedDataItem) => a.strike - b.strike
      );

    return combinedData.map((item: ProcessedDataItem, index: number) => ({
      ...item,
      index,
    }));
  }, [data]);

  const brushDomain = useMemo(() => {
    const currentPriceIndex = processedData.findIndex(
      (d: ProcessedDataItem) => d.strike >= currentPrice
    );
    const lowerBound = Math.max(0, currentPriceIndex - 20);
    const upperBound = Math.min(
      processedData.length - 1,
      currentPriceIndex + 20
    );
    return [lowerBound, upperBound];
  }, [processedData, currentPrice]);

  // Update CustomTooltip with proper types
  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length && label !== undefined) {
      const strikePrice = processedData[parseInt(label)].strike;
      return (
        <div className="custom-tooltip bg-gray-800 p-4 border border-gray-600 rounded shadow-lg text-gray-200">
          <p className="label font-bold">{`Strike: $${strikePrice.toFixed(
            2
          )}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-6">
      <Card className="w-full h-[600px] md:h-auto bg-[#030816] border-none lg:rounded-[12px]">
        <CardContent>
          {/* OI Distribution Chart */}
          <div className="w-full h-[500px] bg-[#030816] p-0 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[#FAFAFA] text-[16px] font-medium mb-2">
                  Options Open Interest Distribution
                </CardTitle>
                <CardDescription className="text-[#A1A1AA] text-[14px]">
                  Real-time price chart with technical analysis tools
                </CardDescription>
              </div>
              <div>
                <div className="mb-4">
                  <Select value={selectedMonth} onValueChange={onMonthChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortedMonths.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={processedData}
                margin={{ top: 40, right: 30, bottom: 60, left: 20 }}
              >
                <CartesianGrid
                  stroke="#121623"
                  horizontal={true}
                  vertical={false}
                />
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
                    fontSize={16}
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
