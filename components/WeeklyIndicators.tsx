'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { weeklyIndicatorsData } from '@/lib/kpi-data'
import { Activity } from 'lucide-react'

export function WeeklyIndicators() {
	const { Indicateurs } = weeklyIndicatorsData

	const formatValue = (value: number, indicateur: string) => {
		if (indicateur.includes('Taux') || indicateur.includes('Efficience') || indicateur.includes('Réclamations')) {
			return `${value.toFixed(1)}%`
		} else if (indicateur.includes('Chiffre') || indicateur.includes('Forecast')) {
			return `$${(value / 1000000).toFixed(2)}M`
		}
		return value.toString()
	}

	const getTrendColor = (valeur: number, target: number) => {
		return valeur >= target ? 'text-green-600' : 'text-red-600'
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
			{Indicateurs.map((indicator, index) => (
				<Card
					key={index}
					className="group relative overflow-hidden bg-card border-2 border-border/50 hover:border-primary/30 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] animate-fade-in"
					style={{ animationDelay: `${index * 100}ms` }}
				>
					{/* Enhanced hover gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
					
					{/* Subtle shimmer effect */}
					<div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
					
					<CardHeader className="pb-2 pt-4 px-4 relative z-10">
						<div className="flex items-center mb-2">
							<CardTitle className="text-lg font-bold text-foreground flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
								<div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 shadow-sm group-hover:shadow-primary/25">
									<Activity className="h-6 w-6" />
								</div>
								<span className="group-hover:text-primary transition-colors duration-300 tracking-tight text-sm">
									{indicator.Indicateur}
								</span>
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="relative z-10 px-4 pb-4">
						<div className="space-y-3">
							{/* Enhanced KPI Preview */}
							<div className="p-3 rounded-lg bg-muted/50 group-hover:bg-muted/70 transition-all duration-500 border border-border/40 group-hover:border-primary/20">
								<div className="text-xs font-bold text-muted-foreground/90 uppercase tracking-wider mb-2 group-hover:text-muted-foreground transition-colors duration-300">
									Current Week
								</div>
								<div className="flex items-center justify-between mb-3">
									<div className="text-2xl font-black text-foreground group-hover:scale-105 group-hover:text-primary transition-all duration-500 tracking-tight">
										{formatValue(indicator.Valeur_Semaine, indicator.Indicateur)}
									</div>
									<div className="text-right space-y-1">
										<div className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">4W</div>
										<div className="text-xs font-mono text-muted-foreground bg-background/80 px-2 py-1 rounded border border-border/30 shadow-sm">
											{formatValue(indicator.Semaine_M4, indicator.Indicateur)} • {formatValue(indicator.Semaine_M3, indicator.Indicateur)} • {formatValue(indicator.Semaine_M2, indicator.Indicateur)} • {formatValue(indicator.Semaine_M1, indicator.Indicateur)}
										</div>
									</div>
								</div>
								<div className={`text-xs font-semibold mt-2 px-2 py-1 rounded bg-background/80 border border-border/40 ${getTrendColor(indicator.Valeur_Semaine, indicator.Target)} transition-all duration-300`}>
									<span className="mr-1">🎯</span>
									Target: {formatValue(indicator.Target, indicator.Indicateur)}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

