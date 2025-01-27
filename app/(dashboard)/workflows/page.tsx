import { AnalyticsHeader } from "@/app/(dashboard)/(home)/_components/AnalyticsHeader";
import { MixBarChart } from "./_components/MixBarChart";
import TableZone from "./_components/TableZone";
import { ZoneActivity } from "./_components/ZoneActivity";
import { ChartBar } from "lucide-react";
import { workflowData } from "./_components/data/workflowData";

import { ExpenseChart } from "./_components/ExpenseChart";
import { SalesReport } from "./_components/SalesReport";

export default function Workflows() {
  const { stats, zoneData, chartData } = workflowData;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
          <div className="xl:col-span-4 bg-card rounded-lg p-4 shadow-sm border border-border">
            <ExpenseChart />
          </div>
          <SalesReport />
        </div>

        <div className="bg-card rounded-lg shadow-sm relative border border-border">
          <TableZone data={zoneData} />
        </div>
      </div>
    </div>
  );
}
