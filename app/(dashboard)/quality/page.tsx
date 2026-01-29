"use client";

import React, { useEffect, useState } from "react";
import { TabSelector } from "@/components/ui/TabSelector";

type TabType = "weekly" | "monthly";

// Helper function to calculate stroke dash offset for circular progress
const calculateStrokeDashOffset = (percentage: number, circumference: number = 283) => {
  return circumference - (percentage / 100) * circumference;
};

// Helper function to map value to Y position for charts
const mapValueToY = (value: number, minVal: number, maxVal: number, minY: number, maxY: number) => {
  return maxY - ((value - minVal) / (maxVal - minVal)) * (maxY - minY);
};

// Quality Dashboard Page - Can fetch data here
export default function QualityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- FETCH LOGIC ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/quality?type=${activeTab}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message || "Erreur lors du chargement");
        }
        setData(json.data ?? json);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  // Weekly Quality Component
  const WeeklyQuality = () => {
    if (!data) return <div className="text-white">Chargement...</div>;

    const reclamations = data.Reclamations_Clients;
    const incidents = data.Incidents;
    const efficienceGlobale = data.Efficience_Globale;
    const efficienceParZone = data.Efficience_Par_Zone;

    // Serie_4_Semaines from API (S-1 = current, S-2 to S-4 = history)
    const reclamationsSeries = reclamations?.Serie_4_Semaines || [];
    const efficienceSeries = efficienceGlobale?.Serie_4_Semaines || [];

    // Circle gradients for weekly display
    const circleGradients = [
      "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    ];

    const progressColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];

    // Zone data for incidents bar chart - Par_Zone values may be strings
    const zoneKeys = ["Boot", "HeadRest", "Gainage", "Volant", "Net"];
    const zoneColors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#f59e0b"];
    const incidentsParZone = incidents?.Par_Zone || {};
    const getZoneValue = (zone: string) =>
      Number(incidentsParZone[zone]) || 0;

    // Calculate chart points for reclamations line chart (S-4 to S-1, oldest to newest)
    const reclamationsChartValues = [...reclamationsSeries].reverse();
    const maxReclamation = Math.max(
      ...reclamationsChartValues.map((s: any) => Number(s.Valeur)),
      1
    );
    const reclamationsPoints = reclamationsChartValues.map((s: any, i: number) => {
      const x = 100 + i * 100;
      const y = mapValueToY(Number(s.Valeur), 0, maxReclamation, 15, 85);
      return `${x},${y}`;
    }).join(' ');

    // Calculate chart points for efficience line chart
    const efficienceChartValues = [...efficienceSeries].reverse();
    const efficiencePoints = efficienceChartValues.map((s: any, i: number) => {
      const x = 100 + i * 100;
      const y = mapValueToY(Number(s.Valeur), 80, 100, 20, 180);
      return `${x},${y}`;
    }).join(' ');

    // Calculate variation text and color for reclamations (API may return string)
    const variationReclamation =
      Number(reclamations?.Variation_Vs_Semaine_Precedente) || 0;
    const variationReclamationText = variationReclamation >= 0 ? `+${variationReclamation}` : `${variationReclamation}`;
    const variationReclamationColor = variationReclamation > 0 ? "text-red-400" : "text-emerald-400";

    // Calculate variation text and color for efficience (API may return string)
    const variationEfficience =
      Number(efficienceGlobale?.Variation_Vs_Semaine_Precedente) || 0;
    const variationEfficienceText = variationEfficience >= 0 ? `+${variationEfficience}%` : `${variationEfficience}%`;
    const variationEfficienceColor = variationEfficience >= 0 ? "text-emerald-400" : "text-red-400";

    // Calculate target comparison for efficience (API may return strings)
    const efficienceValue = Number(efficienceGlobale?.Valeur_Actuelle) || 0;
    const efficienceTarget = Number(efficienceGlobale?.Target_Actuelle) || 90;
    const efficienceVsTarget = efficienceValue - efficienceTarget;
    const efficienceVsTargetText = efficienceVsTarget >= 0 ? `+${efficienceVsTarget.toFixed(1)}%` : `${efficienceVsTarget.toFixed(1)}%`;
    const efficienceVsTargetColor = efficienceVsTarget >= 0 ? "text-emerald-400" : "text-red-400";

    // Calculate target comparison for reclamations (API may return strings)
    const reclamationValue = Number(reclamations?.Valeur_Actuelle) || 0;
    const reclamationTarget = Number(reclamations?.Target_Actuelle) || 10;
    const reclamationVsTarget = ((reclamationValue - reclamationTarget) / reclamationTarget * 100).toFixed(0);
    const reclamationVsTargetText = reclamationValue > reclamationTarget
      ? `↑ +${reclamationVsTarget}%`
      : `↓ ${reclamationVsTarget}%`;
    const reclamationVsTargetColor = reclamationValue <= reclamationTarget ? "text-emerald-400" : "text-red-400";

    return (
      <div className="mx-auto">
        {/* Réclamations Clients Section */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-6 transition-transform duration-300 cursor-pointer">
          <h2 className="text-base font-medium text-white mb-5 pb-3 border-b border-gray-700">
            Réclamations Clients
          </h2>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Main Metric and Weekly Circles in same row */}
            <div className="flex items-center gap-8">
              {/* Main Metric */}
              <div className="p-4 text-center">
                <div className="text-6xl md:text-7xl font-bold text-white mb-2 leading-none">
                  {reclamations?.Valeur_Actuelle || 0}
                </div>
                <div className={`text-sm ${variationReclamationColor} font-medium mb-1`}>
                  {variationReclamationText} vs Sem. Préc.
                </div>
                <div className="text-sm text-gray-300">
                  vs Target ({reclamationTarget}){" "}
                  <span className={`${reclamationVsTargetColor} font-semibold`}>{reclamationVsTargetText}</span>
                </div>
              </div>

              {/* Weekly Circles - All in one row */}
              <div className="grid grid-cols-2 gap-4">
                {reclamationsSeries.map((week: any, index: number) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">
                      {week.Label || `S-${index + 1}`}
                    </span>
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        background: circleGradients[index % circleGradients.length],
                      }}
                    >
                      <span className="text-2xl md:text-3xl font-bold text-white">
                        {Number(week.Valeur)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Charts */}
            <div className="flex flex-col gap-4 border-l border-gray-700 pl-8">
              {/* Line Chart: Suivi des Réclamations */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">
                  Suivi des Réclamations
                </h3>
                <svg viewBox="0 0 450 120" className="w-full max-w-md h-auto">
                  <line
                    x1="50"
                    y1="95"
                    x2="420"
                    y2="95"
                    stroke="#4b5563"
                    strokeWidth="1"
                  />
                  {reclamationsChartValues.map((s: any, i: number) => (
                    <text
                      key={i}
                      x={100 + i * 100}
                      y="112"
                      textAnchor="middle"
                      fontSize="11"
                      className="fill-gray-300"
                    >
                      {s.Label || `S-${4 - i}`}
                    </text>
                  ))}
                  <polyline
                    points={reclamationsPoints}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
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
                    return <circle key={i} cx={x} cy={y} r="5" fill="#06b6d4" />;
                  })}
                </svg>
              </div>

              {/* Bar Chart: Incidents par Zone */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">
                  Incidents par Zone
                </h3>
                <svg viewBox="0 0 450 130" className="w-full max-w-md h-auto">
                  {zoneKeys.slice(0, 4).map((zone, i) => {
                    const value = getZoneValue(zone);
                    const maxZoneVal = Math.max(
                      ...zoneKeys.map(z => getZoneValue(z)),
                      1
                    );
                    const height = (value / maxZoneVal) * 80;
                    const y = 100 - height;
                    const x = 60 + i * 100;
                    return (
                      <React.Fragment key={zone}>
                        <rect
                          x={x}
                          y={y}
                          width="60"
                          height={height}
                          fill={zoneColors[i]}
                          rx="2"
                        />
                        <text
                          x={x + 30}
                          y={y - 6}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="700"
                          className="fill-white"
                        >
                          {value}
                        </text>
                      </React.Fragment>
                    );
                  })}
                  <line
                    x1="40"
                    y1="100"
                    x2="440"
                    y2="100"
                    stroke="#4b5563"
                    strokeWidth="1.5"
                  />
                  {zoneKeys.slice(0, 4).map((zone, i) => (
                    <text
                      key={zone}
                      x={90 + i * 100}
                      y="118"
                      textAnchor="middle"
                      fontSize="11"
                      className="fill-gray-200"
                    >
                      {zone}
                    </text>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Suivi de l'Efficience Section */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
          <h2 className="text-base font-medium text-white mb-5 pb-3 border-b border-gray-700">
            Suivi de l&apos;Efficience (par semaine)
          </h2>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Main Metric and Weekly Circles in same row */}
            <div className="flex items-center gap-8">
              {/* Main Metric */}
              <div className="p-4 text-center">
                <div className="text-6xl md:text-7xl font-bold text-white mb-2 leading-none">
                  {efficienceGlobale?.Valeur_Actuelle || 0}%
                </div>
                <div className={`text-sm ${variationEfficienceColor} font-medium mb-1`}>
                  {variationEfficienceText} vs Sem. Préc.
                </div>
                <div className="text-sm text-gray-300">
                  vs Target ({efficienceTarget}%){" "}
                  <span className={`${efficienceVsTargetColor} font-semibold`}>
                    {efficienceVsTarget >= 0 ? "↑" : "↓"} {efficienceVsTargetText}
                  </span>
                </div>
              </div>

              {/* Weekly Progress Circles */}
              <div className="grid grid-cols-2 gap-4">
                {efficienceSeries.map((week: any, index: number) => {
                  const val = Number(week.Valeur);
                  const strokeDashOffset = calculateStrokeDashOffset(val);
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <span className="text-sm text-gray-200 font-semibold mb-2">
                        {week.Label || `S-${index + 1}`}
                      </span>
                      <svg
                        className="w-20 h-20 md:w-24 md:h-24"
                        viewBox="0 0 120 120"
                      >
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          fill="none"
                          stroke="#374151"
                          strokeWidth="11"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          fill="none"
                          stroke={progressColors[index % progressColors.length]}
                          strokeWidth="11"
                          strokeDasharray="283"
                          strokeDashoffset={strokeDashOffset}
                          strokeLinecap="round"
                          transform="rotate(-90 60 60)"
                        />
                        <text
                          x="60"
                          y="68"
                          textAnchor="middle"
                          fontSize="24"
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

            {/* Right Column: Line Chart */}
            <div className="border-l border-gray-700 pl-8 flex items-center">
              <svg viewBox="0 0 450 240" className="w-full h-auto">
                <line
                  x1="50"
                  y1="200"
                  x2="420"
                  y2="200"
                  stroke="#4b5563"
                  strokeWidth="1"
                />
                  {efficienceChartValues.map((s: any, i: number) => (
                    <text
                      key={i}
                      x={100 + i * 100}
                      y="225"
                      textAnchor="middle"
                      fontSize="12"
                      className="fill-gray-300"
                    >
                      {s.Label || `S-${4 - i}`}
                    </text>
                  ))}
                <polyline
                  points={efficiencePoints}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
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
                  return <circle key={i} cx={x} cy={y} r="6" fill="#10b981" />;
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Monthly Quality Component
  const MonthlyQuality = () => {
    if (!data) return <div className="text-white">Chargement...</div>;

    const ppmScrapClient = data.PPM_Scrap_Client;
    const tauxConformite = data.Taux_Conformite_Audits;
    const incidents = data.Incidents_Accidents_Travail;
    const efficienceMensuelle = data.Efficience_Mensuelle;
    const scorecards = data.Scorecards_Clients;

    // PPM & Scrap data from PPM_Scrap_Client
    const ppmValue = Number(ppmScrapClient?.PPM_Mois_Courant) || 0;
    const ppmVariation =
      Number(ppmScrapClient?.Variation_PPM_Vs_Mois_Precedent) || 0;
    const ppmVariationText =
      ppmVariation >= 0 ? `+${ppmVariation}` : `${ppmVariation}`;
    const ppmVariationColor =
      ppmVariation <= 0 ? "text-green-400" : "text-red-400";

    const scrapValue = Number(ppmScrapClient?.Scrap_Mois_Courant) || 0;
    const scrapSeries = ppmScrapClient?.Suivi_Scrap_4_Mois || [];
    const scrapPrevValue = Number(scrapSeries[0]?.Valeur) || 0;
    const scrapVariation = scrapPrevValue
      ? ((scrapValue - scrapPrevValue) / scrapPrevValue * 100).toFixed(0)
      : 0;
    const scrapVariationText =
      Number(scrapVariation) >= 0 ? `+${scrapVariation}%` : `${scrapVariation}%`;
    const scrapVariationColor =
      Number(scrapVariation) <= 0 ? "text-green-400" : "text-red-400";

    // PPM line chart from Suivi_PPM_4_Mois
    const ppmSeries = ppmScrapClient?.Suivi_PPM_4_Mois || [];
    const ppmChartValues = [...ppmSeries].reverse();
    const maxPpm = Math.max(
      ...ppmChartValues.map((s: any) => Number(s.Valeur)),
      1
    );
    const ppmPoints = ppmChartValues.map((s: any, i: number) => {
      const x = 10 + i * 40;
      const y = mapValueToY(Number(s.Valeur), 0, maxPpm, 15, 60);
      return `${x},${y}`;
    }).join(' ');

    // Scrap bar chart from Suivi_Scrap_4_Mois
    const scrapChartValues = [...scrapSeries].reverse();
    const maxScrap = Math.max(
      ...scrapChartValues.map((s: any) => Number(s.Valeur)),
      1
    );

    // Taux de conformité - Completion/Compliance with Valeur_Mois_Courant, Variation_Vs_Mois_Precedent
    const completion = tauxConformite?.Completion;
    const compliance = tauxConformite?.Compliance;
    const completionValue = Number(completion?.Valeur_Mois_Courant) || 0;
    const complianceValue = Number(compliance?.Valeur_Mois_Courant) || 0;
    const completionVariation =
      Number(completion?.Variation_Vs_Mois_Precedent)?.toFixed(1) || "0";
    const complianceVariation =
      Number(compliance?.Variation_Vs_Mois_Precedent)?.toFixed(1) || "0";

    // Circular progress calculation (circumference = 2 * PI * 40 = 251.33)
    const circumference = 251.33;
    const completionOffset =
      circumference - (completionValue / 100) * circumference;
    const complianceOffset =
      circumference - (complianceValue / 100) * circumference;

    // Scorecards - Clients is array [{Client, Valeur, Target}]
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

    // Incidents - Serie_4_Mois
    const incidentsValue = Number(incidents?.Valeur_Mois_Courant) || 0;
    const incidentsSeries = incidents?.Serie_4_Mois || [];
    const incidentsPrevValue =
      Number(incidentsSeries[incidentsSeries.length - 2]?.Valeur) || 0;
    const incidentsVariation = incidentsValue - incidentsPrevValue;
    const incidentsVariationText = incidentsVariation >= 0 ? `+${incidentsVariation}` : `${incidentsVariation}`;
    const incidentsVariationColor = incidentsVariation <= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400";

    // Incidents bar chart from Serie_4_Mois
    const incidentsChartValues = [...incidentsSeries];
    const maxIncidents = Math.max(
      ...incidentsChartValues.map((s: any) => Number(s.Valeur)),
      1
    );
    const barColors = ["bg-blue-500", "bg-blue-500", "bg-blue-400", "bg-blue-300"];
    const textColors = ["text-white", "text-white", "text-white", "text-gray-700"];

    // Efficience mensuelle - Suivi_4_Mois
    const efficienceValue =
      Number(efficienceMensuelle?.Valeur_Mois_Courant) || 0;
    const efficienceTarget =
      Number(efficienceMensuelle?.Target_Mois_Courant) || 90;
    const efficienceSeries = efficienceMensuelle?.Suivi_4_Mois || [];
    const efficiencePrevValue =
      Number(
        efficienceSeries[efficienceSeries.length - 2]?.Valeur
      ) || efficienceValue;
    const efficienceVariation = (
      efficienceValue - efficiencePrevValue
    ).toFixed(1);
    const efficienceVsTarget = (
      efficienceValue - efficienceTarget
    ).toFixed(1);

    // Efficience chart from Suivi_4_Mois
    const efficienceChartValues = [...efficienceSeries];
    const minEff = 85;
    const maxEff = 100;
    const efficiencePoints = efficienceChartValues.map((s: any, i: number) => {
      const x = 60 + i * 93.33;
      const val = Number(s.Valeur);
      const y = mapValueToY(val, minEff, maxEff, 10, 90);
      return { x, y, value: val, label: s.Label || `M-${4 - i}` };
    });

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* PPM & Scrap Client Card */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
          <h2 className="text-sm font-semibold text-white mb-4">
            PPM & Scrap Client
          </h2>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-4xl font-bold text-white">{ppmValue.toFixed(2)}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-400">Scrap Client</span>
                <span className={`${scrapVariationColor} text-sm`}>{Number(scrapVariation) > 0 ? "↑" : "↓"}</span>
                <span className={`${scrapVariationColor} text-sm font-medium`}>
                  {scrapVariationText} vs M-1
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className={`${ppmVariationColor} font-semibold text-lg`}>{ppmVariationText}</div>
              <div className="text-xs text-gray-400">
                vs Mois
                <br />
                Préc.
              </div>
            </div>
          </div>
          <div className="flex items-end gap-4 mt-6">
            <div className="flex-1">
              <svg viewBox="0 0 160 80" className="w-full h-20">
                <line
                  x1="0"
                  y1="70"
                  x2="160"
                  y2="70"
                  stroke="#4b5563"
                  strokeWidth="1"
                />
                <polyline
                  points={ppmPoints}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                />
                {ppmChartValues.map((s: any, i: number) => {
                  const x = 10 + i * 40;
                  const y = mapValueToY(
                    Number(s.Valeur),
                    0,
                    maxPpm,
                    15,
                    60
                  );
                  return <circle key={i} cx={x} cy={y} r="4" fill="#2563eb" />;
                })}
              </svg>
            </div>
            <div className="flex items-end gap-2 h-20">
              {scrapChartValues.map((s: any, i: number) => {
                const val = Number(s.Valeur);
                const height = Math.max((val / maxScrap) * 60, 20);
                return (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-xs text-gray-300 mb-1">{val}</span>
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${height}px` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">
                      {s.Label || `M-${4 - i}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Taux de Conformité aux Audits Card */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
          <h2 className="text-sm font-semibold text-white mb-6">
            Taux de Conformité aux Audits
          </h2>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={completionOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{completionValue}%</span>
                </div>
              </div>
              <span className="text-sm text-gray-300 mt-3">Completion</span>
              <span className={`${Number(completionVariation) >= 0 ? "text-green-400" : "text-red-400"} text-sm font-medium mt-1`}>
                {Number(completionVariation) >= 0 ? "+" : ""}{completionVariation}%
              </span>
              <span className="text-xs text-gray-400">vs Mois Préc.</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={complianceOffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{complianceValue}%</span>
                </div>
              </div>
              <span className="text-sm text-gray-300 mt-3">Compliance</span>
              <span className={`${Number(complianceVariation) >= 0 ? "text-green-400" : "text-red-400"} text-sm font-medium mt-1`}>
                {Number(complianceVariation) >= 0 ? "+" : ""}{complianceVariation}%
              </span>
              <span className="text-xs text-gray-400">vs Mois Préc.</span>
            </div>
          </div>
        </div>

        {/* Score Cards Clients Card */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
          <h2 className="text-sm font-semibold text-white mb-2">
            Score Cards Clients
          </h2>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-bold text-white">{avgScore}%</span>
            <span className="bg-green-500/20 text-green-400 text-sm px-2 py-0.5 rounded">
              Moyenne
            </span>
          </div>
          <div className="space-y-3">
            {clientValues.map((client: any, index: number) => {
              const value = Number(client.Valeur);
              const target = Number(client.Target);
              const isAboveTarget = value >= target;
              return (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm text-gray-300 w-24">
                    {client.Client}
                  </span>
                  <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isAboveTarget ? "bg-blue-500" : "bg-red-500"} rounded-full`}
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-white w-10 text-right">
                    {value}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Incidents / Accidents de Travail Card */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer lg:col-span-1">
          <h2 className="text-sm font-semibold text-white mb-4">
            Incidents / Accidents de Travail
          </h2>
          <div className="flex items-start gap-4 mb-4">
            <span className="text-5xl font-bold text-white">{incidentsValue}</span>
            <div>
              <span className={`${incidentsVariationColor} text-sm px-2 py-0.5 rounded`}>
                {incidentsVariationText}
              </span>
              <div className="text-xs text-gray-400 mt-1">vs Mois Préc.</div>
            </div>
          </div>
          <div className="flex items-end justify-between gap-4 mb-6 px-2">
            {incidentsChartValues.map((s: any, i: number) => {
              const val = Number(s.Valeur);
              const height = Math.max((val / maxIncidents) * 70, 20);
              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-14 ${barColors[i]} rounded-t flex items-center justify-center ${textColors[i]} font-semibold py-2`}
                    style={{ height: `${height}px` }}
                  >
                    {val}
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {s.Label || s.Mois}
                  </span>
                </div>
              );
            })}
          </div>
          {incidentsChartValues.some(
            (s: any) => s.Jours_Perdus != null && s.Jours_Perdus !== ""
          ) && (
            <div className="mt-4">
              <span className="text-sm text-gray-300 mb-2 block">
                Jours Perdus
              </span>
              <svg viewBox="0 0 200 70" className="w-full h-16">
                {(() => {
                  const joursData = incidentsChartValues
                    .filter(
                      (s: any) => s.Jours_Perdus != null && s.Jours_Perdus !== ""
                    )
                    .map((s: any) => Number(s.Jours_Perdus));
                  if (joursData.length < 2) return null;
                  const maxJours = Math.max(...joursData, 1);
                  const points = joursData
                    .map((val, i) => {
                      const x = 20 + (i / (joursData.length - 1)) * 150;
                      const y = 55 - (val / maxJours) * 45;
                      return `${x},${y}`;
                    })
                    .join(" ");
                  return (
                    <>
                      <polyline
                        points={points}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                      />
                      {joursData.map((val, i) => {
                        const x = 20 + (i / (joursData.length - 1)) * 150;
                        const y = 55 - (val / maxJours) * 45;
                        return (
                          <React.Fragment key={i}>
                            <circle
                              cx={x}
                              cy={y}
                              r="4"
                              fill="#f59e0b"
                            />
                            <text
                              x={x}
                              y={y - 7}
                              textAnchor="middle"
                              fill="#f59e0b"
                              fontSize="11"
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

        {/* Suivi de l'Efficience Card */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer lg:col-span-2">
          <h2 className="text-sm font-semibold text-white mb-4">
            Suivi de l&apos;Efficience (mensuelle)
          </h2>
          <div className="flex flex-wrap items-start gap-4 mb-2">
            <span className="text-5xl font-bold text-white">{efficienceValue}%</span>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-1">
                <span className={`${Number(efficienceVariation) >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"} text-sm px-2 py-0.5 rounded`}>
                  {Number(efficienceVariation) >= 0 ? "+" : ""}{efficienceVariation}%
                </span>
                <span className="text-xs text-gray-400">vs Mois Préc.</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-gray-400">vs Target ({efficienceTarget}%)</span>
            <span className={Number(efficienceVsTarget) >= 0 ? "text-green-400" : "text-red-400"}>
              {Number(efficienceVsTarget) >= 0 ? "↑" : "↓"}
            </span>
            <span className={`${Number(efficienceVsTarget) >= 0 ? "text-green-400" : "text-red-400"} font-medium`}>
              {Number(efficienceVsTarget) >= 0 ? "+" : ""}{efficienceVsTarget}%
            </span>
          </div>
          <svg viewBox="0 0 400 120" className="w-full h-28">
            <line
              x1="40"
              y1="100"
              x2="380"
              y2="100"
              stroke="#4b5563"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="60"
              x2="380"
              y2="60"
              stroke="#4b5563"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <line
              x1="40"
              y1="20"
              x2="380"
              y2="20"
              stroke="#4b5563"
              strokeWidth="1"
              strokeDasharray="4"
            />
            <polyline
              points={efficiencePoints.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
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
                >
                  {p.value}%
                </text>
                <text
                  x={p.x}
                  y="115"
                  textAnchor="middle"
                  fill="#9ca3af"
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
      {/* Header with tabs */}
      <div className="mx-auto mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Qualité - {activeTab === "weekly" ? "Hebdomadaire" : "Mensuel"}
          </h1>
          <p className="text-gray-100">
            {activeTab === "weekly"
              ? "Réclamations Client Affinées"
              : "Indicateurs de performance qualité"}
          </p>
        </div>
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      {error && (
        <div className="rounded-xl border border-red-800 bg-red-900/20 p-6 text-red-400">
          {error}
        </div>
      )}
      {loading && (
        <div className="flex items-center justify-center py-20 text-gray-400">
          Chargement...
        </div>
      )}
      {!loading && !error && (activeTab === "weekly" ? <WeeklyQuality /> : <MonthlyQuality />)}
    </main>
  );
}
