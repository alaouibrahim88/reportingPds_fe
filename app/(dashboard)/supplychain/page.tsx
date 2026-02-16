"use client"

import React, { useEffect, useState } from "react"
import { TabSelector } from "@/components/ui/TabSelector"

type TabType = "weekly" | "monthly"

interface HistoryWeekItem {
	Label: string
	Annee: number
	Semaine: number
	Valeur: number
}

interface WeeklyKpi {
	Valeur_Semaine: number
	Variation_Pts_Vs_S_1: number
	Historique_5_Semaines: HistoryWeekItem[]
}

interface WeeklyInventoryData {
	Taux_Service_Client_OTIF: WeeklyKpi
	Taux_Service_Fournisseurs_OTIF: WeeklyKpi
	Fiabilite_Client: WeeklyKpi
}

interface WeeklyApiResponse {
	Inventory_Semaine?: WeeklyInventoryData
}

interface HistoryMonthItem {
	Label: string
	Annee: number
	Mois: number
	Valeur: number
}

interface MonthlyInventoryData {
	Error?: string
	Annee?: number
	Mois?: number
	[key: string]: unknown
}

interface MonthlyApiResponse {
	Inventory_Mois?: MonthlyInventoryData
}

const MONTH_LABELS = [
	"Jan",
	"Fév",
	"Mar",
	"Avr",
	"Mai",
	"Jun",
	"Jul",
	"Aoû",
	"Sep",
	"Oct",
	"Nov",
	"Déc",
]

const MONTH_LABELS_LONG = [
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre",
]

const DEFAULT_CLIENT_OTIF: WeeklyKpi = {
	Valeur_Semaine: 96,
	Variation_Pts_Vs_S_1: 1,
	Historique_5_Semaines: [
		{ Label: "W1", Annee: 2026, Semaine: 1, Valeur: 95 },
		{ Label: "W2", Annee: 2026, Semaine: 2, Valeur: 97 },
		{ Label: "W3", Annee: 2026, Semaine: 3, Valeur: 96 },
		{ Label: "W4", Annee: 2026, Semaine: 4, Valeur: 98 },
		{ Label: "W5", Annee: 2026, Semaine: 5, Valeur: 97 },
	],
}

const DEFAULT_SUPPLIERS_OTIF: WeeklyKpi = {
	Valeur_Semaine: 96,
	Variation_Pts_Vs_S_1: -0.5,
	Historique_5_Semaines: [
		{ Label: "W1", Annee: 2026, Semaine: 1, Valeur: 94 },
		{ Label: "W2", Annee: 2026, Semaine: 2, Valeur: 95 },
		{ Label: "W3", Annee: 2026, Semaine: 3, Valeur: 93 },
		{ Label: "W4", Annee: 2026, Semaine: 4, Valeur: 97 },
		{ Label: "W5", Annee: 2026, Semaine: 5, Valeur: 96 },
	],
}

const DEFAULT_CLIENT_RELIABILITY: WeeklyKpi = {
	Valeur_Semaine: 94,
	Variation_Pts_Vs_S_1: 0,
	Historique_5_Semaines: [
		{ Label: "W1", Annee: 2026, Semaine: 1, Valeur: 92 },
		{ Label: "W2", Annee: 2026, Semaine: 2, Valeur: 95 },
		{ Label: "W3", Annee: 2026, Semaine: 3, Valeur: 88 },
		{ Label: "W4", Annee: 2026, Semaine: 4, Valeur: 94 },
		{ Label: "W5", Annee: 2026, Semaine: 5, Valeur: 94 },
	],
}

const DEFAULT_ROTATION_HISTORY: HistoryMonthItem[] = [
	{ Label: "Avril", Annee: 2025, Mois: 4, Valeur: 21 },
	{ Label: "Mars", Annee: 2025, Mois: 3, Valeur: 19 },
	{ Label: "Fév", Annee: 2025, Mois: 2, Valeur: 24 },
	{ Label: "Jan", Annee: 2025, Mois: 1, Valeur: 20 },
	{ Label: "Déc", Annee: 2024, Mois: 12, Valeur: 23 },
]

