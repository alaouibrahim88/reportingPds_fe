"use client";
import { PeriodSelector } from "@/components/ui/PeriodSelector";
import { TabSelector } from "@/components/ui/TabSelector";
import { useKpiPeriod } from "@/hooks/use-kpi-period";
import React, { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { FaBook, FaCogs, FaMoneyBillWave, FaSitemap, FaTruck, FaUserPlus } from "react-icons/fa";

type Status = "green" | "orange" | "red";

const MONTH_NAMES = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const MONTH_FULL_NAMES = [
	"janvier", "février", "mars", "avril", "mai", "juin",
	"juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

const STATUS_STYLES = {
	green: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-400", dot: "bg-emerald-500", chart: "#10b981" },
	orange: { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-400", dot: "bg-amber-500", chart: "#f59e0b" },
	red: { text: "text-red-700", bg: "bg-red-50", border: "border-red-400", dot: "bg-red-500", chart: "#ef4444" },
} as const;

// Accent of each card: top border, icon, selected period
const ACCENTS = {
	blue: { border: "border-t-blue-600", icon: "bg-blue-50 text-blue-600", pill: "bg-blue-600", ring: "ring-blue-500/30", color: "#2563eb" },
	violet: { border: "border-t-violet-500", icon: "bg-violet-50 text-violet-600", pill: "bg-violet-600", ring: "ring-violet-500/30", color: "#7c3aed" },
	emerald: { border: "border-t-emerald-500", icon: "bg-emerald-50 text-emerald-600", pill: "bg-emerald-600", ring: "ring-emerald-500/30", color: "#10b981" },
} as const;
type Accent = (typeof ACCENTS)[keyof typeof ACCENTS];

// Sizes grow with the screen height, so the page fits without scrolling from 650 px up
const cardClass =
	"flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 border-t-4 bg-white p-3 shadow-sm [@media(min-height:760px)]:p-4";
const bigValue =
	"text-3xl [@media(min-height:760px)]:text-4xl [@media(min-height:900px)]:text-5xl font-black leading-none text-slate-900 tabular-nums";
const sectionLabel = "text-[10px] font-bold uppercase tracking-widest text-slate-400";

const nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

function toNum(v: unknown): number | null {
	if (v === null || v === undefined || v === "") return null;
	const n = Number(v);
	return Number.isFinite(n) ? n : null;
}

const fmtPct = (n: number | null) => (n === null ? "—" : `${nf1.format(n)} %`);

function fmtSigned(n: number | null, suffix: string): string | null {
	if (n === null) return null;
	return `${n > 0 ? "+" : ""}${nf1.format(n)}${suffix}`;
}

function fmtMoney(n: number | null): string {
	if (n === null) return "—";
	const abs = Math.abs(n);
	if (abs >= 1_000_000) return `$${nf1.format(abs / 1_000_000)}M`;
	return `$${Math.round(abs / 1000)}k`;
}

/* ---------------- Statuses (same rules as before) ---------------- */

// OTD / equipment: value compared with the target
function percentStatus(value: number | null, target: number): Status | null {
	if (value === null) return null;
	const pct = target ? (value / target) * 100 : 0;
	return pct >= 90 ? "green" : pct >= 70 ? "orange" : "red";
}

function recruitmentStatus(pct: number | null): Status | null {
	if (pct === null) return null;
	return pct >= 90 ? "green" : pct >= 70 ? "orange" : "red";
}

// Budget: share of the budget not spent (1 - actual / budget)
function budgetStatus(actual: number | null, budget: number | null) {
	if (actual === null || budget === null || budget <= 0) return null;
	const percentage = Math.round((1 - actual / budget) * 100);
	const level: Status = percentage <= 0 ? "red" : percentage < 40 ? "orange" : "green";
	return { percentage, level, label: level === "green" ? "ON TRACK" : "AT RISK" };
}

// APQP milestones and documentation readiness
function readinessStatus(value: number | null) {
	if (value === null) return null;
	const percentage = Math.round(value);
	const level: Status = percentage < 85 ? "red" : percentage < 90 ? "orange" : "green";
	return { percentage, level, label: level === "green" ? "ON TRACK" : "AT RISK" };
}

/* ---------------- Periods: the selected one and the 3 before ---------------- */

function isoWeeksInYear(year: number): number {
	// 28 December is always in the last ISO week of its year
	const d = new Date(Date.UTC(year, 11, 28));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function lastFourWeeks(week: number, year: number) {
	const slots: { year: number; week: number; label: string }[] = [];
	let w = week;
	let y = year;
	for (let i = 0; i < 4; i++) {
		slots.unshift({ year: y, week: w, label: `S${String(w).padStart(2, "0")}` });
		w -= 1;
		if (w < 1) {
			y -= 1;
			w = isoWeeksInYear(y);
		}
	}
	return slots;
}

function lastFourMonths(month: number, year: number) {
	const slots: { year: number; month: number; label: string }[] = [];
	let m = month;
	let y = year;
	for (let i = 0; i < 4; i++) {
		slots.unshift({ year: y, month: m, label: MONTH_NAMES[m - 1] });
		m -= 1;
		if (m < 1) {
			m = 12;
			y -= 1;
		}
	}
	return slots;
}

/* ---------------- Components ---------------- */

function StatusPill({ status, label }: { status: Status | null; label?: string }) {
	if (!status) return null;
	const style = STATUS_STYLES[status];
	const text = label ?? (status === "green" ? "On Track" : status === "orange" ? "At Risk" : "Behind");
	return (
		<span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${style.bg} ${style.text}`}>
			<span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
			{text}
		</span>
	);
}

function CardHeader({
	icon: Icon,
	title,
	subtitle,
	accent,
	right,
}: {
	icon: IconType;
	title: string;
	subtitle: string;
	accent: Accent;
	right?: React.ReactNode;
}) {
	return (
		// The status goes below the title when the card is narrow
		<div className="flex shrink-0 flex-wrap items-start justify-between gap-x-2 gap-y-1">
			<div className="flex min-w-[10rem] flex-1 items-center gap-2.5">
				<div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg [@media(min-height:760px)]:h-9 [@media(min-height:760px)]:w-9 ${accent.icon}`}>
					<Icon className="text-base" />
				</div>
				<div className="min-w-0">
					<h2 className="line-clamp-2 text-sm font-bold leading-tight text-slate-900 lg:text-base" title={title}>
						{title}
					</h2>
					<p className="truncate text-xs text-slate-500">{subtitle}</p>
				</div>
			</div>
			{right}
		</div>
	);
}

// Current value, its comparison and the status
function ValueBlock({
	value,
	unit,
	detail,
	variation,
	positiveIsGood = true,
}: {
	value: string;
	unit?: string;
	detail?: React.ReactNode;
	variation?: { value: number | null; suffix: string; label: string };
	positiveIsGood?: boolean;
}) {
	const v = variation?.value ?? null;
	const signed = variation ? fmtSigned(v, variation.suffix) : null;
	const good = v === null || v === 0 ? null : (v > 0) === positiveIsGood;
	return (
		<div className="mt-2 flex shrink-0 flex-wrap items-end justify-between gap-x-3 gap-y-1 [@media(min-height:760px)]:mt-3">
			<div className="flex items-baseline gap-1.5">
				<span className={bigValue}>{value}</span>
				{unit && value !== "—" && <span className="text-lg font-bold text-slate-400">{unit}</span>}
			</div>
			<div className="text-right text-xs leading-snug">
				{signed && (
					<p className={`font-bold ${good === null ? "text-slate-500" : good ? "text-emerald-600" : "text-rose-600"}`}>
						{signed} <span className="font-medium text-slate-400">{variation?.label}</span>
					</p>
				)}
				{detail && <p className="text-slate-500">{detail}</p>}
			</div>
		</div>
	);
}

/**
 * The selected period (last circle, large, bold, highlighted) and the 3 before it.
 * Missing values stay empty ("—") instead of showing 0.
 */
function HistoryRow({
	slots,
	accent,
}: {
	slots: { label: string; value: string | null; status: Status | null; target?: string; selected: boolean }[];
	accent: Accent;
}) {
	return (
		<div className="grid shrink-0 grid-cols-4 items-end gap-2">
			{slots.map((slot) => {
				const style = slot.status ? STATUS_STYLES[slot.status] : null;
				// Square circles that never get wider than their column (narrow tablets)
				const size = slot.selected
					? "aspect-square w-full max-w-[3rem] border-[3px] ring-4 shadow-md [@media(min-height:760px)]:max-w-[4rem] [@media(min-height:900px)]:max-w-[5rem]"
					: "aspect-square w-full max-w-[2.5rem] border-2 [@media(min-height:760px)]:max-w-[3rem] [@media(min-height:900px)]:max-w-[3.5rem]";
				return (
					<div key={slot.label} className="flex min-w-0 flex-col items-center gap-1">
						<span className={`whitespace-nowrap text-[10px] font-semibold ${slot.selected ? "text-slate-600" : "text-slate-400"}`}>
							{slot.target ? `T: ${slot.target}` : " "}
						</span>
						<div
							className={`flex items-center justify-center rounded-full transition-all ${size} ${
								style ? `${style.border} ${style.bg}` : "border-slate-200 bg-slate-50"
							} ${slot.selected ? accent.ring : ""}`}
						>
							<span
								className={`tabular-nums ${style ? style.text : "text-slate-400"} ${
									slot.selected
										? "text-sm font-black [@media(min-height:760px)]:text-base [@media(min-height:900px)]:text-lg"
										: "text-[11px] font-bold [@media(min-height:900px)]:text-xs"
								}`}
							>
								{slot.value ?? "—"}
							</span>
						</div>
						<span
							className={
								slot.selected
									? `rounded-full px-2 py-0.5 text-[11px] font-black text-white ${accent.pill}`
									: "py-0.5 text-[11px] font-semibold text-slate-500"
							}
						>
							{slot.label}
						</span>
					</div>
				);
			})}
		</div>
	);
}

type Series = { values: (number | null)[]; color: string; dashed?: boolean; name?: string; showValues?: boolean };

/**
 * Line chart whose points sit in the middle of 4 columns, under the circles of HistoryRow.
 * Value labels are HTML (they keep their size when the chart stretches); gaps are not joined.
 */
function ColumnChart({
	series,
	format,
	target = null,
	labels,
	selectedIndex,
}: {
	series: Series[];
	format: (n: number) => string;
	target?: number | null;
	labels: React.ReactNode[];
	selectedIndex: number;
}) {
	const n = labels.length;
	const known = series.flatMap((s) => s.values).filter((v): v is number => v !== null);
	const pointsWithData = series[0].values.filter((v) => v !== null).length;
	if (pointsWithData < 2) {
		return (
			<div className="flex min-h-[72px] flex-1 items-center justify-center rounded-lg bg-slate-50 text-xs text-slate-400 md:min-h-0">
				Pas d&apos;historique sur la période
			</div>
		);
	}
	const domain = target !== null ? [...known, target] : known;
	const min = Math.min(...domain);
	const max = Math.max(...domain);
	const range = max - min || 1;
	// Top padding leaves room for the value labels above the points
	const y = (v: number) => 22 + (1 - (v - min) / range) * 66;
	const x = (i: number) => ((i + 0.5) / n) * 100;
	// One path per series, broken where a value is missing
	const path = (values: (number | null)[]) =>
		values
			.map((v, i) => (v === null ? null : `${i > 0 && values[i - 1] !== null ? "L" : "M"}${x(i)},${y(v)}`))
			.filter(Boolean)
			.join(" ");
	return (
		<div className="flex min-h-[96px] flex-1 flex-col md:min-h-0">
			<div className="relative min-h-0 flex-1">
				{/* Selected period */}
				<div
					className="absolute inset-y-0 rounded-md bg-slate-100/80"
					style={{ left: `${(selectedIndex / n) * 100}%`, width: `${100 / n}%` }}
				/>
				<svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<line x1="0" y1="96" x2="100" y2="96" stroke="#e2e8f0" strokeWidth="1" vectorEffect="non-scaling-stroke" />
					{target !== null && (
						<line
							x1="0"
							y1={y(target)}
							x2="100"
							y2={y(target)}
							stroke="#94a3b8"
							strokeWidth="1.5"
							strokeDasharray="5 3"
							vectorEffect="non-scaling-stroke"
						/>
					)}
					{series.map((s, si) => (
						<path
							key={si}
							d={path(s.values)}
							fill="none"
							stroke={s.color}
							strokeWidth={s.dashed ? 2 : 2.5}
							strokeDasharray={s.dashed ? "6 4" : undefined}
							strokeLinecap="round"
							strokeLinejoin="round"
							vectorEffect="non-scaling-stroke"
						/>
					))}
				</svg>
				{series.map((s, si) =>
					s.values.map((v, i) =>
						v === null ? null : (
							<div
								key={`${si}-${i}`}
								className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
								style={{ left: `${x(i)}%`, top: `${y(v)}%` }}
							>
								{s.showValues !== false && (
									<span
										className={`-mt-5 mb-1 whitespace-nowrap tabular-nums text-slate-700 ${
											i === selectedIndex ? "text-xs font-black lg:text-sm" : "text-[11px] font-bold lg:text-xs"
										}`}
									>
										{format(v)}
									</span>
								)}
								<span
									className={`rounded-full border-2 border-white ${i === selectedIndex ? "h-3 w-3" : "h-2.5 w-2.5"}`}
									style={{ background: s.color }}
								/>
							</div>
						)
					)
				)}
			</div>
			<div className="mt-1 grid shrink-0 text-center text-[11px]" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
				{labels.map((label, i) => (
					<span key={i} className={i === selectedIndex ? "font-black text-slate-800" : "font-semibold text-slate-400"}>
						{label}
					</span>
				))}
			</div>
		</div>
	);
}

function Legend({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
	return (
		<div className="flex items-center gap-3">
			{items.map((item) => (
				<span key={item.label} className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-500">
					<span
						className="inline-block w-5 border-t-2"
						style={{ borderColor: item.color, borderStyle: item.dashed ? "dashed" : "solid" }}
					/>
					{item.label}
				</span>
			))}
		</div>
	);
}

// Budget (grey) and actual (status colour) per month, selected month highlighted
function BudgetBars({
	slots,
}: {
	slots: { label: string; budget: number | null; actual: number | null; status: Status | null; selected: boolean }[];
}) {
	const max = Math.max(1, ...slots.flatMap((s) => [s.budget ?? 0, s.actual ?? 0]));
	return (
		<div className="grid min-h-[96px] flex-1 grid-cols-4 gap-2 md:min-h-0">
			{slots.map((slot) => (
				<div
					key={slot.label}
					className={`flex min-h-0 min-w-0 flex-col items-center rounded-lg px-1 pt-1 ${slot.selected ? "bg-slate-100/80" : ""}`}
				>
					<span className={`shrink-0 whitespace-nowrap tabular-nums text-slate-700 ${slot.selected ? "text-xs font-black" : "text-[11px] font-bold"}`}>
						{fmtMoney(slot.actual)}
					</span>
					<div className="mt-1 flex min-h-0 w-full max-w-[64px] flex-1 items-end justify-center gap-1">
						{slot.budget === null && slot.actual === null ? (
							<div className="h-1 w-full rounded bg-slate-200" />
						) : (
							<>
								<div className="w-1/2 rounded-t bg-slate-300" style={{ height: `${Math.max(((slot.budget ?? 0) / max) * 100, 2)}%` }} />
								<div
									className="w-1/2 rounded-t"
									style={{
										height: `${Math.max(((slot.actual ?? 0) / max) * 100, 2)}%`,
										background: slot.status ? STATUS_STYLES[slot.status].chart : "#2563eb",
									}}
								/>
							</>
						)}
					</div>
					<span className="mt-1 shrink-0 whitespace-nowrap text-[10px] text-slate-400 tabular-nums">B {fmtMoney(slot.budget)}</span>
				</div>
			))}
		</div>
	);
}

function NoDataBanner({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-2 shrink-0 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm text-amber-800 [@media(min-height:760px)]:mb-3 [@media(min-height:760px)]:py-2">
			{children}
		</div>
	);
}

/* ---------------- Page ---------------- */

export default function ProgramsPage() {
	const { type: activeTab, setType: setActiveTab, period, setPeriod, year, setYear } = useKpiPeriod("weekly");
	const [programData, setProgramData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		async function fetchProgram() {
			setLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/program?type=${activeTab}&period=${period}&year=${year}`, { cache: "no-store" });
				if (!res.ok) throw new Error("Failed to fetch program data");
				const json = await res.json();
				if (!cancelled) setProgramData(json?.data?.data ?? json?.data ?? json);
			} catch (err) {
				if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load program data");
			} finally {
				if (!cancelled) setLoading(false);
			}
		}
		fetchProgram();
		return () => {
			cancelled = true;
		};
	}, [activeTab, period, year]);

	const renderWeekly = () => {
		const data = programData?.Program_Semaine ?? {};
		const otd = data.On_Time_Delivery;
		const equipment = data.Critical_Equipment_Availability;
		const recruitment = data.Recruitment_Progress;
		const slots = lastFourWeeks(period, year);
		const historyOf = (history: any[] | undefined) =>
			slots.map((slot) => (history ?? []).find((h) => toNum(h.Semaine) === slot.week && toNum(h.Annee) === slot.year) ?? null);
		const selectedIndex = slots.length - 1;

		const otdValue = toNum(otd?.Valeur_Actuelle);
		const equipValue = toNum(equipment?.Valeur_Actuelle);
		const recruitReel = toNum(recruitment?.Valeur_Actuelle_Reel);
		const hasData = otdValue !== null || equipValue !== null || recruitReel !== null;

		// OTD and critical equipment: value in %, target 90 %
		const percentCard = (
			kpi: any,
			title: string,
			icon: IconType,
			accent: Accent,
			key: string
		) => {
			const target = toNum(kpi?.Target_Actuelle) ?? 90;
			const value = toNum(kpi?.Valeur_Actuelle);
			const history = historyOf(kpi?.Historique_4_Semaines);
			const values = history.map((h) => toNum(h?.Valeur));
			return (
				<section key={key} className={`${cardClass} ${accent.border}`}>
					<CardHeader
						icon={icon}
						title={title}
						subtitle={`Cible : ${nf1.format(target)} %`}
						accent={accent}
						right={<StatusPill status={percentStatus(value, target)} />}
					/>
					<ValueBlock
						value={value === null ? "—" : nf1.format(value)}
						unit="%"
						variation={{ value: toNum(kpi?.Variation_Vs_Semaine_Precedente), suffix: " pt", label: "vs S-1" }}
					/>
					<p className={`${sectionLabel} mt-3 mb-1 shrink-0 [@media(min-height:760px)]:mt-4`}>Historique 4 semaines</p>
					<HistoryRow
						accent={accent}
						slots={slots.map((slot, i) => ({
							label: slot.label,
							value: values[i] === null ? null : `${nf1.format(values[i] as number)}%`,
							status: percentStatus(values[i], target),
							target: `${nf1.format(target)}%`,
							selected: i === selectedIndex,
						}))}
					/>
					<div className="mt-3 mb-1 flex shrink-0 items-center justify-between [@media(min-height:760px)]:mt-4">
						<p className={sectionLabel}>Tendance</p>
						<Legend items={[{ label: "Cible", color: "#94a3b8", dashed: true }]} />
					</div>
					<ColumnChart
						series={[{ values, color: accent.color }]}
						target={target}
						format={(n) => `${nf1.format(n)}%`}
						labels={slots.map((s) => s.label)}
						selectedIndex={selectedIndex}
					/>
				</section>
			);
		};

		const recruitHistory = historyOf(recruitment?.Historique_4_Semaines);
		const reelValues = recruitHistory.map((h) => toNum(h?.Reel));
		const forecastValues = recruitHistory.map((h) => toNum(h?.Forecast));
		const recruitForecast = toNum(recruitment?.Valeur_Actuelle_Forecast);
		const recruitPct = toNum(recruitment?.Valeur_Actuelle_Pct);
		const hiresMtd = toNum(recruitment?.Total_Hires_MTD);
		const forecastMtd = toNum(recruitment?.Total_Forecast_MTD);

		return (
			<>
				{!hasData && (
					<NoDataBanner>
						Aucune donnée pour la semaine {period} de {year} : le fichier Program hebdomadaire de cette période n&apos;a
						pas encore été importé (page Importation).
					</NoDataBanner>
				)}
				<div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3 [@media(min-height:900px)]:gap-4">
					{percentCard(otd, "On Time Delivery (OTD)", FaTruck, ACCENTS.blue, "otd")}
					{percentCard(equipment, "Critical Equipment Availability", FaCogs, ACCENTS.violet, "equipment")}

					<section className={`${cardClass} ${ACCENTS.emerald.border}`}>
						<CardHeader
							icon={FaUserPlus}
							title="Recruitment Progress vs Forecast"
							subtitle="Réel vs forecast (effectif)"
							accent={ACCENTS.emerald}
							right={<StatusPill status={recruitmentStatus(recruitPct)} />}
						/>
						<ValueBlock
							value={recruitReel === null ? "—" : `${nf1.format(recruitReel)} / ${recruitForecast === null ? "—" : nf1.format(recruitForecast)}`}
							variation={{ value: toNum(recruitment?.Variation_Reel_Vs_Semaine_Precedente), suffix: "", label: "vs S-1" }}
							detail={
								recruitReel === null ? null : (
									<>
										{fmtPct(recruitPct)} de réalisation · MTD {hiresMtd ?? "—"}/{forecastMtd ?? "—"}
									</>
								)
							}
						/>
						<p className={`${sectionLabel} mt-3 mb-1 shrink-0 [@media(min-height:760px)]:mt-4`}>Historique 4 semaines</p>
						<HistoryRow
							accent={ACCENTS.emerald}
							slots={slots.map((slot, i) => ({
								label: slot.label,
								value: reelValues[i] === null ? null : `${reelValues[i]}/${forecastValues[i] ?? "—"}`,
								status: recruitmentStatus(toNum(recruitHistory[i]?.Pct)),
								target: forecastValues[i] === null ? undefined : `${forecastValues[i]}`,
								selected: i === selectedIndex,
							}))}
						/>
						<div className="mt-3 mb-1 flex shrink-0 items-center justify-between [@media(min-height:760px)]:mt-4">
							<p className={sectionLabel}>Réel vs forecast</p>
							<Legend
								items={[
									{ label: "Réel", color: ACCENTS.emerald.color },
									{ label: "Forecast", color: "#94a3b8", dashed: true },
								]}
							/>
						</div>
						<ColumnChart
							series={[
								{ values: reelValues, color: ACCENTS.emerald.color },
								{ values: forecastValues, color: "#94a3b8", dashed: true, showValues: false },
							]}
							format={(n) => nf1.format(n)}
							labels={slots.map((s) => s.label)}
							selectedIndex={selectedIndex}
						/>
					</section>
				</div>
			</>
		);
	};

	const renderMonthly = () => {
		const data = programData?.Program_Mois ?? {};
		const budget = data.Budget_Vs_Actual;
		const apqp = data.APQP_Milestones;
		const documentation = data.Documentation_Progress;
		const slots = lastFourMonths(period, year);
		const historyOf = (history: any[] | undefined) =>
			slots.map((slot) => (history ?? []).find((h) => toNum(h.Mois) === slot.month && toNum(h.Annee) === slot.year) ?? null);
		const selectedIndex = slots.length - 1;
		const labels = slots.map((s) => s.label);

		const budgetHistory = historyOf(budget?.Historique_4_Mois);
		const budgetSlots = slots.map((slot, i) => {
			const b = toNum(budgetHistory[i]?.Budget);
			const a = toNum(budgetHistory[i]?.Actual);
			return { label: slot.label, budget: b, actual: a, status: budgetStatus(a, b)?.level ?? null, selected: i === selectedIndex };
		});
		const selectedBudget = budgetSlots[selectedIndex];
		const selectedBudgetStatus = budgetStatus(selectedBudget.actual, selectedBudget.budget);

		const apqpValue = toNum(apqp?.Valeur_Mois_Courant);
		const docValue = toNum(documentation?.Readiness_Mois_Courant);
		const hasData = selectedBudget.actual !== null || apqpValue !== null || docValue !== null;

		// APQP milestones and documentation: % per month, target 100 %
		const readinessCard = (
			value: number | null,
			delta: number | null,
			history: any[] | undefined,
			title: string,
			chartTitle: string,
			icon: IconType,
			accent: Accent,
			key: string
		) => {
			const status = readinessStatus(value);
			const values = historyOf(history).map((h) => {
				const v = toNum(h?.Valeur);
				return v === null ? null : Math.round(v);
			});
			return (
				<section key={key} className={`${cardClass} ${accent.border}`}>
					<CardHeader
						icon={icon}
						title={title}
						subtitle="Cible : 100 %"
						accent={accent}
						right={status && <StatusPill status={status.level} label={status.label} />}
					/>
					<ValueBlock
						value={status ? String(status.percentage) : "—"}
						unit="%"
						variation={{ value: delta, suffix: " pt", label: "vs M-1" }}
					/>
					<p className={`${sectionLabel} mt-3 mb-1 shrink-0 [@media(min-height:760px)]:mt-4`}>Historique 4 mois</p>
					<HistoryRow
						accent={accent}
						slots={slots.map((slot, i) => ({
							label: slot.label,
							value: values[i] === null ? null : `${values[i]}%`,
							status: readinessStatus(values[i])?.level ?? null,
							target: "100%",
							selected: i === selectedIndex,
						}))}
					/>
					<div className="mt-3 mb-1 flex shrink-0 items-center justify-between [@media(min-height:760px)]:mt-4">
						<p className={sectionLabel}>{chartTitle}</p>
						<Legend items={[{ label: "Cible", color: "#94a3b8", dashed: true }]} />
					</div>
					<ColumnChart
						series={[{ values, color: accent.color }]}
						target={100}
						format={(n) => `${n}%`}
						labels={labels}
						selectedIndex={selectedIndex}
					/>
				</section>
			);
		};

		return (
			<>
				{!hasData && (
					<NoDataBanner>
						Aucune donnée pour {MONTH_FULL_NAMES[period - 1]} {year} : le fichier Program mensuel de cette période
						n&apos;a pas encore été importé (page Importation).
					</NoDataBanner>
				)}
				<div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-3 [@media(min-height:900px)]:gap-4">
					<section className={`${cardClass} ${ACCENTS.blue.border}`}>
						<CardHeader
							icon={FaMoneyBillWave}
							title="Budget vs Actual (CAPEX/OPEX)"
							subtitle="Part du budget non consommée"
							accent={ACCENTS.blue}
							right={
								selectedBudgetStatus && (
									<StatusPill
										status={selectedBudgetStatus.level}
										label={`${selectedBudgetStatus.percentage}% ${selectedBudgetStatus.label}`}
									/>
								)
							}
						/>
						<ValueBlock
							value={fmtMoney(selectedBudget.actual)}
							detail={selectedBudget.budget === null ? null : <>Budget {fmtMoney(selectedBudget.budget)}</>}
						/>
						<div className="mt-3 mb-1 flex shrink-0 items-center justify-between [@media(min-height:760px)]:mt-4">
							<p className={sectionLabel}>Historique 4 mois</p>
							<Legend
								items={[
									{ label: "Budget", color: "#cbd5e1" },
									{ label: "Actual", color: ACCENTS.blue.color },
								]}
							/>
						</div>
						<BudgetBars slots={budgetSlots} />
						<div className="mt-1 grid shrink-0 grid-cols-4 gap-2 text-center text-[11px]">
							{budgetSlots.map((slot) => {
								const st = budgetStatus(slot.actual, slot.budget);
								// Month (highlighted when selected), then its budget status
								return (
									<div key={slot.label} className="flex flex-col items-center gap-0.5">
										<span
											className={
												slot.selected
													? `whitespace-nowrap rounded-full px-2 py-0.5 font-black text-white ${ACCENTS.blue.pill}`
													: "py-0.5 font-semibold text-slate-500"
											}
										>
											{slot.label}
										</span>
										<span className={`text-[10px] font-bold ${st ? STATUS_STYLES[st.level].text : "text-slate-300"}`}>
											{st ? `${st.percentage}%` : "—"}
										</span>
									</div>
								);
							})}
						</div>
						<div className="mt-3 mb-1 flex shrink-0 items-center justify-between [@media(min-height:760px)]:mt-4">
							<p className={sectionLabel}>Dépenses mensuelles</p>
							<Legend
								items={[
									{ label: "Budget", color: "#94a3b8", dashed: true },
									{ label: "Actual", color: ACCENTS.blue.color },
								]}
							/>
						</div>
						<ColumnChart
							series={[
								{ values: budgetSlots.map((s) => s.actual), color: ACCENTS.blue.color },
								{ values: budgetSlots.map((s) => s.budget), color: "#94a3b8", dashed: true, showValues: false },
							]}
							format={(n) => fmtMoney(n)}
							labels={labels}
							selectedIndex={selectedIndex}
						/>
					</section>

					{readinessCard(
						apqpValue,
						toNum(apqp?.Delta_Pts_Vs_M_1),
						apqp?.Historique_4_Mois,
						"Planning vs Forecast (APQP Milestones)",
						"Taux de réalisation",
						FaSitemap,
						ACCENTS.violet,
						"apqp"
					)}
					{readinessCard(
						docValue,
						toNum(documentation?.Delta_Pts_Vs_M_1),
						documentation?.Historique_4_Mois,
						"Documentation Progress",
						"Progression des approbations",
						FaBook,
						ACCENTS.emerald,
						"documentation"
					)}
				</div>
			</>
		);
	};

	return (
		<main className="flex flex-col p-3 sm:p-4 [@media(min-height:760px)]:lg:p-5 md:h-full md:min-h-[520px]">
			{/* Header */}
			<div className="mb-2 flex shrink-0 flex-wrap items-center justify-between gap-3 [@media(min-height:760px)]:mb-3">
				<div className="flex items-center gap-2">
					<span className="block h-8 w-1 rounded-full bg-blue-500" />
					<span className="text-xs font-bold uppercase tracking-widest text-blue-500">Program KPI</span>
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
					<TabSelector activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} variant="light" />
				</div>
			</div>

			{loading ? (
				<div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-4">
					<div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
					<p className="font-medium text-slate-500">Chargement des données programme...</p>
				</div>
			) : error ? (
				<div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-2">
					<p className="font-semibold text-rose-600">{error}</p>
					<p className="text-sm text-slate-400">Vérifiez que l&apos;API programme est disponible.</p>
				</div>
			) : activeTab === "weekly" ? (
				renderWeekly()
			) : (
				renderMonthly()
			)}
		</main>
	);
}
