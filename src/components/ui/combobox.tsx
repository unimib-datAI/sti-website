"use client"

import * as React from "react"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, Filter, type LucideIcon } from 'lucide-react';


export type Options = {
  value: string;
  label: string;
  icon?: LucideIcon;
};

type ComboboxProps = {
  options: Options[];
  emptyText: string;
  placeholder: string;
  label: string;
  value?: string;
  setValue: (value: string) => void;
  triggerClassName?: string;
  itemClassName?: string;
  containerClassName?: string;
  triggerText?: string;
};


export function ComboboxPopover(props: ComboboxProps) {
  const {
    options,
    emptyText,
    placeholder,
    label,
    value,
    setValue,
    triggerClassName,
    containerClassName,
    itemClassName,
    triggerText,
  } = props;

  const [open, setOpen] = React.useState(false);

  const getSelectedOption = (value: string | undefined) => {
    return options.find((option) => option.value.toLowerCase() === value?.toLowerCase());
  };

  const selectedStatus = getSelectedOption(value);

  const handleOnSelect = (currentValue: string) => {
    setValue(currentValue === value ? '' : currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={triggerClassName}
        >
          {selectedStatus ? (
            triggerText ? (
              triggerText
            ) : (
              <>
                {selectedStatus.icon && (
                  <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                )}
                {selectedStatus.label}
              </>
            )
          ) : (
            <>{label}</>
          )}
          <Filter
            className="ml-2 h-4 w-4 shrink-0"
            fill={selectedStatus ? 'currentColor' : 'none'}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('p-0', containerClassName)}
        side="right"
        align="start"
      >
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyText}.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={handleOnSelect}
                  className={cn(
                    'relative flex w-full cursor-pointer select-none items-center justify-between rounded-md px-2.5 py-1.5 text-sm text-slate-50 outline-none transition-colors hover:bg-slate-950',
                    value?.toLowerCase() === option.value.toLowerCase() &&
                      'bg-blue-900 hover:bg-slate-950 text-white',
                    itemClassName
                  )}
                >
                  {option.icon && (
                    <option.icon
                      className={cn(
                        'mr-2 h-4 w-4',
                        option.value.toLowerCase() === selectedStatus?.value.toLowerCase()
                          ? 'opacity-100'
                          : 'opacity-40'
                      )}
                    />
                  )}
                  <span>{option.label}</span>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value?.toLowerCase() === option.value.toLowerCase() ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
