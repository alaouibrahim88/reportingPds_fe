import { Dispatch, SetStateAction, useState } from "react";
import { ZoneDataType, weekData } from "./data/dashboardData";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zoneBarChartColors } from "@/constants/zoneBarChartColors";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Loader2, Zap } from "lucide-react";

const shortDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });
const monthName = new Intl.DateTimeFormat("fr-FR", { month: "long", timeZone: "UTC" });

const pad = (week: number) => week.toString().padStart(2, "0");

const euros = (value: number | undefined) =>
  (value ?? 0).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Monday of an ISO week (week 1 is the one containing 4 January)
function isoWeekMonday(year: number, week: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() || 7) - 1) + (week - 1) * 7);
  return monday;
}

// Month of an ISO week = month of its Thursday, as in Zone Details (S40 of 2026 is October)
function isoWeekMonth(year: number, week: number): number {
  const thursday = isoWeekMonday(year, week);
  thursday.setUTCDate(thursday.getUTCDate() + 3);
  return thursday.getUTCMonth();
}

// Monday of the first week to Sunday of the last one
function weekRange(year: number, firstWeek: number, lastWeek = firstWeek): string {
  const monday = isoWeekMonday(year, firstWeek);
  const sunday = isoWeekMonday(year, lastWeek);
  sunday.setUTCDate(sunday.getUTCDate() + 6);
  return `${shortDate.format(monday)} – ${shortDate.format(sunday)} ${sunday.getUTCFullYear()}`;
}

interface ZoneActivityProps {
  // Selected weeks, in order (one by default)
  weeks: number[];
  year: number;
  loading: boolean;
  availableWeeks: number[];
  availableYears: number[];
  data: ZoneDataType | undefined;
  onWeeksChange: Dispatch<SetStateAction<number[]>>;
  onYearChange: (year: number) => void;
}

