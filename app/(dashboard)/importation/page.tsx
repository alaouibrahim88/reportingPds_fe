"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
import { FileSpreadsheet, Info } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getCookieValue } from '@/lib/storage'
import {
	DEPARTMENTS,
	ImportHistory,
	ImportRow,
	allowedDepartmentIds,
	findByBatchDomain,
	type HistoryEntry,
	type ImportResult,
	type ImportType,
	type Overview,
} from './_components'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 Mo

export default function ImportationPage() {
	const [username, setUsername] = useState('')
	const [overview, setOverview] = useState<Overview | null>(null)
	const [loading, setLoading] = useState(true)
	const [loadError, setLoadError] = useState<string | null>(null)
	const [departmentId, setDepartmentId] = useState<string | null>(null)
	const [groupId, setGroupId] = useState<string | null>(null)
	const [busyDomain, setBusyDomain] = useState<string | null>(null)
	const [result, setResult] = useState<ImportResult | null>(null)
	const currentYear = new Date().getFullYear()
	const [templateYear, setTemplateYear] = useState(currentYear)

	useEffect(() => {
		getCookieValue('username').then((value) => setUsername(value ?? ''))
	}, [])

	const allowed = useMemo(() => allowedDepartmentIds(username), [username])
	const department =
		DEPARTMENTS.find((d) => d.id === departmentId && allowed.has(d.id)) ??
		DEPARTMENTS.find((d) => allowed.has(d.id)) ??
		DEPARTMENTS[0]

	const loadOverview = useCallback(async () => {
		try {
			const res = await fetch('/api/importation/overview', { cache: 'no-store' })
			if (!res.ok) throw new Error()
			const data = (await res.json()) as Overview
			setOverview({ Couverture: data.Couverture ?? [], Historique: data.Historique ?? [] })
			setLoadError(null)
		} catch {
			setLoadError("L'historique et les données en base ne sont pas disponibles pour le moment.")
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		loadOverview()
	}, [loadOverview])

	const upload = useCallback(
		async (type: ImportType, file: File) => {
			if (!file.name.toLowerCase().endsWith('.xlsx')) {
				setResult({ ok: false, domain: type.domain, message: 'Le fichier doit être un classeur Excel (.xlsx).' })
				return
			}
			if (file.size > MAX_FILE_SIZE) {
				setResult({ ok: false, domain: type.domain, message: 'Le fichier dépasse 10 Mo.' })
				return
			}

			setBusyDomain(type.domain)
			setResult(null)
			try {
				const form = new FormData()
				form.append('file', file)
				form.append('domain', type.domain)
				form.append('annee', '0') // every year of the file
				if (username) form.append('importedBy', username)

				const res = await fetch('/api/upload-files-kpi-categories', { method: 'POST', body: form })
				const body = await res.json().catch(() => ({}))
				if (res.ok && body.returnCode === '0') {
					const rows = Number(body.rowsImported ?? 0)
					setResult({
						ok: true,
						domain: type.domain,
						rows,
						periods: body.periods,
						message: `${rows} ligne${rows > 1 ? 's' : ''} importée${rows > 1 ? 's' : ''}${body.periods ? ` : ${body.periods}` : ''}. Les tableaux de bord affichent déjà ces valeurs.`,
					})
				} else {
					setResult({
						ok: false,
						domain: type.domain,
						// The title already says the file was refused
						message: String(body.returnMessage || "L'import a échoué.").replace(/^Fichier refusé, rien n'a été modifié\.\s*/, ''),
					})
				}
			} catch {
				setResult({ ok: false, domain: type.domain, message: "Le serveur d'import ne répond pas. Réessayez dans un instant." })
			} finally {
				setBusyDomain(null)
				loadOverview()
			}
		},
		[username, loadOverview],
	)

	// Import types shown: those of the selected sub-view when the department has some (Quality)
	const groups = department.groups ?? []
	const group = groups.find((g) => g.id === groupId) ?? groups[0]
	const visibleTypes = group
		? department.types.filter((t) => (t.group ?? groups[0].id) === group.id)
		: department.types

	// History and coverage of the selected department
	const batchDomains = useMemo(() => new Set(department.types.map((t) => t.batchDomain)), [department])
	const history = useMemo(
		() => (overview?.Historique ?? []).filter((h) => batchDomains.has(h.Domaine)),
		[overview, batchDomains],
	)
	const latestBy = useMemo(() => {
		const attempt = new Map<string, HistoryEntry>()
		const imported = new Map<string, HistoryEntry>()
		for (const h of overview?.Historique ?? []) {
			if (!attempt.has(h.Domaine)) attempt.set(h.Domaine, h)
			if (h.Statut !== 'ERROR' && !imported.has(h.Domaine)) imported.set(h.Domaine, h)
		}
		return { attempt, imported }
	}, [overview])

	// A department whose last attempt on a type was refused gets a red dot
	const refusedDepartments = useMemo(
		() =>
			new Set(
				DEPARTMENTS.filter((d) => d.types.some((t) => latestBy.attempt.get(t.batchDomain)?.Statut === 'ERROR')).map(
					(d) => d.id,
				),
			),
		[latestBy],
	)

	const resultType = result ? department.types.find((t) => t.domain === result.domain) : undefined
	const compact = visibleTypes.length > 4

	return (
		<div className="flex h-full min-h-0 flex-col gap-3 p-3 sm:p-4 lg:px-6 lg:py-4">
			{/* Header */}
			<div className="flex shrink-0 flex-wrap items-end justify-between gap-3">
				<div className="min-w-0">
					<h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
						<FileSpreadsheet className="h-6 w-6 text-blue-600" />
						Importation
					</h1>
					<p className="text-sm text-muted-foreground">
						Fichiers Excel des indicateurs et de leurs cibles : chaque fichier est contrôlé avant d&apos;être enregistré.
					</p>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<span className="text-muted-foreground">Modèles Excel</span>
					<Select value={String(templateYear)} onValueChange={(v) => setTemplateYear(Number(v))}>
						<SelectTrigger className="h-8 w-[92px]" aria-label="Année des modèles">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{[currentYear - 1, currentYear, currentYear + 1].map((y) => (
								<SelectItem key={y} value={String(y)}>
									{y}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Departments */}
			<div className="flex shrink-0 gap-1 overflow-x-auto rounded-xl border border-border bg-muted/50 p-1" role="tablist">
				{DEPARTMENTS.map((d) => {
					const enabled = allowed.has(d.id)
					const active = d.id === department.id
					return (
						<button
							key={d.id}
							type="button"
							role="tab"
							aria-selected={active}
							disabled={!enabled}
							onClick={() => {
								setDepartmentId(d.id)
								setGroupId(null)
								setResult(null)
							}}
							className={`relative flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
								active
									? 'bg-background text-foreground shadow-sm ring-1 ring-border'
									: 'text-muted-foreground hover:text-foreground'
							} disabled:cursor-not-allowed disabled:opacity-40`}
						>
							{d.name}
							{refusedDepartments.has(d.id) && (
								<span
									className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-rose-500"
									title="Dernier import d'un type refusé"
								/>
							)}
						</button>
					)
				})}
			</div>

			{loadError && (
				<p className="shrink-0 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
					{loadError}
				</p>
			)}

			<div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_400px]">
				{/* Import types of the department */}
				<div className="flex min-h-0 flex-col gap-2">
					{groups.length > 1 && (
						<div className="flex shrink-0 gap-1 self-start rounded-lg bg-muted/60 p-0.5" role="tablist">
							{groups.map((g) => (
								<button
									key={g.id}
									type="button"
									role="tab"
									aria-selected={g.id === group?.id}
									onClick={() => setGroupId(g.id)}
									className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
										g.id === group?.id
											? 'bg-background text-foreground shadow-sm ring-1 ring-border'
											: 'text-muted-foreground hover:text-foreground'
									}`}
								>
									{g.label}
								</button>
							))}
						</div>
					)}
					<div className="hidden shrink-0 grid-cols-[minmax(0,1.35fr)_minmax(0,1.15fr)_minmax(0,1.2fr)_auto] gap-x-4 px-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground md:grid">
						<span>Type d&apos;import</span>
						<span>Données en base</span>
						<span>Dernier import</span>
						<span className="w-[194px]">Fichier</span>
					</div>
					<div
						className={`grid min-h-0 flex-1 overflow-y-auto ${
							compact ? 'gap-1.5 auto-rows-[minmax(50px,1fr)]' : 'gap-2 auto-rows-[minmax(64px,1fr)]'
						}`}
					>
						{visibleTypes.map((type) => (
							<ImportRow
								key={type.domain}
								type={type}
								coverage={(overview?.Couverture ?? []).filter((c) => c.Domaine === type.batchDomain)}
								lastAttempt={latestBy.attempt.get(type.batchDomain)}
								lastImport={latestBy.imported.get(type.batchDomain)}
								templateYear={templateYear}
								busy={busyDomain === type.domain}
								disabled={!allowed.has(department.id) || (busyDomain !== null && busyDomain !== type.domain)}
								compact={compact}
								onUpload={upload}
							/>
						))}
					</div>
					<p className="flex shrink-0 items-start gap-1.5 px-1 text-xs text-muted-foreground">
						<Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
						<span>
							Glissez un fichier sur une ligne ou cliquez sur Importer. Chaque ligne du fichier va dans son année ; les lignes
							vides sont ignorées. Un fichier avec une période en double ou une valeur impossible est refusé en entier, sans
							rien modifier. Le modèle contient l&apos;onglet attendu et les valeurs déjà en base.
						</span>
					</p>
				</div>

				<ImportHistory
					entries={history}
					typeOf={(batchDomain) => findByBatchDomain(batchDomain)?.type}
					result={result}
					resultTitle={resultType ? `${department.name}, ${resultType.title.toLowerCase()}` : undefined}
					onCloseResult={() => setResult(null)}
					loading={loading}
				/>
			</div>
		</div>
	)
}
