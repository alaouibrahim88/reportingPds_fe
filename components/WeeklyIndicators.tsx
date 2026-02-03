'use client'

import React from 'react'
import { ArrowUp, ArrowDown, Check } from 'lucide-react'
import type { IndicateursData, WeeklyIndicator } from '@/types'

// Helper to determine status (green/yellow/red)
const getStatus = (value: number, target: number, lowerIsBetter?: boolean) => {
	if (lowerIsBetter) {
		if (value <= target) return 'green'
		if (value <= target * 1.05) return 'yellow'
		return 'red'
	} else {
		if (value >= target) return 'green'
		if (value >= target * 0.95) return 'yellow'
		return 'red'
	}
}

// Helper for trend icon
const getTrendIcon = (value: number, previousValue: number, indicatorName: string) => {
	// These indicators should always show check icon
	const alwaysCheckIndicators = [
		'Réclamations clients',
		'Taux de chômage tech.',
		"Taux d'heures sup.",
		"Taux de service client"
	]
	
	if (alwaysCheckIndicators.some(name => indicatorName.includes(name))) {
		return (
			<span className="text-green-500">
				<Check className="h-5 w-5" strokeWidth={2} />
			</span>
		)
	}
	
	// For other indicators, show trend arrows
	if (value > previousValue) {
		return (
			<span className="text-green-500">
				<ArrowUp className="h-5 w-5" strokeWidth={2} />
			</span>
		)
	} else if (value < previousValue) {
		return (
			<span className="text-red-500">
				<ArrowDown className="h-5 w-5" strokeWidth={2} />
			</span>
		)
	}
	return (
		<span className="text-green-500">
			<Check className="h-5 w-5" strokeWidth={2} />
		</span>
	)
}

// Helper for circular status styling
const getCircularStatusStyle = (value: number, target: number, lowerIsBetter?: boolean) => {
	const status = getStatus(value, target, lowerIsBetter)
	switch (status) {
		case 'green':
			return 'bg-green-100 text-green-700 border border-green-200'
		case 'yellow':
			return 'bg-amber-100 text-amber-700 border border-amber-200'
		default:
			return 'bg-red-100 text-red-700 border border-red-200'
	}
}

interface WeeklyIndicatorsProps {
	data?: IndicateursData | null
}

export function WeeklyIndicators({ data }: WeeklyIndicatorsProps) {
	const Indicateurs = data?.Indicateurs ?? []

	// Value formatting: use Unit from API when present, else infer from label
	const formatValue = (
		value: number,
		indicateur: string,
		unit?: string
	): string => {
		if (unit === '%') return `${value}%`
		if (unit === 'MAD') {
			return value >= 1_000_000
				? `${(value / 1_000_000).toFixed(2)}M MAD`
				: `${value.toLocaleString()} MAD`
		}
		if (unit === '€' || unit === 'EUR') {
			return value >= 1_000_000
				? `€${(value / 1_000_000).toFixed(2)}M`
				: `€${value}`
		}
		if (
			indicateur.includes('Taux') ||
			indicateur.includes('Efficience')
		) {
			return `${value}%`
		}
		if (
			indicateur.includes('Chiffre') ||
			indicateur.includes('Forecast')
		) {
			return `€${value}M`
		}
		if (indicateur.includes('Réclamations')) return value.toString()
		return value.toString()
	}

	// Compact format for circle content to avoid wrapping and cramping
	const formatValueCompact = (
		value: number,
		indicateur: string,
		unit?: string
	): string => {
		if (unit === '%' || indicateur.includes('Taux') || indicateur.includes('Efficience')) {
			return `${Number(value.toFixed(1))}%`
		}
		if (unit === 'MAD' || unit === '€' || unit === 'EUR' || indicateur.includes('Chiffre') || indicateur.includes('Forecast')) {
			if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
			if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`
			return String(Math.round(value))
		}
		return String(Math.round(value))
	}

	if (Indicateurs.length === 0) {
		return (
			<div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 p-8 text-center text-slate-500 dark:text-slate-400">
				<p className="font-medium">No weekly indicators available</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{Indicateurs.map((indicator: WeeklyIndicator, index: number) => (
				<div
					key={index}
					className="group col-span-1 flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-800/90 p-6 shadow-lg border border-gray-200 dark:border-slate-700/50 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:-translate-y-0.5"
				>
					<div className="flex justify-between items-start mb-4">
						<h3 className="text-sm font-semibold text-gray-700 dark:text-white leading-tight">
							{indicator.Indicateur}
						</h3>
					</div>

					<div className="mb-6">
						<div className="flex items-center gap-3 mb-2">
							<p className="text-5xl font-extrabold text-dark-blue dark:text-primary leading-none">
								{formatValue(
									indicator.Valeur_Semaine,
									indicator.Indicateur,
									indicator.Unit
								)}
							</p>
							<div className="flex items-center">
								{getTrendIcon(
									indicator.Valeur_Semaine,
									indicator.Semaine_M1,
									indicator.Indicateur
								)}
							</div>
						</div>
						<p className="text-xs text-amber-600 font-medium">
							SM précédente:{' '}
							{formatValue(
								indicator.Semaine_M1,
								indicator.Indicateur,
								indicator.Unit
							)}
						</p>
					</div>

					<div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
						<p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
							Historique 4 semaines
						</p>
						<div className="grid grid-cols-4 gap-3 sm:gap-4">
							{[
								{ value: indicator.Semaine_M4, label: 'S4', weekLabel: indicator.Semaine_M4_Label },
								{ value: indicator.Semaine_M3, label: 'S3', weekLabel: indicator.Semaine_M3_Label },
								{ value: indicator.Semaine_M2, label: 'S2', weekLabel: indicator.Semaine_M2_Label },
								{ value: indicator.Semaine_M1, label: 'S1', weekLabel: indicator.Semaine_M1_Label }
							].map(({ value, label, weekLabel }) => (
								<div key={label} className="flex flex-col items-center min-w-0">
									<div
										className={`flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full text-[10px] sm:text-xs font-bold leading-tight text-center px-0.5 ${getCircularStatusStyle(value, indicator.Target, indicator.LowerIsBetter)} dark:shadow-inner`}
										title={formatValue(value, indicator.Indicateur, indicator.Unit)}
									>
										{formatValueCompact(value, indicator.Indicateur, indicator.Unit)}
									</div>
									<p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium truncate w-full text-center">
										{label}{weekLabel ? ` · ${weekLabel}` : ''}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
