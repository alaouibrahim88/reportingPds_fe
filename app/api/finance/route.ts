import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

const BASE_URL = 'http://127.0.0.1:5001'

export async function GET() {
	try {
		const res = await fetch(`${BASE_URL}/finance`, {
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!res.ok) throw new Error('Backend unavailable')
		const data = await res.json()
		return NextResponse.json(data)
	} catch {
		const filePath = path.join(process.cwd(), 'db.json')
		const fileContent = await readFile(filePath, 'utf-8')
		const db = JSON.parse(fileContent)
		return NextResponse.json(db.finance)
	}
}
