"use client"

import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, ChevronLeft, ChevronRight, Download, History, RotateCcw, X, XCircle } from 'lucide-react'
import type { HistoryEntry, ImportResult, ImportType } from './import-types'
import { formatDateTime, formatCount } from './format'

const ROW_HEIGHT = 66

const STATUS: Record<string, { label: string; className: string }> = {
	IMPORTED: {
		label: 'Importé',
		className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
	},
	REPLACED: {
		label: 'Importé, remplacé depuis',
		className: 'bg-slate-100 text-slate-600 dark:bg-slate-500/15 dark:text-slate-300',
	},
	ERROR: {
		label: 'Refusé',
		className: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
	},
}

interface ImportHistoryProps {
	entries: HistoryEntry[]
	typeOf: (batchDomain: string) => ImportType | undefined
	result: ImportResult | null
	resultTitle?: string
	onCloseResult: () => void
	loading: boolean
}

// History of the selected department, newest first, paged to the panel height (no scroll)
export function ImportHistory({ entries, typeOf, result, resultTitle, onCloseResult, loading }: ImportHistoryProps) {
	const listRef = useRef<HTMLDivElement>(null)
	const [pageSize, setPageSize] = useState(6)
	const [page, setPage] = useState(0)

	useEffect(() => {
		const el = listRef.current
		if (!el) return
		const update = () => setPageSize(Math.max(2, Math.floor(el.clientHeight / ROW_HEIGHT)))
		update()
		const observer = new ResizeObserver(update)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	const pages = Math.max(1, Math.ceil(entries.length / pageSize))
	useEffect(() => {
		if (page > pages - 1) setPage(pages - 1)
	}, [page, pages])
	// Back to the first page when the list changes (new import, other department)
	useEffect(() => setPage(0), [entries])

	const visible = entries.slice(page * pageSize, page * pageSize + pageSize)

	return (
		<section className="flex min-h-[420px] flex-col rounded-xl border border-border bg-card lg:min-h-0">
			<header className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
				<h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
					<History className="h-4 w-4 text-muted-foreground" />
					Historique des imports
				</h2>
				<span className="text-xs text-muted-foreground">
					{entries.length} import{entries.length > 1 ? 's' : ''}
				</span>
			</header>

			{/* Result of the import just made */}
			{result && (
				<div
					className={`mx-3 mt-3 rounded-lg border px-3 py-2 text-xs ${
						result.ok
							? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200'
							: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200'
					}`}
				>
					<div className="flex items-start gap-2">
						{result.ok ? (
							<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
						) : (
							<XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
						)}
						<div className="min-w-0 flex-1">
							<p className="font-semibold">
								{result.ok ? 'Import réussi' : 'Fichier refusé, rien n’a été modifié'}
								{resultTitle && <span className="font-normal"> · {resultTitle}</span>}
							</p>
							<p className="mt-0.5 max-h-24 overflow-hidden leading-relaxed">{result.message}</p>
						</div>
						<button
							type="button"
							onClick={onCloseResult}
							className="rounded p-0.5 opacity-60 hover:opacity-100"
							aria-label="Fermer"
						>
							<X className="h-3.5 w-3.5" />
						</button>
					</div>
				</div>
			)}

			<div ref={listRef} className="min-h-0 flex-1 overflow-hidden px-3 py-2">
				{loading && entries.length === 0 ? (
					<p className="px-1 py-6 text-center text-sm text-muted-foreground">Chargement…</p>
				) : entries.length === 0 ? (
					<p className="px-1 py-6 text-center text-sm text-muted-foreground">
						Aucun import pour ce département.
					</p>
				) : (
					<ul className="space-y-1">
						{visible.map((e) => {
							const status = STATUS[e.Statut] ?? STATUS.IMPORTED
							const type = typeOf(e.Domaine)
							return (
								<li
									key={e.Id}
									className="flex h-[62px] items-start gap-3 rounded-lg px-2 py-1.5 hover:bg-muted/60"
								>
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${status.className}`}>
												{status.label}
											</span>
											<span className="truncate text-xs font-semibold text-foreground">
												{type?.title ?? e.Domaine}
											</span>
										</div>
										<p className="mt-0.5 truncate text-[11px] text-muted-foreground" title={e.Fichier}>
											{formatDateTime(e.Le)}
											{e.Par ? ` · ${e.Par}` : ''} · {e.Fichier}
										</p>
										<p
											className={`truncate text-[11px] ${
												e.Statut === 'ERROR' ? 'text-rose-600 dark:text-rose-400' : 'text-foreground/80'
											}`}
											title={e.Message ?? e.Periodes ?? undefined}
										>
											{e.Statut === 'ERROR'
												? e.Message
												: [
														e.Lignes !== null ? `${formatCount(e.Lignes)} ligne${e.Lignes > 1 ? 's' : ''}` : null,
														e.Periodes,
													]
														.filter(Boolean)
														.join(' · ') || 'Ancien import (détail non enregistré)'}
										</p>
									</div>
									{e.AFichier && (
										<a
											href={`/api/importation/file?id=${e.Id}`}
											download
											title="Télécharger le fichier importé"
											className="mt-1 shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground"
										>
											<Download className="h-3.5 w-3.5" />
										</a>
									)}
								</li>
							)
						})}
					</ul>
				)}
			</div>

			<footer className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
				<span className="flex items-center gap-1">
					<RotateCcw className="h-3 w-3" />
					Réimporter une période remplace ses valeurs
				</span>
				<div className="flex items-center gap-1">
					<button
						type="button"
						onClick={() => setPage((p) => Math.max(0, p - 1))}
						disabled={page === 0}
						className="rounded-md p-1 hover:bg-muted disabled:opacity-30"
						aria-label="Page précédente"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					<span className="tabular-nums">
						{page + 1} / {pages}
					</span>
					<button
						type="button"
						onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
						disabled={page >= pages - 1}
						className="rounded-md p-1 hover:bg-muted disabled:opacity-30"
						aria-label="Page suivante"
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			</footer>
		</section>
	)
}
