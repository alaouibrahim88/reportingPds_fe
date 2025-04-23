"use client";
import React, { HTMLAttributes } from "react";
import { workflowData } from "../../_components/data/workflowData";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";

import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeft,
  Building2,
  Users,
  ArrowLeftRight,
  Search,
  X,
} from "lucide-react";
import { TableFilter } from "../../_components/TableFilter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Sample data for cells
const cellsData = [
  {
    id: "C1",
    status: "Active",
    efficiency: "92%",
    directCost: "1000",
    indirectCost: "500",
    efficiencyFI: "98%",
    totalCost: "1500",
    productionRate: "150 units/hour",
    downtime: "1%",
    qualityRate: "98%",
    maintenance: "Not Required",
  },
  {
    id: "C2",
    status: "Maintenance",
    efficiency: "85%",
    directCost: "1000",
    indirectCost: "500",
    efficiencyFI: "98%",
    totalCost: "1500",
    productionRate: "120 units/hour",
    downtime: "4%",
    qualityRate: "95%",
    maintenance: "Scheduled",
  },
  {
    id: "C3",
    status: "Active",
    efficiency: "88%",
    directCost: "1000",
    indirectCost: "500",
    efficiencyFI: "98%",
    totalCost: "1500",
    productionRate: "135 units/hour",
    downtime: "2%",
    qualityRate: "97%",
    maintenance: "Not Required",
  },
  {
    id: "C4",
    status: "Inactive",
    efficiency: "78%",
    directCost: "1000",
    indirectCost: "500",
    efficiencyFI: "98%",
    totalCost: "1500",
    productionRate: "110 units/hour",
    downtime: "3%",
    qualityRate: "94%",
    maintenance: "Scheduled",
  },
  {
    id: "C5",
    status: "Active",
    efficiency: "90%",
    directCost: "1000",
    indirectCost: "500",
    efficiencyFI: "98%",
    totalCost: "1500",
    productionRate: "145 units/hour",
    downtime: "1%",
    qualityRate: "96%",
    maintenance: "Not Required",
  },
];

const operatorsData = [
  {
    name: "John Smith",
    cell: "Cell 1",
    shift: "8",
    tasksCompleted: 45,
    efficiency: "94%",
    qualityScore: "98%",
    status: "Active",
    hoursWorked: "30",
  },
  {
    name: "Sarah Johnson",
    cell: "Cell 2",
    shift: "9",
    tasksCompleted: 38,
    efficiency: "91%",
    qualityScore: "96%",
    status: "Break",
    hoursWorked: "23",
  },
  {
    name: "Mike Chen",
    cell: "Cell 1",
    shift: "12",
    tasksCompleted: 42,
    efficiency: "89%",
    qualityScore: "95%",
    status: "Active",
    hoursWorked: "40",
  },
  {
    name: "Emma Davis",
    cell: "Cell 3",
    shift: "12",
    tasksCompleted: 40,
    efficiency: "92%",
    qualityScore: "97%",
    status: "Active",
    hoursWorked: "70",
  },
  {
    name: "Alex Turner",
    cell: "Cell 2",
    shift: "9",
    tasksCompleted: 35,
    efficiency: "87%",
    qualityScore: "94%",
    status: "Break",
    hoursWorked: "62",
  },
];

// Add this near your other mock data
const cellOptions = [
  { value: "all", label: "All Cells" },
  { value: "cell-1", label: "Cell 1" },
  { value: "cell-2", label: "Cell 2" },
  { value: "cell-3", label: "Cell 3" },
  { value: "cell-4", label: "Cell 4" },
];

// Add this near your other constants
const zoneOptions = [
  { value: "zone-1", label: "Wrapping" },
  { value: "zone-2", label: "Nets" },
  { value: "zone-3", label: "Boot" },
];

// First, let's update the filter options
const monthOptions = [
  { value: "01", label: "Janvier" },
  { value: "02", label: "Février" },
  { value: "03", label: "Mars" },
  { value: "04", label: "Avril" },
  { value: "05", label: "Mai" },
  { value: "06", label: "Juin" },
  { value: "07", label: "Juillet" },
  { value: "08", label: "Août" },
  { value: "09", label: "Septembre" },
  { value: "10", label: "Octobre" },
  { value: "11", label: "Novembre" },
  { value: "12", label: "Décembre" },
];

