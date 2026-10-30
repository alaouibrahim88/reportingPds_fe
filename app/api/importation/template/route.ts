import { NextResponse } from 'next/server'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'
import { proxyKpiFile } from '@/lib/kpi-file-proxy'

// Excel template of an import type, filled with the values of the year already in the database
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const domain = searchParams.get('domain') ?? ''
	const annee = Number(searchParams.get('annee'))
	if (!/^[A-Z_]+$/.test(domain) || !Number.isInteger(annee)) {
		return NextResponse.json({ message: 'Paramètres invalides.' }, { status: 400 })
	}
	return proxyKpiFile(`${INTERNAL_API_ENDPOINTS.importTemplate}?domain=${domain}&annee=${annee}`)
}
