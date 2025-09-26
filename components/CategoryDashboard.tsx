"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CategoryData } from "@/lib/kpi-data";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ChartComponent, ChartConfigs } from "@/components/ui/ChartComponent";

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
                        
                        <div className="text-7xl font-black text-white tracking-tight drop-shadow-lg">{category.kpis.find(kpi => kpi.title === 'Supply Chain Reliability')?.value || '94.2%'}</div>
                        
                        <div className="flex items-center gap-2 text-sm font-bold text-yellow-500 bg-yellow-500/10 px-3 py-2 rounded-full w-fit">
                          <ArrowDown className="w-4 h-4" />
                          {category.kpis.find(kpi => kpi.title === 'Supply Chain Reliability')?.trend || '-2.1%'}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="relative h-4 bg-slate-700/50 rounded-full overflow-hidden shadow-inner border border-slate-600/30">
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-600/40"></div>
                            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-full rounded-full shadow-lg" style={{ width: '94.2%' }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full"></div>
                          </div>
                          <div className="flex justify-between text-sm text-slate-300 font-semibold bg-slate-700/20 px-4 py-2 rounded-lg">
                            <span>Target: 95%</span>
                            <span>Last Week: {category.kpis.find(kpi => kpi.title === 'Supply Chain Reliability')?.lastWeeks?.[4] || '94.2%'}</span>
                          </div>
                        </div>

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
                    
                    <div className="text-sm text-slate-400 font-medium">APQP phase variance vs. planned timeline.</div>
                    
                    {/* APQP Phase Progress Summary */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
                        <div className="text-slate-300 font-medium">Current Phase</div>
                        <div className="text-white text-lg font-bold">Phase 3</div>
                        <div className="text-slate-400 text-xs">Design & Development</div>
                      </div>
                      <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
                        <div className="text-slate-300 font-medium">Overall Progress</div>
                        <div className="text-white text-lg font-bold">58%</div>
                        <div className="text-slate-400 text-xs">On Track</div>
                      </div>
                    </div>

                    {/* APQP Variance Chart with Mixed Values */}
                    <ChartComponent
                      data={[
                        { value: -5.2 },  // Phase 1: Behind schedule
                        { value: 2.1 },   // Phase 2: Ahead of schedule  
                        { value: -1.8 },  // Phase 3: Slightly behind
                        { value: 0.5 }    // Phase 4: On track
                      ]}
                      height={120}
                      formatValue={(value: number) => `${value > 0 ? '+' : ''}${value}%`}
                      {...ChartConfigs.mixed}
                      title="Phase Variance vs. Plan"
                      subtitle="Positive = Ahead, Negative = Behind"
                      showValues={true}
                      color="#3B82F6"
                    />

                    {/* APQP Phase Legend */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-slate-300">Ahead of Schedule</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-slate-300">Behind Schedule</span>
                      </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ChartKPICard
                title="Quality Score"
                value="96.8%"
                trend="+1.2%"
                trendColor="text-green-400 bg-green-500/10"
                chartData={[94.8, 95.2, 95.7, 96.8]}
                chartColor="#10B981"
              />
              
              <ChartKPICard
                title="Defect Rate"
                value="0.8%"
                trend="-20%"
                trendColor="text-green-400 bg-green-500/10"
                chartData={[1.2, 1.1, 1.0, 0.8]}
                chartColor="#22C55E"
              />
              
              <ChartKPICard
                title="First Pass Yield"
                value="97.8%"
                trend="+1.8%"
                trendColor="text-green-400 bg-green-500/10"
                chartData={[96.1, 96.5, 97.0, 97.8]}
                chartColor="#3B82F6"
              />
              
              <ChartKPICard
                title="Safety Incidents"
                value="0.12"
                trend="-25%"
                trendColor="text-green-400 bg-green-500/10"
                chartData={[0.18, 0.16, 0.15, 0.12]}
                chartColor="#84CC16"
              />
            </div>
          </div>

          {/* Monthly KPIs Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Monthly KPIs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.kpis.slice(4).map((kpi, index) => (
                <Card key={index} className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold text-base">{kpi.title}</h3>
                        <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                          Details
                        </Button>
                      </div>
                      
                      <div className="flex items-end justify-between">
                        <div className="text-3xl font-bold text-white">{kpi.value}</div>
                        {kpi.trend && (
                          <div className={`text-sm font-medium ${kpi.trendColor}`}>
                            {kpi.trend}
                          </div>
                        )}
                      </div>

                      {kpi.target && (
                        <div className="text-xs text-slate-400 bg-slate-700/50 px-3 py-2 rounded-lg">
                          {kpi.target}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
