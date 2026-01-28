"use client"

import React, { useState } from "react"
import { TabSelector } from "@/components/ui/TabSelector"

type TabType = "weekly" | "monthly"

// Quality Dashboard Page - Can fetch data here
export default function QualityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("weekly")

  // Weekly Quality Component
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
                  <line x1="50" y1="95" x2="420" y2="95" stroke="#4b5563" strokeWidth="1"/>
                  <text x="100" y="112" textAnchor="middle" fontSize="11" className="fill-gray-300">S-4</text>
                  <text x="200" y="112" textAnchor="middle" fontSize="11" className="fill-gray-300">S-3</text>
                  <text x="300" y="112" textAnchor="middle" fontSize="11" className="fill-gray-300">S-2</text>
                  <text x="400" y="112" textAnchor="middle" fontSize="11" className="fill-gray-300">S-1</text>
                  <polyline points="100,25 200,50 300,15 400,35" fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <rect x="60" y="20" width="60" height="80" fill="#8b5cf6" rx="2"/>
                  <rect x="160" y="40" width="60" height="60" fill="#3b82f6" rx="2"/>
                  <rect x="260" y="40" width="60" height="60" fill="#06b6d4" rx="2"/>
                  <rect x="360" y="60" width="60" height="40" fill="#10b981" rx="2"/>
                  <text x="90" y="14" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">4</text>
                  <text x="190" y="34" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">3</text>
                  <text x="290" y="34" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">3</text>
                  <text x="390" y="54" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-white">2</text>
                  <line x1="40" y1="100" x2="440" y2="100" stroke="#4b5563" strokeWidth="1.5"/>
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

              {/* Weekly Progress Circles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-200 font-semibold mb-2">S-1</span>
                  <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#374151" strokeWidth="11"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="11" strokeDasharray="283" strokeDashoffset="8.49" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                    <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" className="fill-white">97%</text>
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-200 font-semibold mb-2">S-2</span>
                  <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#374151" strokeWidth="11"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#8b5cf6" strokeWidth="11" strokeDasharray="283" strokeDashoffset="28.3" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                    <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" className="fill-white">90%</text>
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-200 font-semibold mb-2">S-3</span>
                  <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#374151" strokeWidth="11"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#06b6d4" strokeWidth="11" strokeDasharray="283" strokeDashoffset="14.15" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                    <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" className="fill-white">95%</text>
                  </svg>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-200 font-semibold mb-2">S-4</span>
                  <svg className="w-20 h-20 md:w-24 md:h-24" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#374151" strokeWidth="11"/>
                    <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="11" strokeDasharray="283" strokeDashoffset="33.96" strokeLinecap="round" transform="rotate(-90 60 60)"/>
                    <text x="60" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" className="fill-white">88%</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Line Chart */}
            <div className="border-l border-gray-700 pl-8 flex items-center">
              <svg viewBox="0 0 450 240" className="w-full h-auto">
                <line x1="50" y1="200" x2="420" y2="200" stroke="#4b5563" strokeWidth="1"/>
                <text x="100" y="225" textAnchor="middle" fontSize="12" className="fill-gray-300">S-4</text>
                <text x="200" y="225" textAnchor="middle" fontSize="12" className="fill-gray-300">S-3</text>
                <text x="300" y="225" textAnchor="middle" fontSize="12" className="fill-gray-300">S-2</text>
                <text x="400" y="225" textAnchor="middle" fontSize="12" className="fill-gray-300">S-1</text>
                <polyline points="100,60 200,130 300,80 400,110" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="100" cy="60" r="6" fill="#10b981"/>
                <circle cx="200" cy="130" r="6" fill="#10b981"/>
                <circle cx="300" cy="80" r="6" fill="#10b981"/>
                <circle cx="400" cy="110" r="6" fill="#10b981"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Monthly Quality Component
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
          <div className="flex items-end gap-4 mt-6">
            <div className="flex-1">
              <svg viewBox="0 0 160 80" className="w-full h-20">
                <line x1="0" y1="70" x2="160" y2="70" stroke="#4b5563" strokeWidth="1"/>
                <polyline points="10,35 50,45 90,20 130,45" fill="none" stroke="#2563eb" strokeWidth="2"/>
                <circle cx="10" cy="35" r="4" fill="#2563eb"/>
                <circle cx="50" cy="45" r="4" fill="#2563eb"/>
                <circle cx="90" cy="20" r="4" fill="#2563eb"/>
                <circle cx="130" cy="45" r="4" fill="#2563eb"/>
              </svg>
            </div>
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
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="251.33" strokeDashoffset="25.13" strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">90%</span>
                </div>
              </div>
              <span className="text-sm text-gray-300 mt-3">Completion</span>
              <span className="text-green-400 text-sm font-medium mt-1">+5%</span>
              <span className="text-xs text-gray-400">vs Mois Préc.</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="10" strokeDasharray="251.33" strokeDashoffset="37.7" strokeLinecap="round"/>
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
          <div className="flex items-end justify-between gap-4 mb-6 px-2">
            <div className="flex flex-col items-center">
              <div className="w-14 bg-blue-500 rounded-t flex items-center justify-center text-white font-semibold py-2" style={{height: "70px"}}>6</div>
              <span className="text-xs text-gray-500 mt-2">Jan</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 bg-blue-500 rounded-t flex items-center justify-center text-white font-semibold py-2" style={{height: "58px"}}>5</div>
              <span className="text-xs text-gray-500 mt-2">Fév</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 bg-blue-400 rounded-t flex items-center justify-center text-white font-semibold py-2" style={{height: "35px"}}>2</div>
              <span className="text-xs text-gray-500 mt-2">Mar</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 bg-blue-300 rounded-t flex items-center justify-center text-gray-700 font-semibold py-2" style={{height: "22px"}}>1</div>
              <span className="text-xs text-gray-500 mt-2">Avr</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-300 mb-2 block">Jours Perdus</span>
            <svg viewBox="0 0 200 70" className="w-full h-16">
              <polyline points="20,35 70,20 120,45 170,55" fill="none" stroke="#f59e0b" strokeWidth="2"/>
              <circle cx="20" cy="35" r="4" fill="#f59e0b"/>
              <circle cx="70" cy="20" r="4" fill="#f59e0b"/>
              <circle cx="120" cy="45" r="4" fill="#f59e0b"/>
              <circle cx="170" cy="55" r="4" fill="#f59e0b"/>
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
          <svg viewBox="0 0 400 120" className="w-full h-28">
            <line x1="40" y1="100" x2="380" y2="100" stroke="#4b5563" strokeWidth="1"/>
            <line x1="40" y1="60" x2="380" y2="60" stroke="#4b5563" strokeWidth="1" strokeDasharray="4"/>
            <line x1="40" y1="20" x2="380" y2="20" stroke="#4b5563" strokeWidth="1" strokeDasharray="4"/>
            <polyline points="60,70 150,30 250,50 340,20" fill="none" stroke="#2563eb" strokeWidth="2.5"/>
            <circle cx="60" cy="70" r="5" fill="#2563eb"/>
            <circle cx="150" cy="30" r="5" fill="#2563eb"/>
            <circle cx="250" cy="50" r="5" fill="#2563eb"/>
            <circle cx="340" cy="20" r="5" fill="#2563eb"/>
            <text x="60" y="60" textAnchor="middle" fill="#ffffff" fontSize="11">88%</text>
            <text x="150" y="20" textAnchor="middle" fill="#ffffff" fontSize="11">95%</text>
            <text x="250" y="40" textAnchor="middle" fill="#ffffff" fontSize="11">90%</text>
            <text x="340" y="10" textAnchor="middle" fill="#ffffff" fontSize="11">97%</text>
            <text x="60" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">M-4</text>
            <text x="150" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">M-3</text>
            <text x="250" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">M-2</text>
            <text x="340" y="115" textAnchor="middle" fill="#9ca3af" fontSize="11">M-1</text>
          </svg>
        </div>
      </div>
    )
  }

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
  )
}
