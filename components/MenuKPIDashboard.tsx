import React from "react";
import { navigationItems } from "@/lib/kpi-data";
import { useRouter } from "next/navigation";

const MenuKPIDashboard = () => {
  const router = useRouter();

  const handleNavigationClick = (itemId: string) => {
    if (itemId === "overview") {
      router.push("/");
    } else {
      router.push(`/category-dashboard/${itemId}`);
    }
  };

  return (
    <div className="relative">
      {/* Background Pattern */}

      <div className="p-5 dark:bg-slate-800/90 backdrop-blur-sm shadow-md shadow-slate-300/20 dark:shadow-slate-900/30">
        <div className="space-y-3">
          <div className="flex items-center justify-end gap-4">

            {/* Navigation Items */}
            <nav className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigationClick(item.id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-dark-blue dark:text-primary hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:shadow-md"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuKPIDashboard;
