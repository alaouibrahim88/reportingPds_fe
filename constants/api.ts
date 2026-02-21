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




/** Internal API base paths — query params are built dynamically at request time */
export const INTERNAL_API_ENDPOINTS = {
	rh: '/GetRHIndicateurs',
	finance: {
		weekly: '/GetFinanceIndicateurs',
		monthly: '/GetFinanceIndicateurs_Mensuel',
	},
	program: {
		weekly: '/GetProgramIndicateurs',
		monthly: '/GetProgramIndicateurs_Mensuel',
	},
	quality: {
		weekly: '/GetQualityIndicateurs',
		monthly: '/GetQualityIndicateurs_Mensuel',
	},
	operations: {
		weekly: '/GetOperationsIndicateurs',
		monthly: '/GetOperationsIndicateurs_Mensuel',
	},
	supplychain: {
		weekly: '/GetInventoryIndicateurs',
		monthly: '/GetInventoryIndicateurs_Mensuel',
	},
	dashboardKpiCategory: '/GetExecutiveHorizonIndicateursWeekly',
	uploadFilesKPICategories: '/ImportExcel/excel',
} as const


export const UPLOAD_FILES_URL =
	`${process.env.NEXT_PUBLIC_BASE_URL_CATEGORY_KPI}/ImportExcel/excel`