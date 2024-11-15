import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoveRightIcon } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const featureItems: FeatureItem[] = [
  
  {
    id: 1,
    title: "Vorem ipsum dolor 1.",
    description: "Borem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/images/image-sentiment.png",
  },
  {
    id: 2,
    title: "Vorem ipsum dolor 2.",
    description: "Borem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/images/image-sentiment-2.png",
  },
  {
    id: 3,
    title: "Vorem ipsum dolor 3.",
    description: "Borem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/images/image-sentiment.png",
  },
];

const FeatureShowcase: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeFeature, setActiveFeature] = useState<number>(1);

  return (
    <div className={`w-full text-white p-8 ${isMobile ? "mt-[10px]" : "mt-[100px]"}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 w-full max-w-7xl"
      >
        {/* <h1 className="font-extrabold mb-4 text-[80px] leading-[40px] mt-[30px]">
          Lorem Ipsum
        </h1>
        <p className="text-[24px] mt-[60px] mb-[60px] text-[#A1A1AA]">
          Borem ipsum dolor sit amet, consectetur adipiscing elit.
        </p> */}
        
        <div className="flex flex-col md:flex-row gap-8 item-center">
          <div className="w-full md:w-1/2 mt-12">
            {featureItems.map((item) => (
              <motion.div
                key={item.id}
                className={`mb-6 cursor-pointer border-b border-[#20293A] pb-6 relative ${
                  activeFeature === item.id ? "text-white" : "text-[#353842]"
                }`}
                onClick={() => setActiveFeature(item.id)}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-[24px] text-start font-medium mb-2">{item.title}</h3>
                <p className={`mt-2 text-start pr-8 ${activeFeature === item.id ? "text-[#A1A1AA]" : "text-[#353842]"}`}>
                  {item.description}
                </p>
                {activeFeature === item.id && (
                  <div className="absolute right-0 top-1/3 transform -translate-y-1/2">
                    <MoveRightIcon className="h-5 w-5 text-blue-500" strokeWidth={3} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="w-full md:w-1/2">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden"
            >
              <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
                <img
                  src={featureItems.find((item) => item.id === activeFeature)?.image}
                  alt={`Feature ${activeFeature}`}
                  
                  className="w-full h-full object-cover pointer-events-none whitespace-pre-wrap bg-clip-text"
                />
                <BorderBeam size={250} duration={12} delay={9} />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureShowcase;
