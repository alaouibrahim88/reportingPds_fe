import { ZoneDataType, MetricsType } from "./data/dashboardData";

interface ZoneActivityProps {
  data: ZoneDataType;
}

export function ZoneActivity({ data }: ZoneActivityProps) {
  const zones = [
    { name: "Java", count: data.zoneJava, color: "bg-purple-400" },
    { name: "Python", count: data.zonePython, color: "bg-orange-400" },
    { name: "Rust", count: data.zoneRust, color: "bg-blue-400" },
    { name: "Go", count: data.zoneGo, color: "bg-green-400" },
    { name: "Kotlin", count: data.zoneKotlin, color: "bg-red-400" },
  ];

  const metrics: MetricsType = data.metrics;

  return (
    <div className="bg-white rounded-lg shadow-sm p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">Weekly Zone Activity ⚡️</h3>
        <span className="text-xs text-green-600">
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
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Total Issues</div>
          <div className="text-sm font-medium">{metrics.totalIssues}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Resolved</div>
          <div className="text-sm font-medium">{metrics.resolvedIssues}</div>
        </div>
      </div>

      {/* Zone List */}
      <div className="space-y-2">
        {zones.map((zone) => (
          <div
            key={zone.name}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${zone.color}`}
              >
                {zone.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{zone.name}</span>
                <span className="text-xs text-muted-foreground">Count</span>
              </div>
            </div>
            <span
              className={`text-sm ${
                zone.count > 50
                  ? "text-red-600 font-semibold"
                  : zone.count > 25
                  ? "text-orange-500"
                  : zone.count > 10
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {zone.count}
            </span>
          </div>
        ))}
      </div>

      {/* Critical Issues */}
      {metrics.criticalIssues > 0 && (
        <div className="mt-3 p-2 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-xs text-red-600">
              {metrics.criticalIssues} Critical Issues
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
