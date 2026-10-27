"use client"

import React, { useState, useEffect } from "react"
import { PeriodSelector } from "@/components/ui/PeriodSelector"
import { TabSelector } from "@/components/ui/TabSelector"
import { useKpiPeriod } from "@/hooks/use-kpi-period"

// The API sends the numbers as strings, and null for a period that was not imported
type Num = string | number | null

interface HistoriqueWeekItem {
	Semaine: string
	Annee: string
	Valeur: Num
	Target: Num
}

interface HistoriqueMonthItem {
	Mois: string
	Annee: string
	Valeur: Num
	Target: Num
}

interface WeeklyKPI {
	Semaine_Actuelle: string
	Annee: string
	Valeur_Actuelle: Num
	Target_Actuelle: Num
	Historique_4_Semaines: HistoriqueWeekItem[]
}

interface MonthlyKPI {
	Mois_Courant: string
	Annee_Courante: string
	Mois_Precedent: string
	Annee_Mois_Precedent: string
	Valeur_Mois_Courant: Num
	Target_Mois_Courant: Num
	Valeur_Mois_Precedent: Num
	Variation_Vs_Mois_Precedent: Num
	Historique_4_Mois: HistoriqueMonthItem[]
}

type KpiKey =
	| "Taux_Heures_Supplementaires"
	| "Taux_Chomage_Technique"
	| "Taux_Scrap"
	| "Suivi_Efficience"

type WeeklyData = Record<KpiKey, WeeklyKPI>
type MonthlyData = Record<KpiKey, MonthlyKPI>

/** One indicator, weekly or monthly, with its history from oldest to newest */
interface KpiView {
	value: number | null
	target: number | null
	variation?: number | null
	history: { label: string; value: number | null; target: number | null }[]
}

const KPIS: {
	key: KpiKey
	title: string
	monthlyTitle: string
	lowerIsBetter: boolean
	// Radial gauge: scale and arc color when the target is missed
	gauge?: { max: number; missColor: string }
}[] = [
	{
		key: "Taux_Heures_Supplementaires",
		title: "Taux d'Heures Supplémentaires",
		monthlyTitle: "Taux d'Heures Supplémentaires",
		lowerIsBetter: true,
	},
	{
		key: "Taux_Chomage_Technique",
		title: "Taux de Chômage technique",
		monthlyTitle: "Taux de Chômage technique",
		lowerIsBetter: true,
	},
	{
		key: "Taux_Scrap",
		title: "Taux de Scrap",
		monthlyTitle: "Taux de Scrap mensuel",
		lowerIsBetter: true,
		gauge: { max: 10, missColor: "text-red-500" },
	},
	{
		key: "Suivi_Efficience",
		title: "Suivi de l'Efficience par semaine",
		monthlyTitle: "Suivi de l'Efficience mensuelle",
		lowerIsBetter: false,
		gauge: { max: 100, missColor: "text-blue-500" },
	},
]

const MONTH_NAMES = [
	'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
	'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc',
]

