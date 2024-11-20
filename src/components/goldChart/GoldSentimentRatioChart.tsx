import React, { useEffect, useState } from 'react';
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

interface SentimentRatioData {
  date: string;
  sentiment_ratio: number;
  upper_band: number;
  isFirstTickMonthlyLabel?: boolean;
}

const GoldSentimentRatioChart: React.FC = () => {
  const [data, setData] = useState<SentimentRatioData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SentimentRatioData[]>(
          'http://localhost:8080/gold-sentiment-ratio-graph-plot'
        );

        const sortedData = response.data.sort((a, b) => {
          const previousDate = new Date(a.date).getTime();
          const nextDate = new Date(b.date).getTime();
          return previousDate - nextDate;
        });

        const formattedData = sortedData.map((item, index, array) => {
          const currentDate = new Date(item.date);
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();

          const isFirstTickMonthlyLabel =
            currentDate.getDate() === 1 &&
            array.findIndex(
              (entry) =>
                new Date(entry.date).getMonth() === currentMonth &&
                new Date(entry.date).getFullYear() === currentYear &&
                new Date(entry.date).getDate() === 1
            ) === index;

          return { ...item, isFirstTickMonthlyLabel };
        });

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h2 style={{ color: 'white', padding: '20px', margin: 0 }}>
        Sentiment Ratio
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} stroke="#444" />
          <XAxis
            dataKey="date"
            tickFormatter={(date: string, index: number): string => {
              const currentDate = new Date(date);
              const options: Intl.DateTimeFormatOptions = {
                month: 'short',
                year: 'numeric',
              };

              const isFirstTickMonthlyLabel =
                data[index]?.isFirstTickMonthlyLabel;
              if (isFirstTickMonthlyLabel) {
                return currentDate.toLocaleDateString('en-US', options);
              }
              return '';
            }}
            interval={0}
            stroke="#ffffff"
            tick={{ fill: 'white' }}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            ticks={[20, 30, 40, 50, 60]}
            stroke="#ffffff"
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
                                ? '#ff7f7f'
                                : 'white',
                          }}
                        >
                          {contentSentimentData.name}
                        </span>{' '}
                        <span
                          style={{
                            color:
                              contentSentimentData.name === 'Sentiment Ratio'
                                ? '#ff7f7f'
                                : 'white',
                          }}
                        >
                          :
                        </span>{' '}
                        <span
                          style={{
                            color:
                              contentSentimentData.name === 'Sentiment Ratio'
                                ? '#ff7f7f'
                                : 'white',
                          }}
                        >
                          {contentSentimentData.name === 'Upper Band'
                            ? Number(contentSentimentData?.value).toFixed(2)
                            : contentSentimentData?.value}
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
            stroke="#ff7f7f"
            dot={false}
            name="Sentiment Ratio"
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="upper_band"
            stroke="#ffffff"
            dot={false}
            name="Upper Band"
            strokeWidth={1.5}
          />
          <Brush
            dataKey="date"
            height={30}
            stroke="#666"
            startIndex={Math.floor(data.length / 2)}
            endIndex={data.length - 1}
            travellerWidth={10}
            fill="#1a1a1a"
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
