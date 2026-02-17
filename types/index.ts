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
	uploadFile: (
		departmentId: string,
		file: File,
		payload: {
			domain: string
			annee: string
		},
	) => Promise<void>
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
	LowerIsBetter?: boolean
	/** Optional week labels from API (e.g. from History[].Semaine) */
	Semaine_M1_Label?: string
	Semaine_M2_Label?: string
	Semaine_M3_Label?: string
	Semaine_M4_Label?: string
	/** Optional unit from API (e.g. Cards[].Unit) */
	Unit?: string
}

export interface IndicateursData {
	Indicateurs: WeeklyIndicator[]
}

/** API response shape from GetExecutiveHorizonIndicateursWeekly (db.json "dashbaord" format) */
export interface DashboardKpiCardHistoryItem {
	Annee: number
	Semaine: number
	Value?: number
	Target?: number
}

export interface DashboardKpiCard {
	Code: string
	Label: string
	Value?: number
	Unit?: string
	PreviousValue?: number
	Trend?: string
	Target?: number
	IsLowerBetter?: boolean
	History?: DashboardKpiCardHistoryItem[] | string
}

export interface DashboardKpiCategoryResponse {
	Annee?: number
	Semaine?: number
	Cards?: DashboardKpiCard[]
	Indicateurs?: WeeklyIndicator[]
}

// Program API types (Program_Semaine = weekly, Program_Mois = monthly)
export interface ProgramHistoriqueSemaine {
	Label: string
	Annee: number
	Semaine: number
	Valeur?: number
	Target?: number
	Reel?: number
	Forecast?: number
	Pct?: number
}

export interface OnTimeDelivery {
	Annee: number
	Semaine_Actuelle: number
	Valeur_Actuelle: number
	Target_Actuelle: number
	Valeur_Semaine_Precedente: number
	Variation_Vs_Semaine_Precedente: number
	Historique_4_Semaines: ProgramHistoriqueSemaine[]
}

export interface CriticalEquipmentAvailability {
	Annee: number
	Semaine_Actuelle: number
	Valeur_Actuelle: number
	Target_Actuelle: number
	Valeur_Semaine_Precedente: number
	Variation_Vs_Semaine_Precedente: number
	Historique_4_Semaines: ProgramHistoriqueSemaine[]
}

export interface RecruitmentProgress {
	Annee: number
	Semaine_Actuelle: number
	Valeur_Actuelle_Reel: number
	Valeur_Actuelle_Forecast: number
	Valeur_Actuelle_Pct: number
	Variation_Pct_Vs_Semaine_Precedente: number
	Variation_Reel_Vs_Semaine_Precedente: number
	Total_Hires_MTD: number
	Total_Forecast_MTD: number
	Target_Hebdo_Forecast: number
	Historique_4_Semaines: ProgramHistoriqueSemaine[]
}

export interface ProgramSemaine {
	On_Time_Delivery: OnTimeDelivery
	Critical_Equipment_Availability: CriticalEquipmentAvailability
	Recruitment_Progress: RecruitmentProgress
}

export interface ProgramHistoriqueMois {
	Label: string
	Mois: number
	Annee: number
	Variance?: number
	Budget?: number
	Actual?: number
	Valeur?: number
	Target?: number
}

export interface BudgetVsActual {
	Variance_Mois_Courant: number
	Delta_Variance_Vs_M_1: number
	Target_Variance: number
	Current_Health: string
	Historique_4_Mois: ProgramHistoriqueMois[]
}

export interface APQPMilestones {
	Valeur_Mois_Courant: number
	Delta_Pts_Vs_M_1: number
	Target: number
	Current_Health: string
	Historique_4_Mois: ProgramHistoriqueMois[]
}

export interface TrendHebdoMois {
	Label: string
	Annee: number
	Semaine: number
	Valeur: number
}

export interface DocumentationProgress {
	Readiness_Mois_Courant: number
	Delta_Pts_Vs_M_1: number
	Target: number
	Current_Health: string
	Plans: number
	Procedures: number
	Work_Inst: number
	Historique_4_Mois: ProgramHistoriqueMois[]
	Trend_Hebdo_Mois: TrendHebdoMois[]
	Average_Hebdo_Mois: number
}

export interface ProgramMois {
	Budget_Vs_Actual: BudgetVsActual
	APQP_Milestones: APQPMilestones
	Documentation_Progress: DocumentationProgress
}

export interface ProgramApiResponse {
	Program_Semaine: ProgramSemaine
	Program_Mois: ProgramMois
}
