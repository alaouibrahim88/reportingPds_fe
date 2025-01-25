import { Button } from "@/components/ui/button";
import { TableFilter } from "./TableFilter";

export function AnalyticsHeader() {
  return (
    <div className="bg-card rounded-lg shadow-sm p-4 mb-3 border border-border">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button className="text-foreground font-medium">
            Product Analytics
          </button>
          <button className="text-muted-foreground">Tag Analytics</button>
        </div>
        <div className="flex items-center gap-2">
          <TableFilter />
          <Button variant="outline" className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
