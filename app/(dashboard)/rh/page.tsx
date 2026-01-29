"use client"

import React, { useEffect, useState } from "react"

interface SerieMoisItem {
	Mois: string
	Annee: string
	Global?: string | null
	Target_Global?: string | null
	Managers?: string | null
	Target_Managers?: string | null
	Employes?: string | null
	Target_Employes?: string | null
}

interface TauxDepart {
	Mois_Courant: string
	Annee_Mois: string
	Global_Mois_Courant: string
	Target_Global: string
	Global_Mois_Precedent: string
	Variation_Global_Vs_Mois_Precedent: string
	Managers_Mois_Courant: string
	Target_Managers: string
	Employes_Mois_Courant: string
	Target_Employes: string
	Serie_6_Mois: SerieMoisItem[]
}

interface TauxRemplissageTransport {
	Valeur_Mois_Courant: string
	Target_Mois_Courant: string
	Valeur_Mois_Precedent: string
	Variation_Vs_Mois_Precedent: string
	Serie_5_Mois: Array<{ Mois: string; Annee: string; Valeur: string; Target: string }>
}

interface EffectifEtCouts {
	Effectif_Mois_Courant: string
	Target_Effectif: string
	Couts_Mois_Courant: string
	Target_Couts: string
	Variation_Effectif_Vs_Mois_Precedent: string
	Variation_Couts_Vs_Mois_Precedent: string
	Serie_6_Mois: Array<{
		Mois: string
		Annee: string
		Effectif: string | null
		Couts: string | null
	}>
}

interface DelaiMoyenRecrutement {
	Delai_Moyen_Global: string
	Target_Global: string
	Variation_Vs_Mois_Precedent: string
	Par_Departement: Record<string, string>
	Serie_6_Mois: Array<{
		Mois: string
		Annee: string
		Ventes?: string | null
		Marketing?: string | null
		IT?: string | null
		Operations?: string | null
		RH?: string | null
	}>
}

interface TauxAbsentisme {
	Valeur_Actuelle: string
	Target_Actuelle: string
	Valeur_Semaine_Precedente: string
	Variation_Vs_Semaine_Precedente: string
	Serie_6_Semaines: Array<{ Semaine: string; Annee: string; Valeur: string; Target: string }>
}

interface IndiceClimatSocial {
	Indice_Satisfaction_Mois_Courant: string
	Target_Indice_Satisfaction_Mois_Courant: string
	Incidents_Mois_Courant: string
	Target_Incidents_Mois_Courant: string
	Variation_Vs_Mois_Precedent: string
	Serie_6_Mois: Array<{
		Mois: string
		Annee: string
		Indice_Satisfaction: string | null
		Incidents: string | null
	}>
}

interface RHData {
	Taux_Depart?: TauxDepart
	Taux_Remplissage_Transport?: TauxRemplissageTransport
	Effectif_Et_Couts?: EffectifEtCouts
	Delai_Moyen_Recrutement?: DelaiMoyenRecrutement
	Taux_Absentisme?: TauxAbsentisme
	Indice_Climat_Social?: IndiceClimatSocial
}

const MONTH_NAMES = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']

function formatNumber(num: string | number): string {
	const n = Number(num)
	if (isNaN(n)) return String(num)
	if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
	if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
	return n.toLocaleString()
}

