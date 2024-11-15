import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-[10px] border border-input border-[#20293A] h-[50px] bg-[#030816] px-3 py-2 text-sm font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-normal file:text-foreground placeholder:text-[#20293A] placeholder:font-normal placeholder:text-sm focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
