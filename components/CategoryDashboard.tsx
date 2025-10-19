"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ChartComponent, ChartConfigs } from "@/components/ui/ChartComponent";
import { CategoryData } from "@/types";

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
                        
                        <div className="text-sm text-slate-600 font-medium">Produced & invoiced weekly. Target: 98%</div>
                        
                        <div className="flex items-end justify-between">
                          <div className="text-5xl font-bold text-slate-900 tracking-tight">95%</div>
                          <div className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                            <ArrowUp className="w-4 h-4" />
                            +3%
                          </div>
                        </div>

                        {/* Weekly Values */}
                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                          <div className="bg-slate-50 p-2 rounded">
                            <div className="text-slate-500 font-medium">W1</div>
                            <div className="text-slate-900 font-bold">95%</div>
                          </div>
                          <div className="bg-slate-50 p-2 rounded">
                            <div className="text-slate-500 font-medium">W2</div>
                            <div className="text-slate-900 font-bold">98%</div>
                          </div>
                          <div className="bg-slate-50 p-2 rounded">
                            <div className="text-slate-500 font-medium">W3</div>
                            <div className="text-slate-900 font-bold">92%</div>
                          </div>
                          <div className="bg-slate-50 p-2 rounded">
                            <div className="text-slate-500 font-medium">W4</div>
                            <div className="text-slate-900 font-bold">98%</div>
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
                            {/* Current value indicator at 95% */}
                            <div className="absolute left-[95%] top-0 w-1 h-full bg-slate-900 shadow-lg transform -translate-x-0.5"></div>
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
                        
                        <div className="text-sm text-slate-600 font-medium">Unpaid receivables. Target: €25,000.00</div>
                        
                        <div className="flex items-end justify-between">
                          <div className="text-5xl font-bold text-slate-900 tracking-tight">€85k</div>
                          <div className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            <ArrowUp className="w-4 h-4" />
                            +€5k
                          </div>
                        </div>

                        {/* Weekly Values */}
                        <div className="grid grid-cols-4 gap-2 text-center text-xs">
                          <div className="bg-slate-50 p-2 rounded">
                            <div className="text-slate-500 font-medium">W1</div>
                            <div className="text-slate-900 font-bold">€83k</div>
                          </div>
                          <div className="bg-slate-50 p-2 rounded">
                            <div className="text-slate-500 font-medium">W2</div>
                            <div className="text-slate-900 font-bold">€85k</div>
                          </div>
                          <div className="bg-slate-50 p-2 rounded">
                            <div className="text-slate-500 font-medium">W3</div>
                            <div className="text-slate-900 font-bold">€80k</div>
                          </div>
                          <div className="bg-slate-50 p-2 rounded">
                            <div className="text-slate-500 font-medium">W4</div>
                            <div className="text-slate-900 font-bold">€90k</div>
                          </div>
                        </div>

                        {/* Risk Level Progress Bar */}
                        <div className="space-y-3">
                          <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            {/* Risk level segments */}
                            <div className="absolute inset-0 flex">
                              <div className="w-[27.78%] bg-green-400"></div>
                              <div className="w-[27.78%] bg-yellow-400"></div>
                              <div className="w-[22.22%] bg-orange-400"></div>
                              <div className="w-[22.22%] bg-red-500"></div>
                            </div>
                            {/* Current value indicator - €85k out of €90k max shown = ~94% */}
                            <div className="absolute left-[94%] top-0 w-1 h-full bg-slate-900 shadow-lg transform -translate-x-0.5"></div>
                          </div>
                          <div className="flex justify-between text-xs text-slate-500 font-medium">
                            <span>Excellent (&lt;€25k)</span>
                            <span>Target (&lt;€50k)</span>
                            <span>Warning (&lt;€75k)</span>
                            <span>Critical (&gt;€90k)</span>
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
                    
                    {/* Chart visualization area */}
                    <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-slate-300">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                          </svg>
                        </div>
                        <p className="text-slate-400 font-medium">Chart visualization area</p>
                        <p className="text-slate-300 text-sm mt-1">Data: Week 1-4 (Réalisé: €120k, €130k, €150k, €120k | Prévisionnel: €155k, €165k, €155k, €155k | Scrap: €180k, €130k, €180k, €120k)</p>
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
                              strokeDasharray="83.3, 100"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-2xl font-bold text-slate-900">€50k</span>
                            <span className="text-xs text-slate-500">/ €60k</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <div className="text-sm text-slate-600 font-medium">
                          <div className="font-bold text-slate-900">83.3%</div>
                          <div>Target: €60,000.00</div>
                        </div>
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
                          <div className="flex-1 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                          <div className="flex items-center gap-1 text-sm font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full min-w-[60px] justify-center">
                            <div className="w-3 h-0.5 bg-yellow-600 rounded"></div>
                            <span>88%</span>
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
                            <span>100%</span>
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
                            <span>97%</span>
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
                            <span>87%</span>
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
                        
                        <div className="text-7xl font-black text-white tracking-tight drop-shadow-lg">95%</div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-slate-400">Target:</span>
                          <span className="text-white font-semibold">98%</span>
                          <span className="text-red-400 font-semibold">(-3% vs target)</span>
                        </div>
                        

                        {/* Enhanced Chart with Mixed Positive/Negative Values */}
                        <ChartComponent
                          data={[
                            { value: 96 },
                            { value: 99 },
                            { value: 98 },
                            { value: 99 }
                          ]}
                          height={80}
                          formatValue={(value: number) => `${value}%`}
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
                                  <stop offset="0%" stopColor="#EF4444" />
                                  <stop offset="100%" stopColor="#DC2626" />
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
                                strokeDasharray="85, 100"
                                strokeLinecap="round"
                                filter="url(#recruitmentGlow)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <span className="text-3xl font-black text-white drop-shadow-lg">85%</span>
                                <div className="text-xs text-slate-400 font-medium mt-1">Complete</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-white font-semibold">85%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Target</span>
                            <span className="text-green-400 font-semibold">98%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Remaining</span>
                            <span className="text-orange-400 font-semibold">13%</span>
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
                              <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-red-500 rounded-full shadow-sm" style={{ width: '100%' }}></div>
                              </div>
                              <span className="text-sm font-bold text-white w-20 text-right">5000</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-300 w-16">OPEX</span>
                            <div className="flex items-center gap-3 flex-1">
                              <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-green-500 rounded-full shadow-sm" style={{ width: '100%' }}></div>
                              </div>
                              <span className="text-sm font-bold text-white w-20 text-right">3000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Equipment Availability */}
                  <Card className="bg-slate-800/90 border-slate-700/50 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300 w-full">
                    <CardContent className="p-6">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white text-lg">Equipment Availability</h3>
                          <Button variant="link" className="text-blue-400 p-0 h-auto text-sm font-medium hover:text-blue-300">
                            Details
                          </Button>
                        </div>
                        
                        <div className="text-sm text-slate-400 font-medium">Availability status.</div>
                        
                        <div className="flex items-center justify-center py-4">
                          <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <defs>
                                <linearGradient id="equipmentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#EF4444" />
                                  <stop offset="100%" stopColor="#DC2626" />
                                </linearGradient>
                                <filter id="equipmentGlow">
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
                                stroke="url(#equipmentGradient)"
                                strokeWidth="3"
                                strokeDasharray="90, 100"
                                strokeLinecap="round"
                                filter="url(#equipmentGlow)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <span className="text-3xl font-black text-white drop-shadow-lg">90%</span>
                                <div className="text-xs text-slate-400 font-medium mt-1">Available</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Current</span>
                            <span className="text-white font-semibold">90%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Target</span>
                            <span className="text-green-400 font-semibold">98%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Gap</span>
                            <span className="text-red-400 font-semibold">-8%</span>
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
                value="6%"
                trend="+1% vs target (5%)"
                trendColor="text-red-400 bg-red-500/10"
                chartData={[5, 6, 5, 3]}
                chartColor="#F97316"
              />
              
              <ChartKPICard
                title="Technical Unemployment Rate"
                value="2%"
                trend="+1% vs target (1%)"
                trendColor="text-red-400 bg-red-500/10"
                chartData={[2, 1, 3, 4]}
                chartColor="#EAB308"
              />
              
              <ChartKPICard
                title="Scrap Rate (Global)"
                value="1.5%"
                trend="+0.5% vs target (1%)"
                trendColor="text-red-400 bg-red-500/10"
                chartData={[2, 1, 1.5, 1.9]}
                chartColor="#22C55E"
              />
              
              <ChartKPICard
                title="Weekly Efficiency (Global)"
                value="92%"
                trend="-3% vs target (95%)"
                trendColor="text-red-400 bg-red-500/10"
                chartData={[93, 95, 91, 96]}
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
                      <div className="text-5xl font-bold text-white tracking-tight">-4%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        Below Target
                      </div>
                    </div>

                    {/* Enhanced Chart with Positive/Negative Values */}
                    <ChartComponent
                      data={[
                        { value: -4 },
                        { value: -2 },
                        { value: -6 },
                        { value: 0 }
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
                      <div className="text-5xl font-bold text-white tracking-tight">90%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        Volatile
                      </div>
                    </div>

                    {/* Enhanced Chart with High Volatility */}
                    <ChartComponent
                      data={[
                        { value: 80 },
                        { value: 90 },
                        { value: 70 },
                        { value: 98 }
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
                      <div className="text-5xl font-bold text-white tracking-tight">-4%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -4% vs plan (0%)
                      </div>
                    </div>

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: -4 },
                        { value: 0 },
                        { value: -3 },
                        { value: 0 }
                      ]}
                      height={60}
                      formatValue={(value) => `${value > 0 ? '+' : ''}${value}`}
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
                      <div className="text-5xl font-bold text-white tracking-tight">$12k</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        +$1k vs target ($11k)
                      </div>
                    </div>

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 12 },
                        { value: 10 },
                        { value: 13 },
                        { value: 11 }
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
                      <div className="text-5xl font-bold text-white tracking-tight">91%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -2% vs target (93%)
                      </div>
                    </div>

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 93 },
                        { value: 95 },
                        { value: 91 },
                        { value: 96 }
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
                      <div className="text-5xl font-bold text-white tracking-tight">$18.5k</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        +$1.5k vs target ($17k)
                      </div>
                    </div>

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 18.4 },
                        { value: 19.4 },
                        { value: 17.4 },
                        { value: 18.9 }
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
                      <div className="text-5xl font-bold text-white tracking-tight">4200 MWh / 35%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        +200 MWh / -5% vs target
                      </div>
                    </div>

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 4200 },
                        { value: 4300 },
                        { value: 4000 },
                        { value: 4900 }
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
                      <div className="text-5xl font-bold text-white tracking-tight">80%</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -10% vs target (90%)
                      </div>
                    </div>

                    {/* Enhanced Chart */}
                    <ChartComponent
                      data={[
                        { value: 93 },
                        { value: 95 },
                        { value: 91 },
                        { value: 96 }
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
                      <div className="text-5xl font-bold text-white tracking-tight">5</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <ArrowUp className="w-4 h-4" />
                        +2 vs target (3)
                      </div>
                    </div>

                    {/* Chart Values */}
                    <div className="space-y-3">
                      <ChartComponent
                        data={[
                          { value: 2 },
                          { value: 3 },
                          { value: 5 },
                          { value: 6 }
                        ]}
                        height={80}
                        formatValue={(value: number) => value.toString()}
                        {...ChartConfigs.mixed}
                        showValues={true}
                      />
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
                        {/* Current value indicator at 5 */}
                        <div className="absolute left-[33.33%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
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
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <ArrowDown className="w-4 h-4" />
                        -3% vs target (95%)
                      </div>
                    </div>

                    {/* Chart Values */}
                    <div className="space-y-3">
                      <ChartComponent
                        data={[
                          { value: 94 },
                          { value: 99 },
                          { value: 88 },
                          { value: 90 }
                        ]}
                        height={80}
                        formatValue={(value: number) => `${value}%`}
                        {...ChartConfigs.efficiency}
                        showValues={true}
                      />
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
                      <div className="text-4xl font-bold text-white tracking-tight">120</div>
                    </div>

                    {/* Chart Values */}
                    <ChartComponent
                      data={[
                        { value: 140 },
                        { value: 200 },
                        { value: 100 },
                        { value: 160 }
                      ]}
                      height={60}
                      formatValue={(value: number) => value.toString()}
                      {...ChartConfigs.cost}
                      color="#EF4444"
                    />

                    {/* Target Range Progress Bar */}
                    <div className="space-y-3">
                      <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                        <div className="absolute inset-0 flex">
                          <div className="w-[33.33%] bg-green-500"></div>
                          <div className="w-[33.33%] bg-yellow-500"></div>
                          <div className="w-[20%] bg-orange-500"></div>
                          <div className="w-[13.34%] bg-red-500"></div>
                        </div>
                        {/* Current value indicator at 120 */}
                        <div className="absolute left-[80%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
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
                      <div className="text-4xl font-bold text-white tracking-tight">8k€</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -1k€ vs target (9k€)
                          </div>
                      </div>

                    {/* Chart Values */}
                    <ChartComponent
                      data={[
                        { value: 8 },
                        { value: 8 },
                        { value: 9.9 },
                        { value: 8.999 }
                      ]}
                      height={60}
                      formatValue={(value: number) => `${value}k€`}
                      {...ChartConfigs.cost}
                      color="#10B981"
                    />

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
                      <div className="text-4xl font-bold text-white tracking-tight">91%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -8% vs target (99%)
                      </div>
                    </div>

                    {/* Chart Values */}
                    <ChartComponent
                      data={[
                        { value: 99 },
                        { value: 88 },
                        { value: 90 },
                        { value: 97 }
                      ]}
                      height={60}
                      formatValue={(value: number) => `${value}%`}
                      {...ChartConfigs.efficiency}
                      color="#10B981"
                    />

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
                      <div className="text-sm text-slate-400 font-medium">3 Lost Days</div>
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
                    
                    <div className="flex items-end justify-between">
                      <div className="text-4xl font-bold text-white tracking-tight">78/100</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                        <ArrowDown className="w-3 h-3" />
                        -12 vs target (90/100)
                      </div>
                    </div>

                    {/* Chart Values */}
                    <ChartComponent
                      data={[
                        { value: 78 },
                        { value: 90 },
                        { value: 79 },
                        { value: 99 }
                      ]}
                      height={80}
                      formatValue={(value: number) => value.toString()}
                      {...ChartConfigs.mixed}
                      color="#3B82F6"
                    />

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
                      <div className="text-5xl font-bold text-white tracking-tight">93%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <ArrowDown className="w-4 h-4" />
                        -2% vs target (95%)
                      </div>
                    </div>

                    {/* Chart Values */}
                    <ChartComponent
                      data={[
                        { value: 99 },
                        { value: 88 },
                        { value: 92 },
                        { value: 90 }
                      ]}
                      height={80}
                      formatValue={(value: number) => `${value}%`}
                      {...ChartConfigs.efficiency}
                      showValues={true}
                    />

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
                        {/* Current value indicator at 93% */}
                        <div className="absolute left-[93%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
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
                      <div className="text-5xl font-bold text-white tracking-tight">88%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <ArrowDown className="w-4 h-4" />
                        -7% vs target (95%)
                      </div>
                    </div>

                    {/* Chart Values */}
                    <ChartComponent
                      data={[
                        { value: 80 },
                        { value: 99 },
                        { value: 90 },
                        { value: 77 }
                      ]}
                      height={80}
                      formatValue={(value: number) => `${value}%`}
                      {...ChartConfigs.efficiency}
                      showValues={true}
                    />

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
                        {/* Current value indicator at 88% */}
                        <div className="absolute left-[88%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
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
                      <div className="text-5xl font-bold text-white tracking-tight">95%</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <ArrowDown className="w-4 h-4" />
                        -3% vs target (98%)
                      </div>
                    </div>

                    {/* Chart Values */}
                    <ChartComponent
                      data={[
                        { value: 94 },
                        { value: 88 },
                        { value: 79 },
                        { value: 90 }
                      ]}
                      height={80}
                      formatValue={(value: number) => `${value}%`}
                      {...ChartConfigs.efficiency}
                      showValues={true}
                    />

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
                        {/* Current value indicator at 95% */}
                        <div className="absolute left-[95%] top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"></div>
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
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">42 days</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <ArrowUp className="w-4 h-4" />
                        +7 days vs target (35 days)
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
                    
                    <div className="text-sm text-slate-400 font-medium">Total logistics expenses.</div>
                    
                    <div className="flex items-end justify-between">
                      <div className="text-5xl font-bold text-white tracking-tight">120k€</div>
                      <div className="flex items-center gap-1 text-sm font-bold text-red-400 bg-red-500/10 px-3 py-1 rounded-full">
                        <ArrowUp className="w-4 h-4" />
                        +10k€ vs target (110k€)
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
      <div className={`min-h-screen bg-slate-50 ${className}`}>
        <div className="p-6 space-y-8">
          {/* HR Dashboard Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">HR Dashboard</h1>
            <p className="text-slate-600 text-lg">Key Human Resources Performance Indicators</p>
          </div>

          {/* HR KPIs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* HeadCount */}
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900 text-lg">HeadCount</h3>
                  
                  <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">Target</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <ArrowUp className="w-3 h-3" />
                      On Target
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Transport Bus Occupancy Rate */}
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900 text-lg">Personal Transport Bus Occupancy Rate</h3>
                  
                  <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">78%</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      <ArrowDown className="w-3 h-3" />
                      -7% vs target (85%)
                    </div>
                  </div>

                  {/* Chart Values */}
                  <ChartComponent
                    data={[
                      { value: 85 },
                      { value: 90 },
                      { value: 80 },
                      { value: 99 }
                    ]}
                    height={60}
                    formatValue={(value: number) => `${value}%`}
                    {...ChartConfigs.efficiency}
                    color="#10B981"
                  />

                  <div className="flex justify-end">
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Turnover Rate */}
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900 text-lg">Turnover Rate</h3>
                  
                  <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">4.2%</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      <ArrowUp className="w-3 h-3" />
                      +1.2% vs target (3%)
                    </div>
                  </div>

                  {/* Chart Values */}
                  <ChartComponent
                    data={[
                      { value: 3.2 },
                      { value: 3 },
                      { value: 5.2 },
                      { value: 4 }
                    ]}
                    height={60}
                    formatValue={(value: number) => `${value}%`}
                    {...ChartConfigs.cost}
                    color="#EF4444"
                  />

                  <div className="flex justify-end">
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time To Fill */}
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900 text-lg">Time To Fill</h3>
                  
                  <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">32 days</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      <ArrowUp className="w-3 h-3" />
                      +7 days vs target (25 days)
                    </div>
                  </div>

                  {/* Chart Values */}
                  <ChartComponent
                    data={[
                      { value: 33 },
                      { value: 36 },
                      { value: 24 },
                      { value: 20 }
                    ]}
                    height={60}
                    formatValue={(value: number) => `${value}d`}
                    {...ChartConfigs.cost}
                    color="#EF4444"
                  />

                  <div className="flex justify-end">
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Absenteeism Rate */}
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900 text-lg">Absenteeism Rate</h3>
                  
                  <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">2.8%</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      <ArrowUp className="w-3 h-3" />
                      +0.8% vs target (2.0%)
                    </div>
                  </div>

                  {/* Chart Values */}
                  <ChartComponent
                    data={[
                      { value: 2.0 },
                      { value: 2.9 },
                      { value: 3.0 },
                      { value: 2.0 }
                    ]}
                    height={60}
                    formatValue={(value: number) => `${value}%`}
                    {...ChartConfigs.cost}
                    color="#EF4444"
                  />

                  <div className="flex justify-end">
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Incidents */}
            <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-5">
                  <h3 className="font-bold text-slate-900 text-lg">Social Incidents</h3>
                  
                  <div className="flex items-end justify-between">
                    <div className="text-4xl font-bold text-slate-900 tracking-tight">3</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      <ArrowUp className="w-3 h-3" />
                      +2 vs target (1)
                    </div>
                  </div>

                  {/* Chart Values */}
                  <ChartComponent
                    data={[
                      { value: 2 },
                      { value: 4 },
                      { value: 2 },
                      { value: 5 }
                    ]}
                    height={60}
                    formatValue={(value: number) => value.toString()}
                    {...ChartConfigs.cost}
                    color="#EF4444"
                  />

                  <div className="flex justify-end">
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm font-medium hover:text-blue-700">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
