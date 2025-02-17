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
import { useQuery } from '@tanstack/react-query';
import { NetSentimentAnalysisTooltips } from '../tooltips/NetSentimentDesc';

interface GoldSentimentAggregateDaily {
  date: string;
  negative: number;
  neutral: number;
  positive: number;
  isFirstTickMonthlyLabel?: boolean;
}

// Fetch data function
const fetchGoldSentimentdailyData = async (
  backendApiUrl: string
): Promise<GoldSentimentAggregateDaily[]> => {
  const response = await axios.get(
    `${backendApiUrl}/gold-sentiment-aggregate-daily`
  );

  // Get today's date and 3 months ago
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // Filter data for the last 3 months
  const getThreeMonthsData = response.data.filter(
    (convertedDateTimeItem: GoldSentimentAggregateDaily) => {
      const itemDate = new Date(convertedDateTimeItem.date);
      return itemDate >= threeMonthsAgo && itemDate <= today;
    }
  );

  const getDateOnly = (dateString: string) => dateString.split('T')[0];

  return getThreeMonthsData.map(
    (
      threeMonthsDataItem: GoldSentimentAggregateDaily,
      threeMonthsDataIndex: number,
      threeMonthsDataArray: GoldSentimentAggregateDaily[]
    ) => {
      const currentDate = getDateOnly(threeMonthsDataItem.date);
      const [year, month] = currentDate.split('-');

      // Skip first 6 points to avoid labels on the left edge
      const skipInitialLabels = threeMonthsDataIndex < 6;

      // Find the first date for this month
      const isFirstDateOfMonth =
        !skipInitialLabels &&
        threeMonthsDataArray.findIndex((dateItem) => {
          const [itemYear, itemMonth] = getDateOnly(dateItem.date).split('-');
          return itemYear === year && itemMonth === month;
        }) === threeMonthsDataIndex;

      return {
        ...threeMonthsDataItem,
        isFirstTickMonthlyLabel: isFirstDateOfMonth,
      };
    }
  );
};

const GoldSentimentChart: React.FC = () => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API;

  // Use React Query to fetch data
  const {
    data: goldSentimentData,
    isLoading,
    error,
  } = useQuery<GoldSentimentAggregateDaily[], Error>({
    queryKey: ['gold-sentiment-analysis'],
    queryFn: () => fetchGoldSentimentdailyData(backendApiUrl),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="pb-0 pt-6 px-6" style={{ width: '100%', height: 400 }}>
      <div className="flex items-center gap-2">
        <h2 className="text-[#FAFAFA] text-[16px] font-medium">
          Sentiment Analysis (Total)
        </h2>
        {import.meta.env.VITE_TOOLTIPS === 'true' && (
          <NetSentimentAnalysisTooltips />
        )}
      </div>

      {/* <div className="text-[#A1A1AA] text-[14px]">Lorem Ipsum</div> */}
      <ResponsiveContainer width="100%" height="100%" className="mt-8">
        <BarChart
          data={goldSentimentData}
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
                goldSentimentData &&
                goldSentimentData[index]?.isFirstTickMonthlyLabel;
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
