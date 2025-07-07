import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cellId = searchParams.get('cellId');
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  
  return NextResponse.json({
    "total_couts_std": 105,
    "total_couts_reel": 205,
    "details": [
        {
            "matricule": "101",
            "operator_name": "YERGI HAMID",
            "cell_name": "SEAT LEON PVC",
            "details": [
                {
                    "semaine": "2024-W01",
                    "mois": "janvier",
                    "mois_num": 1,
                    "annee": 2024,
                    "heures_reel": "9,00",
                    "heures_supplementaires": "38,00",
                    "tarif_horaire_pct": "91,00",
                    "cout_social": "23,00",
                    "avantages_sociaux": "23,00",
                    "salaire_net": "23,00",
                    "couts_reel": "23,00",
                    "couts_standard": "23,00",
                    "ecarts": "46,00",
                    "total_heures": "47,00",
                    "ecart_pourcentage": "0,00",
                    "total_heures_reel_mois": "36,50",
                    "total_heures_sup_mois": "153,00",
                    "total_couts_reel_mois": "94,00",
                    "moyenne_tarif_horaire_mois": "91,13"
                },
                {
                    "semaine": "2024-W02",
                    "mois": "janvier",
                    "mois_num": 1,
                    "annee": 2024,
                    "heures_reel": "9,50",
                    "heures_supplementaires": "40,00",
                    "tarif_horaire_pct": "92,00",
                    "cout_social": "25,00",
                    "avantages_sociaux": "25,00",
                    "salaire_net": "25,00",
                    "couts_reel": "25,00",
                    "couts_standard": "25,00",
                    "ecarts": "48,00",
                    "total_heures": "49,50",
                    "ecart_pourcentage": "0,00",
                    "total_heures_reel_mois": "36,50",
                    "total_heures_sup_mois": "153,00",
                    "total_couts_reel_mois": "94,00",
                    "moyenne_tarif_horaire_mois": "91,13"
                },
                {
                    "semaine": "2024-W03",
                    "mois": "janvier",
                    "mois_num": 1,
                    "annee": 2024,
                    "heures_reel": "8,75",
                    "heures_supplementaires": "36,00",
                    "tarif_horaire_pct": "90,00",
                    "cout_social": "22,00",
                    "avantages_sociaux": "22,00",
                    "salaire_net": "22,00",
                    "couts_reel": "22,00",
                    "couts_standard": "22,00",
                    "ecarts": "44,00",
                    "total_heures": "44,75",
                    "ecart_pourcentage": "0,00",
                    "total_heures_reel_mois": "36,50",
                    "total_heures_sup_mois": "153,00",
                    "total_couts_reel_mois": "94,00",
                    "moyenne_tarif_horaire_mois": "91,13"
                },
                {
                    "semaine": "2024-W04",
                    "mois": "janvier",
                    "mois_num": 1,
                    "annee": 2024,
                    "heures_reel": "9,25",
                    "heures_supplementaires": "39,00",
                    "tarif_horaire_pct": "91,50",
                    "cout_social": "24,00",
                    "avantages_sociaux": "24,00",
                    "salaire_net": "24,00",
                    "couts_reel": "24,00",
                    "couts_standard": "24,00",
                    "ecarts": "47,00",
                    "total_heures": "48,25",
                    "ecart_pourcentage": "0,00",
                    "total_heures_reel_mois": "36,50",
                    "total_heures_sup_mois": "153,00",
                    "total_couts_reel_mois": "94,00",
                    "moyenne_tarif_horaire_mois": "91,13"
                }
            ]
        }
    ],
    "returnMessage": "Success",
    "returnCode": "0"
  });
}
