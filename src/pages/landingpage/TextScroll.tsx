import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import React from "react";

const TextScroll: React.FC = () => {
  return (
    <div className="w-full my-20">
      <VelocityScroll
        text={`With Gold Investic, let data-driven insights lead your next move and enhance your trading success.`}
        default_velocity={1}
        className="font-display text-center text-[40px] md:text-[60px] lg:text-[72px] font-bold tracking-[-0.02em] text-[#209CFF]/85 drop-shadow-sm dark:text-white md:leading-[5rem] lg:leading-[5.5rem]"
      />
    </div>
  );
};

export default TextScroll;
