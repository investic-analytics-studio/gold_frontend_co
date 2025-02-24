import React from "react";

const TextScroll: React.FC = () => {
  return (
    <div className="container mx-auto px-4 my-20">
        <div className="relative w-full h-[1px] mb-20">
          {/* Center border */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-full bg-[#E0E3EB]" />
          
          {/* Left fade */}
          <div className="absolute left-0 w-1/4 h-full bg-gradient-to-r from-transparent to-[#E0E3EB]" />
          
          {/* Right fade */}
          <div className="absolute right-0 w-1/4 h-full bg-gradient-to-l from-transparent to-[#E0E3EB]" />
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-evenly space-y-4 md:space-y-0 md:space-x-8">
          <h2 className="text-[40px] lg:text-[30px] font-semibold lg:font-medium text-secondary shrink-0">
            Who's <span className="text-primary">INVESTIC</span>
          </h2>
          <p className="text-lg text-secondary/50 font-medium text-center md:text-left leading-relaxed max-w-2xl">
            Gold Investic offers advanced tools for gold traders, providing 
            deep insights into Gold market trends. Use our data-driven approach 
            to refine your trading strategy and gain a competitive edge.
          </p>
        </div>
        <div className="relative w-full h-[1px] mt-20">
          {/* Center border */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 h-full bg-[#E0E3EB]" />
          
          {/* Left fade */}
          <div className="absolute left-0 w-1/4 h-full bg-gradient-to-r from-transparent to-[#E0E3EB]" />
          
          {/* Right fade */}
          <div className="absolute right-0 w-1/4 h-full bg-gradient-to-l from-transparent to-[#E0E3EB]" />
        </div>
      </div>
  );
};

export default TextScroll;
