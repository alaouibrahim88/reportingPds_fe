"use client";
import { TabSelector } from "@/components/ui/TabSelector";
import React, { useState, useEffect, useCallback } from "react";
import type {
	ProgramApiResponse,
	ProgramHistoriqueMois,
	ProgramHistoriqueSemaine,
} from "@/types";

type TabType = "weekly" | "monthly";

function getVarianceStatusColor(variance: number): string {
	if (variance <= 0) return "green";
	if (variance <= 5) return "orange";
	return "red";
}

function getPercentStatusColor(value: number, target: number): string {
	const pct = target ? (value / target) * 100 : 0;
	if (pct >= 90) return "green";
	if (pct >= 70) return "orange";
	return "red";
}

// Programs Dashboard Page - Fetches from /api/program
export default function ProgramsPage() {
	const [activeTab, setActiveTab] = useState<TabType>("monthly");
	const [programData, setProgramData] = useState<ProgramApiResponse | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchProgram() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch("/api/program", { cache: "no-store" });
				if (!res.ok) throw new Error("Failed to fetch program data");
				const data: ProgramApiResponse = await res.json();
				setProgramData(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load program data"
				);
			} finally {
				setLoading(false);
			}
		}
		fetchProgram();
	}, []);

	const weeklyData = programData?.Program_Mois ?? null;
	const monthlyData = programData?.Program_Semaine ?? null;

	const WeeklyProgram = useCallback(() => {
		const data = weeklyData;
		const budget = data?.Budget_Vs_Actual;
		const historiqueBudget = budget?.Historique_4_Mois ?? [];
		const budgetHealth = budget?.Current_Health ?? "—";
		const budgetHealthClass =
			budgetHealth === "On Track"
				? "text-green-600"
				: budgetHealth === "At Risk"
					? "text-orange-600"
					: "text-slate-600";
		const varianceToK = (v: number) =>
			v >= 0 ? `+$${Math.round(Math.abs(v) / 1000)}k` : `-$${Math.round(Math.abs(v) / 1000)}k`;

		return (
			<div>
				<section className="space-y-4">
					<div className="flex items-center gap-2 px-1">
						<span className="material-symbols-outlined text-primary">
							payments
						</span>
						<h2 className="text-xl font-extrabold text-slate-900">
							Budget vs Actual (CAPEX/OPEX)
						</h2>
					</div>
					<div className="grid grid-cols-12 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
						<div className="col-span-12 lg:col-span-5 space-y-8">
							<h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
								Historical Performance
							</h3>
							<div className="flex justify-between items-center gap-2 px-2">
								{historiqueBudget.length
									? historiqueBudget.map((h: ProgramHistoriqueMois, i: number) => {
											const isLast = i === historiqueBudget.length - 1;
											const variance = h.Variance ?? 0;
											const status = getVarianceStatusColor(variance);
											const borderClass =
												status === "green"
													? "border-green-500"
													: status === "orange"
														? "border-orange-500"
														: "border-red-500";
											const displayVariance = varianceToK(variance);
											return (
												<div
													key={`${h.Mois}-${h.Annee}`}
													className="flex flex-col items-center gap-3"
												>
													<span
														className={`text-xs font-black ${isLast ? "text-primary" : "text-slate-700"}`}
													>
														{displayVariance}
													</span>
													<div
														className={`w-16 h-16 rounded-full border-4 ${borderClass} flex items-center justify-center bg-transparent ${isLast ? "ring-4 ring-primary/5" : ""}`}
													>
														<span className="text-sm font-bold text-slate-600">
															{displayVariance}
														</span>
													</div>
													<p
														className={`text-[10px] font-bold ${isLast ? "text-primary" : "text-slate-500"}`}
													>
														{(h.Label ?? "").toUpperCase()}
													</p>
												</div>
											);
										})
									: [1, 2, 3, 4].map((i) => (
											<div key={i} className="flex flex-col items-center gap-3">
												<span className="text-xs font-black text-slate-400">—</span>
												<div className="w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center bg-transparent">
													<span className="text-sm font-bold text-slate-400">—</span>
												</div>
												<p className="text-[10px] font-bold text-slate-400">—</p>
											</div>
										))}
							</div>
							<div className="p-4 bg-slate-50 rounded-lg">
								<p className="text-sm font-medium text-slate-600">
									Current Health:
									<span className={`font-bold ${budgetHealthClass}`}>
										{budgetHealth}
									</span>
								</p>
								<p className="text-xs text-slate-500 mt-1">
									{budget
										? `Variance ${varianceToK(budget.Variance_Mois_Courant)} vs target.`
										: "No data available."}
								</p>
							</div>
						</div>
						<div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
									Monthly Spend Trend
								</h3>
								<div className="flex gap-4">
									<div className="flex items-center gap-1.5 text-[10px] font-bold">
										<span className="w-2 h-2 rounded-full bg-primary"></span>
										BUDGET
									</div>
									<div className="flex items-center gap-1.5 text-[10px] font-bold">
										<span className="w-2 h-2 rounded-full bg-slate-300"></span>
										ACTUAL
									</div>
								</div>
							</div>
							<div className="h-48 w-full relative">
								<svg
									className="w-full h-full overflow-visible"
									preserveAspectRatio="none"
									viewBox="0 0 400 100"
								>
									<path
										d="M0,80 L100,70 L200,60 L300,45 L400,30"
										fill="none"
										stroke="#cbd5e1"
										strokeDasharray="4"
										strokeWidth="2"
									/>
									<path
										d="M0,85 L100,75 L200,62 L300,50 L400,35"
										fill="none"
										stroke="#0d7ff2"
										strokeLinecap="round"
										strokeWidth="3"
									/>
									<circle cx="400" cy="35" fill="#0d7ff2" r="4" />
								</svg>
								<div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
									{historiqueBudget.length
										? historiqueBudget.map((h) => (
												<span key={`${h.Mois}-${h.Annee}`}>
													{(h.Label ?? "").toUpperCase()}
												</span>
											))
										: ["JAN", "FEB", "MAR", "APR", "MAY"].map((l) => (
												<span key={l}>{l}</span>
											))}
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="space-y-4">
					<div className="flex items-center gap-2 px-1">
						<span className="material-symbols-outlined text-primary">
							account_tree
						</span>
						<h2 className="text-xl font-extrabold text-slate-900">
							Planning vs Forecast (APQP Milestones)
						</h2>
					</div>
					<div className="grid grid-cols-12 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
						<div className="col-span-12 lg:col-span-5 space-y-8">
							<h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
								Milestone Adherence
							</h3>
							<div className="flex justify-between items-center gap-2 px-2">
								{(data?.APQP_Milestones?.Historique_4_Mois ?? []).length
									? (data?.APQP_Milestones?.Historique_4_Mois ?? []).map(
											(h: ProgramHistoriqueMois, i: number) => {
												const isLast =
													i === (data?.APQP_Milestones?.Historique_4_Mois?.length ?? 1) - 1;
												const valeur = h.Valeur ?? 0;
												const target = data?.APQP_Milestones?.Target ?? 100;
												const status = getPercentStatusColor(valeur, target);
												const borderClass =
													status === "green"
														? "border-green-500"
														: status === "orange"
															? "border-orange-500"
															: "border-red-500";
												return (
													<div
														key={`apqp-${h.Mois}-${h.Annee}`}
														className="flex flex-col items-center gap-3"
													>
														<span
															className={`text-xs font-black ${isLast ? "text-primary" : "text-slate-700"}`}
														>
															{Math.round(valeur)}%
														</span>
														<div
															className={`w-16 h-16 rounded-full border-4 ${borderClass} flex items-center justify-center bg-transparent ${isLast ? "ring-4 ring-primary/5" : ""}`}
														>
															<span className="text-sm font-bold text-slate-600">
																{Math.round(valeur)}%
															</span>
														</div>
														<p
															className={`text-[10px] font-bold ${isLast ? "text-primary" : "text-slate-500"}`}
														>
															{(h.Label ?? "").toUpperCase()}
														</p>
													</div>
												);
											}
										)
									: [1, 2, 3, 4].map((i) => (
											<div key={i} className="flex flex-col items-center gap-3">
												<span className="text-xs font-black text-slate-400">—</span>
												<div className="w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center bg-transparent">
													<span className="text-sm font-bold text-slate-400">—</span>
												</div>
												<p className="text-[10px] font-bold text-slate-400">—</p>
											</div>
										))}
							</div>
							<div className="p-4 bg-slate-50 rounded-lg">
								<p className="text-sm font-medium text-slate-600">
									Current Health:
									<span
										className={
											(data?.APQP_Milestones?.Current_Health ?? "") === "On Track"
												? "text-green-600 font-bold"
												: (data?.APQP_Milestones?.Current_Health ?? "") === "At Risk"
													? "text-orange-600 font-bold"
													: "text-slate-600 font-bold"
										}
									>
										{data?.APQP_Milestones?.Current_Health ?? "—"}
									</span>
								</p>
								<p className="text-xs text-slate-500 mt-1">
									{data?.APQP_Milestones
										? `Current: ${data.APQP_Milestones.Valeur_Mois_Courant}% vs target ${data.APQP_Milestones.Target}%.`
										: "No data available."}
								</p>
							</div>
						</div>
						<div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
									Milestone Completion Rate
								</h3>
								<div className="flex gap-4">
									<div className="flex items-center gap-1.5 text-[10px] font-bold">
										<span className="w-2 h-2 rounded-full bg-primary"></span>
										TARGET
									</div>
									<div className="flex items-center gap-1.5 text-[10px] font-bold">
										<span className="w-2 h-2 rounded-full bg-red-500"></span>
										ACTUAL
									</div>
								</div>
							</div>
							<div className="h-48 w-full relative">
								<svg
									className="w-full h-full overflow-visible"
									preserveAspectRatio="none"
									viewBox="0 0 400 100"
								>
									<path
										d="M0,90 L100,70 L200,50 L300,30 L400,10"
										fill="none"
										stroke="#cbd5e1"
										strokeWidth="2"
									/>
									<path
										d="M0,90 L100,75 L200,65 L300,55 L400,45"
										fill="none"
										stroke="#ef4444"
										strokeLinecap="round"
										strokeWidth="3"
									/>
									<circle cx="400" cy="45" fill="#ef4444" r="4" />
								</svg>
								<div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
									{(data?.APQP_Milestones?.Historique_4_Mois ?? []).length
										? (data?.APQP_Milestones?.Historique_4_Mois ?? []).map((h) => (
												<span key={`apqp-lbl-${h.Mois}-${h.Annee}`}>
													{(h.Label ?? "").toUpperCase()}
												</span>
											))
										: ["JAN", "FEB", "MAR", "APR", "MAY"].map((l) => (
												<span key={l}>{l}</span>
											))}
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="space-y-4">
					<div className="flex items-center gap-2 px-1">
						<span className="material-symbols-outlined text-primary">
							menu_book
						</span>
						<h2 className="text-xl font-extrabold text-slate-900">
							Documentation Progress
						</h2>
					</div>
					<div className="grid grid-cols-12 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
						<div className="col-span-12 lg:col-span-5 space-y-8">
							<h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
								Historical Readiness
							</h3>
							<div className="flex justify-between items-center gap-2 px-2">
								{(data?.Documentation_Progress?.Historique_4_Mois ?? []).length
									? (data?.Documentation_Progress?.Historique_4_Mois ?? []).map(
											(h: ProgramHistoriqueMois, i: number) => {
												const isLast =
													i ===
													(data?.Documentation_Progress?.Historique_4_Mois?.length ?? 1) - 1;
												const valeur = h.Valeur ?? 0;
												const target = data?.Documentation_Progress?.Target ?? 100;
												const status = getPercentStatusColor(valeur, target);
												const borderClass =
													status === "green"
														? "border-green-500"
														: status === "orange"
															? "border-orange-500"
															: "border-red-500";
												return (
													<div
														key={`doc-${h.Mois}-${h.Annee}`}
														className="flex flex-col items-center gap-3"
													>
														<span
															className={`text-xs font-black ${isLast ? "text-primary" : "text-slate-700"}`}
														>
															{Math.round(valeur)}%
														</span>
														<div
															className={`w-16 h-16 rounded-full border-4 ${borderClass} flex items-center justify-center bg-transparent ${isLast ? "ring-4 ring-primary/5" : ""}`}
														>
															<span className="text-sm font-bold text-slate-600">
																{Math.round(valeur)}%
															</span>
														</div>
														<p
															className={`text-[10px] font-bold ${isLast ? "text-primary" : "text-slate-500"}`}
														>
															{(h.Label ?? "").toUpperCase()}
														</p>
													</div>
												);
											}
										)
									: [1, 2, 3, 4].map((i) => (
											<div key={i} className="flex flex-col items-center gap-3">
												<span className="text-xs font-black text-slate-400">—</span>
												<div className="w-16 h-16 rounded-full border-4 border-slate-200 flex items-center justify-center bg-transparent">
													<span className="text-sm font-bold text-slate-400">—</span>
												</div>
												<p className="text-[10px] font-bold text-slate-400">—</p>
											</div>
										))}
							</div>
							<div className="grid grid-cols-3 gap-4 pt-2">
								<div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
									<p className="text-[10px] font-extrabold text-slate-400 uppercase">
										Plans
									</p>
									<p className="text-xl font-black text-slate-900 mt-1">
										{data?.Documentation_Progress?.Plans ?? "—"}%
									</p>
								</div>
								<div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
									<p className="text-[10px] font-extrabold text-slate-400 uppercase">
										Procedures
									</p>
									<p className="text-xl font-black text-slate-900 mt-1">
										{data?.Documentation_Progress?.Procedures ?? "—"}%
									</p>
								</div>
								<div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
									<p className="text-[10px] font-extrabold text-slate-400 uppercase">
										Work Inst.
									</p>
									<p className="text-xl font-black text-slate-900 mt-1">
										{data?.Documentation_Progress?.Work_Inst ?? "—"}%
									</p>
								</div>
							</div>
						</div>
						<div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
							<h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
								Total Approval Growth
							</h3>
							<div className="h-40 w-full relative chart-placeholder rounded-lg flex items-center justify-center border border-dashed border-slate-200">
								<svg className="w-full h-full px-4" viewBox="0 0 400 100">
									<path
										d="M0,100 Q100,80 200,60 T400,20"
										fill="none"
										stroke="#0d7ff2"
										strokeLinecap="round"
										strokeWidth="4"
									/>
									<path
										d="M0,100 Q100,80 200,60 T400,20 V100 H0 Z"
										fill="url(#grad1)"
										opacity="0.1"
									/>
									<defs>
										<linearGradient
											id="grad1"
											x1="0%"
											x2="0%"
											y1="0%"
											y2="100%"
										>
											<stop
												offset="0%"
												style={{ stopColor: "#0d7ff2", stopOpacity: 1 }}
											/>
											<stop
												offset="100%"
												style={{ stopColor: "#0d7ff2", stopOpacity: 0 }}
											/>
										</linearGradient>
									</defs>
								</svg>
								<span className="absolute right-4 top-4 text-xs font-bold text-primary">
									{data?.Documentation_Progress?.Average_Hebdo_Mois ?? "—"}% Average
								</span>
							</div>
							<div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
								{(data?.Documentation_Progress?.Trend_Hebdo_Mois ?? []).length
									? (data?.Documentation_Progress?.Trend_Hebdo_Mois ?? []).map(
											(t) => (
												<span key={t.Label}>{t.Label?.toUpperCase() ?? ""}</span>
											)
										)
									: ["WEEK 14", "WEEK 15", "WEEK 16", "WEEK 17", "WEEK 18"].map(
											(l) => (
												<span key={l}>{l}</span>
											)
										)}
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}, [weeklyData]);

	const MonthlyProgram = useCallback(() => {
		const data = monthlyData;
		const otd = data?.On_Time_Delivery;
		const otdHist = otd?.Historique_4_Semaines ?? [];
		const otdVariation = otd?.Variation_Vs_Semaine_Precedente ?? 0;
		const otdTrendUp = otdVariation >= 0;

		return (
			<div>
				<div className="space-y-4">
					<section className="bg-white rounded-xl border border-slate-200 p-8 mb-6 shadow-sm">
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
								<span className="material-symbols-outlined text-primary text-3xl">
									local_shipping
								</span>
								On Time Delivery (OTD)
							</h2>
							<div className="text-right">
								<p className="text-4xl font-black text-slate-900">
									{otd?.Valeur_Actuelle ?? "—"}%
								</p>
								<p
									className={`text-sm font-medium flex items-center justify-end gap-1 ${otdTrendUp ? "text-emerald-600" : "text-rose-600"}`}
								>
									<span className="material-symbols-outlined text-sm">
										{otdTrendUp ? "trending_up" : "trending_down"}
									</span>
									{otdVariation >= 0 ? "+" : ""}
									{otdVariation}% vs prev week
								</p>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
							<div className="lg:col-span-4 flex justify-between px-2">
								{otdHist.length
									? otdHist.map((h: ProgramHistoriqueSemaine, i: number) => {
											const isLast = i === otdHist.length - 1;
											const valeur = h.Valeur ?? 0;
											const target = otd?.Target_Actuelle ?? 100;
											const status = getPercentStatusColor(valeur, target);
											const statusClass =
												status === "green"
													? "status-green"
													: status === "orange"
														? "status-amber"
														: "status-red";
											return (
												<div
													key={`otd-${h.Semaine}-${h.Annee}`}
													className="flex flex-col items-center gap-3"
												>
													<div
														className={`kpi-circle ${isLast ? "kpi-circle-active status-primary" : statusClass}`}
													>
														<span
															className={isLast ? "kpi-value-active text-slate-900" : "kpi-value"}
														>
															{valeur}%
														</span>
													</div>
													<span
														className={`text-xs font-bold uppercase tracking-widest ${isLast ? "text-primary" : "text-slate-500"}`}
													>
														Week {h.Semaine}
													</span>
												</div>
											);
										})
									: [40, 41, 42, 43].map((w) => (
											<div key={w} className="flex flex-col items-center gap-3">
												<div className="kpi-circle status-green">
													<span className="kpi-value">—</span>
												</div>
												<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
													Week {w}
												</span>
											</div>
										))}
							</div>
							<div className="lg:col-span-8 h-40 relative">
								<svg
									className="w-full h-full"
									preserveAspectRatio="none"
									viewBox="0 0 500 100"
								>
									<defs>
										<linearGradient
											id="otd-gradient"
											x1="0"
											x2="0"
											y1="0"
											y2="1"
										>
											<stop
												offset="0%"
												stopColor="#0d7ff2"
												stopOpacity="0.2"
											/>
											<stop
												offset="100%"
												stopColor="#0d7ff2"
												stopOpacity="0"
											/>
										</linearGradient>
									</defs>
									<path
										d="M0,80 Q125,90 250,50 T500,20 L500,100 L0,100 Z"
										fill="url(#otd-gradient)"
									/>
									<path
										d="M0,80 Q125,90 250,50 T500,20"
										fill="none"
										stroke="#0d7ff2"
										strokeWidth="3"
									/>
									<circle cx="500" cy="20" fill="#0d7ff2" r="5" />
								</svg>
							</div>
						</div>
					</section>
					<section className="bg-white rounded-xl border border-slate-200 p-8 mb-6 shadow-sm">
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
								<span className="material-symbols-outlined text-primary text-3xl">
									engineering
								</span>
								Critical Equipment Availability
							</h2>
							<div className="text-right">
								<p className="text-4xl font-black text-slate-900">
									{data?.Critical_Equipment_Availability?.Valeur_Actuelle ?? "—"}%
								</p>
								<p
									className={`text-sm font-medium flex items-center justify-end gap-1 ${(data?.Critical_Equipment_Availability?.Variation_Vs_Semaine_Precedente ?? 0) >= 0 ? "text-emerald-600" : "text-rose-600"}`}
								>
									<span className="material-symbols-outlined text-sm">
										{(data?.Critical_Equipment_Availability?.Variation_Vs_Semaine_Precedente ?? 0) >= 0 ? "trending_up" : "trending_down"}
									</span>
									{(data?.Critical_Equipment_Availability?.Variation_Vs_Semaine_Precedente ?? 0) >= 0 ? "+" : ""}
									{data?.Critical_Equipment_Availability?.Variation_Vs_Semaine_Precedente ?? 0}% vs prev week
								</p>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
							<div className="lg:col-span-4 flex justify-between px-2">
								{(data?.Critical_Equipment_Availability?.Historique_4_Semaines ?? []).length
									? (data?.Critical_Equipment_Availability?.Historique_4_Semaines ?? []).map(
											(h: ProgramHistoriqueSemaine, i: number) => {
												const isLast =
													i ===
													(data?.Critical_Equipment_Availability?.Historique_4_Semaines?.length ?? 1) - 1;
												const valeur = h.Valeur ?? 0;
												const target = data?.Critical_Equipment_Availability?.Target_Actuelle ?? 100;
												const status = getPercentStatusColor(valeur, target);
												const statusClass =
													status === "green"
														? "status-green"
														: status === "orange"
															? "status-amber"
															: "status-red";
												return (
													<div
														key={`equip-${h.Semaine}-${h.Annee}`}
														className="flex flex-col items-center gap-3"
													>
														<div
															className={`kpi-circle ${isLast ? "kpi-circle-active status-primary" : statusClass}`}
														>
															<span
																className={isLast ? "kpi-value-active text-slate-900" : "kpi-value"}
															>
																{valeur}%
															</span>
														</div>
														<span
															className={`text-xs font-bold uppercase tracking-widest ${isLast ? "text-primary" : "text-slate-500"}`}
														>
															Week {h.Semaine}
														</span>
													</div>
												);
											}
										)
									: [40, 41, 42, 43].map((w) => (
											<div key={w} className="flex flex-col items-center gap-3">
												<div className="kpi-circle status-green">
													<span className="kpi-value">—</span>
												</div>
												<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
													Week {w}
												</span>
											</div>
										))}
							</div>
							<div className="lg:col-span-8 h-40 relative">
								<svg
									className="w-full h-full"
									preserveAspectRatio="none"
									viewBox="0 0 500 100"
								>
									<defs>
										<linearGradient
											id="equip-gradient"
											x1="0"
											x2="0"
											y1="0"
											y2="1"
										>
											<stop
												offset="0%"
												stopColor="#0d7ff2"
												stopOpacity="0.2"
											/>
											<stop
												offset="100%"
												stopColor="#0d7ff2"
												stopOpacity="0"
											/>
										</linearGradient>
									</defs>
									<path
										d="M0,20 L166,25 L332,15 L500,75 L500,100 L0,100 Z"
										fill="url(#equip-gradient)"
									/>
									<path
										d="M0,20 L166,25 L332,15 L500,75"
										fill="none"
										stroke="#0d7ff2"
										strokeLinejoin="round"
										strokeWidth="3"
									/>
									<circle cx="500" cy="75" fill="#0d7ff2" r="5" />
								</svg>
							</div>
						</div>
					</section>
					<section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
								<span className="material-symbols-outlined text-primary text-3xl">
									person_add
								</span>
								Recruitment Progress vs Forecast
							</h2>
							<div className="text-right">
								<p className="text-4xl font-black text-slate-900">
									{data?.Recruitment_Progress?.Total_Hires_MTD ?? "—"} /{" "}
									{data?.Recruitment_Progress?.Total_Forecast_MTD ?? "—"}
								</p>
								<p className="text-sm font-medium text-slate-500">
									Total Hires (MTD)
								</p>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
							<div className="lg:col-span-4 flex justify-between px-2">
								{(data?.Recruitment_Progress?.Historique_4_Semaines ?? []).length
									? (data?.Recruitment_Progress?.Historique_4_Semaines ?? []).map(
											(h: ProgramHistoriqueSemaine, i: number) => {
												const isLast =
													i ===
													(data?.Recruitment_Progress?.Historique_4_Semaines?.length ?? 1) - 1;
												const reel = h.Reel ?? 0;
												const forecast = h.Forecast ?? 0;
												const pct = h.Pct ?? 0;
												const status =
													pct >= 90 ? "green" : pct >= 70 ? "amber" : "red";
												const statusClass =
													status === "green"
														? "status-green"
														: status === "amber"
															? "status-amber"
															: "status-red";
												return (
													<div
														key={`recruit-${h.Semaine}-${h.Annee}`}
														className="flex flex-col items-center gap-3"
													>
														<div
															className={`kpi-circle ${isLast ? "kpi-circle-active status-primary" : statusClass}`}
														>
															<span
																className={isLast ? "kpi-value-active text-slate-900" : "kpi-value"}
															>
																{reel}/{forecast}
															</span>
														</div>
														<span
															className={`text-xs font-bold uppercase tracking-widest ${isLast ? "text-primary" : "text-slate-500"}`}
														>
															Week {h.Semaine}
														</span>
													</div>
												);
											}
										)
									: [40, 41, 42, 43].map((w) => (
											<div key={w} className="flex flex-col items-center gap-3">
												<div className="kpi-circle status-green">
													<span className="kpi-value">—</span>
												</div>
												<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
													Week {w}
												</span>
											</div>
										))}
							</div>
							<div className="lg:col-span-8 h-40 relative">
								<svg
									className="w-full h-full"
									preserveAspectRatio="none"
									viewBox="0 0 500 100"
								>
									<line
										stroke="#cbd5e1"
										strokeDasharray="4"
										strokeWidth="2"
										x1="0"
										x2="500"
										y1="90"
										y2="10"
									/>
									<path
										d="M0,90 L125,75 L250,55 L375,45 L500,40"
										fill="none"
										stroke="#0d7ff2"
										strokeLinecap="round"
										strokeWidth="3"
									/>
									<circle cx="500" cy="40" fill="#0d7ff2" r="5" />
								</svg>
								<div className="absolute bottom-0 right-0">
									<span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
										Dashed: Forecast | Solid: Actual
									</span>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		);
	}, [monthlyData]);

	if (loading) {
		return (
			<main className="flex-1 overflow-hidden">
				<div className="p-6 sm:p-8 flex items-center justify-center min-h-[400px]">
					<p className="text-slate-600">Chargement des données programme...</p>
				</div>
			</main>
		);
	}

	if (error) {
		return (
			<main className="flex-1 overflow-hidden">
				<div className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
					<p className="text-rose-600 font-medium">{error}</p>
					<p className="text-slate-500 text-sm">
						Vérifiez que l&apos;API programme est disponible.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="flex-1 overflow-hidden">
			<div className="p-6 sm:p-8 space-y-8">
				{/* Programs Dashboard Title */}
				<div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<span className="flex h-10 w-1 rounded-full bg-primary" />
							<span className="text-sm font-semibold uppercase tracking-wider text-primary">
								Project KPI
							</span>
						</div>
						<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
							{activeTab === "weekly" ? "Hebdomadaire" : "Mensuel"} Reporting
						</h1>
						<p className="text-slate-600 max-w-xl leading-relaxed">
							Executive overview of financial health, APQP milestone adherence,
							and project documentation readiness for Q1-Q2.
						</p>
					</div>
					<TabSelector
						activeTab={activeTab}
						onTabChange={setActiveTab}
						variant="light"
					/>
				</div>
				{activeTab === "weekly" ? <WeeklyProgram /> : <MonthlyProgram />}
			</div>
		</main>
	);
}
