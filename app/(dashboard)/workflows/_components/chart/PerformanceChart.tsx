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

interface PerformanceChartProps {
  data: any[];
  isExpanded: boolean;
  onToggleExpand: () => void;
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
}: PerformanceChartProps) {
  console.log("&&&&", data);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Zone Performance</h3>
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
      <div style={{ height: isExpanded ? 480 : 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              tickFormatter={(value) => `$${Math.abs(value / 1000)}k`}
            />
            <Tooltip content={ChartTooltip} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
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
              name="Damage Cost"
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
            <Legend content={CustomLegend} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
