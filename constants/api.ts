const API_DIRECTORY = process.env.ENDPOINT_DIRECTORY || `/api/BridgeHubMTO`;
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
      listZone: `${API_DIRECTORY}/GetLisZone`,
    },
  },
  cost: {
    global: `${API_DIRECTORY}/GetDataWeekZone`,
    salesAnalytics: `${API_DIRECTORY}/GetDataWeekZone`,
    effectiveness: `${API_DIRECTORY}/GetDataWeekZone`,
    productions: `${API_DIRECTORY}/GetCoutGlobal`,
    productionsDetails: `${API_DIRECTORY}/GetCellCalculRef`,
    detailCell: `${API_DIRECTORY}/GetDetailCoutCell`,
    operatorsByCell: `${API_DIRECTORY}/GetOperatorByCell`,
  }
};
