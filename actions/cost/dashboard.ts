import { Endpoints } from "@/constants/api";
import { ProductionIssuesApiResponse } from "@/types";
import { getCookieValue } from "@/lib/storage";

export const fetchProductionIssues = async (): Promise<ProductionIssuesApiResponse | undefined> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${Endpoints.cost.productions}`);
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