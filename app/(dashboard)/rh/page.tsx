"use client"

import React, { useEffect, useState } from "react"
import type { IconType } from "react-icons"
import { FaBus, FaHourglassHalf, FaSmile, FaUserClock, FaUserMinus, FaUsers } from "react-icons/fa"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useKpiPeriod } from "@/hooks/use-kpi-period"

type Num = string | number | null | undefined
type Status = "ok" | "bad"
type Scope = "all" | "weekly" | "monthly"

const MONTH_NAMES = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"]
const MONTH_FULL_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
]
const DEPARTMENTS = [
  { key: "Ventes", label: "Ventes" },
  { key: "Marketing", label: "Marketing" },
  { key: "IT", label: "IT" },
  { key: "Operations", label: "Opérations" },
  { key: "RH", label: "RH" },
]
const POPULATIONS = [
  { key: "Global", label: "Global", color: "#2563eb" },
  { key: "Managers", label: "Managers", color: "#10b981" },
  { key: "Employes", label: "Employés", color: "#f59e0b" },
]

// Weekly indicator in blue, monthly ones in violet: the period of each card is easy to spot
const WEEK_PILL = "bg-blue-600 text-white"
const MONTH_PILL = "bg-violet-600 text-white"

// Sizes grow with the screen height, so the 6 cards fit without scrolling from 650 px up
const cardClass =
  "flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm [@media(min-height:900px)]:p-4"
const bigValue =
  "text-2xl [@media(min-height:760px)]:text-3xl [@media(min-height:900px)]:text-4xl font-black leading-none text-slate-900 tabular-nums"

const nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 })
const nf0 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 })

function toNum(v: Num): number | null {
  if (v === null || v === undefined || v === "") return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

function fmtSigned(n: number | null, suffix: string): string | null {
  if (n === null) return null
  return `${n > 0 ? "+" : ""}${nf1.format(n)}${suffix}`
}

function fmtEuro(n: number | null): string {
  if (n === null) return "—"
  // k€ up to 10 M€, so that monthly costs (≈ 1 M€) keep their differences visible
  if (Math.abs(n) >= 10_000_000) return `${nf1.format(n / 1_000_000)} M€`
  return `${nf0.format(n / 1000)} k€`
}

// Oldest first, so the selected period is the last one
function chrono(items: any[] | null | undefined): any[] {
  return [...(items ?? [])].sort(
    (a, b) =>
      (toNum(a.Annee) ?? 0) * 100 + (toNum(a.Mois ?? a.Semaine) ?? 0) -
      ((toNum(b.Annee) ?? 0) * 100 + (toNum(b.Mois ?? b.Semaine) ?? 0))
  )
}

/* ---------------- ISO weeks ---------------- */

function isoWeekMonday(year: number, week: number): Date {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const monday = new Date(jan4)
  monday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() || 7) - 1) + (week - 1) * 7)
  return monday
}

