import { NextResponse } from 'next/server'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'
import { proxyKpiFile } from '@/lib/kpi-file-proxy'

// File of an import batch, as it was imported (or refused)
export async function GET(request: Request) {
	const id = Number(new URL(request.url).searchParams.get('id'))
	if (!Number.isInteger(id) || id <= 0) {
		return NextResponse.json({ message: 'Identifiant invalide.' }, { status: 400 })
	}
	return proxyKpiFile(`${INTERNAL_API_ENDPOINTS.importFile}?id=${id}`)
}
