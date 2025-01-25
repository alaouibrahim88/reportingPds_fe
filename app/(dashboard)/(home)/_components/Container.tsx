"use client";

import { MixBarChart } from "./MixBarChart";
import TableZone from "./TableZone";
import { dashboardData } from "./data/dashboardData";
import { ZoneActivity } from "./ZoneActivity";
import { ChartBar } from "lucide-react";

function Container() {
  const { stats, zoneData, chartData } = dashboardData;

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
          <div className="xl:col-span-4 bg-card rounded-lg p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 mb-1">
                <ChartBar className="w-5 h-5 text-primary" />
                <h2 className="font-medium"> Visualize Production Issues </h2>
              </div>

              <button className="text-muted-foreground text-sm">•••</button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 mb-4">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Track and manage production issues and scrap reports</span>
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
