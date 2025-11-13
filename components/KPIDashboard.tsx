"use client";

import React from "react";
import {  navigationItems } from "@/lib/kpi-data";
import { useRouter } from "next/navigation";
import { WeeklyIndicators } from "@/components/WeeklyIndicators";

interface KPIDashboardProps {
  className?: string;
  dataset?: "executive-horizon" | "global-ops";
}

export function KPIDashboard({ className, dataset = "executive-horizon" }: KPIDashboardProps) {
  const router = useRouter();

  // Get the appropriate categories based on dataset

  const handleNavigationClick = (itemId: string) => {
    if (itemId === 'overview') {
      router.push('/')
    } else {
      router.push(`/category-dashboard/${itemId}`)
    }
  }


  return (
    <div className={`space-y-4 ${className}`}>
      {/* Enhanced Header with Same Design */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/20 via-transparent to-slate-700/20 rounded-2xl -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/20 rounded-2xl -z-10"></div>
        
        <div className="p-6 rounded-2xl border border-slate-700/50 bg-slate-800/90 backdrop-blur-sm shadow-xl shadow-slate-900/30">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-lg"></div>
                  <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/10 text-blue-400 shadow-lg ring-1 ring-blue-400/20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
                    Professional KPI Dashboard
                  </h1>
                </div>
              </div>
              
              {/* Navigation Items */}
              <nav className="hidden lg:flex items-center gap-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigationClick(item.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-300 hover:text-white hover:bg-slate-700/50 hover:shadow-md"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Categories Grid - Enhanced with animations */}
      <WeeklyIndicators />
    </div>
  );
}
