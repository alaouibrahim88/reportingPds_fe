import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //@Annee = 2024,
  //@moisEntree = 3
  return NextResponse.json({
    couts_reel_par_annee: "11 515,00",
    couts_std_par_annee: "11 515,00",
    couts_reel_dernier_mois: "1 590,00",
    couts_std_dernier_mois: "1 590,00",
    efficience_dernier_mois: "1 150,00",
  });
}
