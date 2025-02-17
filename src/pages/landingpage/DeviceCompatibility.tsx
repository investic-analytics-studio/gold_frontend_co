import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { MonitorCheck, TabletSmartphone } from "lucide-react";
import React from "react";

const DeviceCompatibility: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`text-secondary mb-0 ${
        isMobile ? "mt-10  p-4" : "mt-10  p-8"
      } 3xl:px-[250px]`}
    >
      <h1
        className={`${
          isMobile ? "text-[40px] leading-[44px]" : "text-[46px] leading-[46px]"
        } font-bold text-center`}
      >
        Available anywhere, anytime
      </h1>
      <p
        className={`${
          isMobile ? "text-[18px] mt-4" : "text-[20px] mt-6"
        } text-secondary/50 mb-8 mt-2 text-center max-w-[800px] mx-auto`}
      >
        Access powerful market insights and analysis tools from any device, with
        comprehensive market analysis. Available on desktop, tablet and mobile.
      </p>

      <Card className="bg-[#FFFFFF] border-[#E0E3EB] rounded-[30px] h-auto overflow-hidden mt-12">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-auto">
            <div
              className={`${
                isMobile
                  ? "md:border-r-0 p-6 py-8"
                  : "md:border-r border-[#E0E3EB] p-16 pt-16"
              }`}
            >
              <div className="flex items-center mb-4">
                <MonitorCheck className="w-[92px] h-[92px] text-primary mr-4 mb-6" />
              </div>
              <h2 className="text-2xl font-semibold text-secondary text-[30px]">
                Desktop Experience
              </h2>
              <p className="text-secondary/50 text-[18px] mt-4">
                Get the full power of our analytics on your desktop. With a
                larger screen, you'll have access to detailed charts,
                comprehensive market analysis, and advanced trading insights all
                in one view.
              </p>
            </div>

            {/* Divider */}
            <div className="lg:hidden h-px bg-[#E0E3EB] mx-0"></div>

            <div
              className={`${
                isMobile
                  ? "md:border-r-0 p-6 py-8"
                  : "md:border-r border-[#E0E3EB]/10 p-16 pt-16"
              }`}
            >
              <div className="flex items-center mb-4">
                <TabletSmartphone className="w-[92px] h-[92px] text-primary mr-4 mb-6" />
              </div>
              <h2 className="text-2xl font-semibold text-secondary text-[30px]">
                Mobile & Tablet Ready
              </h2>
              <p className="text-secondary/50 text-[18px] mt-4">
                Stay fully connected to analysis anytime, anywhere. Our
                responsive design ensures you get the same powerful insights and
                analysis tools, perfectly optimized for your tablet and mobile device.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceCompatibility;
