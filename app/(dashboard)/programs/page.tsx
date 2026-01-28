"use client"

import React from "react"

// Programs Dashboard Page - Can fetch data here
export default function ProgramsPage() {
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
          <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col">
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
                    strokeWidth="2"
                  ></polyline>
                  <polyline
                    className="stroke-[#6B7280]"
                    points="0 20, 320 20"
                    strokeWidth="2"
                  ></polyline>
                  <circle className="fill-[#FDB913]" cx="0" cy="50" r="4"></circle>
                  <text className="fill-[#FDB913] text-[10px] font-bold" x="6" y="54">-1.5%</text>
                  <circle className="fill-[#6B7280]" cx="0" cy="20" r="4"></circle>
                  <circle className="fill-[#40E0D0]" cx="120" cy="10" r="4"></circle>
                  <circle className="fill-[#6B7280]" cx="120" cy="20" r="4"></circle>
                  <circle className="fill-[#FDB913]" cx="220" cy="70" r="4"></circle>
                  <text className="fill-[#FDB913] text-[10px] font-bold" x="226" y="74">-2.5%</text>
                  <circle className="fill-[#6B7280]" cx="220" cy="20" r="4"></circle>
                  <circle className="fill-[#40E0D0]" cx="320" cy="-10" r="4"></circle>
                  <circle className="fill-[#6B7280]" cx="320" cy="20" r="4"></circle>
                </g>
              </svg>
              <div className="flex justify-around mt-2">
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-1</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-2</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-3</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-4</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col">
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
                  <polyline className="stroke-[#40E0D0]" points="0 80, 120 70, 220 40, 320 60" strokeWidth="2"></polyline>
                  <polyline className="stroke-[#6B7280]" points="0 50, 320 50" strokeWidth="2"></polyline>
                  <circle className="fill-[#FDB913]" cx="0" cy="80" r="4"></circle>
                  <text className="fill-[#FDB913] text-[10px] font-bold" x="6" y="84">-0.8%</text>
                  <circle className="fill-[#6B7280]" cx="0" cy="50" r="4"></circle>
                  <circle className="fill-[#FDB913]" cx="120" cy="70" r="4"></circle>
                  <text className="fill-[#FDB913] text-[10px] font-bold" x="126" y="74">-0.5%</text>
                  <circle className="fill-[#6B7280]" cx="120" cy="50" r="4"></circle>
                  <circle className="fill-[#40E0D0]" cx="220" cy="40" r="4"></circle>
                  <circle className="fill-[#6B7280]" cx="220" cy="50" r="4"></circle>
                  <circle className="fill-[#FDB913]" cx="320" cy="60" r="4"></circle>
                  <text className="fill-[#FDB913] text-[10px] font-bold" x="288" y="64">-1.0%</text>
                  <circle className="fill-[#6B7280]" cx="320" cy="50" r="4"></circle>
                </g>
              </svg>
              <div className="flex justify-around mt-2">
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-1</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-2</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-3</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-4</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col">
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
                  <polyline className="stroke-[#40E0D0]" points="0 20, 120 40, 220 60, 320 80" strokeWidth="2"></polyline>
                  <polyline className="stroke-[#6B7280]" points="0 30, 320 30" strokeWidth="2"></polyline>
                  <circle className="fill-[#40E0D0]" cx="0" cy="20" r="4"></circle>
                  <circle className="fill-[#6B7280]" cx="0" cy="30" r="4"></circle>
                  <circle className="fill-[#FDB913]" cx="120" cy="40" r="4"></circle>
                  <text className="fill-[#FDB913] text-[10px] font-bold" x="126" y="44">-2%</text>
                  <circle className="fill-[#6B7280]" cx="120" cy="30" r="4"></circle>
                  <circle className="fill-[#FDB913]" cx="220" cy="60" r="4"></circle>
                  <text className="fill-[#FDB913] text-[10px] font-bold" x="226" y="64">-5%</text>
                  <circle className="fill-[#6B7280]" cx="220" cy="30" r="4"></circle>
                  <circle className="fill-[#FDB913]" cx="320" cy="80" r="4"></circle>
                  <text className="fill-[#FDB913] text-[10px] font-bold" x="294" y="84">-10%</text>
                  <circle className="fill-[#6B7280]" cx="320" cy="30" r="4"></circle>
                </g>
              </svg>
              <div className="flex justify-around mt-2">
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-1</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-2</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-3</p>
                <p className="text-gray-300 text-xs font-semibold leading-normal tracking-[0.015em]">W-4</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col">
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
                <line className="stroke-slate-500" strokeDasharray="4 2" strokeWidth="1.5" x1="20" x2="380" y1="50" y2="50"></line>
                <text className="fill-slate-400 text-[10px] font-semibold" dominantBaseline="middle" textAnchor="end" x="15" y="50">Budget</text>
                <polyline className="stroke-cyan-400" points="40 80, 140 60, 240 100, 340 70" strokeWidth="2.5"></polyline>
                <g>
                  <circle className="fill-cyan-400" cx="40" cy="80" r="5"></circle>
                  <circle className="stroke-cyan-400/50" cx="40" cy="80" r="8" strokeWidth="2"></circle>
                  <text className="fill-slate-100 text-[10px] font-bold" dominantBaseline="baseline" textAnchor="middle" x="40" y="72">€45k</text>
                  <text className="fill-emerald-400 text-[10px] font-medium" dominantBaseline="hanging" textAnchor="middle" x="40" y="88">+€5k</text>
                </g>
                <g>
                  <circle className="fill-cyan-400" cx="140" cy="60" r="5"></circle>
                  <circle className="stroke-cyan-400/50" cx="140" cy="60" r="8" strokeWidth="2"></circle>
                  <text className="fill-slate-100 text-[10px] font-bold" dominantBaseline="baseline" textAnchor="middle" x="140" y="52">€48k</text>
                  <text className="fill-emerald-400 text-[10px] font-medium" dominantBaseline="hanging" textAnchor="middle" x="140" y="68">+€2k</text>
                </g>
                <g>
                  <circle className="fill-cyan-400" cx="240" cy="100" r="5"></circle>
                  <circle className="stroke-cyan-400/50" cx="240" cy="100" r="8" strokeWidth="2"></circle>
                  <text className="fill-slate-100 text-[10px] font-bold" dominantBaseline="baseline" textAnchor="middle" x="240" y="92">€40k</text>
                  <text className="fill-red-400 text-[10px] font-medium" dominantBaseline="hanging" textAnchor="middle" x="240" y="108">-€10k</text>
                </g>
                <g>
                  <circle className="fill-cyan-400" cx="340" cy="70" r="5"></circle>
                  <circle className="stroke-cyan-400/50" cx="340" cy="70" r="8" strokeWidth="2"></circle>
                  <text className="fill-slate-100 text-[10px] font-bold" dominantBaseline="baseline" textAnchor="middle" x="340" y="62">€47.5k</text>
                  <text className="fill-emerald-400 text-[10px] font-medium" dominantBaseline="hanging" textAnchor="middle" x="340" y="78">+€2.5k</text>
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
                  <p className="text-emerald-400 text-xs font-medium">+5k €</p>
                </div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/30">
                <p className="text-white text-xs font-bold mb-2">OPEX</p>
                <div className="relative h-2 w-full rounded-full bg-slate-600">
                  <div className="absolute top-0 left-0 h-2 w-full rounded-full bg-red-400"></div>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="text-white text-sm font-bold">110%</p>
                  <p className="text-red-400 text-xs font-medium">-2.5k €</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col">
            <div className="flex flex-col gap-1">
              <p className="text-white text-sm font-semibold leading-normal">
                Planning Progress (APQP)
              </p>
              <div className="flex justify-between items-end mt-2 mb-2">
                <div>
                  <p className="text-gray-300 text-sm font-medium">Avancement total</p>
                  <p className="text-cyan-400 tracking-tight text-3xl font-extrabold leading-tight">85%</p>
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
                <p className="text-xs text-gray-300 font-semibold truncate">Jalon 1</p>
                <div className="relative h-3">
                  <div className="absolute h-full w-[100%] bg-blue-300/30 rounded-full"></div>
                  <div className="absolute h-full w-[100%] bg-emerald-500 rounded-full"></div>
                </div>
                <p className="text-xs text-white font-bold w-10 text-right">100%</p>
              </div>
              <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                <p className="text-xs text-gray-300 font-semibold truncate">Jalon 2</p>
                <div className="relative h-3">
                  <div className="absolute h-full w-[100%] bg-blue-300/30 rounded-full"></div>
                  <div className="absolute h-full w-[100%] bg-emerald-500 rounded-full"></div>
                </div>
                <p className="text-xs text-white font-bold w-10 text-right">100%</p>
              </div>
              <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                <p className="text-xs text-gray-300 font-semibold truncate">Jalon 3</p>
                <div className="relative h-3">
                  <div className="absolute h-full w-[90%] bg-blue-300/30 rounded-full"></div>
                  <div className="absolute h-full w-[80%] bg-orange-400 rounded-full"></div>
                </div>
                <p className="text-xs text-white font-bold w-10 text-right">80%</p>
              </div>
              <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                <p className="text-xs text-gray-300 font-semibold truncate">Jalon 4</p>
                <div className="relative h-3">
                  <div className="absolute h-full w-[70%] bg-blue-300/30 rounded-full"></div>
                  <div className="absolute h-full w-[45%] bg-red-400 rounded-full"></div>
                </div>
                <p className="text-xs text-white font-bold w-10 text-right">45%</p>
              </div>
              <div className="grid grid-cols-[80px_1fr_auto] items-center gap-2">
                <p className="text-xs text-gray-300 font-semibold truncate">Jalon 5</p>
                <div className="relative h-3">
                  <div className="absolute h-full w-[50%] bg-blue-300/30 rounded-full"></div>
                  <div className="absolute h-full w-[0%] bg-red-400 rounded-full"></div>
                </div>
                <p className="text-xs text-white font-bold w-10 text-right">0%</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/90 p-6 rounded-xl border border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col">
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
                    <polyline className="stroke-[#4A5568]" points="0 10, 320 10" strokeDasharray="2 2" strokeWidth="1.5"></polyline>
                    <polyline className="stroke-[#40E0D0]" points="0 5, 120 20, 220 30, 320 40" strokeWidth="2"></polyline>
                    <circle className="fill-[#40E0D0]" cx="0" cy="5" r="3"></circle>
                    <circle className="fill-[#FDB913]" cx="120" cy="20" r="3"></circle>
                    <text className="fill-[#FDB913] text-[10px] font-bold" x="125" y="24">-5%</text>
                    <circle className="fill-[#FDB913]" cx="220" cy="30" r="3"></circle>
                    <text className="fill-[#FDB913] text-[10px] font-bold" x="225" y="34">-8%</text>
                    <circle className="fill-[#FDB913]" cx="320" cy="40" r="3"></circle>
                    <text className="fill-[#FDB913] text-[10px] font-bold" x="295" y="44">-12%</text>
                  </g>
                </svg>
                <div className="flex justify-around -mt-1">
                  <p className="text-gray-300 text-[10px] font-semibold leading-normal tracking-[0.015em]">M-1</p>
                  <p className="text-gray-300 text-[10px] font-semibold leading-normal tracking-[0.015em]">M-2</p>
                  <p className="text-gray-300 text-[10px] font-semibold leading-normal tracking-[0.015em]">M-3</p>
                  <p className="text-gray-300 text-[10px] font-semibold leading-normal tracking-[0.015em]">M-4</p>
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
                      strokeWidth="2"
                    ></circle>
                    <circle
                      className="stroke-current text-emerald-400 -rotate-90 origin-center"
                      cx="18"
                      cy="18"
                      fill="none"
                      r="15.91549430918954"
                      strokeDasharray="95, 100"
                      strokeLinecap="round"
                      strokeWidth="2"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-emerald-400 text-3xl font-extrabold tracking-tight">95%</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-col items-center">
                  <div className="flex items-baseline gap-1">
                    <p className="text-emerald-400 text-base font-bold leading-normal">+2%</p>
                    <p className="text-gray-300 text-sm font-medium leading-normal">vs Mois Précédent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
