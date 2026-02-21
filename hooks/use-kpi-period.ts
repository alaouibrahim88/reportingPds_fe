import { useState } from 'react'

function getCurrentWeek(): number {
	const now = new Date()
	const startOfYear = new Date(now.getFullYear(), 0, 1)
	const dayOfYear =
		Math.floor((now.getTime() - startOfYear.getTime()) / 86400000) + 1
	return Math.ceil(dayOfYear / 7)
}

function getCurrentMonth(): number {
	return new Date().getMonth() + 1
}

function getCurrentYear(): number {
	return new Date().getFullYear()
}

export interface KpiPeriod {
	type: 'weekly' | 'monthly'
	period: number
	year: number
	setType: (t: 'weekly' | 'monthly') => void
	setPeriod: (v: number) => void
	setYear: (v: number) => void
}

/**
 * Manages KPI period selection state.
 * Automatically initialises to the current week/month and year.
 */
export function useKpiPeriod(
	defaultType: 'weekly' | 'monthly' = 'weekly',
): KpiPeriod {
	const [type, setType] = useState<'weekly' | 'monthly'>(defaultType)
	const [week, setWeek] = useState(getCurrentWeek())
	const [month, setMonth] = useState(getCurrentMonth())
	const [year, setYear] = useState(getCurrentYear())

	const period = type === 'weekly' ? week : month
	const setPeriod = type === 'weekly' ? setWeek : setMonth

	return { type, setType, period, setPeriod, year, setYear }
}
