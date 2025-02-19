"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const data = [
  {
    title: "Net Sentiment",
    description:
      "Daily gold sentiment analysis powered by AI. We gather real-time news worldwide to provide a clear overview: positive sentiment indicates bullish factors for gold, while negative sentiment highlights bearish influences.",
    image: "/assets/images/net-sentiment.png",
  },
  {
    title: "Gamma AI",
    description:
      "Pinpoint precise entry and exit points with AI-powered insights. We analyze Gold CME options open interest to identify the levels where market makers conduct Gamma hedging, providing optimal buy and sell targets.",
    image: "/assets/images/price-analysis.png",
  },
  {
    title: "Investic Weighted Option OI",
    description:
      "CME Options Open Interest, weighted across the latest three options series, ensures that key levels are significant. Use these high-interest OI levels as support and resistance zones, aligned with the Gamma hedging strategies of market makers.",
    image: "/assets/images/investic-weighted-option-oi.png",
  },
];

const ImageCarousel: React.FC = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isLastCardVisible, setIsLastCardVisible] = useState(false);

  const checkCardVisibility = () => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll(".card-item");
      const containerRect = carouselRef.current.getBoundingClientRect();

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const isFullyVisible =
          cardRect.left >= containerRect.left &&
          cardRect.right <= containerRect.right;

        if (!isFullyVisible) {
          const leftOverlap = Math.max(0, containerRect.left - cardRect.left);
          const rightOverlap = Math.max(
            0,
            cardRect.right - containerRect.right
          );

          const leftFadeWidth = Math.min(leftOverlap, 20); // Reduced fade width
          const rightFadeWidth = Math.min(rightOverlap, 20); // Reduced fade width

          const maskImage = `
            linear-gradient(
              to right, 
              transparent, 
              black ${leftFadeWidth}px, 
              black calc(100% - ${rightFadeWidth}px), 
              transparent
            )
          `;
          (card as HTMLElement).style.maskImage = maskImage;
          (card as HTMLElement).style.webkitMaskImage = maskImage;
        } else {
          (card as HTMLElement).style.maskImage = "none";
          (card as HTMLElement).style.webkitMaskImage = "none";
        }
      });

      const lastCard = cards[cards.length - 1];
      const lastCardRect = lastCard.getBoundingClientRect();
      setIsLastCardVisible(lastCardRect.right <= containerRect.right);
    }
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.clientWidth;
      // Use full width for mobile, 45% for desktop
      const scrollAmount = index * containerWidth * (isMobile ? 1 : 0.45);
      carouselRef.current.scrollTo({
        left: Math.min(
          scrollAmount,
          carouselRef.current.scrollWidth - containerWidth
        ),
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => {
    const newIndex = Math.min(currentIndex + 1, data.length - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    scrollToIndex(currentIndex);
    checkCardVisibility();
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      checkCardVisibility();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`text-white p-8 ${isMobile ? "w-[100%] mt-10" : "w-full mt-20"}`}>
      <h1 className={`${isMobile ? "text-[40px]" : "text-[46px]"} font-semibold text-[46px] text-secondary`}>Our Features</h1>
      <p className={`${isMobile ? "text-[18px]" : "text-[20px]"} text-gray-400 mb-8 mt-2`}>
        Discover the ultimate gold analysis toolkit, giving you the power to track major players and stay ahead in the market.
      </p>

      <div
        className="relative overflow-hidden"
        ref={carouselRef}
        onScroll={checkCardVisibility}
      >
        <div className="flex space-x-4">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 card-item transition-all duration-300 ${
                isMobile ? "w-[95%]" : "w-[45%]"
              }`}
            >
              <Card className="bg-transparent border-[#E0E3EB] h-[auto] rounded-[30px]">
                <CardHeader>
                  <div className="relative w-full h-[auto]">
                    <img
                      src={item.image}
                      alt={`Image ${index + 1}`}
                      className="inset-0 w-full h-[auto] object-cover rounded-md px-0 pt-2"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <h1 className="text-secondary font-semibold text-[24px]">
                    {item.title}
                  </h1>
                  <p className="text-gray-400 mt-2 mb-2">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <Button
          className="bg-[#FFFFFF] hover:bg-primary/80 rounded-full border-primary disabled:border-[#000000]/20 disabled:opacity-70 group"
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft
            className={`h-4 w-4 ${
              currentIndex === 0
                ? "text-[#000000]/20"
                : "text-primary group-hover:text-[#FFFFFF]"
            }`}
          />
        </Button>
        <Button
          className="bg-[#FFFFFF] hover:bg-primary/80 rounded-full border-primary disabled:border-[#000000]/20 disabled:opacity-70 group"
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={isLastCardVisible}
        >
          <ChevronRight
            className={`h-4 w-4 ${
              isLastCardVisible
                ? "text-[#000000]/20"
                : "text-primary group-hover:text-[#FFFFFF]"
            }`}
          />
        </Button>
      </div>
    </div>
  );
};

export default ImageCarousel;
