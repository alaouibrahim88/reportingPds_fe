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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-background/20 rounded-2xl -z-10"></div>
        
        <div className="p-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-lg dark:shadow-primary/5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg"></div>
                  <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 dark:from-primary/20 dark:to-primary/5 text-primary shadow-lg ring-1 ring-primary/20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight">
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
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-foreground/70 hover:text-foreground hover:bg-primary/10 hover:shadow-md"
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
