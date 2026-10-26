"use client";

import React from "react";
import { CalendarDays, Layers, RotateCcw, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterChip, MultiSelectFilter } from "@/components/filters/FacetFilters";
import { zoneBarChartColors } from "@/constants/zoneBarChartColors";

export const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const FULL_YEAR = "all";

interface TableFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  zones: string[];
  zoneFilter: string[];
  onZoneFilterChange: (values: string[]) => void;
  year: number;
  // "" = whole year
  month: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  visibleZones: number;
  totalZones: number;
  onReset: () => void;
}

// Filter bar of "Détail par zone": search and zones filter the rows on screen,
// year and month reload the data
export function TableFilter({
  search,
  onSearchChange,
  zones,
  zoneFilter,
  onZoneFilterChange,
  year,
  month,
  onYearChange,
  onMonthChange,
  visibleZones,
  totalZones,
  onReset,
}: TableFilterProps) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, index) => currentYear - 4 + index);
  const hasFilters = search.trim() !== "" || zoneFilter.length > 0 || month !== "";

  return (
    <div className="rounded-lg border bg-gradient-to-r from-blue-50/80 via-background to-background p-2 shadow-sm dark:from-blue-950/30">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onSearchChange("");
            }}
            placeholder="Rechercher une zone…"
            aria-label="Rechercher une zone"
            className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-8 text-xs shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Effacer la recherche"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <MultiSelectFilter
          label="Zone"
          icon={Layers}
          groups={[{ options: zones }]}
          selected={zoneFilter}
          onChange={onZoneFilterChange}
          emptyText="Aucune zone trouvée."
          optionColor={(zone) => zoneBarChartColors[zone] || "#8E98F5"}
        />

        <div className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
          <Select value={year.toString()} onValueChange={onYearChange}>
            <SelectTrigger className="h-8 w-[88px] bg-background text-xs" aria-label="Année">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((option) => (
                <SelectItem key={option} value={option.toString()} className="text-xs">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={month === "" ? FULL_YEAR : month}
            onValueChange={(value) => onMonthChange(value === FULL_YEAR ? "" : value)}
          >
            <SelectTrigger className="h-8 w-[130px] bg-background text-xs" aria-label="Mois">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FULL_YEAR} className="text-xs">
                Année entière
              </SelectItem>
              {MONTHS_FR.map((name, index) => (
                <SelectItem key={name} value={(index + 1).toString()} className="text-xs">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
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
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 border-t pt-1.5">
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
          {month !== "" && (
            <FilterChip
              label="Mois"
              value={`${MONTHS_FR[Number(month) - 1] ?? month} ${year}`}
              onRemove={() => onMonthChange("")}
            />
          )}
        </div>
      )}
    </div>
  );
}
