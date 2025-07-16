import { Endpoints } from "@/constants/api";
import { getCookieValue } from "@/lib/storage";
import { CellDetailApiResponse, OperatorDetailsApiResponse } from "@/types";

export const fetchCellDetails = async (
  zoneId: number, 
  month: number, 
  year: number
): Promise<CellDetailApiResponse | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.detailCell}`);
    
    // Add parameters as query parameters
    url.searchParams.append('cellId', zoneId.toString());
    url.searchParams.append('month', month.toString());
    url.searchParams.append('year', year.toString());
    
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
    console.error("Error fetching cell details:", error);
    return undefined;
  }
};

export const fetchOperatorDetailsByCell = async (
  zoneId: number, 
  cellId: number,
  month: number,
  year: number
): Promise<OperatorDetailsApiResponse | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.cost.operatorsByCell}`);
    
    // Add parameters as query parameters
    url.searchParams.append('zoneId', zoneId.toString());
    url.searchParams.append('cellId', cellId.toString());
    url.searchParams.append('month', month.toString());
    url.searchParams.append('year', year.toString());
    
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
    console.error("Error fetching cell details:", error);
    return undefined;
  }
};