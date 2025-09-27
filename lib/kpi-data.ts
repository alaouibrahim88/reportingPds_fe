export interface KPIItem {
  id: string;
  title: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendPercentage: number;
  chartData: number[];
  details: {
    description: string;
    breakdown: {
      [key: string]: number | string;
    };
    insights: string[];
    lastUpdated: string;
  };
  color: string;
  icon?: string;
}

export interface KPIDataset {
  name: string;
  description: string;
  kpis: KPIItem[];
}

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
  "executive-horizon": executiveHorizonData,
  "global-ops": globalOpsData
};

// Dashboard Categories Interface
export interface CategoryKPI {
  title: string;
  value: string;
  subtitle?: string;
  target?: string;
  trend?: string;
  trendColor?: string;
  lastWeeks?: string[];
  statusRanges?: {
    target: string;
    good: string;
    alert: string;
    high: string;
  };
  currentStatus?: string;
  statusColor?: string;
  actionText?: string;
  progressRanges?: {
    ok: string;
    good: string;
    excellent: string;
    target: string;
  };
  currentValue?: number;
  breakdown?: {
    [key: string]: string;
  };
  chartData?: {
    freightIn?: number[];
    freightOut?: number[];
  };
  actionLink?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  icon: string;
  kpis: CategoryKPI[];
}

