type TabType = "weekly" | "monthly";

interface TabSelectorProps {
	activeTab: TabType
	onTabChange: (tab: TabType) => void
	weeklyLabel?: string
	monthlyLabel?: string
	variant?: "light" | "dark"
}

export const TabSelector = ({
	activeTab,
	onTabChange,
	weeklyLabel = "Hebdomadaires",
	monthlyLabel = "Mensuel",
	variant = "dark",
}: TabSelectorProps) => {
	const isLight = variant === "light"

	return (
		<div
			className={`flex items-center gap-1 p-1 rounded-lg border backdrop-blur-sm ${
				isLight
					? "bg-slate-100/80 border-slate-200"
					: "bg-slate-800/50 border-slate-700/50"
			}`}
		>
			<button
				onClick={() => onTabChange("weekly")}
				className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
					activeTab === "weekly"
						? "bg-blue-600 text-white shadow-lg"
						: isLight
							? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
							: "text-gray-300 hover:text-white hover:bg-slate-700/50"
				}`}
			>
				{weeklyLabel}
			</button>
			<button
				onClick={() => onTabChange("monthly")}
				className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
					activeTab === "monthly"
						? "bg-blue-600 text-white shadow-lg"
						: isLight
							? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
							: "text-gray-300 hover:text-white hover:bg-slate-700/50"
				}`}
			>
				{monthlyLabel}
			</button>
		</div>
	)
}