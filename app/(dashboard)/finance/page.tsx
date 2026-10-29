"use client"

import React, { useEffect, useState } from "react"
import { FaChartPie, FaEuroSign, FaExclamationTriangle, FaFileInvoice, FaWallet } from "react-icons/fa"
import { useKpiPeriod } from "@/hooks/use-kpi-period"
import {
  BarsChart,
  Chips,
  HistoryRow,
  KpiCard,
  Legend,
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
  nf1,
  nf2,
  pad,
  sectionLabel,
  toNum,
  weekBefore,
} from "@/components/kpi/LightKpi"

const fmtMEUR = (n: number | null) => (n === null ? "—" : nf2.format(n))

// Oldest first, so the selected month is the last one
function chronoMonths(items: any[] | null | undefined): any[] {
  return [...(items ?? [])].sort((a, b) => (toNum(a.Annee) ?? 0) * 100 + (toNum(a.Mois) ?? 0) - ((toNum(b.Annee) ?? 0) * 100 + (toNum(b.Mois) ?? 0)))
}

export default function FinancePage() {
  const { period: week, setPeriod: setWeek, year, setYear } = useKpiPeriod("weekly")
  const [scope, setScope] = useState<Scope>("all")
  const [caView, setCaView] = useState<"month" | "last4">("month")
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
            `/api/finance?type=weekly&period=${week}&year=${year}`,
            `/api/finance?type=monthly&period=${month}&year=${monthYear}`,
          ].map(async (url) => {
            const res = await fetch(url, { cache: "no-store" })
            if (!res.ok) throw new Error(`Erreur ${res.status} lors du chargement des données Finance`)
            const json = await res.json()
            return json?.data ?? json
          })
        )
        if (!cancelled) {
          setWeekly(w?.Finance_Semaine ?? null)
          setMonthly(m?.Finance_Mois ?? null)
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
  const weekLabel = (n: number) => {
    const w = weekBefore(year, week, n)
    return `S${pad(w.week)}`
  }

  /* ----- Weekly ----- */

  const ca = weekly?.Chiffre_Affaires
  const taux = weekly?.Taux_Facturation_Livraison
  const caValue = toNum(ca?.Valeur_Mois_Cumulee_MEUR)
  const tauxValue = toNum(taux?.Valeur_S_1)
  const weeklyMissing = Boolean(weekly?.Error) || (caValue === null && tauxValue === null)

  const caCard = () => {
    const target = toNum(ca?.Target_Mois_MEUR)
    const monthWeeks: any[] = ca?.Semaine_Du_Mois ?? []
    // Weeks of the month up to the selected one have an actual value, the next ones a forecast
    const lastPast = monthWeeks.reduce((last, s, i) => (s?.Prevision_MEUR === undefined || s?.Prevision_MEUR === null ? i : last), -1)
    const monthLabels = monthWeeks.map((_, i) => weekLabel(lastPast - i))
    const last4: any[] = ca?.Dernieres_4_Semaines ?? []
    const last4Values = last4.map((s) => toNum(s?.Valeur_MEUR))
    const last4Labels = last4.map((_, i) => weekLabel(last4.length - 1 - i))
    return (
      <KpiCard
        key="ca"
        title="Chiffre d'Affaires Réalisé vs Prévisionnel"
        icon={FaEuroSign}
        iconClass="bg-blue-50 text-blue-600"
        subtitle={<>Hebdomadaire{target !== null && <> · objectif du mois {nf2.format(target)} M€</>}</>}
        period={`S${pad(week)}`}
        periodClass={WEEK_PILL}
        status={<StatusPill status={caValue === null || target === null ? null : caValue >= target ? "ok" : "bad"} ok="Objectif atteint" bad="Sous l'objectif" />}
        className={single ? "md:min-h-[420px]" : ""}
      >
        <ValueBlock
          value={fmtMEUR(caValue)}
          unit="M€"
          variation={{ value: toNum(ca?.Variation_Pct_Vs_S_1), suffix: " %", label: "vs S-1" }}
          detail={caValue === null ? null : <>Cumul {MONTH_FULL_NAMES[month - 1].toLowerCase()} à S{pad(week)}</>}
        />
        {single && last4.length > 0 && (
          <>
            <p className={`${sectionLabel} mt-3 mb-1 shrink-0`}>CA des 4 dernières semaines (M€)</p>
            <HistoryRow
              pillClass={WEEK_PILL}
              ringClass="ring-blue-500/30"
              slots={last4.map((_, i) => ({
                label: last4Labels[i],
                value: last4Values[i] === null ? null : nf2.format(last4Values[i] as number),
                status: null,
                selected: i === last4.length - 1,
              }))}
            />
          </>
        )}
        <div className="mt-2 mb-1 flex shrink-0 flex-wrap items-center justify-between gap-2">
          <Chips
            options={[
              { key: "month" as const, label: "Semaines du mois" },
              { key: "last4" as const, label: "4 dernières semaines" },
            ]}
            selected={[caView]}
            onToggle={(key) => setCaView(key)}
          />
          {caView === "month" && (
            <Legend
              items={[
                { label: "Réel", color: "#2563eb" },
                { label: "Prévision", color: "#cbd5e1" },
              ]}
            />
          )}
        </div>
        {caView === "month" ? (
          <BarsChart
            // Forecast = (objective - cumul) / weeks left: 0 without objective, so not shown then
            groups={monthWeeks.map((s, i) => ({
              label: monthLabels[i],
              values: [toNum(s?.Reel_MEUR), target === null ? null : toNum(s?.Prevision_MEUR)],
            }))}
            series={[{ color: "#2563eb" }, { color: "#cbd5e1" }]}
            selectedIndex={lastPast}
            pillClass={WEEK_PILL}
            format={(n) => nf2.format(n)}
            sub={monthWeeks.map((s, i) => (
              <span key={i} className="text-[10px] text-slate-400">
                cumul {fmtMEUR(toNum(s?.Cumul_MEUR))}
              </span>
            ))}
            empty="Pas de chiffre d'affaires sur le mois"
          />
        ) : (
          <BarsChart
            groups={last4.map((_, i) => ({ label: last4Labels[i], values: [last4Values[i]] }))}
            series={[{ color: "#2563eb" }]}
            selectedIndex={last4.length - 1}
            pillClass={WEEK_PILL}
            format={(n) => nf2.format(n)}
            empty="Pas de chiffre d'affaires sur les 4 dernières semaines"
          />
        )}
      </KpiCard>
    )
  }

  const tauxCard = () => {
    const target = toNum(taux?.Target)
    const history: any[] = taux?.Dernieres_4_Semaines ?? []
    const values = history.map((s) => toNum(s?.Valeur))
    const labels = history.map((_, i) => weekLabel(history.length - 1 - i))
    const statusOf = (v: number | null): Status | null => (v === null || target === null ? null : v >= target ? "ok" : "bad")
    return (
      <KpiCard
        key="taux"
        title="Taux de Facturation & Livraison"
        icon={FaFileInvoice}
        iconClass="bg-sky-50 text-sky-600"
        subtitle={<>Hebdomadaire{target !== null && <> · cible {nf1.format(target)} %</>}</>}
        period={`S${pad(week)}`}
        periodClass={WEEK_PILL}
        status={<StatusPill status={statusOf(tauxValue)} ok="Cible atteinte" bad="Sous la cible" />}
        className={single ? "md:min-h-[420px]" : ""}
      >
        <ValueBlock value={tauxValue === null ? "—" : nf1.format(tauxValue)} unit="%" variation={{ value: toNum(taux?.Variation_Pts_Vs_S_1), suffix: " pt", label: "vs S-1" }} />
        {single && history.length > 0 && (
          <>
            <p className={`${sectionLabel} mt-3 mb-1 shrink-0`}>Historique 4 semaines</p>
            <HistoryRow
              pillClass={WEEK_PILL}
              ringClass="ring-blue-500/30"
              slots={history.map((_, i) => ({
                label: labels[i],
                value: values[i] === null ? null : `${nf1.format(values[i] as number)}%`,
                status: statusOf(values[i]),
                selected: i === history.length - 1,
              }))}
            />
          </>
        )}
        <p className={`${sectionLabel} mt-3 mb-1 shrink-0`}>Tendance</p>
        <TrendChart
          series={[
            {
              values,
              color: "#0284c7",
              pointColor: target === null ? undefined : (v) => (v >= target ? "#059669" : "#dc2626"),
            },
          ]}
          labels={labels}
          selectedIndex={history.length - 1}
          pillClass={WEEK_PILL}
          format={(n) => `${nf1.format(n)}%`}
          target={target}
        />
      </KpiCard>
    )
  }

  /* ----- Monthly ----- */

  const eff = monthly?.Efficience_Financiere
  const exec = monthly?.Execution_Budgetaire
  const paiements = monthly?.Paiements_Retard
  const monthlyMissing = [eff?.Valeur_Affichee, exec?.Valeur_Affichee, paiements?.Valeur_Affichee_MEUR].every((v) => toNum(v) === null)

  const monthAxis = (items: any[]) =>
    items.map((s) => {
      const m = toNum(s?.Mois) ?? 1
      const y = toNum(s?.Annee)
      return y !== null && y !== monthYear ? `${MONTH_NAMES[m - 1]} ${String(y).slice(2)}` : MONTH_NAMES[m - 1]
    })

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
    lowerIsBetter = false,
    format,
  }: {
    key: string
    kpi: any
    title: string
    icon: any
    iconClass: string
    color: string
    unit: string
    valueKey: string
    historyKey: string
    targetKey: string
    lowerIsBetter?: boolean
    format: (n: number) => string
  }) => {
    const serie = chronoMonths(kpi?.Suivi_4_Mois)
    const values = serie.map((s) => toNum(s?.[historyKey]))
    const targets = serie.map((s) => toNum(s?.[targetKey]))
    const target = targets[targets.length - 1] ?? toNum(kpi?.[targetKey]) ?? [...targets].reverse().find((t) => t !== null) ?? null
    const value = toNum(kpi?.[valueKey])
    const statusOf = (v: number | null, t: number | null): Status | null =>
      v === null || t === null ? null : (lowerIsBetter ? v <= t : v >= t) ? "ok" : "bad"
    const labels = monthAxis(serie)
    const deltaUnit = kpi?.Delta_Unite === "pts" ? " pt" : kpi?.Delta_Unite ? ` ${kpi.Delta_Unite}` : ""
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
          variation={{ value: toNum(kpi?.Delta_Affiche ?? kpi?.Delta_Affiche_MEUR), suffix: deltaUnit, label: kpi?.VsLabel ?? "vs M-1", format: nf2 }}
        />
        {single && serie.length > 0 && (
          <>
            <p className={`${sectionLabel} mt-3 mb-1 shrink-0`}>Historique 4 mois</p>
            <HistoryRow
              pillClass={MONTH_PILL}
              ringClass="ring-violet-500/30"
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
        <TrendChart
          series={[
            {
              values,
              color,
              pointColor: target === null ? undefined : (v, i) => (statusOf(v, targets[i] ?? target) === "ok" ? "#059669" : "#dc2626"),
            },
          ]}
          labels={labels}
          selectedIndex={serie.length - 1}
          pillClass={MONTH_PILL}
          format={(n) => `${format(n)}${unit === "%" ? "%" : ""}`}
          target={target}
        />
      </KpiCard>
    )
  }

  const effCard = () =>
    monthlyCard({
      key: "eff",
      kpi: eff,
      title: "Efficience Financière",
      icon: FaChartPie,
      iconClass: "bg-violet-50 text-violet-600",
      color: "#7c3aed",
      unit: "%",
      valueKey: "Valeur_Affichee",
      historyKey: "Valeur",
      targetKey: "Target",
      format: (n) => nf1.format(n),
    })
  const execCard = () =>
    monthlyCard({
      key: "exec",
      kpi: exec,
      title: "Exécution Budgétaire",
      icon: FaWallet,
      iconClass: "bg-indigo-50 text-indigo-600",
      color: "#4f46e5",
      unit: "%",
      valueKey: "Valeur_Affichee",
      historyKey: "Valeur",
      targetKey: "Target",
      format: (n) => nf1.format(n),
    })
  const paiementsCard = () =>
    monthlyCard({
      key: "paiements",
      kpi: paiements,
      title: "Total des Paiements en Retard",
      icon: FaExclamationTriangle,
      iconClass: "bg-rose-50 text-rose-600",
      color: "#e11d48",
      unit: "M€",
      valueKey: "Valeur_Affichee_MEUR",
      historyKey: "Valeur_MEUR",
      targetKey: "Target_MEUR",
      lowerIsBetter: true,
      format: (n) => nf2.format(n),
    })

  /* ----- Layout ----- */

  const missing = [
    scope !== "monthly" && weeklyMissing ? `la semaine ${week}` : null,
    scope !== "weekly" && monthlyMissing ? `${MONTH_FULL_NAMES[month - 1].toLowerCase()} ${monthYear}` : null,
  ].filter(Boolean)
  const missingFile =
    missing.length > 1 ? "hebdomadaire (FINANCE) et mensuel (FINANCE_MONTHLY)" : scope !== "monthly" && weeklyMissing ? "hebdomadaire (FINANCE)" : "mensuel (FINANCE_MONTHLY)"

  return (
    <main className="flex flex-col p-3 sm:p-4 [@media(min-height:760px)]:lg:p-5 md:h-full md:min-h-[560px]">
      <PeriodHeader title="Finance KPI" week={week} year={year} onWeekChange={setWeek} onYearChange={setYear} scope={scope} onScopeChange={setScope} />

      {loading ? (
        <LoadingState label="Chargement des données Finance..." />
      ) : error ? (
        <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-2">
          <p className="font-semibold text-rose-600">{error}</p>
          <p className="text-sm text-slate-400">Vérifiez que l&apos;API Finance est disponible.</p>
        </div>
      ) : (
        <>
          {missing.length > 0 && (
            <NoDataBanner>
              Aucune donnée Finance pour {missing.join(" et pour ")} : le fichier {missingFile} de cette période n&apos;a pas encore été importé
              (page Importation).
            </NoDataBanner>
          )}
          {scope === "weekly" ? (
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 [@media(min-height:900px)]:gap-4">
              {caCard()}
              {tauxCard()}
            </div>
          ) : scope === "monthly" ? (
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3 [@media(min-height:900px)]:gap-4">
              {effCard()}
              {execCard()}
              {paiementsCard()}
            </div>
          ) : (
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 [@media(min-height:900px)]:gap-4">
              <div className="flex min-h-0 lg:col-span-3 [&>section]:flex-1">{caCard()}</div>
              <div className="flex min-h-0 lg:col-span-3 [&>section]:flex-1">{tauxCard()}</div>
              <div className="flex min-h-0 lg:col-span-2 [&>section]:flex-1">{effCard()}</div>
              <div className="flex min-h-0 lg:col-span-2 [&>section]:flex-1">{execCard()}</div>
              <div className="flex min-h-0 md:col-span-2 lg:col-span-2 [&>section]:flex-1">{paiementsCard()}</div>
            </div>
          )}
        </>
      )}
    </main>
  )
}
