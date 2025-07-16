"use server";

import { Endpoints } from "@/constants/api";
import { Cell, Zone } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod"; // Add zod for input validation
import { getCookieValue } from "@/lib/storage";

export type ZoneDetail = {
  typeCell: string;
  semaine: number;
  mois: string;
  annee: number;
  couts: number;
  total_mois: number;
};

export type ZoneTypeData = {
  zone: string;
  details: ZoneDetail[];
};

export type ZoneResponse = {
  zonesType: ZoneTypeData[];
  returnMessage: string;
  returnCode: string;
};

// Input validation schemas
const yearSchema = z.number().int().min(2000).max(2100);
const displayTypeSchema = z.string().default("Qte");
const monthSchema = z.string().default("1");
const cellSchema = z.string();

/**
 * Fetches zone details from the API
 * @param year - The year to fetch data for
 * @param displayType - The type of display (default: "Qte")
 * @param month - The month to fetch data for (default: "1")
 * @returns Zone details response
 */
export async function getZoneDetails(
  year: number,
  displayType: string = "Qte",
  month: string = "1"
) {
  try {
    // Validate inputs
    const validYear = yearSchema.parse(year);
    const validDisplayType = displayTypeSchema.parse(displayType);
    const validMonth = monthSchema.parse(month);

    // Make sure the API URL is correctly configured
    const token = await getCookieValue("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/Polydesign/Reporting/GetZoneDetailType?annee=${validYear}&typeaffichage=${validDisplayType}&mois=${validMonth}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data: ZoneResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch zone details:", error);
    throw error;
  }
}

// Helper function to process zone data for display
export async function processZoneData(data: ZoneResponse) {
  const result: Record<
    string,
    {
      projet: Record<string, number>;
      serie: Record<string, number>;
      monthTotals: Record<string, number>;
    }
  > = {};

  // Extract unique weeks and months for headers
  const weeksAndMonths: {
    weekNum: number;
    month: string;
  }[] = [];

  // Process data to extract unique week/month combinations
  data.zonesType.forEach((zoneType) => {
    zoneType.details.forEach((detail) => {
      const existingEntry = weeksAndMonths.find(
        (item) => item.weekNum === detail.semaine && item.month === detail.mois
      );

      if (!existingEntry) {
        weeksAndMonths.push({
          weekNum: detail.semaine,
          month: detail.mois,
        });
      }
    });
  });

  // Sort by week number
  weeksAndMonths.sort((a, b) => a.weekNum - b.weekNum);

  // Add to result object
  // @ts-ignore
  result.headers = weeksAndMonths;

  // Continue with existing processing logic
  data.zonesType.forEach((zoneType) => {
    const zoneName = zoneType.zone;
    result[zoneName] = {
      projet: {},
      serie: {},
      monthTotals: {},
    };

    // Process details
    zoneType.details.forEach((detail) => {
      const weekKey = `wk${detail.semaine}`;
      const monthKey = detail.mois.toLowerCase();

      // Add week data
      if (detail.typeCell.toLowerCase() === "projet") {
        result[zoneName].projet[weekKey] = detail.couts;
      } else if (detail.typeCell.toLowerCase() === "serie") {
        result[zoneName].serie[weekKey] = detail.couts;
      }

      // Add month totals - only update if not already set or if the current value is higher
      if (
        !result[zoneName].monthTotals[monthKey] ||
        detail.total_mois > result[zoneName].monthTotals[monthKey]
      ) {
        result[zoneName].monthTotals[monthKey] = detail.total_mois;
      }
    });
  });

  return result;
}

/**
 * Fetches all zones from the API
 * @returns List of all zones
 */
export const fetchAllZones = async (): Promise<Zone[]> => {
  try {
    const token = await getCookieValue("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.allZones}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


/**
 * Fetches all cells for a specific zone
 * @param zone - The zone to fetch cells for
 * @returns List of cells for the specified zone
 */
export async function fetchCellByZone(zone: string): Promise<Cell[]> {
  try {
    // Validate input
    const validZone = cellSchema.parse(zone);
    const token = await getCookieValue("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.allCells}?zone=${encodeURIComponent(
        validZone
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );


    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch all cells:", error);
    throw error;
  }
}

/**
 * Fetches operators for a specific cell, year, and month
 * @param year - The year to fetch data for
 * @param month - The month to fetch data for
 * @param cell - The cell to fetch operators for
 * @returns Operator data for the specified parameters
 */
export async function getOperators(year: number, month: number, cell: string, viewMode: string) {
  try {
    const token = await getCookieValue("access_token");
    const validYear = yearSchema.parse(year);
    const validMonth = z.number().int().min(1).max(12).parse(month);
    const validCell = cellSchema.parse(cell);
    const url = new URL(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${Endpoints.scrap.details.codeCellScrap}`);
    
    // Add parameters as query parameters
    url.searchParams.append('annee', validYear.toString());
    url.searchParams.append('mois', validMonth.toString());
    url.searchParams.append('cell', validCell.toString());
    url.searchParams.append('typeaffich', viewMode.toString());
    
    const response = await  fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );
    if (!response.ok) {
      throw new Error(
        `API error: ${response.status} - ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch operators:", error);
    throw error;
  }
}

/**
 * Fetches details per zone from the API
 * @param year - The year to fetch data for
 * @param displayType - The type of display (default: "Qte")
 * @param month - The month to fetch data for (default: "1")
 * @returns Zone details response
 */
export async function getDetailsPerZone(
  year: number,
  displayType: string = "Qte",
  month: string = "1"
  
) {
  try {
    // Validate inputs
    const validYear = yearSchema.parse(year);
    const validDisplayType = displayTypeSchema.parse(displayType);
    const validMonth = monthSchema.parse(month);

    // Make sure the API URL is correctly configured
    const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:4500";

    const response = await fetch(
      `${apiUrl}/api/BridgePolydesign/GetZoneDetailType?annee=${validYear}&typeaffichage=${validDisplayType}&mois=${validMonth}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch zone details:", error);
    throw error;
  }
}
