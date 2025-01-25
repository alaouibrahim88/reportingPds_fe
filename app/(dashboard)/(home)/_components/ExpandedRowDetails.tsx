import { cn } from "@/lib/utils";
import {
  ExpandedRowDetailsProps,
  InfoCardProps,
  StatusCardProps,
} from "./types/table-types";
import { zoneColors } from "./data/production-issues";

export function ExpandedRowDetails({ item }: ExpandedRowDetailsProps) {
  return (
    <div className="bg-muted/50 dark:bg-muted/5 border-l-2 border-primary">
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

function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="bg-card dark:bg-card/50 rounded-lg p-3 border border-border/40">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="font-medium text-foreground">{value}</p>
    </div>
  );
}

const STATUS_STYLES = {
  alert: {
    container: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
    dot: "bg-red-500 animate-pulse",
  },
  warning: {
    container:
      "bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20",
    dot: "bg-yellow-500",
  },
  good: {
    container: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
    dot: "bg-green-500",
  },
  default: {
    container: "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20",
    dot: "bg-gray-500",
  },
} as const;

function StatusCard({ status }: StatusCardProps) {
  const statusStyle =
    STATUS_STYLES[status as keyof typeof STATUS_STYLES] ||
    STATUS_STYLES.default;

  return (
    <div className="bg-card dark:bg-card/50 rounded-lg p-3 border border-border/40">
      <p className="text-sm text-muted-foreground mb-1">Status</p>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium",
            statusStyle.container
          )}
        >
          <div className={cn("h-1.5 w-1.5 rounded-full", statusStyle.dot)} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}