const yearOptions = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
];

export default function WorkflowDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [currentCellsPage, setCurrentCellsPage] = useState(1);
  const [openRows, setOpenRows] = useState<string[]>([]);
  const [currentOperatorsPage, setCurrentOperatorsPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCell, setSelectedCell] = useState("all");
  const [selectedZone, setSelectedZone] = useState("zone-1");
  const [cellSearchQuery, setCellSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("2025");




  const toggleRow = (rowKey: string) => {
    setOpenRows((prev) =>
      prev.includes(rowKey)
        ? prev.filter((key) => key !== rowKey)
        : [...prev, rowKey]
    );
  };

  const detail = workflowData.zoneData
    .flatMap((zone) => zone.details)
    .find((detail) => detail.id === parseInt(params.id));

  if (!detail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Detail not found</h1>
        <p className="text-muted-foreground mb-4">ID: {params.id}</p>
        <Link href="/workflows">
          <Button>Return to Workflows</Button>
        </Link>
      </div>
    );
  }

  // Pagination calculations
  const totalCellsPages = Math.ceil(cellsData.length / itemsPerPage);
  const totalOperatorsPages = Math.ceil(operatorsData.length / itemsPerPage);

  const paginatedCells = cellsData.slice(
    (currentCellsPage - 1) * itemsPerPage,
    currentCellsPage * itemsPerPage
  );

  // Update the filter logic
  const filteredOperators = operatorsData.filter((operator) => {
    const matchesSearch = Object.values(operator)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCell =
      selectedCell === "all" ||
      operator.cell ===
        cellOptions.find((c) => c.value === selectedCell)?.label;
    return matchesSearch && matchesCell;
  });

  // Update paginated operators to use filtered data
  const paginatedOperators = filteredOperators.slice(
    (currentOperatorsPage - 1) * itemsPerPage,
    currentOperatorsPage * itemsPerPage
  );

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    setPage: (page: number) => void
  ) => (
    <div className="mt-4 flex items-center justify-between px-2">
      <div className="text-sm text-muted-foreground">
        {`Page ${currentPage} of ${totalPages}`}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "h-8 w-8 p-0",
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "ghost"}
              size="icon"
              onClick={() => setPage(i + 1)}
              className="h-8 w-8 p-0"
            >
              <span className="text-xs">{i + 1}</span>
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "h-8 w-8 p-0",
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="py-2 px-4">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link href="/workflows">
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted/50 -ml-2 h-8 w-8 p-0"
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
              Details for {detail.zone} - {detail.machine}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-2 py-1 rounded-md border">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <ArrowLeftRight className="h-3 w-3" />
            Switch zone:
          </span>
          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="h-6 w-[100px] text-xs border-none bg-transparent hover:bg-muted/80 focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent className="min-w-[120px]">
              {zoneOptions.map((zone) => (
                <SelectItem
                  key={zone.value}
                  value={zone.value}
                  className="text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {zone.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cells Performance Table */}
      <div className="rounded-md border mb-4">
        <div className="flex items-center justify-between h-12 px-3 border-b bg-muted/40">
          <div className="flex items-center gap-2">
            <Building2 className="w-3 h-3 text-primary" />
            <h3 className="font-medium text-xs">Cells Performance</h3>
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Search cells..."
              value={cellSearchQuery}
              onChange={(e) => setCellSearchQuery(e.target.value)}
              className="h-6 w-[180px] text-xs bg-white/50"
            />
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="h-6 w-[120px] text-xs bg-white/50">
                <SelectValue placeholder="Mois" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-xs">
                  Tous les mois
                </SelectItem>
                {monthOptions.map((month) => (
                  <SelectItem
                    key={month.value}
                    value={month.value}
                    className="text-xs"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="h-6 w-[100px] text-xs bg-white/50">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem
                    key={year.value}
                    value={year.value}
                    className="text-xs"
                  >
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
  <TableHeader>
    <TableRow className="hover:bg-transparent">
      <TableHead className="h-9 text-xs">Détail</TableHead>
      <TableHead className="h-9 text-xs">Cell ID</TableHead>
      <TableHead className="h-9 text-xs">Performance</TableHead>
      <TableHead className="h-9 text-xs">Taux STD</TableHead>
      <TableHead className="h-9 text-xs">Taux Réel</TableHead>
      <TableHead className="h-9 text-xs">Heurs STD</TableHead>
      <TableHead className="h-9 text-xs">Heure Réel</TableHead>
      <TableHead className="h-9 text-xs">Couts STD</TableHead>
      <TableHead className="h-9 text-xs">Couts Réel</TableHead>
      <TableHead className="h-9 text-xs">Efficience</TableHead>
      <TableHead className="h-9 text-xs">Ecart Global</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {paginatedCells.map((cell, index) => {
      const rowKey = `table-operators-${index}`;

      return (
        <React.Fragment key={rowKey}>
          <TableRow key={rowKey} className="h-10 hover:bg-muted/50" style={{ height: '10px' }}>
            <TableCell className="py-1 text-sm">
              <button
                onClick={() => toggleRow(rowKey)}
                className="p-0.5 hover:bg-muted rounded-lg"
              >
                {openRows.includes(rowKey) ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            </TableCell>
            <TableCell className="text-xs font-medium py-2">{cell.id}</TableCell>
            <TableCell className="text-xs py-2">
              <span
                className={cn("inline-flex items-center px-1 py-1 rounded-full", {
                  "bg-green-100": cell.status === "Active",
                  "bg-yellow-100": cell.status === "Maintenance",
                  "bg-red-100": cell.status === "Inactive",
                })}
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", {
                    "bg-green-500": cell.status === "Active",
                    "bg-yellow-500": cell.status === "Maintenance",
                    "bg-red-500": cell.status === "Inactive",
                  })}
                />
              </span>
            </TableCell>
            <TableCell className="text-xs py-2">{cell.efficiency}</TableCell>
            <TableCell className="text-xs py-2">{cell.directCost}</TableCell>
            <TableCell className="text-xs py-2">{cell.efficiency}</TableCell>
            <TableCell className="text-xs py-2">{cell.directCost}</TableCell>
            <TableCell className="text-xs py-2">{cell.indirectCost}</TableCell>
            <TableCell className="text-xs py-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100">
                {cell.indirectCost}
              </span>
            </TableCell>
            <TableCell className="text-xs py-2">{cell.totalCost}</TableCell>
            <TableCell className="text-xs py-2">
              {(() => {
                const value = Number(cell.totalCost) * 2;
                const badgeClass =
                  value > 100
                    ? "bg-green-100 text-green-700"
                    : "bg-red-400 text-red-700";
                return (
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${badgeClass}`}>
                    {value}
                  </span>
                );
              })()}
            </TableCell>
          </TableRow>

          {openRows.includes(rowKey) && (
            <tr>
            <td colSpan={12}>
              <div className="overflow-x-auto p-4">
                <table className="table-auto w-full border-collapse border border-gray-400 text-sm text-center">
                  <thead>
                    <tr style={{ height: '10px' }}>
                      <th colSpan={1} className="bg-white-100 border border-gray-400 py-0" style={{ fontSize: '12px' }}></th>
                      <th colSpan={4} className="bg-blue-100 border border-gray-400 py-0" style={{ fontSize: '12px' }}>Tarif Horaire</th>
                      <th colSpan={4} className="bg-green-100 border border-gray-400 py-0" style={{ fontSize: '12px' }}>Couts Social</th>
                      <th colSpan={4} className="bg-red-100 border border-gray-400 py-0" style={{ fontSize: '12px' }}>Avantage Social</th>
                    </tr>
                    <tr className="bg-white">
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}></th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Salaire.Horaire</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>HS</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Anciente</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Jours.fériés</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Congé.payé</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Prime poste</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Bonus.productivité</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Bonus.nuit</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Sécurité.sociale</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Assurance.collective</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Coût.acc.travail</th>
                      <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Retirement Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ height: '10px' }}>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>S</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€%</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>150€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>100€</td>
                    </tr>
                    <tr style={{ height: '10px' }}>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>R</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€%</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>150€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                      <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>100€</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          )}
        </React.Fragment>
      );
    })}
  </TableBody>
</Table>

        <div className="border-t">
          {renderPagination(
            currentCellsPage,
            totalCellsPages,
            setCurrentCellsPage
          )}
        </div>
      </div>

      {/* Operators Performance Section */}
      <div className="rounded-md border">
        {selectedCell === "all" ? (
          // Initial state - just the cell selector
          <div className="flex items-center justify-between h-12 px-3 border-b bg-muted/40">
            <div className="flex items-center gap-2">
              <Building2 className="w-3 h-3 text-primary" />
              <h3 className="font-medium text-xs">Operators Performance</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Select a cell to view operators performance
            </p>
            <Select value={selectedCell} onValueChange={setSelectedCell}>
              <SelectTrigger className="h-8 w-[160px] text-xs">
                <SelectValue placeholder="Select a cell" />
              </SelectTrigger>
              <SelectContent>
                {cellOptions
                  .filter((cell) => cell.value !== "all")
                  .map((cell) => (
                    <SelectItem
                      key={cell.value}
                      value={cell.value}
                      className="text-xs"
                    >
                      {cell.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          // Cell details and table view
          <>
            {/* Cell Summary Card */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">
                      {
                        cellOptions.find((cell) => cell.value === selectedCell)
                          ?.label
                      }
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Cell Overview
                    </p>
                  </div>
                </div>
                <Select value={selectedCell} onValueChange={setSelectedCell}>
                  <SelectTrigger className="h-7 w-[120px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cellOptions
                      .filter((cell) => cell.value !== "all")
                      .map((cell) => (
                        <SelectItem
                          key={cell.value}
                          value={cell.value}
                          className="text-xs"
                        >
                          {cell.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 gap-4">
  <div
  className="rounded-lg bg-gray-100 bg-muted/50 border flex items-center justify-center"
  style={{ height: '20px' }}
>
  <p className="text-[10px] text-muted-foreground leading-none m-0 p-0 text-gray-800">
    Total Couts STD : 8
  </p>
</div>
 <div
  className="rounded-lg bg-gray-100 bg-muted/50 border flex items-center justify-center"
  style={{ height: '20px' }}
>
  <p className="text-[10px] text-muted-foreground leading-none m-0 p-0 text-gray-800">
    Total Couts STD : 8
  </p>
</div>
<div
  className="rounded-lg bg-gray-100 bg-muted/50 border flex items-center justify-center "
  style={{ height: '20px' }}
>
  <p className="text-[10px] text-muted-foreground leading-none m-0 p-0 text-gray-800">
    Total Couts STD : 8
  </p>
</div><div
  className="rounded-lg bg-gray-100 bg-muted/50 border flex items-center justify-center"
  style={{ height: '20px' }}
>
  <p className="text-[10px] text-muted-foreground leading-none m-0 p-0 text-gray-800">
    Total Couts STD : 8
  </p>
</div>
              </div>
            </div>

            {/* Existing table code */}
            <div className="flex items-center justify-between h-8 px-3 border-b bg-muted/40">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-primary" />
                <h3 className="font-medium text-xs">Operators List</h3>
              </div>

              <div className="relative flex items-center gap-1.5 bg-white/50 rounded-md px-2 h-6 group focus-within:ring-1 focus-within:ring-primary/20">
                <Search className="h-3 w-3 text-muted-foreground/50 group-focus-within:text-primary/50" />
                <Input
                  placeholder="Search operators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-6 w-[160px] text-xs border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 placeholder:text-muted-foreground/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 hover:text-primary"
                  >
                    <X className="h-3 w-3 text-muted-foreground/50 hover:text-primary/50" />
                  </button>
                )}
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                <TableHead className="h-9 text-xs"></TableHead>
                  <TableHead className="h-9 text-xs">Operator</TableHead>
                  <TableHead className="h-9 text-xs">Matricule</TableHead>
                  <TableHead className="h-9 text-xs">Hours Réel</TableHead>
                  <TableHead className="h-9 text-xs">Heures Sup</TableHead>
                  <TableHead className="h-9 text-xs">Tarif horaire</TableHead>
                  <TableHead className="h-9 text-xs">Coût social</TableHead>
                  <TableHead className="h-9 text-xs">Avantages Sociaux</TableHead>
                  <TableHead className="h-9 text-xs">Net</TableHead>
                  <TableHead className="h-9 text-xs">Couts Réel</TableHead>
                  <TableHead className="h-9 text-xs">Couts Standart</TableHead>
                  <TableHead className="h-9 text-xs">Ecarts</TableHead>
                
                </TableRow>
              </TableHeader>
              <TableBody>
        
          
                {paginatedOperators.map((operator, index) => {
            
                const rowKey = `table-cell-${index}`;

                 return (
                 <React.Fragment key={rowKey}>
                 <TableRow key={operator.name} className="h-10 hover:bg-muted/50" style={{ height: '10px' }}>
                 <TableCell className="py-1 text-sm">
                                    <button
                                      onClick={() => toggleRow(rowKey)}
                                      className="p-0.5 hover:bg-muted rounded-lg" >
                                     {openRows.includes(rowKey) ? (
                                        <ChevronDown className="h-3 w-3" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3" />
                                      )}
                                    </button>
                </TableCell>

                      <TableCell className="text-xs font-medium py-2">
                        {operator.name}
                      </TableCell>
                      <TableCell className="text-xs py-2">
                        {operator.cell}
                      </TableCell>
                      <TableCell className="text-xs py-2">
                        {operator.shift}
                      </TableCell>
                      <TableCell className="text-xs py-2">
                        {operator.tasksCompleted}
                      </TableCell>
                      <TableCell className="text-xs py-2">
                        {operator.efficiency}
                      </TableCell>
                      <TableCell className="text-xs py-2">
                        {operator.hoursWorked}
                      </TableCell>
                      <TableCell className="text-xs py-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${ "bg-gray-100"}`} >
                        {operator.hoursWorked}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs py-2">
                        {operator.hoursWorked}
                      </TableCell>
                      <TableCell className="text-xs py-2">  
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${ "bg-gray-100"}`} >
                        {operator.hoursWorked}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs py-2">
                        {operator.hoursWorked}
                      </TableCell>
                      <TableCell className="text-xs py-2">
                      {(() => {
              const value = Number(operator.hoursWorked) * 2;
              const badgeClass =
              value > 100
              ? "bg-green-100 text-green-700"
              : "bg-red-300 text-red-800";
               return (
               <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${badgeClass}`}>
               {value}
               </span>
               );
               })()}
                      </TableCell>
                      </TableRow>
                    
                {
            
                openRows.includes(rowKey) && (
                <tr>
                <td colSpan={12}>
                  <div className="overflow-x-auto p-4">
                    <table className="table-auto w-full border-collapse border border-gray-400 text-sm text-center">
                      <thead>
                        <tr style={{ height: '10px' }}>
                          <th colSpan={1} className="bg-white-100 border border-gray-400 py-0" style={{ fontSize: '12px' }}></th>
                          <th colSpan={4} className="bg-blue-100 border border-gray-400 py-0" style={{ fontSize: '12px' }}>Tarif Horaire</th>
                          <th colSpan={4} className="bg-green-100 border border-gray-400 py-0" style={{ fontSize: '12px' }}>Couts Social</th>
                          <th colSpan={4} className="bg-red-100 border border-gray-400 py-0" style={{ fontSize: '12px' }}>Avantage Social</th>
                        </tr>
                        <tr className="bg-white">
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}></th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Salaire.Horaire</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>HS</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Anciente</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Jours.fériés</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Congé.payé</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Prime poste</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Bonus.productivité</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Bonus.nuit</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Sécurité.sociale</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Assurance.collective</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Coût.acc.travail</th>
                          <th className="border border-gray-400 px-2 py-1 text-gray-600" style={{ fontSize: '12px' }}>Retirement Plan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ height: '10px' }}>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>S</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€%</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>150€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>100€</td>
                        </tr>
                        <tr style={{ height: '10px' }}>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>R</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€%</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>150€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>200€</td>
                          <td className="border border-gray-300 py-1" style={{ fontSize: '12px' }}>100€</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
       
          </React.Fragment>
          );
        })}
        </TableBody>
      </Table>

            <div className="border-t">
              {renderPagination(
                currentOperatorsPage,
                Math.ceil(filteredOperators.length / itemsPerPage),
                setCurrentOperatorsPage
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
