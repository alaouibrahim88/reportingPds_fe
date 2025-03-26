"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, FolderIcon, Users2 } from "lucide-react";

import { dashboardData } from "@/app/(dashboard)/(home)/_components/data/dashboardData";
import { workflowData } from "@/app/(dashboard)/workflows/_components/data/workflowData";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import CollapsibleZoneTable from "./CollapsibleZoneTable";
import { getAllZones, getAllCells, getOperators } from "@/actions/scrap";
import { Zone, Cell } from "./types";

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

          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderIcon className="w-4 h-4 text-primary" />
              <h2 className="font-medium text-sm">Zone Details</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Details for 3 last months per{" "}
              <strong>{viewMode === "price" ? "Price" : "Quantity"}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Year Selector */}
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023" className="text-xs">
                2023
              </SelectItem>
              <SelectItem value="2024" className="text-xs">
                2024
              </SelectItem>
              <SelectItem value="2025" className="text-xs">
                2025
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Month Selector - Replace the duplicate year selector */}
          <Select
            value={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="w-[120px] h-8 text-xs">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1" className="text-xs">
                January
              </SelectItem>
              <SelectItem value="2" className="text-xs">
                February
              </SelectItem>
              <SelectItem value="3" className="text-xs">
                March
              </SelectItem>
              <SelectItem value="4" className="text-xs">
                April
              </SelectItem>
              <SelectItem value="5" className="text-xs">
                May
              </SelectItem>
              <SelectItem value="6" className="text-xs">
                June
              </SelectItem>
              <SelectItem value="7" className="text-xs">
                July
              </SelectItem>
              <SelectItem value="8" className="text-xs">
                August
              </SelectItem>
              <SelectItem value="9" className="text-xs">
                September
              </SelectItem>
              <SelectItem value="10" className="text-xs">
                October
              </SelectItem>
              <SelectItem value="11" className="text-xs">
                November
              </SelectItem>
              <SelectItem value="12" className="text-xs">
                December
              </SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode Switch */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg border bg-muted/30">
            <span className="text-xs font-medium text-muted-foreground">
              Price
            </span>
            <Switch
              checked={viewMode === "qty"}
              onCheckedChange={(checked) =>
                setViewMode(checked ? "qty" : "price")
              }
              className="data-[state=checked]:bg-primary"
            />
            <span className="text-xs font-medium text-muted-foreground">
              QTY
            </span>
          </div>
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

        {/* Third Table - Employee Details */}
        <div className="rounded-md border">
          <div className="flex items-center justify-between p-4 bg-muted/30">
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-primary" />
              <h3 className="font-medium text-sm">Operator Details</h3>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={selectedZone}
                onValueChange={setSelectedZone}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px] h-8 text-xs">
                  <SelectValue placeholder="Select Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">
                    All Zones
                  </SelectItem>
                  {allZones?.map((zone) => (
                    <SelectItem
                      key={zone.libelle}
                      value={zone.libelle}
                      className="text-xs"
                    >
                      {zone.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCell}
                onValueChange={setSelectedCell}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px] h-8 text-xs">
                  <SelectValue placeholder="Select Cell" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">
                    All Cells
                  </SelectItem>
                  {allCells?.map((cell) => (
                    <SelectItem
                      key={cell.libelle}
                      value={cell.libelle}
                      className="text-xs"
                    >
                      {cell.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-3">
            <div className="rounded-lg border bg-card text-card-foreground">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted/50 [&>*]:!text-[11px] [&>*]:font-medium [&>*]:!h-4 [&>*]:!py-[1px] [&>*]:!px-3 [&>*]:text-muted-foreground">
                    <TableHead>stockCode</TableHead>
                    <TableHead>coutUnitaire</TableHead>
                    <TableHead>process</TableHead>
                    <TableHead>matiere</TableHead>

                    {/* Dynamically generate columns for each month and its weeks */}
                    {Object.entries(monthData).map(
                      ([month, weeks], monthIndex) => (
                        <React.Fragment key={month}>
                          {/* Generate columns for each week in this month */}
                          {weeks.map((weekKey) => {
                            const weekNum = parseInt(weekKey.replace("wk", ""));
                            return (
                              <TableHead key={weekKey} className="text-center">
                                WK{weekNum}
                              </TableHead>
                            );
                          })}

                          {/* Add the month total column */}
                          <TableHead
                            className={`text-center ${
                              monthIndex < Object.keys(monthData).length - 1
                                ? "border-l border-r"
                                : "border-l"
                            } bg-yellow-50`}
                          >
                            Total{" "}
                            {month.charAt(0).toUpperCase() + month.slice(1)}
                          </TableHead>
                        </React.Fragment>
                      )
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={
                          4 + weekNumbers.length + Object.keys(monthData).length
                        }
                        className="text-center py-4"
                      >
                        Loading data...
                      </TableCell>
                    </TableRow>
                  ) : operatorData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={
                          4 + weekNumbers.length + Object.keys(monthData).length
                        }
                        className="text-center py-4"
                      >
                        {selectedCell === "all"
                          ? "Please select a cell to view data"
                          : "No data available for the selected criteria"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    operatorData.map((operator, index) => (
                      <TableRow
                        key={operator.stockCode}
                        className="hover:bg-muted/50 [&>*]:!text-[11px] [&>*]:!h-4 [&>*]:!py-[1px] [&>*]:!px-3 [&>*]:text-muted-foreground"
                      >
                        <TableCell>{operator.stockCode}</TableCell>
                        <TableCell>{operator.coutUnitaire}</TableCell>
                        <TableCell>{operator.process.toFixed(2)}</TableCell>
                        <TableCell>{operator.matiere.toFixed(2)}</TableCell>

                        {/* Dynamically generate data cells for each month and its weeks */}
                        {Object.entries(monthData).map(
                          ([month, weeks], monthIndex) => (
                            <React.Fragment key={month}>
                              {/* Generate data cells for each week in this month */}
                              {weeks.map((weekKey) => {
                                const weekNum = parseInt(
                                  weekKey.replace("wk", "")
                                );
                                return (
                                  <TableCell
                                    key={weekKey}
                                    className="text-center font-mono"
                                  >
                                    {getWeekValue(operator.details, weekNum)}
                                  </TableCell>
                                );
                              })}

                              {/* Add the month total cell */}
                              <TableCell
                                className={`text-center font-medium ${
                                  monthIndex < Object.keys(monthData).length - 1
                                    ? "border-l border-r"
                                    : "border-l"
                                } bg-yellow-50`}
                              >
                                {getMonthTotal(operator.details, month)}
                              </TableCell>
                            </React.Fragment>
                          )
                        )}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
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
