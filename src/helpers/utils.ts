import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStrokeColor = (treeType = 'string') => {
  if (treeType === 'Design') return '#56a4e9'
  if (treeType === 'Programming') return '#a9e46d'
  return '#f88e87'
}
