import { Endpoints } from "@/constants/api";
import { scrapType } from "@/types";

export interface Filters {
  year: number;
  month: number;
  query: string
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${Endpoints.scrap.global}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          type,
          year: year.toString(),
          month,
        }).toString(),
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchWeeklyScrap = async (week: number): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${Endpoints.scrap.statsPerWeek}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          week: week.toString(),
        }).toString(),
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchYearlyScrap = async (fitlers: Filters): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${Endpoints.scrap.statsPerYear}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          annee: fitlers.year.toString(),
          month: fitlers.month.toString(),
          query: fitlers.query,
        }).toString(),
      }
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