// Dashboard Categories Data for Executive Horizon - Strategic business metrics
export const executiveHorizonCategories: CategoryData[] = [
  {
    id: "finance",
    name: "Finance",
    icon: "DollarSign",
    kpis: [
      {
        title: "Total Revenue",
        value: "$2.45M",
        target: "Target: $2.2M",
        trend: "+12.5%",
        trendColor: "text-green-600",
        lastWeeks: ["$2.1M", "$2.15M", "$2.2M", "$2.3M", "$2.45M"]
      },
      {
        title: "Profit Margin",
        value: "23.8%",
        target: "Target: 20%",
        trend: "+2.1%",
        trendColor: "text-green-600",
        lastWeeks: ["21.2%", "21.8%", "22.1%", "22.9%", "23.8%"]
      },
      {
        title: "EBITDA",
        value: "$580K",
        target: "Target: $500K",
        trend: "+16%",
        trendColor: "text-green-600",
        lastWeeks: ["$450K", "$480K", "$510K", "$550K", "$580K"]
      },
      {
        title: "Cash Flow",
        value: "$340K",
        target: "Target: $300K",
        trend: "+13.3%",
        trendColor: "text-green-600",
        lastWeeks: ["$280K", "$290K", "$310K", "$325K", "$340K"]
      },
      {
        title: "ROI",
        value: "18.5%",
        target: "Target: 15%",
        trend: "+3.2%",
        trendColor: "text-green-600",
        lastWeeks: ["16.2%", "16.8%", "17.1%", "17.9%", "18.5%"]
      },
      {
        title: "Shareholder Value",
        value: "$4.2B",
        target: "Target: $3.8B",
        trend: "+10.5%",
        trendColor: "text-green-600",
        lastWeeks: ["$3.6B", "$3.7B", "$3.9B", "$4.0B", "$4.2B"]
      }
    ]
  },
  {
    id: "operations",
    name: "Operations",
    icon: "Cog",
    kpis: [
      {
        title: "Market Share",
        value: "15.7%",
        target: "Target: 18%",
        trend: "+1.8%",
        trendColor: "text-green-600",
        lastWeeks: ["14.1%", "14.5%", "14.9%", "15.2%", "15.7%"]
      },
      {
        title: "Customer Acquisition",
        value: "1,240",
        target: "Target: 1,000",
        trend: "+24%",
        trendColor: "text-green-600",
        lastWeeks: ["890", "950", "1,020", "1,150", "1,240"]
      },
      {
        title: "Customer Retention",
        value: "94%",
        target: "Target: 90%",
        trend: "+4.4%",
        trendColor: "text-green-600",
        lastWeeks: ["88%", "90%", "91%", "93%", "94%"]
      },
      {
        title: "Market Penetration",
        value: "34%",
        target: "Target: 30%",
        trend: "+13.3%",
        trendColor: "text-green-600",
        lastWeeks: ["28%", "29%", "31%", "32%", "34%"]
      },
      {
        title: "Digital Transformation",
        value: "78%",
        target: "Target: 75%",
        trend: "+8%",
        trendColor: "text-green-600",
        lastWeeks: ["65%", "68%", "72%", "75%", "78%"]
      },
      {
        title: "Brand Value",
        value: "$2.8B",
        target: "Target: $2.5B",
        trend: "+12%",
        trendColor: "text-green-600",
        lastWeeks: ["$2.3B", "$2.4B", "$2.5B", "$2.7B", "$2.8B"]
      }
    ]
  },
  {
    id: "programs",
    name: "Programs",
    icon: "Target",
    kpis: [
      {
        title: "Innovation Pipeline",
        value: "156",
        target: "Target: 120",
        trend: "+30%",
        trendColor: "text-green-600",
        lastWeeks: ["98", "112", "128", "142", "156"]
      },
      {
        title: "Strategic Partnerships",
        value: "23",
        target: "Target: 20",
        trend: "+15%",
        trendColor: "text-green-600",
        lastWeeks: ["18", "19", "20", "22", "23"]
      },
      {
        title: "Innovation Index",
        value: "82/100",
        target: "Target: 75/100",
        trend: "+8.2%",
        trendColor: "text-green-600",
        lastWeeks: ["72", "75", "78", "79", "82"]
      },
      {
        title: "R&D Investment",
        value: "8.5%",
        target: "Target: 7%",
        trend: "+21.4%",
        trendColor: "text-green-600",
        lastWeeks: ["6.2%", "6.8%", "7.1%", "7.9%", "8.5%"]
      },
      {
        title: "Time to Market",
        value: "8.2 months",
        target: "Target: < 10 months",
        trend: "-18%",
        trendColor: "text-green-600",
        lastWeeks: ["11.2", "10.8", "9.5", "8.8", "8.2"]
      },
      {
        title: "New Product Revenue",
        value: "23%",
        target: "Target: 20%",
        trend: "+15%",
        trendColor: "text-green-600",
        lastWeeks: ["18%", "19%", "20%", "22%", "23%"]
      }
    ]
  },
  {
    id: "quality",
    name: "Quality",
    icon: "ShieldCheck",
    kpis: [
      {
        title: "Customer Satisfaction",
        value: "4.6/5",
        target: "Target: 4.5/5",
        trend: "+4.5%",
        trendColor: "text-green-600",
        lastWeeks: ["4.2", "4.3", "4.4", "4.5", "4.6"]
      },
      {
        title: "Net Promoter Score",
        value: "72",
        target: "Target: 70",
        trend: "+8%",
        trendColor: "text-green-600",
        lastWeeks: ["62", "65", "68", "70", "72"]
      },
      {
        title: "Lifetime Value",
        value: "$2,840",
        target: "Target: $2,500",
        trend: "+13.6%",
        trendColor: "text-green-600",
        lastWeeks: ["$2,200", "$2,350", "$2,500", "$2,680", "$2,840"]
      },
      {
        title: "Churn Rate",
        value: "2.1%",
        target: "Target: < 3%",
        trend: "-30%",
        trendColor: "text-green-600",
        lastWeeks: ["3.2%", "2.8%", "2.5%", "2.3%", "2.1%"]
      },
      {
        title: "Innovation Culture Score",
        value: "87%",
        target: "Target: 80%",
        trend: "+8.8%",
        trendColor: "text-green-600",
        lastWeeks: ["76%", "78%", "82%", "85%", "87%"]
      },
      {
        title: "ESG Score",
        value: "A-",
        target: "Target: B+",
        trend: "Improved",
        trendColor: "text-green-600",
        lastWeeks: ["B", "B", "B+", "A-", "A-"]
      }
    ]
  },
  {
    id: "rh",
    name: "RH",
    icon: "Users",
    kpis: [
      {
        title: "Headcount",
        subtitle: "Total Employees",
        value: "444",
        trend: "+11 vs last month",
        trendColor: "text-green-600",
        statusRanges: {
          target: "420 Target",
          good: "440 Good",
          alert: "460 Alert",
          high: "480 High"
        },
        currentStatus: "Current: 444",
        statusColor: "text-green-600",
        actionText: "View Details"
      },
      {
        title: "Cost",
        subtitle: "Monthly Payroll",
        value: "$4.6M",
        trend: "+$100k vs last month",
        trendColor: "text-red-600",
        statusRanges: {
          target: "$4.4M On Target",
          good: "$4.5M Acceptable",
          alert: "$4.7M High",
          high: "$4.8M Critical"
        },
        currentStatus: "Current: $4.6M",
        statusColor: "text-orange-600",
        actionText: "Action Plan"
      },
      {
        title: "Turnover Rate",
        subtitle: "Departures / Average Headcount",
        value: "3.5%",
        trend: "+0.2% vs last month",
        trendColor: "text-red-600",
        statusRanges: {
          target: "3.0% Good",
          good: "3.5% Acceptable",
          alert: "4.0% High",
          high: "5.0% Alert"
        },
        currentStatus: "Current: 3.5%",
        statusColor: "text-blue-600",
        actionText: "Action Plan"
      },
      {
        title: "Time to Fill",
        subtitle: "Offer Acceptance - Job Posting",
        value: "38 days",
        trend: "-4 days",
        trendColor: "text-green-600",
        statusRanges: {
          target: "30 Excellent",
          good: "40 Good",
          alert: "45 Acceptable",
          high: "50 Slow"
        },
        currentStatus: "Current: 38",
        statusColor: "text-blue-600",
        actionText: "View Details"
      },
      {
        title: "Absenteeism Rate",
        subtitle: "Weekly | Absent / Planned Hours",
        value: "2.1%",
        trend: "+0.3% vs last week",
        trendColor: "text-orange-600",
        statusRanges: {
          target: "1.5% Low",
          good: "2.0% Acceptable",
          alert: "2.5% High",
          high: "3.0% Critical"
        },
        currentStatus: "Current: 2.1%",
        statusColor: "text-orange-600",
        actionText: "Action Plan"
      },
      {
        title: "Social Incidents",
        subtitle: "Weekly | Conflicts & Alerts",
        value: "2",
        trend: "-1 vs last week",
        trendColor: "text-green-600",
        statusRanges: {
          target: "1 Good",
          good: "2 Acceptable",
          alert: "3 Warning",
          high: "4 Alert"
        },
        currentStatus: "Current: 2",
        statusColor: "text-blue-600",
        actionText: "View Report"
      }
    ]
  },
  {
    id: "supplychain",
    name: "SupplyChain",
    icon: "Truck",
    kpis: [
      {
        title: "Carbon Footprint",
        value: "-18%",
        target: "Target: -15%",
        trend: "Improved",
        trendColor: "text-green-600",
        lastWeeks: ["-8%", "-10%", "-13%", "-16%", "-18%"]
      },
      {
        title: "Renewable Energy",
        value: "67%",
        target: "Target: 60%",
        trend: "+11.7%",
        trendColor: "text-green-600",
        lastWeeks: ["55%", "58%", "62%", "65%", "67%"]
      },
      {
        title: "Waste Reduction",
        value: "42%",
        target: "Target: 35%",
        trend: "+20%",
        trendColor: "text-green-600",
        lastWeeks: ["28%", "31%", "35%", "38%", "42%"]
      },
      {
        title: "Social Impact Score",
        value: "8.4/10",
        target: "Target: 8.0/10",
        trend: "+5%",
        trendColor: "text-green-600",
        lastWeeks: ["7.6", "7.8", "8.0", "8.2", "8.4"]
      },
      {
        title: "Supplier Sustainability",
        value: "73%",
        target: "Target: 70%",
        trend: "+4.3%",
        trendColor: "text-green-600",
        lastWeeks: ["68%", "69%", "70%", "72%", "73%"]
      },
      {
        title: "Patent Applications",
        value: "47",
        target: "Target: 40",
        trend: "+17.5%",
        trendColor: "text-green-600",
        lastWeeks: ["35", "38", "40", "44", "47"]
      }
    ]
  }
];

