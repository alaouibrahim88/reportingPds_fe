"use client";

import React, { useState, HTMLAttributes } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TableFilter } from "./TableFilter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ZoneDataType } from "./data/workflowData";

interface ProcessDamage {
  process: string;
  count: number;
  percentage: number;
  damageTypes: Record<string, number>;
}

interface MachineDamage {
  machine: string;
  count: number;
  percentage: number;
  operationalStatus: {
    uptime: number;
    maintenance: number;
    repair: number;
  };
}

interface DamageStats {
  byProcess: ProcessDamage[];
  byMachine: MachineDamage[];
}

interface DetailStats {
  time: string;
  machine: string;
  job: string;
  count: number;
  status: string;
  priority: string;
  assignee: string;
  department: string;
  message: string;
  op: {
    damageType: {
      process: number;
      machine: number;
      material: number;
    };
    production: {
      planned: number;
      actual: number;
      variance: number;
    };
    quality: {
      inspected: number;
      passed: number;
      failed: number;
    };
  };
  damageStats: DamageStats;
}

interface TableZoneProps {
  data: ZoneDataType[];
}

export default function TableZone({ data }: TableZoneProps) {
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleRow = (index: number) => {
    setOpenRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const totalItems = data.reduce((acc, item) => acc + item.details.length, 0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginatedData = () => {
    let allDetails: any[] = [];
    data.forEach((item) => {
      allDetails = [...allDetails, ...item.details];
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allDetails.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenRows([]); // Reset open rows when changing pages
  };

  return (
    <div className="py-2 px-4">
      {/* Title Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderIcon className="w-5 h-5 text-primary" />
            <h2 className="font-medium">Production Issues</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Track and manage production issues and scrap reports
          </p>
        </div>
        <TableFilter onFilterChange={() => {}} />
      </div>

      {/* Table Section */}
      <div className="rounded-md border">
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

              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((detail, detailIndex) => (
              <React.Fragment key={detailIndex}>
                <TableRow>
                  <TableCell>
                    <button
                      onClick={() => toggleRow(detailIndex)}
                      className="p-1 hover:bg-muted rounded-lg"
                    >
                      {openRows.includes(detailIndex) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </TableCell>
                  <TableCell>{detail.time}</TableCell>
                  <TableCell>{detail.zone}</TableCell>
                  <TableCell>{detail.cellule}</TableCell>
                  <TableCell>{detail.operator}</TableCell>
                  <TableCell>{detail.machine}</TableCell>
                  <TableCell>{detail.hoursWorked}</TableCell>
                  <TableCell>{detail.hoursWorked}</TableCell>
                  {/* <TableCell>{detail.status}</TableCell> */}
                  <TableCell>{detail.hoursWorked}</TableCell>
                  <TableCell>{detail.hoursReel}</TableCell>

                  <TableCell>{detail.hoursReel}</TableCell>
                  <TableCell>
                    <Link href={`/workflows/details/${detail.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs px-2.5"
                      >
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                {openRows.includes(detailIndex) && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={12} className="p-4 ">
                      <div className="space-y-6 ">
                        <div>
                          <div className="grid grid-cols-3 gap-3">
                            <Card className="p-3">
                              <div className="space-y-1">
                                {/* <p className="text-xs text-muted-foreground">
                                  Production
                                </p> */}
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Heures travaillées réelles
                                    </p>
                                    <p className="text-sm font-medium">
                                      {detail.op.production.planned}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Heures travaillées standards
                                    </p>
                                    <p className="text-sm font-medium">
                                      {detail.op.production.actual}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Card>
                            <Card className="p-3">
                              <div className="space-y-1">
                                {/* <p className="text-xs text-muted-foreground">
                                  Quality Check
                                </p> */}
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      standard cost
                                    </p>
                                    <p className="text-sm font-medium">
                                      {detail.op.quality.inspected}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      real cost
                                    </p>
                                    <p className="text-sm font-medium text-green-500">
                                      {detail.op.quality.passed}
                                    </p>
                                  </div>
                                  {/* <div>
                                    <p className="text-xs text-muted-foreground">
                                      Failed
                                    </p>
                                    <p className="text-sm font-medium text-red-500">
                                      {detail.op.quality.failed}
                                    </p>
                                  </div> */}
                                </div>
                              </div>
                            </Card>
                            <Card className="p-3">
                              <div className="space-y-1">
                                {/* <p className="text-xs text-muted-foreground">
                                  Damage Types
                                </p> */}
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Process
                                    </p>
                                    <p className="text-sm font-medium">
                                      {detail.op.damageType.process}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Machine
                                    </p>
                                    <p className="text-sm font-medium">
                                      {detail.op.damageType.machine}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Material
                                    </p>
                                    <p className="text-sm font-medium">
                                      {detail.op.damageType.material}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </div>

                        {/* Existing Damage Stats sections */}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "p-2 rounded-lg hover:bg-muted/70 dark:hover:bg-muted/20 transition-colors",
                currentPage === 1 && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronLeftIcon className="h-4 w-4 text-muted-foreground" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={cn(
                  "w-8 h-8 rounded-lg text-sm transition-colors",
                  currentPage === i + 1
                    ? "bg-primary/80 dark:bg-primary/20 text-primary-foreground"
                    : "hover:bg-muted/70 dark:hover:bg-muted/20 text-muted-foreground"
                )}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "p-2 rounded-lg hover:bg-muted/70 dark:hover:bg-muted/20 transition-colors",
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
              )}
            >
              <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
