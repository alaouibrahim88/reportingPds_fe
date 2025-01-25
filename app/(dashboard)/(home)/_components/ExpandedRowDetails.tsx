import { cn } from "@/lib/utils";
import { ProductionIssue } from "./types/table-types";
import { zoneColors } from "./data/production-issues";

interface ExpandedRowDetailsProps {
  item: ProductionIssue;
}

export function ExpandedRowDetails({ item }: ExpandedRowDetailsProps) {
  return (
    <div
      className="bg-muted/50 dark:bg-muted/5 border-l-2"
      style={{ borderColor: zoneColors.Java.color }}
    >
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoCard label="Type" value={item.type} />
          <InfoCard label="Message" value={item.message} />
          <InfoCard label="Job Details" value={item.job} />
          <StatusCard status={item.status} />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card dark:bg-card/50 rounded-lg p-3 border border-border/40">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}

function StatusCard({ status }: { status: ProductionIssue["status"] }) {
  return (
    <div className="bg-card dark:bg-card/50 rounded-lg p-3 border border-border/40">
      <p className="text-sm text-muted-foreground mb-1">Status</p>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium",
            {
              "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20":
                status === "alert",
              "bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20":
                status === "warning",
              "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20":
                status === "good",
            }
          )}
        >
          <div
            className={cn("h-1.5 w-1.5 rounded-full", {
              "bg-red-500 animate-pulse": status === "alert",
              "bg-yellow-500": status === "warning",
              "bg-green-500": status === "good",
            })}
          />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}
