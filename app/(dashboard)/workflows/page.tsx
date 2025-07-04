'use client';
import { AnalyticsHeader } from "./_components/AnalyticsHeader";
import TableZone from "./_components/TableZone";
import { workflowData } from "./_components/data/workflowData";
import { ExpenseChart } from "./_components/ExpenseChart";
import { SalesReport } from "./_components/SalesReport";
import { useEffect, useState } from "react";
import { fetchProductionIssues } from "@/actions/cost/dashboard";
import { ProductionIssuesApiResponse } from "@/types";

export default function WorkflowsPage() {
  const { stats, zoneData } = workflowData;
  const [productionIssue, setProductionIssue] = useState<ProductionIssuesApiResponse | undefined>(undefined);
  

  useEffect(() => {
    fetchProductionIssues().then(setProductionIssue);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        <AnalyticsHeader stats={stats} />
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
