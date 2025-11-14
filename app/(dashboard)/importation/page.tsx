"use client"

import { useState } from 'react'
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

export default function ImportationPage() {
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

				{/* Department Sections */}
				<div className="space-y-6 sm:space-y-8">
					{departments.map((department) => (
						<UploadSection
							key={department.id}
							department={department}
						/>
					))}
				</div>
			</div>
		</FileUploadProvider>
	)
}
