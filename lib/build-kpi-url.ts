/**
 * Builds a KPI endpoint URL with the correct period query param.
 *
 * Weekly endpoints expect: ?SemaineCourante=<week>&AnneeCourante=<year>
 * Monthly endpoints expect: ?MoisCourante=<month>&AnneeCourante=<year>
 */
export function buildKpiUrl(
	basePath: string,
	type: 'weekly' | 'monthly',
	period: number,
	year: number,
): string {
	if (type === 'weekly') {
		return `${basePath}?SemaineCourante=${period}&AnneeCourante=${year}`
	}
	return `${basePath}?MoisCourante=${period}&AnneeCourante=${year}`
}
