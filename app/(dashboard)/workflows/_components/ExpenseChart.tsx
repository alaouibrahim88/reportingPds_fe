"use client";

import React, { useState } from "react";
import { ChartHeader } from "./chart/ChartHeader";
import { PerformanceChart } from "./chart/PerformanceChart";
import { ZonePerformance } from "./chart/ZonePerformance";
import { CostTracking, EfficiencyTracking } from "@/types";

export function ExpenseChart({
  costs,
  efficiency,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange
}: {
  costs?: CostTracking[];
  efficiency?: EfficiencyTracking[] | undefined;
  selectedYear: number;
  selectedMonth?: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month?: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Transform real API data to chart format
  const transformedData = costs?.map(item => ({
    name: item.zone_nom,
    revenue: parseFloat(item.couts_reel) || 0,
    damageCost: parseFloat(item.couts_std) || 0,
    diffGlobal: parseFloat(item.ecart) || 0,
  })) ?? [];

  return (
    <div className="space-y-4">
      <ChartHeader 
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={onYearChange}
        onMonthChange={onMonthChange}
      />

      {/* Main Content */}
      <div className={`grid ${isExpanded ? "" : "grid-cols-12"} gap-6`}>
        {/* Left Column */}
        <div className={`${isExpanded ? "w-full" : "col-span-7"} space-y-6`}>
          <PerformanceChart
            data={transformedData}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />
        </div>

        {/* Right Column - Hide when expanded */}
        {!isExpanded && (
          <div className="col-span-5">
            <ZonePerformance
              data={efficiency}
              activeIndex={activeIndex}
              onZoneHover={setActiveIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
}
