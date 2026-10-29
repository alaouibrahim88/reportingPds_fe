"use client";

import React from "react";
import type { IconType } from "react-icons";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Shared by the white KPI pages (Finance, Supply Chain): selected week and month always
// visible (header, card badge, coloured pill on the chart axis), charts that fit the screen.

export type Status = "ok" | "bad";
export type Scope = "all" | "weekly" | "monthly";

export const MONTH_NAMES = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
export const MONTH_FULL_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

// Weekly indicators in blue, monthly ones in violet
export const WEEK_PILL = "bg-blue-600 text-white";
export const MONTH_PILL = "bg-violet-600 text-white";

export const nf0 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
export const nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
export const nf2 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });

export const pad = (n: number) => String(n).padStart(2, "0");

export function toNum(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function fmtSigned(n: number | null, suffix: string, format: Intl.NumberFormat = nf1): string | null {
  if (n === null) return null;
  return `${n > 0 ? "+" : ""}${format.format(n)}${suffix}`;
}

/* ---------------- ISO weeks ---------------- */

export function isoWeekMonday(year: number, week: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const monday = new Date(jan4);
  monday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() || 7) - 1) + (week - 1) * 7);
  return monday;
}

export function isoWeeksInYear(year: number): number {
  // 28 December is always in the last ISO week of its year
  const d = new Date(Date.UTC(year, 11, 28));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export const shortDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });

export function weekRange(year: number, week: number): string {
  const monday = isoWeekMonday(year, week);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return `${shortDate.format(monday)} – ${shortDate.format(sunday)} ${sunday.getUTCFullYear()}`;
}

// Month of a week = month of its Monday, as the KPI procedures (week start date in the month)
export function monthOfWeek(year: number, week: number) {
  const monday = isoWeekMonday(year, week);
  return { month: monday.getUTCMonth() + 1, year: monday.getUTCFullYear() };
}

// Last week whose Monday is in the month
export function lastWeekOfMonth(year: number, month: number): number {
  for (let w = isoWeeksInYear(year); w >= 1; w--) {
    const m = monthOfWeek(year, w);
    if (m.year === year && m.month === month) return w;
  }
  return 1;
}

// Week n weeks before (handles the change of year)
export function weekBefore(year: number, week: number, n: number) {
  let y = year;
  let w = week - n;
  while (w < 1) {
    y -= 1;
    w += isoWeeksInYear(y);
  }
  return { year: y, week: w };
}

/* ---------------- Layout pieces ---------------- */

const cardClass =
  "flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm [@media(min-height:900px)]:p-4";
const bigValue =
  "text-2xl [@media(min-height:760px)]:text-3xl [@media(min-height:900px)]:text-4xl font-black leading-none text-slate-900 tabular-nums";
export const sectionLabel = "text-[10px] font-bold uppercase tracking-widest text-slate-400";

export function StatusPill({ status, ok, bad }: { status: Status | null; ok: string; bad: string }) {
  if (!status) return null;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
        status === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${status === "ok" ? "bg-emerald-500" : "bg-red-500"}`} />
      {status === "ok" ? ok : bad}
    </span>
  );
}

export function KpiCard({
  title,
  icon: Icon,
  iconClass,
  subtitle,
  period,
  periodClass,
  status,
  className = "",
  children,
}: {
  title: string;
  icon: IconType;
  iconClass: string;
  subtitle: React.ReactNode;
  period: string;
  periodClass: string;
  status?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${cardClass} ${className}`}>
      <div className="flex shrink-0 items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
            <Icon className="text-sm" />
          </div>
          <h2 className="truncate text-sm font-bold text-slate-900 lg:text-[15px]" title={title}>
            {title}
          </h2>
        </div>
        {/* Period of the card, always visible */}
        <span className={`shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-black ${periodClass}`}>{period}</span>
      </div>
      <div className="mt-1 flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <p className="text-xs text-slate-500">{subtitle}</p>
        {status}
      </div>
      {children}
    </section>
  );
}

export function ValueBlock({
  value,
  unit,
  variation,
  lowerIsBetter = false,
  detail,
}: {
  value: string;
  unit?: string;
  variation?: { value: number | null; suffix: string; label: string; format?: Intl.NumberFormat };
  lowerIsBetter?: boolean;
  detail?: React.ReactNode;
}) {
  const v = variation?.value ?? null;
  const signed = variation ? fmtSigned(v, variation.suffix, variation.format) : null;
  const good = v === null || v === 0 ? null : (v < 0) === lowerIsBetter;
  return (
    <div className="mt-2 flex shrink-0 flex-wrap items-end justify-between gap-x-3 gap-y-1">
      <div className="flex items-baseline gap-1">
        <span className={bigValue}>{value}</span>
        {unit && value !== "—" && <span className="text-base font-bold text-slate-400">{unit}</span>}
      </div>
      <div className="text-right text-xs leading-snug">
        {signed && (
          <p className={`font-bold ${good === null ? "text-slate-500" : good ? "text-emerald-600" : "text-rose-600"}`}>
            {signed} <span className="font-medium text-slate-400">{variation?.label}</span>
          </p>
        )}
        {detail && <p className="text-slate-500">{detail}</p>}
      </div>
    </div>
  );
}

