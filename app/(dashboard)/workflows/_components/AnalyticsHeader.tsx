interface Stat {
  title: string;
  sales: string;
  quantity: string;
  previousSales: number;
  period: string;
}

interface AnalyticsHeaderProps {
  stats: Stat[];
}

export function AnalyticsHeader({ stats }: AnalyticsHeaderProps) {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="p-3 transition-all hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <div className="relative">
          <div className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
            Year
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">999.83 Euro</span>
            <span className="px-2 py-0.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full border border-green-200">
              +122
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1 flex items-center">
            <span className="font-medium">STD.C</span>
            <span className="ml-1.5 text-gray-700">900</span>
          </div>
        </div>
      </div>

      <div className="p-3 transition-all hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <div className="relative">
          <div className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
            Monthly
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">999.83 Euro</span>
            <span className="px-2 py-0.5 text-xs font-semibold text-green-600 bg-green-100 rounded-full border border-green-200">
              +122
            </span>
          </div>
          <div className="text-xs text-gray-600 mt-1 flex items-center">
            <span className="font-medium">STD.C</span>
            <span className="ml-1.5 text-gray-700">900</span>
          </div>
        </div>
      </div>

      <div className="p-3 transition-all hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        <div className="relative">
          <div className="text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
            Efficience OP Monthly
          </div>
          <div className="text-lg font-bold text-gray-900">999.83</div>
        </div>
      </div>
    </div>
  );
}
