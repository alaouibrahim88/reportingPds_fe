"use client";

import { useEffect, useMemo, useState } from "react";
import { MixBarChart, RawData } from "./MixBarChart";
import { WeeklyTrendChart } from "./WeeklyTrendChart";
import TableZone, { YearlyZoneDataType } from "./TableZone";
import { ZoneDataType, dashboardData } from "./data/dashboardData";
import { ZoneActivity } from "./ZoneActivity";
import { CalendarDays, ChartBar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Endpoints } from "@/constants/api";
import { scrapType } from "@/types";
import { cn } from "@/lib/utils";
import { fetchGlobalScrap, fetchWeeklyScrap, fetchYearlyScrap } from "@/actions/scrap/dashboard";

function getCurrentIsoWeekInfo(): { week: number; year: number } {
  const now = new Date();
  const utcDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );

  // ISO week starts on Monday. Sunday (0) is converted to 7.
  const isoDay = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - isoDay);

  const isoYear = utcDate.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const week = Math.ceil(
    ((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );

  return { week, year: isoYear };
}

function getIsoWeeksInYear(year: number): number {
  // Dec 28 always falls in the last ISO week of its ISO year.
  const utcDate = new Date(Date.UTC(year, 11, 28));
  const isoDay = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - isoDay);

  const isoYear = utcDate.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  return Math.ceil(
    ((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );
}

// Scope of the global summary (Total = Projet + Série)
const SCOPES: { value: scrapType; label: string }[] = [
  { value: "zone", label: "Total" },
  { value: "projet", label: "Projet" },
  { value: "serie", label: "Série" },
];

function Container() {
  const { stats, zoneData, chartData } = dashboardData;
  const [globalData, setGlobalData] = useState<RawData | undefined>();
  const [weeklyData, setWeeklyData] = useState<ZoneDataType | undefined>();
  const [yearlyData, setYearlyData] = useState<
    YearlyZoneDataType[] | undefined
  >();
  const [selectedType, setSelectedType] = useState<scrapType>("zone");
  // GetDataWeekZone returns the whole year week by week; the month it is sent has no effect
  const month = (new Date().getMonth() + 1).toString();
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const currentIso = getCurrentIsoWeekInfo();
  const currentYear = currentIso.year;
  const currentWeek = currentIso.week;
  const [weeklyYear, setWeeklyYear] = useState(currentYear);
  const [week, setWeek] = useState(currentWeek);
  const [isWeeklyLoading, setIsWeeklyLoading] = useState(false);
  const [yearlyFilter, setYearlyFilter] = useState({
    year: new Date().getFullYear(),
    month: "",
    query: '',
  });

  const availableYears = useMemo(
    () => Array.from({ length: 6 }, (_, index) => currentYear - index),
    [currentYear]
  );

  const globalWeeks = globalData?.weekDataZn?.length ?? 0;
  const globalZones = new Set(
    (globalData?.weekDataZn ?? []).flatMap((week) => week.detailQte.map((detail) => detail.libelle))
  ).size;

  const availableWeeks = useMemo(() => {
    const maxWeek =
      weeklyYear === currentYear ? currentWeek : getIsoWeeksInYear(weeklyYear);
    return Array.from({ length: maxWeek }, (_, index) => index + 1);
  }, [weeklyYear, currentYear, currentWeek]);


  const handleFilterChange = (type: string, value: string) => {
    switch (type) {
      case "year":
        setYearlyFilter((prev) => ({ ...prev, year: Number(value) }));
        break;
      case "month":
        setYearlyFilter((prev) => ({ ...prev, month: value }));
        break;
      case "query":
        setYearlyFilter((prev) => ({ ...prev, query: value }));
        break;
      default:
        break;
    }
  }
  /************* Fetch Data from backend on Input Change */
  useEffect(() => {
    setGlobalData(undefined);
      fetchGlobalScrap({ type: selectedType, year: Number(year), month }).then((data) => {
        setGlobalData(data);
      });
  }, [selectedType, month, year]);

  useEffect(() => {
    const maxWeek =
      weeklyYear === currentYear ? currentWeek : getIsoWeeksInYear(weeklyYear);
    if (week > maxWeek) {
      setWeek(maxWeek);
    }
  }, [weeklyYear, week, currentYear, currentWeek]);

  useEffect(() => {
    let isMounted = true;
    setIsWeeklyLoading(true);

    fetchWeeklyScrap(week, weeklyYear)
      .then((data) => {
        if (isMounted) {
          setWeeklyData(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsWeeklyLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [week, weeklyYear]);

  useEffect(() => {
    fetchYearlyScrap(yearlyFilter).then((result) =>
      setYearlyData(result?.weekDataAnnee ?? [])
    );
  }, [yearlyFilter]);
  /************* End */

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-2 sm:gap-3 p-2 sm:p-3 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
          <div className="lg:col-span-3 xl:col-span-4 bg-card rounded-lg p-3 sm:px-4 sm:py-3 shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ChartBar className="h-[18px] w-[18px]" />
              </div>
              <div>
                <h2 className="text-sm font-semibold sm:text-base">Synthèse Globale Scrap (€)</h2>
                <p className="text-xs text-muted-foreground">
                  Coût du scrap par semaine et par zone · {SCOPES.find((scope) => scope.value === selectedType)?.label} · {year}
                </p>
              </div>
            </div>

            {/* Filters: scope and year (the data covers the whole year, week by week) */}
            <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border bg-gradient-to-r from-blue-50/80 via-background to-background p-2 shadow-sm dark:from-blue-950/30">
              <div role="tablist" aria-label="Périmètre" className="inline-flex h-8 items-center rounded-md bg-muted p-0.5">
                {SCOPES.map((scope) => (
                  <button
                    key={scope.value}
                    type="button"
                    role="tab"
                    aria-selected={selectedType === scope.value}
                    onClick={() => setSelectedType(scope.value)}
                    className={cn(
                      "h-7 rounded px-3 text-xs font-medium transition-colors",
                      selectedType === scope.value
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {scope.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="h-8 w-[88px] bg-background text-xs" aria-label="Année">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((option) => (
                      <SelectItem key={option} value={option.toString()} className="text-xs">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <span className="ml-auto text-xs text-muted-foreground">
                {globalData ? (
                  <>
                    <span className="font-semibold text-foreground">{globalWeeks}</span> semaines ·{" "}
                    <span className="font-semibold text-foreground">{globalZones}</span> zones
                  </>
                ) : (
                  "Chargement…"
                )}
              </span>
            </div>

            <MixBarChart data={globalData} />
            {/* Same weekly data as the bar chart, as one curve: all zones or the selected zone */}
            <WeeklyTrendChart
              data={globalData}
              year={Number(year)}
              scope={selectedType}
              inProgressWeek={Number(year) === currentYear ? currentWeek : undefined}
            />
          </div>
          <ZoneActivity
            week={week}
            year={weeklyYear}
            data={weeklyData}
            loading={isWeeklyLoading}
            availableWeeks={availableWeeks}
            availableYears={availableYears}
            onWeekChange={setWeek}
            onYearChange={setWeeklyYear}
          />
        </div>
        <div className="bg-card rounded-lg shadow-sm relative border border-border">
          <TableZone
            data={yearlyData}
            filters={yearlyFilter}
            onFilterChange={(type: string, value: string) => handleFilterChange(type, value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Container;
