import { ProductionIssue } from "../types/table-types";

export const productionIssuesData: ProductionIssue[] = [
  {
    time: "2024-01-15 06:00:00 AM",
    machine: "CITIZEN 19",
    job: "349455|26",
    count: 18,
    reason: "Tool Change / Offset Scrap",
    message: "parts were not put in last night",
    type: "Scrap",
    status: "warning",
    color: "bg-yellow-500",
    visibilityScore: 95,
  },
  {
    time: "2024-01-15 08:30:00 AM",
    machine: "CITIZEN 23",
    job: "349487|12",
    count: 25,
    reason: "Material Quality Issue",
    message: "material hardness out of spec",
    type: "Quality",
    status: "alert",
    color: "bg-red-500",
    visibilityScore: 98,
  },
  {
    time: "2024-01-15 09:15:00 AM",
    machine: "CITIZEN 15",
    job: "349462|08",
    count: 12,
    reason: "Setup Adjustment",
    message: "diameter running oversized",
    type: "Setup",
    status: "warning",
    color: "bg-blue-500",
    visibilityScore: 85,
  },
  {
    time: "2024-01-15 10:45:00 AM",
    machine: "CITIZEN 31",
    job: "349490|15",
    count: 8,
    reason: "Machine Maintenance",
    message: "coolant pressure low",
    type: "Maintenance",
    status: "warning",
    color: "bg-yellow-500",
    visibilityScore: 90,
  },
  {
    time: "2024-01-15 11:30:00 AM",
    machine: "CITIZEN 27",
    job: "349475|19",
    count: 15,
    reason: "Tool Breakage",
    message: "insert chipped on turning tool",
    type: "Scrap",
    status: "alert",
    color: "bg-red-500",
    visibilityScore: 97,
  },
];

export const zoneColors = {
  Java: {
    color: "hsl(var(--violet-500))",
    letter: "J",
  },
  Python: {
    color: "hsl(var(--orange-500))",
    letter: "P",
  },
  Rust: {
    color: "hsl(var(--blue-500))",
    letter: "R",
  },
  Go: {
    color: "hsl(var(--emerald-500))",
    letter: "G",
  },
  Kotlin: {
    color: "hsl(var(--rose-500))",
    letter: "K",
  },
};
