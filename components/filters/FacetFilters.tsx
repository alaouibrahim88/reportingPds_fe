"use client";

import React, { useState } from "react";
import { Check, Loader2, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Shared by the scrap filter bars (Scrap page and Scrap Details)

export type FilterOptionGroup = { heading?: string; options: string[] };

interface MultiSelectFilterProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  groups: FilterOptionGroup[];
  selected: string[];
  onChange: (values: string[]) => void;
  loading?: boolean;
  emptyText: string;
  // Optional colour dot per option (e.g. zone colours)
  optionColor?: (option: string) => string | undefined;
}

// Faceted multi-select: dashed button that fills in once something is selected
export const MultiSelectFilter = ({
  label,
  icon: Icon,
  groups,
  selected,
  onChange,
  loading,
  emptyText,
  optionColor,
}: MultiSelectFilterProps) => {
  const [open, setOpen] = useState(false);

  const toggle = (value: string) =>
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-2 border-dashed text-xs font-medium",
            selected.length > 0 &&
              "border-solid border-primary/40 bg-primary/5 text-primary hover:bg-primary/10"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
          {selected.length > 0 && (
            <>
              <span className="mx-0.5 h-4 w-px bg-primary/30" />
              {selected.length > 2 ? (
                <Badge variant="secondary" className="rounded-sm px-1.5 text-[11px]">
                  {selected.length} sélectionnées
                </Badge>
              ) : (
                selected.map((value) => (
                  <Badge key={value} variant="secondary" className="rounded-sm px-1.5 text-[11px]">
                    {value}
                  </Badge>
                ))
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <Command>
          <CommandInput placeholder={`Rechercher une ${label.toLowerCase()}…`} className="h-9 text-xs" />
          <CommandList>
            {loading ? (
              <div className="flex items-center justify-center gap-2 py-6 text-xs text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Chargement…
              </div>
            ) : (
              <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">
                {emptyText}
              </CommandEmpty>
            )}
            {groups.map(
              (group) =>
                group.options.length > 0 && (
                  <CommandGroup key={group.heading ?? "all"} heading={group.heading}>
                    {group.options.map((option) => {
                      const isSelected = selected.includes(option);
                      const color = optionColor?.(option);
                      return (
                        <CommandItem
                          key={`${group.heading ?? ""}-${option}`}
                          value={`${group.heading ?? ""} ${option}`}
                          onSelect={() => toggle(option)}
                          className="text-xs"
                        >
                          <span
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded-[4px] border border-primary/50",
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "opacity-60 [&_svg]:invisible"
                            )}
                          >
                            <Check className="h-3 w-3" />
                          </span>
                          {color && (
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                          )}
                          <span className="truncate">{option}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )
            )}
            {selected.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onChange([])}
                    className="justify-center text-xs text-muted-foreground"
                  >
                    Effacer la sélection
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const FilterChip = ({
  label,
  value,
  onRemove,
}: {
  label: string;
  value: string;
  onRemove: () => void;
}) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 py-0.5 pl-2.5 pr-1 text-[11px] text-primary">
    <span className="text-primary/70">{label} :</span>
    <span className="font-semibold">{value}</span>
    <button
      type="button"
      onClick={onRemove}
      aria-label={`Retirer le filtre ${label} ${value}`}
      className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-primary/15"
    >
      <X className="h-3 w-3" />
    </button>
  </span>
);
