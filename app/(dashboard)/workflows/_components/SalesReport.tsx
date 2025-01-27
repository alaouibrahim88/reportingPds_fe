"use client";

import { Card } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";

const data = [
  { value: 400 },
  { value: 380 },
  { value: 350 },
  { value: 280 },
  { value: 250 },
  { value: 300 },
  { value: 450 },
  { value: 440 },
  { value: 420 },
  { value: 380 },
  { value: 350 },
];

const locationData = [
  { city: "JAVA zone", value: "201,192" },
  { city: "Python zone", value: "192,054" },
  { city: "GOLANG zone", value: "166,481" },
];

export function SalesReport() {
  return (
    <Card className="p-6">
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground">Cost Report</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-3 h-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Current Week: W-30</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis
                type="number"
                domain={[200, 700]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(value) => value.toString()}
                width={40}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Monthly</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              +19.6%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">$8,097</span>
            <span className="text-sm text-muted-foreground">44,214 MAD</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Yearly</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              +2.5%
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">$312,134</span>
            <span className="text-sm text-muted-foreground">301,002 MAD</span>
          </div>
        </div>

        {/* Location Stats */}
        <div className="space-y-4 pt-4 border-t border-border">
          {locationData.map((location) => (
            <div
              key={location.city}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground">
                {location.city}
              </span>
              <span className="text-sm font-medium">{location.value} </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
