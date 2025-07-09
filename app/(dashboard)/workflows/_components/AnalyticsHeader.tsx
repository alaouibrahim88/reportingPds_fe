import { GlobalCost } from "@/types";

export function AnalyticsHeader({stats}: {stats: GlobalCost | undefined}) {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="p-3 transition-all hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <div className="relative">
          <div className="text-xs font-medium text-white-600 mb-1 uppercase tracking-wider">
            Year
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white-900">{stats?.couts_reel_par_annee ?? '##'} Euro</span>
            <span className="px-2 py-0.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full border border-green-200">
              +122
            </span>
          </div>
          <div className="text-xs text-white-600 mt-1 flex items-center">
            <span className="font-medium">STD.C</span>
            <span className="ml-1.5 text-white-700">{stats?.couts_std_par_annee ?? '##'}</span>
          </div>
        </div>
      </div>

      <div className="p-3 transition-all hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <div className="relative">
          <div className="text-xs font-medium text-white-600 mb-1 uppercase tracking-wider">
            Monthly
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white-900">{stats?.couts_reel_dernier_mois ?? '##'} Euro</span>
            <span className="px-2 py-0.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full border border-green-200">
              +122
            </span>
          </div>
          <div className="text-xs text-white-600 mt-1 flex items-center">
            <span className="font-medium">STD.C</span>
            <span className="ml-1.5 text-white-700">{stats?.couts_std_dernier_mois ?? '##'}</span>
          </div>
        </div>
      </div>

      <div className="p-3 transition-all hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <div className="relative">
          <div className="text-xs font-medium text-white-600 mb-1 uppercase tracking-wider">
            Efficience OP Monthly
          </div>
          <div className="text-lg font-bold text-white-900">{stats?.efficience_dernier_mois ?? '##'}</div>
        </div>
      </div>
    </div>
  );
}
