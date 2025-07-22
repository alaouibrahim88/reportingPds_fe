import React, { useState, useEffect } from "react";
import { Users2 } from "lucide-react";
import { getZoneDetails, getDetailsPerZone } from "@/actions/scrap";
import { z } from "zod";
import { FaFileExcel } from "react-icons/fa";
import { GetZoneDetails, getZoneSubDetails } from "@/actions/scrap/details";
import { exportToExcel } from "@/utils/excel";
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
}

const CollapsibleZoneTable = ({
  viewMode,
  year,
  month,
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

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetZoneDetails(year, viewMode, month);
        if (response) {
          // @ts-ignore
          const transformedData = transformApiDataToZonesData(response);
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
        console.error("Error fetching zone details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, viewMode, month]);

  // Process detailed data from getDetailsPerZone
  const processDetailedData = (zonesDetails: any[]) => {
    const result: Record<string, any> = {};

    zonesDetails.forEach((item) => {
      const zoneName = item.zone;
      result[zoneName] = {
        cells: {},
      };

      // Group details by cell and type
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

        // Add week data
        result[zoneName].cells[cellName].months[detail?.mois].weeks[
          detail?.semaine
        ] = detail?.couts;
      });
    });

    return result;
  };

  // Helper functions
  const toggleZone = async (zone: ZoneKey) => {
    setExpandedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }));
    
    //console.log(`Zone sélectionnée : ${zoneKey}`);
    const detailsResponse = await getZoneSubDetails(
      year,
      viewMode,
      month,
      zone
    );
    const zonesDetailsArray = Object.values(detailsResponse);

    if (detailsResponse) {
      const processedDetails = processDetailedData(zonesDetailsArray);
      setDetailedData(processedDetails);
    }
  };

  const formatValue = (value: number) => {
    return viewMode === "price" ? `${value} €` : value;
  };

  // Component for table header
  const TableHeader = () => {
    // Use the weeks per month from the first zone data
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
              colSpan={(weeksPerMonth[month]?.length || 0) + 1} // +1 for the total column
            >
              {month}
            </th>
          ))}
        </tr>
        <tr>
          <th
            className="border p-1 text-xs font-medium text-muted-foreground"
            colSpan={2}
          >Zone</th>
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

    // Find the Projet cell
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

  // Component for collapsed zone summary (just show the TOTAL row)
  const CollapsedZoneSummary = ({ zone }: { zone: ZoneData }) => {
    const weeksPerMonth = zone.weeksPerMonth || {};

    // Find the Serie cell
    const serieCell = zone.cells.find((cell) => cell.type === "Serie");

    return (
      <>
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
        <tr className="hover:bg-muted/50 transition-colors bg-blue-50">
          <td className="border p-1 text-xs text-muted-foreground"></td>
          <td className="border p-1 text-xs text-muted-foreground font-medium">
            TOTAL
          </td>
          {months.map((month) => {
            const actualMonthIndex = months.indexOf(month);
            const monthWeeks = weeksPerMonth[month] || [];
            const totalValues = zone.totals[actualMonthIndex];

            return (
              <React.Fragment key={`summary-total-${month}`}>
                {monthWeeks.map((_, index) => (
                  <td
                    key={`summary-total-${month}-${index}`}
                    className="border p-1 text-center text-xs text-muted-foreground font-medium"
                  >
                    {formatValue(totalValues[index] || 0)}
                  </td>
                ))}
                <RowTotalCell
                  key={`summary-total-${month}-total`}
                  value={totalValues[totalValues.length - 1] || 0}
                />
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
    // Get detailed data for this zone
    const zoneDetails = data[zone.key];
    const weeksPerMonth = zone.weeksPerMonth || {};
    
    if (!zoneDetails) {
      // Fallback to original implementation if no detailed data
      return <CollapsedZoneSummary zone={zone} />;
    }

    // Get all cells for this zone
    const cellNames = Object.keys(zoneDetails.cells);

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
        <tr className="hover:bg-muted/50 transition-colors bg-blue-50">
          <td className="border p-1 text-xs text-muted-foreground"></td>
          <td className="border p-1 text-xs text-muted-foreground font-medium">
            TOTAL
          </td>
          {months.map((month) => {
            const actualMonthIndex = months.indexOf(month);
            const monthWeeks = weeksPerMonth[month] || [];
            const totalValues = zone.totals[actualMonthIndex];

            return (
              <React.Fragment key={`${zone.key}-total-${month}`}>
                {monthWeeks.map((_, index) => (
                  <td
                    key={`${zone.key}-total-${month}-${index}`}
                    className="border p-1 text-center text-xs text-muted-foreground font-medium"
                  >
                    {formatValue(totalValues[index] || 0)}
                  </td>
                ))}
                <RowTotalCell
                  key={`${zone.key}-total-${month}-total`}
                  value={totalValues[totalValues.length - 1] || 0}
                />
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

  return (
    <div className="rounded-md border shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2 mb-1 py-3 px-4 bg-muted/30 rounded-t-md">
        <div className="flex items-center gap-2">
          <Users2 className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm">Zone Details</h3>
        </div>
        <div className="relative w-[80px] ml-auto">
          <button onClick={() => exportToExcel(detailedData, 'zoneDetail_'+(new Date().getDate())+'_.xlsx')} className="mt-0 flex items-center justify-center space-x-2 w-[70px] h-6  text-sm bg-green-600 text-white rounded-md hover:bg-green-500 border border-gray-200">
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
  // Extract unique months from the data
  const uniqueMonths = Array.from(
    new Set(
      apiData.zonesType.flatMap((zone) =>
        zone.details.map((detail) => detail.mois)
      )
    )
  ).sort((a, b) => {
    // Custom sort for French month names
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

  // Get actual weeks per month directly from the API data
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

  // Sort weeks within each month
  Object.keys(weeksPerMonth).forEach((month) => {
    weeksPerMonth[month].sort((a, b) => a - b);
  });

  console.log("Actual weeks per month from API:", weeksPerMonth);

  // Transform each zone
  return apiData.zonesType.map((zoneType) => {
    // Convert zone name to ZoneKey format
    const zoneKey = zoneType.zone as ZoneKey;

    // Group details by cell type (Projet/Serie)
    const cellTypes = ["Projet", "Serie"];

    // Create cells array
    const cells = cellTypes.map((cellType) => {
      // Filter details for this cell type
      const cellDetails = zoneType.details.filter(
        (detail) => detail.typeCell === cellType
      );

      // Create months data for this cell
      const months = uniqueMonths.map((month) => {
        // Get all weeks for this month and cell type
        const monthDetails = cellDetails.filter(
          (detail) => detail.mois === month
        );

        // Get the actual weeks for this month
        const monthWeeks = weeksPerMonth[month] || [];

        // Create week data with the actual weeks for this month
        const weeks = monthWeeks.map((weekNum) => {
          const weekDetail = monthDetails.find(
            (detail) => detail.semaine === weekNum
          );
          return { value: weekDetail?.couts || 0, weekNum };
        });

        // Get total for this month from the first detail (they all have the same total_mois)
        const monthTotal =
          monthDetails.length > 0
            ? monthDetails[0].total_mois
            : // If no details, calculate from weeks
              weeks.reduce((sum, week) => sum + week.value, 0);

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

    // Calculate totals for each month and week
    const totals = uniqueMonths.map((month) => {
      // Get all details for this month
      const monthDetails = zoneType.details.filter(
        (detail) => detail.mois === month
      );

      // Get the actual weeks for this month
      const monthWeeks = weeksPerMonth[month] || [];

      // Calculate totals for each week in this month
      const weekTotals = monthWeeks.map((weekNum) => {
        const weekDetails = monthDetails.filter(
          (detail) => detail.semaine === weekNum
        );
        return weekDetails.reduce((sum, detail) => sum + detail.couts, 0);
      });

      // Get the month total from the API if available
      const monthTotal =
        monthDetails.length > 0
          ? monthDetails[0].total_mois
          : weekTotals.reduce((sum, weekTotal) => sum + weekTotal, 0);

      return [...weekTotals, monthTotal];
    });

    // Calculate project value (first week value for Projet type)
    const projectCell = cells.find((cell) => cell.type === "Projet");
    const projectValue = projectCell?.months[0]?.weeks[0]?.value || 0;

    return {
      key: zoneKey,
      projectValue,
      cells,
      totals,
      weeksPerMonth, // Add this to make it available throughout the component
    };
  });
};

export default CollapsibleZoneTable;
