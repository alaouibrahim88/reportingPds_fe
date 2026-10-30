import { NextResponse } from 'next/server'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'

// Always read live: never prerendered at build time
export const dynamic = 'force-dynamic'

// Import history and the periods present in the database for each import type
export async function GET() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_CATEGORY_KPI}${INTERNAL_API_ENDPOINTS.importOverview}`,
			{ cache: 'no-store' },
		)
		if (!res.ok) {
			return NextResponse.json({ message: 'Historique indisponible.' }, { status: res.status })
		}
		return NextResponse.json(await res.json())
	} catch (error) {
		console.error('Import overview API failed:', error)
		return NextResponse.json({ message: 'Historique indisponible.' }, { status: 502 })
	}
}
