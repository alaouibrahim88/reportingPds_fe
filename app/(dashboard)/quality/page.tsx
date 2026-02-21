"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { PeriodSelector } from "@/components/ui/PeriodSelector";
import { TabSelector } from "@/components/ui/TabSelector";
import { useKpiPeriod } from "@/hooks/use-kpi-period";
import { FaBug,FaFreeCodeCamp,FaMapMarked,FaChartBar,FaCheckDouble,FaChartArea,FaFileExport,FaHotjar  } from "react-icons/fa";

type TabType = "weekly" | "monthly";

const calculateStrokeDashOffset = (
	percentage: number,
	circumference: number = 283
) => {
	return circumference - (percentage / 100) * circumference;
};

const mapValueToY = (
	value: number,
	minVal: number,
	maxVal: number,
	minY: number,
	maxY: number
) => {
	return maxY - ((value - minVal) / (maxVal - minVal)) * (maxY - minY);
};

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
		<div
			className="flex items-center gap-3 mb-5 pb-4 border-b"
			style={{ borderColor: "rgba(255,255,255,0.08)" }}
		>
			<div
				className="w-9 h-9 rounded-lg flex items-center justify-center"
				style={{ background: `${accent}22` }}
			>
				<span
					className="material-symbols-outlined text-lg"
					style={{ color: accent }}
				>
					{icon}
				</span>
			</div>
			<h2
				className="text-base font-semibold text-white"
			>
				{title}
			</h2>
		</div>
	);
}

