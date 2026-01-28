"use client"

import React, { useState } from "react"
import { TabSelector } from "@/components/ui/TabSelector"

type TabType = "weekly" | "monthly"

// Operations Dashboard Page - Can fetch data here
export default function OperationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly")

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
              <svg className="h-full w-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200 100">
                <defs>
                  <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#34d399", stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: "#34d399", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path d="M 0 55 L 50 80 L 100 20 L 150 70 L 200 45" fill="none" stroke="#34d399" strokeWidth="2" />
                <path d="M 0 55 L 50 80 L 100 20 L 150 70 L 200 45 L 200 100 L 0 100 Z" fill="url(#grad1)" />
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
              <svg className="h-full w-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200 100">
                <defs>
                  <linearGradient id="grad2" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#f87171", stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: "#f87171", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path d="M 0 80 L 50 40 L 100 25 L 150 25 L 200 50" fill="none" stroke="#f87171" strokeWidth="2" />
                <path d="M 0 80 L 50 40 L 100 25 L 150 25 L 200 50 L 200 100 L 0 100 Z" fill="url(#grad2)" />
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
              <svg className="h-full w-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 200 100">
                <defs>
                  <linearGradient id="grad3" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#34d399", stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: "#34d399", stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
                <path d="M 0 20 L 50 15 L 100 50 L 150 25 L 200 35" fill="none" stroke="#34d399" strokeWidth="2" />
                <path d="M 0 20 L 50 15 L 100 50 L 150 25 L 200 35 L 200 100 L 0 100 Z" fill="url(#grad3)" />
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
                <p className="mt-0.5 lg:mt-1 text-[10px] lg:text-sm text-gray-400">Dépensé ce mois-ci</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-white/20 bg-slate-800/90 backdrop-blur-sm p-2 transition-transform duration-300 cursor-pointer">
            <h2 className="mb-1 lg:mb-3 text-center text-sm lg:text-lg font-semibold text-gray-300">
              Taux de Panne Machine
            </h2>
            <div className="flex items-center justify-center">
              <div className="relative h-16 w-16 lg:h-32 lg:w-32">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
                  <circle className="text-gray-700" cx="60" cy="60" fill="transparent" r="54" stroke="currentColor" strokeWidth="12" />
                  <circle className="text-yellow-500" cx="60" cy="60" fill="transparent" r="54" stroke="currentColor" strokeDasharray="339.292" strokeDashoffset="291.791" strokeLinecap="round" strokeWidth="12" />
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
  )

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
                <span className="text-[9px] lg:text-xs text-gray-400">Variation vs semaine précédente</span>
                <div className="flex items-center text-sm text-green-500 gap-0.5">
                  <span className="material-symbols-outlined text-xs lg:text-base">arrow_downward</span>
                  <p className="text-base lg:text-lg font-semibold">-0.3%</p>
                </div>
              </div>
            </div>
            <div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
              <div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
                <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" strokeWidth="3" viewBox="0 0 200 80">
                  <defs>
                    <linearGradient id="gradient1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path className="stroke-dashed stroke-gray-500" d="M 0 40 L 200 40" strokeDasharray="4 4" />
                  <path className="stroke-blue-500" d="M 0 20 L 66 60 L 132 30 L 200 50" />
                  <path d="M 0 20 L 66 60 L 132 30 L 200 50 L 200 80 L 0 80 Z" fill="url(#gradient1)" />
                </svg>
                <div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">Target</div>
              </div>
              <div className="mt-0.5 lg:mt-2 flex justify-between gap-1 lg:gap-2">
                <div className="flex flex-col items-center gap-0.5 lg:gap-1">
                  <div className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                    <span className="text-[10px] lg:text-xs font-bold text-white leading-none">2.2%</span>
                  </div>
                  <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S1</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                    <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">2.8%</span>
                  </div>
                  <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S2</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                    <span className="text-[10px] lg:text-xs font-bold text-white leading-none">2.3%</span>
                  </div>
                  <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S3</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                    <span className="text-[10px] lg:text-xs font-bold text-white leading-none">2.5%</span>
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
              <p className="flex items-center text-2xl lg:text-3xl font-bold text-red-500">1.68%</p>
              <div className="flex flex-col items-start gap-0">
                <span className="text-[9px] lg:text-[10px] text-gray-400">Variation vs semaine précédente</span>
                <div className="flex items-center text-sm text-red-500 gap-0.5">
                  <p className="text-base lg:text-lg font-semibold">+0.2%</p>
                </div>
              </div>
            </div>
            <div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
              <div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
                <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" strokeWidth="3" viewBox="0 0 200 80">
                  <defs>
                    <linearGradient id="gradient2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path className="stroke-dashed stroke-gray-500" d="M 0 40 L 200 40" strokeDasharray="4 4" />
                  <path className="stroke-blue-500" d="M 0 60 L 66 20 L 132 50 L 200 30" />
                  <path d="M 0 60 L 66 20 L 132 50 L 200 30 L 200 80 L 0 80 Z" fill="url(#gradient2)" />
                </svg>
                <div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">Target</div>
              </div>
              <div className="mt-0.5 flex justify-between gap-1">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                    <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">1.75%</span>
                  </div>
                  <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S1</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                    <span className="text-[10px] lg:text-xs font-bold text-white leading-none">1.48%</span>
                  </div>
                  <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S2</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                    <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">1.62%</span>
                  </div>
                  <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S3</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                    <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">1.68%</span>
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
                Taux de Scrap <span className="text-base lg:text-lg text-yellow-400">⚠️</span>
              </h2>
              <div className="flex items-center gap-1.5 lg:gap-3">
                <div className="relative flex h-16 w-16 lg:h-28 lg:w-28 flex-shrink-0 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle className="stroke-current text-gray-600" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
                    <circle className="stroke-current text-red-500 transition-all duration-500" cx="50" cy="50" fill="none" r="45" strokeDasharray="282.74" strokeDashoffset="277.63224" strokeLinecap="round" strokeWidth="8" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl lg:text-3xl font-bold text-white">1.5%</span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-0">
                  <span className="text-[9px] lg:text-[10px] text-gray-400">Variation vs semaine précédente</span>
                  <div className="flex items-center text-red-500 gap-0.5">
                    <span className="text-base lg:text-lg font-semibold">+0.1%</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
                <div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
                  <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" strokeWidth="3" viewBox="0 0 200 80">
                    <defs>
                      <linearGradient id="gradient3" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="stroke-dashed stroke-gray-500" d="M 0 50 L 200 50" strokeDasharray="4 4" />
                    <path className="stroke-blue-500" d="M 0 70 L 66 40 L 132 60 L 200 20" />
                    <path d="M 0 70 L 66 40 L 132 60 L 200 20 L 200 80 L 0 80 Z" fill="url(#gradient3)" />
                  </svg>
                  <div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">Target</div>
                </div>
                <div className="mt-0.5 flex justify-between gap-1">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">1.25%</span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S1</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-white leading-none">0.97%</span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S2</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">1.15%</span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S3</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">1.12%</span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S4</span>
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
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle className="stroke-current text-gray-600" cx="50" cy="50" fill="none" r="45" strokeWidth="8" />
                    <circle className="stroke-current text-blue-500 transition-all duration-500" cx="50" cy="50" fill="none" r="45" strokeDasharray="282.74" strokeDashoffset="28.274" strokeLinecap="round" strokeWidth="8" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl lg:text-3xl font-bold text-white">90%</span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-0">
                  <span className="text-[9px] lg:text-[10px] text-gray-400">Variation vs semaine précédente</span>
                  <div className="flex items-center text-green-500 gap-0.5">
                    <span className="material-symbols-outlined text-sm lg:text-base">arrow_upward</span>
                    <span className="text-base lg:text-lg font-semibold">+2%</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-col pt-1.5 lg:pt-3">
                <div className="relative h-10 lg:h-20 w-full mb-2 lg:mb-4">
                  <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" strokeWidth="3" viewBox="0 0 200 80">
                    <defs>
                      <linearGradient id="gradient4" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path className="stroke-dashed stroke-gray-500" d="M 0 25 L 200 25" strokeDasharray="4 4" />
                    <path className="stroke-blue-500" d="M 0 30 L 66 20 L 132 50 L 200 40" />
                    <path d="M 0 30 L 66 20 L 132 50 L 200 40 L 200 80 L 0 80 Z" fill="url(#gradient4)" />
                  </svg>
                  <div className="absolute -top-1.5 left-0 text-[9px] lg:text-[10px] text-gray-500">Target</div>
                </div>
                <div className="mt-0.5 flex justify-between gap-1">
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">88%</span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S1</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-white leading-none">92%</span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S2</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">89%</span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S3</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border-2 border-yellow-400 bg-slate-800 p-1">
                      <span className="text-[10px] lg:text-xs font-bold text-yellow-400 leading-none">90%</span>
                    </div>
                    <span className="font-bold text-gray-400 text-[9px] lg:text-[10px]">S4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )

  return (
    <main className="flex-1 overflow-hidden">
      <div className="p-3 sm:p-4 lg:p-6">
        {/* Header with tabs */}
        <div className="mb-3 lg:mb-5 flex justify-between items-start">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1 lg:mb-2">
              Factory Performance Overview - {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
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
        {activeTab === "weekly" ? <WeeklyOperations /> : <MonthlyOperations />}
      </div>
    </main>
  )
}
