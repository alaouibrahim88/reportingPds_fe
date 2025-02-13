"use client";

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

function Container() {
  const { stats, zoneData, chartData } = dashboardData;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3">
          <div className="lg:col-span-3 xl:col-span-4 bg-card rounded-lg p-3 sm:p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <ChartBar className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-primary transition-all duration-200" />
                <h2 className="font-medium text-sm sm:text-base">
                  Visualize Production Issues
                </h2>
              </div>

              <button className="text-muted-foreground text-sm">•••</button>
            </div>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 mb-2 sm:mb-4">
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

              <Select defaultValue="30">
                <SelectTrigger className="w-[160px] h-9 bg-background">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last Year</SelectItem>
                </SelectContent>
              </Select>
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