export function ZoneActivity({
  weeks,
  year,
  data,
  loading,
  availableWeeks,
  availableYears,
  onWeeksChange,
  onYearChange,
}: ZoneActivityProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  // « Une semaine » (as before) or « Plusieurs semaines » (weeks are added up)
  const [multiple, setMultiple] = useState(weeks.length > 1);

  const firstWeek = weeks[0];
  const lastWeek = weeks[weeks.length - 1];
  const contiguous = lastWeek - firstWeek === weeks.length - 1;
  const firstAvailable = availableWeeks[0] ?? 1;
  const lastAvailable = availableWeeks[availableWeeks.length - 1] ?? lastWeek;

  const subtitle =
    weeks.length === 1
      ? `S${pad(firstWeek)} · ${weekRange(year, firstWeek)}`
      : contiguous
        ? `S${pad(firstWeek)} à S${pad(lastWeek)} · ${weekRange(year, firstWeek, lastWeek)}`
        : `${weeks.map((week) => `S${pad(week)}`).join(", ")} · ${weeks.length} semaines`;

  const pickerLabel =
    weeks.length === 1
      ? `S${pad(firstWeek)} · ${shortDate.format(isoWeekMonday(year, firstWeek))}`
      : contiguous
        ? `S${pad(firstWeek)} à S${pad(lastWeek)} · ${weeks.length} sem.`
        : weeks.length <= 3
          ? weeks.map((week) => `S${pad(week)}`).join(", ")
          : `${weeks.length} semaines`;

  // Quick choices: last 4 weeks, current month, previous month (weeks of the year only)
  const currentMonth = isoWeekMonth(year, lastAvailable);
  const presets = [
    { label: "4 dernières semaines", weeks: availableWeeks.slice(-4) },
    ...[currentMonth, currentMonth - 1]
      .filter((month) => month >= 0)
      .map((month) => {
        const name = monthName.format(new Date(Date.UTC(year, month, 1)));
        return {
          label: name.charAt(0).toUpperCase() + name.slice(1),
          weeks: availableWeeks.filter((week) => isoWeekMonth(year, week) === month),
        };
      }),
  ].filter((preset) => preset.weeks.length > 0);

  const sameWeeks = (list: number[]) => list.length === weeks.length && list.every((week, index) => week === weeks[index]);

  const chooseMode = (isMultiple: boolean) => {
    setMultiple(isMultiple);
    // Back to one week: the most recent of the selection
    if (!isMultiple && weeks.length > 1) onWeeksChange([lastWeek]);
  };

  const chooseWeek = (week: number) => {
    if (!multiple) {
      onWeeksChange([week]);
      setPickerOpen(false);
      return;
    }
    // From the latest selection (quick clicks); at least one week stays selected
    onWeeksChange((previous) => {
      const next = previous.includes(week) ? previous.filter((w) => w !== week) : [...previous, week];
      return next.length > 0 ? next.sort((a, b) => a - b) : previous;
    });
  };

  const choosePreset = (presetWeeks: number[]) => {
    setMultiple(presetWeeks.length > 1);
    onWeeksChange(presetWeeks);
    setPickerOpen(false);
  };

  // Previous / next move the whole selection by one week
  const shiftWeeks = (delta: number) => onWeeksChange((previous) => previous.map((week) => week + delta));

  const zones = data?.currWeekData
    ?.slice(1)
    .map((item: weekData) => ({
      name: item.libelle,
      count: item.qteParZone,
      color: zoneBarChartColors[item.libelle]
    }));

  const metrics = (data?.currWeekData ?? []).slice(0).map((item: weekData) => ({
    totalProcess: item.process,
    totalMatiere: item.matiere,
    totalProjet: item.projetEuro,
    totalSerie: item.serieEuro,
    criticialIssues: 3, //item.projetEuro,
  }))[0];

  return (
    <div className="bg-card rounded-lg shadow-sm p-2 sm:p-3">
      <div className="mb-2 flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/15">
          <Zap className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">Activité hebdomadaire</h3>
          <p className="truncate text-xs text-muted-foreground" title={subtitle}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Week picker with previous / next: one week (default) or several, added up. No year
          choice: GetCurrDataWeekScrap (pr_Scrap_PARCURENTWEEK) always reads the current year */}
      <div className="mb-3 flex items-center gap-1.5 rounded-lg border bg-gradient-to-r from-blue-50/80 via-background to-background p-1.5 shadow-sm dark:from-blue-950/30">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => shiftWeeks(-1)}
            disabled={firstWeek <= firstAvailable}
            aria-label={weeks.length > 1 ? "Semaines précédentes" : "Semaine précédente"}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={pickerOpen}
                aria-label="Semaines"
                className={cn(
                  "h-8 min-w-0 flex-1 justify-between gap-1 bg-background px-3 text-xs font-normal",
                  weeks.length > 1 && "border-primary/40 bg-primary/5 text-primary hover:bg-primary/10"
                )}
              >
                <span className="truncate">{pickerLabel}</span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="center">
              <div className="space-y-2 border-b p-2">
                <div role="tablist" aria-label="Sélection des semaines" className="grid grid-cols-2 rounded-md bg-muted p-0.5">
                  {[false, true].map((isMultiple) => (
                    <button
                      key={String(isMultiple)}
                      type="button"
                      role="tab"
                      aria-selected={multiple === isMultiple}
                      onClick={() => chooseMode(isMultiple)}
                      className={cn(
                        "h-7 whitespace-nowrap rounded px-1.5 text-[11px] font-medium transition-colors",
                        multiple === isMultiple
                          ? "bg-background text-primary shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isMultiple ? "Plusieurs semaines" : "Une semaine"}
                    </button>
                  ))}
                </div>
                {multiple && (
                  <div className="flex flex-wrap gap-1">
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => choosePreset(preset.weeks)}
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-[11px] transition-colors",
                          sameWeeks(preset.weeks)
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "text-muted-foreground hover:border-primary/30 hover:text-foreground"
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Command>
                <CommandInput placeholder="Rechercher une semaine…" className="h-9 text-xs" />
                <CommandList className="max-h-64">
                  <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">
                    Aucune semaine
                  </CommandEmpty>
                  <CommandGroup>
                    {[...availableWeeks].reverse().map((weekOption) => {
                      const isSelected = weeks.includes(weekOption);
                      const monday = shortDate.format(isoWeekMonday(year, weekOption));
                      return (
                        <CommandItem
                          key={weekOption}
                          value={`S${pad(weekOption)} ${weekOption} ${monday}`}
                          onSelect={() => chooseWeek(weekOption)}
                          className="text-xs"
                        >
                          {multiple ? (
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
                          ) : (
                            <Check className={cn("h-3.5 w-3.5 text-primary", !isSelected && "invisible")} />
                          )}
                          S{pad(weekOption)} · {monday}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
              {multiple && (
                <div className="flex items-center justify-between border-t px-2 py-1.5 text-[11px] text-muted-foreground">
                  <span>
                    {weeks.length} semaine{weeks.length > 1 ? "s" : ""} additionnée{weeks.length > 1 ? "s" : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => choosePreset([lastAvailable])}
                    className="font-medium text-primary hover:underline"
                  >
                    Semaine en cours
                  </button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => shiftWeeks(1)}
            disabled={lastWeek >= lastAvailable}
            aria-label={weeks.length > 1 ? "Semaines suivantes" : "Semaine suivante"}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" aria-label="Chargement" />}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Process</div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalProcess} 
            <span className="text-xs text-muted-foreground ml-1"> (Pcs)</span>
          </div>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground"> Total Matière</div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalMatiere} 
            <span className="text-xs text-muted-foreground ml-1"> (Pcs)</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Projet </div>
          <div className="text-sm font-medium text-foreground">
            {euros(metrics?.totalProjet)} €
          </div>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Serie </div>
          <div className="text-sm font-medium text-foreground">
            {euros(metrics?.totalSerie)} €
          </div>
        </div>
      </div>

      {/* Combined Total */}
      <div className="bg-primary/10 border border-primary/20 p-2 rounded-lg mb-3">
        <div className="text-xs text-muted-foreground">Total (Projet + Série)</div>
        <div className="text-sm font-bold text-primary">
          {euros((metrics?.totalProjet ?? 0) + (metrics?.totalSerie ?? 0))} €
        </div>
      </div>

      {/* Zone List */}
      <div className="space-y-2">
        {zones?.map((zone) => (

          
     
          <div
         
            key={zone.name}
          
            className="flex items-center justify-between p-1.5 sm:p-2 bg-muted/50 rounded-lg" >

            <div className="flex items-center gap-1.5 sm:gap-2">
          
            <div 
            
            //className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs bg-orange-300"

            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs ${
              (() => {
                const letter = zone.name.charAt(0).toUpperCase();
                if ('H'.includes(letter)) return 'bg-red-400';
                if ('B'.includes(letter)) return 'bg-green-500';
                if ('G'.includes(letter)) return 'bg-blue-400';
                if ('N'.includes(letter)) return 'bg-orange-400';

                return 'bg-gray-400';
              })()
            }`}

             
             > {zone.name.charAt(0)}
             
             </div>
             
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {zone.name}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  Count
                </span>
              </div>
            </div>
            <span
              className={`text-xs sm:text-sm font-bold ${
                zone.count > 50
                  ? "text-red-500"
                  : zone.count > 25
                  ? "text-orange-500"
                  : zone.count > 10
                  ? "text-green-500"
                  : "text-blue-500"
              }`}
            >
              {zone.count}
            </span>
          </div>
        ))}
      </div>

      {/* Critical Issues */}
      {metrics?.criticialIssues && metrics?.criticialIssues > 0 && (
        <div className="mt-3 p-1.5 sm:p-2 bg-destructive/10 rounded-lg">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive"></div>
            <span className="text-xs text-destructive">
              {metrics?.criticialIssues} Critical Issues
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
