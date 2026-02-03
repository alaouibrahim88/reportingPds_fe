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


/** Base URL for internal Python backend (RH, Finance, Program, Quality, Operations, Dashboard KPI) */
export const INTERNAL_API_BASE_URL =
	process.env.INTERNAL_API_BASE_URL || 'http://127.0.0.1:5001'

/** @deprecated Use INTERNAL_API_BASE_URL instead */
export const BASE_URL_CATEGORY_KPI = INTERNAL_API_BASE_URL

/** Internal API endpoint paths (relative to INTERNAL_API_BASE_URL) */
export const INTERNAL_API_ENDPOINTS = {
	rh: '/rh-Indicateurs',
	finance: '/finance',
	program: '/program',
	quality: {
		monthly: '/quality-indicateurs-monthly',
		weekly: '/quality-indicateurs-weekly',
	},
	operations: '/operations',
	dashboardKpiCategory: '/dashbaord-kpi-category',
} as const
