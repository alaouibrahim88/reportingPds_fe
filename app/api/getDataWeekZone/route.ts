import { dashboardData } from "@/app/(dashboard)/(home)/_components/data/dashboardData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const globalData = {
    weekDataZn: [
      {
        week: "1",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 0,
          },
          {
            libelle: "HEAD REST",
            qte: 39,
          },
        ],
      },
      {
        week: "10",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 43,
          },
          {
            libelle: "HEAD REST",
            qte: 121,
          },
        ],
      },
      {
        week: "11",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 8,
          },
          {
            libelle: "HEAD REST",
            qte: 76,
          },
        ],
      },
      {
        week: "12",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 0,
          },
          {
            libelle: "HEAD REST",
            qte: 0,
          },
        ],
      },
      {
        week: "2",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 1,
          },
          {
            libelle: "HEAD REST",
            qte: 84,
          },
        ],
      },
      {
        week: "3",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 26,
          },
          {
            libelle: "HEAD REST",
            qte: 73,
          },
        ],
      },
      {
        week: "4",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 32,
          },
          {
            libelle: "HEAD REST",
            qte: 105,
          },
        ],
      },
      {
        week: "5",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 39,
          },
          {
            libelle: "HEAD REST",
            qte: 121,
          },
        ],
      },
      {
        week: "6",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 21,
          },
          {
            libelle: "HEAD REST",
            qte: 129,
          },
        ],
      },
      {
        week: "7",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 20,
          },
          {
            libelle: "HEAD REST",
            qte: 78,
          },
        ],
      },
      {
        week: "8",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 22,
          },
          {
            libelle: "HEAD REST",
            qte: 79,
          },
        ],
      },
      {
        week: "9",
        detailQte: [
          {
            libelle: "BOOT",
            qte: 40,
          },
          {
            libelle: "HEAD REST",
            qte: 155,
          },
        ],
      },
    ],
    returnMessage: null,
    returnCode: null,
  };
  return NextResponse.json(globalData);
}
