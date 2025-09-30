"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FolderIcon,
  ListCollapse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TableFilter } from "./TableFilter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Filters } from "@/actions/scrap/dashboard";

export interface YearlyZoneDataType {
  zone: string;
  periode: number;
  projetEuro: number;
  serieEuro: number;
  process: number;
  matiere: number;
}

export interface TableZoneProps {
  data: YearlyZoneDataType[] | undefined;
  filters: Filters;
  onFilterChange: (type: string, value: string) => void;
}

export default function TableZone({ data = [], filters, onFilterChange }: TableZoneProps) {
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

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
      <TableHeaderSection
        data={currentData}
        filters={filters}
        onFilterChange={onFilterChange}
      />
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
          totalItems={data.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

function TableHeaderSection({
  data,
  filters,
  onFilterChange,
}: {
  data: any;
  filters: Filters;
  onFilterChange: (type: string, value: string) => void;
}) {
  return (
    <div className="p-4 border-b border-muted">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderIcon className="w-5 h-5 text-primary" />
            <h2 className="font-medium">Détail Par Zone (Encours)</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Track and manage production issues and scrap reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TableFilter data={data} filters={filters} onFilterChange={onFilterChange} />
          <Link href={`/scrap/details/1`}>
            <Button variant="outline" className="flex items-center gap-2">
              <ListCollapse />
              <span className="hidden sm:inline">Details</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function TableColumns() {
  return (
    <TableHeader>
      <TableRow className="hover:bg-muted/50 dark:hover:bg-muted/10">
        <TableHead className="text-xs text-muted-foreground hidden md:table-cell">
          Zone
        </TableHead>
        <TableHead className="text-xs text-muted-foreground">Periode</TableHead>
        <TableHead className="text-xs text-muted-foreground hidden lg:table-cell">
          Projet (€)
        </TableHead>
        <TableHead className="text-xs text-muted-foreground">Serie (€)</TableHead>
        <TableHead className="text-xs text-muted-foreground">Process (Psc)</TableHead>
        <TableHead className="text-xs text-muted-foreground">Matière (Psc)</TableHead>
      </TableRow>
    </TableHeader>
  );
}

interface TableContentProps {
  data: YearlyZoneDataType[];
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
            <TableCell className="text-xs py-2 text-foreground hidden md:table-cell">
              {item.zone}
            </TableCell>
            <TableCell className="font-medium text-xs py-2 text-foreground">
              {item.periode}
            </TableCell>
            <TableCell className="text-xs py-2 text-foreground hidden lg:table-cell">
            <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
            {item.projetEuro}
           </span>
            </TableCell>
            <TableCell className="py-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                {item.serieEuro}
              </span>
            </TableCell>
            <TableCell className="py-2">{item.process}</TableCell>
            <TableCell className="py-2">{item.matiere}</TableCell>
          </TableRow>
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
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      <div className="text-sm text-muted-foreground order-2 sm:order-1">
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
        {totalItems} entries
      </div>
      <div className="flex items-center gap-2 order-1 sm:order-2">
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
        <div className="hidden sm:flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
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
        </div>
        <div className="sm:hidden text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
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