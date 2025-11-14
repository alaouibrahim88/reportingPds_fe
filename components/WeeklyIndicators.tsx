'use client'

import React from 'react'
import { weeklyIndicatorsData } from '@/lib/kpi-data'
import { Check, X } from 'lucide-react'
import type { WeeklyIndicator } from '@/types'

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

// Helper for status icon
const getStatusIcon = (value: number, target: number, lowerIsBetter?: boolean) => {
	const status = getStatus(value, target, lowerIsBetter)
	if (status === 'green') {
		return (
			<span className="flex h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-green-500/30 text-green-400 shadow-lg">
				<Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-4 lg:w-4" />
			</span>
		)
	}
	return (
		<span className="flex h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-red-500/30 text-red-400 shadow-lg">
			<X className="h-3 w-3 sm:h-4 sm:w-4 lg:h-4 lg:w-4" />
		</span>
	)
}

// Helper for circular status styling
const getCircularStatusStyle = (value: number, target: number, lowerIsBetter?: boolean) => {
	const status = getStatus(value, target, lowerIsBetter)
	switch (status) {
		case 'green':
			return 'bg-green-500/20 text-green-400 ring-2 ring-green-500/40 shadow-md'
		case 'yellow':
			return 'bg-yellow-500/20 text-yellow-400 ring-2 ring-yellow-500/40 shadow-md'
		default:
			return 'bg-red-500/20 text-red-400 ring-2 ring-red-500/40 shadow-md'
	}
}

