import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidSha256(value: string) {
  return /^[a-f0-9]{64}$/i.test(value);
}
