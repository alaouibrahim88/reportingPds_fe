// Import types of the Importation page, by department.
// domain: code sent to the API (ImportExcel, GetImportTemplate)
// batchDomain: Domain of the import batches (history and data coverage)

export type Frequency = 'weekly' | 'monthly' | 'dates'
export type ImportKind = 'values' | 'targets'

export interface ImportType {
	domain: string
	batchDomain: string
	title: string
	frequency: Frequency
	kind: ImportKind
	// Sub-view of the department (Quality: indicators or client scores)
	group?: string
}

export interface Department {
	id: string
	name: string
	types: ImportType[]
	// Sub-views (four import types each, so the page fits the screen); types without group go to the first
	groups?: { id: string; label: string }[]
}

const standard = (prefix: string, batch: { weekly: string; weeklyTarget: string; monthly: string; monthlyTarget: string }, codes?: Partial<Record<'weekly' | 'weeklyTarget' | 'monthly' | 'monthlyTarget', string>>): ImportType[] => [
	{ domain: codes?.weekly ?? prefix, batchDomain: batch.weekly, title: 'Indicateurs hebdomadaires', frequency: 'weekly', kind: 'values' },
	{ domain: codes?.weeklyTarget ?? `${prefix}_TARGET`, batchDomain: batch.weeklyTarget, title: 'Cibles hebdomadaires', frequency: 'weekly', kind: 'targets' },
	{ domain: codes?.monthly ?? `${prefix}_MONTHLY`, batchDomain: batch.monthly, title: 'Indicateurs mensuels', frequency: 'monthly', kind: 'values' },
	{ domain: codes?.monthlyTarget ?? `${prefix}_TARGET_MONTHLY`, batchDomain: batch.monthlyTarget, title: 'Cibles mensuelles', frequency: 'monthly', kind: 'targets' },
]

