"use client"

import React, { useState } from "react"
import { TabSelector } from "@/components/ui/TabSelector"

type TabType = "weekly" | "monthly"

// Supply Chain Dashboard Page - Can fetch data here
export default function SupplyChainPage() {
	const [activeTab, setActiveTab] = useState<TabType>("weekly")

	// Monthly Supply Chain Component
	const MonthlySupplyChain = () => (
		<div className="flex flex-col gap-6">
			{/* Rotation des Stocks */}
			<div className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-base md:text-lg lg:text-xl font-bold text-white">
						Rotation des Stocks
					</p>
					<span className="material-symbols-outlined text-gray-400">
						inventory
					</span>
				</div>
				<div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
					<div className="flex flex-col justify-center gap-10 py-4 lg:col-span-3">
						<div>
							<p className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white">
								22 <span className="text-3xl md:text-4xl lg:text-5xl font-bold">jours</span>
							</p>
							<div className="flex items-baseline gap-2">
								<p className="text-base md:text-lg lg:text-xl font-medium text-gray-400">
									Target:
								</p>
								<p className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-500">20 jours</p>
							</div>
						</div>
						<div className="flex items-center gap-2 md:gap-3 lg:gap-4">
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
									<span className="text-2xl md:text-3xl lg:text-4xl font-bold">21</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Avril</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
									<span className="text-2xl md:text-3xl lg:text-4xl font-bold">19</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Mars</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
									<span className="text-2xl md:text-3xl lg:text-4xl font-bold">24</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Fév</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
									<span className="text-2xl md:text-3xl lg:text-4xl font-bold">20</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Jan</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-500">
									<span className="text-2xl md:text-3xl lg:text-4xl font-bold">23</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Déc</p>
							</div>
						</div>
					</div>
					<div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
						<div className="h-20 w-full max-w-lg">
							<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
								<line fill="none" stroke="#3182CE" strokeDasharray="4,4" strokeWidth="0.5" x1="0" x2="100" y1="20" y2="20" />
								<polyline fill="none" points="5,15 28.75,25 52.5,10 76.25,30 100,20" stroke="#DD6B20" strokeWidth="1" />
								<circle cx="5" cy="15" fill="#DD6B20" r="1.5" />
								<circle cx="28.75" cy="25" fill="#DD6B20" r="1.5" />
								<circle cx="52.5" cy="10" fill="#DD6B20" r="1.5" />
								<circle cx="76.25" cy="30" fill="#DD6B20" r="1.5" />
								<circle cx="100" cy="20" fill="#DD6B20" r="1.5" />
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Taux de Fiabilité des Stocks */}
			<div className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-base md:text-lg lg:text-xl font-bold text-white">
						Taux de Fiabilité des Stocks
					</p>
					<span className="material-symbols-outlined text-gray-400">
						published_with_changes
					</span>
				</div>
				<div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
					<div className="flex flex-col items-center justify-center gap-6 py-4 lg:col-span-3">
						<div className="flex flex-col items-center">
							<p className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-yellow-500">
								94%
							</p>
							<div className="flex items-center gap-1">
								<span className="material-symbols-outlined text-lg text-blue-500">
									arrow_upward
								</span>
								<p className="text-2xl font-extrabold text-blue-500">+1%</p>
								<p className="text-base font-normal text-gray-400">
									vs dernier mois
								</p>
							</div>
						</div>
						<div className="flex w-full max-w-md flex-col gap-3 md:gap-4">
							<div className="flex items-center gap-3 md:gap-4">
								<p className="w-24 md:w-28 lg:w-32 shrink-0 text-xs md:text-sm lg:text-base font-semibold text-gray-400">
									Warehouse A
								</p>
								<div className="h-6 w-full rounded bg-gray-700">
									<div className="h-full items-center justify-end rounded bg-blue-500 pr-2 text-right text-sm font-bold text-white" style={{ width: "98%" }}>
										98%
									</div>
								</div>
							</div>
							<div className="flex items-center gap-3 md:gap-4">
								<p className="w-24 md:w-28 lg:w-32 shrink-0 text-xs md:text-sm lg:text-base font-semibold text-gray-400">
									Warehouse B
								</p>
								<div className="h-6 w-full rounded bg-gray-700">
									<div className="h-full items-center justify-end rounded bg-yellow-500 pr-2 text-right text-sm font-bold text-white" style={{ width: "91%" }}>
										91%
									</div>
								</div>
							</div>
							<div className="flex items-center gap-3 md:gap-4">
								<p className="w-24 md:w-28 lg:w-32 shrink-0 text-xs md:text-sm lg:text-base font-semibold text-gray-400">
									Warehouse C
								</p>
								<div className="h-6 w-full rounded bg-gray-700">
									<div className="h-full items-center justify-end rounded bg-blue-500 pr-2 text-right text-sm font-bold text-white" style={{ width: "96%" }}>
										96%
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
						<div className="h-20 w-full max-w-lg">
							<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
								<line fill="none" stroke="#3182CE" strokeDasharray="4,4" strokeWidth="0.5" x1="0" x2="100" y1="20" y2="20" />
								<polyline fill="none" points="5,25 28.75,10 52.5,25 76.25,15 100,20" stroke="#DD6B20" strokeWidth="1" />
								<circle cx="5" cy="25" fill="#DD6B20" r="1.5" />
								<circle cx="28.75" cy="10" fill="#DD6B20" r="1.5" />
								<circle cx="52.5" cy="25" fill="#DD6B20" r="1.5" />
								<circle cx="76.25" cy="15" fill="#DD6B20" r="1.5" />
								<circle cx="100" cy="20" fill="#DD6B20" r="1.5" />
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Coût Logistique Total */}
			<div className="flex h-full flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-base md:text-lg lg:text-xl font-bold text-white">
						Coût Logistique Total
					</p>
					<span className="material-symbols-outlined text-gray-400">
						local_shipping
					</span>
				</div>
				<div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
					<div className="flex flex-col justify-center gap-10 py-4 lg:col-span-3">
						<div>
							<p className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white">
								€1.2M
							</p>
							<div className="flex items-center gap-1">
								<span className="material-symbols-outlined text-lg text-blue-500">
									arrow_downward
								</span>
								<p className="text-2xl font-extrabold text-blue-500">-5%</p>
								<p className="text-base font-normal text-gray-400">
									vs last month
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 md:gap-3 lg:gap-4">
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
									<span className="text-xl md:text-2xl lg:text-3xl font-bold">1.26</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Avril</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-red-500/10 text-red-500">
									<span className="text-xl md:text-2xl lg:text-3xl font-bold">1.31</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Mars</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-red-500/10 text-red-500">
									<span className="text-xl md:text-2xl lg:text-3xl font-bold">1.29</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Fév</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
									<span className="text-xl md:text-2xl lg:text-3xl font-bold">1.18</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Jan</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
									<span className="text-xl md:text-2xl lg:text-3xl font-bold">1.15</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base text-gray-400">Déc</p>
							</div>
						</div>
					</div>
					<div className="relative flex min-h-[12rem] items-center justify-center lg:col-span-2">
						<div className="h-20 w-full max-w-lg">
							<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
								<line fill="none" stroke="#3182CE" strokeDasharray="4,4" strokeWidth="0.5" x1="0" x2="100" y1="20" y2="20" />
								<polyline fill="none" points="5,20 28.75,30 52.5,10 76.25,15 100,25" stroke="#DD6B20" strokeWidth="1" />
								<circle cx="5" cy="20" fill="#DD6B20" r="1.5" />
								<circle cx="28.75" cy="30" fill="#DD6B20" r="1.5" />
								<circle cx="52.5" cy="10" fill="#DD6B20" r="1.5" />
								<circle cx="76.25" cy="15" fill="#DD6B20" r="1.5" />
								<circle cx="100" cy="25" fill="#DD6B20" r="1.5" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	// Weekly Supply Chain Component
	const WeeklySupplyChain = () => (
		<div className="grid h-full flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
			{/* Taux de Service Client / OTIF */}
			<div className="flex flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-sm md:text-base lg:text-lg font-medium text-white">
						Taux de Service Client / OTIF
					</p>
					<span className="material-symbols-outlined text-gray-400">
						trending_up
					</span>
				</div>
				<div className="flex flex-wrap items-end gap-3 md:gap-4">
					<p className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white">
						96%
					</p>
					<div className="flex items-center gap-1 pb-2">
						<span className="material-symbols-outlined text-sm text-blue-500">
							arrow_upward
						</span>
						<p className="text-2xl font-extrabold text-blue-500">+1.0%</p>
						<p className="text-base font-normal text-gray-400">
							vs last week
						</p>
					</div>
				</div>
				<div className="relative h-[180px] w-full pt-4">
					<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 100">
						<defs>
							<linearGradient id="line-chart-gradient" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0%" stopColor="#2c5282" stopOpacity="0.2" />
								<stop offset="100%" stopColor="#2c5282" stopOpacity="0" />
							</linearGradient>
						</defs>
						<path d="M 0 50 L 100 30 L 200 40 L 300 20 L 400 30" fill="url(#line-chart-gradient)" stroke="#2c5282" strokeWidth="3" />
					</svg>
					<div className="absolute inset-0 flex items-center justify-between">
						<div className="flex flex-col items-center gap-2" style={{ bottom: "50%", left: "0%", transform: "translate(0, 50%)", position: "absolute" }}>
							<span className="text-3xl font-extrabold text-white">95%</span>
							<div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-gray-900" />
							<p className="text-sm font-bold text-gray-400">W1</p>
						</div>
						<div className="flex flex-col items-center gap-2" style={{ bottom: "70%", left: "25%", transform: "translate(-50%, 50%)", position: "absolute" }}>
							<span className="text-3xl font-extrabold text-white">97%</span>
							<div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-gray-900" />
							<p className="text-sm font-bold text-gray-400">W2</p>
						</div>
						<div className="flex flex-col items-center gap-2" style={{ bottom: "60%", left: "50%", transform: "translate(-50%, 50%)", position: "absolute" }}>
							<span className="text-3xl font-extrabold text-white">96%</span>
							<div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-gray-900" />
							<p className="text-sm font-bold text-gray-400">W3</p>
						</div>
						<div className="flex flex-col items-center gap-2" style={{ bottom: "80%", left: "75%", transform: "translate(-50%, 50%)", position: "absolute" }}>
							<span className="text-3xl font-extrabold text-white">98%</span>
							<div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-gray-900" />
							<p className="text-sm font-bold text-gray-400">W4</p>
						</div>
						<div className="flex flex-col items-center gap-2" style={{ bottom: "70%", left: "100%", transform: "translate(-100%, 50%)", position: "absolute" }}>
							<span className="text-3xl font-extrabold text-white">97%</span>
							<div className="h-3 w-3 rounded-full border-2 border-[#2c5282] bg-gray-900" />
							<p className="text-sm font-bold text-gray-400">W5</p>
						</div>
					</div>
				</div>
			</div>

			{/* Taux de Service Fournisseurs OTIF */}
			<div className="flex flex-col gap-4 md:gap-6 lg:gap-8 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-sm md:text-base lg:text-lg font-medium text-white">
						Taux de Service Fournisseurs OTIF
					</p>
					<span className="material-symbols-outlined text-gray-400">
						local_shipping
					</span>
				</div>
				<div className="flex flex-wrap items-end gap-3 md:gap-4">
					<p className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-white">
						96%
					</p>
					<div className="flex items-center gap-1 pb-1">
						<span className="material-symbols-outlined text-sm text-red-500">
							arrow_downward
						</span>
						<p className="text-2xl font-extrabold text-red-500">-0.5%</p>
						<p className="text-base font-normal text-gray-400">
							vs last week
						</p>
					</div>
				</div>
				<div className="flex h-full w-full flex-col items-center justify-center pt-4">
					<div className="flex w-full items-start justify-around">
						<div className="flex flex-col items-center gap-2">
							<p className="mb-1 text-xs font-semibold text-blue-400">Target: 95%</p>
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
								<span className="text-2xl font-bold">94%</span>
							</div>
							<p className="mt-2 text-sm font-medium text-gray-400">W1</p>
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="mb-1 text-xs font-semibold text-blue-400">Target: 95%</p>
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
								<span className="text-2xl font-bold">95%</span>
							</div>
							<p className="mt-2 text-sm font-medium text-gray-400">W2</p>
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="mb-1 text-xs font-semibold text-blue-400">Target: 95%</p>
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
								<span className="text-2xl font-bold">93%</span>
							</div>
							<p className="mt-2 text-sm font-medium text-gray-400">W3</p>
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="mb-1 text-xs font-semibold text-blue-400">Target: 95%</p>
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
								<span className="text-2xl font-bold">97%</span>
							</div>
							<p className="mt-2 text-sm font-medium text-gray-400">W4</p>
						</div>
						<div className="flex flex-col items-center gap-2">
							<p className="mb-1 text-xs font-semibold text-blue-400">Target: 95%</p>
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
								<span className="text-2xl font-bold">96%</span>
							</div>
							<p className="mt-2 text-sm font-medium text-gray-400">W5</p>
						</div>
					</div>
				</div>
			</div>

			{/* Fiabilité Client */}
			<div className="col-span-full flex flex-col gap-3 md:gap-4 lg:gap-6 rounded-lg border border-gray-700 bg-gray-900 p-4 md:p-6 lg:p-8">
				<div className="flex items-start justify-between">
					<p className="text-sm md:text-base lg:text-lg font-medium text-white">
						Fiabilité Client
					</p>
					<span className="material-symbols-outlined text-gray-400">
						shield
					</span>
				</div>
				<div className="flex h-full flex-grow items-center justify-center gap-6 md:gap-8 lg:gap-12">
					<div className="flex flex-col items-center gap-2 md:gap-3">
						<div className="flex h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 items-center justify-center rounded-full border-[8px] md:border-[10px] lg:border-[12px] border-blue-500/20 bg-blue-500/10 text-blue-500">
							<span className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
								94%
							</span>
						</div>
						<p className="text-base md:text-lg lg:text-xl font-semibold text-white">
							Actuel
						</p>
					</div>
					<div className="flex flex-col items-start gap-3 md:gap-4">
						<p className="text-xs md:text-sm lg:text-base font-medium text-gray-400">
							Historique Hebdomadaire
						</p>
						<div className="flex items-center gap-3 md:gap-4 lg:gap-6">
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
									<span className="text-lg md:text-xl lg:text-2xl font-bold">92%</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base font-medium text-gray-400">W1</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
									<span className="text-lg md:text-xl lg:text-2xl font-bold">95%</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base font-medium text-gray-400">W2</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500">
									<span className="text-lg md:text-xl lg:text-2xl font-bold">88%</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base font-medium text-gray-400">W3</p>
							</div>
							<div className="flex flex-col items-center gap-1 md:gap-2">
								<div className="flex h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
									<span className="text-lg md:text-xl lg:text-2xl font-bold">94%</span>
								</div>
								<p className="text-xs md:text-sm lg:text-base font-medium text-gray-400">W4</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<main className="flex-1 overflow-hidden bg-slate-900">
			<div className="p-4 sm:p-6 lg:p-8">
				<div className="flex w-full flex-col gap-6">
					{/* Header */}
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div className="flex flex-col gap-1">
							<h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white">
								Supply Chain - {activeTab === "monthly" ? "Mensuel" : "Hebdomadaire"}
							</h1>
							<p className="text-sm md:text-base lg:text-lg font-normal text-gray-400">
								{activeTab === "monthly" ? "Mois en cours: Mai" : "Semaine actuelle: 20-26 May"}
							</p>
						</div>
						<TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
					</div>

					{/* Content based on active tab */}
					{activeTab === "monthly" ? <MonthlySupplyChain /> : <WeeklySupplyChain />}
				</div>
			</div>
		</main>
	)
}
