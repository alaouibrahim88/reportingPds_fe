"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { UploadSection, FileUploadProvider } from './_components'
import MenuKPIDashboard from '@/components/MenuKPIDashboard'
import { getCookieValue } from '@/lib/storage'

export interface Department {
	id: string
	name: string
	icon?: string
}

const departments: Department[] = [
	{ id: 'operation', name: 'Operation' },
	{ id: 'quality', name: 'Quality' },
	{ id: 'supply-chain', name: 'Supply Chain' },
	{ id: 'finance', name: 'Finance' },
	{ id: 'human-resources', name: 'Human Resources' },
	{ id: 'programs', name: 'Programs' },
]

const DOMAIN_OPTIONS = [
	'FINANCE',
	'FINANCE_TARGET',
	'FINANCE_MONTHLY',
	'FINANCE_TARGET_MONTHLY',
	'RH',
	'RH_TARGET',
	'RH_MONTHLY',
	'RH_TARGET_MONTHLY',
	'OPERATION',
	'OPERATION_TARGET',
	'OPERATION_MONTHLY',
	'OPERATION_TARGET_MONTHLY',
	'PROGRAM',
	'PROGRAM_TARGET',
	'PROGRAM_MONTHLY',
	'PROGRAM_TARGET_MONTHLY',
	'QUALITY',
	'QUALITY_TARGET',
	'QUALITY_MONTHLY',
	'QUALITY_TARGET_MONTHLY',
	'CLIENT',
	'CLIENT_TARGET',
	'CLIENT_MONTHLY',
	'CLIENT_TARGET_MONTHLY',
	'INV',
	'INV_TARGET',
	'INV_MONTH',
	'INV_MONTH_TARGET',
] as const

const YEAR_OPTIONS = ['2024', '2025', '2026', '2027', '2028'] as const

type DomainOption = (typeof DOMAIN_OPTIONS)[number]

function getFilteredDepartments(usernameUpper: string): Department[] {
	if (!usernameUpper) return departments
	return departments.filter((dept) => {
		const deptIdUpper = dept.id.toUpperCase()
		const deptIdBase = deptIdUpper.split('-')[0]
		if (usernameUpper.includes('SUPPLYCH')) return dept.id === 'supply-chain'
		if(usernameUpper.includes('RH')) return dept.id === 'human-resources'
		return (
			deptIdUpper.includes(usernameUpper) || usernameUpper.includes(deptIdBase)
		)
	})
}

function getFilteredDomainOptions(usernameUpper: string): readonly DomainOption[] {
	if (!usernameUpper) return DOMAIN_OPTIONS
	if (usernameUpper.includes('SUPPLYCH')) return ['INV', 'INV_TARGET'] as const
	return DOMAIN_OPTIONS.filter((domain) => domain.includes(usernameUpper))
}

export default function ImportationPage() {
	const [username, setUsername] = useState<string | null>(null)
	const [selectedDomain, setSelectedDomain] = useState<DomainOption>('INV')
	const [selectedYear, setSelectedYear] = useState<string>('2026')

	useEffect(() => {
		getCookieValue('username').then((value) => setUsername(value ?? null))
	}, [])

	const usernameUpper = (username ?? '').toUpperCase()

	const effectiveDepartments = useMemo(() => {
		const filtered = getFilteredDepartments(usernameUpper)
		return filtered.length > 0 ? filtered : departments
	}, [usernameUpper])

	const effectiveDomainOptions = useMemo(() => {
		const filtered = getFilteredDomainOptions(usernameUpper)
		return filtered.length > 0 ? filtered : DOMAIN_OPTIONS
	}, [usernameUpper])

	const enabledDepartmentIds = useMemo(
		() => new Set(effectiveDepartments.map((d) => d.id)),
		[effectiveDepartments],
	)

	useEffect(() => {
		const isValid = (effectiveDomainOptions as readonly string[]).includes(
			selectedDomain,
		)
		if (!isValid && effectiveDomainOptions.length > 0) {
			const fallback = effectiveDomainOptions[0] as DomainOption
			if (fallback !== selectedDomain) {
				setSelectedDomain(fallback)
			}
		}
	}, [usernameUpper, effectiveDomainOptions, selectedDomain])

	const handleDomainChange = useCallback((value: string) => {
		setSelectedDomain(value as DomainOption)
	}, [])

	const handleYearChange = useCallback((value: string) => {
		setSelectedYear(value)
	}, [])

	return (
		<>
		    <MenuKPIDashboard />
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
								onValueChange={handleDomainChange}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select domain" />
								</SelectTrigger>
								<SelectContent>
									{effectiveDomainOptions.map((domain) => (
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
								onValueChange={handleYearChange}
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
								disabled={!enabledDepartmentIds.has(department.id)}
							/>
						))}
					</div>
				</div>
			</FileUploadProvider>
		</>

	)
}
