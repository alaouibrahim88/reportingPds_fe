export type Status = "alert" | "warning" | "good";

export interface ProductionIssue {
  id: string;
  zone: string;
  periode: string;
  projet: string;
  serie: string;
  process: string;
  matiere: string;
  status: string;
  message?: string;
  assignee: string | null;
  type: Array<{ name: string; count: number }>;
  department: string;
  color?: string;
  visibilityScore?: number;
  priority?: string;
}

export interface ZoneColor {
  color: string;
  letter: string;
}

export interface ZoneColors {
  [key: string]: ZoneColor;
}

export interface TableContentProps {
  data: ProductionIssue[];
  openRows: number[];
  toggleRow: (index: number) => void;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export interface ExpandedRowDetailsProps {
  item: ProductionIssue;
}

export interface InfoCardProps {
  label: string;
  value: string | { name: string; count: number }[];
}

export interface StatusCardProps {
  status: Status;
}

export interface VisibilityScoreProps {
  score: number;
}
