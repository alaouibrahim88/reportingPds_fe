import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json([
    {
      zone_id: 1,
      zone_nom: "Wrapping 1",
      couts_reel: "45600,00",
      couts_std: "1200,00",
      ecart: "45600,00",
    },
    {
      zone_id: 2,
      zone_nom: "Nets",
      couts_reel: "99600,00",
      couts_std: "2500,00",
      ecart: "79720,00",
    },
    {
      zone_id: 3,
      zone_nom: "Sunvisors",
      couts_reel: "12600,00",
      couts_std: "12500,00",
      ecart: "3704,00",
    },
    {
      zone_id: 4,
      zone_nom: "Knitting",
      couts_reel: "41600,00",
      couts_std: "12500,00",
      ecart: "19720,00",
    },
    {
      zone_id: 5,
      zone_nom: "Injection",
      couts_reel: "600,00",
      couts_std: "12500,00",
      ecart: "830,00",
    },
    {
      zone_id: 6,
      zone_nom: "RW Nets",
      couts_reel: "19600,00",
      couts_std: "12500,00",
      ecart: "13720,00",
    },
    {
      zone_id: 7,
      zone_nom: "RW Boot",
      couts_reel: "19600,00",
      couts_std: "12500,00",
      ecart: "10,00",
    },
  ]);
}
