"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/ThemeModeToggle"
import { Bell, User } from "lucide-react"

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
					<Link href="/" className="flex items-center gap-2">
						<div className="flex items-center">
							<span className="text-2xl font-bold text-blue-500">V</span>
							<span
								className={`text-xl font-semibold ${
									isLight ? "text-slate-900" : "text-white"
								}`}
							>
								vizora
							</span>
						</div>
					</Link>

					{/* Navigation Tabs */}
					<nav className="hidden md:flex items-center gap-1">
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

				{/* Right Side Actions */}
				<div className="flex items-center gap-3">
					{!isLight && <ModeToggle />}
					<button
						className={`relative p-2 rounded-lg transition-colors ${
							isLight
								? "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
								: "text-gray-400 hover:text-white hover:bg-slate-800"
						}`}
					>
						<Bell className="h-5 w-5" />
						<span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
					</button>
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
				className={`md:hidden border-t overflow-x-auto ${
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
