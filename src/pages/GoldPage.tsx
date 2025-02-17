import GoldSentimentChart from "@/components/goldChart/GoldSentimentChart";
import NetSentimentAndGoldPriceChart from "@/components/goldChart/NetSentimentAndGoldPriceChart";
import NetSentimentAndGoldPriceOneHour from "@/components/goldChart/NetSentimentAndGoldPriceOneHour";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChartArea } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../components/ui/card";
// import { useAuthContext } from "@/context/authContext";
// import ForUnsubscribe from "@/components/auth/ForUnsubscribe";

const GoldPage: React.FC = () => {
  // const { authUserData } = useAuthContext();
  const lockPage = import.meta.env.VITE_IS_LOCK_NET_SENTIMENT === "true";

  if (lockPage) {
    return (
      <div className="bg-[#030816] text-white min-h-screen sm:p-0 lg:p-4">
        Coming soon
      </div>
    );
  }

  // if (!authUserData.gold_status) {
  //   return <ForUnsubscribe />;
  // }

  return (
    <div className="bg-[#030816] text-white min-h-screen sm:p-0 lg:p-4">
      <div className="lg:hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#A1A1AA]/70 font-normal text-[14px]">
                Gold
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-[#A1A1AA]/70" />
            <BreadcrumbItem>
              <BreadcrumbPage>Net Sentiment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="lg:hidden text-[24px] font-medium text-[#FAFAFA] mt-3 mb-6">
        Net Sentiment
      </div>
      <Card className="w-full h-auto bg-[#030816] border border-[#20293A] lg:rounded-[12px]">
        <div className="border-b border-[#20293A] p-3 pl-4 pr-2 text-[13px] text-[#A1A1AA] flex items-center justify-between h-[50px]">
          <div className="flex items-center gap-2">
            <div>
              <ChartArea className="size-4" />
            </div>
            <div>Net Sentiment</div>
          </div>
          <div></div>
        </div>
        <CardContent className="p-0">
          <div className="w-full h-auto bg-[#030816] border-no p-0 rounded-xl">
            <div className="pb-6">
              <GoldSentimentChart />
            </div>
            <div className="mt-20 border-t border-[#20293A]">
              <NetSentimentAndGoldPriceChart />
            </div>
            <div className="mt-20 border-t border-[#20293A]">
              <NetSentimentAndGoldPriceOneHour />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoldPage;
