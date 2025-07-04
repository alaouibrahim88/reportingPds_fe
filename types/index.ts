export type scrapType = "zone" | "projet" | "serie";

export interface ProductionIssueDetail {
  zone_id: number;
  zone_name: string;
  period: string;
  mois: string;
  annee: number;
  heures_reel: number;
  heures_standart: number;
  cout_reel: string;
  cout_standart: string;
  ecart: number;
  ecart_global: number;
  total_heures_reel_mois: number;
  total_heures_standart_mois: number;
}

export interface ProductionIssuesApiResponse {
  details: ProductionIssueDetail[];
  returnMessage: string;
  returnCode: string;
}