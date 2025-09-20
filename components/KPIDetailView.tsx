"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { getIconComponent } from "@/components/IconComponent";
import { CategoryData } from "@/lib/kpi-data";

interface KPIDetailViewProps {
  category: CategoryData;
  onBackClick: () => void;
  className?: string;
}

export function KPIDetailView({ category, onBackClick, className }: KPIDetailViewProps) {
  return (
    <div className={`space-y-6 ${className} animate-in slide-in-from-right-5 duration-500`}>
      {/* Enhanced Header with Dark Mode Styling */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-background/20 rounded-2xl -z-10"></div>
        
        <div className="flex items-center justify-between gap-6 p-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-lg dark:shadow-primary/5">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg"></div>
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 dark:from-primary/20 dark:to-primary/5 text-primary shadow-lg ring-1 ring-primary/20">
                  {getIconComponent(category.icon)}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight">
                  {category.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {category.kpis.length} Metrics
                  </span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Comprehensive analytics and detailed metrics for {category.name.toLowerCase()} performance with real-time insights.
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={onBackClick}
            className="flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-background/80 dark:bg-background/60 border-2 border-border/50 hover:border-primary/50 rounded-xl px-6 py-3 group shadow-lg hover:shadow-xl hover:shadow-primary/20 backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-2 transition-transform duration-300 text-muted-foreground group-hover:text-primary" />
            <span className="font-bold text-foreground group-hover:text-primary">Back to Dashboard</span>
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {category.kpis.map((kpi, index) => (
          <Card 
            key={index} 
            className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/30 hover:border-primary/40 shadow-lg hover:shadow-2xl hover:shadow-primary/10 dark:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group animate-fade-in backdrop-blur-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/3 rounded-full blur-2xl group-hover:bg-primary/8 transition-colors duration-700"></div>
            
            <CardHeader className="pb-3 pt-4 px-4 relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-muted-foreground/90 uppercase tracking-wider group-hover:text-muted-foreground transition-colors duration-300">
                  {kpi.title}
                </CardTitle>
                <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10 px-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="text-4xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-110 group-hover:from-primary group-hover:to-primary/70 transition-all duration-500 tracking-tighter">
                  {kpi.value}
                </div>
                <div className="text-right space-y-2">
                  <div className="text-xs font-bold text-muted-foreground/80 uppercase tracking-widest flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-primary/50"></div>
                    5-Week Trend
                  </div>
                  <div className="text-xs font-mono text-muted-foreground bg-gradient-to-r from-background/90 to-background/70 dark:from-background/80 dark:to-background/60 px-3 py-2 rounded-lg border border-border/40 shadow-lg backdrop-blur-sm">
                    {kpi.lastWeeks?.join(" • ")}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                {kpi.target && (
                  <div className={`relative overflow-hidden text-sm font-bold px-4 py-3 rounded-xl bg-gradient-to-r from-background/90 via-background/80 to-background/70 dark:from-background/70 dark:via-background/60 dark:to-background/50 border border-border/50 group-hover:border-primary/30 group-hover:shadow-lg backdrop-blur-sm ${kpi.trendColor || 'text-muted-foreground'} transition-all duration-500`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></div>
                      <span className="font-black uppercase tracking-wide text-xs text-muted-foreground/80">Target:</span>
                      <span className="font-black">{kpi.target}</span>
                    </div>
                  </div>
                )}
                
                {kpi.trend && (
                  <div className={`relative overflow-hidden text-sm font-bold px-4 py-3 rounded-xl border transition-all duration-500 backdrop-blur-sm group-hover:shadow-lg ${kpi.trendColor} ${
                    kpi.trendColor?.includes('green') 
                      ? 'bg-gradient-to-r from-emerald-50/80 via-emerald-50/60 to-emerald-50/40 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-emerald-950/10 border-emerald-200/60 dark:border-emerald-800/40 group-hover:border-emerald-300/80 dark:group-hover:border-emerald-700/60' 
                      : kpi.trendColor?.includes('red') 
                      ? 'bg-gradient-to-r from-rose-50/80 via-rose-50/60 to-rose-50/40 dark:from-rose-950/30 dark:via-rose-950/20 dark:to-rose-950/10 border-rose-200/60 dark:border-rose-800/40 group-hover:border-rose-300/80 dark:group-hover:border-rose-700/60' 
                      : 'bg-gradient-to-r from-background/90 via-background/80 to-background/70 dark:from-background/70 dark:via-background/60 dark:to-background/50 border-border/50 group-hover:border-primary/30'
                  }`}>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      kpi.trendColor?.includes('green') 
                        ? 'bg-gradient-to-r from-emerald-200/20 to-transparent' 
                        : kpi.trendColor?.includes('red') 
                        ? 'bg-gradient-to-r from-rose-200/20 to-transparent' 
                        : 'bg-gradient-to-r from-primary/5 to-transparent'
                    }`}></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          {kpi.trendColor?.includes('green') ? (
                            <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                          ) : kpi.trendColor?.includes('red') ? (
                            <TrendingDown className="h-4 w-4 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform duration-300" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></div>
                          )}
                          <span className="font-black uppercase tracking-wide text-xs text-muted-foreground/80">Trend:</span>
                        </div>
                      </div>
                      <span className="font-black">{kpi.trend}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
