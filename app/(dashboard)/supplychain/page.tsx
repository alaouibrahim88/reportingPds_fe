"use client"

import React, { useEffect, useState } from 'react'
import { PeriodSelector } from '@/components/ui/PeriodSelector'
import { useKpiPeriod } from '@/hooks/use-kpi-period'
import {
	FaChartLine,
	FaTruck,
	FaShieldAlt,
	FaBoxes,
	FaSyncAlt,
} from 'react-icons/fa'
type TabType = 'weekly' | 'monthly'

// ─── Types ────────────────────────────────────────────────────────────────────

interface WeeklyHistoryItem {
	Label: string
	Annee: number
	Semaine: number
	Valeur: number
}

interface WeeklyKpiMetric {
	Valeur_Semaine: number
	Variation_Pts_Vs_S_1: number
	Historique_5_Semaines: WeeklyHistoryItem[]
}

interface WeeklyInventorySemaine {
	Taux_Service_Client_OTIF: WeeklyKpiMetric
	Taux_Service_Fournisseurs_OTIF: WeeklyKpiMetric
	Fiabilite_Client: WeeklyKpiMetric
}

interface WeeklyApiData {
	Inventory_Semaine: WeeklyInventorySemaine
}

interface MonthlyHistoryJours {
	Label: string
	Mois: number
	Annee: number
	Valeur_Jours: number
}

interface MonthlyHistoryPct {
	Label: string
	Mois: number
	Annee: number
	Valeur: number
}

interface MonthlyHistoryMEur {
	Label: string
	Mois: number
	Annee: number
	Valeur_MEUR: number
}

