"use client"

import { useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { UploadSection, FileUploadProvider } from './_components'

export interface Department {
	id: string
	name: string
	icon?: string
}

const departments: Department[] = [
	{ id: 'operations', name: 'Operations' },
	{ id: 'quality', name: 'Quality' },
	{ id: 'supply-chain', name: 'Supply Chain' },
	{ id: 'finance', name: 'Finance' },
	{ id: 'human-resources', name: 'Human Resources' },
	{ id: 'programs', name: 'Programs' },
]

const DOMAIN_OPTIONS = [
	'FINANCE',
	'FINANCE_TARGET',
	'RH',
	'RH_TARGET',
	'OPERATION',
	'OPERATION_TARGET',
	'PROGRAM',
	'PROGRAM_TARGET',
	'QUALITY',
	'QUALITY_TARGET',
	'CLIENT',
	'CLIENT_TARGET',
	'INV',
	'INV_TARGET',
	'INV_MONTH',
	'INV_MONTH_TARGET',
] as const

const YEAR_OPTIONS = ['2024', '2025', '2026', '2027', '2028'] as const

export default function ImportationPage() {
	const [selectedDomain, setSelectedDomain] =
		useState<(typeof DOMAIN_OPTIONS)[number]>('INV')
	const [selectedYear, setSelectedYear] = useState<string>('2026')

	return (
		<FileUploadProvider>
			<div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8">
				{/* Page Header */}
				<div className="mb-6 sm:mb-8">
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
						Importation
					</h1>
					<p className="text-base sm:text-lg text-muted-foreground">
						Manage imported data for each department.
					</p>
				</div>

				<div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="space-y-2">
						<label className="text-sm font-medium text-foreground">
							Domain
						</label>
						<Select
							value={selectedDomain}
							onValueChange={(value) =>
								setSelectedDomain(
									value as (typeof DOMAIN_OPTIONS)[number],
								)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select domain" />
							</SelectTrigger>
							<SelectContent>
								{DOMAIN_OPTIONS.map((domain) => (
									<SelectItem key={domain} value={domain}>
										{domain}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium text-foreground">
							Year
						</label>
						<Select
							value={selectedYear}
							onValueChange={setSelectedYear}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select year" />
							</SelectTrigger>
							<SelectContent>
								{YEAR_OPTIONS.map((year) => (
									<SelectItem key={year} value={year}>
										{year}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Department Sections */}
				<div className="space-y-6 sm:space-y-8">
					{departments.map((department) => (
						<UploadSection
							key={department.id}
							department={department}
							domain={selectedDomain}
							year={selectedYear}
						/>
					))}
				</div>
			</div>
		</FileUploadProvider>
	)
}
