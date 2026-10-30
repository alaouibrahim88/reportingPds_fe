import { NextResponse } from 'next/server'

/**
 * Forwards a file answered by the KPI API (stored import file, Excel template)
 * with its name, so the browser downloads it from Vizora.
 */
export async function proxyKpiFile(endpoint: string): Promise<NextResponse> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_CATEGORY_KPI}${endpoint}`, { cache: 'no-store' })
	if (!res.ok) {
		return NextResponse.json(
			{ message: res.status === 404 ? 'Fichier introuvable.' : 'Fichier indisponible.' },
			{ status: res.status },
		)
	}

	const headers = new Headers()
	headers.set(
		'Content-Type',
		res.headers.get('content-type') ?? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	)
	const disposition = res.headers.get('content-disposition')
	if (disposition) headers.set('Content-Disposition', disposition)
	headers.set('Cache-Control', 'no-store')

	return new NextResponse(await res.arrayBuffer(), { status: 200, headers })
}