export function WeeklyIndicators() {
	const { Indicateurs } = weeklyIndicatorsData

	// Value formatting depending on indicator type
	const formatValue = (value: number, indicateur: string): string => {
		if (
			indicateur.includes('Taux') ||
			indicateur.includes('Efficience')
		) {
			return `${value}%`
		} else if (
			indicateur.includes('Chiffre') ||
			indicateur.includes('Forecast')
		) {
			return `€${value}M`
		} else if (indicateur.includes('Réclamations')) {
			return value.toString()
		}
		return value.toString()
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
			{Indicateurs.map((indicator: WeeklyIndicator, index: number) => (
				<div
					key={index}
					className="group col-span-1 2xl:col-span-2 flex flex-col justify-between rounded-xl sm:rounded-2xl bg-slate-800/90 dark:bg-slate-800/90 p-4 sm:p-6 shadow-xl border border-slate-700/50 dark:border-slate-700/50 backdrop-blur-sm cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/30 hover:bg-slate-800/95 hover:border-slate-600/60 hover:-translate-y-0.5"
				>
					<div className="flex justify-between items-start mb-3 sm:mb-4">
						<h3 className="text-xs sm:text-sm lg:text-base font-semibold text-white dark:text-white leading-tight transition-all duration-300 group-hover:text-blue-300">
							{indicator.Indicateur}
						</h3>
					</div>

					<div className="mb-4 sm:mb-6">
						<div className="flex items-end gap-2 sm:gap-3">
							<p className="text-3xl sm:text-4xl lg:text-5xl font-black text-white dark:text-white leading-none transition-all duration-300 group-hover:text-blue-100 group-hover:scale-[1.02]">
								{formatValue(indicator.Valeur_Semaine, indicator.Indicateur)}
							</p>
							<div className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
								{getStatusIcon(
									indicator.Valeur_Semaine,
									indicator.Target,
									indicator.LowerIsBetter
								)}
							</div>
						</div>
						<p className="text-[10px] sm:text-xs text-slate-300 dark:text-slate-300 mt-1 sm:mt-2 font-medium transition-colors duration-300 group-hover:text-slate-200">
							Target: {indicator.LowerIsBetter ? '<' : ''}{formatValue(indicator.Target, indicator.Indicateur)}
						</p>
					</div>

					<div className="mt-auto">
						<p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-400 mb-2 sm:mb-3 font-medium uppercase tracking-wider transition-colors duration-300 group-hover:text-slate-300">
							Previous 4 Weeks (Actual / Target)
						</p>
						<div className="flex items-start justify-between gap-1 sm:gap-2 text-center">
							<div className="flex flex-col items-center gap-1 transition-all duration-300 group-hover:transform group-hover:translate-y-[-1px]" style={{transitionDelay: '50ms'}}>
								<div
									className={`group/circle relative flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-col items-center justify-center rounded-full ${getCircularStatusStyle(
										indicator.Semaine_M4,
										indicator.Target,
										indicator.LowerIsBetter
									)} transition-all duration-300 hover:scale-105 group-hover:scale-[1.02] group-hover:shadow-md`}
								>
									<span className="text-[9px] sm:text-[10px] lg:text-xs font-bold leading-none transition-all duration-200 group-hover/circle:scale-105">
										{formatValue(indicator.Semaine_M4, indicator.Indicateur)}
									</span>
								</div>
								<p className="text-[7px] sm:text-[8px] text-slate-400 dark:text-slate-400 font-medium transition-colors duration-300 group-hover:text-slate-300">
									S1: {formatValue(indicator.Target, indicator.Indicateur)}
								</p>
							</div>

							<div className="flex flex-col items-center gap-1 transition-all duration-300 group-hover:transform group-hover:translate-y-[-1px]" style={{transitionDelay: '100ms'}}>
								<div
									className={`group/circle relative flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-col items-center justify-center rounded-full ${getCircularStatusStyle(
										indicator.Semaine_M3,
										indicator.Target,
										indicator.LowerIsBetter
									)} transition-all duration-300 hover:scale-105 group-hover:scale-[1.02] group-hover:shadow-md`}
								>
									<span className="text-[9px] sm:text-[10px] lg:text-xs font-bold leading-none transition-all duration-200 group-hover/circle:scale-105">
										{formatValue(indicator.Semaine_M3, indicator.Indicateur)}
									</span>
								</div>
								<p className="text-[7px] sm:text-[8px] text-slate-400 dark:text-slate-400 font-medium transition-colors duration-300 group-hover:text-slate-300">
									S2: {formatValue(indicator.Target, indicator.Indicateur)}
								</p>
							</div>

							<div className="flex flex-col items-center gap-1 transition-all duration-300 group-hover:transform group-hover:translate-y-[-1px]" style={{transitionDelay: '150ms'}}>
								<div
									className={`group/circle relative flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-col items-center justify-center rounded-full ${getCircularStatusStyle(
										indicator.Semaine_M2,
										indicator.Target,
										indicator.LowerIsBetter
									)} transition-all duration-300 hover:scale-105 group-hover:scale-[1.02] group-hover:shadow-md`}
								>
									<span className="text-[9px] sm:text-[10px] lg:text-xs font-bold leading-none transition-all duration-200 group-hover/circle:scale-105">
										{formatValue(indicator.Semaine_M2, indicator.Indicateur)}
									</span>
								</div>
								<p className="text-[7px] sm:text-[8px] text-slate-400 dark:text-slate-400 font-medium transition-colors duration-300 group-hover:text-slate-300">
									S3: {formatValue(indicator.Target, indicator.Indicateur)}
								</p>
							</div>

							<div className="flex flex-col items-center gap-1 transition-all duration-300 group-hover:transform group-hover:translate-y-[-1px]" style={{transitionDelay: '200ms'}}>
								<div
									className={`group/circle relative flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-col items-center justify-center rounded-full ${getCircularStatusStyle(
										indicator.Semaine_M1,
										indicator.Target,
										indicator.LowerIsBetter
									)} transition-all duration-300 hover:scale-105 group-hover:scale-[1.02] group-hover:shadow-md`}
								>
									<span className="text-[9px] sm:text-[10px] lg:text-xs font-bold leading-none transition-all duration-200 group-hover/circle:scale-105">
										{formatValue(indicator.Semaine_M1, indicator.Indicateur)}
									</span>
								</div>
								<p className="text-[7px] sm:text-[8px] text-slate-400 dark:text-slate-400 font-medium transition-colors duration-300 group-hover:text-slate-300">
									S4: {formatValue(indicator.Target, indicator.Indicateur)}
								</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