function isoWeeksInYear(year: number): number {
  // 28 December is always in the last ISO week of its year
  const d = new Date(Date.UTC(year, 11, 28))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

const shortDate = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" })

function weekRange(year: number, week: number): string {
  const monday = isoWeekMonday(year, week)
  const sunday = new Date(monday)
  sunday.setUTCDate(monday.getUTCDate() + 6)
  return `${shortDate.format(monday)} – ${shortDate.format(sunday)} ${sunday.getUTCFullYear()}`
}

// The RH API takes a week; its monthly indicators are those of the month of the week's Monday
function monthOfWeek(year: number, week: number) {
  const monday = isoWeekMonday(year, week)
  return { month: monday.getUTCMonth() + 1, year: monday.getUTCFullYear() }
}

// Last week whose Monday is in the month: choosing a month shows that month's indicators
function lastWeekOfMonth(year: number, month: number): number {
  for (let w = isoWeeksInYear(year); w >= 1; w--) {
    const m = monthOfWeek(year, w)
    if (m.year === year && m.month === month) return w
  }
  return 1
}

const pad = (n: number) => String(n).padStart(2, "0")

/* ---------------- API types ---------------- */

interface RHData {
  Taux_Depart?: any
  Taux_Remplissage_Transport?: any
  Effectif_Et_Couts?: any
  Delai_Moyen_Recrutement?: any
  Taux_Absentisme?: any
  Indice_Climat_Social?: any
}

/* ---------------- Components ---------------- */

function StatusPill({ status, ok, bad }: { status: Status | null; ok: string; bad: string }) {
  if (!status) return null
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
        status === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${status === "ok" ? "bg-emerald-500" : "bg-red-500"}`} />
      {status === "ok" ? ok : bad}
    </span>
  )
}

function KpiCard({
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
  title: string
  icon: IconType
  iconClass: string
  subtitle: React.ReactNode
  period: string
  periodClass: string
  status?: React.ReactNode
  className?: string
  children: React.ReactNode
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
  )
}

function ValueBlock({
  value,
  unit,
  variation,
  lowerIsBetter = false,
  detail,
}: {
  value: string
  unit?: string
  variation?: { value: number | null; suffix: string; label: string }
  lowerIsBetter?: boolean
  detail?: React.ReactNode
}) {
  const v = variation?.value ?? null
  const signed = variation ? fmtSigned(v, variation.suffix) : null
  const good = v === null || v === 0 ? null : (v < 0) === lowerIsBetter
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
  )
}

// Period labels under a chart: the selected one in a coloured pill
function PeriodAxis({
  labels,
  selectedIndex,
  pillClass,
  sub,
}: {
  labels: string[]
  selectedIndex: number
  pillClass: string
  sub?: React.ReactNode[]
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
  )
}

// No value on the period: the periods stay on the axis, the selected one highlighted
function EmptyChart({
  children,
  labels,
  selectedIndex,
  pillClass,
}: {
  children: React.ReactNode
  labels: string[]
  selectedIndex: number
  pillClass: string
}) {
  const n = labels.length
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
  )
}

type Series = {
  values: (number | null)[]
  color: string
  dashed?: boolean
  showValues?: boolean
  // Small screens (< 760 px high): only the selected period's value, the chart is too short for all
  compactValues?: boolean
  pointColor?: (v: number, i: number) => string
}

/**
 * Line chart with one point per period (column), the selected period shaded, the target dashed.
 * Value labels are HTML so they keep their size; gaps in the data are not joined.
 */
function TrendChart({
  series,
  labels,
  selectedIndex,
  pillClass,
  format,
  target = null,
  sub,
  showAxis = true,
  empty = "Pas de données sur la période",
}: {
  series: Series[]
  labels: string[]
  selectedIndex: number
  pillClass: string
  format: (n: number) => string
  target?: number | null
  sub?: React.ReactNode[]
  showAxis?: boolean
  empty?: string
}) {
  const n = labels.length
  const known = series.flatMap((s) => s.values).filter((v): v is number => v !== null)
  if (n === 0 || known.length === 0)
    return (
      <EmptyChart labels={showAxis ? labels : []} selectedIndex={selectedIndex} pillClass={pillClass}>
        {empty}
      </EmptyChart>
    )
  const domain = target !== null ? [...known, target] : known
  const min = Math.min(...domain)
  const max = Math.max(...domain)
  const range = max - min || 1
  // Top padding leaves room for the value labels above the points
  const y = (v: number) => 24 + (1 - (v - min) / range) * 64
  const x = (i: number) => ((i + 0.5) / n) * 100
  const path = (values: (number | null)[]) =>
    values
      .map((v, i) => (v === null ? null : `${i > 0 && values[i - 1] !== null ? "L" : "M"}${x(i)},${y(v)}`))
      .filter(Boolean)
      .join(" ")
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
            if (v === null) return null
            const color = s.pointColor ? s.pointColor(v, i) : s.color
            return (
              <div
                key={`${si}-${i}`}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${x(i)}%`, top: `${y(v)}%` }}
              >
                {s.showValues !== false && (
                  <span
                    className={`-mt-5 mb-1 whitespace-nowrap tabular-nums ${i === selectedIndex ? "text-xs font-black lg:text-sm" : "text-[11px] font-bold"} ${
                      s.compactValues && i !== selectedIndex ? "invisible [@media(min-height:760px)]:visible" : ""
                    }`}
                    style={{ color: s.pointColor ? color : "#334155" }}
                  >
                    {format(v)}
                  </span>
                )}
                <span className={`rounded-full border-2 border-white ${i === selectedIndex ? "h-3 w-3" : "h-2.5 w-2.5"}`} style={{ background: color }} />
              </div>
            )
          })
        )}
      </div>
      {showAxis && <PeriodAxis labels={labels} selectedIndex={selectedIndex} pillClass={pillClass} sub={sub} />}
    </div>
  )
}

