import { Endpoints } from "@/constants/api";
import { scrapType } from "@/types";
import { getCookieValue } from "@/lib/storage";

export interface Filters {
  year: number;
  month: string;
  query: string
}

interface GlobalScrapData {
  currWeekData: any[];
  returnCode: string;
  returnMessage: string;
}

async function parseJsonResponse<T>(response: Response, fallback: T): Promise<T> {
  if (response.status === 204) {
    return fallback;
  }

  const body = await response.text();

  if (!response.ok) {
    console.error("Scrap dashboard request failed", {
      status: response.status,
      statusText: response.statusText,
      body: body.slice(0, 500),
    });
    return fallback;
  }

  if (!body.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(body) as T;
  } catch (error) {
    console.error("Scrap dashboard response is not valid JSON", {
      status: response.status,
      contentType: response.headers.get("content-type"),
      body: body.slice(0, 500),
      error,
    });
    return fallback;
  }
}

export const fetchGlobalScrap = async ({
  type,
  year,
  month,
}: {
  type: scrapType;
  year: number;
  month: string;
}): Promise<any> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.scrap.global}`);
    url.searchParams.append("type", type === 'zone' ? 'All' : type);   
    url.searchParams.append("month", month);   
    url.searchParams.append("annee", year.toString());

    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return parseJsonResponse(response, null);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchWeeklyScrap = async (week: number, year?: number): Promise<any> => {
  try {
    const token = await getCookieValue("access_token");
    console.log('^fetchZeeklyScrqp token', token);
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.scrap.statsPerWeek}`);
    url.searchParams.append("week", week.toString());
    if (year) {
      url.searchParams.append("annee", year.toString());
    }
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        }
      }
    );

    return parseJsonResponse(response, undefined);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const fetchYearlyScrap = async (fitlers: Filters): Promise<any> => {
  try {
    const token = await getCookieValue("access_token");
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.scrap.statsPerYear}`);
    url.searchParams.append("annee", fitlers.year.toString());
    url.searchParams.append("mois", fitlers.month.toString());
    url.searchParams.append("query", fitlers.query);  
  
    const response = await fetch(`${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        }
      }
    );

    return parseJsonResponse(response, { weekDataAnnee: [] });
  } catch (error) {
    console.error(error);
    return { weekDataAnnee: [] };
  }
};
