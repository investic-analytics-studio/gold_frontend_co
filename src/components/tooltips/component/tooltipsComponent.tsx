import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { InfoIcon, Lightbulb } from "lucide-react";
import React from "react";

interface TooltipsProps {
  title: string;
  content?: string;
  contentTwo?: string; // Optional second content
  contentThree?: string; // Optional third content
  contentFour?: string; // Optional fourth content
  image?: string; // Optional image
  video?: string; // Optional video
  howTo?: string;
  example?: string;
  imageExample?: string;
  descriptionTips?: string;
  tips?: string;
  bullet?: string;
  descriptionTwo?: string;
  descriptionThree?: string;
  imageGold?: string;
  howToGold?: string;
  titleTechnical?: string;
  contentTechnical?: string;
  imageTechnical?: string;
  exampleGold?: string;
  imageGoldExample?: string;
  descriptionTwoOneHour?: string;
  descriptionThreeOneHour?: string;
  imageGoldOneHour?: string;
  descriptionTipsGoldOneHour?: string;

  // Gamma AI Page
  subTitleGammaAI?: string[];
  detailGammaAI?: string[];
  howToGammaAI?: string[];
  detailHowToGammaAI?: string[];
  imageGammaAI?: string[];
  titleBulletGammaAI?: string[];
  bulletGammaAI?: string[];

  // Price Analysis
  imagePriceAnalysis?: string[];
  howToPriceAnalysis?: string[];
  detailHowToPriceAnalysis?: string;

  // OI
  subTitleOi?: string[];
  detailOi?: string[];
  howToOi?: string[];
  detailHowToOi?: string[];
  titleBulletOi?: string[];
  bulletOi?: string[];
  tipsOi?: string;
  imageOi?: string[];
}

