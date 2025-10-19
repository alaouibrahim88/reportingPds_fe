"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/client-storage'
import type { 
	UploadedFile, 
	FilesByDepartment, 
	FileUploadContextType 
} from '@/types'

// Constants
const STORAGE_KEY = 'importation_files'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_FILE_TYPES = [
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
	'application/vnd.ms-excel', // .xls
]

// Context
const FileUploadContext = createContext<FileUploadContextType | undefined>(
	undefined
)

// Custom Hook
export function useFileUpload() {
	const context = useContext(FileUploadContext)
	if (!context) {
		throw new Error('useFileUpload must be used within FileUploadProvider')
	}
	return context
}

// Provider Props
interface FileUploadProviderProps {
	children: ReactNode
}

// Provider Component
export function FileUploadProvider({ children }: FileUploadProviderProps) {
	const [files, setFiles] = useState<FilesByDepartment>(() => 
		loadFromLocalStorage<FilesByDepartment>(STORAGE_KEY, {})
	)

	// Helper to update state and persist to storage
	const updateFilesState = (updater: (prev: FilesByDepartment) => FilesByDepartment) => {
		setFiles(prev => {
			const updated = updater(prev)
			saveToLocalStorage(STORAGE_KEY, updated)
			return updated
		})
	}

	// Validate file before upload
	const validateFile = (file: File) => {
		if (!ALLOWED_FILE_TYPES.includes(file.type)) {
			throw new Error('Please upload a valid Excel file (.xlsx or .xls)')
		}

		if (file.size > MAX_FILE_SIZE) {
			throw new Error('File size must be less than 10MB')
		}
	}

	// Create uploaded file object
	const createUploadedFile = (file: File, status: UploadedFile['status']): UploadedFile => ({
		id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
		name: file.name,
		uploadDate: new Date().toISOString().split('T')[0],
		status,
		size: file.size,
	})

	// Update file status
	const updateFileStatus = (
		departmentId: string, 
		fileId: string, 
		status: UploadedFile['status']
	) => {
		updateFilesState(prev => ({
			...prev,
			[departmentId]: prev[departmentId]?.map(f =>
				f.id === fileId ? { ...f, status } : f
			) || []
		}))
	}

	const uploadFile = async (departmentId: string, file: File) => {
		validateFile(file)

		const newFile = createUploadedFile(file, 'uploading')

		// Add file to state with uploading status
		updateFilesState(prev => ({
			...prev,
			[departmentId]: [...(prev[departmentId] || []), newFile]
		}))

		try {
			// Simulate upload delay (replace with actual API call)
			await new Promise(resolve => setTimeout(resolve, 1500))

			// Update status to uploaded
			updateFileStatus(departmentId, newFile.id, 'uploaded')
		} catch (error) {
			// Update status to error
			updateFileStatus(departmentId, newFile.id, 'error')
			throw error
		}
	}

	const deleteFile = (departmentId: string, fileId: string) => {
		updateFilesState(prev => ({
			...prev,
			[departmentId]: prev[departmentId]?.filter(f => f.id !== fileId) || []
		}))
	}

	const getFilesForDepartment = (departmentId: string): UploadedFile[] => {
		return files[departmentId] || []
	}

	return (
		<FileUploadContext.Provider
			value={{
				files,
				uploadFile,
				deleteFile,
				getFilesForDepartment,
			}}
		>
			{children}
		</FileUploadContext.Provider>
	)
}
