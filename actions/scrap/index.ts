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

export async function getAllZones() {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4500";
    const response = await fetch(`${url}/api/BridgePolydesign/GetAllZones`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch all zones:", error);
    // Return mock data for development/fallback
    console.log("Using mock zone data as fallback");
    return getMockAllZones();
  }
}

// Mock data for getAllZones as fallback
function getMockAllZones() {
  return {
    getlistZone: [
      {
        libelle: "BOOT",
      },
      {
        libelle: "GAINAGE",
      },
      {
        libelle: "HEAD REST",
      },
      {
        libelle: "NET",
      },
    ],
    returnMessage: "Success",
    returnCode: "0",
  };
}

export async function getAllCells(zone: string) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4500";
    const response = await fetch(
      `${url}/api/BridgePolydesign/GetListCell?zone=${zone}`,
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
    console.error("Failed to fetch all zones:", error);
    // Return mock data for development/fallback
    console.log("Using mock zone data as fallback");
    return getMockAllCells();
  }
}

// Mock data for getAllCells as fallback
function getMockAllCells() {
  return {
    getlistcell: [
      {
        libelle: "A1 FABRIC",
      },
      {
        libelle: "A1 PVC",
      },
      {
        libelle: "A3 FABRIC",
      },
      {
        libelle: "A3 PVC",
      },
      {
        libelle: "AU38X",
      },
      {
        libelle: "BASIS  MFS 1",
      },
      {
        libelle: "BASIS MFS 2",
      },
      {
        libelle: "BROSE",
      },
      {
        libelle: "FIAT",
      },
      {
        libelle: "FIAT FAB",
      },
      {
        libelle: "FIAT PVC",
      },
      {
        libelle: "KIA CEED",
      },
      {
        libelle: "KKS",
      },
      {
        libelle: "NECK PILLOW & CONNECTION",
      },
      {
        libelle: "OV5 FAB",
      },
      {
        libelle: "OV5 PVC",
      },
      {
        libelle: "P8 1",
      },
      {
        libelle: "P8 2",
      },
      {
        libelle: "P8 3",
      },
      {
        libelle: "PORSCHE",
      },
      {
        libelle: "Q3 FABRIC",
      },
      {
        libelle: "Q3 PVC",
      },
      {
        libelle: "SE38X FAB",
      },
      {
        libelle: "SE38X PVC",
      },
      {
        libelle: "SEAT IBIZA FABRIC",
      },
      {
        libelle: "SEAT IBIZA PVC",
      },
      {
        libelle: "SEAT LEON FABRIC",
      },
      {
        libelle: "SEAT LEON FABRIC 2",
      },
      {
        libelle: "SEAT LEON PVC",
      },
      {
        libelle: "T6 CONV FABRIC ",
      },
      {
        libelle: "T6 CONV PVC",
      },
      {
        libelle: "T6 PIP FABRIC ",
      },
      {
        libelle: "T6 PIP FABRIC 2",
      },
      {
        libelle: "T6 PIP PVC ",
      },
      {
        libelle: "TESCA",
      },
      {
        libelle: "TESCA OPEL",
      },
      {
        libelle: "TIGUAN",
      },
      {
        libelle: "TIGUAN 2",
      },
      {
        libelle: "V316",
      },
      {
        libelle: "V43 X 1",
      },
      {
        libelle: "V43 X 2",
      },
      {
        libelle: "V43 X 3",
      },
      {
        libelle: "V54X",
      },
      {
        libelle: "X74-R8",
      },
    ],
    returnMessage: "Success",
    returnCode: "0",
  };
}

export async function getOperators(year: number, month: number, cell: string) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4500";
    const response = await fetch(
      `${url}/api/BridgePolydesign/GetStockCodeCellScrap?annee=${year}&mois=${month}&cell=${cell}&typeaffich=Couts`,
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
    console.error("Failed to fetch all zones:", error);
    // Return mock data for development/fallback
    console.log("Using mock zone data as fallback");
    return getMockOperators();
  }
}

