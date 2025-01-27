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
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-muted-foreground">
                {entry.dataKey?.split(".")[0]}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const zoneKeys = Object.keys(data[0] || {}).filter(
    (key) => key !== "name" && typeof data[0][key] === "object"
  );

  return (
    <div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="name"
              className="text-xs text-muted-foreground"
              tick={{ fill: "currentColor" }}
            />
            <YAxis
              className="text-xs text-muted-foreground"
              tick={{ fill: "currentColor" }}
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
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-6">
        {zoneKeys.map((zoneKey) => (
          <div key={zoneKey} className="flex items-center text-xs sm:text-sm">
            <div
              className="w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: data[0]?.[zoneKey]?.color }}
            />
            <span className="text-muted-foreground">{zoneKey}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
