/**
 * Authentication Constants
 * 
 * Centralized constants for the authentication system.
 * All timing, limits, and configuration values are defined here.
 */

/**
 * Session Configuration
 */
export const SESSION_CONFIG = {
  /** Session expiration duration in days */
  EXPIRATION_DAYS: 7,
  
  /** Session expiration duration in milliseconds */
  EXPIRATION_MS: 7 * 24 * 60 * 60 * 1000, // 7 days
  
  /** localStorage key for session storage */
  STORAGE_KEY: 'birthday_auth_session',
  
  /** Storage schema version */
  SCHEMA_VERSION: 1,
} as const;

/**
 * Rate Limiter Configuration
 */
export const RATE_LIMIT_CONFIG = {
  /** Maximum failed authentication attempts allowed */
  MAX_ATTEMPTS: 10,
  
  /** Time window for counting attempts (1 hour in milliseconds) */
  WINDOW_MS: 60 * 60 * 1000, // 1 hour
  
  /** Block duration after exceeding limit (1 hour in milliseconds) */
  BLOCK_DURATION_MS: 60 * 60 * 1000, // 1 hour
  
  /** localStorage key for rate limit storage */
  STORAGE_KEY: 'auth_rate_limit',
  
  /** Storage schema version */
  SCHEMA_VERSION: 1,
} as const;

/**
 * Authentication Error Messages (Spanish)
 */
export const AUTH_ERRORS = {
  /** Incorrect birthday code */
  INVALID_CODE: 'Código incorrecto, intenta de nuevo 🎂',
  
  /** Rate limit exceeded */
  RATE_LIMITED: 'Demasiados intentos. Por favor espera',
  
  /** Network or connection error */
  NETWORK_ERROR: 'Error de conexión, por favor intenta nuevamente',
  
  /** Configuration error (missing env var) */
  CONFIG_ERROR: 'Error de configuración. Contacta al administrador',
  
  /** Session expired */
  SESSION_EXPIRED: 'Tu sesión ha expirado',
  
  /** localStorage unavailable */
  STORAGE_UNAVAILABLE: 'El almacenamiento local no está disponible',
  
  /** Invalid code format */
  INVALID_FORMAT: 'El código debe tener exactamente 4 dígitos',
  
  /** Generic error */
  UNKNOWN_ERROR: 'Ocurrió un error inesperado',
} as const;

/**
 * Authentication Success Messages (Spanish)
 */
export const AUTH_SUCCESS = {
  /** Login successful */
  LOGIN_SUCCESS: '¡Bienvenida! 🎉',
  
  /** Logout successful */
  LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
  
  /** Session restored */
  SESSION_RESTORED: 'Sesión restaurada',
} as const;

/**
 * Animation Configuration
 */
export const ANIMATION_CONFIG = {
  /** Unlock animation minimum duration in milliseconds */
  UNLOCK_MIN_DURATION: 1500,
  
  /** Unlock animation maximum duration in milliseconds */
  UNLOCK_MAX_DURATION: 3000,
  
  /** Default unlock animation duration in milliseconds */
  UNLOCK_DEFAULT_DURATION: 2000,
  
  /** Particle count for confetti animation */
  PARTICLE_COUNT: 75,
  
  /** Target frame rate for animations */
  TARGET_FPS: 30,
  
  /** Transition duration for UI animations in milliseconds */
  TRANSITION_DURATION: 300,
  
  /** Stagger delay between animated elements in milliseconds */
  STAGGER_DELAY: 100,
} as const;

/**
 * Validation Configuration
 */
export const VALIDATION = {
  /** Birthday code expected length */
  CODE_LENGTH: 4,
  
  /** Birthday code regex pattern (4 digits) */
  CODE_PATTERN: /^\d{4}$/,
  
  /** Minimum input length */
  MIN_INPUT_LENGTH: 4,
  
  /** Maximum input length */
  MAX_INPUT_LENGTH: 4,
} as const;

/**
 * Timing Configuration
 */
export const TIMING = {
  /** Session check interval in milliseconds (1 minute) */
  SESSION_CHECK_INTERVAL: 60 * 1000,
  
  /** Countdown update interval in milliseconds */
  COUNTDOWN_INTERVAL: 1000,
  
  /** Debounce delay for input in milliseconds */
  INPUT_DEBOUNCE: 300,
  
  /** Toast/notification display duration in milliseconds */
  NOTIFICATION_DURATION: 5000,
  
  /** Redirect delay after success in milliseconds */
  REDIRECT_DELAY: 500,
  
  /** Loading state minimum display time in milliseconds */
  MIN_LOADING_TIME: 500,
} as const;

/**
 * Performance Configuration
 */
export const PERFORMANCE = {
  /** localStorage cache TTL in milliseconds */
  CACHE_TTL: 5000, // 5 seconds
  
  /** Maximum localStorage size estimate in bytes */
  MAX_STORAGE_SIZE: 5 * 1024 * 1024, // 5MB
  
  /** Session validation timeout in milliseconds */
  SESSION_VALIDATION_TIMEOUT: 100,
  
  /** Code validation timeout in milliseconds */
  CODE_VALIDATION_TIMEOUT: 200,
} as const;

/**
 * Routes Configuration
 */
export const ROUTES = {
  /** Login page route */
  LOGIN: '/',
  
  /** Dashboard route */
  DASHBOARD: '/dashboard',
  
  /** Bóveda de Recuerdos route */
  BOVEDA: '/boveda',
  
  /** Playlist Visual route */
  PLAYLIST: '/playlist',
  
  /** Escape Room route */
  ESCAPE_ROOM: '/escape-room',
  
  /** Dashboard de Ánimo route */
  ANIMO: '/animo',
  
  /** Botiquín de Emergencia route */
  BOTIQUIN: '/botiquin',
} as const;

/**
 * Protected routes array
 */
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.BOVEDA,
  ROUTES.PLAYLIST,
  ROUTES.ESCAPE_ROOM,
  ROUTES.ANIMO,
  ROUTES.BOTIQUIN,
] as const;

/**
 * Responsive Breakpoints (in pixels)
 */
export const BREAKPOINTS = {
  /** Mobile breakpoint */
  MOBILE: 768,
  
  /** Tablet breakpoint */
  TABLET: 1024,
  
  /** Desktop breakpoint */
  DESKTOP: 1440,
} as const;

/**
 * Accessibility Configuration
 */
export const ACCESSIBILITY = {
  /** Minimum color contrast ratio (WCAG AA) */
  MIN_CONTRAST_RATIO: 4.5,
  
  /** Minimum touch target size in pixels */
  MIN_TOUCH_TARGET: 44,
  
  /** Focus outline width in pixels */
  FOCUS_OUTLINE_WIDTH: 2,
  
  /** Animation duration for reduced motion in milliseconds */
  REDUCED_MOTION_DURATION: 0,
} as const;
