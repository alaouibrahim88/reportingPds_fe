import { ApiResponse } from "@/app/(dashboard)/(home)/details/[id]/CollapsibleZoneTable";
import { Endpoints } from "@/constants/api";
import { z } from "zod";

const yearSchema = z.number().int().min(2000).max(2100);
const displayTypeSchema = z.string().default("Qte");
const monthSchema = z.string().default("1");
const cellSchema = z.string();

export async function GetZoneDetails(
  year: number,
  displayType: string = "Qte",
  month: string = "3"
) {
  try {
    // Validate inputs
    const validYear = yearSchema.parse(year);
    const validDisplayType = displayTypeSchema.parse(displayType);
    const validMonth = monthSchema.parse(month);

    // Make sure the API URL is correctly configured
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `${apiUrl}${Endpoints.scrap.details.zoneDetailType}?annee=${validYear}&typeaffichage=${validDisplayType}&mois=${validMonth}`,
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

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch zone details:", error);
    throw error;
  }
}