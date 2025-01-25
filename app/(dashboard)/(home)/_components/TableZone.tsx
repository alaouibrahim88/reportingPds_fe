"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronDown,
  ChevronRight,
  FolderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ExpandedRowDetails } from "./ExpandedRowDetails";
import { ProductionIssue } from "./types/table-types";
import { TableFilter } from "./TableFilter";
import { Button } from "@/components/ui/button";

interface TableZoneProps {
  data: Array<{
    name: string;
    zoneJava: number;
    zonePython: number;
    zoneRust: number;
    zoneGo: number;
    zoneKotlin: number;
    details: Array<any>; // Replace 'any' with proper type if available
    metrics: any;
    machines: any[];
  }>;
}

export default function TableZone({ data }: TableZoneProps) {
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Extract details from first zone data entry
  const productionIssues = data[0]?.details || [];

  // Update pagination to use productionIssues
  const totalPages = Math.ceil(productionIssues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = productionIssues.slice(startIndex, endIndex);

  const toggleRow = (index: number) => {
    setOpenRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenRows([]); // Reset open rows when changing pages
  };

  return (
    <div className="bg-background/50 dark:bg-background/5">
      <TableHeaderSection />
      <div className="p-4">
        <Table>
          <TableColumns />
          <TableContent
            data={currentData}
            openRows={openRows}
            toggleRow={toggleRow}
          />
        </Table>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={productionIssues.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

function TableHeaderSection() {
  return (
    <div className="p-4 border-b border-muted flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <FolderIcon className="w-5 h-5 text-primary" />
          <h2 className="font-medium">Production Issues</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Track and manage production issues and scrap reports
        </p>
      </div>
      <div className="flex items-center gap-2">
        <TableFilter />
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
  );
}

function TableColumns() {
  return (
    <TableHeader>
      <TableRow className="hover:bg-muted/50 dark:hover:bg-muted/10">
        <TableHead className="w-[50px] text-muted-foreground"></TableHead>
        <TableHead className="font-medium text-xs text-muted-foreground">
          Time
        </TableHead>
        <TableHead className="text-xs text-muted-foreground">Machine</TableHead>
        <TableHead className="text-xs text-muted-foreground">Job</TableHead>
        <TableHead className="text-xs text-muted-foreground">Count</TableHead>
        <TableHead className="text-xs text-muted-foreground">Reason</TableHead>
        <TableHead className="text-xs text-muted-foreground">
          Critical Level
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

interface TableContentProps {
  data: ProductionIssue[];
  openRows: number[];
  toggleRow: (index: number) => void;
}

function TableContent({ data, openRows, toggleRow }: TableContentProps) {
  return (
    <TableBody>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <TableRow
            className={cn(
              "cursor-pointer transition-colors",
              "hover:bg-muted/50 dark:hover:bg-muted/10",
              openRows.includes(index) && "bg-muted/30 dark:bg-muted/5"
            )}
            onClick={() => toggleRow(index)}
          >
            <TableCell className="w-[50px] py-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-lg hover:bg-muted/70 dark:hover:bg-muted/20 transition-colors">
                {openRows.includes(index) ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </TableCell>
            <TableCell className="font-medium text-xs py-2 text-foreground">
              {item.time}
            </TableCell>
            <TableCell className="text-xs py-2 text-foreground">
              {item.machine}
            </TableCell>
            <TableCell className="text-xs py-2 text-foreground">
              {item.job}
            </TableCell>
            <TableCell className="py-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                {item.count}
              </span>
            </TableCell>
            <TableCell className="text-xs py-2 text-foreground">
              {item.reason}
            </TableCell>
            <TableCell className="py-2">
              <VisibilityScore score={item.visibilityScore} />
            </TableCell>
          </TableRow>
          {openRows.includes(index) && (
            <TableRow>
              <TableCell colSpan={7} className="p-0">
                <ExpandedRowDetails item={item} />
              </TableCell>
            </TableRow>
          )}
        </React.Fragment>
      ))}
    </TableBody>
  );
}

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

function TablePagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-between px-2">
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} entries
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(i + 1)}
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
          onClick={() => onPageChange(currentPage + 1)}
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
  );
}

function VisibilityScore({ score }: { score: number }) {
  if (score <= 60) {
    return <span className="text-xs text-gray-600">{score} %</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-12 bg-gray-100 rounded-full h-1.5">
        <div
          className="bg-red-400 h-1.5 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs text-gray-600">{score} %</span>
    </div>
  );
}
