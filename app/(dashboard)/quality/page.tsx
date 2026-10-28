"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { PeriodSelector } from "@/components/ui/PeriodSelector";
import { TabSelector } from "@/components/ui/TabSelector";
import { useKpiPeriod } from "@/hooks/use-kpi-period";
import { FaBug, FaFreeCodeCamp, FaMapMarked, FaChartBar, FaCheckDouble, FaChartArea, FaFileExport, FaUsers, FaExclamationTriangle, FaUserInjured } from "react-icons/fa";

// The API sends the numbers as strings, and null for a period that was not imported
type Num = string | number | null | undefined;

const MONTH_NAMES = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const MONTH_FULL_NAMES = [
	"janvier", "février", "mars", "avril", "mai", "juin",
	"juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

const progressColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];
const zoneKeys = ["Boot", "HeadRest", "Gainage", "Volant", "Net"];
const zoneColors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b"];

// Card padding and gaps grow with the screen height; the page itself never scrolls from tablet width
const cardClass =
	"flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gray-900/60 backdrop-blur-sm p-3 transition-all hover:border-gray-600 [@media(min-height:760px)]:p-4 [@media(min-height:900px)]:p-5";
const circleSize =
	"h-12 w-12 [@media(min-height:760px)]:h-16 [@media(min-height:760px)]:w-16 [@media(min-height:900px)]:h-20 [@media(min-height:900px)]:w-20";
const ringSize =
	"h-14 w-14 [@media(min-height:760px)]:h-20 [@media(min-height:760px)]:w-20 [@media(min-height:900px)]:h-24 [@media(min-height:900px)]:w-24";
const bigValue =
	"text-4xl [@media(min-height:760px)]:text-5xl [@media(min-height:900px)]:text-6xl font-black text-white leading-none tabular-nums";

function toNum(v: Num): number | null {
	if (v === null || v === undefined || v === "") return null;
	const n = typeof v === "number" ? v : parseFloat(v);
	return Number.isFinite(n) ? n : null;
}

/** Number with the given decimals, or "—" when there is no value */
function fmt(n: number | null, decimals = 0, suffix = ""): string {
	return n === null ? "—" : `${n.toFixed(decimals)}${suffix}`;
}

function fmtSigned(n: number | null, decimals = 0, suffix = ""): string {
	return n === null ? "—" : `${n > 0 ? "+" : ""}${n.toFixed(decimals)}${suffix}`;
}

/** Oldest → newest, also across the year change (S52 2025 before S1 2026) */
function chrono(items: any[] | null | undefined): any[] {
	const key = (i: any) => (toNum(i.Annee) ?? 0) * 100 + (toNum(i.Semaine) ?? toNum(i.Mois) ?? 0);
	return [...(items ?? [])].sort((a, b) => key(a) - key(b));
}

function SectionHeader({
	icon,
	title,
	accent = "#3b82f6",
}: {
	icon: ReactElement;
	title: string;
	accent?: string;
}) {
	return (
		<div className="mb-2 flex shrink-0 items-center gap-2.5 border-b border-white/[0.08] pb-2 [@media(min-height:900px)]:mb-3 [@media(min-height:900px)]:pb-3">
			<div
				className="flex h-7 w-7 items-center justify-center rounded-lg text-sm [@media(min-height:900px)]:h-8 [@media(min-height:900px)]:w-8"
				style={{ background: `${accent}22`, color: accent }}
			>
				{icon}
			</div>
			<h2 className="text-sm font-semibold text-white lg:text-base">{title}</h2>
		</div>
	);
}

function StatusChip({
	value,
	target,
	lowerIsBetter = false,
	decimals = 1,
}: {
	value: number | null;
	target: number | null;
	lowerIsBetter?: boolean;
	decimals?: number;
}) {
	if (value === null || target === null) return null;
	const delta = lowerIsBetter ? target - value : value - target;
	const isGood = delta >= 0;
	return (
		<span
			className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${isGood ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}
		>
			{isGood ? "▲ +" : "▼ "}
			{Math.abs(delta).toFixed(decimals)} vs Target
		</span>
	);
}

function Variation({
	value,
	lowerIsBetter = false,
	decimals = 0,
	suffix = "",
	label,
}: {
	value: number | null;
	lowerIsBetter?: boolean;
	decimals?: number;
	suffix?: string;
	label: string;
}) {
	if (value === null) return null;
	const isGood = lowerIsBetter ? value <= 0 : value >= 0;
	return (
		<div className={`text-sm font-medium ${isGood ? "text-emerald-400" : "text-red-400"}`}>
			{fmtSigned(value, decimals, suffix)} {label}
		</div>
	);
}

