'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface PeriodSelectorProps {
	type: 'weekly' | 'monthly'
	period: number
	year: number
	onTypeChange: (t: 'weekly' | 'monthly') => void
	onPeriodChange: (v: number) => void
	onYearChange: (v: number) => void
	/** Set to false for endpoints that only support weekly (e.g. rh) */
	showTypeToggle?: boolean
}

const YEARS = [2024, 2025, 2026]

const WEEKS = Array.from({ length: 52 }, (_, i) => i + 1)

const MONTHS = [
	{ value: 1, label: 'Janvier' },
	{ value: 2, label: 'Février' },
	{ value: 3, label: 'Mars' },
	{ value: 4, label: 'Avril' },
	{ value: 5, label: 'Mai' },
	{ value: 6, label: 'Juin' },
	{ value: 7, label: 'Juillet' },
	{ value: 8, label: 'Août' },
	{ value: 9, label: 'Septembre' },
	{ value: 10, label: 'Octobre' },
	{ value: 11, label: 'Novembre' },
	{ value: 12, label: 'Décembre' },
]

export function PeriodSelector({
	type,
	period,
	year,
	onTypeChange,
	onPeriodChange,
	onYearChange,
	showTypeToggle = true,
}: PeriodSelectorProps) {
	return (
		<div className='flex flex-wrap items-center gap-3'>
			{showTypeToggle && (
				<Select
					value={type}
					onValueChange={(v) => onTypeChange(v as 'weekly' | 'monthly')}
				>
					<SelectTrigger className='w-[130px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='weekly'>Semaine</SelectItem>
						<SelectItem value='monthly'>Mois</SelectItem>
					</SelectContent>
				</Select>
			)}

			{type === 'weekly' ? (
				<Select
					value={String(period)}
					onValueChange={(v) => onPeriodChange(Number(v))}
				>
					<SelectTrigger className='w-[110px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{WEEKS.map((w) => (
							<SelectItem key={w} value={String(w)}>
								S{w}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			) : (
				<Select
					value={String(period)}
					onValueChange={(v) => onPeriodChange(Number(v))}
				>
					<SelectTrigger className='w-[130px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{MONTHS.map((m) => (
							<SelectItem key={m.value} value={String(m.value)}>
								{m.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}

			<Select
				value={String(year)}
				onValueChange={(v) => onYearChange(Number(v))}
			>
				<SelectTrigger className='w-[100px]'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{YEARS.map((y) => (
						<SelectItem key={y} value={String(y)}>
							{y}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
