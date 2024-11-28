import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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

interface GoldSentimentAggregatedaily {
  date: string;
  negative: number;
  neutral: number;
  positive: number;
  net: number;
  gold_price: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  isFirstTickMonthlyLabel?: boolean;
}

// Fetch function
const fetchNetSentimentAndGoldPriceData = async (
  backendApiUrl: string
): Promise<GoldSentimentAggregatedaily[]> => {
  const response = await axios.get(
    `${backendApiUrl}/gold-sentiment-aggregate-daily`
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
  const convertedDateTime = response.data.map(
    (netSentimentAndGoldPriceItem: GoldSentimentAggregatedaily) => {
      const utcDate = new Date(netSentimentAndGoldPriceItem.date);
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
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
      )}T${hours}:${minutes}:${seconds}+07:00`;

      return {
        ...netSentimentAndGoldPriceItem,
        date: formattedDate,
      };
    }
  );

  // Get today's date and 3 months ago
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // Filter data for the last 3 months
  const getThreeMonthsData = convertedDateTime.filter(
    (convertedDateTimeItem: GoldSentimentAggregatedaily) => {
      const itemDate = new Date(convertedDateTimeItem.date);
      return itemDate >= threeMonthsAgo && itemDate <= today;
    }
  );

  const getDateOnly = (dateString: string) => dateString.split('T')[0];

  const monthlyLabels = getThreeMonthsData.map(
    (
      threeMonthsDataItem: GoldSentimentAggregatedaily,
      threeMonthsDataIndex: number,
      threeMonthsDataArray: GoldSentimentAggregatedaily[]
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

  return monthlyLabels.filter(
    (item: GoldSentimentAggregatedaily) => item.gold_price !== null
  );
};

const NetSentimentAndGoldPriceChart: React.FC = () => {
  // const [data, setData] = useState<GoldSentimentAggregateDataPoint[]>([]);
  const backendApiUrl = import.meta.env.VITE_BACKEND_API;

  const {
    data: NetSentimentDailyData,
    isLoading,
    error,
  } = useQuery<GoldSentimentAggregatedaily[], Error>({
    queryKey: ['net-sentiment-gold-price-daily'],
    queryFn: () => fetchNetSentimentAndGoldPriceData(backendApiUrl),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="pb-0 pt-10 px-6" style={{ width: '100%', height: 400 }}>
      <h2 className="text-[#FAFAFA] text-[16px] font-medium">
        Net Sentiment Analysis and Gold Price
      </h2>
      {/* <div className="text-[#A1A1AA] text-[14px]">24H Rolling (24)</div> */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={NetSentimentDailyData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
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
                NetSentimentDailyData &&
                NetSentimentDailyData[index]?.isFirstTickMonthlyLabel;
              if (isFirstTickMonthlyLabel) {
                return currentDate.toLocaleDateString('en-US', options);
              }
              return '';
            }}
            interval={0}
            tick={{ fill: '#A1A1AA' }}
            stroke="#20293A"
            label={{
              value: 'Date',
              position: 'insideBottom',
              offset: -10,
              fill: '#A1A1AA',
            }}
          />
          {/* Left Y Axis Bar Chart */}
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#121623"
            domain={['dataMin', 'dataMax']}
            tick={{ fill: '#A1A1AA' }}
            label={{
              value: 'Net Sentiment',
              angle: -90,
              position: 'insideLeft',
              fill: '#A1A1AA',
            }}
          />
          {/* Right Y Axis Bar Chart */}
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#121623"
            domain={[
              (dataMin: number) => Math.floor(dataMin / 10) * 10,
              (dataMax: number) => Math.ceil(dataMax / 10) * 10,
            ]}
            tick={{ fill: '#A1A1AA' }}
            label={{
              value: 'GOLD Price',
              angle: -90,
              position: 'insideLeft',
              fill: '#A1A1AA',
              dx: 60,
            }}
          />
          <Tooltip
            content={({ payload: contentSentimentPrice, label }) => {
              if (!contentSentimentPrice || !contentSentimentPrice.length)
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

                  {contentSentimentPrice.map((contentSentimentPriceData) => (
                    <div
                      key={contentSentimentPriceData.name}
                      style={{ marginBottom: '5px' }}
                    >
                      <div
                        key={contentSentimentPriceData.name}
                        style={{ marginBottom: '5px' }}
                      >
                        <span
                          style={{
                            color:
                              contentSentimentPriceData.name === 'Net Sentiment'
                                ? Number(contentSentimentPriceData.value) <= 0
                                  ? '#F23645'
                                  : '#2662D9'
                                : 'white',
                          }}
                        >
                          {contentSentimentPriceData.name}
                        </span>{' '}
                        <span
                          style={{
                            color:
                              contentSentimentPriceData.name === 'Net Sentiment'
                                ? Number(contentSentimentPriceData.value) <= 0
                                  ? '#F23645'
                                  : '#2662D9'
                                : 'white',
                          }}
                        >
                          :
                        </span>{' '}
                        <span
                          style={{
                            color:
                              contentSentimentPriceData.name === 'Net Sentiment'
                                ? Number(contentSentimentPriceData.value) <= 0
                                  ? '#F23645'
                                  : '#2662D9'
                                : 'white',
                          }}
                        >
                          {contentSentimentPriceData.name === 'GOLD Price'
                            ? Number(
                                contentSentimentPriceData.value
                              ).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            : contentSentimentPriceData.value}
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

          {/* Net Sentiment (Bar Chart) */}
          <Bar yAxisId="left" dataKey="net" barSize={20} name="Net Sentiment">
            {NetSentimentDailyData?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.net > 0 ? '#2662D9' : '#F23645'}
              />
            ))}
          </Bar>

          {/* Gold Price (Line Chart) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gold_price"
            stroke="#FAFAFA"
            strokeWidth={1}
            name="GOLD Price"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetSentimentAndGoldPriceChart;
