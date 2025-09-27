"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryData } from "@/lib/kpi-data";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ChartComponent, ChartConfigs } from "@/components/ui/ChartComponent";
import { APQPLineChart } from "@/components/ui/APQPLineChart";

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

interface ChartKPICardProps {
  title: string;
  value: string;
  trend?: string;
  trendColor?: string;
  chartData: number[];
  chartColor?: string;
  formatValue?: (value: number) => string;
  height?: number;
  actionLink?: string;
}

function ChartKPICard({
  title,
  value,
  trend,
  trendColor,
  chartData,
  chartColor = "#3B82F6",
  formatValue = (value) => value.toString(),
  height = 60,
  actionLink = "Details"
}: ChartKPICardProps) {
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

  return (
    <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-5">
          <h3 className="text-white font-semibold text-base tracking-wide">{title}</h3>
          
          <div className="flex items-end justify-between">
            <div className="text-5xl font-bold text-white tracking-tight">{value}</div>
            {trend && (
              <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor} bg-opacity-10 px-2 py-1 rounded-full`}>
                {getTrendIcon()}
                {trend}
              </div>
            )}
          </div>

          {/* Enhanced Chart */}
          <ChartComponent
            data={chartData.map(value => ({ value }))}
            height={height}
            formatValue={formatValue}
            {...ChartConfigs.efficiency}
            color={chartColor}
          />
        </div>
      </CardContent>
    </Card>
  );
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

          {/* Main Content Grid - Fixed Layout with Better Responsive Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
            {/* Left Column - Fixed Width */}
            <div className="space-y-8 w-full">
              {/* Weekly KPIs Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Weekly KPIs</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                  {/* OTD (On-Time Delivery) - Full width card */}
                  <Card className="bg-slate-800/95 border-slate-700/60 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] w-full">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-xl tracking-tight">OTD (On-Time Delivery)</h3>
                          <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-semibold hover:text-blue-300 transition-colors">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-400 font-medium">% of deliveries made on time.</div>
                        
                        <div className="text-7xl font-black text-white tracking-tight drop-shadow-lg">{category.kpis.find(kpi => kpi.title === 'Supply Chain Reliability')?.value || '94.2%'}</div>
                        
                       
                        

                        {/* Enhanced Chart with Mixed Positive/Negative Values */}
                        <ChartComponent
                          data={[
                            { value: -2.1 },
                            { value: 1.8 },
                            { value: -0.5 },
                            { value: 3.2 }
                          ]}
                          height={80}
                          formatValue={(value: number) => `${value > 0 ? '+' : ''}${value}%`}
                          {...ChartConfigs.mixed}
                          title="Performance Variance"
                          showValues={true}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recruitment Progress - Full width card */}
                  <Card className="bg-slate-800/95 border-slate-700/60 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] w-full">
                    <CardContent className="p-6">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-lg tracking-tight">Recruitment Progress</h3>
                          <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-semibold hover:text-blue-300 transition-colors">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-400 font-medium">Milestones vs. planned.</div>
                        
                        <div className="flex items-center justify-center py-4">
                          <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <defs>
                                <linearGradient id="recruitmentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#10B981" />
                                  <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                                <filter id="recruitmentGlow">
                                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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
                                strokeWidth="3"
                              />
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="url(#recruitmentGradient)"
                                strokeWidth="3"
                                strokeDasharray="75, 100"
                                strokeLinecap="round"
                                filter="url(#recruitmentGlow)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <span className="text-3xl font-black text-white drop-shadow-lg">75%</span>
                                <div className="text-xs text-slate-400 font-medium mt-1">Complete</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-white font-semibold">75%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Target</span>
                            <span className="text-green-400 font-semibold">80%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Remaining</span>
                            <span className="text-orange-400 font-semibold">5%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Planning Progress (APQP) - Enhanced Chart */}
              <Card className="bg-slate-800/95 border-slate-700/60 shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-all duration-300 w-full">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg tracking-tight">Planning Progress (APQP)</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-semibold hover:text-blue-300 transition-colors">
                        Full Plan
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">Milestones achieved vs. forecast.</div>
                    
                    {/* Enhanced APQP Line Chart */}
                    <div className="w-full bg-slate-900/30 rounded-lg p-4 border border-slate-700/50">
                      <div className="h-48 relative">
                        {/* Chart Container */}
                        <div className="absolute inset-0">
                          {/* Y-axis labels */}
                          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-slate-400 font-medium">
                            <span>100%</span>
                            <span>80%</span>
                            <span>60%</span>
                            <span>40%</span>
                            <span>20%</span>
                            <span>0%</span>
                          </div>
                          
                          {/* Chart Area */}
                          <div className="ml-8 mr-4 h-full relative">
                            {/* Grid lines */}
                            <div className="absolute inset-0">
                              {[0, 20, 40, 60, 80, 100].map((value, index) => (
                                <div
                                  key={index}
                                  className="absolute w-full border-t border-slate-700/30"
                                  style={{ top: `${100 - value}%` }}
                                />
                              ))}
                            </div>
                            
                            {/* Chart Lines */}
                            <svg className="w-full h-full" viewBox="0 0 400 200">
                              {/* Actual Progress Line (Blue) */}
                              <polyline
                                points="40,160 120,120 200,70 280,60 360,50"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {/* Actual Progress Points */}
                              {[
                                { x: 40, y: 160, value: 20 },
                                { x: 120, y: 120, value: 40 },
                                { x: 200, y: 70, value: 65 },
                                { x: 280, y: 60, value: 70 },
                                { x: 360, y: 50, value: 75 }
                              ].map((point, index) => (
                                <circle
                                  key={index}
                                  cx={point.x}
                                  cy={point.y}
                                  r="4"
                                  fill="#3B82F6"
                                  stroke="#1E40AF"
                                  strokeWidth="2"
                                />
                              ))}
                              
                              {/* Forecast Line (Gray Dotted) */}
                              <polyline
                                points="40,170 120,130 200,90 280,60 360,40"
                                fill="none"
                                stroke="#6B7280"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {/* Forecast Points */}
                              {[
                                { x: 40, y: 170, value: 15 },
                                { x: 120, y: 130, value: 35 },
                                { x: 200, y: 90, value: 55 },
                                { x: 280, y: 60, value: 70 },
                                { x: 360, y: 40, value: 80 }
                              ].map((point, index) => (
                                <rect
                                  key={index}
                                  x={point.x - 3}
                                  y={point.y - 3}
                                  width="6"
                                  height="6"
                                  fill="#6B7280"
                                  stroke="#4B5563"
                                  strokeWidth="1"
                                />
                              ))}
                            </svg>
                            
                            {/* X-axis labels */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 font-medium">
                              <span>Phase 1</span>
                              <span>Phase 2</span>
                              <span>Phase 3</span>
                              <span>Phase 4</span>
                              <span>Phase 5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex justify-center space-x-6 mt-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-0.5 bg-blue-500"></div>
                          <span className="text-sm text-slate-300 font-medium">Actual Progress</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-0.5 bg-gray-500 border-dashed border-t-2"></div>
                          <span className="text-sm text-slate-300 font-medium">Forecast</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Fixed Width */}
            <div className="space-y-8 w-full">
              {/* Monthly KPIs Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Monthly KPIs</h2>
                
                <div className="space-y-4 lg:space-y-6">
                  {/* Budget Variance */}
                  <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 w-full">
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
                  <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 w-full">
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
                
                <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm w-full">
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
              <ChartKPICard
                title="Overtime Rate"
                value="5.2%"
                trend="-0.8% vs target"
                trendColor="text-red-400 bg-red-500/10"
                chartData={[4.8, 5.1, 5.3, 5.2]}
                chartColor="#F97316"
              />
              
              <ChartKPICard
                title="Technical Unemployment Rate"
                value="2.1%"
                trend="-0.3% vs target"
                trendColor="text-red-400 bg-red-500/10"
                chartData={[2.4, 2.2, 2.0, 2.1]}
                chartColor="#EAB308"
              />
              
              <ChartKPICard
                title="Scrap Rate (Global)"
                value="1.8%"
                trend="-0.2% vs target"
                trendColor="text-red-400 bg-red-500/10"
                chartData={[2.0, 1.9, 1.8, 1.8]}
                chartColor="#22C55E"
              />
              
              <ChartKPICard
                title="Weekly Efficiency (Global)"
                value="92%"
                trend="+2% vs target"
                trendColor="text-green-400 bg-green-500/10"
                chartData={[90, 91, 92, 92]}
                chartColor="#10B981"
              />
            </div>
          </div>

          {/* Demo Chart with Positive/Negative Values */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Performance Variance Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Positive/Negative Variance Chart */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Performance Variance (vs Target)</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">+2.3%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <ArrowUp className="w-3 h-3" />
                        Above Target
                      </div>
                    </div>

                    {/* Enhanced Chart with Positive/Negative Values */}
                    <ChartComponent
                      data={[
                        { value: -2.1 },
                        { value: 1.8 },
                        { value: 3.5 },
                        { value: 2.3 }
                      ]}
                      height={80}
                      formatValue={(value) => `${value > 0 ? '+' : ''}${value}`}
                      yAxisLabel="% Variance"
                      {...ChartConfigs.variance}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Volatile Performance Chart */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="text-white font-semibold text-base tracking-wide">Market Performance Index</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">102%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        Volatile
                      </div>
                    </div>

                    {/* Enhanced Chart with High Volatility */}
                    <ChartComponent
                      data={[
                        { value: 44 },
                        { value: 22 },
                        { value: 102 },
                        { value: 32 }
                      ]}
                      height={80}
                      formatValue={(value) => value.toString()}
                      yAxisLabel="% PIB"
                      minValue={0}
                      maxValue={120}
                      {...ChartConfigs.volatile}
                    />
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

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 1 },
                        { value: 2 },
                        { value: 2.5 },
                        { value: 3 }
                      ]}
                      height={60}
                      formatValue={(value) => `+${value}`}
                      {...ChartConfigs.efficiency}
                      color="#3B82F6"
                    />
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

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 45 },
                        { value: 48 },
                        { value: 49 },
                        { value: 50 }
                      ]}
                      height={60}
                      formatValue={(value) => `${value}k`}
                      {...ChartConfigs.cost}
                      color="#EF4444"
                    />
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

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 92 },
                        { value: 93 },
                        { value: 94 },
                        { value: 95 }
                      ]}
                      height={60}
                      formatValue={(value) => value.toString()}
                      {...ChartConfigs.efficiency}
                      color="#10B981"
                    />
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

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 180 },
                        { value: 190 },
                        { value: 195 },
                        { value: 200 }
                      ]}
                      height={60}
                      formatValue={(value) => `${value}k`}
                      {...ChartConfigs.cost}
                      color="#EF4444"
                    />
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

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 140 },
                        { value: 145 },
                        { value: 148 },
                        { value: 150 }
                      ]}
                      height={60}
                      formatValue={(value) => value.toString()}
                      {...ChartConfigs.cost}
                      color="#EF4444"
                    />
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

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 25 },
                        { value: 27 },
                        { value: 29 },
                        { value: 30 }
                      ]}
                      height={60}
                      formatValue={(value) => value.toString()}
                      {...ChartConfigs.efficiency}
                      color="#10B981"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special layout for Quality Dashboard - Dark theme with Weekly KPIs
  if (category.id === "quality") {
    return (
      <div className={`min-h-screen bg-slate-900 dark:bg-slate-900 ${className}`}>
        <div className="p-6 space-y-8">
          {/* Quality Dashboard Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Quality & Safety Dashboard</h1>
            <p className="text-slate-400 text-lg">Key Performance Indicators for Quality and Safety</p>
          </div>

          {/* Weekly KPIs Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Weekly KPIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Complaints */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg">Customer Complaints</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">Global</div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">12</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <ArrowUp className="w-4 h-4" />
                        +2 vs target
                      </div>
                    </div>

                    {/* By Zone Breakdown */}
                    <div className="space-y-3">
                      <div className="text-sm font-bold text-slate-300">By Zone:</div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">Zone A</div>
                          <div className="text-2xl font-bold text-white">5</div>
                          <div className="text-xs text-red-400">(+1)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-300">Zone B</div>
                          <div className="text-2xl font-bold text-white">4</div>
                          <div className="text-xs text-slate-400">(0)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-300">Zone C</div>
                          <div className="text-2xl font-bold text-white">3</div>
                          <div className="text-xs text-red-400">(+1)</div>
                        </div>
                      </div>
                    </div>

                    {/* Target Range Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute inset-0 flex">
                          <div className="w-[33.33%] bg-green-500"></div>
                          <div className="w-[33.33%] bg-yellow-500"></div>
                          <div className="w-[20%] bg-orange-500"></div>
                          <div className="w-[13.34%] bg-red-500"></div>
                        </div>
                        {/* Current value indicator at 12 */}
                        <div className="absolute left-[80%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>0 (OK)</span>
                        <span>5 (Warn)</span>
                        <span>10 (Limit)</span>
                        <span>15 (Max)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Efficiency Tracking */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg">Weekly Efficiency Tracking</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">Global</div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">92%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                        <ArrowUp className="w-4 h-4" />
                        +2% vs target
                      </div>
                    </div>

                    {/* By Zone Breakdown */}
                    <div className="space-y-3">
                      <div className="text-sm font-bold text-slate-300">By Zone:</div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">Zone A</div>
                          <div className="text-2xl font-bold text-white">95%</div>
                          <div className="text-xs text-green-400">(+3%)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-300">Zone B</div>
                          <div className="text-2xl font-bold text-white">90%</div>
                          <div className="text-xs text-red-400">(-1%)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-300">Zone C</div>
                          <div className="text-2xl font-bold text-white">91%</div>
                          <div className="text-xs text-green-400">(+1%)</div>
                        </div>
                      </div>
                    </div>

                    {/* Target Range Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute inset-0 flex">
                          <div className="w-[25%] bg-red-500"></div>
                          <div className="w-[25%] bg-orange-500"></div>
                          <div className="w-[25%] bg-yellow-500"></div>
                          <div className="w-[25%] bg-green-500"></div>
                        </div>
                        {/* Current value indicator at 92% */}
                        <div className="absolute left-[92%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>85% (Min)</span>
                        <span>88% (Limit)</span>
                        <span>90% (Warn)</span>
                        <span>95% (OK)</span>
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
              {/* PPM (Parts Per Million) */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="font-bold text-white text-lg">PPM (Parts Per Million)</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-4xl font-bold text-white tracking-tight">150</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowUp className="w-3 h-3" />
                        +20 vs target
                      </div>
                    </div>

                    {/* Target Range Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute inset-0 flex">
                          <div className="w-[33.33%] bg-green-500"></div>
                          <div className="w-[33.33%] bg-yellow-500"></div>
                          <div className="w-[20%] bg-orange-500"></div>
                          <div className="w-[13.34%] bg-red-500"></div>
                        </div>
                        {/* Current value indicator at 150 */}
                        <div className="absolute left-[100%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>0 (OK)</span>
                        <span>50 (Warn)</span>
                        <span>100 (Limit)</span>
                        <span>150 (Max)</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                        <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                        </Button>
                      </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Scrap Cost */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="font-bold text-white text-lg">Customer Scrap Cost</h3>
                      
                      <div className="flex items-end justify-between">
                      <div className="text-4xl font-bold text-white tracking-tight">$15k</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowUp className="w-3 h-3" />
                        +$2k vs target
                          </div>
                      </div>

                    <div className="flex justify-end">
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
                        </div>
                    </div>
                  </CardContent>
                </Card>

              {/* Monthly Efficiency */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="font-bold text-white text-lg">Monthly Efficiency</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-4xl font-bold text-white tracking-tight">94%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <ArrowUp className="w-3 h-3" />
                        +1% vs target
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Work Incidents/Accidents */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="font-bold text-white text-lg">Work Incidents/Accidents</h3>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-4xl font-bold text-white tracking-tight">2</div>
                      <div className="text-sm text-slate-400 font-medium">5 Lost Days</div>
                    </div>

                    {/* Target Range Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute inset-0 flex">
                          <div className="w-[20%] bg-green-500"></div>
                          <div className="w-[20%] bg-yellow-500"></div>
                          <div className="w-[40%] bg-orange-500"></div>
                          <div className="w-[20%] bg-red-500"></div>
                        </div>
                        {/* Current value indicator at 2 */}
                        <div className="absolute left-[40%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>0 (OK)</span>
                        <span>1 (Warn)</span>
                        <span>3 (Limit)</span>
                        <span>5 (Max)</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Process/Product Audit Compliance */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="font-bold text-white text-lg">Process/Product Audit Compliance</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-300">Internal Audit Completion</span>
                        <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                          <ArrowUp className="w-3 h-3" />
                          98% (+3% vs plan)
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-300">Compliance %</span>
                        <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                          <ArrowUp className="w-3 h-3" />
                          95% (+5% vs target)
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Client Score Cards */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <h3 className="font-bold text-white text-lg">Client Score Cards</h3>
                    
                    {/* Line Chart */}
                    <div className="w-full bg-slate-900/30 rounded-lg p-4 border border-slate-700/50">
                      <div className="h-32 relative">
                        <svg className="w-full h-full" viewBox="0 0 400 120">
                          {/* Grid lines */}
                          <defs>
                            <pattern id="grid" width="80" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 80 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                          
                          {/* Target line (dashed) */}
                          <line x1="40" y1="40" x2="360" y2="40" stroke="#6B7280" strokeWidth="2" strokeDasharray="4,4" />
                          
                          {/* Data line */}
                          <polyline
                            points="40,80 120,60 200,90 280,70 320,50 360,45"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          
                          {/* Data points */}
                          {[
                            { x: 40, y: 80 },
                            { x: 120, y: 60 },
                            { x: 200, y: 90 },
                            { x: 280, y: 70 },
                            { x: 320, y: 50 },
                            { x: 360, y: 45 }
                          ].map((point, index) => (
                            <circle
                              key={index}
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="#3B82F6"
                              stroke="#1E40AF"
                              strokeWidth="2"
                            />
                          ))}
                        </svg>
                        
                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 font-medium px-4">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                        </div>
                        
                        {/* Target label */}
                        <div className="absolute top-2 right-2 text-xs text-slate-400 font-medium">
                          Target
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
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

  // Special layout for Supply Chain Dashboard - Dark theme with Global Indicators and Detailed KPIs
  if (category.id === "supplychain") {
    return (
      <div className={`min-h-screen bg-slate-900 dark:bg-slate-900 ${className}`}>
        <div className="p-6 space-y-8">
          {/* Supply Chain Dashboard Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white tracking-tight">Supply Chain Dashboard</h1>
            <p className="text-slate-400 text-lg">Monitoring key supply chain performance indicators</p>
          </div>

          {/* Global Indicators Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Global Indicators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Service Rate / OTIF */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg">Customer Service Rate / OTIF</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Details
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">% of orders delivered on time.</div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">96.5%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                        <ArrowUp className="w-4 h-4" />
                        +1.5%
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        {/* Background segments with proper colors */}
                        <div className="absolute inset-0 flex">
                          <div className="w-[20%] bg-orange-400"></div>
                          <div className="w-[10%] bg-yellow-400"></div>
                          <div className="w-[5%] bg-green-400"></div>
                          <div className="w-[3%] bg-emerald-500"></div>
                          <div className="w-[62%] bg-slate-700"></div>
                        </div>
                        {/* Current value indicator at 96.5% */}
                        <div className="absolute left-[96.5%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>OK: 80%</span>
                        <span>Good: 90%</span>
                        <span>Excellent: 95%</span>
                        <span>Target: 98%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Supplier Service Rate OTIF */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg">Supplier Service Rate OTIF</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Details
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">% of compliant supplier deliveries.</div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">92.0%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <TrendingDown className="w-4 h-4" />
                        -3.0%
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        {/* Background segments with proper colors */}
                        <div className="absolute inset-0 flex">
                          <div className="w-[15%] bg-orange-400"></div>
                          <div className="w-[5%] bg-yellow-400"></div>
                          <div className="w-[5%] bg-green-400"></div>
                          <div className="w-[6%] bg-emerald-500"></div>
                          <div className="w-[69%] bg-slate-700"></div>
                        </div>
                        {/* Current value indicator at 92% */}
                        <div className="absolute left-[92%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>OK: 85%</span>
                        <span>Good: 90%</span>
                        <span>Excellent: 95%</span>
                        <span>Target: 98%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stock Reliability Rate */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg">Stock Reliability Rate</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Details
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">% of compliant inventories.</div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">99.2%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                        <ArrowUp className="w-4 h-4" />
                        +0.2%
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        {/* Background segments with proper colors */}
                        <div className="absolute inset-0 flex">
                          <div className="w-[4%] bg-orange-400"></div>
                          <div className="w-[3%] bg-yellow-400"></div>
                          <div className="w-[1%] bg-green-400"></div>
                          <div className="w-[0.5%] bg-emerald-500"></div>
                          <div className="w-[91.5%] bg-slate-700"></div>
                        </div>
                        {/* Current value indicator at 99.2% */}
                        <div className="absolute left-[99.2%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 font-medium">
                        <span>OK: 95%</span>
                        <span>Good: 98%</span>
                        <span>Excellent: 99%</span>
                        <span>Target: 99.5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed KPIs Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Detailed KPIs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inventory Turnover */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg">Inventory Turnover</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">Average days of stock.</div>
                    
                    <div className="space-y-4">
                      {/* Raw Materials */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-300">Raw Materials</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">25 days</span>
                          <div className="flex items-center gap-1 text-sm font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">
                            <ArrowUp className="w-3 h-3" />
                            +2 days vs target
                          </div>
                        </div>
                      </div>
                      
                      {/* Finished Goods */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-300">Finished Goods</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">18 days</span>
                          <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                            <TrendingDown className="w-3 h-3" />
                            -1 day vs target
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Total Logistics Cost */}
              <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-lg">Total Logistics Cost</h3>
                      <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                        Action Plan
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-400 font-medium">Freight IN / Freight OUT evolution.</div>
                    
                    <div className="space-y-4">
                      {/* Freight IN */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-300">Freight IN</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-white">$125k</span>
                            <div className="flex items-center gap-1 text-sm font-bold text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">
                              <ArrowUp className="w-3 h-3" />
                              +$5k vs target
                            </div>
                          </div>
                        </div>
                        
                        {/* Freight IN Chart */}
                        <div className="w-full bg-slate-900/30 rounded-lg p-3 border border-slate-700/50">
                          <div className="h-20 relative">
                            <svg className="w-full h-full" viewBox="0 0 200 60">
                              {/* Grid lines */}
                              <defs>
                                <pattern id="freightInGrid" width="40" height="15" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 15" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#freightInGrid)" />
                              
                              {/* Target line (red dotted) */}
                              <line x1="10" y1="50" x2="190" y2="50" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2,2" />
                              
                              {/* Data line (blue) */}
                              <polyline
                                points="10,55 50,53 90,51 130,52 170,50"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              
                              {/* Data points */}
                              {[
                                { x: 10, y: 55, value: 120 },
                                { x: 50, y: 53, value: 122 },
                                { x: 90, y: 51, value: 124 },
                                { x: 130, y: 52, value: 123 },
                                { x: 170, y: 50, value: 125 }
                              ].map((point, index) => (
                                <circle
                                  key={index}
                                  cx={point.x}
                                  cy={point.y}
                                  r="2"
                                  fill="#3B82F6"
                                  stroke="#1E40AF"
                                  strokeWidth="1"
                                />
                              ))}
                            </svg>
                            
                            {/* X-axis labels */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 font-medium px-2">
                              <span>Jan</span>
                              <span>Feb</span>
                              <span>Mar</span>
                              <span>Apr</span>
                              <span>May</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Freight OUT */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-300">Freight OUT</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-white">$210k</span>
                            <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                              <TrendingDown className="w-3 h-3" />
                              -$10k vs target
                            </div>
                          </div>
                        </div>
                        
                        {/* Freight OUT Chart */}
                        <div className="w-full bg-slate-900/30 rounded-lg p-3 border border-slate-700/50">
                          <div className="h-20 relative">
                            <svg className="w-full h-full" viewBox="0 0 200 60">
                              {/* Grid lines */}
                              <defs>
                                <pattern id="freightOutGrid" width="40" height="15" patternUnits="userSpaceOnUse">
                                  <path d="M 40 0 L 0 0 0 15" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#freightOutGrid)" />
                              
                              {/* Target line (green dotted) */}
                              <line x1="10" y1="45" x2="190" y2="45" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2,2" />
                              
                              {/* Data line (blue) */}
                              <polyline
                                points="10,35 50,40 90,45 130,44 170,45"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              
                              {/* Data points */}
                              {[
                                { x: 10, y: 35, value: 220 },
                                { x: 50, y: 40, value: 215 },
                                { x: 90, y: 45, value: 210 },
                                { x: 130, y: 44, value: 212 },
                                { x: 170, y: 45, value: 210 }
                              ].map((point, index) => (
                                <circle
                                  key={index}
                                  cx={point.x}
                                  cy={point.y}
                                  r="2"
                                  fill="#3B82F6"
                                  stroke="#1E40AF"
                                  strokeWidth="1"
                                />
                              ))}
                            </svg>
                            
                            {/* X-axis labels */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 font-medium px-2">
                              <span>Jan</span>
                              <span>Feb</span>
                              <span>Mar</span>
                              <span>Apr</span>
                              <span>May</span>
                            </div>
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
                      <p className="text-sm text-slate-500">{kpi.subtitle}</p>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-bold text-slate-900">{kpi.value}</div>
                      {kpi.trend && (
                        <div className={`text-sm font-medium ${kpi.trendColor}`}>
                          {kpi.trend.includes('+') ? '↗' : kpi.trend.includes('-') ? '↘' : '→'} {kpi.trend}
                        </div>
                      )}
                    </div>

                    {/* HR Style Progress Bar with Status Ranges */}
                    <div className="space-y-2">
                      <div className="flex h-2 bg-slate-200 rounded-full overflow-hidden relative">
                        <div className="bg-green-500 w-1/4"></div>
                        <div className="bg-blue-500 w-1/4"></div>
                        <div className="bg-orange-500 w-1/4"></div>
                        <div className="bg-red-500 w-1/4"></div>
                        {kpi.currentStatus && (
                          <div className="absolute top-0 left-0 right-0 flex justify-center">
                            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full -mt-6">
                              {kpi.currentStatus}
                            </span>
                          </div>
                        )}
                      </div>
                      {kpi.statusRanges && (
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>{kpi.statusRanges.target}</span>
                          <span>{kpi.statusRanges.good}</span>
                          <span>{kpi.statusRanges.alert}</span>
                          <span>{kpi.statusRanges.high}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        {kpi.actionText || 'View Details'}
                      </button>
                      <span className={`text-sm font-medium ${kpi.statusColor || 'text-green-600'}`}>
                        {kpi.title === 'Headcount' && 'On Target'}
                        {kpi.title === 'Cost' && 'Over Budget'}
                        {kpi.title === 'Turnover Rate' && 'High'}
                        {kpi.title === 'Time to Fill' && 'On Track'}
                        {kpi.title === 'Absenteeism Rate' && 'Needs Attention'}
                        {kpi.title === 'Social Incidents' && 'Good'}
                      </span>
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
