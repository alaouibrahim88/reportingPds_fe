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
    global: `${API_DIRECTORY}/GetCoutGlobalStats`,
    costTracking: `${API_DIRECTORY}/GetCostTracking`,
    efficiencyTracking: `${API_DIRECTORY}/GetDataWeekZone`,
    productions: `${API_DIRECTORY}/GetCoutGlobal`,
    productionsDetails: `${API_DIRECTORY}/GetCellCalculRef`,
    detailCell: `${API_DIRECTORY}/GetDetailCoutCell`,
    operatorsByCell: `${API_DIRECTORY}/GetOperatorByCell`,
  }
};
