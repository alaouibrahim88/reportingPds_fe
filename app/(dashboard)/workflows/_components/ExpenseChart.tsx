"use client";

import React, { useState } from "react";
import { ChartHeader } from "./chart/ChartHeader";
import { PerformanceChart } from "./chart/PerformanceChart";
import { ZonePerformance } from "./chart/ZonePerformance";
import { useChartData } from "./hooks/useChartData";

export function ExpenseChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, metrics } = useChartData();

  return (
    <div className="space-y-4">
      <ChartHeader />

      {/* Main Content */}
      <div className={`grid ${isExpanded ? "" : "grid-cols-12"} gap-6`}>
        {/* Left Column */}
        <div className={`${isExpanded ? "w-full" : "col-span-7"} space-y-6`}>
          <PerformanceChart
            data={data}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />
        </div>

        {/* Right Column - Hide when expanded */}
        {!isExpanded && (
          <div className="col-span-5">
            <ZonePerformance
              data={data}
              activeIndex={activeIndex}
              onZoneHover={setActiveIndex}
            />
          </div>
        )}
      </div>
    </div>
  );
}
