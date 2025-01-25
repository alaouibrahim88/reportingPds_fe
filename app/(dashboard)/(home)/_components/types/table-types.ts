export interface ProductionIssue {
  time: string;
  machine: string;
  job: string;
  count: number;
  reason: string;
  message: string;
  type: string;
  status: "alert" | "warning" | "good";
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
