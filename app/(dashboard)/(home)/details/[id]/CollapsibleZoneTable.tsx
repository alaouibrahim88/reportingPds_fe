import React, { useState, useEffect } from "react";
import { Users2 } from "lucide-react";
import { getZoneDetails } from "@/actions/scrap";

// Improved type definitions
type ZoneKey = "Wrapping" | "Nets" | "Knitting";
type ZoneState = Record<ZoneKey, boolean>;

// Define data structure types
type WeekData = {
  value: number;
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

type ApiResponse = {
  zonesType: ApiZoneType[];
  returnMessage: string;
  returnCode: string;
};

interface CollapsibleZoneTableProps {
  viewMode: "price" | "qty";
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
  const [months, setMonths] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getZoneDetails(year, viewMode, month);

        if (response) {
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

  // Helper functions
  const toggleZone = (zone: ZoneKey) => {
    setExpandedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }));
  };

  const formatValue = (value: number) => {
    return viewMode === "price" ? `${value} €` : value;
  };

  // Component for table header
  const TableHeader = () => {
    // Group weeks by month
    const weeksByMonth: Record<string, number[]> = {};

    zonesData.forEach((zone) => {
      zone.cells.forEach((cell) => {
        cell.months.forEach((month) => {
          if (!weeksByMonth[month.name]) {
            weeksByMonth[month.name] = [];
          }

          month.weeks.forEach((week, weekIndex) => {
            // Calculate the actual week number based on month position
            const monthIndex = months.indexOf(month.name);
            const weekNumber = monthIndex * 4 + weekIndex + 1;

            if (!weeksByMonth[month.name].includes(weekNumber)) {
              weeksByMonth[month.name].push(weekNumber);
            }
          });
        });
      });
    });

    // Sort week numbers within each month
    Object.keys(weeksByMonth).forEach((month) => {
      weeksByMonth[month].sort((a, b) => a - b);
    });

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
              colSpan={weeksByMonth[month]?.length + 1 || 5} // +1 for the total column
            >
              {month}
            </th>
          ))}
        </tr>
        <tr>
          <th
            className="border p-1 text-xs font-medium text-muted-foreground"
            colSpan={2}
          ></th>
          {months.flatMap((month) => [
            ...(weeksByMonth[month] || []).map((weekNum) => (
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

          return (
            <React.Fragment key={`${zone.key}-${month}`}>
              {monthData?.weeks.map((week, weekIndex) => (
                <DataCell
                  key={`${zone.key}-${month}-wk${weekIndex}`}
                  value={week.value}
                />
              ))}
              <TotalCell value={monthData?.total || 0} />
            </React.Fragment>
          );
        })}
      </tr>
    );
  };

  // Component for expanded zone details
  const ExpandedZoneDetails = ({ zone }: { zone: ZoneData }) => {
    // Find the Serie cell
    const serieCell = zone.cells.find((cell) => cell.type === "Serie");

    return (
      <>
        <tr className="hover:bg-muted/50 transition-colors">
          <td className="border p-1 text-xs text-muted-foreground"></td>
          <td className="border p-1 text-xs text-muted-foreground">Serie</td>
          {months.map((month, monthIndex) => {
            const actualMonthIndex = months.indexOf(month);
            const monthData = serieCell?.months[actualMonthIndex];

            return (
              <React.Fragment key={`${zone.key}-serie-${month}`}>
                {monthData?.weeks.map((week, weekIndex) => (
                  <DataCell
                    key={`${zone.key}-serie-${month}-wk${weekIndex}`}
                    value={week.value}
                  />
                ))}
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
          {months.map((month, monthIndex) => {
            const actualMonthIndex = months.indexOf(month);

            return (
              <React.Fragment key={`${zone.key}-total-${month}`}>
                {zone.totals[actualMonthIndex].map((value, valueIndex) =>
                  valueIndex === 4 ? (
                    <RowTotalCell
                      key={`${zone.key}-total-${month}-${valueIndex}`}
                      value={value}
                    />
                  ) : (
                    <td
                      key={`${zone.key}-total-${month}-${valueIndex}`}
                      className="border p-1 text-center text-xs text-muted-foreground font-medium"
                    >
                      {formatValue(value)}
                    </td>
                  )
                )}
              </React.Fragment>
            );
          })}
        </tr>
      </>
    );
  };

  // Component for collapsed zone summary (just show the TOTAL row)
  const CollapsedZoneSummary = ({ zone }: { zone: ZoneData }) => {
    // Find the Serie cell
    const serieCell = zone.cells.find((cell) => cell.type === "Serie");

    return (
      <>
        <tr className="hover:bg-muted/50 transition-colors">
          <td className="border p-1 text-xs text-muted-foreground"></td>
          <td className="border p-1 text-xs text-muted-foreground">Serie</td>
          {months.map((month, monthIndex) => {
            const actualMonthIndex = months.indexOf(month);
            const monthData = serieCell?.months[actualMonthIndex];

            return (
              <React.Fragment key={`summary-${month}`}>
                {monthData?.weeks.map((week, weekIndex) => (
                  <DataCell
                    key={`summary-${month}-wk${weekIndex}`}
                    value={week.value}
                  />
                ))}
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
          {months.map((month, monthIndex) => {
            const actualMonthIndex = months.indexOf(month);

            return (
              <React.Fragment key={`summary-total-${month}`}>
                {zone.totals[actualMonthIndex].map((value, valueIndex) =>
                  valueIndex === 4 ? (
                    <RowTotalCell
                      key={`summary-total-${month}-${valueIndex}`}
                      value={value}
                    />
                  ) : (
                    <td
                      key={`summary-total-${month}-${valueIndex}`}
                      className="border p-1 text-center text-xs text-muted-foreground font-medium"
                    >
                      {formatValue(value)}
                    </td>
                  )
                )}
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
                    <ExpandedZoneDetails zone={zone} />
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

  // Get weeks per month
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
          return { value: weekDetail?.couts || 0 };
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
    };
  });
};

export default CollapsibleZoneTable;
