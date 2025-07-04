import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const zoneId = searchParams.get('zone_id');
  
  return NextResponse.json({
    "details": [
      {
        "semaine": "S52/2024",
        "mois": "janvier",
        "mois_num": 1,
        "annee": 2024,
        "salaire_horaire": "200,00",
        "heures_supplementaires": "300,00",
        "prime_anciennete": "400,00",
        "jours_feries": "500,00",
        "conge_paye": "600,00",
        "prime_poste": "700,00",
        "bonus_productivite": "800,00",
        "bonus_nuit": "900,00",
        "securite_sociale": "1000,00",
        "assurance_collective": "1100,00",
        "cout_accident_travail": "1200,00",
        "plan_retraite": "1300,00",
        "total_revenus": "1600,00",
        "total_charges": "650,00",
        "salaire_net": "950,00",
        "total_revenus_mois": "6400,00",
        "total_charges_mois": "2600,00"
      },
      {
        "semaine": "2024-W02",
        "mois": "janvier",
        "mois_num": 1,
        "annee": 2024,
        "salaire_horaire": "210,00",
        "heures_supplementaires": "210,00",
        "prime_anciennete": "210,00",
        "jours_feries": "210,00",
        "conge_paye": "210,00",
        "prime_poste": "210,00",
        "bonus_productivite": "210,00",
        "bonus_nuit": "210,00",
        "securite_sociale": "160,00",
        "assurance_collective": "210,00",
        "cout_accident_travail": "210,00",
        "plan_retraite": "110,00",
        "total_revenus": "1680,00",
        "total_charges": "680,00",
        "salaire_net": "1000,00",
        "total_revenus_mois": "6720,00",
        "total_charges_mois": "2720,00"
      }
    ],
    "returnMessage": "Success",
    "returnCode": "0"
  });
}
