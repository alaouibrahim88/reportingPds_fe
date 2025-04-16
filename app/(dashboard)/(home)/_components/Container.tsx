"use client";

import { useEffect, useState } from "react";
import { MixBarChart, RawData } from "./MixBarChart";
import TableZone, { YearlyZoneDataType } from "./TableZone";
import { ZoneDataType, dashboardData } from "./data/dashboardData";
import { ZoneActivity } from "./ZoneActivity";
import { ChartBar, Calendar } from "lucide-react";
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
import { fetchGlobalScrap, fetchWeeklyScrap, fetchYearlyScrap } from "@/actions/scrap/dashboard";

function Container() {
  const { stats, zoneData, chartData } = dashboardData;
  const [globalData, setGlobalData] = useState<RawData | undefined>();
  const [weeklyData, setWeeklyData] = useState<ZoneDataType | undefined>();
  const [yearlyData, setYearlyData] = useState<
    YearlyZoneDataType[] | undefined
  >();
  const [selectedType, setSelectedType] = useState<scrapType>("zone");
  const [showZone, setShowZone] = useState(true);
  const [showProjet, setShowProjet] = useState(false);
  const [showSerie, setShowSerie] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth().toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [week, setWeek] = useState(30);
  const [yearlyFilter, setYearlyFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    query: '',
  });

  const handleCheckboxChange = (
    type: "zone" | "projet" | "serie",
    checked: boolean
  ) => {
    setSelectedType(type);
    if (type === "zone") {
      setShowZone(checked);
      setShowProjet(false);
      setShowSerie(false);
    } else {
      setShowZone(false);
      if (type === "projet") setShowProjet(checked);
      if (type === "serie") setShowSerie(checked);
    }
  };

  const handleFilterChange = (type: string, value: string) => {
    switch (type) {
      case "year":
        setYearlyFilter({ ...yearlyFilter, year: Number(value) });
        break;
      case "month":
        setYearlyFilter({ ...yearlyFilter, month: Number(value) });
        break;
      case "query":
        setYearlyFilter({ ...yearlyFilter, query: value });
        break;
      default:
        break;
    }
  }
  /************* Fetch Data from backend on Input Change */
  useEffect(() => {
    setGlobalData(undefined);
    setTimeout(() => {
      fetchGlobalScrap({ type: selectedType, year: Number(year), month }).then(
        setGlobalData
      );
    }, 1000);
  }, [showZone, showProjet, showSerie, month, year]);

  useEffect(() => {
    fetchWeeklyScrap(week).then(setWeeklyData);
  }, [week]);

  useEffect(() => {
    fetchYearlyScrap(yearlyFilter).then((result) => setYearlyData(result.weekDataAnnee));
  }, [yearlyFilter.year, yearlyFilter.month, yearlyFilter.query]);
  /************* End */

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
          <div className="lg:col-span-3 xl:col-span-4 bg-card rounded-lg p-3 sm:p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <ChartBar className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-primary transition-all duration-200" />
                <h2 className="font-medium text-sm sm:text-base">
                  Synthèse Globale Scrap
                </h2>
              </div>
              <button className="text-muted-foreground text-sm">•••</button>
            </div>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 mb-2 sm:mb-4">
              <div className="flex items-center gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Track and manage production issues and scrap reports
                  </span>
                </div>
                <div className="flex items-center justify-center flex-1">
                  <div className="flex items-center justify-center border rounded-md overflow-hidden">
                    <div
                      className="flex items-center px-3 py-1.5 cursor-pointer hover:bg-accent"
                      onClick={() => handleCheckboxChange("zone", true)}
                      style={{
                        backgroundColor: showZone
                          ? "hsl(var(--primary))"
                          : "transparent",
                        color: showZone ? "white" : "inherit",
                      }}
                    >
                      <span className="text-xs sm:text-sm">Zone</span>
                    </div>
                    <div
                      className="flex items-center px-3 py-1.5 cursor-pointer hover:bg-accent"
                      onClick={() => handleCheckboxChange("projet", true)}
                      style={{
                        backgroundColor: showProjet
                          ? "hsl(var(--primary))"
                          : "transparent",
                        color: showProjet ? "white" : "inherit",
                      }}
                    >
                      <span className="text-xs sm:text-sm">Projet</span>
                    </div>
                    <div
                      className="flex items-center px-3 py-1.5 cursor-pointer hover:bg-accent"
                      onClick={() => handleCheckboxChange("serie", true)}
                      style={{
                        backgroundColor: showSerie
                          ? "hsl(var(--primary))"
                          : "transparent",
                        color: showSerie ? "white" : "inherit",
                      }}
                    >
                      <span className="text-xs sm:text-sm">Serie</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Select defaultValue={year} onValueChange={setYear}>
                  <SelectTrigger className="w-[120px] h-9 bg-background">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue={month} onValueChange={setMonth}>
                  <SelectTrigger className="w-[120px] h-9 bg-background">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <MixBarChart data={globalData} />
          </div>
          <ZoneActivity week={week} onChange={setWeek} data={weeklyData} />
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
