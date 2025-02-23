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
  Users2,
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
import { Switch } from "@/components/ui/switch";
import CollapsibleZoneTable from "./CollapsibleZoneTable";

// Add these sample data objects near the top of your component
const priceData = {
  projet: {
    wk1: 30,
    wk2: 20,
    wk3: 40,
    wk4: 22,
    wk5: 30,
    wk6: 20,
    wk7: 40,
    wk8: 22,
    wk9: 30,
    wk10: 20,
    wk11: 40,
    wk12: 22,
  },
  serie: {
    wk1: 30,
    wk2: 20,
    wk3: 40,
    wk4: 22,
    wk5: 30,
    wk6: 20,
    wk7: 40,
    wk8: 22,
    wk9: 30,
    wk10: 20,
    wk11: 40,
    wk12: 22,
  },
};

const qtyData = {
  projet: {
    wk1: 15,
    wk2: 10,
    wk3: 20,
    wk4: 11,
    wk5: 15,
    wk6: 10,
    wk7: 20,
    wk8: 11,
    wk9: 15,
    wk10: 10,
    wk11: 20,
    wk12: 11,
  },
  serie: {
    wk1: 15,
    wk2: 10,
    wk3: 20,
    wk4: 11,
    wk5: 15,
    wk6: 10,
    wk7: 20,
    wk8: 11,
    wk9: 15,
    wk10: 10,
    wk11: 20,
    wk12: 11,
  },
};

