"use client";

import React, { useEffect, useState } from "react";
import { TabSelector } from "@/components/ui/TabSelector";

type TabType = "weekly" | "monthly";

interface WeeklyApiData {}

interface MonthlyApiData {}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupplyChainPage() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly");
  const [weeklyData, setWeeklyData] = useState<WeeklyApiData | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyApiData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/supplychain?type=${activeTab}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        const finalData = json?.data?.data ?? json?.data ?? json;
        if (activeTab === "weekly") {
          setWeeklyData(finalData || null);
        } else {
          setMonthlyData(finalData || null);
        }
      } catch (error) {
        console.error("Error fetching supply chain data:", error);
        if (activeTab === "weekly") {
          setWeeklyData(null);
        } else {
          setMonthlyData(null);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [activeTab]);

  if (loading) {
    return (
      <main className="flex-1 overflow-hidden bg-slate-900">
        <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-white text-lg">Chargement des données...</div>
        </div>
      </main>
    );
  }

  // ── Weekly view ──────────────────────────────────────────────────────────
  const WeeklyView = () => (
    <div>
      <div className="grid h-full flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6 rounded-lg border border-border-light dark:border-border-dark bg-panel-background-light dark:bg-panel-background-dark p-6">
          <div className="flex items-start justify-between">
            <p className="text-base font-medium text-text-light-primary dark:text-dark-primary">
              Taux de Service Client / OTIF
            </p>
            <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">
              trending_up
            </span>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <p className="text-6xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary">
              96%
            </p>
            <div className="flex items-center gap-1 pb-2">
              <span className="material-symbols-outlined text-sm text-primary">
                arrow_upward
              </span>
              <p className="text-2xl font-extrabold text-primary">+1.0%</p>
              <p className="text-base font-normal text-text-light-secondary dark:text-dark-secondary">
                vs last week
              </p>
            </div>
          </div>
          <div className="relative h-[180px] w-full pt-4">
            <div className="target-line" style={{ bottom: "95%" }}></div>
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
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  95%
                </span>
                <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-panel-background-light dark:bg-panel-background-dark"></div>
                <p className="text-sm font-bold text-text-light-secondary dark:text-dark-secondary">
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
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  97%
                </span>
                <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-panel-background-light dark:bg-panel-background-dark"></div>
                <p className="text-sm font-bold text-text-light-secondary dark:text-dark-secondary">
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
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  96%
                </span>
                <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-panel-background-light dark:bg-panel-background-dark"></div>
                <p className="text-sm font-bold text-text-light-secondary dark:text-dark-secondary">
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
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  98%
                </span>
                <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-panel-background-light dark:bg-panel-background-dark"></div>
                <p className="text-sm font-bold text-text-light-secondary dark:text-dark-secondary">
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
                <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  97%
                </span>
                <div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-panel-background-light dark:bg-panel-background-dark"></div>
                <p className="text-sm font-bold text-text-light-secondary dark:text-dark-secondary">
                  W5
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-lg border border-border-light dark:border-border-dark bg-panel-background-light dark:bg-panel-background-dark p-6">
          <div className="flex items-start justify-between">
            <p className="text-base font-medium text-text-light-primary dark:text-dark-primary">
              Taux de Service Fournisseurs OTIF
            </p>
            <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">
              local_shipping
            </span>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <p className="text-5xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary">
              96%
            </p>
            <div className="flex items-center gap-1 pb-1">
              <span className="material-symbols-outlined text-sm text-danger">
                arrow_downward
              </span>
              <p className="text-2xl font-extrabold text-danger">-0.5%</p>
              <p className="text-base font-normal text-text-light-secondary dark:text-dark-secondary">
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
                <p className="mt-2 text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
                  W1
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="mb-1 text-xs font-semibold text-info">
                  Target: 95%
                </p>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                  <span className="text-2xl font-bold">95%</span>
                </div>
                <p className="mt-2 text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
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
                <p className="mt-2 text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
                  W3
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="mb-1 text-xs font-semibold text-info">
                  Target: 95%
                </p>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                  <span className="text-2xl font-bold">97%</span>
                </div>
                <p className="mt-2 text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
                  W4
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="mb-1 text-xs font-semibold text-info">
                  Target: 95%
                </p>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                  <span className="text-2xl font-bold">96%</span>
                </div>
                <p className="mt-2 text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
                  W5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-full flex flex-col gap-4 rounded-lg border border-border-light bg-panel-background-light p-6 dark:border-border-dark dark:bg-panel-background-dark">
        <div className="flex items-start justify-between">
          <p className="text-base font-medium text-text-light-primary dark:text-dark-primary">
            Fiabilité Client
          </p>
          <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">
            shield
          </span>
        </div>
        <div className="flex h-full flex-grow items-center justify-center gap-12">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-primary/20 bg-primary/10 text-primary dark:border-primary/30 dark:bg-primary/20">
              <span className="text-6xl font-extrabold tracking-tighter">
                94%
              </span>
            </div>
            <p className="text-lg font-semibold text-text-light-primary dark:text-dark-primary">
              Actuel
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
              Historique Hebdomadaire
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                  <span className="text-2xl font-bold">92%</span>
                </div>
                <p className="text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
                  W1
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                  <span className="text-2xl font-bold">95%</span>
                </div>
                <p className="text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
                  W2
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/20 text-warning dark:bg-warning/30">
                  <span className="text-2xl font-bold">88%</span>
                </div>
                <p className="text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
                  W3
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary dark:bg-primary/30">
                  <span className="text-2xl font-bold">94%</span>
                </div>
                <p className="text-sm font-medium text-text-light-secondary dark:text-dark-secondary">
                  W4
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Monthly view ─────────────────────────────────────────────────────────
  const MonthlyView = () => (
    <div className="flex flex-col gap-6">
      <div className="flex h-full flex-col gap-6 rounded-lg border border-border-light bg-white p-6 dark:border-border-dark dark:bg-background-dark">
        <div className="flex items-start justify-between">
          <p className="text-lg font-bold text-text-light-primary dark:text-dark-primary">
            Rotation des Stocks
          </p>
          <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">
            inventory
          </span>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="flex flex-col justify-center gap-10 py-4 lg:col-span-3">
            <div>
              <p className="text-7xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary">
                22 <span className="text-5xl font-bold">jours</span>
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-medium text-text-light-secondary dark:text-dark-secondary">
                  Target:
                </p>
                <p className="text-3xl font-bold text-primary">20 jours</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-4xl font-bold">21</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Avril
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-4xl font-bold">19</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Mars
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/10 text-warning">
                  <span className="text-4xl font-bold">24</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Fév
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-4xl font-bold">20</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Jan
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/10 text-warning">
                  <span className="text-4xl font-bold">23</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Déc
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
            <div className="h-20 w-full max-w-lg">
              <svg
                className="h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 40"
              >
                <line
                  fill="none"
                  stroke="#3182CE"
                  stroke-dasharray="4,4"
                  stroke-width="0.5"
                  x1="0"
                  x2="100"
                  y1="20"
                  y2="20"
                ></line>
                <polyline
                  fill="none"
                  points="5,15 28.75,25 52.5,10 76.25,30 100,20"
                  stroke="#DD6B20"
                  stroke-width="1"
                ></polyline>
                <circle cx="5" cy="15" fill="#DD6B20" r="1.5"></circle>
                <circle cx="28.75" cy="25" fill="#DD6B20" r="1.5"></circle>
                <circle cx="52.5" cy="10" fill="#DD6B20" r="1.5"></circle>
                <circle cx="76.25" cy="30" fill="#DD6B20" r="1.5"></circle>
                <circle cx="100" cy="20" fill="#DD6B20" r="1.5"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-6 rounded-lg border border-border-light bg-white p-6 dark:border-border-dark dark:bg-background-dark">
        <div className="flex items-start justify-between">
          <p className="text-lg font-bold text-text-light-primary dark:text-dark-primary">
            Taux de Fiabilité des Stocks
          </p>
          <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">
            published_with_changes
          </span>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="flex flex-col items-center justify-center gap-6 py-4 lg:col-span-3">
            <div className="flex flex-col items-center">
              <p className="text-8xl font-extrabold tracking-tighter text-warning">
                94%
              </p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg text-primary">
                  arrow_upward
                </span>
                <p className="text-2xl font-extrabold text-primary">+1%</p>
                <p className="text-base font-normal text-text-light-secondary dark:text-dark-secondary">
                  vs dernier mois
                </p>
              </div>
            </div>
            <div className="flex w-full max-w-md flex-col gap-4">
              <div className="flex items-center gap-4">
                <p className="w-28 shrink-0 text-sm font-semibold text-text-light-secondary dark:text-dark-secondary">
                  Warehouse A
                </p>
                <div className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full items-center justify-end rounded bg-primary pr-2 text-right text-sm font-bold text-white"
                    style={{ width: "98%" }}
                  >
                    98%
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="w-28 shrink-0 text-sm font-semibold text-text-light-secondary dark:text-dark-secondary">
                  Warehouse B
                </p>
                <div className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full items-center justify-end rounded bg-warning pr-2 text-right text-sm font-bold text-white"
                    style={{ width: "91%" }}
                  >
                    91%
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="w-28 shrink-0 text-sm font-semibold text-text-light-secondary dark:text-dark-secondary">
                  Warehouse C
                </p>
                <div className="h-6 w-full rounded bg-gray-200 dark:bg-gray-700">
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
          <div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
            <div className="h-20 w-full max-w-lg">
              <svg
                className="h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 40"
              >
                <line
                  fill="none"
                  stroke="#3182CE"
                  stroke-dasharray="4,4"
                  stroke-width="0.5"
                  x1="0"
                  x2="100"
                  y1="20"
                  y2="20"
                ></line>
                <polyline
                  fill="none"
                  points="5,25 28.75,10 52.5,25 76.25,15 100,20"
                  stroke="#DD6B20"
                  stroke-width="1"
                ></polyline>
                <circle cx="5" cy="25" fill="#DD6B20" r="1.5"></circle>
                <circle cx="28.75" cy="10" fill="#DD6B20" r="1.5"></circle>
                <circle cx="52.5" cy="25" fill="#DD6B20" r="1.5"></circle>
                <circle cx="76.25" cy="15" fill="#DD6B20" r="1.5"></circle>
                <circle cx="100" cy="20" fill="#DD6B20" r="1.5"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full flex-col gap-6 rounded-lg border border-border-light bg-white p-6 dark:border-border-dark dark:bg-background-dark">
        <div className="flex items-start justify-between">
          <p className="text-lg font-bold text-text-light-primary dark:text-dark-primary">
            Coût Logistique Total
          </p>
          <span className="material-symbols-outlined text-text-light-secondary dark:text-dark-secondary">
            local_shipping
          </span>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="flex flex-col justify-center gap-10 py-4 lg:col-span-3">
            <div>
              <p className="text-7xl font-extrabold tracking-tighter text-text-light-primary dark:text-dark-primary">
                €1.2M
              </p>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-lg text-primary">
                  arrow_downward
                </span>
                <p className="text-2xl font-extrabold text-primary">-5%</p>
                <p className="text-base font-normal text-text-light-secondary dark:text-dark-secondary">
                  vs last month
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-3xl font-bold">1.26</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Avril
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-danger/10 text-danger">
                  <span className="text-3xl font-bold">1.31</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Mars
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-danger/10 text-danger">
                  <span className="text-3xl font-bold">1.29</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Fév
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-3xl font-bold">1.18</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Jan
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-3xl font-bold">1.15</span>
                </div>
                <p className="text-sm text-text-light-secondary dark:text-dark-secondary">
                  Déc
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
            <div className="h-20 w-full max-w-lg">
              <svg
                className="h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 40"
              >
                <line
                  fill="none"
                  stroke="#3182CE"
                  stroke-dasharray="4,4"
                  stroke-width="0.5"
                  x1="0"
                  x2="100"
                  y1="20"
                  y2="20"
                ></line>
                <polyline
                  fill="none"
                  points="5,20 28.75,30 52.5,10 76.25,15 100,25"
                  stroke="#DD6B20"
                  stroke-width="1"
                ></polyline>
                <circle cx="5" cy="20" fill="#DD6B20" r="1.5"></circle>
                <circle cx="28.75" cy="30" fill="#DD6B20" r="1.5"></circle>
                <circle cx="52.5" cy="10" fill="#DD6B20" r="1.5"></circle>
                <circle cx="76.25" cy="15" fill="#DD6B20" r="1.5"></circle>
                <circle cx="100" cy="25" fill="#DD6B20" r="1.5"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="flex-1 overflow-hidden bg-slate-900">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex w-full flex-col gap-6">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white">
                Supply Chain –{" "}
                {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
              </h1>
              <p className="text-sm md:text-base font-normal text-gray-400">
                {activeTab === "monthly"
                  ? "Données mensuelles"
                  : "Données hebdomadaire"}
              </p>
            </div>
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content */}
          {activeTab === "monthly" ? <MonthlyView /> : <WeeklyView />}
        </div>
      </div>
    </main>
  );
}
