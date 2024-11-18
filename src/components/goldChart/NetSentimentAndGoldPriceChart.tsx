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

interface DataPoint {
  date: string;
  netSentiment: number;
  goldPrice: number | null;
}

const NetSentimentChart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataPoint[]>(
          'http://localhost:8080/gold-sentiment-aggregate-hourly'
        );

        const formattedData = response.data.data
          .filter((item: any) => item.gold_price !== null) // กรอง gold_price ที่ไม่ใช่ null
          .map((item: any) => ({
            date: new Date(item.date).toISOString().substring(0, 10), // YYYY-MM-DD
            netSentiment: item.rolling_net_hourly, //use rolling_net_hourly as Net Sentiment
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
            tick={{ fill: 'white' }}
            label={{
              value: 'Date',
              position: 'insideBottomRight',
              offset: -5,
              fill: 'white',
            }}
          />
          {/* แกน Y สำหรับ Bar Chart */}
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
          {/* แกน Y สำหรับ Bar Chart */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="white"
            domain={[
              (dataMin: number) => Math.floor(dataMin / 10) * 10, // ปัดลง
              (dataMax: number) => Math.ceil(dataMax / 10) * 10, // ปัดขึ้น
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
            formatter={(value: any, name: string) => {
              if (name === 'goldPrice') {
                return [parseFloat(value).toFixed(2), 'Gold Price'];
              }
              return value;
            }}
            labelStyle={{ color: 'white' }}
            itemStyle={{ color: 'white' }}
          />
          <Legend layout="horizontal" verticalAlign="top" align="center" />

          {/* Net Sentiment (Bar Chart) */}
          <Bar yAxisId="left" dataKey="netSentiment" barSize={20}>
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
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetSentimentChart;
