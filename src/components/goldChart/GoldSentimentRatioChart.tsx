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
  const [timeframe, setTimeframe] = useState<'3M' | '6M'>('3M');
  const backendApiUrl = import.meta.env.VITE_BACKEND_API;
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SentimentRatioData[]>(
          backendApiUrl + `/gold-sentiment-ratio-graph-plot/${timeframe}`
        );

        const sortedData = response.data.sort((a, b) => {
          const previousDate = new Date(a.date).getTime();
          const nextDate = new Date(b.date).getTime();
          return previousDate - nextDate;
        });

        const getDateOnly = (dateString: string) => dateString.split('T')[0];

        const formattedData = sortedData.map((item, index, array) => {
          const currentDate = getDateOnly(item.date);

          const isFirstTickMonthlyLabel =
            currentDate.endsWith('-01') &&
            array.findIndex(
              (dateItem) => getDateOnly(dateItem.date) === currentDate
            ) === index;

          return { ...item, isFirstTickMonthlyLabel };
        });

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [timeframe]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div className="flex flex-col items-end gap-2">
        <h2>Timeframe</h2>
        <div className="border border-[#172036] rounded-md p-1 hover:cursor-pointer">
          <button
            onClick={() => setTimeframe('3M')}
            className={`${
              timeframe === '3M' ? 'bg-[#172036] text-white' : ''
            } px-5 py-2 rounded-md hover:text-white`}
          >
            3M
          </button>
          <button
            onClick={() => setTimeframe('6M')}
            className={`${
              timeframe === '6M' ? 'bg-[#172036] text-white' : ''
            } px-5 py-2 rounded-md  hover:text-white`}
          >
            6M
          </button>
        </div>
      </div>
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