interface MonthlyApiData {
	Inventory_Mois: {
		Rotation_Stocks: {
			Valeur_Jours: number
			Variation_Jours_Vs_M_1: number
			VsLabel: string
			Suivi_5_Mois: MonthlyHistoryJours[]
		}
		Fiabilite_Stocks: {
			Valeur_Pct: number
			Variation_Pts_Vs_M_1: number
			Detail_Warehouses: {
				Warehouse_A: number
				Warehouse_B: number
				Warehouse_C: number
			}
			Suivi_5_Mois: MonthlyHistoryPct[]
		}
		Cout_Logistique_Total: {
			Valeur_MEUR: number
			Delta_MEUR_Vs_M_1: number
			VsLabel: string
			Suivi_5_Mois: MonthlyHistoryMEur[]
		}
	}
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatVariation(v: number): string {
	return v > 0 ? `+${v.toFixed(1)} pts` : `${v.toFixed(1)} pts`
}

interface ChartPoint {
	x: number
	svgY: number
	bottomPct: number
	leftPct: number
	label: string
	valeur: number
}

function computeChartPoints(history: WeeklyHistoryItem[]): {
	points: ChartPoint[]
	linePath: string
	fillPath: string
} {
	if (!history.length) return { points: [], linePath: '', fillPath: '' }
	const values = history.map((h) => h.Valeur)
	const min = Math.min(...values)
	const max = Math.max(...values)
	const range = max === min ? 1 : max - min
	const pad = range * 0.2
	const padMin = min - pad
	const padRange = max + pad - padMin
	const W = 400
	const H = 100
	const last = history.length - 1

	const points: ChartPoint[] = history.map((h, i) => {
		const x = last === 0 ? W / 2 : (i / last) * W
		const norm = (h.Valeur - padMin) / padRange
		const svgY = H - norm * H * 0.8 - H * 0.1
		const bottomPct = ((H - svgY) / H) * 100
		const leftPct = last === 0 ? 50 : (i / last) * 100
		return { x, svgY, bottomPct, leftPct, label: h.Label, valeur: h.Valeur }
	})

	const linePath = points
		.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.svgY.toFixed(1)}`)
		.join(' ')
	const fillPath = `${linePath} L ${W} ${H} L 0 ${H} Z`
	return { points, linePath, fillPath }
}

function pointTransform(i: number, total: number): string {
	if (i === 0) return 'translate(0, 50%)'
	if (i === total - 1) return 'translate(-100%, 50%)'
	return 'translate(-50%, 50%)'
}

/** Maps values to SVG points for a 100×40 viewBox sparkline. */
function computeSparklinePts(values: number[]): { x: number; y: number }[] {
	if (values.length < 2) return []
	const min = Math.min(...values)
	const max = Math.max(...values)
	const range = max === min ? 1 : max - min
	const last = values.length - 1
	return values.map((v, i) => ({
		x: +(5 + (i / last) * 90).toFixed(2),
		y: +(35 - ((v - min) / range) * 25).toFixed(2),
	}))
}

function sparklinePtsToPolyline(pts: { x: number; y: number }[]): string {
	return pts.map((p) => `${p.x},${p.y}`).join(' ')
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function VariationBadge({ value }: { value: number }) {
	const isPositive = value >= 0
	const colorClass = isPositive ? 'text-primary' : 'text-danger'
	const icon = isPositive ? 'arrow_upward' : 'arrow_downward'
	return (
		<div className='flex items-center gap-1 pb-1'>
			<span className={`material-symbols-outlined text-sm ${colorClass}`}>
				{icon}
			</span>
			<p className={`text-xl font-extrabold ${colorClass}`}>
				{formatVariation(value)}
			</p>
			<p className='text-sm font-normal text-text-light-secondary dark:text-dark-secondary'>
				vs S-1
			</p>
		</div>
	)
}

function WeekCircleBadge({ label, valeur }: { label: string; valeur: number }) {
	return (
		<div className='flex flex-col items-center gap-2'>
			<div className='flex h-[76px] w-[76px] items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/50 dark:bg-primary/20 dark:ring-primary/60'>
				<span className='text-xl font-extrabold tracking-tight text-primary'>
					{valeur.toFixed(0)}%
				</span>
			</div>
			<p className='text-xs font-semibold text-text-light-secondary dark:text-dark-secondary'>
				{label}
			</p>
		</div>
	)
}

interface MonthDeltaBadgeProps {
	value: number
	unit: string
	vsLabel: string
	/** When true, a negative delta is styled as good (primary) */
	lowerIsBetter?: boolean
}

function MonthDeltaBadge({
	value,
	unit,
	vsLabel,
	lowerIsBetter = false,
}: MonthDeltaBadgeProps) {
	const isGood = lowerIsBetter ? value <= 0 : value >= 0
	const colorClass = isGood ? 'text-primary' : 'text-danger'
	const icon = value >= 0 ? 'arrow_upward' : 'arrow_downward'
	const sign = value > 0 ? '+' : ''
	return (
		<div className='flex items-center gap-1'>
			<span className={`material-symbols-outlined text-sm ${colorClass}`}>
				{icon}
			</span>
			<p className={`text-xl font-extrabold ${colorClass}`}>
				{sign}
				{value.toFixed(2)} {unit}
			</p>
			<p className='text-sm font-normal text-text-light-secondary dark:text-dark-secondary'>
				{vsLabel}
			</p>
		</div>
	)
}

function CardHeader({
	title,
	icon,
}: {
	title: string
	icon: React.ReactNode
}) {
	return (
		<div className='flex items-center justify-between'>
			<p className='text-sm font-semibold uppercase tracking-wider text-text-light-secondary dark:text-dark-secondary'>
				{title}
			</p>
			<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-text-light-secondary dark:text-dark-secondary'>
				{icon}
			</div>
		</div>
	)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupplyChainPage() {
	const { type: activeTab, setType: setActiveTab, period, setPeriod, year, setYear } =
		useKpiPeriod('weekly')

	const [weeklyData, setWeeklyData] = useState<WeeklyApiData | null>(null)
	const [monthlyData, setMonthlyData] = useState<MonthlyApiData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			try {
				const url =
					`/api/supplychain?type=${activeTab}&period=${period}&year=${year}`
				const res = await fetch(url, { cache: 'no-store' })
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				const json = await res.json()
				const finalData = json?.data?.data ?? json?.data ?? json
				if (activeTab === 'weekly') {
					setWeeklyData(finalData || null)
				} else {
					setMonthlyData(finalData || null)
				}
			} catch (error) {
				console.error('Error fetching supply chain data:', error)
				if (activeTab === 'weekly') {
					setWeeklyData(null)
				} else {
					setMonthlyData(null)
				}
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [activeTab, period, year])

	if (loading) {
		return (
			<main className='flex-1 overflow-hidden bg-slate-900'>
				<div className='flex min-h-[400px] items-center justify-center p-4 sm:p-6 lg:p-8'>
					<div className='text-white text-lg'>Chargement des données...</div>
				</div>
			</main>
		)
	}

	// ── Weekly view ────────────────────────────────────────────────────────────
	const WeeklyView = () => {
		const semaine = weeklyData?.Inventory_Semaine
		if (!semaine) {
			return (
				<div className='flex h-40 items-center justify-center text-text-light-secondary dark:text-dark-secondary'>
					Aucune donnée disponible
				</div>
			)
		}

		const clientOtif = semaine.Taux_Service_Client_OTIF
		const fournOtif = semaine.Taux_Service_Fournisseurs_OTIF
		const fiabilite = semaine.Fiabilite_Client

		const clientHist = clientOtif.Historique_5_Semaines
		const maxClientVal = Math.max(...clientHist.map((h) => h.Valeur), 1)

		return (
			<div className='flex flex-col gap-6'>
				{/* Row 1 – 2 cards side by side */}
				<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
					{/* Card 1: Taux de Service Client OTIF – bar chart */}
					<div className='flex flex-col gap-5 rounded-xl border border-border-light bg-panel-background-light p-6 shadow-sm dark:border-border-dark dark:bg-panel-background-dark'>
						<CardHeader
						title='Taux de Service Client / OTIF'
						icon={<FaChartLine className='text-sm' />}
					    />

						<div className='flex flex-wrap items-end gap-3'>
							<p className='text-5xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary'>
								{clientOtif.Valeur_Semaine.toFixed(0)}%
							</p>
							<VariationBadge value={clientOtif.Variation_Pts_Vs_S_1} />
						</div>

						{/* Bar chart */}
						<div className='flex flex-col gap-2 pt-1'>
							<div className='flex h-[100px] items-end gap-2'>
								{clientHist.map((h, i) => {
									const barH = Math.max((h.Valeur / maxClientVal) * 80, 4)
									const isCurrent = i === clientHist.length - 1
									return (
										<div
											key={h.Label}
											className='flex flex-1 flex-col items-center gap-1.5'
										>
											<span className='text-xs font-bold leading-none text-text-light-primary dark:text-dark-primary'>
												{h.Valeur.toFixed(0)}%
											</span>
											<div
												className={`w-full rounded-t-md ${
													isCurrent
														? 'bg-blue-500'
														: 'bg-blue-500/30 dark:bg-blue-500/25'
												}`}
												style={{ height: `${barH}px` }}
											/>
										</div>
									)
								})}
							</div>
							<div className='flex gap-2 border-t border-slate-200/30 pt-2 dark:border-slate-700/40'>
								{clientHist.map((h) => (
									<p
										key={h.Label}
										className='flex-1 text-center text-xs font-semibold text-text-light-secondary dark:text-dark-secondary'
									>
										{h.Label}
									</p>
								))}
							</div>
						</div>
					</div>

					{/* Card 2: Taux de Service Fournisseurs OTIF – circle badges */}
					<div className='flex flex-col gap-5 rounded-xl border border-border-light bg-panel-background-light p-6 shadow-sm dark:border-border-dark dark:bg-panel-background-dark'>
						<CardHeader
						title='Taux de Service Fournisseurs OTIF'
						icon={<FaTruck className='text-sm' />}
					/>

						<div className='flex flex-wrap items-end gap-3'>
							<p className='text-5xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary'>
								{fournOtif.Valeur_Semaine.toFixed(0)}%
							</p>
							<VariationBadge value={fournOtif.Variation_Pts_Vs_S_1} />
						</div>

						<div className='flex flex-1 items-center justify-around pt-3'>
							{fournOtif.Historique_5_Semaines.map((h) => (
								<WeekCircleBadge key={h.Label} label={h.Label} valeur={h.Valeur} />
							))}
						</div>
					</div>
				</div>

				{/* Row 2 – Full-width card: Fiabilité Client */}
				<div className='flex flex-col gap-5 rounded-xl border border-border-light bg-panel-background-light p-6 shadow-sm dark:border-border-dark dark:bg-panel-background-dark'>
					<CardHeader
						title='Fiabilité Client'
						icon={<FaShieldAlt className='text-sm' />}
					/>

					<div className='flex flex-wrap items-center gap-10'>
						{/* Current value circle */}
						<div className='flex flex-col items-center gap-4'>
							<div className='flex h-[140px] w-[140px] items-center justify-center rounded-full border-[10px] border-primary/20 bg-primary/10 dark:border-primary/30 dark:bg-primary/20'>
								<div className='flex flex-col items-center gap-0.5 leading-none'>
									<span className='text-5xl font-extrabold tracking-tighter text-primary'>
										{fiabilite.Valeur_Semaine.toFixed(0)}%
									</span>
									<p className='text-xs font-semibold uppercase tracking-widest text-text-light-secondary dark:text-dark-secondary'>
										Actuel
									</p>
								</div>
							</div>
							<VariationBadge value={fiabilite.Variation_Pts_Vs_S_1} />
						</div>

						{/* Vertical divider */}
						<div className='hidden h-36 w-px bg-border-light dark:bg-border-dark lg:block' />

						{/* History circles */}
						<div className='flex flex-col gap-4'>
							<p className='text-xs font-semibold uppercase tracking-widest text-text-light-secondary dark:text-dark-secondary'>
								Historique hebdomadaire
							</p>
							<div className='flex flex-wrap items-center gap-5'>
								{fiabilite.Historique_5_Semaines.map((h) => (
									<WeekCircleBadge key={h.Label} label={h.Label} valeur={h.Valeur} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// ── Monthly view ──────────────────────────────────────────────────────────
	const MonthlyView = () => {
		const mois = monthlyData?.Inventory_Mois
		if (!mois) {
			return (
				<div className='flex h-40 items-center justify-center text-text-light-secondary dark:text-dark-secondary'>
					Aucune donnée disponible
				</div>
			)
		}

		const {
			Rotation_Stocks: rotation,
			Fiabilite_Stocks: fiabilite,
			Cout_Logistique_Total: cout,
		} = mois

		const rotPts = computeSparklinePts(rotation.Suivi_5_Mois.map((m) => m.Valeur_Jours))
		const fibPts = computeSparklinePts(fiabilite.Suivi_5_Mois.map((m) => m.Valeur))
		const coutPts = computeSparklinePts(cout.Suivi_5_Mois.map((m) => m.Valeur_MEUR))

		const warehouseEntries = Object.entries(fiabilite.Detail_Warehouses) as [
			string,
			number,
		][]

		const SparklineChart = ({ pts }: { pts: { x: number; y: number }[] }) => (
			<div className='relative flex min-h-[12rem] items-center justify-center lg:col-span-2'>
				<div className='h-20 w-full max-w-lg'>
					<svg
						className='h-full w-full'
						preserveAspectRatio='none'
						viewBox='0 0 100 40'
					>
						<line
							fill='none'
							stroke='#3182CE'
							strokeDasharray='4,4'
							strokeWidth='0.5'
							x1='0'
							x2='100'
							y1='20'
							y2='20'
						/>
						{pts.length > 0 && (
							<>
								<polyline
									fill='none'
									points={sparklinePtsToPolyline(pts)}
									stroke='#DD6B20'
									strokeWidth='1'
								/>
								{pts.map((p, i) => (
									<circle key={i} cx={p.x} cy={p.y} fill='#DD6B20' r='1.5' />
								))}
							</>
						)}
					</svg>
				</div>
			</div>
		)

		return (
			<div className='flex flex-col gap-6'>
				{/* Card 1: Rotation des Stocks */}
				<div className='flex h-full flex-col gap-6 rounded-xl border border-border-light bg-panel-background-light p-6 shadow-sm dark:border-border-dark dark:bg-panel-background-dark'>
						<CardHeader
						title='Rotation des Stocks'
						icon={<FaBoxes className='text-sm' />}
					/>
					<div className='grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5'>
						<div className='flex flex-col justify-center gap-8 py-4 lg:col-span-3'>
							<div className='flex flex-col gap-1'>
								<p className='text-7xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary'>
									{rotation.Valeur_Jours}{' '}
									<span className='text-5xl font-bold'>jours</span>
								</p>
								<MonthDeltaBadge
									value={rotation.Variation_Jours_Vs_M_1}
									unit='jours'
									vsLabel={rotation.VsLabel}
									lowerIsBetter
								/>
							</div>
							<div className='flex flex-wrap items-center gap-4'>
								{rotation.Suivi_5_Mois.map((m) => (
									<div key={m.Label} className='flex flex-col items-center gap-2'>
										<div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20'>
											<span className='text-3xl font-bold'>{m.Valeur_Jours}</span>
										</div>
										<p className='text-sm font-semibold text-text-light-secondary dark:text-dark-secondary'>
											{m.Label}
										</p>
									</div>
								))}
							</div>
						</div>
						<SparklineChart pts={rotPts} />
					</div>
				</div>

				{/* Card 2: Taux de Fiabilité des Stocks */}
				<div className='flex h-full flex-col gap-6 rounded-xl border border-border-light bg-panel-background-light p-6 shadow-sm dark:border-border-dark dark:bg-panel-background-dark'>
					<CardHeader
						title='Taux de Fiabilité des Stocks'
						icon={<FaSyncAlt className='text-sm' />}
					/>
					<div className='grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5'>
						<div className='flex flex-col items-center justify-center gap-6 py-4 lg:col-span-3'>
							<div className='flex flex-col items-center gap-1'>
								<p className='text-8xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary'>
									{fiabilite.Valeur_Pct.toFixed(0)}%
								</p>
								<MonthDeltaBadge
									value={fiabilite.Variation_Pts_Vs_M_1}
									unit='pts'
									vsLabel='vs M-1'
								/>
							</div>
							<div className='flex w-full max-w-md flex-col gap-4'>
								{warehouseEntries.map(([key, val]) => (
									<div key={key} className='flex items-center gap-4'>
										<p className='w-28 shrink-0 text-sm font-semibold text-text-light-secondary dark:text-dark-secondary'>
											{key.replace('_', ' ')}
										</p>
										<div className='h-6 w-full rounded bg-gray-200 dark:bg-gray-700'>
											<div
												className={`flex h-full items-center justify-end rounded pr-2 text-right text-sm font-bold text-white ${
													val >= 95 ? 'bg-primary' : 'bg-warning'
												}`}
												style={{ width: `${Math.min(val, 100)}%` }}
											>
												{val.toFixed(1)}%
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<SparklineChart pts={fibPts} />
					</div>
				</div>

				{/* Card 3: Coût Logistique Total */}
				<div className='flex h-full flex-col gap-6 rounded-xl border border-border-light bg-panel-background-light p-6 shadow-sm dark:border-border-dark dark:bg-panel-background-dark'>
					<CardHeader
						title='Coût Logistique Total'
						icon={<FaTruck className='text-sm' />}
					/>
					<div className='grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5'>
						<div className='flex flex-col justify-center gap-8 py-4 lg:col-span-3'>
							<div className='flex flex-col gap-1'>
								<p className='text-7xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary'>
									€{cout.Valeur_MEUR.toFixed(2)}
									<span className='text-5xl font-bold'> M</span>
								</p>
								<MonthDeltaBadge
									value={cout.Delta_MEUR_Vs_M_1}
									unit='M€'
									vsLabel={cout.VsLabel}
									lowerIsBetter
								/>
							</div>
							<div className='flex flex-wrap items-center gap-4'>
								{cout.Suivi_5_Mois.map((m) => (
									<div key={m.Label} className='flex flex-col items-center gap-2'>
										<div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20'>
											<span className='text-2xl font-bold'>
												{m.Valeur_MEUR.toFixed(2)}
											</span>
										</div>
										<p className='text-sm font-semibold text-text-light-secondary dark:text-dark-secondary'>
											{m.Label}
										</p>
									</div>
								))}
							</div>
						</div>
						<SparklineChart pts={coutPts} />
					</div>
				</div>
			</div>
		)
	}

	return (
		<main className='flex-1 overflow-hidden bg-slate-900'>
			<div className='p-4 sm:p-6 lg:p-8'>
				<div className='flex w-full flex-col gap-6'>
					{/* Header */}
					<div className='flex flex-wrap items-start justify-between gap-4'>
						<div className='flex flex-col gap-1'>
							<h1 className='text-2xl font-black tracking-tighter text-white md:text-3xl lg:text-4xl'>
								Supply Chain –{' '}
								{activeTab === 'monthly' ? 'Mensuel' : 'Hebdomadaire'}
							</h1>
							<p className='text-sm font-normal text-gray-400 md:text-base'>
								{activeTab === 'monthly'
									? 'Données mensuelles'
									: 'Données hebdomadaire'}
							</p>
						</div>
						<PeriodSelector
							type={activeTab}
							period={period}
							year={year}
							onTypeChange={setActiveTab}
							onPeriodChange={setPeriod}
							onYearChange={setYear}
						/>
					</div>

					{/* Content */}
					{activeTab === 'monthly' ? <MonthlyView /> : <WeeklyView />}
				</div>
			</div>
		</main>
	)
}
