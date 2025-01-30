import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ZonePerformanceProps {
  data: any[];
  activeIndex: number;
  onZoneHover: (index: number) => void;
}

export function ZonePerformance({
  data,
  activeIndex,
  onZoneHover,
}: ZonePerformanceProps) {
  return (
    <Card className="h-full">
      <div className="p-2 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm">Zone Performance</h3>
          <Badge variant="outline" className="h-5 text-xs">
            {data.length} active zones
          </Badge>
        </div>
      </div>

      <div className="p-1">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="group px-2 py-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
            onMouseEnter={() => onZoneHover(index)}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <div className="flex items-center text-[10px] text-muted-foreground">
                  <span>{item.standardHours} standard hours</span>
                  <span className="mx-1">•</span>
                  <span className=" text-red-500/70 dark:text-red-400/70 font-medium">
                    {item.reelHours} reel Hours
                  </span>
                  <span className="mx-1">•</span>
                  <span className="  text-muted-foreground font-medium">
                    {item.reelTime} reel Time
                  </span>
                  <span className="mx-1">•</span>
                  <span className="text-[hsl(var(--primary))] font-medium">
                    {item.standardTime} standard Time
                  </span>

                  {/* <span className="mx-1">•</span> */}
                  {/* <span className="text-[hsl(var(--primary))] font-medium">
                    ${item.revenue?.toLocaleString() ?? 0}
                  </span> */}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{item.efficiency}%</p>

                <p className="text-[10px] text-muted-foreground">efficiency</p>
              </div>
            </div>

            <div className="w-full bg-muted/20 rounded-full h-1">
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (item.revenue / Math.max(...data.map((d) => d.revenue))) *
                    100
                  }%`,
                  backgroundColor: "hsl(var(--primary))",
                  opacity: activeIndex === index ? 1 : 0.7,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
