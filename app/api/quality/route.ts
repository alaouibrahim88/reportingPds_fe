import { NextResponse } from 'next/server'

const BASE_URL = 'http://127.0.0.1:5001'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	const type = searchParams.get('type') // monthly | weekly
	const mois = searchParams.get('MoisCourante')
	const annee = searchParams.get('AnneeCourante')
	const semaine = searchParams.get('SemaineCourante')

	let endpoint = ''

	if (type === 'monthly') {
		endpoint = '/quality-indicateurs-monthly'
	} else if (type === 'weekly') {
		endpoint = '/quality-indicateurs-weekly'
	}

	const res = await fetch(`${BASE_URL}${endpoint}`, {
		cache: 'no-store',
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const data = await res.json()

	return NextResponse.json({
		meta: {
			type,
			mois,
			semaine,
			annee,
		},
		data,
	})
}
