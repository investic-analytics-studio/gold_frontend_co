// import CryptoCards from "@/components/CryptoCards";

import { Toaster } from "@/components/ui/toaster";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";

// TICKERS array remains the same as in your provided code

// const TICKERS = [
//   "BTCUSDT",
//   "ETHUSDT",
//   "SOLUSDT",
//   "BNBUSDT",
//   "XRPUSDT",
//   "ADAUSDT",
//   "AVAXUSDT",
//   "LINKUSDT",
//   "TRXUSDT",
//   "DOTUSDT",
//   // "MATICUSDT",
//   "ICPUSDT",
//   "BCHUSDT",
//   "LTCUSDT",
//   "IMXUSDT",
//   "ATOMUSDT",
//   "ETCUSDT",
//   "APTUSDT",
//   "OPUSDT",
//   "ARBUSDT",
//   "STXUSDT",
//   "ALTUSDT",
//   "VETUSDT",
//   "NEARUSDT",
//   "TIAUSDT",
//   "SUIUSDT",
//   "APEUSDT",
//   "DYDXUSDT",
//   "XLMUSDT",
//   "INJUSDT",
//   "DOGEUSDT",
//   "SHIBUSDT",
//   "PEPEUSDT",
//   "BONKUSDT",
//   "AIUSDT",
//   "JUPUSDT",
//   "BAKEUSDT",
//   "MEMEUSDT",
//   "CYBERUSDT",
//   "XAIUSDT",
//   "ONEUSDT",
//   "RUNEUSDT",
//   "UNIUSDT",
//   "NTRNUSDT",
//   "GASUSDT",
//   "FILUSDT",
//   "LDOUSDT",
//   "HBARUSDT",
//   "SEIUSDT",
//   "RNDRUSDT",
//   "MKRUSDT",
//   "GRTUSDT",
//   "EGLDUSDT",
//   "AAVEUSDT",
//   "ALGOUSDT",
//   "ORDIUSDT",
//   "QNTUSDT",
//   "MINAUSDT",
//   "FLOWUSDT",
//   "FTMUSDT",
//   "1000SATSUSDT",
//   "SANDUSDT",
//   "THETAUSDT",
//   "AXSUSDT",
//   "ASTRUSDT",
//   "SNXUSDT",
//   "XTZUSDT",
//   "CHZUSDT",
//   "MANTAUSDT",
//   "FTTUSDT",
//   "MANAUSDT",
//   "CFXUSDT",
//   "OSMOUSDT",
//   "BLURUSDT",
//   "KAVAUSDT",
//   "EOSUSDT",
//   "NEOUSDT",
//   "FXSUSDT",
//   "IOTAUSDT",
//   "ROSEUSDT",
//   "WOOUSDT",
//   "GALAUSDT",
//   "CRVUSDT",
//   "FETUSDT",
//   "NEXOUSDT",
//   "1INCHUSDT",
//   "COMPUSDT",
//   "KSMUSDT",
//   "TRBUSDT",
//   "BANDUSDT",
//   "BALUSDT",
//   "BLZUSDT",
//   "ALICEUSDT",
//   "RAREUSDT",
//   "QUICKUSDT",
//   "AGIXUSDT",
//   "ZECUSDT",
//   "ZILUSDT",
//   "BEAMXUSDT",
//   "ARUSDT",
//   "BATUSDT",
//   "ENJUSDT",
//   "CAKEUSDT",
//   "ELFUSDT",
//   "CELOUSDT",
//   "GMTUSDT",
//   "ENSUSDT",
//   "DYMUSDT",
//   "API3USDT",
//   "WLDUSDT",
//   "PYTHUSDT",
//   "ACEUSDT",
//   "TUSDT",
//   "KEYUSDT",
//   "UMAUSDT",
//   "MAGICUSDT",
//   "JTOUSDT",
//   "AUCTIONUSDT",
//   "RLCUSDT",
//   "MASKUSDT",
//   "LEVERUSDT",
//   "STORJUSDT",
//   "OCEANUSDT",
//   "NFPUSDT",
//   "NMRUSDT",
//   "RONINUSDT",
//   "PENDLEUSDT",
//   "LRCUSDT",
//   "VTHOUSDT",
//   "RIFUSDT",
//   "LUNCUSDT",
//   "IDUSDT",
//   "OMUSDT",
//   "ORNUSDT",
//   "BTTCUSDT",
//   "QTUMUSDT",
//   "CVXUSDT",
//   "FLOKIUSDT",
//   "CHRUSDT",
//   "IOTXUSDT",
//   "GMXUSDT",
//   "SUSHIUSDT",
//   "FLUXUSDT",
//   "WAVESUSDT",
//   "UNFIUSDT",
//   "RAYUSDT",
//   "DASHUSDT",
//   "SKLUSDT",
//   "TWTUSDT",
//   "SCUSDT",
//   "RPLUSDT",
//   "CKBUSDT",
//   "KLAYUSDT",
//   "XECUSDT",
//   "ILVUSDT",
//   "JASMYUSDT",
//   "SSVUSDT",
//   "KDAUSDT",
//   "ZRXUSDT",
//   "RVNUSDT",
//   "JSTUSDT",
//   "XEMUSDT",
//   "TFUELUSDT",
//   "ANKRUSDT",
//   "GALUSDT",
//   "LPTUSDT",
//   "YFIUSDT",
//   "ONTUSDT",
//   "GLMUSDT",
//   "ICXUSDT",
//   "EDUUSDT",
//   "PYRUSDT",
//   "GNOUSDT",
//   "HFTUSDT",
//   "MAVUSDT",
//   "LQTYUSDT",
//   "ARKMUSDT",
//   "XVSUSDT",
//   "ARPAUSDT",
//   "PEOPLEUSDT",
//   "COTIUSDT",
//   "PLAUSDT",
//   "SUNUSDT",
//   "YGGUSDT",
//   "BONDUSDT",
//   "STGUSDT",
//   "SPELLUSDT",
//   "JOEUSDT",
//   "PIXELUSDT",
//   "HOTUSDT",
//   "LUNAUSDT",
//   "SUPERUSDT",
//   "GLMRUSDT",
//   "SFPUSDT",
//   "C98USDT",
//   "GNSUSDT",
//   "SXPUSDT",
//   "ZENUSDT",
//   "CVCUSDT",
//   "PHBUSDT",
//   "RDNTUSDT",
//   "CTXCUSDT",
//   "STRKUSDT",
//   "PORTALUSDT",
//   "WIFUSDT",
//   "AXLUSDT",
//   "NULSUSDT",
//   "ONGUSDT",
//   "IOSTUSDT",
//   "CELRUSDT",
//   "OMGUSDT",
//   "DUSKUSDT",
//   "WINUSDT",
//   "COSUSDT",
//   "MTLUSDT",
//   "DENTUSDT",
//   "DOCKUSDT",
//   "WANUSDT",
//   "FUNUSDT",
//   "RENUSDT",
//   "NKNUSDT",
//   "TROYUSDT",
//   "VITEUSDT",
//   "OGNUSDT",
//   "DREPUSDT",
//   "WRXUSDT",
//   "LSKUSDT",
//   "BNTUSDT",
//   "LTOUSDT",
//   "MBLUSDT",
//   "STPTUSDT",
//   "DATAUSDT",
//   "CTSIUSDT",
//   "HIVEUSDT",
//   "ARDRUSDT",
//   "MDTUSDT",
//   "STMXUSDT",
//   "KNCUSDT",
//   "PNTUSDT",
//   "DGBUSDT",
//   "DCRUSDT",
//   "IRISUSDT",
//   "KMDUSDT",
//   "RSRUSDT",
//   "PAXGUSDT",
//   "WNXMUSDT",
//   "DIAUSDT",
//   "FIOUSDT",
//   "BELUSDT",
//   "WINGUSDT",
//   "OXTUSDT",
//   "FLMUSDT",
//   "UTKUSDT",
//   "ALPHAUSDT",
//   "AUDIOUSDT",
//   "CTKUSDT",
//   "AKROUSDT",
//   "HARDUSDT",
//   "STRAXUSDT",
//   "AVAUSDT",
//   "JUVUSDT",
//   "PSGUSDT",
//   "REEFUSDT",
//   "OGUSDT",
//   "ATMUSDT",
//   "ASRUSDT",
//   "TRUUSDT",
//   "FIROUSDT",
//   "LITUSDT",
//   "DODOUSDT",
//   "ACMUSDT",
//   "BADGERUSDT",
//   "FISUSDT",
//   "PONDUSDT",
//   "DEGOUSDT",
//   "LINAUSDT",
//   "PERPUSDT",
//   "TKOUSDT",
//   "PUNDIXUSDT",
//   "TLMUSDT",
//   "BARUSDT",
//   "FORTHUSDT",
//   "BURGERUSDT",
//   "SLPUSDT",
//   "POLSUSDT",
//   "MDXUSDT",
//   "XVGUSDT",
//   "ATAUSDT",
//   "GTCUSDT",
//   "ERNUSDT",
//   "PHAUSDT",
//   "MLNUSDT",
//   "DEXEUSDT",
//   "CLVUSDT",
//   "FARMUSDT",
//   "ALPACAUSDT",
//   "MBOXUSDT",
//   "FORUSDT",
//   "REQUSDT",
//   "GHSTUSDT",
//   "WAXPUSDT",
//   "IDEXUSDT",
//   "VIDTUSDT",
//   "USDPUSDT",
//   "SYSUSDT",
//   "DFUSDT",
//   "FIDAUSDT",
//   "FRONTUSDT",
//   "CVPUSDT",
//   "AGLDUSDT",
//   "RADUSDT",
//   "BETAUSDT",
//   "LAZIOUSDT",
//   "CHESSUSDT",
//   "ADXUSDT",
//   "DARUSDT",
//   "BNXUSDT",
//   "MOVRUSDT",
//   "CITYUSDT",
//   "KP3RUSDT",
//   "QIUSDT",
//   "PORTOUSDT",
//   "POWRUSDT",
//   "VGXUSDT",
//   "AMPUSDT",
//   "ALCXUSDT",
//   "SANTOSUSDT",
//   "BICOUSDT",
//   "VOXELUSDT",
//   "HIGHUSDT",
//   "OOKIUSDT",
//   "ACHUSDT",
//   "LOKAUSDT",
//   "SCRTUSDT",
//   "ACAUSDT",
//   "XNOUSDT",
//   "ALPINEUSDT",
//   "BSWUSDT",
//   "BIFIUSDT",
//   "STEEMUSDT",
//   "MOBUSDT",
//   "REIUSDT",
//   "EPXUSDT",
//   "POLYXUSDT",
//   "HOOKUSDT",
//   "HIFIUSDT",
//   "PROSUSDT",
//   "SYNUSDT",
//   "VIBUSDT",
//   "AMBUSDT",
//   "USTCUSDT",
//   "PROMUSDT",
//   "QKCUSDT",
//   "UFTUSDT",
//   "LOOMUSDT",
//   "OAXUSDT",
//   "AERGOUSDT",
//   "ASTUSDT",
//   "SNTUSDT",
//   "COMBOUSDT",
//   "ARKUSDT",
//   "CREAMUSDT",
//   "GFTUSDT",
//   "IQUSDT",
//   "PIVXUSDT",
//   "VICUSDT",
//   "VANRYUSDT",
//   "ETHFIUSDT",
//   "AEVOUSDT",
//   "BOMEUSDT",
//   "METISUSDT",
//   "ENAUSDT",
//   "WUSDT",
//   "TNSRUSDT",
//   "TAOUSDT",
//   "SAGAUSDT",
//   "OMNIUSDT",
//   "REZUSDT",
//   "BBUSDT",
//   "NOTUSDT",
//   "IOUSDT",
//   "ZKUSDT",
//   "LISTAUSDT",
//   "ZROUSDT",
//   "BANANAUSDT",
//   "TONUSDT",
//   "DOGSUSDT",
// ];
// const availableTickers = TICKERS.map((ticker) => ({
//   value: ticker,
//   label: ticker,
// }));

