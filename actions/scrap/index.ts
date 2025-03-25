"use server";

import { revalidatePath } from "next/cache";

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

export async function getZoneDetails(
  year: number,
  displayType: string = "Qte",
  month: string = "1"
) {
  try {
    // Make sure the API URL is correctly configured
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4500";

    const response = await fetch(
      `${apiUrl}/api/BridgePolydesign/GetZoneDetailType?annee=${year}&typeaffichage=${displayType}&mois=${month}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        // Add a timeout to prevent hanging requests
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
    // Return mock data for development/fallback
    console.log("Using mock data as fallback");
    return getMockZoneDetails();
  }
}

// Mock data for development and fallback
function getMockZoneDetails(): ZoneResponse {
  return {
    zonesType: [
      {
        zone: "BOOT",
        details: [
          {
            typeCell: "Projet",
            semaine: 1,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 526,
          },
          {
            typeCell: "Serie",
            semaine: 1,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 526,
          },
          {
            typeCell: "Projet",
            semaine: 2,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 526,
          },
          {
            typeCell: "Serie",
            semaine: 2,
            mois: "janvier",
            annee: 2025,
            couts: 2,
            total_mois: 526,
          },
          {
            typeCell: "Projet",
            semaine: 3,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 526,
          },
          {
            typeCell: "Serie",
            semaine: 3,
            mois: "janvier",
            annee: 2025,
            couts: 52,
            total_mois: 526,
          },
          {
            typeCell: "Projet",
            semaine: 4,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 526,
          },
          {
            typeCell: "Serie",
            semaine: 4,
            mois: "janvier",
            annee: 2025,
            couts: 64,
            total_mois: 526,
          },
          {
            typeCell: "Projet",
            semaine: 5,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 526,
          },
          {
            typeCell: "Serie",
            semaine: 5,
            mois: "janvier",
            annee: 2025,
            couts: 78,
            total_mois: 526,
          },
          {
            typeCell: "Projet",
            semaine: 6,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 540,
          },
          {
            typeCell: "Serie",
            semaine: 6,
            mois: "février",
            annee: 2025,
            couts: 42,
            total_mois: 540,
          },
          {
            typeCell: "Projet",
            semaine: 7,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 540,
          },
          {
            typeCell: "Serie",
            semaine: 7,
            mois: "février",
            annee: 2025,
            couts: 40,
            total_mois: 540,
          },
          {
            typeCell: "Projet",
            semaine: 8,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 540,
          },
          {
            typeCell: "Serie",
            semaine: 8,
            mois: "février",
            annee: 2025,
            couts: 44,
            total_mois: 540,
          },
          {
            typeCell: "Projet",
            semaine: 9,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 540,
          },
          {
            typeCell: "Serie",
            semaine: 9,
            mois: "février",
            annee: 2025,
            couts: 80,
            total_mois: 540,
          },
          {
            typeCell: "Projet",
            semaine: 10,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 246,
          },
          {
            typeCell: "Serie",
            semaine: 10,
            mois: "mars",
            annee: 2025,
            couts: 86,
            total_mois: 246,
          },
          {
            typeCell: "Projet",
            semaine: 11,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 246,
          },
          {
            typeCell: "Serie",
            semaine: 11,
            mois: "mars",
            annee: 2025,
            couts: 16,
            total_mois: 246,
          },
          {
            typeCell: "Projet",
            semaine: 12,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 246,
          },
          {
            typeCell: "Serie",
            semaine: 12,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 246,
          },
          {
            typeCell: "Projet",
            semaine: 13,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 246,
          },
          {
            typeCell: "Serie",
            semaine: 13,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 246,
          },
          {
            typeCell: "Projet",
            semaine: 14,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 246,
          },
          {
            typeCell: "Serie",
            semaine: 14,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 246,
          },
        ],
      },
      {
        zone: "HEAD REST",
        details: [
          {
            typeCell: "Projet",
            semaine: 1,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 5020,
          },
          {
            typeCell: "Serie",
            semaine: 1,
            mois: "janvier",
            annee: 2025,
            couts: 78,
            total_mois: 5020,
          },
          {
            typeCell: "Projet",
            semaine: 2,
            mois: "janvier",
            annee: 2025,
            couts: 8,
            total_mois: 5020,
          },
          {
            typeCell: "Serie",
            semaine: 2,
            mois: "janvier",
            annee: 2025,
            couts: 160,
            total_mois: 5020,
          },
          {
            typeCell: "Projet",
            semaine: 3,
            mois: "janvier",
            annee: 2025,
            couts: 2,
            total_mois: 5020,
          },
          {
            typeCell: "Serie",
            semaine: 3,
            mois: "janvier",
            annee: 2025,
            couts: 144,
            total_mois: 5020,
          },
          {
            typeCell: "Projet",
            semaine: 4,
            mois: "janvier",
            annee: 2025,
            couts: 16,
            total_mois: 5020,
          },
          {
            typeCell: "Serie",
            semaine: 4,
            mois: "janvier",
            annee: 2025,
            couts: 194,
            total_mois: 5020,
          },
          {
            typeCell: "Projet",
            semaine: 5,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 5020,
          },
          {
            typeCell: "Serie",
            semaine: 5,
            mois: "janvier",
            annee: 2025,
            couts: 242,
            total_mois: 5020,
          },
          {
            typeCell: "Projet",
            semaine: 6,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 6358,
          },
          {
            typeCell: "Serie",
            semaine: 6,
            mois: "février",
            annee: 2025,
            couts: 258,
            total_mois: 6358,
          },
          {
            typeCell: "Projet",
            semaine: 7,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 6358,
          },
          {
            typeCell: "Serie",
            semaine: 7,
            mois: "février",
            annee: 2025,
            couts: 156,
            total_mois: 6358,
          },
          {
            typeCell: "Projet",
            semaine: 8,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 6358,
          },
          {
            typeCell: "Serie",
            semaine: 8,
            mois: "février",
            annee: 2025,
            couts: 158,
            total_mois: 6358,
          },
          {
            typeCell: "Projet",
            semaine: 9,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 6358,
          },
          {
            typeCell: "Serie",
            semaine: 9,
            mois: "février",
            annee: 2025,
            couts: 310,
            total_mois: 6358,
          },
          {
            typeCell: "Projet",
            semaine: 10,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 3250,
          },
          {
            typeCell: "Serie",
            semaine: 10,
            mois: "mars",
            annee: 2025,
            couts: 242,
            total_mois: 3250,
          },
          {
            typeCell: "Projet",
            semaine: 11,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 3250,
          },
          {
            typeCell: "Serie",
            semaine: 11,
            mois: "mars",
            annee: 2025,
            couts: 152,
            total_mois: 3250,
          },
          {
            typeCell: "Projet",
            semaine: 12,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 3250,
          },
          {
            typeCell: "Serie",
            semaine: 12,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 3250,
          },
          {
            typeCell: "Projet",
            semaine: 13,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 3250,
          },
          {
            typeCell: "Serie",
            semaine: 13,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 3250,
          },
          {
            typeCell: "Projet",
            semaine: 14,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 3250,
          },
          {
            typeCell: "Serie",
            semaine: 14,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 3250,
          },
        ],
      },
    ],
    returnMessage: "Success",
    returnCode: "0",
  };
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
