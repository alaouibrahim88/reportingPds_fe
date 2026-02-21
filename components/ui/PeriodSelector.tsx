'use client'
import { cn } from '@/lib/utils'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export interface PeriodSelectorProps {
	type: 'weekly' | 'monthly'
	period: number
	year: number
	onPeriodChange: (v: number) => void
	onYearChange: (v: number) => void,
	/** 'dark' (default) for pages with dark backgrounds, 'light' for white/light pages */
	variant?: 'dark' | 'light'
}

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1]

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
	onPeriodChange,
	onYearChange,
	variant = 'dark',
}: PeriodSelectorProps) {
	const triggerClass = cn(
		variant === 'light'
			? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
			: 'bg-slate-800/50 border-slate-700/50 text-gray-300 hover:bg-slate-700/50',
	)
	return (
		<div className='flex flex-wrap items-center gap-3'>
			{type === 'weekly' ? (
				<Select
					value={period > 0 ? String(period) : ''}
					onValueChange={(v) => onPeriodChange(Number(v))}
				>
					<SelectTrigger className={cn('w-[160px]', triggerClass)}>
						<SelectValue placeholder='Choisir semaine' />
					</SelectTrigger>
				    <SelectContent className={cn(triggerClass)}>
						{WEEKS.map((w) => (
							<SelectItem key={w} value={String(w)}>
								Semaine {w}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			) : (
				<Select
					value={period > 0 ? String(period) : ''}
					onValueChange={(v) => onPeriodChange(Number(v))}
				>
					<SelectTrigger className={cn('w-[160px]', triggerClass)}>
						<SelectValue placeholder='Choisir mois' />
					</SelectTrigger>
				    <SelectContent className={cn(triggerClass)}>
						{MONTHS.map((m) => (
							<SelectItem key={m.value} value={String(m.value)}>
								{m.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}

			<Select
				value={year > 0 ? String(year) : ''}
				onValueChange={(v) => onYearChange(Number(v))}
			>
					<SelectTrigger className={cn('w-[160px]', triggerClass)}>
					<SelectValue placeholder="Choisir l'année" />
				</SelectTrigger>
				<SelectContent className={cn(triggerClass)}>
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
