import { useMemo } from "react";

const rawData = [
  {
    name: "Smart Home",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -1200,
    revenue: 45600,
    utilization: 28,
  },
  {
    name: "Fitness Tech",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: 2500,
    revenue: 99600,
    utilization: 28,
  },
  {
    name: "Kids Forniture",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 12600,
    utilization: 28,
  },
  {
    name: "Musical Instruments",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 41600,
    utilization: 28,
  },
  {
    name: "Computer",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 600,
    utilization: 28,
  },

  {
    name: "Furniture",
    value: 28,
    defects: 156,
    duration: 12,
    damageCost: -12500,
    revenue: 19600,
    utilization: 28,
  },
  {
    name: "Clothing",
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
