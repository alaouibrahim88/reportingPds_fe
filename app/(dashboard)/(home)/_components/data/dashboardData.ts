export const colors = {
  Wrapping: "#8E98F5", // Red base color
  Nets: "#7874F2", // Lightest purple
  Boot: "#8B7BF9", // Light-medium purple
  Knitting: "#8B6CF8", // Medium purple
  Injection: "#8B5CF6", // Darkest purple
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
      Nets: 612,
      Wrapping: 0,
      Boot: 4,
      Knitting: 295,
      Injection: 27,
      details: [
        {
          time: "2024-01-15 06:00:00 AM",
          machine: "CITIZEN 19",
          job: "349455|26",
          count: 18,
          reason: "Tool Change / Offset Scrap",
          message: "parts were not put in last night",
          status: "alert",
          priority: "high",
          assignee: null,
          type: "process",
          department: "Manufacturing",
        },
        {
          time: "2024-01-15 10:19:43 AM",
          machine: "CITIZEN 36",
          job: "31003887-05|6",
          count: 9,
          reason: "Dimensional",
          message: "Boring bar chipped",
          status: "alert",
          priority: "medium",
          assignee: "Alex Smith",
          type: "matière",
          department: "Quality Control",
        },
        {
          time: "2024-01-15 11:30:32 PM",
          machine: "CITIZEN 20",
          job: "600213-2|15",
          count: 18,
          reason: "Dimensional",
          message: "Step on .4835 diameter",
          status: "good",
          priority: "low",
          assignee: "Sam Lee",
          type: "matière",

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
          status: "warning",
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
      Wrapping: { value: 612, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 295, color: colors.Knitting },
      Injection: { value: 27, color: colors.Injection },
    },
    {
      name: "W-29",
      Wrapping: { value: 587, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 283, color: colors.Knitting },
      Injection: { value: 24, color: colors.Injection },
    },
    {
      name: "W-28",
      Wrapping: { value: 634, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 5, color: colors.Boot },
      Knitting: { value: 301, color: colors.Knitting },
      Injection: { value: 29, color: colors.Injection },
    },
    {
      name: "W-27",
      Wrapping: { value: 592, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 2, color: colors.Boot },
      Knitting: { value: 267, color: colors.Knitting },
      Injection: { value: 23, color: colors.Injection },
    },
    {
      name: "W-26",
      Wrapping: { value: 605, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 289, color: colors.Knitting },
      Injection: { value: 26, color: colors.Injection },
    },
    {
      name: "W-25",
      Wrapping: { value: 597, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 276, color: colors.Knitting },
      Injection: { value: 25, color: colors.Injection },
    },
    {
      name: "W-24",
      Wrapping: { value: 628, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 315, color: colors.Knitting },
      Injection: { value: 28, color: colors.Injection },
    },
    {
      name: "W-23",
      Wrapping: { value: 608, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 292, color: colors.Knitting },
      Injection: { value: 26, color: colors.Injection },
    },
    {
      name: "W-22",
      Wrapping: { value: 601, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 287, color: colors.Knitting },
      Injection: { value: 24, color: colors.Injection },
    },
    {
      name: "W-21",
      Wrapping: { value: 615, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 298, color: colors.Knitting },
      Injection: { value: 27, color: colors.Injection },
    },
    {
      name: "W-20",
      Wrapping: { value: 594, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 279, color: colors.Knitting },
      Injection: { value: 25, color: colors.Injection },
    },
    {
      name: "W-19",
      Wrapping: { value: 623, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 306, color: colors.Knitting },
      Injection: { value: 29, color: colors.Injection },
    },
    {
      name: "W-18",
      Wrapping: { value: 603, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 284, color: colors.Knitting },
      Injection: { value: 26, color: colors.Injection },
    },
    {
      name: "W-17",
      Wrapping: { value: 611, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 293, color: colors.Knitting },
      Injection: { value: 27, color: colors.Injection },
    },
    {
      name: "W-16",
      Wrapping: { value: 596, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 281, color: colors.Knitting },
      Injection: { value: 24, color: colors.Injection },
    },
    {
      name: "W-15",
      Wrapping: { value: 627, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 309, color: colors.Knitting },
      Injection: { value: 28, color: colors.Injection },
    },
    {
      name: "W-14",
      Wrapping: { value: 604, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 288, color: colors.Knitting },
      Injection: { value: 26, color: colors.Injection },
    },
    {
      name: "W-13",
      Wrapping: { value: 614, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 296, color: colors.Knitting },
      Injection: { value: 27, color: colors.Injection },
    },
    {
      name: "W-12",
      Wrapping: { value: 599, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 285, color: colors.Knitting },
      Injection: { value: 25, color: colors.Injection },
    },
    {
      name: "W-11",
      Wrapping: { value: 602, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 282, color: colors.Knitting },
      Injection: { value: 26, color: colors.Injection },
    },
    {
      name: "W-10",
      Wrapping: { value: 598, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 278, color: colors.Knitting },
      Injection: { value: 25, color: colors.Injection },
    },
    {
      name: "W-9",
      Wrapping: { value: 621, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 312, color: colors.Knitting },
      Injection: { value: 28, color: colors.Injection },
    },
    {
      name: "W-8",
      Wrapping: { value: 589, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 265, color: colors.Knitting },
      Injection: { value: 22, color: colors.Injection },
    },
    {
      name: "W-7",
      Wrapping: { value: 664, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 2, color: colors.Boot },
      Knitting: { value: 241, color: colors.Knitting },
      Injection: { value: 30, color: colors.Injection },
    },
    {
      name: "W-6",
      Wrapping: { value: 462, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 3, color: colors.Boot },
      Knitting: { value: 143, color: colors.Knitting },
      Injection: { value: 15, color: colors.Injection },
    },
    {
      name: "W-5",
      Wrapping: { value: 531, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 2, color: colors.Boot },
      Knitting: { value: 359, color: colors.Knitting },
      Injection: { value: 12, color: colors.Injection },
    },
    {
      name: "W-4",
      Wrapping: { value: 624, color: colors.Wrapping },
      Nets: { value: 0, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 357, color: colors.Knitting },
      Injection: { value: 17, color: colors.Injection },
    },
    {
      name: "W-3",
      Wrapping: { value: 743, color: colors.Wrapping },
      Nets: { value: 2, color: colors.Nets },
      Boot: { value: 4, color: colors.Boot },
      Knitting: { value: 386, color: colors.Knitting },
      Injection: { value: 18, color: colors.Injection },
    },
    {
      name: "W-2",
      Wrapping: { value: 514, color: colors.Wrapping },
      Nets: { value: 3, color: colors.Nets },
      Boot: { value: 0, color: colors.Boot },
      Knitting: { value: 139, color: colors.Knitting },
      Injection: { value: 54, color: colors.Injection },
    },
    {
      name: "W-1",
      Wrapping: { value: 492, color: colors.Wrapping },
      Nets: { value: 32, color: colors.Nets },
      Boot: { value: 2, color: colors.Boot },
      Knitting: { value: 87, color: colors.Knitting },
      Injection: { value: 31, color: colors.Injection },
    },
  ],
};

export type ZoneDataType = (typeof dashboardData.zoneData)[0];
export type DetailType = ZoneDataType["details"][0];
export type MachineType = ZoneDataType["machines"][0];
export type MetricsType = ZoneDataType["metrics"];

export type ChartDataItem = {
  name: string;
  Wrapping: { value: number; color: string };
  Nets: { value: number; color: string };
  Boot: { value: number; color: string };
  Knitting: { value: number; color: string };
  Injection: { value: number; color: string };
};
