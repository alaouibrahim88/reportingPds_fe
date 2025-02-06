"use client";

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

// Add this near your other constants
const cellStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Inactive", label: "Inactive" },
];

export default function WorkflowDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [currentCellsPage, setCurrentCellsPage] = useState(1);
  const [currentOperatorsPage, setCurrentOperatorsPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCell, setSelectedCell] = useState("all");
  const [selectedZone, setSelectedZone] = useState("zone-1");
  const [cellSearchQuery, setCellSearchQuery] = useState("");
  const [cellStatusFilter, setCellStatusFilter] = useState("all");

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
            <Select
              value={cellStatusFilter}
              onValueChange={setCellStatusFilter}
            >
              <SelectTrigger className="h-6 w-[120px] text-xs bg-white/50">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {cellStatusOptions.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                    className="text-xs"
                  >
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-9 text-xs">Cell ID</TableHead>
              <TableHead className="h-9 text-xs">Performance</TableHead>
              <TableHead className="h-9 text-xs">Efficiency OP</TableHead>
              <TableHead className="h-9 text-xs">Direct Cost</TableHead>
              <TableHead className="h-9 text-xs">Indirect Cost</TableHead>
              <TableHead className="h-9 text-xs">Efficiency FI</TableHead>
              <TableHead className="h-9 text-xs">Total Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCells.map((cell, index) => (
              <TableRow key={cell.id} className="h-10 hover:bg-muted/50">
                <TableCell className="text-xs font-medium py-2">
                  {cell.id}
                </TableCell>
                <TableCell className="text-xs py-2">
                  <span
                    className={cn(
                      "inline-flex items-center px-1 py-1 rounded-full",
                      {
                        "bg-green-100": cell.status === "Active",
                        "bg-yellow-100": cell.status === "Maintenance",
                        "bg-red-100": cell.status === "Inactive",
                      }
                    )}
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
                <TableCell className="text-xs py-2">
                  {cell.efficiency}
                </TableCell>
                <TableCell className="text-xs py-2">
                  {cell.directCost}
                </TableCell>

                <TableCell className="text-xs py-2">
                  {cell.indirectCost}
                </TableCell>
                <TableCell className="text-xs py-2">{cell.downtime}</TableCell>

                <TableCell className="text-xs py-2">{cell.totalCost}</TableCell>
              </TableRow>
            ))}
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
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Operators
                  </p>
                  <p className="text-lg font-medium">12</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Total days
                  </p>
                  <p className="text-lg font-medium">8</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Avg. Efficiency
                  </p>
                  <p className="text-lg font-medium">92%</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Hours sup
                  </p>
                  <p className="text-lg font-medium">245</p>
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
                  <TableHead className="h-9 text-xs">Operator</TableHead>
                  <TableHead className="h-9 text-xs">Matricule</TableHead>
                  <TableHead className="h-9 text-xs">Hours Standard</TableHead>
                  <TableHead className="h-9 text-xs">Pieces</TableHead>
                  <TableHead className="h-9 text-xs">Efficiency</TableHead>
                  <TableHead className="h-9 text-xs">Direct Cost</TableHead>
                  <TableHead className="h-9 text-xs">Performance</TableHead>
                  <TableHead className="h-9 text-xs">Hours Worked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOperators.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No operators found for this cell
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedOperators.map((operator, index) => (
                    <TableRow key={index} className="h-10 hover:bg-muted/50">
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
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                            operator.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {operator.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs py-2">
                        {operator.hoursWorked}
                      </TableCell>
                    </TableRow>
                  ))
                )}
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
