"use client";
import { PeriodSelector } from "@/components/ui/PeriodSelector";
import { TabSelector } from "@/components/ui/TabSelector";
import { useKpiPeriod } from "@/hooks/use-kpi-period";
import React, { useState, useEffect, useCallback } from "react";
import {
	FaTruck,
	FaCogs,
	FaUserPlus,
	FaMoneyBillWave,
	FaSitemap,
	FaBook,
} from "react-icons/fa";
import type {
	ProgramApiResponse,
	ProgramHistoriqueMois,
	ProgramHistoriqueSemaine,
} from "@/types";

type TabType = "weekly" | "monthly";

function getPercentStatusColor(value: number, target: number): string {
	const pct = target ? (value / target) * 100 : 0;
	if (pct >= 90) return "green";
	if (pct >= 70) return "orange";
	return "red";
}

const BUDGET_PERCENTAGE_STYLES = {
	zero: {
		text: "text-red-700",
		bg: "bg-red-50",
		dot: "bg-red-500",
		chart: "#ef4444",
		label: "AT RISK",
	},
	atRisk: {
		text: "text-amber-700",
		bg: "bg-amber-50",
		dot: "bg-amber-500",
		chart: "#f59e0b",
		label: "AT RISK",
	},
	onTrack: {
		text: "text-emerald-700",
		bg: "bg-emerald-50",
		dot: "bg-emerald-500",
		chart: "#10b981",
		label: "ON TRACK",
	},
} as const;

function getBudgetPercentage(actual?: number, budget?: number): number {
	if (
		budget === undefined ||
		budget <= 0 ||
		!Number.isFinite(budget) ||
		actual === undefined ||
		!Number.isFinite(actual)
	) {
		return 0;
	}

	return Math.round((actual / budget) * 100);
}

function getBudgetPercentageStatus(actual?: number, budget?: number) {
	const percentage = getBudgetPercentage(actual, budget);
	const level =
		percentage <= 0
			? "zero"
			: percentage < 40
				? "atRisk"
				: "onTrack";

	return { percentage, ...BUDGET_PERCENTAGE_STYLES[level] };
}

const APQP_STATUS_STYLES = {
	red: {
		text: "text-red-700",
		bg: "bg-red-50",
		border: "border-red-400",
		dot: "bg-red-500",
		shadow: "shadow-red-100",
		chart: "#ef4444",
		label: "AT RISK",
	},
	orange: {
		text: "text-amber-700",
		bg: "bg-amber-50",
		border: "border-amber-400",
		dot: "bg-amber-500",
		shadow: "shadow-amber-100",
		chart: "#f59e0b",
		label: "AT RISK",
	},
	green: {
		text: "text-emerald-700",
		bg: "bg-emerald-50",
		border: "border-emerald-400",
		dot: "bg-emerald-500",
		shadow: "shadow-emerald-100",
		chart: "#10b981",
		label: "ON TRACK",
	},
} as const;

function getApqpStatus(value?: number) {
	const percentage =
		value === undefined || !Number.isFinite(value) ? 0 : Math.round(value);
	const level = percentage < 85 ? "red" : percentage < 90 ? "orange" : "green";

	return { percentage, ...APQP_STATUS_STYLES[level] };
}

function StatusPill({ status }: { status: string }) {
	const cfg = {
		green: {
			bg: "bg-emerald-50",
			text: "text-emerald-700",
			dot: "bg-emerald-500",
			label: "On Track",
		},
		orange: {
			bg: "bg-amber-50",
			text: "text-amber-700",
			dot: "bg-amber-500",
			label: "At Risk",
		},
		red: {
			bg: "bg-red-50",
			text: "text-red-700",
			dot: "bg-red-500",
			label: "Behind",
		},
	}[status] ?? {
		bg: "bg-slate-50",
		text: "text-slate-600",
		dot: "bg-slate-400",
		label: "N/A",
	};
	return (
		<span
			className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}
		>
			<span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
			{cfg.label}
		</span>
	);
}

