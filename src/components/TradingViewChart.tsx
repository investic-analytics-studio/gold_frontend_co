// @ts-nocheck
import { useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CustomIndicator, IndicatorContext } from "@/types/tradingview";

interface TradingViewChartProps {
  symbol: string;
  interval: string;
  exchange: string;
  containerId?: string;
  libraryPath?: string;
}


interface HistoricalBar {
  datetime: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const fetchHistoricalData = async (
  symbol: string,
  interval: string,
  exchange: string
): Promise<HistoricalBar[]> => {
  const response = await axios.get<{ data: HistoricalBar[] }>(
    "http://localhost:8080/tradingview/historical",
    {
      params: {
        symbol,
        exchange,
        interval,
        bars: 300,
      },
    }
  );
  return response.data.data;
};

const TradingViewChart = ({
  symbol,
  interval,
  exchange,
  containerId = "tv_chart_container",
  libraryPath = "/static/charting_library/",
}: TradingViewChartProps): JSX.Element => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tvWidgetRef = useRef<any>(null);
  const scriptLoadedRef = useRef(false);

  // Fetch data with TanStack Query
  const { data: historicalData } = useQuery({
    queryKey: ["chartData", symbol, interval],
    queryFn: () => fetchHistoricalData(symbol, interval, exchange),
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep unused data for 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Load TradingView library
  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const script = document.createElement("script");
    script.src = `${libraryPath}charting_library.standalone.js`;
    script.async = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
      initializeChart();
    };
    document.head.appendChild(script);

    return () => {
      if (tvWidgetRef.current) {
        tvWidgetRef.current.remove();
        tvWidgetRef.current = null;
      }
    };
  }, [libraryPath]);

  // Initialize chart when data and library are ready
  const initializeChart = () => {
    if (!chartContainerRef.current || !window.TradingView || !historicalData)
      return;

    const datafeed = {
      onReady: (callback: (configuration: any) => void): void => {
        setTimeout(
          () =>
            callback({
              supported_resolutions: [
                "1",
                "5",
                "15",
                "30",
                "60",
                "1D",
                "1W",
                "1M",
              ],
              supports_time: true,
              supports_marks: false,
              supports_timescale_marks: false,
              exchanges: [{ value: "OANDA", name: "OANDA", desc: "OANDA" }],
              symbols_types: [{ name: "forex", value: "forex" }],
            }),
          0
        );
      },

      searchSymbols: (
        userInput: string,
        exchange: string,
        symbolType: string,
        onResult: (result: any[]) => void
      ): void => {
        onResult([
          {
            symbol: symbol,
            full_name: `${exchange}:${symbol}`,
            description: "Gold Futures",
            exchange: exchange,
          },
        ]);
      },

      resolveSymbol: (
        symbolName: string,
        onSymbolResolvedCallback: (symbolInfo: any) => void
      ): void => {
        setTimeout(() => {
          onSymbolResolvedCallback({
            name: symbolName,
            full_name: symbolName,
            description: "Gold Futures",
            type: "futures",
            session: "24x7",
            timezone: "UTC",
            exchange: exchange,
            minmov: 1,
            pricescale: 100,
            has_intraday: true,
            has_daily: true,
            has_weekly_and_monthly: true,
            supported_resolutions: [
              "1",
              "5",
              "15",
              "30",
              "60",
              "1D",
              "1W",
              "1M",
            ],
            volume_precision: 2,
            data_status: "streaming",
          });
        }, 0);
      },

      getBars: async (
        symbolInfo: any,
        resolution: string,
        periodParams: {
          from: number;
          to: number;
          countBack: number;
          firstDataRequest: boolean;
        },
        onHistoryCallback: (bars: Bar[], options: { noData: boolean }) => void,
        onErrorCallback: (error: string) => void
      ): Promise<void> => {
        try {
          const bars = historicalData
            .map((bar) => ({
              time: new Date(bar.datetime).getTime(),
              open: bar.open,
              high: bar.high,
              low: bar.low,
              close: bar.close,
              volume: bar.volume,
            }))
            .sort((a, b) => a.time - b.time);

          onHistoryCallback(bars, { noData: bars.length === 0 });
        } catch (error) {
          console.error("Error in getBars:", error);
          onErrorCallback("Failed to load historical data");
        }
      },

      subscribeBars: () => {},
      unsubscribeBars: () => {},
    };

    const widgetOptions = {
      symbol: `${exchange}:${symbol}`,
      interval,
      container: chartContainerRef.current,
      library_path: libraryPath,
      locale: "en",
      datafeed,
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
        "header_screenshot",
        "header_compare",
        "timeframes_toolbar",
      ],
      enabled_features: ["hide_left_toolbar_by_default"],
      theme: "dark",
      autosize: true,
      loading_screen: { backgroundColor: "#030816" },
      overrides: {
        "paneProperties.background": "#030816",
        "paneProperties.backgroundType": "solid",
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.upColor": "#089981",
        "mainSeriesProperties.candleStyle.downColor": "#F23645",
        "mainSeriesProperties.candleStyle.borderUpColor": "#089981",
        "mainSeriesProperties.candleStyle.borderDownColor": "#F23645",
        "mainSeriesProperties.candleStyle.wickUpColor": "#089981",
        "mainSeriesProperties.candleStyle.wickDownColor": "#F23645",
      },
      studies_overrides: {
        "volume.volume.color.0": "#EF4444",
        "volume.volume.color.1": "#34D399",
      },
      loaded_callback: () => {
        console.log("loaded_callback called");
        if (tvWidgetRef.current) {
          tvWidgetRef.current.onChartReady(() => {
            console.log("Chart ready");
            tvWidgetRef.current.chart().createStudy(
              "Volume Profile Fixed Range",
              false,
              true,
              {
                "Number of Bars": 150,
                "Row Size": 24,
                "Value Area Volume %": 70,
                "POC Color": "#ff0000",
                Width: 2,
                "Value Area Up": "rgba(0, 0, 255, 0.3)",
                "Value Area Down": "rgba(255, 165, 0, 0.3)",
                "UP Volume": "rgba(0, 0, 255, 0.75)",
                "Down Volume": "rgba(255, 165, 0, 0.75)",
                "Show POC Label": true,
              },
              (entityId: string) => {
                console.log("Study created with ID:", entityId);
              }
            );
          });
        }
      },
      custom_indicators_getter: function (PineJS: any) {
        console.log("custom_indicators_getter called");
        return Promise.resolve([
          {
            name: "Volume Profile Fixed Range",
            metainfo: {
              _metainfoVersion: 51,
              id: "VolumeProfile@tv-basicstudies-1",
              name: "Volume Profile Fixed Range",
              description: "Volume Profile / Fixed Range",
              shortDescription: "Volume Profile",
              is_hidden_study: false,
              is_price_study: true,
              isCustomIndicator: true,
              plots: [
                {
                  id: "plot_0",
                  type: "boxes",
                  name: "Volume Profile",
                },
              ],
              defaults: {
                styles: {
                  plot_0: {
                    linestyle: 0,
                    visible: true,
                    linewidth: 1,
                    plottype: 5,
                    trackPrice: true,
                    color: "#FF0000",
                  },
                },
                inputs: {
                  "Number of Bars": 150,
                  "Row Size": 24,
                  "Value Area Volume %": 70,
                },
              },
              inputs: [
                {
                  id: "in_0",
                  name: "Number of Bars",
                  type: "integer",
                  defval: 150,
                },
                {
                  id: "in_1",
                  name: "Row Size",
                  type: "integer",
                  defval: 24,
                },
                {
                  id: "in_2",
                  name: "Value Area Volume %",
                  type: "float",
                  defval: 70,
                },
              ],
              format: {
                type: "price",
                precision: 2,
              },
            },
            constructor: function (this: any) {
              const indicator: CustomIndicator = {
                _context: undefined,
                _input: undefined,

                init: function (
                  context: IndicatorContext,
                  input: (name: string) => any
                ) {
                  this._context = context;
                  this._input = input;

                  // Initialize your indicator's calculation here
                  const bars = input("Number of Bars");
                  const rowSize = input("Row Size");
                  const valueAreaVolume = input("Value Area Volume %");

                  // Your volume profile calculation logic here
                  // This is where you'd implement the Pine Script logic in JavaScript
                },

                main: function (
                  context: IndicatorContext,
                  input: (name: string) => any
                ) {
                  this._context = context;
                  this._input = input;

                  // Your main calculation logic here
                  // Return the calculated values that should be plotted
                  const bars = input("Number of Bars");
                  const rowSize = input("Row Size");
                  const valueAreaVolume = input("Value Area Volume %");

                  // Placeholder implementation - replace with actual volume profile calculation
                  const result = new Array(bars).fill(0);

                  // Example: calculate some dummy values
                  for (let i = 0; i < bars; i++) {
                    result[i] =
                      (Math.random() * rowSize * valueAreaVolume) / 100;
                  }

                  return result;
                },
              };

              Object.assign(this, indicator);
              return this;
            },
          },
        ]);
      },
    };

    tvWidgetRef.current = new window.TradingView.widget(widgetOptions);
  };

  // Update chart when data changes
  useEffect(() => {
    if (scriptLoadedRef.current && historicalData) {
      initializeChart();
    }
  }, [historicalData, symbol, interval]);

  return (
    <div
      ref={chartContainerRef}
      id={containerId}
      className="w-full"
      style={{ height: "600px" }}
    />
  );
};

export default TradingViewChart;
