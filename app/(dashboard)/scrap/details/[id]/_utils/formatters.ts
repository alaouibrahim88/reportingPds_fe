/**
 * Formats a number as currency
 * @param value The number to format
 * @param currency The currency symbol (default: €)
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number | string,
  currency: string = "€"
): string {
  const numValue =
    typeof value === "string" ? parseFloat(value.replace(",", ".")) : value;

  return `${numValue.toFixed(2)} ${currency}`;
}

/**
 * Capitalizes the first letter of a string
 * @param str The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
