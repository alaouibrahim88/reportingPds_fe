import { ZoneDataType } from "./data/workflowData";

interface ZoneActivityProps {
  data: ZoneDataType;
}

export function ZoneActivity({ data }: ZoneActivityProps) {
  const zones = [
    { name: "Java", count: data.zoneJava, color: "bg-violet-400" },
    { name: "Python", count: data.zonePython, color: "bg-orange-300" },
    { name: "Rust", count: data.zoneRust, color: "bg-blue-400" },
    { name: "Go", count: data.zoneGo, color: "bg-emerald-400" },
    { name: "Kotlin", count: data.zoneKotlin, color: "bg-rose-300" },
  ];

  const metrics = data.metrics;

  return (
    <div className="bg-card rounded-lg shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-foreground">
          Weekly Workflow Activity ⚡️
        </h3>
        <span className="text-xs text-primary">
          {metrics.efficiency}% efficiency
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
        <svg className="w-3 h-3" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Current Week: W-30</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-muted p-2 rounded-lg">
          <span className="text-xs text-muted-foreground">Throughput</span>
          <p className="text-sm font-medium">{metrics.throughput}</p>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <span className="text-xs text-muted-foreground">Latency</span>
          <p className="text-sm font-medium">{metrics.latency}</p>
        </div>
      </div>

      <div className="space-y-3">
        {zones.map((zone) => (
          <div
            key={zone.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${zone.color}`} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {zone.name}
                </span>
                <span className="text-xs text-muted-foreground">Count</span>
              </div>
            </div>
            <span
              className={`text-sm ${
                zone.count > 300
                  ? "text-red-500"
                  : zone.count > 200
                  ? "text-orange-500"
                  : zone.count > 100
                  ? "text-green-500"
                  : "text-blue-500"
              }`}
            >
              {zone.count}
            </span>
          </div>
        ))}
      </div>

      {metrics.criticalIssues > 0 && (
        <div className="mt-3 p-2 bg-destructive/10 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive"></div>
            <span className="text-xs text-destructive">
              {metrics.criticalIssues} Critical Issues
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
