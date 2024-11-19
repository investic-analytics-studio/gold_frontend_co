import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Cell,
  ResponsiveContainer,
} from 'recharts';

// API Response Type
interface GoldSentimentAggregateHourly {
  datetime: string; // ISO string from time.Time
  negative: number;
  neutral: number;
  positive: number;
  net: number;
  gold_price: number | null;
  created_at: string; // ISO string from time.Time
  updated_at: string; // ISO string from time.Time
  deleted_at: string | null; // ISO string from time.Time
  rolling_net_hourly: number;
}

// Chart Data Type
interface GoldSentimentAggregateDataPoint {
  date: string;
  netSentiment: number;
  goldPrice: number | null;
}

const NetSentimentAndGoldPriceChart: React.FC = () => {
  const [data, setData] = useState<GoldSentimentAggregateDataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<GoldSentimentAggregateHourly[]>(
          'http://localhost:8080/gold-sentiment-aggregate-hourly'
        );

        const formattedData = response.data
          .filter((item) => item.gold_price !== null)
          .map((item) => ({
            date: new Date(item.datetime).toISOString().substring(0, 10),
            netSentiment: item.rolling_net_hourly,
            goldPrice: item.gold_price,
          }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2 style={{ color: 'white' }}>Net Sentiment Analysis and Gold Price</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
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
              return '';
            }}
            interval={0}
            tick={{ fill: 'white' }}
            label={{
              value: 'Date',
              position: 'insideBottom',
              offset: -5,
              fill: 'white',
            }}
          />
          {/* Left Y Axis Bar Chart */}
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="white"
            domain={['dataMin', 'dataMax']}
            tick={{ fill: 'white' }}
            label={{
              value: 'Net Sentiment',
              angle: -90,
              position: 'insideLeft',
              fill: 'white',
            }}
          />
          {/* Right Y Axis Bar Chart */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="white"
            domain={[
              (dataMin: number) => Math.floor(dataMin / 10) * 10,
              (dataMax: number) => Math.ceil(dataMax / 10) * 10,
            ]}
            tick={{ fill: 'white' }}
            label={{
              value: 'GOLD Price',
              angle: -90,
              position: 'insideLeft',
              fill: 'white',
              dx: 70,
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
            formatter={(value: number, name: string) => {
              if (name === 'GOLD Price') {
                return [`$${value.toFixed(2)}`, 'Gold Price'];
              }
              return [value.toFixed(2), 'Net Sentiment'];
            }}
            labelStyle={{ color: 'white' }}
            itemStyle={{ color: 'white' }}
          />
          <Legend layout="horizontal" verticalAlign="top" align="center" />

          {/* Net Sentiment (Bar Chart) */}
          <Bar
            yAxisId="left"
            dataKey="netSentiment"
            barSize={20}
            name="Net Sentiment"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.netSentiment > 0 ? '#233727' : '#3f1a1a'}
              />
            ))}
          </Bar>

          {/* Gold Price (Line Chart) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="goldPrice"
            stroke="white"
            strokeWidth={2}
            name="GOLD Price"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetSentimentAndGoldPriceChart;
