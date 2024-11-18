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

        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2 style={{ color: 'white' }}>Sentiment Analysis (Gold)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#444" />
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
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#060a16',
              borderColor: '#444',
              borderRadius: '5px',
            }}
            labelFormatter={(label: string | number) => {
              const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              };
              return new Date(label).toLocaleDateString('en-US', options);
            }}
            labelStyle={{ color: 'white' }}
            itemStyle={{ color: 'white' }}
          />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Bar dataKey="negative" stackId="a" fill="red" name="Negative" />
          <Bar dataKey="neutral" stackId="a" fill="yellow" name="Neutral" />
          <Bar dataKey="positive" stackId="a" fill="green" name="Positive" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoldSentimentChart;
