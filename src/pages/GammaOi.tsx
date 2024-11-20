import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "../components/ui/card";
import { ChartArea } from "lucide-react";

const GammaOiPage: React.FC = () => {
  return (
    <Card className="w-full h-auto bg-[#030816] border border-[#20293A] lg:rounded-[12px]">
      <div className="border-b border-[#20293A] p-3 pl-4 pr-2 text-[13px] text-[#A1A1AA] flex items-center justify-between h-[50px]">
        <div className="flex items-center gap-2">
          <div>
            <ChartArea className="size-4" />
          </div>
          <div>Gamma OI</div>
        </div>
        <div></div>
      </div>
      <CardHeader className="mb-4">
        <CardTitle className="text-[#FAFAFA] text-[16px] font-medium">
          Lorem 
        </CardTitle>
        <CardDescription className="text-[#A1A1AA] text-[14px]">
          Lorem Ipsum
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="w-full h-auto bg-[#030816] border-no p-4 rounded-xl"></div>
      </CardContent>
    </Card>
  );
};

export default GammaOiPage;
