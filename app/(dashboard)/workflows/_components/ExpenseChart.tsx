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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
  Maximize2,
  Minimize2,
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
  {
    name: "Nets",
    value: 28,
    defects: 156,
    machines: 12,
    color: "#8E98F5",
    damageCost: 12500,
    gain: 45600,
  },
  {
    name: "Boots",
    value: 25,
    defects: 123,
    machines: 10,
    color: "#7874F2",
    damageCost: 9800,
    gain: 38900,
  },
  {
    name: "Cutting",
    value: 20,
    defects: 98,
    machines: 8,
    color: "#8B7BF9",
    damageCost: 7400,
    gain: 31200,
  },
  {
    name: "Knitting",
    value: 12,
    defects: 67,
    machines: 6,
    color: "#8B6CF8",
    damageCost: 5100,
    gain: 18700,
  },
  {
    name: "Injection",
    value: 8,
    defects: 45,
    machines: 4,
    color: "#8B5CF6",
    damageCost: 3400,
    gain: 12500,
  },
  {
    name: "Zone F",
    value: 7,
    defects: 34,
    machines: 3,
    color: "#9333EA",
    damageCost: 2600,
    gain: 10900,
  },
];

export function ExpenseChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ChartPie className="w-4 h-4 text-primary" />
            <h2 className="font-medium">Sales Analytics</h2>
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
      <div className={`grid ${isExpanded ? "" : "grid-cols-12"} gap-6`}>
        {/* Left Column */}
        <div className={`${isExpanded ? "w-full" : "col-span-7"} space-y-6`}>
          {/* Metrics Grid */}

          {/* Chart Card with Expand Button */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Zone Performance</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8"
              >
                {isExpanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className={`h-[${isExpanded ? "480" : "360"}px]`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
                >
                  <defs>
                    {data.map((entry, index) => (
                      <linearGradient
                        key={`gradient-${entry.name}`}
                        id={`gradient-${entry.name}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={entry.color}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={entry.color}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                      if (value >= 1000) {
                        return `$${(value / 1000).toFixed(0)}k`;
                      }
                      return `$${value}`;
                    }}
                    domain={[0, "dataMax + 5000"]}
                    width={60}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border rounded-lg shadow-lg p-3">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm text-green-500 font-medium">
                              Sales: ${data.gain.toLocaleString()}
                            </p>
                            <p className="text-sm text-red-500">
                              Damage Cost: -${data.damageCost.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Machines: {data.machines}
                            </p>
                            <p className="text-sm text-rose-500">
                              Defects: {data.defects}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="gain"
                    stroke={data[0].color}
                    fill={`url(#gradient-${data[0].name})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right Column - Hide when expanded */}
        {!isExpanded && (
          <div className="col-span-5">
            <Card className="h-full">
              <div className="p-2 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Zone Performance</h3>
                  <Badge variant="outline" className="h-5 text-xs">
                    {data.length} active zones
                  </Badge>
                </div>
              </div>

              <div className="p-1">
                {data.map((item, index) => (
                  <div
                    key={item.name}
                    className="group px-2 py-1 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <div className="flex items-center text-[10px] text-muted-foreground">
                            <span>{item.machines} machines</span>
                            <span className="mx-1">•</span>
                            <span className="text-rose-500 font-medium">
                              {item.defects} defects
                            </span>
                          </div>
                          <div className="flex items-center text-[10px] mt-0.5">
                            <span className="text-red-500">
                              -${item.damageCost.toLocaleString()}
                            </span>
                            <span className="mx-1">|</span>
                            <span className="text-green-500">
                              +${item.gain.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{item.value}%</p>
                        <p className="text-[10px] text-muted-foreground">
                          Utilization
                        </p>
                        <p className="text-[10px] text-green-500 font-medium">
                          Net: ${(item.gain - item.damageCost).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="w-full bg-muted/20 rounded-full h-0.5">
                      <div
                        className="h-0.5 rounded-full transition-all duration-300"
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
        )}
      </div>
    </div>
  );
}
