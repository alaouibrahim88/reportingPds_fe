import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, ChartPie, Sparkles } from "lucide-react";

export function ChartHeader() {
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
        <Select defaultValue="30">
          <SelectTrigger className="w-[140px]">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
