import { colors } from "@/app/(dashboard)/(home)/_components/data/dashboardData";

export const workflowData = {
  stats: {
    pending: 8,
    running: 15,
    completed: 45,
  },
  zoneData: [
    {
      name: "W-30",
      zoneJava: 423,
      zonePython: 234,
      zoneRust: 123,
      zoneGo: 321,
      zoneKotlin: 213,
      details: [
        {
          time: "2024-01-15 08:30:00 AM",
          machine: "Pipeline A",
          job: "Data Processing",
          count: 15,
          reason: "Performance Optimization",
          message: "Workflow optimization in progress",
          status: "warning",
          priority: "medium",
          assignee: "Team Alpha",
          department: "Data Engineering",
        },
        {
          time: "2024-01-15 09:15:00 AM",
          machine: "Pipeline B",
          job: "ETL Process",
          count: 8,
          reason: "Data Validation",
          message: "Validating data integrity",
          status: "good",
          priority: "low",
          assignee: "Team Beta",
          department: "Analytics",
        },
        // Add more workflow-specific data as needed
      ],
      metrics: {
        efficiency: 92,
        uptime: "99.9%",
        throughput: "2.3k/s",
        latency: "45ms",
        criticalIssues: 1,
      },
      machines: [
        {
          id: "PIPE-01",
          status: "active",
          load: 78,
          temperature: 42,
        },
        // Add more machines as needed
      ],
    },
  ],
  chartData: [
    {
      name: "W-4",
      zoneJava: { value: 523, color: colors.zoneJava },
      zonePython: { value: 234, color: colors.zonePython },
      zoneRust: { value: 321, color: colors.zoneRust },
      zoneGo: { value: 432, color: colors.zoneGo },
      zoneKotlin: { value: 234, color: colors.zoneKotlin },
    },
    // Add more chart data points as needed
  ],
};
