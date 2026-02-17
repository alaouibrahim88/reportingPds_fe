import { NextResponse } from 'next/server'
import { INTERNAL_API_ENDPOINTS } from '@/constants/api'

const DEFAULT_DOMAIN = 'INV'
const DEFAULT_YEAR = '2026'

export async function POST(request: Request) {
	try {
		const incomingFormData = await request.formData()
		const file = incomingFormData.get('file')
		const domain = incomingFormData.get('domain')
		const annee = incomingFormData.get('annee')

		if (!(file instanceof File)) {
			return NextResponse.json(
				{ message: 'File is required in form-data under "file".' },
				{ status: 400 },
			)
		}

		const formData = new FormData()
		formData.append('file', file)
		formData.append(
			'domain',
			typeof domain === 'string' && domain.trim()
				? domain.trim()
				: DEFAULT_DOMAIN,
		)
		formData.append(
			'annee',
			typeof annee === 'string' && annee.trim()
				? annee.trim()
				: DEFAULT_YEAR,
		)
     
		const targetUrl = `${process.env.BASE_URL_CATEGORY_KPI}${INTERNAL_API_ENDPOINTS.uploadFilesKPICategories}`
		const response = await fetch(targetUrl, {
			method: 'POST',
			body: formData,
			cache: 'no-store',
		})

		const contentType = response.headers.get('content-type') || ''
		if (contentType.includes('application/json')) {
			const data = await response.json()
			return NextResponse.json(data, { status: response.status })
		}

		const textData = await response.text()
		if (textData) {
			return NextResponse.json(
				{ message: textData },
				{ status: response.status },
			)
		}

		return NextResponse.json(
			{ message: response.ok ? 'Upload succeeded.' : 'Upload failed.' },
			{ status: response.status },
		)
	} catch (error) {
		console.error('Upload files KPI categories API failed:', error)
		return NextResponse.json(
			{ message: 'Unexpected server error while uploading the file.' },
			{ status: 500 },
		)
	}
}

