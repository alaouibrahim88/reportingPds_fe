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

export interface CellCalculRefDetail {
    semaine: string;
    mois: string;
    mois_num: number;
    annee: number;
    salaire_horaire: string;
    heures_supplementaires: string;
    prime_anciennete: string;
    jours_feries: string;
    conge_paye: string;
    prime_poste: string;
    bonus_productivite: string;
    bonus_nuit: string;
    securite_sociale: string;
    assurance_collective: string;
    cout_accident_travail: string;
    plan_retraite: string;
    total_revenus: string;
    total_charges: string;
    salaire_net: string;
    total_revenus_mois: string;
    total_charges_mois: string;
}

export interface CellCalculRefDetailApiResponse {
  details: CellCalculRefDetail[];
  returnMessage: string;
  returnCode: string;
}