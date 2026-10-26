"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  Boxes,
  Factory,
  FolderKanban,
  SearchX,
  Sigma,
  Wrench,
} from "lucide-react";
import { FaFileExcel } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { exportToExcel } from "@/utils/excel";
import { zoneBarChartColors } from "@/constants/zoneBarChartColors";
import { Filters } from "@/actions/scrap/dashboard";
import { MONTHS_FR, TableFilter } from "./TableFilter";

export interface YearlyZoneDataType {
  zone: string;
  periode: number | string;
  projetEuro: number | string;
  serieEuro: number | string;
  process: number | string;
  matiere: number | string;
}

export interface TableZoneProps {
  // undefined while loading
  data: YearlyZoneDataType[] | undefined;
  filters: Filters;
  onFilterChange: (type: string, value: string) => void;
}

interface ScrapMetric {
  pcs: number;
  euro: number;
}

interface ZoneRow {
  zone: string;
  projet: number;
  serie: number;
  process: ScrapMetric;
  matiere: ScrapMetric;
  total: number;
}

type SortKey = "zone" | "projet" | "serie" | "process" | "matiere" | "total";
type Sort = { key: SortKey; direction: "asc" | "desc" } | null;

const PROCESS_COLOR = "#6366F1";
const MATIERE_COLOR = "#F59E0B";
const PROJET_COLOR = "#0EA5E9";
const SERIE_COLOR = "#14B8A6";

const euroFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const formatEuro = (value: number) => `${euroFormatter.format(Number.isFinite(value) ? value : 0)} €`;
const formatPcs = (value: number) => `${euroFormatter.format(Number.isFinite(value) ? value : 0)} pcs`;
const percent = (part: number, whole: number) => (whole > 0 ? (part / whole) * 100 : 0);

function parseNumberValue(value: number | string): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(value.replace(/\s/g, "").replace(",", ".").replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

// "858 Pcs - 1 611 €" → { pcs: 858, euro: 1611 }
function parseScrapMetric(value: number | string): ScrapMetric {
  if (typeof value === "number") return { pcs: Number.isFinite(value) ? value : 0, euro: 0 };
  const numbers = value.match(/-?\d[\d\s.,]*/g)?.map(parseNumberValue) ?? [];
  return { pcs: numbers[0] ?? 0, euro: numbers[1] ?? 0 };
}

function toZoneRow(item: YearlyZoneDataType): ZoneRow {
  const process = parseScrapMetric(item.process);
  const matiere = parseScrapMetric(item.matiere);
  return {
    zone: item.zone,
    projet: parseNumberValue(item.projetEuro),
    serie: parseNumberValue(item.serieEuro),
    process,
    matiere,
    total: process.euro + matiere.euro,
  };
}

function sumRows(rows: ZoneRow[]) {
  return rows.reduce(
    (totals, row) => ({
      projet: totals.projet + row.projet,
      serie: totals.serie + row.serie,
      process: { pcs: totals.process.pcs + row.process.pcs, euro: totals.process.euro + row.process.euro },
      matiere: { pcs: totals.matiere.pcs + row.matiere.pcs, euro: totals.matiere.euro + row.matiere.euro },
      total: totals.total + row.total,
    }),
    { projet: 0, serie: 0, process: { pcs: 0, euro: 0 }, matiere: { pcs: 0, euro: 0 }, total: 0 }
  );
}

const sortValue = (row: ZoneRow, key: SortKey): number | string =>
  key === "zone" ? row.zone : key === "process" ? row.process.euro : key === "matiere" ? row.matiere.euro : row[key];

// Case- and accent-insensitive form used for search matching
const normalizeText = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const Highlight = ({ text, query }: { text: string; query: string }) => {
  const q = query.trim();
  const index = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-yellow-200/80 px-0.5 text-inherit dark:bg-yellow-500/30">
        {text.slice(index, index + q.length)}
      </mark>
      {text.slice(index + q.length)}
    </>
  );
};