const DEFAULT_STOCK_RELIABILITY_HISTORY: HistoryMonthItem[] = [
	{ Label: "Avril", Annee: 2025, Mois: 4, Valeur: 93 },
	{ Label: "Mars", Annee: 2025, Mois: 3, Valeur: 96 },
	{ Label: "Fév", Annee: 2025, Mois: 2, Valeur: 93 },
	{ Label: "Jan", Annee: 2025, Mois: 1, Valeur: 95 },
	{ Label: "Déc", Annee: 2024, Mois: 12, Valeur: 94 },
]

const DEFAULT_LOGISTIC_COST_HISTORY: HistoryMonthItem[] = [
	{ Label: "Avril", Annee: 2025, Mois: 4, Valeur: 1.26 },
	{ Label: "Mars", Annee: 2025, Mois: 3, Valeur: 1.31 },
	{ Label: "Fév", Annee: 2025, Mois: 2, Valeur: 1.29 },
	{ Label: "Jan", Annee: 2025, Mois: 1, Valeur: 1.18 },
	{ Label: "Déc", Annee: 2024, Mois: 12, Valeur: 1.15 },
]

const DEFAULT_WAREHOUSE_RELIABILITY = [
	{ label: "Warehouse A", value: 98 },
	{ label: "Warehouse B", value: 91 },
	{ label: "Warehouse C", value: 96 },
]

function toNumber(value: unknown, fallback = 0): number {
	const parsed = Number(value)
	return Number.isFinite(parsed) ? parsed : fallback
}

function getMonthLabel(month?: number): string {
	if (!month || month < 1 || month > 12) {
		return "Mai"
	}
	return MONTH_LABELS[month - 1]
}

function getLongMonthLabel(month?: number): string {
	if (!month || month < 1 || month > 12) {
		return "Mai"
	}
	return MONTH_LABELS_LONG[month - 1]
}

function asRecord(value: unknown): Record<string, unknown> | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return null
	}
	return value as Record<string, unknown>
}

function getIndicator(
	source: MonthlyInventoryData | null,
	keys: string[],
): Record<string, unknown> | null {
	if (!source) {
		return null
	}
	for (const key of keys) {
		const record = asRecord(source[key])
		if (record) {
			return record
		}
	}
	return null
}

function getFirstNumber(
	source: Record<string, unknown> | null,
	keys: string[],
	fallback: number,
): number {
	if (!source) {
		return fallback
	}
	for (const key of keys) {
		const value = source[key]
		const parsed = Number(value)
		if (Number.isFinite(parsed)) {
			return parsed
		}
	}
	return fallback
}

function getFirstArray(
	source: Record<string, unknown> | null,
	keys: string[],
): unknown[] {
	if (!source) {
		return []
	}
	for (const key of keys) {
		const value = source[key]
		if (Array.isArray(value)) {
			return value
		}
	}
	return []
}

function normalizeMonthlyHistory(
	values: unknown[],
	fallback: HistoryMonthItem[],
): HistoryMonthItem[] {
	const normalized = values
		.map((value, index) => {
			const item = asRecord(value)
			if (!item) {
				return null
			}

			const month = toNumber(
				item.Mois ?? item.Month ?? fallback[index]?.Mois,
				fallback[index]?.Mois || 1,
			)
			const labelValue = item.Label ?? item.Libelle ?? item.Nom_Mois
			const label =
				typeof labelValue === "string" && labelValue.trim()
					? labelValue
					: getLongMonthLabel(month)

			return {
				Label: label,
				Annee: toNumber(item.Annee ?? item.Year ?? fallback[index]?.Annee, 2025),
				Mois: month,
				Valeur: toNumber(
					item.Valeur ?? item.Value ?? fallback[index]?.Valeur,
					fallback[index]?.Valeur || 0,
				),
			}
		})
		.filter((item): item is HistoryMonthItem => item !== null)

	const source =
		normalized.length > 0 ? normalized.slice(0, 5) : fallback.slice(0, 5)
	const output = [...source]
	while (output.length < 5) {
		output.push(fallback[output.length] || fallback[fallback.length - 1])
	}
	return output
}

function getMonthlyPointColor(value: number, target: number): string {
	return value <= target ? "bg-blue-500/10 text-blue-500" : "bg-yellow-500/10 text-yellow-500"
}