function KpiCircle({
					   value,
					   label,
					   isActive,
					   status,
					   target,
				   }: {
	value: string;
	label: string;
	isActive: boolean;
	status: string;
	target?: string;
}) {
	const ring = isActive
		? "ring-4 ring-primary/20 border-primary bg-primary/5"
		: status === "green"
			? "border-emerald-400 bg-emerald-50/50"
			: status === "orange"
				? "border-amber-400 bg-amber-50/50"
				: "border-red-400 bg-red-50/50";

	const textColor = isActive
		? "text-primary font-black"
		: status === "green"
			? "text-emerald-700 font-bold"
			: status === "orange"
				? "text-amber-700 font-bold"
				: "text-red-700 font-bold";

	const labelColor = isActive ? "text-primary" : "text-slate-500";

	return (
		<div className="flex flex-col items-center gap-1">
			{target !== undefined ? (
				<span className="text-[10px] text-slate-400 font-semibold">
					T: {target}
				</span>
			) : (
				<span className="text-[10px] opacity-0 select-none">—</span>
			)}
			<div
				className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${ring}`}
			>
				<span className={`text-xs ${textColor}`}>{value}</span>
			</div>
			<span
				className={`text-[10px] font-bold uppercase tracking-widest ${labelColor}`}
			>
				{label}
			</span>
		</div>
	);
}

const MOCK_PROGRAM_DATA: ProgramApiResponse = {
	Program_Semaine: {
		On_Time_Delivery: {
			Annee: 2026,
			Semaine_Actuelle: 18,
			Valeur_Actuelle: 92,
			Target_Actuelle: 90,
			Valeur_Semaine_Precedente: 90,
			Variation_Vs_Semaine_Precedente: 2,
			Historique_4_Semaines: [
				{ Label: "W15", Annee: 2026, Semaine: 15, Valeur: 88 },
				{ Label: "W16", Annee: 2026, Semaine: 16, Valeur: 90 },
				{ Label: "W17", Annee: 2026, Semaine: 17, Valeur: 91 },
				{ Label: "W18", Annee: 2026, Semaine: 18, Valeur: 92 },
			],
		},
		Critical_Equipment_Availability: {
			Annee: 2026,
			Semaine_Actuelle: 18,
			Valeur_Actuelle: 86,
			Target_Actuelle: 90,
			Valeur_Semaine_Precedente: 85,
			Variation_Vs_Semaine_Precedente: 1,
			Historique_4_Semaines: [
				{ Label: "W15", Annee: 2026, Semaine: 15, Valeur: 83 },
				{ Label: "W16", Annee: 2026, Semaine: 16, Valeur: 84 },
				{ Label: "W17", Annee: 2026, Semaine: 17, Valeur: 85 },
				{ Label: "W18", Annee: 2026, Semaine: 18, Valeur: 86 },
			],
		},
		Recruitment_Progress: {
			Annee: 2026,
			Semaine_Actuelle: 18,
			Valeur_Actuelle_Reel: 24,
			Valeur_Actuelle_Forecast: 30,
			Valeur_Actuelle_Pct: 80,
			Variation_Pct_Vs_Semaine_Precedente: 4,
			Variation_Reel_Vs_Semaine_Precedente: 2,
			Total_Hires_MTD: 48,
			Total_Forecast_MTD: 60,
			Target_Hebdo_Forecast: 30,
			Historique_4_Semaines: [
				{ Label: "W15", Annee: 2026, Semaine: 15, Reel: 20, Forecast: 28, Pct: 71 },
				{ Label: "W16", Annee: 2026, Semaine: 16, Reel: 22, Forecast: 29, Pct: 76 },
				{ Label: "W17", Annee: 2026, Semaine: 17, Reel: 23, Forecast: 30, Pct: 77 },
				{ Label: "W18", Annee: 2026, Semaine: 18, Reel: 24, Forecast: 30, Pct: 80 },
			],
		},
	},
	Program_Mois: {
		Budget_Vs_Actual: {
			Variance_Mois_Courant: -18000,
			Delta_Variance_Vs_M_1: -6000,
			Target_Variance: 0,
			Current_Health: "At Risk",
			Historique_4_Mois: [
				{ Label: "JAN", Mois: 1, Annee: 2026, Variance: -12000, Budget: 120000, Actual: 132000 },
				{ Label: "FEB", Mois: 2, Annee: 2026, Variance: -8000, Budget: 118000, Actual: 126000 },
				{ Label: "MAR", Mois: 3, Annee: 2026, Variance: -14000, Budget: 125000, Actual: 139000 },
				{ Label: "APR", Mois: 4, Annee: 2026, Variance: -18000, Budget: 130000, Actual: 148000 },
			],
		},
		APQP_Milestones: {
			Valeur_Mois_Courant: 86,
			Delta_Pts_Vs_M_1: 2,
			Target: 100,
			Current_Health: "At Risk",
			Historique_4_Mois: [
				{ Label: "JAN", Mois: 1, Annee: 2026, Valeur: 80, Target: 100 },
				{ Label: "FEB", Mois: 2, Annee: 2026, Valeur: 82, Target: 100 },
				{ Label: "MAR", Mois: 3, Annee: 2026, Valeur: 84, Target: 100 },
				{ Label: "APR", Mois: 4, Annee: 2026, Valeur: 86, Target: 100 },
			],
		},
		Documentation_Progress: {
			Readiness_Mois_Courant: 78,
			Delta_Pts_Vs_M_1: 3,
			Target: 100,
			Current_Health: "At Risk",
			Plans: 82,
			Procedures: 76,
			Work_Inst: 74,
			Historique_4_Mois: [
				{ Label: "JAN", Mois: 1, Annee: 2026, Valeur: 70, Target: 100 },
				{ Label: "FEB", Mois: 2, Annee: 2026, Valeur: 73, Target: 100 },
				{ Label: "MAR", Mois: 3, Annee: 2026, Valeur: 75, Target: 100 },
				{ Label: "APR", Mois: 4, Annee: 2026, Valeur: 78, Target: 100 },
			],
			Trend_Hebdo_Mois: [
				{ Label: "W15", Annee: 2026, Semaine: 15, Valeur: 70 },
				{ Label: "W16", Annee: 2026, Semaine: 16, Valeur: 74 },
				{ Label: "W17", Annee: 2026, Semaine: 17, Valeur: 76 },
				{ Label: "W18", Annee: 2026, Semaine: 18, Valeur: 78 },
			],
			Average_Hebdo_Mois: 4,
		},
	},
};

export default function ProgramsPage() {
	const { type: activeTab, setType: setActiveTab, period, setPeriod, year, setYear } =
		useKpiPeriod('weekly');
	const [programData, setProgramData] = useState<ProgramApiResponse | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [useMockData, setUseMockData] = useState(false);

	useEffect(() => {
		if (useMockData) {
			setProgramData(MOCK_PROGRAM_DATA);
			setLoading(false);
			setError(null);
			return;
		}
		async function fetchProgram() {
			setLoading(true);
			setError(null);
			try {
				const url = `/api/program?type=${activeTab}&period=${period}&year=${year}`;
				const res = await fetch(url, { cache: "no-store" });
				if (!res.ok) throw new Error("Failed to fetch program data");
				const json = await res.json();
				const finalData = json?.data?.data ?? json?.data ?? json;
				setProgramData(finalData);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load program data"
				);
			} finally {
				setLoading(false);
			}
		}
		fetchProgram();
	}, [activeTab, period, year, useMockData]);

	const weeklyData = programData?.Program_Semaine ?? null;
	const monthlyData = programData?.Program_Mois ?? null;

	const WeeklyProgram = useCallback(() => {
		const data = weeklyData;
		const otd = data?.On_Time_Delivery;
		const equipment = data?.Critical_Equipment_Availability;
		const recruitment = data?.Recruitment_Progress;

		if (!data) {
			return (
				<div className="rounded-xl bg-slate-50 border border-slate-200 p-10 text-center">
					<span className="material-symbols-outlined text-slate-300 text-5xl mb-3 block">
						inbox
					</span>
					<p className="text-slate-500 font-medium">
						Aucune donnée disponible pour la vue hebdomadaire
					</p>
				</div>
			);
		}

		const renderTrendChart = (
			history: ProgramHistoriqueSemaine[],
			gradientId: string,
			color: string
		) => {
			if (history.length < 2) return null;
			const maxVal = Math.max(...history.map((h) => h.Valeur ?? 0), 100);
			const minVal = Math.min(...history.map((h) => h.Valeur ?? 0), 0);
			const range = maxVal - minVal || 1;
			const pts = history.map((h, i) => {
				const x = (i / (history.length - 1)) * 440 + 30;
				const y = 80 - (((h.Valeur ?? 0) - minVal) / range) * 60;
				return { x, y };
			});
			const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
			const area = `M${pts.map((p) => `${p.x},${p.y}`).join("L")}L${pts[pts.length - 1].x},90 L${pts[0].x},90 Z`;
			return (
				<>
					<defs>
						<linearGradient
							id={gradientId}
							x1="0"
							x2="0"
							y1="0"
							y2="1"
						>
							<stop
								offset="0%"
								stopColor={color}
								stopOpacity="0.18"
							/>
							<stop
								offset="100%"
								stopColor={color}
								stopOpacity="0"
							/>
						</linearGradient>
					</defs>
					{/* Grid lines */}
					{[25, 50, 75].map((pct) => {
						const gy =
							80 - ((pct - minVal) / range) * 60;
						return (
							<line
								key={pct}
								x1="30"
								y1={gy}
								x2="470"
								y2={gy}
								stroke="#e2e8f0"
								strokeWidth="1"
								strokeDasharray="4 4"
							/>
						);
					})}
					<path d={area} fill={`url(#${gradientId})`} />
					<polyline
						points={polyline}
						fill="none"
						stroke={color}
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					{pts.map((p, i) => (
						<circle key={i} cx={p.x} cy={p.y} r="4" fill={color} />
					))}
				</>
			);
		};

		const otdHistory = otd?.Historique_4_Semaines ?? [];
		const equipHistory = equipment?.Historique_4_Semaines ?? [];
		const recruitHistory = recruitment?.Historique_4_Semaines ?? [];

		const otdStatus = getPercentStatusColor(
			otd?.Valeur_Actuelle ?? 0,
			90
		);
		const equipStatus = getPercentStatusColor(
			equipment?.Valeur_Actuelle ?? 0,
			90
		);

		return (
			<div className="space-y-6">
				{/* OTD Section */}
				<section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<div className="border-l-4 border-primary pl-6 pr-6 pt-6 pb-0">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
									<FaTruck className="text-primary text-xl" />
								</div>
								<div>
									<h2 className="text-lg font-bold text-slate-900">
										On Time Delivery (OTD)
									</h2>
									<p className="text-xs text-slate-500">
										Target: 90%
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<StatusPill status={otdStatus} />
								<div className="text-right">
									<p className="text-4xl font-black text-slate-900 leading-none">
										{otd?.Valeur_Actuelle ?? "—"}%
									</p>
									<p
										className={`text-sm font-semibold mt-1 flex items-center justify-end gap-1 ${(otd?.Variation_Vs_Semaine_Precedente ?? 0) >= 0 ? "text-emerald-600" : "text-rose-600"}`}
									>
										{(otd?.Variation_Vs_Semaine_Precedente ?? 0) >= 0
											? "+"
											: ""}
										{otd?.Variation_Vs_Semaine_Precedente ?? 0}% vs
										S-1
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="px-6 pb-6">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
							<div className="lg:col-span-4">
								<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
									4-Week History
								</p>
								<div className="flex justify-between">
									{otdHistory.length
										? otdHistory.map(
											(
												h: ProgramHistoriqueSemaine,
												i: number
											) => {
												const isLast =
													i === otdHistory.length - 1;
												const val = h.Valeur ?? 0;
												const st = getPercentStatusColor(
													val,
													90
												);
												return (
													<KpiCircle
														key={`otd-${h.Semaine}`}
														value={`${val}%`}
														label={
															h.Label ??
															`W${h.Semaine}`
														}
														isActive={isLast}
														status={st}
														target="90%"
													/>
												);
											}
										)
										: [37, 38, 39, 40].map((w) => (
											<KpiCircle
												key={w}
												value="—"
												label={`W${w}`}
												isActive={false}
												status="green"
												target="90%"
											/>
										))}
								</div>
							</div>
							<div className="lg:col-span-8">
								<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
									Trend
								</p>
								<div className="h-36 relative">
									<svg
										className="w-full h-full"
										viewBox="0 0 500 100"
										preserveAspectRatio="none"
									>
										{renderTrendChart(
											otdHistory,
											"otd-grad",
											"#0d7ff2"
										)}
									</svg>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Critical Equipment */}
				<section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<div className="border-l-4 border-violet-500 pl-6 pr-6 pt-6 pb-0">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
									<FaCogs className="text-violet-600 text-xl" />
								</div>
								<div>
									<h2 className="text-lg font-bold text-slate-900">
										Critical Equipment Availability
									</h2>
									<p className="text-xs text-slate-500">
										Target: 90%
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<StatusPill status={equipStatus} />
								<div className="text-right">
									<p className="text-4xl font-black text-slate-900 leading-none">
										{equipment?.Valeur_Actuelle ?? "—"}%
									</p>
									<p
										className={`text-sm font-semibold mt-1 flex items-center justify-end gap-1 ${(equipment?.Variation_Vs_Semaine_Precedente ?? 0) >= 0 ? "text-emerald-600" : "text-rose-600"}`}
									>
										{(equipment?.Variation_Vs_Semaine_Precedente ??
											0) >= 0
											? "+"
											: ""}
										{equipment?.Variation_Vs_Semaine_Precedente ?? 0}%
										vs S-1
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="px-6 pb-6">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
							<div className="lg:col-span-4">
								<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
									4-Week History
								</p>
								<div className="flex justify-between">
									{equipHistory.length
										? equipHistory.map(
											(
												h: ProgramHistoriqueSemaine,
												i: number
											) => {
												const isLast =
													i === equipHistory.length - 1;
												const val = h.Valeur ?? 0;
												const st = getPercentStatusColor(
													val,
													90
												);
												return (
													<KpiCircle
														key={`equip-${h.Semaine}`}
														value={`${val}%`}
														label={
															h.Label ??
															`W${h.Semaine}`
														}
														isActive={isLast}
														status={st}
														target="90%"
													/>
												);
											}
										)
										: [37, 38, 39, 40].map((w) => (
											<KpiCircle
												key={w}
												value="—"
												label={`W${w}`}
												isActive={false}
												status="green"
												target="90%"
											/>
										))}
								</div>
							</div>
							<div className="lg:col-span-8">
								<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
									Trend
								</p>
								<div className="h-36 relative">
									<svg
										className="w-full h-full"
										viewBox="0 0 500 100"
										preserveAspectRatio="none"
									>
										{renderTrendChart(
											equipHistory,
											"equip-grad",
											"#7c3aed"
										)}
									</svg>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Recruitment Progress */}
				<section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<div className="border-l-4 border-emerald-500 pl-6 pr-6 pt-6 pb-0">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
									<FaUserPlus className="text-emerald-600 text-xl" />
								</div>
								<div>
									<h2 className="text-lg font-bold text-slate-900">
										Recruitment Progress vs Forecast
									</h2>
									<p className="text-xs text-slate-500">
										Actual vs Forecast headcount
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="text-4xl font-black text-slate-900 leading-none">
									{recruitment?.Valeur_Actuelle_Reel ?? "—"}{" "}
									<span className="text-slate-400 text-2xl">/</span>{" "}
									{recruitment?.Valeur_Actuelle_Forecast ?? "—"}
								</p>
								<p className="text-sm text-slate-500 mt-1">
									{recruitment?.Valeur_Actuelle_Pct ?? "—"}%
									achievement &middot;{" "}
									{recruitment?.Total_Hires_MTD ?? "—"}/
									{recruitment?.Total_Forecast_MTD ?? "—"} MTD
								</p>
							</div>
						</div>
					</div>
					<div className="px-6 pb-6">
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
							<div className="lg:col-span-4">
								<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
									4-Week History
								</p>
								<div className="flex justify-between">
									{recruitHistory.length
										? recruitHistory.map(
											(h: any, i: number) => {
												const isLast =
													i === recruitHistory.length - 1;
												const pct = h.Pct ?? 0;
												const st =
													pct >= 90
														? "green"
														: pct >= 70
															? "orange"
															: "red";
												return (
													<KpiCircle
														key={`recruit-${h.Semaine}`}
														value={`${h.Reel ?? 0}/${h.Forecast ?? 0}`}
														label={
															h.Label ??
															`W${h.Semaine}`
														}
														isActive={isLast}
														status={st}
														target={`${h.Forecast ?? 0}`}
													/>
												);
											}
										)
										: [37, 38, 39, 40].map((w) => (
											<KpiCircle
												key={w}
												value="—"
												label={`W${w}`}
												isActive={false}
												status="green"
												target="—"
											/>
										))}
								</div>
							</div>
							<div className="lg:col-span-8">
								<p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
									Actual vs Forecast Trend
								</p>
								<div className="h-36 relative">
									<svg
										className="w-full h-full"
										viewBox="0 0 500 100"
										preserveAspectRatio="none"
									>
										{(() => {
											if (recruitHistory.length < 2) return null;
											const maxVal = Math.max(
												...recruitHistory.map((h: any) =>
													Math.max(
														h.Reel ?? 0,
														h.Forecast ?? 0
													)
												),
												10
											);
											const ptsReel = recruitHistory.map(
												(h: any, i: number) => {
													const x =
														(i /
															(recruitHistory.length - 1)) *
														440 +
														30;
													const y =
														80 -
														((h.Reel ?? 0) / maxVal) * 60;
													return `${x},${y}`;
												}
											);
											const ptsForecast = recruitHistory.map(
												(h: any, i: number) => {
													const x =
														(i /
															(recruitHistory.length - 1)) *
														440 +
														30;
													const y =
														80 -
														((h.Forecast ?? 0) / maxVal) * 60;
													return `${x},${y}`;
												}
											);
											return (
												<>
													{[25, 50, 75].map((pct) => (
														<line
															key={pct}
															x1="30"
															y1={80 - pct * 0.6}
															x2="470"
															y2={80 - pct * 0.6}
															stroke="#e2e8f0"
															strokeWidth="1"
															strokeDasharray="4 4"
														/>
													))}
													<polyline
														points={ptsForecast.join(" ")}
														fill="none"
														stroke="#cbd5e1"
														strokeDasharray="6 3"
														strokeWidth="2"
													/>
													<polyline
														points={ptsReel.join(" ")}
														fill="none"
														stroke="#10b981"
														strokeLinecap="round"
														strokeWidth="2.5"
													/>
													{recruitHistory.map(
														(h: any, i: number) => {
															const x =
																(i /
																	(recruitHistory.length -
																		1)) *
																440 +
																30;
															const y =
																80 -
																((h.Reel ?? 0) / maxVal) *
																60;
															return (
																<circle
																	key={i}
																	cx={x}
																	cy={y}
																	r="4"
																	fill="#10b981"
																/>
															);
														}
													)}
												</>
											);
										})()}
									</svg>
								</div>
								<div className="flex items-center gap-4 mt-1">
									<span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
										<span className="w-6 border-t-2 border-dashed border-slate-300 inline-block" />
										Forecast
									</span>
									<span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
										<span className="w-6 border-t-2 border-emerald-400 inline-block" />
										Actual
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}, [weeklyData]);

	const MonthlyProgram = useCallback(() => {
		const data = monthlyData;
		const budget = data?.Budget_Vs_Actual;
		const apqp = data?.APQP_Milestones;
		const documentation = data?.Documentation_Progress;

		const varianceToK = (v: number) =>
			v >= 0
				? `+$${Math.round(Math.abs(v) / 1000)}k`
				: `-$${Math.round(Math.abs(v) / 1000)}k`;

		const moneyToK = (v: number) => `$${Math.round(Math.abs(v) / 1000)}k`;

		if (!data) {
			return (
				<div className="rounded-xl bg-slate-50 border border-slate-200 p-10 text-center">
					<span className="material-symbols-outlined text-slate-300 text-5xl mb-3 block">
						inbox
					</span>
					<p className="text-slate-500 font-medium">
						Aucune donnée disponible pour la vue mensuelle
					</p>
				</div>
			);
		}

		const historiqueBudget = budget?.Historique_4_Mois ?? [];
		const selectedBudgetMonth =
			historiqueBudget.find(
				(h) => h.Mois === period && h.Annee === year
			) ?? historiqueBudget[historiqueBudget.length - 1];
		const selectedBudgetStatus = getBudgetPercentageStatus(
			selectedBudgetMonth?.Actual,
			selectedBudgetMonth?.Budget
		);
		const apqpHistory = apqp?.Historique_4_Mois ?? [];
		const selectedApqpMonth =
			apqpHistory.find(
				(h) => h.Mois === period && h.Annee === year
			) ?? apqpHistory[apqpHistory.length - 1];
		const apqpCurrentStatus = getApqpStatus(apqp?.Valeur_Mois_Courant);

		return (
			<div className="space-y-6">
				{/* Budget vs Actual */}
				<section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<div className="border-l-4 border-primary px-6 pt-6">
						<div className="flex items-center gap-3 mb-1">
							<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
								<FaMoneyBillWave className="text-primary text-xl" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-slate-900">
									Budget vs Actual (CAPEX/OPEX)
								</h2>
								<div className="flex flex-wrap items-center gap-2 mt-0.5">
									{/*{budget && (
										<span className="text-sm text-slate-500">
											Variance {varianceToK(budget.Variance_Mois_Courant ?? 0)}
											{" "}
											vs target {varianceToK(budget.Target_Variance ?? 0)}
										</span>
									)}*/}
									<span
										className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-bold ${selectedBudgetStatus.bg} ${selectedBudgetStatus.text}`}
									>
										<span
											className={`w-1.5 h-1.5 rounded-full ${selectedBudgetStatus.dot}`}
										/>
										{selectedBudgetStatus.percentage}%
										{selectedBudgetStatus.label && ` ${selectedBudgetStatus.label}`}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-6 p-6">
						<div className="col-span-12 lg:col-span-5 space-y-6">
							<p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
								Historical Performance
							</p>
							<div className="flex justify-between items-center gap-2 px-2">
								{historiqueBudget.length
									? historiqueBudget.map(
										(h: ProgramHistoriqueMois, i: number) => {
											const isLast =
												i === historiqueBudget.length - 1;
											const labelCls = isLast
												? "text-primary font-black"
												: "text-slate-500";
											const budgetVal = moneyToK(h.Budget ?? 0);
											const actualVal = moneyToK(h.Actual ?? 0);
											const percentageStatus = getBudgetPercentageStatus(
												h.Actual,
												h.Budget
											);
											const maxMonthVal = Math.max(
												h.Budget ?? 0,
												h.Actual ?? 0,
												1
											);
											const maxBarHeight = isLast ? 52 : 40;
											const budgetHeight = Math.max(
												8,
												Math.round(((h.Budget ?? 0) / maxMonthVal) * maxBarHeight)
											);
											const actualHeight = Math.max(
												8,
												Math.round(((h.Actual ?? 0) / maxMonthVal) * maxBarHeight)
											);
											return (
												<div
													key={`${h.Mois}-${h.Annee}`}
													className="flex flex-col items-center gap-1"
												>
													<span className={`text-xs font-semibold ${isLast ? "text-primary" : "text-slate-400"}`}>
														T: $0k
													</span>
													<div
														className={`rounded-xl flex items-end justify-center transition-all ${
															isLast
																? "w-32 h-24 bg-primary/5 shadow-md shadow-primary/10"
																: "w-24 h-20"
														}`}
													>
														<div className="flex items-end gap-3 pb-1">
															<div className="flex flex-col items-center gap-1">
																<div
																	className={`rounded-sm ${isLast ? "w-12 bg-slate-400" : "w-12 bg-slate-300"}`}
																	style={{ height: budgetHeight }}
																/>
																<span className={`font-bold text-slate-600 ${isLast ? "text-xs" : "text-[11px]"}`}>
																	{budgetVal}
																</span>
															</div>
															<div className="flex flex-col items-center gap-1">
																<div
																	className="rounded-sm bg-primary w-12"
																	style={{ height: actualHeight }}
																/>
																<span className={`font-bold ${isLast ? "text-xs text-primary" : "text-[11px] text-slate-600"}`}>
																	{actualVal}
																</span>
															</div>
														</div>
													</div>
													<p
														className={`text-xs font-bold ${labelCls}`}
													>
														{(h.Label ?? "").toUpperCase()}
													</p>
													<span
												className={`w-2.5 h-2.5 rounded-full ${percentageStatus.dot}`}
												role="img"
												aria-label={`${percentageStatus.percentage}% ${percentageStatus.label}`}
											/>
												</div>
											)
										}
									)
									: [1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="flex flex-col items-center gap-1"
										>
											<span className="text-xs text-slate-300 font-semibold">
												T: $0k
											</span>
											<div className="w-24 h-20 rounded-xl flex items-end justify-center">
												<div className="flex items-end gap-3 pb-1">
													<div className="flex flex-col items-center gap-1">
														<div className="w-6 h-8 rounded-sm bg-slate-200" />
														<span className="text-[11px] font-bold text-slate-300">
															—
														</span>
													</div>
													<div className="flex flex-col items-center gap-1">
														<div className="w-6 h-8 rounded-sm bg-slate-200" />
														<span className="text-[11px] font-bold text-slate-300">
															—
														</span>
													</div>
												</div>
											</div>
											<p className="text-xs font-bold text-slate-300">
												—
											</p>
										</div>
									))}
							</div>
						</div>
						<div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
							<div className="flex items-center justify-between mb-3">
								<p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
									Monthly Spend Trend
								</p>
								<div className="flex gap-4">
									<span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
										<span className="w-3 h-0.5 border-t border-slate-400 inline-block" />
										BUDGET
									</span>
									<span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
										<span className="inline-flex w-4 h-0.5 overflow-hidden rounded-full">
											<span className="flex-1 bg-red-500" />
											<span className="flex-1 bg-amber-500" />
											<span className="flex-1 bg-emerald-500" />
										</span>
										ACTUAL
									</span>
								</div>
							</div>
							<div>
								<div className="h-36">
									<svg
										className="w-full h-full overflow-visible"
										viewBox="0 0 400 100"
										preserveAspectRatio="none"
									>
										{(() => {
											if (!historiqueBudget.length) return null;
											const chartLeft = 40;
											const chartRight = 392;
											const chartTop = 12;
											const chartBottom = 88;
											const maxValue = Math.max(
												...historiqueBudget.map((h) =>
													Math.max(h.Budget ?? 0, h.Actual ?? 0)
												),
												1
											);
											const valueToY = (value: number) => {
												const normalizedValue = Math.max(value, 0) / maxValue;
												return (
													chartBottom -
													normalizedValue * (chartBottom - chartTop)
												);
											};
											const valuePoints = historiqueBudget.map((h, i) => {
												const x =
													chartLeft +
													((i + 0.5) / historiqueBudget.length) *
														(chartRight - chartLeft);
												return {
													x,
													budgetY: valueToY(h.Budget ?? 0),
													actualY: valueToY(h.Actual ?? 0),
													status: getBudgetPercentageStatus(
														h.Actual,
														h.Budget
													),
												};
											});
											const scaleValues = [0, maxValue / 2, maxValue];
											return (
												<>
													{scaleValues.map((value, i) => {
														const y = valueToY(value);
														return (
															<g key={value}>
																<line
																	x1={chartLeft}
																	y1={y}
																	x2={chartRight}
																	y2={y}
																	stroke={i === scaleValues.length - 1 ? "#cbd5e1" : "#e2e8f0"}
																	strokeWidth={i === scaleValues.length - 1 ? "1.5" : "1"}
																/>
															</g>
														);
													})}
													<polyline
														points={valuePoints
															.map((point) => `${point.x},${point.budgetY}`)
															.join(" ")}
														fill="none"
														stroke="#94a3b8"
														strokeLinecap="round"
														strokeWidth="1.5"
													/>
													{valuePoints.map((point, i) => (
														<circle
															key={`budget-${historiqueBudget[i].Mois}-${historiqueBudget[i].Annee}`}
															cx={point.x}
															cy={point.budgetY}
															r="2"
															fill="#94a3b8"
														/>
													))}
													{valuePoints.slice(1).map((point, i) => {
														const previousPoint = valuePoints[i];
														return (
															<line
																key={`actual-${historiqueBudget[i + 1].Mois}-${historiqueBudget[i + 1].Annee}`}
																x1={previousPoint.x}
																y1={previousPoint.actualY}
																x2={point.x}
																y2={point.actualY}
																stroke={point.status.chart}
																strokeLinecap="round"
																strokeWidth="2"
															/>
														);
													})}
													{valuePoints.map((point, i) => (
														<circle
															key={`actual-point-${historiqueBudget[i].Mois}-${historiqueBudget[i].Annee}`}
															cx={point.x}
															cy={point.actualY}
															r="3.25"
															fill={point.status.chart}
														/>
													))}
												</>
											);
										})()}
									</svg>
								</div>
								<div
									className="grid mt-2"
									style={{
										paddingLeft: "10%",
										paddingRight: "2%",
										gridTemplateColumns: `repeat(${historiqueBudget.length || 4}, minmax(0, 1fr))`,
									}}
								>
									{historiqueBudget.length
										? historiqueBudget.map((h) => {
											const status = getBudgetPercentageStatus(
												h.Actual,
												h.Budget
											);
											const isSelected =
												h.Mois === selectedBudgetMonth?.Mois &&
												h.Annee === selectedBudgetMonth?.Annee;
											return (
												<div
													key={`${h.Mois}-${h.Annee}`}
													className="flex flex-col items-center gap-1"
												>
													<span className={`text-base leading-none font-black ${status.text}`}>
														{status.percentage}%
													</span>
													<span
														className={`text-xs font-bold ${isSelected ? "text-primary font-black" : "text-slate-400"}`}
													>
														{(h.Label ?? "").toUpperCase()}
													</span>
												</div>
											);
										})
										: ["JAN", "FEB", "MAR", "APR"].map((label) => (
											<div
												key={label}
												className="flex flex-col items-center gap-1 text-slate-300"
											>
												<span className="text-base leading-none font-black">—</span>
												<span className="text-xs font-bold">{label}</span>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* APQP Milestones */}
				<section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<div className="border-l-4 border-violet-500 px-6 pt-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
								<FaSitemap className="text-violet-600 text-xl" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-slate-900">
									Planning vs Forecast (APQP Milestones)
								</h2>
								<p className="text-xs text-slate-500">
									Current:{" "}
									<strong className={apqpCurrentStatus.text}>
										{apqpCurrentStatus.percentage}%
									</strong>{" "}
									&middot; Health:{" "}
									<strong
										className={apqpCurrentStatus.text}
									>
										{apqpCurrentStatus.label}
									</strong>
								</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-6 p-6">
						<div className="col-span-12 lg:col-span-5 space-y-6">
							<p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
								Milestone Adherence
							</p>
							<div className="flex justify-between items-center gap-2 px-2">
								{apqpHistory.length
									? apqpHistory.map(
										(h: ProgramHistoriqueMois) => {
											const isSelected =
												h.Mois === selectedApqpMonth?.Mois &&
												h.Annee === selectedApqpMonth?.Annee;
											const status = getApqpStatus(h.Valeur);
											return (
												<div
													key={`apqp-${h.Mois}-${h.Annee}`}
													className="flex flex-col items-center gap-1"
												>
													<span className={`text-xs font-semibold ${isSelected ? "text-violet-600" : "text-slate-400"}`}>
														T: 100%
													</span>
													<div
														className={`rounded-full border-2 flex items-center justify-center transition-all ${status.border} ${status.bg} ${
															isSelected
																? `w-20 h-20 shadow-md ${status.shadow}`
																: "w-14 h-14"
														}`}
													>
														<span className={`font-bold ${status.text} ${isSelected ? "text-sm" : "text-xs"}`}>
															{status.percentage}%
														</span>
													</div>
													<p
														className={`text-xs font-bold ${isSelected ? "text-violet-600" : "text-slate-500"}`}
													>
														{(h.Label ?? "").toUpperCase()}
													</p>
												</div>
											);
										}
									)
									: [1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="flex flex-col items-center gap-1"
										>
											<span className="text-xs text-slate-300 font-semibold">
												T: 100%
											</span>
											<div className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center">
												<span className="text-xs font-bold text-slate-300">
													—
												</span>
											</div>
											<p className="text-xs font-bold text-slate-300">
												—
											</p>
										</div>
									))}
							</div>
							<div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500">
								{apqp
									? `Delta: ${(apqp.Delta_Pts_Vs_M_1 ?? 0) >= 0 ? "+" : ""}${apqp.Delta_Pts_Vs_M_1 ?? 0} pts vs M-1`
									: "No data available."}
							</div>
						</div>
						<div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
							<div className="flex items-center justify-between mb-3">
								<p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
									Completion Rate
								</p>
								<div className="flex gap-4">
									<span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
										<span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block" />
										TARGET
									</span>
									<span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
										<span className="inline-flex w-4 h-0.5 overflow-hidden rounded-full">
											<span className="flex-1 bg-red-500" />
											<span className="flex-1 bg-amber-500" />
											<span className="flex-1 bg-emerald-500" />
										</span>
										ACTUAL
									</span>
								</div>
							</div>
							<div>
								<div className="h-44">
									<svg
										className="w-full h-full overflow-visible"
										viewBox="0 0 400 100"
										preserveAspectRatio="none"
									>
										{(() => {
											if (!apqpHistory.length) return null;
											const chartLeft = 40;
											const chartRight = 392;
											const chartTop = 12;
											const chartBottom = 88;
											const maxVal = Math.max(
												...apqpHistory.map((h) => h.Valeur ?? 0),
												100
											);
											const minVal = Math.min(
												...apqpHistory.map((h) => h.Valeur ?? 0),
												0
											);
											const range = maxVal - minVal || 1;
											const valueToY = (value: number) =>
												chartBottom -
												((value - minVal) / range) * (chartBottom - chartTop);
											const points = apqpHistory.map((h, i) => {
												const status = getApqpStatus(h.Valeur);
												const x =
													chartLeft +
													((i + 0.5) / apqpHistory.length) *
														(chartRight - chartLeft);
												return {
													x,
													y: valueToY(status.percentage),
													status,
												};
											});
											return (
												<>
													{[25, 50, 75].map((percentage) => {
														const y = valueToY(percentage);
														return (
															<line
																key={percentage}
																x1={chartLeft}
																y1={y}
																x2={chartRight}
																y2={y}
																stroke="#f1f5f9"
																strokeWidth="1"
															/>
														);
													})}
													<line
														x1={chartLeft}
														y1={valueToY(100)}
														x2={chartRight}
														y2={valueToY(100)}
														stroke="#cbd5e1"
														strokeWidth="1.5"
														strokeDasharray="5 3"
													/>
													{points.slice(1).map((point, i) => {
														const previousPoint = points[i];
														return (
															<line
																key={`apqp-line-${apqpHistory[i + 1].Mois}-${apqpHistory[i + 1].Annee}`}
																x1={previousPoint.x}
																y1={previousPoint.y}
																x2={point.x}
																y2={point.y}
																stroke={point.status.chart}
																strokeLinecap="round"
																strokeWidth="2.5"
															/>
														);
													})}
													{points.map((point, i) => (
														<circle
															key={`apqp-point-${apqpHistory[i].Mois}-${apqpHistory[i].Annee}`}
															cx={point.x}
															cy={point.y}
															r="4"
															fill={point.status.chart}
														/>
													))}
												</>
											);
										})()}
									</svg>
								</div>
								<div
									className="grid mt-2"
									style={{
										paddingLeft: "10%",
										paddingRight: "2%",
										gridTemplateColumns: `repeat(${apqpHistory.length || 4}, minmax(0, 1fr))`,
									}}
								>
									{apqpHistory.length
										? apqpHistory.map((h) => {
											const status = getApqpStatus(h.Valeur);
											const isSelected =
												h.Mois === selectedApqpMonth?.Mois &&
												h.Annee === selectedApqpMonth?.Annee;
											return (
												<div
													key={`apqp-label-${h.Mois}-${h.Annee}`}
													className="flex flex-col items-center gap-1"
												>
													<span className={`text-base leading-none font-black ${status.text}`}>
														{status.percentage}%
													</span>
													<span
														className={`text-xs font-bold ${isSelected ? "text-violet-600 font-black" : "text-slate-400"}`}
													>
														{(h.Label ?? "").toUpperCase()}
													</span>
												</div>
											);
										})
										: ["JAN", "FEB", "MAR", "APR"].map((label) => (
											<div
												key={label}
												className="flex flex-col items-center gap-1 text-slate-300"
											>
												<span className="text-base leading-none font-black">—</span>
												<span className="text-xs font-bold">{label}</span>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Documentation Progress */}
				<section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<div className="border-l-4 border-emerald-500 px-6 pt-6">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
								<FaBook className="text-emerald-600 text-xl" />
							</div>
							<h2 className="text-xl font-bold text-slate-900">
								Documentation Progress
							</h2>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-6 p-6">
						<div className="col-span-12 lg:col-span-5 space-y-6">
							<p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
								Historical Readiness
							</p>
							<div className="flex justify-between items-center gap-2 px-2">
								{(documentation?.Historique_4_Mois ?? []).length
									? (documentation?.Historique_4_Mois ?? []).map(
										(h: ProgramHistoriqueMois, i: number) => {
											const isLast =
												i ===
												(documentation?.Historique_4_Mois
													?.length ?? 1) -
												1;
											const val = h.Valeur ?? 0;
											const st = getPercentStatusColor(val, 100);
											const borderCls =
												st === "green"
													? "border-emerald-400"
													: st === "orange"
														? "border-amber-400"
														: "border-red-400";
											return (
												<div
													key={`doc-${h.Mois}-${h.Annee}`}
													className="flex flex-col items-center gap-1"
												>
													<span className={`text-xs font-semibold ${isLast ? "text-emerald-600" : "text-slate-400"}`}>
														T: 100%
													</span>
													<div
														className={`rounded-full border-2 flex items-center justify-center transition-all ${
															isLast
																? "w-20 h-20 border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
																: `w-14 h-14 ${borderCls}`
														}`}
													>
														<span className={`font-bold ${isLast ? "text-sm text-emerald-700" : "text-xs text-slate-600"}`}>
															{Math.round(val)}%
														</span>
													</div>
													<p
														className={`text-xs font-bold ${isLast ? "text-emerald-600" : "text-slate-500"}`}
													>
														{(h.Label ?? "").toUpperCase()}
													</p>
												</div>
											);
										}
									)
									: [1, 2, 3, 4].map((i) => (
										<div
											key={i}
											className="flex flex-col items-center gap-1"
										>
											<span className="text-xs text-slate-300 font-semibold">
												T: 100%
											</span>
											<div className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center">
												<span className="text-xs font-bold text-slate-300">
													—
												</span>
											</div>
											<p className="text-xs font-bold text-slate-300">
												—
											</p>
										</div>
									))}
							</div>
						</div>
						<div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
							<div className="flex items-center justify-between mb-3">
								<p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
									Approval Growth Trend
								</p>
								<span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
									{documentation?.Average_Hebdo_Mois ?? "—"}% Avg
								</span>
							</div>
							<div className="h-44 relative rounded-xl bg-slate-50 border border-slate-100 overflow-hidden">
								<svg
									className="w-full h-full px-4 pt-2"
									viewBox="0 0 400 100"
								>
									{(() => {
										const trend =
											documentation?.Trend_Hebdo_Mois ?? [];
										if (trend.length < 2) return null;
										const maxVal = Math.max(
											...trend.map((t) => t.Valeur ?? 0),
											100
										);
										const minVal = Math.min(
											...trend.map((t) => t.Valeur ?? 0),
											0
										);
										const range = maxVal - minVal || 1;
										const pts = trend.map((t, i) => {
											const x =
												(i / (trend.length - 1)) * 350 + 25;
											const y =
												85 -
												(((t.Valeur ?? 0) - minVal) / range) * 65;
											return { x, y };
										});
										const polyline = pts
											.map((p) => `${p.x},${p.y}`)
											.join(" ");
										const area = `M${pts.map((p) => `${p.x},${p.y}`).join("L")} L${pts[pts.length - 1].x},95 L${pts[0].x},95 Z`;
										return (
											<>
												<defs>
													<linearGradient
														id="doc-grad"
														x1="0"
														x2="0"
														y1="0"
														y2="1"
													>
														<stop
															offset="0%"
															stopColor="#10b981"
															stopOpacity="0.2"
														/>
														<stop
															offset="100%"
															stopColor="#10b981"
															stopOpacity="0"
														/>
													</linearGradient>
												</defs>
												<path
													d={area}
													fill="url(#doc-grad)"
												/>
												<polyline
													points={polyline}
													fill="none"
													stroke="#10b981"
													strokeLinecap="round"
													strokeWidth="2.5"
												/>
												{pts.map((p, i) => (
													<circle
														key={i}
														cx={p.x}
														cy={p.y}
														r="4"
														fill="#10b981"
													/>
												))}
											</>
										);
									})()}
								</svg>
							</div>
							<div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
								{(documentation?.Trend_Hebdo_Mois ?? []).length
									? (documentation?.Trend_Hebdo_Mois ?? []).map(
										(t: any) => (
											<span key={t.Label}>
												{t.Label?.toUpperCase() ?? ""}
											</span>
										)
									)
									: ["W14", "W15", "W16", "W17", "W18"].map((l) => (
										<span key={l}>{l}</span>
									))}
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}, [monthlyData, period, year]);

	if (loading) {
		return (
			<main className="flex-1 overflow-hidden">
				<div className="p-6 sm:p-8 flex items-center justify-center min-h-[400px]">
					<div className="flex flex-col items-center gap-4">
						<div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
						<p className="text-slate-500 font-medium">
							Chargement des données programme...
						</p>
					</div>
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="flex-1 overflow-hidden">
				<div className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
					<div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
						<span className="material-symbols-outlined text-rose-500">
							error
						</span>
					</div>
					<p className="text-rose-600 font-semibold">{error}</p>
					<p className="text-slate-400 text-sm">
						Vérifiez que l&apos;API programme est disponible.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="flex-1 overflow-hidden">
			<div className="p-6 sm:p-8">
				{/* Header */}
				<div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
					<div className="flex flex-wrap items-center gap-2 mt-2">
						<span className="w-1 h-8 rounded-full bg-blue-500 block" />
						<span className="text-xs font-bold uppercase tracking-widest text-blue-500">
							Program KPI
						</span>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<PeriodSelector
							type={activeTab}
							period={period}
							year={year}
							onPeriodChange={setPeriod}
							onYearChange={setYear}
							variant="light"
						/>
						<TabSelector
							activeTab={activeTab}
							onTabChange={(tab) => setActiveTab(tab)}
							variant="light"
						/>
					</div>
				</div>

				{activeTab === "weekly" ? <WeeklyProgram /> : <MonthlyProgram />}
			</div>
		</main>
	);
}