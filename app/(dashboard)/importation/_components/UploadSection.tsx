"use client"

import { useState } from 'react'
import { Upload, FileX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFileUpload, FileTable } from './index'
import type { Department } from '../page'

interface UploadSectionProps {
	department: Department
}

export function UploadSection({ department }: UploadSectionProps) {
	const [isUploading, setIsUploading] = useState(false)
	const [fileInputKey, setFileInputKey] = useState(0)
	const { getFilesForDepartment, uploadFile, deleteFile } = useFileUpload()
	
	const files = getFilesForDepartment(department.id)

	const handleUploadClick = () => {
		document.getElementById(`file-input-${department.id}`)?.click()
	}

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		setIsUploading(true)
		try {
			await uploadFile(department.id, file)
		} catch (error) {
			console.error('Upload failed:', error)
			// You could add a toast notification here
		} finally {
			setIsUploading(false)
			// Reset file input by changing key
			setFileInputKey(prev => prev + 1)
		}
	}

	return (
		<div className="bg-card rounded-lg p-4 sm:p-6 border">
			{/* Section Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
				<h2 className="text-lg sm:text-xl font-bold text-foreground">
					{department.name}
				</h2>
				<Button
					onClick={handleUploadClick}
					disabled={isUploading}
					className="px-3 sm:px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
				>
					<Upload className="h-4 w-4" />
					{isUploading ? 'Uploading...' : 'Upload File'}
				</Button>
			</div>

			{/* Hidden file input */}
			<input
				key={fileInputKey}
				id={`file-input-${department.id}`}
				type="file"
				accept=".xlsx,.xls"
				onChange={handleFileChange}
				className="hidden"
			/>

			{/* File Table or Empty State */}
			{files.length > 0 ? (
				<FileTable
					files={files}
					onDelete={(fileId: string) => deleteFile(department.id, fileId)}
				/>
			) : (
				<div className="flex flex-col items-center justify-center py-8 sm:py-12 text-muted-foreground">
					<FileX className="h-12 w-12 sm:h-16 sm:w-16 mb-3 sm:mb-4 opacity-50" />
					<p className="text-base sm:text-lg text-center px-4">
						No files uploaded for this department yet.
					</p>
				</div>
			)}
		</div>
	)
}
