export type Status = "alert" | "warning" | "good";

export interface ProductionIssue {
  id: string;
  time: string;
  machine: string;
  job: string;
  count: number;
  reason: string;
  message: string;
  type: "Scrap" | "Quality" | "Setup" | "Maintenance";
  status: Status;
  color: string;
  visibilityScore: number;
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
  value: string;
}

export interface StatusCardProps {
  status: Status;
}

export interface VisibilityScoreProps {
  score: number;
}
