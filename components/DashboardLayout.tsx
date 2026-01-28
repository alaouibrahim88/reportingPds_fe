"use client"

import React from "react"
import { CategoryData } from "@/types"
import { DashboardHeader } from "@/components/DashboardHeader"

interface DashboardLayoutProps {
	category: CategoryData
	onBackClick: () => void
	onNavigate?: (categoryId: string) => void
	className?: string
	children?: React.ReactNode
}

export function DashboardLayout({
	category,
	onBackClick,
	onNavigate,
	className,
	children,
}: DashboardLayoutProps) {
	return (
		<div className={`min-h-screen bg-slate-900 dark:bg-slate-900 ${className}`}>
			{/* Dashboard Header */}
			<DashboardHeader
				currentCategory={category.id}
				onNavigate={onNavigate}
				onBack={onBackClick}
			/>

			{/* Dashboard Content */}
			{children}
		</div>
	)
}
