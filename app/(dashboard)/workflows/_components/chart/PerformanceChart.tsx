import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Maximize2, Minimize2 } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { performanceData } from "./data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the expected chart data structure
interface ChartDataItem {
  name: string;
  revenue: number;
  damageCost: number;
  diffGlobal: number;
}

interface PerformanceChartProps {
  data?: ChartDataItem[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  selectedYear: number;
  selectedMonth?: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month?: number) => void;
}

const chartColors = {
  revenue: {
    stroke: "hsl(var(--primary))", // Using primary blue from globals.css
    fill: "hsl(var(--primary))",
  },
  damage: {
    stroke: "#9572e5", // rose-500
    fill: "#8B5CF6",
  },
  diffGlobal: {
    stroke: "#10B981", // emerald-500
    fill: "#059669",
  },
  grid: "hsl(var(--muted))", // Using muted color from globals.css
  text: "hsl(var(--muted-foreground))", // Using muted-foreground from globals.css
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center gap-6 pt-2">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function PerformanceChart({
  data,
  isExpanded,
  onToggleExpand,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: PerformanceChartProps) {
  // Use fallback data when API data is empty or undefined
  const chartData = data && data.length > 0 ? data : performanceData;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium text-sm">Suivi des coûts</h3>
          <p className="text-xs text-muted-foreground">
            Current Date :{" "}
            {new Date().toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select 
            value={selectedYear.toString()} 
            onValueChange={(value) => onYearChange(parseInt(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <Select 
            value={selectedMonth?.toString() || "all"} 
            onValueChange={(value) => onMonthChange(value === "all" ? undefined : parseInt(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="1">January</SelectItem>
              <SelectItem value="2">February</SelectItem>
              <SelectItem value="3">March</SelectItem>
              <SelectItem value="4">April</SelectItem>
              <SelectItem value="5">May</SelectItem>
              <SelectItem value="6">June</SelectItem>
              <SelectItem value="7">July</SelectItem>
              <SelectItem value="8">August</SelectItem>
              <SelectItem value="9">September</SelectItem>
              <SelectItem value="10">October</SelectItem>
              <SelectItem value="11">November</SelectItem>
              <SelectItem value="12">December</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpand}
            className="h-8 w-8"
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div style={{ height: isExpanded ? 480 : 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.revenue.fill}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.revenue.fill}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="damageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.damage.fill}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.damage.fill}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id="diffGlobalGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={chartColors.diffGlobal.fill}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.diffGlobal.fill}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartColors.grid}
              opacity={0.5}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: chartColors.text }}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              tick={{ fill: chartColors.text }}
              tickFormatter={(value) => `${Math.abs(value / 1000)}k €`}
            />
            <Tooltip content={ChartTooltip} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Direct Cost"
              stroke={chartColors.revenue.stroke}
              fill="url(#revenueGradient)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 1,
                stroke: chartColors.revenue.stroke,
                fill: "white",
              }}
            />
            <Area
              type="monotone"
              dataKey="damageCost"
              name="Indirect Cost"
              stroke={chartColors.damage.stroke}
              fill="url(#damageGradient)"
              strokeWidth={2}
              baseValue="dataMin"
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 1,
                stroke: chartColors.damage.stroke,
                fill: "white",
              }}
            />
            <Area
              type="monotone"
              dataKey="diffGlobal"
              name="DIFF Global"
              stroke={chartColors.diffGlobal.stroke}
              fill="url(#diffGlobalGradient)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 1,
                stroke: chartColors.diffGlobal.stroke,
                fill: "white",
              }}
            />
            <Legend content={CustomLegend} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
