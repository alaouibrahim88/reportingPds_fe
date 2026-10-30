"use client"

import { useRef, useState } from 'react'
import { AlertTriangle, BarChart3, CheckCircle2, Download, Loader2, Target, Upload, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Coverage, HistoryEntry, ImportType } from './import-types'
import { FREQUENCY_LABELS, formatDate, formatRanges } from './format'

interface ImportRowProps {
	type: ImportType
	coverage: Coverage[]
	// Latest batch of the type (imported or refused) and latest imported one
	lastAttempt?: HistoryEntry
	lastImport?: HistoryEntry
	templateYear: number
	busy: boolean
	disabled: boolean
	compact: boolean
	onUpload: (type: ImportType, file: File) => void
}

export function ImportRow({
	type,
	coverage,
	lastAttempt,
	lastImport,
	templateYear,
	busy,
	disabled,
	compact,
	onUpload,
}: ImportRowProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [dragging, setDragging] = useState(false)
	const currentYear = new Date().getFullYear()
	const refused = lastAttempt?.Statut === 'ERROR' ? lastAttempt : undefined
	const Icon = type.kind === 'targets' ? Target : BarChart3

	const pick = (files: FileList | null) => {
		const file = files?.[0]
		if (file && !disabled && !busy) onUpload(type, file)
	}

	// Years present in the database, the most recent first (three at most)
	const years = coverage
		.filter((c) => c.Annee !== null)
		.sort((a, b) => (b.Annee ?? 0) - (a.Annee ?? 0))
		.slice(0, compact ? 2 : 3)
	const dated = coverage.find((c) => c.Annee === null)

	return (
		<div
			onDragOver={(e) => {
				if (disabled) return
				e.preventDefault()
				setDragging(true)
			}}
			onDragLeave={() => setDragging(false)}
			onDrop={(e) => {
				e.preventDefault()
				setDragging(false)
				pick(e.dataTransfer.files)
			}}
			className={`grid min-h-0 grid-cols-1 items-center gap-x-4 gap-y-2 rounded-xl border bg-card px-4 transition-colors md:grid-cols-[minmax(0,1.35fr)_minmax(0,1.15fr)_minmax(0,1.2fr)_auto] ${
				compact ? 'py-2' : 'py-3'
			} ${dragging ? 'border-primary bg-primary/5 ring-2 ring-primary/30' : 'border-border'} ${
				disabled ? 'opacity-50' : ''
			}`}
		>
			{/* Type */}
			<div className="flex min-w-0 items-center gap-3">
				<span
					className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
						type.kind === 'targets'
							? 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
							: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
					}`}
				>
					<Icon className="h-[18px] w-[18px]" />
				</span>
				<div className="min-w-0">
					<p className="line-clamp-2 text-sm font-semibold leading-tight text-foreground" title={type.title}>
						{type.title}
					</p>
					<p className="truncate text-xs text-muted-foreground">{FREQUENCY_LABELS[type.frequency]}</p>
				</div>
			</div>

			{/* Data in the database */}
			<div className="flex min-w-0 flex-wrap items-center gap-1.5">
				{years.map((c) => (
					<span
						key={c.Annee}
						title={`${c.Nb} ${type.frequency === 'monthly' ? 'mois' : 'semaines'} en base`}
						className={`inline-flex max-w-full items-center gap-1 truncate rounded-md px-2 py-0.5 text-xs ${
							c.Annee === currentYear
								? 'bg-blue-600 font-semibold text-white'
								: 'bg-muted text-muted-foreground'
						}`}
					>
						<span className="font-bold">{c.Annee}</span>
						<span className="truncate">{formatRanges(c.Plages, type.frequency)}</span>
					</span>
				))}
				{dated && (
					<span
						title={dated.Plages ?? undefined}
						className="inline-flex max-w-full items-center truncate rounded-md bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white"
					>
						{dated.Nb} cible{dated.Nb > 1 ? 's' : ''} active{dated.Nb > 1 ? 's' : ''}
					</span>
				)}
				{years.length === 0 && !dated && (
					<span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
						<AlertTriangle className="h-3 w-3" />
						Aucune donnée en base
					</span>
				)}
				{years.length > 0 && !years.some((c) => c.Annee === currentYear) && type.frequency !== 'dates' && (
					<span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
						<AlertTriangle className="h-3 w-3" />
						Rien en {currentYear}
					</span>
				)}
			</div>

			{/* Last import */}
			<div className="min-w-0 text-xs">
				{refused ? (
					<div className="min-w-0" title={refused.Message ?? undefined}>
						<p className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
							<XCircle className="h-3.5 w-3.5 shrink-0" />
							Refusé le {formatDate(refused.Le)}
						</p>
						<p className="line-clamp-1 text-muted-foreground">{refused.Message}</p>
					</div>
				) : lastImport ? (
					<div className="min-w-0">
						<p className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
							<CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
							Importé le {formatDate(lastImport.Le)}
						</p>
						<p className="truncate text-muted-foreground" title={lastImport.Fichier}>
							{lastImport.Fichier}
							{lastImport.Lignes !== null && ` · ${lastImport.Lignes} ligne${lastImport.Lignes > 1 ? 's' : ''}`}
						</p>
					</div>
				) : (
					<p className="text-muted-foreground">Jamais importé</p>
				)}
			</div>

			{/* Actions */}
			<div className="flex items-center gap-2">
				<input
					ref={inputRef}
					type="file"
					accept=".xlsx"
					className="hidden"
					onChange={(e) => {
						pick(e.target.files)
						e.target.value = ''
					}}
				/>
				<Button
					size="sm"
					onClick={() => inputRef.current?.click()}
					disabled={disabled || busy}
					className="h-8 gap-1.5 px-3"
				>
					{busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
					{busy ? 'Import…' : 'Importer'}
				</Button>
				<Button asChild size="sm" variant="outline" className="h-8 gap-1.5 px-3" title={`Modèle Excel ${templateYear}, avec les valeurs déjà en base`}>
					<a href={`/api/importation/template?domain=${type.domain}&annee=${templateYear}`} download>
						<Download className="h-3.5 w-3.5" />
						Modèle
					</a>
				</Button>
			</div>
		</div>
	)
}