export default function DetailsPage({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCell, setSelectedCell] = useState("all");
  const [selectedOperator, setSelectedOperator] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");
  const [viewMode, setViewMode] = useState<"price" | "qty">("price");

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

        {/* Add Switch Button */}
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
          <span className="text-xs font-medium text-muted-foreground">QTY</span>
        </div>
      </div>

      {/* Details Overview */}
      <div className="space-y-8">
        {/* First Table */}
        <CollapsibleZoneTable viewMode={viewMode} />

        {/* Third Table - Employee Details */}
        <div className="rounded-md border">
          <div className="flex items-center justify-between p-4 bg-muted/30">
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-primary" />
              <h3 className="font-medium text-sm">Operator Details</h3>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all-operators">
                <SelectTrigger className="w-[180px] h-8 text-xs">
                  <SelectValue placeholder="Select Operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-operators" className="text-xs">
                    All Operators
                  </SelectItem>
                  <SelectItem value="MA123" className="text-xs">
                    BRAHIM ELJADIOUI
                  </SelectItem>
                  <SelectItem value="MA124" className="text-xs">
                    ADIL 1 ALAOUI 1
                  </SelectItem>
                  <SelectItem value="MA125" className="text-xs">
                    ADIL 2 ALAOUI 2
                  </SelectItem>
                  <SelectItem value="MA126" className="text-xs">
                    ADIL 3 ALAOUI 3
                  </SelectItem>
                  <SelectItem value="MA127" className="text-xs">
                    ADIL 4 ALAOUI 4
                  </SelectItem>
                  <SelectItem value="MA128" className="text-xs">
                    ADIL 5 ALAOUI 5
                  </SelectItem>
                  <SelectItem value="MA129" className="text-xs">
                    ADIL 6 ALAOUI 6
                  </SelectItem>
                  <SelectItem value="MA130" className="text-xs">
                    ADIL 7 ALAOUI 7
                  </SelectItem>
                  <SelectItem value="MA131" className="text-xs">
                    ADIL 8 ALAOUI 8
                  </SelectItem>
                  <SelectItem value="MA132" className="text-xs">
                    ADIL 9 ALAOUI 9
                  </SelectItem>
                  <SelectItem value="MA133" className="text-xs">
                    ADIL 10 ALAOUI 10
                  </SelectItem>
                  <SelectItem value="MA134" className="text-xs">
                    ADIL 11 ALAOUI 11
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-cells">
                <SelectTrigger className="w-[180px] h-8 text-xs">
                  <SelectValue placeholder="Select Cell" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-cells" className="text-xs">
                    All Cells
                  </SelectItem>
                  <SelectItem value="cell1" className="text-xs">
                    Cell 1
                  </SelectItem>
                  <SelectItem value="cell2" className="text-xs">
                    Cell 2
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-3">
            <div className="rounded-lg border bg-card text-card-foreground">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted/50 [&>*]:!text-[11px] [&>*]:font-medium [&>*]:!h-5 [&>*]:!py-[1px] [&>*]:!px-3 [&>*]:text-muted-foreground">
                    <TableHead>Cellule</TableHead>
                    <TableHead>MATRICULE</TableHead>
                    <TableHead>NOM</TableHead>
                    <TableHead>PRENOM</TableHead>
                    <TableHead className="text-center">WK1</TableHead>
                    <TableHead className="text-center">WK2</TableHead>
                    <TableHead className="text-center">WK3</TableHead>
                    <TableHead className="text-center">WK4</TableHead>
                    <TableHead className="text-center border-l border-r bg-yellow-50">
                      Total M1
                    </TableHead>
                    <TableHead className="text-center">WK5</TableHead>
                    <TableHead className="text-center">WK6</TableHead>
                    <TableHead className="text-center">WK7</TableHead>
                    <TableHead className="text-center">WK8</TableHead>
                    <TableHead className="text-center border-l border-r bg-yellow-50">
                      Total M2
                    </TableHead>
                    <TableHead className="text-center">WK9</TableHead>
                    <TableHead className="text-center">WK10</TableHead>
                    <TableHead className="text-center">WK11</TableHead>
                    <TableHead className="text-center">WK12</TableHead>
                    <TableHead className="text-center border-l bg-yellow-50">
                      Total M3
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-muted/50 [&>*]:!text-[11px] [&>*]:!h-5 [&>*]:!py-[1px] [&>*]:!px-3 [&>*]:text-muted-foreground">
                    <TableCell rowSpan={12}>CELL1</TableCell>
                    <TableCell>MA123</TableCell>
                    <TableCell>BRAHIM</TableCell>
                    <TableCell>ELJADIOUI</TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk1} €`
                        : qtyData.projet.wk1}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk2} €`
                        : qtyData.projet.wk2}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk3} €`
                        : qtyData.projet.wk3}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk4} €`
                        : qtyData.projet.wk4}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l border-r bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk1 +
                            priceData.projet.wk2 +
                            priceData.projet.wk3 +
                            priceData.projet.wk4
                          } €`
                        : qtyData.projet.wk1 +
                          qtyData.projet.wk2 +
                          qtyData.projet.wk3 +
                          qtyData.projet.wk4}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk5} €`
                        : qtyData.projet.wk5}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk6} €`
                        : qtyData.projet.wk6}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk7} €`
                        : qtyData.projet.wk7}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk8} €`
                        : qtyData.projet.wk8}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l border-r bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk5 +
                            priceData.projet.wk6 +
                            priceData.projet.wk7 +
                            priceData.projet.wk8
                          } €`
                        : qtyData.projet.wk5 +
                          qtyData.projet.wk6 +
                          qtyData.projet.wk7 +
                          qtyData.projet.wk8}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk9} €`
                        : qtyData.projet.wk9}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk10} €`
                        : qtyData.projet.wk10}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk11} €`
                        : qtyData.projet.wk11}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk12} €`
                        : qtyData.projet.wk12}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk9 +
                            priceData.projet.wk10 +
                            priceData.projet.wk11 +
                            priceData.projet.wk12
                          } €`
                        : qtyData.projet.wk9 +
                          qtyData.projet.wk10 +
                          qtyData.projet.wk11 +
                          qtyData.projet.wk12}
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-muted/50 [&>*]:!text-[11px] [&>*]:!h-5 [&>*]:!py-[1px] [&>*]:!px-3 [&>*]:text-muted-foreground">
                    <TableCell>MA124</TableCell>
                    <TableCell>ADIL 1</TableCell>
                    <TableCell>ALAOUI 1</TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk1} €`
                        : qtyData.projet.wk1}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk2} €`
                        : qtyData.projet.wk2}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk3} €`
                        : qtyData.projet.wk3}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk4} €`
                        : qtyData.projet.wk4}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l border-r bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk1 +
                            priceData.projet.wk2 +
                            priceData.projet.wk3 +
                            priceData.projet.wk4
                          } €`
                        : qtyData.projet.wk1 +
                          qtyData.projet.wk2 +
                          qtyData.projet.wk3 +
                          qtyData.projet.wk4}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk5} €`
                        : qtyData.projet.wk5}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk6} €`
                        : qtyData.projet.wk6}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk7} €`
                        : qtyData.projet.wk7}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk8} €`
                        : qtyData.projet.wk8}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l border-r bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk5 +
                            priceData.projet.wk6 +
                            priceData.projet.wk7 +
                            priceData.projet.wk8
                          } €`
                        : qtyData.projet.wk5 +
                          qtyData.projet.wk6 +
                          qtyData.projet.wk7 +
                          qtyData.projet.wk8}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk9} €`
                        : qtyData.projet.wk9}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk10} €`
                        : qtyData.projet.wk10}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk11} €`
                        : qtyData.projet.wk11}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk12} €`
                        : qtyData.projet.wk12}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk9 +
                            priceData.projet.wk10 +
                            priceData.projet.wk11 +
                            priceData.projet.wk12
                          } €`
                        : qtyData.projet.wk9 +
                          qtyData.projet.wk10 +
                          qtyData.projet.wk11 +
                          qtyData.projet.wk12}
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-muted/50 [&>*]:!text-[11px] [&>*]:!h-5 [&>*]:!py-[1px] [&>*]:!px-3 [&>*]:text-muted-foreground">
                    <TableCell>MA134</TableCell>
                    <TableCell>ADIL 11</TableCell>
                    <TableCell>ALAOUI 11</TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk1} €`
                        : qtyData.projet.wk1}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk2} €`
                        : qtyData.projet.wk2}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk3} €`
                        : qtyData.projet.wk3}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk4} €`
                        : qtyData.projet.wk4}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l border-r bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk1 +
                            priceData.projet.wk2 +
                            priceData.projet.wk3 +
                            priceData.projet.wk4
                          } €`
                        : qtyData.projet.wk1 +
                          qtyData.projet.wk2 +
                          qtyData.projet.wk3 +
                          qtyData.projet.wk4}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk5} €`
                        : qtyData.projet.wk5}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk6} €`
                        : qtyData.projet.wk6}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk7} €`
                        : qtyData.projet.wk7}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk8} €`
                        : qtyData.projet.wk8}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l border-r bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk5 +
                            priceData.projet.wk6 +
                            priceData.projet.wk7 +
                            priceData.projet.wk8
                          } €`
                        : qtyData.projet.wk5 +
                          qtyData.projet.wk6 +
                          qtyData.projet.wk7 +
                          qtyData.projet.wk8}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk9} €`
                        : qtyData.projet.wk9}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk10} €`
                        : qtyData.projet.wk10}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk11} €`
                        : qtyData.projet.wk11}
                    </TableCell>
                    <TableCell className="text-center font-mono">
                      {viewMode === "price"
                        ? `${priceData.projet.wk12} €`
                        : qtyData.projet.wk12}
                    </TableCell>
                    <TableCell className="text-center font-medium border-l bg-yellow-50">
                      {viewMode === "price"
                        ? `${
                            priceData.projet.wk9 +
                            priceData.projet.wk10 +
                            priceData.projet.wk11 +
                            priceData.projet.wk12
                          } €`
                        : qtyData.projet.wk9 +
                          qtyData.projet.wk10 +
                          qtyData.projet.wk11 +
                          qtyData.projet.wk12}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