function getMonthlyCostPointColor(value: number, target: number): string {
	return value <= target ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
}

function formatCurrencyMillions(value: number): string {
	return `€${value.toFixed(2)}M`
}

function buildMiniSparklinePoints(values: number[]): string[] {
	const xPositions = [5, 28.75, 52.5, 76.25, 100]
	const min = Math.min(...values)
	const max = Math.max(...values)

	return values.map((value, index) => {
		let y = 20
		if (max !== min) {
			y = 30 - ((value - min) / (max - min)) * 20
		}
		const clampedY = Math.max(10, Math.min(30, y))
		return `${xPositions[index]},${clampedY}`
	})
}

function joinSparklinePoints(points: string[]): string {
	return points.join(" ")
}

function getWarehouseReliability(
	source: Record<string, unknown> | null,
): Array<{ label: string; value: number }> {
	if (!source) {
		return DEFAULT_WAREHOUSE_RELIABILITY
	}

	const fromArray = getFirstArray(source, [
		"Par_Entrepot",
		"Par_Warehouse",
		"Warehouses",
		"Historique_Entrepots",
	])
		.map((item) => {
			const row = asRecord(item)
			if (!row) {
				return null
			}
			const label = row.Label ?? row.Warehouse ?? row.Entrepot
			const value = toNumber(row.Valeur ?? row.Value, NaN)
			if (typeof label !== "string" || !Number.isFinite(value)) {
				return null
			}
			return { label, value }
		})
		.filter((item): item is { label: string; value: number } => item !== null)

	if (fromArray.length >= 3) {
		return fromArray.slice(0, 3)
	}

	return [
		{
			label: "Warehouse A",
			value: getFirstNumber(source, ["Warehouse_A", "Entrepot_A"], 98),
		},
		{
			label: "Warehouse B",
			value: getFirstNumber(source, ["Warehouse_B", "Entrepot_B"], 91),
		},
		{
			label: "Warehouse C",
			value: getFirstNumber(source, ["Warehouse_C", "Entrepot_C"], 96),
		},
	]
}

function resolveWeeklyInventory(
	data: WeeklyApiResponse | WeeklyInventoryData | null,
): WeeklyInventoryData | null {
	if (!data) {
		return null
	}
	if ("Inventory_Semaine" in data) {
		return data.Inventory_Semaine || null
	}
	if (
		"Taux_Service_Client_OTIF" in data &&
		"Taux_Service_Fournisseurs_OTIF" in data &&
		"Fiabilite_Client" in data
	) {
		return data
	}
	return null
}

function resolveMonthlyInventory(
	data: MonthlyApiResponse | MonthlyInventoryData | null,
): MonthlyInventoryData | null {
	if (!data) {
		return null
	}
	if ("Inventory_Mois" in data) {
		const monthly = asRecord(data.Inventory_Mois)
		return monthly as MonthlyInventoryData | null
	}
	if ("Error" in data || "Annee" in data || "Mois" in data) {
		return data
	}
	return null
}

function buildFiveWeeksHistory(
	values: HistoryWeekItem[] | undefined,
	fallback: HistoryWeekItem[],
): HistoryWeekItem[] {
	const source =
		values && values.length > 0 ? values.slice(0, 5) : fallback.slice(0, 5)
	const output = [...source]
	while (output.length < 5) {
		output.push(fallback[output.length] || fallback[fallback.length - 1])
	}
	return output
}

function buildLinePath(history: HistoryWeekItem[]): string {
	if (history.length < 2) {
		return "M 0 50 L 100 30 L 200 40 L 300 20 L 400 30"
	}
	const values = history.map((item) => toNumber(item.Valeur))
	const min = Math.min(...values)
	const max = Math.max(...values)
	const normalized = values.map((value) => {
		if (max === min) {
			return 50
		}
		const y = 80 - ((value - min) / (max - min)) * 60
		return Math.max(20, Math.min(80, y))
	})
	return normalized
		.map((y, index) => `${index === 0 ? "M" : "L"} ${index * 100} ${y}`)
		.join(" ")
}

