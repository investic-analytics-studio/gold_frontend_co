"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const data = [
  {
    title: "Sentiment Analysis",
    description:
      "Understand Bitcoin sentiment to predict market trends. Visual insights help you anticipate peaks and declines for better trading decisions.",
    image: "/assets/images/sentiment-analysis.png",
  },
  {
    title: "X Sentiment Analysis",
    description:
      "Track significant influencers on X to stay ahead of alt-coin movement, see in-depth details, and identify where trends or pumps are beginning, helping you seize opportunities early.",
    image: "/assets/images/x-sentiment.png",
  },
  {
    title: "Anomaly Detection",
    description:
      "Spot irregular price movements & pattern, which happened in the past, with our AI-powered algorithm to detect and forecast anomaly detection and receive actionable trading signals.",
    image: "/assets/images/anomaly-detection.png",
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
      <h1 className={`${isMobile ? "text-[40px]" : "text-[46px]"} font-semibold text-[46px]`}>Our Features</h1>
      <p className={`${isMobile ? "text-[18px]" : "text-[20px]"} text-gray-400 mb-8 mt-2`}>
      Luck can come and go, but a solid strategy and disciplined execution are what lead to consistent results . - JIM SIMONS
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
              <Card className="bg-transparent border-[#20293A] h-[auto] rounded-[30px]">
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
                  <h1 className="text-white font-medium text-[24px]">
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
          className="bg-[#040813] hover:bg-[#209CFF]/80 rounded-full border-[#209CFF] disabled:border-[#313131] disabled:opacity-70 group"
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft
            className={`h-4 w-4 ${
              currentIndex === 0
                ? "text-[#313131]"
                : "text-[#209CFF] group-hover:text-[#FFFFFF]"
            }`}
          />
        </Button>
        <Button
          className="bg-[#040813] hover:bg-[#209CFF]/80 rounded-full border-[#209CFF] disabled:border-[#313131] disabled:opacity-70 group"
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={isLastCardVisible}
        >
          <ChevronRight
            className={`h-4 w-4 ${
              isLastCardVisible
                ? "text-[#313131]"
                : "text-[#209CFF] group-hover:text-[#FFFFFF]"
            }`}
          />
        </Button>
      </div>
    </div>
  );
};

export default ImageCarousel;
