import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { fetchInternalApi } from '@/lib/internal-api-fetcher'
import {
	INTERNAL_API_ENDPOINTS,
	INTERNAL_API_BASE_URL,
} from '@/constants/api'

export async function GET() {
	try {
		const baseUrl =
			process.env.PROGRAM_API_URL || INTERNAL_API_BASE_URL
		return fetchInternalApi(INTERNAL_API_ENDPOINTS.program, {
			baseUrl,
			throwOnError: true,
		})
	} catch {
		try {
			const dbPath = path.join(process.cwd(), 'db.json')
			const raw = fs.readFileSync(dbPath, 'utf-8')
			const db = JSON.parse(raw)
			if (db.program) {
				return NextResponse.json(db.program)
			}
		} catch {
			// ignore
		}
		return NextResponse.json(
			{ error: 'Program data unavailable' },
			{ status: 503 }
		)
	}
}
