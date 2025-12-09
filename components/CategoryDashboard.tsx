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
    <Card className="bg-white dark:bg-white border-slate-700 hover:border-slate-600 transition-all duration-300  cursor-pointer">
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
  const [activeTab, setActiveTab] = useState<TabType>("weekly");
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
        <div className="flex flex-col flex-grow gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6  transition-transform duration-300 cursor-pointer">
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
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6  transition-transform duration-300 cursor-pointer">
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
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6  transition-transform duration-300 cursor-pointer">
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

    const WeeklyDashboard = () => (
      <main className="flex-1">
        <div className="flex flex-col flex-grow gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6  transition-transform duration-300 cursor-pointer">
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
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6  transition-transform duration-300 cursor-pointer">
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
            <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6  transition-transform duration-300 cursor-pointer">
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
                Indicateurs Hebdomadaires {activeTab === "monthly" ? "Mensuel" : "Hebdomadaires"}
              </h1>
              <p className="text-gray-300">
                Vue en direct des indicateurs de performance clés {activeTab === "monthly" ? "mensuels" : "hebdomadaires"}.
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
          </div>

          {/* Main Content Grid - 3 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl  transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl  transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl  transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl  transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl  transition-all duration-300 cursor-pointer flex flex-col">
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

            <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl  transition-all duration-300 cursor-pointer flex flex-col">
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
        <div className="grid w-full grid-cols-1 gap-2">
          {/* Écart de Production */}
          <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 transition-transform duration-300 cursor-pointer">
            <h2 className="mb-1 lg:mb-3 text-sm lg:text-lg font-semibold text-gray-300">
              Écart de Production
            </h2>
            <div className="grid grid-cols-1 items-center gap-2 lg:gap-4 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex items-end gap-1.5 lg:gap-3">
                  <p className="text-2xl lg:text-4xl font-bold text-white">-85</p>
                  <div className="flex items-center text-green-500">
                    <div className="flex items-baseline gap-1">
                      <p className="text-lg lg:text-2xl font-bold">+23</p>
                      <p className="text-[10px] lg:text-sm">vs mois précédent</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 lg:mt-6 grid grid-cols-4 gap-1.5 lg:gap-3">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                      <p className="text-[10px] lg:text-base font-bold text-yellow-500">-180</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Jan</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-[10px] lg:text-base font-bold text-green-500">-20</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Fév</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-red-500 bg-transparent">
                      <p className="text-[10px] lg:text-base font-bold text-red-500">-200</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Mar</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-[10px] lg:text-base font-bold text-green-500">50</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Avr</p>
                  </div>
                </div>
              </div>
              <div className="flex h-20 lg:h-24 w-full items-center justify-center">
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
          <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
            <h2 className="mb-1 lg:mb-3 flex items-center gap-1.5 text-sm lg:text-lg font-semibold text-gray-300">
              Scrap valuation indicateur
              <span className="text-base lg:text-lg text-yellow-400">⚠️</span>
            </h2>
            <div className="grid grid-cols-1 items-center gap-2 lg:gap-3 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex items-end gap-1.5 lg:gap-2">
                  <p className="text-2xl lg:text-3xl font-bold text-white">€1.1k</p>
                  <div className="flex items-center text-green-500">
                    <div className="flex items-baseline gap-1">
                      <p className="text-lg lg:text-xl font-bold">-€0.1k</p>
                      <p className="text-[10px] lg:text-xs">vs mois précédent</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 lg:mt-6 grid grid-cols-4 gap-1.5 lg:gap-3">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-[9px] lg:text-sm font-bold text-green-500">€0.8k</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Jan</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-red-500 bg-transparent">
                      <p className="text-[9px] lg:text-sm font-bold text-red-500">€1.2k</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Fév</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-[9px] lg:text-sm font-bold text-green-500">€1.4k</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Mar</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent">
                      <p className="text-[9px] lg:text-sm font-bold text-yellow-500">€1.4k</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Avr</p>
                  </div>
                </div>
              </div>
              <div className="flex h-20 lg:h-40 w-full items-center justify-center">
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
          <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
            <h2 className="mb-1 lg:mb-2 text-sm lg:text-base font-semibold text-gray-300">
              Suivi de l&apos;Efficience mensuelle
            </h2>
            <div className="grid grid-cols-1 items-center gap-2 lg:gap-3 md:grid-cols-2">
              <div className="flex flex-col">
                <div className="flex items-end gap-1.5 lg:gap-2">
                  <p className="text-2xl lg:text-3xl font-bold text-white">91%</p>
                  <div className="flex items-center text-green-500">
                    <div className="flex items-baseline gap-1">
                      <p className="text-lg lg:text-xl font-bold">+1%</p>
                      <p className="text-[10px] lg:text-xs">vs mois précédent</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 lg:mt-6 grid grid-cols-4 gap-1.5 lg:gap-3">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-[10px] lg:text-base font-bold text-green-500">93%</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Jan</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-[10px] lg:text-base font-bold text-green-500">94%</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Fév</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-[10px] lg:text-base font-bold text-green-500">89%</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Mar</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-0.5 lg:mb-2 flex h-8 w-8 lg:h-16 lg:w-16 items-center justify-center rounded-full border-2 border-green-500 bg-transparent">
                      <p className="text-[10px] lg:text-base font-bold text-green-500">92%</p>
                    </div>
                    <p className="text-[9px] lg:text-sm font-medium text-gray-400">Avr</p>
                  </div>
                </div>
              </div>
              <div className="flex h-20 lg:h-40 w-full items-center justify-center">
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
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
            <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
              <h2 className="mb-1 lg:mb-3 text-sm lg:text-lg font-semibold text-gray-300">
                Coût Consommables
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5 lg:gap-3">
                    <p className="text-xl lg:text-3xl font-bold text-white">12 500 MAD</p>
                    <div className="flex items-center text-red-500">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-base lg:text-xl font-bold">+5%</span>
                        <span className="text-[10px] lg:text-sm">vs mois dernier</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-0.5 lg:mt-1 text-[10px] lg:text-sm text-gray-400">
                    Dépensé ce mois-ci
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
              <h2 className="mb-1 lg:mb-3 text-center text-sm lg:text-lg font-semibold text-gray-300">
                Taux de Panne Machine
              </h2>
              <div className="flex items-center justify-center">
                <div className="relative h-16 w-16 lg:h-32 lg:w-32">
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
                    <p className="text-base lg:text-2xl font-bold text-white">4.8%</p>
                  </div>
                </div>
                <div className="ml-2 lg:ml-4 flex items-center text-red-500">
                  <div className="flex items-baseline gap-0.5 lg:gap-1">
                    <span className="text-base lg:text-xl font-bold">+0.2%</span>
                    <p className="text-[10px] lg:text-sm text-gray-400">VS mois dernier</p>
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
        <div className="flex flex-col gap-2">
          <div className="relative grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 min-h-[200px] lg:min-h-[340px] transition-transform duration-300 cursor-pointer">
              <h2 className="mb-1 lg:mb-2 text-sm lg:text-lg font-semibold text-gray-300">
                Taux d&apos;Heures Supplémentaires
              </h2>
              <div className="flex items-end gap-1.5 lg:gap-3 mb-1.5 lg:mb-3">
                <p className="text-2xl lg:text-4xl font-bold text-white">2.5%</p>
                <div className="flex flex-col items-start gap-0">
                  <span className="text-[9px] lg:text-xs text-gray-400">
                    Variation vs semaine précédente
                  </span>
                  <div className="flex items-center text-sm text-green-500 gap-0.5">
                    <span className="material-symbols-outlined text-xs lg:text-base">
                      arrow_downward
                    </span>
                    <p className="text-base lg:text-lg font-semibold">-0.3%</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
                <div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
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
                  <div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">
                    Target
                  </div>
                </div>
                <div className="mt-0.5 lg:mt-2 flex justify-between gap-1 lg:gap-2">
                  <div className="flex flex-col items-center gap-0.5 lg:gap-1">
                    <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-white leading-none">
                        2.2%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S1</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                        2.8%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S2</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-white leading-none">
                        2.3%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S3</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-white leading-none">
                        2.5%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S4</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 min-h-[200px] lg:min-h-[340px] transition-transform duration-300 cursor-pointer">
              <h2 className="mb-1 lg:mb-2 flex items-center gap-1.5 text-sm lg:text-lg font-semibold text-gray-300">
                Taux de Chômage technique
                <span className="text-base lg:text-lg text-yellow-400">⚠️</span>
              </h2>
              <div className="flex items-end gap-1.5 lg:gap-3 mb-1.5 lg:mb-3">
                <p className="flex items-center text-2xl lg:text-3xl font-bold text-red-500">
                  1.68%
                </p>
                <div className="flex flex-col items-start gap-0">
                  <span className="text-[9px] lg:text-[10px] text-gray-400">
                    Variation vs semaine précédente
                  </span>
                  <div className="flex items-center text-sm text-red-500 gap-0.5">
                    <p className="text-base lg:text-lg font-semibold">+0.2%</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
                <div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
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
                  <div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">
                    Target
                  </div>
                </div>
                <div className="mt-0.5 flex justify-between gap-1">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                        1.75%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S1</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-white leading-none">
                        1.48%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S2</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                        1.62%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S3</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                        1.68%
                      </span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-gray-900/50">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 min-h-[200px] lg:min-h-[340px] transition-transform duration-300 cursor-pointer">
                <h2 className="mb-1 lg:mb-2 flex items-center gap-1.5 text-sm lg:text-lg font-semibold text-gray-300">
                  Taux de Scrap{" "}
                  <span className="text-base lg:text-lg text-yellow-400">⚠️</span>
                </h2>
                <div className="flex items-center gap-1.5 lg:gap-3">
                  <div className="relative flex h-16 w-16 lg:h-28 lg:w-28 flex-shrink-0 items-center justify-center">
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
                      <span className="text-xl lg:text-3xl font-bold text-white">
                        1.5%
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-0">
                    <span className="text-[9px] lg:text-[10px] text-gray-400">
                      Variation vs semaine précédente
                    </span>
                    <div className="flex items-center text-red-500 gap-0.5">
                      <span className="text-base lg:text-lg font-semibold">+0.1%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
                  <div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
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
                    <div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">
                      Target
                    </div>
                  </div>
                  <div className="mt-0.5 flex justify-between gap-1">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                          1.25%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">
                        S1
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                        <span className="text-[10px] lg:text-xs font-bold text-white leading-none">
                          0.97%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">
                        S2
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                          1.15%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">
                        S3
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                          1.12%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">
                        S4
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-lg bg-slate-800/90 backdrop-blur-sm p-2 lg:p-4 min-h-[200px] lg:min-h-[340px] transition-transform duration-300 cursor-pointer">
                <h2 className="mb-1 lg:mb-2 text-sm lg:text-lg font-semibold text-gray-300">
                  Suivi de l&apos;Efficience par semaine
                </h2>
                <div className="flex items-center gap-1.5 lg:gap-3">
                  <div className="relative flex h-16 w-16 lg:h-28 lg:w-28 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
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
                      <span className="text-xl lg:text-3xl font-bold text-white">90%</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-0">
                    <span className="text-[9px] lg:text-[10px] text-gray-400">
                      Variation vs semaine précédente
                    </span>
                    <div className="flex items-center text-green-500 gap-0.5">
                      <span className="material-symbols-outlined text-sm lg:text-base">
                        arrow_upward
                      </span>
                      <span className="text-base lg:text-lg font-semibold">+2%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
                  <div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
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
                    <div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">
                      Target
                    </div>
                  </div>
                  <div className="mt-0.5 flex justify-between gap-1">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                          88%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">
                        S1
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                        <span className="text-[10px] lg:text-xs font-bold text-white leading-none">
                          92%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">
                        S2
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                          89%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">
                        S3
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                        <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">
                          90%
                        </span>
                      </div>
                      <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">
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
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Header with tabs */}
          <div className="mb-3 lg:mb-5 flex justify-between items-start">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1 lg:mb-2">
                Opérations -{" "}
                {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
              </h1>
              <div className="flex flex-wrap items-center justify-start gap-2 lg:gap-4">
                {activeTab === "weekly" && (
                  <div className="rounded-lg bg-slate-800/90 border border-slate-700/50 px-3 py-1.5 text-xs lg:text-sm font-medium text-gray-300">
                    <span className="font-normal">Semaine actuelle :</span>
                    <span className="font-semibold text-white ml-1">S10</span>
                  </div>
                )}
                <div className="rounded-lg bg-slate-800/90 border border-slate-700/50 px-3 py-1.5 text-xs lg:text-sm font-medium text-gray-300">
                  <span className="font-normal">Mois en cours :</span>
                  <span className="font-semibold text-white ml-1">M12</span>
                </div>
              </div>
            </div>
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Conditional Content Rendering */}
          {activeTab === "weekly" ? (
            <WeeklyOperations />
          ) : (
            <MonthlyOperations />
          )}
        </div>
      </main>
    );
  }

  if (category.id === "quality") {
    // Weekly Quality Component - Based on weekly.html design
    const WeeklyQuality = () => {
      return (
        <div className="max-w-[1400px] mx-auto">
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
                  <div className="text-6xl md:text-7xl font-bold text-white mb-2 leading-none">12</div>
                  <div className="text-sm text-red-400 font-medium mb-1">+2 vs Sem. Préc.</div>
                  <div className="text-sm text-gray-300">
                    vs Target (8) <span className="text-emerald-400 font-semibold">↑ +50%</span>
                  </div>
                </div>

                {/* Weekly Circles - All in one row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* S-1 */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">S-1</span>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg" style={{background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"}}>
                      <span className="text-2xl md:text-3xl font-bold text-white">12</span>
                    </div>
                  </div>

                  {/* S-2 */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">S-2</span>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg" style={{background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"}}>
                      <span className="text-2xl md:text-3xl font-bold text-white">8</span>
                    </div>
                  </div>

                  {/* S-3 */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">S-3</span>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg" style={{background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"}}>
                      <span className="text-2xl md:text-3xl font-bold text-white">15</span>
                    </div>
                  </div>

                  {/* S-4 */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">S-4</span>
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-lg" style={{background: "linear-gradient(135deg, #10b981 0%, #059669 100%)"}}>
                      <span className="text-2xl md:text-3xl font-bold text-white">10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Charts */}
              <div className="flex flex-col gap-4 border-l border-gray-700 pl-8">
                {/* Line Chart: Suivi des Réclamations */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Suivi des Réclamations</h3>
                  <svg viewBox="0 0 450 120" className="w-full max-w-md h-auto">
                    {/* Horizontal grid lines */}
                    <line x1="50" y1="95" x2="420" y2="95" stroke="#4b5563" strokeWidth="1"/>
                    
                    {/* X-axis labels */}
                    <text x="100" y="112" textAnchor="middle" fontSize="11" className="fill-gray-300">S-4</text>
                    <text x="200" y="112" textAnchor="middle" fontSize="11" className="fill-gray-300">S-3</text>
                    <text x="300" y="112" textAnchor="middle" fontSize="11" className="fill-gray-300">S-2</text>
                    <text x="400" y="112" textAnchor="middle" fontSize="11" className="fill-gray-300">S-1</text>
                    
                    {/* Line path */}
                    <polyline
                      points="100,25 200,50 300,15 400,35"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Data points */}
                    <circle cx="100" cy="25" r="5" fill="#06b6d4"/>
                    <circle cx="200" cy="50" r="5" fill="#06b6d4"/>
                    <circle cx="300" cy="15" r="5" fill="#06b6d4"/>
                    <circle cx="400" cy="35" r="5" fill="#06b6d4"/>
                  </svg>
                </div>

                {/* Bar Chart: Incidents par Zone */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Incidents par Zone</h3>
                  <svg viewBox="0 0 450 130" className="w-full max-w-md h-auto">
                    {/* Bars */}
                    <rect x="60" y="20" width="60" height="80" fill="#8b5cf6" rx="2"/>
                    <rect x="160" y="40" width="60" height="60" fill="#3b82f6" rx="2"/>
                    <rect x="260" y="40" width="60" height="60" fill="#06b6d4" rx="2"/>
                    <rect x="360" y="60" width="60" height="40" fill="#10b981" rx="2"/>
                    
                    {/* Values on top of bars */}
                    <text x="90" y="14" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">4</text>
                    <text x="190" y="34" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">3</text>
                    <text x="290" y="34" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">3</text>
                    <text x="390" y="54" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">2</text>
                    
                    {/* Base line */}
                    <line x1="40" y1="100" x2="440" y2="100" stroke="#4b5563" strokeWidth="1.5"/>
                    
                    {/* Labels */}
                    <text x="90" y="118" textAnchor="middle" fontSize="11" className="fill-gray-200">Zone A</text>
                    <text x="190" y="118" textAnchor="middle" fontSize="11" className="fill-gray-200">Zone B</text>
                    <text x="290" y="118" textAnchor="middle" fontSize="11" className="fill-gray-200">Zone C</text>
                    <text x="390" y="118" textAnchor="middle" fontSize="11" className="fill-gray-200">Zone D</text>
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
                  <div className="text-6xl md:text-7xl font-bold text-white mb-2 leading-none">92%</div>
                  <div className="text-sm text-red-400 font-medium mb-1">-5% vs Sem. Préc.</div>
                  <div className="text-sm text-gray-300">
                    vs Target (90%) <span className="text-emerald-400 font-semibold">↑ +1.5%</span>
                  </div>
                </div>

                {/* Weekly Progress Circles - All in one row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* S-1: 97% */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">S-1</span>
                    <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="45" fill="none" stroke="#374151" strokeWidth="11"/>
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="11"
                        strokeDasharray="283"
                        strokeDashoffset="8.49"
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                      <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" className="fill-white">97%</text>
                    </svg>
                  </div>

                  {/* S-2: 90% */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">S-2</span>
                    <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="45" fill="none" stroke="#374151" strokeWidth="11"/>
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="11"
                        strokeDasharray="283"
                        strokeDashoffset="28.3"
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                      <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" className="fill-white">90%</text>
                    </svg>
                  </div>

                  {/* S-3: 95% */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">S-3</span>
                    <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="45" fill="none" stroke="#374151" strokeWidth="11"/>
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="11"
                        strokeDasharray="283"
                        strokeDashoffset="14.15"
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                      <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" className="fill-white">95%</text>
                    </svg>
                  </div>

                  {/* S-4: 88% */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-200 font-semibold mb-2">S-4</span>
                    <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="45" fill="none" stroke="#374151" strokeWidth="11"/>
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="11"
                        strokeDasharray="283"
                        strokeDashoffset="33.96"
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                      <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" className="fill-white">88%</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column: Line Chart */}
              <div className="border-l border-gray-700 pl-8 flex items-center">
                <svg viewBox="0 0 450 240" className="w-full h-auto">
                  {/* Horizontal grid line */}
                  <line x1="50" y1="200" x2="420" y2="200" stroke="#4b5563" strokeWidth="1"/>
                  
                  {/* X-axis labels */}
                  <text x="100" y="225" textAnchor="middle" fontSize="12" className="fill-gray-300">S-4</text>
                  <text x="200" y="225" textAnchor="middle" fontSize="12" className="fill-gray-300">S-3</text>
                  <text x="300" y="225" textAnchor="middle" fontSize="12" className="fill-gray-300">S-2</text>
                  <text x="400" y="225" textAnchor="middle" fontSize="12" className="fill-gray-300">S-1</text>
                  
                  {/* Line path */}
                  <polyline
                    points="100,60 200,130 300,80 400,110"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Data points */}
                  <circle cx="100" cy="60" r="6" fill="#10b981"/>
                  <circle cx="200" cy="130" r="6" fill="#10b981"/>
                  <circle cx="300" cy="80" r="6" fill="#10b981"/>
                  <circle cx="400" cy="110" r="6" fill="#10b981"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    };

    // Monthly Quality Component - Based on monthly.html design
    const MonthlyQuality = () => {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* PPM & Scrap Client Card */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
            <h2 className="text-sm font-semibold text-white mb-4">PPM & Scrap Client</h2>
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-4xl font-bold text-white">2,34...</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-400">Scrap Client</span>
                  <span className="text-red-400 text-sm">↑</span>
                  <span className="text-red-400 text-sm font-medium">+12% vs M-1</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-semibold text-lg">+250€</div>
                <div className="text-xs text-gray-400">vs Mois<br/>Préc.</div>
              </div>
            </div>
            
            {/* Charts Container */}
            <div className="flex items-end gap-4 mt-6">
              {/* Line Chart */}
              <div className="flex-1">
                <svg viewBox="0 0 160 80" className="w-full h-20">
                  {/* Grid lines */}
                  <line x1="0" y1="70" x2="160" y2="70" stroke="#4b5563" strokeWidth="1"/>
                  
                  {/* Line path */}
                  <polyline 
                    points="10,35 50,45 90,20 130,45" 
                    fill="none" 
                    stroke="#2563eb" 
                    strokeWidth="2"
                  />
                  
                  {/* Data points */}
                  <circle cx="10" cy="35" r="4" fill="#2563eb"/>
                  <circle cx="50" cy="45" r="4" fill="#2563eb"/>
                  <circle cx="90" cy="20" r="4" fill="#2563eb"/>
                  <circle cx="130" cy="45" r="4" fill="#2563eb"/>
                  
                  {/* Values */}
                  <text x="10" y="28" textAnchor="middle" fill="#ffffff" fontSize="10">10</text>
                  <text x="50" y="38" textAnchor="middle" fill="#ffffff" fontSize="10">8</text>
                  <text x="90" y="13" textAnchor="middle" fill="#ffffff" fontSize="10">15</text>
                  <text x="130" y="38" textAnchor="middle" fill="#ffffff" fontSize="10">8</text>
                  
                  {/* Labels */}
                  <text x="10" y="78" textAnchor="middle" fill="#9ca3af" fontSize="9">S-4</text>
                  <text x="50" y="78" textAnchor="middle" fill="#9ca3af" fontSize="9">S-3</text>
                  <text x="90" y="78" textAnchor="middle" fill="#9ca3af" fontSize="9">S-2</text>
                  <text x="130" y="78" textAnchor="middle" fill="#9ca3af" fontSize="9">S-1</text>
                </svg>
              </div>
              
              {/* Bar Chart */}
              <div className="flex items-end gap-2 h-20">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-300 mb-1">65</span>
                  <div className="w-8 bg-blue-500 rounded-t" style={{height: "60px"}}></div>
                  <span className="text-xs text-gray-400 mt-1">M-4</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-300 mb-1">52</span>
                  <div className="w-8 bg-blue-500 rounded-t" style={{height: "48px"}}></div>
                  <span className="text-xs text-gray-400 mt-1">M-3</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-300 mb-1">48</span>
                  <div className="w-8 bg-blue-500 rounded-t" style={{height: "44px"}}></div>
                  <span className="text-xs text-gray-400 mt-1">M-2</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-300 mb-1">45</span>
                  <div className="w-8 bg-blue-500 rounded-t" style={{height: "42px"}}></div>
                  <span className="text-xs text-gray-400 mt-1">M-1</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Taux de Conformité aux Audits Card */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
            <h2 className="text-sm font-semibold text-white mb-6">Taux de Conformité aux Audits</h2>
            
            <div className="flex justify-center gap-8">
              {/* Completion Donut */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="10"
                      strokeDasharray="251.33"
                      strokeDashoffset="25.13"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">90%</span>
                  </div>
                </div>
                <span className="text-sm text-gray-300 mt-3">Completion</span>
                <span className="text-green-400 text-sm font-medium mt-1">+5%</span>
                <span className="text-xs text-gray-400">vs Mois Préc.</span>
              </div>
              
              {/* Compliance Donut */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                    <circle 
                      cx="50" cy="50" r="40" 
                      fill="none" 
                      stroke="#f97316" 
                      strokeWidth="10"
                      strokeDasharray="251.33"
                      strokeDashoffset="37.7"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">85%</span>
                  </div>
                </div>
                <span className="text-sm text-gray-300 mt-3">Compliance</span>
                <span className="text-red-400 text-sm font-medium mt-1">-2%</span>
                <span className="text-xs text-gray-400">vs Mois Préc.</span>
              </div>
            </div>
          </div>
          
          {/* Score Cards Clients Card */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
            <h2 className="text-sm font-semibold text-white mb-2">Score Cards Clients</h2>
            
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold text-white">84.2%</span>
              <span className="bg-green-500/20 text-green-400 text-sm px-2 py-0.5 rounded">+1.2%</span>
              <span className="text-xs text-gray-400">vs Mois Préc.</span>
            </div>
            
            {/* Client Bars */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-24">Client Alpha</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{width: "95%"}}></div>
                </div>
                <span className="text-sm font-medium text-white w-10 text-right">95%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-24">Client Beta</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{width: "82%"}}></div>
                </div>
                <span className="text-sm font-medium text-white w-10 text-right">82%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-24">Client Gamma</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{width: "88%"}}></div>
                </div>
                <span className="text-sm font-medium text-white w-10 text-right">88%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-24">Client Delta</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{width: "91%"}}></div>
                </div>
                <span className="text-sm font-medium text-white w-10 text-right">91%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 w-24">Client Epsilon</span>
                <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{width: "65%"}}></div>
                </div>
                <span className="text-sm font-medium text-white w-10 text-right">65%</span>
              </div>
            </div>
          </div>
          
          {/* Incidents / Accidents de Travail Card */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer lg:col-span-1">
            <h2 className="text-sm font-semibold text-white mb-4">Incidents / Accidents de Travail</h2>
            
            <div className="flex items-start gap-4 mb-4">
              <span className="text-5xl font-bold text-white">1</span>
              <div>
                <span className="bg-green-500/20 text-green-400 text-sm px-2 py-0.5 rounded">-4</span>
                <div className="text-xs text-gray-400 mt-1">vs Mois Préc.</div>
              </div>
            </div>
            
            {/* Incidents Bar Chart */}
            <div className="flex items-end justify-between gap-4 mb-6 px-2">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 bg-blue-500 rounded-t flex items-center justify-center text-white font-semibold py-2" style={{height: "70px"}}>6</div>
                </div>
                <span className="text-xs text-gray-500 mt-2">Jan</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 bg-blue-500 rounded-t flex items-center justify-center text-white font-semibold py-2" style={{height: "58px"}}>5</div>
                </div>
                <span className="text-xs text-gray-500 mt-2">Fév</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 bg-blue-400 rounded-t flex items-center justify-center text-white font-semibold py-2" style={{height: "35px"}}>2</div>
                </div>
                <span className="text-xs text-gray-500 mt-2">Mar</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-14 bg-blue-300 rounded-t flex items-center justify-center text-gray-700 font-semibold py-2" style={{height: "22px"}}>1</div>
                </div>
                <span className="text-xs text-gray-500 mt-2">Avr</span>
              </div>
            </div>
            
            {/* Jours Perdus Line Chart */}
            <div className="mt-4">
              <span className="text-sm text-gray-300 mb-2 block">Jours Perdus</span>
              <svg viewBox="0 0 200 70" className="w-full h-16">
                {/* Line path */}
                <polyline 
                  points="20,35 70,20 120,45 170,55" 
                  fill="none" 
                  stroke="#f59e0b" 
                  strokeWidth="2"
                />
                
                {/* Data points */}
                <circle cx="20" cy="35" r="4" fill="#f59e0b"/>
                <circle cx="70" cy="20" r="4" fill="#f59e0b"/>
                <circle cx="120" cy="45" r="4" fill="#f59e0b"/>
                <circle cx="170" cy="55" r="4" fill="#f59e0b"/>
                
                {/* Values */}
                <text x="20" y="28" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">12</text>
                <text x="70" y="13" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">15</text>
                <text x="120" y="38" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">8</text>
                <text x="170" y="48" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">5</text>
              </svg>
            </div>
          </div>
          
          {/* Suivi de l'Efficience Card */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer lg:col-span-2">
            <h2 className="text-sm font-semibold text-white mb-4">Suivi de l&apos;Efficience (mensuelle)</h2>
            
            <div className="flex flex-wrap items-start gap-4 mb-2">
              <span className="text-5xl font-bold text-white">92%</span>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <span className="bg-green-500/20 text-green-400 text-sm px-2 py-0.5 rounded">+1.5%</span>
                  <span className="text-xs text-gray-400">vs Sem. Préc.</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="bg-red-500/20 text-red-400 text-sm px-2 py-0.5 rounded">-5%</span>
                  <span className="text-xs text-gray-400">vs Prev Month.</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-gray-400">vs Target (90%)</span>
              <span className="text-green-400">↑</span>
              <span className="text-green-400 font-medium">+1.5%</span>
            </div>
            
            {/* Efficiency Line Chart */}
            <svg viewBox="0 0 400 120" className="w-full h-28">
              {/* Grid lines */}
              <line x1="40" y1="100" x2="380" y2="100" stroke="#4b5563" strokeWidth="1"/>
              <line x1="40" y1="60" x2="380" y2="60" stroke="#4b5563" strokeWidth="1" strokeDasharray="4"/>
              <line x1="40" y1="20" x2="380" y2="20" stroke="#4b5563" strokeWidth="1" strokeDasharray="4"/>
              
              {/* Line path */}
              <polyline 
                points="60,70 150,30 250,50 340,20" 
                fill="none" 
                stroke="#2563eb" 
                strokeWidth="2.5"
              />
              
              {/* Data points */}
              <circle cx="60" cy="70" r="5" fill="#2563eb"/>
              <circle cx="150" cy="30" r="5" fill="#2563eb"/>
              <circle cx="250" cy="50" r="5" fill="#2563eb"/>
              <circle cx="340" cy="20" r="5" fill="#2563eb"/>
              
              {/* Values */}
              <text x="60" y="60" textAnchor="middle" fill="#ffffff" fontSize="11">88%</text>
              <text x="150" y="20" textAnchor="middle" fill="#ffffff" fontSize="11">95%</text>
              <text x="250" y="40" textAnchor="middle" fill="#ffffff" fontSize="11">90%</text>
              <text x="340" y="10" textAnchor="middle" fill="#ffffff" fontSize="11">97%</text>
              
              {/* X-axis labels */}
              <text x="60" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">M-4</text>
              <text x="150" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">M-3</text>
              <text x="250" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">M-2</text>
              <text x="340" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">M-1</text>
            </svg>
          </div>
          
        </div>
      );
    };

    return (
      <main className="flex-1 overflow-hidden p-4 md:p-6">
        {/* Header with tabs */}
        <div className="max-w-[1400px] mx-auto mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Qualité - {activeTab === "weekly" ? "Hebdomadaire" : "Mensuel"}
            </h1>
            <p className="text-gray-100">
              {activeTab === "weekly" ? "Réclamations Client Affinées" : "Indicateurs de performance qualité"}
            </p>
          </div>
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        {activeTab === "weekly" ? <WeeklyQuality /> : <MonthlyQuality />}
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
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white dark:text-white">
                  Supply Chain - {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
                </h1>
                <p className="text-sm md:text-base lg:text-lg font-normal text-gray-400 dark:text-gray-400">
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
                  <div className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-200 bg-white p-4 md:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-start justify-between">
                      <p
                        className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white"
                      >
                        Rotation des Stocks
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-500 dark:text-gray-400"
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
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white"
                          >
                            22 <span className="text-3xl md:text-4xl lg:text-5xl font-bold">jours</span>
                          </p>
                          <div className="flex items-baseline gap-2">
                            <p
                              className="text-base md:text-lg lg:text-xl font-medium text-gray-600 dark:text-gray-400"
                            >
                              Target:
                            </p>
                            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">20 jours</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-2xl md:text-3xl lg:text-4xl font-bold">21</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
                            >
                              Avril
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-2xl md:text-3xl lg:text-4xl font-bold">19</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
                            >
                              Mars
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-warning/10 text-warning"
                            >
                              <span className="text-2xl md:text-3xl lg:text-4xl font-bold">24</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
                            >
                              Fév
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-2xl md:text-3xl lg:text-4xl font-bold">20</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
                            >
                              Jan
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-warning/10 text-warning"
                            >
                              <span className="text-2xl md:text-3xl lg:text-4xl font-bold">23</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
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
                    className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-200 bg-white p-4 md:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white"
                      >
                        Taux de Fiabilité des Stocks
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-500 dark:text-gray-400"
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
                            className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-warning"
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
                              className="text-base font-normal text-gray-600 dark:text-gray-400"
                            >
                              vs dernier mois
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full max-w-md flex-col gap-3 md:gap-4">
                          <div className="flex items-center gap-3 md:gap-4">
                            <p
                              className="w-24 md:w-28 lg:w-32 shrink-0 text-xs md:text-sm lg:text-base font-semibold text-gray-600 dark:text-gray-400"
                            >
                              Warehouse A
                            </p>
                            <div
                              className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700"
                            >
                              <div
                                className="h-full items-center justify-end rounded bg-primary pr-2 text-right text-sm font-bold text-white"
                                style={{ width: "98%" }}
                              >
                                98%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 md:gap-4">
                            <p
                              className="w-24 md:w-28 lg:w-32 shrink-0 text-xs md:text-sm lg:text-base font-semibold text-gray-600 dark:text-gray-400"
                            >
                              Warehouse B
                            </p>
                            <div
                              className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700"
                            >
                              <div
                                className="h-full items-center justify-end rounded bg-warning pr-2 text-right text-sm font-bold text-white"
                                style={{ width: "91%" }}
                              >
                                91%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 md:gap-4">
                            <p
                              className="w-24 md:w-28 lg:w-32 shrink-0 text-xs md:text-sm lg:text-base font-semibold text-gray-600 dark:text-gray-400"
                            >
                              Warehouse C
                            </p>
                            <div
                              className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700"
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
                    className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-200 bg-white p-4 md:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white"
                      >
                        Coût Logistique Total
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-500 dark:text-gray-400"
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
                            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white"
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
                              className="text-base font-normal text-gray-600 dark:text-gray-400"
                            >
                              vs last month
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-xl md:text-2xl lg:text-3xl font-bold">1.26</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
                            >
                              Avril
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-danger/10 text-danger"
                            >
                              <span className="text-xl md:text-2xl lg:text-3xl font-bold">1.31</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
                            >
                              Mars
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-danger/10 text-danger"
                            >
                              <span className="text-xl md:text-2xl lg:text-3xl font-bold">1.29</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
                            >
                              Fév
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-xl md:text-2xl lg:text-3xl font-bold">1.18</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
                            >
                              Jan
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div
                              className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/10 text-primary"
                            >
                              <span className="text-xl md:text-2xl lg:text-3xl font-bold">1.15</span>
                            </div>
                            <p
                              className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400"
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
                    className="flex flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-200 bg-white p-4 md:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-sm md:text-base lg:text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Taux de Service Client / OTIF
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-500 dark:text-gray-400"
                      >
                        trending_up
                      </span>
                    </div>
                    <div className="flex flex-wrap items-end gap-3 md:gap-4">
                      <p
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white"
                      >
                        96%
                      </p>
                      <div className="flex items-center gap-1 pb-2">
                        <span className="material-symbols-outlined text-sm text-primary">
                          arrow_upward
                        </span>
                        <p className="text-2xl font-extrabold text-primary">+1.0%</p>
                        <p
                          className="text-base font-normal text-gray-600 dark:text-gray-400"
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
                          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            95%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-white dark:bg-gray-900" />
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
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
                          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            97%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-white dark:bg-gray-900" />
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
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
                          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            96%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-white dark:bg-gray-900" />
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
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
                          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            98%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-white dark:bg-gray-900" />
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
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
                          <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            97%
                          </span>
                          <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-white dark:bg-gray-900" />
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            W5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-200 bg-white p-4 md:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-900"
                  >
                    <div className="flex items-start justify-between">
                      <p
                        className="text-sm md:text-base lg:text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Taux de Service Fournisseurs OTIF
                      </p>
                      <span
                        className="material-symbols-outlined text-gray-500 dark:text-gray-400"
                      >
                        local_shipping
                      </span>
                    </div>
                    <div className="flex flex-wrap items-end gap-3 md:gap-4">
                      <p
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white"
                      >
                        96%
                      </p>
                      <div className="flex items-center gap-1 pb-1">
                        <span className="material-symbols-outlined text-sm text-danger">
                          arrow_downward
                        </span>
                        <p className="text-2xl font-extrabold text-danger">-0.5%</p>
                        <p
                          className="text-base font-normal text-gray-600 dark:text-gray-400"
                        >
                          vs last week
                        </p>
                      </div>
                    </div>
                    <div className="flex h-full w-full flex-col items-center justify-center pt-4">
                      <div className="flex w-full items-start justify-around">
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-info">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/20 text-warning dark:bg-warning/30">
                            <span className="text-2xl font-bold">94%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            W1
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-info">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="text-2xl font-bold">95%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            W2
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-info">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/20 text-warning dark:bg-warning/30">
                            <span className="text-2xl font-bold">93%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            W3
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-info">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="text-2xl font-bold">97%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            W4
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <p className="mb-1 text-xs font-semibold text-info">
                            Target: 95%
                          </p>
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <span className="text-2xl font-bold">96%</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            W5
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full flex flex-col gap-3 md:gap-4 lg:gap-6 rounded-lg border border-gray-200 bg-white p-4 md:p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-start justify-between">
                      <p className="text-sm md:text-base lg:text-lg font-medium text-gray-900 dark:text-white">
                        Fiabilité Client
                      </p>
                      <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
                        shield
                      </span>
                    </div>
                    <div className="flex h-full flex-grow items-center justify-center gap-6 md:gap-8 lg:gap-12">
                      <div className="flex flex-col items-center gap-2 md:gap-3">
                        <div className="flex h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 items-center justify-center rounded-full border-[8px] md:border-[10px] lg:border-[12px] border-primary/20 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/20">
                          <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
                            94%
                          </span>
                        </div>
                        <p className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                          Actuel
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-3 md:gap-4">
                        <p className="text-xs md:text-sm lg:text-base font-medium text-gray-600 dark:text-gray-400">
                          Historique Hebdomadaire
                        </p>
                        <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                              <span className="text-lg md:text-xl lg:text-2xl font-bold">92%</span>
                            </div>
                            <p className="text-xs md:text-sm lg:text-base font-medium text-gray-600 dark:text-gray-400">
                              W1
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                              <span className="text-lg md:text-xl lg:text-2xl font-bold">95%</span>
                            </div>
                            <p className="text-xs md:text-sm lg:text-base font-medium text-gray-600 dark:text-gray-400">
                              W2
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-warning/20 text-warning dark:bg-warning/30">
                              <span className="text-lg md:text-xl lg:text-2xl font-bold">88%</span>
                            </div>
                            <p className="text-xs md:text-sm lg:text-base font-medium text-gray-600 dark:text-gray-400">
                              W3
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 md:gap-2">
                            <div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                              <span className="text-lg md:text-xl lg:text-2xl font-bold">94%</span>
                            </div>
                            <p className="text-xs md:text-sm lg:text-base font-medium text-gray-600 dark:text-gray-400">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]  transition-transform duration-300 cursor-pointer">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm p-6 flex flex-col h-[450px]  transition-transform duration-300 cursor-pointer">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]  transition-transform duration-300 cursor-pointer">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]  transition-transform duration-300 cursor-pointer">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-4 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]  transition-transform duration-300 cursor-pointer">
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
          <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px]  transition-transform duration-300 cursor-pointer">
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
