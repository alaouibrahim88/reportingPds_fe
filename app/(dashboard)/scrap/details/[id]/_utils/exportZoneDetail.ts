import XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

// ─── Local types (mirrors ZoneData shape in CollapsibleZoneTable) ─────────────
type WeekItem  = { weekNum?: number; value: number };
type MonthItem = { name: string; weeks: WeekItem[]; total: number };
type CellItem  = { name: string; type: "Projet" | "Serie"; months: MonthItem[] };
type ZoneItem  = {
  key: string;
  weeksPerMonth: Record<string, number[]>;
  cells: CellItem[];
  totals: number[][];  // [monthIndex][weekIndex..., monthTotal]
};

// ─── Cell style type ──────────────────────────────────────────────────────────
type CellStyle = {
  fill?:      { patternType: string; fgColor: { rgb: string } };  // rgb not argb
  font?:      { name?: string; sz?: number; bold?: boolean; italic?: boolean; color?: { rgb: string } };
  alignment?: { horizontal?: string; vertical?: string; wrapText?: boolean };
  border?:    {
    top?:    { style: string; color?: { argb: string } };
    bottom?: { style: string; color?: { argb: string } };
    left?:   { style: string; color?: { argb: string } };
    right?:  { style: string; color?: { argb: string } };
  };
};

// ─── Colour palette (mirrors the UI) ─────────────────────────────────────────
const C = {
  ZONE_BG:      "1E3A5F",
  ZONE_FG:      "FFFFFF",
  MONTH_BG:     "2D6A9F",
  MONTH_FG:     "FFFFFF",
  WEEK_BG:      "D6E4F0",
  WEEK_FG:      "1A3350",
  TOTAL_HDR_BG: "1A6B3A",
  TOTAL_HDR_FG: "FFFFFF",
  PROJET_BG:    "EBF5FB",
  SERIE_BG:     "FDFEFE",
  TOTAL_BG:     "D5E8F7",
  TOTAL_FG:     "1A3350",
  GRAND_TOTAL:  "BDD7EE",
  TITLE_BG:     "1A3350",
};

// ─── Style helpers ────────────────────────────────────────────────────────────
function argbFill(hex: string): CellStyle["fill"] {
  const rgb = hex.replace(/^FF/, ""); // strip alpha if present, xlsx-js-style wants 6-char RGB
  return { patternType: "solid", fgColor: { rgb } };
}

function argbFont(hex: string, bold = false, sz = 9, italic = false): CellStyle["font"] {
  const rgb = hex.replace(/^FF/, "");
  return { name: "Arial", sz, bold, italic, color: { rgb } };
}

const THIN_BORDER: CellStyle["border"] = {
  top:    { style: "thin",   color: { argb: "B0C4DE" } },
  bottom: { style: "thin",   color: { argb: "B0C4DE" } },
  left:   { style: "thin",   color: { argb: "B0C4DE" } },
  right:  { style: "thin",   color: { argb: "B0C4DE" } },
};

const THICK_BOTTOM_BORDER: CellStyle["border"] = {
  ...THIN_BORDER,
  bottom: { style: "medium", color: { argb: "2D6A9F" } },
};

// ─── Worksheet cell helpers ───────────────────────────────────────────────────
function setCell(
  ws: XLSX.WorkSheet,
  r: number,
  col: number,
  value: string | number | null,
  style: CellStyle
) {
  const addr = XLSX.utils.encode_cell({ r, c: col });
  ws[addr] = {
    v: value ?? "",
    t: typeof value === "number" ? "n" : "s",
    s: style,
  };
}

function mergeRow(
  ws: XLSX.WorkSheet,
  r: number,
  c0: number,
  c1: number,
  value: string,
  style: CellStyle
) {
  setCell(ws, r, c0, value, style);
  for (let col = c0 + 1; col <= c1; col++) setCell(ws, r, col, null, style);
  if (!ws["!merges"]) ws["!merges"] = [];
  ws["!merges"].push({ s: { r, c: c0 }, e: { r, c: c1 } });
}

