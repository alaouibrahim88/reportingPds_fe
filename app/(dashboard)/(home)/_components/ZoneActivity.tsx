import { ZoneDataType, MetricsType } from "./data/dashboardData";

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

  const metrics: MetricsType = data.metrics;

  return (
    <div className="bg-card rounded-lg shadow-sm p-2 sm:p-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
        <h3 className="text-sm font-semibold text-foreground">
          Weekly Zone Activity ⚡️
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Issues</div>
          <div className="text-sm font-medium text-foreground">
            {metrics.totalIssues}
          </div>
        </div>
        <div className="bg-muted p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Resolved</div>
          <div className="text-sm font-medium text-foreground">
            {metrics.resolvedIssues}
          </div>
        </div>
      </div>

      {/* Zone List */}
      <div className="space-y-2">
        {zones.map((zone) => (
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
      {metrics.criticalIssues > 0 && (
        <div className="mt-3 p-1.5 sm:p-2 bg-destructive/10 rounded-lg">
          <div className="flex items-center gap-1.5 sm:gap-2">
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
