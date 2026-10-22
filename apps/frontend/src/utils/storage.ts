/**
 * Secure Storage Utility
 * 
 * Type-safe wrapper around localStorage with error handling.
 * Provides serialization/deserialization and graceful error handling.
 */

/**
 * Type-safe localStorage wrapper with error handling
 */
export class SecureStorage {
  /**
   * Store a value in localStorage with JSON serialization
   * @param key - Storage key
   * @param value - Value to store (will be JSON serialized)
   */
  static set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('[SecureStorage] Failed to save data:', error);
      
      // Check for quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.error('[SecureStorage] localStorage quota exceeded');
      }
    }
  }

  /**
   * Retrieve a value from localStorage with JSON parsing
   * @param key - Storage key
   * @returns Parsed value or null if not found or error
   */
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      
      if (item === null) {
        return null;
      }
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('[SecureStorage] Failed to retrieve data:', error);
      
      // If parsing fails, remove corrupted data
      if (error instanceof SyntaxError) {
        console.warn('[SecureStorage] Corrupted data detected, removing:', key);
        SecureStorage.remove(key);
      }
      
      return null;
    }
  }

  /**
   * Remove a value from localStorage
   * @param key - Storage key to remove
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('[SecureStorage] Failed to remove data:', error);
    }
  }

  /**
   * Clear all data from localStorage
   * WARNING: This removes all localStorage data for the current origin
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('[SecureStorage] Failed to clear storage:', error);
    }
  }

  /**
   * Check if localStorage is available
   * @returns true if localStorage is available and working
   */
  static isAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all keys in localStorage
   * @returns Array of all storage keys
   */
  static keys(): string[] {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('[SecureStorage] Failed to get keys:', error);
      return [];
    }
  }

  /**
   * Check if a key exists in localStorage
   * @param key - Storage key to check
   * @returns true if key exists
   */
  static has(key: string): boolean {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error('[SecureStorage] Failed to check key existence:', error);
      return false;
    }
  }

  /**
   * Get the number of items in localStorage
   * @returns Number of stored items
   */
  static getLength(): number {
    try {
      return localStorage.length;
    } catch (error) {
      console.error('[SecureStorage] Failed to get storage length:', error);
      return 0;
    }
  }
}

/**
 * Check if we're in a browser environment
 * @returns true if running in browser with localStorage
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * Get storage size estimate in bytes
 * @returns Approximate size of localStorage in bytes
 */
export function getStorageSize(): number {
  if (!isBrowser()) return 0;
  
  try {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage.getItem(key);
        if (value) {
          total += key.length + value.length;
        }
      }
    }
    return total * 2; // UTF-16 uses 2 bytes per character
  } catch (error) {
    console.error('[SecureStorage] Failed to calculate storage size:', error);
    return 0;
  }
}
