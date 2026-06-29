import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableFilterProps } from "./types/dashboard-types";
import { exportToExcel } from "@/utils/excel";
import { FaFileExcel } from "react-icons/fa";

export function TableFilter({ data,filters ,onFilterChange }: TableFilterProps) {
  const currentYear = new Date().getFullYear();
  const emptyMonthValue = "all";
  const selectedMonth = filters.month === "" ? emptyMonthValue : filters.month.toString();
  const yearOptions = Array.from({ length: 6 }, (_, index) => currentYear - 4 + index);

  const handleFilterChange = (type: string, value: string): void => {
    if (onFilterChange){
      onFilterChange(type,value);
    }
  };

  const handleYearChange = (value: string): void => {
    handleFilterChange("year", value);
    handleFilterChange("month", "");
  };

  const handleExport = () => {
    exportToExcel(data, "detailsParZone.xlsx");
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input
            placeholder="Search..."
            onChange={(val) => handleFilterChange("query", val.target.value)}
            className="w-[200px]"
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[400px] absolute top-0 h-full border-l"
              style={{ position: "absolute", bottom: "auto" }}
            >
              <SheetHeader>
                <SheetTitle>Filter +{filters.year}+ Options</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select
                      value={filters.year.toString()}
                      onValueChange={handleYearChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Month</label>
                    <Select
                      value={selectedMonth}
                      onValueChange={(val) =>
                        handleFilterChange(
                          "month",
                          val === emptyMonthValue ? "" : val
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={emptyMonthValue} textValue="Full year">
                          Full year
                        </SelectItem>
                        <SelectItem value="1">January</SelectItem>
                        <SelectItem value="2">February</SelectItem>
                        <SelectItem value="3">March</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">May</SelectItem>
                        <SelectItem value="6">June</SelectItem>
                        <SelectItem value="7">July</SelectItem>
                        <SelectItem value="8">August</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="button" className="w-full sm:w-auto">
                    Confirm
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
