import React, { useState, useEffect } from "react";
import { Users2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
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
import { getAllZones, getAllCells, getOperators } from "@/actions/scrap";
import { Zone, Cell } from "../types";
import { formatCurrency } from "../_utils/formatters";

interface OperatorDetailsTableProps {
  selectedYear: number;
  selectedMonth: string;
}

export default function OperatorDetailsTable({
  selectedYear,
  selectedMonth,
}: OperatorDetailsTableProps) {
  const [selectedCell, setSelectedCell] = useState("all");
  const [allZones, setAllZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState("all");
  const [allCells, setAllCells] = useState<Cell[]>([]);
  const [operatorData, setOperatorData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weekNumbers, setWeekNumbers] = useState<number[]>([]);
  const [monthData, setMonthData] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchAllZones = async () => {
      const allZones = await getAllZones();
      setAllZones(allZones.getlistZone);
    };
    fetchAllZones();
  }, []);

  useEffect(() => {
    const fetchAllCells = async () => {
      const allCells = await getAllCells(selectedZone);
      setAllCells(allCells.getlistcell);
    };
    fetchAllCells();
  }, [selectedZone]);

  useEffect(() => {
    const fetchOperatorData = async () => {
      if (selectedCell === "all") {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getOperators(
          selectedYear,
          parseInt(selectedMonth),
          selectedCell
        );

        if (
          data &&
          data.getDataStockCodeCell &&
          data.getDataStockCodeCell.length > 0
        ) {
          setOperatorData(data.getDataStockCodeCell);

          // Extract unique week numbers and organize by month
          const weeks: number[] = [];
          const months: { [key: string]: string[] } = {};

          data.getDataStockCodeCell[0].details.forEach((detail: any) => {
            if (!weeks.includes(detail.semaine)) {
              weeks.push(detail.semaine);
            }

            if (!months[detail.mois]) {
              months[detail.mois] = [];
            }

            if (!months[detail.mois].includes(`wk${detail.semaine}`)) {
              months[detail.mois].push(`wk${detail.semaine}`);
            }
          });

          setWeekNumbers(weeks.sort((a, b) => a - b));
          setMonthData(months);
        }
      } catch (error) {
        console.error("Error fetching operator data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOperatorData();
  }, [selectedYear, selectedMonth, selectedCell]);

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4 bg-muted/30">
        <div className="flex items-center gap-2">
          <Users2 className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm">Operator Details</h3>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedZone}
            onValueChange={setSelectedZone}
            defaultValue="all"
          >
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                All Zones
              </SelectItem>
              {allZones?.map((zone) => (
                <SelectItem
                  key={zone.libelle}
                  value={zone.libelle}
                  className="text-xs"
                >
                  {zone.libelle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedCell}
            onValueChange={setSelectedCell}
            defaultValue="all"
          >
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select Cell" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                All Cells
              </SelectItem>
              {allCells?.map((cell) => (
                <SelectItem
                  key={cell.libelle}
                  value={cell.libelle}
                  className="text-xs"
                >
                  {cell.libelle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-3">
        <div className="rounded-lg border bg-card text-card-foreground">
          <OperatorDataTable
            isLoading={isLoading}
            operatorData={operatorData}
            monthData={monthData}
            weekNumbers={weekNumbers}
            selectedCell={selectedCell}
          />
        </div>
      </div>
    </div>
  );
}

interface OperatorDataTableProps {
  isLoading: boolean;
  operatorData: any[];
  monthData: { [key: string]: string[] };
  weekNumbers: number[];
  selectedCell: string;
}

function OperatorDataTable({
  isLoading,
  operatorData,
  monthData,
  weekNumbers,
  selectedCell,
}: OperatorDataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-muted/50 [&>*]:!text-[11px] [&>*]:font-medium [&>*]:!h-4 [&>*]:!py-[1px] [&>*]:!px-3 [&>*]:text-muted-foreground">
          <TableHead>stockCode</TableHead>
          <TableHead>coutUnitaire</TableHead>
          <TableHead>process</TableHead>
          <TableHead>matiere</TableHead>

          {/* Dynamically generate columns for each month and its weeks */}
          {Object.entries(monthData).map(([month, weeks], monthIndex) => (
            <React.Fragment key={month}>
              {/* Generate columns for each week in this month */}
              {weeks.map((weekKey) => {
                const weekNum = parseInt(weekKey.replace("wk", ""));
                return (
                  <TableHead key={weekKey} className="text-center">
                    WK{weekNum}
                  </TableHead>
                );
              })}

              {/* Add the month total column */}
              <TableHead
                className={`text-center ${
                  monthIndex < Object.keys(monthData).length - 1
                    ? "border-l border-r"
                    : "border-l"
                } bg-yellow-50`}
              >
                Total {month.charAt(0).toUpperCase() + month.slice(1)}
              </TableHead>
            </React.Fragment>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell
              colSpan={4 + weekNumbers.length + Object.keys(monthData).length}
              className="text-center py-4"
            >
              Loading data...
            </TableCell>
          </TableRow>
        ) : operatorData.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={4 + weekNumbers.length + Object.keys(monthData).length}
              className="text-center py-4"
            >
              {selectedCell === "all"
                ? "Please select a cell to view data"
                : "No data available for the selected criteria"}
            </TableCell>
          </TableRow>
        ) : (
          operatorData.map((operator) => (
            <TableRow
              key={operator.stockCode}
              className="hover:bg-muted/50 [&>*]:!text-[11px] [&>*]:!h-4 [&>*]:!py-[1px] [&>*]:!px-3 [&>*]:text-muted-foreground"
            >
              <TableCell>{operator.stockCode}</TableCell>
              <TableCell>{operator.coutUnitaire}</TableCell>
              <TableCell>{operator.process.toFixed(2)}</TableCell>
              <TableCell>{operator.matiere.toFixed(2)}</TableCell>

              {/* Dynamically generate data cells for each month and its weeks */}
              {Object.entries(monthData).map(([month, weeks], monthIndex) => (
                <React.Fragment key={month}>
                  {/* Generate data cells for each week in this month */}
                  {weeks.map((weekKey) => {
                    const weekNum = parseInt(weekKey.replace("wk", ""));
                    return (
                      <TableCell
                        key={weekKey}
                        className="text-center font-mono"
                      >
                        {getWeekValue(operator.details, weekNum)}
                      </TableCell>
                    );
                  })}

                  {/* Add the month total cell */}
                  <TableCell
                    className={`text-center font-medium ${
                      monthIndex < Object.keys(monthData).length - 1
                        ? "border-l border-r"
                        : "border-l"
                    } bg-yellow-50`}
                  >
                    {getMonthTotal(operator.details, month)}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

// Helper function to get week value
function getWeekValue(details: any[], weekNumber: number) {
  const weekData = details.find((d) => d.semaine === weekNumber);
  if (!weekData) return "0.00 €";

  const value = parseFloat(weekData.couts.replace(",", "."));
  return `${value.toFixed(2)} €`;
}

// Helper function to get month total
function getMonthTotal(details: any[], monthName: string) {
  const monthData = details.find((d) => d.mois === monthName);
  if (!monthData) return "0.00 €";

  const total = parseFloat(monthData.total_mois.replace(",", "."));
  return `${total.toFixed(2)} €`;
}
