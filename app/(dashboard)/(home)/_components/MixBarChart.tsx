"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface MixBarChartProps {
  data: DataPoint[];
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number;
    dataKey?: string;
    color?: string;
    payload?: any;
  }>;
  label?: string;
}

export const MixBarChart = ({ data }: MixBarChartProps) => {
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card dark:bg-card p-3 border border-muted shadow-lg rounded-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => {
            const value = entry.value ?? 0;
            const colorClass =
              value > 50
                ? "text-red-600"
                : value > 25
                ? "text-orange-500"
                : value > 10
                ? "text-yellow-600"
                : "text-green-600";

            return (
              <div key={index} className="flex items-center gap-2 text-sm py-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">
                  {entry.dataKey?.split(".")[0]} :{" "}
                  <span className={`font-medium ${colorClass}`}>{value}</span>
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const zoneKeys = Object.keys(data[0] || {}).filter((key) => key !== "name");

  return (
    <div className="bg-card dark:bg-card/50 p-2 sm:p-4 rounded-lg shadow-sm w-full">
      <div className="mb-2 sm:mb-6"></div>
      <div className="h-[250px] sm:h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: 5,
            }}
            barSize={16}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
              opacity={0.5}
            />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b" }}
              dy={5}
              interval="preserveStartEnd"
              minTickGap={10}
              angle={-25}
              textAnchor="end"
              height={50}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b" }}
              width={25}
            />
            <Tooltip<any, any>
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload as any}
                  label={label}
                />
              )}
              cursor={{ fill: "hsl(var(--border))" }}
            />
            {zoneKeys.map((zoneKey) => (
              <Bar
                key={zoneKey}
                dataKey={`${zoneKey}.value`}
                fill={data[0]?.[zoneKey]?.color}
                stackId="stack"
                radius={[0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start mt-2 sm:mt-6 px-1">
        {zoneKeys.map((zoneKey) => (
          <div
            key={zoneKey}
            className="flex items-center text-[10px] sm:text-xs"
          >
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 mr-1 sm:mr-2 rounded-full"
              style={{ backgroundColor: data[0]?.[zoneKey]?.color }}
            />
            <span className="text-muted-foreground whitespace-nowrap">
              {zoneKey}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MixBarChart;
