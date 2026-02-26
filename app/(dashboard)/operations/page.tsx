"use client"

import React, { useState, useEffect } from "react"
import { PeriodSelector } from "@/components/ui/PeriodSelector"
import { TabSelector } from "@/components/ui/TabSelector"
import { useKpiPeriod } from "@/hooks/use-kpi-period"

type TabType = "weekly" | "monthly"

interface HistoriqueWeekItem {
	Semaine: string
	Annee: string
	Valeur: string
	Target: string
}

interface HistoriqueMonthItem {
	Mois: string
	Annee: string
	Valeur: string
	Target: string
}

interface WeeklyKPI {
	Semaine_Actuelle: string
	Annee: string
	Valeur_Actuelle: string
	Target_Actuelle: string
	Historique_4_Semaines: HistoriqueWeekItem[]
}

interface MonthlyKPI {
	Mois_Courant: string
	Annee_Courante: string
	Mois_Precedent: string
	Annee_Mois_Precedent: string
	Valeur_Mois_Courant: string
	Target_Mois_Courant: string
	Valeur_Mois_Precedent: string
	Variation_Vs_Mois_Precedent: string
	Historique_4_Mois: HistoriqueMonthItem[]
}

interface WeeklyData {
	Taux_Heures_Supplementaires: WeeklyKPI
	Taux_Chomage_Technique: WeeklyKPI
	Taux_Scrap: WeeklyKPI
	Suivi_Efficience: WeeklyKPI
}

interface MonthlyData {
	Taux_Heures_Supplementaires: MonthlyKPI
	Taux_Chomage_Technique: MonthlyKPI
	Taux_Scrap: MonthlyKPI
	Suivi_Efficience: MonthlyKPI
}

const MONTH_NAMES = [
	'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
	'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc',
]

function getMonthName(month: string | number): string {
	const monthNum = typeof month === 'string' ? parseInt(month, 10) : month
	return MONTH_NAMES[monthNum - 1] || ''
}

function getStatusColor(
	value: string | number,
	target: string | number,
	isLowerBetter = false
): string {
	const numValue = typeof value === 'string' ? parseFloat(value) : value
	const numTarget = typeof target === 'string' ? parseFloat(target) : target
	const diff = isLowerBetter ? numTarget - numValue : numValue - numTarget
	const percentDiff = (diff / numTarget) * 100
	if (percentDiff >= 0) return 'green'
	if (percentDiff >= -10) return 'yellow'
	return 'red'
}

function getColorClasses(color: string): { border: string; text: string; bg: string } {
	switch (color) {
		case 'green':
			return {
				border: 'border-emerald-500',
				text: 'text-emerald-400',
				bg: 'bg-emerald-500/10',
			}
		case 'yellow':
			return {
				border: 'border-yellow-500',
				text: 'text-yellow-400',
				bg: 'bg-yellow-500/10',
			}
		case 'red':
			return {
				border: 'border-red-500',
				text: 'text-red-400',
				bg: 'bg-red-500/10',
			}
		default:
			return {
				border: 'border-blue-500',
				text: 'text-blue-400',
				bg: 'bg-blue-500/10',
			}
	}
}

