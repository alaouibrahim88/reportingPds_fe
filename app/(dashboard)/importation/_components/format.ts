import type { Frequency } from './import-types'

const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

// "1-15, 17" -> "S1–S15, S17" (weeks) or "janv.–avr., juin" (months)
export function formatRanges(ranges: string | null, frequency: Frequency): string {
	if (!ranges) return ''
	const label = (n: string) => (frequency === 'monthly' ? MONTHS[Number(n) - 1] ?? `M${n}` : `S${n}`)
	return ranges
		.split(',')
		.map((part) => part.trim().split('-').map(label).join('–'))
		.join(', ')
}

// "2026-03-18T10:30:42" (server time) -> "18/03/2026 10:30"
export function formatDateTime(value: string): string {
	const [date, time = ''] = value.split('T')
	const [y, m, d] = date.split('-')
	return `${d}/${m}/${y}${time ? ` ${time.slice(0, 5)}` : ''}`
}

export function formatDate(value: string): string {
	return formatDateTime(value).split(' ')[0]
}

export const FREQUENCY_LABELS: Record<Frequency, string> = {
	weekly: 'Une ligne par semaine',
	monthly: 'Une ligne par mois',
	dates: 'Cibles avec dates de validité',
}

const nf = new Intl.NumberFormat('fr-FR')
export const formatCount = (n: number) => nf.format(n)
