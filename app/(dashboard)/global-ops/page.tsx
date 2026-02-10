'use client'

import { useEffect, useState } from 'react'
import { KPIDashboard } from '@/components/KPIDashboard'
import { normalizeDashboardKpiResponse } from '@/lib/dashboard-kpi'
import type { DashboardKpiCategoryResponse, IndicateursData } from '@/types'

export default function GlobalOps() {
	const [weeklyData, setWeeklyData] = useState<IndicateursData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let cancelled = false
		async function fetchData() {
			try {
				setError(null)
				setIsLoading(true)
				const res = await fetch('/api/dashbaord-kpi-category', {
					cache: 'no-store',
					headers: { 'Content-Type': 'application/json' }
				})
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`)
				}
				const json = await res.json()
				// Handle nested data structure: API returns { data: { ... } }
				const raw: DashboardKpiCategoryResponse = json?.data ?? json
				if (cancelled) return
				setWeeklyData(normalizeDashboardKpiResponse(raw))
			} catch (err) {
				if (!cancelled) {
					console.error('Error fetching global ops data:', err)
					setError(err instanceof Error ? err.message : 'Unknown error')
				}
			} finally {
				if (!cancelled) setIsLoading(false)
			}
		}
		fetchData()
		return () => {
			cancelled = true
		}
	}, [])

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-6 text-red-700 dark:text-red-300">
					<p className="font-medium">Error loading dashboard</p>
					<p className="text-sm mt-1">{error}</p>
				</div>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="flex items-center justify-center min-h-[320px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
					<div className="animate-pulse text-slate-500 dark:text-slate-400">
						Loading dashboard…
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen">
			<div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
				<KPIDashboard weeklyData={weeklyData ?? undefined} />
			</div>
		</div>
	)
}
