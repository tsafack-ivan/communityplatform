import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | undefined) {
  if (typeof amount !== 'number') return '$0';
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
