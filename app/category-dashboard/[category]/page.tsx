"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

// Valid category IDs that have dedicated pages in (dashboard)
const VALID_CATEGORIES = [
	"operations",
	"finance",
	"rh",
	"programs",
	"quality",
	"supplychain",
]

export default function CategoryDashboardPage() {
	const params = useParams()
	const router = useRouter()
	const categoryId = params.category as string

	useEffect(() => {
		// Redirect to the corresponding page in (dashboard)
		if (VALID_CATEGORIES.includes(categoryId)) {
			router.replace(`/${categoryId}`)
		} else {
			// Redirect to home if category doesn't exist
			router.replace("/")
		}
	}, [categoryId, router])

	// Show loading state while redirecting
	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-900">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
				<p className="text-slate-400">Redirecting...</p>
			</div>
		</div>
	)
}
