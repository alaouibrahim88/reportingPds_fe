import { NextResponse } from 'next/server'

const BASE_URL = 'http://127.0.0.1:5001'

export async function GET() {
	const res = await fetch(`${BASE_URL}/operations`, {
		cache: 'no-store',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await res.json()
	return NextResponse.json(data)
}
