"use client";

import React from "react";
import { CategoryData } from "@/lib/kpi-data";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CategoryDashboard } from "@/components/CategoryDashboard";

interface DashboardLayoutProps {
  category: CategoryData;
  onBackClick: () => void;
  onNavigate?: (categoryId: string) => void;
  className?: string;
}

export function DashboardLayout({ 
  category, 
  onBackClick, 
  onNavigate,
  className 
}: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen bg-slate-900 dark:bg-slate-900 ${className}`}>
      {/* Dashboard Header */}
      <DashboardHeader 
        currentCategory={category.id}
        onNavigate={onNavigate}
        onBack={onBackClick}
      />
      
      {/* Category Dashboard Content */}
      <CategoryDashboard category={category} />
    </div>
  );
}