// Mock data for getOperators as fallback
function getMockOperators() {
  return {
    getDataStockCodeCell: [
      {
        stockCode: "9CS205100TSZ",
        coutUnitaire: 1.54531,
        process: 13.90779,
        matiere: 0,
        details: [
          {
            mois: "janvier",
            semaine: 1,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "janvier",
            semaine: 2,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "janvier",
            semaine: 3,
            couts: "3,09",
            total_mois: "3,09",
          },
          {
            mois: "janvier",
            semaine: 4,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "janvier",
            semaine: 5,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "février",
            semaine: 6,
            couts: "0,00",
            total_mois: "6,18",
          },
          {
            mois: "février",
            semaine: 7,
            couts: "0,00",
            total_mois: "6,18",
          },
          {
            mois: "février",
            semaine: 8,
            couts: "0,00",
            total_mois: "6,18",
          },
          {
            mois: "février",
            semaine: 9,
            couts: "6,18",
            total_mois: "6,18",
          },
          {
            mois: "mars",
            semaine: 10,
            couts: "3,09",
            total_mois: "4,64",
          },
          {
            mois: "mars",
            semaine: 11,
            couts: "1,55",
            total_mois: "4,64",
          },
          {
            mois: "mars",
            semaine: 12,
            couts: "0,00",
            total_mois: "4,64",
          },
          {
            mois: "mars",
            semaine: 13,
            couts: "0,00",
            total_mois: "4,64",
          },
          {
            mois: "mars",
            semaine: 14,
            couts: "0,00",
            total_mois: "4,64",
          },
        ],
      },
      {
        stockCode: "9CS205200TSZ",
        coutUnitaire: 1.54565,
        process: 26.27605,
        matiere: 0,
        details: [
          {
            mois: "janvier",
            semaine: 1,
            couts: "0,00",
            total_mois: "20,09",
          },
          {
            mois: "janvier",
            semaine: 2,
            couts: "9,27",
            total_mois: "20,09",
          },
          {
            mois: "janvier",
            semaine: 3,
            couts: "9,27",
            total_mois: "20,09",
          },
          {
            mois: "janvier",
            semaine: 4,
            couts: "1,55",
            total_mois: "20,09",
          },
          {
            mois: "janvier",
            semaine: 5,
            couts: "0,00",
            total_mois: "20,09",
          },
          {
            mois: "février",
            semaine: 6,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "février",
            semaine: 7,
            couts: "1,55",
            total_mois: "3,09",
          },
          {
            mois: "février",
            semaine: 8,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "février",
            semaine: 9,
            couts: "1,55",
            total_mois: "3,09",
          },
          {
            mois: "mars",
            semaine: 10,
            couts: "3,09",
            total_mois: "3,09",
          },
          {
            mois: "mars",
            semaine: 11,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "mars",
            semaine: 12,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "mars",
            semaine: 13,
            couts: "0,00",
            total_mois: "3,09",
          },
          {
            mois: "mars",
            semaine: 14,
            couts: "0,00",
            total_mois: "3,09",
          },
        ],
      },
    ],
    returnMessage: "Success",
    returnCode: "0",
  };
}

export async function getDetailsPerZone(
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
    return getMockDetailsPerZone();
  }
}

