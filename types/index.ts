export type scrapType = "zone" | "projet" | "serie";

export interface CostTracking {
  zone_id: number;
  zone_nom: string;
  couts_reel: string;
  couts_std: string;
  ecart: string;
}

export interface CostTrackingResponse {
  details: {
    zone_id: number;
    zone_nom: string;
    couts_reel: string;
    couts_std: string;
    ecart: string;
  }[],
  returnMessage: string;
  returnCode: string;
}

export interface EfficiencyTracking {
  zone_id: number;
  zone_nom: string;
  efficience: number;
  heures_reel: number;
}

export interface EfficiencyTrackingResponse {
  details: {
    zone_id: number;
    zone_nom: string;
    efficience: number;
    heures_reel: number;
  }[],
  returnMessage: string;
  returnCode: string;
}

export interface GlobalCost {
  details: {
    couts_reel_par_annee: string;
    couts_std_par_annee: string;
    couts_reel_dernier_mois: string;
    couts_std_dernier_mois: string;
    efficience_dernier_mois: string;
  }[],
  returnMessage: string;
  returnCode: string;
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
  mois: string,
  mois_num: number,
  annee: number,
  matricule: string,
  operator_name: string,
  heures_reel: string,
  heures_supplementaires: string,
  tarif_horaire_pct: string,
  cout_social: string,
  avantages_sociaux: string,
  salaire_net: string,
  couts_reel: string,
  couts_standard: string,
  ecarts: string,
}

export interface OperatorHeader {
  cell_name: string,
  total_heures: number,
  total_couts_standart: number,
  total_couts_reel: number,
  totalcouts_social: number
}

export interface OperatorDetailsApiResponse {
    total_couts_standard: number;
    total_couts_reel: number;
    totalcouts_social: number;
    details: OperatorDetails[];
    header: OperatorHeader;
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

// File Upload Types
export interface UploadedFile {
	id: string
	name: string
	uploadDate: string
	status: 'uploaded' | 'uploading' | 'error'
	size?: number
}

export type FilesByDepartment = Record<string, UploadedFile[]>

export interface FileUploadContextType {
	files: FilesByDepartment
	uploadFile: (departmentId: string, file: File) => Promise<void>
	deleteFile: (departmentId: string, fileId: string) => void
	getFilesForDepartment: (departmentId: string) => UploadedFile[]
}

// KPI Dashboard Types
export interface NavigationItem {
	id: string
	label: string
}

export interface KPIItem {
	id: string
	title: string
	value: number
	unit: string
	trend: 'up' | 'down' | 'neutral'
	trendPercentage: number
	chartData: number[]
	details: {
		description: string
		breakdown: {
			[key: string]: number | string
		}
		insights: string[]
		lastUpdated: string
	}
	color: string
	icon?: string
}

export interface KPIDataset {
	name: string
	description: string
	kpis: KPIItem[]
}

export interface CategoryKPI {
	title: string
	value: string
	subtitle?: string
	target?: string
	trend?: string
	trendColor?: string
	lastWeeks?: string[]
	statusRanges?: {
		target: string
		good: string
		alert: string
		high: string
	}
	currentStatus?: string
	statusColor?: string
	actionText?: string
	progressRanges?: {
		ok: string
		good: string
		excellent: string
		target: string
	}
	currentValue?: number
	breakdown?: {
		[key: string]: string
	}
	chartData?: {
		freightIn?: number[]
		freightOut?: number[]
	}
	actionLink?: string
}

export interface CategoryData {
	id: string
	name: string
	icon: string
	kpis: CategoryKPI[]
}

export interface WeeklyIndicator {
	Indicateur: string
	Valeur_Semaine: number
	Target: number
	Semaine_M1: number
	Semaine_M2: number
	Semaine_M3: number
	Semaine_M4: number
}

export interface IndicateursData {
	Indicateurs: WeeklyIndicator[]
}
