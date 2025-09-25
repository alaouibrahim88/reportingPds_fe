"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIconComponent } from "@/components/IconComponent";
import { dashboardCategoriesMap } from "@/lib/kpi-data";
import { useRouter } from "next/navigation";

interface KPIDashboardProps {
  className?: string;
  dataset?: "executive-horizon" | "global-ops";
}

export function KPIDashboard({ className, dataset = "executive-horizon" }: KPIDashboardProps) {
  const router = useRouter();

  // Get the appropriate categories based on dataset
  const currentCategories = dashboardCategoriesMap[dataset];

  const handleCategoryClick = (categoryId: string) => {
    console.log('Navigating to category:', categoryId);
    
    // Navigate directly to the category dashboard
    const targetUrl = `/category-dashboard/${categoryId}`;
    console.log('Target URL:', targetUrl);
    
    try {
      router.push(targetUrl);
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window.location
      window.location.href = targetUrl;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Enhanced Header with Same Design */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-background/20 rounded-2xl -z-10"></div>
        
        <div className="p-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-lg dark:shadow-primary/5">
          <div className="space-y-3">
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
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {currentCategories.length} Categories
                  </span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Monitor key performance indicators across departments with real-time insights and analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Main Categories Grid - Enhanced with animations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {currentCategories.map((category, index) => (
          <Card
            key={category.id}
            className="cursor-pointer group relative overflow-hidden bg-card border-2 border-border/50 hover:border-primary/30 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleCategoryClick(category.id)}
          >
            {/* Enhanced hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <CardHeader className="pb-2 pt-4 px-4 relative z-10">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg font-bold text-foreground flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 shadow-sm group-hover:shadow-primary/25">
                    {getIconComponent(category.icon)}
                  </div>
                  <span className="group-hover:text-primary transition-colors duration-300 tracking-tight">
                    {category.name}
                  </span>
                </CardTitle>
                <div className="flex items-center gap-1 text-primary/70 group-hover:text-primary font-medium group-hover:translate-x-1 transition-all duration-300">
                  <span className="text-xs font-semibold">View</span>
                  <div className="w-5 h-5 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center group-hover:rotate-45 transition-all duration-300">
                    <span className="text-xs group-hover:text-primary-foreground">→</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 px-4 pb-4">
              <div className="space-y-3">
                {/* Enhanced KPI Preview */}
                <div className="p-3 rounded-lg bg-muted/50 group-hover:bg-muted/70 transition-all duration-500 border border-border/40 group-hover:border-primary/20">
                  <div className="text-xs font-bold text-muted-foreground/90 uppercase tracking-wider mb-2 group-hover:text-muted-foreground transition-colors duration-300">
                    {category.kpis[0].title}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-black text-foreground group-hover:scale-105 group-hover:text-primary transition-all duration-500 tracking-tight">
                      {category.kpis[0].value}
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">5W</div>
                      <div className="text-xs font-mono text-muted-foreground bg-background/80 px-2 py-1 rounded border border-border/30 shadow-sm">
                        {category.kpis[0].lastWeeks?.join(" • ")}
                      </div>
                    </div>
                  </div>
                  {category.kpis[0].target && (
                    <div className={`text-xs font-semibold mt-2 px-2 py-1 rounded bg-background/80 border border-border/40 ${category.kpis[0].trendColor || 'text-muted-foreground'} transition-all duration-300`}>
                      <span className="mr-1">🎯</span>
                      {category.kpis[0].target}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
