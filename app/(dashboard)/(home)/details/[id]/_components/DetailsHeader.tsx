import React from "react";
import { FolderIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface DetailsHeaderProps {
  viewMode: "price" | "qty";
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
  viewMode: "price" | "qty";
  setViewMode: (mode: "price" | "qty") => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  viewMode,
  setViewMode,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <>
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
          checked={viewMode === "qty"}
          onCheckedChange={(checked) => setViewMode(checked ? "qty" : "price")}
          className="data-[state=checked]:bg-primary"
        />
        <span className="text-xs font-medium text-muted-foreground">QTY</span>
      </div>
    </>
  );
};

DetailsHeader.Controls = Controls;

export default DetailsHeader;
