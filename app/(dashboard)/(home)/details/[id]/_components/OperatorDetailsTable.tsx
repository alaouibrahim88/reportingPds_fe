import React from "react";
import { Users2 } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
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
import { exportToExcel } from "@/utils/excel";
import { Cell, Zone } from "@/types";

interface OperatorDetailsTableProps {
  selectedZone: string;  
  selectedCell: string; 
  allZones: Zone[],
  allCells: Cell[],
  setSelectedZone: (zone: string) => void;
  setSelectedCell: (cell: string) => void;
  isLoading: boolean;
  operatorData: any[];
  monthData: { [key: string]: string[] },
  weekNumbers: Number[]
}

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
  weekNumbers
}: OperatorDetailsTableProps) {
  const handleExport = () => {
    exportToExcel(operatorData, "CodeArticleDetails.xlsx");
  };

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4 bg-muted/30">
        <div className="flex items-center gap-2">
          <Users2 className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm">Code Article Details</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-[80px]">
            <button
              className="mt-0 flex items-center justify-center space-x-2 w-[70px] h-6  text-sm bg-green-600 text-white rounded-md hover:bg-green-500 border border-gray-200"
              onClick={handleExport}
            >
              <FaFileExcel className="text-white-800" />
              <span className="text-white hover:text-white 300 text-xs">
                Export
              </span>
            </button>
          </div>

          <div className="relative w-[180px]">
            <input
              type="text"
              value={''}
              onChange={() => {''}}
              placeholder="        Recherche Article..."
              className="w-[180px] h-8 text-xs bg-gray-60 border border-gray-200 rounded-md"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 scale-75" />
          </div>

          <Select value={selectedZone} onValueChange={setSelectedZone}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select Zone" />
            </SelectTrigger>
            <SelectContent>
              {allZones?.map((zone) => (
                <SelectItem
                  key={zone.id}
                  value={zone.libelle}
                  className="text-xs"
                  aria-selected={selectedZone === zone.libelle}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {zone.libelle}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCell} onValueChange={setSelectedCell}>
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="Select Cell" />
            </SelectTrigger>
            <SelectContent>
              {allCells.map((cell) => (
                <SelectItem
                  key={cell.id}
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
  weekNumbers: Number[];
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
          <TableHead>Code Article</TableHead>
          <TableHead>C.Unitaire</TableHead>
          <TableHead>Process</TableHead>
          <TableHead>Matière</TableHead>

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
  return `${value.toFixed(1)}`;
}

// Helper function to get month total
function getMonthTotal(details: any[], monthName: string) {
  const monthData = details.find((d) => d.mois === monthName);
  if (!monthData) return "00 €";

  const total = parseFloat(monthData.total_mois.replace(",", "."));
  return `${total.toFixed(0)} €`;
}
