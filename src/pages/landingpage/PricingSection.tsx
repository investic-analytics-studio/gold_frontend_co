"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  "Morem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Morem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Morem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Morem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Morem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Morem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Morem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Morem ipsum dolor sit amet, consectetur adipiscing elit.",
];

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const monthlyPrice = 199;
  const annualPrice = monthlyPrice * 12 * 0.9; // 10% discount for annual

  return (
    <div className="text-white p-8 flex flex-col lg:flex-row items-start justify-between mt-20 xl:px-8 3xl:px-[250px]">
      <div className="lg:w-1/2 mb-8 lg:mb-0 mt-14">
        <h1 className="text-6xl font-bold mb-4">Pricing</h1>
        <p className="text-[20px] text-gray-400 mb-8">
          Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
        <div className="flex items-center space-x-4 bg-[#0A1020] border border-[#20293A] rounded-full p-1 w-fit h-[60px]">
          <button
            className={`px-6 py-2 rounded-full text-sm h-[50px] transition-all duration-300 ${
              !isAnnual ? "bg-[#172036] text-white" : "text-[#535B6A]"
            }`}
            onClick={() => setIsAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm h-[50px] transition-all duration-300 ${
              isAnnual ? "bg-[#172036] text-white" : "text-[#535B6A]"
            }`}
            onClick={() => setIsAnnual(true)}
          >
            Annually
          </button>
        </div>
      </div>

      <Card className="w-full lg:w-1/2 bg-[#080E1F] border-[#20293A] p-5 rounded-[30px]">
        <CardHeader>
          <CardTitle className="text-[30px] text-white font-semibold mb-2">
            Lorem
          </CardTitle>
          <CardDescription className="text-[#A1A1AA] text-[18px]">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-bold mb-6 text-white font-medium text-[32px]">
            ${isAnnual ? Math.round(annualPrice) : monthlyPrice}
            <span className="font-normal text-gray-400 text-[16px]">
              {isAnnual ? "/year" : "/month"}
            </span>
          </div>
          <Button className="w-full text-[16px] bg-[#209CFF] hover:bg-blue-600 hover:text-[#FFFFFF] text-[#030816] h-[67px] rounded-[15px] transition-all duration-500">
            Subscribe →
          </Button>
          <div className="mt-10">
            <h3 className="text-[#FFFFFF] font-medium text-[16px] font-medium mb-2">
              Everything in Lorem:
            </h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="font-regular text-[16px] text-[#FAFAFA]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSection;
