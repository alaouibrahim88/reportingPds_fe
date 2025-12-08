"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { CategoryData } from "@/types";
import { TabSelector } from "./ui/TabSelector";

type TabType = "weekly" | "monthly";

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
    <Card className="bg-white dark:bg-white border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 cursor-pointer">
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
  const [activeTab, setActiveTab] = useState<TabType>("monthly");
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
    // Monthly KPI Dashboard Content (from mensuel.html)
    const MonthlyDashboard = () => (
      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Tableau de bord des KPI Mensuels
          </h1>
          <p className="text-gray-400 text-base font-normal leading-normal">
            Vue en direct des indicateurs de performance clés mensuels.
          </p>
        </div>
        <div className="flex flex-col flex-grow gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 md:pl-8">
                  <p className="text-white text-base font-medium leading-normal">
                    Efficience financière
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
                      88%
                    </p>
                    <p className="text-red-500 text-base font-medium">
                      (-2 pts vs M-1)
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Efficacité Globale (Objectif : 90%)
                  </p>
                  <div className="flex justify-start items-center mt-4 space-x-3">
                    <div className="flex items-center justify-center bg-blue-500/20 text-blue-300 w-14 h-14 rounded-full border-2 border-blue-400">
                      <span className="font-bold text-lg">82</span>
                    </div>
                    <div className="flex items-center justify-center bg-green-500/20 text-green-300 w-14 h-14 rounded-full border-2 border-green-400">
                      <span className="font-bold text-lg">89</span>
                    </div>
                    <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-300 w-14 h-14 rounded-full border-2 border-yellow-400">
                      <span className="font-bold text-lg">92</span>
                    </div>
                    <div className="flex items-center justify-center bg-red-500/20 text-red-300 w-14 h-14 rounded-full border-2 border-red-400">
                      <span className="font-bold text-lg">88</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto md:flex-1">
                  <div className="h-36">
                    <svg
                      className="w-full h-full"
                      fill="none"
                      viewBox="0 0 320 144"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        className="stroke-current text-gray-600"
                        strokeDasharray="4 4"
                        x1="0"
                        x2="320"
                        y1="28"
                        y2="28"
                      />
                      <text
                        className="fill-current text-gray-500 text-xs"
                        x="290"
                        y="24"
                      >
                        Target
                      </text>
                      <polyline
                        className="stroke-current text-yellow-400"
                        fill="none"
                        points="40,88 120,40 200,60 280,88"
                        strokeWidth="2"
                      />
                      <circle
                        className="fill-current text-yellow-400"
                        cx="40"
                        cy="88"
                        r="4"
                      />
                      <circle
                        className="fill-current text-yellow-400"
                        cx="120"
                        cy="40"
                        r="4"
                      />
                      <circle
                        className="fill-current text-yellow-400"
                        cx="200"
                        cy="60"
                        r="4"
                      />
                      <circle
                        className="fill-current text-yellow-400"
                        cx="280"
                        cy="88"
                        r="4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 md:pl-8">
                  <p className="text-white text-base font-medium leading-normal">
                    Exécution Budgétaire
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
                      78%
                    </p>
                    <div className="flex items-center text-green-500">
                      <span className="material-symbols-outlined text-lg">
                        arrow_upward
                      </span>
                      <p className="text-base font-medium">+3 pts</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Consommé vs. mois dernier (Objectif : 80%)
                  </p>
                  <div className="flex justify-start items-center mt-4 space-x-3">
                    <div className="flex items-center justify-center bg-blue-500/20 text-blue-300 w-14 h-14 rounded-full border-2 border-blue-400">
                      <span className="font-bold text-lg">75</span>
                    </div>
                    <div className="flex items-center justify-center bg-green-500/20 text-green-300 w-14 h-14 rounded-full border-2 border-green-400">
                      <span className="font-bold text-lg">78</span>
                    </div>
                    <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-300 w-14 h-14 rounded-full border-2 border-yellow-400">
                      <span className="font-bold text-lg">77</span>
                    </div>
                    <div className="flex items-center justify-center bg-green-500/20 text-green-300 w-14 h-14 rounded-full border-2 border-green-400">
                      <span className="font-bold text-lg">78</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto md:flex-1 h-36">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 320 144"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      className="stroke-current text-gray-600"
                      strokeDasharray="4 4"
                      x1="0"
                      x2="320"
                      y1="58"
                      y2="58"
                    />
                    <text
                      className="fill-current text-gray-500 text-xs"
                      x="290"
                      y="54"
                    >
                      Target
                    </text>
                    <polyline
                      className="stroke-current text-yellow-400"
                      fill="none"
                      points="40,88 120,68 200,78 280,68"
                      strokeWidth="2"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="40"
                      cy="88"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="120"
                      cy="68"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="200"
                      cy="78"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="280"
                      cy="68"
                      r="4"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 md:pl-8">
                  <p className="text-white text-base font-medium leading-normal">
                    Total des Paiements en Retard
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-red-500 tracking-light text-[32px] font-bold leading-tight truncate">
                      1,2 M€
                    </p>
                    <div className="flex items-center text-green-500">
                      <span className="material-symbols-outlined text-lg">
                        check_circle
                      </span>
                      <p className="text-base font-medium">-0,3 M€</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Amélioration vs mois dernier (Objectif : &lt;1,0 M€)
                  </p>
                  <div className="flex justify-start items-center mt-4 space-x-3">
                    <div className="flex items-center justify-center bg-red-500/20 text-red-300 w-14 h-14 rounded-full border-2 border-red-400">
                      <span className="font-bold text-lg">1.8</span>
                    </div>
                    <div className="flex items-center justify-center bg-red-500/20 text-red-300 w-14 h-14 rounded-full border-2 border-red-400">
                      <span className="font-bold text-lg">1.5</span>
                    </div>
                    <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-300 w-14 h-14 rounded-full border-2 border-yellow-400">
                      <span className="font-bold text-lg">1.2</span>
                    </div>
                    <div className="flex items-center justify-center bg-green-500/20 text-green-300 w-14 h-14 rounded-full border-2 border-green-400">
                      <span className="font-bold text-lg">0.9</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto md:flex-1 h-36">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 320 144"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      className="stroke-current text-gray-600"
                      strokeDasharray="4 4"
                      x1="0"
                      x2="320"
                      y1="88"
                      y2="88"
                    />
                    <text
                      className="fill-current text-gray-500 text-xs"
                      x="290"
                      y="84"
                    >
                      Target
                    </text>
                    <polyline
                      className="stroke-current text-yellow-400"
                      fill="none"
                      points="40,28 120,48 200,68 280,98"
                      strokeWidth="2"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="40"
                      cy="28"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="120"
                      cy="48"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="200"
                      cy="68"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="280"
                      cy="98"
                      r="4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );

    // Weekly KPI Dashboard Content (from hebodomadaire.html)
    const WeeklyDashboard = () => (
      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Tableau de bord des KPI Hebdomadaires
          </h1>
          <p className="text-gray-400 text-base font-normal leading-normal">
            Vue en direct des indicateurs de performance clés hebdomadaires.
          </p>
        </div>
        <div className="flex flex-col flex-grow gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 md:pl-8">
                  <p className="text-white text-base font-medium leading-normal">
                    Efficience financière
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
                      88%
                    </p>
                    <p className="text-red-500 text-base font-medium">
                      (-2 pts vs S-1)
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Efficacité Globale (Objectif : 90%)
                  </p>
                  <div className="flex justify-start items-center mt-4 space-x-3">
                    <div className="flex items-center justify-center bg-blue-500/20 text-blue-300 w-14 h-14 rounded-full border-2 border-blue-400">
                      <span className="font-bold text-lg">82</span>
                    </div>
                    <div className="flex items-center justify-center bg-green-500/20 text-green-300 w-14 h-14 rounded-full border-2 border-green-400">
                      <span className="font-bold text-lg">89</span>
                    </div>
                    <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-300 w-14 h-14 rounded-full border-2 border-yellow-400">
                      <span className="font-bold text-lg">92</span>
                    </div>
                    <div className="flex items-center justify-center bg-red-500/20 text-red-300 w-14 h-14 rounded-full border-2 border-red-400">
                      <span className="font-bold text-lg">88</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto md:flex-1">
                  <div className="h-36">
                    <svg
                      className="w-full h-full"
                      fill="none"
                      viewBox="0 0 320 144"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        className="stroke-current text-gray-600"
                        strokeDasharray="4 4"
                        x1="0"
                        x2="320"
                        y1="28"
                        y2="28"
                      />
                      <text
                        className="fill-current text-gray-500 text-xs"
                        x="290"
                        y="24"
                      >
                        Target
                      </text>
                      <polyline
                        className="stroke-current text-yellow-400"
                        fill="none"
                        points="40,88 120,40 200,60 280,88"
                        strokeWidth="2"
                      />
                      <circle
                        className="fill-current text-yellow-400"
                        cx="40"
                        cy="88"
                        r="4"
                      />
                      <circle
                        className="fill-current text-yellow-400"
                        cx="120"
                        cy="40"
                        r="4"
                      />
                      <circle
                        className="fill-current text-yellow-400"
                        cx="200"
                        cy="60"
                        r="4"
                      />
                      <circle
                        className="fill-current text-yellow-400"
                        cx="280"
                        cy="88"
                        r="4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 md:pl-8">
                  <p className="text-white text-base font-medium leading-normal">
                    Exécution Budgétaire
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
                      78%
                    </p>
                    <div className="flex items-center text-green-500">
                      <span className="material-symbols-outlined text-lg">
                        arrow_upward
                      </span>
                      <p className="text-base font-medium">+3 pts</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Consommé vs. semaine dernière (Objectif : 80%)
                  </p>
                  <div className="flex justify-start items-center mt-4 space-x-3">
                    <div className="flex items-center justify-center bg-blue-500/20 text-blue-300 w-14 h-14 rounded-full border-2 border-blue-400">
                      <span className="font-bold text-lg">75</span>
                    </div>
                    <div className="flex items-center justify-center bg-green-500/20 text-green-300 w-14 h-14 rounded-full border-2 border-green-400">
                      <span className="font-bold text-lg">78</span>
                    </div>
                    <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-300 w-14 h-14 rounded-full border-2 border-yellow-400">
                      <span className="font-bold text-lg">77</span>
                    </div>
                    <div className="flex items-center justify-center bg-green-500/20 text-green-300 w-14 h-14 rounded-full border-2 border-green-400">
                      <span className="font-bold text-lg">78</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto md:flex-1 h-36">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 320 144"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      className="stroke-current text-gray-600"
                      strokeDasharray="4 4"
                      x1="0"
                      x2="320"
                      y1="58"
                      y2="58"
                    />
                    <text
                      className="fill-current text-gray-500 text-xs"
                      x="290"
                      y="54"
                    >
                      Target
                    </text>
                    <polyline
                      className="stroke-current text-yellow-400"
                      fill="none"
                      points="40,88 120,68 200,78 280,68"
                      strokeWidth="2"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="40"
                      cy="88"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="120"
                      cy="68"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="200"
                      cy="78"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="280"
                      cy="68"
                      r="4"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 md:pl-8">
                  <p className="text-white text-base font-medium leading-normal">
                    Total des Paiements en Retard
                  </p>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-red-500 tracking-light text-[32px] font-bold leading-tight truncate">
                      1,2 M€
                    </p>
                    <div className="flex items-center text-green-500">
                      <span className="material-symbols-outlined text-lg">
                        check_circle
                      </span>
                      <p className="text-base font-medium">-0,3 M€</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Amélioration vs semaine dernière (Objectif : &lt;1,0 M€)
                  </p>
                  <div className="flex justify-start items-center mt-4 space-x-3">
                    <div className="flex items-center justify-center bg-red-500/20 text-red-300 w-14 h-14 rounded-full border-2 border-red-400">
                      <span className="font-bold text-lg">1.8</span>
                    </div>
                    <div className="flex items-center justify-center bg-red-500/20 text-red-300 w-14 h-14 rounded-full border-2 border-red-400">
                      <span className="font-bold text-lg">1.5</span>
                    </div>
                    <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-300 w-14 h-14 rounded-full border-2 border-yellow-400">
                      <span className="font-bold text-lg">1.2</span>
                    </div>
                    <div className="flex items-center justify-center bg-green-500/20 text-green-300 w-14 h-14 rounded-full border-2 border-green-400">
                      <span className="font-bold text-lg">0.9</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto md:flex-1 h-36">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    viewBox="0 0 320 144"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      className="stroke-current text-gray-600"
                      strokeDasharray="4 4"
                      x1="0"
                      x2="320"
                      y1="88"
                      y2="88"
                    />
                    <text
                      className="fill-current text-gray-500 text-xs"
                      x="290"
                      y="84"
                    >
                      Target
                    </text>
                    <polyline
                      className="stroke-current text-yellow-400"
                      fill="none"
                      points="40,28 120,48 200,68 280,98"
                      strokeWidth="2"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="40"
                      cy="28"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="120"
                      cy="48"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="200"
                      cy="68"
                      r="4"
                    />
                    <circle
                      className="fill-current text-yellow-400"
                      cx="280"
                      cy="98"
                      r="4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );

    return (
      <div className="flex-1 overflow-hidden">
        <div className="p-5">
          {/* Tab Selector */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Finance Dashboard
              </h1>
              <p className="text-gray-300">
                Monitoring key financial performance indicators
              </p>
            </div>
            <TabSelector
              activeTab={activeTab}
              onTabChange={setActiveTab}
              weeklyLabel="Hebdomadaires"
              monthlyLabel="Mensuel"
            />
          </div>

          {/* Conditional Content Rendering */}
          {activeTab === "monthly" ? <MonthlyDashboard /> : <WeeklyDashboard />}
        </div>
      </div>
    );
  }

  // Special layout for Programs Dashboard - Enhanced to match image exactly
  if (category.id === "programs") {
    return (
      <main className="flex-1 overflow-hidden bg-slate-900">
        <div className="p-6 space-y-8">
          {/* Programs Dashboard Title */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Programs Department Dashboard
              </h1>
              <p className="text-gray-300 mt-2">
                Monitoring key program performance indicators for project
                ramp-up
              </p>
            </div>
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content Grid - 3 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col">
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
    // Monthly Operations Component
    const MonthlyOperations = () => (
      <main className="flex-grow">
        <div className="grid w-full grid-cols-1 gap-6">
          {/* Écart de Production */}
          <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h2 className="mb-4 text-lg font-semibold text-gray-300">
              Écart de Production
            </h2>
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex items-end gap-4">
                  <p className="text-5xl font-bold text-white">-85</p>
                  <div className="flex items-center text-green-500">
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-3xl font-bold">+23</p>
                      <p className="text-sm">vs mois précédent</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                      <p className="text-xl font-bold text-yellow-500">-180</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Jan</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-xl font-bold text-green-500">-20</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Fév</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-transparent">
                      <p className="text-xl font-bold text-red-500">-200</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Mar</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-xl font-bold text-green-500">50</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Avr</p>
                  </div>
                </div>
              </div>
              <div className="flex h-48 w-full items-center justify-center">
                <svg
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 200 100"
                >
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
                        style={{ stopColor: "#34d399", stopOpacity: 0.3 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#34d399", stopOpacity: 0 }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 55 L 50 80 L 100 20 L 150 70 L 200 45"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 55 L 50 80 L 100 20 L 150 70 L 200 45 L 200 100 L 0 100 Z"
                    fill="url(#grad1)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Scrap valuation indicateur */}
          <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-300">
              Scrap valuation indicateur
              <span className="text-2xl text-yellow-400">⚠️</span>
            </h2>
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex items-end gap-4">
                  <p className="text-5xl font-bold text-white">€1.1k</p>
                  <div className="flex items-center text-green-500">
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-3xl font-bold">-€0.1k</p>
                      <p className="text-sm">vs mois précédent</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-xl font-bold text-green-500">€0.8k</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Jan</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500 bg-transparent">
                      <p className="text-xl font-bold text-red-500">€1.2k</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Fév</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-xl font-bold text-green-500">€1.4k</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Mar</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                      <p className="text-xl font-bold text-yellow-500">€1.4k</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Avr</p>
                  </div>
                </div>
              </div>
              <div className="flex h-48 w-full items-center justify-center">
                <svg
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 200 100"
                >
                  <defs>
                    <linearGradient
                      id="grad2"
                      x1="0%"
                      x2="0%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#f87171", stopOpacity: 0.3 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#f87171", stopOpacity: 0 }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 80 L 50 40 L 100 25 L 150 25 L 200 50"
                    fill="none"
                    stroke="#f87171"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 80 L 50 40 L 100 25 L 150 25 L 200 50 L 200 100 L 0 100 Z"
                    fill="url(#grad2)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Suivi de l'Efficience mensuelle */}
          <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h2 className="mb-4 text-lg font-semibold text-gray-300">
              Suivi de l&apos;Efficience mensuelle
            </h2>
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex items-end gap-4">
                  <p className="text-5xl font-bold text-white">91%</p>
                  <div className="flex items-center text-green-500">
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-3xl font-bold">+1%</p>
                      <p className="text-sm">vs mois précédent</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-xl font-bold text-green-500">93%</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Jan</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-xl font-bold text-green-500">94%</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Fév</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-xl font-bold text-green-500">89%</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Mar</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-xl font-bold text-green-500">92%</p>
                    </div>
                    <p className="text-sm font-medium text-gray-400">Avr</p>
                  </div>
                </div>
              </div>
              <div className="flex h-48 w-full items-center justify-center">
                <svg
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 200 100"
                >
                  <defs>
                    <linearGradient
                      id="grad3"
                      x1="0%"
                      x2="0%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#34d399", stopOpacity: 0.3 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#34d399", stopOpacity: 0 }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 20 L 50 15 L 100 50 L 150 25 L 200 35"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 20 L 50 15 L 100 50 L 150 25 L 200 35 L 200 100 L 0 100 Z"
                    fill="url(#grad3)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Grid - Coût Consommables and Taux de Panne Machine */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h2 className="mb-4 text-lg font-semibold text-gray-300">
                Coût Consommables
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-4">
                    <p className="text-5xl font-bold text-white">12 500 MAD</p>
                    <div className="flex items-center text-red-500">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-bold">+5%</span>
                        <span className="text-sm">vs mois dernier</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    Dépensé ce mois-ci
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h2 className="mb-4 text-center text-lg font-semibold text-gray-300">
                Taux de Panne Machine
              </h2>
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <svg
                    className="h-full w-full -rotate-90 transform"
                    viewBox="0 0 120 120"
                  >
                    <circle
                      className="text-gray-700"
                      cx="60"
                      cy="60"
                      fill="transparent"
                      r="54"
                      stroke="currentColor"
                      strokeWidth="12"
                    />
                    <circle
                      className="text-yellow-500"
                      cx="60"
                      cy="60"
                      fill="transparent"
                      r="54"
                      stroke="currentColor"
                      strokeDasharray="339.292"
                      strokeDashoffset="291.791"
                      strokeLinecap="round"
                      strokeWidth="12"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold text-white">4.8%</p>
                  </div>
                </div>
                <div className="ml-6 flex items-center text-red-500">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold">+0.2%</span>
                    <p className="text-sm text-gray-400">VS mois dernier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );

    // Weekly Operations Component
    const WeeklyOperations = () => (
      <main className="w-full flex-shrink-0">
        <div className="flex flex-col gap-6">
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-6 min-h-[380px] hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h2 className="mb-2 text-lg font-semibold text-gray-300">
                Taux d&apos;Heures Supplémentaires
              </h2>
              <div className="flex items-end gap-4 mb-4">
                <p className="text-5xl font-bold text-white">2.5%</p>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs text-gray-400">
                    Variation vs semaine précédente
                  </span>
                  <div className="flex items-center text-sm text-green-500 gap-1">
                    <span className="material-symbols-outlined text-base">
                      arrow_downward
                    </span>
                    <p className="text-2xl font-semibold">-0.3%</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-col pt-6">
                <div className="relative h-20 w-full mb-6">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    fill="none"
                    preserveAspectRatio="none"
                    strokeWidth="3"
                    viewBox="0 0 200 80"
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
                        />
                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      className="stroke-dashed stroke-gray-500"
                      d="M 0 40 L 200 40"
                      strokeDasharray="4 4"
                    />
                    <path
                      className="stroke-blue-500"
                      d="M 0 20 L 66 60 L 132 30 L 200 50"
                    />
                    <path
                      d="M 0 20 L 66 60 L 132 30 L 200 50 L 200 80 L 0 80 Z"
                      fill="url(#gradient1)"
                    />
                  </svg>
                  <div className="absolute -top-1.5 left-0 text-xs text-gray-500">
                    Target
                  </div>
                </div>
                <div className="mt-2 flex justify-between gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-base font-bold text-white leading-none">
                        2.2%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-sm">S1</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-base font-bold text-yellow-400 leading-none">
                        2.8%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-sm">S2</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-base font-bold text-white leading-none">
                        2.3%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-sm">S3</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-base font-bold text-white leading-none">
                        2.5%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-sm">S4</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-6 min-h-[380px] hover:scale-105 transition-transform duration-300 cursor-pointer">
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
                Taux de Chômage technique
                <span className="text-2xl text-yellow-400">⚠️</span>
              </h2>
              <div className="flex items-end gap-4 mb-4">
                <p className="flex items-center text-5xl font-bold text-red-500">
                  1.68%
                </p>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-xs text-gray-400">
                    Variation vs semaine précédente
                  </span>
                  <div className="flex items-center text-sm text-red-500 gap-1">
                    <p className="text-2xl font-semibold">+0.2%</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-col pt-6">
                <div className="relative h-20 w-full mb-6">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    fill="none"
                    preserveAspectRatio="none"
                    strokeWidth="3"
                    viewBox="0 0 200 80"
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
                        />
                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      className="stroke-dashed stroke-gray-500"
                      d="M 0 40 L 200 40"
                      strokeDasharray="4 4"
                    />
                    <path
                      className="stroke-blue-500"
                      d="M 0 60 L 66 20 L 132 50 L 200 30"
                    />
                    <path
                      d="M 0 60 L 66 20 L 132 50 L 200 30 L 200 80 L 0 80 Z"
                      fill="url(#gradient2)"
                    />
                  </svg>
                  <div className="absolute -top-1.5 left-0 text-xs text-gray-500">
                    Target
                  </div>
                </div>
                <div className="mt-2 flex justify-between gap-2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-base font-bold text-yellow-400 leading-none">
                        1.75%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-sm">S1</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-base font-bold text-white leading-none">
                        1.48%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-sm">S2</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-base font-bold text-yellow-400 leading-none">
                        1.62%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-sm">S3</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-base font-bold text-yellow-400 leading-none">
                        1.68%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-sm">S4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-gray-900/50 p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-6 min-h-[380px] hover:scale-105 transition-transform duration-300 cursor-pointer">
                <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-300">
                  Taux de Scrap{" "}
                  <span className="text-2xl text-yellow-400">⚠️</span>
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center">
                    <svg
                      className="h-full w-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="stroke-current text-gray-600"
                        cx="50"
                        cy="50"
                        fill="none"
                        r="45"
                        strokeWidth="8"
                      />
                      <circle
                        className="stroke-current text-red-500 transition-all duration-500"
                        cx="50"
                        cy="50"
                        fill="none"
                        r="45"
                        strokeDasharray="282.74"
                        strokeDashoffset="277.63224"
                        strokeLinecap="round"
                        strokeWidth="8"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        1.5%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-xs text-gray-400">
                      Variation vs semaine précédente
                    </span>
                    <div className="flex items-center text-red-500 gap-1">
                      <span className="text-2xl font-semibold">+0.1%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-col pt-6">
                  <div className="relative h-20 w-full mb-6">
                    <svg
                      className="absolute inset-0 h-full w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      strokeWidth="3"
                      viewBox="0 0 200 80"
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
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        className="stroke-dashed stroke-gray-500"
                        d="M 0 50 L 200 50"
                        strokeDasharray="4 4"
                      />
                      <path
                        className="stroke-blue-500"
                        d="M 0 70 L 66 40 L 132 60 L 200 20"
                      />
                      <path
                        d="M 0 70 L 66 40 L 132 60 L 200 20 L 200 80 L 0 80 Z"
                        fill="url(#gradient3)"
                      />
                    </svg>
                    <div className="absolute -top-1.5 left-0 text-xs text-gray-500">
                      Target
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between gap-2">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-base font-bold text-yellow-400 leading-none">
                          1.25%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-sm">
                        S1
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                        <span className="text-base font-bold text-white leading-none">
                          0.97%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-sm">
                        S2
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-base font-bold text-yellow-400 leading-none">
                          1.15%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-sm">
                        S3
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-base font-bold text-yellow-400 leading-none">
                          1.12%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-sm">
                        S4
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-6 min-h-[380px] hover:scale-105 transition-transform duration-300 cursor-pointer">
                <h2 className="mb-2 text-lg font-semibold text-gray-300">
                  Suivi de l&apos;Efficience par semaine
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
                    <svg
                      className="h-full w-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="stroke-current text-gray-600"
                        cx="50"
                        cy="50"
                        fill="none"
                        r="45"
                        strokeWidth="8"
                      />
                      <circle
                        className="stroke-current text-blue-500 transition-all duration-500"
                        cx="50"
                        cy="50"
                        fill="none"
                        r="45"
                        strokeDasharray="282.74"
                        strokeDashoffset="28.274"
                        strokeLinecap="round"
                        strokeWidth="8"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">90%</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-xs text-gray-400">
                      Variation vs semaine précédente
                    </span>
                    <div className="flex items-center text-green-500 gap-1">
                      <span className="material-symbols-outlined text-xl">
                        arrow_upward
                      </span>
                      <span className="text-2xl font-semibold">+2%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-col pt-6">
                  <div className="relative h-20 w-full mb-6">
                    <svg
                      className="absolute inset-0 h-full w-full"
                      fill="none"
                      preserveAspectRatio="none"
                      strokeWidth="3"
                      viewBox="0 0 200 80"
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
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        className="stroke-dashed stroke-gray-500"
                        d="M 0 25 L 200 25"
                        strokeDasharray="4 4"
                      />
                      <path
                        className="stroke-blue-500"
                        d="M 0 30 L 66 20 L 132 50 L 200 40"
                      />
                      <path
                        d="M 0 30 L 66 20 L 132 50 L 200 40 L 200 80 L 0 80 Z"
                        fill="url(#gradient4)"
                      />
                    </svg>
                    <div className="absolute -top-1.5 left-0 text-xs text-gray-500">
                      Target
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between gap-2">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-base font-bold text-yellow-400 leading-none">
                          88%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-sm">
                        S1
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                        <span className="text-base font-bold text-white leading-none">
                          92%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-sm">
                        S2
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-base font-bold text-yellow-400 leading-none">
                          89%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-sm">
                        S3
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-base font-bold text-yellow-400 leading-none">
                          90%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-sm">
                        S4
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
    return (
      <main className="flex-1 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header with tabs */}
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Opérations -{" "}
                {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
              </h1>
              <p className="text-gray-300 mb-4">
                Key Performance Indicators for the current period
              </p>
              <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-6">
                {activeTab === "weekly" && (
                  <div className="rounded-lg bg-slate-800/90 border border-slate-700/50 px-4 py-2 text-sm font-medium text-gray-300">
                    <span className="font-normal">Semaine actuelle :</span>
                    <span className="font-semibold text-white ml-1">S10</span>
                  </div>
                )}
                <div className="rounded-lg bg-slate-800/90 border border-slate-700/50 px-4 py-2 text-sm font-medium text-gray-300">
                  <span className="font-normal">Mois en cours :</span>
                  <span className="font-semibold text-white ml-1">M12</span>
                </div>
              </div>
            </div>
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Conditional Content Rendering */}
          {activeTab === "monthly" ? (
            <MonthlyOperations />
          ) : (
            <WeeklyOperations />
          )}
        </div>
      </main>
    );
  }

  if (category.id === "quality") {
    const MonthlyQuality = () => {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 grid-rows-2 gap-6 h-full">
          {/* PPM & Scrap Client */}
          <div className="lg:col-span-2 flex flex-col gap-6 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
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
          <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
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
                    <span className="text-gray-300 text-xs">vs Mois Préc.</span>
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
                    <span className="text-gray-300 text-xs">vs Mois Préc.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score Cards Clients */}
          <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
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

          {/* Incidents / Accidents de Travail */}
          <div className="lg:col-span-3 row-start-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
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

          {/* Suivi de l'Efficience */}
          <div className="lg:col-span-3 row-start-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
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
        </div>
      );
    };

    const WeeklyQuality = () => {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 grid-rows-2 gap-6 h-full">
          {/* PPM & Scrap Client */}
          <div className="lg:col-span-2 flex flex-col gap-6 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
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
          <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
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
                    <span className="text-gray-300 text-xs">vs Mois Préc.</span>
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
                    <span className="text-gray-300 text-xs">vs Mois Préc.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score Cards Clients */}
          <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
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

          {/* Incidents / Accidents de Travail */}
          <div className="lg:col-span-3 row-start-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
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

          {/* Suivi de l'Efficience */}
          <div className="lg:col-span-3 row-start-2 flex flex-col gap-4 rounded-xl border border-slate-700/50 bg-slate-800/90 p-8 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
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
        </div>
      );
    };


    return (
      <main className="flex-1 overflow-hidden bg-slate-900 p-8">
        {/* Header with tabs */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Quality & Safety Dashboard
            </h1>
            <p className="text-gray-300">
              Key Performance Indicators for Quality and Safety
            </p>
          </div>
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        { activeTab === "monthly" ? <MonthlyQuality /> : <WeeklyQuality /> }
      </main>
    );
  }

  if (category.id === "supplychain") {
    return (
      <main className="flex-1 overflow-hidden bg-slate-900">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex w-full flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Supply Chain - {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
                </h1>
                <p className="text-gray-200">
                  {activeTab === "monthly" ? "Mois en cours: Mai" : "Semaine actuelle: 20-26 May"}
                </p>
              </div>
              <TabSelector
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
            </div>
              {activeTab === "monthly" ? (
                <div className="flex flex-col gap-6">
                  <div
                    className="flex h-full flex-col gap-6 rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-lg font-semibold text-white"
                      >
                        Rotation des Stocks
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-300"
                      >
                        inventory
                      </span>
                    </div>
                    <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
                      <div
                        className="flex flex-col justify-center gap-10 py-4 lg:col-span-3"
                      >
                        <div>
                          <p
                            className="text-7xl font-extrabold tracking-tighter text-white"
                          >
                            22 <span className="text-5xl font-bold">jours</span>
                          </p>
                          <div className="flex items-baseline gap-2">
                            <p
                              className="text-xl font-medium text-gray-300"
                            >
                              Target:
                            </p>
                            <p className="text-3xl font-bold text-primary">20 jours</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-4xl font-bold">21</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Avril
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-4xl font-bold">19</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Mars
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500"
                            >
                              <span className="text-4xl font-bold">24</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Fév
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-4xl font-bold">20</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Jan
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500"
                            >
                              <span className="text-4xl font-bold">23</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Déc
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2"
                      >
                        <div className="h-20 w-full max-w-lg">
                          <svg
                            className="h-full w-full"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 40"
                          >
                            <line
                              fill="none"
                              stroke="#3182CE"
                              strokeDasharray="4,4"
                              strokeWidth="0.5"
                              x1="0"
                              x2="100"
                              y1="20"
                              y2="20"
                            />
                            <polyline
                              fill="none"
                              points="5,15 28.75,25 52.5,10 76.25,30 100,20"
                              stroke="#DD6B20"
                              strokeWidth="1"
                            />
                            <circle cx="5" cy="15" fill="#DD6B20" r="1.5" />
                            <circle
                              cx="28.75"
                              cy="25"
                              fill="#DD6B20"
                              r="1.5"
                            />
                            <circle cx="52.5" cy="10" fill="#DD6B20" r="1.5" />
                            <circle
                              cx="76.25"
                              cy="30"
                              fill="#DD6B20"
                              r="1.5"
                            />
                            <circle cx="100" cy="20" fill="#DD6B20" r="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex h-full flex-col gap-6 rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-lg font-semibold text-white"
                      >
                        Taux de Fiabilité des Stocks
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-300"
                      >
                        published_with_changes
                      </span>
                    </div>
                    <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
                      <div
                        className="flex flex-col items-center justify-center gap-6 py-4 lg:col-span-3"
                      >
                        <div className="flex flex-col items-center">
                          <p
                            className="text-8xl font-extrabold tracking-tighter text-yellow-500"
                          >
                            94%
                          </p>
                          <div className="flex items-center gap-1">
                            <span
                              className="material-symbols-outlined text-lg text-primary"
                            >
                              arrow_upward
                            </span>
                            <p className="text-2xl font-extrabold text-primary">+1%</p>
                            <p
                              className="text-base font-normal text-gray-300"
                            >
                              vs dernier mois
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full max-w-md flex-col gap-4">
                          <div className="flex items-center gap-4">
                            <p
                              className="w-28 shrink-0 text-sm font-semibold text-gray-200"
                            >
                              Warehouse A
                            </p>
                            <div
                              className="h-6 w-full rounded bg-gray-700"
                            >
                              <div
                                className="h-full items-center justify-end rounded bg-primary pr-2 text-right text-sm font-bold text-white"
                                style={{ width: "98%" }}
                              >
                                98%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p
                              className="w-28 shrink-0 text-sm font-semibold text-gray-200"
                            >
                              Warehouse B
                            </p>
                            <div
                              className="h-6 w-full rounded bg-gray-700"
                            >
                              <div
                                className="h-full items-center justify-end rounded bg-yellow-500 pr-2 text-right text-sm font-bold text-white"
                                style={{ width: "91%" }}
                              >
                                91%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p
                              className="w-28 shrink-0 text-sm font-semibold text-gray-200"
                            >
                              Warehouse C
                            </p>
                            <div
                              className="h-6 w-full rounded bg-gray-700"
                            >
                              <div
                                className="h-full items-center justify-end rounded bg-primary pr-2 text-right text-sm font-bold text-white"
                                style={{ width: "96%" }}
                              >
                                96%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2"
                      >
                        <div className="h-20 w-full max-w-lg">
                          <svg
                            className="h-full w-full"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 40"
                          >
                            <line
                              fill="none"
                              stroke="#3182CE"
                              strokeDasharray="4,4"
                              strokeWidth="0.5"
                              x1="0"
                              x2="100"
                              y1="20"
                              y2="20"
                            />
                            <polyline
                              fill="none"
                              points="5,25 28.75,10 52.5,25 76.25,15 100,20"
                              stroke="#DD6B20"
                              strokeWidth="1"
                            />
                            <circle cx="5" cy="25" fill="#DD6B20" r="1.5" />
                            <circle
                              cx="28.75"
                              cy="10"
                              fill="#DD6B20"
                              r="1.5"
                            />
                            <circle cx="52.5" cy="25" fill="#DD6B20" r="1.5" />
                            <circle
                              cx="76.25"
                              cy="15"
                              fill="#DD6B20"
                              r="1.5"
                            />
                            <circle cx="100" cy="20" fill="#DD6B20" r="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex h-full flex-col gap-6 rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-lg font-semibold text-white"
                      >
                        Coût Logistique Total
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-300"
                      >
                        local_shipping
                      </span>
                    </div>
                    <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
                      <div
                        className="flex flex-col justify-center gap-10 py-4 lg:col-span-3"
                      >
                        <div>
                          <p
                            className="text-7xl font-extrabold tracking-tighter text-white"
                          >
                            €1.2M
                          </p>
                          <div className="flex items-center gap-1">
                            <span
                              className="material-symbols-outlined text-lg text-primary"
                            >
                              arrow_downward
                            </span>
                            <p className="text-2xl font-extrabold text-primary">-5%</p>
                            <p
                              className="text-base font-normal text-gray-300"
                            >
                              vs last month
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-3xl font-bold">1.26</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Avril
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500"
                            >
                              <span className="text-3xl font-bold">1.31</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Mars
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500"
                            >
                              <span className="text-3xl font-bold">1.29</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Fév
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-3xl font-bold">1.18</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Jan
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div
                              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-3xl font-bold">1.15</span>
                            </div>
                            <p
                              className="text-sm font-medium text-gray-200"
                            >
                              Déc
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2"
                      >
                        <div className="h-20 w-full max-w-lg">
                          <svg
                            className="h-full w-full"
                            preserveAspectRatio="none"
                            viewBox="0 0 100 40"
                          >
                            <line
                              fill="none"
                              stroke="#3182CE"
                              strokeDasharray="4,4"
                              strokeWidth="0.5"
                              x1="0"
                              x2="100"
                              y1="20"
                              y2="20"
                            />
                            <polyline
                              fill="none"
                              points="5,20 28.75,30 52.5,10 76.25,15 100,25"
                              stroke="#DD6B20"
                              strokeWidth="1"
                            />
                            <circle cx="5" cy="20" fill="#DD6B20" r="1.5" />
                            <circle
                              cx="28.75"
                              cy="30"
                              fill="#DD6B20"
                              r="1.5"
                            />
                            <circle cx="52.5" cy="10" fill="#DD6B20" r="1.5" />
                            <circle
                              cx="76.25"
                              cy="15"
                              fill="#DD6B20"
                              r="1.5"
                            />
                            <circle cx="100" cy="25" fill="#DD6B20" r="1.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid h-full flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
                  <div
                    className="flex flex-col gap-6 rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-base font-medium text-white"
                      >
                        Taux de Service Client / OTIF
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-300"
                      >
                        trending_up
                      </span>
                    </div>
                    <div className="flex flex-wrap items-end gap-4">
                      <p
                        className="text-6xl font-extrabold tracking-tighter text-white"
                      >
                        96%
                      </p>
                      <div className="flex items-center gap-1 pb-2">
                        <span className="material-symbols-outlined text-sm text-primary">
                          arrow_upward
                        </span>
                        <p className="text-2xl font-extrabold text-primary">+1.0%</p>
                        <p
                          className="text-base font-normal text-gray-300"
                        >
                          vs last week
                        </p>
                      </div>
                    </div>
                    <div className="relative h-[180px] w-full pt-4">
                      <div className="target-line" style={{ bottom: "95%" }} />
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
                              stopColor="#2c5282"
                              stopOpacity="0.2"
                            />
                            <stop
                              offset="100%"
                              stopColor="#2c5282"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 50 L 100 30 L 200 40 L 300 20 L 400 30"
                          fill="url(#line-chart-gradient)"
                          stroke="#2c5282"
                          strokeWidth="3"
                        />
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
                          <span className="text-3xl font-extrabold text-white">
                            95%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-slate-800" />
                          <p className="text-sm font-bold text-gray-200">
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
                          <span className="text-3xl font-extrabold text-white">
                            97%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-slate-800" />
                          <p className="text-sm font-bold text-gray-200">
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
                          <span className="text-3xl font-extrabold text-white">
                            96%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-slate-800" />
                          <p className="text-sm font-bold text-gray-200">
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
                          <span className="text-3xl font-extrabold text-white">
                            98%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-slate-800" />
                          <p className="text-sm font-bold text-gray-200">
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
                          <span className="text-3xl font-extrabold text-white">
                            97%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-slate-800" />
                          <p className="text-sm font-bold text-gray-200">
                            W5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex flex-col gap-6 rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-base font-medium text-white"
                      >
                        Taux de Service Fournisseurs OTIF
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-300"
                      >
                        local_shipping
                      </span>
                    </div>
                    <div className="flex flex-wrap items-end gap-4">
                      <p
                        className="text-5xl font-extrabold tracking-tighter text-white"
                      >
                        96%
                      </p>
                      <div className="flex items-center gap-1 pb-1">
                        <span className="material-symbols-outlined text-sm text-red-500">
                          arrow_downward
                        </span>
                        <p className="text-2xl font-extrabold text-red-500">-0.5%</p>
                        <p
                          className="text-base font-normal text-gray-300"
                        >
                          vs last week
                        </p>
                      </div>
                    </div>
                    <div className="flex h-full w-full flex-col items-center justify-center pt-4">
                      <div className="flex w-full items-start justify-around">
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-primary">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
                            <span className="text-2xl font-bold">94%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-200">
                            W1
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-primary">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="text-2xl font-bold">95%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-200">
                            W2
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-primary">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
                            <span className="text-2xl font-bold">93%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-200">
                            W3
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-primary">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="text-2xl font-bold">97%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-200">
                            W4
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-primary">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="text-2xl font-bold">96%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-200">
                            W5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full flex flex-col gap-4 rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-6">
                    <div className="flex items-start justify-between">
                      <p className="text-base font-medium text-white">
                        Fiabilité Client
                      </p>
                      <span className="material-symbols-outlined text-gray-300">
                        shield
                      </span>
                    </div>
                    <div className="flex h-full flex-grow items-center justify-center gap-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-primary/20 bg-primary/10 text-primary">
                          <span className="text-6xl font-extrabold tracking-tighter">
                            94%
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-white">
                          Actuel
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-4">
                        <p className="text-sm font-medium text-gray-200">
                          Historique Hebdomadaire
                        </p>
                        <div className="flex items-center gap-6">
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <span className="text-2xl font-bold">92%</span>
                            </div>
                            <p className="text-sm font-medium text-gray-200">
                              W1
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <span className="text-2xl font-bold">95%</span>
                            </div>
                            <p className="text-sm font-medium text-gray-200">
                              W2
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
                              <span className="text-2xl font-bold">88%</span>
                            </div>
                            <p className="text-sm font-medium text-gray-200">
                              W3
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <span className="text-2xl font-bold">94%</span>
                            </div>
                            <p className="text-sm font-medium text-gray-200">
                              W4
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] hover:scale-105 transition-transform duration-300 cursor-pointer">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm p-6 flex flex-col h-[450px] hover:scale-105 transition-transform duration-300 cursor-pointer">
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
                  <span className="text-sm text-gray-200 font-medium">
                    Actuel
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-4 border-b border-dashed border-danger"></span>
                  <span className="text-sm text-gray-200 font-medium">
                    Cible (90%)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] hover:scale-105 transition-transform duration-300 cursor-pointer">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] hover:scale-105 transition-transform duration-300 cursor-pointer">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-4 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-white tracking-wide">
                Taux d’absentéisme Hebdo
              </h2>
              <div className="flex items-center gap-2 text-sm text-danger">
                <span className="h-2 w-2 rounded-full bg-red-400 text-white"></span>
                <span className="text-sm text-gray-200 font-medium">
                  Cible Dépassée
                </span>
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] hover:scale-105 transition-transform duration-300 cursor-pointer">
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
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              {getCategoryTitle()}
            </h1>
            <p className="text-gray-300">{getCategorySubtitle()}</p>
          </div>
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Weekly KPIs Section */}
        {activeTab === "weekly" && (
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

            {/* Additional Weekly KPIs if available */}
            {category.kpis.length > 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                {category.kpis.slice(4, 8).map((kpi, index) => (
                  <DashboardKPICard
                    key={`weekly-additional-${index}`}
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
            )}
          </div>
        )}

        {/* Monthly KPIs Section */}
        {activeTab === "monthly" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Monthly KPIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTopKPIs(6).map((kpi, index) => (
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
      </div>
    </div>
  );
}
