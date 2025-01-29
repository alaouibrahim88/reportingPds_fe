import { AnalyticsHeader } from "./_components/AnalyticsHeader";
import TableZone from "./_components/TableZone";
import { workflowData } from "./_components/data/workflowData";
import { ExpenseChart } from "./_components/ExpenseChart";
import { SalesReport } from "./_components/SalesReport";

export default function WorkflowsPage() {
  const { stats, zoneData } = workflowData;

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
          <TableZone data={zoneData} />
        </div>
      </div>
    </div>
  );
}
