import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/ui/shine-border";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import React from "react";
// import FeatureShowcase from "./FeatureShowcase";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import DeviceCompatibility from "./DeviceCompatibility";
import ImageCarousel from "./SectionCarousel";
// import ReviewCard from "./ReviewCard";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { useIsMobile } from "@/hooks/use-mobile";
import AboutInvestic from "./AboutInvestic";
import TextScroll from "./TextScroll";

const HomePage: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        backgroundColor: "#040813",
        position: "relative",
        overflow: "hidden",
      }}
      className="flex flex-col items-center min-h-screen text-white"
    >
      {/* Animated Grid Pattern Background at the top */}
      <div className="absolute top-5 left-0 right-0 h-[70vh] z-0 overflow-hidden opacity-20">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-0 h-full w-full"
          )}
        />
      </div>

      {/* Existing content */}
      <div
        className={`relative z-10 w-full max-w-7xl px-4 ${
          isMobile ? "pt-[50px]" : "pt-[100px]"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-12 ${isMobile ? "text-center" : "text-center"}`}
        >
          <div className="hidden md:block lg:hidden">
            <GradualSpacing
              className="font-display text-center font-bold tracking-tight text-white md:leading-[8rem] mt-[50px] text-[80px]"
              text="Gold Studio"
            />
          </div>
          {isMobile ? (
            <div className="block md:hidden lg:hidden flex flex-col items-center">
              <GradualSpacing
                className="font-display text-center font-bold tracking-tight text-white mt-[50px] text-[75px] lg:text-[80px] leading-[85px] lg:leading-[80px]"
                text="Gold"
              />
              <GradualSpacing
                className="font-display text-center font-bold tracking-tight text-white text-[75px] lg:text-[80px] leading-[85px] lg:leading-[80px]"
                text="Studio"
              />
            </div>
          ) : (
            <GradualSpacing
              className="font-display text-center font-bold tracking-tight text-white md:leading-[8rem] mt-[50px] text-[160px]"
              text="Gold Studio"
            />
          )}

          <p
            className={`${
              isMobile
                ? "text-[20px] mt-[10px] mb-[40px] leading-relaxed tracking-wide"
                : "text-[30px] mt-[60px] mb-[60px] leading-relaxed tracking-normal"
            } text-[#A1A1AA]`}
          >
            Your one-stop solution for gold analytics
          </p>
          <motion.div>
            <div
              className={`flex ${
                isMobile ? "flex-col mb-2" : "flex-row mb-2"
              } gap-[10px] justify-center`}
            >
              <div className={isMobile ? "mb-0" : "mb-0"}>
                <Button
                  className={`bg-[#209CFF] rounded-[15px] ${
                    isMobile
                      ? "w-full md:w-[320px] h-[66px] text-[16px]"
                      : "w-[220px] h-[66px] text-[20px]"
                  } text-[#000000]`}
                  asChild
                  size="lg"
                >
                  <Link to="/gold">Launch App →</Link>
                </Button>
              </div>

              {/* <div>
                <Button
                  className={`bg-transparent border-2 border-[#209CFF] rounded-[15px] ${
                    isMobile 
                      ? "w-full h-[50px] text-[16px]" 
                      : "w-[240px] h-[66px] text-[20px]"
                  } text-[#209CFF]`}
                  asChild
                  size="lg"
                >
                  <Link to="/crypto">Explore Pricing →</Link>
                </Button>
              </div> */}
            </div>
            <p
              className={`${
                isMobile
                  ? "flex-col mb-8 text-[14px]"
                  : "flex-row mb-14 text-[14px]"
              } gap-[10px] justify-center font-light text-[#A1A1AA] opacity-50`}
            >
              {" "}
              Beta Version
            </p>
          </motion.div>

          <motion.div className="mt-4 w-full rounded-lg flex items-center justify-center">
            <ShineBorder
              className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-[#20293A] md:shadow-xl bg-[#040916]"
              color={["#209CFF"]}
            >
              <img
                src="/assets/images/gold-studio-dashboard.png"
                alt="Crypto Studio Dashboard"
                className="w-full h-auto rounded-lg shadow-2xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text"
                onError={(e) => {
                  console.error("Error loading image:", e);
                  e.currentTarget.style.display = "none";
                }}
              />
            </ShineBorder>
          </motion.div>
        </motion.div>
      </div>

      <ImageCarousel />

      {/* Centered FeatureShowcase */}
      {/* <div className="relative z-10 w-full flex justify-center items-center my-10">
        <div className="max-w-7xl w-full">
          <FeatureShowcase />
        </div>
      </div> */}

      <AboutInvestic />

      <DeviceCompatibility />

      <TextScroll />

      {/* <ReviewCard /> */}

      {/* <PricingSection /> */}

      <div className="relative z-10 w-full">
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`w-full pb-4 mt-0 text-center text-gray-400 border-t ${
            isMobile
              ? "border-[#20293A] text-[12px]"
              : "border-[#20293A] text-[16px]"
          }`}
        >
          {/* <div className="py-10 lg:py-12 flex items-center justify-center gap-4">
            <div className="flex gap-5 lg:gap-4">
              <a
                href="https://discord.gg/jUsBJFkmDS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA]/70 hover:text-[#FFFFFF] border border-[#20293A] transition-colors duration-200 hover:bg-[#172036] rounded-full p-2"
              >
                <IconBrandDiscordFilled className="w-7 h-7 lg:w-6 lg:h-6" />
              </a>
              <a
                href="https://x.com/INVESTIC_Crypto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA]/70 hover:text-[#FFFFFF] border border-[#20293A] transition-colors duration-200 hover:bg-[#172036] rounded-full p-2"
              >
                <IconBrandX className="w-7 h-7 lg:w-6 lg:h-6" />
              </a>
            </div>
          </div> */}
          <div className="pt-4">
            <p className="text-[#A1A1AA]/70">
              Copyright &copy; 2024 Investic Analytics Studio. All rights
              reserved.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default HomePage;
