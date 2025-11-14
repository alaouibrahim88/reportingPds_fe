import type {
	NavigationItem,
	KPIDataset,
	CategoryData,
	IndicateursData
} from '@/types'

// Navigation Items
export const navigationItems: NavigationItem[] = [
	{ id: 'finance', label: 'Finance' },
	{ id: 'operations', label: 'Operations' },
	{ id: 'programs', label: 'Programs' },
	{ id: 'quality', label: 'Quality' },
	{ id: 'rh', label: 'RH' },
	{ id: 'supplychain', label: 'Supply Chain' }
]

// Executive Horizon KPIs - Strategic business metrics
export const executiveHorizonData: KPIDataset = {
  name: "Executive Horizon",
  description: "Strategic insights and executive-level analytics for business decision making",
  kpis: [
    {
      id: "revenue",
      title: "Total Revenue",
      value: 2450000,
      unit: "$",
      trend: "up",
      trendPercentage: 12.5,
      chartData: [2100000, 2150000, 2200000, 2300000, 2380000, 2450000],
      details: {
        description: "Total revenue across all business units and geographical regions",
        breakdown: {
          "North America": 1225000,
          "Europe": 735000,
          "Asia Pacific": 490000,
          "Q4 Growth": "12.5%",
          "YoY Growth": "18.3%"
        },
        insights: [
          "Strong performance in North American markets",
          "European expansion showing positive results",
          "Q4 exceeded targets by 8%"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#3B82F6"
    },
    {
      id: "profit_margin",
      title: "Profit Margin",
      value: 23.8,
      unit: "%",
      trend: "up",
      trendPercentage: 2.1,
      chartData: [21.2, 21.8, 22.1, 22.9, 23.4, 23.8],
      details: {
        description: "Net profit margin percentage across all operations",
        breakdown: {
          "Gross Margin": "45.2%",
          "Operating Margin": "28.1%",
          "Net Margin": "23.8%",
          "Industry Average": "19.5%",
          "Best in Class": "26.2%"
        },
        insights: [
          "Outperforming industry average by 4.3%",
          "Cost optimization initiatives showing results",
          "Margin improvement trend continues for 6 consecutive quarters"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#10B981"
    },
    {
      id: "market_share",
      title: "Market Share",
      value: 15.7,
      unit: "%",
      trend: "up",
      trendPercentage: 1.8,
      chartData: [14.1, 14.5, 14.9, 15.2, 15.4, 15.7],
      details: {
        description: "Global market share in primary business segments",
        breakdown: {
          "Primary Segment": "18.2%",
          "Secondary Segment": "12.8%",
          "Emerging Markets": "9.4%",
          "Market Leader": "22.1%",
          "Gap to Leader": "-6.4%"
        },
        insights: [
          "Gained 1.6% market share in the last 12 months",
          "Strong position in primary segment",
          "Opportunity for growth in emerging markets"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#8B5CF6"
    },
    {
      id: "customer_satisfaction",
      title: "Customer Satisfaction",
      value: 4.6,
      unit: "/5",
      trend: "up",
      trendPercentage: 4.5,
      chartData: [4.2, 4.3, 4.4, 4.5, 4.5, 4.6],
      details: {
        description: "Average customer satisfaction score across all touchpoints",
        breakdown: {
          "Product Quality": "4.7/5",
          "Customer Service": "4.5/5",
          "Value for Money": "4.4/5",
          "Delivery Experience": "4.8/5",
          "Overall Experience": "4.6/5"
        },
        insights: [
          "Highest satisfaction scores in 3 years",
          "Delivery experience is our strongest point",
          "Value perception improving with new pricing strategy"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#F59E0B"
    },
    {
      id: "employee_engagement",
      title: "Employee Engagement",
      value: 78,
      unit: "%",
      trend: "up",
      trendPercentage: 6.8,
      chartData: [71, 73, 75, 76, 77, 78],
      details: {
        description: "Employee engagement score based on quarterly surveys",
        breakdown: {
          "Job Satisfaction": "82%",
          "Work-Life Balance": "75%",
          "Career Development": "74%",
          "Management Trust": "80%",
          "Company Culture": "79%"
        },
        insights: [
          "7-point improvement over last year",
          "Strong management trust scores",
          "Career development programs showing impact"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#EF4444"
    },
    {
      id: "innovation_index",
      title: "Innovation Index",
      value: 82,
      unit: "/100",
      trend: "up",
      trendPercentage: 8.2,
      chartData: [72, 75, 78, 79, 81, 82],
      details: {
        description: "Innovation capability index based on R&D investment and output metrics",
        breakdown: {
          "R&D Investment": "8.5% of revenue",
          "Patent Applications": "47 this year",
          "New Product Revenue": "23% of total",
          "Time to Market": "18% faster",
          "Innovation Pipeline": "156 projects"
        },
        insights: [
          "10-point improvement in innovation index",
          "Accelerated time-to-market for new products",
          "Strong pipeline of innovative projects"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#06B6D4"
    },
    {
      id: "market_volatility",
      title: "Market Volatility Index",
      value: 102,
      unit: "%",
      trend: "up",
      trendPercentage: 12.5,
      chartData: [44, 22, 102, 32, 88, 102],
      details: {
        description: "Market performance volatility and trend analysis",
        breakdown: {
          "Volatility Score": "High",
          "Trend Direction": "Upward",
          "Market Confidence": "Medium",
          "Risk Level": "Moderate",
          "Forecast Accuracy": "78%"
        },
        insights: [
          "High volatility with upward trend",
          "Market confidence improving",
          "Risk management strategies effective"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#F59E0B"
    },
    {
      id: "efficiency_variance",
      title: "Efficiency Variance",
      value: 3.2,
      unit: "%",
      trend: "up",
      trendPercentage: 8.5,
      chartData: [-1.5, 0.8, 2.1, 2.8, 3.0, 3.2],
      details: {
        description: "Operational efficiency variance across all facilities",
        breakdown: {
          "Above Target": "70%",
          "Below Target": "20%",
          "On Target": "10%",
          "Average Variance": "+3.2%",
          "Best Performer": "Facility A"
        },
        insights: [
          "Strong efficiency improvements",
          "70% of facilities above target",
          "Continuous improvement initiatives working"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#10B981"
    }
  ]
};

// GlobalOps KPIs - Operational efficiency metrics
export const globalOpsData: KPIDataset = {
  name: "GlobalOps",
  description: "Global operations management and monitoring for worldwide business activities",
  kpis: [
    {
      id: "operational_efficiency",
      title: "Operational Efficiency",
      value: 87.3,
      unit: "%",
      trend: "up",
      trendPercentage: 3.2,
      chartData: [82.1, 83.5, 84.8, 85.9, 86.7, 87.3],
      details: {
        description: "Overall operational efficiency across all global facilities",
        breakdown: {
          "Manufacturing": "89.2%",
          "Supply Chain": "85.7%",
          "Distribution": "86.1%",
          "Quality Control": "91.4%",
          "Target Efficiency": "85.0%"
        },
        insights: [
          "Exceeded target efficiency by 2.3%",
          "Quality control processes highly optimized",
          "Supply chain improvements showing results"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#3B82F6"
    },
    {
      id: "production_output",
      title: "Production Output",
      value: 156780,
      unit: "units",
      trend: "up",
      trendPercentage: 7.4,
      chartData: [142000, 145000, 148000, 151000, 154000, 156780],
      details: {
        description: "Total production output across all manufacturing facilities",
        breakdown: {
          "Facility A": 58420,
          "Facility B": 47230,
          "Facility C": 32180,
          "Facility D": 18950,
          "Monthly Target": 145000
        },
        insights: [
          "8.1% above monthly target",
          "Facility A leading production efficiency",
          "New equipment installations boosting output"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#10B981"
    },
    {
      id: "quality_score",
      title: "Quality Score",
      value: 96.8,
      unit: "%",
      trend: "up",
      trendPercentage: 1.2,
      chartData: [94.8, 95.2, 95.7, 96.1, 96.5, 96.8],
      details: {
        description: "Average quality score across all production lines and facilities",
        breakdown: {
          "Defect Rate": "0.8%",
          "Rework Rate": "1.4%",
          "First Pass Yield": "97.8%",
          "Customer Returns": "0.3%",
          "Industry Benchmark": "93.5%"
        },
        insights: [
          "3.3% above industry benchmark",
          "Lowest defect rate in company history",
          "Customer return rate at all-time low"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#8B5CF6"
    },
    {
      id: "supply_chain_reliability",
      title: "Supply Chain Reliability",
      value: 94.2,
      unit: "%",
      trend: "down",
      trendPercentage: -2.1,
      chartData: [96.8, 96.1, 95.4, 94.9, 94.5, 94.2],
      details: {
        description: "Supply chain reliability and on-time delivery performance",
        breakdown: {
          "On-Time Delivery": "94.2%",
          "Supplier Performance": "91.8%",
          "Inventory Turnover": "8.2x",
          "Lead Time Variance": "±2.3 days",
          "Target Reliability": "95.0%"
        },
        insights: [
          "Slight decline due to global supply challenges",
          "Working with suppliers to improve performance",
          "Inventory management remains strong"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#F59E0B"
    },
    {
      id: "performance_variance",
      title: "Performance Variance",
      value: 2.3,
      unit: "%",
      trend: "up",
      trendPercentage: 15.0,
      chartData: [-2.1, 1.8, 3.5, 2.3, 1.9, 2.3],
      details: {
        description: "Performance variance analysis vs target across all metrics",
        breakdown: {
          "Above Target": "65%",
          "Below Target": "25%",
          "On Target": "10%",
          "Average Variance": "+2.3%",
          "Volatility Index": "Medium"
        },
        insights: [
          "Mixed performance with positive overall trend",
          "65% of metrics above target",
          "Volatility within acceptable range"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#3B82F6"
    },
    {
      id: "budget_variance",
      title: "Budget Variance",
      value: -1.2,
      unit: "%",
      trend: "down",
      trendPercentage: -8.5,
      chartData: [2.1, 0.8, -0.5, -1.0, -1.1, -1.2],
      details: {
        description: "Budget variance analysis across all departments",
        breakdown: {
          "Over Budget": "30%",
          "Under Budget": "45%",
          "On Budget": "25%",
          "Total Variance": "-1.2%",
          "Cost Savings": "$45K"
        },
        insights: [
          "Overall under budget by 1.2%",
          "Cost optimization initiatives successful",
          "Some departments need budget review"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#10B981"
    },
    {
      id: "cost_per_unit",
      title: "Cost per Unit",
      value: 24.67,
      unit: "$",
      trend: "down",
      trendPercentage: -5.8,
      chartData: [27.2, 26.8, 26.1, 25.4, 25.0, 24.67],
      details: {
        description: "Average cost per unit produced across all product lines",
        breakdown: {
          "Material Costs": "$14.20",
          "Labor Costs": "$6.80",
          "Overhead": "$2.90",
          "Quality Control": "$0.77",
          "Target Cost": "$26.00"
        },
        insights: [
          "5.1% below target cost per unit",
          "Material cost optimization successful",
          "Labor efficiency improvements contributing"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#EF4444"
    },
    {
      id: "energy_efficiency",
      title: "Energy Efficiency",
      value: 91.4,
      unit: "%",
      trend: "up",
      trendPercentage: 4.7,
      chartData: [85.2, 87.1, 88.5, 89.8, 90.6, 91.4],
      details: {
        description: "Energy efficiency across all global operations and facilities",
        breakdown: {
          "Renewable Energy": "67%",
          "Energy per Unit": "12.3 kWh",
          "Carbon Footprint": "-18% YoY",
          "Sustainability Score": "A-",
          "Target Efficiency": "90.0%"
        },
        insights: [
          "Exceeded sustainability targets",
          "67% renewable energy adoption",
          "Significant reduction in carbon footprint"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#06B6D4"
    },
    {
      id: "safety_incidents",
      title: "Safety Record",
      value: 0.12,
      unit: "incidents/1000h",
      trend: "down",
      trendPercentage: -25.0,
      chartData: [0.18, 0.16, 0.15, 0.14, 0.13, 0.12],
      details: {
        description: "Safety incident rate per 1000 hours worked across all facilities",
        breakdown: {
          "Total Incidents": 8,
          "Lost Time Incidents": 2,
          "Near Misses": 45,
          "Safety Training Hours": "12,450",
          "Industry Average": "0.18"
        },
        insights: [
          "33% below industry average",
          "Significant improvement in safety culture",
          "Proactive near-miss reporting increasing"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#84CC16"
    },
    {
      id: "equipment_uptime",
      title: "Equipment Uptime",
      value: 96.7,
      unit: "%",
      trend: "up",
      trendPercentage: 2.3,
      chartData: [93.8, 94.5, 95.1, 95.8, 96.2, 96.7],
      details: {
        description: "Average equipment uptime across all production facilities",
        breakdown: {
          "Planned Maintenance": "2.1%",
          "Unplanned Downtime": "1.2%",
          "Mean Time to Repair": "2.3 hours",
          "Preventive Maintenance": "89%",
          "World Class": "97.5%"
        },
        insights: [
          "Strong uptime performance",
          "Predictive maintenance reducing failures",
          "0.8% away from world-class benchmark"
        ],
        lastUpdated: "2025-09-20"
      },
      color: "#F97316"
    }
  ]
};

export const kpiDatasets = {
	'executive-horizon': executiveHorizonData,
	'global-ops': globalOpsData
}

// Helper function to get category data from navigationItems
export function getCategoryData(categoryId: string): CategoryData | undefined {
	const navItem = navigationItems.find(item => item.id === categoryId)
	if (!navItem) return undefined

	// Map navigation items to category structure
	const iconMap: Record<string, string> = {
		finance: 'DollarSign',
		operations: 'Cog',
		programs: 'Target',
		quality: 'ShieldCheck',
		rh: 'Users',
		supplychain: 'Truck'
	}

	return {
		id: navItem.id,
		name: navItem.label,
		icon: iconMap[navItem.id] || 'Circle',
		kpis: [] // KPI data should be fetched from API
	}
}

// Weekly Indicators Data
export const weeklyIndicatorsData: IndicateursData = {
  Indicateurs: [
    {
      Indicateur: "Chiffre d'affaires réalisé",
      Valeur_Semaine: 1.25,
      Target: 1.2,
      Semaine_M1: 0.95,
      Semaine_M2: 1.05,
      Semaine_M3: 1.18,
      Semaine_M4: 1.21,
      LowerIsBetter: false,
    },
    {
      Indicateur: "Chiffre d'affaires prévisionnel",
      Valeur_Semaine: 1.3,
      Target: 1.2,
      Semaine_M1: 1.19,
      Semaine_M2: 1.18,
      Semaine_M3: 1.26,
      Semaine_M4: 1.28,
      LowerIsBetter: false,
    },
    {
      Indicateur: "Taux de scrap",
      Valeur_Semaine: 1.5,
      Target: 1.8,
      Semaine_M1: 1.6,
      Semaine_M2: 1.7,
      Semaine_M3: 1.9,
      Semaine_M4: 2.1,
      LowerIsBetter: true,
    },
    {
      Indicateur: "Suivi de l'efficience",
      Valeur_Semaine: 94,
      Target: 95,
      Semaine_M1: 94.8,
      Semaine_M2: 95,
      Semaine_M3: 94,
      Semaine_M4: 92,
      LowerIsBetter: false,
    },
    {
      Indicateur: "Réclamations clients",
      Valeur_Semaine: 3,
      Target: 5,
      Semaine_M1: 2,
      Semaine_M2: 5,
      Semaine_M3: 6,
      Semaine_M4: 4,
      LowerIsBetter: true,
    },
    {
      Indicateur: "Taux de service client",
      Valeur_Semaine: 98.5,
      Target: 98,
      Semaine_M1: 98.1,
      Semaine_M2: 98,
      Semaine_M3: 97.5,
      Semaine_M4: 99,
      LowerIsBetter: false,
    },
    {
      Indicateur: "Taux d'heures sup.",
      Valeur_Semaine: 5.2,
      Target: 5.5,
      Semaine_M1: 5.1,
      Semaine_M2: 5.4,
      Semaine_M3: 5.8,
      Semaine_M4: 6.1,
      LowerIsBetter: true,
    },
    {
      Indicateur: "Taux de chômage tech.",
      Valeur_Semaine: 0.8,
      Target: 1.0,
      Semaine_M1: 0.9,
      Semaine_M2: 1.5,
      Semaine_M3: 1.1,
      Semaine_M4: 0.7,
      LowerIsBetter: true,
    },
  ]
};

