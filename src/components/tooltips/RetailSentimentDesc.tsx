import Tooltips from './component/tooltipsComponent';

const tooltipContent = {
  sentiment_ratio: {
    title: 'Sentiment Ratio',
    description: 'This is the help content that will appear in the modal.',
  },
};

const SentimentRatioTooltips = () => {
  return (
    <Tooltips
      title={tooltipContent.sentiment_ratio.title}
      content={tooltipContent.sentiment_ratio.description}
    />
  );
};

export { SentimentRatioTooltips };
