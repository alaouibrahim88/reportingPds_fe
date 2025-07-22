export type scrapType = "zone" | "projet" | "serie";

export interface CostTracking {
  zone_id: number;
  zone_nom: string;
  couts_reel: string;
  couts_std: string;
  ecart: string;
}

export interface EfficiencyTracking {
  zone_id: number;
  zone_nom: string;
  efficience: number;
  heures_reel: number;
}
export interface GlobalCost {
  couts_reel_par_annee: string;
  couts_std_par_annee: string;
  couts_reel_dernier_mois: string;
  couts_std_dernier_mois: string;
  efficience_dernier_mois: string;
}

export interface ProductionIssueDetail {
  idzone: number;
  zone: string;
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

export interface CellDetail {
    id: string;
    semaine: string;
    mois: string;
    mois_num: number;
    annee: number;
    performance_status: string;
    taux_std: string;
    taux_reel: string;
    heurs_std: string;
    heure_reel: string;
    couts_std: string;
    couts_reel: string;
    efficience: string;
    ecart_global: string;
    total_taux_reel_mois: string;
    total_heure_reel_mois: string;
}

export interface CellDetailApiResponse {
  details: CellDetail[];
  returnMessage: string;
  returnCode: string;
}

export interface OperatorDetail {
    semaine: string;
    mois: string;
    mois_num: number;
    annee: number;
    heures_reel: string;
    heures_supplementaires: string;
    tarif_horaire_pct: string;
    cout_social: string;
    avantages_sociaux: string;
    salaire_net: string;
    couts_reel: string;
    couts_standard: string;
    ecarts: string;
    total_heures: string;
    ecart_pourcentage: string;
    total_heures_reel_mois: string;
    total_heures_sup_mois: string;
    total_couts_reel_mois: string;
    moyenne_tarif_horaire_mois: string;
}

export interface OperatorDetails {
    matricule: string;
    operator_name: string;
    cell_name: string;
    details: OperatorDetail[];
}

export interface OperatorDetailsApiResponse {
    total_couts_standard: number;
    total_couts_reel: number;
    totalcouts_social: number;
    details: OperatorDetails[];
    returnMessage: string;
    returnCode: string;
}

export interface Zone {
  libelle: string;
  id: string | number;
}

export interface Cell {
  libelle: string;
  id: string | number;
}