/** Bars per period (one or several series side by side), selected period shaded, target dashed */
function BarsChart({
  groups,
  series,
  selectedIndex,
  pillClass,
  format,
  target = null,
  barColor,
  empty = "Pas de données sur la période",
}: {
  groups: { label: string; values: (number | null)[] }[]
  series: { color: string }[]
  selectedIndex: number
  pillClass: string
  format: (n: number) => string
  target?: number | null
  barColor?: (v: number, si: number) => string
  empty?: string
}) {
  const known = groups.flatMap((g) => g.values).filter((v): v is number => v !== null)
  if (known.length === 0)
    return (
      <EmptyChart labels={groups.map((g) => g.label)} selectedIndex={selectedIndex} pillClass={pillClass}>
        {empty}
      </EmptyChart>
    )
  const max = Math.max(...known, target ?? 0) * 1.1 || 1
  const single = series.length === 1
  return (
    <div className="flex min-h-[90px] flex-1 flex-col md:min-h-0">
      <div className="relative grid min-h-0 flex-1 gap-1" style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}>
        {target !== null && (
          <div className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-dashed border-red-400/70" style={{ bottom: `${(target / max) * 100}%` }} />
        )}
        {groups.map((g, gi) => (
          <div key={gi} className={`flex min-h-0 items-end justify-center gap-0.5 rounded-md px-1 ${gi === selectedIndex ? "bg-slate-100" : ""}`}>
            {g.values.map((v, si) => (
              <div key={si} className="flex h-full min-w-0 max-w-[36px] flex-1 flex-col justify-end">
                {v !== null && (single || gi === selectedIndex) && (
                  <span className={`mb-0.5 text-center tabular-nums text-slate-700 ${gi === selectedIndex ? "text-[11px] font-black" : "text-[10px] font-bold"}`}>
                    {format(v)}
                  </span>
                )}
                <div
                  className="w-full rounded-t"
                  style={{
                    height: v === null ? 0 : `${Math.max((v / max) * 100, 2)}%`,
                    maxHeight: "calc(100% - 16px)",
                    background: v === null ? "transparent" : barColor ? barColor(v, si) : series[si].color,
                    opacity: gi === selectedIndex || !single ? 1 : 0.75,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <PeriodAxis labels={groups.map((g) => g.label)} selectedIndex={selectedIndex} pillClass={pillClass} />
    </div>
  )
}

function Chips<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: { key: T; label: string; color?: string }[]
  selected: T[]
  onToggle: (key: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o) => {
        const on = selected.includes(o.key)
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
        )
      })}
    </div>
  )
}

function NoDataBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 shrink-0 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm text-amber-800 [@media(min-height:760px)]:mb-3">
      {children}
    </div>
  )
}

/* ---------------- Page ---------------- */

