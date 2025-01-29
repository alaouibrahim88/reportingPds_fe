import { useMemo } from "react";

const rawData = [
  {
    name: "Zone 1",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -1200,
    revenue: 45600,
    utilization: 28,
  },
  {
    name: "Zone 2",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: 2500,
    revenue: 99600,
    utilization: 28,
  },
  {
    name: "Zone 3",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 12600,
    utilization: 28,
  },
  {
    name: "Zone 4",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 41600,
    utilization: 28,
  },
  {
    name: "Zone 5",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 600,
    utilization: 28,
  },

  {
    name: "Zone 6",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 19600,
    utilization: 28,
  },
  {
    name: "Zone 7",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 19600,
    utilization: 28,
  },
];

export function useChartData() {
  const metrics = useMemo(
    () => ({
      totalOPs: 1248,
      totalDefects: rawData.reduce((sum, zone) => sum + zone.defects, 0),
      activeCells: 847,
      cellsEfficiency: "+15.3%",
      totalMachines: rawData.reduce((sum, zone) => sum + zone.duration, 0),
      defectRate: "12.5%",
    }),
    []
  );

  return {
    data: rawData,
    metrics,
  };
}
