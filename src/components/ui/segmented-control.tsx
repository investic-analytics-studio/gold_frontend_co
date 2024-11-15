import { cn } from "@/lib/utils"

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className
}: SegmentedControlProps<T>) {
  return (
    <div className={cn(
      "flex items-center bg-[#030816] border border-[#20293A] rounded-xl p-1 h-[50px]",
      className
    )}>
      {options.map((option) => (
        <button
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-6 py-2 rounded-lg text-sm h-[40px] transition-all duration-200",
            "text-[#535B6A] hover:text-white",
            value === option.value && "bg-[#172036] text-white font-medium"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
} 