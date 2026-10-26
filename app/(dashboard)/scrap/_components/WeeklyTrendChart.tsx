"use client";

import React, { useEffect, useMemo, useState } from "react";
import { LineChart as LineChartIcon, TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zoneBarChartColors } from "@/constants/zoneBarChartColors";
import { scrapType } from "@/types";
import type { RawData } from "./MixBarChart";

const ALL_ZONES = "__all__";
const TOTAL_COLOR = "hsl(var(--primary))";
const FALLBACK_ZONE_COLOR = "#8E98F5";

const euro = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 });
const formatEuro = (value: number) => `${euro.format(value)} €`;

const SCOPE_LABELS: Record<scrapType, string> = { zone: "Total", projet: "Projet", serie: "Serie" };

type WeekPoint = { week: number; name: string; total: number } & Record<string, number | string>;

// One point per week from the first to the last week returned (a week without scrap is 0),
// with each zone's value and the all-zones total
const buildSeries = (data: RawData | undefined) => {
  const weeks = data?.weekDataZn ?? [];
  const zones = Array.from(
    new Set(weeks.flatMap((week) => (week.detailQte ?? []).map((detail) => detail.libelle)))
  );
  const byWeek = new Map(weeks.map((week) => [Number(week.week), week.detailQte ?? []]));
  const weekNumbers = Array.from(byWeek.keys()).filter(Number.isFinite);
  if (weekNumbers.length === 0) return { points: [] as WeekPoint[], zones };

  const points: WeekPoint[] = [];
  for (let week = Math.min(...weekNumbers); week <= Math.max(...weekNumbers); week++) {
    const point = { week, name: `Week ${week}`, total: 0 } as WeekPoint;
    zones.forEach((zone) => (point[zone] = 0));
    (byWeek.get(week) ?? []).forEach((detail) => {
      const value = Number(detail.qte) || 0;
      point[detail.libelle] = (point[detail.libelle] as number) + value;
      point.total += value;
    });
    points.push(point);
  }
  return { points, zones };
};

type WeeklyTrendChartProps = {
  data: RawData | undefined;
  year: number;
  scope: scrapType;
  // ISO week still in progress (current year only): left out of the week-over-week trend
  inProgressWeek?: number;
};