// Mock data for getDetailsPerZone as fallback
function getMockDetailsPerZone() {
  return {
    zones: [
      {
        zone: "HEAD REST",
        details: [
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 1,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 2,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 3,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 4,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 5,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 6,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 7,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 8,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 9,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 10,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 11,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 12,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 13,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT LEON FABRIC",
            semaine: 14,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },

          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 1,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 30,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 2,
            mois: "janvier",
            annee: 2025,
            couts: 12,
            total_mois: 30,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 3,
            mois: "janvier",
            annee: 2025,
            couts: 16,
            total_mois: 30,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 4,
            mois: "janvier",
            annee: 2025,
            couts: 2,
            total_mois: 30,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 5,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 30,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 6,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 12,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 7,
            mois: "février",
            annee: 2025,
            couts: 2,
            total_mois: 12,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 8,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 12,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 9,
            mois: "février",
            annee: 2025,
            couts: 10,
            total_mois: 12,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 10,
            mois: "mars",
            annee: 2025,
            couts: 8,
            total_mois: 10,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 11,
            mois: "mars",
            annee: 2025,
            couts: 2,
            total_mois: 10,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 12,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 10,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 13,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 10,
          },
          {
            typeCell: "Serie",
            cellule: "SEAT IBIZA PVC",
            semaine: 14,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 10,
          },

          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 1,
            mois: "janvier",
            annee: 2025,
            couts: 20,
            total_mois: 190,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 2,
            mois: "janvier",
            annee: 2025,
            couts: 40,
            total_mois: 190,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 3,
            mois: "janvier",
            annee: 2025,
            couts: 6,
            total_mois: 190,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 4,
            mois: "janvier",
            annee: 2025,
            couts: 40,
            total_mois: 190,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 5,
            mois: "janvier",
            annee: 2025,
            couts: 84,
            total_mois: 190,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 6,
            mois: "février",
            annee: 2025,
            couts: 46,
            total_mois: 176,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 7,
            mois: "février",
            annee: 2025,
            couts: 36,
            total_mois: 176,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 8,
            mois: "février",
            annee: 2025,
            couts: 36,
            total_mois: 176,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 9,
            mois: "février",
            annee: 2025,
            couts: 58,
            total_mois: 176,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 10,
            mois: "mars",
            annee: 2025,
            couts: 42,
            total_mois: 84,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 11,
            mois: "mars",
            annee: 2025,
            couts: 42,
            total_mois: 84,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 12,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 84,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 13,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 84,
          },
          {
            typeCell: "Serie",
            cellule: "BASIS  MFS 1",
            semaine: 14,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 84,
          },

          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 1,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 26,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 2,
            mois: "janvier",
            annee: 2025,
            couts: 8,
            total_mois: 26,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 3,
            mois: "janvier",
            annee: 2025,
            couts: 2,
            total_mois: 26,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 4,
            mois: "janvier",
            annee: 2025,
            couts: 16,
            total_mois: 26,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 5,
            mois: "janvier",
            annee: 2025,
            couts: 0,
            total_mois: 26,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 6,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 7,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 8,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 9,
            mois: "février",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 10,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 11,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 12,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 13,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 14,
            mois: "mars",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 15,
            mois: "avril",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 16,
            mois: "avril",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 17,
            mois: "avril",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 18,
            mois: "avril",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 19,
            mois: "mai",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 20,
            mois: "mai",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 21,
            mois: "mai",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 22,
            mois: "mai",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 23,
            mois: "juin",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 24,
            mois: "juin",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 25,
            mois: "juin",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 26,
            mois: "juin",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 27,
            mois: "juin",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 28,
            mois: "juillet",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 29,
            mois: "juillet",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 30,
            mois: "juillet",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 31,
            mois: "juillet",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 32,
            mois: "août",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 33,
            mois: "août",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 34,
            mois: "août",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 35,
            mois: "août",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 36,
            mois: "septembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 37,
            mois: "septembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 38,
            mois: "septembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 39,
            mois: "septembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 40,
            mois: "septembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 41,
            mois: "octobre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 42,
            mois: "octobre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 43,
            mois: "octobre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 44,
            mois: "octobre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 45,
            mois: "novembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 46,
            mois: "novembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 47,
            mois: "novembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 48,
            mois: "novembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 49,
            mois: "décembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 50,
            mois: "décembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 51,
            mois: "décembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
          {
            typeCell: "Projet",
            cellule: "Q3 PVC",
            semaine: 52,
            mois: "décembre",
            annee: 2025,
            couts: 0,
            total_mois: 0,
          },
        ],
      },
    ],
    returnMessage: "Success",
    returnCode: "0",
  };
}
