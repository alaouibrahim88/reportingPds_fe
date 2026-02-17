const API_DIRECTORY = process.env.ENDPOINT_DIRECTORY || `/api/Polydesign/Reporting`;
export const Endpoints = {
  allZones: `${API_DIRECTORY}/GetLisZone`,
  allCells: `${API_DIRECTORY}/GetListCell`,
  scrap: {
    global: `${API_DIRECTORY}/GetDataWeekZone`,
    statsPerWeek: `${API_DIRECTORY}/GetCurrDataWeekScrap`,
    statsPerYear: `${API_DIRECTORY}/getDataAnneeScrap`,
    details: {
      codeArticle: `${API_DIRECTORY}/getdataStockcodeDetail`,
      zoneDetailType: `${API_DIRECTORY}/GetZoneDetailType`,
      zoneDetailsContent: `${API_DIRECTORY}/GetZoneDetail`,
      listZone: `${API_DIRECTORY}/GetLisZone`,
      codeCellScrap: `${API_DIRECTORY}/GetStockCodeCellScrap`, 
    },
  },
  cost: {
    global: `${API_DIRECTORY}/GetCoutsHeaderGlobal`,
    costTracking: `${API_DIRECTORY}/GetCoutsZoneGlobal`,
    efficiencyTracking: `${API_DIRECTORY}/GetCoutsEfficienceGlobal`,
    productions: `${API_DIRECTORY}/GetCoutGlobal`,
    productionsDetails: `${API_DIRECTORY}/GetCellCalculRef`,
    detailCell: `${API_DIRECTORY}/GetDetailCoutCell`,
    operatorsByCell: `${API_DIRECTORY}/GetCellDetaitByOper`,
  }
};




/** Internal API endpoint paths grouped by period (weekly/monthly) */
export const INTERNAL_API_ENDPOINTS = {
	rh: "/GetRHIndicateurs?SemaineCourante=11&AnneeCourante=2025",
	finance: {
		weekly: '/GetFinanceIndicateurs?SemaineCourante=10&AnneeCourante=2025',
		monthly:
			'/GetFinanceIndicateurs_Mensuel?MoisCourante=4&AnneeCourante=2025',
	},
	program: {
		weekly: '/GetProgramIndicateurs?SemaineCourante=40&AnneeCourante=2025',
		monthly:
			'/GetProgramIndicateurs_Mensuel?MoisCourante=6&AnneeCourante=2025',
	},
	quality: {
		weekly: '/GetQualityIndicateurs?SemaineCourante=5&AnneeCourante=2026',
		monthly: '/GetQualityIndicateurs_Mensuel?MoisCourante=1&AnneeCourante=2026',
	},
	operations: {
		weekly: '/GetOperationsIndicateurs?SemaineCourante=10&AnneeCourante=2026',
		monthly:
			'/GetOperationsIndicateurs_Mensuel?MoisCourante=5&AnneeCourante=2025',
	},
  supplychain: {
		weekly: '/GetInventoryIndicateurs?SemaineCourante=5&AnneeCourante=2026',
		monthly:
			'/GetInventoryIndicateurs_Mensuel?MoisCourante=5&AnneeCourante=2025',
	},
	dashboardKpiCategory:"/GetExecutiveHorizonIndicateursWeekly",
	uploadFilesKPICategories: '/ImportExcel/excel',
} as const


export const UPLOAD_FILES_URL =
	`${process.env.NEXT_PUBLIC_BASE_URL_CATEGORY_KPI}/ImportExcel/excel`