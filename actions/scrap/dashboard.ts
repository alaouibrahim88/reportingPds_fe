import { Endpoints } from "@/constants/api";
import { scrapType } from "@/types";

export interface Filters {
  year: number;
  month: number;
  query: string
}

interface GlobalScrapData {
  currWeekData: any[];
  returnCode: string;
  returnMessage: string;
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
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${Endpoints.scrap.global}`);
    url.searchParams.append("type", type === 'zone' ? 'All' : type);   
    url.searchParams.append("month", month);   
    url.searchParams.append("annee", year.toString());

    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
    });
    return response?.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchWeeklyScrap = async (week: number): Promise<any> => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${Endpoints.scrap.statsPerWeek}`);
    url.searchParams.append("week", week.toString() === '30' ? '1' : week.toString());
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchYearlyScrap = async (fitlers: Filters): Promise<any> => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${Endpoints.scrap.statsPerYear}`);
    url.searchParams.append("annee", fitlers.year.toString());
    url.searchParams.append("month", fitlers.month.toString()); 
    url.searchParams.append("query", fitlers.query);  
  
    const response = await fetch(`${url}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