export default function RHPage() {
  const { period: week, setPeriod: setWeek, year, setYear } = useKpiPeriod("weekly")
  const [scope, setScope] = useState<Scope>("all")
  const [populations, setPopulations] = useState<string[]>(["Global", "Managers", "Employes"])
  const [delayView, setDelayView] = useState<"departments" | "trend">("departments")
  const [data, setData] = useState<RHData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/rh?period=${week}&year=${year}`)
        if (!res.ok) throw new Error("Erreur lors du chargement des données")
        const raw = await res.json()
        if (!cancelled) setData(raw["rh-Indicateurs"] ?? raw)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Erreur inconnue")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchData()
    return () => {
      cancelled = true
    }
  }, [week, year, attempt])

  // Month shown by the monthly indicators: the API's, or the month of the week's Monday
  const computed = monthOfWeek(year, week)
  const month = toNum(data?.Taux_Depart?.Mois_Courant) ?? computed.month
  const monthYear = toNum(data?.Taux_Depart?.Annee_Mois) ?? computed.year
  const monthLabel = `${MONTH_FULL_NAMES[month - 1]} ${monthYear}`
  const monthShort = `${MONTH_NAMES[month - 1]} ${monthYear}`
  const weeksInYear = isoWeeksInYear(year)
  const currentYear = new Date().getFullYear()

  const monthAxis = (items: any[]) =>
    items.map((s) => {
      const m = toNum(s.Mois) ?? 1
      const y = toNum(s.Annee)
      return y !== null && y !== monthYear ? `${MONTH_NAMES[m - 1]} ${String(y).slice(2)}` : MONTH_NAMES[m - 1]
    })

  const depart = data?.Taux_Depart
  const transport = data?.Taux_Remplissage_Transport
  const effectif = data?.Effectif_Et_Couts
  const delai = data?.Delai_Moyen_Recrutement
  const absent = data?.Taux_Absentisme
  const climat = data?.Indice_Climat_Social

  const absentValue = toNum(absent?.Valeur_Actuelle)
  const monthlyValues = [
    toNum(depart?.Global_Mois_Courant),
    toNum(transport?.Valeur_Mois_Courant),
    toNum(effectif?.Effectif_Mois_Courant),
    toNum(delai?.Delai_Moyen_Global),
    toNum(climat?.Indice_Satisfaction_Mois_Courant),
  ]
  const weeklyMissing = absentValue === null
  const monthlyMissing = monthlyValues.every((v) => v === null)

  /* ----- Cards ----- */

  const departCard = () => {
    const serie = chrono(depart?.Serie_6_Mois)
    const target = toNum(depart?.Target_Global) ?? toNum([...serie].reverse().find((s) => toNum(s.Target_Global) !== null)?.Target_Global)
    const value = toNum(depart?.Global_Mois_Courant)
    const shown = POPULATIONS.filter((p) => populations.includes(p.key))
    return (
      <KpiCard
        key="depart"
        title="Taux de Départ"
        icon={FaUserMinus}
        iconClass="bg-blue-50 text-blue-600"
        subtitle={<>Mensuel · cible {target === null ? "—" : `${nf1.format(target)} %`}</>}
        period={monthShort}
        periodClass={MONTH_PILL}
        status={
          <StatusPill status={value === null || target === null ? null : value <= target ? "ok" : "bad"} ok="Cible atteinte" bad="Cible dépassée" />
        }
      >
        <ValueBlock
          value={value === null ? "—" : nf1.format(value)}
          unit="%"
          lowerIsBetter
          variation={{ value: toNum(depart?.Variation_Global_Vs_Mois_Precedent), suffix: " pt", label: "vs M-1" }}
          detail={
            value === null ? null : (
              <>
                Managers {nf1.format(toNum(depart?.Managers_Mois_Courant) ?? 0)} % · Employés {nf1.format(toNum(depart?.Employes_Mois_Courant) ?? 0)} %
              </>
            )
          }
        />
        <div className="mt-2 mb-1 shrink-0">
          <Chips
            options={POPULATIONS}
            selected={populations}
            onToggle={(key) =>
              setPopulations((prev) => (prev.includes(key) ? (prev.length > 1 ? prev.filter((k) => k !== key) : prev) : [...prev, key]))
            }
          />
        </div>
        <BarsChart
          groups={serie.map((s, i) => ({ label: monthAxis(serie)[i], values: shown.map((p) => toNum(s[p.key])) }))}
          series={shown}
          selectedIndex={serie.length - 1}
          pillClass={MONTH_PILL}
          format={(n) => `${nf1.format(n)}`}
          target={populations.length === 1 && populations[0] !== "Global" ? null : target}
        />
      </KpiCard>
    )
  }

  const transportCard = () => {
    const serie = chrono(transport?.Serie_5_Mois)
    const values = serie.map((s) => toNum(s.Valeur))
    const target = toNum(transport?.Target_Mois_Courant) ?? toNum([...serie].reverse().find((s) => toNum(s.Target) !== null)?.Target) ?? 90
    const value = toNum(transport?.Valeur_Mois_Courant)
    return (
      <KpiCard
        key="transport"
        title="Taux de Remplissage du Transport"
        icon={FaBus}
        iconClass="bg-sky-50 text-sky-600"
        subtitle={<>Mensuel · cible {nf1.format(target)} %</>}
        period={monthShort}
        periodClass={MONTH_PILL}
        status={<StatusPill status={value === null ? null : value >= target ? "ok" : "bad"} ok="Cible atteinte" bad="Sous la cible" />}
      >
        <ValueBlock
          value={value === null ? "—" : nf1.format(value)}
          unit="%"
          variation={{ value: toNum(transport?.Variation_Vs_Mois_Precedent), suffix: " pt", label: "vs M-1" }}
        />
        <div className="mt-2 flex min-h-0 flex-1 flex-col">
          <TrendChart
            series={[{ values, color: "#0284c7" }]}
            labels={monthAxis(serie)}
            selectedIndex={serie.length - 1}
            pillClass={MONTH_PILL}
            format={(n) => `${nf1.format(n)}%`}
            target={target}
          />
        </div>
      </KpiCard>
    )
  }

  const effectifCard = () => {
    const serie = chrono(effectif?.Serie_6_Mois)
    const effectifs = serie.map((s) => toNum(s.Effectif))
    const couts = serie.map((s) => toNum(s.Couts))
    const value = toNum(effectif?.Effectif_Mois_Courant)
    const cout = toNum(effectif?.Couts_Mois_Courant)
    const targetEffectif = toNum(effectif?.Target_Effectif) ?? toNum([...serie].reverse().find((s) => toNum(s.Target_Effectif) !== null)?.Target_Effectif)
    const targetCouts = toNum(effectif?.Target_Couts) ?? toNum([...serie].reverse().find((s) => toNum(s.Target_Couts) !== null)?.Target_Couts)
    return (
      <KpiCard
        key="effectif"
        title="Effectif Global et Coûts"
        icon={FaUsers}
        iconClass="bg-indigo-50 text-indigo-600"
        subtitle={
          <>
            Mensuel · cible {targetEffectif === null ? "—" : nf0.format(targetEffectif)} pers. · {fmtEuro(targetCouts)}
          </>
        }
        period={monthShort}
        periodClass={MONTH_PILL}
      >
        <ValueBlock
          value={value === null ? "—" : nf0.format(value)}
          unit="pers."
          variation={{ value: toNum(effectif?.Variation_Effectif_Vs_Mois_Precedent), suffix: "", label: "vs M-1" }}
          detail={cout === null ? null : <>Coûts {fmtEuro(cout)}</>}
        />
        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-1">
          <p className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-400">Effectif</p>
          <TrendChart
            series={[{ values: effectifs, color: "#4f46e5", compactValues: true }]}
            labels={monthAxis(serie)}
            selectedIndex={serie.length - 1}
            pillClass={MONTH_PILL}
            format={(n) => nf0.format(n)}
            target={targetEffectif}
            showAxis={false}
          />
          <p className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-400">Coûts</p>
          <TrendChart
            series={[{ values: couts, color: "#d97706", compactValues: true }]}
            labels={monthAxis(serie)}
            selectedIndex={serie.length - 1}
            pillClass={MONTH_PILL}
            format={(n) => fmtEuro(n)}
            target={targetCouts}
          />
        </div>
      </KpiCard>
    )
  }

  const delaiCard = () => {
    const serie = chrono(delai?.Serie_6_Mois)
    const target = toNum(delai?.Target_Global) ?? toNum([...serie].reverse().find((s) => toNum(s.Target_Global) !== null)?.Target_Global)
    const value = toNum(delai?.Delai_Moyen_Global)
    // Departments of the selected month (the API sends Valeurs_Departements)
    const departments = delai?.Valeurs_Departements ?? delai?.Par_Departement ?? {}
    return (
      <KpiCard
        key="delai"
        title="Délai Moyen de Recrutement"
        icon={FaHourglassHalf}
        iconClass="bg-amber-50 text-amber-600"
        subtitle={<>Mensuel · cible {target === null ? "—" : `${nf1.format(target)} j`}</>}
        period={monthShort}
        periodClass={MONTH_PILL}
        status={<StatusPill status={value === null || target === null ? null : value <= target ? "ok" : "bad"} ok="Cible atteinte" bad="Cible dépassée" />}
      >
        <ValueBlock
          value={value === null ? "—" : nf1.format(value)}
          unit="jours"
          lowerIsBetter
          variation={{ value: toNum(delai?.Variation_Vs_Mois_Precedent), suffix: " j", label: "vs M-1" }}
        />
        <div className="mt-2 mb-1 shrink-0">
          <Chips
            options={[
              { key: "departments" as const, label: "Par département" },
              { key: "trend" as const, label: "Évolution 6 mois" },
            ]}
            selected={[delayView]}
            onToggle={(key) => setDelayView(key)}
          />
        </div>
        {delayView === "departments" ? (
          <BarsChart
            groups={DEPARTMENTS.map((d) => ({ label: d.label, values: [toNum(departments[d.key])] }))}
            series={[{ color: "#64748b" }]}
            selectedIndex={-1}
            pillClass={MONTH_PILL}
            format={(n) => `${nf0.format(n)}j`}
            target={target}
            barColor={(v) => (target === null ? "#64748b" : v <= target ? "#10b981" : "#ef4444")}
            empty={`Pas de délai par département pour ${monthLabel.toLowerCase()}`}
          />
        ) : (
          <TrendChart
            series={[
              {
                values: serie.map((s) => toNum(s.Global)),
                color: "#d97706",
                pointColor: (v) => (target === null ? "#d97706" : v <= target ? "#059669" : "#dc2626"),
              },
            ]}
            labels={monthAxis(serie)}
            selectedIndex={serie.length - 1}
            pillClass={MONTH_PILL}
            format={(n) => `${nf0.format(n)}j`}
            target={target}
          />
        )}
      </KpiCard>
    )
  }

  const absentCard = (large = false) => {
    const serie = chrono(absent?.Serie_6_Semaines)
    const targets = serie.map((s) => toNum(s.Target))
    const target = toNum(absent?.Target_Actuelle) ?? [...targets].reverse().find((t) => t !== null) ?? null
    const previous = toNum(absent?.Valeur_Semaine_Precedente)
    return (
      <KpiCard
        key="absent"
        title="Taux d'Absentéisme"
        icon={FaUserClock}
        iconClass="bg-rose-50 text-rose-600"
        subtitle={<>Hebdomadaire · cible {target === null ? "—" : `${nf1.format(target)} %`}</>}
        period={`S${pad(week)}`}
        periodClass={WEEK_PILL}
        status={
          <StatusPill status={absentValue === null || target === null ? null : absentValue <= target ? "ok" : "bad"} ok="Cible atteinte" bad="Cible dépassée" />
        }
        className={large ? "md:min-h-[420px]" : ""}
      >
        <ValueBlock
          value={absentValue === null ? "—" : nf1.format(absentValue)}
          unit="%"
          lowerIsBetter
          variation={{ value: toNum(absent?.Variation_Vs_Semaine_Precedente), suffix: " pt", label: "vs S-1" }}
          detail={previous === null ? null : <>S{pad(week === 1 ? isoWeeksInYear(year - 1) : week - 1)} : {nf1.format(previous)} %</>}
        />
        <div className="mt-2 flex min-h-0 flex-1 flex-col">
          <TrendChart
            series={[
              {
                values: serie.map((s) => toNum(s.Valeur)),
                color: "#2563eb",
                pointColor: (v, i) => {
                  const t = targets[i] ?? target
                  return t === null ? "#2563eb" : v > t ? "#dc2626" : "#059669"
                },
              },
            ]}
            labels={serie.map((s) => `S${pad(toNum(s.Semaine) ?? 0)}`)}
            selectedIndex={serie.length - 1}
            pillClass={WEEK_PILL}
            format={(n) => `${nf1.format(n)}%`}
            target={target}
          />
        </div>
      </KpiCard>
    )
  }

  const climatCard = () => {
    const serie = chrono(climat?.Serie_6_Mois)
    const target = toNum(climat?.Target_Indice_Satisfaction_Mois_Courant) ?? toNum([...serie].reverse().find((s) => toNum(s.Target_Indice_Satisfaction) !== null)?.Target_Indice_Satisfaction)
    const value = toNum(climat?.Indice_Satisfaction_Mois_Courant)
    const incidents = toNum(climat?.Incidents_Mois_Courant)
    const incidentsTarget = toNum(climat?.Target_Incidents_Mois_Courant)
    return (
      <KpiCard
        key="climat"
        title="Indice de Climat Social"
        icon={FaSmile}
        iconClass="bg-emerald-50 text-emerald-600"
        subtitle={<>Mensuel · cible {target === null ? "—" : `${nf1.format(target)}/10`}</>}
        period={monthShort}
        periodClass={MONTH_PILL}
        status={<StatusPill status={value === null || target === null ? null : value >= target ? "ok" : "bad"} ok="Cible atteinte" bad="Sous la cible" />}
      >
        <ValueBlock
          value={value === null ? "—" : nf1.format(value)}
          unit="/10"
          variation={{ value: toNum(climat?.Variation_Vs_Mois_Precedent), suffix: " pt", label: "vs M-1" }}
          detail={
            incidents === null ? null : (
              <span className={incidentsTarget !== null && incidents > incidentsTarget ? "font-bold text-rose-600" : ""}>
                Incidents {nf0.format(incidents)}
                {incidentsTarget !== null && ` (cible ${nf0.format(incidentsTarget)})`}
              </span>
            )
          }
        />
        <div className="mt-2 flex min-h-0 flex-1 flex-col">
          <TrendChart
            series={[
              {
                values: serie.map((s) => toNum(s.Indice_Satisfaction)),
                color: "#059669",
                pointColor: (v) => (target === null ? "#059669" : v >= target ? "#059669" : "#d97706"),
              },
            ]}
            labels={monthAxis(serie)}
            selectedIndex={serie.length - 1}
            pillClass={MONTH_PILL}
            format={(n) => nf1.format(n)}
            target={target}
            sub={serie.map((s, i) => {
              const n = toNum(s.Incidents)
              const t = toNum(s.Target_Incidents)
              return (
                <span key={i} className={`text-[10px] ${n === null ? "text-slate-300" : t !== null && n > t ? "font-bold text-rose-600" : "text-slate-500"}`}>
                  {n === null ? "—" : `${n} inc.`}
                </span>
              )
            })}
          />
        </div>
      </KpiCard>
    )
  }

  /* ----- Layout ----- */

  const selectClass = "h-9 border-slate-200 bg-white text-sm text-slate-700 hover:bg-slate-50"
  const weekOptions = Array.from({ length: weeksInYear }, (_, i) => i + 1)
  const years = [currentYear - 1, currentYear]

  const missingParts = [
    scope !== "monthly" && weeklyMissing ? `la semaine ${week}` : null,
    scope !== "weekly" && monthlyMissing ? monthLabel.toLowerCase() : null,
  ].filter(Boolean)

  return (
    <main className="flex flex-col p-3 sm:p-4 [@media(min-height:760px)]:lg:p-5 md:h-full md:min-h-[560px]">
      {/* Header: selected periods, very visible, and the filters */}
      <div className="mb-2 flex shrink-0 flex-wrap items-center justify-between gap-3 [@media(min-height:760px)]:mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="block h-8 w-1 rounded-full bg-blue-500" />
          <span className="mr-2 text-xs font-bold uppercase tracking-widest text-blue-500">RH KPI</span>
          <span className={`rounded-lg px-3 py-1 text-sm font-black ${WEEK_PILL}`}>
            Semaine {week}
            <span className="ml-2 text-xs font-semibold text-blue-100">{weekRange(year, week)}</span>
          </span>
          <span className={`rounded-lg px-3 py-1 text-sm font-black ${MONTH_PILL}`}>{monthLabel}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={String(week)} onValueChange={(v) => setWeek(Number(v))}>
            <SelectTrigger className={`w-[150px] ${selectClass}`} aria-label="Semaine">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {[...weekOptions].reverse().map((w) => (
                <SelectItem key={w} value={String(w)}>
                  S{pad(w)} · {shortDate.format(isoWeekMonday(year, w))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(month)} onValueChange={(v) => setWeek(lastWeekOfMonth(year, Number(v)))}>
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
              const y = Number(v)
              setYear(y)
              setWeek(Math.min(week, isoWeeksInYear(y)))
            }}
          >
            <SelectTrigger className={`w-[96px] ${selectClass}`} aria-label="Année">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
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
                ["weekly", "Hebdomadaire"],
                ["monthly", "Mensuels"],
              ] as [Scope, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={scope === key}
                onClick={() => setScope(key)}
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

      {loading ? (
        <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="font-medium text-slate-500">Chargement des données RH...</p>
        </div>
      ) : error ? (
        <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-3">
          <p className="font-semibold text-rose-600">{error}</p>
          <button type="button" onClick={() => setAttempt((n) => n + 1)} className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700">
            Réessayer
          </button>
        </div>
      ) : (
        <>
          {missingParts.length > 0 && (
            <NoDataBanner>
              Aucune donnée RH pour {missingParts.join(" et pour ")} : le fichier RH {missingParts.length > 1 ? "hebdomadaire et mensuel" : scope !== "monthly" && weeklyMissing ? "hebdomadaire" : "mensuel"} de cette
              période n&apos;a pas encore été importé (page Importation).
            </NoDataBanner>
          )}
          {scope === "weekly" ? (
            <div className="grid min-h-0 flex-1 grid-cols-1">{absentCard(true)}</div>
          ) : scope === "monthly" ? (
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 [@media(min-height:900px)]:gap-4">
              <div className="flex min-h-0 lg:col-span-2 [&>section]:flex-1">{departCard()}</div>
              <div className="flex min-h-0 lg:col-span-2 [&>section]:flex-1">{transportCard()}</div>
              <div className="flex min-h-0 lg:col-span-2 [&>section]:flex-1">{effectifCard()}</div>
              <div className="flex min-h-0 lg:col-span-3 [&>section]:flex-1">{delaiCard()}</div>
              <div className="flex min-h-0 lg:col-span-3 [&>section]:flex-1">{climatCard()}</div>
            </div>
          ) : (
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 [@media(min-height:900px)]:gap-4">
              {departCard()}
              {transportCard()}
              {effectifCard()}
              {delaiCard()}
              {absentCard()}
              {climatCard()}
            </div>
          )}
        </>
      )}
    </main>
  )
}
