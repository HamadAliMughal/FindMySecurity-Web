import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = 'https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev'