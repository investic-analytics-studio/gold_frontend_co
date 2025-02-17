import Tooltips from "./component/tooltipsComponent";

const tooltipContent = {
  current_analysis: {
    title: "Current Analysis (Gamma AI)",
    description:
      "AI ที่เข้าไปวิเคราะห์ราคาจากข้อมูล Investic weighted OI เพื่อหาว่าราคาไหนที่ Market Maker จะทํา Gamma Hadging",
    subTitle: ["Gamma Hedging คืออะไร?", "Delta Neutral คืออะไร?"],
    detail: [
      "Gamma Hedging เป็นกลยุทธ์ที่ Market Maker ใช้เพื่อลดความเสี่ยงจากการเปลี่ยนแปลงของราคาออปชัน โดยการซื้อหรือรืขายสินทรัพย์อ้างอิง (Underlying Asset) เพื่อรักษาสมดุลของ Delta (Delta Neutral) ซึ่งช่วยลดความเสี่ยงจากความผันผวนของตลาด",
      "Delta Neutral คือสถานะของพอร์ตที่มีมูลค่า Delta รวมเป็น 0 หรือใกล้เคียงกับ 0 หมายความว่าการเปลี่ยนแปลงของราคาสินทรัพย์อ้างอิงจะไม่ส่งผลกระทบต่อพอร์ตมากนัก ซึ่งเป็นกลยุทธ์ที่ Market Maker ใช้เพื่อบริหารความเสี่ยง",
    ],
    howTo: [
      "วิธีใช้งาน Gamma AI",
      "แนวรับแนวต้าน",
      "เลือก Trading Range หรือดูจุดเข้าในอดีต",
    ],
    detailHowTo: [
      "1. เลือกราคาฟิวเจอร์หรือราคา spot",
      "2. ดูข้อมูล Futures และ Spot Price",
      "3. กําหนดแผนการเทรด (Bullish & Bearish Scenario)",
      "• Major: แนวรับหลัก",
      "• Minor: แนวรับรอง",
      "คลิกที่สัญลักษณ์ filter มุมขวาบนของเครื่องมือ",
    ],
    image: [
      "/assets/images/tooltips/show-spot.png",
      "/assets/images/tooltips/major-minor.png",
      "/assets/images/tooltips/filter-button.png",
      "/assets/images/tooltips/timeframe.png",
    ],
    titleBullet: [
      "Bullish Scenario",
      "Bearish Scenario",
      "Trading Range",
      "Timeframe",
    ],
    bullet: [
      "• ข้อมูลจาก Gold Option Open Interest (CME) จะถูกนํา มาใช้",
      "• หาจุดที่ Market Maker อาจทํา Gamma Hedging",
      "• วิเคราะห์ Strike Price ที่สําคัญ",
      "• Futures Price: ราคาอนุพันธ์ที่คาดการณ์ในอนาคต",
      "• Spot Price: ราคาปัจจุบันของสินทรัพย์",
      "• Delta: ค่าความห่างระหว่าง Future & Spot",
      "• จุดเข้า (Entry Price)",
      "• เป้าหมายกํา ไร (Target Price)",
      "• จุดหยุดขาดทุน (Stop Loss)",
      "• จุดเข้า (Entry Price)",
      "• เป้าหมายกํา ไร (Target Price)",
      "• จุดหยุดขาดทุน (Stop Loss)",
      "• 10 = SL 1000 จุด TP 2000 จุด",
      "• 20 = SL 2000 จุด TP 4000 จุด",
      "AI จะแสดงผลจุดเข้าล่าสุดเสมอ สามารถดูจุดเข้าย้อนหลังได้ที่หัวข้อ Timeframe",
    ],
  },
  price_analysis: {
    title: "Price Analysis",
    description: "แสดงผลจุดเข้าจาก Gamma AI บน Chart",
    image: [
      "/assets/images/tooltips/price-analysis-01.png",
      "/assets/images/tooltips/price-analysis-02.png",
      "/assets/images/tooltips/price-analysis-03.png",
      "/assets/images/tooltips/price-analysis-04.png",
      "/assets/images/tooltips/price-analysis-05.png",
    ],
    howTo: [
      "วิธีใช้งาน",
      "แสดงผล Buy signal > กดปุ่ม show long",
      "แสดงผล Sell Signal > กดปุ่ม show short",
      "เวลาที่ AI วิเคราะห์ > แท่งเทียนที่มีประโยค Analysis อยู่ข้างบน"
    ],
    detailHowTo: "เลือกราคาว่าจะให้แสดงผลเป็นราคาทองฟิวเจอร์หรือราคา spot ก่อนเสมอ เพราะเว็บจะ refresh อัตโนมัติหนึ่งครั้ง"
  },
  oi_distribution: {
    title: "Options Open Interest Distribution",
    subTitle: ["Investic Weighted Option OI คืออะไร?", "Options Open Interest (OI) คืออะไร?"],
    detail: [
      "เป็นเครื่องมือที่ช่วยให้นักเทรดเข้าใจ Open Interest (OI) ของ Gold Options บน CME ได้ดียิ่งขึ้น โดยใช้การถ่วงน้ํา หนักข้อมูลจาก ซีรีส์รีส์ออปชันสามเดือน เพื่อระบุระดับ ความหนาแน่น และระดับความสนใจของตลาด ที่แต่ละ Strike Price",
      "Options Open Interest (OI) คือ จํานวนสัญญาออปชันที่เปิดอยู่ในตลาด ซึ่งหมายถึงจํานวนสัญญาที่มีการซื้อขายแต่ยังไม่ได้ถูกปิด (Closed), หมดอายุ (Expired), หรือใช้สิทธิ์(Exercised)",
    ],
    image: [
      "/assets/images/tooltips/oi-01.png",
      "/assets/images/tooltips/oi-02.png",
      "/assets/images/tooltips/oi-03.png",
    ],
    howTo: [
      "ตัวอย่างว่าทําไมใช้สามเดือนถึงดีกว่า",
      "การตีความ Options Open Interest",
      "ตัวอย่างการใช้ Open Interest",
      "ความสําคัญของ Open Interest ในกลยุทธ์การเทรด",
      "วิธีการอ่านกราฟ Investic Weighted Option OI",
      "กลยุทธ์การใช้งาน",
      "ตัวอย่างเพิ่มเติม"
    ],
    detailHowTo: [
      "ความหนาแน่นของ OI ในแต่ละ Stike Price จะถูกคอนเฟิร์มอย่างน้อยสามเดือนรวมกัน ว่ามีความหนาแน่นและตลาดให้ความสําคัญจริง",
      "• OI ไม่เท่ากับปริมาณการซื้อขาย (Volume) เพราะ OI แสดงจํานวนสัญญาที่เปิดอยู่ ไม่ใช่จํานวนที่ซื้อขายในวันนั้น",
      "OI สามารถช่วยนักลงทุนวิเคราะห์ สภาพคล่องของตลาดและ ระดับราคาที่มีความสําคัญต่อ Market Maker และนักลงทุนรายใหญ่",
      "1. เลือกเดือนที่ต้องการดู",
      "2. ดู Strike Price ที่มี Open Interest สูง",
      "3. ใช้ข้อมูลในการหาจุด Gamma Hedging",
      "• หาจุดที่ Market Maker อาจทํา Gamma Hedging",
      "• ดูแนวรับแนวต้านจาก Strike Price ที่มี Open Interest หนาแน่น",
      "• เปรียบเทียบกับราคาฟิวเจอร์และ Spot เพื่อหาสัญญาณการกลับตัวของราคา",
      "หากเลือก FEB2025 แปลว่าเรากําลังดูข้อมูลออปชันของเดือน กุมภาพันธ์ > มีนาคม > เมษายน"
    ],
    titleBullet: [
      "1. OI สูง ➝ แสดงว่ามีความสนใจสูงใน Strike Price นั้นๆ",
      "2. OI ต่ำ ➝ แสดงว่ามีความสนใจน้อย",
      "1. ใช้ OI ควบคู่กับ Volume",
      "2. ใช้ OI ควบคู่กับ Gamma Hedging",
      "3. ใช้ OI ควบคู่กับ Delta & Implied Volatility (IV)",
    ],
    bullet: [
      "• Market Maker และนักลงทุนอาจต้องทํา Gamma Hedging ที่ระดับราคานั้น",
      "• ราคามีแนวโน้มที่จะเกิดการเร่งร่ ตัว (Momentum)",
      "• ตลาดอาจไม่มีสภาพคล่องที่ Strike Price นี้",
      "• การเคลื่อนไหวของราคาที่ระดับนี้อาจไม่สําคัญมาก",
      "• OI เพิ่มขึ้น + Volume สูง = มีแนวโน้มใหม่เกิดขึ้น",
      "• OI ลดลง + Volume สูง = อาจเป็นสัญญาณการปิดสถานะ",
      "• Strike Price ที่มี OI หนาแน่น อาจเป็นบริเวณที่ Market Maker ต้องป้องกันความเสี่ยง",
      "• ราคาสามารถเกิดการเร่งตัวหรือกลับตัวที่ระดับนี้",
      "• OI สูงที่ Strike Price ใกล้ราคาปัจจุบัน อาจบ่งบอกถึงการสะสมสถานะของนักลงทุน",
      "• ตัวอย่าง: หากเลือก Jan 2025",
      "➝ กําลังดูข้อมูล Open Interest ของออปชันที่หมดอายุ มกราคม > กุมภาพันธ์ > มีนาคม(เรียงลําดับจากเดือนที่เลือก แล้วนับต่อไปสองเดือนข้างหน้า)",
      "➝ ทําให้เห็นภาพรวมของแนวโน้มตลาดอย่างน้อยสามเดือน",
      "• เส้นแนวตั้ง (แท่งกราฟ) แสดงจํานวน OI",
      "• สีน้ําเงิน = Call Options",
      "• สีเขียว = Put Options",
      "• Strike Price ที่มี OI สูงสุด แสดงถึงระดับราคาที่ Market Maker และนักลงทุนให้ความสนใจ",
      "• Strike Price ที่มี OI หนาแน่นมาก อาจเป็นจุดที่ Market Maker ต้องทํา Gamma Hedging",
      "• จุดเหล่านี้อาจเป็นแนวรับแนวต้านที่สําคัญ หรือเป็นบริเวณที่ราคามีแนวโน้มเกิดการเร่งตัว",
    ],
    tips: "Tips: หาก Call OI หนาแน่นที่ Strike Price สูงกว่าราคาปัจจุบัน อาจหมายถึงตลาดมองว่าราคามีโอกาสขึ้น ในทางกลับกันหาก Put OI สูงที่ Strike Price ต่ำกว่าราคาปัจจุบัน อาจหมายถึงตลาดคาดว่าราคาจะลง",
  },
};

