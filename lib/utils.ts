import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMEUR(value: number | undefined | null): string {
  if (value == null || Number.isNaN(value)) return '-'
  return Number(value.toFixed(2)).toString()
}
