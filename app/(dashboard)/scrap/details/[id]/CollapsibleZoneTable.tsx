import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Loader2, Minus, Plus, SearchX, Users2 } from "lucide-react";
import { getZoneDetails, getDetailsPerZone, fetchCellByZone } from "@/actions/scrap";
import ZoneFilterBar from "./_components/ZoneFilterBar";
import { z } from "zod";
import { FaFileExcel } from "react-icons/fa";
import { GetZoneDetails, getZoneSubDetails } from "@/actions/scrap/details";
import { exportZoneDetailToExcel, SCRAP_TYPES } from "@/app/(dashboard)/scrap/details/[id]/_utils/exportZoneDetail";
import { Endpoints } from "@/constants/api";
import { getCookieValue } from "@/lib/storage";

// Improved type definitions
type ZoneKey = "Wrapping" | "Nets" | "Knitting";
type ZoneState = Record<ZoneKey, boolean>;

const initialExpandedZones: ZoneState = {
  Wrapping: false,
  Nets: false,
  Knitting: false,
};

// Define data structure types
type WeekData = {
  value: number;
  weekNum?: number;
};

type MonthData = {
  name: string;
  weeks: WeekData[];
  total: number;
};

type CellData = {
  name: string;
  type: "Serie" | "Projet";
  months: MonthData[];
};

type ZoneData = {
  key: ZoneKey;
  projectValue: number;
  cells: CellData[];
  totals: number[][];
  weeksPerMonth: Record<string, number[]>;
};

// Type for the API response
type ApiZoneDetail = {
  typeCell: "Projet" | "Serie";
  semaine: number;
  mois: string;
  annee: number;
  couts: number;
  total_mois: number;
};

type ApiZoneType = {
  zone: string;
  details: ApiZoneDetail[];
};

export type ApiResponse = {
  zonesType: ApiZoneType[];
  returnMessage: string;
  returnCode: string;
};

interface CollapsibleZoneTableProps {
  viewMode: "price" | "Qty";
  year: number;
  month: string;
  data: ApiResponse | null;
}

function flattenData(input: any[]) {
  const rows: any[] = [];

  for (const section of input) {
    for (const cell of section.cells) {
      for (const month of cell.months) {
        const weekData: Record<string, number> = {};
        for (const week of month.weeks) {
          weekData[`Week${week.weekNum}`] = week.value ?? 0;
        }

        rows.push({
          Section: section.key,
          Cell: cell.name,
          Type: cell.type,
          Month: month.name,
          ...weekData,
          Total: month.total,
        });
      }
    }
  }

  return rows;
}

function flattenDetailedData(input: any) {
  const rows: any[] = [];

  for (const section in input) {
    const sectionObj = input[section].cells;

    for (const cell in sectionObj) {
      const cellData = sectionObj[cell];

      for (const month in cellData.months) {
        const monthData = cellData.months[month];
        const weeks = monthData.weeks;

        rows.push({
          Section: section,
          Cell: cell,
          Type: cellData.type,
          Month: month,
          Week1: weeks["1"] ?? 0,
          Week2: weeks["2"] ?? 0,
          Week3: weeks["3"] ?? 0,
          Week4: weeks["4"] ?? 0,
          Week5: weeks["5"] ?? 0,
          Total: monthData.total,
        });
      }
    }
  }

  return rows;
}

const toNumber = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    return Number(value.replace(",", ".")) || 0;
  }

  return 0;
};

const processDetailedData = (zonesDetails: any[]) => {
  const result: Record<string, any> = {};

  zonesDetails.forEach((item) => {
    const zoneName = item.zone;
    result[zoneName] = {
      cells: {},
    };

    const detailsArrayTab = Array.isArray(item?.details)
      ? item?.details
      : [item?.details];
    detailsArrayTab.forEach((detail: any) => {
      const cellName = detail?.cellule;
      const cellType = detail?.typeCell;

      if (!result[zoneName]?.cells[cellName]) {
        result[zoneName].cells[cellName] = {
          type: cellType,
          months: {},
        };
      }

      if (!result[zoneName].cells[cellName].months[detail?.mois]) {
        result[zoneName].cells[cellName].months[detail?.mois] = {
          weeks: {},
          total: toNumber(detail?.total_mois),
        };
      }

      result[zoneName].cells[cellName].months[detail?.mois].weeks[
        detail?.semaine
      ] = toNumber(detail?.couts);
    });
  });

  return result;
};

