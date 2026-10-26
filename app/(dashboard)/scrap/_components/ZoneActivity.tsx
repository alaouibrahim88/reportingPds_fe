import { Dispatch, SetStateAction } from "react";
import { ZoneDataType, weekData } from "./data/dashboardData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zoneBarChartColors } from "@/constants/zoneBarChartColors";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, Zap } from "lucide-react";

const shortDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });

// Monday of an ISO week (week 1 is the one containing 4 January)
function isoWeekMonday(year: number, week: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() || 7) - 1) + (week - 1) * 7);
  return monday;
}

function weekRange(year: number, week: number): string {
  const monday = isoWeekMonday(year, week);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return `${shortDate.format(monday)} – ${shortDate.format(sunday)} ${sunday.getUTCFullYear()}`;
}



interface ZoneActivityProps {
  week: number;
  year: number;
  loading: boolean;
  availableWeeks: number[];
  availableYears: number[];
  data: ZoneDataType | undefined;
  onWeekChange: (week: number) => void;
  onYearChange: (year: number) => void;
}

export function ZoneActivity({
  week,
  year,
  data,
  loading,
  availableWeeks,
  availableYears,
  onWeekChange,
  onYearChange,
}: ZoneActivityProps) {
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
          <p className="text-xs text-muted-foreground">
            S{week.toString().padStart(2, "0")} · {weekRange(year, week)}
          </p>
        </div>
      </div>

      {/* Week picker with previous / next. No year choice: GetCurrDataWeekScrap
          (pr_Scrap_PARCURENTWEEK) only takes the week and always reads the current year */}
      <div className="mb-3 flex items-center gap-1.5 rounded-lg border bg-gradient-to-r from-blue-50/80 via-background to-background p-1.5 shadow-sm dark:from-blue-950/30">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => onWeekChange(week - 1)}
            disabled={week <= (availableWeeks[0] ?? 1)}
            aria-label="Semaine précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={week.toString()} onValueChange={(value) => onWeekChange(Number(value))}>
            <SelectTrigger className="h-8 flex-1 bg-background text-xs" aria-label="Semaine">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {[...availableWeeks].reverse().map((weekOption) => (
                <SelectItem key={weekOption} value={weekOption.toString()} className="text-xs">
                  S{weekOption.toString().padStart(2, "0")} · {shortDate.format(isoWeekMonday(year, weekOption))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => onWeekChange(week + 1)}
            disabled={week >= (availableWeeks[availableWeeks.length - 1] ?? week)}
            aria-label="Semaine suivante"
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
            {metrics?.totalProjet} €
          </div>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Serie </div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalSerie} €
          </div>
        </div>
      </div>

      {/* Combined Total */}
      <div className="bg-primary/10 border border-primary/20 p-2 rounded-lg mb-3">
        <div className="text-xs text-muted-foreground">Total (Projet + Série)</div>
        <div className="text-sm font-bold text-primary">
          {((metrics?.totalProjet ?? 0) + (metrics?.totalSerie ?? 0)).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} €
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
