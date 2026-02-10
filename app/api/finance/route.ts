import { fetchInternalApi } from '@/lib/internal-api-fetcher'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const type = searchParams.get('type') // monthly | weekly

	const endpoint =
		type === 'monthly'
			? INTERNAL_API_ENDPOINTS.finance.monthly
			: INTERNAL_API_ENDPOINTS.finance.weekly

	const res = await fetchInternalApi(endpoint)
	const data = await res.json()

	return NextResponse.json({
		meta: { type },
		data,
	})
}
