import { NextResponse } from 'next/server'
import { fetchInternalApi } from '@/lib/internal-api-fetcher'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'
import { buildKpiUrl } from '@/lib/build-kpi-url'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	const type = (searchParams.get('type') ?? 'weekly') as 'weekly' | 'monthly'
	const period = Number(searchParams.get('period'))
	const year = Number(searchParams.get('year'))

	const base =
		type === 'monthly'
			? INTERNAL_API_ENDPOINTS.quality.monthly
			: INTERNAL_API_ENDPOINTS.quality.weekly

	const endpoint = buildKpiUrl(base, type, period, year)

	const res = await fetchInternalApi(endpoint)
	const data = await res.json()

	return NextResponse.json({ meta: { type, period, year }, data })
}
