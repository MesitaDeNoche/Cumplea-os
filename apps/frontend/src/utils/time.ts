/**
 * Time Utilities
 * 
 * Helper functions for time calculations, formatting, and date manipulation.
 */

/**
 * Format a duration in milliseconds to a human-readable Spanish string
 * @param milliseconds - Duration in milliseconds
 * @returns Formatted string (e.g., "5 minutos", "1 hora", "2 días")
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? '1 día' : `${days} días`;
  }
  
  if (hours > 0) {
    return hours === 1 ? '1 hora' : `${hours} horas`;
  }
  
  if (minutes > 0) {
    return minutes === 1 ? '1 minuto' : `${minutes} minutos`;
  }
  
  return seconds === 1 ? '1 segundo' : `${seconds} segundos`;
}

/**
 * Format milliseconds to MM:SS format
 * @param milliseconds - Duration in milliseconds
 * @returns Formatted time string (e.g., "05:30", "12:45")
 */
export function formatTimeMMSS(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Add days to a date
 * @param date - Base date
 * @param days - Number of days to add
 * @returns New date with added days
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Add hours to a date
 * @param date - Base date
 * @param hours - Number of hours to add
 * @returns New date with added hours
 */
export function addHours(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

/**
 * Add minutes to a date
 * @param date - Base date
 * @param minutes - Number of minutes to add
 * @returns New date with added minutes
 */
export function addMinutes(date: Date, minutes: number): Date {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

/**
 * Check if a timestamp is in the past (expired)
 * @param timestamp - Unix timestamp in milliseconds
 * @returns true if timestamp is in the past
 */
export function isExpired(timestamp: number): boolean {
  return Date.now() > timestamp;
}

/**
 * Check if a timestamp is in the future
 * @param timestamp - Unix timestamp in milliseconds
 * @returns true if timestamp is in the future
 */
export function isFuture(timestamp: number): boolean {
  return Date.now() < timestamp;
}

/**
 * Get remaining time until a timestamp
 * @param expiresAt - Unix timestamp in milliseconds
 * @returns Milliseconds until expiration (0 if already expired)
 */
export function getRemainingTime(expiresAt: number): number {
  const remaining = expiresAt - Date.now();
  return remaining > 0 ? remaining : 0;
}

/**
 * Get time elapsed since a timestamp
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Milliseconds elapsed since timestamp
 */
export function getElapsedTime(timestamp: number): number {
  return Date.now() - timestamp;
}

/**
 * Format a date to ISO string (YYYY-MM-DD)
 * @param date - Date to format
 * @returns ISO date string
 */
export function formatISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format a date to Spanish locale string
 * @param date - Date to format
 * @returns Formatted date string (e.g., "12 de julio de 2024")
 */
export function formatSpanishDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Get current Unix timestamp in milliseconds
 * @returns Current timestamp
 */
export function now(): number {
  return Date.now();
}

/**
 * Convert days to milliseconds
 * @param days - Number of days
 * @returns Milliseconds
 */
export function daysToMilliseconds(days: number): number {
  return days * 24 * 60 * 60 * 1000;
}

/**
 * Convert hours to milliseconds
 * @param hours - Number of hours
 * @returns Milliseconds
 */
export function hoursToMilliseconds(hours: number): number {
  return hours * 60 * 60 * 1000;
}

/**
 * Convert minutes to milliseconds
 * @param minutes - Number of minutes
 * @returns Milliseconds
 */
export function minutesToMilliseconds(minutes: number): number {
  return minutes * 60 * 1000;
}

/**
 * Convert seconds to milliseconds
 * @param seconds - Number of seconds
 * @returns Milliseconds
 */
export function secondsToMilliseconds(seconds: number): number {
  return seconds * 1000;
}

/**
 * Sleep for a specified duration
 * @param milliseconds - Duration to sleep
 * @returns Promise that resolves after the duration
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Format remaining time for countdown display
 * @param milliseconds - Remaining time in milliseconds
 * @returns Formatted countdown string in Spanish
 */
export function formatCountdown(milliseconds: number): string {
  if (milliseconds <= 0) {
    return '0 segundos';
  }
  
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const parts: string[] = [];
  
  if (hours > 0) {
    parts.push(hours === 1 ? '1 hora' : `${hours} horas`);
  }
  
  if (minutes > 0) {
    parts.push(minutes === 1 ? '1 minuto' : `${minutes} minutos`);
  }
  
  if (seconds > 0 || parts.length === 0) {
    parts.push(seconds === 1 ? '1 segundo' : `${seconds} segundos`);
  }
  
  return parts.join(' y ');
}
