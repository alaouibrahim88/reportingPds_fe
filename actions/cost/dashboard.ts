import { Endpoints } from "@/constants/api";
import { ProductionIssuesApiResponse, CellCalculRefDetailApiResponse, GlobalCost, CostTracking as CostTracking, EfficiencyTracking } from "@/types";
import { getCookieValue } from "@/lib/storage";

export const fetchCostTrackings = async (year: number, month?: number): Promise<CostTracking[] | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    //const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.costTracking}`);
    const url = new URL(`http://localhost:3000/api/BridgeHubMTO/GetCostTracking`);
    url.searchParams.append('year', year.toString());
    url.searchParams.append('month', month?.toString() ?? 'All');
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...(token && { Authorization: `Bearer ${token}` }),
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching production issues:", error);
    return undefined;
  }
};

export const fetchEfficiencyTrackings = async (year: number, month?: number): Promise<EfficiencyTracking[] | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.efficiencyTracking}`);
    url.searchParams.append('year', year.toString());
    url.searchParams.append('month', month?.toString() ?? 'All');
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...(token && { Authorization: `Bearer ${token}` }),
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching production issues:", error);
    return undefined;
  }
};

export const fetchGlobalCosts = async (): Promise<GlobalCost | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    //const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.global}`);
    const url = new URL(`http://localhost:3000/api/BridgeHubMTO/GetCoutGlobalStats`);
    url.searchParams.append('Annee', new Date().getFullYear().toString());
    url.searchParams.append('Mois', new Date().getMonth().toString());
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...(token && { Authorization: `Bearer ${token}` }),
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching production issues:", error);
    return undefined;
  }
};

export const fetchProductionIssues = async (): Promise<ProductionIssuesApiResponse | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    console.log('token : ', token);
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.productions}`);
    url.searchParams.append('Annee', "2024");//new Date().getFullYear().toString());
    url.searchParams.append('Mois', "1");//(new Date().getMonth() + 1).toString());
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching production issues:", error);
    return undefined;
  }
};

export const fetchZoneCalculationDetails = async (zoneId: number): Promise<CellCalculRefDetailApiResponse | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.productionsDetails}`);
    
    // Add zone_id as query parameter
    url.searchParams.append('zone_id', zoneId.toString());
    
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...(token && { Authorization: `Bearer ${token}` }),
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching zone calculation details:", error);
    return undefined;
  }
};