const MONTH_FULL_NAMES = [
	'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
	'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

function getMonthName(month: string | number): string {
	const monthNum = typeof month === 'string' ? parseInt(month, 10) : month
	return MONTH_NAMES[monthNum - 1] || ''
}

function toNum(v: Num | undefined): number | null {
	if (v === null || v === undefined || v === '') return null
	const n = typeof v === 'number' ? v : parseFloat(v)
	return Number.isFinite(n) ? n : null
}

/** "5.72%", or "—" when there is no value */
function fmt(n: number | null): string {
	return n === null ? '—' : `${Math.round(n * 100) / 100}%`
}

type Status = 'green' | 'yellow' | 'red' | 'none'

function getStatus(
	value: number | null,
	target: number | null,
	lowerIsBetter: boolean
): Status {
	if (value === null || target === null) return 'none'
	const diff = lowerIsBetter ? target - value : value - target
	if (target === 0) return diff >= 0 ? 'green' : 'red'
	const percentDiff = (diff / target) * 100
	if (percentDiff >= 0) return 'green'
	if (percentDiff >= -10) return 'yellow'
	return 'red'
}

const STATUS_CLASSES: Record<Status, { border: string; text: string; bg: string }> = {
	green: { border: 'border-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
	yellow: { border: 'border-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-500/10' },
	red: { border: 'border-red-500', text: 'text-red-400', bg: 'bg-red-500/10' },
	none: { border: 'border-slate-600', text: 'text-slate-400', bg: 'bg-slate-700/30' },
}

function weeklyView(kpi: WeeklyKPI): KpiView {
	return {
		value: toNum(kpi.Valeur_Actuelle),
		target: toNum(kpi.Target_Actuelle),
		history: (kpi.Historique_4_Semaines ?? [])
			.slice()
			.reverse()
			.map((h) => ({ label: `S${h.Semaine}`, value: toNum(h.Valeur), target: toNum(h.Target) })),
	}
}

function monthlyView(kpi: MonthlyKPI): KpiView {
	return {
		value: toNum(kpi.Valeur_Mois_Courant),
		target: toNum(kpi.Target_Mois_Courant),
		variation: toNum(kpi.Variation_Vs_Mois_Precedent),
		history: (kpi.Historique_4_Mois ?? [])
			.slice()
			.reverse()
			.map((h) => ({ label: getMonthName(h.Mois), value: toNum(h.Valeur), target: toNum(h.Target) })),
	}
}

/** SVG path of the history (periods without value are skipped) and Y of the target line */
function buildTrendPath(
	history: KpiView['history'],
	target: number | null,
	viewWidth = 200,
	viewHeight = 80,
	padding = { top: 8, bottom: 8 }
) {
	const step = viewWidth / (history.length - 1 || 1)
	const points = history
		.map((h, i) => ({ x: i * step, v: h.value }))
		.filter((p): p is { x: number; v: number } => p.v !== null)
	if (points.length < 2) return null

	const allVals = [...points.map((p) => p.v), ...(target !== null ? [target] : [])]
	const minVal = Math.max(0, Math.min(...allVals) - 1)
	const maxVal = Math.max(...allVals) + 1
	const range = maxVal - minVal || 1
	const height = viewHeight - padding.top - padding.bottom
	const valueToY = (v: number) => padding.top + height * (1 - (v - minVal) / range)

	const path = `M ${points.map((p) => `${p.x} ${valueToY(p.v)}`).join(' L ')}`
	const first = points[0].x
	const last = points[points.length - 1].x
	return {
		path,
		areaPath: `${path} L ${last} ${viewHeight} L ${first} ${viewHeight} Z`,
		targetY: target !== null ? valueToY(target) : null,
	}
}

/** Target badge shown with the main value */
function TargetBadge({
	actual,
	target,
	lowerIsBetter = false,
}: {
	actual: number | null
	target: number | null
	lowerIsBetter?: boolean
}) {
	const delta =
		actual !== null && target !== null
			? lowerIsBetter
				? target - actual
				: actual - target
			: null
	return (
		<div className="flex items-center gap-2 flex-wrap">
			<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-700 text-xs lg:text-sm font-bold text-gray-300">
				Target: <span className="text-white">{fmt(target)}</span>
			</span>
			{delta !== null && (
				<span
					className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs lg:text-sm font-bold ${
						delta >= 0
							? 'bg-emerald-500/15 text-emerald-400'
							: 'bg-red-500/15 text-red-400'
					}`}
				>
					{delta >= 0 ? '▲ +' : '▼ '}
					{Math.abs(delta).toFixed(1)}% vs target
				</span>
			)}
		</div>
	)
}

function RadialGauge({
	value,
	target,
	max,
	lowerIsBetter,
	missColor,
}: {
	value: number | null
	target: number | null
	max: number
	lowerIsBetter: boolean
	missColor: string
}) {
	const meets =
		value !== null && target !== null && (lowerIsBetter ? value <= target : value >= target)
	return (
		<div className="relative flex h-14 w-14 [@media(min-height:760px)]:h-20 [@media(min-height:760px)]:w-20 [@media(min-height:900px)]:h-24 [@media(min-height:900px)]:w-24 flex-shrink-0 items-center justify-center">
			<svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
				<circle className="stroke-current text-slate-700" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
				{value !== null && (
					<circle
						className={`stroke-current transition-all duration-500 ${meets ? 'text-emerald-500' : missColor}`}
						cx="50"
						cy="50"
						fill="none"
						r="45"
						strokeDasharray="282.74"
						strokeDashoffset={282.74 * (1 - Math.min(Math.max(value / max, 0), 1))}
						strokeLinecap="round"
						strokeWidth="8"
					/>
				)}
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<span className="text-[10px] [@media(min-height:760px)]:text-xs text-gray-400">Actuel</span>
				<span className="text-xs [@media(min-height:760px)]:text-base font-black text-white tabular-nums">{fmt(value)}</span>
			</div>
		</div>
	)
}

function TrendChart({
	id,
	history,
	target,
	emptyLabel,
}: {
	id: string
	history: KpiView['history']
	target: number | null
	emptyLabel: string
}) {
	const trend = buildTrendPath(history, target)
	// min-h on phones, where the card height follows its content
	if (!trend) {
		return (
			<div className="flex min-h-[48px] flex-1 items-center justify-center text-xs lg:text-sm text-gray-500 md:min-h-0">
				{emptyLabel}
			</div>
		)
	}
	return (
		<div className="relative min-h-[64px] flex-1 md:min-h-0">
			<svg
				className="absolute inset-0 h-full w-full"
				fill="none"
				preserveAspectRatio="none"
				viewBox="0 0 200 80"
			>
				<defs>
					<linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
						<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
						<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
					</linearGradient>
				</defs>
				<path d={trend.areaPath} fill={`url(#${id})`} />
				{trend.targetY !== null && (
					<line
						x1="0"
						y1={trend.targetY}
						x2="200"
						y2={trend.targetY}
						stroke="#f59e0b"
						strokeWidth="1.5"
						strokeDasharray="5 3"
						vectorEffect="non-scaling-stroke"
					/>
				)}
				<path
					d={trend.path}
					stroke="#3b82f6"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
					vectorEffect="non-scaling-stroke"
				/>
			</svg>
		</div>
	)
}

function HistoryCircles({
	items,
	lowerIsBetter,
}: {
	items: KpiView['history']
	lowerIsBetter: boolean
}) {
	return (
		<div className="grid shrink-0 grid-cols-4 gap-1 lg:gap-2">
			{items.map((item) => {
				const cls = STATUS_CLASSES[getStatus(item.value, item.target, lowerIsBetter)]
				return (
					<div key={item.label} className="flex min-w-0 flex-col items-center gap-0.5 [@media(min-height:760px)]:gap-1">
						<div
							className={`flex h-10 w-10 [@media(min-height:760px)]:h-12 [@media(min-height:760px)]:w-12 [@media(min-height:900px)]:h-14 [@media(min-height:900px)]:w-14 flex-shrink-0 items-center justify-center rounded-full border-2 ${cls.border} ${cls.bg}`}
						>
							<span className={`text-[11px] lg:text-xs font-bold leading-none tabular-nums ${cls.text}`}>
								{fmt(item.value)}
							</span>
						</div>
						<span className="font-bold text-white text-xs lg:text-sm">{item.label}</span>
						<span className="inline-flex items-center rounded bg-slate-700/80 px-1.5 py-0.5 text-[11px] lg:text-xs font-medium text-amber-300">
							T: {fmt(item.target)}
						</span>
					</div>
				)
			})}
		</div>
	)
}

function KpiCard({
	id,
	title,
	kpi,
	lowerIsBetter,
	gauge,
	emptyLabel,
	variationLabel,
}: {
	id: string
	title: string
	kpi: KpiView
	lowerIsBetter: boolean
	gauge?: { max: number; missColor: string }
	emptyLabel: string
	variationLabel: string
}) {
	const { value, target, variation } = kpi
	const missesTarget =
		value !== null && target !== null && (lowerIsBetter ? value > target : value < target)
	const variationIsGood =
		variation !== undefined && variation !== null && (lowerIsBetter ? variation <= 0 : variation >= 0)

	return (
		<section className="flex min-h-0 min-w-0 flex-col gap-1.5 overflow-hidden rounded-xl border border-white/10 bg-slate-800/90 backdrop-blur-sm p-3 [@media(min-height:760px)]:gap-2 [@media(min-height:760px)]:p-4 [@media(min-height:900px)]:gap-3 [@media(min-height:900px)]:p-5">
			<h2 className="flex items-center gap-1.5 text-sm lg:text-base font-semibold text-gray-200">
				{title}
				{missesTarget && <span className="text-yellow-400">⚠️</span>}
			</h2>
			{/* Value (or gauge) and target side by side, to leave room for the trend */}
			<div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1">
				{gauge ? (
					<RadialGauge
						value={value}
						target={target}
						max={gauge.max}
						lowerIsBetter={lowerIsBetter}
						missColor={gauge.missColor}
					/>
				) : (
					<p className="text-3xl lg:text-4xl font-black text-white tabular-nums leading-none">
						{fmt(value)}
					</p>
				)}
				<div className="min-w-0">
					{variation !== undefined && variation !== null && (
						<p
							className={`mb-1 text-sm font-bold ${variationIsGood ? 'text-emerald-400' : 'text-red-400'}`}
						>
							{variation > 0 ? '+' : ''}
							{fmt(variation)}
							<span className="text-gray-400 text-xs font-normal ml-1">{variationLabel}</span>
						</p>
					)}
					<TargetBadge actual={value} target={target} lowerIsBetter={lowerIsBetter} />
				</div>
			</div>
			<TrendChart
				id={`${id}-grad`}
				history={kpi.history}
				target={target ?? [...kpi.history].reverse().find((h) => h.target !== null)?.target ?? null}
				emptyLabel={emptyLabel}
			/>
			<HistoryCircles items={kpi.history} lowerIsBetter={lowerIsBetter} />
		</section>
	)
}

export default function OperationsPage() {
	const { type: activeTab, setType: setActiveTab, period, setPeriod, year, setYear } =
		useKpiPeriod('weekly')
	const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null)
	const [monthlyData, setMonthlyData] = useState<MonthlyData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			try {
				const url = `/api/operations?type=${activeTab}&period=${period}&year=${year}`
				const res = await fetch(url, { cache: 'no-store' })
				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
				const json = await res.json()
				const data = json?.data?.data
				if (activeTab === 'weekly') {
					setWeeklyData(data || null)
				} else {
					setMonthlyData(data || null)
				}
			} catch (error) {
				console.error('Error fetching operations data:', error)
				if (activeTab === 'weekly') setWeeklyData(null)
				else setMonthlyData(null)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [activeTab, period, year])

	const isWeekly = activeTab === 'weekly'
	const data = isWeekly ? weeklyData : monthlyData
	const views = data && KPIS.every((k) => data[k.key])
		? KPIS.map((k) =>
				isWeekly
					? weeklyView((data as WeeklyData)[k.key])
					: monthlyView((data as MonthlyData)[k.key])
			)
		: null
	const periodLabel = isWeekly
		? `la semaine ${period} de ${year}`
		: `${MONTH_FULL_NAMES[period - 1] ?? ''} ${year}`
	const noData = views !== null && views.every((v) => v.value === null)

	return (
		// From tablet width, the page takes exactly the height under the header (no scroll)
		<main className="flex flex-col p-3 sm:p-4 lg:p-5 md:h-full md:min-h-[440px]">
			{/* Header */}
			<div className="mb-3 flex shrink-0 flex-wrap justify-between items-center gap-3">
				<div className="flex items-center gap-2">
					<span className="w-1 h-8 rounded-full bg-white block" />
					<span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-white">
						Operations KPI
					</span>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<PeriodSelector
						type={activeTab}
						period={period}
						year={year}
						onPeriodChange={setPeriod}
						onYearChange={setYear}
					/>
					<TabSelector activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
				</div>
			</div>

			{loading ? (
				<div className="flex flex-1 items-center justify-center min-h-[300px]">
					<div className="flex flex-col items-center gap-4">
						<div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
						<div className="text-white text-sm font-medium">Chargement des données...</div>
					</div>
				</div>
			) : !views ? (
				<div className="flex flex-1 items-center justify-center min-h-[300px] text-sm text-gray-300">
					Impossible de charger les indicateurs Operations.
				</div>
			) : (
				<>
					{noData && (
						<div className="mb-3 shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
							Aucune donnée pour {periodLabel} : le fichier{' '}
							{isWeekly ? 'Operation Weekly' : 'Operation Monthly'} de cette période n&apos;a
							pas encore été importé (page Importation).
						</div>
					)}
					<div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2">
						{KPIS.map((k, i) => (
							<KpiCard
								key={k.key}
								id={`${k.key}-${activeTab}`}
								title={isWeekly ? k.title : k.monthlyTitle}
								kpi={views[i]}
								lowerIsBetter={k.lowerIsBetter}
								gauge={k.gauge}
								emptyLabel={
									isWeekly
										? "Pas d'historique sur les 4 semaines précédentes"
										: "Pas d'historique sur les 4 mois précédents"
								}
								variationLabel="vs M-1"
							/>
						))}
					</div>
				</>
			)}
		</main>
	)
}