/** Filled circle with a count (réclamations) */
function CountCircle({ label, value, target, color }: { label: string; value: number | null; target: number | null; color: string }) {
	return (
		<div className="flex min-w-0 flex-col items-center gap-0.5 [@media(min-height:760px)]:gap-1">
			<span className="text-xs text-gray-400 font-medium lg:text-sm">{label}</span>
			<div
				className={`${circleSize} rounded-full flex items-center justify-center shadow-lg`}
				style={{ background: `${color}22`, border: `2px solid ${color}66` }}
			>
				<span className="text-lg [@media(min-height:760px)]:text-2xl font-black tabular-nums" style={{ color }}>
					{fmt(value)}
				</span>
			</div>
			<span className="text-xs font-bold text-[#fcd34d] lg:text-sm">T: {fmt(target)}</span>
		</div>
	);
}

/** Progress ring with a percentage (efficience); the text scales with the ring */
function RingCircle({
	value,
	color,
	sizeClass,
}: {
	value: number | null;
	color: string;
	sizeClass: string;
}) {
	return (
		<svg className={`${sizeClass} shrink-0`} viewBox="0 0 120 120">
			<circle cx="60" cy="60" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
			{value !== null && (
				<circle
					cx="60"
					cy="60"
					r="45"
					fill="none"
					stroke={color}
					strokeWidth="10"
					strokeDasharray="283"
					strokeDashoffset={283 - (Math.min(Math.max(value, 0), 100) / 100) * 283}
					strokeLinecap="round"
					transform="rotate(-90 60 60)"
				/>
			)}
			{/* Slightly smaller text for 100% so it stays inside the ring */}
			<text x="60" y="69" textAnchor="middle" fontSize={value !== null && value >= 100 ? 22 : 26} fontWeight="bold" className="fill-white">
				{fmt(value, 1, "%")}
			</text>
		</svg>
	);
}

/**
 * Line chart whose points sit in the middle of equal columns, so it lines up with a row of
 * circles above it. Labels are HTML (they keep their size when the chart stretches).
 */
function ColumnLineChart({
	values,
	color,
	format,
	target = null,
	labels,
	pointLabel,
}: {
	values: (number | null)[];
	color: string;
	format: (n: number) => string;
	target?: number | null;
	labels?: string[];
	pointLabel?: (i: number) => string;
}) {
	const n = values.length;
	const known = values.filter((v): v is number => v !== null);
	if (known.length < 2) {
		return (
			<div className="flex min-h-[48px] flex-1 items-center justify-center text-xs text-gray-500 md:min-h-0 lg:text-sm">
				Pas d&apos;historique sur la période
			</div>
		);
	}
	const domain = target !== null ? [...known, target] : known;
	const min = Math.min(...domain);
	const max = Math.max(...domain);
	const range = max - min || 1;
	// Top padding leaves room for the value labels above the points
	const y = (v: number) => 30 + (1 - (v - min) / range) * 58;
	const x = (i: number) => ((i + 0.5) / n) * 100;
	const points = values
		.map((v, i) => (v === null ? null : `${x(i)},${y(v)}`))
		.filter(Boolean)
		.join(" ");
	return (
		<div className="flex min-h-[72px] flex-1 flex-col md:min-h-0">
			<div className="relative min-h-0 flex-1">
				<svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<line x1="0" y1="96" x2="100" y2="96" stroke="#374151" strokeWidth="1" vectorEffect="non-scaling-stroke" />
					{target !== null && (
						<line
							x1="0"
							y1={y(target)}
							x2="100"
							y2={y(target)}
							stroke="#f59e0b"
							strokeWidth="1.5"
							strokeDasharray="5 3"
							vectorEffect="non-scaling-stroke"
						/>
					)}
					<polyline
						points={points}
						fill="none"
						stroke={color}
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						vectorEffect="non-scaling-stroke"
					/>
				</svg>
				{values.map((v, i) =>
					v === null ? null : (
						<div
							key={i}
							className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
							style={{ left: `${x(i)}%`, top: `${y(v)}%` }}
						>
							<span className="mb-1 -mt-5 whitespace-nowrap text-xs font-bold text-[#f59e0b] tabular-nums lg:text-sm">
								{pointLabel ? pointLabel(i) : format(v)}
							</span>
							<span className="h-2 w-2 rounded-full border" style={{ background: color, borderColor: color }} />
						</div>
					)
				)}
			</div>
			{labels && (
				<div className="mt-1 grid shrink-0 text-center text-xs text-gray-400" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
					{labels.map((l, i) => (
						<span key={i}>{l}</span>
					))}
				</div>
			)}
		</div>
	);
}

