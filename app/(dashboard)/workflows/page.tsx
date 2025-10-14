'use client';
import { AnalyticsHeader } from "./_components/AnalyticsHeader";
import TableZone from "./_components/TableZone";
import { ExpenseChart } from "./_components/ExpenseChart";
import { SalesReport } from "./_components/SalesReport";
import { useEffect, useState, useCallback } from "react";
import { fetchGlobalCosts, fetchProductionIssues, fetchCostTrackings, fetchEfficiencyTrackings } from "@/actions/cost/dashboard";
import { GlobalCost, ProductionIssuesApiResponse, CostTracking, EfficiencyTracking } from "@/types";

export default function WorkflowsPage() {
  const [globalCost, setGlobalCosts] = useState<GlobalCost | undefined>(undefined);
  const [productionIssue, setProductionIssue] = useState<ProductionIssuesApiResponse | undefined>(undefined);
  const [costTracking, setCostTracking] = useState<CostTracking[] | undefined>(undefined);
  const [efficiencyTracking, setEfficiencyTracking] = useState<EfficiencyTracking[] | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(new Date().getMonth() + 1);
 
  // Fetch data that doesn't depend on year/month filters (only once on mount)
  const fetchStaticData = useCallback(async () => {
    console.log('fetchStaticData');
    const [globalCostData, productionIssueData] = await Promise.all([
      fetchGlobalCosts(),
      fetchProductionIssues()
    ]);
    
    setGlobalCosts(globalCostData);
    setProductionIssue(productionIssueData);
  }, []);

  // Fetch data that depends on year/month filters
  const fetchFilteredData = useCallback(async () => {
    const [costTrackingData, efficiencyTrackingData] = await Promise.all([
      fetchCostTrackings(selectedYear, selectedMonth),
      fetchEfficiencyTrackings(selectedYear, selectedMonth)
    ]);

    setCostTracking(costTrackingData?.details);
    setEfficiencyTracking(efficiencyTrackingData?.details);
  }, [selectedYear, selectedMonth]);

  // Fetch static data once on mount
  useEffect(() => {
    fetchStaticData();
  }, [fetchStaticData]);

  // Fetch filtered data when year/month changes
  useEffect(() => {
    fetchFilteredData();
  }, [fetchFilteredData]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        <AnalyticsHeader stats={globalCost} />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <div className="xl:col-span-4 bg-card rounded-lg p-4 shadow-sm border border-border">
            <ExpenseChart 
              costs={costTracking} 
              efficiency={efficiencyTracking}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              onYearChange={setSelectedYear}
              onMonthChange={setSelectedMonth}
            />
          </div>
          {/* <SalesReport /> */}
        </div>

        <div className="bg-card rounded-lg shadow-sm relative border border-border">
          <TableZone data={productionIssue} />
        </div>
      </div>
    </div>
  );
}
