import { dashboardData } from "@/app/(dashboard)/(home)/_components/data/dashboardData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const yearlyData = {
    weekDataAnnee: [
      {
        zone: "BOOT",
        periode: 2025,
        projetEuro: 0.0,
        serieEuro: 657.31,
        process: 252,
        matiere: 0,
      },
      {
        zone: "HEAD REST",
        periode: 2025,
        projetEuro: 23.43,
        serieEuro: 7292.29,
        process: 1062,
        matiere: 0,
      },
    ],
    returnMessage: "Success",
    returnCode: "0",
  };
  return NextResponse.json(yearlyData);
}
