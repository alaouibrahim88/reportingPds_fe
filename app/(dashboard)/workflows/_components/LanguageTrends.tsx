import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const trendData = [
  {
    language: "Python",
    growth: "+15.2%",
    status: "up",
    description: "Fastest growing in ML/AI",
  },
  {
    language: "Rust",
    growth: "+32.7%",
    status: "up",
    description: "Highest adoption rate",
  },
  {
    language: "Java",
    growth: "-2.1%",
    status: "down",
    description: "Enterprise stability",
  },
];

export function LanguageTrends() {
  return (
    <Card className="p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-lg">Language Trends</h3>
        <p className="text-sm text-muted-foreground">Monthly growth analysis</p>
      </div>

      <div className="space-y-4">
        {trendData.map((item) => (
          <div
            key={item.language}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.language}</span>
                <span
                  className={`text-sm px-2 py-0.5 rounded-full ${
                    item.status === "up"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {item.growth}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            {item.status === "up" ? (
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-500" />
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        View detailed report
        <ArrowRight className="w-4 h-4" />
      </button>
    </Card>
  );
}