// const chartColors = ["#2662D9", "#2662D9", "#2662D9", "#2662D9"];

const CryptoLitePage: React.FC = () => {
  // const [startDate, setStartDate] = useState("2024-10-04");
  // const [timeframe, setTimeframe] = useState("60m");
  // const [selectedTickers, setSelectedTickers] = useState<string[]>(["BTCUSDT"]);
  // const [isGrid, setIsGrid] = useState(false);
  // const { toast } = useToast();

  // const { data: cryptoData } = useQuery<CryptoData[], Error>({
  //   queryKey: ["cryptoData"],
  //   queryFn: fetchCryptoData,
  //   refetchInterval: 60000,
  //   refetchIntervalInBackground: true,
  //   staleTime: Infinity,
  // });

  // const {
  //   data: timeseriesData,
  //   isLoading: isChartLoading,
  //   error,
  // } = useQuery<TimeseriesData[][], Error>({
  //   queryKey: ["cryptoTimeseriesData", startDate, timeframe, selectedTickers],
  //   queryFn: () =>
  //     Promise.all(
  //       selectedTickers.map((ticker) =>
  //         fetchCryptoTimeseriesData(ticker, timeframe, startDate)
  //       )
  //     ),
  //   refetchInterval: 60000,
  //   refetchIntervalInBackground: true,
  //   staleTime: Infinity,
  //   enabled: selectedTickers.length > 0,
  // });

  // const normalizedData = useMemo(() => {
  //   if (!timeseriesData || timeseriesData.length === 0) {
  //     console.log("No timeseries data available");
  //     return [];
  //   }

  //   const startValues: Record<string, number> = {};
  //   const normalized: Record<string, any>[] = [];

  //   timeseriesData[0].forEach((item, index) => {
  //     const dataPoint: Record<string, any> = { time: item.time };

  //     selectedTickers.forEach((ticker, tickerIndex) => {
  //       if (timeseriesData[tickerIndex] && timeseriesData[tickerIndex][index]) {
  //         const closePrice = timeseriesData[tickerIndex][index].close;
  //         if (index === 0) {
  //           startValues[ticker] = closePrice;
  //         }
  //         const normalizedValue = (closePrice / startValues[ticker] - 1) * 100;
  //         dataPoint[ticker] = normalizedValue;
  //       }
  //     });

  //     normalized.push(dataPoint);
  //   });

  //   return normalized;
  // }, [timeseriesData, selectedTickers]);

  // const handleTickerChange = (newTickers: string[]) => {
  //   setSelectedTickers(newTickers.length > 0 ? newTickers : ["BTCUSDT"]);
  // };

  // const handleLayoutToggle = () => {
  //   setIsGrid(!isGrid);
  // };

  // const chartVariants = {
  //   single: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  //   grid: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: { duration: 0.5, staggerChildren: 0.1 },
  //   },
  //   exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  // };

  // const handleResetFilters = () => {
  //   setStartDate("2024-10-04");
  //   setTimeframe("60m");
  //   setSelectedTickers(["BTCUSDT"]);
  //   setIsGrid(false);

  //   // Show toast notification
  //   toast({
  //     description: "The filter has been defaulted.",
  //     variant: "default",
  //     duration: 3000,
  //     className: "bg-[#030816] border-[#20293A] rounded-[12px] text-[#A1A1AA]",
  //   });
  // };

  return (
    <div className="bg-[#030816] text-white min-h-screen sm:p-0 lg:p-4">
      <div className="lg:hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#A1A1AA]/70 font-normal text-[14px]">
                Crypto
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#A1A1AA]/70" />
            <BreadcrumbItem>
              <BreadcrumbPage>Technical</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="lg:hidden text-[24px] font-medium text-[#FAFAFA] mt-3 mb-6">
        Technical Analysis
      </div>

      <Toaster />
    </div>
  );
};

export default CryptoLitePage;
