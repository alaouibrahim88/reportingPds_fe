"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, Grid3x3, Layers, Loader2, RotateCcw, Search, X } from "lucide-react";

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

export type FilterOptionGroup = { heading?: string; options: string[] };

interface MultiSelectFilterProps {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  groups: FilterOptionGroup[];
  selected: string[];
  onChange: (values: string[]) => void;
  loading?: boolean;
  emptyText: string;
}

// Faceted multi-select: dashed button that fills in once something is selected
const MultiSelectFilter = ({
  label,
  icon: Icon,
  groups,
  selected,
  onChange,
  loading,
  emptyText,
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
            "h-9 gap-2 border-dashed text-xs font-medium",
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

const FilterChip = ({
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

interface ZoneFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  zones: string[];
  zoneFilter: string[];
  onZoneFilterChange: (values: string[]) => void;
  cellGroups: FilterOptionGroup[];
  cellFilter: string[];
  onCellFilterChange: (values: string[]) => void;
  cellsLoading: boolean;
  visibleZones: number;
  totalZones: number;
  onReset: () => void;
}

const ZoneFilterBar = ({
  search,
  onSearchChange,
  zones,
  zoneFilter,
  onZoneFilterChange,
  cellGroups,
  cellFilter,
  onCellFilterChange,
  cellsLoading,
  visibleZones,
  totalZones,
  onReset,
}: ZoneFilterBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasFilters = search.trim() !== "" || zoneFilter.length > 0 || cellFilter.length > 0;

  // Ctrl+K / ⌘K jumps to the search field from anywhere on the page
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="mx-3 mt-3 rounded-lg border bg-gradient-to-r from-blue-50/80 via-background to-background p-3 shadow-sm dark:from-blue-950/30">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onSearchChange("");
            }}
            placeholder="Rechercher une zone ou une cellule…"
            aria-label="Rechercher une zone ou une cellule"
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-16 text-xs shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
          />
          {search ? (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                inputRef.current?.focus();
              }}
              aria-label="Effacer la recherche"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 select-none rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:block">
              Ctrl K
            </kbd>
          )}
        </div>

        <MultiSelectFilter
          label="Zone"
          icon={Layers}
          groups={[{ options: zones }]}
          selected={zoneFilter}
          onChange={onZoneFilterChange}
          emptyText="Aucune zone trouvée."
        />
        <MultiSelectFilter
          label="Cellule"
          icon={Grid3x3}
          groups={cellGroups}
          selected={cellFilter}
          onChange={onCellFilterChange}
          loading={cellsLoading}
          emptyText="Aucune cellule trouvée."
        />

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Réinitialiser
          </Button>
        )}

        <span className="ml-auto text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{visibleZones}</span> / {totalZones} zones
        </span>
      </div>

      {hasFilters && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t pt-2">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Filtres actifs
          </span>
          {search.trim() && (
            <FilterChip label="Recherche" value={`« ${search.trim()} »`} onRemove={() => onSearchChange("")} />
          )}
          {zoneFilter.map((zone) => (
            <FilterChip
              key={`zone-${zone}`}
              label="Zone"
              value={zone}
              onRemove={() => onZoneFilterChange(zoneFilter.filter((v) => v !== zone))}
            />
          ))}
          {cellFilter.map((cell) => (
            <FilterChip
              key={`cell-${cell}`}
              label="Cellule"
              value={cell}
              onRemove={() => onCellFilterChange(cellFilter.filter((v) => v !== cell))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ZoneFilterBar;
