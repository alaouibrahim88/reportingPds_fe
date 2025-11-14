import { KPIDashboard } from "@/components/KPIDashboard";

export default function GlobalOps() {
  return (
    <div className="min-h-screen bg-slate-800/90">
      <div className="flex flex-col gap-4 p-4 max-w-[2000px] mx-auto">
        <KPIDashboard dataset="global-ops" />
      </div>
    </div>
  );
}
