import { NextResponse } from 'next/server'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'

// 0: every year present in the file (each row goes to its own year)
const ALL_YEARS = '0'

export async function POST(request: Request) {
	try {
		const incomingFormData = await request.formData()
		const file = incomingFormData.get('file')
		const domain = incomingFormData.get('domain')
		const annee = incomingFormData.get('annee')
		const importedBy = incomingFormData.get('importedBy')

		// Blob, not File: Node 18 (production) has no global File
		if (!(file instanceof Blob)) {
			return NextResponse.json(
				{ returnCode: '1', returnMessage: 'Aucun fichier reçu.' },
				{ status: 400 },
			)
		}
		if (typeof domain !== 'string' || !domain.trim()) {
			return NextResponse.json(
				{ returnCode: '1', returnMessage: "Type d'import manquant." },
				{ status: 400 },
			)
		}

		const formData = new FormData()
		formData.append('file', file, (file as Blob & { name?: string }).name || 'import.xlsx')
		formData.append('domain', domain.trim())
		formData.append('annee', typeof annee === 'string' && annee.trim() ? annee.trim() : ALL_YEARS)
		if (typeof importedBy === 'string' && importedBy.trim()) {
			formData.append('importedBy', importedBy.trim())
		}

		const targetUrl = `${process.env.NEXT_PUBLIC_CATEGORY_KPI}${INTERNAL_API_ENDPOINTS.uploadFilesKPICategories}`
		const response = await fetch(targetUrl, {
			method: 'POST',
			body: formData,
			cache: 'no-store',
		})

		// The API answers { returnCode, returnMessage, rowsImported, periods } (400 when the file is refused)
		const contentType = response.headers.get('content-type') || ''
		if (contentType.includes('application/json')) {
			const data = await response.json()
			return NextResponse.json(data, { status: response.status })
		}

		const textData = await response.text()
		return NextResponse.json(
			{
				returnCode: response.ok ? '0' : '1',
				returnMessage: textData || (response.ok ? 'Import terminé.' : "L'import a échoué."),
			},
			{ status: response.status },
		)
	} catch (error) {
		console.error('Upload files KPI categories API failed:', error)
		return NextResponse.json(
			{ returnCode: '1', returnMessage: "Le serveur d'import ne répond pas. Réessayez dans un instant." },
			{ status: 502 },
		)
	}
}