// Dashboard Categories Data for GlobalOps - Operational efficiency metrics
export const globalOpsCategories: CategoryData[] = [
  {
    id: "finance",
    name: "Finance",
    icon: "DollarSign",
    kpis: [
      {
        title: "Cost per Unit",
        value: "$24.67",
        target: "Target: $26.00",
        trend: "-5.8%",
        trendColor: "text-green-600",
        lastWeeks: ["$27.20", "$26.80", "$26.10", "$25.40", "$24.67"]
      },
      {
        title: "Maintenance Costs",
        value: "$45K",
        target: "Target: < $50K",
        trend: "-10%",
        trendColor: "text-green-600",
        lastWeeks: ["$52K", "$50K", "$48K", "$46K", "$45K"]
      },
      {
        title: "Energy Efficiency",
        value: "91.4%",
        target: "Target: 90%",
        trend: "+4.7%",
        trendColor: "text-green-600",
        lastWeeks: ["85.2%", "87.1%", "88.5%", "89.8%", "91.4%"]
      },
      {
        title: "Capacity Utilization",
        value: "89.2%",
        target: "Target: 85%",
        trend: "+4.9%",
        trendColor: "text-green-600",
        lastWeeks: ["82.1%", "84.3%", "86.1%", "87.8%", "89.2%"]
      },
      {
        title: "Operational Efficiency",
        value: "87.3%",
        target: "Target: 85%",
        trend: "+3.2%",
        trendColor: "text-green-600",
        lastWeeks: ["82.1%", "83.5%", "84.8%", "85.9%", "87.3%"]
      },
      {
        title: "Equipment Reliability",
        value: "94.2%",
        target: "Target: 90%",
        trend: "+4.7%",
        trendColor: "text-green-600",
        lastWeeks: ["88.1%", "89.8%", "91.5%", "92.9%", "94.2%"]
      }
    ]
  },
  {
    id: "operations",
    name: "Operations",
    icon: "Cog",
    kpis: [
      {
        title: "Production Output",
        value: "156.8K",
        target: "Target: 145K",
        trend: "+7.4%",
        trendColor: "text-green-600",
        lastWeeks: ["142K", "145K", "148K", "151K", "156.8K"]
      },
      {
        title: "Equipment Uptime",
        value: "96.7%",
        target: "Target: 95%",
        trend: "+2.3%",
        trendColor: "text-green-600",
        lastWeeks: ["93.8%", "94.5%", "95.1%", "95.8%", "96.7%"]
      },
      {
        title: "Planned Maintenance",
        value: "89%",
        target: "Target: 85%",
        trend: "+4.7%",
        trendColor: "text-green-600",
        lastWeeks: ["82%", "84%", "86%", "87%", "89%"]
      },
      {
        title: "Mean Time to Repair",
        value: "2.3h",
        target: "Target: < 3h",
        trend: "-23%",
        trendColor: "text-green-600",
        lastWeeks: ["3.2h", "3.0h", "2.8h", "2.5h", "2.3h"]
      },
      {
        title: "Predictive Maintenance",
        value: "76%",
        target: "Target: 70%",
        trend: "+8.6%",
        trendColor: "text-green-600",
        lastWeeks: ["68%", "70%", "72%", "74%", "76%"]
      },
      {
        title: "Spare Parts Inventory",
        value: "92%",
        target: "Target: 90%",
        trend: "+2.2%",
        trendColor: "text-green-600",
        lastWeeks: ["88%", "89%", "90%", "91%", "92%"]
      }
    ]
  },
  {
    id: "programs",
    name: "Programs",
    icon: "Target",
    kpis: [
      {
        title: "Safety Training Hours",
        value: "12,450h",
        target: "Target: 10,000h",
        trend: "+24.5%",
        trendColor: "text-green-600",
        lastWeeks: ["9,200", "9,800", "10,500", "11,800", "12,450"]
      },
      {
        title: "Training Completion",
        value: "94%",
        target: "Target: 90%",
        trend: "+4.4%",
        trendColor: "text-green-600",
        lastWeeks: ["88%", "90%", "91%", "93%", "94%"]
      },
      {
        title: "Skills Certification",
        value: "87%",
        target: "Target: 80%",
        trend: "+8.8%",
        trendColor: "text-green-600",
        lastWeeks: ["76%", "78%", "82%", "85%", "87%"]
      },
      {
        title: "Safety Compliance",
        value: "98.5%",
        target: "Target: 95%",
        trend: "+3.7%",
        trendColor: "text-green-600",
        lastWeeks: ["93.2%", "94.8%", "96.1%", "97.3%", "98.5%"]
      },
      {
        title: "Quality Audits Passed",
        value: "94%",
        target: "Target: 90%",
        trend: "+4.4%",
        trendColor: "text-green-600",
        lastWeeks: ["88%", "90%", "91%", "93%", "94%"]
      },
      {
        title: "Near Miss Reports",
        value: "45",
        target: "Target: > 40",
        trend: "+12.5%",
        trendColor: "text-green-600",
        lastWeeks: ["38", "40", "42", "44", "45"]
      }
    ]
  },
  {
    id: "quality",
    name: "Quality",
    icon: "ShieldCheck",
    kpis: [
      {
        title: "Quality Score",
        value: "96.8%",
        target: "Target: 95%",
        trend: "+1.2%",
        trendColor: "text-green-600",
        lastWeeks: ["94.8%", "95.2%", "95.7%", "96.1%", "96.8%"]
      },
      {
        title: "Defect Rate",
        value: "0.8%",
        target: "Target: < 1%",
        trend: "-20%",
        trendColor: "text-green-600",
        lastWeeks: ["1.2%", "1.1%", "1.0%", "0.9%", "0.8%"]
      },
      {
        title: "First Pass Yield",
        value: "97.8%",
        target: "Target: 95%",
        trend: "+1.8%",
        trendColor: "text-green-600",
        lastWeeks: ["96.1%", "96.5%", "97.0%", "97.3%", "97.8%"]
      },
      {
        title: "Customer Returns",
        value: "0.3%",
        target: "Target: < 0.5%",
        trend: "-40%",
        trendColor: "text-green-600",
        lastWeeks: ["0.5%", "0.4%", "0.4%", "0.3%", "0.3%"]
      },
      {
        title: "Rework Rate",
        value: "1.4%",
        target: "Target: < 2%",
        trend: "-12.5%",
        trendColor: "text-green-600",
        lastWeeks: ["1.8%", "1.7%", "1.6%", "1.5%", "1.4%"]
      },
      {
        title: "Safety Incidents",
        value: "0.12",
        target: "Target: < 0.18",
        trend: "-25%",
        trendColor: "text-green-600",
        lastWeeks: ["0.18", "0.16", "0.15", "0.14", "0.12"]
      }
    ]
  },
  {
    id: "rh",
    name: "RH",
    icon: "Users",
    kpis: [
      {
        title: "Productivity Index",
        value: "112",
        target: "Target: 100",
        trend: "+12%",
        trendColor: "text-green-600",
        lastWeeks: ["98", "102", "106", "109", "112"]
      },
      {
        title: "Absenteeism Rate",
        value: "3.2%",
        target: "Target: < 4%",
        trend: "-11%",
        trendColor: "text-green-600",
        lastWeeks: ["4.1%", "3.8%", "3.6%", "3.4%", "3.2%"]
      },
      {
        title: "Employee Turnover",
        value: "5%",
        target: "Target: < 8%",
        trend: "-37.5%",
        trendColor: "text-green-600",
        lastWeeks: ["9%", "8%", "7%", "6%", "5%"]
      },
      {
        title: "Overtime Hours",
        value: "8.2%",
        target: "Target: < 10%",
        trend: "-18%",
        trendColor: "text-green-600",
        lastWeeks: ["11.2%", "10.8%", "9.5%", "8.8%", "8.2%"]
      },
      {
        title: "Lost Time Incidents",
        value: "2",
        target: "Target: < 5",
        trend: "-60%",
        trendColor: "text-green-600",
        lastWeeks: ["6", "5", "4", "3", "2"]
      },
      {
        title: "Emergency Response Time",
        value: "2.3 min",
        target: "Target: < 3 min",
        trend: "-23%",
        trendColor: "text-green-600",
        lastWeeks: ["3.2", "3.0", "2.8", "2.5", "2.3"]
      }
    ]
  },
  {
    id: "supplychain",
    name: "SupplyChain",
    icon: "Truck",
    kpis: [
      {
        title: "Customer Service Rate / OTIF",
        value: "96.5%",
        subtitle: "% of orders delivered on time.",
        target: "Target: 98%",
        trend: "+1.5%",
        trendColor: "text-green-400",
        progressRanges: {
          ok: "80%",
          good: "90%", 
          excellent: "95%",
          target: "98%"
        },
        currentValue: 96.5,
        actionLink: "Details"
      },
      {
        title: "Supplier Service Rate OTIF",
        value: "92.0%",
        subtitle: "% of compliant supplier deliveries.",
        target: "Target: 98%",
        trend: "-3.0%",
        trendColor: "text-red-400",
        progressRanges: {
          ok: "85%",
          good: "90%",
          excellent: "95%", 
          target: "98%"
        },
        currentValue: 92.0,
        actionLink: "Details"
      },
      {
        title: "Stock Reliability Rate",
        value: "99.2%",
        subtitle: "% of compliant inventories.",
        target: "Target: 99.5%",
        trend: "+0.2%",
        trendColor: "text-green-400",
        progressRanges: {
          ok: "95%",
          good: "98%",
          excellent: "99%",
          target: "99.5%"
        },
        currentValue: 99.2,
        actionLink: "Details"
      },
      {
        title: "Inventory Turnover",
        value: "25 days",
        subtitle: "Average days of stock.",
        target: "Target: 23 days",
        trend: "+2 days vs target",
        trendColor: "text-orange-400",
        breakdown: {
          "Raw Materials": "25 days (+2 days vs target)",
          "Finished Goods": "18 days (-1 day vs target)"
        },
        actionLink: "Action Plan"
      },
      {
        title: "Total Logistics Cost",
        value: "$335k",
        subtitle: "Freight IN / Freight OUT evolution.",
        target: "Target: $330k",
        trend: "+$5k vs target",
        trendColor: "text-orange-400",
        breakdown: {
          "Freight IN": "$125k (+$5k vs target)",
          "Freight OUT": "$210k (-$10k vs target)"
        },
        chartData: {
          freightIn: [120, 122, 124, 123, 125],
          freightOut: [220, 215, 210, 212, 210]
        },
        actionLink: "Action Plan"
      }
    ]
  }
];

// Export both category datasets
export const dashboardCategoriesMap = {
  "executive-horizon": executiveHorizonCategories,
  "global-ops": globalOpsCategories
};
