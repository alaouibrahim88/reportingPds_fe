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
                  <span>{item.machines} machines</span>
                  <span className="mx-1">•</span>
                  <span className="text-rose-500 font-medium">
                    {item.defects} defects
                  </span>
                  <span className="mx-1">•</span>
                  <span className="text-emerald-500 font-medium">
                    ${item.revenue?.toLocaleString() ?? 0}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{item.value}%</p>
                <p className="text-[10px] text-muted-foreground">Utilization</p>
              </div>
            </div>

            <div className="w-full bg-muted/20 rounded-full h-1">
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: "#8B5CF6",
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