export function WeeklyTrendChart({ data, year, scope, inProgressWeek }: WeeklyTrendChartProps) {
  const [zone, setZone] = useState(ALL_ZONES);
  const { points, zones } = useMemo(() => buildSeries(data), [data]);

  // A zone missing from the new year / scope falls back to all zones
  useEffect(() => {
    if (zone !== ALL_ZONES && data && !zones.includes(zone)) setZone(ALL_ZONES);
  }, [data, zones, zone]);

  const seriesKey = zone === ALL_ZONES ? "total" : zone;
  const color = zone === ALL_ZONES ? TOTAL_COLOR : zoneBarChartColors[zone] || FALLBACK_ZONE_COLOR;
  const values = points.map((point) => Number(point[seriesKey]) || 0);

  const total = values.reduce((sum, value) => sum + value, 0);
  const average = values.length > 0 ? total / values.length : 0;
  const peakIndex = values.length > 0 ? values.indexOf(Math.max(...values)) : -1;

  // Last complete week vs the one before it
  const complete = points.filter((point) => point.week !== inProgressWeek);
  const last = complete[complete.length - 1];
  const previous = complete[complete.length - 2];
  const lastValue = last ? Number(last[seriesKey]) || 0 : 0;
  const previousValue = previous ? Number(previous[seriesKey]) || 0 : 0;
  const trend = previous && previousValue > 0 ? ((lastValue - previousValue) / previousValue) * 100 : null;

  // Solid curve over complete weeks; the week in progress is joined by a dashed segment
  const hasInProgress = points.some((point) => point.week === inProgressWeek);
  const chartPoints = points.map((point) => {
    const value = Number(point[seriesKey]) || 0;
    const isInProgress = point.week === inProgressWeek;
    return {
      ...point,
      complete: isInProgress ? null : value,
      inProgress: hasInProgress && (isInProgress || point.week === last?.week) ? value : null,
    };
  });

  const isLoading = data === undefined;
  const isEmpty = !isLoading && points.length === 0;

  return (
    <div className="mt-3 border-t border-border pt-3 sm:mt-4 sm:pt-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LineChartIcon className="h-[18px] w-[18px] text-primary sm:h-5 sm:w-5" />
            <h2 className="text-sm font-medium sm:text-base">Évolution hebdomadaire du scrap (€)</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Coût du scrap par semaine · {SCOPE_LABELS[scope]} · {year} ·{" "}
            <span className="font-medium text-foreground">
              {zone === ALL_ZONES ? "toutes les zones" : zone}
            </span>
          </p>
        </div>

        <Select value={zone} onValueChange={setZone} disabled={zones.length === 0}>
          <SelectTrigger className="h-9 w-[190px] bg-background text-xs" aria-label="Filtrer par zone">
            <SelectValue placeholder="Toutes les zones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_ZONES} className="text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TOTAL_COLOR }} />
                Toutes les zones
              </span>
            </SelectItem>
            {zones.map((zoneName) => (
              <SelectItem key={zoneName} value={zoneName} className="text-xs">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: zoneBarChartColors[zoneName] || FALLBACK_ZONE_COLOR }}
                  />
                  {zoneName}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Key figures of the curve shown */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-lg bg-muted p-2">
          <div className="text-xs text-muted-foreground">Total sur la période</div>
          <div className="text-sm font-medium text-foreground">{formatEuro(total)}</div>
        </div>
        <div className="rounded-lg bg-muted p-2">
          <div className="text-xs text-muted-foreground">Moyenne / semaine</div>
          <div className="text-sm font-medium text-foreground">{formatEuro(average)}</div>
        </div>
        <div className="rounded-lg bg-muted p-2">
          <div className="text-xs text-muted-foreground">Semaine la plus haute</div>
          <div className="text-sm font-medium text-foreground">
            {peakIndex >= 0 && values[peakIndex] > 0
              ? `${points[peakIndex].name} · ${formatEuro(values[peakIndex])}`
              : "—"}
          </div>
        </div>
        <div className="rounded-lg bg-muted p-2">
          <div className="text-xs text-muted-foreground">
            {last ? `${last.name} vs ${previous?.name ?? "—"}` : "Dernière semaine"}
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            {trend === null ? (
              <span className="text-foreground">{last ? formatEuro(lastValue) : "—"}</span>
            ) : (
              <span
                // More scrap is worse: up in red, down in green
                className={`flex items-center gap-1 ${trend > 0 ? "text-red-600" : "text-green-600"}`}
              >
                {trend > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {trend > 0 ? "+" : ""}
                {trend.toFixed(0)} %
                <span className="font-normal text-muted-foreground">({formatEuro(lastValue)})</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 h-[220px] sm:h-[260px]">
        {isLoading || isEmpty ? (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            {isLoading ? "Chargement…" : "Aucune donnée de scrap pour cette période."}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartPoints} margin={{ top: 10, right: 12, left: -8, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.5} />
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
                tickFormatter={(value: number) => compact.format(value)}
                width={40}
              />
              <ReferenceLine
                y={average}
                stroke="#94a3b8"
                strokeDasharray="4 4"
                label={{ value: "Moy.", position: "insideTopRight", fontSize: 10, fill: "#64748b" }}
              />
              <Tooltip
                cursor={{ stroke: "hsl(var(--border))" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const point = payload[0].payload as WeekPoint;
                  const value = Number(point[seriesKey]) || 0;
                  return (
                    <div className="rounded-lg border border-muted bg-card p-3 text-sm shadow-lg">
                      <p className="mb-1 font-medium text-foreground">
                        {point.name}
                        {point.week === inProgressWeek && (
                          <span className="ml-1 text-xs font-normal text-muted-foreground">(en cours)</span>
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-muted-foreground">
                          {zone === ALL_ZONES ? "Toutes les zones" : zone} :{" "}
                          <span className="font-medium text-foreground">{formatEuro(value)}</span>
                        </span>
                      </div>
                      {zone !== ALL_ZONES && point.total > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {((value / point.total) * 100).toFixed(0)} % du total ({formatEuro(point.total)})
                        </p>
                      )}
                    </div>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="complete"
                stroke={color}
                strokeWidth={2.5}
                dot={{ r: 2.5, strokeWidth: 0, fill: color }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
              {hasInProgress && (
                <Line
                  type="monotone"
                  dataKey="inProgress"
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={(props: { cx?: number; cy?: number; payload?: WeekPoint }) =>
                    props.payload?.week === inProgressWeek && props.cx !== undefined && props.cy !== undefined ? (
                      <circle
                        key="in-progress"
                        cx={props.cx}
                        cy={props.cy}
                        r={3.5}
                        fill="hsl(var(--card))"
                        stroke={color}
                        strokeWidth={2}
                      />
                    ) : (
                      <g key={`dot-${props.payload?.week}`} />
                    )
                  }
                  activeDot={false}
                  isAnimationActive={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default WeeklyTrendChart;
