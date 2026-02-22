"use client"

import React, { useEffect, useState } from "react"
import { ArrowUp, ArrowDown, Target } from "lucide-react"
import { PeriodSelector } from "@/components/ui/PeriodSelector"
import { TabSelector } from "@/components/ui/TabSelector"
import { useKpiPeriod } from "@/hooks/use-kpi-period"

type TabType = "weekly" | "monthly"

interface DerniereSemaine {
	Label: string
	Valeur_MEUR?: number
	Valeur?: number
	Target?: number
}

interface SemaineDuMois {
	Label: string
	Reel_MEUR?: number
	Prevision_MEUR?: number
	Cumul_MEUR?: number
}

interface ChiffreAffaires {
	Valeur_Mois_Cumulee_MEUR: number
	Annee_Reference: number
	Semaine_Reference: number
	Dernieres_4_Semaines: DerniereSemaine[]
	Semaine_Du_Mois: SemaineDuMois[]
}

interface TauxFacturationLivraison {
	Valeur_S_1: number
	Variation_Pts_Vs_S_1: number
	Dernieres_4_Semaines: DerniereSemaine[]
}

interface FinanceSemaine {
	Chiffre_Affaires: ChiffreAffaires
	Taux_Facturation_Livraison: TauxFacturationLivraison
}

interface SuiviMois {
	Label: string
	Mois: number
	Annee: number
	Valeur?: number
	Valeur_MEUR?: number
	Target?: number
	Target_MEUR?: number
}

interface EfficienceFinanciere {
	Valeur_Affichee: number
	Delta_Affiche: number
	Delta_Unite: string
	VsLabel: string
	Suivi_4_Mois: SuiviMois[]
}

interface ExecutionBudgetaire {
	Valeur_Affichee: number
	Delta_Affiche: number
	Delta_Unite: string
	VsLabel: string
	Suivi_4_Mois: SuiviMois[]
}

interface PaiementsRetard {
	Valeur_Affichee_MEUR: number
	Delta_Affiche_MEUR: number
	Delta_Unite: string
	VsLabel: string
	Suivi_4_Mois: SuiviMois[]
}

interface FinanceMois {
	Efficience_Financiere: EfficienceFinanciere
	Execution_Budgetaire: ExecutionBudgetaire
	Paiements_Retard: PaiementsRetard
}

