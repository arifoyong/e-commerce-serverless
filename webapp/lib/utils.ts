import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: Number) => {
  const decPrice = Number(price)
  return decPrice.toFixed(2)
}

export const renameWithDate = (fullPath: string) => {
  if (!fullPath) {
      return ''
  }

  return `${Date.now()}-${fullPath.replaceAll(" ", "-")}`
}