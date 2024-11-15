import { cn } from "@/lib/utils"
import { TimeRange } from "@/types/time-range"

interface TimeRangeSegmentedControlProps {
  options: { value: TimeRange; label: string }[]
  value: TimeRange
  onSelect: (value: TimeRange) => void
  className?: string
}

export function TimeRangeSegmentedControl({
  options,
  value,
  onSelect,
  className
}: TimeRangeSegmentedControlProps) {
  return (
    <div className={cn(
      "flex items-center bg-[#030816] border border-[#20293A] rounded-xl p-1 h-[50px] gap-1",
      className
    )}>
      {options.map((option) => (
        <button
          key={String(option.value)}
          onClick={() => onSelect(option.value)}
          className={cn(
            "px-4 lg:px-6 py-2 rounded-lg text-sm h-[40px] transition-all duration-300",
            value === option.value 
              ? "bg-[#172036] text-white" 
              : "text-[#535B6A] hover:bg-[#172036]"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
} 