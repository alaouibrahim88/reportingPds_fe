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
// import { DynamicHeader } from "Components/Title";

const data = [
  {
    name: "W-30",
    zoneJava: 612,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 295,
    zoneKotlin: 27,
    details: [
      {
        time: "2024-01-15 06:00:00 AM",
        machine: "CITIZEN 19",
        job: "349455|26",
        count: 18,
        reason: "Tool Change / Offset Scrap",
        message: "parts were not put in last night",
      },
      {
        time: "2024-01-15 10:19:43 AM",
        machine: "CITIZEN 36",
        job: "31003887-05|6",
        count: 9,
        reason: "Dimensional",
        message: "Boring bar chipped",
      },
      {
        time: "2024-01-15 11:30:32 PM",
        machine: "CITIZEN 20",
        job: "600213-2|15",
        count: 18,
        reason: "Dimensional",
        message: "Step on .4835 diameter",
      },
    ],
  },
  {
    name: "W-29",
    zoneJava: 587,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 283,
    zoneKotlin: 24,
    details: [
      {
        time: "2024-01-08 08:37:11 PM",
        machine: "CITIZEN 53",
        job: "06-135925-000|99",
        count: 14,
        reason: "Dimensional",
        message: "Thru hole go pin won't go",
      },
      {
        time: "2024-01-08 03:24:58 PM",
        machine: "CITIZEN 18",
        job: "1000879|55",
        count: 12,
        reason: "Dimensional",
        message: "Set up pcs",
      },
    ],
  },
  {
    name: "W-28",
    zoneJava: 634,
    zonePython: 0,
    zoneRust: 5,
    zoneGo: 301,
    zoneKotlin: 29,
  },
  {
    name: "W-27",
    zoneJava: 592,
    zonePython: 0,
    zoneRust: 2,
    zoneGo: 267,
    zoneKotlin: 23,
  },
  {
    name: "W-26",
    zoneJava: 605,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 289,
    zoneKotlin: 26,
  },
  {
    name: "W-25",
    zoneJava: 597,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 276,
    zoneKotlin: 25,
  },
  {
    name: "W-24",
    zoneJava: 628,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 315,
    zoneKotlin: 28,
  },
  {
    name: "W-23",
    zoneJava: 608,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 292,
    zoneKotlin: 26,
  },
  {
    name: "W-22",
    zoneJava: 601,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 287,
    zoneKotlin: 24,
  },
  {
    name: "W-21",
    zoneJava: 615,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 298,
    zoneKotlin: 27,
  },
  {
    name: "W-20",
    zoneJava: 594,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 279,
    zoneKotlin: 25,
  },
  {
    name: "W-19",
    zoneJava: 623,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 306,
    zoneKotlin: 29,
  },
  {
    name: "W-18",
    zoneJava: 603,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 284,
    zoneKotlin: 26,
  },
  {
    name: "W-17",
    zoneJava: 611,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 293,
    zoneKotlin: 27,
  },
  {
    name: "W-16",
    zoneJava: 596,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 281,
    zoneKotlin: 24,
  },
  {
    name: "W-15",
    zoneJava: 627,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 309,
    zoneKotlin: 28,
  },
  {
    name: "W-14",
    zoneJava: 604,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 288,
    zoneKotlin: 26,
  },
  {
    name: "W-13",
    zoneJava: 614,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 296,
    zoneKotlin: 27,
  },
  {
    name: "W-12",
    zoneJava: 599,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 285,
    zoneKotlin: 25,
  },
  {
    name: "W-11",
    zoneJava: 602,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 282,
    zoneKotlin: 26,
  },
  {
    name: "W-10",
    zoneJava: 598,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 278,
    zoneKotlin: 25,
  },
  {
    name: "W-9",
    zoneJava: 621,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 312,
    zoneKotlin: 28,
  },
  {
    name: "W-8",
    zoneJava: 589,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 265,
    zoneKotlin: 22,
  },
  {
    name: "W-7",
    zoneJava: 664,
    zonePython: 0,
    zoneRust: 2,
    zoneGo: 241,
    zoneKotlin: 30,
  },
  {
    name: "W-6",
    zoneJava: 462,
    zonePython: 0,
    zoneRust: 3,
    zoneGo: 143,
    zoneKotlin: 15,
  },
  {
    name: "W-5",
    zoneJava: 531,
    zonePython: 0,
    zoneRust: 2,
    zoneGo: 359,
    zoneKotlin: 12,
  },
  {
    name: "W-4",
    zoneJava: 624,
    zonePython: 0,
    zoneRust: 4,
    zoneGo: 357,
    zoneKotlin: 17,
  },
  {
    name: "W-3",
    zoneJava: 743,
    zonePython: 2,
    zoneRust: 4,
    zoneGo: 386,
    zoneKotlin: 18,
  },
  {
    name: "W-2",
    zoneJava: 514,
    zonePython: 3,
    zoneRust: 0,
    zoneGo: 139,
    zoneKotlin: 54,
  },
  {
    name: "W-1",
    zoneJava: 492,
    zonePython: 32,
    zoneRust: 2,
    zoneGo: 87,
    zoneKotlin: 31,
  },
];

export const MixBarChart = () => {
  const chartColors = {
    zoneJava: "#8884d8",
    zonePython: "#EA580C",
    zoneRust: "#FF8A2D",
    zoneGo: "#00AFAB",
    zoneKotlin: "#EB0B66",
  };

  const legendItems = [
    { key: "zoneJava", label: "Zone Java" },
    { key: "zonePython", label: "Zone Python" },
    { key: "zoneRust", label: "Zone Rust" },
    { key: "zoneGo", label: "Zone Go" },
    { key: "zoneKotlin", label: "Zone Kotlin" },
  ];

  const Legend = () => (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-6">
      {legendItems.map((item) => (
        <div key={item.key} className="flex items-center text-xs sm:text-sm">
          <div
            className="w-3 h-3 mr-2 rounded-full"
            style={{ backgroundColor: chartColors[item.key] }}
          />
          <span className="text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm py-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-gray-600">
                {legendItems.find((item) => item.key === entry.dataKey)?.label}{" "}
                :{" "}
                <span className="font-medium text-gray-900">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-sm">
      <div className="mb-6">
        {/* <DynamicHeader
          icon={<ChartBarIcon className="w-5 h-5" />}
          title="IS"
          subtitle="Item sold"
          color="teal"
          size="default"
          showSubtitle={true}
        /> */}
      </div>

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
            {legendItems.map((item) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                fill={chartColors[item.key]}
                stackId="stack"
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <Legend />
    </div>
  );
};

export default MixBarChart;
