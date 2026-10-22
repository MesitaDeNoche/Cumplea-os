/**
 * Authentication Type Definitions
 * 
 * This file contains all TypeScript interfaces and types for the authentication system.
 * Based on SPEC-000 design document.
 */

/**
 * Represents an authenticated user session
 */
export interface Session {
  /** Unique session identifier (UUID v4) */
  id: string;
  
  /** Timestamp when session was created (Unix milliseconds) */
  createdAt: number;
  
  /** Timestamp when session expires (Unix milliseconds) */
  expiresAt: number;
  
  /** Authentication status */
  authenticated: boolean;
}

/**
 * Birthday code validation result
 */
export interface BirthdayCodeValidation {
  /** Whether the code is valid */
  isValid: boolean;
  
  /** Error message if invalid */
  error?: string;
}

/**
 * Rate limiting state for authentication attempts
 */
export interface RateLimitState {
  /** Array of failed attempt timestamps */
  attempts: Array<{
    timestamp: number;
  }>;
  
  /** Timestamp until which user is blocked (null if not blocked) */
  blockedUntil: number | null;
}

/**
 * Rate limiter status information
 */
export interface RateLimitStatus {
  /** Whether user can attempt authentication */
  canAttempt: boolean;
  
  /** Number of attempts remaining before block */
  attemptsRemaining: number;
  
  /** Milliseconds until block expires (0 if not blocked) */
  remainingBlockTime: number;
  
  /** Whether user is currently blocked */
  isBlocked: boolean;
}

/**
 * Global authentication state
 */
export interface AuthState {
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  
  /** Whether auth state is being initialized */
  isLoading: boolean;
  
  /** Current session (null if not authenticated) */
  session: Session | null;
  
  /** Whether auth system has been initialized */
  initialized: boolean;
}

/**
 * Authentication attempt result
 */
export interface AuthResult {
  /** Whether authentication succeeded */
  success: boolean;
  
  /** Error message if failed */
  error?: string;
  
  /** Error code for programmatic handling */
  errorCode?: 'INVALID_CODE' | 'RATE_LIMITED' | 'NETWORK_ERROR' | 'CONFIG_ERROR';
}

/**
 * Birthday code environment configuration
 */
export interface BirthdayCodeConfig {
  /** Valid birthday code from environment variable */
  validCode: string;
  
  /** Whether configuration is valid */
  isConfigured: boolean;
}

/**
 * Session storage data structure
 */
export interface SessionStorageData {
  /** Session information */
  session: Session;
  
  /** Schema version for future migrations */
  version: number;
}

/**
 * Rate limit storage data structure
 */
export interface RateLimitStorageData {
  /** Rate limit state */
  state: RateLimitState;
  
  /** Schema version for future migrations */
  version: number;
}

/**
 * Authentication context value exposed to components
 */
export interface AuthContextValue {
  /** Whether user is authenticated */
  isAuthenticated: boolean;
  
  /** Whether auth operations are in progress */
  isLoading: boolean;
  
  /** Current session (null if not authenticated) */
  session: Session | null;
  
  /** Attempt to authenticate with birthday code */
  login: (code: string) => Promise<AuthResult>;
  
  /** Clear session and redirect to login */
  logout: () => void;
  
  /** Manually check session validity */
  checkSession: () => boolean;
}

/**
 * Rate limiter configuration
 */
export interface RateLimiterConfig {
  /** Maximum failed attempts allowed */
  maxAttempts: number;
  
  /** Time window in milliseconds */
  windowMs: number;
  
  /** Block duration in milliseconds after exceeding limit */
  blockDurationMs: number;
}

/**
 * Session manager configuration
 */
export interface SessionConfig {
  /** Session expiration duration in days */
  expirationDays: number;
  
  /** localStorage key for session storage */
  storageKey: string;
}
