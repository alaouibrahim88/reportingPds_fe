/**
 * Shared utility for week labels (Semaine) used across finance and other dashboards.
 * All weeks normalized to 1-52 range (no 53).
 */

export const WEEKS = Array.from({ length: 52 }, (_, i) => i + 1)

/**
 * Normalizes a calculated week number to 1-52:
 * - 0 → 52, -1 → 51, -2 → 50 (previous year end)
 */
export function normalizeSemaine(semaine: number): number {
	if (semaine === 0) return 52
	if (semaine === -1) return 51
	if (semaine === -2) return 50
	if (semaine < 0) return 52 + semaine
	if (semaine >= 1 && semaine <= 52) return semaine
	return ((semaine - 1) % 52) + 1
}

/**
 * Returns a getSemaineLabel function for a given reference week.
 * Order: less to greater (idx 0 = oldest week, last idx = newest).
 * S1 = ref-3, S2 = ref-2, S3 = ref-1, S4 = ref-0.
 *
 * @param refWeek - Reference week (1-52), e.g. Semaine_Reference
 * @param totalLength - Total number of items to label
 * @returns Function(idx) → "Semaine X"
 */
export function createGetSemaineLabel(
	refWeek: number,
	totalLength: number
): (idx: number) => string {
	return (idx: number) => {
		const semaineValue = refWeek - (totalLength - 1 - idx)
		const s = normalizeSemaine(semaineValue)
		return `Semaine ${s}`
	}
}