function getTrendIcon(variation: number): string {
	return variation >= 0 ? "arrow_upward" : "arrow_downward"
}

function getTrendColor(variation: number): string {
	return variation >= 0 ? "text-blue-500" : "text-red-500"
}

function getVariationLabel(variation: number): string {
	const sign = variation > 0 ? "+" : ""
	return `${sign}${variation.toFixed(1)}%`
}

function getSupplierBubbleClasses(value: number): string {
	return value >= 95
		? "bg-blue-500/20 text-blue-500"
		: "bg-yellow-500/20 text-yellow-500"
}

function getReliabilityBubbleClasses(value: number): string {
	return value >= 90
		? "bg-blue-500/20 text-blue-500"
		: "bg-yellow-500/20 text-yellow-500"
}

function getBottomPosition(value: number, min: number, max: number): string {
	if (max === min) {
		return "65%"
	}
	const normalized = (value - min) / (max - min)
	const bottom = 50 + normalized * 30
	return `${Math.max(50, Math.min(80, bottom)).toFixed(2)}%`
}

// Supply Chain Dashboard Page - Can fetch data here
export default function SupplyChainPage() {
	const [activeTab, setActiveTab] = useState<TabType>("weekly")
	const [weeklyData, setWeeklyData] = useState<
		WeeklyApiResponse | WeeklyInventoryData | null
	>(null)
	const [monthlyData, setMonthlyData] = useState<
		MonthlyApiResponse | MonthlyInventoryData | null
	>(null)
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

	const resolvedWeekly = resolveWeeklyInventory(weeklyData)
	const resolvedMonthly = resolveMonthlyInventory(monthlyData)

	const monthlyRotation = getIndicator(resolvedMonthly, [
		"Rotation_Stocks",
		"Rotation_Des_Stocks",
		"RotationStocks",
	])
	const monthlyStockReliability = getIndicator(resolvedMonthly, [
		"Taux_Fiabilite_Stocks",
		"Taux_Fiabilité_Stocks",
		"Fiabilite_Stocks",
		"Fiabilité_Stocks",
	])
	const monthlyLogisticCost = getIndicator(resolvedMonthly, [
		"Cout_Logistique_Total",
		"Coût_Logistique_Total",
		"Cost_Logistics_Total",
	])

	const clientOtif =
		resolvedWeekly?.Taux_Service_Client_OTIF || DEFAULT_CLIENT_OTIF
	const suppliersOtif =
		resolvedWeekly?.Taux_Service_Fournisseurs_OTIF || DEFAULT_SUPPLIERS_OTIF
	const clientReliability =
		resolvedWeekly?.Fiabilite_Client || DEFAULT_CLIENT_RELIABILITY

	const clientHistory = buildFiveWeeksHistory(
		clientOtif.Historique_5_Semaines,
		DEFAULT_CLIENT_OTIF.Historique_5_Semaines,
	)
	const suppliersHistory = buildFiveWeeksHistory(
		suppliersOtif.Historique_5_Semaines,
		DEFAULT_SUPPLIERS_OTIF.Historique_5_Semaines,
	)
	const reliabilityHistory = buildFiveWeeksHistory(
		clientReliability.Historique_5_Semaines,
		DEFAULT_CLIENT_RELIABILITY.Historique_5_Semaines,
	)
	const reliabilityHistoryPreview = reliabilityHistory.slice(0, 4)

	const clientOtifValue = toNumber(clientOtif.Valeur_Semaine, 96)
	const clientOtifVariation = toNumber(clientOtif.Variation_Pts_Vs_S_1, 1)
	const suppliersOtifValue = toNumber(suppliersOtif.Valeur_Semaine, 96)
	const suppliersOtifVariation = toNumber(suppliersOtif.Variation_Pts_Vs_S_1, -0.5)
	const clientReliabilityValue = toNumber(clientReliability.Valeur_Semaine, 94)

	const clientLinePath = buildLinePath(clientHistory)
	const clientHistoryValues = clientHistory.map((item) => toNumber(item.Valeur, 0))
	const clientHistoryMin = Math.min(...clientHistoryValues)
	const clientHistoryMax = Math.max(...clientHistoryValues)

	const weeklySubtitle = `Semaine actuelle: ${clientHistory[clientHistory.length - 1]?.Label || "W5"}`
	const monthlySubtitle =
		resolvedMonthly?.Error ||
		`Mois en cours: ${getMonthLabel(toNumber(resolvedMonthly?.Mois, 5))}`

	const rotationValue = getFirstNumber(
		monthlyRotation,
		["Valeur_Mois", "Valeur_Mois_Courant", "Valeur"],
		22,
	)
	const rotationTarget = getFirstNumber(
		monthlyRotation,
		["Target_Mois", "Target_Mois_Courant", "Target"],
		20,
	)
	const rotationHistory = normalizeMonthlyHistory(
		getFirstArray(monthlyRotation, [
			"Historique_5_Mois",
			"Historique_Mensuel",
			"Historique",
		]),
		DEFAULT_ROTATION_HISTORY,
	)
	const rotationHistoryValues = rotationHistory.map((item) => item.Valeur)
	const rotationSparklinePoints = buildMiniSparklinePoints(rotationHistoryValues)
	const rotationSparklinePolyline = joinSparklinePoints(rotationSparklinePoints)

	const stockReliabilityValue = getFirstNumber(
		monthlyStockReliability,
		["Valeur_Mois", "Valeur_Mois_Courant", "Valeur"],
		94,
	)
	const stockReliabilityVariation = getFirstNumber(
		monthlyStockReliability,
		[
			"Variation_Pts_Vs_M_1",
			"Variation_Pts_Vs_Mois_Precedent",
			"Variation_Vs_Mois_Precedent",
			"Variation",
		],
		1,
	)
	const stockReliabilityHistory = normalizeMonthlyHistory(
		getFirstArray(monthlyStockReliability, [
			"Historique_5_Mois",
			"Historique_Mensuel",
			"Historique",
		]),
		DEFAULT_STOCK_RELIABILITY_HISTORY,
	)
	const stockReliabilityHistoryValues = stockReliabilityHistory.map(
		(item) => item.Valeur,
	)
	const stockReliabilitySparklinePoints = buildMiniSparklinePoints(
		stockReliabilityHistoryValues,
	)
	const stockReliabilitySparklinePolyline = joinSparklinePoints(
		stockReliabilitySparklinePoints,
	)
	const warehouseReliability = getWarehouseReliability(monthlyStockReliability)

	const logisticCostValue = getFirstNumber(
		monthlyLogisticCost,
		["Valeur_Mois", "Valeur_Mois_Courant", "Valeur"],
		1.2,
	)
	const logisticCostVariation = getFirstNumber(
		monthlyLogisticCost,
		[
			"Variation_Pct_Vs_M_1",
			"Variation_Pts_Vs_M_1",
			"Variation_Vs_Mois_Precedent",
			"Variation",
		],
		-5,
	)
	const logisticCostHistory = normalizeMonthlyHistory(
		getFirstArray(monthlyLogisticCost, [
			"Historique_5_Mois",
			"Historique_Mensuel",
			"Historique",
		]),
		DEFAULT_LOGISTIC_COST_HISTORY,
	)
	const logisticCostHistoryValues = logisticCostHistory.map((item) => item.Valeur)
	const logisticCostSparklinePoints = buildMiniSparklinePoints(
		logisticCostHistoryValues,
	)
	const logisticCostSparklinePolyline = joinSparklinePoints(
		logisticCostSparklinePoints,
	)

	if (loading) {
		return (
			<main className="flex-1 overflow-hidden bg-slate-900">
				<div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
					<div className="text-white text-lg">Chargement des données...</div>
				</div>
			</main>
		)
	}

	// Monthly Supply Chain Component
	const MonthlySupplyChain = () => (
		<div className="flex flex-col gap-6">
			{/* Rotation des Stocks */}
			<div className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-base md:text-lg lg:text-xl font-bold text-white">
						Rotation des Stocks
					</p>
					<span className="material-symbols-outlined text-gray-400">
						inventory
					</span>
				</div>
				<div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
					<div className="flex flex-col justify-center gap-10 py-4 lg:col-span-3">
						<div>
							<p className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white">
								{rotationValue.toFixed(0)}{" "}
								<span className="text-3xl md:text-4xl lg:text-5xl font-bold">
									jours
								</span>
							</p>
							<div className="flex items-baseline gap-2">
								<p className="text-base md:text-lg lg:text-xl font-medium text-gray-400">
									Target:
								</p>
								<p className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-500">
									{rotationTarget.toFixed(0)} jours
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 md:gap-3 lg:gap-4">
							{rotationHistory.map((item) => (
								<div
									key={`${item.Label}-${item.Mois}-${item.Annee}`}
									className="flex flex-col items-center gap-1 md:gap-2"
								>
									<div
										className={`flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full ${getMonthlyPointColor(
											item.Valeur,
											rotationTarget,
										)}`}
									>
										<span className="text-2xl md:text-3xl lg:text-4xl font-bold">
											{item.Valeur.toFixed(0)}
										</span>
									</div>
									<p className="text-xs md:text-sm lg:text-base text-gray-400">
										{item.Label}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
						<div className="h-20 w-full max-w-lg">
							<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
								<line fill="none" stroke="#3182CE" strokeDasharray="4,4" strokeWidth="0.5" x1="0" x2="100" y1="20" y2="20" />
								<polyline fill="none" points={rotationSparklinePolyline} stroke="#DD6B20" strokeWidth="1" />
								{rotationSparklinePoints.map((point, index) => {
									const [x, y] = point.split(",")
									return <circle key={`${point}-${index}`} cx={x} cy={y} fill="#DD6B20" r="1.5" />
								})}
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Taux de Fiabilité des Stocks */}
			<div className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-base md:text-lg lg:text-xl font-bold text-white">
						Taux de Fiabilité des Stocks
					</p>
					<span className="material-symbols-outlined text-gray-400">
						published_with_changes
					</span>
				</div>
				<div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
					<div className="flex flex-col items-center justify-center gap-6 py-4 lg:col-span-3">
						<div className="flex flex-col items-center">
							<p className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-yellow-500">
								{stockReliabilityValue.toFixed(0)}%
							</p>
							<div className="flex items-center gap-1">
								<span
									className={`material-symbols-outlined text-lg ${getTrendColor(
										stockReliabilityVariation,
									)}`}
								>
									{getTrendIcon(stockReliabilityVariation)}
								</span>
								<p
									className={`text-2xl font-extrabold ${getTrendColor(
										stockReliabilityVariation,
									)}`}
								>
									{getVariationLabel(stockReliabilityVariation)}
								</p>
								<p className="text-base font-normal text-gray-400">
									vs dernier mois
								</p>
							</div>
						</div>
						<div className="flex w-full max-w-md flex-col gap-3 md:gap-4">
							{warehouseReliability.map((warehouse) => (
								<div
									key={warehouse.label}
									className="flex items-center gap-3 md:gap-4"
								>
									<p className="w-24 md:w-28 lg:w-32 shrink-0 text-xs md:text-sm lg:text-base font-semibold text-gray-400">
										{warehouse.label}
									</p>
									<div className="h-6 w-full rounded bg-gray-700">
										<div
											className={`h-full items-center justify-end rounded pr-2 text-right text-sm font-bold text-white ${
												warehouse.value >= 95 ? "bg-blue-500" : "bg-yellow-500"
											}`}
											style={{ width: `${Math.max(0, Math.min(100, warehouse.value))}%` }}
										>
											{warehouse.value.toFixed(0)}%
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
						<div className="h-20 w-full max-w-lg">
							<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
								<line fill="none" stroke="#3182CE" strokeDasharray="4,4" strokeWidth="0.5" x1="0" x2="100" y1="20" y2="20" />
								<polyline fill="none" points={stockReliabilitySparklinePolyline} stroke="#DD6B20" strokeWidth="1" />
								{stockReliabilitySparklinePoints.map((point, index) => {
									const [x, y] = point.split(",")
									return <circle key={`${point}-${index}`} cx={x} cy={y} fill="#DD6B20" r="1.5" />
								})}
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Coût Logistique Total */}
			<div className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-base md:text-lg lg:text-xl font-bold text-white">
						Coût Logistique Total
					</p>
					<span className="material-symbols-outlined text-gray-400">
						local_shipping
					</span>
				</div>
				<div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
					<div className="flex flex-col justify-center gap-10 py-4 lg:col-span-3">
						<div>
							<p className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white">
								{formatCurrencyMillions(logisticCostValue)}
							</p>
							<div className="flex items-center gap-1">
								<span className="material-symbols-outlined text-lg text-blue-500">
									{logisticCostVariation <= 0 ? "arrow_downward" : "arrow_upward"}
								</span>
								<p className="text-2xl font-extrabold text-blue-500">
									{getVariationLabel(logisticCostVariation)}
								</p>
								<p className="text-base font-normal text-gray-400">
									vs last month
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 md:gap-3 lg:gap-4">
							{logisticCostHistory.map((item) => (
								<div
									key={`${item.Label}-${item.Mois}-${item.Annee}`}
									className="flex flex-col items-center gap-1 md:gap-2"
								>
									<div
										className={`flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full ${getMonthlyCostPointColor(
											item.Valeur,
											logisticCostValue,
										)}`}
									>
										<span className="text-xl md:text-2xl lg:text-3xl font-bold">
											{item.Valeur.toFixed(2)}
										</span>
									</div>
									<p className="text-xs md:text-sm lg:text-base text-gray-400">
										{item.Label}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
						<div className="h-20 w-full max-w-lg">
							<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
								<line fill="none" stroke="#3182CE" strokeDasharray="4,4" strokeWidth="0.5" x1="0" x2="100" y1="20" y2="20" />
								<polyline fill="none" points={logisticCostSparklinePolyline} stroke="#DD6B20" strokeWidth="1" />
								{logisticCostSparklinePoints.map((point, index) => {
									const [x, y] = point.split(",")
									return <circle key={`${point}-${index}`} cx={x} cy={y} fill="#DD6B20" r="1.5" />
								})}
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	// Weekly Supply Chain Component
	const WeeklySupplyChain = () => (
		<div className="grid h-full flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
			{/* Taux de Service Client / OTIF */}
			<div className="flex flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-sm md:text-base lg:text-lg font-medium text-white">
						Taux de Service Client / OTIF
					</p>
					<span className="material-symbols-outlined text-gray-400">
						trending_up
					</span>
				</div>
				<div className="flex flex-wrap items-end gap-3 md:gap-4">
					<p className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white">
						{clientOtifValue.toFixed(0)}%
					</p>
					<div className="flex items-center gap-1 pb-2">
						<span
							className={`material-symbols-outlined text-sm ${getTrendColor(
								clientOtifVariation,
							)}`}
						>
							{getTrendIcon(clientOtifVariation)}
						</span>
						<p className={`text-2xl font-extrabold ${getTrendColor(clientOtifVariation)}`}>
							{getVariationLabel(clientOtifVariation)}
						</p>
						<p className="text-base font-normal text-gray-400">
							vs last week
						</p>
					</div>
				</div>
				<div className="relative h-[180px] w-full pt-4">
					<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 100">
						<defs>
							<linearGradient id="line-chart-gradient" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor="#2c5282" stopOpacity="0.2" />
								<stop offset="100%" stopColor="#2c5282" stopOpacity="0" />
							</linearGradient>
						</defs>
						<path d={clientLinePath} fill="url(#line-chart-gradient)" stroke="#2c5282" strokeWidth="3" />
					</svg>
					<div className="absolute inset-0 flex items-center justify-between">
						{clientHistory.map((item, index) => {
							const value = toNumber(item.Valeur)
							const left =
								index === 0
									? "0%"
									: index === 4
										? "100%"
										: `${index * 25}%`
							const transform =
								index === 0
									? "translate(0, 50%)"
									: index === 4
										? "translate(-100%, 50%)"
										: "translate(-50%, 50%)"

							return (
								<div
									key={`${item.Label}-${item.Semaine}-${item.Annee}`}
									className="flex flex-col items-center gap-2"
									style={{
										bottom: getBottomPosition(
											value,
											clientHistoryMin,
											clientHistoryMax,
										),
										left,
										transform,
										position: "absolute",
									}}
								>
									<span className="text-3xl font-extrabold text-white">
										{value.toFixed(0)}%
									</span>
									<div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-gray-900" />
									<p className="text-sm font-bold text-gray-400">{item.Label}</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* Taux de Service Fournisseurs OTIF */}
			<div className="flex flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-sm md:text-base lg:text-lg font-medium text-white">
						Taux de Service Fournisseurs OTIF
					</p>
					<span className="material-symbols-outlined text-gray-400">
						local_shipping
					</span>
				</div>
				<div className="flex flex-wrap items-end gap-3 md:gap-4">
					<p className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white">
						{suppliersOtifValue.toFixed(0)}%
					</p>
					<div className="flex items-center gap-1 pb-1">
						<span
							className={`material-symbols-outlined text-sm ${getTrendColor(
								suppliersOtifVariation,
							)}`}
						>
							{getTrendIcon(suppliersOtifVariation)}
						</span>
						<p
							className={`text-2xl font-extrabold ${getTrendColor(
								suppliersOtifVariation,
							)}`}
						>
							{getVariationLabel(suppliersOtifVariation)}
						</p>
						<p className="text-base font-normal text-gray-400">
							vs last week
						</p>
					</div>
				</div>
				<div className="flex h-full w-full flex-col items-center justify-center pt-4">
					<div className="flex w-full items-start justify-around">
						{suppliersHistory.map((item) => {
							const value = toNumber(item.Valeur)

							return (
								<div
									key={`${item.Label}-${item.Semaine}-${item.Annee}`}
									className="flex flex-col items-center gap-2"
								>
									<p className="mb-1 text-xs font-semibold text-blue-400">
										Target: 95%
									</p>
									<div
										className={`flex h-20 w-20 items-center justify-center rounded-full ${getSupplierBubbleClasses(
											value,
										)}`}
									>
										<span className="text-2xl font-bold">
											{value.toFixed(0)}%
										</span>
									</div>
									<p className="mt-2 text-sm font-medium text-gray-400">
										{item.Label}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* Fiabilité Client */}
			<div className="col-span-full flex flex-col gap-3 md:gap-4 lg:gap-6 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-sm md:text-base lg:text-lg font-medium text-white">
						Fiabilité Client
					</p>
					<span className="material-symbols-outlined text-gray-400">
						shield
					</span>
				</div>
				<div className="flex h-full flex-grow items-center justify-center gap-6 md:gap-8 lg:gap-12">
					<div className="flex flex-col items-center gap-2 md:gap-3">
						<div className="flex h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 items-center justify-center rounded-full border-[8px] md:border-[10px] lg:border-[12px] border-blue-500/20 bg-blue-500/10 text-blue-500">
							<span className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
								{clientReliabilityValue.toFixed(0)}%
							</span>
						</div>
						<p className="text-base md:text-lg lg:text-xl font-semibold text-white">
							Actuel
						</p>
					</div>
					<div className="flex flex-col items-start gap-3 md:gap-4">
						<p className="text-xs md:text-sm lg:text-base font-medium text-gray-400">
							Historique Hebdomadaire
						</p>
						<div className="flex items-center gap-3 md:gap-4 lg:gap-6">
							{reliabilityHistoryPreview.map((item) => {
								const value = toNumber(item.Valeur)

								return (
									<div
										key={`${item.Label}-${item.Semaine}-${item.Annee}`}
										className="flex flex-col items-center gap-1 md:gap-2"
									>
										<div
											className={`flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full ${getReliabilityBubbleClasses(
												value,
											)}`}
										>
											<span className="text-lg md:text-xl lg:text-2xl font-bold">
												{value.toFixed(0)}%
											</span>
										</div>
										<p className="text-xs md:text-sm lg:text-base font-medium text-gray-400">
											{item.Label}
										</p>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
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
								Supply Chain - {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
							</h1>
							<p className="text-sm md:text-base lg:text-lg font-normal text-gray-400">
								{activeTab === "monthly" ? monthlySubtitle : weeklySubtitle}
							</p>
						</div>
						<TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
					</div>

					{/* Content based on active tab */}
					{activeTab === "monthly" ? <MonthlySupplyChain /> : <WeeklySupplyChain />}
				</div>
			</div>
		</main>
	)
}
