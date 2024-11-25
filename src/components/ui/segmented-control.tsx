import * as React from "react"
import { cn } from "@/lib/utils"

interface SegmentedControlProps {
  segments: {
    value: string | number
    label: string | number
  }[]
  value: string | number
  onChange: (value: string | number) => void
  className?: string
}

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ segments, value, onChange, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center bg-[#030816] border border-[#20293A] rounded-xl p-1 h-[50px] gap-1",
          className
        )}
      >
        {segments.map((segment) => (
          <button
            key={segment.value}
            onClick={() => onChange(segment.value)}
            className={cn(
              "px-6 py-2 rounded-lg text-sm h-[40px] transition-all duration-200",
              "text-[#535B6A] hover:bg-[#172036]",
              value === segment.value && "bg-[#172036] text-white font-medium"
            )}
          >
            {segment.label}
          </button>
        ))}
      </div>
    )
  }
)

SegmentedControl.displayName = "SegmentedControl"

export { SegmentedControl } 