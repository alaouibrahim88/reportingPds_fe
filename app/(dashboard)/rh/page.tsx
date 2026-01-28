"use client"

import React from "react"

// RH (Human Resources) Dashboard Page - Can fetch data here
export default function RHPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-black pb-10">
      <header className="mb-6 flex items-center justify-end px-8 pt-4">
        <p className="text-base text-gray-200 font-medium">
          Dernière mise à jour : il y a 2 minutes
        </p>
      </header>
      <main className="grid flex-1 grid-cols-3 grid-rows-2 gap-4 px-6">
        {/* Taux de Départ (Mensuel) */}
        <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] transition-transform duration-300 cursor-pointer">
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
                  <span className="text-4xl font-black text-blue-400 tracking-tight">3.4%</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-yellow-400 flex items-center gap-2 text-2xl">
                    <span>+1.2%</span>
                    <span className="text-yellow-400 text-3xl">⚠️</span>
                  </span>
                  <span className="text-sm text-gray-200 mt-2 font-medium">vs Mois Précédent</span>
                </div>
              </div>
            </div>
            <div className="relative h-48 flex-1">
              <div className="absolute inset-0 grid grid-cols-6 gap-3 items-end px-3">
                {[{h1: "60%", h2: "70%", h3: "55%"}, {h1: "40%", h2: "55%", h3: "35%"}, {h1: "50%", h2: "60%", h3: "45%"}, {h1: "75%", h2: "65%", h3: "80%"}, {h1: "65%", h2: "75%", h3: "60%"}, {h1: "50%", h2: "60%", h3: "45%"}].map((item, i) => (
                  <div key={i} className="flex justify-center items-end gap-0.5 h-full">
                    <div className="w-full bg-blue-500" style={{height: item.h1}}></div>
                    <div className="w-full bg-green-500" style={{height: item.h2}}></div>
                    <div className="w-full bg-yellow-500" style={{height: item.h3}}></div>
                  </div>
                ))}
              </div>
              <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 200">
                <line stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1="50" y2="50"/>
                <line stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1="100" y2="100"/>
                <line stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1="150" y2="150"/>
                <line stroke="#DC3545" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="400" y1="80" y2="80"/>
                <text fill="#DC3545" fontFamily="Manrope" fontSize="10" x="365" y="75">Cible</text>
              </svg>
            </div>
            <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
              {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"].map((m, i) => <span key={i}>{m}</span>)}
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

        {/* Taux de Remplissage du Transport */}
        <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm p-6 flex flex-col h-[450px] transition-transform duration-300 cursor-pointer">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Taux de Remplissage du Transport
            </h2>
          </div>
          <div className="flex-1 flex flex-col mt-4">
            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-white">92%</span>
                <div className="flex flex-col">
                  <span className="font-extrabold text-white flex items-center gap-1 text-3xl">+3%</span>
                  <span className="text-sm text-gray-200 mt-1">vs Mois Précédent</span>
                </div>
              </div>
            </div>
            <div className="relative h-48 flex-1">
              <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 200">
                <line stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1="40"/>
                <line stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1="80"/>
                <line stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1="120"/>
                <line stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1="160"/>
                <line stroke="#DC3545" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="400" y1="60"/>
                <polyline fill="none" points="50,110 150,90 250,100 350,50" stroke="#4A90E2" strokeWidth="2"/>
                {[{x: 50, y: 110}, {x: 150, y: 90}, {x: 250, y: 100}, {x: 350, y: 50}].map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} fill="#1E1E1E" r="4" stroke="#4A90E2" strokeWidth="2"/>
                ))}
                <g className="text-xl font-bold" fill="#f1f5f9" textAnchor="middle">
                  <text x="50" y="102">85%</text>
                  <text x="150" y="82">89%</text>
                  <text x="250" y="92">87%</text>
                  <text x="350" y="42">92%</text>
                </g>
              </svg>
            </div>
            <div className="mt-2 flex justify-around text-xs text-gray-200">
              {["M-4", "M-3", "M-2", "M-1"].map((m, i) => <span key={i}>{m}</span>)}
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

        {/* Effectif Global et Coûts */}
        <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] transition-transform duration-300 cursor-pointer">
          <h2 className="text-xl font-bold text-white tracking-wide">Effectif Global et Coûts</h2>
          <div className="mt-6 mb-6">
            <div className="flex items-baseline gap-6">
              <span className="text-4xl font-black text-white tracking-tight">1,242</span>
              <div className="self-end pb-3">
                <p className="text-sm text-gray-200 mb-2 font-medium">Coûts Actuels</p>
                <span className="text-2xl font-bold text-yellow-400">€ 3.2M</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute h-full w-full flex items-end">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 200">
                <g className="text-[10px] text-gray-200 fill-current">
                  <text x="375" y="195">2.6M</text>
                  <text x="375" y="145">2.8M</text>
                  <text x="375" y="95">3.0M</text>
                  <text x="375" y="45">3.2M</text>
                </g>
                {[45, 95, 145, 195].map((y, i) => (
                  <line key={i} stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="370" y1={y} y2={y}/>
                ))}
                <polyline fill="none" points="40,120 120,100 200,110 280,80 360,40" stroke="#FFC107" strokeWidth="2"/>
                {[{x: 40, y: 120}, {x: 120, y: 100}, {x: 200, y: 110}, {x: 280, y: 80}, {x: 360, y: 40}].map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} fill="#1E1E1E" r="3" stroke="#FFC107" strokeWidth="2"/>
                ))}
                <g className="text-yellow-400 text-base font-bold fill-current" textAnchor="middle">
                  <text x="40" y="112">2.85M</text>
                  <text x="120" y="92">2.95M</text>
                  <text x="200" y="102">2.90M</text>
                  <text x="280" y="72">3.05M</text>
                  <text x="360" y="32">3.20M</text>
                </g>
                <polyline fill="none" points="40,180 120,175 200,170 280,160 360,150" stroke="#4A90E2" strokeWidth="2"/>
                {[{x: 40, y: 180}, {x: 120, y: 175}, {x: 200, y: 170}, {x: 280, y: 160}, {x: 360, y: 150}].map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} fill="#1E1E1E" r="3" stroke="#4A90E2" strokeWidth="2"/>
                ))}
                <g className="text-blue-400 text-base font-bold fill-current" textAnchor="middle">
                  <text x="40" y="198">1180</text>
                  <text x="120" y="193">1195</text>
                  <text x="200" y="188">1210</text>
                  <text x="280" y="178">1235</text>
                  <text x="360" y="142">1242</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
            {["Jan", "Fév", "Mar", "Avr", "Mai"].map((m, i) => <span key={i}>{m}</span>)}
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

        {/* Délai Moyen de Recrutement */}
        <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] transition-transform duration-300 cursor-pointer">
          <h2 className="text-xl font-bold text-white tracking-wide">Délai Moyen de Recrutement</h2>
          <div className="mt-6 mb-6">
            <p className="text-sm text-gray-300 font-medium mb-3">Délai Moyen Global</p>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-red-400">32 jours</span>
              <div className="flex flex-col">
                <span className="font-bold text-red-400 flex items-center gap-2 text-2xl">+2j</span>
                <span className="text-sm text-gray-200 mt-2 font-medium">vs Mois Précédent</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute h-full w-full">
              <div className="h-1/2 border-b border-dashed border-white/30"></div>
              <span className="absolute top-1/2 -mt-2.5 right-0 text-xs text-white/50">Cible: 30j</span>
            </div>
            <div className="h-full grid grid-cols-5 gap-6 px-4 items-end">
              {[{val: "28j", h: "45%", color: "bg-green-500"}, {val: "45j", h: "65%", color: "bg-red-500"}, {val: "26j", h: "40%", color: "bg-green-500"}, {val: "38j", h: "55%", color: "bg-red-500"}, {val: "22j", h: "35%", color: "bg-green-500"}].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-white/90 mb-1">{item.val}</span>
                  <div className={`h-[${item.h}] w-full ${item.color}`} style={{height: item.h}}></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
            {["Ventes", "Marketing", "IT", "Opérations", "RH"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
        </div>

        {/* Taux d'absentéisme Hebdo */}
        <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-4 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] transition-transform duration-300 cursor-pointer">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-white tracking-wide">Taux d&apos;absentéisme Hebdo</h2>
            <div className="flex items-center gap-2 text-sm text-danger">
              <span className="h-2 w-2 rounded-full bg-red-400 text-white"></span>
              <span className="text-sm text-gray-200 font-medium">Cible Dépassée</span>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-white">4.8%</span>
              <div className="flex flex-col">
                <span className="font-bold text-red-400 flex items-center gap-1 text-3xl">-1.7%</span>
                <span className="text-sm text-gray-200 mt-1">vs Semaine Précédente</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 200">
              {[50, 100, 150].map((y, i) => (
                <line key={i} stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1={y} y2={y}/>
              ))}
              <line stroke="#DC3545" strokeDasharray="4 4" strokeWidth="1.5" x1="0" x2="400" y1="100" y2="100"/>
              <text fill="#DC3545" fontFamily="Manrope" fontSize="10" x="365" y="95">Cible</text>
              <path d="M20 180 C 80 160, 100 120, 160 110 S 240 80, 260 70" fill="none" stroke="#4A90E2" strokeLinecap="round" strokeWidth="2.5"/>
              <path d="M260 70 S 320 50, 380 90" fill="none" stroke="#DC3545" strokeLinecap="round" strokeWidth="2.5"/>
              {[{x: 20, y: 180, val: "2.1%", color: "#4A90E2"}, {x: 90, y: 135, val: "3.2%", color: "#4A90E2"}, {x: 160, y: 110, val: "4.1%", color: "#4A90E2"}, {x: 260, y: 70, val: "5.8%", color: "#DC3545"}, {x: 320, y: 50, val: "6.5%", color: "#DC3545"}, {x: 380, y: 90, val: "4.8%", color: "#DC3545"}].map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} fill="#1E1E1E" r="3" stroke={p.color} strokeWidth="2"/>
                  <text fill={p.color} fontFamily="Manrope" fontSize="14" fontWeight="800" textAnchor="middle" x={p.x} y={p.y - 10}>{p.val}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="mt-2 flex justify-around text-xs text-gray-200">
            {["S-23", "S-24", "S-25", "S-26", "S-27", "S-28"].map((s, i) => <span key={i}>{s}</span>)}
          </div>
        </div>

        {/* Indice de Climat Social */}
        <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] transition-transform duration-300 cursor-pointer">
          <h2 className="text-xl font-bold text-white tracking-wide">Indice de Climat Social</h2>
          <div className="flex-1 mt-6 relative">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 bg-green-500/20"></div>
              <div className="flex-1 bg-yellow-500/20"></div>
              <div className="flex-1 bg-red-500/20"></div>
            </div>
            <div className="absolute inset-0 grid grid-cols-6 gap-6 px-4 items-end">
              {[{h: "10%", val: "2"}, {h: "5%", val: "1"}, {h: "15%", val: "3"}, {h: "25%", val: "5"}, {h: "40%", val: "8"}, {h: "30%", val: "6"}].map((item, i) => (
                <div key={i} className="bg-white/50 relative" style={{height: item.h, width: "100%"}}>
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-medium text-white/80">{item.val}</span>
                </div>
              ))}
            </div>
            <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 200">
              <path d="M33 40 C 100 60, 166 50, 233 90 S 300 120, 367 150" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2.5"/>
              <g className="text-xs font-semibold" fill="#f1f5f9" textAnchor="middle">
                <text x="33" y="32">8.2</text>
                <text x="100" y="52">7.8</text>
                <text x="166" y="42">8.0</text>
                <text x="233" y="82">6.5</text>
                <text x="300" y="112">5.5</text>
                <text x="367" y="142">4.0</text>
              </g>
            </svg>
          </div>
          <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
            {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"].map((m, i) => <span key={i}>{m}</span>)}
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
  )
}
