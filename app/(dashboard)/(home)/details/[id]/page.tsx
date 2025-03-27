"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

import { dashboardData } from "@/app/(dashboard)/(home)/_components/data/dashboardData";
import { workflowData } from "@/app/(dashboard)/workflows/_components/data/workflowData";

import CollapsibleZoneTable from "./CollapsibleZoneTable";
import { getAllZones, getAllCells, getOperators } from "@/actions/scrap";
import { Zone, Cell } from "./types";
import DetailsHeader from "./_components/DetailsHeader";
import OperatorDetailsTable from "./_components/OperatorDetailsTable";

export default function DetailsPage({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedCell, setSelectedCell] = useState("all");

  const [viewMode, setViewMode] = useState<"price" | "qty">("price");
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState("1");

  const [allZones, setAllZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState("all");
  const [allCells, setAllCells] = useState<Cell[]>([]);
  const [operatorData, setOperatorData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weekNumbers, setWeekNumbers] = useState<number[]>([]);
  const [monthData, setMonthData] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchAllZones = async () => {
      const allZones = await getAllZones();
      setAllZones(allZones.getlistZone);
    };
    fetchAllZones();
  }, [selectedZone]);

  useEffect(() => {
    const fetchAllCells = async () => {
      const allCells = await getAllCells(selectedZone);
      setAllCells(allCells.getlistcell);
    };
    fetchAllCells();
  }, [selectedZone]);

  useEffect(() => {
    const fetchOperatorData = async () => {
      if (selectedCell === "all") {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getOperators(
          selectedYear,
          parseInt(selectedMonth),
          selectedCell
        );

        if (
          data &&
          data.getDataStockCodeCell &&
          data.getDataStockCodeCell.length > 0
        ) {
          setOperatorData(data.getDataStockCodeCell);

          // Extract unique week numbers and organize by month
          const weeks: number[] = [];
          const months: { [key: string]: string[] } = {};

          data.getDataStockCodeCell[0].details.forEach((detail: any) => {
            if (!weeks.includes(detail.semaine)) {
              weeks.push(detail.semaine);
            }

            if (!months[detail.mois]) {
              months[detail.mois] = [];
            }

            if (!months[detail.mois].includes(`wk${detail.semaine}`)) {
              months[detail.mois].push(`wk${detail.semaine}`);
            }
          });

          setWeekNumbers(weeks.sort((a, b) => a - b));
          setMonthData(months);
        }
      } catch (error) {
        console.error("Error fetching operator data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOperatorData();
  }, [selectedYear, selectedMonth, selectedCell]);

  // Group weeks by month for display
  const monthGroups = Object.entries(monthData).map(([month, weeks]) => ({
    month: month.charAt(0).toUpperCase() + month.slice(1), // Capitalize month name
    weeks: weeks,
    weekCount: weeks.length,
  }));

  // Find the zone data based on the ID
  const zoneDetail = workflowData.zoneData
    .flatMap((zone) => zone.details)
    .find((detail) => detail.id === parseInt(params.id));

  if (!zoneDetail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Zone not found</h1>
        <Link href="/">
          <Button>Return to Scrap</Button>
        </Link>
      </div>
    );
  }

  // Get the parent zone data
  const parentZone = dashboardData.zoneData.find((zone) =>
    zone.details.some((detail) => detail.id === params.id)
  );

  // Pagination calculations for machines
  const machines = parentZone?.machines || [];
  const totalPages = Math.ceil(machines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMachines = machines.slice(startIndex, endIndex);

  return (
    <div className="py-2 px-4">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted/50 -ml-2 h-8 w-8 p-0 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <DetailsHeader viewMode={viewMode} />
        </div>

        <div className="flex items-center gap-3">
          <DetailsHeader.Controls
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>
      </div>

      {/* Details Overview */}
      <div className="space-y-8">
        {/* First Table */}
        <CollapsibleZoneTable
          viewMode={viewMode}
          year={selectedYear}
          month={selectedMonth}
        />

        {/* Operator Details Table */}
        <OperatorDetailsTable
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      </div>
    </div>
  );
}

// Helper function to get week value
function getWeekValue(details: any[], weekNumber: number) {
  const weekData = details.find((d) => d.semaine === weekNumber);
  if (!weekData) return "0.00 €";

  const value = parseFloat(weekData.couts.replace(",", "."));
  return `${value.toFixed(2)} €`;
}

// Helper function to get month total
function getMonthTotal(details: any[], monthName: string) {
  const monthData = details.find((d) => d.mois === monthName);
  if (!monthData) return "0.00 €";

  const total = parseFloat(monthData.total_mois.replace(",", "."));
  return `${total.toFixed(2)} €`;
}