function StatusChip({
	value,
	target,
	lowerIsBetter = false,
}: {
	value: number;
	target: number;
	lowerIsBetter?: boolean;
}) {
	const isGood = lowerIsBetter ? value <= target : value >= target;
	const delta = lowerIsBetter ? target - value : value - target;
	const sign = delta >= 0 ? "+" : "";
	return (
		<span
			className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${isGood ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}
		>
			{isGood ? "▲" : "▼"} {sign}
			{delta.toFixed(1)} vs Target
		</span>
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
		if (!data) return <div className="text-gray-400 p-8">Chargement...</div>;

		const reclamations = data.Reclamations_Clients;
		const incidents = data.Incidents;
		const efficienceGlobale = data.Efficience_Globale;
		const efficienceParZone = data.Efficience_Par_Zone;

		const reclamationsSeries = reclamations?.Serie_4_Semaines || [];
		const efficienceSeries = efficienceGlobale?.Serie_4_Semaines || [];

		const progressColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];

		const zoneKeys = ["Boot", "HeadRest", "Gainage", "Volant", "Net"];
		const zoneColors = [
			"#8b5cf6",
			"#3b82f6",
			"#06b6d4",
			"#10b981",
			"#f59e0b",
		];
		const incidentsParZoneArray = incidents?.Incidents_Par_Zone || [];
		const incidentsParZone = incidents?.Par_Zone || {};

		const getZoneValue = (zone: string) => {
			const fromArray = incidentsParZoneArray.find(
				(item: any) => item.Zone === zone
			);
			if (fromArray) return Number(fromArray.Valeur) || 0;
			return Number(incidentsParZone[zone]) || 0;
		};

		const getZoneTarget = (zone: string) => {
			const fromArray = incidentsParZoneArray.find(
				(item: any) => item.Zone === zone
			);
			if (fromArray) return Number(fromArray.Target) || 0;
			return Number(incidentsParZone[`Target_${zone}`]) || 0;
		};

		const reclamationsChartValues = [...reclamationsSeries].reverse();
		const maxReclamation = Math.max(
			...reclamationsChartValues.map((s: any) => Number(s.Valeur)),
			1
		);
		const reclamationsPoints = reclamationsChartValues
			.map((s: any, i: number) => {
				const x = 100 + i * 100;
				const y = mapValueToY(Number(s.Valeur), 0, maxReclamation, 15, 85);
				return `${x},${y}`;
			})
			.join(" ");

		const efficienceChartValues = [...efficienceSeries].reverse();
		const efficiencePoints = efficienceChartValues
			.map((s: any, i: number) => {
				const x = 100 + i * 100;
				const y = mapValueToY(Number(s.Valeur), 80, 100, 20, 180);
				return `${x},${y}`;
			})
			.join(" ");

		const variationReclamation =
			Number(reclamations?.Variation_Vs_Semaine_Precedente) || 0;
		const variationReclamationColor =
			variationReclamation > 0 ? "text-red-400" : "text-emerald-400";

		const variationEfficience =
			Number(efficienceGlobale?.Variation_Vs_Semaine_Precedente) || 0;
		const variationEfficienceColor =
			variationEfficience >= 0 ? "text-emerald-400" : "text-red-400";

		const efficienceValue = Number(efficienceGlobale?.Valeur_Actuelle) || 0;
		const efficienceTarget =
			Number(efficienceGlobale?.Target_Actuelle) || 90;

		const reclamationValue = Number(reclamations?.Valeur_Actuelle) || 0;
		const reclamationTarget = Number(reclamations?.Target_Actuelle) || 10;

		return (
			<div className="space-y-5">
				{/* Réclamations Clients */}
				<div className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600"
					style={{ borderColor: "rgba(255,255,255,0.08)" }}>
					<SectionHeader
						icon={<FaBug />}
						title="Réclamations Clients"
						accent="#06b6d4"
					/>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Left */}
						<div className="flex items-start gap-8">
							<div className="text-center">
								<div className="text-6xl md:text-7xl font-black text-white mb-2 leading-none tabular-nums">
									{reclamationValue}
								</div>
								<div
									className={`text-sm ${variationReclamationColor} font-medium mb-2`}
								>
									{variationReclamation >= 0 ? "+" : ""}
									{variationReclamation} vs Sem. Préc.
								</div>
								<div className="flex flex-col items-center gap-1">
									<span className="text-xs text-gray-400">
										Target: {reclamationTarget}
									</span>
									<StatusChip
										value={reclamationValue}
										target={reclamationTarget}
										lowerIsBetter
									/>
								</div>
							</div>

							{/* Weekly circles */}
							<div className="flex flex-row items-center justify-between w-full">
								{reclamationsSeries.map((week: any, index: number) => (
									<div
										key={index}
										className="flex flex-col items-center gap-2"
									>
										<span className="text-xs text-gray-400 font-medium">
											{week.Label || `S-${index + 1}`}
										</span>
										<div
											className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg"
											style={{
												background: `${progressColors[index % progressColors.length]}22`,
												border: `2px solid ${progressColors[index % progressColors.length]}66`,
											}}
										>
											<span
												className="text-xl md:text-2xl font-black"
												style={{
													color: progressColors[
														index % progressColors.length
													],
												}}
											>
												{Number(week.Valeur)}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Right: Chart */}
						<div
							className="border-l pl-8"
							style={{ borderColor: "rgba(255,255,255,0.06)" }}
						>
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
								Suivi des Réclamations
							</p>
							<svg viewBox="0 0 450 120" className="w-full max-w-md h-auto">
								<line
									x1="50"
									y1="95"
									x2="420"
									y2="95"
									stroke="#374151"
									strokeWidth="1"
								/>
								{[30, 60].map((y) => (
									<line
										key={y}
										x1="50"
										y1={y}
										x2="420"
										y2={y}
										stroke="#1f2937"
										strokeWidth="1"
										strokeDasharray="4 4"
									/>
								))}
								{reclamationsChartValues.map((s: any, i: number) => (
									<text
										key={i}
										x={100 + i * 100}
										y="112"
										textAnchor="middle"
										fontSize="11"
										className="fill-gray-500"
									>
										{s.Label || `S-${4 - i}`}
									</text>
								))}
								<polyline
									points={reclamationsPoints}
									fill="none"
									stroke="#06b6d4"
									strokeWidth="2.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								{reclamationsChartValues.map((s: any, i: number) => {
									const x = 100 + i * 100;
									const y = mapValueToY(
										Number(s.Valeur),
										0,
										maxReclamation,
										15,
										85
									);
									return (
										<circle key={i} cx={x} cy={y} r="5" fill="#06b6d4" />
									);
								})}
							</svg>
						</div>
					</div>
				</div>

				{/* Incidents */}
				{incidents && (
					<div
						className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600"
						style={{ borderColor: "rgba(255,255,255,0.08)" }}
					>
						<SectionHeader
							icon={<FaBug/>}
							title="Incidents"
							accent="#f59e0b"
						/>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{/* Left */}
							<div className="flex items-center gap-6">
								<div className="text-center">
									<div className="text-6xl md:text-7xl font-black text-white mb-2 leading-none tabular-nums">
										{Number(incidents?.Valeur_Actuelle) || 0}
									</div>
									<div className="flex flex-col items-center gap-1">
										<span className="text-xs text-gray-400">
											Target: {Number(incidents?.Target_Actuelle) || 0}
										</span>
										<StatusChip
											value={Number(incidents?.Valeur_Actuelle || 0)}
											target={Number(incidents?.Target_Actuelle || 0)}
											lowerIsBetter
										/>
									</div>
									<div className="text-xs text-gray-500 mt-2">
										Semaine {incidents?.Semaine_Actuelle || "N/A"} -{" "}
										{incidents?.Annee || "N/A"}
									</div>
								</div>
							</div>

							{/* Right: Zone Bar Chart */}
							<div
								className="border-l pl-8"
								style={{ borderColor: "rgba(255,255,255,0.06)" }}
							>
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
									Incidents par Zone
								</p>
								<svg viewBox="0 0 550 150" className="w-full max-w-lg h-auto">
									{zoneKeys.map((zone, i) => {
										const value = getZoneValue(zone);
										const target = getZoneTarget(zone);
										const maxZoneVal = Math.max(
											...zoneKeys.map((z) => getZoneValue(z)),
											...zoneKeys.map((z) => getZoneTarget(z)),
											1
										);
										const valueHeight = (value / maxZoneVal) * 80;
										const targetHeight = (target / maxZoneVal) * 80;
										const y = 120 - valueHeight;
										const targetY = 120 - targetHeight;
										const x = 50 + i * 100;
										const isAboveTarget = value > target;
										return (
											<React.Fragment key={zone}>
												<line
													x1={x}
													y1={targetY}
													x2={x + 50}
													y2={targetY}
													stroke="#f59e0b"
													strokeWidth="2"
													strokeDasharray="4"
													opacity="0.8"
												/>
												<rect
													x={x + 5}
													y={y}
													width="40"
													height={valueHeight}
													fill={zoneColors[i]}
													rx="4"
													opacity={isAboveTarget ? 1 : 0.75}
												/>
												<text
													x={x + 25}
													y={y - 6}
													textAnchor="middle"
													fontSize="12"
													fontWeight="700"
													className="fill-white"
												>
													{value}
												</text>
												{target > 0 && (
													<text
														x={x + 25}
														y={targetY - 8}
														textAnchor="middle"
														fontSize="9"
														className="fill-yellow-400"
													>
														T:{target}
													</text>
												)}
											</React.Fragment>
										);
									})}
									<line
										x1="40"
										y1="120"
										x2="540"
										y2="120"
										stroke="#374151"
										strokeWidth="1.5"
									/>
									{zoneKeys.map((zone, i) => (
										<text
											key={zone}
											x={75 + i * 100}
											y="138"
											textAnchor="middle"
											fontSize="10"
											className="fill-gray-400"
										>
											{zone}
										</text>
									))}
								</svg>
							</div>
						</div>
					</div>
				)}

				{/* Efficience Globale */}
				<div
					className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600"
					style={{ borderColor: "rgba(255,255,255,0.08)" }}
				>
					<SectionHeader
						icon={<FaFreeCodeCamp />}
						title="Suivi de l'Efficience (par semaine)"
						accent="#10b981"
					/>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* Left */}
						<div className="flex items-start gap-8">
							<div className="text-center">
								<div className="text-6xl md:text-7xl font-black text-white mb-2 leading-none tabular-nums">
									{efficienceGlobale?.Valeur_Actuelle || 0}%
								</div>
								<div
									className={`text-sm ${variationEfficienceColor} font-medium mb-2`}
								>
									{variationEfficience >= 0 ? "+" : ""}
									{variationEfficience}% vs Sem. Préc.
								</div>
								<div className="flex flex-col items-center gap-1">
									<span className="text-xs text-gray-400">
										Target: {efficienceTarget}%
									</span>
									<StatusChip
										value={efficienceValue}
										target={efficienceTarget}
									/>
								</div>
							</div>

							{/* Weekly progress circles */}
							<div className="grid grid-cols-2 gap-3 flex-1">
								{efficienceSeries.map((week: any, index: number) => {
									const val = Number(week.Valeur);
									const strokeDashOffset = calculateStrokeDashOffset(val);
									return (
										<div
											key={index}
											className="flex flex-col items-center gap-2"
										>
											<span className="text-xs text-gray-400 font-medium">
												{week.Label || `S-${index + 1}`}
											</span>
											<svg
												className="w-16 h-16 md:w-20 md:h-20"
												viewBox="0 0 120 120"
											>
												<circle
													cx="60"
													cy="60"
													r="45"
													fill="none"
													stroke="#1f2937"
													strokeWidth="10"
												/>
												<circle
													cx="60"
													cy="60"
													r="45"
													fill="none"
													stroke={
														progressColors[
															index % progressColors.length
														]
													}
													strokeWidth="10"
													strokeDasharray="283"
													strokeDashoffset={strokeDashOffset}
													strokeLinecap="round"
													transform="rotate(-90 60 60)"
												/>
												<text
													x="60"
													y="68"
													textAnchor="middle"
													fontSize="22"
													fontWeight="bold"
													className="fill-white"
												>
													{val}%
												</text>
											</svg>
										</div>
									);
								})}
							</div>
						</div>

						{/* Right: Line Chart */}
						<div
							className="border-l pl-8 flex items-center"
							style={{ borderColor: "rgba(255,255,255,0.06)" }}
						>
							<div className="w-full">
								<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
									Tendance hebdomadaire
								</p>
								<svg viewBox="0 0 450 240" className="w-full h-auto">
									<line
										x1="50"
										y1="200"
										x2="420"
										y2="200"
										stroke="#374151"
										strokeWidth="1"
									/>
									{[80, 130].map((y) => (
										<line
											key={y}
											x1="50"
											y1={y}
											x2="420"
											y2={y}
											stroke="#1f2937"
											strokeWidth="1"
											strokeDasharray="4 4"
										/>
									))}
									{efficienceChartValues.map((s: any, i: number) => (
										<text
											key={i}
											x={100 + i * 100}
											y="225"
											textAnchor="middle"
											fontSize="12"
											className="fill-gray-500"
										>
											{s.Label || `S-${4 - i}`}
										</text>
									))}
									<polyline
										points={efficiencePoints}
										fill="none"
										stroke="#10b981"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									{efficienceChartValues.map((s: any, i: number) => {
										const x = 100 + i * 100;
										const y = mapValueToY(
											Number(s.Valeur),
											80,
											100,
											20,
											180
										);
										return (
											<circle key={i} cx={x} cy={y} r="6" fill="#10b981" />
										);
									})}
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Efficience Par Zone */}
				{efficienceParZone && efficienceParZone.Zones && (
					<div
						className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600"
						style={{ borderColor: "rgba(255,255,255,0.08)" }}
					>
						<SectionHeader
							icon={<FaMapMarked />}
							title="Efficience par Zone"
							accent="#8b5cf6"
						/>
						<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
							{zoneKeys.map((zone, index) => {
								const zoneVal =
									Number(efficienceParZone.Zones[zone]) || 0;
								const zoneTgt =
									Number(
										efficienceParZone.Zones[`Target_${zone}`]
									) || 95;
								const vsTarget = zoneVal - zoneTgt;
								const vsTargetColor =
									vsTarget >= 0
										? "text-emerald-400"
										: "text-red-400";
								const strokeDashOffset =
									calculateStrokeDashOffset(zoneVal);
								return (
									<div
										key={zone}
										className="flex flex-col items-center gap-2"
									>
										<span className="text-sm text-gray-200 font-semibold">
											{zone}
										</span>
										<svg className="w-24 h-24" viewBox="0 0 120 120">
											<circle
												cx="60"
												cy="60"
												r="45"
												fill="none"
												stroke="#1f2937"
												strokeWidth="10"
											/>
											<circle
												cx="60"
												cy="60"
												r="45"
												fill="none"
												stroke={
													progressColors[
														index % progressColors.length
													]
												}
												strokeWidth="10"
												strokeDasharray="283"
												strokeDashoffset={strokeDashOffset}
												strokeLinecap="round"
												transform="rotate(-90 60 60)"
											/>
											<text
												x="60"
												y="65"
												textAnchor="middle"
												fontSize="18"
												fontWeight="bold"
												className="fill-white"
											>
												{zoneVal.toFixed(1)}%
											</text>
										</svg>
										<div className="text-center">
											<div
												className={`text-xs ${vsTargetColor} font-semibold`}
											>
												{vsTarget >= 0 ? "▲" : "▼"}{" "}
												{Math.abs(vsTarget).toFixed(1)}%
											</div>
											<div className="text-[10px] text-gray-500 mt-0.5">
												Target: {zoneTgt}%
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		);
	};

	const MonthlyQuality = () => {
		if (!data) {
			return (
				<div className="text-gray-400 p-8">
					Aucune donnée disponible
				</div>
			);
		}

		const ppmScrapClient = data.PPM_Scrap_Client;
		const tauxConformite = data.Taux_Conformite_Audits;
		const incidents = data.Incidents_Accidents_Travail;
		const efficienceMensuelle = data.Efficience_Mensuelle;
		const scorecards = data.Scorecards_Clients;

		if (
			!ppmScrapClient &&
			!tauxConformite &&
			!incidents &&
			!efficienceMensuelle &&
			!scorecards
		) {
			return (
				<div className="rounded-2xl border border-yellow-800/50 bg-yellow-900/20 p-6">
					<div className="text-yellow-400 font-semibold mb-2">
						Structure de données inattendue
					</div>
					<div className="text-sm text-gray-300 mb-4">
						Les données reçues ne correspondent pas à la structure attendue.
					</div>
					<div className="text-xs text-gray-400 font-mono bg-gray-900 p-3 rounded overflow-auto">
						<div>Clés: {Object.keys(data).join(", ") || "Aucune"}</div>
					</div>
				</div>
			);
		}

		const ppmValue = Number(ppmScrapClient?.PPM_Mois_Courant) || 0;
		const ppmVariation =
			Number(ppmScrapClient?.Variation_PPM_Vs_Mois_Precedent) || 0;
		const ppmVariationColor =
			ppmVariation <= 0 ? "text-emerald-400" : "text-red-400";

		const scrapValue = Number(ppmScrapClient?.Scrap_Mois_Courant) || 0;
		const scrapSeries = ppmScrapClient?.Suivi_Scrap_4_Mois || [];
		const scrapVariationProvided =
			ppmScrapClient?.Variation_Scrap_Vs_Mois_Precedent;
		const scrapVariation =
			scrapVariationProvided !== undefined
				? Number(scrapVariationProvided)
				: (() => {
						const prev =
							Number(scrapSeries[scrapSeries.length - 2]?.Valeur) || 0;
						return prev ? scrapValue - prev : 0;
					})();
		const scrapVariationColor =
			scrapVariation <= 0 ? "text-emerald-400" : "text-red-400";

		const ppmSeries = ppmScrapClient?.Suivi_PPM_4_Mois || [];
		const ppmChartValues = [...ppmSeries].reverse();
		const maxPpm = Math.max(
			...ppmChartValues.map((s: any) => Number(s.Valeur)),
			1
		);
		const ppmPoints = ppmChartValues
			.map((s: any, i: number) => {
				const x = 10 + i * 40;
				const y = mapValueToY(Number(s.Valeur), 0, maxPpm, 15, 60);
				return `${x},${y}`;
			})
			.join(" ");

		const scrapChartValues = [...scrapSeries].reverse();
		const maxScrap = Math.max(
			...scrapChartValues.map((s: any) => Number(s.Valeur)),
			1
		);

		const completion = tauxConformite?.Completion;
		const compliance = tauxConformite?.Compliance;
		const completionValue = Number(completion?.Valeur_Mois_Courant) || 0;
		const complianceValue = Number(compliance?.Valeur_Mois_Courant) || 0;
		const completionVariation =
			Number(completion?.Variation_Vs_Mois_Precedent)?.toFixed(1) || "0";
		const complianceVariation =
			Number(compliance?.Variation_Vs_Mois_Precedent)?.toFixed(1) || "0";

		const circumference = 251.33;
		const completionOffset =
			circumference - (completionValue / 100) * circumference;
		const complianceOffset =
			circumference - (complianceValue / 100) * circumference;

		const clientValues = scorecards?.Clients || [];
		const avgScore =
			clientValues.length > 0
				? (
						clientValues.reduce(
							(sum: number, c: any) => sum + Number(c.Valeur),
							0
						) / clientValues.length
					).toFixed(1)
				: scorecards?.Score_Global || "0";

		const incidentsValue = Number(incidents?.Valeur_Mois_Courant) || 0;
		const incidentsSeries = incidents?.Serie_4_Mois || [];
		const incidentsPrevValue =
			Number(incidentsSeries[incidentsSeries.length - 2]?.Valeur) || 0;
		const incidentsVariation = incidentsValue - incidentsPrevValue;
		const incidentsVariationColor =
			incidentsVariation <= 0
				? "bg-emerald-500/15 text-emerald-400"
				: "bg-red-500/15 text-red-400";

		const incidentsChartValues = [...incidentsSeries];
		const maxIncidents = Math.max(
			...incidentsChartValues.map((s: any) => Number(s.Valeur)),
			1
		);

		const efficienceValue =
			Number(efficienceMensuelle?.Valeur_Mois_Courant) || 0;
		const efficienceTarget =
			Number(efficienceMensuelle?.Target_Mois_Courant) || 90;
		const efficienceSeries = efficienceMensuelle?.Suivi_4_Mois || [];
		const efficiencePrevValue =
			Number(efficienceSeries[efficienceSeries.length - 2]?.Valeur) ||
			efficienceValue;
		const efficienceVariation = (efficienceValue - efficiencePrevValue).toFixed(
			1
		);
		const efficienceVsTarget = (efficienceValue - efficienceTarget).toFixed(1);

		const efficienceChartValues = [...efficienceSeries];
		const minEff = 85;
		const maxEff = 100;
		const efficiencePoints = efficienceChartValues.map((s: any, i: number) => {
			const x = 60 + i * 93.33;
			const val = Number(s.Valeur);
			const y = mapValueToY(val, minEff, maxEff, 10, 90);
			return { x, y, value: val, label: s.Label || `M-${4 - i}` };
		});

		const borderStyle = { borderColor: "rgba(255,255,255,0.08)" };

		return (
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
				{/* PPM & Scrap */}
				<div
					className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600"
					style={borderStyle}
				>
					<SectionHeader
						icon={<FaFileExport/>}
						title="PPM & Scrap Client"
						accent="#2563eb"
					/>
					<div className="flex items-start justify-between mb-4">
						<div>
							<div className="flex items-baseline gap-2 mb-1">
								<div className="text-4xl font-black text-white tabular-nums">
									{ppmValue.toFixed(2)}
								</div>
								<div className="text-sm text-gray-400">PPM</div>
							</div>
							<div className="flex items-center gap-2 mb-1">
								<span className="text-xs text-gray-400">
									Target: {Number(ppmScrapClient?.Target_PPM_Mois_Courant) || 0}
								</span>
								<StatusChip
									value={ppmValue}
									target={Number(ppmScrapClient?.Target_PPM_Mois_Courant || 0)}
									lowerIsBetter
								/>
							</div>
							<div className="mt-3 pt-3 border-t" style={borderStyle}>
								<div className="flex items-center gap-2 mb-1">
									<span className="text-sm text-gray-300">
										Scrap: {scrapValue.toLocaleString()}
									</span>
									<span className={`${scrapVariationColor} text-sm font-bold`}>
										{Number(scrapVariation) > 0 ? "↑" : "↓"}{" "}
										{scrapVariation >= 0 ? "+" : ""}
										{scrapVariation} vs M-1
									</span>
								</div>
								<StatusChip
									value={scrapValue}
									target={Number(ppmScrapClient?.Target_Scrap_Mois_Courant || 0)}
									lowerIsBetter
								/>
							</div>
						</div>
						<div className="text-right">
							<div className={`${ppmVariationColor} font-bold text-xl`}>
								{ppmVariation >= 0 ? "+" : ""}
								{ppmVariation}
							</div>
							<div className="text-xs text-gray-500 mt-1">
								vs M-1
							</div>
						</div>
					</div>
					<div className="flex items-end gap-4 mt-6">
						<div className="flex-1">
							<p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
								PPM Trend
							</p>
							<svg viewBox="0 0 160 80" className="w-full h-16">
								<line
									x1="0"
									y1="70"
									x2="160"
									y2="70"
									stroke="#374151"
									strokeWidth="1"
								/>
								<polyline
									points={ppmPoints}
									fill="none"
									stroke="#2563eb"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								{ppmChartValues.map((s: any, i: number) => {
									const x = 10 + i * 40;
									const y = mapValueToY(Number(s.Valeur), 0, maxPpm, 15, 60);
									return (
										<circle key={i} cx={x} cy={y} r="4" fill="#2563eb" />
									);
								})}
							</svg>
						</div>
						<div className="flex items-end gap-1.5 h-20">
							{scrapChartValues.map((s: any, i: number) => {
								const val = Number(s.Valeur);
								const height = Math.max((val / maxScrap) * 55, 16);
								return (
									<div key={i} className="flex flex-col items-center">
										<span className="text-[10px] text-gray-400 mb-1">
											{val}
										</span>
										<div
											className="w-7 bg-blue-500/70 rounded-t"
											style={{ height: `${height}px` }}
										/>
										<span className="text-[9px] text-gray-500 mt-1">
											{s.Label || `M${i + 1}`}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Conformité Audits */}
				<div
					className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600"
					style={borderStyle}
				>
					<SectionHeader
						icon={<FaChartBar/>}
						title="Taux de Conformité aux Audits"
						accent="#10b981"
					/>
					<div className="flex justify-center gap-8 mt-4">
						{[
							{
								label: "Completion",
								value: completionValue,
								offset: completionOffset,
								color: "#10b981",
								variation: completionVariation,
							},
							{
								label: "Compliance",
								value: complianceValue,
								offset: complianceOffset,
								color: "#f97316",
								variation: complianceVariation,
							},
						].map((item) => (
							<div key={item.label} className="flex flex-col items-center">
								<div className="relative w-28 h-28">
									<svg
										className="w-full h-full -rotate-90"
										viewBox="0 0 100 100"
									>
										<circle
											cx="50"
											cy="50"
											r="40"
											fill="none"
											stroke="#1f2937"
											strokeWidth="9"
										/>
										<circle
											cx="50"
											cy="50"
											r="40"
											fill="none"
											stroke={item.color}
											strokeWidth="9"
											strokeDasharray={circumference}
											strokeDashoffset={item.offset}
											strokeLinecap="round"
										/>
									</svg>
									<div className="absolute inset-0 flex flex-col items-center justify-center">
										<span
											className="text-xl font-black text-white"
										>
											{item.value}%
										</span>
									</div>
								</div>
								<span className="text-sm text-gray-300 mt-3 font-medium">
									{item.label}
								</span>
								<span
									className={`${Number(item.variation) >= 0 ? "text-emerald-400" : "text-red-400"} text-sm font-bold mt-1`}
								>
									{Number(item.variation) >= 0 ? "+" : ""}
									{item.variation}%
								</span>
								<span className="text-xs text-gray-500">vs M-1</span>
							</div>
						))}
					</div>
				</div>

				{/* Score Cards Clients */}
				<div
					className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600"
					style={borderStyle}
				>
					<SectionHeader
						icon={<FaCheckDouble />}
						title="Score Cards Clients"
						accent="#f59e0b"
					/>
					<div className="flex items-baseline gap-3 mb-4">
						<span className="text-4xl font-black text-white tabular-nums">
							{avgScore}%
						</span>
						<span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">
							Moyenne
						</span>
					</div>
					<div className="space-y-3">
						{clientValues.map((client: any, index: number) => {
							const value = Number(client.Valeur);
							const target = Number(client.Target);
							const isAbove = value >= target;
							return (
								<div key={index}>
									<div className="flex items-center justify-between mb-1">
										<span className="text-xs text-gray-300 font-medium">
											{client.Client}
										</span>
										<div className="flex items-center gap-2">
											<span className="text-xs text-gray-500">
												T:{target}%
											</span>
											<span
												className={`text-xs font-bold ${isAbove ? "text-emerald-400" : "text-red-400"}`}
											>
												{value}%
											</span>
										</div>
									</div>
									<div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
										{/* Target marker */}
										<div
											className="absolute top-0 bottom-0 w-0.5 bg-yellow-400 z-10"
											style={{ left: `${target}%` }}
										/>
										<div
											className={`h-full ${isAbove ? "bg-blue-500" : "bg-red-500"} rounded-full transition-all duration-500`}
											style={{ width: `${value}%` }}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Incidents Accidents */}
				<div
					className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600 lg:col-span-1"
					style={borderStyle}
				>
					<SectionHeader
						icon={<FaHotjar/>}
						title="Incidents / Accidents de Travail"
						accent="#ef4444"
					/>
					<div className="flex items-start gap-4 mb-4">
						<span className="text-5xl font-black text-white tabular-nums">
							{incidentsValue}
						</span>
						<div className="mt-1">
							<span
								className={`${incidentsVariationColor} text-sm font-bold px-2 py-0.5 rounded-full`}
							>
								{incidentsVariation >= 0 ? "+" : ""}
								{incidentsVariation}
							</span>
							<div className="text-xs text-gray-500 mt-1">vs M-1</div>
						</div>
					</div>
					<div className="flex items-end justify-between gap-3 mb-4 px-1">
						{incidentsChartValues.map((s: any, i: number) => {
							const val = Number(s.Valeur);
							const height = Math.max((val / maxIncidents) * 60, 16);
							const isLatest = i === incidentsChartValues.length - 1;
							return (
								<div key={i} className="flex flex-col items-center flex-1">
									<div
										className={`w-full rounded-t-lg flex items-center justify-center font-bold text-sm text-white py-1 ${isLatest ? "bg-blue-500" : "bg-blue-500/50"}`}
										style={{ height: `${height}px` }}
									>
										{val}
									</div>
									<span className="text-[10px] text-gray-500 mt-1.5">
										{s.Label || s.Mois}
									</span>
								</div>
							);
						})}
					</div>
					{incidentsChartValues.some(
						(s: any) => s.Jours_Perdus != null && s.Jours_Perdus !== ""
					) && (
						<div
							className="mt-3 pt-3 border-t"
							style={borderStyle}
						>
							<span className="text-xs text-gray-400 font-medium mb-2 block">
								Jours Perdus
							</span>
							<svg viewBox="0 0 200 70" className="w-full h-14">
								{(() => {
									const joursData = incidentsChartValues
										.filter(
											(s: any) =>
												s.Jours_Perdus != null && s.Jours_Perdus !== ""
										)
										.map((s: any) => Number(s.Jours_Perdus));
									if (joursData.length < 2) return null;
									const maxJ = Math.max(...joursData, 1);
									const pts = joursData
										.map((val, i) => {
											const x =
												20 + (i / (joursData.length - 1)) * 150;
											const y = 55 - (val / maxJ) * 45;
											return `${x},${y}`;
										})
										.join(" ");
									return (
										<>
											<polyline
												points={pts}
												fill="none"
												stroke="#f59e0b"
												strokeWidth="2"
												strokeLinecap="round"
											/>
											{joursData.map((val, i) => {
												const x =
													20 + (i / (joursData.length - 1)) * 150;
												const y = 55 - (val / maxJ) * 45;
												return (
													<React.Fragment key={i}>
														<circle cx={x} cy={y} r="4" fill="#f59e0b" />
														<text
															x={x}
															y={y - 7}
															textAnchor="middle"
															fill="#f59e0b"
															fontSize="10"
															fontWeight="600"
														>
															{val}
														</text>
													</React.Fragment>
												);
											})}
										</>
									);
								})()}
							</svg>
						</div>
					)}
				</div>

				{/* Efficience Mensuelle */}
				<div
					className="rounded-2xl border bg-gray-900/60 backdrop-blur-sm p-6 transition-all hover:border-gray-600 lg:col-span-2"
					style={borderStyle}
				>
					<SectionHeader
						icon={<FaChartArea/>}
						title="Suivi de l'Efficience (mensuelle)"
						accent="#2563eb"
					/>
					<div className="flex flex-wrap items-start gap-4 mb-3">
						<span className="text-5xl font-black text-white tabular-nums">
							{efficienceValue}%
						</span>
						<div className="flex flex-wrap gap-3 mt-2">
							<div className="flex items-center gap-2">
								<span
									className={`${Number(efficienceVariation) >= 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"} text-sm font-bold px-2 py-0.5 rounded-full`}
								>
									{Number(efficienceVariation) >= 0 ? "+" : ""}
									{efficienceVariation}%
								</span>
								<span className="text-xs text-gray-400">vs M-1</span>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 mb-5">
						<span className="text-sm text-gray-400">
							Target: {efficienceTarget}%
						</span>
						<StatusChip
							value={efficienceValue}
							target={efficienceTarget}
						/>
					</div>
					<svg viewBox="0 0 400 120" className="w-full h-28">
						<line
							x1="40"
							y1="100"
							x2="380"
							y2="100"
							stroke="#374151"
							strokeWidth="1"
						/>
						{[60, 20].map((y) => (
							<line
								key={y}
								x1="40"
								y1={y}
								x2="380"
								y2={y}
								stroke="#1f2937"
								strokeWidth="1"
								strokeDasharray="4 4"
							/>
						))}
						<polyline
							points={efficiencePoints
								.map((p) => `${p.x},${p.y}`)
								.join(" ")}
							fill="none"
							stroke="#2563eb"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						{efficiencePoints.map((p, i) => (
							<React.Fragment key={i}>
								<circle cx={p.x} cy={p.y} r="5" fill="#2563eb" />
								<text
									x={p.x}
									y={p.y - 10}
									textAnchor="middle"
									fill="#ffffff"
									fontSize="11"
									fontWeight="600"
								>
									{p.value}%
								</text>
								<text
									x={p.x}
									y="115"
									textAnchor="middle"
									fill="#6b7280"
									fontSize="11"
								>
									{p.label}
								</text>
							</React.Fragment>
						))}
					</svg>
				</div>
			</div>
		);
	};

	return (
		<main className="flex-1 overflow-hidden p-4 md:p-6">
			{/* Header */}
			<div className="mx-auto mb-6 flex justify-between items-start gap-4">
				<div>
					<div className="flex items-center gap-2 mb-1">
						<span className="w-1 h-8 rounded-full bg-blue-500 block" />
						<span className="text-xs font-bold uppercase tracking-widest text-blue-400">
							Quality KPI
						</span>
					</div>
					<h1 className="text-2xl md:text-3xl font-bold text-white">
						Qualité &mdash;{" "}
						{activeTab === "weekly" ? "Hebdomadaire" : "Mensuel"}
					</h1>
					<p className="text-gray-400 text-sm mt-1">
						{activeTab === "weekly"
							? "Réclamations Client · Incidents · Efficience par semaine"
							: "Indicateurs de performance qualité mensuelle"}
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-3">
				<PeriodSelector
					type={activeTab}
					period={period}
					year={year}
					onPeriodChange={setPeriod}
					onYearChange={setYear}
				/>
				<TabSelector activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setPeriod(0) }} />
			</div>
			</div>

			{error && (
				<div className="rounded-2xl border border-red-800/50 bg-red-900/20 p-6 text-red-400 mb-5 flex items-center gap-3">
					<span className="material-symbols-outlined">error</span>
					{error}
				</div>
			)}

			{loading && (
				<div className="flex items-center justify-center py-20 gap-3 text-gray-400">
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