const GammaOiCurrentAnalysisTooltips = () => {
  return (
    <Tooltips
      title={tooltipContent.current_analysis.title}
      content={tooltipContent.current_analysis.description}
      subTitleGammaAI={tooltipContent.current_analysis.subTitle}
      detailGammaAI={tooltipContent.current_analysis.detail}
      howToGammaAI={tooltipContent.current_analysis.howTo}
      detailHowToGammaAI={tooltipContent.current_analysis.detailHowTo}
      imageGammaAI={tooltipContent.current_analysis.image}
      titleBulletGammaAI={tooltipContent.current_analysis.titleBullet}
      bulletGammaAI={tooltipContent.current_analysis.bullet}
    />
  );
};

const GammaOiPriceAnalysisTooltips = () => {
  return (
    <Tooltips
      title={tooltipContent.price_analysis.title}
      content={tooltipContent.price_analysis.description}
      imagePriceAnalysis={tooltipContent.price_analysis.image}
      howToPriceAnalysis={tooltipContent.price_analysis.howTo}
      detailHowToPriceAnalysis={tooltipContent.price_analysis.detailHowTo}
    />
  );
};

const OiDistributionTooltips = () => {
  return (
    <Tooltips
      title={tooltipContent.oi_distribution.title}
      subTitleOi={tooltipContent.oi_distribution.subTitle}
      detailOi={tooltipContent.oi_distribution.detail}
      howToOi={tooltipContent.oi_distribution.howTo}
      detailHowToOi={tooltipContent.oi_distribution.detailHowTo}
      titleBulletOi={tooltipContent.oi_distribution.titleBullet}
      bulletOi={tooltipContent.oi_distribution.bullet}
      tipsOi={tooltipContent.oi_distribution.tips}
      imageOi={tooltipContent.oi_distribution.image}
    />
  );
};

export {
  GammaOiCurrentAnalysisTooltips,
  GammaOiPriceAnalysisTooltips,
  OiDistributionTooltips,
};
