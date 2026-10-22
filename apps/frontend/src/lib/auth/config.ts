/**
 * Authentication Configuration
 * 
 * Manages environment variable configuration for the authentication system.
 */

import { BirthdayCodeConfig } from '@/types/auth';

/**
 * Validates authentication configuration at application startup
 * Throws an error if required environment variables are missing or invalid
 */
export function validateAuthConfig(): void {
  if (!process.env.NEXT_PUBLIC_BIRTHDAY_CODE) {
    throw new Error(
      '[Auth Config] NEXT_PUBLIC_BIRTHDAY_CODE is not defined. ' +
      'Please add it to your .env.local file.'
    );
  }
  
  const code = process.env.NEXT_PUBLIC_BIRTHDAY_CODE;
  
  if (!/^\d{4}$/.test(code)) {
    throw new Error(
      '[Auth Config] NEXT_PUBLIC_BIRTHDAY_CODE must be exactly 4 digits. ' +
      `Current value: "${code}"`
    );
  }
}

/**
 * Gets the current authentication configuration
 * @returns Birthday code configuration object
 */
export function getAuthConfig(): BirthdayCodeConfig {
  const validCode = process.env.NEXT_PUBLIC_BIRTHDAY_CODE || '';
  const isConfigured = validCode.length === 4 && /^\d{4}$/.test(validCode);
  
  return {
    validCode,
    isConfigured,
  };
}

/**
 * Gets the valid birthday code from environment
 * @returns The configured birthday code or empty string if not set
 */
export function getBirthdayCode(): string {
  return process.env.NEXT_PUBLIC_BIRTHDAY_CODE || '';
}