// Finance Dashboard Page - Fetches data from /api/finance
export default function FinancePage() {
	const { type: activeTab, setType: setActiveTab, period, setPeriod, year, setYear } =
		useKpiPeriod('weekly')
	const [weeklyData, setWeeklyData] = useState<FinanceSemaine | null>(null)
	const [monthlyData, setMonthlyData] = useState<FinanceMois | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			setError(null)
			try {
				const url = `/api/finance?type=${activeTab}&period=${period}&year=${year}`
				const res = await fetch(url, { cache: "no-store" })
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				const json = await res.json()
				const finalData = json?.data ?? json

				if (activeTab === "weekly") {
					setWeeklyData(finalData?.Finance_Semaine ?? null)
				} else {
					setMonthlyData(finalData?.Finance_Mois ?? null)
				}
			} catch (err) {
				console.error(`Error fetching finance ${activeTab} data:`, err)
				setError(err instanceof Error ? err.message : "Failed to load finance data")
				if (activeTab === "weekly") {
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
			<main className="flex-1 overflow-hidden">
				<div className="p-3 sm:p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
					<div className="text-white text-lg">Chargement des données...</div>
				</div>
			</main>
		)
	}

	if (error) {
		return (
			<main className="flex-1 overflow-hidden">
				<div className="p-3 sm:p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
					<div className="text-red-500 text-lg">Erreur lors du chargement des données: {error}</div>
				</div>
			</main>
		)
	}

	// Monthly KPI Dashboard Content
	const MonthlyDashboard = () => {
		if (!monthlyData) {
			return (
				<main className="flex-1 overflow-hidden">
					<div className="p-3 sm:p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
						<div className="text-gray-400 text-lg">Aucune donnée disponible.</div>
					</div>
				</main>
			)
		}

		const eff = monthlyData.Efficience_Financiere
		const exec = monthlyData.Execution_Budgetaire
		const paiements = monthlyData.Paiements_Retard

		return (
			<main className="flex-1">
				<div className="flex flex-col flex-grow gap-6">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-5 rounded-xl border border-slate-700/80 bg-slate-900/60 p-6 transition-transform duration-300 cursor-pointer shadow-lg shadow-black/20">
							<div className="flex flex-col md:flex-row gap-4 items-center">
								<div className="flex-1 md:pl-8">
									<p className="text-white text-base font-medium leading-normal">
										Efficience financière
									</p>
									<div className="flex items-end gap-2 mt-1">
										<p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
											{eff.Valeur_Affichee ?? '-'}%
										</p>
										<p className={`text-base font-medium ${(eff.Delta_Affiche ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
											({eff.Delta_Affiche != null ? (eff.Delta_Affiche >= 0 ? '+' : '') + eff.Delta_Affiche : '-'} {eff.Delta_Unite} {eff.VsLabel})
										</p>
									</div>
									<p className="text-sm text-gray-400 mt-1">
										Efficacité Globale
									</p>
									<div className="flex justify-start items-center mt-4 space-x-3">
										{eff.Suivi_4_Mois.map((item, i) => (
											<div
												key={item.Label}
												className="flex items-center justify-center w-14 h-14 rounded-full border-2 bg-blue-500/20 text-blue-300 border-blue-400"
											>
												<span className="font-bold text-lg">{item.Valeur ?? '-'}</span>
											</div>
										))}
									</div>
								</div>
              <div className="w-full md:w-auto md:flex-1">
                <div className="h-36">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 320 144"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      className="stroke-current text-gray-600"
                      strokeDasharray="4 4"
                      x1="0"
                      x2="320"
                      y1="28"
                      y2="28"
                    />
                    <text
                      className="fill-current text-gray-500 text-xs"
                      x="290"
                      y="24"
                    >
                      Target
                    </text>
                    <polyline
                      className="stroke-current text-yellow-400"
                      fill="none"
                      points="40,88 120,40 200,60 280,88"
                      strokeWidth="2"
                    />
                    <circle className="fill-current text-yellow-400" cx="40" cy="88" r="4" />
                    <circle className="fill-current text-yellow-400" cx="120" cy="40" r="4" />
                    <circle className="fill-current text-yellow-400" cx="200" cy="60" r="4" />
                    <circle className="fill-current text-yellow-400" cx="280" cy="88" r="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
						<div className="flex flex-col gap-5 rounded-xl border border-slate-700/80 bg-slate-900/60 p-6 transition-transform duration-300 cursor-pointer shadow-lg shadow-black/20">
							<div className="flex flex-col md:flex-row gap-4 items-center">
								<div className="flex-1 md:pl-8">
									<p className="text-white text-base font-medium leading-normal">
										Exécution Budgétaire
									</p>
									<div className="flex items-end gap-2 mt-1">
										<p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
											{exec.Valeur_Affichee ?? '-'}%
										</p>
										<div className={`flex items-center ${(exec.Delta_Affiche ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
											<span className="material-symbols-outlined text-lg">
												arrow_upward
											</span>
											<p className="text-base font-medium">
												{exec.Delta_Affiche != null ? (exec.Delta_Affiche >= 0 ? '+' : '') + exec.Delta_Affiche + ' ' + exec.Delta_Unite : '-'}
											</p>
										</div>
									</div>
									<p className="text-sm text-gray-400 mt-1">
										Consommé vs. mois dernier
									</p>
									<div className="flex justify-start items-center mt-4 space-x-3">
										{exec.Suivi_4_Mois.map((item) => (
											<div
												key={item.Label}
												className="flex items-center justify-center w-14 h-14 rounded-full border-2 bg-blue-500/20 text-blue-300 border-blue-400"
											>
												<span className="font-bold text-lg">{item.Valeur ?? '-'}</span>
											</div>
										))}
									</div>
								</div>
              <div className="w-full md:w-auto md:flex-1 h-36">
                <svg
                  className="w-full h-full"
                  fill="none"
                  viewBox="0 0 320 144"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    className="stroke-current text-gray-600"
                    strokeDasharray="4 4"
                    x1="0"
                    x2="320"
                    y1="58"
                    y2="58"
                  />
                  <text className="fill-current text-gray-500 text-xs" x="290" y="54">
                    Target
                  </text>
                  <polyline
                    className="stroke-current text-yellow-400"
                    fill="none"
                    points="40,88 120,68 200,78 280,68"
                    strokeWidth="2"
                  />
                  <circle className="fill-current text-yellow-400" cx="40" cy="88" r="4" />
                  <circle className="fill-current text-yellow-400" cx="120" cy="68" r="4" />
                  <circle className="fill-current text-yellow-400" cx="200" cy="78" r="4" />
                  <circle className="fill-current text-yellow-400" cx="280" cy="68" r="4" />
                </svg>
              </div>
            </div>
          </div>
						<div className="flex flex-col gap-5 rounded-xl border border-slate-700/80 bg-slate-900/60 p-6 transition-transform duration-300 cursor-pointer shadow-lg shadow-black/20">
							<div className="flex flex-col md:flex-row gap-4 items-center">
								<div className="flex-1 md:pl-8">
									<p className="text-white text-base font-medium leading-normal">
										Total des Paiements en Retard
									</p>
									<div className="flex items-end gap-2 mt-1">
										<p className="text-red-500 tracking-light text-[32px] font-bold leading-tight truncate">
											{paiements.Valeur_Affichee_MEUR} M€
										</p>
										<div className={`flex items-center ${paiements.Delta_Affiche_MEUR <= 0 ? 'text-green-500' : 'text-red-500'}`}>
											<span className="material-symbols-outlined text-lg">
												check_circle
											</span>
											<p className="text-base font-medium">
												{paiements.Delta_Affiche_MEUR >= 0 ? '+' : ''}{paiements.Delta_Affiche_MEUR} M€
											</p>
										</div>
									</div>
									<p className="text-sm text-gray-400 mt-1">
										Amélioration vs mois dernier
									</p>
									<div className="flex justify-start items-center mt-4 space-x-3">
										{paiements.Suivi_4_Mois.map((item) => (
											<div
												key={item.Label}
												className="flex items-center justify-center w-14 h-14 rounded-full border-2 bg-blue-500/20 text-blue-300 border-blue-400"
											>
												<span className="font-bold text-lg">{item.Valeur_MEUR ?? '-'}</span>
											</div>
										))}
									</div>
								</div>
              <div className="w-full md:w-auto md:flex-1 h-36">
                <svg
                  className="w-full h-full"
                  fill="none"
                  viewBox="0 0 320 144"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    className="stroke-current text-gray-600"
                    strokeDasharray="4 4"
                    x1="0"
                    x2="320"
                    y1="88"
                    y2="88"
                  />
                  <text className="fill-current text-gray-500 text-xs" x="290" y="84">
                    Target
                  </text>
                  <polyline
                    className="stroke-current text-yellow-400"
                    fill="none"
                    points="40,28 120,48 200,68 280,98"
                    strokeWidth="2"
                  />
                  <circle className="fill-current text-yellow-400" cx="40" cy="28" r="4" />
                  <circle className="fill-current text-yellow-400" cx="120" cy="48" r="4" />
                  <circle className="fill-current text-yellow-400" cx="200" cy="68" r="4" />
                  <circle className="fill-current text-yellow-400" cx="280" cy="98" r="4" />
                </svg>
              </div>
							</div>
						</div>
					</div>
				</div>
			</main>
		)
	}

	const WeeklyDashboard = () => {
		if (!weeklyData) {
			return (
				<main className="flex-1 overflow-hidden">
					<div className="p-3 sm:p-4 lg:p-6 flex items-center justify-center min-h-[400px]">
						<div className="text-gray-400 text-lg">Aucune donnée disponible.</div>
					</div>
				</main>
			)
		}

		const ca = weeklyData.Chiffre_Affaires
		const taux = weeklyData.Taux_Facturation_Livraison

		return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 grid grid-cols-1 gap-6">
        <div
          className="flex flex-col gap-5 rounded-xl border border-slate-700/80 bg-slate-900/60 p-6 transition-transform duration-300 cursor-pointer shadow-lg shadow-black/20"
        >
        <p className="text-white text-lg font-semibold leading-normal">
          Chiffre d’Affaires Réalisé vs. Prévisionnel
        </p>
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center justify-between pb-4 border-b border-white/10"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-2">
                <p className="text-blue-400 tracking-light text-7xl font-bold leading-tight truncate tabular-nums">
									<span className="text-blue-400">{ca.Valeur_Mois_Cumulee_MEUR}</span>
									<span className="text-blue-300/90 text-5xl ml-1">M€</span>
								</p>
								<div className="flex items-center gap-1.5 text-green-400">
									<ArrowUp className="w-6 h-6 shrink-0" strokeWidth={2.5} />
									<p className="text-xl font-semibold">vs S-1</p>
								</div>
							</div>
							<p className="text-sm text-gray-300 font-medium">Cumul du mois</p>
            </div>
            <div className="flex items-end gap-4">
              <div className="flex flex-col text-right">
                <div className="flex items-center gap-4">
									{ca.Dernieres_4_Semaines.map((s) => (
										<div key={s.Label} className="flex flex-col items-center gap-2.5">
											<div
												className="w-20 h-20 rounded-full bg-slate-700/60 border-2 border-blue-400/80 flex items-center justify-center shadow-xl shadow-blue-500/20 ring-2 ring-blue-500/20"
											>
												<span className="text-white text-lg font-bold tabular-nums">
													{s.Valeur_MEUR ?? s.Valeur ?? '-'} M€
												</span>
											</div>
											<span className="text-gray-300 text-sm font-medium">{s.Label}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
		<div className="h-60 min-h-[240px] relative pt-8 pb-4 px-6 overflow-visible bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="absolute inset-0 px-6 pt-8 pb-4">
            <svg
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 286 112"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.75 89.6L107.25 58.8L178.75 39.2L250.25 0"
                stroke="#EAB308"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="35.75" cy="89.6" fill="#EAB308" r="6" stroke="#fef08a" strokeWidth="2" />
              <circle cx="107.25" cy="58.8" fill="#EAB308" r="6" stroke="#fef08a" strokeWidth="2" />
              <circle cx="178.75" cy="39.2" fill="#EAB308" r="6" stroke="#fef08a" strokeWidth="2" />
              <circle cx="250.25" cy="0" fill="#EAB308" r="6" stroke="#fef08a" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute inset-0 grid grid-cols-4 items-end px-6">
							{ca.Dernieres_4_Semaines.map((s, i) => {
								const val = s.Valeur_MEUR ?? s.Valeur ?? 0
								const maxVal = Math.max(...ca.Dernieres_4_Semaines.map((x) => x.Valeur_MEUR ?? x.Valeur ?? 0), 1)
								const height = Math.max(40, (val / maxVal) * 90)
								return (
									<div
										key={s.Label}
										className={`rounded-t-md relative mx-auto w-1/3 flex justify-center ${i === ca.Dernieres_4_Semaines.length - 1 ? 'bg-primary' : 'bg-primary/80'}`}
										style={{ height: `${height}%` }}
									>
										<span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg text-white text-base font-bold bg-slate-800 border-2 border-slate-500 whitespace-nowrap shadow-xl z-10 min-w-[4rem] text-center">
											{val || '-'} M€
										</span>
									</div>
								)
							})}
						</div>
          <div
            className="absolute top-2 right-6 flex flex-col items-end gap-1.5 z-20"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/95 border border-yellow-500/50">
              <Target className="w-4 h-4 text-yellow-400 shrink-0" strokeWidth={2.5} />
              <span className="text-sm font-bold text-yellow-300 tabular-nums">{ca.Valeur_Mois_Cumulee_MEUR} M€</span>
            </div>
            <span className="text-xs font-medium text-gray-400">Objectif cible</span>
          </div>
        </div>
						<div
							className="grid grid-cols-4 text-center pt-5 px-6"
						>
							{ca.Semaine_Du_Mois.map((s) => (
								<div key={s.Label} className="flex flex-col items-center gap-2">
									<span className="font-bold text-base text-white">{s.Label}</span>
									<span className="text-gray-300 text-sm font-medium tabular-nums">
										{s.Cumul_MEUR ?? s.Reel_MEUR ?? s.Prevision_MEUR ?? '-'} M€
									</span>
								</div>
							))}
						</div>
      </div>
        <div
          className="flex flex-col gap-5 rounded-xl border border-slate-700/80 bg-slate-900/60 p-6 transition-transform duration-300 cursor-pointer shadow-lg shadow-black/20"
        >
						<p className="text-white text-lg font-semibold leading-normal">
							Taux de Facturation & Livraison
						</p>
						<div className="flex items-center justify-between">
							<div className="flex items-end gap-2">
								<p className="text-blue-400 tracking-light text-4xl font-bold leading-tight truncate tabular-nums">
									<span className="text-blue-400">{taux.Valeur_S_1}</span>
									<span className="text-blue-300/90 text-3xl ml-0.5">%</span>
								</p>
								<div className={`flex items-center gap-1.5 ${taux.Variation_Pts_Vs_S_1 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
									{taux.Variation_Pts_Vs_S_1 >= 0 ? (
										<ArrowUp className="w-5 h-5 shrink-0" strokeWidth={2.5} />
									) : (
										<ArrowDown className="w-5 h-5 shrink-0" strokeWidth={2.5} />
									)}
									<p className="text-lg font-semibold">
										{taux.Variation_Pts_Vs_S_1 >= 0 ? '+' : ''}{taux.Variation_Pts_Vs_S_1} pts vs S-1
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								{taux.Dernieres_4_Semaines.map((s) => (
									<div key={s.Label} className="flex flex-col items-center gap-2.5">
										<div
											className="w-16 h-16 rounded-full border-2 flex items-center justify-center bg-slate-700/60 border-blue-400/80 shadow-xl shadow-blue-500/20 ring-2 ring-blue-500/20"
										>
											<span className="text-white text-base font-bold tabular-nums">{s.Valeur ?? s.Valeur_MEUR ?? '-'}%</span>
										</div>
										<span className="text-gray-300 text-sm font-medium">{s.Label}</span>
									</div>
								))}
							</div>
						</div>
        <div className="flex-grow flex flex-col justify-center py-4">
          <div className="h-52 min-h-[220px] w-full relative pt-6 pb-4 pl-6 pr-16 overflow-visible bg-slate-800/30 rounded-lg border border-slate-700/50">
            <div
              className="absolute inset-0 pl-6 pr-16 flex flex-col justify-between z-0 pointer-events-none"
            >
              <div className="flex justify-between items-center text-gray-300 text-base font-semibold">
                <span className="w-10 shrink-0">100%</span>
                <hr className="flex-1 border-[1.5px] border-dashed border-slate-500 mx-4" />
              </div>
              <div className="relative flex justify-between items-center text-gray-300 text-base font-semibold">
                <span className="w-10 shrink-0">95%</span>
                <hr className="flex-1 border-[1.5px] border-dashed border-blue-400/70 mx-4" />
                <span className="absolute -right-14 top-1/2 -translate-y-1/2 flex items-center gap-2 px-2 py-1 rounded bg-slate-800/90 border border-blue-500/50">
                  <Target className="w-4 h-4 text-blue-400 shrink-0" strokeWidth={2.5} />
                  <span className="text-sm text-blue-300 font-semibold">target</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-300 text-base font-semibold">
                <span className="w-10 shrink-0">90%</span>
                <hr className="flex-1 border-[1.5px] border-dashed border-slate-500 mx-4" />
              </div>
              <div className="flex justify-between items-center text-gray-300 text-base font-semibold">
                <span className="w-10 shrink-0">85%</span>
                <hr className="flex-1 border-[1.5px] border-dashed border-slate-500 mx-4" />
              </div>
            </div>
            <svg
              className="w-full h-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 286 160"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.75 96L107.25 48L178.75 64L250.25 32"
                stroke="#EAB308"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="35.75" cy="96" fill="#EAB308" r="6" stroke="#fef08a" strokeWidth="2" />
              <circle cx="107.25" cy="48" fill="#EAB308" r="6" stroke="#fef08a" strokeWidth="2" />
              <circle cx="178.75" cy="64" fill="#EAB308" r="6" stroke="#fef08a" strokeWidth="2" />
              <circle cx="250.25" cy="32" fill="#EAB308" r="6" stroke="#fef08a" strokeWidth="2" />
              <line
                className="stroke-current text-primary"
                strokeDasharray="6 4"
                strokeWidth="2"
                x1="0"
                x2="286"
                y1="40"
                y2="40"
              />
            </svg>
            {/* Data point value labels - positioned above each point */}
            <div className="absolute inset-0 z-10 pointer-events-none flex justify-between px-6">
              {taux.Dernieres_4_Semaines.map((s) => (
                <div
                  key={s.Label}
                  className="flex flex-col items-center -mt-3"
                  style={{ width: '22%' }}
                >
                  <span className="px-3 py-1.5 rounded-lg text-sm font-bold text-yellow-300 bg-slate-800/95 border-2 border-slate-500 whitespace-nowrap shadow-xl">
                    {s.Valeur ?? s.Valeur_MEUR ?? '-'}%
                  </span>
                </div>
              ))}
            </div>
          </div>
						<div
							className="grid grid-cols-4 text-center mt-5 px-6"
						>
							{taux.Dernieres_4_Semaines.map((s) => (
								<div key={s.Label} className="flex flex-col items-center gap-2">
									<span className="font-bold text-base text-white">{s.Label}</span>
									<span className="text-gray-300 text-sm font-medium tabular-nums">
										{s.Valeur ?? s.Valeur_MEUR ?? '-'}%
									</span>
								</div>
							))}
						</div>
        </div>
					</div>
				</div>
			</main>
		)
	}

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-5">
        {/* Tab Selector */}
        <div className="mb-6 flex justify-end items-center">
          <div className="flex flex-wrap items-center gap-3">
            <PeriodSelector
              type={activeTab}
              period={period}
              year={year}
              onPeriodChange={setPeriod}
              onYearChange={setYear}
            />
            <TabSelector
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
              weeklyLabel="Hebdomadaires"
              monthlyLabel="Mensuel"
            />
          </div>
        </div>

        {/* Conditional Content Rendering */}
        {activeTab === "monthly" ? <MonthlyDashboard /> : <WeeklyDashboard />}
      </div>
    </div>
  )
}
