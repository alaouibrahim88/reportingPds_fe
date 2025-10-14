import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cellId = searchParams.get('cellId');
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  
  return NextResponse.json({
    "details": [
      {
        "id": 'Cell1',
        "semaine": "2024-W01",
        "mois": "janvier",
        "mois_num": 1,
        "annee": 2024,
        "performance_status": "green",
        "taux_std": "92,00",
        "taux_reel": "1 000,00",
        "heurs_std": "92,00",
        "heure_reel": "1 000,00",
        "couts_std": "500,00",
        "couts_reel": "500,00",
        "efficience": "1 500,00",
        "ecart_global": "3 000,00",
        "total_taux_reel_mois": "4 130,00",
        "total_heure_reel_mois": "4 130,00"
      },
      {
        "id": 'Cell2',
        "semaine": "2024-W02",
        "mois": "janvier",
        "mois_num": 1,
        "annee": 2024,
        "performance_status": "yellow",
        "taux_std": "88,00",
        "taux_reel": "950,00",
        "heurs_std": "88,00",
        "heure_reel": "950,00",
        "couts_std": "480,00",
        "couts_reel": "480,00",
        "efficience": "1 430,00",
        "ecart_global": "2 860,00",
        "total_taux_reel_mois": "3 910,00",
        "total_heure_reel_mois": "3 910,00"
      }
    ],
    "returnMessage": "Success",
    "returnCode": "0"
  });
}
