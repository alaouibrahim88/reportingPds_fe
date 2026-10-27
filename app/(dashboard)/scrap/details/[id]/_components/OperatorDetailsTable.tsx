import React, { useMemo, useState } from "react";
import { Barcode, Grid3x3, Layers, Loader2, MousePointerClick, Search, SearchX, X } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { exportToExcel } from "@/utils/excel";
import { zoneBarChartColors } from "@/constants/zoneBarChartColors";
import { cn } from "@/lib/utils";
import { Cell, Zone } from "@/types";

interface OperatorDetailsTableProps {
  selectedZone: string;
  selectedCell: string;
  allZones: Zone[];
  allCells: Cell[];
  setSelectedZone: (zone: string) => void;
  setSelectedCell: (cell: string) => void;
  isLoading: boolean;
  operatorData: any[];
  monthData: { [key: string]: string[] };
  weekNumbers: Number[];
  viewMode: "price" | "Qty";
}

type Article = {
  stockCode: string;
  unitCost: number | null;
  process: number;
  matiere: number;
  weeks: Record<number, number>;
  months: Record<string, number>;
  total: number;
};

// API numbers come as "1234.56" (older builds sent "1 234,56")
const toNumber = (value: unknown) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value !== "string") return 0;
  const parsed = Number(value.replace(/[\s  ]/g, "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

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

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export default function OperatorDetailsTable({
  selectedZone,
  selectedCell,
  allZones,
  allCells,
  setSelectedZone,
  setSelectedCell,
  isLoading,
  operatorData,
  monthData,
  viewMode,
}: OperatorDetailsTableProps) {
  const [search, setSearch] = useState("");
  const inEuros = viewMode === "price";

  const format = (value: number) => {
    if (!inEuros) return Math.round(value).toLocaleString("fr-FR");
    return `${value.toLocaleString("fr-FR", { maximumFractionDigits: Math.abs(value) >= 100 ? 0 : 2 })} €`;
  };

  const months = useMemo(
    () =>
      Object.entries(monthData).map(([name, weekKeys]) => ({
        name,
        weeks: weekKeys.map((key) => parseInt(key.replace("wk", ""), 10)),
      })),
    [monthData]
  );

  const articles = useMemo<Article[]>(
    () =>
      (Array.isArray(operatorData) ? operatorData : []).map((item) => {
        const weeks: Record<number, number> = {};
        const monthsTotal: Record<string, number> = {};
        (item.details ?? []).forEach((detail: any) => {
          weeks[detail.semaine] = toNumber(detail.couts);
          monthsTotal[detail.mois] = toNumber(detail.total_mois);
        });
        return {
          stockCode: String(item.stockCode ?? ""),
          unitCost: item.coutUnitaire === null || item.coutUnitaire === undefined ? null : toNumber(item.coutUnitaire),
          process: toNumber(item.process),
          matiere: toNumber(item.matiere),
          weeks,
          months: monthsTotal,
          total: Object.values(weeks).reduce((sum, value) => sum + value, 0),
        };
      }),
    [operatorData]
  );

  const query = normalizeText(search);
  const rows = articles.filter((article) => query === "" || normalizeText(article.stockCode).includes(query));

  // Machine / Démarrage pieces are in the weeks but not in Process / Matière. In Price the
  // API rounds each week and each column to the cent, so a few cents of difference are rounding
  const others = (article: Article) => {
    const difference = article.total - article.process - article.matiere;
    return Math.abs(difference) < (inEuros ? 0.1 : 0.5) ? 0 : difference;
  };
  const showOthers = rows.some((article) => others(article) !== 0);

  const sum = (pick: (article: Article) => number) => rows.reduce((total, article) => total + pick(article), 0);
  const fixedColumns = showOthers ? 6 : 5;
  const totalColumns = fixedColumns + months.reduce((count, month) => count + month.weeks.length + 1, 0);

  const handleExport = () => {
    exportToExcel(
      rows.map((article) => {
        const row: Record<string, string | number> = {
          "Code article": article.stockCode,
          "Coût unitaire (€)": article.unitCost ?? "",
          Process: article.process,
          Matière: article.matiere,
          ...(showOthers ? { "Machine + Démarrage": others(article) } : {}),
          Total: article.total,
        };
        months.forEach((month) => {
          month.weeks.forEach((week) => (row[`WK${week}`] = article.weeks[week] ?? 0));
          row[`Total ${month.name}`] = article.months[month.name] ?? 0;
        });
        return row;
      }),
      `codeArticle_${selectedCell || "cellule"}_${inEuros ? "price" : "qty"}.xlsx`
    );
  };

  const zoneColor = zoneBarChartColors[selectedZone] || "#8E98F5";

  return (
    <div className="rounded-md border shadow-sm">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-md bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Barcode className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Détail par code article</h3>
            <p className="text-xs text-muted-foreground">
              {selectedCell
                ? `${selectedZone} · ${selectedCell} · 3 derniers mois · ${inEuros ? "coût (€)" : "quantité (pcs)"}`
                : "Choisissez une zone puis une cellule"}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={rows.length === 0}
          className="h-8 gap-2 text-xs"
        >
          <FaFileExcel className="h-3.5 w-3.5 text-green-600" />
          Exporter
        </Button>
      </div>

      {/* Filters: zone and cell load the data, the search filters the articles */}
      <div className="mx-3 mt-2 flex flex-wrap items-center gap-2 rounded-lg border bg-gradient-to-r from-blue-50/80 via-background to-background p-2 shadow-sm dark:from-blue-950/30">
        <Select value={selectedZone} onValueChange={setSelectedZone}>
          <SelectTrigger className="h-8 w-[170px] bg-background text-xs" aria-label="Zone">
            {/* div, not span: SelectTrigger line-clamps its direct span children */}
            <div className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="Zone" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {allZones?.map((zone) => (
              <SelectItem key={zone.id} value={zone.libelle} className="text-xs">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: zoneBarChartColors[zone.libelle] || "#8E98F5" }}
                  />
                  {zone.libelle}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCell} onValueChange={setSelectedCell} disabled={!selectedZone}>
          <SelectTrigger className="h-8 w-[200px] bg-background text-xs" aria-label="Cellule">
            <div className="flex min-w-0 items-center gap-2 truncate">
              <Grid3x3 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <SelectValue placeholder={selectedZone ? "Cellule" : "Choisir une zone d'abord"} />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {allCells.map((cell) => (
              <SelectItem key={cell.id} value={cell.libelle} className="text-xs">
                {cell.libelle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative min-w-[200px] max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSearch("");
            }}
            placeholder="Rechercher un code article…"
            aria-label="Rechercher un code article"
            className="h-8 w-full rounded-md border border-input bg-background pl-9 pr-8 text-xs shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Effacer la recherche"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <span className="ml-auto text-xs text-muted-foreground">
          {isLoading ? (
            <span className="inline-flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Chargement…
            </span>
          ) : (
            <>
              <span className="font-semibold text-foreground">{rows.length}</span>
              {rows.length !== articles.length && ` / ${articles.length}`} articles
            </>
          )}
        </span>
      </div>

      <div className="p-3">
        <div className="overflow-x-auto rounded-lg border">
          <Table className="text-xs [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="sticky left-0 z-10 h-9 bg-muted/90 text-[11px] font-semibold uppercase tracking-wide">
                  Code article
                </TableHead>
                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wide">C. unitaire</TableHead>
                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wide">Process</TableHead>
                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wide">Matière</TableHead>
                {showOthers && (
                  <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wide">Mach. + Dém.</TableHead>
                )}
                <TableHead className="h-9 border-r text-right text-[11px] font-semibold uppercase tracking-wide">Total</TableHead>
                {months.map((month) => (
                  <React.Fragment key={month.name}>
                    {month.weeks.map((week) => (
                      <TableHead key={`${month.name}-${week}`} className="h-9 text-center text-[11px] font-medium">
                        WK{week}
                      </TableHead>
                    ))}
                    <TableHead className="h-9 border-x bg-blue-50 text-center text-[11px] font-semibold text-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
                      {capitalize(month.name)}
                    </TableHead>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading &&
                Array.from({ length: 3 }, (_, index) => (
                  <TableRow key={`loading-${index}`}>
                    <TableCell colSpan={Math.max(totalColumns, 6)} className="py-2.5">
                      <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading && !selectedCell && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={Math.max(totalColumns, 6)} className="py-8 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <MousePointerClick className="h-6 w-6 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">Aucune cellule sélectionnée</p>
                      <p>Choisissez une zone puis une cellule pour voir le scrap par code article.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && selectedCell && rows.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={Math.max(totalColumns, 6)} className="py-8 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <SearchX className="h-6 w-6 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">
                        {articles.length === 0 ? "Aucun scrap sur la période" : "Aucun article ne correspond"}
                      </p>
                      {articles.length > 0 && (
                        <Button variant="outline" size="sm" className="mt-1 h-8 text-xs" onClick={() => setSearch("")}>
                          Effacer la recherche
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                rows.map((article) => (
                  <TableRow key={article.stockCode} className="hover:bg-muted/40">
                    <TableCell className="sticky left-0 z-10 bg-background py-2 font-mono font-medium">
                      <Highlight text={article.stockCode} query={search} />
                    </TableCell>
                    <TableCell className="py-2 text-right tabular-nums text-muted-foreground">
                      {article.unitCost === null
                        ? "—"
                        : `${article.unitCost.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 3 })} €`}
                    </TableCell>
                    <TableCell className="py-2 text-right tabular-nums">{format(article.process)}</TableCell>
                    <TableCell className="py-2 text-right tabular-nums">{format(article.matiere)}</TableCell>
                    {showOthers && <TableCell className="py-2 text-right tabular-nums">{format(others(article))}</TableCell>}
                    <TableCell className="border-r py-2 text-right font-semibold tabular-nums">{format(article.total)}</TableCell>
                    {months.map((month) => (
                      <React.Fragment key={month.name}>
                        {month.weeks.map((week) => {
                          const value = article.weeks[week] ?? 0;
                          return (
                            <TableCell
                              key={`${month.name}-${week}`}
                              className={cn("py-2 text-center tabular-nums", value === 0 && "text-muted-foreground/40")}
                            >
                              {value === 0 ? "—" : format(value)}
                            </TableCell>
                          );
                        })}
                        <TableCell className="border-x bg-blue-50/60 py-2 text-center font-medium tabular-nums dark:bg-blue-950/20">
                          {format(article.months[month.name] ?? 0)}
                        </TableCell>
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
            </TableBody>

            {!isLoading && rows.length > 0 && (
              <TableFooter className="border-t-2 bg-muted/60">
                <TableRow className="hover:bg-muted/60">
                  <TableCell className="sticky left-0 z-10 bg-muted py-2 font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: zoneColor }} />
                      Total {rows.length < articles.length ? "sélection" : "cellule"}
                    </span>
                  </TableCell>
                  <TableCell className="py-2" />
                  <TableCell className="py-2 text-right font-semibold tabular-nums">{format(sum((a) => a.process))}</TableCell>
                  <TableCell className="py-2 text-right font-semibold tabular-nums">{format(sum((a) => a.matiere))}</TableCell>
                  {showOthers && (
                    <TableCell className="py-2 text-right font-semibold tabular-nums">{format(sum(others))}</TableCell>
                  )}
                  <TableCell className="border-r py-2 text-right font-bold tabular-nums text-primary">
                    {format(sum((a) => a.total))}
                  </TableCell>
                  {months.map((month) => (
                    <React.Fragment key={month.name}>
                      {month.weeks.map((week) => (
                        <TableCell key={`${month.name}-${week}`} className="py-2 text-center font-semibold tabular-nums">
                          {format(sum((a) => a.weeks[week] ?? 0))}
                        </TableCell>
                      ))}
                      <TableCell className="border-x bg-blue-100/70 py-2 text-center font-bold tabular-nums dark:bg-blue-950/40">
                        {format(sum((a) => a.months[month.name] ?? 0))}
                      </TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}
