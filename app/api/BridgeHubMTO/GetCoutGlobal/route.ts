import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
        "details": [
            {
                "zone_id": 1,
                "zone_name": "HEAD REST",
                "period": "2024-01-15",
                "mois": "février",
                "annee": 2024,
                "heures_reel": 8.2,
                "heures_standart": 8,
                "cout_reel": "164 Euro",
                "cout_standart": "160 Euro",
                "ecart": 0.2,
                "ecart_global": 4,
                "total_heures_reel_mois": 31.6,
                "total_heures_standart_mois": 32
            },
            {
                "zone_id": 2,
                "zone_name": "HEAD REST 2",
                "period": "2024-05-15",
                "mois": "février",
                "annee": 2024,
                "heures_reel": 12.2,
                "heures_standart": 84,
                "cout_reel": "164 Euro",
                "cout_standart": "100 Euro",
                "ecart": 0.2,
                "ecart_global": 4,
                "total_heures_reel_mois": 31.6,
                "total_heures_standart_mois": 32
            }
        ],
        "returnMessage": "Success",
        "returnCode": "0"
    });
}