const Tooltips: React.FC<TooltipsProps> = ({
  title,
  content,
  contentTwo,
  contentThree,
  contentFour,
  image,
  video,
  howTo,
  example,
  imageExample,
  descriptionTips,
  tips,
  bullet,
  descriptionTwo,
  descriptionThree,
  imageGold,
  howToGold,
  titleTechnical,
  contentTechnical,
  imageTechnical,
  exampleGold,
  imageGoldExample,
  descriptionTwoOneHour,
  descriptionThreeOneHour,
  imageGoldOneHour,
  descriptionTipsGoldOneHour,

  // Gamma AI page
  subTitleGammaAI,
  detailGammaAI,
  howToGammaAI,
  detailHowToGammaAI,
  imageGammaAI,
  titleBulletGammaAI,
  bulletGammaAI,

  // Price Analysis
  imagePriceAnalysis,
  howToPriceAnalysis,
  detailHowToPriceAnalysis,

  // OI
  subTitleOi,
  detailOi,
  howToOi,
  detailHowToOi,
  titleBulletOi,
  bulletOi,
  tipsOi,
  imageOi,
}) => {
  // Include contentThree and contentFour in destructured props
  const isMobile = useIsMobile();
  const isSmallScreen = isMobile;

  return (
    <>
      {isSmallScreen ? (
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="rounded-full text-[#209CFF]/50 hover:text-[#209CFF] relative"
            >
              <InfoIcon className="h-4 w-4" />
              <span className="sr-only">Open tips</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="z-50 w-full h-[80vh] bg-[#0A1020] border border-[#20293A] rounded-lg">
            <DrawerHeader>
              <DrawerTitle className="text-[#FAFAFA] flex items-center justify-between">
                  {title}
              </DrawerTitle>
            </DrawerHeader>
            <div className="grid gap-4 px-4 pt-4 pb-4 font-normal overflow-y-scroll scrollbar-track-transparent custom-scrollbar">
              <div className="space-y-2">
                
                {content && (
                  <p className="text-sm text-[#FFFFFF]/85 pb-2">
                    {content}
                  </p>
                )}
                {image && (
                  <img
                    src={image}
                    alt={title}
                    className="border border-[#20293A]/50 rounded-lg"
                  />
                )}

                {contentTwo && (
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-2 h-2 rounded-full bg-[#209CFF]"></div>
                    <span className="text-sm text-[#209CFF]">{contentTwo}</span>
                  </div>
                )}

                {contentThree && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#EC0D38]"></div>
                    <span className="text-sm text-[#EC0D38]">
                      {contentThree}
                    </span>
                  </div>
                )}

                {contentFour && (
                  <div className="flex items-center gap-2 pb-4">
                    <div className="w-2 h-2 rounded-full bg-[#EEC800]"></div>
                    <span className="text-sm text-[#EEC800]">
                      {contentFour}
                    </span>
                  </div>
                )}

                {bullet && (
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm text-[#FFFFFF]/85">{bullet}</span>
                  </div>
                )}

                {descriptionTwo && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#209CFF]"></div>
                    <span className="text-sm text-[#209CFF]">
                      {descriptionTwo}
                    </span>
                  </div>
                )}

                {descriptionThree && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#EC0D38]"></div>
                    <span className="text-sm text-[#EC0D38]">
                      {descriptionThree}
                    </span>
                  </div>
                )}

                {descriptionTwoOneHour && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#209CFF]"></div>
                    <span className="text-sm text-[#209CFF]">
                      {descriptionTwoOneHour}
                    </span>
                  </div>
                )}

                {descriptionThreeOneHour && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#FFFFFF]"></div>
                    <span className="text-sm text-[#FFFFFF]">
                      {descriptionThreeOneHour}
                    </span>
                  </div>
                )}

                {imageGoldOneHour && (
                  <div className="pt-4 pb-4">
                    <img
                      src={imageGoldOneHour}
                      alt={descriptionTwoOneHour}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToGold && (
                  <div className="flex items-center gap-2 pb-2 pt-2">
                    <span className="text-sm text-[#FFFFFF]/60">
                      {howToGold}
                    </span>
                  </div>
                )}

                {imageGold && (
                  <div className="pb-4">
                    <img
                      src={imageGold}
                      alt={bullet}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {titleTechnical && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {titleTechnical}
                      </span>
                    </div>
                  </>
                )}

                {imageTechnical && (
                  <img
                    src={imageTechnical}
                    alt={titleTechnical}
                    className="border border-[#20293A]/50 rounded-lg"
                  />
                )}

                {contentTechnical && (
                  <div className="flex items-center gap-2 pb-2 pt-2">
                    <span className="text-sm text-[#FFFFFF]/75">
                      {contentTechnical}
                    </span>
                  </div>
                )}

                {howTo && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">{howTo}</span>
                    </div>
                  </>
                )}

                {video && (
                  <div className="pb-4">
                    <video
                      controls
                      className="rounded-lg border border-[#20293A]/50"
                      style={{ maxWidth: "100%" }}
                    >
                      <source src={video} type="video/mp4" />
                      <source src={video} type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {example && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {example}
                      </span>
                    </div>
                  </>
                )}

                {imageExample && (
                  <div className="pb-2">
                    <img
                      src={imageExample}
                      alt={example}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {exampleGold && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {exampleGold}
                      </span>
                    </div>
                  </>
                )}

                {imageGoldExample && (
                  <div className="pb-2">
                    <img
                      src={imageGoldExample}
                      alt={exampleGold}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {descriptionTips && (
                  <>
                    <div className="flex items-center gap-2 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {descriptionTips}
                      </span>
                    </div>
                  </>
                )}

                {descriptionTipsGoldOneHour && (
                  <>
                    <div className="flex items-center gap-3 pb-4">
                      <div className="w-[2px] h-6 bg-[#209CFF]"></div>
                      <span className="text-sm text-[#209CFF]/85">
                        {descriptionTipsGoldOneHour}
                      </span>
                    </div>
                  </>
                )}

                {tips && (
                  <>
                    <div className="flex items-center gap-2 bg-[#209CFF]/10 p-5 rounded-lg">
                      <Lightbulb className="text-[#209CFF] mr-2 w-10" />
                      <span className="text-sm text-[#209CFF]/85">{tips}</span>
                    </div>
                  </>
                )}

                {/* Gamma AI page */}

                {subTitleGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-4">
                      <div className="w-1 h-1 bg-[#209CFF]"></div>
                      <span className="text-[14px] font-medium text-[#FFFFFF]">
                        {subTitleGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {detailGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {subTitleGammaAI && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#209CFF]"></div>
                      <span className="text-[14px] font-medium text-[#FFFFFF]">
                        {subTitleGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {howToGammaAI && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {imageGammaAI && (
                  <div className="pb-2">
                    <img
                      src={imageGammaAI[0]}
                      alt="show-spot"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[0]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[1]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[2]}
                      </div>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[3]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[4]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[5]}
                      </div>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[2]}
                      </span>
                    </div>
                  </>
                )}

                {titleBulletGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm font-medium text-[#FFFFFF]/85">
                        {titleBulletGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[6]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[7]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[8]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm font-medium text-[#FFFFFF]/85">
                        {titleBulletGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[9]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[10]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[11]}
                      </div>
                    </div>
                  </>
                )}

                {howToGammaAI && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[3]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[4]}
                      </div>
                    </div>
                  </>
                )}

                {imageGammaAI && (
                  <div className="pb-2">
                    <img
                      src={imageGammaAI[1]}
                      alt="major-minor"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToGammaAI && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToGammaAI[2]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[5]}
                      </div>
                    </div>
                  </>
                )}

                {imageGammaAI && (
                  <div className="pb-2">
                    <img
                      src={imageGammaAI[2]}
                      alt="major-minor"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {titleBulletGammaAI && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#FFFFFF]/85">
                        {titleBulletGammaAI[2]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[12]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[13]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletGammaAI && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#FFFFFF]/85">
                        {titleBulletGammaAI[3]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[14]}
                      </div>
                    </div>
                  </>
                )}

                {imageGammaAI && (
                  <div className="pb-2">
                    <img
                      src={imageGammaAI[3]}
                      alt="timeframe"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {/* Price Analysis */}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[0]}
                      alt="timeframe"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToPriceAnalysis && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToPriceAnalysis[0]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToPriceAnalysis && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToPriceAnalysis}
                      </div>
                    </div>
                  </>
                )}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[1]}
                      alt={imagePriceAnalysis[1]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToPriceAnalysis && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToPriceAnalysis[1]}
                      </span>
                    </div>
                  </>
                )}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[2]}
                      alt={imagePriceAnalysis[2]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToPriceAnalysis && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToPriceAnalysis[2]}
                      </span>
                    </div>
                  </>
                )}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[3]}
                      alt={imagePriceAnalysis[3]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToPriceAnalysis && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToPriceAnalysis[3]}
                      </span>
                    </div>
                  </>
                )}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[4]}
                      alt={imagePriceAnalysis[4]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {/* OI */}

                {subTitleOi && (
                  <>
                    <div className="flex items-center gap-2 pt-4">
                      <div className="w-1 h-1 bg-[#209CFF]"></div>
                      <span className="text-[14px] font-medium text-[#FFFFFF]">
                        {subTitleOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {detailOi && (
                  <>
                    <div className="flex items-center gap-2 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {imageOi && (
                  <div className="pb-2">
                    <img
                      src={imageOi[0]}
                      alt={imageOi[0]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3 pb-4">
                      <div className="w-[4px] h-14 bg-[#209CFF]/40"></div>
                      <span className="text-sm text-[#209CFF]/85">
                        {detailHowToOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {subTitleOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#209CFF]"></div>
                      <span className="text-[14px] font-medium text-[#FFFFFF]">
                        {subTitleOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailOi && (
                  <>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3 pb-4">
                      <span className="text-sm text-[#FFFFFF]/70">
                        {detailHowToOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[2]}
                      </span>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/70">
                        {titleBulletOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[0]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[1]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/70">
                        {titleBulletOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[2]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[3]}
                      </div>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[2]}
                      </span>
                    </div>
                  </>
                )}

                {imageOi && (
                  <div className="pb-2">
                    <img
                      src={imageOi[1]}
                      alt={imageOi[1]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[2]}
                      </span>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {titleBulletOi[2]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[4]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[5]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {titleBulletOi[3]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[6]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[7]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {titleBulletOi[4]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[8]}
                      </div>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[4]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[3]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70 pb-2">
                        {bulletOi[9]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[10]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[11]}
                      </div>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[4]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[12]}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-[#FFFFFF]/70">
                          {bulletOi[13]}
                        </div>
                        <div className="w-4 h-1 bg-[#209CFF]"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-[#FFFFFF]/70">
                          {bulletOi[14]}
                        </div>
                        <div className="w-4 h-1 bg-[#089981]"></div>
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[15]}
                      </div>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[5]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[16]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[17]}
                      </div>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[6]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="items-center gap-3">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[9]}
                      </div>
                    </div>
                  </>
                )}

                {imageOi && (
                  <div className="pb-2 pt-2">
                    <img
                      src={imageOi[2]}
                      alt={imageOi[2]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[5]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="items-center gap-3 pb-2">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[6]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[7]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[8]}
                      </div>
                    </div>
                  </>
                )}

                {tipsOi && (
                  <>
                    <div className="flex items-center gap-2 bg-[#209CFF]/10 p-5 rounded-lg">
                      <div className="w-[15%]">
                        <Lightbulb className="text-[#209CFF] mr-2 w-10" />
                      </div>
                      <div className="w-[85%]">
                        <span className="text-sm text-[#209CFF]/85">
                          {tipsOi}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="rounded-full text-[#209CFF]/50 hover:text-[#209CFF] relative"
            >
              <InfoIcon className="h-4 w-4" />
              <span className="sr-only">Open tips</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="start"
            sideOffset={4}
            className="z-50 w-[100vw] md:w-[400px] max-h-[600px] overflow-y-scroll scrollbar-track-transparent custom-scrollbar bg-[#0A1020] border border-[#20293A] rounded-lg"
          >
            <div className="grid gap-4 px-2 pt-4 pb-4 font-normal">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-white text-[18px]">
                  {title}
                </h4>
                {content && (
                  <p className="text-sm text-[#FFFFFF]/85 pt-4 pb-2">
                    {content}
                  </p>
                )}
                {image && (
                  <img
                    src={image}
                    alt={title}
                    className="border border-[#20293A]/50 rounded-lg"
                  />
                )}

                {contentTwo && (
                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-2 h-2 rounded-full bg-[#209CFF]"></div>
                    <span className="text-sm text-[#209CFF]">{contentTwo}</span>
                  </div>
                )}

                {contentThree && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#EC0D38]"></div>
                    <span className="text-sm text-[#EC0D38]">
                      {contentThree}
                    </span>
                  </div>
                )}

                {contentFour && (
                  <div className="flex items-center gap-2 pb-4">
                    <div className="w-2 h-2 rounded-full bg-[#EEC800]"></div>
                    <span className="text-sm text-[#EEC800]">
                      {contentFour}
                    </span>
                  </div>
                )}

                {bullet && (
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-sm text-[#FFFFFF]/85">{bullet}</span>
                  </div>
                )}

                {descriptionTwo && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#209CFF]"></div>
                    <span className="text-sm text-[#209CFF]">
                      {descriptionTwo}
                    </span>
                  </div>
                )}

                {descriptionThree && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#EC0D38]"></div>
                    <span className="text-sm text-[#EC0D38]">
                      {descriptionThree}
                    </span>
                  </div>
                )}

                {descriptionTwoOneHour && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#209CFF]"></div>
                    <span className="text-sm text-[#209CFF]">
                      {descriptionTwoOneHour}
                    </span>
                  </div>
                )}

                {descriptionThreeOneHour && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-[#FFFFFF]"></div>
                    <span className="text-sm text-[#FFFFFF]">
                      {descriptionThreeOneHour}
                    </span>
                  </div>
                )}

                {imageGoldOneHour && (
                  <div className="pt-4 pb-4">
                    <img
                      src={imageGoldOneHour}
                      alt={descriptionTwoOneHour}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToGold && (
                  <div className="flex items-center gap-2 pb-2 pt-2">
                    <span className="text-sm text-[#FFFFFF]/60">
                      {howToGold}
                    </span>
                  </div>
                )}

                {imageGold && (
                  <div className="pb-4">
                    <img
                      src={imageGold}
                      alt={bullet}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {titleTechnical && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {titleTechnical}
                      </span>
                    </div>
                  </>
                )}

                {imageTechnical && (
                  <img
                    src={imageTechnical}
                    alt={titleTechnical}
                    className="border border-[#20293A]/50 rounded-lg"
                  />
                )}

                {contentTechnical && (
                  <div className="flex items-center gap-2 pb-2 pt-2">
                    <span className="text-sm text-[#FFFFFF]/75">
                      {contentTechnical}
                    </span>
                  </div>
                )}

                {howTo && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">{howTo}</span>
                    </div>
                  </>
                )}

                {video && (
                  <div className="pb-4">
                    <video
                      controls
                      className="rounded-lg border border-[#20293A]/50"
                      style={{ maxWidth: "100%" }}
                    >
                      <source src={video} type="video/mp4" />
                      <source src={video} type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {example && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {example}
                      </span>
                    </div>
                  </>
                )}

                {imageExample && (
                  <div className="pb-2">
                    <img
                      src={imageExample}
                      alt={example}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {exampleGold && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {exampleGold}
                      </span>
                    </div>
                  </>
                )}

                {imageGoldExample && (
                  <div className="pb-2">
                    <img
                      src={imageGoldExample}
                      alt={exampleGold}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {descriptionTips && (
                  <>
                    <div className="flex items-center gap-2 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {descriptionTips}
                      </span>
                    </div>
                  </>
                )}

                {descriptionTipsGoldOneHour && (
                  <>
                    <div className="flex items-center gap-3 pb-4">
                      <div className="w-[2px] h-6 bg-[#209CFF]"></div>
                      <span className="text-sm text-[#209CFF]/85">
                        {descriptionTipsGoldOneHour}
                      </span>
                    </div>
                  </>
                )}

                {tips && (
                  <>
                    <div className="flex items-center gap-2 bg-[#209CFF]/10 p-5 rounded-lg">
                      <Lightbulb className="text-[#209CFF] mr-2 w-10" />
                      <span className="text-sm text-[#209CFF]/85">{tips}</span>
                    </div>
                  </>
                )}

                {/* Gamma AI page */}

                {subTitleGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-4">
                      <div className="w-1 h-1 bg-[#209CFF]"></div>
                      <span className="text-[14px] font-medium text-[#FFFFFF]">
                        {subTitleGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {detailGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {subTitleGammaAI && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#209CFF]"></div>
                      <span className="text-[14px] font-medium text-[#FFFFFF]">
                        {subTitleGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {howToGammaAI && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {imageGammaAI && (
                  <div className="pb-2">
                    <img
                      src={imageGammaAI[0]}
                      alt="show-spot"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[0]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[1]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[2]}
                      </div>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[3]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[4]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[5]}
                      </div>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[2]}
                      </span>
                    </div>
                  </>
                )}

                {titleBulletGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm font-medium text-[#FFFFFF]/85">
                        {titleBulletGammaAI[0]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[6]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[7]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[8]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletGammaAI && (
                  <>
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-sm font-medium text-[#FFFFFF]/85">
                        {titleBulletGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[9]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[10]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[11]}
                      </div>
                    </div>
                  </>
                )}

                {howToGammaAI && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToGammaAI[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[3]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[4]}
                      </div>
                    </div>
                  </>
                )}

                {imageGammaAI && (
                  <div className="pb-2">
                    <img
                      src={imageGammaAI[1]}
                      alt="major-minor"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToGammaAI && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToGammaAI[2]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToGammaAI && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToGammaAI[5]}
                      </div>
                    </div>
                  </>
                )}

                {imageGammaAI && (
                  <div className="pb-2">
                    <img
                      src={imageGammaAI[2]}
                      alt="major-minor"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {titleBulletGammaAI && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#FFFFFF]/85">
                        {titleBulletGammaAI[2]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[12]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[13]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletGammaAI && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#FFFFFF]/85">
                        {titleBulletGammaAI[3]}
                      </span>
                    </div>
                  </>
                )}

                {bulletGammaAI && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletGammaAI[14]}
                      </div>
                    </div>
                  </>
                )}

                {imageGammaAI && (
                  <div className="pb-2">
                    <img
                      src={imageGammaAI[3]}
                      alt="timeframe"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {/* Price Analysis */}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[0]}
                      alt="timeframe"
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToPriceAnalysis && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToPriceAnalysis[0]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToPriceAnalysis && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToPriceAnalysis}
                      </div>
                    </div>
                  </>
                )}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[1]}
                      alt={imagePriceAnalysis[1]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToPriceAnalysis && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToPriceAnalysis[1]}
                      </span>
                    </div>
                  </>
                )}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[2]}
                      alt={imagePriceAnalysis[2]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToPriceAnalysis && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToPriceAnalysis[2]}
                      </span>
                    </div>
                  </>
                )}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[3]}
                      alt={imagePriceAnalysis[3]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToPriceAnalysis && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToPriceAnalysis[3]}
                      </span>
                    </div>
                  </>
                )}

                {imagePriceAnalysis && (
                  <div className="pb-2">
                    <img
                      src={imagePriceAnalysis[4]}
                      alt={imagePriceAnalysis[4]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {/* OI */}

                {subTitleOi && (
                  <>
                    <div className="flex items-center gap-2 pt-4">
                      <div className="w-1 h-1 bg-[#209CFF]"></div>
                      <span className="text-[14px] font-medium text-[#FFFFFF]">
                        {subTitleOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {detailOi && (
                  <>
                    <div className="flex items-center gap-2 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {imageOi && (
                  <div className="pb-2">
                    <img
                      src={imageOi[0]}
                      alt={imageOi[0]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3 pb-4">
                      <div className="w-[4px] h-14 bg-[#209CFF]/40"></div>
                      <span className="text-sm text-[#209CFF]/85">
                        {detailHowToOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {subTitleOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#209CFF]"></div>
                      <span className="text-[14px] font-medium text-[#FFFFFF]">
                        {subTitleOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailOi && (
                  <>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3 pb-4">
                      <span className="text-sm text-[#FFFFFF]/70">
                        {detailHowToOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3 pb-4">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[2]}
                      </span>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/70">
                        {titleBulletOi[0]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[0]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[1]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/70">
                        {titleBulletOi[1]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[2]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[3]}
                      </div>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[2]}
                      </span>
                    </div>
                  </>
                )}

                {imageOi && (
                  <div className="pb-2">
                    <img
                      src={imageOi[1]}
                      alt={imageOi[1]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[2]}
                      </span>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {titleBulletOi[2]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[4]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[5]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {titleBulletOi[3]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[6]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[7]}
                      </div>
                    </div>
                  </>
                )}

                {titleBulletOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {titleBulletOi[4]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[8]}
                      </div>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[4]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[3]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70 pb-2">
                        {bulletOi[9]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[10]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[11]}
                      </div>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[4]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[12]}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-[#FFFFFF]/70">
                          {bulletOi[13]}
                        </div>
                        <div className="w-4 h-1 bg-[#209CFF]"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-[#FFFFFF]/70">
                          {bulletOi[14]}
                        </div>
                        <div className="w-4 h-1 bg-[#089981]"></div>
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[15]}
                      </div>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[5]}
                      </span>
                    </div>
                  </>
                )}

                {bulletOi && (
                  <>
                    <div className="items-center gap-2 pb-2">
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[16]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/70">
                        {bulletOi[17]}
                      </div>
                    </div>
                  </>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[6]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="items-center gap-3">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[9]}
                      </div>
                    </div>
                  </>
                )}

                {imageOi && (
                  <div className="pb-2 pt-2">
                    <img
                      src={imageOi[2]}
                      alt={imageOi[2]}
                      className="border border-[#20293A]/50 rounded-lg"
                    />
                  </div>
                )}

                {howToOi && (
                  <>
                    <div className="border-t border-[#20293A]/50 pt-4"></div>
                    <div className="flex items-center gap-2 pb-2">
                      <span className="text-sm text-[#FFFFFF]/60">
                        {howToOi[5]}
                      </span>
                    </div>
                  </>
                )}

                {detailHowToOi && (
                  <>
                    <div className="items-center gap-3 pb-2">
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[6]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[7]}
                      </div>
                      <div className="text-sm text-[#FFFFFF]/85">
                        {detailHowToOi[8]}
                      </div>
                    </div>
                  </>
                )}

                {tipsOi && (
                  <>
                    <div className="flex items-center gap-2 bg-[#209CFF]/10 p-5 rounded-lg">
                      <div className="w-[15%]">
                        <Lightbulb className="text-[#209CFF] mr-2 w-10" />
                      </div>
                      <div className="w-[85%]">
                        <span className="text-sm text-[#209CFF]/85">
                          {tipsOi}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
};

export default Tooltips;
