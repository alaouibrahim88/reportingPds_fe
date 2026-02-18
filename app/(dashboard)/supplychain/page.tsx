"use client"

import React, { useEffect, useState } from "react"
import { TabSelector } from "@/components/ui/TabSelector"

type TabType = "weekly" | "monthly"

// ─── Weekly interfaces ─────────────────────────────────────────────────────────

interface WeeklySerieItem {
	Label: string
	Semaine?: string
	Annee?: string
	Valeur: string
	Target: string
}

interface SuiviReclamationItem {
	Label: string
	Valeur: string
	Target: string
}

interface ReclamationsClients {
	Semaine_Actuelle?: string
	Annee?: string
	Valeur_Actuelle?: string
	Target_Actuelle?: string
	Valeur_Semaine_Precedente?: string
	Variation_Vs_Semaine_Precedente?: string
	Serie_4_Semaines?: WeeklySerieItem[]
	Suivi_Reclamations?: SuiviReclamationItem[]
}

interface IncidentZone {
	Zone: string
	Valeur: string
	Target: string
}

interface WeeklyIncidents {
	Semaine_Actuelle?: string
	Annee?: string
	Valeur_Actuelle?: string
	Target_Actuelle?: string
	Par_Zone?: Record<string, string>
	Incidents_Par_Zone?: IncidentZone[]
}

interface EfficienceGlobale {
	Semaine_Actuelle?: string
	Annee?: string
	Valeur_Actuelle?: string
	Target_Actuelle?: string
	Valeur_Semaine_Precedente?: string
	Variation_Vs_Semaine_Precedente?: string
	Serie_4_Semaines?: WeeklySerieItem[]
}

interface EfficienceParZone {
	Semaine_Actuelle?: string
	Annee?: string
	Zones?: Record<string, string>
}

interface WeeklyApiData {
	Reclamations_Clients?: ReclamationsClients
	Incidents?: WeeklyIncidents
	Efficience_Globale?: EfficienceGlobale
	Efficience_Par_Zone?: EfficienceParZone
}

// ─── Monthly interfaces ────────────────────────────────────────────────────────

interface MoisSerieItem {
	Label: string
	Mois?: string
	Annee?: string
	Valeur: string
	Target: string
	Jours_Perdus?: string | null
}

interface PPMScrapClient {
	PPM_Mois_Courant?: string
	Target_PPM_Mois_Courant?: string
	Variation_PPM_Vs_Mois_Precedent?: string
	Scrap_Mois_Courant?: string
	Target_Scrap_Mois_Courant?: string
	Variation_Scrap_Vs_Mois_Precedent?: string
	Suivi_PPM_4_Mois?: MoisSerieItem[]
	Suivi_Scrap_4_Mois?: MoisSerieItem[]
}

interface AuditMetric {
	Valeur_Mois_Courant?: string
	Valeur_Mois_Precedent?: string
	Variation_Vs_Mois_Precedent?: string
}

interface TauxConformiteAudits {
	Completion?: AuditMetric
	Compliance?: AuditMetric
}

interface ClientScore {
	Client: string
	Valeur: string
	Target: string
}

interface ScorecardsClients {
	Score_Global?: string
	Clients?: ClientScore[]
}

interface IncidentsAccidentsTravail {
	Valeur_Mois_Courant?: string
	Target_Mois_Courant?: string
	Variation_Vs_Mois_Precedent?: string
	Serie_4_Mois?: MoisSerieItem[]
}

interface EfficienceMensuelle {
	Valeur_Mois_Courant?: string
	Target_Mois_Courant?: string
	Variation_Vs_Mois_Precedent?: string
	Variation_Vs_Target?: string
	Suivi_4_Mois?: MoisSerieItem[]
}

