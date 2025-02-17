import Tooltips from './component/tooltipsComponent';

const tooltipContent = {
  sentiment_analysis: {
    title: 'Sentiment Analysis',
    description: 'เป็น AI สรุปข่าวโดยทุกวัน AI จะเข้าไปหาอ่านข่าวต่างๆ ที่มีผลต่อราคาทองคำแล้วนำมาสรุปเป็นระบบคะแนน',
    descriptionTwo: 'Positive = ข่าวดี ทองมักจะขึ้น',
    descriptionThree: 'Negative = ข่าวร้าย ทองมักจะลง',
    descriptionFour: 'Neutral = ปกติ ไม่มีผลอะไรมาก',
    image: "/assets/images/tooltips/net-tooltips.png",
    howTo: 'วิธีการใช้งาน',
    video: "/assets/images/tooltips/net-tooltips-video.mov",
    example: 'ตัวอย่างการประยุกต์ใช้ในการเทรด',
    imageExample: "/assets/images/tooltips/net-example.png",
    descriptionTips: "เราสามารถใช้ Sentiment Analysis เป็นตัวช่วยกรองทิศทางชั้นแรกได้เลยครับ ข่าวถือเป็น Fundamental ซึ่งโดยในธรรมชาติ มันมีน้ำหนักกว่าข้อมูลเชิงเทคนิค",
    tips: "Tips: เมื่อเราได้ทิศทาง เราค่อยนำเทคนิคหรือความรู้ที่เรามีไปจับจังหวะหาจุดเข้า"
  },
  net_sentiment_analysis_and_gold_price_daily: {
    title: 'Net Sentiment Analysis and Gold Price',
    description: 'คือการนํา Sentiment ที่เป็น Positive กับ Nagative มาหักลบกัน เช่น',
    bullet: 'วันที่ 6 มกราคม 2568 มี Sentiment Analysis ดังนี้',
    descriptionTwo: 'Positive = 0',
    descriptionThree: 'Negative = 5',
    imageGold: "/assets/images/tooltips/net-gold-price.png",
    howToGold: 'วิธีคิดคือนํา Positive - Nagative ผลลัพธ์ที่ได้ออกมา = -5',
    titleTechnical: 'เทคนิคการสังเกต',
    contentTechnical: 'หากมี Net sentiment ที่เป็นสีเดียวกันต่อเนื่องมีช่วงที่มีวันที่ Positive หรอื Negative พีคๆ แนวโน้มทองคํามักจะเป็นแนวโน้มแรงๆได้พักนึง',
    imageTechnical: "/assets/images/tooltips/net-gold-price-technical.png",
    exampleGold: 'ตัวอย่างเมื่อเทียบกับกราฟจริง',
    imageGoldExample: "/assets/images/tooltips/net-gold-price-example.png",
  },
  net_sentiment_analysis_and_gold_price_hourly: {
    title: 'Net Sentiment Analysis and Gold Price 1 hour',
    description: 'ดู Net Sentiment เปรียรีบเทียบกับทองคํา ใน Time Frame 1H',
    descriptionTwo: 'เส้นสีฟ้า = Net Sentiment 1H',
    descriptionThree: 'เส้นสีขาว = ราคาทอง',
    image: "/assets/images/tooltips/net-gold-price-1-hour.png",
    descriptionTips: "เน้นสังเกตความต่อเนื่องมากกว่าโฟกัสแค่ชั่วโมงเดียว",
    tips: "Tips: ราคาจะมักจะวิ่งไปในทางเดียวกัน ในช่วงที่ net sentiment มีค่าเป็นบวกติดต่อกัน หรือติดลบติดต่อกันหลายชั่วชั่วโมง"
  },
};

const NetSentimentAnalysisTooltips = () => {
  return (
    <Tooltips
      title={tooltipContent.sentiment_analysis.title}
      content={tooltipContent.sentiment_analysis.description}
      contentTwo={tooltipContent.sentiment_analysis.descriptionTwo}
      contentThree={tooltipContent.sentiment_analysis.descriptionThree}
      contentFour={tooltipContent.sentiment_analysis.descriptionFour}
      image={tooltipContent.sentiment_analysis.image}
      howTo={tooltipContent.sentiment_analysis.howTo}
      video={tooltipContent.sentiment_analysis.video}
      example={tooltipContent.sentiment_analysis.example}
      imageExample={tooltipContent.sentiment_analysis.imageExample}
      descriptionTips={tooltipContent.sentiment_analysis.descriptionTips}
      tips={tooltipContent.sentiment_analysis.tips}
    />
  );
};

const NetSentimentAndGoldPriceDailyTooltips = () => {
  return (
    <Tooltips
      title={tooltipContent.net_sentiment_analysis_and_gold_price_daily.title}
      content={
        tooltipContent.net_sentiment_analysis_and_gold_price_daily.description
      }
      descriptionTwo={tooltipContent.net_sentiment_analysis_and_gold_price_daily.descriptionTwo}
      descriptionThree={tooltipContent.net_sentiment_analysis_and_gold_price_daily.descriptionThree}
      imageGold={tooltipContent.net_sentiment_analysis_and_gold_price_daily.imageGold}
      howToGold={tooltipContent.net_sentiment_analysis_and_gold_price_daily.howToGold}
      titleTechnical={tooltipContent.net_sentiment_analysis_and_gold_price_daily.titleTechnical}
      contentTechnical={tooltipContent.net_sentiment_analysis_and_gold_price_daily.contentTechnical}
      imageTechnical={tooltipContent.net_sentiment_analysis_and_gold_price_daily.imageTechnical}
      exampleGold={tooltipContent.net_sentiment_analysis_and_gold_price_daily.exampleGold}
      imageGoldExample={tooltipContent.net_sentiment_analysis_and_gold_price_daily.imageGoldExample}
    />
  );
};

const NetSentimentAndGoldPriceHourlyTooltips = () => {
  return (
    <Tooltips
      title={tooltipContent.net_sentiment_analysis_and_gold_price_hourly.title}
      content={
        tooltipContent.net_sentiment_analysis_and_gold_price_hourly.description
      }
      descriptionTwoOneHour={tooltipContent.net_sentiment_analysis_and_gold_price_hourly.descriptionTwo}
      descriptionThreeOneHour={tooltipContent.net_sentiment_analysis_and_gold_price_hourly.descriptionThree}
      imageGoldOneHour={tooltipContent.net_sentiment_analysis_and_gold_price_hourly.image}
      descriptionTipsGoldOneHour={tooltipContent.net_sentiment_analysis_and_gold_price_hourly.descriptionTips}
      tips={tooltipContent.net_sentiment_analysis_and_gold_price_hourly.tips}
    />
  );
};

export {
  NetSentimentAnalysisTooltips,
  NetSentimentAndGoldPriceDailyTooltips,
  NetSentimentAndGoldPriceHourlyTooltips,
};
