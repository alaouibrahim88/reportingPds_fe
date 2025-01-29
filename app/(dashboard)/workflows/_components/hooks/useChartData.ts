import { useMemo } from "react";

const rawData = [
  {
    // Wrapping: "#8E98F5", // Red base color
    // Nets: "#7874F2", // Lightest purple
    // Boot: "#8B7BF9", // Light-medium purple
    // Knitting: "#8B6CF8", // Medium purple
    // Injection: "#8B5CF6", // Darkest purple

    name: "Wrapping",
    value: 28,
    reelHours: 9,
    standardHours: 8,
    damageCost: -1200,
    revenue: 45600,
    efficiency: 90,
    reelTime: 12,
    standardTime: 8,
    utilization: 28,
    defects: 116,
    duration: 12,
  },
  {
    name: "Nets",
    value: 28,
    reelHours: 22,
    standardHours: 8,
    duration: 12,
    damageCost: 2500,
    revenue: 99600,
    efficiency: 15,
    reelTime: 12,
    standardTime: 8,
    utilization: 28,
    defects: 173,
  },
  {
    // Wrapping: "#8E98F5", // Red base color
    // Nets: "#7874F2", // Lightest purple
    // Boot: "#8B7BF9", // Light-medium purple
    // Knitting: "#8B6CF8", // Medium purple
    // Injection: "#8B5CF6", // Darkest purple
    name: "Sunvisors",
    value: 28,
    reelHours: 12,
    standardHours: 8,
    damageCost: -12500,
    revenue: 12600,
    efficiency: 20,
    reelTime: 12,
    standardTime: 8,
    utilization: 28,
    defects: 32,
    duration: 23,
  },
  {
    name: "Knitting",
    value: 28,
    reelHours: 7,
    standardHours: 8,
    damageCost: -12500,
    revenue: 41600,
    efficiency: 100,
    reelTime: 12,
    standardTime: 8,
    utilization: 28,
    defects: 190,
    duration: 20,
  },
  {
    name: "Injection",
    value: 28,
    reelHours: 10,
    standardHours: 8,
    damageCost: -12500,
    revenue: 600,
    efficiency: 80,
    reelTime: 10,
    standardTime: 8,
    utilization: 28,
    defects: 156,
    duration: 12,
  },

  {
    name: "RW Nets",
    value: 28,
    reelHours: 2,
    standardHours: 8,
    damageCost: -12500,
    revenue: 19600,
    efficiency: 90,
    reelTime: 6,
    standardTime: 8,
    utilization: 28,
    defects: 16,
    duration: 11,
  },
  {
    name: "RW Boot",
    value: 28,
    reelHours: 7,
    standardHours: 8,
    damageCost: -12500,
    revenue: 19600,
    efficiency: 36,
    reelTime: 10,
    standardTime: 8,
    utilization: 28,
    defects: 180,
    duration: 2,
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
