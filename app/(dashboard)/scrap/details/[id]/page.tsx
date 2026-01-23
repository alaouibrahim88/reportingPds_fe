"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { workflowData } from "@/app/(dashboard)/workflows/_components/data/workflowData";
import CollapsibleZoneTable, { ApiResponse } from "./CollapsibleZoneTable";
import { fetchAllZones, fetchCellByZone, getOperators } from "@/actions/scrap";
import DetailsHeader from "./_components/DetailsHeader";
import OperatorDetailsTable from "./_components/OperatorDetailsTable";
import { Cell, Zone } from "@/types";
import { GetZoneDetails } from "@/actions/scrap/details";

export default function DetailsPage({ params }: { params: { id: string } }) {
  const [selectedCell, setSelectedCell] = useState("");
  const [viewMode, setViewMode] = useState<"price" | "Qty">("price");
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [allZones, setAllZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [allCells, setAllCells] = useState<Cell[]>([]);
  const [operatorData, setOperatorData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weekNumbers, setWeekNumbers] = useState<number[]>([]);
  const [monthData, setMonthData] = useState<{ [key: string]: string[] }>({});
  const [zoneTableData, setZoneTableData] = useState<ApiResponse | null>(null);

   useEffect(() => {
    fetchAllZones().then(setAllZones);
  }, []);

  useEffect(() => {
    const fetchZoneTableData = async () => {
      try {
        const data = await GetZoneDetails(selectedYear, viewMode, selectedMonth);
        setZoneTableData(data);
      } catch (error) {
        console.error("Error fetching zone table data:", error);
      }
    };

    fetchZoneTableData();
  }, [selectedYear, viewMode, selectedMonth]);

  useEffect(() => {
    const fetchAllCells = async () => {
      const allCells = await fetchCellByZone(selectedZone);
      setAllCells(allCells);
    };
    fetchAllCells();
  }, [selectedZone]);

  useEffect(() => {
    const fetchOperatorData = async () => {
      setIsLoading(true);
      try {
        const data = await getOperators(
          selectedYear,
          parseInt(selectedMonth),
          selectedCell,
          viewMode
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
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
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
          data={zoneTableData}
        />

        {/* Operator Details Table */}
        <OperatorDetailsTable
          key={selectedYear}
          allZones={allZones}
          allCells={allCells}
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
          setSelectedCell={setSelectedCell}
          selectedCell={selectedCell}
          isLoading={isLoading}
          operatorData={operatorData}
          monthData={monthData}
          weekNumbers={weekNumbers}
        />
      </div>
    </div>
  );
}