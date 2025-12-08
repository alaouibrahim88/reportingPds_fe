type TabType = "weekly" | "monthly";

interface TabSelectorProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    weeklyLabel?: string;
    monthlyLabel?: string;
}  
export const TabSelector = ({ 
    activeTab, 
    onTabChange, 
    weeklyLabel = "Hebdomadaires",
    monthlyLabel = "Mensuel" 
}: TabSelectorProps) => {
    return (
      <div className="flex items-center gap-1 p-1 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
        <button
          onClick={() => onTabChange("weekly")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === "weekly"
              ? "bg-blue-600 text-white shadow-lg"
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
              : "text-gray-300 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          {monthlyLabel}
        </button>
      </div>
    );
  }