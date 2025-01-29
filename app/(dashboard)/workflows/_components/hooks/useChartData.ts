import { useMemo } from "react";

const rawData = [
  {
    name: "Nets",
    value: 28,
    defects: 156,
    machines: 12,
    damageCost: -1200,
    revenue: 45600,
    utilization: 28,
  },
  {
    name: "java",
    value: 28,
    defects: 156,
    machines: 12,
    damageCost: 2500,
    revenue: 99600,
    utilization: 28,
  },
  {
    name: "EMS",
    value: 28,
    defects: 156,
    machines: 12,
    damageCost: -12500,
    revenue: 12600,
    utilization: 28,
  },
  {
    name: "JS",
    value: 28,
    defects: 156,
    machines: 12,
    damageCost: -12500,
    revenue: 41600,
    utilization: 28,
  },
  {
    name: "JS",
    value: 28,
    defects: 156,
    machines: 12,
    damageCost: -12500,
    revenue: 600,
    utilization: 28,
  },

  {
    name: "JS",
    value: 28,
    defects: 156,
    machines: 12,
    damageCost: -12500,
    revenue: 19600,
    utilization: 28,
  },

  // ... rest of the data
];

export function useChartData() {
  const metrics = useMemo(
    () => ({
      totalOPs: 1248,
      totalDefects: rawData.reduce((sum, zone) => sum + zone.defects, 0),
      activeCells: 847,
      cellsEfficiency: "+15.3%",
      totalMachines: rawData.reduce((sum, zone) => sum + zone.machines, 0),
      defectRate: "12.5%",
    }),
    []
  );

  return {
    data: rawData,
    metrics,
  };
}
