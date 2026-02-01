"use client";
import { TabSelector } from "@/components/ui/TabSelector";
import React, { useState } from "react";

type TabType = "weekly" | "monthly";

// Programs Dashboard Page - Can fetch data here
export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("monthly");

  const WeeklyProgram = () => {
    return (
      <div>
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary">
              payments
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Budget vs Actual (CAPEX/OPEX)
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Historical Performance
              </h3>
              <div className="flex justify-between items-center gap-2 px-2">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    -$2.1k
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      -$2k
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">JAN</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    +$0.5k
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      +$1k
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">FEB</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    +$12k
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      +$12k
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">MAR</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-primary">
                    -$4.2k
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-transparent ring-4 ring-primary/5">
                    <span className="text-sm font-bold text-slate-600">
                      -$4k
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-primary">APR</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-slate-600">
                  Current Health:
                  <span className="text-green-600 font-bold">On Track</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Variance of -2.4% below budget due to deferred tool purchases.
                </p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Monthly Spend Trend
                </h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    BUDGET
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    ACTUAL
                  </div>
                </div>
              </div>
              <div className="h-48 w-full relative">
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 100"
                >
                  <path
                    d="M0,80 L100,70 L200,60 L300,45 L400,30"
                    fill="none"
                    stroke="#cbd5e1"
                    stroke-dasharray="4"
                    stroke-width="2"
                  ></path>
                  <path
                    d="M0,85 L100,75 L200,62 L300,50 L400,35"
                    fill="none"
                    stroke="#0d7ff2"
                    stroke-linecap="round"
                    stroke-width="3"
                  ></path>
                  <circle cx="400" cy="35" fill="#0d7ff2" r="4"></circle>
                </svg>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                  <span>JAN</span>
                  <span>FEB</span>
                  <span>MAR</span>
                  <span>APR</span>
                  <span>MAY (EST)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary">
              account_tree
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Planning vs Forecast (APQP Milestones)
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Milestone Adherence
              </h3>
              <div className="flex justify-between items-center gap-2 px-2">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    100%
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      100%
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">JAN</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    85%
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      85%
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">FEB</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    65%
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      65%
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">MAR</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-primary">78%</span>
                  <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center bg-transparent ring-4 ring-primary/5">
                    <span className="text-sm font-bold text-slate-600">
                      78%
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-primary">APR</p>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-slate-600">
                  Current Health:
                  <span className="text-orange-600 font-bold">At Risk</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Prototype delay impacting APQP Stage 2 approval. Recovery plan
                  initiated.
                </p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Milestone Completion Rate
                </h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    TARGET
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    ACTUAL
                  </div>
                </div>
              </div>
              <div className="h-48 w-full relative">
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 400 100"
                >
                  <path
                    d="M0,90 L100,70 L200,50 L300,30 L400,10"
                    fill="none"
                    stroke="#cbd5e1"
                    stroke-width="2"
                  ></path>
                  <path
                    d="M0,90 L100,75 L200,65 L300,55 L400,45"
                    fill="none"
                    stroke="#ef4444"
                    stroke-linecap="round"
                    stroke-width="3"
                  ></path>
                  <circle cx="400" cy="45" fill="#ef4444" r="4"></circle>
                </svg>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                  <span>JAN</span>
                  <span>FEB</span>
                  <span>MAR</span>
                  <span>APR</span>
                  <span>MAY (EST)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary">
              menu_book
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">
              Documentation Progress
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Historical Readiness
              </h3>
              <div className="flex justify-between items-center gap-2 px-2">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    45%
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      45%
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">JAN</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    58%
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-orange-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      58%
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">FEB</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-slate-700">
                    72%
                  </span>
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-transparent">
                    <span className="text-sm font-bold text-slate-600">
                      72%
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500">MAR</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-xs font-black text-primary">80%</span>
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-transparent ring-4 ring-primary/5">
                    <span className="text-sm font-bold text-slate-600">
                      80%
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-primary">APR</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">
                    Plans
                  </p>
                  <p className="text-xl font-black text-slate-900 mt-1">
                    94%
                  </p>
                </div>
                <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">
                    Procedures
                  </p>
                  <p className="text-xl font-black text-slate-900 mt-1">
                    82%
                  </p>
                </div>
                <div className="p-3 border border-slate-100 rounded-lg bg-slate-50">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase">
                    Work Inst.
                  </p>
                  <p className="text-xl font-black text-slate-900 mt-1">
                    65%
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 border-l border-slate-100 lg:pl-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Total Approval Growth
              </h3>
              <div className="h-40 w-full relative chart-placeholder rounded-lg flex items-center justify-center border border-dashed border-slate-200">
                <svg className="w-full h-full px-4" viewBox="0 0 400 100">
                  <path
                    d="M0,100 Q100,80 200,60 T400,20"
                    fill="none"
                    stroke="#0d7ff2"
                    stroke-linecap="round"
                    stroke-width="4"
                  ></path>
                  <path
                    d="M0,100 Q100,80 200,60 T400,20 V100 H0 Z"
                    fill="url(#grad1)"
                    opacity="0.1"
                  ></path>
                  <defs>
                    <linearGradient
                      id="grad1"
                      x1="0%"
                      x2="0%"
                      y1="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#0d7ff2", stopOpacity: 1 }}
                      ></stop>
                      <stop
                        offset="100%"
                        style={{ stopColor: "#0d7ff2", stopOpacity: 0 }}
                      ></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute right-4 top-4 text-xs font-bold text-primary">
                  80.3% Average
                </span>
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400">
                <span>WEEK 14</span>
                <span>WEEK 15</span>
                <span>WEEK 16</span>
                <span>WEEK 17</span>
                <span>WEEK 18</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const MonthlyProgram = () => {
    return (
      <div>
        <div className="space-y-4">
          <section className="bg-white rounded-xl border border-slate-200 p-8 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">
                  local_shipping
                </span>
                On Time Delivery (OTD)
              </h2>
              <div className="text-right">
                <p className="text-4xl font-black text-slate-900">
                  94.2%
                </p>
                <p className="text-sm font-medium text-emerald-600 flex items-center justify-end gap-1">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  +2.1% vs prev week
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 flex justify-between px-2">
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-green">
                    <span className="kpi-value">91%</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 40
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-amber">
                    <span className="kpi-value">84%</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 41
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-green">
                    <span className="kpi-value">92%</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 42
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle kpi-circle-active status-primary">
                    <span className="kpi-value-active text-slate-900">
                      94.2%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Week 43
                  </span>
                </div>
              </div>
              <div className="lg:col-span-8 h-40 relative">
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 500 100"
                >
                  <defs>
                    <linearGradient
                      id="otd-gradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stop-color="#0d7ff2"
                        stop-opacity="0.2"
                      ></stop>
                      <stop
                        offset="100%"
                        stop-color="#0d7ff2"
                        stop-opacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 Q125,90 250,50 T500,20 L500,100 L0,100 Z"
                    fill="url(#otd-gradient)"
                  ></path>
                  <path
                    d="M0,80 Q125,90 250,50 T500,20"
                    fill="none"
                    stroke="#0d7ff2"
                    stroke-width="3"
                  ></path>
                  <circle cx="500" cy="20" fill="#0d7ff2" r="5"></circle>
                </svg>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl border border-slate-200 p-8 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">
                  engineering
                </span>
                Critical Equipment Availability
              </h2>
              <div className="text-right">
                <p className="text-4xl font-black text-slate-900">
                  88.5%
                </p>
                <p className="text-sm font-medium text-rose-600 flex items-center justify-end gap-1">
                  <span className="material-symbols-outlined text-sm">
                    trending_down
                  </span>
                  -4.2% vs prev week
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 flex justify-between px-2">
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-green">
                    <span className="kpi-value">96%</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 40
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-green">
                    <span className="kpi-value">95%</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 41
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-green">
                    <span className="kpi-value">94%</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 42
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle kpi-circle-active status-primary">
                    <span className="kpi-value-active text-slate-900">
                      88.5%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Week 43
                  </span>
                </div>
              </div>
              <div className="lg:col-span-8 h-40 relative">
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 500 100"
                >
                  <defs>
                    <linearGradient
                      id="equip-gradient"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stop-color="#0d7ff2"
                        stop-opacity="0.2"
                      ></stop>
                      <stop
                        offset="100%"
                        stop-color="#0d7ff2"
                        stop-opacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,20 L166,25 L332,15 L500,75 L500,100 L0,100 Z"
                    fill="url(#equip-gradient)"
                  ></path>
                  <path
                    d="M0,20 L166,25 L332,15 L500,75"
                    fill="none"
                    stroke="#0d7ff2"
                    stroke-linejoin="round"
                    stroke-width="3"
                  ></path>
                  <circle cx="500" cy="75" fill="#0d7ff2" r="5"></circle>
                </svg>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">
                  person_add
                </span>
                Recruitment Progress vs Forecast
              </h2>
              <div className="text-right">
                <p className="text-4xl font-black text-slate-900">
                  12 / 14
                </p>
                <p className="text-sm font-medium text-slate-500">
                  Total Hires (MTD)
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 flex justify-between px-2">
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-green">
                    <span className="kpi-value">4/4</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 40
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-green">
                    <span className="kpi-value">3/3</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 41
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle status-amber">
                    <span className="kpi-value">2/3</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Week 42
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="kpi-circle kpi-circle-active status-primary">
                    <span className="kpi-value-active text-slate-900">
                      3/4
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Week 43
                  </span>
                </div>
              </div>
              <div className="lg:col-span-8 h-40 relative">
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 500 100"
                >
                  <line
                    stroke="#cbd5e1"
                    stroke-dasharray="4"
                    stroke-width="2"
                    x1="0"
                    x2="500"
                    y1="90"
                    y2="10"
                  ></line>
                  <path
                    d="M0,90 L125,75 L250,55 L375,45 L500,40"
                    fill="none"
                    stroke="#0d7ff2"
                    stroke-linecap="round"
                    stroke-width="3"
                  ></path>
                  <circle cx="500" cy="40" fill="#0d7ff2" r="5"></circle>
                </svg>
                <div className="absolute bottom-0 right-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    Dashed: Forecast | Solid: Actual
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };

  return (
    <main className="flex-1 overflow-hidden">
      <div className="p-6 sm:p-8 space-y-8">
        {/* Programs Dashboard Title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-1 rounded-full bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Project KPI
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {activeTab === "weekly" ? "Hebdomadaire" : "Mensuel"} Reporting
            </h1>
            <p className="text-slate-600 max-w-xl leading-relaxed">
              Executive overview of financial health, APQP milestone adherence,
              and project documentation readiness for Q1-Q2.
            </p>
          </div>
          <TabSelector
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="light"
          />
        </div>
        {activeTab === "weekly" ? <WeeklyProgram /> : <MonthlyProgram />}
      </div>
    </main>
  );
}
