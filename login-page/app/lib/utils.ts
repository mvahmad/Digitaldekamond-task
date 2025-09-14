import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeIranPhone(input: string): string {
  // Remove all non-digit characters
  let numbers = input.replace(/\D/g, "");

  // Handle different prefixes
  if (numbers.startsWith("00989")) {
    numbers = "09" + numbers.substring(5);
  } else if (numbers.startsWith("989")) {
    numbers = "09" + numbers.substring(3);
  } else if (numbers.startsWith("09")) {
    // Already local format
  } else {
    // Not valid, will be caught by validation
  }
  // Limit to 11 digits
  return numbers.slice(0, 11);
}

export function isValidIranPhone(input: string): boolean {
  // Accept only normalized local form
  return /^09\d{9}$/.test(normalizeIranPhone(input));
}

