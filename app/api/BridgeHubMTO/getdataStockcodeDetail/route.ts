import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = {
    getdataStockcodeDetail: [
      {
        stockCode: "9CS205100TSZ",
        coutUnitaire: 1.54531,
        process: 13.90779,
        matiere: 0.0,
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
    ],
    returnMessage: "Success",
    returnCode: "0",
  };
  return NextResponse.json(data);
}
