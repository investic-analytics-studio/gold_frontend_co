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
import { useQuery } from '@tanstack/react-query';

interface GoldSentimentAggregateHourly {
  datetime: string;
  negative: number;
  neutral: number;
  positive: number;
  net: number;
  gold_price: number | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  rolling_net_hourly: number;
  isFirstTickMonthlyLabel?: boolean;
}

// Fetch function
const fetchNetSentimentAndGoldPriceHourlyData = async (
  backendApiUrl: string
): Promise<GoldSentimentAggregateHourly[]> => {
  const response = await axios.get(
    `${backendApiUrl}/gold-sentiment-aggregate-hourly`
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
    (item: GoldSentimentAggregateHourly) => {
      const utcDate = new Date(item.datetime);
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

      // Create the datetime string in ISO format with Bangkok timezone
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
      )}T${hours}:${minutes}:${seconds}+07:00`;

      return {
        ...item,
        datetime: formattedDate,
      };
    }
  );

  // Get today's date and 3 months ago
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  // Filter data for the last 3 months
  const getThreeMonthsData = convertedDateTime.filter(
    (convertedDateTimeItem: GoldSentimentAggregateHourly) => {
      const itemDate = new Date(convertedDateTimeItem.datetime);
      return itemDate >= threeMonthsAgo && itemDate <= today;
    }
  );

  const getDateOnly = (dateString: string) => dateString.split('T')[0];

  const monthlyLabels = getThreeMonthsData.map(
    (
      threeMonthsDataItem: GoldSentimentAggregateHourly,
      threeMonthsDataIndex: number,
      threeMonthsDataArray: GoldSentimentAggregateHourly[]
    ) => {
      const currentDate = getDateOnly(threeMonthsDataItem.datetime);
      const [year, month] = currentDate.split('-');

      // Skip first 20 points to avoid labels on the left edge
      const skipInitialLabels = threeMonthsDataIndex < 20;

      // Find the first datetime for this month
      const isFirstDateOfMonth =
        !skipInitialLabels &&
        threeMonthsDataArray.findIndex((dateItem) => {
          const [itemYear, itemMonth] = getDateOnly(dateItem.datetime).split(
            '-'
          );
          return itemYear === year && itemMonth === month;
        }) === threeMonthsDataIndex;

      return {
        ...threeMonthsDataItem,
        isFirstTickMonthlyLabel: isFirstDateOfMonth,
      };
    }
  );

  return monthlyLabels.filter(
    (item: GoldSentimentAggregateHourly) =>
      item.gold_price !== null && item.gold_price !== undefined
  );
};

const NetSentimentAndGoldPriceOneHour: React.FC = () => {
  const backendApiUrl = import.meta.env.VITE_BACKEND_API;

  // Use React Query to fetch data
  const {
    data: NetsentimentHourlyData,
    isLoading,
    error,
  } = useQuery<GoldSentimentAggregateHourly[], Error>({
    queryKey: ['net-sentiment-gold-price-hourly'],
    queryFn: () => fetchNetSentimentAndGoldPriceHourlyData(backendApiUrl),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="pb-0 pt-10 px-6" style={{ width: '100%', height: 400 }}>
      <h2 className="text-[#FAFAFA] text-[16px] font-medium">
        Net Sentiment Analysis and GOLD Price
      </h2>
      {/* <div className="text-[#A1A1AA] text-[14px]">1H Rolling (24)</div> */}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={800}
          height={500}
          data={NetsentimentHourlyData}
          margin={{ top: 50, right: 30, bottom: 30, left: 30 }}
        >
          <CartesianGrid stroke="#121623" vertical={false} />
          <XAxis
            dataKey="datetime"
            tickFormatter={(datetime: string, index: number): string => {
              const currentDate = new Date(datetime);
              const options: Intl.DateTimeFormatOptions = {
                month: 'short',
                year: 'numeric',
              };

              const isFirstTickMonthlyLabel =
                NetsentimentHourlyData &&
                NetsentimentHourlyData[index]?.isFirstTickMonthlyLabel;
              if (isFirstTickMonthlyLabel) {
                return currentDate.toLocaleDateString('en-US', options);
              }
              return '';
            }}
            interval={0}
            stroke="#20293A"
            tick={{ fill: '#A1A1AA' }}
            label={{
              value: 'Date',
              position: 'insideBottom',
              offset: -10,
              fill: '#A1A1AA',
            }}
          />
          <YAxis
            yAxisId="left"
            stroke="#121623"
            label={{
              value: 'Net Sentiment',
              angle: -90,
              position: 'insideLeft',
              fill: '#A1A1AA',
              dx: -10,
            }}
            tick={{ fill: '#A1A1AA' }}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            yAxisId="right"
            stroke="#121623"
            orientation="right"
            label={{
              value: 'GOLD Price',
              angle: -90,
              position: 'insideRight',
              fill: '#A1A1AA',
              dx: 10,
            }}
            tick={{ fill: '#A1A1AA' }}
            domain={[
              (dataMin: number) => Math.floor(dataMin / 10) * 10,
              (dataMax: number) => Math.ceil(dataMax / 10) * 10,
            ]}
          />
          <Tooltip
            content={({ payload: contentSentimentPriceHour, label }) => {
              if (
                !contentSentimentPriceHour ||
                !contentSentimentPriceHour.length
              )
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

                  {contentSentimentPriceHour.map(
                    (contentSentimentPriceHourData) => (
                      <div
                        key={contentSentimentPriceHourData.name}
                        style={{ marginBottom: '5px' }}
                      >
                        <div
                          key={contentSentimentPriceHourData.name}
                          style={{ marginBottom: '5px' }}
                        >
                          <span
                            style={{
                              color:
                                contentSentimentPriceHourData.name ===
                                'Net Sentiment 1H'
                                  ? '#2662D9'
                                  : 'white',
                            }}
                          >
                            {contentSentimentPriceHourData.name}
                          </span>{' '}
                          <span
                            style={{
                              color:
                                contentSentimentPriceHourData.name ===
                                'Net Sentiment 1H'
                                  ? '#2662D9'
                                  : 'white',
                            }}
                          >
                            :
                          </span>{' '}
                          <span
                            style={{
                              color:
                                contentSentimentPriceHourData.name ===
                                'Net Sentiment 1H'
                                  ? '#2662D9'
                                  : 'white',
                            }}
                          >
                            {contentSentimentPriceHourData.name ===
                            'GOLD Price 1H'
                              ? Number(
                                  contentSentimentPriceHourData.value
                                ).toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })
                              : contentSentimentPriceHourData.value}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              );
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              paddingBottom: '10px',
              color: '#ffffff',
            }}
          />

          {/* Net Sentiment */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="rolling_net_hourly"
            stroke="#2662D9"
            strokeWidth={2}
            name="Net Sentiment 1H"
            dot={false}
          />

          {/* Gold Price */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gold_price"
            stroke="#FFFFFF"
            strokeWidth={1}
            name="GOLD Price 1H"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetSentimentAndGoldPriceOneHour;
