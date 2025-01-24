interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
}

export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  );
}
