import { NextResponse } from 'next/server'

const DEFAULT_HEADERS: HeadersInit = {
	'Content-Type': 'application/json',
}

const FETCH_OPTIONS: RequestInit = {
	cache: 'no-store',
	headers: DEFAULT_HEADERS,
}

interface FetchInternalApiOptions {
	/** Throw error when response is not ok (default: false) */
	throwOnError?: boolean
	/** Override base URL (default: from constants) */
	baseUrl?: string
}

/**
 * Fetches data from internal Python backend API.
 * Shared logic for rh, finance, program, quality, operations, dashboard-kpi-category routes.
 */
export async function fetchInternalApi<T = unknown>(
	endpoint: string,
): Promise<NextResponse<T>> {
	const url = `${process.env.BASE_URL_CATEGORY_KPI}${endpoint}`
	const res = await fetch(url, FETCH_OPTIONS)
	const data = (await res.json()) as T
	return NextResponse.json(data)
}