interface MonthlyApiData {
	PPM_Scrap_Client?: PPMScrapClient
	Taux_Conformite_Audits?: TauxConformiteAudits
	Scorecards_Clients?: ScorecardsClients
	Incidents_Accidents_Travail?: IncidentsAccidentsTravail
	Efficience_Mensuelle?: EfficienceMensuelle
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function n(value: string | number | undefined | null, fallback = 0): number {
	const parsed = Number(value)
	return Number.isFinite(parsed) ? parsed : fallback
}

function fmt(value: number, decimals = 2): string {
	return value.toFixed(decimals)
}

function signed(value: number, decimals = 2): string {
	const sign = value > 0 ? "+" : ""
	return `${sign}${value.toFixed(decimals)}`
}

function trendIcon(variation: number): string {
	return variation >= 0 ? "arrow_upward" : "arrow_downward"
}

function trendColor(variation: number, lowerIsBetter = false): string {
	const isGood = lowerIsBetter ? variation <= 0 : variation >= 0
	return isGood ? "text-blue-500" : "text-red-500"
}

function bubbleColor(
	value: number,
	target: number,
	lowerIsBetter = false,
): string {
	const isGood = lowerIsBetter ? value <= target : value >= target
	return isGood
		? "bg-blue-500/20 text-blue-500"
		: "bg-yellow-500/20 text-yellow-500"
}

function getZoneEntries(
	zones: Record<string, string> | undefined,
): Array<{ zone: string; value: number; target: number }> {
	if (!zones) {
		return []
	}
	return Object.keys(zones)
		.filter((k) => !k.startsWith("Target_"))
		.map((zone) => ({
			zone,
			value: n(zones[zone]),
			target: n(zones[`Target_${zone}`]),
		}))
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupplyChainPage() {
	const [activeTab, setActiveTab] = useState<TabType>("weekly")
	const [weeklyData, setWeeklyData] = useState<WeeklyApiData | null>(null)
	const [monthlyData, setMonthlyData] = useState<MonthlyApiData | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			try {
				const res = await fetch(`/api/supplychain?type=${activeTab}`, {
					cache: "no-store",
				})
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				const json = await res.json()
				const finalData = json?.data?.data ?? json?.data ?? json
				if (activeTab === "weekly") {
					setWeeklyData(finalData || null)
				} else {
					setMonthlyData(finalData || null)
				}
			} catch (error) {
				console.error("Error fetching supply chain data:", error)
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
	}, [activeTab])

	if (loading) {
		return (
			<main className="flex-1 overflow-hidden bg-slate-900">
				<div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
					<div className="text-white text-lg">Chargement des données...</div>
				</div>
			</main>
		)
	}

	// ── Weekly derived data ──────────────────────────────────────────────────
	const reclamations = weeklyData?.Reclamations_Clients
	const incidents = weeklyData?.Incidents
	const effGlobale = weeklyData?.Efficience_Globale
	const effParZone = weeklyData?.Efficience_Par_Zone
	const zoneEntries = getZoneEntries(effParZone?.Zones)

	const weeklySubtitle = effGlobale?.Semaine_Actuelle
		? `Semaine ${effGlobale.Semaine_Actuelle} · ${effGlobale.Annee}`
		: reclamations?.Semaine_Actuelle
			? `Semaine ${reclamations.Semaine_Actuelle} · ${reclamations.Annee}`
			: "Données hebdomadaires"

	// ── Monthly derived data ─────────────────────────────────────────────────
	const ppmScrap = monthlyData?.PPM_Scrap_Client
	const audits = monthlyData?.Taux_Conformite_Audits
	const scorecards = monthlyData?.Scorecards_Clients
	const accidents = monthlyData?.Incidents_Accidents_Travail
	const effMensuelle = monthlyData?.Efficience_Mensuelle

	// ── Weekly view ──────────────────────────────────────────────────────────
	const WeeklyView = () => (
		<div className="flex flex-col gap-6">

			{/* Row 1 – Réclamations + Incidents */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

				{/* Réclamations Clients */}
				{reclamations && (
					<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
						<div className="flex items-start justify-between">
							<p className="text-base font-bold text-white">
								Réclamations Clients
							</p>
							<span className="material-symbols-outlined text-gray-400">
								feedback
							</span>
						</div>

						{/* KPI hero */}
						<div className="flex flex-wrap items-end gap-3">
							<p className="text-5xl font-extrabold tracking-tighter text-white">
								{reclamations.Valeur_Actuelle ?? "—"}
							</p>
							<div className="flex flex-col pb-1 gap-0.5">
								<p className="text-xs text-gray-400">
									Target:{" "}
									<span className="font-bold text-blue-500">
										{reclamations.Target_Actuelle ?? "—"}
									</span>
								</p>
								<div className="flex items-center gap-1">
									<span
										className={`material-symbols-outlined text-xs leading-none ${trendColor(
											n(reclamations.Variation_Vs_Semaine_Precedente),
											true,
										)}`}
									>
										{trendIcon(
											n(reclamations.Variation_Vs_Semaine_Precedente),
										)}
									</span>
									<p
										className={`text-sm font-bold ${trendColor(
											n(reclamations.Variation_Vs_Semaine_Precedente),
											true,
										)}`}
									>
										{signed(
											n(reclamations.Variation_Vs_Semaine_Precedente),
											0,
										)}
									</p>
									<p className="text-xs text-gray-400">vs S-1</p>
								</div>
							</div>
						</div>

						{/* Suivi semaines */}
						{reclamations.Suivi_Reclamations &&
							reclamations.Suivi_Reclamations.length > 0 && (
								<div className="flex items-end justify-around gap-2 pt-2">
									{reclamations.Suivi_Reclamations.map((item, idx) => {
										const val = n(item.Valeur)
										const target = n(item.Target)
										return (
											<div
												key={`recl-${item.Label}-${idx}`}
												className="flex flex-col items-center gap-1"
											>
												<div
													className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${bubbleColor(
														val,
														target,
														true,
													)}`}
												>
													{val.toFixed(0)}
												</div>
												<p className="text-xs text-gray-400">{item.Label}</p>
											</div>
										)
									})}
								</div>
							)}
					</div>
				)}

				{/* Incidents */}
				{incidents && (
					<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
						<div className="flex items-start justify-between">
							<p className="text-base font-bold text-white">Incidents</p>
							<span className="material-symbols-outlined text-gray-400">
								warning
							</span>
						</div>

						{/* KPI hero */}
						<div className="flex flex-wrap items-end gap-3">
							<p className="text-5xl font-extrabold tracking-tighter text-white">
								{incidents.Valeur_Actuelle ?? "—"}
							</p>
							<p className="pb-1 text-xs text-gray-400">
								Target:{" "}
								<span className="font-bold text-blue-500">
									{incidents.Target_Actuelle ?? "—"}
								</span>
							</p>
						</div>

						{/* Par zone bars */}
						{incidents.Incidents_Par_Zone &&
							incidents.Incidents_Par_Zone.length > 0 && (
								<div className="flex flex-col gap-2 pt-2">
									{incidents.Incidents_Par_Zone.map((zone) => {
										const val = n(zone.Valeur)
										const target = n(zone.Target)
										const maxVal = Math.max(
											...incidents.Incidents_Par_Zone!.map((z) =>
												n(z.Valeur),
											),
											1,
										)
										const pct = Math.round((val / maxVal) * 100)
										const isOk = val <= target
										return (
											<div
												key={zone.Zone}
												className="flex items-center gap-2"
											>
												<p className="w-20 shrink-0 text-xs font-semibold text-gray-400">
													{zone.Zone}
												</p>
												<div className="relative h-6 w-full overflow-hidden rounded bg-gray-700">
													<div
														className={`h-full rounded ${
															isOk ? "bg-blue-500" : "bg-red-500"
														}`}
														style={{ width: `${pct}%` }}
													/>
													<span className="absolute inset-0 flex items-center px-2 text-xs font-bold text-white">
														{val.toFixed(0)}
													</span>
												</div>
												<p className="w-12 shrink-0 text-right text-xs text-gray-500">
													/{target.toFixed(0)}
												</p>
											</div>
										)
									})}
								</div>
							)}
					</div>
				)}
			</div>

			{/* Row 2 – Efficience Globale */}
			{effGlobale && (
				<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
					<div className="flex items-start justify-between">
						<p className="text-base font-bold text-white">
							Efficience Globale
						</p>
						<span className="material-symbols-outlined text-gray-400">
							speed
						</span>
					</div>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
						{/* Left – hero value */}
						<div className="flex flex-col gap-3 lg:col-span-2">
							<p className="text-6xl font-extrabold tracking-tighter text-white">
								{fmt(n(effGlobale.Valeur_Actuelle), 1)}%
							</p>
							<div className="flex items-baseline gap-2">
								<p className="text-sm text-gray-400">Target:</p>
								<p className="text-xl font-bold text-blue-500">
									{fmt(n(effGlobale.Target_Actuelle), 0)}%
								</p>
							</div>
							{effGlobale.Variation_Vs_Semaine_Precedente !== undefined && (
								<div className="flex items-center gap-1">
									<span
										className={`material-symbols-outlined text-sm ${trendColor(
											n(effGlobale.Variation_Vs_Semaine_Precedente),
										)}`}
									>
										{trendIcon(n(effGlobale.Variation_Vs_Semaine_Precedente))}
									</span>
									<p
										className={`text-lg font-bold ${trendColor(
											n(effGlobale.Variation_Vs_Semaine_Precedente),
										)}`}
									>
										{signed(n(effGlobale.Variation_Vs_Semaine_Precedente))} pts
									</p>
									<p className="text-xs text-gray-400">vs S-1</p>
								</div>
							)}
						</div>

						{/* Right – 4-week bubbles */}
						{effGlobale.Serie_4_Semaines &&
							effGlobale.Serie_4_Semaines.length > 0 && (
								<div className="flex items-end justify-around gap-3 lg:col-span-3">
									{effGlobale.Serie_4_Semaines.map((item, idx) => {
										const val = n(item.Valeur)
										const target = n(item.Target)
										return (
											<div
												key={`eff-glob-${item.Label}-${idx}`}
												className="flex flex-col items-center gap-1"
											>
												<div
													className={`flex h-20 w-20 items-center justify-center rounded-full text-base font-bold ${bubbleColor(
														val,
														target,
													)}`}
												>
													{fmt(val, 1)}%
												</div>
												<p className="text-xs text-gray-400">{item.Label}</p>
											</div>
										)
									})}
								</div>
							)}
					</div>
				</div>
			)}

			{/* Row 3 – Efficience Par Zone */}
			{zoneEntries.length > 0 && (
				<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
					<div className="flex items-start justify-between">
						<p className="text-base font-bold text-white">
							Efficience Par Zone
						</p>
						<span className="material-symbols-outlined text-gray-400">
							grid_view
						</span>
					</div>

					<div className="flex flex-col gap-3">
						{zoneEntries.map(({ zone, value, target }) => {
							const isOk = value >= target
							return (
								<div key={zone} className="flex items-center gap-3">
									<p className="w-28 shrink-0 text-sm font-semibold text-gray-400">
										{zone}
									</p>
									<div className="relative h-8 w-full overflow-hidden rounded bg-gray-700">
										<div
											className={`h-full rounded transition-all ${
												isOk ? "bg-blue-500" : "bg-yellow-500"
											}`}
											style={{
												width: `${Math.max(0, Math.min(100, value))}%`,
											}}
										/>
										<span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
											{fmt(value, 1)}%
										</span>
									</div>
									<p className="w-16 shrink-0 text-right text-xs text-gray-500">
										T: {fmt(target, 0)}%
									</p>
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)

	// ── Monthly view ─────────────────────────────────────────────────────────
	const MonthlyView = () => (
		<div className="flex flex-col gap-6">

			{/* PPM & Scrap Client */}
			{ppmScrap && (
				<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
					<div className="flex items-start justify-between">
						<p className="text-base font-bold text-white">PPM & Scrap Client</p>
						<span className="material-symbols-outlined text-gray-400">
							analytics
						</span>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{/* PPM */}
						<div className="flex flex-col gap-3">
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
								PPM
							</p>
							<p className="text-5xl font-extrabold tracking-tighter text-white">
								{fmt(n(ppmScrap.PPM_Mois_Courant))}
							</p>
							<div className="flex items-center gap-1">
								<span
									className={`material-symbols-outlined text-xs ${trendColor(
										n(ppmScrap.Variation_PPM_Vs_Mois_Precedent),
										true,
									)}`}
								>
									{trendIcon(n(ppmScrap.Variation_PPM_Vs_Mois_Precedent))}
								</span>
								<p
									className={`text-sm font-bold ${trendColor(
										n(ppmScrap.Variation_PPM_Vs_Mois_Precedent),
										true,
									)}`}
								>
									{signed(n(ppmScrap.Variation_PPM_Vs_Mois_Precedent))}
								</p>
								<p className="text-xs text-gray-400">
									vs M-1 · Target: {ppmScrap.Target_PPM_Mois_Courant}
								</p>
							</div>
							{ppmScrap.Suivi_PPM_4_Mois &&
								ppmScrap.Suivi_PPM_4_Mois.length > 0 && (
									<div className="flex items-end gap-3 pt-1">
										{ppmScrap.Suivi_PPM_4_Mois.map((item, idx) => {
											const val = n(item.Valeur)
											const target = n(item.Target)
											return (
												<div
													key={`ppm-${item.Label}-${idx}`}
													className="flex flex-col items-center gap-1"
												>
													<div
														className={`flex h-14 w-14 items-center justify-center rounded-full text-xs font-bold ${bubbleColor(
															val,
															target,
															true,
														)}`}
													>
														{fmt(val, 0)}
													</div>
													<p className="text-xs text-gray-400">{item.Label}</p>
												</div>
											)
										})}
									</div>
								)}
						</div>

						{/* Scrap */}
						<div className="flex flex-col gap-3">
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
								Scrap
							</p>
							<p className="text-5xl font-extrabold tracking-tighter text-white">
								{Number(ppmScrap.Scrap_Mois_Courant).toLocaleString()}
							</p>
							<div className="flex items-center gap-1">
								<span
									className={`material-symbols-outlined text-xs ${trendColor(
										n(ppmScrap.Variation_Scrap_Vs_Mois_Precedent),
										true,
									)}`}
								>
									{trendIcon(n(ppmScrap.Variation_Scrap_Vs_Mois_Precedent))}
								</span>
								<p
									className={`text-sm font-bold ${trendColor(
										n(ppmScrap.Variation_Scrap_Vs_Mois_Precedent),
										true,
									)}`}
								>
									{signed(n(ppmScrap.Variation_Scrap_Vs_Mois_Precedent), 0)}
								</p>
								<p className="text-xs text-gray-400">
									vs M-1 · Target:{" "}
									{Number(
										ppmScrap.Target_Scrap_Mois_Courant,
									).toLocaleString()}
								</p>
							</div>
							{ppmScrap.Suivi_Scrap_4_Mois &&
								ppmScrap.Suivi_Scrap_4_Mois.length > 0 && (
									<div className="flex items-end gap-3 pt-1">
										{ppmScrap.Suivi_Scrap_4_Mois.map((item, idx) => {
											const val = n(item.Valeur)
											const target = n(item.Target)
											return (
												<div
													key={`scrap-${item.Label}-${idx}`}
													className="flex flex-col items-center gap-1"
												>
													<div
														className={`flex h-14 w-14 items-center justify-center rounded-full text-xs font-bold ${bubbleColor(
															val,
															target,
															true,
														)}`}
													>
														{(val / 1000).toFixed(1)}k
													</div>
													<p className="text-xs text-gray-400">{item.Label}</p>
												</div>
											)
										})}
									</div>
								)}
						</div>
					</div>
				</div>
			)}

			{/* Row 2 – Taux Conformité Audits + Incidents Accidents */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

				{/* Taux Conformité Audits */}
				{audits && (
					<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
						<div className="flex items-start justify-between">
							<p className="text-base font-bold text-white">
								Taux Conformité Audits
							</p>
							<span className="material-symbols-outlined text-gray-400">
								fact_check
							</span>
						</div>

						<div className="grid grid-cols-2 gap-6">
							{/* Completion */}
							{audits.Completion && (
								<div className="flex flex-col gap-2">
									<p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
										Complétion
									</p>
									<p className="text-4xl font-extrabold tracking-tighter text-white">
										{fmt(n(audits.Completion.Valeur_Mois_Courant), 1)}%
									</p>
									<div className="flex items-center gap-1">
										<span
											className={`material-symbols-outlined text-xs ${trendColor(
												n(audits.Completion.Variation_Vs_Mois_Precedent),
											)}`}
										>
											{trendIcon(
												n(audits.Completion.Variation_Vs_Mois_Precedent),
											)}
										</span>
										<p
											className={`text-sm font-bold ${trendColor(
												n(audits.Completion.Variation_Vs_Mois_Precedent),
											)}`}
										>
											{signed(
												n(audits.Completion.Variation_Vs_Mois_Precedent),
											)}
										</p>
										<p className="text-xs text-gray-400">vs M-1</p>
									</div>
									<div className="h-2 w-full overflow-hidden rounded bg-gray-700">
										<div
											className="h-full rounded bg-blue-500"
											style={{
												width: `${Math.min(100, n(audits.Completion.Valeur_Mois_Courant))}%`,
											}}
										/>
									</div>
								</div>
							)}

							{/* Compliance */}
							{audits.Compliance && (
								<div className="flex flex-col gap-2">
									<p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
										Conformité
									</p>
									<p className="text-4xl font-extrabold tracking-tighter text-white">
										{fmt(n(audits.Compliance.Valeur_Mois_Courant), 1)}%
									</p>
									<div className="flex items-center gap-1">
										<span
											className={`material-symbols-outlined text-xs ${trendColor(
												n(audits.Compliance.Variation_Vs_Mois_Precedent),
											)}`}
										>
											{trendIcon(
												n(audits.Compliance.Variation_Vs_Mois_Precedent),
											)}
										</span>
										<p
											className={`text-sm font-bold ${trendColor(
												n(audits.Compliance.Variation_Vs_Mois_Precedent),
											)}`}
										>
											{signed(
												n(audits.Compliance.Variation_Vs_Mois_Precedent),
											)}
										</p>
										<p className="text-xs text-gray-400">vs M-1</p>
									</div>
									<div className="h-2 w-full overflow-hidden rounded bg-gray-700">
										<div
											className="h-full rounded bg-blue-500"
											style={{
												width: `${Math.min(100, n(audits.Compliance.Valeur_Mois_Courant))}%`,
											}}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Incidents & Accidents Travail */}
				{accidents && (
					<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
						<div className="flex items-start justify-between">
							<p className="text-base font-bold text-white">
								Incidents & Accidents Travail
							</p>
							<span className="material-symbols-outlined text-gray-400">
								health_and_safety
							</span>
						</div>

						<div className="flex flex-wrap items-end gap-4">
							<p
								className={`text-5xl font-extrabold tracking-tighter ${
									n(accidents.Valeur_Mois_Courant) >
									n(accidents.Target_Mois_Courant)
										? "text-red-500"
										: "text-blue-500"
								}`}
							>
								{accidents.Valeur_Mois_Courant ?? "—"}
							</p>
							<div className="flex flex-col pb-1 gap-0.5">
								<p className="text-xs text-gray-400">
									Target:{" "}
									<span className="font-bold text-white">
										{accidents.Target_Mois_Courant ?? "—"}
									</span>
								</p>
								<div className="flex items-center gap-1">
									<span
										className={`material-symbols-outlined text-xs ${trendColor(
											n(accidents.Variation_Vs_Mois_Precedent),
											true,
										)}`}
									>
										{trendIcon(n(accidents.Variation_Vs_Mois_Precedent))}
									</span>
									<p
										className={`text-sm font-bold ${trendColor(
											n(accidents.Variation_Vs_Mois_Precedent),
											true,
										)}`}
									>
										{signed(n(accidents.Variation_Vs_Mois_Precedent), 0)}
									</p>
									<p className="text-xs text-gray-400">vs M-1</p>
								</div>
							</div>
						</div>

						{accidents.Serie_4_Mois && accidents.Serie_4_Mois.length > 0 && (
							<div className="flex items-end gap-4 pt-1">
								{accidents.Serie_4_Mois.map((item, idx) => {
									const val = n(item.Valeur)
									const target = n(item.Target)
									return (
										<div
											key={`acc-${item.Label}-${idx}`}
											className="flex flex-col items-center gap-1"
										>
											<div
												className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold ${bubbleColor(
													val,
													target,
													true,
												)}`}
											>
												{val.toFixed(0)}
											</div>
											<p className="text-xs text-gray-400">{item.Label}</p>
										</div>
									)
								})}
							</div>
						)}
					</div>
				)}
			</div>

			{/* Scorecards Clients */}
			{scorecards && (
				<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
					<div className="flex items-start justify-between">
						<p className="text-base font-bold text-white">
							Scorecards Clients
						</p>
						<span className="material-symbols-outlined text-gray-400">
							leaderboard
						</span>
					</div>

					<div className="flex items-baseline gap-3">
						<p className="text-5xl font-extrabold tracking-tighter text-white">
							{fmt(n(scorecards.Score_Global), 1)}%
						</p>
						<p className="text-sm text-gray-400">Score global</p>
					</div>

					{scorecards.Clients && scorecards.Clients.length > 0 && (
						<div className="flex flex-col gap-3">
							{scorecards.Clients.map((client) => {
								const val = n(client.Valeur)
								const target = n(client.Target)
								const isOk = val >= target
								return (
									<div
										key={client.Client}
										className="flex items-center gap-3"
									>
										<p className="w-32 shrink-0 truncate text-sm font-semibold text-gray-400">
											{client.Client}
										</p>
										<div className="relative h-7 w-full overflow-hidden rounded bg-gray-700">
											<div
												className={`h-full rounded ${
													isOk ? "bg-blue-500" : "bg-yellow-500"
												}`}
												style={{
													width: `${Math.max(0, Math.min(100, val))}%`,
												}}
											/>
											<span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
												{fmt(val, 1)}%
											</span>
										</div>
										<p className="w-16 shrink-0 text-right text-xs text-gray-500">
											T: {fmt(target, 0)}%
										</p>
									</div>
								)
							})}
						</div>
					)}
				</div>
			)}

			{/* Efficience Mensuelle */}
			{effMensuelle && (
				<div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-gray-900 p-5 md:p-6">
					<div className="flex items-start justify-between">
						<p className="text-base font-bold text-white">
							Efficience Mensuelle
						</p>
						<span className="material-symbols-outlined text-gray-400">
							speed
						</span>
					</div>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
						{/* Left – hero + variations */}
						<div className="flex flex-col gap-3 lg:col-span-2">
							<p className="text-6xl font-extrabold tracking-tighter text-white">
								{fmt(n(effMensuelle.Valeur_Mois_Courant), 1)}%
							</p>
							<div className="flex items-baseline gap-2">
								<p className="text-sm text-gray-400">Target:</p>
								<p className="text-xl font-bold text-blue-500">
									{fmt(n(effMensuelle.Target_Mois_Courant), 0)}%
								</p>
							</div>
							<div className="flex flex-col gap-1">
								<div className="flex items-center gap-1">
									<span
										className={`material-symbols-outlined text-xs ${trendColor(
											n(effMensuelle.Variation_Vs_Mois_Precedent),
										)}`}
									>
										{trendIcon(n(effMensuelle.Variation_Vs_Mois_Precedent))}
									</span>
									<p
										className={`text-sm font-bold ${trendColor(
											n(effMensuelle.Variation_Vs_Mois_Precedent),
										)}`}
									>
										{signed(n(effMensuelle.Variation_Vs_Mois_Precedent))} pts
									</p>
									<p className="text-xs text-gray-400">vs M-1</p>
								</div>
								<div className="flex items-center gap-1">
									<span
										className={`material-symbols-outlined text-xs ${trendColor(
											n(effMensuelle.Variation_Vs_Target),
										)}`}
									>
										{trendIcon(n(effMensuelle.Variation_Vs_Target))}
									</span>
									<p
										className={`text-sm font-bold ${trendColor(
											n(effMensuelle.Variation_Vs_Target),
										)}`}
									>
										{signed(n(effMensuelle.Variation_Vs_Target))} pts
									</p>
									<p className="text-xs text-gray-400">vs target</p>
								</div>
							</div>
						</div>

						{/* Right – 4-month bubbles */}
						{effMensuelle.Suivi_4_Mois &&
							effMensuelle.Suivi_4_Mois.length > 0 && (
								<div className="flex items-end justify-around gap-3 lg:col-span-3">
									{effMensuelle.Suivi_4_Mois.map((item, idx) => {
										const val = n(item.Valeur)
										const target = n(item.Target)
										return (
											<div
												key={`eff-m-${item.Label}-${idx}`}
												className="flex flex-col items-center gap-1"
											>
												<div
													className={`flex h-20 w-20 items-center justify-center rounded-full text-base font-bold ${bubbleColor(
														val,
														target,
													)}`}
												>
													{fmt(val, 1)}%
												</div>
												<p className="text-xs text-gray-400">{item.Label}</p>
											</div>
										)
									})}
								</div>
							)}
					</div>
				</div>
			)}
		</div>
	)

	return (
		<main className="flex-1 overflow-hidden bg-slate-900">
			<div className="p-4 sm:p-6 lg:p-8">
				<div className="flex w-full flex-col gap-6">
					{/* Header */}
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div className="flex flex-col gap-1">
							<h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white">
								Supply Chain –{" "}
								{activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
							</h1>
							<p className="text-sm md:text-base font-normal text-gray-400">
								{activeTab === "monthly" ? "Données mensuelles" : weeklySubtitle}
							</p>
						</div>
						<TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
					</div>

					{/* Content */}
					{activeTab === "monthly" ? <MonthlyView /> : <WeeklyView />}
				</div>
			</div>
		</main>
	)
}
