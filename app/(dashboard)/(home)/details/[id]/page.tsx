"use client";

import React, { useState } from "react";
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
import {
  ArrowLeft,
  Building2,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardData } from "@/app/(dashboard)/(home)/_components/data/dashboardData";
import { workflowData } from "@/app/(dashboard)/workflows/_components/data/workflowData";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function DetailsPage({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCell, setSelectedCell] = useState("all");
  const [selectedOperator, setSelectedOperator] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");

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

  // Add cell options
  const cellOptions = [
    { value: "all", label: "All Cells" },
    { value: "cell-1", label: "Cell 1" },
    { value: "cell-2", label: "Cell 2" },
    { value: "cell-3", label: "Cell 3" },
  ];

  // Add operator options
  const operatorOptions = [
    { value: "all", label: "All Operators" },
    { value: "operator-1", label: "Operator 1" },
    { value: "operator-2", label: "Operator 2" },
    { value: "operator-3", label: "Operator 3" },
  ];

  // Add time options
  const timeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  return (
    <div className="py-2 px-4">
      {/* Title Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link href="/">
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
              Details for {parentZone?.name || " Zone"}
            </p>
          </div>
        </div>
      </div>

      {/* Details Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Type</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">process</span>
              <span>{zoneDetail.op.production.planned}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">matière</span>
              <span>{zoneDetail.op.production.actual}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">alert</span>
              <span className={"text-red-500"}>
                {zoneDetail.op.production.variance}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">Critical cells</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cellule 1</span>
              <span>{zoneDetail.op.damageType.process}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cellule 4</span>
              <span>{zoneDetail.op.damageType.machine}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cellule 8</span>
              <span>{zoneDetail.op.damageType.material}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Table Section */}
      <div className="rounded-md border">
        <div className="flex items-center justify-between p-3 border-b bg-muted/40">
          <div className="flex items-center gap-2">
            <FolderIcon className="w-4 h-4 text-primary" />
            <h2 className="font-medium text-sm">Performance Details</h2>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-[200px] pl-8 text-xs"
              />
            </div>
            <Select value={selectedCell} onValueChange={setSelectedCell}>
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Select cell" />
              </SelectTrigger>
              <SelectContent>
                {cellOptions.map((cell) => (
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
            <Select
              value={selectedOperator}
              onValueChange={setSelectedOperator}
            >
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                {operatorOptions.map((op) => (
                  <SelectItem
                    key={op.value}
                    value={op.value}
                    className="text-xs"
                  >
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem
                    key={time.value}
                    value={time.value}
                    className="text-xs"
                  >
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Time</TableHead>
              <TableCell>Zone</TableCell>
              <TableCell>Cells</TableCell>
              <TableCell>operator</TableCell>
              <TableHead>Matricule</TableHead>
              <TableHead>Efficience</TableHead>
              <TableHead>Direct Cost</TableHead>
              <TableHead>Indirect Cost</TableHead>
              <TableHead>Heures travaillées</TableHead>
              <TableHead>Heures reels</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <button
                  onClick={() => {}}
                  className="p-1 hover:bg-muted rounded-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </TableCell>
              <TableCell>{zoneDetail.time}</TableCell>
              <TableCell>{zoneDetail.zone}</TableCell>
              <TableCell>{zoneDetail.cellule}</TableCell>
              <TableCell>{zoneDetail.operator}</TableCell>
              <TableCell>{zoneDetail.machine}</TableCell>
              <TableCell>{zoneDetail.hoursWorked}</TableCell>
              <TableCell>{zoneDetail.hoursWorked}</TableCell>
              <TableCell>{zoneDetail.hoursWorked}</TableCell>
              <TableCell>{zoneDetail.hoursReel}</TableCell>
              <TableCell>{zoneDetail.hoursReel}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
