"use client"

import React, { useEffect, useState } from "react"
import type { IconType } from "react-icons"
import { FaBoxes, FaChartLine, FaCoins, FaShieldAlt, FaSyncAlt, FaTruck } from "react-icons/fa"
import { useKpiPeriod } from "@/hooks/use-kpi-period"
import {
  BarsChart,
  Chips,
  HistoryRow,
  KpiCard,
  LoadingState,
  MONTH_FULL_NAMES,
  MONTH_NAMES,
  MONTH_PILL,
  NoDataBanner,
  PeriodHeader,
  Scope,
  Status,
  StatusPill,
  TrendChart,
  ValueBlock,
  WEEK_PILL,
  monthOfWeek,
  nf0,
  nf1,
  nf2,
  pad,
  sectionLabel,
  toNum,
} from "@/components/kpi/LightKpi"

// Stock reliability per warehouse: same threshold as before (95 %)
const WAREHOUSE_THRESHOLD = 95

// Oldest first, so the selected period is the last one
function chrono(items: any[] | null | undefined): any[] {
  return [...(items ?? [])].sort(
    (a, b) =>
      (toNum(a?.Annee) ?? 0) * 100 + (toNum(a?.Mois ?? a?.Semaine) ?? 0) - ((toNum(b?.Annee) ?? 0) * 100 + (toNum(b?.Mois ?? b?.Semaine) ?? 0))
  )
}

