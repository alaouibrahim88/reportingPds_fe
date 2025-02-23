"use client";

import { useState } from "react";
import { MixBarChart } from "./MixBarChart";
import TableZone from "./TableZone";
import { dashboardData } from "./data/dashboardData";
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

function Container() {
  const { stats, zoneData, chartData } = dashboardData;
  const [showProject, setShowProject] = useState(false);
  const [showSeries, setShowSeries] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const handleCheckboxChange = (
    type: "all" | "project" | "series",
    checked: boolean
  ) => {
    if (type === "all") {
      setShowAll(checked);
      setShowProject(false);
      setShowSeries(false);
    } else {
      setShowAll(false);
      if (type === "project") setShowProject(checked);
      if (type === "series") setShowSeries(checked);
    }
  };

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
                      onClick={() => handleCheckboxChange("all", true)}
                      style={{
                        backgroundColor: showAll
                          ? "hsl(var(--primary))"
                          : "transparent",
                        color: showAll ? "white" : "inherit",
                      }}
                    >
                      <span className="text-xs sm:text-sm">All</span>
                    </div>
                    <div
                      className="flex items-center px-3 py-1.5 cursor-pointer hover:bg-accent"
                      onClick={() => handleCheckboxChange("project", true)}
                      style={{
                        backgroundColor: showProject
                          ? "hsl(var(--primary))"
                          : "transparent",
                        color: showProject ? "white" : "inherit",
                      }}
                    >
                      <span className="text-xs sm:text-sm">Projet</span>
                    </div>
                    <div
                      className="flex items-center px-3 py-1.5 cursor-pointer hover:bg-accent"
                      onClick={() => handleCheckboxChange("series", true)}
                      style={{
                        backgroundColor: showSeries
                          ? "hsl(var(--primary))"
                          : "transparent",
                        color: showSeries ? "white" : "inherit",
                      }}
                    >
                      <span className="text-xs sm:text-sm">Series</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Select defaultValue="2025">
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

                <Select defaultValue="3">
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

            <MixBarChart data={chartData} />
          </div>
          <ZoneActivity data={zoneData[0]} />
        </div>
        <div className="bg-card rounded-lg shadow-sm relative border border-border">
          <TableZone data={zoneData} />
        </div>
      </div>
    </div>
  );
}

export default Container;
