import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import axios from 'axios';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { useQuery } from '@tanstack/react-query';
import { SentimentRatioTooltips } from '../tooltips/RetailSentimentDesc';

interface SentimentRatioData {
  date: string;
  sentiment_ratio: number;
  upper_band: number;
  isFirstTickMonthlyLabel?: boolean;
}

// Fetch function
const fetchGoldSentimentRatioData = async (
  timeframe: string,
  backendApiUrl: string
): Promise<SentimentRatioData[]> => {
  const response = await axios.get(
    `${backendApiUrl}/gold-sentiment-ratio-graph-plot/${timeframe}`
  );

  const sortedData = response.data.sort(
    (a: SentimentRatioData, b: SentimentRatioData) => {
      const previousDate = new Date(a.date).getTime();
      const nextDate = new Date(b.date).getTime();
      return previousDate - nextDate;
    }
  );

  const getDateOnly = (dateString: string) => dateString.split('T')[0];

  return sortedData.map(
    (
      sortedDataItem: SentimentRatioData,
      sortedDataIndex: number,
      sortedDataArray: SentimentRatioData[]
    ) => {
      const currentDate = getDateOnly(sortedDataItem.date);
      const [year, month] = currentDate.split('-');

      // Skip first 20 points to avoid labels on the left edge
      const skipInitialLabels = sortedDataIndex < 20;

      // Find the first date for this month
      const isFirstDateOfMonth =
        !skipInitialLabels &&
        sortedDataArray.findIndex((dateItem) => {
          const [itemYear, itemMonth] = getDateOnly(dateItem.date).split('-');
          return itemYear === year && itemMonth === month;
        }) === sortedDataIndex;

      return { ...sortedDataItem, isFirstTickMonthlyLabel: isFirstDateOfMonth };
    }
  );
};

const GoldSentimentRatioChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'3M' | '6M'>('3M');
  const backendApiUrl = import.meta.env.VITE_BACKEND_API;

  // Use React Query to fetch data
  const {
    data: goldSentimentRatioData,
    isLoading,
    error,
  } = useQuery<SentimentRatioData[], Error>({
    queryKey: ['gold-sentiment-ratio', timeframe],
    queryFn: () => fetchGoldSentimentRatioData(timeframe, backendApiUrl),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div className="flex flex-col items-end gap-2"></div>
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2">
          <h2>Sentiment Ratio</h2>
          {import.meta.env.VITE_TOOLTIPS === 'true' && (
            <SentimentRatioTooltips />
          )}
        </div>
        <div>
          <SegmentedControl
            value={timeframe}
            onChange={(value) => setTimeframe(value as '3M' | '6M')}
            segments={[
              { value: '3M', label: '3M' },
              { value: '6M', label: '6M' },
            ]}
            className="bg-[#030816]"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={goldSentimentRatioData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke="#121623" />
          <XAxis
            dataKey="date"
            tickFormatter={(date: string, index: number): string => {
              const currentDate = new Date(date);
              const options: Intl.DateTimeFormatOptions = {
                month: 'short',
                year: 'numeric',
              };

              const isFirstTickMonthlyLabel =
                goldSentimentRatioData &&
                goldSentimentRatioData[index]?.isFirstTickMonthlyLabel;
              if (isFirstTickMonthlyLabel) {
                return currentDate.toLocaleDateString('en-US', options);
              }
              return '';
            }}
            interval={0}
            stroke="#20293A"
            tick={{ fill: '#A1A1AA' }}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            ticks={[20, 30, 40, 50, 60]}
            stroke="#121623"
            tick={{ fill: '#A1A1AA' }}
          />
          <Tooltip
            content={({ payload: contentSentimentRatio, label }) => {
              if (!contentSentimentRatio || !contentSentimentRatio.length)
                return null;
              const formattedLabel = new Date(label).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }
              );

              return (
                <div
                  style={{
                    backgroundColor: '#060a16',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #444',
                    color: 'white',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      marginBottom: '5px',
                      color: 'white',
                    }}
                  >
                    {formattedLabel}
                  </div>

                  {contentSentimentRatio.map((contentSentimentData) => (
                    <div
                      key={contentSentimentData.name}
                      style={{ marginBottom: '5px' }}
                    >
                      <div
                        key={contentSentimentData.name}
                        style={{ marginBottom: '5px' }}
                      >
                        <span
                          style={{
                            color:
                              contentSentimentData.name === 'Sentiment Ratio'
                                ? '#2662D9'
                                : 'white',
                          }}
                        >
                          {contentSentimentData.name}
                        </span>{' '}
                        <span
                          style={{
                            color:
                              contentSentimentData.name === 'Sentiment Ratio'
                                ? '#2662D9'
                                : 'white',
                          }}
                        >
                          :
                        </span>{' '}
                        <span
                          style={{
                            color:
                              contentSentimentData.name === 'Sentiment Ratio'
                                ? '#2662D9'
                                : 'white',
                          }}
                        >
                          {Number(contentSentimentData.value).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              paddingBottom: '20px',
              color: '#ffffff',
            }}
          />
          <Line
            type="monotone"
            dataKey="sentiment_ratio"
            stroke="#2662D9"
            dot={false}
            name="Sentiment Ratio"
            strokeWidth={1}
          />
          <Line
            type="monotone"
            dataKey="upper_band"
            stroke="#ffffff"
            dot={false}
            name="Upper Band"
            strokeWidth={1}
          />
          <Brush
            dataKey="date"
            height={30}
            stroke="#20293A"
            travellerWidth={5}
            fill="#040B1C"
            tickFormatter={(date: string) => {
              return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoldSentimentRatioChart;
