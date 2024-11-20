import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface GoldSentimentAggregateDaily {
  date: string;
  negative: number;
  neutral: number;
  positive: number;
}

const GoldSentimentChart: React.FC = () => {
  const [data, setData] = useState<GoldSentimentAggregateDaily[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<GoldSentimentAggregateDaily[]>(
          'http://localhost:8080/gold-sentiment-aggregate-daily'
        );

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='pb-0 pt-6 px-6' style={{ width: '100%', height: 400 }}>
      <h2 className='text-[#FAFAFA] text-[16px] font-medium'>Sentiment Analysis (Gold)</h2>
      <div className="text-[#A1A1AA] text-[14px]">Lorem Ipsum</div>
      <ResponsiveContainer width="100%" height="100%" className="mt-8">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#444" horizontal={true} vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(date: string | number, index: number): string => {
              const dataLength = data.length;
              const middleIndex = Math.floor(dataLength / 2);
              if (index === middleIndex) {
                return new Date(date).getFullYear().toString();
              }
              return ''; // hide other tick
            }}
            tick={{ fill: 'white' }}
            label={{
              value: 'Date',
              position: 'insideBottomRight',
              offset: -5,
              fill: 'white',
            }}
          />
          <YAxis
            tick={{ fill: 'white' }}
            label={{
              value: 'Number of News',
              angle: -90,
              position: 'insideLeft',
              fill: 'white',
            }}
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div
                    style={{
                      backgroundColor: '#060a16',
                      border: '1px solid #444',
                      borderRadius: '5px',
                      padding: '10px',
                    }}
                  >
                    <p style={{ color: 'white', margin: '0 0 8px 0' }}>
                      {new Date(label).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    {payload.map((entry) => (
                      <p
                        key={entry.dataKey}
                        style={{
                          color:
                            entry.dataKey === 'negative'
                              ? 'red'
                              : entry.dataKey === 'neutral'
                              ? 'yellow'
                              : entry.dataKey === 'positive'
                              ? 'green'
                              : 'white',
                          margin: '4px 0',
                        }}
                      >
                        {entry.name}: {entry.value}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Bar dataKey="negative" stackId="a" fill="#F23645" name="Negative" />
          <Bar dataKey="neutral" stackId="a" fill="#E8C930" name="Neutral" />
          <Bar dataKey="positive" stackId="a" fill="#2662D9" name="Positive" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoldSentimentChart;
