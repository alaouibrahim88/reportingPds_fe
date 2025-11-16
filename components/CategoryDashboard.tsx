"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { ChartComponent, ChartConfigs } from "@/components/ui/ChartComponent";
import { CategoryData } from "@/types";

interface CategoryDashboardProps {
  category: CategoryData;
  className?: string;
}

interface DashboardKPICardProps {
  title: string;
  subtitle?: string;
  value: string;
  trend?: string;
  trendColor?: string;
  target?: string;
  lastWeeks?: string[];
  type?: "weekly" | "monthly";
  size?: "small" | "medium" | "large";
  showProgressBar?: boolean;
  showChart?: boolean;
  actionLink?: string;
}

interface ChartKPICardProps {
  title: string;
  value: string;
  trend?: string;
  trendColor?: string;
  chartData: number[];
  chartColor?: string;
  formatValue?: (value: number) => string;
  height?: number;
  actionLink?: string;
}

function ChartKPICard({
  title,
  value,
  trend,
  trendColor,
  chartData,
  chartColor = "#3B82F6",
  formatValue = (value) => value.toString(),
  height = 60,
  actionLink = "Details",
}: ChartKPICardProps) {
  const getTrendIcon = () => {
    if (!trend || !trendColor) return null;

    const isPositive = trendColor.includes("green");
    const isNegative = trendColor.includes("red");

    if (isPositive) {
      return <ArrowUp className="w-3 h-3" />;
    } else if (isNegative) {
      return <ArrowDown className="w-3 h-3" />;
    } else {
      return <Minus className="w-3 h-3" />;
    }
  };

  return (
    <Card className="bg-white border-border-color shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-5">
          <h3 className="text-white font-semibold text-base tracking-wide">
            {title}
          </h3>

          <div className="flex items-end justify-between">
            <div className="text-5xl font-bold text-white tracking-tight">
              {value}
            </div>
            {trend && (
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${trendColor} bg-opacity-10 px-2 py-1 rounded-full`}
              >
                {getTrendIcon()}
                {trend}
              </div>
            )}
          </div>

          {/* Enhanced Chart */}
          <ChartComponent
            data={chartData.map((value) => ({ value }))}
            height={height}
            formatValue={formatValue}
            {...ChartConfigs.efficiency}
            color={chartColor}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardKPICard({
  title,
  subtitle,
  value,
  trend,
  trendColor,
  target,
  lastWeeks,
  type = "weekly",
  size = "medium",
  showProgressBar = false,
  showChart = false,
  actionLink = "Details",
}: DashboardKPICardProps) {
  const getTrendIcon = () => {
    if (!trend || !trendColor) return null;

    const isPositive = trendColor.includes("green");
    const isNegative = trendColor.includes("red");

    if (isPositive) {
      return <ArrowUp className="w-3 h-3" />;
    } else if (isNegative) {
      return <ArrowDown className="w-3 h-3" />;
    } else {
      return <Minus className="w-3 h-3" />;
    }
  };

  const getProgressSegments = () => {
    // Create progress bar segments based on common dashboard patterns
    const segments = [
      { label: "Excellent", color: "bg-green-500", width: "25%" },
      { label: "Good", color: "bg-blue-500", width: "25%" },
      { label: "Warning", color: "bg-yellow-500", width: "25%" },
      { label: "Critical", color: "bg-red-500", width: "25%" },
    ];

    return segments;
  };

  const cardSizes = {
    small: "p-4",
    medium: "p-5",
    large: "p-6",
  };

  const valueSizes = {
    small: "text-2xl",
    medium: "text-3xl",
    large: "text-4xl",
  };

  return (
    <Card className="bg-white dark:bg-white border-slate-700 hover:border-slate-600 transition-all duration-300">
      <CardContent className={cardSizes[size]}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              {subtitle && (
                <p className="text-gray-300 text-xs mt-1">{subtitle}</p>
              )}
            </div>
            {actionLink && (
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300 p-0 h-auto text-xs"
              >
                {actionLink}
              </Button>
            )}
          </div>

          {/* Main Value and Trend */}
          <div className="flex items-end justify-between">
            <div className={`font-bold text-white ${valueSizes[size]}`}>
              {value}
            </div>
            {trend && (
              <div
                className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}
              >
                {getTrendIcon()}
                <span>{trend}</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {showProgressBar && (
            <div className="space-y-2">
              <div className="flex h-2 bg-slate-700 rounded-full overflow-hidden">
                {getProgressSegments().map((segment, index) => (
                  <div
                    key={index}
                    className={`${segment.color} opacity-60`}
                    style={{ width: segment.width }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-300">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              {target && <div className="text-xs text-gray-300">{target}</div>}
            </div>
          )}

          {/* Chart or Last Weeks */}
          {showChart && lastWeeks && (
            <div className="flex items-end gap-1 h-12 mt-4">
              {lastWeeks.map((_, index) => {
                const height = Math.random() * 40 + 8;
                return (
                  <div
                    key={index}
                    className="bg-blue-500 opacity-70 rounded-sm flex-1 transition-all duration-300 hover:opacity-100"
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>
          )}

          {/* Target Info */}
          {target && !showProgressBar && (
            <div className="text-xs text-gray-300 bg-gray-800/50 px-3 py-2 rounded-lg">
              {target}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryDashboard({
  category,
  className,
}: CategoryDashboardProps) {
  const getTopKPIs = (count: number) => category.kpis.slice(0, count);

  const getCategoryTitle = () => {
    const titles = {
      finance: "Finance Dashboard",
      operations: "Factory Performance Overview",
      programs: "Programs Dashboard",
      quality: "Quality & Safety Dashboard",
      rh: "HR Dashboard",
      supplychain: "Supply Chain Dashboard",
    };
    return (
      titles[category.id as keyof typeof titles] || `${category.name} Dashboard`
    );
  };

  const getCategorySubtitle = () => {
    const subtitles = {
      finance: "Monitoring key financial performance indicators",
      operations: "Key Performance Indicators for the current period",
      programs:
        "Monitoring key program performance indicators for project ramp-up",
      quality: "Key Performance Indicators for Quality and Safety",
      rh: "Human Resources performance and analytics",
      supplychain: "Monitoring key supply chain performance indicators",
    };
    return (
      subtitles[category.id as keyof typeof subtitles] ||
      `${category.name} performance indicators`
    );
  };

  // Special layout for Finance Dashboard - Enhanced UI/UX
  if (category.id === "finance") {
    return (
      <main className="flex-1 overflow-hidden">
        <div className="p-5">
          <div className="flex flex-col gap-10 min-h-[calc(100vh-200px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[500px]">
              <div className="flex flex-col gap-8 rounded-xl border border-slate-700/50 bg-slate-800/90 p-10 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h3 className="text-white text-2xl font-semibold leading-tight mb-2">
                  Revenus Hebdomadaires vs. Objectifs
                </h3>
                <div className="flex items-end gap-4 mb-2">
                  <p className="text-blue-600 tracking-tight text-4xl font-black leading-none">
                    3,2 M€
                  </p>
                  <div className="flex items-center text-green-600 mb-2">
                    <p className="text-xl font-bold ml-1">+5% vs S-1</p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg font-medium mb-4">
                  Objectif : 3,5 M€
                </p>
                <div className="h-48 relative pt-4">
                  <div className="absolute inset-0 px-2 z-10">
                    <svg
                      className="w-full h-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 286 112"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M35.75 75L107.25 45L178.75 35.2L250.25 6"
                        stroke="#EAB308"
                        strokeWidth="2"
                      ></path>
                      <circle
                        cx="35.75"
                        cy="75"
                        fill="#EAB308"
                        r="4"
                        stroke="#101922"
                        strokeWidth="2"
                      ></circle>
                      <circle
                        cx="107.25"
                        cy="45"
                        fill="#EAB308"
                        r="4"
                        stroke="#101922"
                        strokeWidth="2"
                      ></circle>
                      <circle
                        cx="178.75"
                        cy="35.2"
                        fill="#EAB308"
                        r="4"
                        stroke="#101922"
                        strokeWidth="2"
                      ></circle>
                      <circle
                        cx="250.25"
                        cy="6"
                        fill="#EAB308"
                        r="4"
                        stroke="#101922"
                        strokeWidth="2"
                      ></circle>
                    </svg>
                    <div
                      className="absolute text-amber-600 text-xs font-bold mt-2"
                      style={{
                        right: "11%",
                        top: "-34%",
                      }}
                    >
                      3,2 M€
                    </div>
                  </div>
                  <div className="absolute inset-0 grid grid-cols-4 items-end px-2">
                    <div
                      className="bg-blue-500 rounded-t-md relative mx-auto w-1/3 flex items-center justify-center"
                      style={{ height: "60%" }}
                    >
                      <div className="absolute top-1 text-white text-xs font-bold">
                        0,7 M€
                      </div>
                    </div>
                    <div
                      className="bg-blue-500  rounded-t-md relative mx-auto w-1/3 flex items-center justify-center"
                      style={{ height: "75%" }}
                    >
                      <div className="absolute top-1 text-white text-xs font-bold">
                        0,9 M€
                      </div>
                    </div>
                    <div
                      className="bg-blue-500  rounded-t-md relative mx-auto w-1/3 flex items-center justify-center "
                      style={{ height: "55%" }}
                    >
                      <div className="absolute top-1 text-white text-xs font-bold">
                        0,6 M€
                      </div>
                    </div>
                    <div
                      className="bg-blue-500  rounded-t-md relative mx-auto w-1/3 flex items-center justify-center"
                      style={{ height: "85%" }}
                    >
                      <div className="absolute top-1 text-white text-xs font-bold">
                        1,0 M€
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute"
                    style={{
                      left: "275.25px",
                      top: "-30px",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -top-16 right-[-720px] flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20">
                        <div className="w-5 h-5 rounded-full bg-yellow-400/50"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 text-center text-xs text-gray-300">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-bold">S1</span>
                    <span className="text-gray-300 text-[10px] font-medium">
                      0,7 M€
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-bold">S2</span>
                    <span className="text-gray-300 text-[10px] font-medium">
                      1,6 M€
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-bold">S3</span>
                    <span className="text-gray-300 text-[10px] font-medium">
                      2,2 M€
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-bold">S4</span>
                    <span className="text-gray-300 text-[10px] font-medium">
                      3,2 M€
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 rounded-xl border border-slate-700/50 bg-slate-800/90 p-10 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h3 className="text-white text-2xl font-semibold leading-tight mb-2">
                  Taux de Facturation &amp; Livraison
                </h3>
                <div className="flex items-end gap-4 mb-2">
                  <p className="text-blue-600 tracking-tight text-6xl font-black leading-none">
                    92%
                  </p>
                  <div className="flex items-center text-green-600 mb-2">
                    <p className="text-xl font-bold ml-1">+2% vs S-1</p>
                  </div>
                </div>
                <div className="flex-grow flex flex-col justify-center py-2">
                  <div className="h-40 w-full relative pt-4">
                    <div className="absolute inset-0 px-2 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-gray-300 text-xs">
                        <span>100%</span>
                        <hr className="w-full border-dashed border-gray-400 mx-2" />
                      </div>
                      <div className="relative flex justify-between items-center text-gray-300 text-xs">
                        <span>95%</span>
                        <hr className="w-full border-dashed border-gray-400 mx-2" />
                        <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-primary text-base">
                          tour
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-gray-300 text-xs">
                        <span>90%</span>
                        <hr className="w-full border-dashed border-gray-400 mx-2" />
                      </div>
                      <div className="flex justify-between items-center text-gray-300 text-xs">
                        <span>85%</span>
                        <hr className="w-full border-dashed border-gray-400 mx-2" />
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
                        strokeWidth="2"
                      ></path>
                      <circle
                        cx="35.75"
                        cy="96"
                        fill="#EAB308"
                        r="4"
                        stroke="#101922"
                        strokeWidth="2"
                      ></circle>
                      <circle
                        cx="107.25"
                        cy="48"
                        fill="#EAB308"
                        r="4"
                        stroke="#101922"
                        strokeWidth="2"
                      ></circle>
                      <circle
                        cx="178.75"
                        cy="64"
                        fill="#EAB308"
                        r="4"
                        stroke="#101922"
                        strokeWidth="2"
                      ></circle>
                      <circle
                        cx="250.25"
                        cy="32"
                        fill="#EAB308"
                        r="4"
                        stroke="#101922"
                        strokeWidth="2"
                      ></circle>
                      <line
                        className="stroke-current text-primary"
                        strokeDasharray="4 4"
                        strokeWidth="2"
                        x1="0"
                        x2="286"
                        y1="40"
                        y2="40"
                      ></line>
                    </svg>
                    <div className="absolute inset-0 px-2"></div>
                  </div>
                  <div className="grid grid-cols-4 text-center mt-2">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-yellow-400 text-xl">
                        88%
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-yellow-400 text-xl">
                        94%
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-yellow-400 text-xl">
                        92%
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-yellow-400 text-xl">
                        96%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-lg text-gray-300 text-right pr-2 mt-4">
                  Objectif : 95%
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[400px]">
              <div className="flex flex-col gap-6 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h3 className="text-white text-xl font-semibold leading-tight mb-2">
                  Efficacité Financière Mensuelle
                </h3>
                <div className="flex items-end gap-3 mb-2">
                  <p className="text-white tracking-tight text-4xl font-black leading-none">
                    88%
                  </p>
                  <p className="text-red-400 text-sm font-bold mb-1">
                    (-2 pts vs M-1)
                  </p>
                </div>
                <p className="text-gray-300 text-base font-medium mb-4">
                  Efficacité Globale (Objectif : 90%)
                </p>
                <div className="flex-grow flex items-center justify-around gap-4 pt-4 min-h-[144px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500">
                      <span className="text-xl font-bold text-red-400">
                        82%
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">Obj: 90%</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center border-2 border-yellow-500">
                      <span className="text-xl font-bold text-yellow-400">
                        89%
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">Obj: 90%</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500">
                      <span className="text-xl font-bold text-green-400">
                        92%
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">Obj: 90%</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500">
                      <span className="text-xl font-bold text-red-400">
                        88%
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">Obj: 90%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h3 className="text-white text-xl font-semibold leading-tight mb-2">
                  Exécution Budgétaire
                </h3>
                <div className="flex items-end gap-3 mb-2">
                  <p className="text-white tracking-tight text-4xl font-black leading-none">
                    78%
                  </p>
                  <div className="flex items-center text-green-400 mb-1">
                    <p className="text-sm font-bold ml-1">+3 pts</p>
                  </div>
                </div>
                <p className="text-gray-300 text-base font-medium mb-4">
                  Consommé vs. mois dernier
                </p>
                <div className="flex-grow flex items-center justify-center py-2">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="stroke-current text-gray-700"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeWidth="3"
                      ></path>
                      <path
                        className="stroke-current text-blue-500"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        strokeDasharray="78, 100"
                        strokeLinecap="round"
                        strokeWidth="3"
                        transform="rotate(90 18 18)"
                      ></path>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-blue-500">
                        78%
                      </span>
                      <span className="text-sm text-gray-300">Consommé</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h3 className="text-white text-xl font-semibold leading-tight mb-2">
                  Total des Paiements en Retard
                </h3>
                <div className="flex items-end gap-3 mb-2">
                  <p className="text-red-400 tracking-tight text-4xl font-black leading-none">
                    1,2 M€
                  </p>
                  <div className="flex items-center text-green-400 mb-1">
                    <span className="material-symbols-outlined text-xl">
                      check_circle
                    </span>
                    <p className="text-sm font-bold ml-1">-0,3 M€</p>
                  </div>
                </div>
                <p className="text-gray-300 text-base font-medium mb-4">
                  Amélioration vs mois dernier
                </p>
                <div className="flex-grow flex items-center justify-around gap-4 pt-4 min-h-[144px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500">
                      <span className="text-base font-bold text-red-400">
                        1,8 M€
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">Obj: 1,0 M€</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500">
                      <span className="text-base font-bold text-red-400">
                        1,5 M€
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">Obj: 1,0 M€</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center border-2 border-yellow-500">
                      <span className="text-base font-bold text-yellow-400">
                        1,2 M€
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">Obj: 1,0 M€</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500">
                      <span className="text-base font-bold text-green-400">
                        0,9 M€
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-300">Obj: 1,0 M€</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Special layout for Programs Dashboard - Enhanced to match image exactly
  if (category.id === "programs") {
    return (
      <main className="flex-1 overflow-hidden bg-slate-900">
        <div className="p-6 space-y-8">
          {/* Programs Dashboard Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Programs Department Dashboard
            </h1>
          </div>

          {/* Main Content Grid - 3 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="flex flex-col gap-1">
                <p className="text-white text-sm font-semibold leading-normal flex items-center">
                  On-Time Delivery (OTD)
                  <span className="text-amber-400 ml-2">⚠️</span>
                </p>
                <div className="flex items-baseline gap-4 mt-2 mb-2">
                  <p className="text-cyan-400 tracking-tight text-4xl font-extrabold leading-tight truncate">
                    92%
                  </p>
                  <div className="flex gap-1 items-baseline">
                    <p className="text-orange-400 text-lg font-bold leading-normal">
                      -1.5%
                    </p>
                    <p className="text-gray-300 text-sm font-medium leading-normal">
                      vs last week
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-end pt-2">
                <svg
                  className="w-full h-auto"
                  fill="none"
                  viewBox="0 0 400 130"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="group" transform="translate(40, 30)">
                    <polyline
                      className="stroke-[#40E0D0]"
                      points="0 50, 120 10, 220 70, 320 -10"
                      stroke-width="2"
                    ></polyline>
                    <polyline
                      className="stroke-[#6B7280]"
                      points="0 20, 320 20"
                      stroke-width="2"
                    ></polyline>
                    <circle
                      className="fill-[#FDB913]"
                      cx="0"
                      cy="50"
                      r="4"
                    ></circle>
                    <text
                      className="fill-[#FDB913] text-[10px] font-bold"
                      x="6"
                      y="54"
                    >
                      -1.5%
                    </text>
                    <circle
                      className="fill-[#6B7280]"
                      cx="0"
                      cy="20"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#40E0D0]"
                      cx="120"
                      cy="10"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#6B7280]"
                      cx="120"
                      cy="20"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#FDB913]"
                      cx="220"
                      cy="70"
                      r="4"
                    ></circle>
                    <text
                      className="fill-[#FDB913] text-[10px] font-bold"
                      x="226"
                      y="74"
                    >
                      -2.5%
                    </text>
                    <circle
                      className="fill-[#6B7280]"
                      cx="220"
                      cy="20"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#40E0D0]"
                      cx="320"
                      cy="-10"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#6B7280]"
                      cx="320"
                      cy="20"
                      r="4"
                    ></circle>
                  </g>
                </svg>
                <div className="flex justify-around mt-2">
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-1
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-2
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-3
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-4
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="flex flex-col gap-1">
                <p className="text-white text-sm font-semibold leading-normal">
                  Equipment Availability
                </p>
                <div className="flex items-baseline gap-4 mt-2 mb-2">
                  <p className="text-cyan-400 tracking-tight text-4xl font-extrabold leading-tight truncate">
                    99.8%
                  </p>
                  <div className="flex gap-1 items-baseline">
                    <p className="text-emerald-400 text-lg font-bold leading-normal">
                      +0.2%
                    </p>
                    <p className="text-gray-300 text-sm font-medium leading-normal">
                      vs last week
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-end pt-2">
                <svg
                  className="w-full h-auto"
                  fill="none"
                  viewBox="0 0 400 130"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="group" transform="translate(40, 30)">
                    <polyline
                      className="stroke-[#40E0D0]"
                      points="0 80, 120 70, 220 40, 320 60"
                      stroke-width="2"
                    ></polyline>
                    <polyline
                      className="stroke-[#6B7280]"
                      points="0 50, 320 50"
                      stroke-width="2"
                    ></polyline>
                    <circle
                      className="fill-[#FDB913]"
                      cx="0"
                      cy="80"
                      r="4"
                    ></circle>
                    <text
                      className="fill-[#FDB913] text-[10px] font-bold"
                      x="6"
                      y="84"
                    >
                      -0.8%
                    </text>
                    <circle
                      className="fill-[#6B7280]"
                      cx="0"
                      cy="50"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#FDB913]"
                      cx="120"
                      cy="70"
                      r="4"
                    ></circle>
                    <text
                      className="fill-[#FDB913] text-[10px] font-bold"
                      x="126"
                      y="74"
                    >
                      -0.5%
                    </text>
                    <circle
                      className="fill-[#6B7280]"
                      cx="120"
                      cy="50"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#40E0D0]"
                      cx="220"
                      cy="40"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#6B7280]"
                      cx="220"
                      cy="50"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#FDB913]"
                      cx="320"
                      cy="60"
                      r="4"
                    ></circle>
                    <text
                      className="fill-[#FDB913] text-[10px] font-bold"
                      x="288"
                      y="64"
                    >
                      -1.0%
                    </text>
                    <circle
                      className="fill-[#6B7280]"
                      cx="320"
                      cy="50"
                      r="4"
                    ></circle>
                  </g>
                </svg>
                <div className="flex justify-around mt-2">
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-1
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-2
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-3
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-4
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="flex flex-col gap-1">
                <p className="text-white text-sm font-semibold leading-normal">
                  Recruitment Progress
                </p>
                <div className="flex items-baseline gap-4 mt-2 mb-2">
                  <p className="text-cyan-400 tracking-tight text-4xl font-extrabold leading-tight truncate">
                    85%
                  </p>
                  <div className="flex gap-1 items-baseline">
                    <p className="text-emerald-400 text-lg font-bold leading-normal">
                      +5%
                    </p>
                    <p className="text-gray-300 text-sm font-medium leading-normal">
                      vs last week
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-end pt-2">
                <svg
                  className="w-full h-auto"
                  fill="none"
                  viewBox="0 0 400 130"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="group" transform="translate(40, 30)">
                    <polyline
                      className="stroke-[#40E0D0]"
                      points="0 20, 120 40, 220 60, 320 80"
                      stroke-width="2"
                    ></polyline>
                    <polyline
                      className="stroke-[#6B7280]"
                      points="0 30, 320 30"
                      stroke-width="2"
                    ></polyline>
                    <circle
                      className="fill-[#40E0D0]"
                      cx="0"
                      cy="20"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#6B7280]"
                      cx="0"
                      cy="30"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#FDB913]"
                      cx="120"
                      cy="40"
                      r="4"
                    ></circle>
                    <text
                      className="fill-[#FDB913] text-[10px] font-bold"
                      x="126"
                      y="44"
                    >
                      -2%
                    </text>
                    <circle
                      className="fill-[#6B7280]"
                      cx="120"
                      cy="30"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#FDB913]"
                      cx="220"
                      cy="60"
                      r="4"
                    ></circle>
                    <text
                      className="fill-[#FDB913] text-[10px] font-bold"
                      x="226"
                      y="64"
                    >
                      -5%
                    </text>
                    <circle
                      className="fill-[#6B7280]"
                      cx="220"
                      cy="30"
                      r="4"
                    ></circle>
                    <circle
                      className="fill-[#FDB913]"
                      cx="320"
                      cy="80"
                      r="4"
                    ></circle>
                    <text
                      className="fill-[#FDB913] text-[10px] font-bold"
                      x="294"
                      y="84"
                    >
                      -10%
                    </text>
                    <circle
                      className="fill-[#6B7280]"
                      cx="320"
                      cy="30"
                      r="4"
                    ></circle>
                  </g>
                </svg>
                <div className="flex justify-around mt-2">
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-1
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-2
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-3
                  </p>
                  <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">
                    W-4
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <p className="text-white text-sm font-semibold leading-normal">
                Budget vs. Actual (CAPEX/OPEX)
                <span className="text-green-400 ml-2">✓</span>
              </p>
              <div className="flex justify-between items-center my-4">
                <div>
                  <p className="text-gray-300 text-xs font-semibold">
                    Écart (Budget - Réalisé)
                  </p>
                  <p className="text-emerald-400 text-2xl font-extrabold">
                    +12 500 €
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-xs font-semibold">
                    Pourcentage de réalisation
                  </p>
                  <p className="text-white text-2xl font-extrabold">85%</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <svg
                  className="w-full"
                  fill="none"
                  viewBox="0 0 400 150"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    className="stroke-slate-500"
                    stroke-dasharray="4 2"
                    stroke-width="1.5"
                    x1="20"
                    x2="380"
                    y1="50"
                    y2="50"
                  ></line>
                  <text
                    className="fill-slate-400 text-[10px] font-semibold"
                    dominant-baseline="middle"
                    text-anchor="end"
                    x="15"
                    y="50"
                  >
                    Budget
                  </text>
                  <polyline
                    className="stroke-cyan-400"
                    points="40 80, 140 60, 240 100, 340 70"
                    stroke-width="2.5"
                  ></polyline>
                  <g>
                    <circle
                      className="fill-cyan-400"
                      cx="40"
                      cy="80"
                      r="5"
                    ></circle>
                    <circle
                      className="stroke-cyan-400/50"
                      cx="40"
                      cy="80"
                      r="8"
                      stroke-width="2"
                    ></circle>
                    <text
                      className="fill-slate-100 text-[10px] font-bold"
                      dominant-baseline="baseline"
                      text-anchor="middle"
                      x="40"
                      y="72"
                    >
                      €45k
                    </text>
                    <text
                      className="fill-emerald-400 text-[10px] font-medium"
                      dominant-baseline="hanging"
                      text-anchor="middle"
                      x="40"
                      y="88"
                    >
                      +€5k
                    </text>
                  </g>
                  <g>
                    <circle
                      className="fill-cyan-400"
                      cx="140"
                      cy="60"
                      r="5"
                    ></circle>
                    <circle
                      className="stroke-cyan-400/50"
                      cx="140"
                      cy="60"
                      r="8"
                      stroke-width="2"
                    ></circle>
                    <text
                      className="fill-slate-100 text-[10px] font-bold"
                      dominant-baseline="baseline"
                      text-anchor="middle"
                      x="140"
                      y="52"
                    >
                      €48k
                    </text>
                    <text
                      className="fill-emerald-400 text-[10px] font-medium"
                      dominant-baseline="hanging"
                      text-anchor="middle"
                      x="140"
                      y="68"
                    >
                      +€2k
                    </text>
                  </g>
                  <g>
                    <circle
                      className="fill-cyan-400"
                      cx="240"
                      cy="100"
                      r="5"
                    ></circle>
                    <circle
                      className="stroke-cyan-400/50"
                      cx="240"
                      cy="100"
                      r="8"
                      stroke-width="2"
                    ></circle>
                    <text
                      className="fill-slate-100 text-[10px] font-bold"
                      dominant-baseline="baseline"
                      text-anchor="middle"
                      x="240"
                      y="92"
                    >
                      €40k
                    </text>
                    <text
                      className="fill-red-400 text-[10px] font-medium"
                      dominant-baseline="hanging"
                      text-anchor="middle"
                      x="240"
                      y="108"
                    >
                      -€10k
                    </text>
                  </g>
                  <g>
                    <circle
                      className="fill-cyan-400"
                      cx="340"
                      cy="70"
                      r="5"
                    ></circle>
                    <circle
                      className="stroke-cyan-400/50"
                      cx="340"
                      cy="70"
                      r="8"
                      stroke-width="2"
                    ></circle>
                    <text
                      className="fill-slate-100 text-[10px] font-bold"
                      dominant-baseline="baseline"
                      text-anchor="middle"
                      x="340"
                      y="62"
                    >
                      €47.5k
                    </text>
                    <text
                      className="fill-emerald-400 text-[10px] font-medium"
                      dominant-baseline="hanging"
                      text-anchor="middle"
                      x="340"
                      y="78"
                    >
                      +€2.5k
                    </text>
                  </g>
                </svg>
                <div className="flex justify-around text-xs text-gray-300 font-semibold mt-2">
                  <p>Poste 1</p>
                  <p>Poste 2</p>
                  <p>Poste 3</p>
                  <p>Poste 4</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/30">
                  <p className="text-white text-xs font-bold mb-2">CAPEX</p>
                  <div className="relative h-2 w-full rounded-full bg-slate-600">
                    <div className="absolute top-0 left-0 h-2 w-[75%] rounded-full bg-cyan-400"></div>
                  </div>
                  <div className="flex justify-between items-baseline mt-1">
                    <p className="text-white text-sm font-bold">75%</p>
                    <p className="text-emerald-400 text-xs font-medium">
                      +5k €
                    </p>
                  </div>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/30">
                  <p className="text-white text-xs font-bold mb-2">OPEX</p>
                  <div className="relative h-2 w-full rounded-full bg-slate-600">
                    <div className="absolute top-0 left-0 h-2 w-[110%] rounded-full bg-red-400"></div>
                  </div>
                  <div className="flex justify-between items-baseline mt-1">
                    <p className="text-white text-sm font-bold">110%</p>
                    <p className="text-red-400 text-xs font-medium">-2.5k €</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="flex flex-col gap-1">
                <p className="text-white text-sm font-semibold leading-normal">
                  Planning Progress (APQP)
                </p>
                <div className="flex justify-between items-end mt-2 mb-2">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">
                      Avancement total
                    </p>
                    <p className="text-cyan-400 tracking-tight text-3xl font-extrabold leading-tight">
                      85%
                    </p>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-blue-300/30"></div>
                      <span>Prévision</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                      <span>Réel</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center space-y-2 pt-4">
                <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                  <p className="text-xs text-gray-300 font-semibold truncate">
                    Jalon 1
                  </p>
                  <div className="relative h-3">
                    <div className="absolute h-full w-[100%] bg-blue-300/30 rounded-full"></div>
                    <div className="absolute h-full w-[100%] bg-emerald-500 rounded-full"></div>
                  </div>
                  <p className="text-xs text-white font-bold w-10 text-right">
                    100%
                  </p>
                </div>
                <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                  <p className="text-xs text-gray-300 font-semibold truncate">
                    Jalon 2
                  </p>
                  <div className="relative h-3">
                    <div className="absolute h-full w-[100%] bg-blue-300/30 rounded-full"></div>
                    <div className="absolute h-full w-[100%] bg-emerald-500 rounded-full"></div>
                  </div>
                  <p className="text-xs text-white font-bold w-10 text-right">
                    100%
                  </p>
                </div>
                <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                  <p className="text-xs text-gray-300 font-semibold truncate">
                    Jalon 3
                  </p>
                  <div className="relative h-3">
                    <div className="absolute h-full w-[90%] bg-blue-300/30 rounded-full"></div>
                    <div className="absolute h-full w-[80%] bg-orange-400 rounded-full"></div>
                  </div>
                  <p className="text-xs text-white font-bold w-10 text-right">
                    80%
                  </p>
                </div>
                <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                  <p className="text-xs text-gray-300 font-semibold truncate">
                    Jalon 4
                  </p>
                  <div className="relative h-3">
                    <div className="absolute h-full w-[70%] bg-blue-300/30 rounded-full"></div>
                    <div className="absolute h-full w-[45%] bg-red-400 rounded-full"></div>
                  </div>
                  <p className="text-xs text-white font-bold w-10 text-right">
                    45%
                  </p>
                </div>
                <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                  <p className="text-xs text-gray-300 font-semibold truncate">
                    Jalon 5
                  </p>
                  <div className="relative h-3">
                    <div className="absolute h-full w-[50%] bg-blue-300/30 rounded-full"></div>
                    <div className="absolute h-full w-[0%] bg-red-400 rounded-full"></div>
                  </div>
                  <p className="text-xs text-white font-bold w-10 text-right">
                    0%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <p className="text-white text-sm font-semibold leading-normal">
                Statut de la Documentation Projet
                <span className="text-emerald-400 ml-2">✓</span>
              </p>
              <div className="flex flex-col flex-1">
                <div className="flex-none pt-4 pb-2">
                  <svg
                    className="w-full h-auto"
                    fill="none"
                    viewBox="0 0 400 60"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g transform="translate(40, 0)">
                      <polyline
                        className="stroke-[#4A5568]"
                        points="0 10, 320 10"
                        stroke-dasharray="2 2"
                        stroke-width="1.5"
                      ></polyline>
                      <polyline
                        className="stroke-[#40E0D0]"
                        points="0 5, 120 20, 220 30, 320 40"
                        stroke-width="2"
                      ></polyline>
                      <circle
                        className="fill-[#40E0D0]"
                        cx="0"
                        cy="5"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-[#FDB913]"
                        cx="120"
                        cy="20"
                        r="3"
                      ></circle>
                      <text
                        className="fill-[#FDB913] text-[10px] font-bold"
                        x="125"
                        y="24"
                      >
                        -5%
                      </text>
                      <circle
                        className="fill-[#FDB913]"
                        cx="220"
                        cy="30"
                        r="3"
                      ></circle>
                      <text
                        className="fill-[#FDB913] text-[10px] font-bold"
                        x="225"
                        y="34"
                      >
                        -8%
                      </text>
                      <circle
                        className="fill-[#FDB913]"
                        cx="320"
                        cy="40"
                        r="3"
                      ></circle>
                      <text
                        className="fill-[#FDB913] text-[10px] font-bold"
                        x="295"
                        y="44"
                      >
                        -12%
                      </text>
                    </g>
                  </svg>
                  <div className="flex justify-around -mt-1">
                    <p className="text-gray-300 text-[10px] font-semibold leading-normal tracking-[0.015em]">
                      M-1
                    </p>
                    <p className="text-gray-300 text-[10px] font-semibold leading-normal tracking-[0.015em]">
                      M-2
                    </p>
                    <p className="text-gray-300 text-[10px] font-semibold leading-normal tracking-[0.015em]">
                      M-3
                    </p>
                    <p className="text-gray-300 text-[10px] font-semibold leading-normal tracking-[0.015em]">
                      M-4
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 w-full pt-4">
                  <div className="relative w-36 h-36">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="stroke-current text-slate-600"
                        cx="18"
                        cy="18"
                        fill="none"
                        r="15.91549430918954"
                        stroke-width="2"
                      ></circle>
                      <circle
                        className="stroke-current text-emerald-400 -rotate-90 origin-center"
                        cx="18"
                        cy="18"
                        fill="none"
                        r="15.91549430918954"
                        stroke-dasharray="95, 100"
                        stroke-linecap="round"
                        stroke-width="2"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-emerald-400 text-3xl font-extrabold tracking-tight">
                        95%
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col items-center">
                    <div className="flex items-baseline gap-1">
                      <p className="text-emerald-400 text-base font-bold leading-normal">
                        +2%
                      </p>
                      <p className="text-gray-300 text-sm font-medium leading-normal">
                        vs Mois Précédent
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Special layout for Operations Dashboard - Factory Performance Overview
  if (category.id === "operations") {
    return (
      <main className="flex-1 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-start gap-4 sm:gap-6">
            <div className="rounded-lg bg-slate-800/90 border border-slate-700/50 px-4 py-2 text-sm font-medium text-gray-300">
              <span className="font-normal">Semaine actuelle :</span>
              <span className="font-semibold text-white ml-1">S10</span>
            </div>
            <div className="rounded-lg bg-slate-800/90 border border-slate-700/50 px-4 py-2 text-sm font-medium text-gray-300">
              <span className="font-normal">Mois en cours :</span>
              <span className="font-semibold text-white ml-1">M12</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr] mb-5">
            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-fit">
              <div className="overflow-hidden rounded-lg bg-slate-800/90 border border-slate-700/50 p-6 h-64 flex flex-col shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 ">
                <h2 className="mb-2 text-lg font-semibold text-gray-300">
                  Taux d&apos;heures supplémentaires
                </h2>
                <div className="flex items-end gap-4">
                  <p className="text-4xl font-bold text-white">2.5%</p>
                  <div className="flex items-center text-xs text-green-500">
                    <p>-0.3% vs semaine précédente</p>
                  </div>
                </div>
                <div className="mt-auto flex-1 min-h-0 flex items-end pb-2">
                  <div className="relative h-16 w-full">
                    <svg
                      className="absolute bottom-0 left-0 h-12 w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      strokeWidth="2"
                      viewBox="0 0 200 80"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="gradient1"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.2"
                          ></stop>
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <path
                        className="stroke-dashed stroke-gray-500"
                        d="M 0 40 L 200 40"
                        strokeDasharray="4 4"
                      ></path>
                      <path
                        className="stroke-blue-500"
                        d="M 0 20 L 66 60 L 132 30 L 200 50"
                      ></path>
                      <path
                        d="M 0 20 L 66 60 L 132 30 L 200 50 L 200 80 L 0 80 Z"
                        fill="url(#gradient1)"
                      ></path>
                      <circle
                        className="fill-blue-500"
                        cx="0"
                        cy="20"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="66"
                        cy="60"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="132"
                        cy="30"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="200"
                        cy="50"
                        r="3"
                      ></circle>
                    </svg>
                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-gray-300">
                      <span>S1</span>
                      <span>S2</span>
                      <span>S3</span>
                      <span>S4</span>
                    </div>
                    <div className="absolute -top-1.5 left-0 text-xs text-gray-300">
                      Target
                    </div>
                    <div className="absolute inset-x-0 top-0 h-[calc(100%-1.5rem)]">
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "0%",
                          top: "20%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        2.2%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "33%",
                          top: "60%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        2.8%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "66%",
                          top: "30%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        2.3%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "100%",
                          top: "50%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        2.5%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-slate-800/90 border border-slate-700/50 p-6 h-64 flex flex-col shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 ">
                <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
                  Taux de chômage technique
                  <span className="text-2xl text-yellow-400">⚠️</span>
                </h2>
                <div className="flex items-center gap-4">
                  <p className="flex items-center text-4xl font-bold text-red-500">
                    1.68%
                  </p>
                  <div className="flex items-center text-xs text-red-500">
                    <p>+0.2% vs semaine précédente</p>
                  </div>
                </div>
                <div className="mt-auto flex-1 min-h-0 flex items-end pb-2">
                  <div className="relative h-16 w-full">
                    <svg
                      className="absolute bottom-0 left-0 h-12 w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      strokeWidth="2"
                      viewBox="0 0 200 80"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="gradient2"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.2"
                          ></stop>
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <path
                        className="stroke-dashed stroke-gray-500"
                        d="M 0 40 L 200 40"
                        strokeDasharray="4 4"
                      ></path>
                      <path
                        className="stroke-blue-500"
                        d="M 0 60 L 66 20 L 132 50 L 200 30"
                      ></path>
                      <path
                        d="M 0 60 L 66 20 L 132 50 L 200 30 L 200 80 L 0 80 Z"
                        fill="url(#gradient2)"
                      ></path>
                      <circle
                        className="fill-blue-500"
                        cx="0"
                        cy="60"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="66"
                        cy="20"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="132"
                        cy="50"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="200"
                        cy="30"
                        r="3"
                      ></circle>
                    </svg>
                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-gray-300">
                      <span>S1</span>
                      <span>S2</span>
                      <span>S3</span>
                      <span>S4</span>
                    </div>
                    <div className="absolute -top-1.5 left-0 text-xs text-gray-300">
                      Target
                    </div>
                    <div className="absolute inset-x-0 top-0 h-[calc(100%-1.5rem)]">
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "0%",
                          top: "60%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        1.75%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "33%",
                          top: "20%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        1.48%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "66%",
                          top: "50%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        1.62%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "100%",
                          top: "30%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        1.68%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-slate-800/90 border border-slate-700/50 p-6 h-64 flex flex-col shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 ">
                <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
                  Taux de scrap{" "}
                  <span className="text-2xl text-yellow-400">⚠️</span>
                </h2>
                <div className="flex items-center gap-4">
                  <p className="flex items-center text-4xl font-bold text-red-500">
                    1.12%
                  </p>
                  <div className="flex items-center text-xs text-red-500">
                    <p>+0.15% vs semaine précédente</p>
                  </div>
                </div>
                <div className="mt-auto flex-1 min-h-0 flex items-end pb-2">
                  <div className="relative h-16 w-full">
                    <svg
                      className="absolute bottom-0 left-0 h-12 w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      strokeWidth="2"
                      viewBox="0 0 200 80"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="gradient3"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.2"
                          ></stop>
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <path
                        className="stroke-dashed stroke-gray-500"
                        d="M 0 50 L 200 50"
                        strokeDasharray="4 4"
                      ></path>
                      <path
                        className="stroke-blue-500"
                        d="M 0 70 L 66 40 L 132 60 L 200 20"
                      ></path>
                      <path
                        d="M 0 70 L 66 40 L 132 60 L 200 20 L 200 80 L 0 80 Z"
                        fill="url(#gradient3)"
                      ></path>
                      <circle
                        className="fill-blue-500"
                        cx="0"
                        cy="70"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="66"
                        cy="40"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="132"
                        cy="60"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="200"
                        cy="20"
                        r="3"
                      ></circle>
                    </svg>
                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-gray-300">
                      <span>S1</span>
                      <span>S2</span>
                      <span>S3</span>
                      <span>S4</span>
                    </div>
                    <div className="absolute -top-1.5 left-0 text-xs text-gray-300">
                      Target
                    </div>
                    <div className="absolute inset-x-0 top-0 h-[calc(100%-1.5rem)]">
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "0%",
                          top: "70%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        1.25%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "33%",
                          top: "40%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        0.97%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "66%",
                          top: "60%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        1.15%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "100%",
                          top: "20%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        1.12%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg bg-slate-800/90 border border-slate-700/50 p-6 h-64 flex flex-col shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 ">
                <h2 className="mb-2 text-lg font-semibold text-gray-300">
                  Suivi de l&apos;efficience
                </h2>
                <div className="flex items-end gap-4">
                  <p className="text-4xl font-bold text-white">90%</p>
                  <div className="flex items-center text-xs text-green-500">
                    <p>+2% vs semaine précédente</p>
                  </div>
                </div>
                <div className="mt-auto flex-1 min-h-0 flex items-end pb-2">
                  <div className="relative h-16 w-full">
                    <svg
                      className="absolute bottom-0 left-0 h-12 w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      strokeWidth="2"
                      viewBox="0 0 200 80"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="gradient4"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.2"
                          ></stop>
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <path
                        className="stroke-dashed stroke-gray-500"
                        d="M 0 25 L 200 25"
                        strokeDasharray="4 4"
                      ></path>
                      <path
                        className="stroke-blue-500"
                        d="M 0 30 L 66 20 L 132 50 L 200 40"
                      ></path>
                      <path
                        d="M 0 30 L 66 20 L 132 50 L 200 40 L 200 80 L 0 80 Z"
                        fill="url(#gradient4)"
                      ></path>
                      <circle
                        className="fill-blue-500"
                        cx="0"
                        cy="30"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="66"
                        cy="20"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="132"
                        cy="50"
                        r="3"
                      ></circle>
                      <circle
                        className="fill-blue-500"
                        cx="200"
                        cy="40"
                        r="3"
                      ></circle>
                    </svg>
                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-gray-300">
                      <span>S1</span>
                      <span>S2</span>
                      <span>S3</span>
                      <span>S4</span>
                    </div>
                    <div className="absolute -top-1.5 left-0 text-xs text-gray-300">
                      Target
                    </div>
                    <div className="absolute inset-x-0 top-0 h-[calc(100%-1.5rem)]">
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "0%",
                          top: "30%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        88%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "33%",
                          top: "20%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        92%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "66%",
                          top: "50%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        89%
                      </div>
                      <div
                        className="absolute text-xs font-bold text-white"
                        style={{
                          left: "100%",
                          top: "40%",
                          transform: "translate(-50%, -120%)",
                        }}
                      >
                        90%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 border border-slate-700/50 p-6 min-h-[200px] shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h2 className="mb-2 text-lg font-semibold text-gray-300">
                  Écart de production
                </h2>
                <div className="flex items-end gap-4">
                  <p className="text-4xl font-bold text-white">-85</p>
                  <div className="flex items-center text-xs text-green-500">
                    <p>+23 vs mois précédent</p>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-4 gap-4 pt-6">
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="mb-1 text-xs text-gray-300">Target: 0</p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                      <p className="text-sm font-bold text-yellow-500">-180</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Jan</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="mb-1 text-xs text-gray-300">Target: 0</p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-sm font-bold text-green-500">-20</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Fév</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="mb-1 text-xs text-gray-300">Target: 0</p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-transparent">
                      <p className="text-sm font-bold text-red-500">-200</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Mar</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="mb-1 text-xs text-gray-300">Target: 0</p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-sm font-bold text-green-500">50</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Avr</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 border border-slate-700/50 p-6 min-h-[200px] shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <h2 className="mb-2 text-lg font-semibold text-gray-300">
                  Scrap valuation indicator
                </h2>
                <div className="flex items-end gap-4">
                  <p className="text-4xl font-bold text-white">€1.1k</p>
                  <div className="flex items-center text-xs text-green-500">
                    <p>-€0.1k vs mois précédent</p>
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-4 gap-4 pt-6">
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="mb-1 text-xs text-gray-300">
                      Target: &lt;€1k
                    </p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-sm font-bold text-green-500">€0.8k</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Jan</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="mb-1 text-xs text-gray-300">
                      Target: &lt;€1.1k
                    </p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-transparent">
                      <p className="text-sm font-bold text-red-500">€1.2k</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Fév</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="mb-1 text-xs text-gray-300">
                      Target: &lt;€1.5k
                    </p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-sm font-bold text-green-500">€1.4k</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Mar</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-center">
                    <p className="mb-1 text-xs text-gray-300">
                      Target: &lt;€1.3k
                    </p>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                      <p className="text-sm font-bold text-yellow-500">€1.4k</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">Avr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 border border-slate-700/50 p-6 min-h-[200px] shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <h2 className="mb-2 text-lg font-semibold text-gray-300">
                Suivi de l&apos;efficience mensuelle
              </h2>
              <div className="flex items-end gap-4">
                <p className="text-4xl font-bold text-white">91%</p>
                <div className="flex items-center text-xs text-green-500">
                  <p>+1% vs mois précédent</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <p className="mb-1 text-xs text-gray-300">Target: &gt;90%</p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                    <p className="text-sm font-bold text-green-500">93%</p>
                  </div>
                  <p className="text-sm font-medium text-gray-300">Jan</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <p className="mb-1 text-xs text-gray-300">Target: &gt;90%</p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                    <p className="text-sm font-bold text-green-500">94%</p>
                  </div>
                  <p className="text-sm font-medium text-gray-300">Fév</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <p className="mb-1 text-xs text-gray-300">
                    Target: &lt;€1.1k
                  </p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-transparent">
                    <p className="text-sm font-bold text-red-500">€1.2k</p>
                  </div>
                  <p className="text-sm font-medium text-gray-300">Fév</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <p className="mb-1 text-xs text-gray-300">Target: &gt;88%</p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                    <p className="text-sm font-bold text-green-500">89%</p>
                  </div>
                  <p className="text-sm font-medium text-gray-300">Mar</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <p className="mb-1 text-xs text-gray-300">Target: &gt;91%</p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                    <p className="text-sm font-bold text-green-500">92%</p>
                  </div>
                  <p className="text-sm font-medium text-gray-300">Avr</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <p className="mb-1 text-xs text-gray-300">Target: 0</p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                    <p className="text-sm font-bold text-yellow-500">-180</p>
                  </div>
                  <p className="text-sm font-medium text-gray-300">Jan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (category.id === "quality") {
    return (
      <main className="flex-1 overflow-hidden bg-slate-900 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-6 h-full">
          {/* Réclamations Clients */}
          <div className="flex flex-col gap-6 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex-1 flex flex-col">
              <p className="text-white text-lg font-semibold leading-normal">
                Réclamations Clients
              </p>
              <div className="flex items-baseline gap-4 mt-2">
                <p className="text-cyan-400 tracking-light text-5xl font-bold leading-tight truncate">
                  12
                </p>
                <div className="flex flex-col">
                  <span className="inline-block rounded-full bg-red-500/10 px-2 py-0.5 text-base font-medium text-red-400">
                    +2
                  </span>
                  <span className="text-gray-300 text-xs">vs Sem. Préc.</span>
                </div>
              </div>
              <div className="flex gap-1 items-center mt-1">
                <p className="text-gray-300 text-sm font-normal leading-normal">
                  vs Target (8)
                </p>
                <p className="text-red-500 text-sm font-medium leading-normal flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  <span>+50%</span>
                </p>
              </div>
              <div className="flex flex-1 flex-col justify-center pt-4">
                <div className="h-[120px] relative">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 140"
                  >
                    <g>
                      <path
                        d="M50 83.3333 L 150 46.6667 L 250 105 L 350 70"
                        stroke="#2563eb"
                        strokeWidth="4"
                      />
                      <circle
                        cx="50"
                        cy="83.3333"
                        fill="#2563eb"
                        r="8"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        fill="#f8fafc"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="50"
                        y="75.3333"
                      >
                        10
                      </text>
                      <circle
                        cx="150"
                        cy="46.6667"
                        fill="#2563eb"
                        r="8"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        fill="#f8fafc"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="150"
                        y="38.6667"
                      >
                        15
                      </text>
                      <circle
                        cx="250"
                        cy="105"
                        fill="#2563eb"
                        r="8"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        fill="#f8fafc"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="250"
                        y="97"
                      >
                        8
                      </text>
                      <circle
                        cx="350"
                        cy="70"
                        fill="#2563eb"
                        r="8"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        fill="#f8fafc"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="350"
                        y="62"
                      >
                        12
                      </text>
                    </g>
                  </svg>
                </div>
                <div className="flex justify-around pt-2">
                  <p className="text-gray-300 text-xs font-bold leading-normal tracking-[0.015em]">
                    S-4
                  </p>
                  <p className="text-gray-300 text-xs font-bold leading-normal tracking-[0.015em]">
                    S-3
                  </p>
                  <p className="text-gray-300 text-xs font-bold leading-normal tracking-[0.015em]">
                    S-2
                  </p>
                  <p className="text-gray-300 text-xs font-bold leading-normal tracking-[0.015em]">
                    S-1
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Suivi de l'Efficience */}
          <div className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex-1 flex flex-col">
              <p className="text-white text-lg font-semibold leading-normal">
                Suivi de l&apos;Efficience
              </p>
              <div className="flex items-baseline gap-4 mt-2">
                <p className="text-cyan-400 tracking-light text-5xl font-bold leading-tight truncate">
                  92%
                </p>
                <div className="flex flex-col">
                  <span className="inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-base font-medium text-emerald-400">
                    -5%
                  </span>
                  <span className="text-gray-300 text-xs">vs Sem. Préc.</span>
                </div>
              </div>
              <div className="flex gap-1 items-center mt-1">
                <p className="text-gray-300 text-sm font-normal leading-normal">
                  vs Target (90%)
                </p>
                <p className="text-green-500 text-sm font-medium leading-normal flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  <span>+1.5%</span>
                </p>
              </div>
              <div className="flex flex-1 flex-col justify-center pt-4">
                <div className="h-[120px] relative">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 140"
                  >
                    <g>
                      <path
                        d="M50 112 L 150 42 L 250 84 L 350 28"
                        stroke="#2563eb"
                        strokeWidth="4"
                      />
                      <circle
                        cx="50"
                        cy="112"
                        fill="#2563eb"
                        r="8"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        fill="#f8fafc"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="50"
                        y="104"
                      >
                        88%
                      </text>
                      <circle
                        cx="150"
                        cy="42"
                        fill="#2563eb"
                        r="8"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        fill="#f8fafc"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="150"
                        y="34"
                      >
                        95%
                      </text>
                      <circle
                        cx="250"
                        cy="84"
                        fill="#2563eb"
                        r="8"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        fill="#f8fafc"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="250"
                        y="76"
                      >
                        90%
                      </text>
                      <circle
                        cx="350"
                        cy="28"
                        fill="#2563eb"
                        r="8"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        fill="#f8fafc"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                        x="350"
                        y="20"
                      >
                        97%
                      </text>
                    </g>
                  </svg>
                </div>
                <div className="flex justify-around pt-2">
                  <p className="text-gray-300 text-xs font-bold leading-normal tracking-[0.015em]">
                    S-4
                  </p>
                  <p className="text-gray-300 text-xs font-bold leading-normal tracking-[0.015em]">
                    S-3
                  </p>
                  <p className="text-gray-300 text-xs font-bold leading-normal tracking-[0.015em]">
                    S-2
                  </p>
                  <p className="text-gray-300 text-xs font-bold leading-normal tracking-[0.015em]">
                    S-1
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PPM & Scrap Client */}
          <div className="flex flex-col gap-6 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex-1 flex flex-col">
              <p className="text-white text-lg font-semibold leading-normal">
                PPM & Scrap Client
              </p>
              <div className="flex items-baseline gap-4 mt-2">
                <p className="text-cyan-400 tracking-light text-5xl font-bold leading-tight truncate">
                  2,345€
                </p>
                <div className="flex flex-col">
                  <span className="inline-block rounded-full bg-red-500/10 px-2 py-0.5 text-base font-medium text-red-400">
                    +250€
                  </span>
                  <span className="text-gray-300 text-xs">vs Mois Préc.</span>
                </div>
              </div>
              <div className="flex gap-1 items-center mt-1">
                <p className="text-gray-300 text-sm font-normal leading-normal">
                  Scrap Client
                </p>
                <p className="text-red-500 text-sm font-medium leading-normal flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  <span>+12% vs M-1</span>
                </p>
              </div>
              <div className="flex flex-1 flex-col justify-center pt-4">
                <div className="relative h-[120px] w-full">
                  <div className="grid h-full grid-cols-4 items-end gap-x-4 px-2">
                    <div className="flex h-full flex-col items-center justify-end">
                      <p className="text-sm font-semibold text-white">65</p>
                      <div
                        className="mt-1 w-full rounded-t-sm bg-blue-500"
                        style={{ height: "65%" }}
                      />
                    </div>
                    <div className="flex h-full flex-col items-center justify-end">
                      <p className="text-sm font-semibold text-white">52</p>
                      <div
                        className="mt-1 w-full rounded-t-sm bg-blue-500"
                        style={{ height: "52%" }}
                      />
                    </div>
                    <div className="flex h-full flex-col items-center justify-end">
                      <p className="text-sm font-semibold text-white">48</p>
                      <div
                        className="mt-1 w-full rounded-t-sm bg-blue-500"
                        style={{ height: "48%" }}
                      />
                    </div>
                    <div className="flex h-full flex-col items-center justify-end">
                      <p className="text-sm font-semibold text-white">45</p>
                      <div
                        className="mt-1 w-full rounded-t-sm bg-blue-500"
                        style={{ height: "45%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-around">
                  <p className="text-xs font-bold text-gray-300">M-4</p>
                  <p className="text-xs font-bold text-gray-300">M-3</p>
                  <p className="text-xs font-bold text-gray-300">M-2</p>
                  <p className="text-xs font-bold text-gray-300">M-1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Taux de Conformité aux Audits */}
          <div className="flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex-1 flex flex-col">
              <p className="text-white text-lg font-semibold leading-normal">
                Taux de Conformité aux Audits
              </p>
              <div className="flex-1 grid grid-cols-2 gap-4 items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-28 h-28" viewBox="0 0 120 120">
                    <circle
                      className="stroke-slate-600"
                      cx="60"
                      cy="60"
                      fill="transparent"
                      r="54"
                      strokeWidth="12"
                    />
                    <circle
                      className="stroke-emerald-400"
                      cx="60"
                      cy="60"
                      fill="transparent"
                      r="54"
                      strokeDasharray="339.29"
                      strokeDashoffset="33.929"
                      strokeLinecap="round"
                      strokeWidth="12"
                      transform="rotate(-90 60 60)"
                    />
                    <text
                      className="fill-gray-100 text-lg font-bold"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      x="50%"
                      y="50%"
                    >
                      90%
                    </text>
                  </svg>
                  <p className="text-gray-300 text-center text-sm">
                    Completion
                  </p>
                  <div className="flex flex-col text-center mt-1">
                    <span className="inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-base font-medium text-emerald-400">
                      +5%
                    </span>
                    <span className="text-gray-300 text-xs">
                      vs Mois Préc.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <svg className="w-28 h-28" viewBox="0 0 120 120">
                    <circle
                      className="stroke-slate-600"
                      cx="60"
                      cy="60"
                      fill="transparent"
                      r="54"
                      strokeWidth="12"
                    />
                    <circle
                      className="stroke-orange-400"
                      cx="60"
                      cy="60"
                      fill="transparent"
                      r="54"
                      strokeDasharray="339.29"
                      strokeDashoffset="50.89"
                      strokeLinecap="round"
                      strokeWidth="12"
                      transform="rotate(-90 60 60)"
                    />
                    <text
                      className="fill-gray-100 text-lg font-bold"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      x="50%"
                      y="50%"
                    >
                      85%
                    </text>
                  </svg>
                  <p className="text-gray-300 text-center text-sm">
                    Compliance
                  </p>
                  <div className="flex flex-col text-center mt-1">
                    <span className="inline-block rounded-full bg-red-500/10 px-2 py-0.5 text-base font-medium text-red-400">
                      -2%
                    </span>
                    <span className="text-gray-300 text-xs">
                      vs Mois Préc.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Incidents / Accidents de Travail */}
          <div className="lg:col-span-2 row-start-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex-1 flex flex-col">
              <p className="text-white text-lg font-semibold leading-normal">
                Incidents / Accidents de Travail
              </p>
              <div className="flex items-baseline gap-4 mt-2">
                <p className="text-cyan-400 tracking-light text-5xl font-bold leading-tight truncate">
                  1
                </p>
                <div className="flex flex-col">
                  <span className="inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-base font-medium text-emerald-400">
                    -4
                  </span>
                  <span className="text-gray-300 text-xs">vs Mois Préc.</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-around pt-2">
                <div className="mb-2">
                  <div className="relative h-20 w-full mb-1">
                    <div className="grid h-full grid-cols-4 items-end gap-x-6 px-4">
                      <div
                        className="relative flex h-full items-center justify-center rounded-t-sm bg-blue-200"
                        style={{ height: "60%" }}
                      >
                        <span className="text-sm font-semibold text-white">
                          6
                        </span>
                      </div>
                      <div
                        className="relative flex h-full items-center justify-center rounded-t-sm bg-blue-200"
                        style={{ height: "50%" }}
                      >
                        <span className="text-sm font-semibold text-white">
                          5
                        </span>
                      </div>
                      <div
                        className="relative flex h-full items-center justify-center rounded-t-sm bg-blue-200"
                        style={{ height: "20%" }}
                      >
                        <span className="text-sm font-semibold text-white">
                          2
                        </span>
                      </div>
                      <div
                        className="relative flex h-full items-center justify-center rounded-t-sm bg-blue-200"
                        style={{ height: "10%" }}
                      >
                        <span className="text-sm font-semibold text-white">
                          1
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <p className="text-xs font-bold text-gray-300">Jan</p>
                    <p className="text-xs font-bold text-gray-300">Fév</p>
                    <p className="text-xs font-bold text-gray-300">Mar</p>
                    <p className="text-xs font-bold text-gray-300">Avr</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300 mb-2">
                    Jours Perdus
                  </p>
                  <div className="h-20 w-full relative mb-1">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 400 100"
                    >
                      <g>
                        <path
                          d="M50 40 L 150 20 L 250 80 L 350 50"
                          stroke="#f59e0b"
                          strokeWidth="3"
                        />
                        <circle
                          cx="50"
                          cy="40"
                          fill="#f59e0b"
                          r="5"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          fill="#f8fafc"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          x="50"
                          y="32"
                        >
                          12
                        </text>
                        <circle
                          cx="150"
                          cy="20"
                          fill="#f59e0b"
                          r="5"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          fill="#f8fafc"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          x="150"
                          y="12"
                        >
                          15
                        </text>
                        <circle
                          cx="250"
                          cy="80"
                          fill="#f59e0b"
                          r="5"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          fill="#f8fafc"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          x="250"
                          y="72"
                        >
                          8
                        </text>
                        <circle
                          cx="350"
                          cy="50"
                          fill="#f59e0b"
                          r="5"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          fill="#f8fafc"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          x="350"
                          y="42"
                        >
                          5
                        </text>
                      </g>
                    </svg>
                  </div>
                  <div className="flex justify-around border-t border-border-color pt-2">
                    <p className="text-xs font-bold text-gray-300">Jan</p>
                    <p className="text-xs font-bold text-gray-300">Fév</p>
                    <p className="text-xs font-bold text-gray-300">Mar</p>
                    <p className="text-xs font-bold text-gray-300">Avr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score Cards Clients */}
          <div className="lg:col-span-2 row-start-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="flex-1 flex flex-col">
              <p className="text-white text-lg font-semibold leading-normal">
                Score Cards Clients
              </p>
              <div className="flex items-baseline gap-4 mt-2">
                <p className="text-cyan-400 tracking-light text-5xl font-bold leading-tight truncate">
                  84.2%
                </p>
                <div className="flex flex-col">
                  <span className="inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-base font-medium text-emerald-400">
                    +1.2%
                  </span>
                  <span className="text-gray-300 text-xs">vs Mois Préc.</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center space-y-3 pt-2">
                <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
                  <span className="text-gray-300 text-sm font-medium truncate">
                    Client Alpha
                  </span>
                  <div className="w-full bg-slate-600 rounded-full h-2.5 relative">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: "95%" }}
                    />
                  </div>
                  <span className="text-white font-semibold text-sm">95%</span>
                </div>
                <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
                  <span className="text-gray-300 text-sm font-medium truncate">
                    Client Beta
                  </span>
                  <div className="w-full bg-slate-600 rounded-full h-2.5 relative">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: "82%" }}
                    />
                  </div>
                  <span className="text-white font-semibold text-sm">82%</span>
                </div>
                <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
                  <span className="text-gray-300 text-sm font-medium truncate">
                    Client Gamma
                  </span>
                  <div className="w-full bg-slate-600 rounded-full h-2.5 relative">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: "88%" }}
                    />
                  </div>
                  <span className="text-white font-semibold text-sm">88%</span>
                </div>
                <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
                  <span className="text-gray-300 text-sm font-medium truncate">
                    Client Delta
                  </span>
                  <div className="w-full bg-slate-600 rounded-full h-2.5 relative">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: "91%" }}
                    />
                  </div>
                  <span className="text-white font-semibold text-sm">91%</span>
                </div>
                <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
                  <span className="text-gray-300 text-sm font-medium truncate">
                    Client Epsilon
                  </span>
                  <div className="w-full bg-slate-600 rounded-full h-2.5 relative">
                    <div
                      className="bg-red-500 h-2.5 rounded-full"
                      style={{ width: "65%" }}
                    />
                  </div>
                  <span className="text-red-400 font-semibold text-sm">
                    65%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (category.id === "supplychain") {
    return (
      <div className="flex min-h-screen w-screen flex-col bg-slate-900 text-white">
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 p-6 overflow-y-auto">
            <div className="flex w-full flex-col gap-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl font-black tracking-tighter text-white">
                    Supply Chain Performance Dashboard
                  </h1>
                  <p className="text-lg font-normal text-gray-200">
                    Semaine actuelle: 20-26 May | Mois en cours: Mai
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-full bg-emerald-600/20 px-6">
                    <span className="material-symbols-outlined text-emerald-400 text-xl">
                      check_circle
                    </span>
                    <p className="text-base font-medium text-emerald-400">
                      Stable
                    </p>
                  </div>
                  <p className="text-base text-gray-200">
                    Last updated: 27 May, 08:00 AM
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    Weekly KPIs
                  </h2>
                  <div className="flex flex-col gap-6 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                    <div className="flex items-start justify-between">
                      <p className="text-lg font-medium text-white">
                        Taux de Service Client / OTIF
                      </p>
                      <span className="material-symbols-outlined text-slate-400">
                        trending_up
                      </span>
                    </div>
                    <div className="flex flex-wrap items-end gap-4">
                      <p className="text-6xl font-extrabold tracking-tighter text-white">
                        96%
                      </p>
                      <div className="flex items-center gap-1 pb-2">
                        <span className="material-symbols-outlined text-sm text-emerald-400">
                          arrow_upward
                        </span>
                        <p className="text-2xl font-extrabold text-emerald-400">
                          +1.0%
                        </p>
                        <p className="text-lg font-normal text-gray-200">
                          vs last week
                        </p>
                      </div>
                    </div>
                    <div className="relative h-[150px] w-full pt-4">
                      <div
                        className="target-line"
                        style={{ bottom: "95%" }}
                      ></div>
                      <svg
                        className="h-full w-full"
                        preserveAspectRatio="none"
                        viewBox="0 0 400 100"
                      >
                        <defs>
                          <linearGradient
                            id="line-chart-gradient"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stop-color="#2c5282"
                              stop-opacity="0.2"
                            ></stop>
                            <stop
                              offset="100%"
                              stop-color="#2c5282"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 50 L 100 30 L 200 40 L 300 20 L 400 30"
                          fill="url(#line-chart-gradient)"
                          stroke="#2c5282"
                          stroke-width="3"
                        ></path>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-between">
                        <div
                          className="flex flex-col items-center gap-2"
                          style={{
                            bottom: "50%",
                            left: "0%",
                            transform: "translate(0, 50%)",
                            position: "absolute",
                          }}
                        >
                          <span className="text-4xl font-extrabold text-white">
                            95%
                          </span>
                          <div className="h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-800"></div>
                          <p className="text-base font-bold text-gray-200">
                            W1
                          </p>
                        </div>
                        <div
                          className="flex flex-col items-center gap-2"
                          style={{
                            bottom: "70%",
                            left: "25%",
                            transform: "translate(-50%, 50%)",
                            position: "absolute",
                          }}
                        >
                          <span className="text-4xl font-extrabold text-white">
                            97%
                          </span>
                          <div className="h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-800"></div>
                          <p className="text-base font-bold text-gray-200">
                            W2
                          </p>
                        </div>
                        <div
                          className="flex flex-col items-center gap-2"
                          style={{
                            bottom: "60%",
                            left: "50%",
                            transform: "translate(-50%, 50%)",
                            position: "absolute",
                          }}
                        >
                          <span className="text-4xl font-extrabold text-white">
                            96%
                          </span>
                          <div className="h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-800"></div>
                          <p className="text-base font-bold text-gray-200">
                            W3
                          </p>
                        </div>
                        <div
                          className="flex flex-col items-center gap-2"
                          style={{
                            bottom: "80%",
                            left: "75%",
                            transform: "translate(-50%, 50%)",
                            position: "absolute",
                          }}
                        >
                          <span className="text-4xl font-extrabold text-white">
                            98%
                          </span>
                          <div className="h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-800"></div>
                          <p className="text-base font-bold text-gray-200">
                            W4
                          </p>
                        </div>
                        <div
                          className="flex flex-col items-center gap-2"
                          style={{
                            bottom: "70%",
                            left: "100%",
                            transform: "translate(-100%, 50%)",
                            position: "absolute",
                          }}
                        >
                          <span className="text-4xl font-extrabold text-white">
                            97%
                          </span>
                          <div className="h-4 w-4 rounded-full border-2 border-blue-400 bg-slate-800"></div>
                          <p className="text-base font-bold text-gray-200">
                            W5
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-px w-full bg-slate-700"></div>
                    <div className="flex items-center gap-6">
                      <p className="text-lg font-medium text-white">
                        Fiabilité Client
                      </p>
                      <div className="relative flex h-24 w-24 items-center justify-center">
                        <svg
                          className="h-full w-full -rotate-90 transform"
                          viewBox="0 0 36 36"
                        >
                          <circle
                            className="stroke-current text-slate-700"
                            cx="18"
                            cy="18"
                            fill="none"
                            r="16"
                            stroke-width="3"
                          ></circle>
                          <circle
                            className="stroke-current text-emerald-400"
                            cx="18"
                            cy="18"
                            fill="none"
                            r="16"
                            stroke-dasharray="100"
                            stroke-dashoffset="8"
                            stroke-width="3"
                          ></circle>
                        </svg>
                        <p className="absolute text-xl font-bold text-white">
                          92%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                    <div className="flex items-start justify-between">
                      <p className="text-lg font-medium text-white">
                        Taux de Service Fournisseurs OTIF
                      </p>
                      <span className="material-symbols-outlined text-slate-400">
                        local_shipping
                      </span>
                    </div>
                    <div className="flex flex-wrap items-end gap-4">
                      <p className="text-5xl font-extrabold tracking-tighter text-white">
                        96%
                      </p>
                      <div className="flex items-center gap-1 pb-1">
                        <p className="text-2xl font-extrabold text-red-400">
                          -0.5%
                        </p>
                        <p className="text-lg font-normal text-gray-200">
                          vs last week
                        </p>
                      </div>
                    </div>
                    <div className="flex h-[150px] w-full flex-col items-center justify-center pt-4">
                      <div className="flex w-full items-start justify-around">
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-sm font-semibold text-blue-400">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            <span className="text-2xl font-bold">94%</span>
                          </div>
                          <p className="mt-2 text-base font-medium text-gray-200">
                            W1
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-sm font-semibold text-blue-400">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <span className="text-2xl font-bold">95%</span>
                          </div>
                          <p className="mt-2 text-base font-medium text-gray-200">
                            W2
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-sm font-semibold text-blue-400">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                            <span className="text-2xl font-bold">93%</span>
                          </div>
                          <p className="mt-2 text-base font-medium text-gray-200">
                            W3
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-sm font-semibold text-blue-400">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <span className="text-2xl font-bold">97%</span>
                          </div>
                          <p className="mt-2 text-base font-medium text-gray-200">
                            W4
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-sm font-semibold text-blue-400">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            <span className="text-2xl font-bold">96%</span>
                          </div>
                          <p className="mt-2 text-base font-medium text-gray-200">
                            W5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    Monthly KPIs
                  </h2>
                  <div className="flex flex-col gap-6 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                    <div className="flex items-start justify-between">
                      <p className="text-lg font-medium text-white">
                        Rotation des Stocks
                      </p>
                      <span className="material-symbols-outlined text-slate-400">
                        inventory
                      </span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <p className="text-6xl font-extrabold tracking-tighter text-white">
                        22 <span className="text-4xl font-bold">jours</span>
                      </p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-medium text-gray-200">
                          Target:
                        </p>
                        <p className="text-3xl font-bold text-emerald-400">
                          20 jours
                        </p>
                      </div>
                    </div>
                    <div className="relative h-[100px] w-full pt-4">
                      <div
                        className="absolute inset-x-0 w-full border-t-2 border-green-800"
                        style={{ bottom: "70%" }}
                      ></div>
                      <div className="grid h-full grid-cols-6 items-end gap-x-6">
                        <div className="relative h-full w-full">
                          <div
                            className="absolute inset-x-0 bottom-0 flex items-center justify-center rounded-t-sm bg-blue-500/70"
                            style={{ height: "80%" }}
                          >
                            <span className="text-lg font-bold text-white">
                              24
                            </span>
                          </div>
                        </div>
                        <div className="relative h-full w-full">
                          <div
                            className="absolute inset-x-0 bottom-0 flex items-center justify-center rounded-t-sm bg-emerald-500/70"
                            style={{ height: "70%" }}
                          >
                            <span className="text-lg font-bold text-white">
                              21
                            </span>
                          </div>
                        </div>
                        <div className="relative h-full w-full">
                          <div
                            className="absolute inset-x-0 bottom-0 flex items-center justify-center rounded-t-sm bg-yellow-500"
                            style={{ height: "85%" }}
                          >
                            <span className="text-gray-900 text-xl font-extrabold">
                              25
                            </span>
                          </div>
                        </div>
                        <div className="relative h-full w-full">
                          <div
                            className="absolute inset-x-0 bottom-0 flex items-center justify-center rounded-t-sm bg-blue-500/70"
                            style={{ height: "75%" }}
                          >
                            <span className="text-lg font-bold text-white">
                              22
                            </span>
                          </div>
                        </div>
                        <div className="relative h-full w-full">
                          <div
                            className="absolute inset-x-0 bottom-0 flex items-center justify-center rounded-t-sm bg-yellow-500"
                            style={{ height: "90%" }}
                          >
                            <span className="text-gray-900 text-xl font-extrabold">
                              26
                            </span>
                          </div>
                        </div>
                        <div className="relative h-full w-full">
                          <div
                            className="absolute inset-x-0 bottom-0 flex items-center justify-center rounded-t-sm bg-red-500"
                            style={{ height: "95%" }}
                          >
                            <span className="text-white text-xl font-extrabold">
                              28
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 text-center">
                      <p className="text-sm font-medium text-gray-200">Déc</p>
                      <p className="text-sm font-medium text-gray-200">Jan</p>
                      <p className="text-sm font-medium text-gray-200">Fév</p>
                      <p className="text-sm font-medium text-gray-200">Mar</p>
                      <p className="text-sm font-medium text-gray-200">Avr</p>
                      <p className="text-sm font-bold text-white">Mai</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                    <p className="text-lg font-medium text-white">
                      Taux de Fiabilité des Stocks
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-[100px_1fr_60px] items-center gap-3">
                        <p className="text-base font-medium text-gray-200">
                          Warehouse A
                        </p>
                        <div className="w-full rounded-full bg-slate-700">
                          <div
                            className="h-3 rounded-full bg-emerald-400"
                            style={{ width: "98%" }}
                          ></div>
                        </div>
                        <p className="text-base font-bold text-white">98%</p>
                      </div>
                      <div className="grid grid-cols-[100px_1fr_60px] items-center gap-3">
                        <p className="text-base font-medium text-gray-200">
                          Warehouse B
                        </p>
                        <div className="w-full rounded-full bg-slate-700">
                          <div
                            className="h-3 rounded-full bg-emerald-400"
                            style={{ width: "96%" }}
                          ></div>
                        </div>
                        <p className="text-base font-bold text-white">96%</p>
                      </div>
                      <div className="grid grid-cols-[100px_1fr_60px] items-center gap-3">
                        <p className="text-base font-medium text-gray-200">
                          Warehouse C
                        </p>
                        <div className="w-full rounded-full bg-slate-700">
                          <div
                            className="h-3 rounded-full bg-yellow-400"
                            style={{ width: "93%" }}
                          ></div>
                        </div>
                        <p className="text-base font-bold text-white">93%</p>
                      </div>
                      <div className="grid grid-cols-[100px_1fr_60px] items-center gap-3">
                        <p className="text-base font-medium text-gray-200">
                          Warehouse D
                        </p>
                        <div className="w-full rounded-full bg-slate-700">
                          <div
                            className="h-3 rounded-full bg-red-400"
                            style={{ width: "88%" }}
                          ></div>
                        </div>
                        <p className="text-base font-bold text-white">88%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur p-6">
                    <p className="text-lg font-medium text-white">
                      Coût Logistique Total
                    </p>
                    <div className="flex flex-wrap items-end gap-4">
                      <p className="text-5xl font-extrabold tracking-tighter text-white">
                        €1.2M
                      </p>
                      <div className="flex items-center gap-1 pb-1">
                        <p className="text-2xl font-extrabold text-emerald-400">
                          -5%
                        </p>
                        <p className="text-lg font-normal text-gray-200">
                          vs last month
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="relative w-full flex-grow pt-4">
                        <div className="grid h-[120px] grid-cols-3 items-end gap-4">
                          <div className="relative flex h-full items-end justify-center gap-1">
                            <div
                              className="relative w-1/2 rounded-t bg-blue-500"
                              style={{ height: "60%" }}
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-white">
                                240k
                              </div>
                            </div>
                            <div
                              className="relative w-1/2 rounded-t bg-orange-500"
                              style={{ height: "40%" }}
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-white">
                                160k
                              </div>
                            </div>
                          </div>
                          <div className="relative flex h-full items-end justify-center gap-1">
                            <div
                              className="relative w-1/2 rounded-t bg-blue-500"
                              style={{ height: "75%" }}
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-white">
                                300k
                              </div>
                            </div>
                            <div
                              className="relative w-1/2 rounded-t bg-orange-500"
                              style={{ height: "50%" }}
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-white">
                                200k
                              </div>
                            </div>
                          </div>
                          <div className="relative flex h-full items-end justify-center gap-1">
                            <div
                              className="relative w-1/2 rounded-t bg-blue-500"
                              style={{ height: "70%" }}
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-white">
                                280k
                              </div>
                            </div>
                            <div
                              className="relative w-1/2 rounded-t bg-orange-500"
                              style={{ height: "45%" }}
                            >
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-white">
                                180k
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-3 text-center">
                          <p className="text-sm font-bold text-gray-200">
                            Mar
                          </p>
                          <p className="text-sm font-bold text-gray-200">
                            Apr
                          </p>
                          <p className="text-sm font-bold text-white">May</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-sm bg-blue-500"></div>
                          <p className="text-base font-medium text-gray-200">
                            Freight IN
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-sm bg-orange-500"></div>
                          <p className="text-base font-medium text-gray-200">
                            Freight OUT
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (category.id === "rh") {
    return (
      <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-black pb-10">
        <header className="mb-6 flex items-center justify-end px-8 pt-4">
          <p className="text-base text-gray-200 font-medium">
            Dernière mise à jour : il y a 2 minutes
          </p>
        </header>
        <main className="grid flex-1 grid-cols-3 grid-rows-2 gap-4 px-6">
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Taux de Départ (Mensuel)
              </h2>
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="h-3 w-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
                <span className="font-medium">Cible Atteinte</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col mt-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-4">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-blue-400 tracking-tight">
                      3.4%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-yellow-400 flex items-center gap-2 text-2xl">
                      <span>+1.2%</span>
                      <span className="text-yellow-400 text-3xl">⚠️</span>
                    </span>
                    <span className="text-sm text-gray-200 mt-2 font-medium">
                      vs Mois Précédent
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative h-48 flex-1">
                <div className="absolute inset-0 grid grid-cols-6 gap-3 items-end px-3">
                  <div className="flex justify-center items-end gap-0.5 h-full">
                    <div
                      className="w-full bg-blue-500"
                      style={{ height: "60%" }}
                    ></div>
                    <div
                      className="w-full bg-green-500"
                      style={{ height: "70%" }}
                    ></div>
                    <div
                      className="w-full bg-yellow-500"
                      style={{ height: "55%" }}
                    ></div>
                  </div>
                  <div className="flex justify-center items-end gap-0.5 h-full">
                    <div
                      className="w-full bg-blue-500"
                      style={{ height: "40%" }}
                    ></div>
                    <div
                      className="w-full bg-green-500"
                      style={{ height: "55%" }}
                    ></div>
                    <div
                      className="w-full bg-yellow-500"
                      style={{ height: "35%" }}
                    ></div>
                  </div>
                  <div className="flex justify-center items-end gap-0.5 h-full">
                    <div
                      className="w-full bg-blue-500"
                      style={{ height: "50%" }}
                    ></div>
                    <div
                      className="w-full bg-green-500"
                      style={{ height: "60%" }}
                    ></div>
                    <div
                      className="w-full bg-yellow-500"
                      style={{ height: "45%" }}
                    ></div>
                  </div>
                  <div className="flex justify-center items-end gap-0.5 h-full">
                    <div
                      className="w-full bg-blue-500"
                      style={{ height: "75%" }}
                    ></div>
                    <div
                      className="w-full bg-green-500"
                      style={{ height: "65%" }}
                    ></div>
                    <div
                      className="w-full bg-yellow-500"
                      style={{ height: "80%" }}
                    ></div>
                  </div>
                  <div className="flex justify-center items-end gap-0.5 h-full">
                    <div
                      className="w-full bg-blue-500"
                      style={{ height: "65%" }}
                    ></div>
                    <div
                      className="w-full bg-green-500"
                      style={{ height: "75%" }}
                    ></div>
                    <div
                      className="w-full bg-yellow-500"
                      style={{ height: "60%" }}
                    ></div>
                  </div>
                  <div className="flex justify-center items-end gap-0.5 h-full">
                    <div
                      className="w-full bg-blue-500"
                      style={{ height: "50%" }}
                    ></div>
                    <div
                      className="w-full bg-green-500"
                      style={{ height: "60%" }}
                    ></div>
                    <div
                      className="w-full bg-yellow-500"
                      style={{ height: "45%" }}
                    ></div>
                  </div>
                </div>
                <svg
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 200"
                >
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="400"
                    y1="50"
                    y2="50"
                  ></line>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="400"
                    y1="100"
                    y2="100"
                  ></line>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="400"
                    y1="150"
                    y2="150"
                  ></line>
                  <line
                    stroke="#DC3545"
                    stroke-dasharray="4 4"
                    stroke-width="1.5"
                    x1="0"
                    x2="400"
                    y1="80"
                    y2="80"
                  ></line>
                  <text
                    fill="#DC3545"
                    font-family="Manrope"
                    font-size="10"
                    x="365"
                    y="75"
                  >
                    Cible
                  </text>
                </svg>
              </div>
              <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
                <span>Jan</span>
                <span>Fév</span>
                <span>Mar</span>
                <span>Avr</span>
                <span>Mai</span>
                <span>Juin</span>
              </div>
              <div className="mt-6 flex justify-center gap-8 text-sm text-white">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-blue-500 shadow-md"></span>
                  <span className="font-medium">Global</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-green-500 shadow-md"></span>
                  <span className="font-medium">Managers</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-yellow-500 shadow-md"></span>
                  <span className="font-medium">Employés</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm p-6 flex flex-col h-[450px]">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Taux de Remplissage du Transport
              </h2>
            </div>
            <div className="flex-1 flex flex-col mt-4">
              <div className="mb-4">
                <div className="flex items-baseline gap-3">
                  <div className="flex flex-col">
                    <span className="text-5xl font-bold text-white">92%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-white flex items-center gap-1 text-3xl">
                      <span>+3%</span>
                    </span>
                    <span className="text-sm text-gray-200 mt-1">
                      vs Mois Précédent
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative h-48 flex-1">
                <svg
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 200"
                >
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="400"
                    y1="40"
                  ></line>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="400"
                    y1="80"
                  ></line>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="400"
                    y1="120"
                  ></line>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="400"
                    y1="160"
                  ></line>
                  <line
                    stroke="#DC3545"
                    stroke-dasharray="4 4"
                    stroke-width="1.5"
                    x1="0"
                    x2="400"
                    y1="60"
                  ></line>
                  <polyline
                    fill="none"
                    points="50,110 150,90 250,100 350,50"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></polyline>
                  <circle
                    cx="50"
                    cy="110"
                    fill="#1E1E1E"
                    r="4"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="150"
                    cy="90"
                    fill="#1E1E1E"
                    r="4"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="250"
                    cy="100"
                    fill="#1E1E1E"
                    r="4"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="350"
                    cy="50"
                    fill="#1E1E1E"
                    r="4"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <g
                    className="text-xl font-bold"
                    fill="#f1f5f9"
                    text-anchor="middle"
                  >
                    <text x="50" y="102">
                      85%
                    </text>
                    <text x="150" y="82">
                      89%
                    </text>
                    <text x="250" y="92">
                      87%
                    </text>
                    <text x="350" y="42">
                      92%
                    </text>
                  </g>
                </svg>
              </div>
              <div className="mt-2 flex justify-around text-xs text-gray-200">
                <span>M-4</span>
                <span>M-3</span>
                <span>M-2</span>
                <span>M-1</span>
              </div>
              <div className="mt-4 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-4 bg-neutral-blue"></span>
                  <span className="text-sm text-gray-200 font-medium">Actuel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-4 border-b border-dashed border-danger"></span>
                  <span className="text-sm text-gray-200 font-medium">Cible (90%)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Effectif Global et Coûts
            </h2>
            <div className="mt-6 mb-6">
              <div className="flex items-baseline gap-6">
                <div className="flex flex-col items-start">
                  <span className="text-4xl font-black text-white tracking-tight">
                    1,242
                  </span>
                </div>
                <div className="self-end pb-3">
                  <p className="text-sm text-gray-200 mb-2 font-medium">
                    Coûts Actuels
                  </p>
                  <span className="text-2xl font-bold text-yellow-400">
                    € 3.2M
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute h-full w-full flex items-end">
                <svg
                  className="w-full h-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 200"
                >
                  <g className="text-[10px] text-gray-200 fill-current">
                    <text x="375" y="195">
                      2.6M
                    </text>
                    <text x="375" y="145">
                      2.8M
                    </text>
                    <text x="375" y="95">
                      3.0M
                    </text>
                    <text x="375" y="45">
                      3.2M
                    </text>
                  </g>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="370"
                    y1="45"
                    y2="45"
                  ></line>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="370"
                    y1="95"
                    y2="95"
                  ></line>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="370"
                    y1="145"
                    y2="145"
                  ></line>
                  <line
                    stroke="#FFFFFF"
                    stroke-dasharray="2 2"
                    stroke-opacity="0.1"
                    x1="0"
                    x2="370"
                    y1="195"
                    y2="195"
                  ></line>
                  <polyline
                    fill="none"
                    points="40,120 120,100 200,110 280,80 360,40"
                    stroke="#FFC107"
                    stroke-width="2"
                  ></polyline>
                  <circle
                    cx="40"
                    cy="120"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#FFC107"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="120"
                    cy="100"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#FFC107"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="200"
                    cy="110"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#FFC107"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="280"
                    cy="80"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#FFC107"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="360"
                    cy="40"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#FFC107"
                    stroke-width="2"
                  ></circle>
                  <g
                    className="text-yellow-400 text-base font-bold fill-current"
                    text-anchor="middle"
                  >
                    <text x="40" y="112">
                      2.85M
                    </text>
                    <text x="120" y="92">
                      2.95M
                    </text>
                    <text x="200" y="102">
                      2.90M
                    </text>
                    <text x="280" y="72">
                      3.05M
                    </text>
                    <text x="360" y="32">
                      3.20M
                    </text>
                  </g>
                  <polyline
                    fill="none"
                    points="40,180 120,175 200,170 280,160 360,150"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></polyline>
                  <circle
                    cx="40"
                    cy="180"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="120"
                    cy="175"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="200"
                    cy="170"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="280"
                    cy="160"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <circle
                    cx="360"
                    cy="150"
                    fill="#1E1E1E"
                    r="3"
                    stroke="#4A90E2"
                    stroke-width="2"
                  ></circle>
                  <g
                    className="text-blue-400 text-base font-bold fill-current"
                    text-anchor="middle"
                  >
                    <text x="40" y="198">
                      1180
                    </text>
                    <text x="120" y="193">
                      1195
                    </text>
                    <text x="200" y="188">
                      1210
                    </text>
                    <text x="280" y="178">
                      1235
                    </text>
                    <text x="360" y="142">
                      1242
                    </text>
                  </g>
                </svg>
              </div>
            </div>
            <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
              <span>Jan</span>
              <span>Fév</span>
              <span>Mar</span>
              <span>Avr</span>
              <span>Mai</span>
            </div>
            <div className="mt-6 flex justify-center gap-8 text-sm text-white">
              <div className="flex items-center gap-3">
                <span className="h-1 w-6 bg-blue-500 rounded shadow-md"></span>
                <span className="font-medium">Effectif</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1 w-6 bg-yellow-500 rounded shadow-md"></span>
                <span className="font-medium">Coûts</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Délai Moyen de Recrutement
            </h2>
            <div className="mt-6 mb-6">
              <p className="text-sm text-gray-300 font-medium mb-3">
                Délai Moyen Global
              </p>
              <div className="flex items-baseline gap-4">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-red-400">
                    32 jours
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-red-400 flex items-center gap-2 text-2xl">
                    <span>+2j</span>
                  </span>
                  <span className="text-sm text-gray-200 mt-2 font-medium">
                    vs Mois Précédent
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute h-full w-full">
                <div className="h-1/2 border-b border-dashed border-white/30"></div>
                <span className="absolute top-1/2 -mt-2.5 right-0 text-xs text-white/50">
                  Cible: 30j
                </span>
              </div>
              <div className="h-full grid grid-cols-5 gap-6 px-4 items-end">
                <div className="flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-white/90 mb-1">
                    28j
                  </span>
                  <div className="h-[45%] w-full bg-green-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-white/90 mb-1">
                    45j
                  </span>
                  <div className="h-[65%] w-full bg-red-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-white/90 mb-1">
                    26j
                  </span>
                  <div className="h-[40%] w-full bg-green-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-white/90 mb-1">
                    38j
                  </span>
                  <div className="h-[55%] w-full bg-red-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-white/90 mb-1">
                    22j
                  </span>
                  <div className="h-[35%] w-full bg-green-500"></div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
              <span>Ventes</span>
              <span>Marketing</span>
              <span>IT</span>
              <span>Opérations</span>
              <span>RH</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-4 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Taux d’absentéisme Hebdo
              </h2>
              <div className="flex items-center gap-2 text-sm text-danger">
                <span className="h-2 w-2 rounded-full bg-red-400 text-white"></span>
                <span className="text-sm text-gray-200 font-medium">Cible Dépassée</span>
              </div>
            </div>
            <div className="mt-4 mb-4">
              <div className="flex items-baseline gap-3">
                <div className="flex flex-col">
                  <span className="text-5xl font-bold text-white">4.8%</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-red-400 flex items-center gap-1 text-3xl">
                    <span>-1.7%</span>
                  </span>
                  <span className="text-sm text-gray-200 mt-1">
                    vs Semaine Précédente
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <svg
                className="absolute inset-0 h-full w-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 400 200"
              >
                <line
                  stroke="#FFFFFF"
                  stroke-dasharray="2 2"
                  stroke-opacity="0.1"
                  x1="0"
                  x2="400"
                  y1="50"
                  y2="50"
                ></line>
                <line
                  stroke="#FFFFFF"
                  stroke-dasharray="2 2"
                  stroke-opacity="0.1"
                  x1="0"
                  x2="400"
                  y1="100"
                  y2="100"
                ></line>
                <line
                  stroke="#FFFFFF"
                  stroke-dasharray="2 2"
                  stroke-opacity="0.1"
                  x1="0"
                  x2="400"
                  y1="150"
                  y2="150"
                ></line>
                <line
                  stroke="#DC3545"
                  stroke-dasharray="4 4"
                  stroke-width="1.5"
                  x1="0"
                  x2="400"
                  y1="100"
                  y2="100"
                ></line>
                <text
                  fill="#DC3545"
                  font-family="Manrope"
                  font-size="10"
                  x="365"
                  y="95"
                >
                  Cible
                </text>
                <path
                  d="M20 180 C 80 160, 100 120, 160 110 S 240 80, 260 70"
                  fill="none"
                  stroke="#4A90E2"
                  stroke-linecap="round"
                  stroke-width="2.5"
                ></path>
                <path
                  d="M260 70 S 320 50, 380 90"
                  fill="none"
                  stroke="#DC3545"
                  stroke-linecap="round"
                  stroke-width="2.5"
                ></path>
                <circle
                  cx="20"
                  cy="180"
                  fill="#1E1E1E"
                  r="3"
                  stroke="#4A90E2"
                  stroke-width="2"
                ></circle>
                <text
                  fill="#4A90E2"
                  font-family="Manrope"
                  font-size="14"
                  font-weight="800"
                  text-anchor="middle"
                  x="20"
                  y="170"
                >
                  2.1%
                </text>
                <circle
                  cx="90"
                  cy="135"
                  fill="#1E1E1E"
                  r="3"
                  stroke="#4A90E2"
                  stroke-width="2"
                ></circle>
                <text
                  fill="#4A90E2"
                  font-family="Manrope"
                  font-size="14"
                  font-weight="800"
                  text-anchor="middle"
                  x="90"
                  y="125"
                >
                  3.2%
                </text>
                <circle
                  cx="160"
                  cy="110"
                  fill="#1E1E1E"
                  r="3"
                  stroke="#4A90E2"
                  stroke-width="2"
                ></circle>
                <text
                  fill="#4A90E2"
                  font-family="Manrope"
                  font-size="14"
                  font-weight="800"
                  text-anchor="middle"
                  x="160"
                  y="100"
                >
                  4.1%
                </text>
                <circle
                  cx="260"
                  cy="70"
                  fill="#1E1E1E"
                  r="3"
                  stroke="#DC3545"
                  stroke-width="2"
                ></circle>
                <text
                  fill="#DC3545"
                  font-family="Manrope"
                  font-size="14"
                  font-weight="800"
                  text-anchor="middle"
                  x="260"
                  y="60"
                >
                  5.8%
                </text>
                <circle
                  cx="320"
                  cy="50"
                  fill="#1E1E1E"
                  r="3"
                  stroke="#DC3545"
                  stroke-width="2"
                ></circle>
                <text
                  fill="#DC3545"
                  font-family="Manrope"
                  font-size="14"
                  font-weight="800"
                  text-anchor="middle"
                  x="320"
                  y="40"
                >
                  6.5%
                </text>
                <circle
                  cx="380"
                  cy="90"
                  fill="#1E1E1E"
                  r="3"
                  stroke="#DC3545"
                  stroke-width="2"
                ></circle>
                <text
                  fill="#DC3545"
                  font-family="Manrope"
                  font-size="14"
                  font-weight="800"
                  text-anchor="middle"
                  x="380"
                  y="80"
                >
                  4.8%
                </text>
              </svg>
            </div>
            <div className="mt-2 flex justify-around text-xs text-gray-200">
              <span>S-23</span>
              <span>S-24</span>
              <span>S-25</span>
              <span>S-26</span>
              <span>S-27</span>
              <span>S-28</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Indice de Climat Social
            </h2>
            <div className="flex-1 mt-6 relative">
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 bg-green-500/20"></div>
                <div className="flex-1 bg-yellow-500/20"></div>
                <div className="flex-1 bg-red-500/20"></div>
              </div>
              <div className="absolute inset-0 grid grid-cols-6 gap-6 px-4 items-end">
                <div className="h-[10%] w-full bg-white/50 relative">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-white/80">
                    2
                  </span>
                </div>
                <div className="h-[5%] w-full bg-white/50 relative">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-white/80">
                    1
                  </span>
                </div>
                <div className="h-[15%] w-full bg-white/50 relative">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-white/80">
                    3
                  </span>
                </div>
                <div className="h-[25%] w-full bg-white/50 relative">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-white/80">
                    5
                  </span>
                </div>
                <div className="h-[40%] w-full bg-white/50 relative">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-white/80">
                    8
                  </span>
                </div>
                <div className="h-[30%] w-full bg-white/50 relative">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-white/80">
                    6
                  </span>
                </div>
              </div>
              <svg
                className="absolute inset-0 h-full w-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 400 200"
              >
                <path
                  d="M33 40 C 100 60, 166 50, 233 90 S 300 120, 367 150"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-linecap="round"
                  stroke-width="2.5"
                ></path>
                <g
                  className="text-xs font-semibold"
                  fill="#f1f5f9"
                  text-anchor="middle"
                >
                  <text x="33" y="32">
                    8.2
                  </text>
                  <text x="100" y="52">
                    7.8
                  </text>
                  <text x="166" y="42">
                    8.0
                  </text>
                  <text x="233" y="82">
                    6.5
                  </text>
                  <text x="300" y="112">
                    5.5
                  </text>
                  <text x="367" y="142">
                    4.0
                  </text>
                </g>
              </svg>
            </div>
            <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
              <span>Jan</span>
              <span>Fév</span>
              <span>Mar</span>
              <span>Avr</span>
              <span>Mai</span>
              <span>Juin</span>
            </div>
            <div className="mt-6 flex justify-center gap-8 text-sm text-white">
              <div className="flex items-center gap-3">
                <span className="h-3 w-6 bg-white/60 rounded shadow-md"></span>
                <span className="font-medium">Incidents</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-1 w-5 bg-white rounded shadow-md"></span>
                <span className="font-medium">Indice Satisfaction</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-50 ${className}`}>
      <div className="p-6 space-y-6">
        {/* Dashboard Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-300">{getCategorySubtitle()}</p>
        </div>

        {/* Weekly KPIs Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Weekly KPIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getTopKPIs(4).map((kpi, index) => (
              <DashboardKPICard
                key={`weekly-${index}`}
                title={kpi.title}
                subtitle="Weekly tracking"
                value={kpi.value}
                trend={kpi.trend}
                trendColor={kpi.trendColor}
                target={kpi.target}
                lastWeeks={kpi.lastWeeks}
                type="weekly"
                size="medium"
                showProgressBar={true}
                actionLink="Details"
              />
            ))}
          </div>
        </div>

        {/* Monthly KPIs Section */}
        {category.kpis.length > 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Monthly KPIs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTopKPIs(6)
                .slice(4)
                .map((kpi, index) => (
                  <DashboardKPICard
                    key={`monthly-${index}`}
                    title={kpi.title}
                    subtitle="Monthly performance"
                    value={kpi.value}
                    trend={kpi.trend}
                    trendColor={kpi.trendColor}
                    target={kpi.target}
                    lastWeeks={kpi.lastWeeks}
                    type="monthly"
                    size="large"
                    showChart={true}
                    actionLink="Action Plan"
                  />
                ))}
            </div>
          </div>
        )}

        {/* Additional KPIs Grid */}
        {category.kpis.length > 6 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">
              Additional Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.kpis.slice(6).map((kpi, index) => (
                <DashboardKPICard
                  key={`additional-${index}`}
                  title={kpi.title}
                  value={kpi.value}
                  trend={kpi.trend}
                  trendColor={kpi.trendColor}
                  target={kpi.target}
                  lastWeeks={kpi.lastWeeks}
                  type="weekly"
                  size="small"
                  actionLink="View"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
