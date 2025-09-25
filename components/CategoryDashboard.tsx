"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryData } from "@/lib/kpi-data";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface CategoryDashboardProps {
  category: CategoryData;
  className?: string;
}

interface DashboardKPICardProps {
  title: string;
  subtitle?: string;
  value: string;
  trend?: string;
  trendColor?: string;
  target?: string;
  lastWeeks?: string[];
  type?: "weekly" | "monthly";
  size?: "small" | "medium" | "large";
  showProgressBar?: boolean;
  showChart?: boolean;
  actionLink?: string;
}

function DashboardKPICard({ 
  title, 
  subtitle, 
  value, 
  trend, 
  trendColor, 
  target, 
  lastWeeks,
  type = "weekly",
  size = "medium",
  showProgressBar = false,
  showChart = false,
  actionLink = "Details"
}: DashboardKPICardProps) {
  const getTrendIcon = () => {
    if (!trend || !trendColor) return null;
    
    const isPositive = trendColor.includes("green");
    const isNegative = trendColor.includes("red");
    
    if (isPositive) {
      return <ArrowUp className="w-3 h-3" />;
    } else if (isNegative) {
      return <ArrowDown className="w-3 h-3" />;
    } else {
      return <Minus className="w-3 h-3" />;
    }
  };

  const getProgressSegments = () => {
    // Create progress bar segments based on common dashboard patterns
    const segments = [
      { label: "Excellent", color: "bg-green-500", width: "25%" },
      { label: "Good", color: "bg-blue-500", width: "25%" },
      { label: "Warning", color: "bg-yellow-500", width: "25%" },
      { label: "Critical", color: "bg-red-500", width: "25%" }
    ];
    
    return segments;
  };

  const cardSizes = {
    small: "p-4",
    medium: "p-5",
    large: "p-6"
  };

  const valueSizes = {
    small: "text-2xl",
    medium: "text-3xl", 
    large: "text-4xl"
  };

  return (
    <Card className="bg-slate-800 dark:bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300">
      <CardContent className={cardSizes[size]}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-sm">{title}</h3>
              {subtitle && (
                <p className="text-slate-400 text-xs mt-1">{subtitle}</p>
              )}
            </div>
            {actionLink && (
              <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto text-xs">
                {actionLink}
              </Button>
            )}
          </div>

          {/* Main Value and Trend */}
          <div className="flex items-end justify-between">
            <div className={`font-bold text-white ${valueSizes[size]}`}>
              {value}
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
                {getTrendIcon()}
                <span>{trend}</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {showProgressBar && (
            <div className="space-y-2">
              <div className="flex h-2 bg-slate-700 rounded-full overflow-hidden">
                {getProgressSegments().map((segment, index) => (
                  <div
                    key={index}
                    className={`${segment.color} opacity-60`}
                    style={{ width: segment.width }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              {target && (
                <div className="text-xs text-slate-400">
                  {target}
                </div>
              )}
            </div>
          )}

          {/* Chart or Last Weeks */}
          {showChart && lastWeeks && (
            <div className="flex items-end gap-1 h-12 mt-4">
              {lastWeeks.map((_, index) => {
                const height = Math.random() * 40 + 8;
                return (
                  <div
                    key={index}
                    className="bg-blue-500 opacity-70 rounded-sm flex-1 transition-all duration-300 hover:opacity-100"
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>
          )}

          {/* Target Info */}
          {target && !showProgressBar && (
            <div className="text-xs text-slate-400 bg-slate-900/50 px-3 py-2 rounded-lg">
              {target}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryDashboard({ category, className }: CategoryDashboardProps) {
  const getTopKPIs = (count: number) => category.kpis.slice(0, count);
  
  const getCategoryTitle = () => {
    const titles = {
      finance: "Finance Dashboard",
      operations: "Factory Performance Overview", 
      programs: "Programs Dashboard",
      quality: "Quality & Safety Dashboard",
      rh: "HR Dashboard",
      supplychain: "Supply Chain Dashboard"
    };
    return titles[category.id as keyof typeof titles] || `${category.name} Dashboard`;
  };

  const getCategorySubtitle = () => {
    const subtitles = {
      finance: "Monitoring key financial performance indicators",
      operations: "Key Performance Indicators for the current period",
      programs: "Monitoring key program performance indicators for project ramp-up", 
      quality: "Key Performance Indicators for Quality and Safety",
      rh: "Human Resources performance and analytics",
      supplychain: "Monitoring key supply chain performance indicators"
    };
    return subtitles[category.id as keyof typeof subtitles] || `${category.name} performance indicators`;
  };

  // Special layout for Finance Dashboard - Light Theme
  if (category.id === "finance") {
    return (
      <div className={`min-h-screen bg-white ${className}`}>
        <div className="p-6 space-y-8">
          {/* Finance Dashboard Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Finance Dashboard</h1>
            <p className="text-slate-600 text-lg">Monitoring key financial performance indicators.</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Weekly KPIs and Chart */}
            <div className="lg:col-span-2 space-y-8">
              {/* Weekly KPIs Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Weekly KPIs</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Invoicing/Delivery Rate */}
                  <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 text-blue-600">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                              </svg>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg">Invoicing/Delivery Rate</h3>
                          </div>
                          <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-800">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-600 font-medium">Produced & invoiced weekly.</div>
                        
                        <div className="flex items-end justify-between">
                          <div className="text-5xl font-bold text-slate-900 tracking-tight">96%</div>
                          <div className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <ArrowUp className="w-4 h-4" />
                            +1.5%
                          </div>
                        </div>

                        {/* Enhanced Progress Bar */}
                        <div className="space-y-3">
                          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            {/* Background segments with proper colors */}
                            <div className="absolute inset-0 flex">
                              <div className="w-[23%] bg-orange-400"></div>
                              <div className="w-[7.5%] bg-yellow-400"></div>
                              <div className="w-[7.5%] bg-green-400"></div>
                              <div className="w-[62%] bg-emerald-500"></div>
                            </div>
                            {/* Current value indicator at 96% */}
                            <div className="absolute left-[96%] top-0 w-1 h-full bg-slate-900 shadow-lg transform -translate-x-0.5"></div>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500 font-medium">
                            <span>Warning (&lt;92%)</span>
                            <span>Acceptable (92-95%)</span>
                            <span>Target (95-98%)</span>
                            <span>Excellent (&gt;98%)</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Total Overdue Amount */}
                  <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 text-red-600">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                              </svg>
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg">Total Overdue Amount</h3>
                          </div>
                          <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-800">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-600 font-medium">Unpaid receivables.</div>
                        
                        <div className="flex items-end justify-between">
                          <div className="text-5xl font-bold text-slate-900 tracking-tight">$1.2M</div>
                          <div className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            <ArrowUp className="w-4 h-4" />
                            +$50k
                          </div>
                        </div>

                        {/* Risk Level Progress Bar */}
                        <div className="space-y-3">
                          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            {/* Risk level segments */}
                            <div className="absolute inset-0 flex">
                              <div className="w-[33.33%] bg-green-400"></div>
                              <div className="w-[33.33%] bg-yellow-400"></div>
                              <div className="w-[16.67%] bg-orange-400"></div>
                              <div className="w-[16.67%] bg-red-500"></div>
                            </div>
                            {/* Current value indicator at $1.2M (warning zone) */}
                            <div className="absolute left-[80%] top-0 w-1 h-full bg-slate-900 shadow-lg transform -translate-x-0.5"></div>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500 font-medium">
                            <span>Excellent (&lt;$0.5M)</span>
                            <span>Target (&lt;$1M)</span>
                            <span>Warning (&lt;$1.5M)</span>
                            <span>Critical (&gt;$1.5M)</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Chiffre d'Affaires Section */}
              <Card className="bg-white border border-slate-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 text-xl mb-2">Chiffre d&apos;Affaires Réalisé (vs. Prévisionnel) et Forecast</h3>
                        <p className="text-sm text-slate-600 font-medium">Suivi de la performance commerciale et de la production vendue.</p>
                      </div>
                      <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-800">
                        Voir le rapport
                      </Button>
                    </div>
                    
                    {/* Empty chart area */}
                    <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-slate-300">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                          </svg>
                        </div>
                        <p className="text-slate-400 font-medium">Chart visualization area</p>
                        <p className="text-slate-300 text-sm mt-1">Data will be displayed here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Budget Execution Tracking */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Monthly KPIs</h2>
                
                <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-lg">Budget Execution Tracking</h3>
                        <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-800">
                          Details
                        </Button>
                      </div>
                      
                      <div className="text-sm text-slate-600 font-medium">Global budget consumption.</div>
                      
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="3"
                              strokeDasharray="85, 100"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl font-bold text-slate-900">85%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <div className="text-sm text-slate-600 font-medium">Target: 90%</div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md">
                          Optimization Suggestions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Efficiency Tracking */}
              <Card className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">Financial Efficiency Tracking</h3>
                        <p className="text-sm text-slate-600 font-medium mt-1">Global and by zone.</p>
                      </div>
                      <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-800">
                        Action Plan
                      </Button>
                    </div>
                    
                    <div className="space-y-5">
                      {/* Global */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700 w-20">Global</span>
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex-1 h-3 bg-green-500 rounded-full shadow-sm"></div>
                          <div className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full min-w-[60px] justify-center">
                            <ArrowUp className="w-3 h-3" />
                            <span>105%</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Zone A */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700 w-20">Zone A</span>
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex-1 h-3 bg-green-500 rounded-full shadow-sm"></div>
                          <div className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full min-w-[60px] justify-center">
                            <ArrowUp className="w-3 h-3" />
                            <span>112%</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Zone B */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700 w-20">Zone B</span>
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex-1 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="flex items-center gap-1 text-sm font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full min-w-[60px] justify-center">
                            <div className="w-3 h-0.5 bg-yellow-600 rounded"></div>
                            <span>98%</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Zone C */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700 w-20">Zone C</span>
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex-1 h-3 bg-red-500 rounded-full shadow-sm"></div>
                          <div className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full min-w-[60px] justify-center">
                            <ArrowDown className="w-3 h-3" />
                            <span>89%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special layout for Programs Dashboard - Enhanced to match image exactly
  if (category.id === "programs") {
    return (
      <div className={`min-h-screen bg-slate-900 dark:bg-slate-900 ${className}`}>
        <div className="p-6 space-y-8">
          {/* Programs Dashboard Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Programs Dashboard</h1>
            <p className="text-slate-400 text-lg">Monitoring key program performance indicators for project ramp-up.</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Weekly KPIs Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Weekly KPIs</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* OTD (On-Time Delivery) */}
                  <Card className="bg-slate-800/95 border-slate-700/60 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-7">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-xl tracking-tight">OTD (On-Time Delivery)</h3>
                          <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-semibold hover:text-blue-300 transition-colors">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-400 font-medium">% of deliveries made on time.</div>
                        
                        <div className="text-7xl font-black text-white tracking-tight drop-shadow-lg">88%</div>
                        
                        <div className="flex items-center gap-2 text-sm font-bold text-yellow-500 bg-yellow-500/10 px-3 py-2 rounded-full w-fit">
                          <ArrowDown className="w-4 h-4" />
                          -2%
                        </div>
                        
                        <div className="space-y-4">
                          <div className="relative h-4 bg-slate-700/50 rounded-full overflow-hidden shadow-inner border border-slate-600/30">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-600/40"></div>
                            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full rounded-full shadow-lg" style={{ width: '88%' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full"></div>
                          </div>
                          <div className="flex justify-between text-sm text-slate-300 font-semibold bg-slate-700/20 px-4 py-2 rounded-lg">
                            <span>Target: 95%</span>
                            <span>Last Week: 90%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recruitment Progress */}
                  <Card className="bg-slate-800/95 border-slate-700/60 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-7">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-xl tracking-tight">Recruitment Progress</h3>
                          <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-semibold hover:text-blue-300 transition-colors">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-400 font-medium">Milestones vs. planned.</div>
                        
                        <div className="flex items-center justify-center py-6">
                          <div className="relative w-40 h-40">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#3B82F6" />
                                  <stop offset="100%" stopColor="#1D4ED8" />
                                </linearGradient>
                                <filter id="progressGlow">
                                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                                  <feMerge> 
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                  </feMerge>
                                </filter>
                              </defs>
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#374151"
                                strokeWidth="4"
                              />
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="url(#progressGradient)"
                                strokeWidth="4"
                                strokeDasharray="75, 100"
                                strokeLinecap="round"
                                filter="url(#progressGlow)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <span className="text-4xl font-black text-white drop-shadow-lg">75%</span>
                                <div className="text-xs text-slate-400 font-medium mt-1">Complete</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center bg-slate-700/20 p-3 rounded-lg border border-slate-600/30">
                          <div className="text-sm text-slate-300 font-semibold">Target: 80%</div>
                          <div className="text-xs text-slate-400 mt-1">5% remaining to target</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Planning Progress (APQP) */}
              <Card className="bg-slate-800/95 border-slate-700/60 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                <CardContent className="p-7">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-xl tracking-tight">Planning Progress (APQP)</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-semibold hover:text-blue-300 transition-colors">
                        Full Plan
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">Milestones achieved vs. forecast.</div>
                    
                    {/* Enhanced Chart Legend */}
                    <div className="flex items-center gap-8 text-sm bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <div className="w-6 h-0.5 bg-blue-500 rounded-full shadow-sm"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-1 shadow-lg"></div>
                        </div>
                        <span className="text-slate-200 font-medium">Actual Progress</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          <svg width="24" height="4" viewBox="0 0 24 4">
                            <path d="M0 2 L24 2" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="3,3" strokeLinecap="round"/>
                          </svg>
                          <div className="w-2 h-2 bg-slate-400 ml-1" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                        </div>
                        <span className="text-slate-200 font-medium">Forecast</span>
                      </div>
                    </div>
                    
                    {/* Enhanced Line Chart */}
                    <div className="relative h-64 mt-6 bg-slate-900/30 rounded-lg p-4 border border-slate-700/40">
                      <svg className="w-full h-full" viewBox="0 0 450 240">
                        <defs>
                          {/* Enhanced grid pattern */}
                          <pattern id="chartGrid" width="90" height="24" patternUnits="userSpaceOnUse">
                            <path d="M 90 0 L 0 0 0 24" fill="none" stroke="#475569" strokeWidth="0.5" opacity="0.4"/>
                          </pattern>
                          
                          {/* Glow effects for lines */}
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        
                        {/* Chart background with grid */}
                        <rect width="100%" height="100%" fill="url(#chartGrid)" rx="4"/>
                        
                        {/* Chart border */}
                        <rect x="40" y="20" width="360" height="180" fill="none" stroke="#64748B" strokeWidth="1" opacity="0.3" rx="2"/>
                        
                        {/* Y-axis labels with better positioning */}
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value, index) => (
                          <text key={index} x="35" y={200 - (value * 1.6)} fill="#CBD5E1" fontSize="11" textAnchor="end" fontWeight="500">
                            {value}%
                          </text>
                        ))}
                        
                        {/* X-axis labels with better spacing */}
                        {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'].map((phase, index) => (
                          <text key={index} x={70 + (index * 72)} y="220" fill="#CBD5E1" fontSize="11" textAnchor="middle" fontWeight="500">
                            {phase}
                          </text>
                        ))}
                        
                        {/* Forecast line (dashed) with better positioning */}
                        <path
                          d="M 70 180 L 142 160 L 214 130 L 286 100 L 358 70"
                          stroke="#9CA3AF"
                          strokeWidth="2.5"
                          strokeDasharray="5,5"
                          fill="none"
                          strokeLinecap="round"
                          opacity="0.9"
                        />
                        
                        {/* Actual Progress line with glow effect */}
                        <path
                          d="M 70 170 L 142 145 L 214 115 L 286 110 L 358 80"
                          stroke="#3B82F6"
                          strokeWidth="3.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#glow)"
                        />
                        
                        {/* Data points for Actual Progress (circles) */}
                        {[
                          { x: 70, y: 170, value: '15%' },
                          { x: 142, y: 145, value: '35%' },
                          { x: 214, y: 115, value: '55%' },
                          { x: 286, y: 110, value: '58%' },
                          { x: 358, y: 80, value: '78%' }
                        ].map((point, index) => (
                          <g key={index}>
                            <circle cx={point.x} cy={point.y} r="5" fill="#3B82F6" stroke="#1E293B" strokeWidth="2" filter="url(#glow)"/>
                            <circle cx={point.x} cy={point.y} r="2" fill="#FFFFFF" opacity="0.9"/>
                          </g>
                        ))}
                        
                        {/* Data points for Forecast (squares) */}
                        {[
                          { x: 70, y: 180, value: '10%' },
                          { x: 142, y: 160, value: '25%' },
                          { x: 214, y: 130, value: '45%' },
                          { x: 286, y: 100, value: '65%' },
                          { x: 358, y: 70, value: '82%' }
                        ].map((point, index) => (
                          <g key={index}>
                            <rect x={point.x - 4} y={point.y - 4} width="8" height="8" fill="#9CA3AF" stroke="#1E293B" strokeWidth="1.5" rx="1"/>
                            <rect x={point.x - 2} y={point.y - 2} width="4" height="4" fill="#FFFFFF" opacity="0.8" rx="0.5"/>
                          </g>
                        ))}
                        
                        {/* Subtle gradient overlay for depth */}
                        <defs>
                          <linearGradient id="chartOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.1"/>
                            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.3"/>
                          </linearGradient>
                        </defs>
                        <rect x="40" y="20" width="360" height="180" fill="url(#chartOverlay)" rx="2"/>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Monthly KPIs Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Monthly KPIs</h2>
                
                <div className="space-y-6">
                  {/* Budget Variance */}
                  <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-lg">Budget Variance</h3>
                          <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-400 font-medium">CAPEX / OPEX vs Actual.</div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-300 w-16">CAPEX</span>
                            <div className="flex items-center gap-3 flex-1">
                              <div className="flex-1 h-3 bg-red-500 rounded-full shadow-sm"></div>
                              <span className="text-sm font-bold text-red-400 w-12 text-right">+5%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-300 w-16">OPEX</span>
                            <div className="flex items-center gap-3 flex-1">
                              <div className="flex-1 h-3 bg-green-500 rounded-full shadow-sm"></div>
                              <span className="text-sm font-bold text-green-400 w-12 text-right">-2%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Equipment & Tooling */}
                  <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-lg">Equipment & Tooling</h3>
                          <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-400 font-medium">Availability status.</div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              12
                            </div>
                            <span className="text-white font-medium">On-track</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              3
                            </div>
                            <span className="text-white font-medium">At risk</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              1
                            </div>
                            <span className="text-white font-medium">Delayed</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Documentation Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Documentation</h2>
                
                <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-lg">Progress</h3>
                        <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                          View All
                        </Button>
                      </div>
                      
                      <div className="text-sm text-slate-400 font-medium">% delivered vs. expected.</div>
                      
                      <div className="space-y-4">
                        {[
                          { name: "Plans", progress: 95, color: "bg-blue-500" },
                          { name: "Procedures", progress: 80, color: "bg-blue-500" },
                          { name: "Job Descriptions", progress: 75, color: "bg-yellow-500" },
                          { name: "Work Instructions", progress: 60, color: "bg-red-500" },
                          { name: "Quality Standards", progress: 90, color: "bg-blue-500" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-300 w-32">{item.name}</span>
                            <div className="flex items-center gap-4 flex-1">
                              <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                                <div 
                                  className={`h-full ${item.color} rounded-full shadow-sm`}
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-bold text-white w-8 text-right">{item.progress}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special layout for Operations Dashboard - Factory Performance Overview
  if (category.id === "operations") {
    return (
      <div className={`min-h-screen bg-slate-900 dark:bg-slate-900 ${className}`}>
        <div className="p-6 space-y-8">
          {/* Factory Performance Overview Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Factory Performance Overview</h1>
            <p className="text-slate-400 text-lg">Key Performance Indicators for the current period.</p>
          </div>

          {/* Weekly KPIs Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Weekly KPIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Overtime Rate */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Overtime Rate</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">5.2%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -0.8% vs target
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 to-slate-600/60"></div>
                        {/* Current value indicator with glow */}
                        <div className="absolute left-[30%] top-0 w-0.5 h-full bg-white shadow-lg shadow-white/50"></div>
                        {/* Progress fill */}
                        <div className="absolute left-0 top-0 w-[30%] h-full bg-gradient-to-r from-orange-500/30 to-red-500/40 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>4%</span>
                        <span>6%</span>
                        <span>8%</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Unemployment Rate */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Technical Unemployment Rate</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">2.1%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -0.3% vs target
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 to-slate-600/60"></div>
                        <div className="absolute left-[35%] top-0 w-0.5 h-full bg-white shadow-lg shadow-white/50"></div>
                        <div className="absolute left-0 top-0 w-[35%] h-full bg-gradient-to-r from-yellow-500/30 to-orange-500/40 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>1%</span>
                        <span>2%</span>
                        <span>3%</span>
                        <span>4%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scrap Rate (Global) */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Scrap Rate (Global)</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">1.8%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -0.2% vs target
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 to-slate-600/60"></div>
                        <div className="absolute left-[53%] top-0 w-0.5 h-full bg-white shadow-lg shadow-white/50"></div>
                        <div className="absolute left-0 top-0 w-[53%] h-full bg-gradient-to-r from-green-500/30 to-yellow-500/40 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>1%</span>
                        <span>2%</span>
                        <span>2.5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Efficiency (Global) */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Weekly Efficiency (Global)</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">92%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <ArrowUp className="w-3 h-3" />
                        +2% vs target
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 to-slate-600/60"></div>
                        <div className="absolute left-[47%] top-0 w-0.5 h-full bg-white shadow-lg shadow-white/50"></div>
                        <div className="absolute left-0 top-0 w-[47%] h-full bg-gradient-to-r from-green-500/40 to-emerald-500/50 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>85%</span>
                        <span>90%</span>
                        <span>95%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Monthly KPIs Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Monthly KPIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Production Variance */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Production Variance</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">+3%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <ArrowUp className="w-3 h-3" />
                        +1% vs plan
                      </div>
                    </div>

                    {/* Enhanced Line Chart */}
                    <div className="relative h-20 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 200 80">
                        <defs>
                          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10 60 L 35 55 L 60 58 L 85 50 L 110 45 L 135 40 L 160 35 L 185 30"
                          stroke="#3B82F6"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 10 60 L 35 55 L 60 58 L 85 50 L 110 45 L 135 40 L 160 35 L 185 30 L 185 80 L 10 80 Z"
                          fill="url(#blueGradient)"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scrap Valuation (Global) */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Scrap Valuation (Global)</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">$50k</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -$5k vs target
                      </div>
                    </div>

                    {/* Enhanced Line Chart */}
                    <div className="relative h-20 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 200 80">
                        <defs>
                          <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10 30 L 35 35 L 60 32 L 85 40 L 110 45 L 135 50 L 160 48 L 185 55"
                          stroke="#EF4444"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 10 30 L 35 35 L 60 32 L 85 40 L 110 45 L 135 50 L 160 48 L 185 55 L 185 80 L 10 80 Z"
                          fill="url(#redGradient)"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Efficiency (Global) */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Monthly Efficiency (Global)</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">95%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <ArrowUp className="w-3 h-3" />
                        +3% vs target
                      </div>
                    </div>

                    {/* Enhanced Line Chart */}
                    <div className="relative h-20 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 200 80">
                        <defs>
                          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10 65 L 35 60 L 60 55 L 85 50 L 110 45 L 135 35 L 160 30 L 185 25"
                          stroke="#10B981"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 10 65 L 35 60 L 60 55 L 85 50 L 110 45 L 135 35 L 160 30 L 185 25 L 185 80 L 10 80 Z"
                          fill="url(#greenGradient)"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consumables & Parts Cost */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Consumables & Parts Cost</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">$200k</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -$10k vs target
                      </div>
                    </div>

                    {/* Enhanced Line Chart */}
                    <div className="relative h-20 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 200 80">
                        <defs>
                          <linearGradient id="redGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10 25 L 35 30 L 60 35 L 85 40 L 110 45 L 135 50 L 160 55 L 185 60"
                          stroke="#EF4444"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 10 25 L 35 30 L 60 35 L 85 40 L 110 45 L 135 50 L 160 55 L 185 60 L 185 80 L 10 80 Z"
                          fill="url(#redGradient2)"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Energy Consumption */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Energy Consumption</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">150 MWh</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -5 MWh vs target
                      </div>
                    </div>

                    {/* Enhanced Line Chart */}
                    <div className="relative h-20 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 200 80">
                        <defs>
                          <linearGradient id="redGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.1"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10 40 L 35 45 L 60 38 L 85 42 L 110 50 L 135 55 L 160 58 L 185 62"
                          stroke="#EF4444"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 10 40 L 35 45 L 60 38 L 85 42 L 110 50 L 135 55 L 160 58 L 185 62 L 185 80 L 10 80 Z"
                          fill="url(#redGradient3)"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Green Energy Rate */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Green Energy Rate</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">30%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <ArrowUp className="w-3 h-3" />
                        +5% vs target
                      </div>
                    </div>

                    {/* Enhanced Line Chart */}
                    <div className="relative h-20 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 200 80">
                        <defs>
                          <linearGradient id="greenGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10 70 L 35 65 L 60 60 L 85 55 L 110 50 L 135 45 L 160 40 L 185 35"
                          stroke="#10B981"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 10 70 L 35 65 L 60 60 L 85 55 L 110 50 L 135 45 L 160 40 L 185 35 L 185 80 L 10 80 Z"
                          fill="url(#greenGradient2)"
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special layout for HR Dashboard (light theme)
  if (category.id === "rh") {
    return (
      <div className={`min-h-screen bg-slate-100 dark:bg-slate-100 ${className}`}>
        <div className="p-6 space-y-6">
          {/* HR Dashboard Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 text-white">👥</div>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">HR Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <span>Filter by:</span>
              <div className="flex items-center space-x-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg">📅 Monthly</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg">🏢 All Categories</span>
              </div>
            </div>
          </div>

          {/* HR KPIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.kpis.map((kpi, index) => (
              <Card key={index} className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{kpi.title}</h3>
                      <p className="text-sm text-slate-500">Total Employees</p>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-slate-900">{kpi.value}</div>
                      {kpi.trend && (
                        <div className={`text-sm font-medium ${kpi.trendColor}`}>
                          {kpi.trend}
                        </div>
                      )}
                    </div>

                    {/* HR Style Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 w-1/4"></div>
                        <div className="bg-blue-500 w-1/4"></div>
                        <div className="bg-yellow-500 w-1/4"></div>
                        <div className="bg-red-500 w-1/4"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Target</span>
                        <span>Good</span>
                        <span>Warning</span>
                        <span>Critical</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                      <span className="text-sm text-green-600 font-medium">On Target</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-900 dark:bg-slate-900 ${className}`}>
      <div className="p-6 space-y-6">
        {/* Dashboard Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {getCategoryTitle()}
          </h1>
          <p className="text-slate-400">
            {getCategorySubtitle()}
          </p>
        </div>

        {/* Weekly KPIs Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Weekly KPIs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {getTopKPIs(4).map((kpi, index) => (
              <DashboardKPICard
                key={`weekly-${index}`}
                title={kpi.title}
                subtitle="Weekly tracking"
                value={kpi.value}
                trend={kpi.trend}
                trendColor={kpi.trendColor}
                target={kpi.target}
                lastWeeks={kpi.lastWeeks}
                type="weekly"
                size="medium"
                showProgressBar={true}
                actionLink="Details"
              />
            ))}
          </div>
        </div>

        {/* Monthly KPIs Section */}
        {category.kpis.length > 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Monthly KPIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTopKPIs(6).slice(4).map((kpi, index) => (
                <DashboardKPICard
                  key={`monthly-${index}`}
                  title={kpi.title}
                  subtitle="Monthly performance"
                  value={kpi.value}
                  trend={kpi.trend}
                  trendColor={kpi.trendColor}
                  target={kpi.target}
                  lastWeeks={kpi.lastWeeks}
                  type="monthly"
                  size="large"
                  showChart={true}
                  actionLink="Action Plan"
                />
              ))}
            </div>
          </div>
        )}

        {/* Additional KPIs Grid */}
        {category.kpis.length > 6 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Additional Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.kpis.slice(6).map((kpi, index) => (
                <DashboardKPICard
                  key={`additional-${index}`}
                  title={kpi.title}
                  value={kpi.value}
                  trend={kpi.trend}
                  trendColor={kpi.trendColor}
                  target={kpi.target}
                  lastWeeks={kpi.lastWeeks}
                  type="weekly"
                  size="small"
                  actionLink="View"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