/**
 * The selected period (last circle: large, bold, coloured ring and label) and the ones before.
 * Missing values stay empty ("—").
 */
export function HistoryRow({
  slots,
  pillClass,
  ringClass,
}: {
  slots: { label: string; value: string | null; status: Status | null; selected: boolean }[];
  pillClass: string;
  ringClass: string;
}) {
  return (
    <div className="grid shrink-0 items-end gap-2" style={{ gridTemplateColumns: `repeat(${slots.length}, minmax(0, 1fr))` }}>
      {slots.map((slot, i) => {
        const tone =
          slot.value === null
            ? "border-slate-200 bg-slate-50 text-slate-400"
            : slot.status === "ok"
              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
              : slot.status === "bad"
                ? "border-red-400 bg-red-50 text-red-700"
                : "border-slate-300 bg-white text-slate-700";
        return (
          <div key={`${slot.label}-${i}`} className="flex min-w-0 flex-col items-center gap-1">
            <div
              className={`flex aspect-square w-full items-center justify-center rounded-full ${tone} ${
                slot.selected
                  ? `max-w-[3rem] border-[3px] shadow-md ring-4 ${ringClass} [@media(min-height:760px)]:max-w-[3.75rem] [@media(min-height:900px)]:max-w-[4.5rem]`
                  : "max-w-[2.5rem] border-2 [@media(min-height:760px)]:max-w-[3rem] [@media(min-height:900px)]:max-w-[3.5rem]"
              }`}
            >
              <span
                className={`tabular-nums ${
                  slot.selected ? "text-xs font-black [@media(min-height:760px)]:text-sm [@media(min-height:900px)]:text-base" : "text-[10px] font-bold [@media(min-height:900px)]:text-xs"
                }`}
              >
                {slot.value ?? "—"}
              </span>
            </div>
            <span
              className={
                slot.selected
                  ? `whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-black ${pillClass}`
                  : "whitespace-nowrap py-0.5 text-[11px] font-semibold text-slate-500"
              }
            >
              {slot.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Period labels under a chart: the selected one in a coloured pill
export function PeriodAxis({
  labels,
  selectedIndex,
  pillClass,
  sub,
}: {
  labels: string[];
  selectedIndex: number;
  pillClass: string;
  sub?: React.ReactNode[];
}) {
  return (
    <div className="mt-1 grid shrink-0 text-center text-[11px]" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
      {labels.map((label, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <span
            className={
              i === selectedIndex
                ? `whitespace-nowrap rounded-full px-2 py-0.5 font-black ${pillClass}`
                : "whitespace-nowrap py-0.5 font-semibold text-slate-400"
            }
          >
            {label}
          </span>
          {sub?.[i]}
        </div>
      ))}
    </div>
  );
}

// No value on the period: the periods stay on the axis, the selected one highlighted
function EmptyChart({
  children,
  labels,
  selectedIndex,
  pillClass,
}: {
  children: React.ReactNode;
  labels: string[];
  selectedIndex: number;
  pillClass: string;
}) {
  const n = labels.length;
  return (
    <div className="flex min-h-[90px] flex-1 flex-col md:min-h-0">
      <div className="relative flex min-h-0 flex-1 items-center justify-center rounded-lg bg-slate-50 px-2 text-center text-xs text-slate-400">
        {n > 0 && selectedIndex >= 0 && (
          <div className="absolute inset-y-0 rounded-md bg-slate-100" style={{ left: `${(selectedIndex / n) * 100}%`, width: `${100 / n}%` }} />
        )}
        <span className="relative">{children}</span>
      </div>
      {n > 0 && <PeriodAxis labels={labels} selectedIndex={selectedIndex} pillClass={pillClass} />}
    </div>
  );
}

export type Series = {
  values: (number | null)[];
  color: string;
  dashed?: boolean;
  showValues?: boolean;
  pointColor?: (v: number, i: number) => string;
};

/**
 * Line chart with one point per period (column), the selected period shaded, the target dashed.
 * Value labels are HTML so they keep their size; gaps in the data are not joined.
 */
export function TrendChart({
  series,
  labels,
  selectedIndex,
  pillClass,
  format,
  target = null,
  sub,
  empty = "Pas de données sur la période",
}: {
  series: Series[];
  labels: string[];
  selectedIndex: number;
  pillClass: string;
  format: (n: number) => string;
  target?: number | null;
  sub?: React.ReactNode[];
  empty?: string;
}) {
  const n = labels.length;
  const known = series.flatMap((s) => s.values).filter((v): v is number => v !== null);
  if (n === 0 || known.length === 0)
    return (
      <EmptyChart labels={labels} selectedIndex={selectedIndex} pillClass={pillClass}>
        {empty}
      </EmptyChart>
    );
  const domain = target !== null ? [...known, target] : known;
  const min = Math.min(...domain);
  const max = Math.max(...domain);
  const range = max - min || 1;
  // Top padding leaves room for the value labels above the points
  const y = (v: number) => 24 + (1 - (v - min) / range) * 64;
  const x = (i: number) => ((i + 0.5) / n) * 100;
  const path = (values: (number | null)[]) =>
    values
      .map((v, i) => (v === null ? null : `${i > 0 && values[i - 1] !== null ? "L" : "M"}${x(i)},${y(v)}`))
      .filter(Boolean)
      .join(" ");
  return (
    <div className="flex min-h-[90px] flex-1 flex-col md:min-h-0">
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-y-0 rounded-md bg-slate-100" style={{ left: `${(selectedIndex / n) * 100}%`, width: `${100 / n}%` }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="96" x2="100" y2="96" stroke="#e2e8f0" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {target !== null && (
            <line x1="0" y1={y(target)} x2="100" y2={y(target)} stroke="#ef4444" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="5 3" vectorEffect="non-scaling-stroke" />
          )}
          {series.map((s, si) => (
            <path
              key={si}
              d={path(s.values)}
              fill="none"
              stroke={s.color}
              strokeWidth={s.dashed ? 2 : 2.5}
              strokeDasharray={s.dashed ? "6 4" : undefined}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {series.map((s, si) =>
          s.values.map((v, i) => {
            if (v === null) return null;
            const color = s.pointColor ? s.pointColor(v, i) : s.color;
            return (
              <div
                key={`${si}-${i}`}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${x(i)}%`, top: `${y(v)}%` }}
              >
                {s.showValues !== false && (
                  <span
                    className={`-mt-5 mb-1 whitespace-nowrap tabular-nums ${i === selectedIndex ? "text-xs font-black lg:text-sm" : "text-[11px] font-bold"}`}
                    style={{ color: s.pointColor ? color : "#334155" }}
                  >
                    {format(v)}
                  </span>
                )}
                <span className={`rounded-full border-2 border-white ${i === selectedIndex ? "h-3 w-3" : "h-2.5 w-2.5"}`} style={{ background: color }} />
              </div>
            );
          })
        )}
      </div>
      <PeriodAxis labels={labels} selectedIndex={selectedIndex} pillClass={pillClass} sub={sub} />
    </div>
  );
}

/** Bars per period (one or several series side by side), selected period shaded, target dashed */
export function BarsChart({
  groups,
  series,
  selectedIndex,
  pillClass,
  format,
  target = null,
  barColor,
  sub,
  empty = "Pas de données sur la période",
}: {
  groups: { label: string; values: (number | null)[] }[];
  series: { color: string }[];
  selectedIndex: number;
  pillClass: string;
  format: (n: number) => string;
  target?: number | null;
  barColor?: (v: number, si: number, gi: number) => string;
  sub?: React.ReactNode[];
  empty?: string;
}) {
  const known = groups.flatMap((g) => g.values).filter((v): v is number => v !== null);
  if (known.length === 0)
    return (
      <EmptyChart labels={groups.map((g) => g.label)} selectedIndex={selectedIndex} pillClass={pillClass}>
        {empty}
      </EmptyChart>
    );
  const max = Math.max(...known, target ?? 0) * 1.1 || 1;
  // One visible bar per group (e.g. actual or forecast): every value labelled
  const labelAll = groups.every((g) => g.values.filter((v) => v !== null).length <= 1);
  return (
    <div className="flex min-h-[90px] flex-1 flex-col md:min-h-0">
      <div className="relative grid min-h-0 flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}>
        {target !== null && (
          <div className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-dashed border-red-400/70" style={{ bottom: `${(target / max) * 100}%` }} />
        )}
        {groups.map((g, gi) => (
          <div key={gi} className={`flex min-h-0 items-end justify-center gap-0.5 rounded-md px-1 ${gi === selectedIndex ? "bg-slate-100" : ""}`}>
            {g.values.map((v, si) =>
              v === null && labelAll ? null : (
                <div key={si} className="flex h-full min-w-0 max-w-[40px] flex-1 flex-col justify-end">
                  {v !== null && (labelAll || gi === selectedIndex) && (
                    <span className={`mb-0.5 text-center tabular-nums text-slate-700 ${gi === selectedIndex ? "text-[11px] font-black" : "text-[10px] font-bold"}`}>
                      {format(v)}
                    </span>
                  )}
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: v === null ? 0 : `${Math.max((v / max) * 100, 2)}%`,
                      maxHeight: "calc(100% - 16px)",
                      background: v === null ? "transparent" : barColor ? barColor(v, si, gi) : series[si].color,
                    }}
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
      <PeriodAxis labels={groups.map((g) => g.label)} selectedIndex={selectedIndex} pillClass={pillClass} sub={sub} />
    </div>
  );
}

export function Chips<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: { key: T; label: string; color?: string }[];
  selected: T[];
  onToggle: (key: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o) => {
        const on = selected.includes(o.key);
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onToggle(o.key)}
            aria-pressed={on}
            className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold transition-colors ${
              on ? "border-slate-300 bg-white text-slate-700 shadow-sm" : "border-transparent bg-slate-100 text-slate-400"
            }`}
          >
            {o.color && <span className="h-2 w-2 rounded-full" style={{ background: on ? o.color : "#cbd5e1" }} />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Legend({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
  return (
    <div className="flex items-center gap-3">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-500">
          <span className="inline-block w-4 border-t-2" style={{ borderColor: item.color, borderStyle: item.dashed ? "dashed" : "solid" }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function NoDataBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 shrink-0 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm text-amber-800 [@media(min-height:760px)]:mb-3">
      {children}
    </div>
  );
}

/**
 * Page header: title, the selected week and month in large labels, then the week / month /
 * year selectors and the Tous / Hebdomadaires / Mensuels filter. The month follows the week.
 */
export function PeriodHeader({
  title,
  week,
  year,
  onWeekChange,
  onYearChange,
  scope,
  onScopeChange,
}: {
  title: string;
  week: number;
  year: number;
  onWeekChange: (week: number) => void;
  onYearChange: (year: number) => void;
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
}) {
  const { month, year: monthYear } = monthOfWeek(year, week);
  const currentYear = new Date().getFullYear();
  const weeks = Array.from({ length: isoWeeksInYear(year) }, (_, i) => i + 1);
  const selectClass = "h-9 border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50";
  return (
    <div className="mb-2 flex shrink-0 flex-wrap items-center justify-between gap-3 [@media(min-height:760px)]:mb-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="block h-8 w-1 rounded-full bg-blue-500" />
        <span className="mr-2 text-xs font-bold uppercase tracking-widest text-blue-500">{title}</span>
        <span className={`rounded-lg px-3 py-1 text-sm font-black ${WEEK_PILL}`}>
          Semaine {week}
          <span className="ml-2 text-xs font-semibold text-blue-100">{weekRange(year, week)}</span>
        </span>
        <span className={`rounded-lg px-3 py-1 text-sm font-black ${MONTH_PILL}`}>
          {MONTH_FULL_NAMES[month - 1]} {monthYear}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={String(week)} onValueChange={(v) => onWeekChange(Number(v))}>
          <SelectTrigger className={`w-[150px] ${selectClass}`} aria-label="Semaine">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {[...weeks].reverse().map((w) => (
              <SelectItem key={w} value={String(w)}>
                S{pad(w)} · {shortDate.format(isoWeekMonday(year, w))}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={String(month)} onValueChange={(v) => onWeekChange(lastWeekOfMonth(year, Number(v)))}>
          <SelectTrigger className={`w-[140px] ${selectClass}`} aria-label="Mois">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTH_FULL_NAMES.map((name, i) => (
              <SelectItem key={name} value={String(i + 1)}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={String(year)}
          onValueChange={(v) => {
            const y = Number(v);
            onYearChange(y);
            onWeekChange(Math.min(week, isoWeeksInYear(y)));
          }}
        >
          <SelectTrigger className={`w-[96px] ${selectClass}`} aria-label="Année">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[currentYear - 1, currentYear].map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div role="tablist" aria-label="Indicateurs affichés" className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
          {(
            [
              ["all", "Tous"],
              ["weekly", "Hebdomadaires"],
              ["monthly", "Mensuels"],
            ] as [Scope, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={scope === key}
              onClick={() => onScopeChange(key)}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                scope === key ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="font-medium text-slate-500">{label}</p>
    </div>
  );
}
