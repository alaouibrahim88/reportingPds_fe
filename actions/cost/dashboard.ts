import { Endpoints } from "@/constants/api";
import { ProductionIssuesApiResponse, CellCalculRefDetailApiResponse, GlobalCost, CostTracking as CostTracking, EfficiencyTracking, CostTrackingResponse, EfficiencyTrackingResponse } from "@/types";
import { getCookieValue } from "@/lib/storage";

export const fetchCostTrackings = async (year: number, month?: number): Promise<CostTrackingResponse | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.costTracking}`);
    url.searchParams.append('Annee', year.toString());
    url.searchParams.append('mois', month?.toString() ?? '0');
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

export const fetchEfficiencyTrackings = async (year: number, month?: number): Promise<EfficiencyTrackingResponse | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.efficiencyTracking}`);
    url.searchParams.append('Annee', year.toString());
    url.searchParams.append('mois', month?.toString() ?? '0');
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
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.global}`);
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