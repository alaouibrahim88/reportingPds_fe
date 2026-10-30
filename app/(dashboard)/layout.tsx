"use client"

import BreadCrumbHeader from "@/components/BreadCrumbHeader"
import DesktopSidebar from "@/components/Sidebar"
import { Separator } from "@/components/ui/separator"
import { CategoryNavigationHeader } from "@/components/CategoryNavigationHeader"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { LogoutButton } from "@/components/LogoutButton"
import { getCookieValue } from "@/lib/storage"

// Pages that use the category navigation header
const CATEGORY_PAGES = [
	"/operations",
	"/finance",
	"/rh",
	"/programs",
	"/quality",
	"/supplychain",
]

const LIGHT_CATEGORY_PAGES = ["/programs", "/rh", "/finance", "/supplychain"]

// Default-layout pages sized to the screen (they lay out their own content without scrolling)
const FULL_HEIGHT_PAGES = ["/importation"]

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const pathname = usePathname()

	// Check if current page is a category page
	const isCategoryPage = CATEGORY_PAGES.some((page) => pathname === page)
	// White category pages (the others are dark)
	const isLightPage = LIGHT_CATEGORY_PAGES.includes(pathname)

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

	if (isCategoryPage) {
		return (
			<div className="flex h-screen">
				{/* Sidebar in the page colours: dark pages, or white for Programs, RH, Finance and Supply Chain */}
				<DesktopSidebar tone={isLightPage ? "light" : "dark"} />
				{/* min-w-0: the column keeps the screen width, the category tabs scroll instead (mobile) */}
				<div
					className={`flex flex-col flex-1 min-w-0 min-h-screen ${
						isLightPage ? "bg-slate-50" : "bg-slate-900"
					}`}
				>
					<CategoryNavigationHeader variant={isLightPage ? "light" : "dark"} />
					<div className="flex-1 overflow-auto">
						{/* Full height, so a page can fit the screen without scrolling */}
						<div
							className={`h-full ${isLightPage ? "text-slate-900" : "text-white"}`}
						>
							{children}
						</div>
					</div>
				</div>
			</div>
		)
	}

	// Default layout (with sidebar)
	if (FULL_HEIGHT_PAGES.includes(pathname)) {
		return (
			<div className="flex h-screen">
				<DesktopSidebar />
				<div className="flex flex-col flex-1 min-w-0 h-screen">
					<header className="flex items-center justify-between px-4 sm:px-6 py-1.5 bg-background">
						<div className="flex flex-row items-center justify-between w-full">
							<BreadCrumbHeader />
							<div className="gap-2 sm:gap-4 flex items-center">
								{isAuthenticated && <LogoutButton className="h-8 px-3 text-sm" />}
							</div>
						</div>
					</header>
					<Separator />
					{/* The page fills the rest of the screen; it scrolls only below its minimum size (phones) */}
					<div className="flex-1 min-h-0 overflow-auto">
						<div className="h-full text-foreground">{children}</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex h-screen">
			<DesktopSidebar />
			<div className="flex flex-col flex-1 min-h-screen">
				{/* Compact bar: breadcrumb + logout (the theme toggle stays on the category pages) */}
				<header className="flex items-center justify-between px-4 sm:px-6 py-1.5 bg-background">
					<div className="flex flex-row items-center justify-between w-full">
						<BreadCrumbHeader />
						<div className="gap-2 sm:gap-4 flex items-center">
							{isAuthenticated && <LogoutButton className="h-8 px-3 text-sm" />}
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
