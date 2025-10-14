import { GlobalCost } from "@/types";

export function AnalyticsHeader({stats}: {stats: GlobalCost | undefined}) {
  const detail = stats?.details?.[0] ?? {
      couts_std_par_annee: 0,
      couts_reel_par_annee: 0,
      couts_reel_dernier_mois: 0,
      couts_std_dernier_mois: 0,
      efficience_dernier_mois: 0
  };
  const difference_yearly = Number(detail?.couts_std_par_annee) - Number(detail?.couts_reel_par_annee);
  const difference_monthly = Number(detail?.couts_std_dernier_mois) - Number(detail?.couts_reel_dernier_mois);
  const yearlyStyle = difference_yearly > 0 ? 'text-green-600 bg-green-100 border-green-200' : 'text-red-600 bg-red-100 border-red-200';
  const monthlyStyle = difference_monthly > 0 ? 'text-green-600 bg-green-100 border-green-200' : 'text-red-600 bg-red-100 border-red-200';
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="p-3 transition-all hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <div className="relative">
          <div className="text-xs font-medium text-white-600 mb-1 uppercase tracking-wider">
            Year
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white-900">{detail?.couts_reel_par_annee} Euro</span>
            {difference_yearly !== 0 && <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${yearlyStyle}`}>
              {(difference_yearly > 0 ? '+' : '-') + difference_yearly}
            </span>}
          </div>
          <div className="text-xs text-white-600 mt-1 flex items-center">
            <span className="font-medium">STD.C</span>
            <span className="ml-1.5 text-white-700">{detail?.couts_std_par_annee}</span>
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
            <span className="text-lg font-bold text-white-900">{detail?.couts_reel_dernier_mois} Euro</span>
            {difference_monthly !== 0 && <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${monthlyStyle}`}>
              {(difference_monthly > 0 ? '+' : '-') + difference_monthly}
            </span>}
          </div>
          <div className="text-xs text-white-600 mt-1 flex items-center">
            <span className="font-medium">STD.C</span>
            <span className="ml-1.5 text-white-700">{detail?.couts_std_dernier_mois}</span>
          </div>
        </div>
      </div>

      <div className="p-3 transition-all hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <div className="relative">
          <div className="text-xs font-medium text-white-600 mb-1 uppercase tracking-wider">
            Efficience OP Monthly
          </div>
          <div className="text-lg font-bold text-white-900">{detail?.efficience_dernier_mois}</div>
        </div>
      </div>
    </div>
  );
}
