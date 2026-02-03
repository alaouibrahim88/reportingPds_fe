import { NextResponse } from 'next/server'
import { INTERNAL_API_BASE_URL } from '@/constants/api'

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
	options: FetchInternalApiOptions = {}
): Promise<NextResponse<T>> {
	const baseUrl = options.baseUrl ?? INTERNAL_API_BASE_URL
	const url = `${baseUrl}${endpoint}`

	const res = await fetch(url, FETCH_OPTIONS)

	if (options.throwOnError && !res.ok) {
		throw new Error('Backend unavailable')
	}

	const data = (await res.json()) as T
	return NextResponse.json(data)
}
