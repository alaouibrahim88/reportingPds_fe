'use client'

import MenuKPIDashboard from '@/components/MenuKPIDashboard'

type Tone = 'good' | 'warning' | 'bad' | 'neutral'

// Color carries the status only: left accent, badge and gap to the target
const toneStyles: Record<Tone, { accent: string; badge: string; dot: string; text: string }> = {
	good: { accent: 'border-l-emerald-500', badge: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500', text: 'text-emerald-700' },
	warning: { accent: 'border-l-amber-500', badge: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', text: 'text-amber-700' },
	bad: { accent: 'border-l-rose-500', badge: 'bg-rose-50 text-rose-700', dot: 'bg-rose-500', text: 'text-rose-700' },
	neutral: { accent: 'border-l-slate-400', badge: 'bg-slate-100 text-slate-700', dot: 'bg-slate-400', text: 'text-slate-700' }
}

// One notification per indicator: current value, status and, when there is one, the target.
// Screens 850px tall or more get larger text, so the cards do not look empty.
function KpiCard({
	title,
	status,
	tone,
	value,
	caption,
	target,
	gap
}: {
	title: string
	status: string
	tone: Tone
	value: string
	caption: string
	target?: { label: string; value: string }
	gap?: string
}) {
	const t = toneStyles[tone]
	return (
		<section
			className={`flex min-h-0 flex-col rounded-xl border border-l-4 border-slate-200 bg-white p-5 shadow-sm [@media(min-height:850px)]:p-7 ${t.accent}`}
		>
			<h3 className='truncate text-base font-semibold text-slate-800 [@media(min-height:850px)]:text-lg'>{title}</h3>
			<span
				className={`mt-2 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${t.badge}`}
			>
				<span className={`h-2 w-2 rounded-full ${t.dot}`} />
				{status}
			</span>
			<div className='mt-3 text-5xl font-bold tracking-tight text-slate-900 tabular-nums [@media(min-height:850px)]:mt-5 [@media(min-height:850px)]:text-6xl'>
				{value}
			</div>
			<p className='mt-1 text-base text-slate-600 [@media(min-height:850px)]:text-lg'>{caption}</p>
			{target && (
				<div className='mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-sm tabular-nums [@media(min-height:850px)]:text-base'>
					<span className='text-slate-600'>
						{target.label}{' '}
						<span className='font-semibold text-slate-900'>{target.value}</span>
					</span>
					{gap && <span className={`font-semibold ${t.text}`}>{gap}</span>}
				</div>
			)}
		</section>
	)
}

export function ExecutiveHorizonContent() {
	return (
		// On desktop the page fills the screen under the 45px top bar, without scrolling
		<div className='flex flex-col lg:h-[calc(100dvh-45px)] lg:min-h-[560px]'>
			<MenuKPIDashboard />
			<main className='min-h-0 flex-1 p-4 sm:p-6'>
				<div className='grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-6'>
					<KpiCard
						title="Chiffre d'affaires"
						status='Objectif dépassé'
						tone='good'
						value='1,25 M€'
						caption='Cumul mensuel · S40'
					/>
					<KpiCard
						title='C.A. prévisionnel'
						status='Dans les temps'
						tone='good'
						value='1,30 M€'
						caption='Estimation fin de trimestre'
					/>
					<KpiCard
						title='Taux de scrap'
						status='Vigilance'
						tone='warning'
						value='1,54 %'
						caption='Taux actuel'
						target={{ label: 'Seuil', value: '1,80 %' }}
						gap='Marge 0,26 pt'
					/>
					<KpiCard
						title='Suivi efficience'
						status='Sous objectif'
						tone='bad'
						value='94,2 %'
						caption='Atelier central'
						target={{ label: 'Cible S40', value: '95,0 %' }}
						gap='Écart −0,8 pt'
					/>
					<KpiCard
						title='Réclamations'
						status='Contrôlé'
						tone='good'
						value='3'
						caption='Dossiers ouverts'
					/>
					<KpiCard
						title='Service client'
						status='Excellence'
						tone='good'
						value='98,5 %'
						caption='Taux OTIF'
						target={{ label: 'Cible', value: '98,0 %' }}
						gap='Écart +0,5 pt'
					/>
					<KpiCard
						title='Heures supplémentaires'
						status='Régulé'
						tone='good'
						value='5,2 %'
						caption='De la masse horaire totale'
						target={{ label: 'Limite', value: '5,5 %' }}
						gap='Marge 0,3 pt'
					/>
					<KpiCard
						title='Chômage technique'
						status='Stable'
						tone='neutral'
						value='0,8 h'
						caption='Moyenne par poste'
					/>
				</div>
			</main>
		</div>
	)
}