export const DEPARTMENTS: Department[] = [
	{
		id: 'operation',
		name: 'Operation',
		types: standard('OPERATION', {
			weekly: 'OPERATION',
			weeklyTarget: 'OPERATION_TARGET',
			monthly: 'OPERATION_MONTHLY',
			monthlyTarget: 'OPERATION_TARGET_MONTHLY',
		}),
	},
	{
		id: 'quality',
		name: 'Quality',
		groups: [
			{ id: 'indicators', label: 'Indicateurs et cibles' },
			{ id: 'clients', label: 'Scores et PPM clients' },
		],
		types: [
			...standard('QUALITY', {
				weekly: 'QUALITY',
				weeklyTarget: 'QUALITY_TARGET',
				monthly: 'QUALITY_MONTHLY',
				monthlyTarget: 'QUALITY_TARGET_MONTHLY',
			}),
			{ domain: 'CLIENT', batchDomain: 'QUALITY_CLIENTSCORE', title: 'Scores clients hebdomadaires', frequency: 'weekly', kind: 'values', group: 'clients' },
			{ domain: 'CLIENT_TARGET', batchDomain: 'QUALITY_TARGET_CLIENTSCORE', title: 'Cibles des scores clients hebdomadaires', frequency: 'weekly', kind: 'targets', group: 'clients' },
			{ domain: 'CLIENT_MONTHLY', batchDomain: 'QUALITY_CLIENT_SCORE_MONTHLY', title: 'Scores et PPM clients mensuels', frequency: 'monthly', kind: 'values', group: 'clients' },
			{ domain: 'CLIENT_TARGET_MONTHLY', batchDomain: 'QUALITY_TARGET_CLIENT_SCORE_MONTHLY', title: 'Cibles des scores et PPM clients mensuels', frequency: 'monthly', kind: 'targets', group: 'clients' },
		],
	},
	{
		id: 'supply-chain',
		name: 'Supply Chain',
		types: standard(
			'INV',
			{
				weekly: 'INVENTORY',
				weeklyTarget: 'INVENTORY_TARGET',
				monthly: 'INVENTORY_MONTHLY',
				monthlyTarget: 'INVENTORY_TARGET_MONTHLY',
			},
			{ monthly: 'INV_MONTH', monthlyTarget: 'INV_MONTH_TARGET' },
		),
	},
	{
		id: 'finance',
		name: 'Finance',
		types: [
			{ domain: 'FINANCE', batchDomain: 'FINANCE', title: 'Indicateurs hebdomadaires', frequency: 'weekly', kind: 'values' },
			{ domain: 'FINANCE_TARGET', batchDomain: 'FINANCE_TARGET', title: 'Cibles par période de validité', frequency: 'dates', kind: 'targets' },
			{ domain: 'FINANCE_MONTHLY', batchDomain: 'FINANCE_MONTHLY', title: 'Indicateurs mensuels', frequency: 'monthly', kind: 'values' },
			{ domain: 'FINANCE_TARGET_MONTHLY', batchDomain: 'FINANCE_TARGET_MONTHLY', title: 'Cibles mensuelles', frequency: 'monthly', kind: 'targets' },
		],
	},
	{
		id: 'human-resources',
		name: 'RH',
		types: standard('RH', {
			weekly: 'RH',
			weeklyTarget: 'RH_TARGET',
			monthly: 'RH_MONTHLY',
			monthlyTarget: 'RH_TARGET_MONTHLY',
		}),
	},
	{
		id: 'programs',
		name: 'Programs',
		types: [
			{ domain: 'PROGRAM', batchDomain: 'PROGRAM_WEEKLY', title: 'Indicateurs hebdomadaires', frequency: 'weekly', kind: 'values' },
			{ domain: 'PROGRAM_TARGET', batchDomain: 'PROGRAM_TARGET', title: 'Cibles par période de validité', frequency: 'dates', kind: 'targets' },
			{ domain: 'PROGRAM_MONTHLY', batchDomain: 'PROGRAM_MONTHLY', title: 'Indicateurs mensuels', frequency: 'monthly', kind: 'values' },
			{ domain: 'PROGRAM_TARGET_MONTHLY', batchDomain: 'PROGRAM_TARGET_MONTHLY', title: 'Cibles mensuelles', frequency: 'monthly', kind: 'targets' },
		],
	},
]

const BY_BATCH = new Map(
	DEPARTMENTS.flatMap((d) => d.types.map((t) => [t.batchDomain, { department: d, type: t }] as const)),
)

export function findByBatchDomain(batchDomain: string) {
	return BY_BATCH.get(batchDomain)
}

// Department access from the user name (same rules as before: SUPPLYCH, RH, or the department id)
export function allowedDepartmentIds(username: string): Set<string> {
	const user = username.toUpperCase()
	if (!user) return new Set(DEPARTMENTS.map((d) => d.id))
	const allowed = DEPARTMENTS.filter((d) => {
		if (user.includes('SUPPLYCH')) return d.id === 'supply-chain'
		if (user.includes('RH')) return d.id === 'human-resources'
		const id = d.id.toUpperCase()
		return id.includes(user) || user.includes(id.split('-')[0])
	}).map((d) => d.id)
	return new Set(allowed.length > 0 ? allowed : DEPARTMENTS.map((d) => d.id))
}

// API answers (dbo.Import_GetOverview)
export interface Coverage {
	Domaine: string
	Annee: number | null
	Nb: number
	Plages: string | null
}

export interface HistoryEntry {
	Id: number
	Domaine: string
	Annee: number
	Fichier: string
	Par: string | null
	Le: string
	Statut: 'IMPORTED' | 'REPLACED' | 'ERROR' | string
	Lignes: number | null
	Periodes: string | null
	Message: string | null
	Taille: number | null
	AFichier: boolean
}

export interface Overview {
	Couverture: Coverage[]
	Historique: HistoryEntry[]
}

export interface ImportResult {
	ok: boolean
	domain: string
	message: string
	rows?: number
	periods?: string | null
}
