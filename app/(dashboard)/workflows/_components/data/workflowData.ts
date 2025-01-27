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
      zoneNets: 0,
      zoneBoots: 0,
      zoneCutting: 0,
      zoneKnitting: 0,
      zoneInjection: 0,
      op: {
        damageType: {
          process: 12,
          machine: 3,
          material: 8,
          quality: 5,
        },
        efficiency: {
          nets: 85,
          boots: 92,
          cutting: 88,
          knitting: 90,
        },
        downtime: {
          planned: 120,
          unplanned: 45,
          maintenance: 60,
        },
        quality: {
          defectRate: 2.3,
          reworkRate: 1.5,
          scrapRate: 0.8,
        },
      },
      details: [
        {
          time: "2024-01-15 08:30:00 AM",
          machine: "Knitting Line A",
          job: "Nets Production",
          count: 15,
          reason: "Material Processing",
          message: "Production in progress",
          status: "active",
          priority: "medium",
          assignee: "Nets Team",
          department: "Manufacturing",
          op: {
            damageType: {
              process: 5,
              machine: 2,
              material: 3,
            },
            production: {
              planned: 150,
              actual: 142,
              variance: -8,
            },
            quality: {
              inspected: 142,
              passed: 138,
              failed: 4,
            },
          },
          damageStats: {
            byProcess: [
              {
                process: "Material Processing",
                count: 45,
                percentage: 12.5,
                damageTypes: {
                  material: 15,
                  handling: 20,
                  setup: 10,
                },
              },
              {
                process: "Knitting",
                count: 32,
                percentage: 8.9,
                damageTypes: {
                  tension: 12,
                  alignment: 10,
                  wear: 10,
                },
              },
              {
                process: "Quality Control",
                count: 28,
                percentage: 7.8,
                damageTypes: {
                  specification: 15,
                  appearance: 8,
                  strength: 5,
                },
              },
            ],
            byMachine: [
              {
                machine: "Knitting Machine 1",
                count: 38,
                percentage: 10.6,
                operationalStatus: {
                  uptime: 92,
                  maintenance: 5,
                  repair: 3,
                },
              },
              {
                machine: "Injection Mold A",
                count: 42,
                percentage: 11.7,
                operationalStatus: {
                  uptime: 88,
                  maintenance: 8,
                  repair: 4,
                },
              },
              {
                machine: "Cutting Station 1",
                count: 25,
                percentage: 6.9,
                operationalStatus: {
                  uptime: 95,
                  maintenance: 3,
                  repair: 2,
                },
              },
            ],
          },
        },
        {
          time: "2024-01-15 09:15:00 AM",
          machine: "Boot Line B",
          job: "Boot Production",
          count: 8,
          reason: "Process Validation",
          message: "Quality check in progress",
          status: "good",
          priority: "low",
          assignee: "Boot Team",
          department: "Production",
          op: {
            damageType: {
              process: 3,
              machine: 1,
              material: 2,
            },
            production: {
              planned: 100,
              actual: 98,
              variance: -2,
            },
            quality: {
              inspected: 98,
              passed: 95,
              failed: 3,
            },
          },
          damageStats: {
            byProcess: [
              {
                process: "Material Prep",
                count: 23,
                percentage: 6.4,
                damageTypes: {
                  cutting: 8,
                  forming: 10,
                  assembly: 5,
                },
              },
              {
                process: "Injection Molding",
                count: 18,
                percentage: 5.0,
                damageTypes: {
                  temperature: 7,
                  pressure: 6,
                  cooling: 5,
                },
              },
              {
                process: "Assembly",
                count: 15,
                percentage: 4.2,
                damageTypes: {
                  alignment: 6,
                  fitting: 5,
                  finishing: 4,
                },
              },
            ],
            byMachine: [
              {
                machine: "Boot Press 1",
                count: 19,
                percentage: 5.3,
                operationalStatus: {
                  uptime: 94,
                  maintenance: 4,
                  repair: 2,
                },
              },
              {
                machine: "Assembly Line 2",
                count: 21,
                percentage: 5.8,
                operationalStatus: {
                  uptime: 91,
                  maintenance: 6,
                  repair: 3,
                },
              },
              {
                machine: "Quality Station 1",
                count: 16,
                percentage: 4.4,
                operationalStatus: {
                  uptime: 97,
                  maintenance: 2,
                  repair: 1,
                },
              },
            ],
          },
        },
      ],
      metrics: {
        efficiency: 92,
        uptime: "99.9%",
        throughput: "2.3k/s",
        latency: "45ms",
        criticalIssues: 1,
        operational: {
          oee: 85.5,
          mtbf: "168h",
          mttr: "2.5h",
          availability: 95.8,
        },
      },
      machines: [
        {
          id: "MACHINE-01",
          status: "active",
          load: 78,
          temperature: 42,
          maintenance: {
            lastCheck: "2024-01-14",
            nextDue: "2024-01-21",
            status: "good",
          },
          performance: {
            efficiency: 92,
            quality: 98,
            availability: 95,
          },
        },
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