export default function TableZone({ data, filters, onFilterChange }: TableZoneProps) {
  const [search, setSearch] = useState("");
  const [zoneFilter, setZoneFilter] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>(null);

  const isLoading = data === undefined;
  const rows = useMemo(() => (data ?? []).map(toZoneRow), [data]);
  const zones = useMemo(() => rows.map((row) => row.zone), [rows]);

  const visibleRows = useMemo(() => {
    const query = normalizeText(search);
    const filtered = rows.filter(
      (row) =>
        (zoneFilter.length === 0 || zoneFilter.includes(row.zone)) &&
        (query === "" || normalizeText(row.zone).includes(query))
    );
    if (!sort) return filtered;
    return [...filtered].sort((a, b) => {
      const x = sortValue(a, sort.key);
      const y = sortValue(b, sort.key);
      const order = typeof x === "string" ? x.localeCompare(y as string) : x - (y as number);
      return sort.direction === "asc" ? order : -order;
    });
  }, [rows, search, zoneFilter, sort]);

  const totals = useMemo(() => sumRows(visibleRows), [visibleRows]);
  const monthNumber = Number(filters.month);
  const period =
    filters.month !== "" && monthNumber >= 1 && monthNumber <= 12
      ? `${MONTHS_FR[monthNumber - 1]} ${filters.year}`
      : `Année ${filters.year}`;

  const toggleSort = (key: SortKey) =>
    setSort((current) =>
      current?.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: key === "zone" ? "asc" : "desc" }
    );

  const resetFilters = () => {
    setSearch("");
    setZoneFilter([]);
    onFilterChange("month", "");
  };

  const handleExport = () => {
    exportToExcel(
      visibleRows.map((row) => ({
        Zone: row.zone,
        Période: period,
        "Projet (€)": Math.round(row.projet),
        "Série (€)": Math.round(row.serie),
        "Process (pcs)": row.process.pcs,
        "Process (€)": row.process.euro,
        "Matière (pcs)": row.matiere.pcs,
        "Matière (€)": row.matiere.euro,
        "Total (€)": row.total,
      })),
      `detailParZone_${filters.year}${filters.month ? `-${filters.month.padStart(2, "0")}` : ""}.xlsx`
    );
  };

  return (
    <div className="space-y-3 p-3 sm:p-4">
      {/* Title and actions */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Factory className="h-[18px] w-[18px]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold sm:text-base">Détail par zone (encours)</h2>
            <p className="text-xs text-muted-foreground">
              Scrap Process / Matière et Projet / Série par zone · {period}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={visibleRows.length === 0}
            className="h-8 gap-2 text-xs"
          >
            <FaFileExcel className="h-3.5 w-3.5 text-green-600" />
            Exporter
          </Button>
          <Button asChild size="sm" className="h-8 gap-2 text-xs shadow-sm">
            <Link href="/scrap/details/1">
              <FolderKanban className="h-3.5 w-3.5" />
              Détail par cellule
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Totals of the zones shown */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total scrap"
          value={formatEuro(totals.total)}
          detail={`${formatPcs(totals.process.pcs + totals.matiere.pcs)} · ${visibleRows.length} zone${visibleRows.length > 1 ? "s" : ""}`}
          icon={Sigma}
          highlight
          loading={isLoading}
        />
        <KpiCard
          label="Process"
          value={formatEuro(totals.process.euro)}
          detail={`${formatPcs(totals.process.pcs)} · ${percent(totals.process.euro, totals.total).toFixed(0)} % du total`}
          icon={Wrench}
          bar={[{ value: percent(totals.process.euro, totals.total), color: PROCESS_COLOR }]}
          loading={isLoading}
        />
        <KpiCard
          label="Matière"
          value={formatEuro(totals.matiere.euro)}
          detail={`${formatPcs(totals.matiere.pcs)} · ${percent(totals.matiere.euro, totals.total).toFixed(0)} % du total`}
          icon={Boxes}
          bar={[{ value: percent(totals.matiere.euro, totals.total), color: MATIERE_COLOR }]}
          loading={isLoading}
        />
        <KpiCard
          label="Projet / Série"
          value={`${formatEuro(totals.projet)} / ${formatEuro(totals.serie)}`}
          detail={`Projet ${percent(totals.projet, totals.projet + totals.serie).toFixed(0)} % · Série ${percent(totals.serie, totals.projet + totals.serie).toFixed(0)} %`}
          icon={FolderKanban}
          bar={[
            { value: percent(totals.projet, totals.projet + totals.serie), color: PROJET_COLOR },
            { value: percent(totals.serie, totals.projet + totals.serie), color: SERIE_COLOR },
          ]}
          loading={isLoading}
        />
      </div>

      <TableFilter
        search={search}
        onSearchChange={setSearch}
        zones={zones}
        zoneFilter={zoneFilter}
        onZoneFilterChange={setZoneFilter}
        year={filters.year}
        month={filters.month}
        onYearChange={(year) => {
          onFilterChange("year", year);
          onFilterChange("month", "");
        }}
        onMonthChange={(month) => onFilterChange("month", month)}
        visibleZones={visibleRows.length}
        totalZones={rows.length}
        onReset={resetFilters}
      />

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <SortableHead label="Zone" sortKey="zone" sort={sort} onSort={toggleSort} align="left" />
              <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Période
              </TableHead>
              <SortableHead label="Projet (€)" sortKey="projet" sort={sort} onSort={toggleSort} className="hidden lg:table-cell" />
              <SortableHead label="Série (€)" sortKey="serie" sort={sort} onSort={toggleSort} />
              <SortableHead label="Process" sortKey="process" sort={sort} onSort={toggleSort} />
              <SortableHead label="Matière" sortKey="matiere" sort={sort} onSort={toggleSort} />
              <SortableHead label="Total (€)" sortKey="total" sort={sort} onSort={toggleSort} />
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading &&
              Array.from({ length: 4 }, (_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell colSpan={7} className="py-3">
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading &&
              visibleRows.map((row) => {
                const isEmpty = row.total === 0 && row.projet === 0 && row.serie === 0;
                return (
                  <TableRow key={row.zone} className={cn("hover:bg-muted/40", isEmpty && "text-muted-foreground")}>
                    <TableCell className="py-2.5">
                      <span className="flex items-center gap-2 text-xs font-medium">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: zoneBarChartColors[row.zone] || "#8E98F5" }}
                        />
                        <Highlight text={row.zone} query={search} />
                      </span>
                    </TableCell>
                    <TableCell className="py-2.5 text-xs text-muted-foreground">{period}</TableCell>
                    <TableCell className="hidden py-2.5 text-right text-xs tabular-nums lg:table-cell">
                      {formatEuro(row.projet)}
                    </TableCell>
                    <TableCell className="py-2.5 text-right text-xs tabular-nums">{formatEuro(row.serie)}</TableCell>
                    <MetricCell metric={row.process} />
                    <MetricCell metric={row.matiere} />
                    <TableCell className="py-2.5 text-right">
                      <div className="text-xs font-semibold tabular-nums">{formatEuro(row.total)}</div>
                      <ShareBar
                        segments={[
                          { value: percent(row.process.euro, totals.total), color: PROCESS_COLOR },
                          { value: percent(row.matiere.euro, totals.total), color: MATIERE_COLOR },
                        ]}
                        title={`${percent(row.total, totals.total).toFixed(1)} % du total`}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}

            {!isLoading && visibleRows.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="py-10 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <SearchX className="h-7 w-7 text-muted-foreground/50" />
                    <p className="text-sm font-medium text-foreground">Aucune zone</p>
                    <p className="text-xs">
                      {rows.length === 0 ? `Pas de scrap pour ${period}.` : "Aucune zone ne correspond à ces filtres."}
                    </p>
                    {rows.length > 0 && (
                      <Button variant="outline" size="sm" className="mt-1 h-8 text-xs" onClick={resetFilters}>
                        Réinitialiser les filtres
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {!isLoading && visibleRows.length > 0 && (
            <TableFooter className="border-t-2 bg-muted/60">
              <TableRow className="hover:bg-muted/60">
                <TableCell className="py-2.5 text-xs font-semibold">
                  Total{visibleRows.length < rows.length ? " sélection" : ""}
                </TableCell>
                <TableCell className="py-2.5 text-xs text-muted-foreground">{period}</TableCell>
                <TableCell className="hidden py-2.5 text-right text-xs font-semibold tabular-nums lg:table-cell">
                  {formatEuro(totals.projet)}
                </TableCell>
                <TableCell className="py-2.5 text-right text-xs font-semibold tabular-nums">
                  {formatEuro(totals.serie)}
                </TableCell>
                <MetricCell metric={totals.process} bold />
                <MetricCell metric={totals.matiere} bold />
                <TableCell className="py-2.5 text-right text-xs font-bold tabular-nums text-primary">
                  {formatEuro(totals.total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Legend of the share bars */}
      {!isLoading && visibleRows.length > 0 && (
        <div className="flex items-center justify-end gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: PROCESS_COLOR }} /> Process
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: MATIERE_COLOR }} /> Matière
          </span>
          <span>Barre : part de la zone dans le total</span>
        </div>
      )}
    </div>
  );
}

function KpiCard({
  label,
  value,
  detail,
  icon: Icon,
  bar,
  highlight,
  loading,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  bar?: { value: number; color: string }[];
  highlight?: boolean;
  loading?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-3",
        highlight ? "border-primary/30 bg-primary/5" : "bg-card"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <Icon className={cn("h-4 w-4", highlight ? "text-primary" : "text-muted-foreground/70")} />
      </div>
      {loading ? (
        <div className="mt-2 h-5 w-24 animate-pulse rounded bg-muted" />
      ) : (
        <div className={cn("mt-1 text-base font-semibold tabular-nums", highlight && "text-primary")}>{value}</div>
      )}
      <div className="mt-0.5 text-[11px] text-muted-foreground">{loading ? " " : detail}</div>
      {bar && <ShareBar segments={loading ? [] : bar} className="mt-2 h-1.5" />}
    </div>
  );
}

function ShareBar({
  segments,
  title,
  className,
}: {
  segments: { value: number; color: string }[];
  title?: string;
  className?: string;
}) {
  return (
    <div title={title} className={cn("mt-1 ml-auto flex h-1 w-full max-w-[120px] overflow-hidden rounded-full bg-muted", className, className && "max-w-none")}>
      {segments.map((segment, index) => (
        <div
          key={index}
          className="h-full"
          style={{ width: `${Math.min(100, Math.max(0, segment.value))}%`, backgroundColor: segment.color }}
        />
      ))}
    </div>
  );
}

function MetricCell({ metric, bold }: { metric: ScrapMetric; bold?: boolean }) {
  return (
    <TableCell className="py-2.5 text-right">
      <div className={cn("text-xs tabular-nums", bold ? "font-semibold" : "font-medium")}>{formatEuro(metric.euro)}</div>
      <div className="text-[11px] tabular-nums text-muted-foreground">{formatPcs(metric.pcs)}</div>
    </TableCell>
  );
}

function SortableHead({
  label,
  sortKey,
  sort,
  onSort,
  align = "right",
  className,
}: {
  label: string;
  sortKey: SortKey;
  sort: Sort;
  onSort: (key: SortKey) => void;
  align?: "left" | "right";
  className?: string;
}) {
  const active = sort?.key === sortKey;
  const Icon = !active ? ArrowUpDown : sort.direction === "asc" ? ArrowUp : ArrowDown;
  return (
    <TableHead className={cn("h-9", align === "right" && "text-right", className)}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cn(
          "inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide transition-colors hover:text-foreground",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
        <Icon className={cn("h-3 w-3", !active && "opacity-50")} />
      </button>
    </TableHead>
  );
}
