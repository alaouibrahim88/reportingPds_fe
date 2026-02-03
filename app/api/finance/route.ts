import { fetchInternalApi } from '@/lib/internal-api-fetcher'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'

export async function GET() {
	return fetchInternalApi(INTERNAL_API_ENDPOINTS.finance, { throwOnError: true })
}