// Case- and accent-insensitive form used for search matching ("Matière" matches "matiere")
const normalizeText = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

// Highlights the first case-insensitive occurrence of the search query
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

const CollapsibleZoneTable = ({
  viewMode,
  year,
  month,
  data,
}: CollapsibleZoneTableProps) => {
  const [expandedZones, setExpandedZones] =
    useState<ZoneState>(initialExpandedZones);

  // Zones whose Process / Matière / Machine / Démarrage rows are shown (hidden by default)
  const [visibleTypes, setVisibleTypes] = useState<Partial<ZoneState>>({});

  const [zonesData, setZonesData] = useState<ZoneData[]>([]);
  const [detailedData, setDetailedData] = useState<Record<string, any>>({});
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & filters (kept when the period or view mode changes)
  const [searchQuery, setSearchQuery] = useState("");
  const [zoneFilter, setZoneFilter] = useState<string[]>([]);
  const [cellFilter, setCellFilter] = useState<string[]>([]);
  // Cell names per zone (GetListCell), used for cell search and the Cellule filter
  const [cellsByZone, setCellsByZone] = useState<Record<string, string[]>>({});
  const requestedCellZones = useRef(new Set<string>());

  // Guards zone detail requests against period changes and duplicate loads
  const period = `${year}-${month}-${viewMode}`;
  const periodRef = useRef(period);
  const loadingZoneDetails = useRef(new Set<string>());

  useEffect(() => {
    periodRef.current = `${year}-${month}-${viewMode}`;
    setDetailedData({});
    setExpandedZones(initialExpandedZones);
  }, [year, month, viewMode]);

  useEffect(() => {
    const processData = async () => {
      try {
        setLoading(true);
        if (data) {
          // @ts-ignore
          const transformedData = transformApiDataToZonesData(data);
          setZonesData(transformedData);

          if (
            transformedData.length > 0 &&
            transformedData[0].cells.length > 0
          ) {
            setMonths(
              transformedData[0].cells[0].months.map((month) => month.name)
            );
          }
        }
      } catch (error) {
        console.error("Error processing zone details:", error);
      } finally {
        setLoading(false);
      }
    };

    processData();
  }, [data]);

  // Loads the per-cell rows of a zone for the current period (once per zone and period)
  const loadZoneDetails = useCallback(
    async (zone: string) => {
      const requestKey = `${period}:${zone}`;
      if (loadingZoneDetails.current.has(requestKey)) return;
      loadingZoneDetails.current.add(requestKey);

      try {
        const detailsResponse = await getZoneSubDetails(year, viewMode, month, zone);

        if (detailsResponse && periodRef.current === period) {
          const processedDetails = processDetailedData(Object.values(detailsResponse));
          setDetailedData((prev) => ({
            ...prev,
            ...processedDetails,
          }));
        }
      } catch (error) {
        console.error(`Error loading details for zone ${zone}:`, error);
      } finally {
        loadingZoneDetails.current.delete(requestKey);
      }
    },
    [period, year, viewMode, month]
  );

  // Fetch each zone's cell list once, for cell search and the Cellule filter
  useEffect(() => {
    const missing = zonesData
      .map((zone) => zone.key as string)
      .filter((zone) => !requestedCellZones.current.has(zone));
    if (missing.length === 0) return;

    missing.forEach((zone) => requestedCellZones.current.add(zone));
    Promise.allSettled(missing.map((zone) => fetchCellByZone(zone))).then((results) => {
      setCellsByZone((prev) => {
        const next = { ...prev };
        results.forEach((result, index) => {
          next[missing[index]] =
            result.status === "fulfilled" ? result.value.map((cell) => cell.libelle) : [];
        });
        return next;
      });
    });
  }, [zonesData]);

  const query = normalizeText(searchQuery);
  const matchesQuery = useCallback(
    (value: string) => normalizeText(value).includes(query),
    [query]
  );

  // Known cells of a zone: its cell list plus any cells already loaded in its details
  const cellsOfZone = useCallback(
    (zone: string) =>
      Array.from(
        new Set([...(cellsByZone[zone] ?? []), ...Object.keys(detailedData[zone]?.cells ?? {})])
      ),
    [cellsByZone, detailedData]
  );

  const hasFilters = query !== "" || zoneFilter.length > 0 || cellFilter.length > 0;

  const visibleZones = useMemo(
    () =>
      zonesData.filter((zone) => {
        const cells = cellsOfZone(zone.key);
        if (zoneFilter.length > 0 && !zoneFilter.includes(zone.key)) return false;
        if (cellFilter.length > 0 && !cells.some((cell) => cellFilter.includes(cell))) return false;
        if (query && !matchesQuery(zone.key) && !cells.some(matchesQuery)) return false;
        return true;
      }),
    [zonesData, zoneFilter, cellFilter, query, matchesQuery, cellsOfZone]
  );

  // A zone is narrowed to some of its cells when a cell is selected, or when the
  // search matches its cells rather than its name
  const isCellFiltered = useCallback(
    (zone: string) => cellFilter.length > 0 || (query !== "" && !matchesQuery(zone)),
    [cellFilter, query, matchesQuery]
  );

  const isCellVisible = (zone: string, cell: string) =>
    (cellFilter.length === 0 || cellFilter.includes(cell)) &&
    (query === "" || matchesQuery(zone) || matchesQuery(cell));

  // Cell-filtered zones open automatically on their cell rows
  const autoExpandedZones = useMemo(
    () => visibleZones.filter((zone) => isCellFiltered(zone.key)).map((zone) => zone.key as string),
    [visibleZones, isCellFiltered]
  );

  // One automatic load per zone and period, so a failed or mismatched response can't loop
  const autoLoadedZones = useRef(new Set<string>());
  useEffect(() => {
    autoExpandedZones.forEach((zone) => {
      const attemptKey = `${period}:${zone}`;
      if (detailedData[zone] || autoLoadedZones.current.has(attemptKey)) return;
      autoLoadedZones.current.add(attemptKey);
      loadZoneDetails(zone);
    });
  }, [autoExpandedZones, detailedData, loadZoneDetails, period]);

  const isZoneExpanded = (zone: string) =>
    !!expandedZones[zone as ZoneKey] || autoExpandedZones.includes(zone);

  const resetFilters = () => {
    setSearchQuery("");
    setZoneFilter([]);
    setCellFilter([]);
  };

  // Cellule filter options, grouped by zone (limited to the selected zones)
  const cellGroups = zonesData
    .filter((zone) => zoneFilter.length === 0 || zoneFilter.includes(zone.key))
    .map((zone) => ({ heading: zone.key as string, options: cellsOfZone(zone.key).sort() }));
  const cellsLoading = zonesData.some((zone) => !(zone.key in cellsByZone));

  const toggleZone = async (zone: ZoneKey) => {
    const shouldExpand = !expandedZones[zone];

    setExpandedZones((prev) => ({
      ...prev,
      [zone]: shouldExpand,
    }));

    if (shouldExpand && !detailedData[zone]) {
      await loadZoneDetails(zone);
    }
  };

  const toggleTypes = (zone: ZoneKey) => {
    setVisibleTypes((prev) => ({ ...prev, [zone]: !prev[zone] }));
  };

  const formatValue = (value: number) => {
    return viewMode === "price" ? `${value} €` : value;
  };

  const headerWeeksPerMonth = zonesData.length > 0 ? zonesData[0].weeksPerMonth : {};
  const totalColumns =
    2 + months.reduce((sum, m) => sum + (headerWeeksPerMonth[m]?.length || 0) + 1, 0);

  const visibleCellNames = (zone: string) =>
    Object.keys(detailedData[zone]?.cells ?? {}).filter((cell) => isCellVisible(zone, cell));

  // Per month: week sums of the given cells, then the sum of their month totals
  const computeSelectionTotals = (zone: ZoneData, cellNames: string[]) => {
    const cells = detailedData[zone.key]?.cells ?? {};
    return months.map((m) => {
      const weekSums = (zone.weeksPerMonth[m] || []).map((weekNum) =>
        cellNames.reduce((sum, name) => sum + (cells[name]?.months[m]?.weeks[weekNum] || 0), 0)
      );
      const monthTotal = cellNames.reduce(
        (sum, name) => sum + (cells[name]?.months[m]?.total || 0),
        0
      );
      return [...weekSums, monthTotal];
    });
  };

  // Component for table header
  const TableHeader = () => {
    const weeksPerMonth =
      zonesData.length > 0 ? zonesData[0].weeksPerMonth : {};

    console.log("Weeks per month in header:", weeksPerMonth);

    return (
      <thead>
        {/* Month banner — tinted and bold so each month block is easy to spot */}
        <tr className="bg-blue-50 dark:bg-blue-950/40">
          <th
            className="border p-1.5 text-xs font-semibold tracking-wide text-blue-900 dark:text-blue-100"
            colSpan={2}
          >
            NATURE
          </th>
          {months.map((month) => (
            <th
              key={month}
              className="border p-1.5 text-center text-xs font-semibold uppercase tracking-wide text-blue-900 dark:text-blue-100"
              colSpan={(weeksPerMonth[month]?.length || 0) + 1}
            >
              {month}
            </th>
          ))}
        </tr>
        <tr>
          <th
            className="border p-1 text-xs font-medium text-muted-foreground"
            colSpan={2}
          >
            Zone
          </th>
          {months.flatMap((month) => [
            ...(weeksPerMonth[month] || []).map((weekNum) => (
              <th
                key={`wk${weekNum}`}
                className="border p-1 text-center text-xs font-medium text-muted-foreground"
              >
                WK{weekNum}
              </th>
            )),
            <th
              key={`total-${month}`}
              className="border p-1 text-center text-xs font-medium text-muted-foreground"
            >
              Total {month}
            </th>,
          ])}
        </tr>
      </thead>
    );
  };

  // Component for a data cell
  const DataCell = ({ value }: { value: number }) => (
    <td className="border p-1 text-center text-xs text-muted-foreground">
      {formatValue(value)}
    </td>
  );

  // Component for a total cell (with yellow background)
  const TotalCell = ({ value }: { value: number }) => (
    <td className="border p-1 text-center text-xs text-muted-foreground bg-yellow-50">
      {formatValue(value)}
    </td>
  );

  // Component for a row total cell (with blue background)
  const RowTotalCell = ({ value }: { value: number }) => (
    <td className="border p-1 text-center text-xs text-muted-foreground font-medium bg-blue-100">
      {formatValue(value)}
    </td>
  );

  // Process / Matière / Machine / Démarrage rows — discreet, above TOTAL
  const ScrapTypeRows = ({ zone }: { zone: ZoneData }) => {
    const weeksPerMonth = zone.weeksPerMonth || {};

    return (
      <>
        {SCRAP_TYPES.map((scrapType) => (
          <tr key={`${zone.key}-${scrapType}`}>
            <td className="border p-1 text-xs text-muted-foreground/40"></td>
            <td className="border p-1 text-xs font-medium italic text-blue-900 dark:text-blue-200">
              {scrapType}
            </td>
            {months.map((month) => {
              const monthWeeks = weeksPerMonth[month] || [];
              return (
                <React.Fragment key={`${zone.key}-${scrapType}-${month}`}>
                  {monthWeeks.map((_, i) => (
                    <td
                      key={`${zone.key}-${scrapType}-${month}-${i}`}
                      className="border p-1 text-center text-xs text-muted-foreground/40"
                    />
                  ))}
                  <td className="border p-1 text-center text-xs text-muted-foreground/40">
                    —
                  </td>
                </React.Fragment>
              );
            })}
          </tr>
        ))}
      </>
    );
  };

  // First cell of a zone's TOTAL row: + / − button that shows or hides its scrap type rows
  const ScrapTypesToggleCell = ({ zoneKey }: { zoneKey: ZoneKey }) => {
    const isVisible = !!visibleTypes[zoneKey];

    return (
      <td className="border p-1 text-xs font-bold text-blue-900">
        <button
          type="button"
          onClick={() => toggleTypes(zoneKey)}
          aria-expanded={isVisible}
          aria-label={`${isVisible ? "Masquer" : "Afficher"} Process, Matière, Machine et Démarrage (${zoneKey})`}
          title={isVisible ? "Masquer les types" : "Afficher Process, Matière, Machine, Démarrage"}
          className="inline-flex h-5 w-5 items-center justify-center rounded border border-blue-300 bg-white text-blue-700 transition-colors hover:bg-blue-50"
        >
          {isVisible ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </button>
      </td>
    );
  };

  // Component for a zone row
  const ZoneRow = ({ zone }: { zone: ZoneData }) => {
    const isExpanded = isZoneExpanded(zone.key);
    const weeksPerMonth = zone.weeksPerMonth || {};

    const projetCell = zone.cells.find((cell) => cell.type === "Projet");

    return (
      <tr className="hover:bg-muted/50 transition-colors">
        <td
          className="border p-1 cursor-pointer text-xs text-muted-foreground"
          onClick={() => toggleZone(zone.key)}
        >
          {isExpanded ? "▼" : "+"} <Highlight text={zone.key} query={searchQuery} />
        </td>
        <td className="border p-1 text-xs text-muted-foreground">Projet</td>
        {months.map((month) => {
          const actualMonthIndex = months.indexOf(month);
          const monthData = projetCell?.months[actualMonthIndex];
          const monthWeeks = weeksPerMonth[month] || [];

          return (
            <React.Fragment key={`${zone.key}-${month}`}>
              {monthWeeks.map((weekNum) => {
                const weekData = monthData?.weeks.find(
                  (w) => w.weekNum === weekNum
                );
                return (
                  <DataCell
                    key={`${zone.key}-${month}-wk${weekNum}`}
                    value={weekData?.value || 0}
                  />
                );
              })}
              <TotalCell value={monthData?.total || 0} />
            </React.Fragment>
          );
        })}
      </tr>
    );
  };

  // Component for collapsed zone summary
  const CollapsedZoneSummary = ({ zone }: { zone: ZoneData }) => {
    const weeksPerMonth = zone.weeksPerMonth || {};

    const projetCell = zone.cells.find((cell) => cell.type === "Projet");
    const serieCell = zone.cells.find((cell) => cell.type === "Serie");

    return (
      <>
        {/* Serie row */}
        <tr className="hover:bg-muted/50 transition-colors">
          <td className="border p-1 text-xs text-muted-foreground"></td>
          <td className="border p-1 text-xs text-muted-foreground">Serie</td>
          {months.map((month) => {
            const actualMonthIndex = months.indexOf(month);
            const monthData = serieCell?.months[actualMonthIndex];
            const monthWeeks = weeksPerMonth[month] || [];

            return (
              <React.Fragment key={`summary-${month}`}>
                {monthWeeks.map((weekNum) => {
                  const weekData = monthData?.weeks.find(
                    (w) => w.weekNum === weekNum
                  );
                  return (
                    <DataCell
                      key={`summary-${month}-wk${weekNum}`}
                      value={weekData?.value || 0}
                    />
                  );
                })}
                <TotalCell value={monthData?.total || 0} />
              </React.Fragment>
            );
          })}
        </tr>

        {visibleTypes[zone.key] && <ScrapTypeRows zone={zone} />}

        {/* TOTAL row — bold and standing out */}
        <tr className="bg-blue-100 border-b-2 border-blue-300">
          <ScrapTypesToggleCell zoneKey={zone.key} />
          <td className="border p-1 text-xs font-bold text-blue-900">TOTAL</td>
          {months.map((month) => {
            const actualMonthIndex = months.indexOf(month);
            const monthWeeks = weeksPerMonth[month] || [];
            const totalValues = zone.totals[actualMonthIndex];

            // Fix: sum Projet + Serie month totals
            const projetTotal =
              projetCell?.months[actualMonthIndex]?.total || 0;
            const serieTotal = serieCell?.months[actualMonthIndex]?.total || 0;
            const correctMonthTotal = projetTotal + serieTotal;

            return (
              <React.Fragment key={`summary-total-${month}`}>
                {monthWeeks.map((_, index) => (
                  <td
                    key={`summary-total-${month}-${index}`}
                    className="border p-1 text-center text-xs font-bold text-blue-900"
                  >
                    {formatValue(totalValues[index] || 0)}
                  </td>
                ))}
                <td
                  key={`summary-total-${month}-total`}
                  className="border p-1 text-center text-xs font-bold text-blue-900 bg-blue-200"
                >
                  {formatValue(correctMonthTotal)}
                </td>
              </React.Fragment>
            );
          })}
        </tr>
      </>
    );
  };

  // Component for expanded zone details with cells
  const ExpandedZoneDetails = ({
    zone,
    data,
  }: {
    zone: ZoneData;
    data: Record<string, any>;
  }) => {
    const zoneDetails = data[zone.key];
    const weeksPerMonth = zone.weeksPerMonth || {};
    const cellFiltered = isCellFiltered(zone.key);

    if (!zoneDetails) {
      if (cellFiltered) {
        return (
          <tr>
            <td colSpan={totalColumns} className="border p-3 text-center text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Chargement des cellules de {zone.key}…
              </span>
            </td>
          </tr>
        );
      }
      return <CollapsedZoneSummary zone={zone} />;
    }

    const cellNames = visibleCellNames(zone.key);

    if (cellFiltered && cellNames.length === 0) {
      return (
        <tr>
          <td colSpan={totalColumns} className="border p-3 text-center text-xs text-muted-foreground">
            Aucune cellule de {zone.key} ne correspond aux filtres.
          </td>
        </tr>
      );
    }

    // Narrowed to some cells: TOTAL sums the cells shown instead of the whole zone
    const selectionTotals = cellFiltered ? computeSelectionTotals(zone, cellNames) : null;

    // Find Projet and Serie cells for correct total calculation
    const projetKey = cellNames.find(
      (k) => zoneDetails.cells[k].type === "Projet"
    );
    const serieKey = cellNames.find(
      (k) => zoneDetails.cells[k].type === "Serie"
    );

    return (
      <>
        {cellNames.map((cellName) => {
          const cellData = zoneDetails.cells[cellName];
          return (
            <tr
              key={`${zone.key}-${cellName}`}
              className="hover:bg-muted/50 transition-colors"
            >
              <td className="border p-1 text-xs text-muted-foreground">
                <Highlight text={cellName} query={searchQuery} />
              </td>
              <td className="border p-1 text-xs text-muted-foreground">
                {cellData.type}
              </td>
              {months.map((month) => {
                const monthData = cellData.months[month] || {
                  weeks: {},
                  total: 0,
                };
                const monthWeeks = weeksPerMonth[month] || [];

                return (
                  <React.Fragment key={`${zone.key}-${cellName}-${month}`}>
                    {monthWeeks.map((weekNum) => (
                      <DataCell
                        key={`${zone.key}-${cellName}-${month}-wk${weekNum}`}
                        value={monthData.weeks[weekNum] || 0}
                      />
                    ))}
                    <TotalCell value={monthData.total || 0} />
                  </React.Fragment>
                );
              })}
            </tr>
          );
        })}

        {visibleTypes[zone.key] && <ScrapTypeRows zone={zone} />}

        {/* TOTAL row — bold and standing out */}
        <tr className="bg-blue-100 border-b-2 border-blue-300">
          <ScrapTypesToggleCell zoneKey={zone.key} />
          <td className="border p-1 text-xs font-bold text-blue-900">
            {selectionTotals ? "TOTAL sélection" : "TOTAL"}
          </td>
          {months.map((month) => {
            const actualMonthIndex = months.indexOf(month);
            const monthWeeks = weeksPerMonth[month] || [];
            const totalValues = selectionTotals
              ? selectionTotals[actualMonthIndex]
              : zone.totals[actualMonthIndex];

            // Fix: sum Projet + Serie month totals from detailed data
            const projetTotal =
              projetKey
                ? zoneDetails.cells[projetKey]?.months[month]?.total || 0
                : 0;
            const serieTotal =
              serieKey
                ? zoneDetails.cells[serieKey]?.months[month]?.total || 0
                : 0;
            const correctMonthTotal = selectionTotals
              ? selectionTotals[actualMonthIndex][monthWeeks.length]
              : projetTotal + serieTotal;

            return (
              <React.Fragment key={`${zone.key}-total-${month}`}>
                {monthWeeks.map((_, index) => (
                  <td
                    key={`${zone.key}-total-${month}-${index}`}
                    className="border p-1 text-center text-xs font-bold text-blue-900"
                  >
                    {formatValue(totalValues[index] || 0)}
                  </td>
                ))}
                <td
                  key={`${zone.key}-total-${month}-total`}
                  className="border p-1 text-center text-xs font-bold text-blue-900 bg-blue-200"
                >
                  {formatValue(correctMonthTotal)}
                </td>
              </React.Fragment>
            );
          })}
        </tr>
      </>
    );
  };

  if (loading) {
    return <div className="p-4 text-center">Loading zone details...</div>;
  }

  if (zonesData.length === 0) {
    return <div className="p-4 text-center">No zone data available.</div>;
  }

  const handleExport = () => {
    // Export what is on screen: filtered zones, the cells shown and their selection totals
    const exportZones = visibleZones.map((zone) =>
      isCellFiltered(zone.key) && detailedData[zone.key]
        ? {
            ...zone,
            totals: computeSelectionTotals(zone, visibleCellNames(zone.key)),
            isSelection: true,
          }
        : zone
    );
    const exportDetails = Object.fromEntries(
      visibleZones
        .filter((zone) => detailedData[zone.key])
        .map((zone) => [
          zone.key,
          {
            cells: Object.fromEntries(
              visibleCellNames(zone.key).map((name) => [name, detailedData[zone.key].cells[name]])
            ),
          },
        ])
    );
    const exportExpanded = Object.fromEntries(
      visibleZones.map((zone) => [zone.key, isZoneExpanded(zone.key)])
    );

    exportZoneDetailToExcel(
        exportZones,
        viewMode,
        {
          fileName: `zoneDetail_${new Date().toISOString().slice(0, 10)}.xlsx`,
          expandedZones: exportExpanded,
          detailedData: exportDetails,
          months,
        }
    );
  };

  return (
    <div className="rounded-md border shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2 py-2 px-3 bg-muted/30 rounded-t-md">
        <div className="flex items-center gap-2">
          <Users2 className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm">Zone Details</h3>
        </div>
        <div className="relative w-[80px] ml-auto">
          <button
            onClick={handleExport}
            className="mt-0 flex items-center justify-center space-x-2 w-[70px] h-6 text-sm bg-green-600 text-white rounded-md hover:bg-green-500 border border-gray-200"
          >
            <FaFileExcel className="text-white-800" />
            <span className="text-white hover:text-white 300 text-xs">
              Export
            </span>
          </button>
        </div>
      </div>

      <ZoneFilterBar
        search={searchQuery}
        onSearchChange={setSearchQuery}
        zones={zonesData.map((zone) => zone.key as string)}
        zoneFilter={zoneFilter}
        onZoneFilterChange={setZoneFilter}
        cellGroups={cellGroups}
        cellFilter={cellFilter}
        onCellFilterChange={setCellFilter}
        cellsLoading={cellsLoading}
        visibleZones={visibleZones.length}
        totalZones={zonesData.length}
        onReset={resetFilters}
      />

      <div className="px-3 pb-3 pt-2 transition-all hover:border-primary/20">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <TableHeader />
            <tbody>
              {visibleZones.map((zone) => (
                <React.Fragment key={zone.key}>
                  <ZoneRow zone={zone} />
                  {isZoneExpanded(zone.key) ? (
                    <ExpandedZoneDetails zone={zone} data={detailedData} />
                  ) : (
                    <CollapsedZoneSummary zone={zone} />
                  )}
                </React.Fragment>
              ))}
              {visibleZones.length === 0 && hasFilters && (
                <tr>
                  <td colSpan={totalColumns} className="border px-4 py-10 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <SearchX className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">Aucun résultat</p>
                      <p className="text-xs">Aucune zone ni cellule ne correspond à ces filtres.</p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-1 rounded-md border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        Réinitialiser les filtres
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Transform API data to the format needed for the component
const transformApiDataToZonesData = (apiData: ApiResponse): ZoneData[] => {
  const uniqueMonths = Array.from(
    new Set(
      apiData.zonesType.flatMap((zone) =>
        zone.details.map((detail) => detail.mois)
      )
    )
  ).sort((a, b) => {
    const monthOrder = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });

  const weeksPerMonth: Record<string, number[]> = {};

  apiData.zonesType.forEach((zone) => {
    zone.details.forEach((detail) => {
      if (!weeksPerMonth[detail.mois]) {
        weeksPerMonth[detail.mois] = [];
      }

      if (!weeksPerMonth[detail.mois].includes(detail.semaine)) {
        weeksPerMonth[detail.mois].push(detail.semaine);
      }
    });
  });

  Object.keys(weeksPerMonth).forEach((month) => {
    weeksPerMonth[month].sort((a, b) => a - b);
  });

  console.log("Actual weeks per month from API:", weeksPerMonth);

  return apiData.zonesType.map((zoneType) => {
    const zoneKey = zoneType.zone as ZoneKey;

    const cellTypes = ["Projet", "Serie"];

    const cells = cellTypes.map((cellType) => {
      const cellDetails = zoneType.details.filter(
        (detail) => detail.typeCell === cellType
      );

      const months = uniqueMonths.map((month) => {
        const monthDetails = cellDetails.filter(
          (detail) => detail.mois === month
        );

        const monthWeeks = weeksPerMonth[month] || [];

        const weeks = monthWeeks.map((weekNum) => {
          const weekDetail = monthDetails.find(
            (detail) => detail.semaine === weekNum
          );
          return { value: weekDetail?.couts || 0, weekNum };
        });

        const monthTotal =
          monthDetails.length > 0
            ? monthDetails[0].total_mois
            : weeks.reduce((sum, week) => sum + week.value, 0);

        return {
          name: month,
          weeks,
          total: monthTotal,
        };
      });

      return {
        name: cellType,
        type: cellType as "Projet" | "Serie",
        months,
      };
    });

    const totals = uniqueMonths.map((month) => {
      const monthDetails = zoneType.details.filter(
        (detail) => detail.mois === month
      );

      const monthWeeks = weeksPerMonth[month] || [];

      const weekTotals = monthWeeks.map((weekNum) => {
        const weekDetails = monthDetails.filter(
          (detail) => detail.semaine === weekNum
        );
        return weekDetails.reduce((sum, detail) => sum + detail.couts, 0);
      });

      const monthTotal =
        monthDetails.length > 0
          ? monthDetails[0].total_mois
          : weekTotals.reduce((sum, weekTotal) => sum + weekTotal, 0);

      return [...weekTotals, monthTotal];
    });

    const projectCell = cells.find((cell) => cell.type === "Projet");
    const projectValue = projectCell?.months[0]?.weeks[0]?.value || 0;

    return {
      key: zoneKey,
      projectValue,
      cells,
      totals,
      weeksPerMonth,
    };
  });
};

export default CollapsibleZoneTable;