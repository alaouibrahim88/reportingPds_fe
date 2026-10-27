'use client'

import type { ReactNode } from 'react'
import MenuKPIDashboard from '@/components/MenuKPIDashboard'

type Tone = 'good' | 'warning' | 'bad' | 'neutral'

// Color carries the status only; charts stay neutral with the current period in slate-800
const toneStyles: Record<Tone, { badge: string; dot: string; fill: string; text: string }> = {
	good: { badge: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500', fill: 'bg-emerald-500', text: 'text-emerald-700' },
	warning: { badge: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500', fill: 'bg-amber-500', text: 'text-amber-700' },
	bad: { badge: 'bg-rose-50 text-rose-700', dot: 'bg-rose-500', fill: 'bg-rose-500', text: 'text-rose-700' },
	neutral: { badge: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400', fill: 'bg-slate-500', text: 'text-slate-600' }
}

function KpiCard({
	title,
	status,
	tone,
	value,
	caption,
	chart,
	footer
}: {
	title: string
	status: string
	tone: Tone
	value: string
	caption: string
	chart?: ReactNode
	footer?: ReactNode
}) {
	const t = toneStyles[tone]
	return (
		<section className='flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
			<div className='flex items-start justify-between gap-3'>
				<h3 className='text-sm font-medium text-slate-600'>{title}</h3>
				<span
					className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${t.badge}`}
				>
					<span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
					{status}
				</span>
			</div>
			<div className='mt-3 text-4xl font-semibold tracking-tight text-slate-900 tabular-nums'>
				{value}
			</div>
			<p className='mt-1 text-sm text-slate-500'>{caption}</p>
			<div className='mt-6 flex flex-grow flex-col justify-end'>{chart}</div>
			{footer && (
				<div className='mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 tabular-nums'>
					{footer}
				</div>
			)}
		</section>
	)
}

// Small bar chart: earlier periods in light grey, the current (last) one highlighted
function MiniBars({ data }: { data: { label: string; value: number; title?: string }[] }) {
	const max = Math.max(...data.map((d) => d.value))
	return (
		<div>
			<div className='flex h-14 items-end gap-2'>
				{data.map((d, i) => (
					<div
						key={d.label}
						className={`flex-1 rounded-sm ${i === data.length - 1 ? 'bg-slate-800' : 'bg-slate-200'}`}
						style={{ height: `${(d.value / max) * 100}%` }}
						title={d.title}
					/>
				))}
			</div>
			<div className='mt-2 flex gap-2 text-[11px] text-slate-400'>
				{data.map((d, i) => (
					<span
						key={d.label}
						className={`flex-1 text-center ${i === data.length - 1 ? 'font-medium text-slate-700' : ''}`}
					>
						{d.label}
					</span>
				))}
			</div>
		</div>
	)
}

// Progress bar on a 0 → max scale, with an optional target marker
function Meter({ value, max, target, tone }: { value: number; max: number; target?: number; tone: Tone }) {
	return (
		<div className='relative h-2 rounded-full bg-slate-100'>
			<div
				className={`h-full rounded-full ${toneStyles[tone].fill}`}
				style={{ width: `${Math.min(value / max, 1) * 100}%` }}
			/>
			{target !== undefined && (
				<div
					className='absolute -top-1 h-4 w-0.5 rounded-full bg-slate-700'
					style={{ left: `${(target / max) * 100}%` }}
				/>
			)}
		</div>
	)
}

function Delta({ children, tone }: { children: ReactNode; tone: Tone }) {
	return <span className={`font-medium ${toneStyles[tone].text}`}>{children}</span>
}

export function ExecutiveHorizonContent() {
	return (
		<>
			<MenuKPIDashboard />
			<div className='flex flex-col h-full'>
				<main className='flex-grow p-6 lg:p-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow'>
						<KpiCard
							title="Chiffre d'affaires"
							status='Objectif dépassé'
							tone='good'
							value='1,25 M€'
							caption='Cumul mensuel · S40'
							chart={
								<MiniBars
									data={[
										{ label: 'S37', value: 1.1, title: '1,10 M€' },
										{ label: 'S38', value: 0.9, title: '0,90 M€' },
										{ label: 'S39', value: 1.2, title: '1,20 M€' },
										{ label: 'S40', value: 1.25, title: '1,25 M€' }
									]}
								/>
							}
							footer={
								<>
									<span>vs S39 (1,20 M€)</span>
									<Delta tone='good'>+4,2 %</Delta>
								</>
							}
						/>

						<KpiCard
							title='C.A. prévisionnel'
							status='Dans les temps'
							tone='good'
							value='1,30 M€'
							caption='Estimation fin de trimestre'
							chart={
								<MiniBars
									data={[
										{ label: 'S37', value: 1.1, title: '1,10 M€' },
										{ label: 'S38', value: 1.2, title: '1,20 M€' },
										{ label: 'S39', value: 1.28, title: '1,28 M€' },
										{ label: 'S40', value: 1.3, title: '1,30 M€' }
									]}
								/>
							}
							footer={
								<>
									<span>vs S39 (1,28 M€)</span>
									<Delta tone='good'>+1,6 %</Delta>
								</>
							}
						/>

						<KpiCard
							title='Taux de scrap'
							status='Vigilance'
							tone='warning'
							value='1,54 %'
							caption='Taux actuel'
							chart={<Meter value={1.54} max={2} target={1.8} tone='warning' />}
							footer={
								<>
									<span>Seuil 1,80 %</span>
									<span>Moyenne 1,62 %</span>
								</>
							}
						/>

						<KpiCard
							title='Suivi efficience'
							status='Sous objectif'
							tone='bad'
							value='94,2 %'
							caption='Atelier central'
							chart={<Meter value={94.2} max={100} target={95} tone='bad' />}
							footer={
								<>
									<span>Cible S40 95,0 %</span>
									<Delta tone='bad'>−0,8 pt</Delta>
								</>
							}
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
							chart={<Meter value={98.5} max={100} target={98} tone='good' />}
							footer={
								<>
									<span>Cible 98,0 %</span>
									<span>Moyenne annuelle 98,2 %</span>
								</>
							}
						/>

						<KpiCard
							title='Heures supplémentaires'
							status='Régulé'
							tone='good'
							value='5,2 %'
							caption='De la masse horaire totale'
							chart={
								<>
									<Meter value={5.2} max={6} target={5.5} tone='good' />
									<p className='mt-2 text-[11px] text-slate-400'>
										Interne 60 % · Flex 25 % · Ext. 15 %
									</p>
								</>
							}
							footer={
								<>
									<span>Limite 5,5 %</span>
									<span>Marge 0,3 pt</span>
								</>
							}
						/>

						<KpiCard
							title='Chômage technique'
							status='Stable'
							tone='neutral'
							value='0,8 h'
							caption='Moyenne par poste'
							chart={
								<MiniBars
									data={[
										{ label: 'Lun', value: 10 },
										{ label: 'Mar', value: 5 },
										{ label: 'Mer', value: 25 },
										{ label: 'Jeu', value: 15 },
										{ label: 'Ven', value: 30 }
									]}
								/>
							}
						/>
					</div>
				</main>
			</div>
		</>
	)
}
