export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface DashboardMetric {
  title: string;
  value: number | string;
  change: number;
  trend: "up" | "down" | "neutral";
  description: string;
}

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TableFilterProps {
  onFilterChange?: (value: string) => void;
}
