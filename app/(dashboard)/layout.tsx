"use client"

import BreadCrumbHeader from "@/components/BreadCrumbHeader"
import DesktopSidebar from "@/components/Sidebar"
import { ModeToggle } from "@/components/ThemeModeToggle"
import { Separator } from "@/components/ui/separator"
import { CategoryNavigationHeader } from "@/components/CategoryNavigationHeader"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { LogoutButton } from "@/components/LogoutButton"
import { getCookieValue } from "@/lib/storage"

// Pages that should use the category navigation header (no sidebar)
const CATEGORY_PAGES = [
	"/operations",
	"/finance",
	"/rh",
	"/programs",
	"/quality",
	"/supplychain",
]

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const pathname = usePathname()

	// Check if current page is a category page
	const isCategoryPage = CATEGORY_PAGES.some((page) => pathname === page)
	const isProgramsPage = pathname === "/programs"

	useEffect(() => {
		const checkAuthentication = async () => {
			try {
				const token = await getCookieValue("access_token")
				setIsAuthenticated(!!token)
			} catch (error) {
				console.error("Error checking authentication:", error)
				setIsAuthenticated(false)
			}
		}

		checkAuthentication()
	}, [])

	// Category pages layout (no sidebar, category navigation header)
	// Programs page uses light theme; other category pages use dark theme
	if (isCategoryPage) {
		return (
			<div
				className={`flex flex-col min-h-screen ${
					isProgramsPage ? "bg-slate-50" : "bg-slate-900"
				}`}
			>
				<CategoryNavigationHeader variant={isProgramsPage ? "light" : "dark"} />
				<div className="flex-1 overflow-auto">
					<div
						className={isProgramsPage ? "text-slate-900" : "text-white"}
					>
						{children}
					</div>
				</div>
			</div>
		)
	}

	// Default layout (with sidebar)
	return (
		<div className="flex h-screen">
			<DesktopSidebar />
			<div className="flex flex-col flex-1 min-h-screen">
				<header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-background border-b">
					<div className="flex flex-row justify-between w-full">
						<BreadCrumbHeader />
						<div className="gap-2 sm:gap-4 flex items-center">
							<ModeToggle />
							{isAuthenticated && <LogoutButton />}
						</div>
					</div>
				</header>
				<Separator />
				<div className="overflow-auto">
					<div className="flex-1 text-foreground">{children}</div>
				</div>
			</div>
		</div>
	)
}