// ─── Main export function ─────────────────────────────────────────────────────
/**
 * Export the Zone Details table to a richly formatted Excel file.
 *
 * Usage in CollapsibleZoneTable.tsx:
 *   import { exportZoneDetailToExcel } from "@/utils/exportZoneDetail";
 *
 *   const handleExport = () => {
 *     exportZoneDetailToExcel(
 *       zonesData,
 *       viewMode,
 *       `zoneDetail_${new Date().toISOString().slice(0, 10)}.xlsx`
 *     );
 *   };
 */
export function exportZoneDetailToExcel(
  zonesData: ZoneItem[],
  viewMode: "price" | "Qty" = "Qty",
  fileName = "zoneDetail_export.xlsx"
) {
  if (!zonesData || zonesData.length === 0) return;

  const wb = XLSX.utils.book_new();
  const ws: XLSX.WorkSheet = {};

  const wpm    = zonesData[0].weeksPerMonth;
  const months = Object.keys(wpm);
  const fmt    = (v: number): string | number =>
    viewMode === "price" ? `${v.toFixed(0)} €` : v;

  // ── Column index map ───────────────────────────────────────────────────────
  // Col 0: zone label | Col 1: type label | then weeks + totals per month
  const FIXED = 2;
  const colMap: Record<string, number> = {};
  let c = FIXED;
  for (const m of months) {
    for (const wk of wpm[m]) { colMap[`${m}_${wk}`] = c++; }
    colMap[`${m}_total`] = c++;
  }
  const NCOLS = c;

  // ── Row 0 — Title ─────────────────────────────────────────────────────────
  mergeRow(ws, 0, 0, NCOLS - 1, "Zone Details — Scrap Report", {
    fill:      argbFill(C.TITLE_BG),
    font:      argbFont(C.ZONE_FG, true, 12),
    alignment: { horizontal: "center", vertical: "center" },
    border:    THIN_BORDER,
  });

  // ── Row 1 — "NATURE" + month group headers ────────────────────────────────
  mergeRow(ws, 1, 0, FIXED - 1, "NATURE", {
    fill:      argbFill(C.ZONE_BG),
    font:      argbFont(C.ZONE_FG, true),
    alignment: { horizontal: "center", vertical: "center" },
    border:    THIN_BORDER,
  });
  for (const m of months) {
    const wks   = wpm[m];
    const start = colMap[`${m}_${wks[0]}`];
    const end   = colMap[`${m}_total`];
    mergeRow(ws, 1, start, end, m.charAt(0).toUpperCase() + m.slice(1), {
      fill:      argbFill(C.MONTH_BG),
      font:      argbFont(C.MONTH_FG, true),
      alignment: { horizontal: "center", vertical: "center" },
      border:    THIN_BORDER,
    });
  }

  // ── Row 2 — "Zone / Type" + week sub-headers ──────────────────────────────
  mergeRow(ws, 2, 0, FIXED - 1, "Zone / Type", {
    fill:      argbFill(C.WEEK_BG),
    font:      argbFont(C.WEEK_FG, true),
    alignment: { horizontal: "center", vertical: "center" },
    border:    THIN_BORDER,
  });
  for (const m of months) {
    for (const wk of wpm[m]) {
      setCell(ws, 2, colMap[`${m}_${wk}`], `WK${wk}`, {
        fill:      argbFill(C.WEEK_BG),
        font:      argbFont(C.WEEK_FG, true),
        alignment: { horizontal: "center", vertical: "center" },
        border:    THIN_BORDER,
      });
    }
    setCell(ws, 2, colMap[`${m}_total`], "Total", {
      fill:      argbFill(C.TOTAL_HDR_BG),
      font:      argbFont(C.TOTAL_HDR_FG, true),
      alignment: { horizontal: "center", vertical: "center" },
      border:    THIN_BORDER,
    });
  }

  // ── Data rows ─────────────────────────────────────────────────────────────
  let r = 3;

  for (const zone of zonesData) {
    // Zone section header
    mergeRow(ws, r, 0, NCOLS - 1, `▶  ${zone.key}`, {
      fill:      argbFill(C.ZONE_BG),
      font:      argbFont(C.ZONE_FG, true, 10),
      alignment: { horizontal: "left", vertical: "center" },
      border:    THIN_BORDER,
    });
    r++;

    // Projet / Serie rows
    for (const cell of zone.cells) {
      const isProjet = cell.type === "Projet";
      const rowBg    = isProjet ? C.PROJET_BG : C.SERIE_BG;
      const labelFg = isProjet ? "2D6A9F" : "1A6B3A";
      const base: CellStyle = {
        fill:      argbFill(rowBg),
        font:      argbFont("000000"),
        alignment: { horizontal: "center", vertical: "center" },
        border:    THIN_BORDER,
      };

      setCell(ws, r, 0, "", base);
      setCell(ws, r, 1, cell.type, {
        ...base,
        font:      argbFont(labelFg, true),
        alignment: { horizontal: "left", vertical: "center" },
      });

      for (const mData of cell.months) {
        const m = mData.name;
        for (const wk of mData.weeks) {
          if (wk.weekNum === undefined) continue;
          setCell(ws, r, colMap[`${m}_${wk.weekNum}`], fmt(wk.value), base);
        }
        setCell(ws, r, colMap[`${m}_total`], fmt(mData.total), {
          ...base,
          fill: argbFill(C.GRAND_TOTAL),
          font: argbFont(C.TOTAL_FG, true),
        });
      }
      r++;
    }

    // TOTAL row
    const totalStyle: CellStyle = {
      fill:      argbFill(C.TOTAL_BG),
      font:      argbFont(C.TOTAL_FG, true),
      alignment: { horizontal: "center", vertical: "center" },
      border:    THICK_BOTTOM_BORDER,
    };
    setCell(ws, r, 0, "", totalStyle);
    setCell(ws, r, 1, "TOTAL", {
      ...totalStyle,
      alignment: { horizontal: "left", vertical: "center" },
    });
    months.forEach((m, mi) => {
        const monthTotals = zone.totals[mi] ?? [];

        // Find Projet and Serie cells (mirrors CollapsedZoneSummary logic)
        const projetCell = zone.cells.find((c) => c.type === "Projet");
        const serieCell  = zone.cells.find((c) => c.type === "Serie");

        // Week columns: from zone.totals (sum of Projet + Serie per week)
        wpm[m].forEach((wk, wi) => {
            setCell(ws, r, colMap[`${m}_${wk}`], fmt(monthTotals[wi] ?? 0), totalStyle);
        });

        // Month total column: projetTotal + serieTotal (mirrors the UI fix)
        const projetTotal = projetCell?.months[mi]?.total ?? 0;
        const serieTotal  = serieCell?.months[mi]?.total  ?? 0;
        const correctMonthTotal = projetTotal + serieTotal;

        setCell(ws, r, colMap[`${m}_total`], fmt(correctMonthTotal), {
            ...totalStyle,
            fill: argbFill(C.GRAND_TOTAL),
        });
    });

    r += 2; // blank spacer between zones
  }

  // ── Column widths, row heights, sheet range ───────────────────────────────
  ws["!cols"] = [{ wch: 14 }, { wch: 10 }, ...Array(NCOLS - FIXED).fill({ wch: 9 })];
  ws["!rows"] = [{ hpt: 20 }, { hpt: 16 }, { hpt: 14 }];
  ws["!ref"]  = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r, c: NCOLS - 1 } });

  XLSX.utils.book_append_sheet(wb, ws, "Zone Details");

  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    fileName
  );
}