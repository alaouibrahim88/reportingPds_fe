import { fetchInternalApi } from '@/lib/internal-api-fetcher'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'
import { buildKpiUrl } from '@/lib/build-kpi-url'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	const period = Number(searchParams.get('period'))
	const year = Number(searchParams.get('year'))

	const endpoint = buildKpiUrl(INTERNAL_API_ENDPOINTS.rh, 'weekly', period, year)

	return fetchInternalApi(endpoint)
}
