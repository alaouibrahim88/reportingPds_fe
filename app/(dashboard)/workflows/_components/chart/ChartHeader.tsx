import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartPie, Sparkles } from "lucide-react";

interface ChartHeaderProps {
  selectedYear: number;
  selectedMonth?: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month?: number) => void;
}

export function ChartHeader({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: ChartHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <ChartPie className="w-4 h-4 text-primary" />
          <h2 className="font-medium">Sales Analytics</h2>
          <Badge variant="secondary" className="h-6">
            <Sparkles className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Real-time production and defect monitoring
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select 
          value={selectedYear.toString()} 
          onValueChange={(value) => onYearChange(parseInt(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2027">2027</SelectItem>
            <SelectItem value="2028">2028</SelectItem>
            <SelectItem value="2029">2029</SelectItem>
            <SelectItem value="2030">2030</SelectItem>
          </SelectContent>
        </Select>
        <Select 
          value={selectedMonth?.toString() || "all"} 
          onValueChange={(value) => onMonthChange(value === "all" ? undefined : parseInt(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Months</SelectItem>
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
  );
}
