'use client'

import {
	Activity,
	CreditCard,
	Gauge,
	Headphones,
	ShieldCheck,
	TimerOff,
	TrendingUp,
	Users
} from 'lucide-react'
import MenuKPIDashboard from '@/components/MenuKPIDashboard'
export function ExecutiveHorizonContent() {
	return (
		<>
			<MenuKPIDashboard />
			<div className='flex flex-col h-full'>
				<main className='flex-grow p-6 lg:p-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow'>
						{/* Chiffre d'Affaires */}
						<div className='kpi-card'>
							<div className='flex justify-between items-start'>
								<div>
									<span className='text-[13px] font-extrabold text-black uppercase tracking-wider block mb-1'>
										Chiffre d&apos;Affaires
									</span>
									<span className='text-[13px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md'>
										Objectif Dépassé
									</span>
								</div>
								<div className='w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center'>
									<CreditCard className='h-6 w-6 text-emerald-600' />
								</div>
							</div>
							<div className='mt-4'>
								<div className='serif-numbers text-5xl font-black text-slate-900 tracking-tight'>
									1.25M €
								</div>
								<div className='text-[13px] font-bold text-black uppercase tracking-wider mt-1'>
									S40 · Cumul Mensuel
								</div>
							</div>
							<div className='flex-grow flex items-end justify-between gap-2 px-1 mt-6'>
								<div
									className='w-full bg-emerald-100 rounded-t-lg relative'
									style={{ height: '65%' }}
								>
									<div className='absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-black'>
										1.1M
									</div>
								</div>
								<div
									className='w-full bg-emerald-200 rounded-t-lg relative'
									style={{ height: '55%' }}
								>
									<div className='absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-black'>
										0.9M
									</div>
								</div>
								<div
									className='w-full bg-emerald-400 rounded-t-lg relative'
									style={{ height: '80%' }}
								>
									<div className='absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-black'>
										1.2M
									</div>
								</div>
								<div
									className='w-full bg-emerald-600 rounded-t-lg relative'
									style={{ height: '95%' }}
								>
									<div className='absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-600'>
										1.25M
									</div>
								</div>
							</div>
							<div className='grid grid-cols-4 mt-3 text-[9px] font-extrabold text-black uppercase text-center border-t border-slate-50 pt-2'>
								<span>S37</span>
								<span>S38</span>
								<span>S39</span>
								<span className='text-emerald-600'>S40</span>
							</div>
						</div>

						{/* C.A. Prévisionnel */}
						<div className='kpi-card'>
							<div className='flex justify-between items-start'>
								<div>
									<span className='text-[13px] font-extrabold text-black uppercase tracking-wider block mb-1'>
										C.A. Prévisionnel
									</span>
									<span className='text-[13px] font-bold text-sapphire-600 bg-sapphire-50 px-2 py-0.5 rounded-md'>
										Dans les temps
									</span>
								</div>
								<div className='w-10 h-10 rounded-xl bg-sapphire-50 flex items-center justify-center'>
									<TrendingUp className='h-6 w-6 text-sapphire-600' />
								</div>
							</div>
							<div className='mt-4'>
								<div className='serif-numbers text-5xl font-black text-slate-900 tracking-tight'>
									1.30M €
								</div>
								<div className='text-[13px] font-bold text-black uppercase tracking-wider mt-1'>
									Est. Fin de Trimestre
								</div>
							</div>
							<div className='flex-grow flex items-end justify-between gap-2 px-1 mt-6'>
								<div
									className='w-full bg-sky-100 rounded-t-lg relative'
									style={{ height: '60%' }}
								>
									<div className='absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-black'>
										1.1M
									</div>
								</div>
								<div
									className='w-full bg-sky-200 rounded-t-lg relative'
									style={{ height: '70%' }}
								>
									<div className='absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-black'>
										1.2M
									</div>
								</div>
								<div
									className='w-full bg-sky-400 rounded-t-lg relative'
									style={{ height: '85%' }}
								>
									<div className='absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-black'>
										1.28M
									</div>
								</div>
								<div
									className='w-full bg-sky-600 rounded-t-lg relative'
									style={{ height: '92%' }}
								>
									<div className='absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-sky-600'>
										1.30M
									</div>
								</div>
							</div>
							<div className='grid grid-cols-4 mt-3 text-[9px] font-extrabold text-black uppercase text-center border-t border-slate-50 pt-2'>
								<span>S37</span>
								<span>S38</span>
								<span>S39</span>
								<span className='text-sky-600'>S40</span>
							</div>
						</div>

						{/* Taux de Scrap */}
						<div className='kpi-card'>
							<div className='flex justify-between items-start'>
								<div>
									<span className='text-[13px] font-extrabold text-black uppercase tracking-wider block mb-1'>
										Taux de Scrap
									</span>
									<span className='text-[13px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md'>
										Vigilance
									</span>
								</div>
								<div className='w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center'>
									<Activity className='h-6 w-6 text-amber-600' />
								</div>
							</div>
							<div className='flex-grow flex items-center justify-center relative mt-2'>
								<svg className='w-40 h-40 -rotate-90' viewBox='0 0 100 100'>
									<circle
										cx='50'
										cy='50'
										fill='transparent'
										r='42'
										stroke='#f1f5f9'
										strokeWidth='8'
									/>
									<circle
										cx='50'
										cy='50'
										fill='transparent'
										r='42'
										stroke='#f59e0b'
										strokeDasharray='263.8'
										strokeDashoffset='190'
										strokeLinecap='round'
										strokeWidth='10'
									/>
								</svg>
								<div className='absolute text-center'>
									<div className='serif-numbers text-4xl font-black text-slate-900'>
										1.54%
									</div>
									<div className='text-[9px] font-extrabold text-black uppercase'>
										Actuel
									</div>
								</div>
							</div>
							<div className='flex justify-between items-center text-[10px] font-bold border-t border-slate-50 pt-4 mt-4'>
								<div className='text-black uppercase'>
									Seuil:{' '}
									<span className='text-slate-900'>
										1.80%
									</span>
								</div>
								<div className='text-black uppercase'>
									Moy:{' '}
									<span className='text-amber-600'>
										1.62%
									</span>
								</div>
							</div>
						</div>

						{/* Suivi Efficience */}
						<div className='kpi-card'>
							<div className='flex justify-between items-start'>
								<div>
									<span className='text-[13px] font-extrabold text-black uppercase tracking-wider block mb-1'>
										Suivi Efficience
									</span>
									<span className='text-[13px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md'>
										Sous Objectif
									</span>
								</div>
								<div className='w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center'>
									<Gauge className='h-6 w-6 text-rose-600' />
								</div>
							</div>
							<div className='mt-4'>
								<div className='serif-numbers text-5xl font-black text-slate-900 tracking-tight'>
									94.2%
								</div>
								<div className='text-[13px] font-bold text-black uppercase tracking-wider mt-1'>
									Atelier Central
								</div>
							</div>
							<div className='flex-grow flex flex-col justify-center space-y-6'>
								<div className='space-y-2'>
									<div className='flex justify-between text-[10px] font-bold text-black uppercase'>
										<span>Cible S40</span>
										<span>95.0%</span>
									</div>
									<div className='w-full h-2.5 bg-slate-100 rounded-full'>
										<div
											className='h-full bg-slate-300 rounded-full'
											style={{ width: '95%' }}
										/>
									</div>
								</div>
								<div className='space-y-2'>
									<div className='flex justify-between text-[10px] font-bold text-rose-600 uppercase'>
										<span>Actuel</span>
										<span>94.2%</span>
									</div>
									<div className='w-full h-4 bg-rose-100 rounded-full'>
										<div
											className='h-full bg-rose-500 rounded-full'
											style={{ width: '94.2%' }}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Réclamations */}
						<div className='kpi-card bg-slate-50/30 border-dashed'>
							<div className='flex justify-between items-start'>
								<div>
									<span className='text-[13px] font-extrabold text-black uppercase tracking-wider block mb-1'>
										Réclamations
									</span>
									<span className='text-[13px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md'>
										Contrôlé
									</span>
								</div>
								<div className='w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center'>
									<Headphones className='h-6 w-6 text-indigo-600' />
								</div>
							</div>
							<div className='flex-grow flex flex-col items-center justify-center'>
								<div className='serif-numbers text-9xl font-black text-indigo-600 leading-none'>
									03
								</div>
								<div className='text-[13px] font-extrabold text-black uppercase tracking-[0.2em] mt-2'>
									Dossiers Ouverts
								</div>
							</div>
							<div className='h-16 w-full -mx-6 mb-[-24px] overflow-hidden opacity-60'>
								<svg
									className='w-full h-full'
									preserveAspectRatio='none'
									viewBox='0 0 100 20'
								>
									<path
										d='M0 15 Q 12.5 5, 25 15 T 50 15 T 75 15 T 100 15'
										fill='none'
										stroke='var(--indigo)'
										strokeLinecap='round'
										strokeWidth='2'
									/>
									<path
										d='M0 15 Q 12.5 5, 25 15 T 50 15 T 75 15 T 100 15 V 20 H 0 Z'
										fill='rgba(99, 102, 241, 0.08)'
									/>
								</svg>
							</div>
						</div>

						{/* Service Client */}
						<div className='kpi-card'>
							<div className='flex justify-between items-start'>
								<div>
									<span className='text-[13px] font-extrabold text-black uppercase tracking-wider block mb-1'>
										Service Client
									</span>
									<span className='text-[13px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md'>
										Excellence
									</span>
								</div>
								<div className='w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center'>
									<ShieldCheck className='h-6 w-6 text-teal-600' />
								</div>
							</div>
							<div className='flex-grow flex items-center justify-center relative mt-6'>
								<div className='relative w-56 h-28 overflow-hidden'>
									<svg
										className='w-56 h-56 absolute top-0'
										viewBox='0 0 100 100'
									>
										<circle
											cx='50'
											cy='50'
											fill='none'
											r='40'
											stroke='#14b8a6'
											strokeDasharray='125.6 251.2'
											strokeDashoffset='0'
											strokeWidth='12'
											transform='rotate(180 50 50)'
										/>
										<circle
											cx='50'
											cy='50'
											fill='none'
											r='40'
											stroke='var(--teal)'
											strokeDasharray='123 251.2'
											strokeDashoffset='0'
											strokeLinecap='round'
											strokeWidth='12'
											transform='rotate(180 50 50)'
										/>
									</svg>
									<div className='absolute bottom-2 left-0 right-0 text-center'>
										<div className='serif-numbers text-4xl font-black text-slate-900'>
											98.5%
										</div>
										<div className='text-[9px] font-extrabold text-black uppercase'>
											OTIF Level
										</div>
									</div>
								</div>
							</div>
							<div className='grid grid-cols-2 gap-3 mt-6'>
								<div className='bg-slate-50 p-3 rounded-2xl text-center'>
									<div className='text-[9px] font-bold text-black uppercase'>
										SLA Cible
									</div>
									<div className='text-sm font-bold text-slate-700'>
										98.0%
									</div>
								</div>
								<div className='bg-teal-50 p-3 rounded-2xl text-center'>
									<div className='text-[9px] font-bold text-teal-600 uppercase'>
										Moy. Ann.
									</div>
									<div className='text-sm font-bold text-teal-700'>
										98.2%
									</div>
								</div>
							</div>
						</div>

						{/* H. Supplémentaires */}
						<div className='kpi-card'>
							<div className='flex justify-between items-start'>
								<div>
									<span className='text-[13px] font-extrabold text-black uppercase tracking-wider block mb-1'>
										H. Supplémentaires
									</span>
									<span className='text-[13px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md'>
										Régulé
									</span>
								</div>
								<div className='w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center'>
									<Users className='h-6 w-6 text-violet-600' />
								</div>
							</div>
							<div className='mt-4'>
								<div className='serif-numbers text-5xl font-black text-slate-900 tracking-tight'>
									5.2%
								</div>
								<div className='text-[13px] font-bold text-black uppercase tracking-wider mt-1'>
									Masse Horaire Totale
								</div>
							</div>
							<div className='flex-grow flex flex-col justify-center gap-6'>
								<div className='space-y-3'>
									<div className='flex justify-between text-[10px] font-bold text-black uppercase'>
										<span>Répartition par catégorie</span>
										<span>Limite 5.5%</span>
									</div>
									<div className='progress-stacked'>
										<div className='bg-violet-600 w-[60%] border-r border-white/20' />
										<div className='bg-violet-400 w-[25%] border-r border-white/20' />
										<div className='bg-violet-200 w-[15%]' />
									</div>
								</div>
								<div className='grid grid-cols-3 gap-1 text-[8px] font-extrabold text-black uppercase'>
									<div className='flex items-center gap-1.5'>
										<span className='w-2 h-2 rounded-full bg-violet-600' />
										Interne
									</div>
									<div className='flex items-center gap-1.5'>
										<span className='w-2 h-2 rounded-full bg-violet-400' />
										Flex
									</div>
									<div className='flex items-center gap-1.5'>
										<span className='w-2 h-2 rounded-full bg-violet-200' />
										Ext.
									</div>
								</div>
							</div>
						</div>

						{/* Chômage Technique */}
						<div className='kpi-card'>
							<div className='flex justify-between items-start'>
								<div>
									<span className='text-[13px] font-extrabold text-black uppercase tracking-wider block mb-1'>
										Chômage Technique
									</span>
									<span className='text-[13px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md'>
										Stable
									</span>
								</div>
								<div className='w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center'>
									<TimerOff className='h-6 w-6 text-slate-600' />
								</div>
							</div>
							<div className='mt-4'>
								<div className='serif-numbers text-5xl font-black text-slate-900 tracking-tight'>
									0.8h
								</div>
								<div className='text-[13px] font-bold text-black uppercase tracking-wider mt-1'>
									Moyenne par Poste
								</div>
							</div>
							<div className='flex-grow flex flex-col justify-end mt-4'>
								<div className='relative h-24 w-full bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100/50'>
									<div className='absolute inset-0 dot-grid opacity-20' />
									<svg
										className='absolute bottom-0 left-0 w-full h-full'
										preserveAspectRatio='none'
										viewBox='0 0 100 40'
									>
										<path
											d='M0 30 H 20 V 35 H 40 V 15 H 60 V 25 H 80 V 10 H 100 V 40 H 0 Z'
											fill='rgba(71, 85, 105, 0.08)'
										/>
										<path
											d='M0 30 H 20 V 35 H 40 V 15 H 60 V 25 H 80 V 10 H 100'
											fill='none'
											stroke='#64748b'
											strokeLinejoin='round'
											strokeWidth='2.5'
										/>
									</svg>
								</div>
								<div className='flex justify-between mt-3 text-[9px] font-bold text-black uppercase'>
									<span>LU</span>
									<span>MA</span>
									<span>ME</span>
									<span>JE</span>
									<span className='text-slate-900'>VE</span>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

