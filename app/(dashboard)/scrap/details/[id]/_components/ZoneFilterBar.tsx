"use client";

import React, { useEffect, useRef } from "react";
import { Grid3x3, Layers, RotateCcw, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FilterChip, MultiSelectFilter, type FilterOptionGroup } from "@/components/filters/FacetFilters";

export type { FilterOptionGroup };

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
    <div className="mx-3 mt-2 rounded-lg border bg-gradient-to-r from-blue-50/80 via-background to-background p-2 shadow-sm dark:from-blue-950/30">
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
            className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-16 text-xs shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
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
