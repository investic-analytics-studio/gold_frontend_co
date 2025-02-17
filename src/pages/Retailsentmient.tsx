import GoldSentimentRatioChart from "@/components/goldChart/GoldSentimentRatioChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChartArea } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function RetailSentimentPage() {
  const lockPage = import.meta.env.VITE_IS_LOCK_RETAIL_SENTIMENT === "true";

  if (lockPage) {
    return (
      <div className="bg-[#030816] text-white min-h-screen sm:p-0 lg:p-4">
        Coming soon
      </div>
    );
  }

  return (
    <div className="bg-[#030816] text-white min-h-screen sm:p-0 lg:p-4">
      {/* Breadcrumb for mobile */}
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
              <BreadcrumbPage>Retail Sentiment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Mobile title */}
      <div className="lg:hidden text-[24px] font-medium text-[#FAFAFA] mt-3 mb-6">
        Retail Sentiment
      </div>

      {/* Main chart card */}
      <Card className="w-full h-auto bg-[#030816] border border-[#20293A] lg:rounded-[12px]">
        {/* Card header */}
        <div className="border-b border-[#20293A] p-3 pl-4 pr-2 text-[13px] text-[#A1A1AA] flex items-center justify-between h-[50px]">
          <div className="flex items-center gap-2">
            <ChartArea className="size-4" />
            <span>Retail Sentiment</span>
          </div>
        </div>

        {/* Card content */}
        <CardContent className="p-0">
          <div className="w-full h-auto bg-[#030816] border-no p-0 rounded-xl">
            <div className="pb-20 border-t border-[#20293A]">
              <GoldSentimentRatioChart />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RetailSentimentPage;