export default function SupplyChainPage() {
  const { period: week, setPeriod: setWeek, year, setYear } = useKpiPeriod("weekly")
  const [scope, setScope] = useState<Scope>("all")
  const [stockView, setStockView] = useState<"trend" | "warehouses">("trend")
  const [weekly, setWeekly] = useState<any>(null)
  const [monthly, setMonthly] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { month, year: monthYear } = monthOfWeek(year, week)

  // Weekly indicators for the week, monthly ones for the month of the week
  useEffect(() => {
    let cancelled = false
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const [w, m] = await Promise.all(
          [
            `/api/supplychain?type=weekly&period=${week}&year=${year}`,
            `/api/supplychain?type=monthly&period=${month}&year=${monthYear}`,
          ].map(async (url) => {
            const res = await fetch(url, { cache: "no-store" })
            if (!res.ok) throw new Error(`Erreur ${res.status} lors du chargement des données Supply Chain`)
            const json = await res.json()
            return json?.data?.data ?? json?.data ?? json
          })
        )
        if (!cancelled) {
          setWeekly(w?.Inventory_Semaine ?? null)
          setMonthly(m?.Inventory_Mois ?? null)
        }
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
  }, [week, year, month, monthYear])

  const single = scope !== "all"
  const monthShort = `${MONTH_NAMES[month - 1]} ${monthYear}`
  const monthAxis = (items: any[]) =>
    items.map((s) => {
      const m = toNum(s?.Mois) ?? 1
      const y = toNum(s?.Annee)
      return y !== null && y !== monthYear ? `${MONTH_NAMES[m - 1]} ${String(y).slice(2)}` : MONTH_NAMES[m - 1]
    })

  /* ----- Weekly: service rates (%), higher is better ----- */

  const weeklyCard = (key: string, kpi: any, title: string, icon: IconType, iconClass: string, color: string, chart: "bars" | "line") => {
    const serie = chrono(kpi?.Historique_5_Semaines)
    const values = serie.map((s) => toNum(s?.Valeur))
    const targets = serie.map((s) => toNum(s?.Target))
    const target = toNum(kpi?.Target) ?? targets[targets.length - 1] ?? null
    const value = toNum(kpi?.Valeur_Semaine)
    const labels = serie.map((s) => `S${pad(toNum(s?.Semaine) ?? 0)}`)
    const statusOf = (v: number | null, t: number | null): Status | null => (v === null || t === null ? null : v >= t ? "ok" : "bad")
    const format = (n: number) => `${nf0.format(n)}%`
    return (
      <KpiCard
        key={key}
        title={title}
        icon={icon}
        iconClass={iconClass}
        subtitle={<>Hebdomadaire{target !== null && <> · cible {nf1.format(target)} %</>}</>}
        period={`S${pad(week)}`}
        periodClass={WEEK_PILL}
        status={<StatusPill status={statusOf(value, target)} ok="Cible atteinte" bad="Sous la cible" />}
        className={single ? "md:min-h-[420px]" : ""}
      >
        <ValueBlock value={value === null ? "—" : nf1.format(value)} unit="%" variation={{ value: toNum(kpi?.Variation_Pts_Vs_S_1), suffix: " pt", label: "vs S-1" }} />
        {single && serie.length > 0 && (
          <>
            <p className={`${sectionLabel} mt-3 mb-1 shrink-0`}>Historique 5 semaines</p>
            <HistoryRow
              pillClass={WEEK_PILL}
              ringClass="ring-blue-500/30"
              slots={serie.map((_, i) => ({
                label: labels[i],
                value: values[i] === null ? null : format(values[i] as number),
                status: statusOf(values[i], targets[i] ?? target),
                selected: i === serie.length - 1,
              }))}
            />
          </>
        )}
        <p className={`${sectionLabel} mt-3 mb-1 shrink-0`}>Tendance</p>
        {chart === "bars" ? (
          <BarsChart
            groups={serie.map((_, i) => ({ label: labels[i], values: [values[i]] }))}
            series={[{ color }]}
            selectedIndex={serie.length - 1}
            pillClass={WEEK_PILL}
            format={format}
            target={target}
            barColor={(v, _si, gi) => (gi === serie.length - 1 ? color : `${color}66`)}
          />
        ) : (
          <TrendChart
            series={[{ values, color }]}
            labels={labels}
            selectedIndex={serie.length - 1}
            pillClass={WEEK_PILL}
            format={format}
            target={target}
          />
        )}
      </KpiCard>
    )
  }

  const clientOtif = weekly?.Taux_Service_Client_OTIF
  const fournOtif = weekly?.Taux_Service_Fournisseurs_OTIF
  const fiabClient = weekly?.Fiabilite_Client
  const weeklyMissing = [clientOtif, fournOtif, fiabClient].every((k) => toNum(k?.Valeur_Semaine) === null)

  const weeklyCards = () => [
    weeklyCard("client", clientOtif, "Taux de Service Client / OTIF", FaChartLine, "bg-blue-50 text-blue-600", "#2563eb", "bars"),
    weeklyCard("fournisseurs", fournOtif, "Taux de Service Fournisseurs / OTIF", FaTruck, "bg-sky-50 text-sky-600", "#0284c7", "line"),
    weeklyCard("fiabilite-client", fiabClient, "Fiabilité Client", FaShieldAlt, "bg-teal-50 text-teal-600", "#0d9488", "line"),
  ]

  /* ----- Monthly ----- */

  const rotation = monthly?.Rotation_Stocks
  const fiabStocks = monthly?.Fiabilite_Stocks
  const cout = monthly?.Cout_Logistique_Total
  const monthlyMissing = [rotation?.Valeur_Jours, fiabStocks?.Valeur_Pct, cout?.Valeur_MEUR].every((v) => toNum(v) === null)

  const monthlyCard = ({
    key,
    kpi,
    title,
    icon,
    iconClass,
    color,
    unit,
    valueKey,
    historyKey,
    targetKey,
    deltaKey,
    deltaSuffix,
    lowerIsBetter = false,
    format,
    extra,
  }: {
    key: string
    kpi: any
    title: string
    icon: IconType
    iconClass: string
    color: string
    unit: string
    valueKey: string
    historyKey: string
    targetKey: string
    deltaKey: string
    deltaSuffix: string
    lowerIsBetter?: boolean
    format: (n: number) => string
    extra?: { chips: React.ReactNode; content: React.ReactNode | null }
  }) => {
    const serie = chrono(kpi?.Suivi_5_Mois)
    const values = serie.map((s) => toNum(s?.[historyKey]))
    const targets = serie.map((s) => toNum(s?.[targetKey]))
    const target = toNum(kpi?.[targetKey]) ?? targets[targets.length - 1] ?? null
    const value = toNum(kpi?.[valueKey])
    const statusOf = (v: number | null, t: number | null): Status | null =>
      v === null || t === null ? null : (lowerIsBetter ? v <= t : v >= t) ? "ok" : "bad"
    const labels = monthAxis(serie)
    const withUnit = (n: number) => `${format(n)}${unit === "%" ? "%" : ""}`
    return (
      <KpiCard
        key={key}
        title={title}
        icon={icon}
        iconClass={iconClass}
        subtitle={<>Mensuel{target !== null && <> · cible {format(target)} {unit}</>}</>}
        period={monthShort}
        periodClass={MONTH_PILL}
        status={<StatusPill status={statusOf(value, target)} ok="Cible atteinte" bad={lowerIsBetter ? "Cible dépassée" : "Sous la cible"} />}
        className={single ? "md:min-h-[420px]" : ""}
      >
        <ValueBlock
          value={value === null ? "—" : format(value)}
          unit={unit}
          lowerIsBetter={lowerIsBetter}
          variation={{ value: toNum(kpi?.[deltaKey]), suffix: deltaSuffix, label: kpi?.VsLabel ?? "vs M-1", format: nf2 }}
        />
        {single && serie.length > 0 && (
          <>
            <p className={`${sectionLabel} mt-3 mb-1 shrink-0`}>Historique 5 mois</p>
            <HistoryRow
              pillClass={MONTH_PILL}
              ringClass="ring-violet-500/30"
              slots={serie.map((_, i) => ({
                label: labels[i],
                value: values[i] === null ? null : withUnit(values[i] as number),
                status: statusOf(values[i], targets[i] ?? target),
                selected: i === serie.length - 1,
              }))}
            />
          </>
        )}
        {extra ? <div className="mt-3 mb-1 shrink-0">{extra.chips}</div> : <p className={`${sectionLabel} mt-3 mb-1 shrink-0`}>Tendance</p>}
        {extra?.content ?? (
          <TrendChart
            series={[{ values, color, pointColor: target === null ? undefined : (v, i) => (statusOf(v, targets[i] ?? target) === "ok" ? "#059669" : "#dc2626") }]}
            labels={labels}
            selectedIndex={serie.length - 1}
            pillClass={MONTH_PILL}
            format={withUnit}
            target={target}
          />
        )}
      </KpiCard>
    )
  }

  const warehouses = Object.entries(fiabStocks?.Detail_Warehouses ?? {}).map(([key, v]) => ({ label: key.replace("Warehouse_", "Entrepôt "), value: toNum(v) }))

  const monthlyCards = () => [
    monthlyCard({
      key: "rotation",
      kpi: rotation,
      title: "Rotation des Stocks",
      icon: FaBoxes,
      iconClass: "bg-amber-50 text-amber-600",
      color: "#d97706",
      unit: "jours",
      valueKey: "Valeur_Jours",
      historyKey: "Valeur_Jours",
      targetKey: "Target_Jours",
      deltaKey: "Variation_Jours_Vs_M_1",
      deltaSuffix: " j",
      lowerIsBetter: true,
      format: (n) => nf1.format(n),
    }),
    monthlyCard({
      key: "fiabilite-stocks",
      kpi: fiabStocks,
      title: "Taux de Fiabilité des Stocks",
      icon: FaSyncAlt,
      iconClass: "bg-violet-50 text-violet-600",
      color: "#7c3aed",
      unit: "%",
      valueKey: "Valeur_Pct",
      historyKey: "Valeur",
      targetKey: "Target",
      deltaKey: "Variation_Pts_Vs_M_1",
      deltaSuffix: " pt",
      format: (n) => nf1.format(n),
      extra: {
        chips: (
          <Chips
            options={[
              { key: "trend" as const, label: "Évolution 5 mois" },
              { key: "warehouses" as const, label: "Par entrepôt" },
            ]}
            selected={[stockView]}
            onToggle={(key) => setStockView(key)}
          />
        ),
        content:
          stockView === "warehouses" ? (
            <BarsChart
              groups={warehouses.map((w) => ({ label: w.label, values: [w.value] }))}
              series={[{ color: "#7c3aed" }]}
              selectedIndex={-1}
              pillClass={MONTH_PILL}
              format={(n) => `${nf1.format(n)}%`}
              target={WAREHOUSE_THRESHOLD}
              barColor={(v) => (v >= WAREHOUSE_THRESHOLD ? "#10b981" : "#f59e0b")}
              empty={`Pas de détail par entrepôt pour ${MONTH_FULL_NAMES[month - 1].toLowerCase()}`}
            />
          ) : null,
      },
    }),
    monthlyCard({
      key: "cout",
      kpi: cout,
      title: "Coût Logistique Total",
      icon: FaCoins,
      iconClass: "bg-rose-50 text-rose-600",
      color: "#e11d48",
      unit: "M€",
      valueKey: "Valeur_MEUR",
      historyKey: "Valeur_MEUR",
      targetKey: "Target_MEUR",
      deltaKey: "Delta_MEUR_Vs_M_1",
      deltaSuffix: " M€",
      lowerIsBetter: true,
      format: (n) => nf2.format(n),
    }),
  ]

  /* ----- Layout ----- */

  const missing = [
    scope !== "monthly" && weeklyMissing ? `la semaine ${week}` : null,
    scope !== "weekly" && monthlyMissing ? `${MONTH_FULL_NAMES[month - 1].toLowerCase()} ${monthYear}` : null,
  ].filter(Boolean)
  const missingFile =
    missing.length > 1 ? "hebdomadaire (INV) et mensuel (INV_MONTH)" : scope !== "monthly" && weeklyMissing ? "hebdomadaire (INV)" : "mensuel (INV_MONTH)"

  return (
    <main className="flex flex-col p-3 sm:p-4 [@media(min-height:760px)]:lg:p-5 md:h-full md:min-h-[560px]">
      <PeriodHeader title="Supply Chain KPI" week={week} year={year} onWeekChange={setWeek} onYearChange={setYear} scope={scope} onScopeChange={setScope} />

      {loading ? (
        <LoadingState label="Chargement des données Supply Chain..." />
      ) : error ? (
        <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-2">
          <p className="font-semibold text-rose-600">{error}</p>
          <p className="text-sm text-slate-400">Vérifiez que l&apos;API Supply Chain est disponible.</p>
        </div>
      ) : (
        <>
          {missing.length > 0 && (
            <NoDataBanner>
              Aucune donnée Supply Chain pour {missing.join(" et pour ")} : le fichier {missingFile} de cette période n&apos;a pas encore été
              importé (page Importation).
            </NoDataBanner>
          )}
          <div
            className={`grid min-h-0 flex-1 grid-cols-1 gap-3 [@media(min-height:900px)]:gap-4 ${
              scope === "all" ? "md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2" : "md:grid-cols-3"
            }`}
          >
            {scope !== "monthly" && weeklyCards()}
            {scope !== "weekly" && monthlyCards()}
          </div>
        </>
      )}
    </main>
  )
}
