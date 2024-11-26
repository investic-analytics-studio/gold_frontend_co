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
  isFirstTickMonthlyLabel?: boolean;
}

const GoldSentimentChart: React.FC = () => {
  const [data, setData] = useState<GoldSentimentAggregateDaily[]>([]);
  const backendApiUrl = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<GoldSentimentAggregateDaily[]>(
          backendApiUrl + '/gold-sentiment-aggregate-daily'
        );

        // Convert to Asia/Bangkok timezone
        const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Bangkok',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        // Converted Bangkok time zone
        const convertedDateTime = response.data.map((item) => {
          const utcDate = new Date(item.date);
          const bangkokTime = dateTimeFormatter.format(utcDate);

          // Convert to ISO format for the chart
          const [datePart, timePart] = bangkokTime.split(', ');
          const [month, day, year] = datePart.split('/');

          // Remove the AM/PM part and convert to 24-hour format
          const [time, timePeriod] = timePart.split(' ');
          let [hours, minutes, seconds] = time.split(':');
          if (timePeriod === 'PM' && hours !== '12') {
            hours = String(Number(hours) + 12);
          } else if (timePeriod === 'AM' && hours === '12') {
            hours = '00';
          }

          // Create the date string in ISO format with Bangkok timezone
          const formattedDate = `${year}-${month.padStart(
            2,
            '0'
          )}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}+07:00`;

          return {
            ...item,
            date: formattedDate,
          };
        });

        // Get today's date and 3 months ago
        const today = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);

        // Filter data for the last 3 months
        const getThreeMonthsData = convertedDateTime.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= threeMonthsAgo && itemDate <= today;
        });

        const getDateOnly = (dateString: string) => dateString.split('T')[0];

        const formattedData = getThreeMonthsData.map((item, index, array) => {
          const currentDate = getDateOnly(item.date);
          const [year, month] = currentDate.split('-');

          // Skip first 6 points to avoid labels on the left edge
          const skipInitialLabels = index < 6;

          // Find the first date for this month
          const isFirstDateOfMonth =
            !skipInitialLabels &&
            array.findIndex((dateItem) => {
              const [itemYear, itemMonth] = getDateOnly(dateItem.date).split(
                '-'
              );
              return itemYear === year && itemMonth === month;
            }) === index;

          return { ...item, isFirstTickMonthlyLabel: isFirstDateOfMonth };
        });
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pb-0 pt-6 px-6" style={{ width: '100%', height: 400 }}>
      <h2 className="text-[#FAFAFA] text-[16px] font-medium">
        Sentiment Analysis (Gold)
      </h2>
      {/* <div className="text-[#A1A1AA] text-[14px]">Lorem Ipsum</div> */}
      <ResponsiveContainer width="100%" height="100%" className="mt-8">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#121623" horizontal={true} vertical={false} />
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
            stroke="#20293A"
            tick={{ fill: '#A1A1AA' }}
          />
          <YAxis
            tick={{ fill: '#A1A1AA' }}
            stroke="#121623"
            label={{
              value: 'Number of News',
              angle: -90,
              position: 'insideLeft',
              fill: '#A1A1AA',
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
                              ? '#F23645'
                              : entry.dataKey === 'neutral'
                              ? '#E8C930'
                              : entry.dataKey === 'positive'
                              ? '#2662D9'
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
