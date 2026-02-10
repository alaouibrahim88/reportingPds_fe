import type {
	DashboardKpiCategoryResponse,
	DashboardKpiCardHistoryItem,
	IndicateursData,
	WeeklyIndicator
} from '@/types'

/**
 * Normalizes dashboard-kpi-category API response to IndicateursData.
 * Supports both "Cards" format (db.json dashbaord) and "Indicateurs" format.
 */
export function normalizeDashboardKpiResponse(
	response: DashboardKpiCategoryResponse
): IndicateursData {
	if (response.Indicateurs && Array.isArray(response.Indicateurs)) {
		return {
			Indicateurs: response.Indicateurs.map((i) => ({
				...i,
				Valeur_Semaine: toNumber(i.Valeur_Semaine),
				Target: toNumber(i.Target),
				Semaine_M1: toNumber(i.Semaine_M1),
				Semaine_M2: toNumber(i.Semaine_M2),
				Semaine_M3: toNumber(i.Semaine_M3),
				Semaine_M4: toNumber(i.Semaine_M4)
			}))
		}
	}
	if (response.Cards && Array.isArray(response.Cards)) {
		const indicateurs: WeeklyIndicator[] = response.Cards.map((card) => {
			// Parse History if it's a JSON string, otherwise use as array
			let history: DashboardKpiCardHistoryItem[] = []
			if (card.History) {
				if (typeof card.History === 'string') {
					try {
						history = JSON.parse(card.History) as DashboardKpiCardHistoryItem[]
					} catch {
						history = []
					}
				} else if (Array.isArray(card.History)) {
					history = card.History
				}
			}
			const len = history.length
			const current = len > 0 ? history[len - 1] : null
			const v = (idx: number) =>
				toNumber(history[Math.max(0, len - 1 - idx)]?.Value)
			const weekLabel = (idx: number) => {
				const item = history[Math.max(0, len - 1 - idx)]
				return item ? String(item.Semaine) : undefined
			}
			const target =
				card.Target != null
					? toNumber(card.Target)
					: current
						? toNumber(current.Target)
						: 0
			return {
				Indicateur: card.Label,
				Valeur_Semaine: toNumber(card.Value) ?? v(0),
				Target: target,
				Semaine_M1: toNumber(card.PreviousValue) ?? v(1),
				Semaine_M2: v(2),
				Semaine_M3: v(3),
				Semaine_M4: v(4),
				LowerIsBetter: card.IsLowerBetter,
				Semaine_M1_Label: weekLabel(1),
				Semaine_M2_Label: weekLabel(2),
				Semaine_M3_Label: weekLabel(3),
				Semaine_M4_Label: weekLabel(4),
				Unit: card.Unit
			}
		})
		return { Indicateurs: indicateurs }
	}
	return { Indicateurs: [] }
}

function toNumber(value: unknown): number {
	if (value === null || value === undefined) return 0
	if (typeof value === 'number' && !Number.isNaN(value)) return value
	const n = Number(value)
	return Number.isNaN(n) ? 0 : n
}
