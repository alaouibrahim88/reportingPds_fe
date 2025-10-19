/**
 * Client-side localStorage utility functions
 * Handles safe storage operations with error handling
 */

const isClient = typeof window !== 'undefined'

/**
 * Generic function to load data from localStorage
 * @param key - The localStorage key
 * @param defaultValue - Default value if key doesn't exist or parsing fails
 * @returns Parsed data or default value
 */
export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
	if (!isClient) return defaultValue

	try {
		const stored = localStorage.getItem(key)
		if (stored) {
			return JSON.parse(stored) as T
		}
	} catch (error) {
		console.error(`Error loading ${key} from localStorage:`, error)
	}

	return defaultValue
}

/**
 * Generic function to save data to localStorage
 * @param key - The localStorage key
 * @param value - The data to store
 * @returns Success status
 */
export function saveToLocalStorage<T>(key: string, value: T): boolean {
	if (!isClient) return false

	try {
		localStorage.setItem(key, JSON.stringify(value))
		return true
	} catch (error) {
		console.error(`Error saving ${key} to localStorage:`, error)
		return false
	}
}

/**
 * Remove data from localStorage
 * @param key - The localStorage key
 * @returns Success status
 */
export function removeFromLocalStorage(key: string): boolean {
	if (!isClient) return false

	try {
		localStorage.removeItem(key)
		return true
	} catch (error) {
		console.error(`Error removing ${key} from localStorage:`, error)
		return false
	}
}

/**
 * Clear all data from localStorage
 * @returns Success status
 */
export function clearLocalStorage(): boolean {
	if (!isClient) return false

	try {
		localStorage.clear()
		return true
	} catch (error) {
		console.error('Error clearing localStorage:', error)
		return false
	}
}

