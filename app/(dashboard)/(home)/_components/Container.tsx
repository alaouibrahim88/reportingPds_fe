"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { MixBarChart } from "./MixBarChart";
import TableZone from "./TableZone";
import { dashboardData } from "./data/dashboardData";
import { StatsCard } from "./StatsCard";
import { ZoneActivity } from "./ZoneActivity";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Container() {
  const { stats, zoneData, chartData } = dashboardData;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <StatsCard
            title="Unassigned"
            value={stats.unassigned}
            subtitle="Tasks"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            subtitle="Tasks in progress"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            subtitle="Tasks completed"
          />
        </div> */}

        {/* Charts and Content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
          {/* Chart Section */}
          <div className="xl:col-span-4 bg-card rounded-lg p-4 shadow-sm">
            {/* Filter Section */}
            <div className="flex flex-wrap gap-3 mb-4 pb-4 border-border">
              <Input placeholder="Search issues..." className="max-w-[200px]" />
              <Select defaultValue="7days">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="kotlin">Kotlin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                Production Issues
              </h3>
              <button className="text-muted-foreground text-sm">•••</button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 mb-4">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Track and manage production issues and scrap reports</span>
            </div>
            <MixBarChart data={chartData} />
          </div>

          {/* Zone Activity Section */}
          <ZoneActivity data={zoneData[0]} />
        </div>

        {/* Analytics Filter Bar */}
        <div className="bg-card rounded-lg shadow-sm p-4 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button className="text-gray-900 font-medium">
                Product Analytics
              </button>
              <button className="text-gray-500">Tag Analytics</button>
            </div>
            <div className="flex items-center gap-3">
              <Input placeholder="Search..." className="w-[200px]" />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filter Options</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    {/* Add your filter options here */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Date Range
                        </label>
                        <Select defaultValue="7days">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                            <SelectItem value="year">This year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Zone</label>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select zone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Zones</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="rust">Rust</SelectItem>
                            <SelectItem value="go">Go</SelectItem>
                            <SelectItem value="kotlin">Kotlin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-card rounded-lg shadow-sm">
          <TableZone data={zoneData} />
        </div>
      </div>
    </div>
  );
}

export default Container;
