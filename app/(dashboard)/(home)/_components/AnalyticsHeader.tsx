interface Stat {
  title: string;
  sales: string;
  quantity: string;
  previousSales: string;
  period: string;
}

interface AnalyticsHeaderProps {
  stats: Stat[];
}

export function AnalyticsHeader({ stats }: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group bg-card hover:bg-accent/50 transition-all duration-200 rounded-lg shadow-sm hover:shadow p-3 border border-border/50 hover:border-border flex-1 min-w-[200px]"
        >
          <div className="flex flex-col space-y-0.5">
            <h3 className="text-xs text-muted-foreground">{stat.title}</h3>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-semibold tracking-tight">
                  {stat.sales} MAD
                </span>
                <span
                  className={`text-xs font-medium ${
                    Number(stat.sales) > Number(stat.previousSales)
                      ? "text-emerald-500/70 dark:text-emerald-400/70"
                      : "text-red-500/70 dark:text-red-400/70"
                  }`}
                >
                  {(
                    ((Number(stat.sales) - Number(stat.previousSales)) /
                      Number(stat.previousSales)) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Compare from previous period
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
