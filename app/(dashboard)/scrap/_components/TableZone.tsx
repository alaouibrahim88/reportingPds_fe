"use client";

import React, { useMemo, useState } from "react";
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
  periode: number | string;
  projetEuro: number | string;
  serieEuro: number | string;
  process: number | string;
  matiere: number | string;
}

export interface TableZoneProps {
  data: YearlyZoneDataType[] | undefined;
  filters: Filters;
  onFilterChange: (type: string, value: string) => void;
}

interface ScrapMetricTotal {
  pcs: number;
  euro: number;
  hasEuro: boolean;
}

interface YearlyZoneTotals {
  projetEuro: number;
  serieEuro: number;
  process: ScrapMetricTotal;
  matiere: ScrapMetricTotal;
}

const numberFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 2,
});

function parseNumberValue(value: number | string): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  const normalized = value
    .replace(/\s/g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractNumbers(value: string): number[] {
  return (
    value
      .match(/-?\d[\d\s.,]*/g)
      ?.map(parseNumberValue)
      .filter((item) => Number.isFinite(item)) ?? []
  );
}

function parseScrapMetric(value: number | string): ScrapMetricTotal {
  if (typeof value === "number") {
    return {
      pcs: Number.isFinite(value) ? value : 0,
      euro: 0,
      hasEuro: false,
    };
  }

  const numbers = extractNumbers(value);

  return {
    pcs: numbers[0] ?? 0,
    euro: numbers[1] ?? 0,
    hasEuro: numbers.length > 1 || value.includes("€"),
  };
}

function formatNumber(value: number): string {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

function formatCurrency(value: number): string {
  return `${formatNumber(value)} €`;
}

function formatScrapMetric(metric: ScrapMetricTotal): string {
  if (metric.hasEuro) {
    return `${formatNumber(metric.pcs)} Pcs - ${formatCurrency(metric.euro)}`;
  }

  return formatNumber(metric.pcs);
}

function calculateTotals(data: YearlyZoneDataType[]): YearlyZoneTotals {
  return data.reduce<YearlyZoneTotals>(
    (totals, item) => {
      const process = parseScrapMetric(item.process);
      const matiere = parseScrapMetric(item.matiere);

      return {
        projetEuro: totals.projetEuro + parseNumberValue(item.projetEuro),
        serieEuro: totals.serieEuro + parseNumberValue(item.serieEuro),
        process: {
          pcs: totals.process.pcs + process.pcs,
          euro: totals.process.euro + process.euro,
          hasEuro: totals.process.hasEuro || process.hasEuro,
        },
        matiere: {
          pcs: totals.matiere.pcs + matiere.pcs,
          euro: totals.matiere.euro + matiere.euro,
          hasEuro: totals.matiere.hasEuro || matiere.hasEuro,
        },
      };
    },
    {
      projetEuro: 0,
      serieEuro: 0,
      process: { pcs: 0, euro: 0, hasEuro: false },
      matiere: { pcs: 0, euro: 0, hasEuro: false },
    }
  );
}

export default function TableZone({ data = [], filters, onFilterChange }: TableZoneProps) {
  const [openRows, setOpenRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totals = useMemo(() => calculateTotals(data), [data]);
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
        totals={totals}
        onFilterChange={onFilterChange}
      />
      <div className="p-4">
        <Table>
          <TableColumns />
          <TableContent
            data={currentData}
            totals={totals}
            selectedYear={filters.year}
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
  totals,
  onFilterChange,
}: {
  data: any;
  filters: Filters;
  totals: YearlyZoneTotals;
  onFilterChange: (type: string, value: string) => void;
}) {
  return (
    <div className="p-4 border-b border-muted">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col xl:flex-row xl:items-center gap-4 min-w-0 flex-1">
          <div className="shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <FolderIcon className="w-5 h-5 text-primary" />
              <h2 className="font-medium">Détail Par Zone (Encours)</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Track and manage production issues and scrap reports
            </p>
          </div>
          <TotalsSummary totals={totals} />
        </div>
        <div className="flex shrink-0 items-center gap-2">
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

function TotalsSummary({ totals }: { totals: YearlyZoneTotals }) {
  return (
    <div className="grid w-full max-w-[560px] grid-cols-2 overflow-hidden rounded-md border border-primary/20 bg-primary/5">
      <div className="border-r border-primary/20 px-4 py-2">
        <p className="text-xs font-medium text-muted-foreground">Total Process (€)</p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          {formatCurrency(totals.process.euro)}
        </p>
      </div>
      <div className="px-4 py-2">
        <p className="text-xs font-medium text-muted-foreground">Total Matière (€)</p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          {formatCurrency(totals.matiere.euro)}
        </p>
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
  totals: YearlyZoneTotals;
  selectedYear: number;
  openRows: number[];
  toggleRow: (index: number) => void;
}

function TableContent({
  data,
  totals,
  selectedYear,
  openRows,
  toggleRow,
}: TableContentProps) {
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
      {data.length > 0 && (
        <TableRow className="bg-muted/40 font-semibold hover:bg-muted/50 dark:bg-muted/10 dark:hover:bg-muted/20">
          <TableCell className="text-xs py-3 text-foreground hidden md:table-cell">
            Total
          </TableCell>
          <TableCell className="text-xs py-3 text-foreground">
            {selectedYear}
          </TableCell>
          <TableCell className="text-xs py-3 text-foreground hidden lg:table-cell">
            <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              {formatNumber(totals.projetEuro)}
            </span>
          </TableCell>
          <TableCell className="py-3">
            <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
              {formatNumber(totals.serieEuro)}
            </span>
          </TableCell>
          <TableCell className="py-3">
            {formatScrapMetric(totals.process)}
          </TableCell>
          <TableCell className="py-3">
            {formatScrapMetric(totals.matiere)}
          </TableCell>
        </TableRow>
      )}
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
