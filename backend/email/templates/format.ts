/**
 * Formats an ETH amount string to ensure consistent decimal places
 * @param amount The ETH amount as a string
 * @param decimals Optional number of decimal places (default: 6)
 * @returns Formatted ETH amount string
 */
export function formatEthAmount(amount: string, decimals: number = 6): string {
  const num = parseFloat(amount);
  return num.toFixed(decimals);
}
