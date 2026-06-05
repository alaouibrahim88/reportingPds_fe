import React, { useState, useEffect } from "react";
import { Users2 } from "lucide-react";
import { getZoneDetails, getDetailsPerZone } from "@/actions/scrap";
import { z } from "zod";
import { FaFileExcel } from "react-icons/fa";
import { GetZoneDetails, getZoneSubDetails } from "@/actions/scrap/details";
import { exportZoneDetailToExcel} from "@/app/(dashboard)/scrap/details/[id]/_utils/exportZoneDetail";
import { Endpoints } from "@/constants/api";
import { getCookieValue } from "@/lib/storage";

// Improved type definitions
type ZoneKey = "Wrapping" | "Nets" | "Knitting";
type ZoneState = Record<ZoneKey, boolean>;

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

const CollapsibleZoneTable = ({
  viewMode,
  year,
  month,
  data,
}: CollapsibleZoneTableProps) => {
  const [expandedZones, setExpandedZones] = useState<ZoneState>({
    Wrapping: false,
    Nets: false,
    Knitting: false,
  });

  const [zonesData, setZonesData] = useState<ZoneData[]>([]);
  const [detailedData, setDetailedData] = useState<Record<string, any>>({});
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
            total: detail?.total_mois,
          };
        }

        result[zoneName].cells[cellName].months[detail?.mois].weeks[
          detail?.semaine
        ] = detail?.couts;
      });
    });

    return result;
  };

  const toggleZone = async (zone: ZoneKey) => {
    setExpandedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }));

    if (!detailedData[zone]) {
      const detailsResponse = await getZoneSubDetails(
        year,
        viewMode,
        month,
        zone
      );

      const zonesDetailsArray = Object.values(detailsResponse);

      if (detailsResponse) {
        const processedDetails = processDetailedData(zonesDetailsArray);
        setDetailedData((prev) => ({
          ...prev,
          ...processedDetails,
        }));
      }
    }
  };

  const formatValue = (value: number) => {
    return viewMode === "price" ? `${value} €` : value;
  };

  // Component for table header
  const TableHeader = () => {
    const weeksPerMonth =
      zonesData.length > 0 ? zonesData[0].weeksPerMonth : {};

    console.log("Weeks per month in header:", weeksPerMonth);

    return (
      <thead>
        <tr>
          <th
            className="border p-1 text-xs font-medium text-muted-foreground"
            colSpan={2}
          >
            NATURE
          </th>
          {months.map((month) => (
            <th
              key={month}
              className="border p-1 text-center text-xs font-medium text-muted-foreground bg-muted/30"
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

  // Component for a zone row
  const ZoneRow = ({ zone }: { zone: ZoneData }) => {
    const isExpanded = expandedZones[zone.key];
    const weeksPerMonth = zone.weeksPerMonth || {};

    const projetCell = zone.cells.find((cell) => cell.type === "Projet");

    return (
      <tr className="hover:bg-muted/50 transition-colors">
        <td
          className="border p-1 cursor-pointer text-xs text-muted-foreground"
          onClick={() => toggleZone(zone.key)}
        >
          {isExpanded ? "▼" : "+"} {zone.key}
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

        {/* Process row — discreet, above TOTAL */}
        <tr>
          <td className="border p-1 text-xs text-muted-foreground/40"></td>
          <td className="border p-1 text-xs text-muted-foreground/40 italic">
            Process
          </td>
          {months.map((month) => {
            const monthWeeks = weeksPerMonth[month] || [];
            return (
              <React.Fragment key={`summary-process-${month}`}>
                {monthWeeks.map((_, i) => (
                  <td
                    key={`summary-process-${month}-${i}`}
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

        {/* Matière row — discreet, above TOTAL */}
        <tr>
          <td className="border p-1 text-xs text-muted-foreground/40"></td>
          <td className="border p-1 text-xs text-muted-foreground/40 italic">
            Matière
          </td>
          {months.map((month) => {
            const monthWeeks = weeksPerMonth[month] || [];
            return (
              <React.Fragment key={`summary-matiere-${month}`}>
                {monthWeeks.map((_, i) => (
                  <td
                    key={`summary-matiere-${month}-${i}`}
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

        {/* TOTAL row — bold and standing out */}
        <tr className="bg-blue-100 border-b-2 border-blue-300">
          <td className="border p-1 text-xs font-bold text-blue-900"></td>
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

    if (!zoneDetails) {
      return <CollapsedZoneSummary zone={zone} />;
    }

    const cellNames = Object.keys(zoneDetails.cells);

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
                {cellName}
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

        {/* Process row — discreet, above TOTAL */}
        <tr>
          <td className="border p-1 text-xs text-muted-foreground/40"></td>
          <td className="border p-1 text-xs text-muted-foreground/40 italic">
            Process
          </td>
          {months.map((month) => {
            const monthWeeks = weeksPerMonth[month] || [];
            return (
              <React.Fragment key={`${zone.key}-process-${month}`}>
                {monthWeeks.map((_, i) => (
                  <td
                    key={`${zone.key}-process-${month}-${i}`}
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

        {/* Matière row — discreet, above TOTAL */}
        <tr>
          <td className="border p-1 text-xs text-muted-foreground/40"></td>
          <td className="border p-1 text-xs text-muted-foreground/40 italic">
            Matière
          </td>
          {months.map((month) => {
            const monthWeeks = weeksPerMonth[month] || [];
            return (
              <React.Fragment key={`${zone.key}-matiere-${month}`}>
                {monthWeeks.map((_, i) => (
                  <td
                    key={`${zone.key}-matiere-${month}-${i}`}
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

        {/* TOTAL row — bold and standing out */}
        <tr className="bg-blue-100 border-b-2 border-blue-300">
          <td className="border p-1 text-xs font-bold text-blue-900"></td>
          <td className="border p-1 text-xs font-bold text-blue-900">TOTAL</td>
          {months.map((month) => {
            const actualMonthIndex = months.indexOf(month);
            const monthWeeks = weeksPerMonth[month] || [];
            const totalValues = zone.totals[actualMonthIndex];

            // Fix: sum Projet + Serie month totals from detailed data
            const projetTotal =
              projetKey
                ? zoneDetails.cells[projetKey]?.months[month]?.total || 0
                : 0;
            const serieTotal =
              serieKey
                ? zoneDetails.cells[serieKey]?.months[month]?.total || 0
                : 0;
            const correctMonthTotal = projetTotal + serieTotal;

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
    exportZoneDetailToExcel(
        zonesData,
        viewMode,
        {
          fileName: `zoneDetail_${new Date().toISOString().slice(0, 10)}.xlsx`,
          expandedZones,
          detailedData,
          months,
        }
    );
  };

  return (
    <div className="rounded-md border shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-1 py-3 px-4 bg-muted/30 rounded-t-md">
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

      <div className="p-3 transition-all hover:border-primary/20">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <TableHeader />
            <tbody>
              {zonesData.map((zone) => (
                <React.Fragment key={zone.key}>
                  <ZoneRow zone={zone} />
                  {expandedZones[zone.key] ? (
                    <ExpandedZoneDetails zone={zone} data={detailedData} />
                  ) : (
                    <CollapsedZoneSummary zone={zone} />
                  )}
                </React.Fragment>
              ))}
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