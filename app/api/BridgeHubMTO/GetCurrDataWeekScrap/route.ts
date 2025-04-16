import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const weeklyData = {
    currWeekData: [
      {
        libelle: "Semaine 2",
        projetEuro: 7.2,
        serieEuro: 549.89,
        process: 85,
        matiere: 0,
        qteParZone: 0,
      },
      {
        libelle: "BOOT",
        projetEuro: 0,
        serieEuro: 0,
        process: 0,
        matiere: 0,
        qteParZone: 1,
      },
      {
        libelle: "HEAD REST",
        projetEuro: 0,
        serieEuro: 0,
        process: 0,
        matiere: 0,
        qteParZone: 84,
      },
    ],
    returnMessage: "Success",
    returnCode: "0",
  };
  return NextResponse.json(weeklyData);
}
