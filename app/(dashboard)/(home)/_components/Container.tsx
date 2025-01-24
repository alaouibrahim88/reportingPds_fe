"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { MixBarChart } from "./MixBarChart";
import TableZone from "./TableZone";
import { dashboardData } from "./data/dashboardData";
import { StatsCard } from "./StatsCard";
import { ZoneActivity } from "./ZoneActivity";

function Container() {
  const { stats, zoneData, chartData } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <StatsCard
            title="Unassigned"
            value={stats.unassigned}
            subtitle="Tasks"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            subtitle="Tasks in progress"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            subtitle="Tasks completed"
          />
        </div> */}

        {/* Charts and Content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
          {/* Chart Section */}
          <div className="xl:col-span-4 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
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

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <TableZone data={zoneData} />
        </div>
      </div>
    </div>
  );
}

export default Container;
