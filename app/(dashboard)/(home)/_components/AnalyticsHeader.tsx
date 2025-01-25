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
      </div>
    </div>
  );
}