/** Vertical bars with value on top, optional dashed target, label below */
function Bars({
	items,
	highlightLast = false,
}: {
	items: { label: string; value: number | null; target?: number | null; color: string; top?: string }[];
	highlightLast?: boolean;
}) {
	const max = Math.max(1, ...items.flatMap((i) => [i.value ?? 0, i.target ?? 0]));
	return (
		<div className="flex min-h-[96px] flex-1 items-stretch gap-2 md:min-h-0">
			{items.map((item, i) => (
				<div key={item.label} className="flex min-w-0 flex-1 flex-col items-center">
					<span className="shrink-0 whitespace-nowrap text-xs font-bold text-[#fcd34d] tabular-nums lg:text-sm">
						{item.top ?? fmt(item.value)}
					</span>
					<div className="relative mt-1 w-full max-w-[48px] min-h-0 flex-1">
						{item.value !== null && (
							<div
								className="absolute bottom-0 w-full rounded-t"
								style={{
									height: `${Math.max((item.value / max) * 100, 2)}%`,
									background: item.color,
									opacity: highlightLast && i < items.length - 1 ? 0.5 : 1,
								}}
							/>
						)}
						{item.target !== undefined && item.target !== null && (
							<div
								className="absolute -left-[10%] w-[120%] border-t-2 border-dashed border-amber-500/80"
								style={{ bottom: `${(item.target / max) * 100}%` }}
							/>
						)}
					</div>
					<span className="mt-1 shrink-0 border-t border-gray-700 pt-0.5 text-xs font-semibold text-gray-300">{item.label}</span>
				</div>
			))}
		</div>
	);
}

function NoDataBanner({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-2 shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-200 [@media(min-height:760px)]:mb-3 [@media(min-height:760px)]:py-2">
			{children}
		</div>
	);
}

