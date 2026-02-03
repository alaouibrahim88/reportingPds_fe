import { NextResponse } from 'next/server'

const BASE_URL = 'http://127.0.0.1:5001'

export async function GET() {
	const res = await fetch(`${BASE_URL}/dashbaord`, {
		cache: 'no-store',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (!res.ok) throw new Error('Backend unavailable')
	const data = await res.json()
	return NextResponse.json(data)
}
