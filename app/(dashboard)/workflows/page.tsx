'use client';
import { AnalyticsHeader } from "./_components/AnalyticsHeader";
import TableZone from "./_components/TableZone";
import { ExpenseChart } from "./_components/ExpenseChart";
import { SalesReport } from "./_components/SalesReport";
import { useEffect, useState } from "react";
import { fetchGlobalCosts, fetchProductionIssues } from "@/actions/cost/dashboard";
import { GlobalCost, ProductionIssuesApiResponse } from "@/types";

export default function WorkflowsPage() {
  const [globalCost, setGlobalCosts] = useState<GlobalCost | undefined>(undefined);
  const [productionIssue, setProductionIssue] = useState<ProductionIssuesApiResponse | undefined>(undefined);
  
  useEffect(() => {
    const fetchData = async () => {
      const [globalCostData, productionIssueData] = await Promise.all([
        fetchGlobalCosts(),
        fetchProductionIssues()
      ]);
      
      setGlobalCosts(globalCostData);
      setProductionIssue(productionIssueData);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        <AnalyticsHeader stats={globalCost} />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
          <div className="xl:col-span-4 bg-card rounded-lg p-4 shadow-sm border border-border">
            <ExpenseChart />
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
