import { Dispatch, SetStateAction } from "react";
import { ZoneDataType, weekData } from "./data/dashboardData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zoneBarChartColors } from "@/constants/zoneBarChartColors";

interface ZoneActivityProps {
  week: number;
  data: ZoneDataType | undefined;
  onChange: any;
}

export function ZoneActivity({ week, data, onChange }: ZoneActivityProps) {
  const zones = data?.currWeekData
    ?.slice(1)
    .map((item: weekData) => ({
      name: item.libelle,
      count: item.qteParZone,
      color: zoneBarChartColors[item.libelle]
    }));

  const metrics = data?.currWeekData.slice(0).map((item: weekData) => ({
    totalProcess: item.process,
    totalMatiere: item.matiere,
    totalProjet: item.projetEuro,
    totalSerie: item.serieEuro,
    criticialIssues: 3, //item.projetEuro,
  }))[0];

  return (
    <div className="bg-card rounded-lg shadow-sm p-2 sm:p-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
        <h3 className="text-sm font-semibold text-foreground w-64">
          {/* Weekly Zone Activity ⚡️ */}
        </h3>
        <span className="text-xs text-primary w-full">
          {/* {metrics.efficiency}% efficiency */}
          {/* lerem epsum */}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <svg className="w-3 h-3" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Current Week:</span>
        <Select defaultValue={week.toString()} onValueChange={onChange}>
          <SelectTrigger className="w-[80px] h-7 text-xs">
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="28">W-28</SelectItem>
            <SelectItem value="29">W-29</SelectItem>
            <SelectItem value="30">W-30</SelectItem>
            <SelectItem value="31">W-31</SelectItem>
            <SelectItem value="32">W-32</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Process</div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalProcess}
          </div>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground"> Total Matière</div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalMatiere}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Projet </div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalProjet}
          </div>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Serie </div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalSerie}
          </div>
        </div>
      </div>

      {/* Zone List */}
      <div className="space-y-2">
        {zones?.map((zone) => (
          <div
            key={zone.name}
            className="flex items-center justify-between p-1.5 sm:p-2 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs ${zone.color}`}
              >
                {zone.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-foreground">
                  {zone.name}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  Count
                </span>
              </div>
            </div>
            <span
              className={`text-xs sm:text-sm ${
                zone.count > 50
                  ? "text-red-500"
                  : zone.count > 25
                  ? "text-orange-500"
                  : zone.count > 10
                  ? "text-green-500"
                  : "text-blue-500"
              }`}
            >
              {zone.count}
            </span>
          </div>
        ))}
      </div>

      {/* Critical Issues */}
      {metrics?.criticialIssues && metrics?.criticialIssues > 0 && (
        <div className="mt-3 p-1.5 sm:p-2 bg-destructive/10 rounded-lg">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive"></div>
            <span className="text-xs text-destructive">
              {metrics?.criticialIssues} Critical Issues
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
