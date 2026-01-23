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

  const metrics = (data?.currWeekData ?? []).slice(0).map((item: weekData) => ({
    totalProcess: item.process,
    totalMatiere: item.matiere,
    totalProjet: item.projetEuro,
    totalSerie: item.serieEuro,
    criticialIssues: 3, //item.projetEuro,
  }))[0];

  return (
    <div className="bg-card rounded-lg shadow-sm p-2 sm:p-3">
     <div className="flex items-center justify-between gap-3 mb-3">
  <h3 className="text-sm font-semibold text-foreground">
    {"⚡️ Weekly Zone Activity "}
  </h3>
  <span className="text-xs text-primary">
    {/* {metrics.efficiency}% efficiency */}
    {/* lorem ipsum */}
  </span>
</div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <svg className="w-3 h-3" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Current Week  : </span>
        <Select defaultValue="1" onValueChange={onChange}>
          <SelectTrigger className="w-[98px] h-7 text-xs ml-2">
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">W-01</SelectItem>
            <SelectItem value="2">W-02</SelectItem>
            <SelectItem value="3">W-03</SelectItem>
            <SelectItem value="4">W-04</SelectItem>
            <SelectItem value="5">W-05</SelectItem>
            <SelectItem value="6">W-06</SelectItem>
            <SelectItem value="7">W-07</SelectItem>
            <SelectItem value="8">W-08</SelectItem>
            <SelectItem value="9">W-09</SelectItem>
            <SelectItem value="10">W-10</SelectItem>
            <SelectItem value="11">W-11</SelectItem>
            <SelectItem value="12">W-12</SelectItem>
            <SelectItem value="13">W-13</SelectItem>
            <SelectItem value="14">W-14</SelectItem>
            <SelectItem value="15">W-15</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Process</div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalProcess} 
            <span className="text-xs text-muted-foreground ml-1"> (Pcs)</span>
          </div>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground"> Total Matière</div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalMatiere} 
            <span className="text-xs text-muted-foreground ml-1"> (Pcs)</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Projet </div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalProjet} €
          </div>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Serie </div>
          <div className="text-sm font-medium text-foreground">
            {metrics?.totalSerie} €
          </div>
        </div>
      </div>

      {/* Zone List */}
      <div className="space-y-2">
        {zones?.map((zone) => (

          
     
          <div
         
            key={zone.name}
          
            className="flex items-center justify-between p-1.5 sm:p-2 bg-muted/50 rounded-lg" >

            <div className="flex items-center gap-1.5 sm:gap-2">
          
            <div 
            
            //className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs bg-orange-300"

            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs ${
              (() => {
                const letter = zone.name.charAt(0).toUpperCase();
                if ('H'.includes(letter)) return 'bg-red-400';
                if ('B'.includes(letter)) return 'bg-green-500';
                if ('G'.includes(letter)) return 'bg-blue-400';
                if ('N'.includes(letter)) return 'bg-orange-400';

                return 'bg-gray-400';
              })()
            }`}

             
             > {zone.name.charAt(0)}
             
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
