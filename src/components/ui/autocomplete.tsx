"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface AutocompleteOption {
  value: string
  label: string
}

interface AutocompleteProps {
  options: AutocompleteOption[]
  value: string
  onValueChange: (value: string) => void
  searchValue?: string
  onSearchValueChange?: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  searchPlaceholder?: string
  className?: string
  isLoading?: boolean
  loadingRef?: (node?: Element | null) => void
  hasMore?: boolean
}

const NO_SELECTION = "NO_SELECTION";

export function Autocomplete({
  options,
  value,
  onValueChange,
  searchValue = "",
  onSearchValueChange,
  placeholder = "Select an option",
  emptyMessage = "No results found.",
  searchPlaceholder = "Search...",
  className,
  isLoading = false,
  loadingRef,
  hasMore,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [localSearchValue, setLocalSearchValue] = React.useState(searchValue)
  const [isHovered, setIsHovered] = React.useState<string>("")

  const filteredOptions = React.useMemo(() => {
    if (!localSearchValue) return options
    
    return options.filter((option) => 
      option.label.toLowerCase().includes(localSearchValue.toLowerCase()) ||
      option.value.toLowerCase().includes(localSearchValue.toLowerCase())
    )
  }, [options, localSearchValue])

  const selectedOption = React.useMemo(() => 
    options.find((option) => option.value === value),
    [options, value]
  )

  const handleSearch = (search: string) => {
    setLocalSearchValue(search)
    onSearchValueChange?.(search)
  }

  const handleSelect = (currentValue: string) => {
    if (currentValue === value) {
      onValueChange(NO_SELECTION)
    } else {
      onValueChange(currentValue)
    }
    setOpen(false)
    setLocalSearchValue("")
    onSearchValueChange?.("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full font-normal text-sm justify-between bg-[#030816] text-[#D1D4DC] border border-[#20293A] hover:bg-[#030816] hover:text-[#D1D4DC] hover:border-[#434651] h-[50px] rounded-[10px]", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg z-[9999]" align="start">
        <Command className="bg-[#030816] text-[#D1D4DC] border border-[#20293A]" shouldFilter={false}>
          <CommandInput 
            placeholder={searchPlaceholder}
            value={localSearchValue}
            onValueChange={handleSearch}
            className="bg-[#030816] text-[#535B6A] placeholder:text-[#535B6A] focus:text-[#FFFFFF]"
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Loading..." : emptyMessage}
            </CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  onMouseEnter={() => setIsHovered(option.value)}
                  onMouseLeave={() => setIsHovered("")}
                  className={cn(
                    "cursor-pointer transition-colors duration-200",
                    "hover:bg-[#172036] hover:text-white",
                    value === option.value && "text-primary",
                    isHovered === option.value && "text-white"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
              {hasMore && (
                <div ref={loadingRef} className="py-2 text-center text-sm text-muted-foreground">
                  {isLoading ? "Loading more..." : "Scroll for more"}
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
