"use client"

import React, { useState, useEffect } from "react"
import { TabSelector } from "@/components/ui/TabSelector"

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


const MONTH_NAMES = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

function getMonthName(month: string | number): string {
	const monthNum = typeof month === 'string' ? parseInt(month, 10) : month
	return MONTH_NAMES[monthNum - 1] || ''
}

function getStatusColor(value: string | number, target: string | number, isLowerBetter = false): string {
	const numValue = typeof value === 'string' ? parseFloat(value) : value
	const numTarget = typeof target === 'string' ? parseFloat(target) : target
	const diff = isLowerBetter ? numTarget - numValue : numValue - numTarget
	const percentDiff = (diff / numTarget) * 100

	if (percentDiff >= 0) return 'green'
	if (percentDiff >= -10) return 'yellow'
	return 'red'
}

function getColorClasses(color: string): { border: string; text: string } {
	switch (color) {
		case 'green':
			return { border: 'border-green-500', text: 'text-green-500' }
		case 'yellow':
			return { border: 'border-yellow-500', text: 'text-yellow-500' }
		case 'red':
			return { border: 'border-red-500', text: 'text-red-500' }
		default:
			return { border: 'border-blue-500', text: 'text-white' }
	}
}

// Operations Dashboard Page - Can fetch data here
export default function OperationsPage() {
	const [activeTab, setActiveTab] = useState<TabType>('weekly')
	const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null)
	const [monthlyData, setMonthlyData] = useState<MonthlyData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			setLoading(true)

			try {
				const res = await fetch(`/api/operations?type=${activeTab}`, {
					cache: 'no-store',
				})
				
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				
				const json = await res.json()
				const data = json?.data?.data

				if (activeTab === 'weekly') {
					setWeeklyData(data || null)
				} else {
					setMonthlyData(data || null)
				}
			} catch (error) {
				console.error('Error fetching operations data:', error)
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
	}, [activeTab])

	if (loading) {
		return (
			<main className="flex-1 overflow-hidden">
				<div className="p-3 sm:p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
					<div className="text-white text-lg">Chargement des données...</div>
				</div>
			</main>
		)
	}
	// Monthly Operations Component
	const MonthlyOperations = () => {
		if (!monthlyData) return null

		const { Taux_Heures_Supplementaires, Taux_Chomage_Technique, Taux_Scrap, Suivi_Efficience } = monthlyData

		if (!Taux_Heures_Supplementaires || !Taux_Chomage_Technique || !Taux_Scrap || !Suivi_Efficience) {
			return (
				<main className="flex-grow">
					<div className="p-3 sm:p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
						<div className="text-white text-lg">Chargement des données...</div>
					</div>
				</main>
			)
		}

		return (
			<main className="flex-grow">
				<div className="grid w-full grid-cols-1 gap-2">
					{/* Écart de Production / Taux Heures Supplémentaires */}
					<div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 transition-transform duration-300 cursor-pointer">
						<h2 className="mb-1 lg:mb-3 text-sm lg:text-lg font-semibold text-gray-300">
							Taux d&apos;Heures Supplémentaires
						</h2>
						<div className="grid grid-cols-1 items-center gap-2 lg:gap-4 md:grid-cols-2">
							<div className="flex flex-col">
								<div className="flex items-end gap-1.5 lg:gap-3">
									<p className="text-2xl lg:text-4xl font-bold text-white">{Taux_Heures_Supplementaires.Valeur_Mois_Courant}%</p>
									<div className={`flex items-center ${parseFloat(Taux_Heures_Supplementaires.Variation_Vs_Mois_Precedent) <= 0 ? 'text-green-500' : 'text-red-500'}`}>
										<div className="flex items-baseline gap-1">
											<p className="text-lg lg:text-2xl font-bold">
												{parseFloat(Taux_Heures_Supplementaires.Variation_Vs_Mois_Precedent) > 0 ? '+' : ''}{Taux_Heures_Supplementaires.Variation_Vs_Mois_Precedent}%
											</p>
											<p className="text-[10px] lg:text-sm">vs mois précédent</p>
										</div>
									</div>
								</div>
								<div className="mt-2 lg:mt-6 grid grid-cols-4 gap-1.5 lg:gap-3">
									{Taux_Heures_Supplementaires.Historique_4_Mois.map((item, index) => {
										const color = getStatusColor(item.Valeur, item.Target, true)
										const colorClasses = getColorClasses(color)
										return (
											<div key={index} className="flex flex-col items-center justify-center">
												<div className={`mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 ${colorClasses.border} bg-transparent`}>
													<p className={`text-[10px] lg:text-base font-bold ${colorClasses.text}`}>{item.Valeur}%</p>
												</div>
												<p className="text-[9px] lg:text-sm font-medium text-gray-400">{getMonthName(item.Mois)}</p>
											</div>
										)
									})}
								</div>
							</div>
							<div className="flex h-20 lg:h-24 w-full items-center justify-center">
								<svg className="h-full w-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200 100">
									<defs>
										<linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
											<stop offset="0%" style={{ stopColor: "#34d399", stopOpacity: 0.3 }} />
											<stop offset="100%" style={{ stopColor: "#34d399", stopOpacity: 0 }} />
										</linearGradient>
									</defs>
									<path d="M 0 55 L 50 80 L 100 20 L 150 70 L 200 45" fill="none" stroke="#34d399" strokeWidth="2" />
									<path d="M 0 55 L 50 80 L 100 20 L 150 70 L 200 45 L 200 100 L 0 100 Z" fill="url(#grad1)" />
								</svg>
							</div>
						</div>
					</div>

					{/* Taux de Chômage Technique */}
					<div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
						<h2 className="mb-1 lg:mb-3 flex items-center gap-1.5 text-sm lg:text-lg font-semibold text-gray-300">
							Taux de Chômage Technique
							{parseFloat(Taux_Chomage_Technique.Valeur_Mois_Courant) > parseFloat(Taux_Chomage_Technique.Target_Mois_Courant) && (
								<span className="text-base lg:text-lg text-yellow-400">⚠️</span>
							)}
						</h2>
						<div className="grid grid-cols-1 items-center gap-2 lg:gap-3 md:grid-cols-2">
							<div className="flex flex-col">
								<div className="flex items-end gap-1.5 lg:gap-2">
									<p className="text-2xl lg:text-3xl font-bold text-white">{Taux_Chomage_Technique.Valeur_Mois_Courant}%</p>
									<div className={`flex items-center ${parseFloat(Taux_Chomage_Technique.Variation_Vs_Mois_Precedent) <= 0 ? 'text-green-500' : 'text-red-500'}`}>
										<div className="flex items-baseline gap-1">
											<p className="text-lg lg:text-xl font-bold">
												{parseFloat(Taux_Chomage_Technique.Variation_Vs_Mois_Precedent) > 0 ? '+' : ''}{Taux_Chomage_Technique.Variation_Vs_Mois_Precedent}%
											</p>
											<p className="text-[10px] lg:text-xs">vs mois précédent</p>
										</div>
									</div>
								</div>
								<div className="mt-2 lg:mt-6 grid grid-cols-4 gap-1.5 lg:gap-3">
									{Taux_Chomage_Technique.Historique_4_Mois.map((item, index) => {
										const color = getStatusColor(item.Valeur, item.Target, true)
										const colorClasses = getColorClasses(color)
										return (
											<div key={index} className="flex flex-col items-center justify-center">
												<div className={`mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 ${colorClasses.border} bg-transparent`}>
													<p className={`text-[9px] lg:text-sm font-bold ${colorClasses.text}`}>{item.Valeur}%</p>
												</div>
												<p className="text-[9px] lg:text-sm font-medium text-gray-400">{getMonthName(item.Mois)}</p>
											</div>
										)
									})}
								</div>
							</div>
							<div className="flex h-20 lg:h-40 w-full items-center justify-center">
								<svg className="h-full w-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200 100">
									<defs>
										<linearGradient id="grad2" x1="0%" x2="0%" y1="0%" y2="100%">
											<stop offset="0%" style={{ stopColor: "#f87171", stopOpacity: 0.3 }} />
											<stop offset="100%" style={{ stopColor: "#f87171", stopOpacity: 0 }} />
										</linearGradient>
									</defs>
									<path d="M 0 80 L 50 40 L 100 25 L 150 25 L 200 50" fill="none" stroke="#f87171" strokeWidth="2" />
									<path d="M 0 80 L 50 40 L 100 25 L 150 25 L 200 50 L 200 100 L 0 100 Z" fill="url(#grad2)" />
								</svg>
							</div>
						</div>
					</div>

					{/* Suivi de l'Efficience mensuelle */}
					<div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
						<h2 className="mb-1 lg:mb-2 text-sm lg:text-base font-semibold text-gray-300">
							Suivi de l&apos;Efficience mensuelle
						</h2>
						<div className="grid grid-cols-1 items-center gap-2 lg:gap-3 md:grid-cols-2">
							<div className="flex flex-col">
								<div className="flex items-end gap-1.5 lg:gap-2">
									<p className="text-2xl lg:text-3xl font-bold text-white">{Suivi_Efficience.Valeur_Mois_Courant}%</p>
									<div className={`flex items-center ${parseFloat(Suivi_Efficience.Variation_Vs_Mois_Precedent) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
										<div className="flex items-baseline gap-1">
											<p className="text-lg lg:text-xl font-bold">
												{parseFloat(Suivi_Efficience.Variation_Vs_Mois_Precedent) > 0 ? '+' : ''}{Suivi_Efficience.Variation_Vs_Mois_Precedent}%
											</p>
											<p className="text-[10px] lg:text-xs">vs mois précédent</p>
										</div>
									</div>
								</div>
								<div className="mt-2 lg:mt-6 grid grid-cols-4 gap-1.5 lg:gap-3">
									{Suivi_Efficience.Historique_4_Mois.map((item, index) => {
										const color = getStatusColor(item.Valeur, item.Target, false)
										const colorClasses = getColorClasses(color)
										return (
											<div key={index} className="flex flex-col items-center justify-center">
												<div className={`mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 ${colorClasses.border} bg-transparent`}>
													<p className={`text-[10px] lg:text-base font-bold ${colorClasses.text}`}>{item.Valeur}%</p>
												</div>
												<p className="text-[9px] lg:text-sm font-medium text-gray-400">{getMonthName(item.Mois)}</p>
											</div>
										)
									})}
								</div>
							</div>
							<div className="flex h-20 lg:h-40 w-full items-center justify-center">
								<svg className="h-full w-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200 100">
									<defs>
										<linearGradient id="grad3" x1="0%" x2="0%" y1="0%" y2="100%">
											<stop offset="0%" style={{ stopColor: "#34d399", stopOpacity: 0.3 }} />
											<stop offset="100%" style={{ stopColor: "#34d399", stopOpacity: 0 }} />
										</linearGradient>
									</defs>
									<path d="M 0 20 L 50 15 L 100 50 L 150 25 L 200 35" fill="none" stroke="#34d399" strokeWidth="2" />
									<path d="M 0 20 L 50 15 L 100 50 L 150 25 L 200 35 L 200 100 L 0 100 Z" fill="url(#grad3)" />
								</svg>
							</div>
						</div>
					</div>

					{/* Bottom Grid - Taux Scrap and Target Info */}
					<div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
						<div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
							<h2 className="mb-1 lg:mb-3 text-sm lg:text-lg font-semibold text-gray-300">
								Taux de Scrap Mensuel
							</h2>
							<div className="flex items-center justify-between">
								<div className="flex flex-col">
									<div className="flex items-baseline gap-1.5 lg:gap-3">
										<p className="text-xl lg:text-3xl font-bold text-white">{Taux_Scrap.Valeur_Mois_Courant}%</p>
										<div className={`flex items-center ${parseFloat(Taux_Scrap.Variation_Vs_Mois_Precedent) <= 0 ? 'text-green-500' : 'text-red-500'}`}>
											<div className="flex items-baseline gap-0.5">
												<span className="text-base lg:text-xl font-bold">
													{parseFloat(Taux_Scrap.Variation_Vs_Mois_Precedent) > 0 ? '+' : ''}{Taux_Scrap.Variation_Vs_Mois_Precedent}%
												</span>
												<span className="text-[10px] lg:text-sm">vs mois dernier</span>
											</div>
										</div>
									</div>
									<p className="mt-0.5 lg:mt-1 text-[10px] lg:text-sm text-gray-400">
										Target: {Taux_Scrap.Target_Mois_Courant}%
									</p>
								</div>
							</div>
						</div>
						<div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
							<h2 className="mb-1 lg:mb-3 text-center text-sm lg:text-lg font-semibold text-gray-300">
								Target Efficience
							</h2>
							<div className="flex items-center justify-center">
								<div className="relative h-16 w-16 lg:h-32 lg:w-32">
									<svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
										<circle className="text-gray-700" cx="60" cy="60" fill="transparent" r="54" stroke="currentColor" strokeWidth="12" />
										<circle 
											className={`${parseFloat(Suivi_Efficience.Valeur_Mois_Courant) >= parseFloat(Suivi_Efficience.Target_Mois_Courant) ? 'text-green-500' : 'text-yellow-500'}`} 
											cx="60" 
											cy="60" 
											fill="transparent" 
											r="54" 
											stroke="currentColor" 
											strokeDasharray="339.292" 
											strokeDashoffset={339.292 * (1 - parseFloat(Suivi_Efficience.Valeur_Mois_Courant) / 100)} 
											strokeLinecap="round" 
											strokeWidth="12" 
										/>
									</svg>
									<div className="absolute inset-0 flex flex-col items-center justify-center">
										<p className="text-base lg:text-2xl font-bold text-white">{Suivi_Efficience.Target_Mois_Courant}%</p>
									</div>
								</div>
								<div className={`ml-2 lg:ml-4 flex items-center ${parseFloat(Suivi_Efficience.Valeur_Mois_Courant) >= parseFloat(Suivi_Efficience.Target_Mois_Courant) ? 'text-green-500' : 'text-red-500'}`}>
									<div className="flex items-baseline gap-0.5 lg:gap-1">
										<span className="text-base lg:text-xl font-bold">
											{(parseFloat(Suivi_Efficience.Valeur_Mois_Courant) - parseFloat(Suivi_Efficience.Target_Mois_Courant)).toFixed(1)}%
										</span>
										<p className="text-[10px] lg:text-sm text-gray-400">VS target</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		)
	}

	// Weekly Operations Component
	const WeeklyOperations = () => {
		if (!weeklyData) return null

		const { Taux_Heures_Supplementaires, Taux_Chomage_Technique, Taux_Scrap, Suivi_Efficience } = weeklyData

		if (!Taux_Heures_Supplementaires || !Taux_Chomage_Technique || !Taux_Scrap || !Suivi_Efficience) {
			return (
				<main className="w-full flex-shrink-0">
					<div className="p-3 sm:p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
						<div className="text-white text-lg">Chargement des données...</div>
					</div>
				</main>
			)
		}

		return (
			<main className="w-full flex-shrink-0">
				<div className="flex flex-col gap-2">
					<div className="relative grid grid-cols-1 gap-2 md:grid-cols-2">
						{/* Taux d'Heures Supplémentaires */}
						<div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 min-h-[200px] lg:min-h-[340px] transition-transform duration-300 cursor-pointer">
							<h2 className="mb-1 lg:mb-2 text-sm lg:text-lg font-semibold text-gray-300">
								Taux d&apos;Heures Supplémentaires
							</h2>
							<div className="flex items-end gap-1.5 lg:gap-3 mb-1.5 lg:mb-3">
								<p className="text-2xl lg:text-4xl font-bold text-white">{Taux_Heures_Supplementaires.Valeur_Actuelle}%</p>
							</div>
							<div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
								<div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
									<svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" strokeWidth="3" viewBox="0 0 200 80">
										<defs>
											<linearGradient id="gradient1" x1="0" x2="0" y1="0" y2="1">
												<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
												<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
											</linearGradient>
										</defs>
										<path className="stroke-dashed stroke-gray-500" d="M 0 40 L 200 40" strokeDasharray="4 4" />
										<path className="stroke-blue-500" d="M 0 20 L 66 60 L 132 30 L 200 50" />
										<path d="M 0 20 L 66 60 L 132 30 L 200 50 L 200 80 L 0 80 Z" fill="url(#gradient1)" />
									</svg>
									<div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">Target: {Taux_Heures_Supplementaires.Target_Actuelle}%</div>
								</div>
								<div className="mt-0.5 lg:mt-2 flex justify-between gap-1 lg:gap-2">
									{Taux_Heures_Supplementaires.Historique_4_Semaines.slice().reverse().map((item, index) => {
										const color = getStatusColor(item.Valeur, item.Target, true)
										const colorClasses = getColorClasses(color)
										return (
											<div key={index} className="flex flex-col items-center gap-0.5 lg:gap-1">
												<div className={`flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 ${colorClasses.border} bg-slate-800 p-1`}>
													<span className={`text-[10px] lg:text-xs font-bold leading-none ${colorClasses.text}`}>{item.Valeur}%</span>
												</div>
												<span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S{item.Semaine}</span>
											</div>
										)
									})}
								</div>
							</div>
						</div>

						{/* Taux de Chômage technique */}
						<div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 min-h-[200px] lg:min-h-[340px] transition-transform duration-300 cursor-pointer">
							<h2 className="mb-1 lg:mb-2 flex items-center gap-1.5 text-sm lg:text-lg font-semibold text-gray-300">
								Taux de Chômage technique
								{parseFloat(Taux_Chomage_Technique.Valeur_Actuelle) > parseFloat(Taux_Chomage_Technique.Target_Actuelle) && (
									<span className="text-base lg:text-lg text-yellow-400">⚠️</span>
								)}
							</h2>
							<div className="flex items-end gap-1.5 lg:gap-3 mb-1.5 lg:mb-3">
								<p className={`flex items-center text-2xl lg:text-3xl font-bold ${parseFloat(Taux_Chomage_Technique.Valeur_Actuelle) > parseFloat(Taux_Chomage_Technique.Target_Actuelle) ? 'text-red-500' : 'text-white'}`}>
									{Taux_Chomage_Technique.Valeur_Actuelle}%
								</p>
							</div>
							<div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
								<div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
									<svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" strokeWidth="3" viewBox="0 0 200 80">
										<defs>
											<linearGradient id="gradient2" x1="0" x2="0" y1="0" y2="1">
												<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
												<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
											</linearGradient>
										</defs>
										<path className="stroke-dashed stroke-gray-500" d="M 0 40 L 200 40" strokeDasharray="4 4" />
										<path className="stroke-blue-500" d="M 0 60 L 66 20 L 132 50 L 200 30" />
										<path d="M 0 60 L 66 20 L 132 50 L 200 30 L 200 80 L 0 80 Z" fill="url(#gradient2)" />
									</svg>
									<div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">Target: {Taux_Chomage_Technique.Target_Actuelle}%</div>
								</div>
								<div className="mt-0.5 flex justify-between gap-1">
									{Taux_Chomage_Technique.Historique_4_Semaines.slice().reverse().map((item, index) => {
										const color = getStatusColor(item.Valeur, item.Target, true)
										const colorClasses = getColorClasses(color)
										return (
											<div key={index} className="flex flex-col items-center gap-0.5">
												<div className={`flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 ${colorClasses.border} bg-slate-800 p-1`}>
													<span className={`text-[10px] lg:text-xs font-bold leading-none ${colorClasses.text}`}>{item.Valeur}%</span>
												</div>
												<span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S{item.Semaine}</span>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-lg bg-gray-900/50">
						<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
							{/* Taux de Scrap */}
							<div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 min-h-[200px] lg:min-h-[340px] transition-transform duration-300 cursor-pointer">
								<h2 className="mb-1 lg:mb-2 flex items-center gap-1.5 text-sm lg:text-lg font-semibold text-gray-300">
									Taux de Scrap 
									{parseFloat(Taux_Scrap.Valeur_Actuelle) > parseFloat(Taux_Scrap.Target_Actuelle) && (
										<span className="text-base lg:text-lg text-yellow-400">⚠️</span>
									)}
								</h2>
								<div className="flex items-center gap-1.5 lg:gap-3">
									<div className="relative flex h-16 w-16 lg:h-28 lg:w-28 flex-shrink-0 items-center justify-center">
										<svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
											<circle className="stroke-current text-gray-600" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
											<circle 
												className={`stroke-current transition-all duration-500 ${parseFloat(Taux_Scrap.Valeur_Actuelle) <= parseFloat(Taux_Scrap.Target_Actuelle) ? 'text-green-500' : 'text-red-500'}`} 
												cx="50" 
												cy="50" 
												fill="none" 
												r="45" 
												strokeDasharray="282.74" 
												strokeDashoffset={282.74 * (1 - Math.min(parseFloat(Taux_Scrap.Valeur_Actuelle) / 10, 1))} 
												strokeLinecap="round" 
												strokeWidth="8" 
											/>
										</svg>
										<div className="absolute inset-0 flex items-center justify-center">
											<span className="text-xl lg:text-3xl font-bold text-white">{Taux_Scrap.Valeur_Actuelle}%</span>
										</div>
									</div>
								</div>
								<div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
									<div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
										<svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" strokeWidth="3" viewBox="0 0 200 80">
											<defs>
												<linearGradient id="gradient3" x1="0" x2="0" y1="0" y2="1">
													<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
													<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
												</linearGradient>
											</defs>
											<path className="stroke-dashed stroke-gray-500" d="M 0 50 L 200 50" strokeDasharray="4 4" />
											<path className="stroke-blue-500" d="M 0 70 L 66 40 L 132 60 L 200 20" />
											<path d="M 0 70 L 66 40 L 132 60 L 200 20 L 200 80 L 0 80 Z" fill="url(#gradient3)" />
										</svg>
										<div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">Target: {Taux_Scrap.Target_Actuelle}%</div>
									</div>
									<div className="mt-0.5 flex justify-between gap-1">
										{Taux_Scrap.Historique_4_Semaines.slice().reverse().map((item, index) => {
											const color = getStatusColor(item.Valeur, item.Target, true)
											const colorClasses = getColorClasses(color)
											return (
												<div key={index} className="flex flex-col items-center gap-0.5">
													<div className={`flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 ${colorClasses.border} bg-slate-800 p-1`}>
														<span className={`text-[10px] lg:text-xs font-bold leading-none ${colorClasses.text}`}>{item.Valeur}%</span>
													</div>
													<span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S{item.Semaine}</span>
												</div>
											)
										})}
									</div>
								</div>
							</div>

							{/* Suivi de l'Efficience par semaine */}
							<div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 min-h-[200px] lg:min-h-[340px] transition-transform duration-300 cursor-pointer">
								<h2 className="mb-1 lg:mb-2 text-sm lg:text-lg font-semibold text-gray-300">
									Suivi de l&apos;Efficience par semaine
								</h2>
								<div className="flex items-center gap-1.5 lg:gap-3">
									<div className="relative flex h-16 w-16 lg:h-28 lg:w-28 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
										<svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
											<circle className="stroke-current text-gray-600" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
											<circle 
												className="stroke-current text-blue-500 transition-all duration-500" 
												cx="50" 
												cy="50" 
												fill="none" 
												r="45" 
												strokeDasharray="282.74" 
												strokeDashoffset={282.74 * (1 - parseFloat(Suivi_Efficience.Valeur_Actuelle) / 100)} 
												strokeLinecap="round" 
												strokeWidth="8" 
											/>
										</svg>
										<div className="absolute inset-0 flex items-center justify-center">
											<span className="text-md lg:text-xl font-bold text-white">{Suivi_Efficience.Valeur_Actuelle}%</span>
										</div>
									</div>
								</div>
								<div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
									<div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
										<svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" strokeWidth="3" viewBox="0 0 200 80">
											<defs>
												<linearGradient id="gradient4" x1="0" x2="0" y1="0" y2="1">
													<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
													<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
												</linearGradient>
											</defs>
											<path className="stroke-dashed stroke-gray-500" d="M 0 25 L 200 25" strokeDasharray="4 4" />
											<path className="stroke-blue-500" d="M 0 30 L 66 20 L 132 50 L 200 40" />
											<path d="M 0 30 L 66 20 L 132 50 L 200 40 L 200 80 L 0 80 Z" fill="url(#gradient4)" />
										</svg>
										<div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">Target: {Suivi_Efficience.Target_Actuelle}%</div>
									</div>
									<div className="mt-0.5 flex justify-between gap-1">
										{Suivi_Efficience.Historique_4_Semaines.slice().reverse().map((item, index) => {
											const color = getStatusColor(item.Valeur, item.Target, false)
											const colorClasses = getColorClasses(color)
											return (
												<div key={index} className="flex flex-col items-center gap-0.5">
													<div className={`flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 ${colorClasses.border} bg-slate-800 p-1`}>
														<span className={`text-[10px] lg:text-xs font-bold leading-none ${colorClasses.text}`}>{item.Valeur}%</span>
													</div>
													<span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S{item.Semaine}</span>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		)
	}

	const currentWeek = weeklyData?.Taux_Heures_Supplementaires?.Semaine_Actuelle
	const currentMonth = monthlyData?.Taux_Heures_Supplementaires?.Mois_Courant

	return (
		<main className="flex-1 overflow-hidden">
			<div className="p-3 sm:p-4 lg:p-6">
				{/* Header with tabs */}
				<div className="mb-3 lg:mb-5 flex justify-between items-start">
					<div>
						<h1 className="text-2xl lg:text-3xl font-bold text-white mb-1 lg:mb-2">
							Factory Performance Overview - {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
						</h1>
						<div className="flex flex-wrap items-center justify-start gap-2 lg:gap-4">
							{activeTab === "weekly" && currentWeek && (
								<div className="rounded-lg bg-slate-800/90 border border-slate-700/50 px-3 py-1.5 text-xs lg:text-sm font-medium text-gray-300">
									<span className="font-normal">Semaine actuelle :</span>
									<span className="font-semibold text-white ml-1">S{currentWeek}</span>
								</div>
							)}
							{currentMonth && (
								<div className="rounded-lg bg-slate-800/90 border border-slate-700/50 px-3 py-1.5 text-xs lg:text-sm font-medium text-gray-300">
									<span className="font-normal">Mois en cours :</span>
									<span className="font-semibold text-white ml-1">M{currentMonth}</span>
								</div>
							)}
						</div>
					</div>
					<TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
				</div>

				{/* Conditional Content Rendering */}
				{activeTab === "weekly" ? <WeeklyOperations /> : <MonthlyOperations />}
			</div>
		</main>
	)
}
