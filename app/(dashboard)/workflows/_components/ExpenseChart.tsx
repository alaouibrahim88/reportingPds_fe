"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Sector,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Calendar,
  ChartPie,
  BarChart3,
  FolderIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const data = [
  { name: "Zone A", value: 28, defects: 156, machines: 12, color: "#8E98F5" },
  { name: "Zone B", value: 25, defects: 123, machines: 10, color: "#7874F2" },
  { name: "Zone C", value: 20, defects: 98, machines: 8, color: "#8B7BF9" },
  { name: "Zone D", value: 12, defects: 67, machines: 6, color: "#8B6CF8" },
  { name: "Zone E", value: 8, defects: 45, machines: 4, color: "#8B5CF6" },
  { name: "Zone F", value: 7, defects: 34, machines: 3, color: "#9333EA" },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        className="text-lg font-semibold fill-current"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={payload.color}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={payload.color} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        className="text-sm fill-current"
      >
        {`Usage ${value}%`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        className="text-xs text-muted-foreground fill-current"
      >
        {`(${(percent * 100).toFixed(1)}% of total)`}
      </text>
    </g>
  );
};

export function ExpenseChart() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate totals and metrics
  const metrics = {
    totalOPs: 1248,
    totalDefects: data.reduce((sum, zone) => sum + zone.defects, 0),
    activeCells: 847,
    cellsEfficiency: "+15.3%",
    totalMachines: data.reduce((sum, zone) => sum + zone.machines, 0),
    defectRate: "12.5%",
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ChartPie className="w-5 h-5 text-primary" />
            <h2 className="font-medium">Zone Analytics</h2>
            <Badge variant="secondary" className="h-6">
              <Sparkles className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Real-time production and defect monitoring
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-7 space-y-6">
          {/* Metrics Grid */}
          <div className="space-y-4">
            {/* Production Metrics */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium">Production Metrics</h3>
                <ChevronDown className="h-3.5 w-3.5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-3 gap-2">
                  {/* Total OPs Card */}
                  <Card className="p-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Total OPs</p>
                      <div className="flex items-center gap-1.5">
                        <p className="text-lg font-semibold">1,248</p>
                        <Badge variant="success" className="h-4 text-xs">
                          12.5%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        523 damaged by process
                      </p>
                    </div>
                  </Card>

                  {/* Active Cells Card */}
                  <Card className="p-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        Active Cells
                      </p>
                      <div className="flex items-center gap-1.5">
                        <p className="text-lg font-semibold">847</p>
                        <Badge variant="success" className="h-4 text-xs">
                          +15.3%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        43 damaged by machines
                      </p>
                    </div>
                  </Card>

                  {/* Production Zones Card */}
                  <Card className="p-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        Hottest cells
                      </p>
                      <p className="text-lg font-semibold">6</p>
                      <p className="text-xs text-muted-foreground">
                        7633 total lost
                      </p>
                    </div>
                  </Card>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Defect Metrics */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-medium">Defect Metrics</h3>
                <ChevronDown className="h-3.5 w-3.5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid grid-cols-2 gap-2">
                  {/* Defect Analysis Card */}
                  <Card className="p-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        Defect Analysis
                      </p>
                      <div className="flex items-center gap-1.5">
                        <p className="text-lg font-semibold">41.9%</p>
                        <Badge variant="destructive" className="h-4 text-xs">
                          +2.3%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Avg. 87 defects per zone
                      </p>
                    </div>
                  </Card>

                  {/* Critical Zone Card */}
                  <Card className="p-3">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        Critical Zone
                      </p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        <p className="text-sm font-medium">Zone A</p>
                      </div>
                      <Badge variant="destructive" className="mt-0.5 text-xs">
                        156 defects
                      </Badge>
                    </div>
                  </Card>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Chart */}
          <Card className="p-4">
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={140}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-5">
          <Card className="h-full">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Zone Performance</h3>
                <Badge variant="outline" className="h-6">
                  {data.length} active zones
                </Badge>
              </div>
            </div>

            <div className="p-2">
              {data.map((item, index) => (
                <div
                  key={item.name}
                  className="group px-3 py-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{item.machines} machines</span>
                          <span className="mx-1.5">•</span>
                          <span className="text-rose-500 font-medium">
                            {item.defects} defects
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.value}%</p>
                      <p className="text-xs text-muted-foreground">
                        Utilization
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-muted/20 rounded-full h-1">
                    <div
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                        opacity: activeIndex === index ? 1 : 0.7,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
