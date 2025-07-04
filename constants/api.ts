export const Endpoints = {
  scrap: {
    global: "/api/BridgeHubMTO/GetDataWeekZone",
    statsPerWeek: "/api/BridgeHubMTO/GetCurrDataWeekScrap",
    statsPerYear: "/api/BridgeHubMTO/getDataAnneeScrap",
    details: {
      codeArticle: "/api/BridgeHubMTO/getdataStockcodeDetail",
      zoneDetailType: "/api/BridgeHubMTO/GetZoneDetailType",
      listZone: "/api/BridgeHubMTO/GetLisZone",
    },
  },
  cost: {
    global: "/api/BridgeHubMTO/GetDataWeekZone",
    salesAnalytics: "/api/BridgeHubMTO/GetDataWeekZone",
    effectiveness: "/api/BridgeHubMTO/GetDataWeekZone",
    productions: '/api/BridgeHubMTO/GetCoutGlobal',
    productionsDetails: '/api/BridgeHubMTO/GetCellCalculRef',
  }
};
