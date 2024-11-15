import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date?: Date
  setDate: (date: Date | undefined) => void
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-[50px] justify-between text-left font-normal bg-[#030816] border-[#20293A] text-[#D1D4DC] hover:text-[#D1D4DC] hover:bg-[#030816] hover:border-[#434651] rounded-[10px]",
            !date && "text-[#D1D4DC]"
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <ChevronsUpDown className="h-4 w-4 text-[#868993] opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-[rgba(3,8,22,0.70)] border-[#20293A] shadow-[0px_0px_10px_0px_rgba(23,31,51,0.40)] backdrop-blur-[7.5px] text-[#D1D4DC]"
        align="start"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
} 