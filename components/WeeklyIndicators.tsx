'use client'

import React from 'react'
import { weeklyIndicatorsData } from '@/lib/kpi-data'
import { ArrowUp, ArrowDown, Check } from 'lucide-react'
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
								{formatValue(indicator.Valeur_Semaine, indicator.Indicateur)}
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
							SM précédente: {formatValue(indicator.Semaine_M1, indicator.Indicateur)}
						</p>
					</div>

					<div className="mt-auto">
						<div className="flex items-center justify-between gap-2">
							<div className="flex flex-col items-center">
								<div className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold ${getCircularStatusStyle(indicator.Semaine_M4, indicator.Target, indicator.LowerIsBetter)}`}>
									{formatValue(indicator.Semaine_M4, indicator.Indicateur)}
								</div>
								<p className="text-xs text-gray-500 mt-1 font-medium">S4: 11</p>
							</div>

							<div className="flex flex-col items-center">
								<div className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold ${getCircularStatusStyle(indicator.Semaine_M3, indicator.Target, indicator.LowerIsBetter)}`}>
									{formatValue(indicator.Semaine_M3, indicator.Indicateur)}
								</div>
								<p className="text-xs text-gray-500 mt-1 font-medium">S3: 11</p>
							</div>

							<div className="flex flex-col items-center">
								<div className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold ${getCircularStatusStyle(indicator.Semaine_M2, indicator.Target, indicator.LowerIsBetter)}`}>
									{formatValue(indicator.Semaine_M2, indicator.Indicateur)}
								</div>
								<p className="text-xs text-gray-500 mt-1 font-medium">S2: 11</p>
							</div>

							<div className="flex flex-col items-center">
								<div className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold ${getCircularStatusStyle(indicator.Semaine_M1, indicator.Target, indicator.LowerIsBetter)}`}>
									{formatValue(indicator.Semaine_M1, indicator.Indicateur)}
								</div>
								<p className="text-xs text-gray-500 mt-1 font-medium">S1: 11</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
