"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import Logo from "./Logo"
import { LogoutButton } from "./LogoutButton"
import { PolydesignLogo } from "./PolydesignLogo"
interface CategoryNavigationHeaderProps {
	variant?: "light" | "dark"
}

const CATEGORY_NAVIGATION = [
	{ id: "operations", label: "Operations", href: "/operations" },
	{ id: "quality", label: "Quality", href: "/quality" },
	{ id: "programs", label: "Programs", href: "/programs" },
	{ id: "rh", label: "RH", href: "/rh" },
	{ id: "finance", label: "Finance", href: "/finance" },
	{ id: "supplychain", label: "Supply Chain", href: "/supplychain" },
]

export function CategoryNavigationHeader({
	variant = "dark",
}: CategoryNavigationHeaderProps) {
	const pathname = usePathname()
	const isLight = variant === "light"

	return (
		<header
			className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-opacity-80 ${
				isLight
					? "border-slate-200 bg-white/95 supports-[backdrop-filter]:bg-white/80"
					: "border-slate-700/50 bg-slate-900/95 supports-[backdrop-filter]:bg-slate-900/80"
			}`}
		>
			<div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<div className="flex items-center gap-8">
					{/* Logo already links to the home page: no outer Link (nested <a> broke hydration) */}
					<div className="flex items-center gap-2">
						<Logo height={100} />
					</div>

					{/* Navigation Tabs */}
					<nav className="hidden lg:flex items-center gap-1">
						{CATEGORY_NAVIGATION.map((item) => {
							const isActive = pathname === item.href
							return (
								<Link
									key={item.id}
									href={item.href}
									className={`
										px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
										${
											isActive
												? "bg-blue-600 text-white shadow-sm"
												: isLight
													? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
													: "text-gray-400 hover:text-white hover:bg-slate-800"
										}
									`}
								>
									{item.label}
								</Link>
							)
						})}
					</nav>
				</div>

				{/* Company logo next to the account actions (hidden where the tabs need the space) */}
				<div className="hidden min-w-0 flex-1 items-center justify-end pl-6 pr-5 md:flex lg:hidden xl:flex">
					<PolydesignLogo tone={isLight ? "light" : "dark"} />
					<span className={`ml-5 h-8 w-px ${isLight ? "bg-slate-200" : "bg-slate-700"}`} />
				</div>

				{/* Right Side Actions */}
				<div className="flex items-center gap-3">
					{/* Same button as the other pages, in the header colours */}
					<LogoutButton
						className={`h-8 px-3 text-sm ${
							isLight
								? "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900"
								: "border-slate-600 bg-transparent text-gray-300 hover:bg-slate-800 hover:text-white"
						}`}
					/>
					<button
						className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
							isLight
								? "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
								: "text-gray-400 hover:text-white hover:bg-slate-800"
						}`}
					>
						<div
							className={`h-8 w-8 rounded-full flex items-center justify-center ${
								isLight ? "bg-slate-200" : "bg-slate-700"
							}`}
						>
							<User className="h-5 w-5" />
						</div>
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div
				className={`lg:hidden border-t overflow-x-auto ${
					isLight
						? "border-slate-200 bg-white"
						: "border-slate-700/50 bg-slate-900"
				}`}
			>
				<nav className="flex items-center gap-1 px-4 py-2">
					{CATEGORY_NAVIGATION.map((item) => {
						const isActive = pathname === item.href
						return (
							<Link
								key={item.id}
								href={item.href}
								className={`
									px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200
									${
										isActive
											? "bg-blue-600 text-white shadow-sm"
											: isLight
												? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
												: "text-gray-400 hover:text-white hover:bg-slate-800"
									}
								`}
							>
								{item.label}
							</Link>
						)
					})}
				</nav>
			</div>
		</header>
	)
}
