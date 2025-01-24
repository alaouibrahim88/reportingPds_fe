export const colors = {
  zoneJava: "#8E98F5", // Red base color
  zonePython: "#7874F2", // Lightest purple
  zoneRust: "#8B7BF9", // Light-medium purple
  zoneGo: "#8B6CF8", // Medium purple
  zoneKotlin: "#8B5CF6", // Darkest purple
};

export const dashboardData = {
  stats: {
    unassigned: 14,
    inProgress: 21,
    completed: 3,
  },
  zoneData: [
    {
      name: "W-30",
      zoneJava: 612,
      zonePython: 0,
      zoneRust: 4,
      zoneGo: 295,
      zoneKotlin: 27,
      details: [
        {
          time: "2024-01-15 06:00:00 AM",
          machine: "CITIZEN 19",
          job: "349455|26",
          count: 18,
          reason: "Tool Change / Offset Scrap",
          message: "parts were not put in last night",
          status: "unassigned",
          priority: "high",
          assignee: null,
          department: "Manufacturing",
        },
        {
          time: "2024-01-15 10:19:43 AM",
          machine: "CITIZEN 36",
          job: "31003887-05|6",
          count: 9,
          reason: "Dimensional",
          message: "Boring bar chipped",
          status: "in_progress",
          priority: "medium",
          assignee: "Alex Smith",
          department: "Quality Control",
        },
        {
          time: "2024-01-15 11:30:32 PM",
          machine: "CITIZEN 20",
          job: "600213-2|15",
          count: 18,
          reason: "Dimensional",
          message: "Step on .4835 diameter",
          status: "completed",
          priority: "low",
          assignee: "Sam Lee",
          department: "Manufacturing",
        },
      ],
      metrics: {
        totalIssues: 45,
        resolvedIssues: 32,
        averageResolutionTime: "4.5h",
        criticalIssues: 3,
        efficiency: 89.5,
        downtime: "2.3h",
      },
      machines: [
        {
          id: "CITIZEN 19",
          status: "operational",
          uptime: "98.2%",
          lastMaintenance: "2024-01-10",
          nextMaintenance: "2024-02-10",
        },
        {
          id: "CITIZEN 36",
          status: "maintenance",
          uptime: "92.5%",
          lastMaintenance: "2024-01-05",
          nextMaintenance: "2024-02-05",
        },
        {
          id: "CITIZEN 20",
          status: "error",
          uptime: "85.7%",
          lastMaintenance: "2024-01-01",
          nextMaintenance: "2024-02-01",
        },
      ],
    },
    // ... rest of existing data ...
  ],
  chartData: [
    {
      name: "W-30",
      zoneJava: { value: 612, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 295, color: colors.zoneGo },
      zoneKotlin: { value: 27, color: colors.zoneKotlin },
    },
    {
      name: "W-29",
      zoneJava: { value: 587, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 283, color: colors.zoneGo },
      zoneKotlin: { value: 24, color: colors.zoneKotlin },
    },
    {
      name: "W-28",
      zoneJava: { value: 634, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 5, color: colors.zoneRust },
      zoneGo: { value: 301, color: colors.zoneGo },
      zoneKotlin: { value: 29, color: colors.zoneKotlin },
    },
    {
      name: "W-27",
      zoneJava: { value: 592, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 2, color: colors.zoneRust },
      zoneGo: { value: 267, color: colors.zoneGo },
      zoneKotlin: { value: 23, color: colors.zoneKotlin },
    },
    {
      name: "W-26",
      zoneJava: { value: 605, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 289, color: colors.zoneGo },
      zoneKotlin: { value: 26, color: colors.zoneKotlin },
    },
    {
      name: "W-25",
      zoneJava: { value: 597, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 276, color: colors.zoneGo },
      zoneKotlin: { value: 25, color: colors.zoneKotlin },
    },
    {
      name: "W-24",
      zoneJava: { value: 628, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 315, color: colors.zoneGo },
      zoneKotlin: { value: 28, color: colors.zoneKotlin },
    },
    {
      name: "W-23",
      zoneJava: { value: 608, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 292, color: colors.zoneGo },
      zoneKotlin: { value: 26, color: colors.zoneKotlin },
    },
    {
      name: "W-22",
      zoneJava: { value: 601, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 287, color: colors.zoneGo },
      zoneKotlin: { value: 24, color: colors.zoneKotlin },
    },
    {
      name: "W-21",
      zoneJava: { value: 615, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 298, color: colors.zoneGo },
      zoneKotlin: { value: 27, color: colors.zoneKotlin },
    },
    {
      name: "W-20",
      zoneJava: { value: 594, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 279, color: colors.zoneGo },
      zoneKotlin: { value: 25, color: colors.zoneKotlin },
    },
    {
      name: "W-19",
      zoneJava: { value: 623, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 306, color: colors.zoneGo },
      zoneKotlin: { value: 29, color: colors.zoneKotlin },
    },
    {
      name: "W-18",
      zoneJava: { value: 603, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 284, color: colors.zoneGo },
      zoneKotlin: { value: 26, color: colors.zoneKotlin },
    },
    {
      name: "W-17",
      zoneJava: { value: 611, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 293, color: colors.zoneGo },
      zoneKotlin: { value: 27, color: colors.zoneKotlin },
    },
    {
      name: "W-16",
      zoneJava: { value: 596, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 281, color: colors.zoneGo },
      zoneKotlin: { value: 24, color: colors.zoneKotlin },
    },
    {
      name: "W-15",
      zoneJava: { value: 627, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 309, color: colors.zoneGo },
      zoneKotlin: { value: 28, color: colors.zoneKotlin },
    },
    {
      name: "W-14",
      zoneJava: { value: 604, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 288, color: colors.zoneGo },
      zoneKotlin: { value: 26, color: colors.zoneKotlin },
    },
    {
      name: "W-13",
      zoneJava: { value: 614, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 296, color: colors.zoneGo },
      zoneKotlin: { value: 27, color: colors.zoneKotlin },
    },
    {
      name: "W-12",
      zoneJava: { value: 599, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 285, color: colors.zoneGo },
      zoneKotlin: { value: 25, color: colors.zoneKotlin },
    },
    {
      name: "W-11",
      zoneJava: { value: 602, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 282, color: colors.zoneGo },
      zoneKotlin: { value: 26, color: colors.zoneKotlin },
    },
    {
      name: "W-10",
      zoneJava: { value: 598, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 278, color: colors.zoneGo },
      zoneKotlin: { value: 25, color: colors.zoneKotlin },
    },
    {
      name: "W-9",
      zoneJava: { value: 621, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 312, color: colors.zoneGo },
      zoneKotlin: { value: 28, color: colors.zoneKotlin },
    },
    {
      name: "W-8",
      zoneJava: { value: 589, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 265, color: colors.zoneGo },
      zoneKotlin: { value: 22, color: colors.zoneKotlin },
    },
    {
      name: "W-7",
      zoneJava: { value: 664, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 2, color: colors.zoneRust },
      zoneGo: { value: 241, color: colors.zoneGo },
      zoneKotlin: { value: 30, color: colors.zoneKotlin },
    },
    {
      name: "W-6",
      zoneJava: { value: 462, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 3, color: colors.zoneRust },
      zoneGo: { value: 143, color: colors.zoneGo },
      zoneKotlin: { value: 15, color: colors.zoneKotlin },
    },
    {
      name: "W-5",
      zoneJava: { value: 531, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 2, color: colors.zoneRust },
      zoneGo: { value: 359, color: colors.zoneGo },
      zoneKotlin: { value: 12, color: colors.zoneKotlin },
    },
    {
      name: "W-4",
      zoneJava: { value: 624, color: colors.zoneJava },
      zonePython: { value: 0, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 357, color: colors.zoneGo },
      zoneKotlin: { value: 17, color: colors.zoneKotlin },
    },
    {
      name: "W-3",
      zoneJava: { value: 743, color: colors.zoneJava },
      zonePython: { value: 2, color: colors.zonePython },
      zoneRust: { value: 4, color: colors.zoneRust },
      zoneGo: { value: 386, color: colors.zoneGo },
      zoneKotlin: { value: 18, color: colors.zoneKotlin },
    },
    {
      name: "W-2",
      zoneJava: { value: 514, color: colors.zoneJava },
      zonePython: { value: 3, color: colors.zonePython },
      zoneRust: { value: 0, color: colors.zoneRust },
      zoneGo: { value: 139, color: colors.zoneGo },
      zoneKotlin: { value: 54, color: colors.zoneKotlin },
    },
    {
      name: "W-1",
      zoneJava: { value: 492, color: colors.zoneJava },
      zonePython: { value: 32, color: colors.zonePython },
      zoneRust: { value: 2, color: colors.zoneRust },
      zoneGo: { value: 87, color: colors.zoneGo },
      zoneKotlin: { value: 31, color: colors.zoneKotlin },
    },
  ],
};

export type ZoneDataType = (typeof dashboardData.zoneData)[0];
export type DetailType = ZoneDataType["details"][0];
export type MachineType = ZoneDataType["machines"][0];
export type MetricsType = ZoneDataType["metrics"];

export type ChartDataItem = {
  name: string;
  zoneJava: { value: number; color: string };
  zonePython: { value: number; color: string };
  zoneRust: { value: number; color: string };
  zoneGo: { value: number; color: string };
  zoneKotlin: { value: number; color: string };
};
