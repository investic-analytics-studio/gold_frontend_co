import OiDistributionChart from "@/components/gammaOiChart/OiDistributionChart";
import GammaAnalysisCard from "@/components/gammaOiChart/GammaAnalysisCard";
import { useGammaOi, useAvailableMonths } from "@/hooks/useGammaOi";
import { useGammaAnalysis } from "@/hooks/useGammaAnalysis";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChartArea } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent
} from "../components/ui/card";

const InvesticWeightOiPage: React.FC = () => {
  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState("");

  // Get available months separately
  const { data: availableMonths = [], isLoading: isMonthsLoading } = useAvailableMonths();

  // Set initial month when availableMonths loads
  useEffect(() => {
    if (availableMonths.length > 0 && !selectedMonth) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  // Fetch gamma analysis data
  const gammaAnalysis = useGammaAnalysis();
  
  // Fetch gamma OI data only when we have a selected month
  const gammaOi = useGammaOi(selectedMonth, "60");

  // Loading state
  if (isMonthsLoading || gammaAnalysis.isLoading || gammaOi.loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (gammaAnalysis.error || gammaOi.error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="bg-[#030816] text-white min-h-screen sm:p-0 lg:p-4">
      <div className="lg:hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[#A1A1AA]/70 font-normal text-[14px]">
                Crypto
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
      <Card className="w-full h-auto bg-[#030816] border border-[#20293A] rounded-[12px]">
        <div className="border-b border-[#20293A] p-3 pl-4 pr-2 text-[13px] text-[#A1A1AA] flex items-center justify-between h-[50px]">
          <div className="flex items-center gap-2">
            <div>
              <ChartArea className="size-4" />
            </div>
            <div>Gamma OI</div>
          </div>
          <div></div>
        </div>
        <CardContent className="p-0">
          <div className="w-full h-auto bg-[#030816] border-none p-0 rounded-xl">
            <GammaAnalysisCard 
              gammaAnalysis={gammaAnalysis.data || []} 
              priceData={gammaOi.priceData.map(item => ({
                ...item,
                price: item.close
              }))}
              currentPrice={gammaOi.currentPrice}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full h-auto bg-[#030816] border border-[#20293A] lg:rounded-[12px] mt-10">
        <div className="border-b border-[#20293A] p-3 pl-4 pr-2 text-[13px] text-[#A1A1AA] flex items-center justify-between h-[50px]">
          <div className="flex items-center gap-2">
            <div>
              <ChartArea className="size-4" />
            </div>
            <div>Gamma OI</div>
          </div>
          <div></div>
        </div>
        <CardContent className="p-0">
          <div className="w-full h-auto bg-[#030816] border-no p-0 rounded-xl">
              <OiDistributionChart 
                oiData={gammaOi.oiData}
                currentPrice={gammaOi.currentPrice}
                availableMonths={availableMonths}
                selectedMonth={selectedMonth}
                onMonthChange={setSelectedMonth}
              />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvesticWeightOiPage;
