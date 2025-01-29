import { colors } from "@/app/(dashboard)/(home)/_components/data/dashboardData";

export const workflowData = {
  stats: [
    {
      title: "Daily",
      sales: "999.83",
      quantity: "12,625",
      previousSales: 1234,
      period: "Yesterday",
    },
    {
      title: "Weekly",
      sales: "5199.848",
      quantity: "104,207",
      previousSales: 310.0,
      period: "Last Week",
    },
    {
      title: "Monthly",
      sales: "7199.848",
      quantity: "260,530",
      previousSales: 8721.0,
      period: "Last Month",
    },
  ],

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
          zone: "Zone 1",
          cellule: "Cellule 1",
          operator: "Operator 1",
          machine: "Knitting Line A",
          job: "Nets Production",
          count: 15,
          reason: "Material Processing",
          message: "Production in progress",
          status: 12,
          priority: 9,
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
          time: "2024-01-15 08:30:00 AM",
          zone: "Zone 1",
          cellule: "Cellule 1",
          operator: "Operator 1",
          machine: "Knitting Line A",
          job: "Nets Production",
          count: 15,
          reason: "Material Processing",
          message: "Production in progress",
          status: 0,
          priority: 7,
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
          zone: "Zone 2",
          cellule: "Cellule 2",
          operator: "Operator 2",
          job: "Boot Production",
          count: 8,
          reason: "Process Validation",
          message: "Quality check in progress",
          status: 10,
          priority: 88,
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

// Basic statistics interface
interface WorkflowStats {
  pending: number;
  running: number;
  completed: number;
}

// Damage type interface
interface DamageType {
  process: number;
  machine: number;
  material: number;
  quality?: number;
}

// Efficiency metrics interface
interface EfficiencyMetrics {
  nets: number;
  boots: number;
  cutting: number;
  knitting: number;
}

// Downtime metrics interface
interface DowntimeMetrics {
  planned: number;
  unplanned: number;
  maintenance: number;
}

// Quality metrics interface
interface QualityMetrics {
  defectRate: number;
  reworkRate: number;
  scrapRate: number;
}

// Operational metrics interface
interface OperationalMetrics {
  damageType: DamageType;
  efficiency: EfficiencyMetrics;
  downtime: DowntimeMetrics;
  quality: QualityMetrics;
}

// Production metrics interface
interface ProductionMetrics {
  planned: number;
  actual: number;
  variance: number;
}

// Quality inspection metrics interface
interface QualityInspectionMetrics {
  inspected: number;
  passed: number;
  failed: number;
}

// Operational detail metrics interface
interface OperationalDetailMetrics {
  damageType: DamageType;
  production: ProductionMetrics;
  quality: QualityInspectionMetrics;
}

// Damage types by process interface
interface ProcessDamageTypes {
  material?: number;
  handling?: number;
  setup?: number;
  tension?: number;
  alignment?: number;
  wear?: number;
  specification?: number;
  appearance?: number;
  strength?: number;
  cutting?: number;
  forming?: number;
  assembly?: number;
  temperature?: number;
  pressure?: number;
  cooling?: number;
  fitting?: number;
  finishing?: number;
}

// Process damage statistics interface
interface ProcessDamageStats {
  process: string;
  count: number;
  percentage: number;
  damageTypes: ProcessDamageTypes;
}

// Machine operational status interface
interface MachineOperationalStatus {
  uptime: number;
  maintenance: number;
  repair: number;
}

// Machine damage statistics interface
interface MachineDamageStats {
  machine: string;
  count: number;
  percentage: number;
  operationalStatus: MachineOperationalStatus;
}

// Combined damage statistics interface
interface DamageStatistics {
  byProcess: ProcessDamageStats[];
  byMachine: MachineDamageStats[];
}

// Workflow detail interface
interface WorkflowDetail {
  time: string;
  machine: string;
  job: string;
  count: number;
  reason: string;
  message: string;
  status: number;
  priority: number;
  assignee: string;
  department: string;
  op: OperationalDetailMetrics;
  damageStats: DamageStatistics;
}

// Machine maintenance interface
interface MachineMaintenance {
  lastCheck: string;
  nextDue: string;
  status: string;
}

// Machine performance interface
interface MachinePerformance {
  efficiency: number;
  quality: number;
  availability: number;
}

// Machine interface
interface Machine {
  id: string;
  status: string;
  load: number;
  temperature: number;
  maintenance: MachineMaintenance;
  performance: MachinePerformance;
}

// Operational metrics for zone interface
interface ZoneOperationalMetrics {
  oee: number;
  mtbf: string;
  mttr: string;
  availability: number;
}

// Zone metrics interface
interface ZoneMetrics {
  efficiency: number;
  uptime: string;
  throughput: string;
  latency: string;
  criticalIssues: number;
  operational: ZoneOperationalMetrics;
}

// Zone interface
export interface ZoneDataType {
  name: string;
  zoneNets: number;
  zoneBoots: number;
  zoneCutting: number;
  zoneKnitting: number;
  zoneInjection: number;
  op: OperationalMetrics;
  details: WorkflowDetail[];
  metrics: ZoneMetrics;
  machines: Machine[];
}

// Chart data value interface
interface ChartDataValue {
  value: number;
  color: string;
}

// Chart data point interface
interface ChartDataPoint {
  name: string;
  zoneJava: ChartDataValue;
  zonePython: ChartDataValue;
  zoneRust: ChartDataValue;
  zoneGo: ChartDataValue;
  zoneKotlin: ChartDataValue;
}

// Main workflow data interface
export interface WorkflowData {
  stats: WorkflowStats;
  zoneData: ZoneDataType[];
  chartData: ChartDataPoint[];
}
