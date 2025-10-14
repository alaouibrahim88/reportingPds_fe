"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function FinancePage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/');
  };

  const handleNavigate = (categoryId: string) => {
    router.push(`/category-dashboard/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dashboard Header */}
      <DashboardHeader 
        currentCategory="finance"
        onNavigate={handleNavigate}
        onBack={handleBackClick}
      />
      
      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Dashboard Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Finance Dashboard</h1>
          <p className="text-slate-600">Monitoring key financial performance indicators.</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Weekly KPIs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly KPIs Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Weekly KPIs</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Invoicing/Delivery Rate */}
                <Card className="bg-white border border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 text-slate-500">📊</div>
                          <h3 className="font-semibold text-slate-900">Invoicing/Delivery Rate</h3>
                        </div>
                        <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                          Details
                        </Button>
                      </div>
                      
                      <div className="text-sm text-slate-600">Produced & invoiced weekly.</div>
                      
                      <div className="flex items-end justify-between">
                        <div className="text-4xl font-bold text-slate-900">96%</div>
                        <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <ArrowUp className="w-4 h-4" />
                          +1.5%
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div className="bg-orange-500 w-1/4"></div>
                          <div className="bg-yellow-500 w-1/4"></div>
                          <div className="bg-green-500 w-2/4"></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
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
                <Card className="bg-white border border-slate-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 text-red-500">❌</div>
                          <h3 className="font-semibold text-slate-900">Total Overdue Amount</h3>
                        </div>
                        <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                          Details
                        </Button>
                      </div>
                      
                      <div className="text-sm text-slate-600">Unpaid receivables.</div>
                      
                      <div className="flex items-end justify-between">
                        <div className="text-4xl font-bold text-slate-900">$1.2M</div>
                        <div className="flex items-center gap-1 text-sm font-medium text-red-600">
                          <ArrowUp className="w-4 h-4" />
                          +$50k
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div className="bg-green-500 w-1/4"></div>
                          <div className="bg-yellow-500 w-1/4"></div>
                          <div className="bg-orange-500 w-1/4"></div>
                          <div className="bg-red-500 w-1/4"></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
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
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">Chiffre d&apos;Affaires Réalisé (vs. Prévisionnel) et Forecast</h3>
                      <p className="text-sm text-slate-600">Suivi de la performance commerciale et de la production vendue.</p>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                      Voir le rapport
                    </Button>
                  </div>
                  
                  {/* Empty chart area */}
                  <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                    <p className="text-slate-400">Chart visualization area</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Monthly KPIs Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Monthly KPIs</h2>
              
              {/* Budget Execution Tracking */}
              <Card className="bg-white border border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900">Budget Execution Tracking</h3>
                      <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                        Details
                      </Button>
                    </div>
                    
                    <div className="text-sm text-slate-600">Global budget consumption.</div>
                    
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
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-slate-900">85%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-slate-600 mb-3">Target: 90%</div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Optimization Suggestions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Efficiency Tracking */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">Financial Efficiency Tracking</h3>
                      <p className="text-sm text-slate-600">Global and by zone.</p>
                    </div>
                    <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                      Action Plan
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Global */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Global</span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <ArrowUp className="w-3 h-3" />
                          <span>105%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Zone A */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Zone A</span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <ArrowUp className="w-3 h-3" />
                          <span>112%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Zone B */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Zone B</span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex items-center gap-1 text-sm font-medium text-yellow-600">
                          <div className="w-3 h-0.5 bg-yellow-600"></div>
                          <span>98%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Zone C */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Zone C</span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-red-500 rounded-full"></div>
                        <div className="flex items-center gap-1 text-sm font-medium text-red-600">
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