export default function RHPage() {
	const [data, setData] = useState<RHData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchData() {
			setLoading(true)
			setError(null)
			try {
				const res = await fetch('/api/rh')
				if (!res.ok) throw new Error('Erreur lors du chargement des données')
				const raw = await res.json()
				const rhData = raw['rh-Indicateurs'] ?? raw
				setData(rhData)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Erreur inconnue')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
				<p className="text-lg text-gray-200">Chargement des données...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
				<div className="text-center">
					<p className="text-lg text-red-400 mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
					>
						Réessayer
					</button>
				</div>
			</div>
		)
	}

	const tauxDepart = data?.Taux_Depart
	const tauxRemplissage = data?.Taux_Remplissage_Transport
	const effectifCouts = data?.Effectif_Et_Couts
	const delaiRecrutement = data?.Delai_Moyen_Recrutement
	const tauxAbsentisme = data?.Taux_Absentisme
	const indiceClimat = data?.Indice_Climat_Social

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
              <span className={`h-3 w-3 rounded-full shadow-lg ${
                tauxDepart && parseFloat(tauxDepart.Global_Mois_Courant) <= parseFloat(tauxDepart.Target_Global)
                  ? 'bg-green-500 shadow-green-500/50'
                  : 'bg-yellow-500 shadow-yellow-500/50'
              }`}></span>
              <span className="font-medium">
                {tauxDepart && parseFloat(tauxDepart.Global_Mois_Courant) <= parseFloat(tauxDepart.Target_Global)
                  ? 'Cible Atteinte'
                  : 'Cible Dépassée'}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col mt-6">
            <div className="mb-6">
              <div className="flex items-baseline gap-4">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-blue-400 tracking-tight">
                    {tauxDepart?.Global_Mois_Courant ?? '—'}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className={`font-bold flex items-center gap-2 text-2xl ${
                    tauxDepart && parseFloat(tauxDepart.Variation_Global_Vs_Mois_Precedent) <= 0
                      ? 'text-green-400'
                      : 'text-yellow-400'
                  }`}>
                    <span>
                      {tauxDepart?.Variation_Global_Vs_Mois_Precedent
                        ? (parseFloat(tauxDepart.Variation_Global_Vs_Mois_Precedent) >= 0 ? '+' : '') +
                          tauxDepart.Variation_Global_Vs_Mois_Precedent + '%'
                        : '—'}
                    </span>
                    <span className="text-3xl">⚠️</span>
                  </span>
                  <span className="text-sm text-gray-200 mt-2 font-medium">vs Mois Précédent</span>
                </div>
              </div>
            </div>
            <div className="relative h-48 flex-1">
              <div className="absolute inset-0 grid grid-cols-6 gap-3 items-end px-3">
                {(tauxDepart?.Serie_6_Mois ?? []).filter((s) => s.Global != null).slice(0, 6).map((item, i) => {
                  const max = 4
                  const g = item.Global ? (parseFloat(item.Global) / max) * 100 : 0
                  const m = item.Managers ? (parseFloat(item.Managers) / max) * 100 : 0
                  const e = item.Employes ? (parseFloat(item.Employes) / max) * 100 : 0
                  return (
                    <div key={i} className="flex justify-center items-end gap-0.5 h-full">
                      <div className="w-full bg-blue-500" style={{ height: `${Math.min(g, 100)}%` }}></div>
                      <div className="w-full bg-green-500" style={{ height: `${Math.min(m, 100)}%` }}></div>
                      <div className="w-full bg-yellow-500" style={{ height: `${Math.min(e, 100)}%` }}></div>
                    </div>
                  )
                })}
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
              {(tauxDepart?.Serie_6_Mois ?? []).filter((s) => s.Global != null).slice(0, 6).map((s, i) => (
                <span key={i}>{MONTH_NAMES[parseInt(s.Mois, 10) - 1] ?? s.Mois}</span>
              ))}
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
                <span className="text-5xl font-bold text-white">
                  {tauxRemplissage?.Valeur_Mois_Courant ?? '—'}%
                </span>
                <div className="flex flex-col">
                  <span className={`font-extrabold flex items-center gap-1 text-3xl ${
                    tauxRemplissage && parseFloat(tauxRemplissage.Variation_Vs_Mois_Precedent) >= 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}>
                    {tauxRemplissage?.Variation_Vs_Mois_Precedent
                      ? (parseFloat(tauxRemplissage.Variation_Vs_Mois_Precedent) >= 0 ? '+' : '') +
                        tauxRemplissage.Variation_Vs_Mois_Precedent + '%'
                      : '—'}
                  </span>
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
                {(() => {
                  const serie = (tauxRemplissage?.Serie_5_Mois ?? []).filter((s) => s.Valeur != null)
                  const points = serie.map((s, i) => {
                    const val = parseFloat(s.Valeur)
                    const y = 200 - (val / 100) * 160
                    const x = 50 + (i / Math.max(serie.length - 1, 1)) * 300
                    return { x, y, val }
                  })
                  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ')
                  return (
                    <>
                      {polylinePoints && (
                        <polyline fill="none" points={polylinePoints} stroke="#4A90E2" strokeWidth="2"/>
                      )}
                      {points.map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} fill="#1E1E1E" r="4" stroke="#4A90E2" strokeWidth="2"/>
                          <text x={p.x} y={p.y - 10} fill="#f1f5f9" textAnchor="middle" className="text-sm font-bold">
                            {p.val}%
                          </text>
                        </g>
                      ))}
                    </>
                  )
                })()}
              </svg>
            </div>
            <div className="mt-2 flex justify-around text-xs text-gray-200">
              {(tauxRemplissage?.Serie_5_Mois ?? []).filter((s) => s.Valeur != null).map((s, i) => (
                <span key={i}>M-{i + 1}</span>
              ))}
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
              <span className="text-4xl font-black text-white tracking-tight">
                {effectifCouts?.Effectif_Mois_Courant
                  ? parseInt(effectifCouts.Effectif_Mois_Courant, 10).toLocaleString()
                  : '—'}
              </span>
              <div className="self-end pb-3">
                <p className="text-sm text-gray-200 mb-2 font-medium">Coûts Actuels</p>
                <span className="text-2xl font-bold text-yellow-400">
                  € {effectifCouts?.Couts_Mois_Courant
                    ? formatNumber(effectifCouts.Couts_Mois_Courant)
                    : '—'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute h-full w-full flex items-end">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 200">
                {[45, 95, 145, 195].map((y, i) => (
                  <line key={i} stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="370" y1={y} y2={y}/>
                ))}
                {(() => {
                  const serie = (effectifCouts?.Serie_6_Mois ?? []).filter((s) => s.Effectif != null && s.Couts != null)
                  const effectifs = serie.map((s) => parseInt(s.Effectif!, 10))
                  const couts = serie.map((s) => parseInt(s.Couts!, 10))
                  const minEff = Math.min(...effectifs, 1100)
                  const maxEff = Math.max(...effectifs, 1300)
                  const minCout = Math.min(...couts, 2700000)
                  const maxCout = Math.max(...couts, 3000000)
                  const n = serie.length
                  const pointsCouts = serie.map((s, i) => {
                    const val = parseInt(s.Couts!, 10)
                    const y = 40 + (1 - (val - minCout) / (maxCout - minCout || 1)) * 155
                    const x = 40 + (i / Math.max(n - 1, 1)) * 320
                    return { x, y, val }
                  })
                  const pointsEff = serie.map((s, i) => {
                    const val = parseInt(s.Effectif!, 10)
                    const y = 150 + (1 - (val - minEff) / (maxEff - minEff || 1)) * 45
                    const x = 40 + (i / Math.max(n - 1, 1)) * 320
                    return { x, y, val }
                  })
                  const polylineCouts = pointsCouts.map((p) => `${p.x},${p.y}`).join(' ')
                  const polylineEff = pointsEff.map((p) => `${p.x},${p.y}`).join(' ')
                  return (
                    <>
                      <polyline fill="none" points={polylineCouts} stroke="#FFC107" strokeWidth="2"/>
                      {pointsCouts.map((p, i) => (
                        <g key={`c-${i}`}>
                          <circle cx={p.x} cy={p.y} fill="#1E1E1E" r="3" stroke="#FFC107" strokeWidth="2"/>
                          <text x={p.x} y={p.y - 8} fill="#FFC107" textAnchor="middle" className="text-xs font-bold">
                            {formatNumber(p.val)}
                          </text>
                        </g>
                      ))}
                      <polyline fill="none" points={polylineEff} stroke="#4A90E2" strokeWidth="2"/>
                      {pointsEff.map((p, i) => (
                        <g key={`e-${i}`}>
                          <circle cx={p.x} cy={p.y} fill="#1E1E1E" r="3" stroke="#4A90E2" strokeWidth="2"/>
                          <text x={p.x} y={p.y + 12} fill="#4A90E2" textAnchor="middle" className="text-xs font-bold">
                            {p.val}
                          </text>
                        </g>
                      ))}
                    </>
                  )
                })()}
              </svg>
            </div>
          </div>
          <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
            {(effectifCouts?.Serie_6_Mois ?? []).filter((s) => s.Effectif != null).map((s, i) => (
              <span key={i}>{MONTH_NAMES[parseInt(s.Mois, 10) - 1] ?? s.Mois}</span>
            ))}
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
              <span className={`text-4xl font-black ${
                delaiRecrutement && parseInt(delaiRecrutement.Delai_Moyen_Global, 10) <= parseInt(delaiRecrutement.Target_Global, 10)
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}>
                {delaiRecrutement?.Delai_Moyen_Global ?? '—'} jours
              </span>
              <div className="flex flex-col">
                <span className={`font-bold flex items-center gap-2 text-2xl ${
                  delaiRecrutement && parseFloat(delaiRecrutement.Variation_Vs_Mois_Precedent) <= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {delaiRecrutement?.Variation_Vs_Mois_Precedent
                    ? (parseFloat(delaiRecrutement.Variation_Vs_Mois_Precedent) >= 0 ? '+' : '') +
                      delaiRecrutement.Variation_Vs_Mois_Precedent + 'j'
                    : '—'}
                </span>
                <span className="text-sm text-gray-200 mt-2 font-medium">vs Mois Précédent</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute h-full w-full">
              <div className="h-1/2 border-b border-dashed border-white/30"></div>
              <span className="absolute top-1/2 -mt-2.5 right-0 text-xs text-white/50">
                Cible: {delaiRecrutement?.Target_Global ?? '30'}j
              </span>
            </div>
            <div className="h-full grid grid-cols-5 gap-6 px-4 items-end">
              {delaiRecrutement?.Par_Departement
                ? ['Ventes', 'Marketing', 'IT', 'Operations', 'RH'].map((dept, i) => {
                    const val = delaiRecrutement.Par_Departement[dept]
                    const target = delaiRecrutement.Par_Departement[`Target_${dept}`] ?? delaiRecrutement.Target_Global
                    const isOk = val && target && parseInt(val, 10) <= parseInt(target, 10)
                    const h = val ? Math.min(parseInt(val, 10) / 50 * 100, 100) : 0
                    return (
                      <div key={i} className="flex flex-col items-center justify-end h-full">
                        <span className="text-xs font-medium text-white/90 mb-1">{val ?? '—'}j</span>
                        <div
                          className={`w-full ${isOk ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ height: `${h}%` }}
                        ></div>
                      </div>
                    )
                  })
                : null}
            </div>
          </div>
          <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
            {['Ventes', 'Marketing', 'IT', 'Opérations', 'RH'].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
        </div>

        {/* Taux d'absentéisme Hebdo */}
        <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-4 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] transition-transform duration-300 cursor-pointer">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-white tracking-wide">Taux d&apos;absentéisme Hebdo</h2>
            <div className="flex items-center gap-2 text-sm text-danger">
              <span className={`h-2 w-2 rounded-full ${
                tauxAbsentisme && parseFloat(tauxAbsentisme.Valeur_Actuelle) > parseFloat(tauxAbsentisme.Target_Actuelle)
                  ? 'bg-red-400'
                  : 'bg-green-400'
              } text-white`}></span>
              <span className="text-sm text-gray-200 font-medium">
                {tauxAbsentisme && parseFloat(tauxAbsentisme.Valeur_Actuelle) > parseFloat(tauxAbsentisme.Target_Actuelle)
                  ? 'Cible Dépassée'
                  : 'Cible Atteinte'}
              </span>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-white">
                {tauxAbsentisme?.Valeur_Actuelle ?? '—'}%
              </span>
              <div className="flex flex-col">
                <span className={`font-bold flex items-center gap-1 text-3xl ${
                  tauxAbsentisme && parseFloat(tauxAbsentisme.Variation_Vs_Semaine_Precedente) <= 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {tauxAbsentisme?.Variation_Vs_Semaine_Precedente
                    ? (parseFloat(tauxAbsentisme.Variation_Vs_Semaine_Precedente) >= 0 ? '+' : '') +
                      tauxAbsentisme.Variation_Vs_Semaine_Precedente + '%'
                    : '—'}
                </span>
                <span className="text-sm text-gray-200 mt-1">vs Semaine Précédente</span>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 200">
              {[50, 100, 150].map((y, i) => (
                <line key={i} stroke="#FFFFFF" strokeDasharray="2 2" strokeOpacity="0.1" x1="0" x2="400" y1={y} y2={y}/>
              ))}
              {tauxAbsentisme?.Target_Actuelle && (
                <>
                  <line
                    stroke="#DC3545"
                    strokeDasharray="4 4"
                    strokeWidth="1.5"
                    x1="0"
                    x2="400"
                    y1={200 - (parseFloat(tauxAbsentisme.Target_Actuelle) / 10) * 200}
                    y2={200 - (parseFloat(tauxAbsentisme.Target_Actuelle) / 10) * 200}
                  />
                  <text fill="#DC3545" fontFamily="Manrope" fontSize="10" x="365" y={195 - (parseFloat(tauxAbsentisme.Target_Actuelle) / 10) * 200}>
                    Cible
                  </text>
                </>
              )}
              {(() => {
                const serie = tauxAbsentisme?.Serie_6_Semaines ?? []
                const points = serie.map((s, i) => {
                  const val = parseFloat(s.Valeur)
                  const y = 200 - (val / 10) * 200
                  const x = 20 + (i / Math.max(serie.length - 1, 1)) * 360
                  const isAboveTarget = s.Target && val > parseFloat(s.Target)
                  return { x, y, val, color: isAboveTarget ? '#DC3545' : '#4A90E2' }
                })
                const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ')
                return (
                  <>
                    {polylinePoints && (
                      <polyline
                        fill="none"
                        points={polylinePoints}
                        stroke="#4A90E2"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                      />
                    )}
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} fill="#1E1E1E" r="3" stroke={p.color} strokeWidth="2"/>
                        <text fill={p.color} fontFamily="Manrope" fontSize="14" fontWeight="800" textAnchor="middle" x={p.x} y={p.y - 10}>
                          {p.val}%
                        </text>
                      </g>
                    ))}
                  </>
                )
              })()}
            </svg>
          </div>
          <div className="mt-2 flex justify-around text-xs text-gray-200">
            {(tauxAbsentisme?.Serie_6_Semaines ?? []).map((s, i) => (
              <span key={i}>S-{s.Semaine}</span>
            ))}
          </div>
        </div>

        {/* Indice de Climat Social */}
        <div className="bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900 p-8 flex flex-col rounded-xl shadow-2xl border border-gray-700/50 backdrop-blur-sm h-[450px] transition-transform duration-300 cursor-pointer">
          <h2 className="text-xl font-bold text-white tracking-wide">Indice de Climat Social</h2>
          <div className="mt-4 mb-2">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">
                Indice: {indiceClimat?.Indice_Satisfaction_Mois_Courant ?? '—'}/10
              </span>
              <span className="text-sm text-gray-200">
                Incidents: {indiceClimat?.Incidents_Mois_Courant ?? '—'}
              </span>
            </div>
          </div>
          <div className="flex-1 mt-4 relative">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 bg-green-500/20"></div>
              <div className="flex-1 bg-yellow-500/20"></div>
              <div className="flex-1 bg-red-500/20"></div>
            </div>
            <svg className="absolute inset-0 h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 200">
              {(() => {
                const serie = (indiceClimat?.Serie_6_Mois ?? []).filter((s) => s.Indice_Satisfaction != null)
                const points = serie.map((s, i) => {
                  const val = parseFloat(s.Indice_Satisfaction!)
                  const y = 200 - (val / 10) * 200
                  const x = 33 + (i / Math.max(serie.length - 1, 1)) * 334
                  return { x, y, val }
                })
                const pathD = points.length >= 2
                  ? `M${points.map((p, i) => `${p.x} ${p.y}`).join(' L')}`
                  : ''
                return (
                  <>
                    {pathD && (
                      <path d={pathD} fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2.5"/>
                    )}
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} fill="#1E1E1E" r="3" stroke="#FFFFFF" strokeWidth="2"/>
                        <text fill="#f1f5f9" fontFamily="Manrope" fontSize="12" fontWeight="600" textAnchor="middle" x={p.x} y={p.y - 10}>
                          {p.val}
                        </text>
                      </g>
                    ))}
                  </>
                )
              })()}
            </svg>
          </div>
          <div className="mt-3 flex justify-around text-sm text-gray-200 font-medium">
            {(indiceClimat?.Serie_6_Mois ?? []).filter((s) => s.Indice_Satisfaction != null).map((s, i) => (
              <span key={i}>{MONTH_NAMES[parseInt(s.Mois, 10) - 1] ?? s.Mois}</span>
            ))}
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
