"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { getCategoryData } from "@/lib/kpi-data";

export default function CategoryDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.category as string;
  
  console.log('CategoryDashboardPage - categoryId:', categoryId);
  console.log('CategoryDashboardPage - params:', params);
  
  // Get category data from navigationItems
  const category = getCategoryData(categoryId);
  
  console.log('Found category:', category ? category.name : 'NOT FOUND');
  
  if (!category) {
    // Show error message instead of redirect to avoid infinite loops
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
          <p className="text-slate-400 mb-6">The category &quot;{categoryId}&quot; does not exist.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    router.push('/');
  };

  const handleNavigate = (newCategoryId: string) => {
    router.push(`/category-dashboard/${newCategoryId}`);
  };

  return (
    <DashboardLayout 
      category={category}
      onBackClick={handleBackClick}
      onNavigate={handleNavigate}
    />
  );
}
