"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = "#209CFF",
  duration = "3s",
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        "relative text-center border border-[#20293A] cursor-pointer flex justify-center items-center rounded-lg text-white dark:text-black bg-transparent dark:bg-transparent px-4 py-2",
        className,
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-[#0A1020] animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}
