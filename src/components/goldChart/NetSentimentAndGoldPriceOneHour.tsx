import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const NetSentimentAndGoldPriceOneHour: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/gold-sentiment-aggregate-hourly'
        );

        const formattedData = response.data
          .filter((item: any) => item.gold_price !== null)
          .map((item: any) => ({
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
      <h2 style={{ color: 'white' }}>Net Sentiment Analysis and GOLD Price</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={800}
          height={500}
          data={data}
          margin={{ top: 50, right: 30, bottom: 30, left: 30 }}
        >
          <CartesianGrid stroke="#444" vertical={false} />
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
              offset: -10,
              fill: 'white',
            }}
          />
          <YAxis
            yAxisId="left"
            label={{
              value: 'Net Sentiment',
              angle: -90,
              position: 'insideLeft',
              fill: 'white',
              dx: -10,
            }}
            tick={{ fill: 'white' }}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              value: 'GOLD Price',
              angle: -90,
              position: 'insideRight',
              fill: 'white',
              dx: 10,
            }}
            tick={{ fill: 'white' }}
            domain={[
              (dataMin: number) => Math.floor(dataMin / 10) * 10,
              (dataMax: number) => Math.ceil(dataMax / 10) * 10,
            ]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#060a16',
              borderRadius: '10px',
              border: '1px solid #444',
            }}
            labelStyle={{ color: 'white' }}
            itemStyle={{ color: 'white' }}
            labelFormatter={(label: string | number) => {
              const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              };
              return new Date(label).toLocaleDateString('en-US', options);
            }}
            formatter={(value, name) => {
              if (name === 'goldPrice') {
                return [parseFloat(value as string).toFixed(2), 'GOLD Price'];
              }
              return [String(value), 'Net Sentiment'];
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{ marginBottom: 20 }}
          />

          {/* Net Sentiment */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="netSentiment"
            stroke="#636ef3"
            strokeWidth={2}
            name="Net Sentiment 1H Rolling (24)"
            dot={false}
          />

          {/* Gold Price */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="goldPrice"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth={2}
            name="GOLD Price 1H"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetSentimentAndGoldPriceOneHour;
