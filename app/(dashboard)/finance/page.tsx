"use client"

import React, { useState } from "react"
import { TabSelector } from "@/components/ui/TabSelector"

type TabType = "weekly" | "monthly"

// Finance Dashboard Page - Can fetch data here
export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly")

  // Monthly KPI Dashboard Content
  const MonthlyDashboard = () => (
    <main className="flex-1">
      <div className="flex flex-col flex-grow gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
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
                    <circle className="fill-current text-yellow-400" cx="40" cy="88" r="4" />
                    <circle className="fill-current text-yellow-400" cx="120" cy="40" r="4" />
                    <circle className="fill-current text-yellow-400" cx="200" cy="60" r="4" />
                    <circle className="fill-current text-yellow-400" cx="280" cy="88" r="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
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
                  <text className="fill-current text-gray-500 text-xs" x="290" y="54">
                    Target
                  </text>
                  <polyline
                    className="stroke-current text-yellow-400"
                    fill="none"
                    points="40,88 120,68 200,78 280,68"
                    strokeWidth="2"
                  />
                  <circle className="fill-current text-yellow-400" cx="40" cy="88" r="4" />
                  <circle className="fill-current text-yellow-400" cx="120" cy="68" r="4" />
                  <circle className="fill-current text-yellow-400" cx="200" cy="78" r="4" />
                  <circle className="fill-current text-yellow-400" cx="280" cy="68" r="4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
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
                  <text className="fill-current text-gray-500 text-xs" x="290" y="84">
                    Target
                  </text>
                  <polyline
                    className="stroke-current text-yellow-400"
                    fill="none"
                    points="40,28 120,48 200,68 280,98"
                    strokeWidth="2"
                  />
                  <circle className="fill-current text-yellow-400" cx="40" cy="28" r="4" />
                  <circle className="fill-current text-yellow-400" cx="120" cy="48" r="4" />
                  <circle className="fill-current text-yellow-400" cx="200" cy="68" r="4" />
                  <circle className="fill-current text-yellow-400" cx="280" cy="98" r="4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )

  const WeeklyDashboard = () => (
    <main className="flex-1">
      <div className="flex flex-col flex-grow gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
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
                    <text className="fill-current text-gray-500 text-xs" x="290" y="24">
                      Target
                    </text>
                    <polyline
                      className="stroke-current text-yellow-400"
                      fill="none"
                      points="40,88 120,40 200,60 280,88"
                      strokeWidth="2"
                    />
                    <circle className="fill-current text-yellow-400" cx="40" cy="88" r="4" />
                    <circle className="fill-current text-yellow-400" cx="120" cy="40" r="4" />
                    <circle className="fill-current text-yellow-400" cx="200" cy="60" r="4" />
                    <circle className="fill-current text-yellow-400" cx="280" cy="88" r="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
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
                  <text className="fill-current text-gray-500 text-xs" x="290" y="54">
                    Target
                  </text>
                  <polyline
                    className="stroke-current text-yellow-400"
                    fill="none"
                    points="40,88 120,68 200,78 280,68"
                    strokeWidth="2"
                  />
                  <circle className="fill-current text-yellow-400" cx="40" cy="88" r="4" />
                  <circle className="fill-current text-yellow-400" cx="120" cy="68" r="4" />
                  <circle className="fill-current text-yellow-400" cx="200" cy="78" r="4" />
                  <circle className="fill-current text-yellow-400" cx="280" cy="68" r="4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-transform duration-300 cursor-pointer">
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
                  <text className="fill-current text-gray-500 text-xs" x="290" y="84">
                    Target
                  </text>
                  <polyline
                    className="stroke-current text-yellow-400"
                    fill="none"
                    points="40,28 120,48 200,68 280,98"
                    strokeWidth="2"
                  />
                  <circle className="fill-current text-yellow-400" cx="40" cy="28" r="4" />
                  <circle className="fill-current text-yellow-400" cx="120" cy="48" r="4" />
                  <circle className="fill-current text-yellow-400" cx="200" cy="68" r="4" />
                  <circle className="fill-current text-yellow-400" cx="280" cy="98" r="4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-5">
        {/* Tab Selector */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Indicateurs {activeTab === "monthly" ? "Mensuels" : "Hebdomadaires"}
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
  )
}