/** Prominent target badge shown alongside or below main metric */
function TargetBadge({
	actual,
	target,
	lowerIsBetter = false,
	label = 'Target',
}: {
	actual: string
	target: string
	lowerIsBetter?: boolean
	label?: string
}) {
	const numActual = parseFloat(actual)
	const numTarget = parseFloat(target)
	const delta = lowerIsBetter
		? numTarget - numActual
		: numActual - numTarget
	const isGood = delta >= 0
	const sign = delta >= 0 ? '+' : ''
	return (
		<div className="flex items-center gap-2 flex-wrap mt-1">
			<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-700 text-xs font-bold text-gray-300">
				{label}: <span className="text-white">{target}%</span>
			</span>
			<span
				className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
					isGood
						? 'bg-emerald-500/15 text-emerald-400'
						: 'bg-red-500/15 text-red-400'
				}`}
			>
				{isGood ? '▲' : '▼'} {sign}
				{Math.abs(delta).toFixed(1)}% vs target
			</span>
		</div>
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

	if (loading) {
		return (
			<main className="flex-1 overflow-hidden">
				<div className="p-3 sm:p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
					<div className="flex flex-col items-center gap-4">
						<div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
						<div className="text-white text-s10 font-medium">
							Chargement des données...
						</div>
					</div>
				</div>
			</main>
		)
	}

	const cardStyle =
		'rounded-xl border border-white/10 bg-slate-800/90 backdrop-blur-sm'

	// ------------------------------------------------------------------
	// MONTHLY COMPONENT
	// ------------------------------------------------------------------
	const MonthlyOperations = () => {
		if (!monthlyData) return null

		const {
			Taux_Heures_Supplementaires,
			Taux_Chomage_Technique,
			Taux_Scrap,
			Suivi_Efficience,
		} = monthlyData

		if (
			!Taux_Heures_Supplementaires ||
			!Taux_Chomage_Technique ||
			!Taux_Scrap ||
			!Suivi_Efficience
		) {
			return (
				<div className="p-8 text-center text-white">
				10Chargement des données...
				</div>
			)
		}

		return (
			<main className="flex-grow">
				<div className="grid w-full grid-cols-1 gap-3">

					{/* Taux d'Heures Supplémentaires */}
					<div className={`${cardStyle} p-4 lg:p-5`}>
						<div className="flex flex-wrap items-start justify-between gap-3 mb-4">
							<div>
								<div className="flex items-center gap-2 mb-1">
									<h2 className="text-sm lg:text-base font-semibold text-gray-200">
										Taux d&apos;Heures Supplémentaires
									</h2>
								</div>
							</div>
							<div className="text-right">
								<p className="text-3xl lg:text-4xl font-black text-white tabular-nums">
									{Taux_Heures_Supplementaires.Valeur_Mois_Courant}%
								</p>
								<TargetBadge
									actual={Taux_Heures_Supplementaires.Valeur_Mois_Courant}
									target={Taux_Heures_Supplementaires.Target_Mois_Courant}
									lowerIsBetter
								/>
								<div
									className={`flex items-center justify-end gap-1 mt-1 text-sm font-bold ${
										parseFloat(Taux_Heures_Supplementaires.Variation_Vs_Mois_Precedent) <= 0
											? 'text-emerald-400'
											: 'text-red-400'
									}`}
								>
									{parseFloat(Taux_Heures_Supplementaires.Variation_Vs_Mois_Precedent) > 0
										? '+'
										: ''}
									{Taux_Heures_Supplementaires.Variation_Vs_Mois_Precedent}%
									<span className="text-gray-500 text-xs font-normal ml-1">
										vs M-1
									</span>
								</div>
							</div>
						</div>
						<div className="mt-3 grid grid-cols-4 gap-2 lg:gap-3">
							{Taux_Heures_Supplementaires.Historique_4_Mois.map(
								(item, index) => {
									const color = getStatusColor(item.Valeur, item.Target, true)
									const cls = getColorClasses(color)
									return (
										<div
											key={index}
											className="flex flex-col items-center gap-1"
										>
											<div
												className={`flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 ${cls.border} ${cls.bg}`}
											>
												<p
													className={`text-xs lg:text-sm font-bold ${cls.text}`}
												>
													{item.Valeur}%
												</p>
											</div>
											<p className="text-[9px] lg:text-xs text-white font-m10dium">
												{getMonthName(item.Mois)}
											</p>
											<p className="text-[8px] text-white">
												T:{item.Target}%
											</p>
										</div>
									)
								}
							)}
						</div>
					</div>

					{/* Taux de Chômage Technique */}
					<div className={`${cardStyle} p-4 lg:p-5`}>
						<div className="flex flex-wrap items-start justify-between gap-3 mb-4">
							<div>
								<div className="flex items-center gap-2 mb-1">
									<h2 className="text-sm lg:text-base font-semibold text-gray-200 flex items-center gap-1.5">
										Taux de Chômage Technique
										{parseFloat(Taux_Chomage_Technique.Valeur_Mois_Courant) >
											parseFloat(Taux_Chomage_Technique.Target_Mois_Courant) && (
											<span className="text-yellow-400 text-base">⚠️</span>
										)}
									</h2>
								</div>
							</div>
							<div className="text-right">
								<p className="text-3xl lg:text-4xl font-black text-white tabular-nums">
									{Taux_Chomage_Technique.Valeur_Mois_Courant}%
								</p>
								<TargetBadge
									actual={Taux_Chomage_Technique.Valeur_Mois_Courant}
									target={Taux_Chomage_Technique.Target_Mois_Courant}
									lowerIsBetter
								/>
								<div
									className={`flex items-center justify-end gap-1 mt-1 text-sm font-bold ${
										parseFloat(Taux_Chomage_Technique.Variation_Vs_Mois_Precedent) <= 0
											? 'text-emerald-400'
											: 'text-red-400'
									}`}
								>
									{parseFloat(Taux_Chomage_Technique.Variation_Vs_Mois_Precedent) > 0
										? '+'
										: ''}
									{Taux_Chomage_Technique.Variation_Vs_Mois_Precedent}%
									<span className="text-gray-500 text-xs font-normal ml-1">
										vs M-1
									</span>
								</div>
							</div>
						</div>
						<div className="mt-3 grid grid-cols-4 gap-2 lg:gap-3">
							{Taux_Chomage_Technique.Historique_4_Mois.map((item, index) => {
								const color = getStatusColor(item.Valeur, item.Target, true)
								const cls = getColorClasses(color)
								return (
									<div
										key={index}
										className="flex flex-col items-center gap-1"
									>
										<div
											className={`flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 ${cls.border} ${cls.bg}`}
										>
											<p className={`text-xs lg:text-sm font-bold ${cls.text}`}>
												{item.Valeur}%
											</p>
										</div>
										<p className="text-[9px] lg:text-xs text-white font-m10dium">
											{getMonthName(item.Mois)}
										</p>
										<p className="text-[8px] text-white">T:{item.Target}%</p>
									</div>
								)
							})}
						</div>
					</div>

					{/* Suivi Efficience */}
					<div className={`${cardStyle} p-4 lg:p-5`}>
						<div className="flex flex-wrap items-start justify-between gap-3 mb-4">
							<div>
								<div className="flex items-center gap-2 mb-1">
									<h2 className="text-sm lg:text-base font-semibold text-gray-200">
										Suivi de l&apos;Efficience mensuelle
									</h2>
								</div>
							</div>
							<div className="text-right">
								<p className="text-3xl lg:text-4xl font-black text-white tabular-nums">
									{Suivi_Efficience.Valeur_Mois_Courant}%
								</p>
								<TargetBadge
									actual={Suivi_Efficience.Valeur_Mois_Courant}
									target={Suivi_Efficience.Target_Mois_Courant}
								/>
								<div
									className={`flex items-center justify-end gap-1 mt-1 text-sm font-bold ${
										parseFloat(Suivi_Efficience.Variation_Vs_Mois_Precedent) >= 0
											? 'text-emerald-400'
											: 'text-red-400'
									}`}
								>
									{parseFloat(Suivi_Efficience.Variation_Vs_Mois_Precedent) > 0
										? '+'
										: ''}
									{Suivi_Efficience.Variation_Vs_Mois_Precedent}%
									<span className="text-gray-500 text-xs font-normal ml-1">
										vs M-1
									</span>
								</div>
							</div>
						</div>
						<div className="mt-3 grid grid-cols-4 gap-2 lg:gap-3">
							{Suivi_Efficience.Historique_4_Mois.map((item, index) => {
								const color = getStatusColor(item.Valeur, item.Target, false)
								const cls = getColorClasses(color)
								return (
									<div
										key={index}
										className="flex flex-col items-center gap-1"
									>
										<div
											className={`flex h-12 w-12 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 ${cls.border} ${cls.bg}`}
										>
											<p className={`text-xs lg:text-sm font-bold ${cls.text}`}>
												{item.Valeur}%
											</p>
										</div>
										<p className="text-[9px] lg:text-xs text-white font-m10dium">
											{getMonthName(item.Mois)}
										</p>
										<p className="text-[8px] text-white">T:{item.Target}%</p>
									</div>
								)
							})}
						</div>
					</div>

					{/* Bottom: Scrap + Target Efficience Gauge */}
					<div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
						{/* Taux Scrap */}
						<div className={`${cardStyle} p-4 lg:p-5`}>
							<div className="flex items-center gap-2 mb-3">
								<h2 className="text-sm lg:text-base font-semibold text-gray-200">
									Taux de Scrap Mensuel
								</h2>
							</div>
							<div className="flex items-start justify-between gap-4">
								<div>
									<div className="flex items-baseline gap-2">
										<p className="text-2xl lg:text-3xl font-black text-white tabular-nums">
											{Taux_Scrap.Valeur_Mois_Courant}%
										</p>
										<div
											className={`text-sm font-bold ${
												parseFloat(Taux_Scrap.Variation_Vs_Mois_Precedent) <= 0
													? 'text-emerald-400'
													: 'text-red-400'
											}`}
										>
											{parseFloat(Taux_Scrap.Variation_Vs_Mois_Precedent) > 0
												? '+'
												: ''}
											{Taux_Scrap.Variation_Vs_Mois_Precedent}%
											<span className="text-gray-500 text-xs font-normal ml-1">
												vs M-1
											</span>
										</div>
									</div>
									<TargetBadge
										actual={Taux_Scrap.Valeur_Mois_Courant}
										target={Taux_Scrap.Target_Mois_Courant}
										lowerIsBetter
									/>
								</div>
							</div>
						</div>

						{/* Target Efficience Radial Gauge */}
						<div className={`${cardStyle} p-4 lg:p-5`}>
							<div className="flex items-center gap-2 mb-3">
								<h2 className="text-sm lg:text-base font-semibold text-gray-200">
									Target Efficience
								</h2>
							</div>
							<div className="flex items-center gap-4">
								<div className="relative h-20 w-20 lg:h-28 lg:w-28 flex-shrink-0">
									<svg
										className="h-full w-full -rotate-90"
										viewBox="0 0 120 120"
									>
										<circle
											cx="60"
											cy="60"
											fill="transparent"
											r="54"
											stroke="#1e293b"
											strokeWidth="12"
										/>
										<circle
											cx="60"
											cy="60"
											fill="transparent"
											r="54"
											stroke={
												parseFloat(Suivi_Efficience.Valeur_Mois_Courant) >=
												parseFloat(Suivi_Efficience.Target_Mois_Courant)
													? '#10b981'
													: '#f59e0b'
											}
											strokeDasharray="339.292"
											strokeDashoffset={
												339.292 *
												(1 -
													parseFloat(Suivi_Efficience.Valeur_Mois_Courant) /
														100)
											}
											strokeLinecap="round"
											strokeWidth="12"
										/>
									</svg>
									<div className="absolute inset-0 flex flex-col items-center justify-center">
										<p className="text-xs text-white leadin10-none mb-0.5">
											Target
										</p>
										<p className="text-lg font-black text-white leading-none">
											{Suivi_Efficience.Target_Mois_Courant}%
										</p>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<div>
										<p className="text-xs text-white">Actue10</p>
										<p className="text-md font-black text-white">
											{Suivi_Efficience.Valeur_Mois_Courant}%
										</p>
									</div>
									<TargetBadge
										actual={Suivi_Efficience.Valeur_Mois_Courant}
										target={Suivi_Efficience.Target_Mois_Courant}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		)
	}

	// ------------------------------------------------------------------
	// WEEKLY COMPONENT
	// ------------------------------------------------------------------
	const WeeklyOperations = () => {
		if (!weeklyData) return null

		const {
			Taux_Heures_Supplementaires,
			Taux_Chomage_Technique,
			Taux_Scrap,
			Suivi_Efficience,
		} = weeklyData

		if (
			!Taux_Heures_Supplementaires ||
			!Taux_Chomage_Technique ||
			!Taux_Scrap ||
			!Suivi_Efficience
		) {
			return (
				<div className="p-8 text-center text-white">
				10Chargement des données...
				</div>
			)
		}

		return (
			<main className="w-full flex-shrink-0">
				<div className="flex flex-col gap-3">
					{/* Top row: Heures Supp + Chomage Tech */}
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						{/* Heures Supplémentaires */}
						<div
							className={`${cardStyle} flex flex-col p-3 lg:p-5 min-h-[220px] lg:min-h-[320px]`}
						>
							<div className="flex items-start justify-between mb-2">
								<div>
									<div className="flex items-center gap-1.5 mb-1">
										<h2 className="text-sm lg:text-base font-semibold text-gray-200">
											Taux d&apos;Heures Supplémentaires
										</h2>
									</div>
								</div>
							</div>
							<div className="flex items-end gap-2 mb-2">
								<p className="text-3xl lg:text-4xl font-black text-white tabular-nums">
									{Taux_Heures_Supplementaires.Valeur_Actuelle}%
								</p>
							</div>
							<TargetBadge
								actual={Taux_Heures_Supplementaires.Valeur_Actuelle}
								target={Taux_Heures_Supplementaires.Target_Actuelle}
								lowerIsBetter
							/>
							<div className="mt-auto flex flex-col pt-3">
								{/* Mini trend chart */}
								<div className="relative h-12 lg:h-20 w-full mb-3">
									<svg
										className="absolute inset-0 h-full w-full"
										fill="none"
										preserveAspectRatio="none"
										viewBox="0 0 200 80"
									>
										<defs>
											<linearGradient
												id="hs-grad"
												x1="0"
												x2="0"
												y1="0"
												y2="1"
											>
												<stop
													offset="0%"
													stopColor="#3b82f6"
													stopOpacity="0.25"
												/>
												<stop
													offset="100%"
													stopColor="#3b82f6"
													stopOpacity="0"
												/>
											</linearGradient>
										</defs>
										{/* Target line */}
										<line
											x1="0"
											y1="40"
											x2="200"
											y2="40"
											stroke="#f59e0b"
											strokeWidth="1.5"
											strokeDasharray="5 3"
										/>
										<text
											x="3"
											y="36"
											fontSize="9"
											fill="#f59e0b"
											fontWeight="600"
										>
											T:{Taux_Heures_Supplementaires.Target_Actuelle}%
										</text>
										<path
											className="stroke-blue-500"
											d="M 0 20 L 66 60 L 132 30 L 200 50"
											strokeWidth="2.5"
											strokeLinecap="round"
										/>
										<path
											d="M 0 20 L 66 60 L 132 30 L 200 50 L 200 80 L 0 80 Z"
											fill="url(#hs-grad)"
										/>
									</svg>
								</div>
								{/* History circles */}
								<div className="flex justify-between gap-1 lg:gap-2">
									{Taux_Heures_Supplementaires.Historique_4_Semaines
										.slice()
										.reverse()
										.map((item, index) => {
											const color = getStatusColor(
												item.Valeur,
												item.Target,
												true
											)
											const cls = getColorClasses(color)
											return (
												<div
													key={index}
													className="flex flex-col items-center gap-0.5"
												>
													<div
														className={`flex h-11 w-11 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 ${cls.border} ${cls.bg}`}
													>
														<span
															className={`text-[10px] lg:text-xs font-bold leading-none ${cls.text}`}
														>
															{item.Valeur}%
														</span>
													</div>
													<span className="font-bold text-white text-[10px]">
														S{item.Semaine}
													</span>
													<span className="text-white text-[8px]">
														T:{item.Target}%
													</span>
												</div>
											)
										})}
								</div>
							</div>
						</div>

						{/* Chomage Technique */}
						<div
							className={`${cardStyle} flex flex-col p-3 lg:p-5 min-h-[220px] lg:min-h-[320px]`}
						>
							<div className="flex items-start justify-between mb-2">
								<div>
									<div className="flex items-center gap-1.5 mb-1">
										<h2 className="text-sm lg:text-base font-semibold text-gray-200 flex items-center gap-1">
											Taux de Chômage technique
											{parseFloat(Taux_Chomage_Technique.Valeur_Actuelle) >
												parseFloat(Taux_Chomage_Technique.Target_Actuelle) && (
												<span className="text-yellow-400">⚠️</span>
											)}
										</h2>
									</div>
								</div>
							</div>
							<div className="flex items-end gap-2 mb-2">
								<p
									className={`text-3xl lg:text-4xl font-black tabular-nums ${
										parseFloat(Taux_Chomage_Technique.Valeur_Actuelle) >
										parseFloat(Taux_Chomage_Technique.Target_Actuelle)
											? 'text-red-400'
											: 'text-white'
									}`}
								>
									{Taux_Chomage_Technique.Valeur_Actuelle}%
								</p>
							</div>
							<TargetBadge
								actual={Taux_Chomage_Technique.Valeur_Actuelle}
								target={Taux_Chomage_Technique.Target_Actuelle}
								lowerIsBetter
							/>
							<div className="mt-auto flex flex-col pt-3">
								<div className="relative h-12 lg:h-20 w-full mb-3">
									<svg
										className="absolute inset-0 h-full w-full"
										fill="none"
										preserveAspectRatio="none"
										viewBox="0 0 200 80"
									>
										<defs>
											<linearGradient
												id="ct-grad"
												x1="0"
												x2="0"
												y1="0"
												y2="1"
											>
												<stop
													offset="0%"
													stopColor="#3b82f6"
													stopOpacity="0.25"
												/>
												<stop
													offset="100%"
													stopColor="#3b82f6"
													stopOpacity="0"
												/>
											</linearGradient>
										</defs>
										<line
											x1="0"
											y1="40"
											x2="200"
											y2="40"
											stroke="#f59e0b"
											strokeWidth="1.5"
											strokeDasharray="5 3"
										/>
										<text
											x="3"
											y="36"
											fontSize="9"
											fill="#f59e0b"
											fontWeight="600"
										>
											T:{Taux_Chomage_Technique.Target_Actuelle}%
										</text>
										<path
											className="stroke-blue-500"
											d="M 0 60 L 66 20 L 132 50 L 200 30"
											strokeWidth="2.5"
											strokeLinecap="round"
										/>
										<path
											d="M 0 60 L 66 20 L 132 50 L 200 30 L 200 80 L 0 80 Z"
											fill="url(#ct-grad)"
										/>
									</svg>
								</div>
								<div className="flex justify-between gap-1">
									{Taux_Chomage_Technique.Historique_4_Semaines.slice()
										.reverse()
										.map((item, index) => {
											const color = getStatusColor(
												item.Valeur,
												item.Target,
												true
											)
											const cls = getColorClasses(color)
											return (
												<div
													key={index}
													className="flex flex-col items-center gap-0.5"
												>
													<div
														className={`flex h-11 w-11 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 ${cls.border} ${cls.bg}`}
													>
														<span
															className={`text-[10px] lg:text-xs font-bold leading-none ${cls.text}`}
														>
															{item.Valeur}%
														</span>
													</div>
													<span className="font-bold text-white text-[10px]">
														S{item.Semaine}
													</span>
													<span className="text-white text-[8px]">
														T:{item.Target}%
													</span>
												</div>
											)
										})}
								</div>
							</div>
						</div>
					</div>

					{/* Bottom row: Scrap + Efficience */}
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						{/* Taux de Scrap */}
						<div
							className={`${cardStyle} flex flex-col p-3 lg:p-5 min-h-[220px] lg:min-h-[320px]`}
						>
							<div className="flex items-start justify-between mb-2">
								<div>
									<div className="flex items-center gap-1.5 mb-1">
										<h2 className="text-sm lg:text-base font-semibold text-gray-200 flex items-center gap-1">
											Taux de Scrap
											{parseFloat(Taux_Scrap.Valeur_Actuelle) >
												parseFloat(Taux_Scrap.Target_Actuelle) && (
												<span className="text-yellow-400">⚠️</span>
											)}
										</h2>
									</div>
								</div>
							</div>
							{/* Radial */}
							<div className="flex items-center gap-3 mb-2">
								<div className="relative flex h-20 w-20 lg:h-24 lg:w-24 flex-shrink-0 items-center justify-center">
									<svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
										<circle
											className="stroke-current text-slate-700"
											cx="50"
											cy="50"
											fill="none"
											r="45"
											strokeWidth="8"
										/>
										<circle
											className={`stroke-current transition-all duration-500 ${
												parseFloat(Taux_Scrap.Valeur_Actuelle) <=
												parseFloat(Taux_Scrap.Target_Actuelle)
													? 'text-emerald-500'
													: 'text-red-500'
											}`}
											cx="50"
											cy="50"
											fill="none"
											r="45"
											strokeDasharray="282.74"
											strokeDashoffset={
												282.74 *
												(1 -
													Math.min(
														parseFloat(Taux_Scrap.Valeur_Actuelle) / 10,
														1
													))
											}
											strokeLinecap="round"
											strokeWidth="8"
										/>
									</svg>
									<div className="absolute inset-0 flex flex-col items-center justify-center">
										<span className="text-[10px] text-gray-500">Actuel</span>
										<span className="text-md font-black text-white tabular-nums">
											{Taux_Scrap.Valeur_Actuelle}%
										</span>
									</div>
								</div>
								<TargetBadge
									actual={Taux_Scrap.Valeur_Actuelle}
									target={Taux_Scrap.Target_Actuelle}
									lowerIsBetter
								/>
							</div>
							<div className="mt-auto flex flex-col pt-2">
								<div className="relative h-12 lg:h-16 w-full mb-3">
									<svg
										className="absolute inset-0 h-full w-full"
										fill="none"
										preserveAspectRatio="none"
										viewBox="0 0 200 80"
									>
										<defs>
											<linearGradient
												id="scrap-grad"
												x1="0"
												x2="0"
												y1="0"
												y2="1"
											>
												<stop
													offset="0%"
													stopColor="#3b82f6"
													stopOpacity="0.2"
												/>
												<stop
													offset="100%"
													stopColor="#3b82f6"
													stopOpacity="0"
												/>
											</linearGradient>
										</defs>
										<line
											x1="0"
											y1="50"
											x2="200"
											y2="50"
											stroke="#f59e0b"
											strokeWidth="1.5"
											strokeDasharray="5 3"
										/>
										<text
											x="3"
											y="80"
											fontSize="9"
											fill="#f59e0b"
											fontWeight="600"
										>
											T:{Taux_Scrap.Target_Actuelle}%
										</text>
										<path
											className="stroke-blue-500"
											d="M 0 70 L 66 40 L 132 60 L 200 20"
											strokeWidth="2.5"
											strokeLinecap="round"
										/>
										<path
											d="M 0 70 L 66 40 L 132 60 L 200 20 L 200 80 L 0 80 Z"
											fill="url(#scrap-grad)"
										/>
									</svg>
								</div>
								<div className="flex justify-between gap-1">
									{Taux_Scrap.Historique_4_Semaines.slice()
										.reverse()
										.map((item, index) => {
											const color = getStatusColor(
												item.Valeur,
												item.Target,
												true
											)
											const cls = getColorClasses(color)
											return (
												<div
													key={index}
													className="flex flex-col items-center gap-0.5"
												>
													<div
														className={`flex h-11 w-11 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 ${cls.border} ${cls.bg}`}
													>
														<span
															className={`text-[10px] lg:text-xs font-bold leading-none ${cls.text}`}
														>
															{item.Valeur}%
														</span>
													</div>
													<span className="font-bold text-white text-[10px]">
														S{item.Semaine}
													</span>
													<span className="text-white text-[8px]">
														T:{item.Target}%
													</span>
												</div>
											)
										})}
								</div>
							</div>
						</div>

						{/* Suivi Efficience */}
						<div
							className={`${cardStyle} flex flex-col p-3 lg:p-5 min-h-[220px] lg:min-h-[320px]`}
						>
							<div className="flex items-start justify-between mb-2">
								<div>
									<div className="flex items-center gap-1.5 mb-1">
										<h2 className="text-sm lg:text-base font-semibold text-gray-200">
											Suivi de l&apos;Efficience par semaine
										</h2>
									</div>
								</div>
							</div>
							{/* Radial */}
							<div className="flex items-center gap-3 mb-2">
								<div className="relative flex h-20 w-20 lg:h-24 lg:w-24 flex-shrink-0 items-center justify-center">
									<svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
										<circle
											className="stroke-current text-slate-700"
											cx="50"
											cy="50"
											fill="none"
											r="45"
											strokeWidth="8"
										/>
										<circle
											className={`stroke-current transition-all duration-500 ${
												parseFloat(Suivi_Efficience.Valeur_Actuelle) >=
												parseFloat(Suivi_Efficience.Target_Actuelle)
													? 'text-emerald-500'
													: 'text-blue-500'
											}`}
											cx="50"
											cy="50"
											fill="none"
											r="45"
											strokeDasharray="282.74"
											strokeDashoffset={
												282.74 *
												(1 -
													parseFloat(Suivi_Efficience.Valeur_Actuelle) /
														100)
											}
											strokeLinecap="round"
											strokeWidth="8"
										/>
									</svg>
									<div className="absolute inset-0 flex flex-col items-center justify-center">
										<span className="text-[10px] text-gray-500">Actuel</span>
										<span className="text-md font-black text-white tabular-nums">
											{Suivi_Efficience.Valeur_Actuelle}%
										</span>
									</div>
								</div>
								<TargetBadge
									actual={Suivi_Efficience.Valeur_Actuelle}
									target={Suivi_Efficience.Target_Actuelle}
								/>
							</div>
							<div className="mt-auto flex flex-col pt-2">
								<div className="relative h-12 lg:h-16 w-full mb-3">
									<svg
										className="absolute inset-0 h-full w-full"
										fill="none"
										preserveAspectRatio="none"
										viewBox="0 0 200 80"
									>
										<defs>
											<linearGradient
												id="eff-grad"
												x1="0"
												x2="0"
												y1="0"
												y2="1"
											>
												<stop
													offset="0%"
													stopColor="#3b82f6"
													stopOpacity="0.2"
												/>
												<stop
													offset="100%"
													stopColor="#3b82f6"
													stopOpacity="0"
												/>
											</linearGradient>
										</defs>
										<line
											x1="0"
											y1="25"
											x2="200"
											y2="25"
											stroke="#f59e0b"
											strokeWidth="1.5"
											strokeDasharray="5 3"
										/>
										<text
											x="3"
											y="60"
											fontSize="9"
											fill="#f59e0b"
											fontWeight="600"
										>
											T:{Suivi_Efficience.Target_Actuelle}%
										</text>
										<path
											className="stroke-blue-500"
											d="M 0 30 L 66 20 L 132 50 L 200 40"
											strokeWidth="2.5"
											strokeLinecap="round"
										/>
										<path
											d="M 0 30 L 66 20 L 132 50 L 200 40 L 200 80 L 0 80 Z"
											fill="url(#eff-grad)"
										/>
									</svg>
								</div>
								<div className="flex justify-between gap-1">
									{Suivi_Efficience.Historique_4_Semaines.slice()
										.reverse()
										.map((item, index) => {
											const color = getStatusColor(
												item.Valeur,
												item.Target,
												false
											)
											const cls = getColorClasses(color)
											return (
												<div
													key={index}
													className="flex flex-col items-center gap-0.5"
												>
													<div
														className={`flex h-11 w-11 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 ${cls.border} ${cls.bg}`}
													>
														<span
															className={`text-[10px] lg:text-xs font-bold leading-none ${cls.text}`}
														>
															{item.Valeur}%
														</span>
													</div>
													<span className="font-bold text-white text-[10px]">
														S{item.Semaine}
													</span>
													<span className="text-white text-[10px]">
														T:{item.Target}%
													</span>
												</div>
											)
										})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		)
	}

	const currentWeek =
		weeklyData?.Taux_Heures_Supplementaires?.Semaine_Actuelle
	const currentMonth =
		monthlyData?.Taux_Heures_Supplementaires?.Mois_Courant

	return (
		<main className="flex-1 overflow-hidden">
			<div className="p-3 sm:p-4 lg:p-6">
				{/* Header */}
				<div className="mb-4 lg:mb-6 flex justify-between items-start gap-4">
					<div>
						<div className="flex flex-wrap items-center gap-2 mt-2">
							<span className="w-1 h-8 rounded-full bg-white block" />
							<span className="text-xs font-bold uppercase tracking-widest text-white-400">
								Operations KPI
							</span>
						</div>
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

				{activeTab === 'weekly' ? <WeeklyOperations /> : <MonthlyOperations />}
			</div>
		</main>
	)
}