export default function QualityPage() {
	const { type: activeTab, setType: setActiveTab, period, setPeriod, year, setYear } =
		useKpiPeriod('weekly');
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const url = `/api/quality?type=${activeTab}&period=${period}&year=${year}`;
				const res = await fetch(url, { cache: "no-store" });
				const json = await res.json();
				if (!res.ok) {
					throw new Error(json.message || "Erreur lors du chargement");
				}
				const finalData = json?.data?.data ?? json?.data ?? json;
				setData(finalData);
				setLoading(false);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Erreur inconnue"
				);
				setLoading(false);
			}
		};
		fetchData();
	}, [activeTab, period, year]);

	const WeeklyQuality = () => {
		const reclamations = data?.Reclamations_Clients;
		const incidents = data?.Incidents;
		const efficienceGlobale = data?.Efficience_Globale;
		const efficienceParZone = data?.Efficience_Par_Zone;

		// 4 weeks, oldest first; the last one is the selected week
		const reclamationsSeries = chrono(reclamations?.Serie_4_Semaines);
		const efficienceSeries = chrono(efficienceGlobale?.Serie_4_Semaines);

		const reclamationValue = toNum(reclamations?.Valeur_Actuelle);
		const reclamationTarget = toNum(reclamations?.Target_Actuelle);
		const incidentsValue = toNum(incidents?.Valeur_Actuelle);
		const incidentsTarget = toNum(incidents?.Target_Actuelle);
		const efficienceValue = toNum(efficienceGlobale?.Valeur_Actuelle);
		const efficienceTarget = toNum(efficienceGlobale?.Target_Actuelle);

		const incidentsParZoneArray: any[] = incidents?.Incidents_Par_Zone || [];
		const incidentsParZone = incidents?.Par_Zone || {};
		const zoneIncident = (zone: string, field: "Valeur" | "Target") => {
			const fromArray = incidentsParZoneArray.find((item: any) => item.Zone === zone);
			if (fromArray) return toNum(fromArray[field]);
			return toNum(incidentsParZone[field === "Valeur" ? zone : `Target_${zone}`]);
		};
		const zones = efficienceParZone?.Zones || {};

		const noData =
			reclamationValue === null &&
			incidentsValue === null &&
			efficienceValue === null &&
			zoneKeys.every((z) => toNum(zones[z]) === null);

		return (
			<>
				{noData && (
					<NoDataBanner>
						Aucune donnée pour la semaine {period} de {year} : le fichier Quality Weekly de cette
						période n&apos;a pas encore été importé (page Importation).
					</NoDataBanner>
				)}
				<div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 md:grid-rows-2 [@media(min-height:900px)]:gap-4">
					{/* Réclamations Clients */}
					<section className={cardClass}>
						<SectionHeader icon={<FaBug />} title="Réclamations Clients" accent="#06b6d4" />
						<div className="flex shrink-0 items-center gap-4">
							<div className="w-28 shrink-0 text-center lg:w-32">
								<div className={bigValue}>{fmt(reclamationValue)}</div>
								<Variation
									value={toNum(reclamations?.Variation_Vs_Semaine_Precedente)}
									lowerIsBetter
									label="vs Sem. Préc."
								/>
								<div className="text-sm font-bold text-[#fcd34d]">T: {fmt(reclamationTarget)}</div>
							</div>
							<div className="grid min-w-0 flex-1 grid-cols-4 gap-1">
								{reclamationsSeries.map((week: any, index: number) => (
									<CountCircle
										key={index}
										label={`S${week.Semaine}`}
										value={toNum(week.Valeur)}
										target={toNum(week.Target)}
										color={progressColors[index % progressColors.length]}
									/>
								))}
							</div>
						</div>
						<div className="mt-2 flex min-h-0 flex-1">
							<div className="w-28 shrink-0 self-center text-xs font-semibold uppercase tracking-wider text-gray-400 lg:w-32">
								Suivi des réclamations
							</div>
							<div className="ml-4 flex min-w-0 flex-1">
								<ColumnLineChart
									values={reclamationsSeries.map((w: any) => toNum(w.Valeur))}
									color="#06b6d4"
									format={(v) => fmt(v)}
								/>
							</div>
						</div>
					</section>

					{/* Incidents */}
					<section className={cardClass}>
						<SectionHeader icon={<FaBug />} title="Incidents" accent="#f59e0b" />
						<div className="flex min-h-0 flex-1 gap-4">
							<div className="flex w-28 shrink-0 flex-col items-center justify-center gap-1.5 text-center lg:w-32">
								<div className={bigValue}>{fmt(incidentsValue)}</div>
								<span className="text-sm font-bold text-[#fcd34d]">T: {fmt(incidentsTarget)}</span>
								<StatusChip value={incidentsValue} target={incidentsTarget} lowerIsBetter decimals={0} />
							</div>
							<div className="flex min-w-0 flex-1 flex-col border-l border-white/[0.06] pl-4">
								<p className="mb-1 shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400">
									Incidents par zone
								</p>
								<Bars
									items={zoneKeys.map((zone, i) => {
										const value = zoneIncident(zone, "Valeur");
										const target = zoneIncident(zone, "Target");
										return {
											label: zone,
											value,
											target,
											color: zoneColors[i],
											top: `${fmt(value)} · T${fmt(target)}`,
										};
									})}
								/>
							</div>
						</div>
					</section>

					{/* Efficience Globale */}
					<section className={cardClass}>
						<SectionHeader icon={<FaFreeCodeCamp />} title="Suivi de l'Efficience (par semaine)" accent="#10b981" />
						<div className="flex shrink-0 items-center gap-4">
							<div className="w-28 shrink-0 text-center lg:w-32">
								<div className="text-3xl [@media(min-height:760px)]:text-4xl [@media(min-height:900px)]:text-5xl font-black text-white leading-none tabular-nums">
									{fmt(efficienceValue, 1, "%")}
								</div>
								<Variation
									value={toNum(efficienceGlobale?.Variation_Vs_Semaine_Precedente)}
									decimals={1}
									suffix="%"
									label="vs Sem. Préc."
								/>
								<div className="text-sm font-bold text-[#fcd34d]">T: {fmt(efficienceTarget, 1, "%")}</div>
							</div>
							<div className="grid min-w-0 flex-1 grid-cols-4 gap-1">
								{efficienceSeries.map((week: any, index: number) => (
									<div key={index} className="flex min-w-0 flex-col items-center gap-0.5 [@media(min-height:760px)]:gap-1">
										<span className="text-xs text-gray-400 font-medium lg:text-sm">S{week.Semaine}</span>
										<RingCircle
											value={toNum(week.Valeur)}
											color={progressColors[index % progressColors.length]}
											sizeClass={ringSize}
										/>
										<span className="text-xs font-bold text-[#fcd34d] lg:text-sm">
											T: {fmt(toNum(week.Target) ?? efficienceTarget, 1, "%")}
										</span>
									</div>
								))}
							</div>
						</div>
						<div className="mt-2 flex min-h-0 flex-1">
							<div className="w-28 shrink-0 self-center text-xs font-semibold uppercase tracking-wider text-gray-400 lg:w-32">
								Tendance hebdomadaire
							</div>
							<div className="ml-4 flex min-w-0 flex-1">
								<ColumnLineChart
									values={efficienceSeries.map((w: any) => toNum(w.Valeur))}
									color="#10b981"
									format={(v) => fmt(v, 1, "%")}
									target={efficienceTarget}
								/>
							</div>
						</div>
					</section>

					{/* Efficience Par Zone */}
					<section className={cardClass}>
						<SectionHeader icon={<FaMapMarked />} title="Efficience par Zone" accent="#8b5cf6" />
						<div className="grid min-h-0 flex-1 grid-cols-5 content-center gap-2">
							{zoneKeys.map((zone, index) => {
								const zoneVal = toNum(zones[zone]);
								const zoneTgt = toNum(zones[`Target_${zone}`]);
								const vsTarget = zoneVal !== null && zoneTgt !== null ? zoneVal - zoneTgt : null;
								return (
									<div key={zone} className="flex min-w-0 flex-col items-center gap-1">
										<span className="text-sm text-gray-200 font-semibold">{zone}</span>
										<RingCircle
											value={zoneVal}
											color={progressColors[index % progressColors.length]}
											sizeClass={ringSize}
										/>
										{vsTarget !== null && (
											<div className={`text-xs font-semibold lg:text-sm ${vsTarget >= 0 ? "text-emerald-400" : "text-red-400"}`}>
												{vsTarget >= 0 ? "▲" : "▼"} {Math.abs(vsTarget).toFixed(1)}%
											</div>
										)}
										<div className="text-xs font-semibold text-[#fcd34d] lg:text-sm">T: {fmt(zoneTgt, 1, "%")}</div>
									</div>
								);
							})}
						</div>
					</section>
				</div>
			</>
		);
	};

	const MonthlyQuality = () => {
		const ppmClients: any[] = data?.PPM_Clients || [];
		const dnClient = data?.DN_Client;
		const tauxConformite = data?.Taux_Conformite_Audits;
		const incidentsTravail = data?.Incidents_Travail;
		const accidentsTravail = data?.Accidents_Travail;
		const efficienceMensuelle = data?.Efficience_Mensuelle;
		const scorecards = data?.Scorecards_Clients;

		if (!dnClient && !tauxConformite && !incidentsTravail && !accidentsTravail && !efficienceMensuelle && !scorecards) {
			return (
				<div className="rounded-2xl border border-yellow-800/50 bg-yellow-900/20 p-6">
					<div className="text-yellow-400 font-semibold mb-2">Structure de données inattendue</div>
					<div className="text-sm text-gray-300 mb-4">
						Les données reçues ne correspondent pas à la structure attendue.
					</div>
					<div className="text-xs text-gray-400 font-mono bg-gray-900 p-3 rounded overflow-auto">
						<div>Clés: {Object.keys(data ?? {}).join(", ") || "Aucune"}</div>
					</div>
				</div>
			);
		}

		// PPM: one value and one target per client (lower is better)
		const ppmStatus = (c: any) => {
			const value = toNum(c.Valeur);
			const target = toNum(c.Target);
			return value === null || target === null ? "none" : value <= target ? "good" : "bad";
		};
		const ppmWithTarget = ppmClients.filter((c) => ppmStatus(c) !== "none").length;
		const ppmInTarget = ppmClients.filter((c) => ppmStatus(c) === "good").length;

		const dnValue = toNum(dnClient?.Valeur_Mois_Courant);
		const dnTarget = toNum(dnClient?.Target_Mois_Courant);
		const dnSeries = chrono(dnClient?.Suivi_4_Mois);

		const completion = tauxConformite?.Completion;
		const compliance = tauxConformite?.Compliance;

		const clientValues: any[] = scorecards?.Clients || [];
		const avgScore =
			clientValues.length > 0
				? clientValues.reduce((sum: number, c: any) => sum + (toNum(c.Valeur) ?? 0), 0) / clientValues.length
				: toNum(scorecards?.Score_Global);

		// Suivi_4_Mois holds the 4 months before the selected one
		const efficienceValue = toNum(efficienceMensuelle?.Valeur_Mois_Courant);
		const efficienceTarget = toNum(efficienceMensuelle?.Target_Mois_Courant);
		const efficienceSeries = chrono(efficienceMensuelle?.Suivi_4_Mois);
		const efficienceVariation =
			toNum(efficienceMensuelle?.Variation_Vs_Mois_Precedent) ??
			(() => {
				const prev = toNum(efficienceSeries[efficienceSeries.length - 1]?.Valeur);
				return efficienceValue !== null && prev !== null ? efficienceValue - prev : null;
			})();

		const monthLabel = (s: any) => s.Label && !String(s.Label).startsWith("M-") ? s.Label : MONTH_NAMES[(toNum(s.Mois) ?? 1) - 1];

		const noData =
			ppmClients.length === 0 &&
			dnValue === null &&
			toNum(completion?.Valeur_Mois_Courant) === null &&
			toNum(compliance?.Valeur_Mois_Courant) === null &&
			avgScore === null &&
			toNum(incidentsTravail?.Valeur_Mois_Courant) === null &&
			toNum(accidentsTravail?.Valeur_Mois_Courant) === null &&
			efficienceValue === null;

		// Incidents and accidents de travail: same card, each with its own target
		const workSafetyCard = (title: string, icon: ReactElement, accent: string, kpi: any) => {
			const value = toNum(kpi?.Valeur_Mois_Courant);
			const target = toNum(kpi?.Target_Mois_Courant);
			// Serie_4_Mois ends with the selected month
			const series = chrono(kpi?.Serie_4_Mois);
			const prev = toNum(series[series.length - 2]?.Valeur);
			const variation =
				toNum(kpi?.Variation_Vs_Mois_Precedent) ?? (value !== null && prev !== null ? value - prev : null);
			return (
				<section className={cardClass}>
					<SectionHeader icon={icon} title={title} accent={accent} />
					<div className="flex min-h-0 flex-1 gap-3">
						<div className="flex w-20 shrink-0 flex-col items-center justify-center gap-1 text-center">
							<span
								className={`text-4xl [@media(min-height:900px)]:text-5xl font-black tabular-nums ${value !== null && target !== null && value > target ? "text-red-400" : "text-white"}`}
							>
								{fmt(value)}
							</span>
							<span className="text-sm font-bold text-[#fcd34d]">T: {fmt(target)}</span>
							{variation !== null && (
								<div>
									<span
										className={`${variation <= 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"} text-sm font-bold px-2 py-0.5 rounded-full`}
									>
										{fmtSigned(variation)}
									</span>
									<div className="text-xs text-gray-500 mt-1">vs M-1</div>
								</div>
							)}
						</div>
						<div className="flex min-w-0 flex-1 flex-col border-l border-white/[0.06] pl-3">
							<Bars
								highlightLast
								items={series.map((s: any) => ({
									label: monthLabel(s),
									value: toNum(s.Valeur),
									target: toNum(s.Target),
									color: accent,
								}))}
							/>
						</div>
					</div>
				</section>
			);
		};

		return (
			<>
				{noData && (
					<NoDataBanner>
						Aucune donnée pour {MONTH_FULL_NAMES[period - 1] ?? ""} {year} : les fichiers Quality Monthly de
						cette période n&apos;ont pas encore été importés (page Importation).
					</NoDataBanner>
				)}
				<div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 [@media(min-height:900px)]:gap-4">
					{/* PPM par client */}
					<section className={cardClass}>
						<SectionHeader icon={<FaUsers />} title="PPM par Client" accent="#2563eb" />
						<div className="mb-2 flex shrink-0 items-baseline gap-2">
							<span className="text-3xl [@media(min-height:900px)]:text-4xl font-black text-white tabular-nums">
								{ppmWithTarget > 0 ? `${ppmInTarget}/${ppmWithTarget}` : "—"}
							</span>
							<span className="text-xs text-gray-400 lg:text-sm">clients dans la cible</span>
						</div>
						{/* A long client list scrolls inside the card instead of growing the page */}
						<div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1 [@media(min-height:900px)]:space-y-3">
							{ppmClients.length === 0 && (
								<p className="text-xs text-gray-500 lg:text-sm">Aucun PPM client pour ce mois</p>
							)}
							{ppmClients.map((client: any, index: number) => {
								const value = toNum(client.Valeur);
								const target = toNum(client.Target);
								const variation = toNum(client.Variation_Vs_Mois_Precedent);
								const status = ppmStatus(client);
								// Bar scale: the larger of value and target, with some room for the marker
								const scale = Math.max(value ?? 0, target ?? 0, 1) * 1.15;
								return (
									<div
										key={index}
										className="grid grid-cols-[minmax(0,6.5rem)_1fr_auto] items-center gap-2"
										title={variation === null ? undefined : `${fmtSigned(variation, 1)} vs M-1`}
									>
										<span className="truncate text-xs text-gray-300 font-medium lg:text-sm">{client.Client}</span>
										<div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
											{target !== null && (
												<div className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-10" style={{ left: `${(target / scale) * 100}%` }} />
											)}
											<div
												className={`h-full ${status === "bad" ? "bg-red-500" : status === "good" ? "bg-blue-500" : "bg-slate-500"} rounded-full transition-all duration-500`}
												style={{ width: `${((value ?? 0) / scale) * 100}%` }}
											/>
										</div>
										<div className="flex items-baseline gap-1.5 whitespace-nowrap tabular-nums">
											<span
												className={`text-xs font-bold lg:text-sm ${status === "bad" ? "text-red-400" : status === "good" ? "text-emerald-400" : "text-gray-300"}`}
											>
												{fmt(value, 1)}
											</span>
											<span className="text-xs text-gray-500">T:{fmt(target, 1)}</span>
										</div>
									</div>
								);
							})}
						</div>
					</section>

					{/* DN Client */}
					<section className={cardClass}>
						<SectionHeader icon={<FaFileExport />} title="DN Client" accent="#3b82f6" />
						<div className="flex shrink-0 flex-wrap items-baseline gap-x-2">
							<div className="text-3xl [@media(min-height:900px)]:text-4xl font-black text-white tabular-nums">
								{dnValue === null ? "—" : dnValue.toLocaleString()}
							</div>
							<Variation value={toNum(dnClient?.Variation_Vs_Mois_Precedent)} lowerIsBetter label="vs M-1" />
						</div>
						<div className="mt-0.5 mb-1 flex shrink-0 flex-wrap items-center gap-1.5">
							<span className="text-xs text-gray-400">T: {dnTarget === null ? "—" : dnTarget.toLocaleString()}</span>
							<StatusChip value={dnValue} target={dnTarget} lowerIsBetter decimals={0} />
						</div>
						<Bars
							items={dnSeries.map((s: any) => ({
								label: monthLabel(s),
								value: toNum(s.Valeur),
								target: toNum(s.Target),
								color: "rgba(59,130,246,0.7)",
							}))}
						/>
					</section>

					{/* Conformité Audits */}
					<section className={cardClass}>
						<SectionHeader icon={<FaChartBar />} title="Taux de Conformité aux Audits" accent="#10b981" />
						<div className="flex min-h-0 flex-1 items-center justify-center gap-6">
							{[
								{ label: "Completion", kpi: completion, color: "#10b981" },
								{ label: "Compliance", kpi: compliance, color: "#f97316" },
							].map((item) => (
								<div key={item.label} className="flex flex-col items-center gap-1">
									<RingCircle
										value={toNum(item.kpi?.Valeur_Mois_Courant)}
										color={item.color}
										sizeClass="h-20 w-20 [@media(min-height:760px)]:h-24 [@media(min-height:760px)]:w-24 [@media(min-height:900px)]:h-32 [@media(min-height:900px)]:w-32"
									/>
									<span className="text-sm text-gray-300 font-medium">{item.label}</span>
									<Variation
										value={toNum(item.kpi?.Variation_Vs_Mois_Precedent)}
										decimals={1}
										suffix="%"
										label="vs M-1"
									/>
								</div>
							))}
						</div>
					</section>

					{/* Score Cards Clients */}
					<section className={cardClass}>
						<SectionHeader icon={<FaCheckDouble />} title="Score Cards Clients" accent="#f59e0b" />
						<div className="mb-2 flex shrink-0 items-baseline gap-3">
							<span className="text-3xl [@media(min-height:900px)]:text-4xl font-black text-white tabular-nums">
								{fmt(avgScore, 1, "%")}
							</span>
							<span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">
								Moyenne
							</span>
						</div>
						{/* A long client list scrolls inside the card instead of growing the page */}
						<div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1 [@media(min-height:900px)]:space-y-3">
							{clientValues.length === 0 && (
								<p className="text-xs text-gray-500 lg:text-sm">Aucun score client pour ce mois</p>
							)}
							{clientValues.map((client: any, index: number) => {
								const value = toNum(client.Valeur);
								const target = toNum(client.Target);
								const isAbove = value !== null && target !== null && value >= target;
								// One line per client: name, bar with the target marker, score and target
								return (
									<div key={index} className="grid grid-cols-[minmax(0,6.5rem)_1fr_auto] items-center gap-2">
										<span className="truncate text-xs text-gray-300 font-medium lg:text-sm">{client.Client}</span>
										<div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
											{target !== null && (
												<div className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-10" style={{ left: `${target}%` }} />
											)}
											<div
												className={`h-full ${isAbove ? "bg-blue-500" : "bg-red-500"} rounded-full transition-all duration-500`}
												style={{ width: `${value ?? 0}%` }}
											/>
										</div>
										<div className="flex items-baseline gap-1.5 whitespace-nowrap tabular-nums">
											<span className={`text-xs font-bold lg:text-sm ${isAbove ? "text-emerald-400" : "text-red-400"}`}>
												{fmt(value, 1, "%")}
											</span>
											<span className="text-xs text-gray-500">T:{fmt(target, 1, "%")}</span>
										</div>
									</div>
								);
							})}
						</div>
					</section>

					{workSafetyCard("Incidents de Travail", <FaExclamationTriangle />, "#f59e0b", incidentsTravail)}
					{workSafetyCard("Accidents de Travail", <FaUserInjured />, "#ef4444", accidentsTravail)}

					{/* Efficience Mensuelle */}
					<section className={`${cardClass} md:col-span-2`}>
						<SectionHeader icon={<FaChartArea />} title="Suivi de l'Efficience (mensuelle)" accent="#2563eb" />
						<div className="mb-1 flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1">
							<span className="text-4xl [@media(min-height:900px)]:text-5xl font-black text-white tabular-nums">
								{fmt(efficienceValue, 1, "%")}
							</span>
							{efficienceVariation !== null && (
								<div className="flex items-center gap-2">
									<span
										className={`${efficienceVariation >= 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"} text-sm font-bold px-2 py-0.5 rounded-full`}
									>
										{fmtSigned(efficienceVariation, 1, "%")}
									</span>
									<span className="text-xs text-gray-400">vs M-1</span>
								</div>
							)}
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-400">T: {fmt(efficienceTarget, 1, "%")}</span>
								<StatusChip value={efficienceValue} target={efficienceTarget} />
							</div>
						</div>
						<ColumnLineChart
							values={efficienceSeries.map((s: any) => toNum(s.Valeur))}
							color="#2563eb"
							format={(v) => fmt(v, 1, "%")}
							target={efficienceTarget}
							labels={efficienceSeries.map(monthLabel)}
						/>
					</section>
				</div>
			</>
		);
	};

	return (
		// From tablet width, the page takes exactly the height under the header (no scroll)
		<main className="flex flex-col p-3 sm:p-4 [@media(min-height:760px)]:lg:p-5 md:h-full md:min-h-[460px]">
			{/* Header */}
			<div className="mb-2 [@media(min-height:760px)]:mb-3 flex shrink-0 flex-wrap justify-between items-center gap-3">
				<div className="flex items-center gap-2">
					<span className="w-1 h-8 rounded-full bg-white block" />
					<span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-white">
						Quality KPI
					</span>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<PeriodSelector
						type={activeTab}
						period={period}
						year={year}
						onPeriodChange={setPeriod}
						onYearChange={setYear}
					/>
					<TabSelector activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
				</div>
			</div>

			{error && (
				<div className="rounded-2xl border border-red-800/50 bg-red-900/20 p-6 text-red-400 mb-5 flex items-center gap-3">
					{error}
				</div>
			)}

			{loading && (
				<div className="flex flex-1 items-center justify-center py-20 gap-3 text-gray-400">
					<div className="w-8 h-8 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
					Chargement...
				</div>
			)}

			{!loading &&
				!error &&
				(activeTab === "weekly" ? <WeeklyQuality /> : <MonthlyQuality />)}
		</main>
	);
}
