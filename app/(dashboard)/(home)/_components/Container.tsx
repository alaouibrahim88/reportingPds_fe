"use client";

import { MixBarChart } from "./MixBarChart";
import TableZone from "./TableZone";
import { dashboardData } from "./data/dashboardData";
import { ZoneActivity } from "./ZoneActivity";
import { TableFilter } from "./TableFilter";
import { AnalyticsHeader } from "./AnalyticsHeader";

function Container() {
  const { stats, zoneData, chartData } = dashboardData;

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        {/* Charts and Content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
          {/* Chart Section */}
          <div className="xl:col-span-4 bg-card rounded-lg p-4 shadow-sm border border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                Production Issues
              </h3>
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

          {/* Zone Activity Section */}
          <ZoneActivity data={zoneData[0]} />
        </div>

        <AnalyticsHeader />

        {/* Table Section */}
        <div className="bg-card rounded-lg shadow-sm relative border border-border">
          {/* <TableFilter /> */}
          <TableZone data={zoneData} />
        </div>
      </div>
    </div>
  );
}

export default Container;
