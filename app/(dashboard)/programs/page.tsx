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
}: {
	value: string;
	label: string;
	isActive: boolean;
	status: string;
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
		<div className="flex flex-col items-center gap-2">
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

export default function ProgramsPage() {
	const [activeTab, setActiveTab] = useState<TabType>("weekly");
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
				const res = await fetch(`/api/program?type=${activeTab}`, {
					cache: "no-store",
				});
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
	}, [activeTab]);

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
									<span className="material-symbols-outlined text-primary text-xl">
										local_shipping
									</span>
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
										<span className="material-symbols-outlined text-base">
											{(otd?.Variation_Vs_Semaine_Precedente ?? 0) >= 0
												? "trending_up"
												: "trending_down"}
										</span>
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
									<span className="material-symbols-outlined text-violet-600 text-xl">
										engineering
									</span>
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
										<span className="material-symbols-outlined text-base">
											{(equipment?.Variation_Vs_Semaine_Precedente ??
												0) >= 0
												? "trending_up"
												: "trending_down"}
										</span>
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
									<span className="material-symbols-outlined text-emerald-600 text-xl">
										person_add
									</span>
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
		const budgetHealth = budget?.Current_Health ?? "—";
		const budgetHealthCfg =
			budgetHealth === "On Track"
				? {
						text: "text-emerald-700",
						bg: "bg-emerald-50",
						dot: "bg-emerald-500",
					}
				: budgetHealth === "At Risk"
					? {
							text: "text-amber-700",
							bg: "bg-amber-50",
							dot: "bg-amber-500",
						}
					: {
							text: "text-slate-600",
							bg: "bg-slate-50",
							dot: "bg-slate-400",
						};

		return (
			<div className="space-y-6">
				{/* Budget vs Actual */}
				<section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
					<div className="border-l-4 border-primary px-6 pt-6">
						<div className="flex items-center gap-3 mb-1">
							<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
								<span className="material-symbols-outlined text-primary text-xl">
									payments
								</span>
							</div>
							<div>
								<h2 className="text-lg font-bold text-slate-900">
									Budget vs Actual (CAPEX/OPEX)
								</h2>
								<div className="flex items-center gap-2 mt-0.5">
									<span
										className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${budgetHealthCfg.bg} ${budgetHealthCfg.text}`}
									>
										<span
											className={`w-1.5 h-1.5 rounded-full ${budgetHealthCfg.dot}`}
										/>
										{budgetHealth}
									</span>
									{budget && (
										<span className="text-xs text-slate-500">
											Variance{" "}
											{varianceToK(
												budget.Variance_Mois_Courant ?? 0
											)}{" "}
											vs target{" "}
											{varianceToK(budget.Target_Variance ?? 0)}
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-6 p-6">
						<div className="col-span-12 lg:col-span-5 space-y-6">
							<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
								Historical Performance
							</p>
							<div className="flex justify-between items-center gap-2 px-2">
								{historiqueBudget.length
									? historiqueBudget.map(
											(h: ProgramHistoriqueMois, i: number) => {
												const isLast =
													i === historiqueBudget.length - 1;
												const variance = h.Variance ?? 0;
												const st = getVarianceStatusColor(variance);
												const borderCls =
													st === "green"
														? "border-emerald-400"
														: st === "orange"
															? "border-amber-400"
															: "border-red-400";
												const bgCls = isLast
													? "ring-4 ring-primary/10"
													: "";
												const labelCls = isLast
													? "text-primary"
													: "text-slate-500";
												const dv = varianceToK(variance);
												return (
													<div
														key={`${h.Mois}-${h.Annee}`}
														className="flex flex-col items-center gap-2"
													>
														<span
															className={`text-xs font-black ${isLast ? "text-primary" : "text-slate-700"}`}
														>
															{dv}
														</span>
														<div
															className={`w-14 h-14 rounded-full border-2 ${borderCls} flex items-center justify-center ${bgCls}`}
														>
															<span className="text-xs font-bold text-slate-600">
																{dv}
															</span>
														</div>
														<p
															className={`text-[10px] font-bold ${labelCls}`}
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
												className="flex flex-col items-center gap-2"
											>
												<span className="text-xs font-black text-slate-300">
													—
												</span>
												<div className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center">
													<span className="text-xs font-bold text-slate-300">
														—
													</span>
												</div>
												<p className="text-[10px] font-bold text-slate-300">
													—
												</p>
											</div>
										))}
							</div>
						</div>
						<div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
							<div className="flex items-center justify-between mb-3">
								<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
									Monthly Spend Trend
								</p>
								<div className="flex gap-4">
									<span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
										<span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block" />
										BUDGET
									</span>
									<span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
										<span className="w-3 h-0.5 bg-primary inline-block rounded-full" />
										ACTUAL
									</span>
								</div>
							</div>
							<div className="h-44">
								<svg
									className="w-full h-full overflow-visible"
									viewBox="0 0 400 100"
									preserveAspectRatio="none"
								>
									{(() => {
										if (!historiqueBudget.length) return null;
										const maxVal = Math.max(
											...historiqueBudget.map((h) =>
												Math.max(h.Budget ?? 0, h.Actual ?? 0)
											),
											1
										);
										const bp = historiqueBudget.map((h, i) => {
											const x =
												(i / (historiqueBudget.length - 1)) *
													350 +
												25;
											const y =
												90 - ((h.Budget ?? 0) / maxVal) * 70;
											return `${x},${y}`;
										});
										const ap = historiqueBudget.map((h, i) => {
											const x =
												(i / (historiqueBudget.length - 1)) *
													350 +
												25;
											const y =
												90 - ((h.Actual ?? 0) / maxVal) * 70;
											return `${x},${y}`;
										});
										return (
											<>
												{[25, 50, 75].map((pct) => (
													<line
														key={pct}
														x1="20"
														y1={90 - pct * 0.7}
														x2="380"
														y2={90 - pct * 0.7}
														stroke="#f1f5f9"
														strokeWidth="1"
													/>
												))}
												<polyline
													points={bp.join(" ")}
													fill="none"
													stroke="#cbd5e1"
													strokeDasharray="5 3"
													strokeWidth="1.5"
												/>
												<polyline
													points={ap.join(" ")}
													fill="none"
													stroke="#0d7ff2"
													strokeLinecap="round"
													strokeWidth="2.5"
												/>
												{historiqueBudget.map((h, i) => {
													const x =
														(i / (historiqueBudget.length - 1)) *
															350 +
														25;
													const y =
														90 - ((h.Actual ?? 0) / maxVal) * 70;
													return (
														<circle
															key={i}
															cx={x}
															cy={y}
															r="4"
															fill="#0d7ff2"
														/>
													);
												})}
											</>
										);
									})()}
								</svg>
								<div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
									{historiqueBudget.length
										? historiqueBudget.map((h) => (
												<span key={`${h.Mois}-${h.Annee}`}>
													{(h.Label ?? "").toUpperCase()}
												</span>
											))
										: ["JAN", "FEB", "MAR", "APR"].map((l) => (
												<span key={l}>{l}</span>
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
								<span className="material-symbols-outlined text-violet-600 text-xl">
									account_tree
								</span>
							</div>
							<div>
								<h2 className="text-lg font-bold text-slate-900">
									Planning vs Forecast (APQP Milestones)
								</h2>
								<p className="text-xs text-slate-500">
									Current:{" "}
									<strong>{apqp?.Valeur_Mois_Courant ?? "—"}%</strong>{" "}
									&middot; Health:{" "}
									<strong
										className={
											apqp?.Current_Health === "On Track"
												? "text-emerald-600"
												: apqp?.Current_Health === "At Risk"
													? "text-amber-600"
													: "text-slate-600"
										}
									>
										{apqp?.Current_Health ?? "—"}
									</strong>
								</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-6 p-6">
						<div className="col-span-12 lg:col-span-5 space-y-6">
							<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
								Milestone Adherence
							</p>
							<div className="flex justify-between items-center gap-2 px-2">
								{(apqp?.Historique_4_Mois ?? []).length
									? (apqp?.Historique_4_Mois ?? []).map(
											(h: ProgramHistoriqueMois, i: number) => {
												const isLast =
													i ===
													(apqp?.Historique_4_Mois?.length ?? 1) -
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
														key={`apqp-${h.Mois}-${h.Annee}`}
														className="flex flex-col items-center gap-2"
													>
														<span
															className={`text-xs font-black ${isLast ? "text-violet-600" : "text-slate-700"}`}
														>
															{Math.round(val)}%
														</span>
														<div
															className={`w-14 h-14 rounded-full border-2 ${borderCls} flex items-center justify-center ${isLast ? "ring-4 ring-violet-100" : ""}`}
														>
															<span className="text-xs font-bold text-slate-600">
																{Math.round(val)}%
															</span>
														</div>
														<p
															className={`text-[10px] font-bold ${isLast ? "text-violet-600" : "text-slate-500"}`}
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
												className="flex flex-col items-center gap-2"
											>
												<span className="text-xs font-black text-slate-300">
													—
												</span>
												<div className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center">
													<span className="text-xs font-bold text-slate-300">
														—
													</span>
												</div>
												<p className="text-[10px] font-bold text-slate-300">
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
								<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
									Completion Rate
								</p>
								<div className="flex gap-4">
									<span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
										<span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block" />
										TARGET
									</span>
									<span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
										<span className="w-3 h-0.5 bg-red-400 inline-block rounded-full" />
										ACTUAL
									</span>
								</div>
							</div>
							<div className="h-44">
								<svg
									className="w-full h-full overflow-visible"
									viewBox="0 0 400 100"
									preserveAspectRatio="none"
								>
									{(() => {
										const history = apqp?.Historique_4_Mois ?? [];
										if (!history.length) return null;
										const maxVal = Math.max(
											...history.map((h) => h.Valeur ?? 0),
											100
										);
										const minVal = Math.min(
											...history.map((h) => h.Valeur ?? 0),
											0
										);
										const range = maxVal - minVal || 1;
										const targetY =
											90 - ((100 - minVal) / range) * 70;
										const pts = history.map((h, i) => {
											const x =
												(i / (history.length - 1)) * 350 + 25;
											const y =
												90 -
												(((h.Valeur ?? 0) - minVal) / range) * 70;
											return `${x},${y}`;
										});
										return (
											<>
												{[25, 50, 75].map((pct) => (
													<line
														key={pct}
														x1="20"
														y1={90 - (pct / 100) * 70}
														x2="380"
														y2={90 - (pct / 100) * 70}
														stroke="#f1f5f9"
														strokeWidth="1"
													/>
												))}
												<line
													x1="25"
													y1={targetY}
													x2="375"
													y2={targetY}
													stroke="#cbd5e1"
													strokeWidth="1.5"
													strokeDasharray="5 3"
												/>
												<polyline
													points={pts.join(" ")}
													fill="none"
													stroke="#ef4444"
													strokeLinecap="round"
													strokeWidth="2.5"
												/>
												{history.map((h, i) => {
													const x =
														(i / (history.length - 1)) * 350 + 25;
													const y =
														90 -
														(((h.Valeur ?? 0) - minVal) / range) *
															70;
													return (
														<circle
															key={i}
															cx={x}
															cy={y}
															r="4"
															fill="#ef4444"
														/>
													);
												})}
											</>
										);
									})()}
								</svg>
								<div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
									{(apqp?.Historique_4_Mois ?? []).length
										? (apqp?.Historique_4_Mois ?? []).map((h) => (
												<span key={`apqp-lbl-${h.Mois}-${h.Annee}`}>
													{(h.Label ?? "").toUpperCase()}
												</span>
											))
										: ["JAN", "FEB", "MAR", "APR"].map((l) => (
												<span key={l}>{l}</span>
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
								<span className="material-symbols-outlined text-emerald-600 text-xl">
									menu_book
								</span>
							</div>
							<h2 className="text-lg font-bold text-slate-900">
								Documentation Progress
							</h2>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-6 p-6">
						<div className="col-span-12 lg:col-span-5 space-y-6">
							<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
														className="flex flex-col items-center gap-2"
													>
														<span
															className={`text-xs font-black ${isLast ? "text-emerald-600" : "text-slate-700"}`}
														>
															{Math.round(val)}%
														</span>
														<div
															className={`w-14 h-14 rounded-full border-2 ${borderCls} flex items-center justify-center ${isLast ? "ring-4 ring-emerald-100" : ""}`}
														>
															<span className="text-xs font-bold text-slate-600">
																{Math.round(val)}%
															</span>
														</div>
														<p
															className={`text-[10px] font-bold ${isLast ? "text-emerald-600" : "text-slate-500"}`}
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
												className="flex flex-col items-center gap-2"
											>
												<span className="text-xs font-black text-slate-300">
													—
												</span>
												<div className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center">
													<span className="text-xs font-bold text-slate-300">
														—
													</span>
												</div>
												<p className="text-[10px] font-bold text-slate-300">
													—
												</p>
											</div>
										))}
							</div>
							{/* Breakdown pills */}
							<div className="grid grid-cols-3 gap-3 pt-1">
								{[
									{
										label: "Plans",
										val: documentation?.Plans ?? "—",
									},
									{
										label: "Procedures",
										val: documentation?.Procedures ?? "—",
									},
									{
										label: "Work Inst.",
										val: documentation?.Work_Inst ?? "—",
									},
								].map((item) => (
									<div
										key={item.label}
										className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center"
									>
										<p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
											{item.label}
										</p>
										<p className="text-lg font-black text-slate-800">
											{item.val}%
										</p>
									</div>
								))}
							</div>
						</div>
						<div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
							<div className="flex items-center justify-between mb-3">
								<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
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
							<div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
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
	}, [monthlyData]);

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
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<span className="flex h-10 w-1 rounded-full bg-primary" />
							<span className="text-sm font-semibold uppercase tracking-wider text-primary">
								Project KPI
							</span>
						</div>
						<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
							{activeTab === "weekly" ? "Hebdomadaire" : "Mensuel"}{" "}
							Reporting
						</h1>
						<p className="text-slate-500 max-w-xl leading-relaxed text-sm">
							Executive overview of financial health, APQP milestone
							adherence, and project documentation readiness.
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
