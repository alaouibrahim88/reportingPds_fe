"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getIconComponent } from "@/components/IconComponent";
import { CategoryData } from "@/lib/kpi-data";
import { ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown } from "lucide-react";

interface CategoryHeaderProps {
  category: CategoryData;
  className?: string;
}

interface KPICardProps {
  title: string;
  value: string;
  trend?: string;
  trendColor?: string;
  target?: string;
  lastWeeks?: string[];
  size?: "small" | "medium" | "large";
  showChart?: boolean;
}

function KPICard({ title, value, trend, trendColor, target, lastWeeks, size = "medium", showChart = false }: KPICardProps) {
  const getTrendIcon = (trendStr?: string, color?: string) => {
    if (!trendStr || !color) return null;
    
    const isPositive = color.includes("green");
    const isNegative = color.includes("red");
    
    if (isPositive) {
      return <ArrowUp className="w-3 h-3" />;
    } else if (isNegative) {
      return <ArrowDown className="w-3 h-3" />;
    } else {
      return <Minus className="w-3 h-3" />;
    }
  };

  const getProgressBar = (value: string, target?: string) => {
    // Simple progress visualization based on common patterns
    const numValue = parseFloat(value.replace(/[^\d.-]/g, ''));
    const targetValue = target ? parseFloat(target.replace(/[^\d.-]/g, '')) : 100;
    
    const percentage = Math.min((numValue / targetValue) * 100, 100);
    const getBarColor = () => {
      if (percentage >= 95) return "bg-green-500";
      if (percentage >= 85) return "bg-blue-500";
      if (percentage >= 70) return "bg-yellow-500";
      return "bg-red-500";
    };

    return (
      <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
        <div 
          className={`h-full ${getBarColor()} transition-all duration-500 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const cardSizeClasses = {
    small: "p-3",
    medium: "p-4",
    large: "p-5"
  };

  const valueSizeClasses = {
    small: "text-lg",
    medium: "text-2xl",
    large: "text-3xl"
  };

  return (
    <Card className="bg-card/50 border border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 backdrop-blur-sm group">
      <CardContent className={cardSizeClasses[size]}>
        <div className="space-y-3">
          {/* Title */}
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {title}
            </h3>
            {showChart && (
              <div className="text-primary/60 group-hover:text-primary transition-colors">
                <TrendingUp className="w-3 h-3" />
              </div>
            )}
          </div>

          {/* Main Value */}
          <div className="flex items-end justify-between">
            <div className={`font-black text-foreground group-hover:text-primary transition-colors duration-300 ${valueSizeClasses[size]}`}>
              {value}
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-medium ${trendColor || 'text-muted-foreground'}`}>
                {getTrendIcon(trend, trendColor)}
                <span>{trend}</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {target && (
            <div className="space-y-2">
              {getProgressBar(value, target)}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className="font-medium">{target}</span>
                <span>Current: {value}</span>
              </div>
            </div>
          )}

          {/* Mini Chart or Last Weeks */}
          {showChart && lastWeeks && (
            <div className="flex items-end gap-1 h-8">
              {lastWeeks.map((week, index) => {
                const height = Math.random() * 24 + 8; // Simulated chart
                return (
                  <div
                    key={index}
                    className="bg-primary/30 group-hover:bg-primary/50 rounded-sm flex-1 transition-all duration-300"
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>
          )}

          {/* Last Weeks Data */}
          {!showChart && lastWeeks && lastWeeks.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
              <span className="text-muted-foreground/70">5W:</span>
              <div className="flex gap-1">
                {lastWeeks.slice(-3).map((week, index) => (
                  <span key={index} className="px-1.5 py-0.5 bg-muted/40 rounded text-xs">
                    {week}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryHeader({ category, className }: CategoryHeaderProps) {
  // Get top 6 KPIs for the header display
  const topKPIs = category.kpis.slice(0, 6);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Title Section */}
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-background/20 rounded-2xl -z-10"></div>
        
        <div className="p-4 sm:p-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg"></div>
              <div className="relative p-3 sm:p-4 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 text-primary shadow-lg ring-1 ring-primary/20">
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                  {getIconComponent(category.icon)}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent tracking-tight">
                {category.name} Dashboard
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-2">
                <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {category.kpis.length} Key Performance Indicators
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly KPIs Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-foreground">Weekly KPIs</h2>
          <div className="h-px bg-border flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topKPIs.slice(0, 4).map((kpi, index) => (
            <KPICard
              key={`weekly-${index}`}
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              trendColor={kpi.trendColor}
              target={kpi.target}
              lastWeeks={kpi.lastWeeks}
              size="medium"
            />
          ))}
        </div>
      </div>

      {/* Monthly KPIs Section */}
      {topKPIs.length > 4 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-foreground">Monthly KPIs</h2>
            <div className="h-px bg-border flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topKPIs.slice(4, 6).map((kpi, index) => (
              <KPICard
                key={`monthly-${index}`}
                title={kpi.title}
                value={kpi.value}
                trend={kpi.trend}
                trendColor={kpi.trendColor}
                target={kpi.target}
                lastWeeks={kpi.lastWeeks}
                size="large"
                showChart={true}
              />
            ))}
            
            {/* Additional summary card if we have more KPIs */}
            {category.kpis.length > 6 && (
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-5 text-center">
                  <div className="space-y-3">
                    <div className="text-3xl font-black text-primary">
                      +{category.kpis.length - 6}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      More KPIs
                    </div>
                    <div className="text-xs text-muted-foreground">
                      View detailed analytics below
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Action Links Section */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/30">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
          Action Plan
        </button>
        <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm">
          View Details
        </button>
        <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors text-sm">
          Export Report
        </button>
      </div>
    </div>
  );
}
