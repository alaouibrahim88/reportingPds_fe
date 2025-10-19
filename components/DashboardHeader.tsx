"use client";

import React from "react";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { navigationItems } from "@/lib/kpi-data";

interface DashboardHeaderProps {
  currentCategory?: string;
  onNavigate?: (category: string) => void;
  onBack?: () => void;
}

export function DashboardHeader({ currentCategory, onNavigate, onBack }: DashboardHeaderProps) {
  const router = useRouter();

  // Finance and HR Dashboards have light theme, others have dark theme
  const isLightTheme = currentCategory === "rh" || currentCategory === "finance";
  const headerBg = isLightTheme ? "bg-white/95 border-b border-slate-200/50" : "bg-slate-900/95 dark:bg-slate-900/95 border-b border-slate-800/50";

  return (
    <header className={`${headerBg} shadow-sm backdrop-blur-sm px-4 py-2`}>
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
            {/* Logo with improved styling */}
            <Logo logoType="default" width={200} height={90} />

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "overview") {
                      onBack?.();
                    } else {
                      // Navigate to category dashboard route
                      router.push(`/category-dashboard/${item.id}`);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentCategory === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : isLightTheme 
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right side - Enhanced Notifications and Profile */}
          <div className="flex items-center space-x-3">
            {/* Enhanced Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isLightTheme 
                    ? "text-slate-600 hover:text-slate-900 hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-50 border border-transparent hover:border-slate-200"
                    : "text-slate-300 hover:text-white hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-700 border border-transparent hover:border-slate-600"
                }`}
              >
                <Bell className="w-5 h-5" />
                {/* Notification badge */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              </Button>
            </div>

            {/* Enhanced Profile */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <Avatar className={`relative w-10 h-10 ring-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                isLightTheme 
                  ? "ring-slate-200 hover:ring-blue-400 hover:ring-4"
                  : "ring-slate-600 hover:ring-blue-400 hover:ring-4"
              }`}>
                <AvatarImage src="/api/placeholder/40/40" alt="Profile" className="object-cover" />
                <AvatarFallback className={`font-semibold transition-all duration-300 ${
                  isLightTheme 
                    ? "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 group-hover:from-blue-50 group-hover:to-blue-100"
                    : "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 group-hover:from-slate-600 group-hover:to-slate-700"
                }`}>
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              
              {/* Online status indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
    </header>
  );
}
