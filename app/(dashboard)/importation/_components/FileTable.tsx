"use client"

import type { UploadedFile } from '@/types'
import { Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FileTableProps {
	files: UploadedFile[]
	onDelete: (fileId: string) => void
}

export function FileTable({ files, onDelete }: FileTableProps) {
	const getStatusBadge = (status: UploadedFile['status']) => {
		switch (status) {
			case 'uploaded':
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#28A745] text-white">
						Uploaded
					</span>
				)
			case 'uploading':
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
						<Loader2 className="h-3 w-3 mr-1 animate-spin" />
						Uploading
					</span>
				)
			case 'error':
				return (
					<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
						Error
					</span>
				)
			default:
				return null
		}
	}

	const formatFileSize = (bytes?: number) => {
		if (!bytes) return 'N/A'
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(1024))
		return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
	}

	return (
		<div className="overflow-x-auto">
			{/* Desktop Table */}
			<div className="hidden sm:block">
				<table className="w-full">
					<thead>
						<tr className="border-b">
							<th className="text-left py-3 px-4 text-sm font-semibold text-foreground uppercase tracking-wider">
								File Name
							</th>
							<th className="text-left py-3 px-4 text-sm font-semibold text-foreground uppercase tracking-wider">
								Upload Date
							</th>
							<th className="text-left py-3 px-4 text-sm font-semibold text-foreground uppercase tracking-wider">
								Size
							</th>
							<th className="text-left py-3 px-4 text-sm font-semibold text-foreground uppercase tracking-wider">
								Status
							</th>
							<th className="text-left py-3 px-4 text-sm font-semibold text-foreground uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y">
						{files.map((file) => (
							<tr key={file.id} className="hover:bg-muted/50 transition-colors">
								<td className="py-3 px-4 text-sm text-foreground">
									{file.name}
								</td>
								<td className="py-3 px-4 text-sm text-foreground">
									{file.uploadDate}
								</td>
								<td className="py-3 px-4 text-sm text-foreground">
									{formatFileSize(file.size)}
								</td>
								<td className="py-3 px-4 text-sm">
									{getStatusBadge(file.status)}
								</td>
								<td className="py-3 px-4 text-sm">
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onDelete(file.id)}
									disabled={file.status === 'uploading'}
									className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 p-1"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile Cards */}
			<div className="sm:hidden space-y-3">
				{files.map((file) => (
					<div key={file.id} className="bg-muted/30 rounded-lg p-4 border">
						<div className="flex items-start justify-between mb-2">
							<div className="flex-1 min-w-0">
								<h3 className="text-sm font-medium text-foreground truncate">
									{file.name}
								</h3>
								<p className="text-xs text-muted-foreground mt-1">
									{file.uploadDate} • {formatFileSize(file.size)}
								</p>
							</div>
							<div className="flex items-center gap-2 ml-2">
								{getStatusBadge(file.status)}
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onDelete(file.id)}
									disabled={file.status === 'uploading'}
									className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 p-1 h-8 w-8"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
