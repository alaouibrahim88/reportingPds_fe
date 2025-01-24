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
import { ChartBarIcon } from "lucide-react";

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface MixBarChartProps {
  data: DataPoint[];
}

export const MixBarChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    console.log("payload", payload);
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => {
            const value = entry.value;
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
                <span className="text-gray-600">
                  {entry.dataKey.split(".")[0]} :{" "}
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
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-sm">
      <div className="mb-6"></div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
            barSize={24}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
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
            <span className="text-gray-600">{zoneKey}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MixBarChart;
