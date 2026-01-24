import { useState } from "react";
import React from "react";
import { FolderIcon } from "lucide-react";
import { FaFileExcel, FaSearch } from 'react-icons/fa';
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { exportToExcel } from "@/utils/excel";

interface DetailsHeaderProps {
  viewMode: "price" | "Qty";
}

const DetailsHeader: React.FC<DetailsHeaderProps> & {
  Controls: React.FC<ControlsProps>;
} = ({ viewMode }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <FolderIcon className="w-4 h-4 text-primary" />
        <h2 className="font-medium text-sm">Zone Details</h2>
      </div>
      <p className="text-xs text-muted-foreground">
        Details for 3 last months per{" "}
        <strong>{viewMode === "price" ? "Price" : "Quantity"}</strong>
      </p>
    </div>
  );
};

interface ControlsProps {
  viewMode: "price" | "Qty";
  setViewMode: (mode: "price" | "Qty") => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: string;  
  selectedCell: string;  
  setSelectedCell: (cell: string) => void;
  setSelectedMonth: (month: string) => void;
}

const handleExport = (data: any) => {
  exportToExcel(data, "zoneDetail.xlsx");
};

const Controls: React.FC<ControlsProps> = ({
  viewMode,
  setViewMode,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  selectedCell,
  setSelectedCell,
  setSelectedMonth,
}) => {
  return (
    <>
      <div className="relative w-[180px]">
        <input
        type="text"
       // value={selectedCell}
        value=''
        onChange={(e) => setSelectedCell(e.target.value)}
        placeholder="        Recherche Cellule..."
        className="w-[180px] h-8 text-xs bg-gray-60 border border-gray-200 rounded-md"
        />
        <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 scale-75" />
     </div>

      {/* Year Selector */}
      <Select
        value={selectedYear.toString()}
        onValueChange={(value) => setSelectedYear(parseInt(value))}
      >
        <SelectTrigger className="w-[100px] h-8 text-xs">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2023" className="text-xs">
            2023
          </SelectItem>
          <SelectItem value="2024" className="text-xs">
            2024
          </SelectItem>
          <SelectItem value="2025" className="text-xs">
            2025
          </SelectItem>
          <SelectItem value="2026" className="text-xs">
            2026
          </SelectItem>
          <SelectItem value="2027" className="text-xs">
            2027
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Month Selector */}
      <Select
        value={selectedMonth} 
        onValueChange={(value) => setSelectedMonth(value)}
      >
        <SelectTrigger className="w-[120px] h-8 text-xs">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <SelectItem
              key={month}
              value={month.toString()}
              className="text-xs"
            >
              {new Date(2000, month - 1, 1).toLocaleString("default", {
                month: "long",
              })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* View Mode Switch */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg border bg-muted/30">
        <span className="text-xs font-medium text-muted-foreground">Price</span>
        <Switch
          checked={viewMode === "Qty"}
          onCheckedChange={(checked) => setViewMode(checked ? "Qty" : "price")}
          className="data-[state=checked]:bg-primary"
        />
        <span className="text-xs font-medium text-muted-foreground">QTY</span>
      </div>
    </>
  );
};

DetailsHeader.Controls = Controls;

export default DetailsHeader;
