# Task List - SPEC-000: Authentication System

## Overview

This task list provides a step-by-step implementation guide for the Authentication System (SPEC-000), which serves as the foundation for the birthday web application. The system includes birthday code authentication, session persistence, route protection, rate limiting, unlock animations, and navigation between modules.

**Total Estimated Tasks**: 60
**Phases**: 6
**Tech Stack**: Next.js 14+, TypeScript, React Context API, localStorage

---

## Phase 1: Setup & Infrastructure

### TASK-001: Create Project File Structure
**Description**: Set up the complete directory structure for authentication components, utilities, and types as defined in the design document.

**Acceptance Criteria**:
- [ ] Create `apps/frontend/src/components/auth/` directory with subdirectories for LoginScreen, ProtectedRoute, UnlockAnimation
- [ ] Create `apps/frontend/src/lib/auth/` directory for utilities
- [ ] Create `apps/frontend/src/contexts/` directory
- [ ] Create `apps/frontend/src/types/` directory
- [ ] Create `apps/frontend/src/hooks/` directory
- [ ] Create `apps/frontend/src/utils/` directory
- [ ] Create `apps/frontend/src/__tests__/` directory structure for unit and integration tests

**Dependencies**: None

**Estimated Effort**: S

**Priority**: High

**Tags**: #setup #infrastructure #frontend

---

### TASK-002: Define TypeScript Interfaces
**Description**: Create comprehensive TypeScript interfaces for all authentication-related types in `types/auth.ts`.

**Acceptance Criteria**:
- [ ] Define `Session` interface with id, createdAt, expiresAt, authenticated fields
- [ ] Define `BirthdayCodeValidation` interface
- [ ] Define `RateLimitState` and `RateLimitStatus` interfaces
- [ ] Define `AuthState` and `AuthResult` interfaces
- [ ] Define `BirthdayCodeConfig` interface
- [ ] Define storage data structures: `SessionStorageData`, `RateLimitStorageData`
- [ ] Export all interfaces from `types/index.ts`
- [ ] Add JSDoc comments to all interfaces

**Dependencies**: TASK-001

**Estimated Effort**: M

**Priority**: High

**Tags**: #typescript #types #frontend

---

### TASK-003: Configure Environment Variables
**Description**: Set up environment variable configuration for birthday code and validate at build time.

**Acceptance Criteria**:
- [ ] Create `.env.local.example` file with `NEXT_PUBLIC_BIRTHDAY_CODE` placeholder
- [ ] Add `.env.local` to `.gitignore`
- [ ] Document environment variable setup in project README
- [ ] Create validation function in `lib/auth/config.ts` to check env var format (4 digits)
- [ ] Add build-time validation that throws error if env var is missing or invalid

**Dependencies**: TASK-001

**Estimated Effort**: S

**Priority**: High

**Tags**: #configuration #security #setup

---

### TASK-004: Implement SecureStorage Utility
**Description**: Create a type-safe localStorage wrapper utility with error handling in `utils/storage.ts`.

**Acceptance Criteria**:
- [ ] Implement `SecureStorage` class with static methods
- [ ] Implement `set<T>(key: string, value: T): void` method with JSON serialization
- [ ] Implement `get<T>(key: string): T | null` method with JSON parsing
- [ ] Implement `remove(key: string): void` method
- [ ] Implement `clear(): void` method
- [ ] Add try-catch error handling for all localStorage operations
- [ ] Log errors to console with meaningful messages
- [ ] Handle quota exceeded errors gracefully

**Dependencies**: TASK-001

**Estimated Effort**: M

**Priority**: High

**Tags**: #utilities #storage #frontend

---

### TASK-005: Implement Time Utilities
**Description**: Create time formatting and calculation utilities in `utils/time.ts`.

**Acceptance Criteria**:
- [ ] Implement `formatDuration(milliseconds: number): string` function
- [ ] Implement `addDays(date: Date, days: number): Date` function
- [ ] Implement `isExpired(timestamp: number): boolean` function
- [ ] Implement `getRemainingTime(expiresAt: number): number` function
- [ ] Add functions to format time in user-friendly Spanish (e.g., "5 minutos", "1 hora")
- [ ] Export all functions from `utils/index.ts`

**Dependencies**: TASK-001

**Estimated Effort**: S

**Priority**: Medium

**Tags**: #utilities #frontend

---

### TASK-006: Configure Next.js Security Headers
**Description**: Add security headers to `next.config.js` for XSS protection and CSP.

**Acceptance Criteria**:
- [ ] Add `X-DNS-Prefetch-Control` header
- [ ] Add `X-Frame-Options: SAMEORIGIN` header
- [ ] Add `X-Content-Type-Options: nosniff` header
- [ ] Add `Referrer-Policy: origin-when-cross-origin` header
- [ ] Add Content Security Policy header with appropriate directives
- [ ] Configure headers to apply to all routes (`/:path*`)
- [ ] Test headers are applied using browser dev tools

**Dependencies**: None

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #security #configuration #nextjs

---

### TASK-007: Setup Testing Infrastructure
**Description**: Configure Jest, React Testing Library, and Playwright for unit, integration, and E2E tests.

**Acceptance Criteria**:
- [ ] Install and configure Jest for unit tests
- [ ] Install and configure React Testing Library
- [ ] Install and configure Playwright for E2E tests
- [ ] Create `jest.config.js` with appropriate settings
- [ ] Create `playwright.config.ts` with browser configurations
- [ ] Add test scripts to `package.json`: `test`, `test:watch`, `test:coverage`, `test:e2e`
- [ ] Create test setup files with localStorage mocks
- [ ] Verify test infrastructure works with a sample test

**Dependencies**: TASK-001

**Estimated Effort**: M

**Priority**: High

**Tags**: #testing #setup #infrastructure

---

### TASK-008: Create Mock Data for Testing
**Description**: Create mock data generators and fixtures for authentication testing.

**Acceptance Criteria**:
- [ ] Create `__mocks__/auth.ts` with mock session generator
- [ ] Create mock RateLimitState generator
- [ ] Create mock localStorage implementation for tests
- [ ] Create helper functions to set up authenticated state in tests
- [ ] Create helper functions to set up rate-limited state in tests
- [ ] Export all mocks from central location

**Dependencies**: TASK-002, TASK-007

**Estimated Effort**: S

**Priority**: Medium

**Tags**: #testing #mocks #frontend

---

### TASK-009: Configure Code Quality Tools
**Description**: Set up ESLint and Prettier with rules for TypeScript and React.

**Acceptance Criteria**:
- [ ] Configure ESLint with TypeScript parser
- [ ] Add React and React Hooks ESLint plugins
- [ ] Configure Prettier for consistent code formatting
- [ ] Add lint scripts to `package.json`
- [ ] Configure VSCode settings for auto-format on save
- [ ] Add pre-commit hook for linting (optional)

**Dependencies**: None

**Estimated Effort**: S

**Priority**: Low

**Tags**: #tooling #quality #setup

---

### TASK-010: Create Authentication Constants
**Description**: Define all authentication-related constants in a centralized location.

**Acceptance Criteria**:
- [ ] Create `lib/auth/constants.ts` file
- [ ] Define session expiration duration constant (7 days in milliseconds)
- [ ] Define rate limiter constants (max attempts: 10, window: 1 hour, block duration: 1 hour)
- [ ] Define storage keys constants (`birthday_auth_session`, `auth_rate_limit`)
- [ ] Define error messages constants in Spanish
- [ ] Define animation duration constants
- [ ] Export all constants

**Dependencies**: TASK-001

**Estimated Effort**: S

**Priority**: Medium

**Tags**: #configuration #constants #frontend

---

## Phase 2: Core Utilities

### TASK-011: Implement BirthdayCodeValidator
**Description**: Create the birthday code validation utility with constant-time comparison in `lib/auth/BirthdayCodeValidator.ts`.

**Acceptance Criteria**:
- [ ] Create `BirthdayCodeValidator` class
- [ ] Implement constructor that reads `NEXT_PUBLIC_BIRTHDAY_CODE` from env
- [ ] Implement `validate(code: string): BirthdayCodeValidation` method
- [ ] Implement constant-time string comparison to prevent timing attacks
- [ ] Validate code format (exactly 4 digits)
- [ ] Handle missing or invalid configuration gracefully
- [ ] Return descriptive error messages
- [ ] Export class from `lib/auth/index.ts`

**Dependencies**: TASK-002, TASK-003, TASK-010

**Estimated Effort**: M

**Priority**: High

**Tags**: #authentication #security #utilities

---

### TASK-012: Write Unit Tests for BirthdayCodeValidator
**Description**: Create comprehensive unit tests for birthday code validation logic.

**Acceptance Criteria**:
- [ ] Test validation with correct code returns success
- [ ] Test validation with incorrect code returns failure
- [ ] Test handling of missing environment variable
- [ ] Test constant-time comparison (timing attack resistance)
- [ ] Test format validation (non-numeric, wrong length)
- [ ] Test edge cases (empty string, null, undefined)
- [ ] Achieve 100% code coverage for validator
- [ ] All tests pass

**Dependencies**: TASK-011

**Estimated Effort**: M

**Priority**: High

**Tags**: #testing #unit-tests #authentication

---

### TASK-013: Implement SessionManager
**Description**: Create session lifecycle management utility in `lib/auth/SessionManager.ts`.

**Acceptance Criteria**:
- [ ] Create `SessionManager` class with configuration
- [ ] Implement `createSession(): Session` method with UUID generation
- [ ] Implement `getSession(): Session | null` method with caching
- [ ] Implement `isValid(): boolean` method to check expiration
- [ ] Implement `clearSession(): void` method
- [ ] Implement `getRemainingTime(): number` method
- [ ] Implement `refreshSession(): void` method to extend expiration
- [ ] Use SecureStorage for persistence
- [ ] Add in-memory caching with TTL (5 seconds)
- [ ] Export class from `lib/auth/index.ts`

**Dependencies**: TASK-002, TASK-004, TASK-010

**Estimated Effort**: L

**Priority**: High

**Tags**: #authentication #session #utilities

---

### TASK-014: Write Unit Tests for SessionManager
**Description**: Create comprehensive unit tests for session management logic.

**Acceptance Criteria**:
- [ ] Test session creation generates valid UUID and timestamps
- [ ] Test session expiration is set to 7 days
- [ ] Test valid session is recognized as valid
- [ ] Test expired session is recognized as invalid
- [ ] Test session clearing removes from storage
- [ ] Test session refresh extends expiration
- [ ] Test getRemainingTime returns correct milliseconds
- [ ] Test caching mechanism works correctly
- [ ] Test handling of corrupted session data in storage
- [ ] Achieve 100% code coverage
- [ ] All tests pass

**Dependencies**: TASK-013

**Estimated Effort**: L

**Priority**: High

**Tags**: #testing #unit-tests #session

---

### TASK-015: Implement RateLimiter
**Description**: Create rate limiting utility for brute force protection in `lib/auth/RateLimiter.ts`.

**Acceptance Criteria**:
- [ ] Create `RateLimiter` class with configuration
- [ ] Implement `canAttempt(): boolean` method
- [ ] Implement `recordAttempt(): void` method with timestamp
- [ ] Implement `recordSuccess(): void` method to reset attempts
- [ ] Implement `getRemainingTime(): number` method for block duration
- [ ] Implement `getAttemptsRemaining(): number` method
- [ ] Implement `reset(): void` method
- [ ] Implement `cleanOldAttempts()` private method to remove expired attempts
- [ ] Persist state to localStorage using SecureStorage
- [ ] Block after 10 attempts within 1 hour window
- [ ] Block duration: 1 hour
- [ ] Export class from `lib/auth/index.ts`

**Dependencies**: TASK-002, TASK-004, TASK-010

**Estimated Effort**: L

**Priority**: High

**Tags**: #authentication #security #rate-limiting

---

### TASK-016: Write Unit Tests for RateLimiter
**Description**: Create comprehensive unit tests for rate limiting logic.

**Acceptance Criteria**:
- [ ] Test allows attempts under the limit (9 attempts)
- [ ] Test blocks after 10 failed attempts
- [ ] Test resets attempts on successful authentication
- [ ] Test cleans old attempts outside time window
- [ ] Test calculates remaining block time correctly
- [ ] Test calculates attempts remaining correctly
- [ ] Test persistence to localStorage
- [ ] Test restoration from localStorage
- [ ] Test handling of corrupted rate limit data
- [ ] Test edge case: exactly at limit boundary
- [ ] Achieve 100% code coverage
- [ ] All tests pass

**Dependencies**: TASK-015

**Estimated Effort**: L

**Priority**: High

**Tags**: #testing #unit-tests #rate-limiting

---

### TASK-017: Create UUID Generator Utility
**Description**: Implement UUID v4 generation for session IDs in `utils/uuid.ts`.

**Acceptance Criteria**:
- [ ] Implement `generateUUID(): string` function
- [ ] Use cryptographically secure random number generation
- [ ] Follow UUID v4 specification
- [ ] Test generated UUIDs match regex pattern
- [ ] Test uniqueness (generate 1000 UUIDs, verify no duplicates)
- [ ] Export from `utils/index.ts`

**Dependencies**: TASK-001

**Estimated Effort**: S

**Priority**: Medium

**Tags**: #utilities #security #frontend

---

### TASK-018: Create Authentication Configuration Module
**Description**: Create centralized configuration module in `lib/auth/config.ts`.

**Acceptance Criteria**:
- [ ] Create `AuthConfig` interface
- [ ] Implement `validateAuthConfig(): void` function that runs at app start
- [ ] Implement `getAuthConfig(): AuthConfig` function
- [ ] Validate birthday code format at initialization
- [ ] Throw descriptive errors for missing/invalid configuration
- [ ] Export configuration getter and validator
- [ ] Add configuration validation to app initialization

**Dependencies**: TASK-003, TASK-010

**Estimated Effort**: M

**Priority**: High

**Tags**: #configuration #security #authentication

---

### TASK-019: Integration Test for Core Utilities
**Description**: Create integration tests that verify utilities work together correctly.

**Acceptance Criteria**:
- [ ] Test complete authentication flow: validate code → create session → store in localStorage
- [ ] Test rate limiter integration with session manager
- [ ] Test session expiration triggers proper cleanup
- [ ] Test rate limiter resets on successful auth
- [ ] Test utilities handle localStorage unavailability
- [ ] All integration tests pass

**Dependencies**: TASK-011, TASK-013, TASK-015

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #testing #integration-tests #authentication

---

### TASK-020: Optimize Utility Performance
**Description**: Add performance optimizations to utilities (caching, debouncing).

**Acceptance Criteria**:
- [ ] Implement in-memory caching for SessionManager with 5s TTL
- [ ] Implement debouncing for localStorage writes in RateLimiter
- [ ] Add performance benchmarks for critical operations
- [ ] Verify session validation completes in < 100ms
- [ ] Verify code validation completes in < 200ms
- [ ] Document performance characteristics in code comments

**Dependencies**: TASK-013, TASK-015

**Estimated Effort**: M

**Priority**: Low

**Tags**: #performance #optimization #utilities

---

## Phase 3: Authentication Context

### TASK-021: Create AuthContext Structure
**Description**: Set up the authentication context provider structure in `contexts/AuthContext.tsx`.

**Acceptance Criteria**:
- [ ] Create `AuthContext` with React.createContext
- [ ] Define `AuthContextValue` interface
- [ ] Create `AuthProvider` component
- [ ] Create internal `AuthState` state management
- [ ] Initialize state with default values (not authenticated, loading)
- [ ] Export `AuthContext` and `AuthProvider`
- [ ] Add proper TypeScript types for context

**Dependencies**: TASK-002

**Estimated Effort**: M

**Priority**: High

**Tags**: #authentication #context #react #frontend

---

### TASK-022: Implement useAuth Hook
**Description**: Create convenience hook for accessing auth context in `hooks/useAuth.ts`.

**Acceptance Criteria**:
- [ ] Create `useAuth()` hook that uses `useContext(AuthContext)`
- [ ] Throw error if used outside AuthProvider
- [ ] Return typed `AuthContextValue`
- [ ] Add JSDoc documentation
- [ ] Export from `hooks/index.ts`

**Dependencies**: TASK-021

**Estimated Effort**: S

**Priority**: High

**Tags**: #hooks #authentication #react #frontend

---

### TASK-023: Implement Session Initialization Logic
**Description**: Add session restoration logic that runs on app load in AuthProvider.

**Acceptance Criteria**:
- [ ] Create `initializeAuth()` function in AuthProvider
- [ ] Check localStorage for existing session on mount
- [ ] Validate session expiration using SessionManager
- [ ] Set `isAuthenticated` and `session` state if valid
- [ ] Set `isLoading` to false after initialization
- [ ] Handle errors gracefully (invalid session data, etc.)
- [ ] Run initialization in useEffect on component mount
- [ ] Set `initialized` flag after first check

**Dependencies**: TASK-021, TASK-013

**Estimated Effort**: M

**Priority**: High

**Tags**: #authentication #session #react #frontend

---

### TASK-024: Implement Login Method
**Description**: Create the login method that orchestrates authentication flow in AuthProvider.

**Acceptance Criteria**:
- [ ] Implement `login(code: string): Promise<AuthResult>` method
- [ ] Check rate limiter before attempting validation
- [ ] Return rate limit error with remaining time if blocked
- [ ] Validate birthday code using BirthdayCodeValidator
- [ ] Record failed attempt on invalid code
- [ ] Create session on successful validation
- [ ] Reset rate limiter on success
- [ ] Update AuthState with new session
- [ ] Return AuthResult with success/error information
- [ ] Include error codes for programmatic handling

**Dependencies**: TASK-021, TASK-011, TASK-013, TASK-015

**Estimated Effort**: L

**Priority**: High

**Tags**: #authentication #login #react #frontend

---

### TASK-025: Implement Logout Method
**Description**: Create the logout method that clears session and redirects in AuthProvider.

**Acceptance Criteria**:
- [ ] Implement `logout(): void` method
- [ ] Clear session using SessionManager
- [ ] Update AuthState to not authenticated
- [ ] Clear session from state
- [ ] Use Next.js router to redirect to root path ('/')
- [ ] Optionally reset rate limiter for better UX
- [ ] Add confirmation dialog (optional enhancement)

**Dependencies**: TASK-021, TASK-013

**Estimated Effort**: S

**Priority**: High

**Tags**: #authentication #logout #react #frontend

---

### TASK-026: Implement Session Monitoring
**Description**: Add periodic session validation to detect expiration in AuthProvider.

**Acceptance Criteria**:
- [ ] Create interval that checks session validity every 60 seconds
- [ ] Use SessionManager.isValid() to check expiration
- [ ] Call logout() automatically if session expired
- [ ] Display user notification: "Tu sesión ha expirado"
- [ ] Clean up interval on component unmount
- [ ] Only run monitoring when authenticated
- [ ] Handle tab visibility changes (pause when tab inactive)

**Dependencies**: TASK-021, TASK-025

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #authentication #session #react #frontend

---

### TASK-027: Implement checkSession Method
**Description**: Create public method to manually check session validity.

**Acceptance Criteria**:
- [ ] Implement `checkSession(): boolean` method
- [ ] Return current authentication status
- [ ] Validate session expiration
- [ ] Update state if session expired
- [ ] Return boolean indicating validity
- [ ] Use for programmatic session checks

**Dependencies**: TASK-021, TASK-013

**Estimated Effort**: S

**Priority**: Medium

**Tags**: #authentication #session #react #frontend

---

### TASK-028: Add Error Boundaries for Auth
**Description**: Create error boundary to catch and handle auth-related errors.

**Acceptance Criteria**:
- [ ] Create `AuthErrorBoundary` component
- [ ] Catch errors from AuthProvider and children
- [ ] Display user-friendly error UI
- [ ] Provide "Try Again" action that reloads app
- [ ] Log errors to console in development
- [ ] Send errors to monitoring service in production (future)
- [ ] Wrap AuthProvider with error boundary in app layout

**Dependencies**: TASK-021

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #error-handling #react #frontend

---

### TASK-029: Write Integration Tests for AuthContext
**Description**: Create integration tests for AuthContext and authentication flows.

**Acceptance Criteria**:
- [ ] Test AuthProvider initializes with no session
- [ ] Test successful login flow updates state correctly
- [ ] Test failed login increments rate limiter
- [ ] Test logout clears session and redirects
- [ ] Test session restoration on app load
- [ ] Test session expiration triggers logout
- [ ] Test rate limiting blocks after 10 attempts
- [ ] Test useAuth hook throws error outside provider
- [ ] All integration tests pass

**Dependencies**: TASK-024, TASK-025, TASK-026

**Estimated Effort**: L

**Priority**: High

**Tags**: #testing #integration-tests #authentication

---

### TASK-030: Add Loading States to AuthContext
**Description**: Implement proper loading states for async operations.

**Acceptance Criteria**:
- [ ] Add `isLoading` to AuthState
- [ ] Set loading true during initialization
- [ ] Set loading true during login attempt
- [ ] Set loading false after operations complete
- [ ] Expose loading state through context value
- [ ] Components can use loading state to show spinners

**Dependencies**: TASK-021

**Estimated Effort**: S

**Priority**: Medium

**Tags**: #ux #loading-states #react #frontend

---

## Phase 4: UI Components

### TASK-031: Create LoginScreen Component Structure
**Description**: Build the base structure for LoginScreen component in `components/auth/LoginScreen/LoginScreen.tsx`.

**Acceptance Criteria**:
- [ ] Create LoginScreen functional component
- [ ] Define `LoginScreenProps` interface
- [ ] Define internal state: code, error, isLoading, isLocked, lockUntil
- [ ] Create component file structure with index.ts barrel export
- [ ] Add basic JSX structure (container, input, button)
- [ ] Export component

**Dependencies**: TASK-001, TASK-002

**Estimated Effort**: M

**Priority**: High

**Tags**: #ui #react #component #frontend

---

### TASK-032: Implement LoginScreen Input Handling
**Description**: Add input validation and handling logic to LoginScreen.

**Acceptance Criteria**:
- [ ] Implement `handleCodeChange(value: string)` method
- [ ] Validate input is numeric only
- [ ] Limit input to exactly 4 digits
- [ ] Clear error message when user types
- [ ] Update code state on valid input
- [ ] Disable input when rate limited
- [ ] Add input masking/formatting if needed

**Dependencies**: TASK-031

**Estimated Effort**: M

**Priority**: High

**Tags**: #ui #forms #validation #frontend

---

### TASK-033: Implement LoginScreen Submit Logic
**Description**: Add form submission and authentication logic to LoginScreen.

**Acceptance Criteria**:
- [ ] Implement `handleSubmit()` method
- [ ] Validate code format (4 digits) before submission
- [ ] Call `AuthContext.login(code)` method
- [ ] Handle loading state during submission
- [ ] Handle success: trigger callback or redirect
- [ ] Handle error: display error message
- [ ] Handle rate limit: show countdown timer
- [ ] Support Enter key submission
- [ ] Prevent double submission

**Dependencies**: TASK-031, TASK-024

**Estimated Effort**: L

**Priority**: High

**Tags**: #ui #authentication #forms #frontend

---

### TASK-034: Style LoginScreen Component
**Description**: Create CSS styles for LoginScreen using CSS Modules or Tailwind.

**Acceptance Criteria**:
- [ ] Create `LoginScreen.module.css` or Tailwind classes
- [ ] Style container with centered layout
- [ ] Style input field with focus states
- [ ] Style submit button with hover/active/disabled states
- [ ] Style error messages with appropriate colors
- [ ] Add animations for error appearance
- [ ] Ensure mobile-responsive layout (< 768px)
- [ ] Match design system colors and typography
- [ ] Add birthday theme (cake icon, colors)

**Dependencies**: TASK-031

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #ui #styling #css #frontend

---

### TASK-035: Add Rate Limit UI to LoginScreen
**Description**: Display rate limit status and countdown timer in LoginScreen.

**Acceptance Criteria**:
- [ ] Implement `checkRateLimitStatus()` method
- [ ] Display remaining attempts before lockout
- [ ] Display countdown timer when locked
- [ ] Format time in Spanish (e.g., "Espera 45 minutos")
- [ ] Update countdown every second
- [ ] Disable input and button when locked
- [ ] Clear timer on component unmount
- [ ] Re-enable input when lock expires

**Dependencies**: TASK-033

**Estimated Effort**: M

**Priority**: High

**Tags**: #ui #rate-limiting #react #frontend

---

### TASK-036: Add Accessibility to LoginScreen
**Description**: Ensure LoginScreen meets WCAG 2.1 Level AA standards.

**Acceptance Criteria**:
- [ ] Add `aria-label` to input field
- [ ] Add `role="alert"` to error messages
- [ ] Announce errors to screen readers with `aria-live="polite"`
- [ ] Support keyboard navigation (Tab, Enter)
- [ ] Add visible focus indicators
- [ ] Ensure color contrast ratio ≥ 4.5:1
- [ ] Add descriptive button text
- [ ] Test with screen reader (NVDA or JAWS)

**Dependencies**: TASK-034

**Estimated Effort**: M

**Priority**: High

**Tags**: #accessibility #a11y #ui #frontend

---

### TASK-037: Create ProtectedRoute Component
**Description**: Build route protection wrapper component in `components/auth/ProtectedRoute/ProtectedRoute.tsx`.

**Acceptance Criteria**:
- [ ] Create ProtectedRoute functional component
- [ ] Define `ProtectedRouteProps` interface (children, fallback, redirectTo)
- [ ] Use `useAuth()` hook to check authentication
- [ ] Redirect to login if not authenticated
- [ ] Show loading state while checking session
- [ ] Render children if authenticated
- [ ] Support custom fallback component
- [ ] Support custom redirect path
- [ ] Export component

**Dependencies**: TASK-022

**Estimated Effort**: M

**Priority**: High

**Tags**: #authentication #routing #react #component

---

### TASK-038: Write Tests for ProtectedRoute
**Description**: Create tests for ProtectedRoute authentication logic.

**Acceptance Criteria**:
- [ ] Test redirects to login when not authenticated
- [ ] Test renders children when authenticated
- [ ] Test shows loading state during check
- [ ] Test custom fallback component works
- [ ] Test custom redirect path works
- [ ] Mock Next.js router for testing
- [ ] All tests pass

**Dependencies**: TASK-037

**Estimated Effort**: M

**Priority**: High

**Tags**: #testing #component-tests #routing

---

### TASK-039: Create UnlockAnimation Component Structure
**Description**: Build the base structure for UnlockAnimation component in `components/auth/UnlockAnimation/UnlockAnimation.tsx`.

**Acceptance Criteria**:
- [ ] Create UnlockAnimation functional component
- [ ] Define `UnlockAnimationProps` interface
- [ ] Define particle state structure
- [ ] Set up canvas element or DOM container
- [ ] Create component file structure with index.ts
- [ ] Export component

**Dependencies**: TASK-001, TASK-002

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #ui #animation #react #component

---

### TASK-040: Implement Particle System for UnlockAnimation
**Description**: Create particle generation and animation logic for celebration effect.

**Acceptance Criteria**:
- [ ] Implement `initializeParticles()` method (50-100 particles)
- [ ] Generate particles with random positions, velocities, rotations
- [ ] Implement `updateParticles()` method for physics (gravity, velocity)
- [ ] Implement `render()` method to draw particles
- [ ] Use requestAnimationFrame for smooth 60fps animation
- [ ] Support both confetti and heart particle types
- [ ] Remove particles when off-screen
- [ ] Trigger `onComplete` callback when finished

**Dependencies**: TASK-039

**Estimated Effort**: L

**Priority**: Medium

**Tags**: #animation #canvas #frontend

---

### TASK-041: Optimize UnlockAnimation Performance
**Description**: Ensure animation runs smoothly at 30+ FPS on all devices.

**Acceptance Criteria**:
- [ ] Use Canvas API instead of DOM elements
- [ ] Limit particle count to 75 maximum
- [ ] Use CSS transforms for GPU acceleration
- [ ] Cleanup resources after animation completes
- [ ] Measure FPS and ensure ≥ 30fps
- [ ] Test on mobile devices
- [ ] Lazy load animation library (Framer Motion)
- [ ] Support reduced motion preference

**Dependencies**: TASK-040

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #performance #animation #optimization

---

### TASK-042: Add Reduced Motion Support to UnlockAnimation
**Description**: Respect user's motion preferences for accessibility.

**Acceptance Criteria**:
- [ ] Check `prefers-reduced-motion` CSS media query
- [ ] Show simple fade animation if reduced motion enabled
- [ ] Skip particle animation entirely if preferred
- [ ] Reduce animation duration
- [ ] Still trigger `onComplete` callback
- [ ] Test with system motion settings

**Dependencies**: TASK-041

**Estimated Effort**: S

**Priority**: High

**Tags**: #accessibility #animation #a11y

---

### TASK-043: Create Navigation Component Structure
**Description**: Build the navigation component in `components/layout/Navigation/Navigation.tsx`.

**Acceptance Criteria**:
- [ ] Create Navigation functional component
- [ ] Define `NavigationProps` interface
- [ ] Define `NavigationItem` interface
- [ ] Create navigation items array (Dashboard, Bóveda, Playlist, etc.)
- [ ] Define internal state (isOpen, activeItem)
- [ ] Create component file structure
- [ ] Export component

**Dependencies**: TASK-001, TASK-002

**Estimated Effort**: M

**Priority**: High

**Tags**: #ui #navigation #react #component

---

### TASK-044: Implement Navigation Variants
**Description**: Create responsive navigation layouts (sidebar, topbar, mobile).

**Acceptance Criteria**:
- [ ] Implement sidebar variant for desktop (width > 1024px)
- [ ] Implement topbar variant as alternative
- [ ] Implement hamburger menu for mobile (width < 768px)
- [ ] Implement bottom navigation for mobile as alternative
- [ ] Use CSS media queries or JS viewport detection
- [ ] Create separate sub-components: NavigationSidebar, NavigationMobile
- [ ] Smooth transitions between variants
- [ ] Support controlled open/close state

**Dependencies**: TASK-043

**Estimated Effort**: L

**Priority**: High

**Tags**: #ui #responsive #navigation #frontend

---

### TASK-045: Implement Navigation Logic and Logout
**Description**: Add navigation functionality and logout to Navigation component.

**Acceptance Criteria**:
- [ ] Implement `handleNavigation(path: string)` method using Next.js router
- [ ] Implement `handleLogout()` method calling AuthContext.logout()
- [ ] Implement `getActiveItem()` to highlight current route
- [ ] Implement `toggleMobileMenu()` for mobile navigation
- [ ] Add keyboard navigation support (Tab, Enter, Escape)
- [ ] Close mobile menu on navigation
- [ ] Add icons to navigation items
- [ ] Test logout redirects to login screen

**Dependencies**: TASK-044, TASK-025

**Estimated Effort**: M

**Priority**: High

**Tags**: #navigation #authentication #ui #frontend

---

### TASK-046: Style Navigation Component
**Description**: Create CSS styles for all navigation variants.

**Acceptance Criteria**:
- [ ] Style sidebar navigation (fixed, left side, icons + labels)
- [ ] Style topbar navigation (sticky header)
- [ ] Style mobile hamburger menu (slide-in animation)
- [ ] Style bottom navigation (fixed bottom, icons only)
- [ ] Highlight active route with distinct style
- [ ] Style logout button prominently
- [ ] Add hover and focus states
- [ ] Ensure mobile-responsive (< 768px, 768-1024px, > 1024px)
- [ ] Match design system

**Dependencies**: TASK-044

**Estimated Effort**: L

**Priority**: Medium

**Tags**: #ui #styling #css #responsive

---

### TASK-047: Add Accessibility to Navigation
**Description**: Ensure Navigation meets accessibility standards.

**Acceptance Criteria**:
- [ ] Add `nav` semantic HTML element
- [ ] Add `aria-label="Main navigation"` to nav
- [ ] Add `aria-current="page"` to active link
- [ ] Support keyboard navigation (Tab, Arrow keys)
- [ ] Add skip link for keyboard users
- [ ] Ensure focus visible on all interactive elements
- [ ] Test with screen reader
- [ ] Add `aria-expanded` to mobile menu button

**Dependencies**: TASK-046

**Estimated Effort**: M

**Priority**: High

**Tags**: #accessibility #a11y #navigation #frontend

---

### TASK-048: Write Component Tests for UI
**Description**: Create unit and integration tests for all UI components.

**Acceptance Criteria**:
- [ ] Test LoginScreen renders correctly
- [ ] Test LoginScreen handles input and submission
- [ ] Test LoginScreen displays errors
- [ ] Test ProtectedRoute redirects when not authenticated
- [ ] Test UnlockAnimation plays and completes
- [ ] Test Navigation renders all links
- [ ] Test Navigation highlights active route
- [ ] Test Navigation logout functionality
- [ ] Use React Testing Library
- [ ] All tests pass

**Dependencies**: TASK-031, TASK-037, TASK-039, TASK-043

**Estimated Effort**: L

**Priority**: High

**Tags**: #testing #component-tests #react

---

## Phase 5: Integration & Testing

### TASK-049: Integrate AuthProvider in App Layout
**Description**: Wrap the entire Next.js app with AuthProvider in `app/layout.tsx`.

**Acceptance Criteria**:
- [ ] Import AuthProvider in root layout
- [ ] Wrap children with AuthProvider
- [ ] Ensure provider runs on both client and server
- [ ] Add "use client" directive if needed
- [ ] Test that context is available throughout app
- [ ] Verify initialization runs on app load

**Dependencies**: TASK-021

**Estimated Effort**: S

**Priority**: High

**Tags**: #integration #nextjs #react #frontend

---

### TASK-050: Create Login Page
**Description**: Create the login page at `app/page.tsx`.

**Acceptance Criteria**:
- [ ] Import LoginScreen component
- [ ] Check authentication status
- [ ] Redirect to dashboard if already authenticated
- [ ] Show LoginScreen if not authenticated
- [ ] Add metadata (title, description)
- [ ] Test redirect behavior

**Dependencies**: TASK-031, TASK-049

**Estimated Effort**: S

**Priority**: High

**Tags**: #pages #nextjs #frontend

---

### TASK-051: Create Protected Pages
**Description**: Create all protected page routes with ProtectedRoute wrapper.

**Acceptance Criteria**:
- [ ] Create `app/dashboard/page.tsx` wrapped with ProtectedRoute
- [ ] Create `app/boveda/page.tsx` wrapped with ProtectedRoute
- [ ] Create `app/playlist/page.tsx` wrapped with ProtectedRoute
- [ ] Create `app/escape-room/page.tsx` wrapped with ProtectedRoute
- [ ] Create `app/animo/page.tsx` wrapped with ProtectedRoute
- [ ] Create `app/botiquin/page.tsx` wrapped with ProtectedRoute
- [ ] Add Navigation component to each page
- [ ] Add metadata to each page
- [ ] Test route protection works

**Dependencies**: TASK-037, TASK-043

**Estimated Effort**: M

**Priority**: High

**Tags**: #pages #routing #nextjs #frontend

---

### TASK-052: Write E2E Tests for Authentication Flow
**Description**: Create end-to-end tests using Playwright for complete user journeys.

**Acceptance Criteria**:
- [ ] Test successful login with correct code
- [ ] Test failed login with incorrect code
- [ ] Test rate limiting after 10 failed attempts
- [ ] Test session persistence across page refresh
- [ ] Test navigation between protected routes
- [ ] Test logout clears session and redirects
- [ ] Test protected route access without auth redirects
- [ ] Test unlock animation displays
- [ ] All E2E tests pass

**Dependencies**: TASK-050, TASK-051

**Estimated Effort**: L

**Priority**: High

**Tags**: #testing #e2e #playwright

---

### TASK-053: Write Accessibility E2E Tests
**Description**: Create E2E tests for accessibility compliance.

**Acceptance Criteria**:
- [ ] Test keyboard navigation on login screen
- [ ] Test screen reader announcements for errors
- [ ] Test focus management during navigation
- [ ] Test skip links work
- [ ] Test reduced motion preference respected
- [ ] Run axe-core accessibility checks on all pages
- [ ] Fix any accessibility violations found
- [ ] All accessibility tests pass

**Dependencies**: TASK-052

**Estimated Effort**: M

**Priority**: High

**Tags**: #testing #accessibility #e2e #a11y

---

### TASK-054: Performance Testing and Optimization
**Description**: Measure and optimize application performance.

**Acceptance Criteria**:
- [ ] Measure First Contentful Paint (FCP) for login and dashboard
- [ ] Ensure FCP < 2s on 3G connection
- [ ] Measure session validation time (target < 100ms)
- [ ] Measure code validation time (target < 200ms)
- [ ] Optimize bundle size (target < 200kb gzipped)
- [ ] Implement code splitting for animation library
- [ ] Run Lighthouse performance audit (score > 90)
- [ ] Fix performance issues found

**Dependencies**: TASK-051

**Estimated Effort**: L

**Priority**: Medium

**Tags**: #performance #optimization #testing

---

### TASK-055: Cross-Browser and Device Testing
**Description**: Test application across browsers and devices.

**Acceptance Criteria**:
- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on mobile Chrome (Android)
- [ ] Test on mobile Safari (iOS)
- [ ] Test responsive layouts (320px, 768px, 1024px, 1440px)
- [ ] Fix any browser-specific issues
- [ ] Document browser compatibility

**Dependencies**: TASK-051

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #testing #cross-browser #responsive

---

## Phase 6: Documentation & Polish

### TASK-056: Write Technical Documentation
**Description**: Create comprehensive technical documentation for the authentication system.

**Acceptance Criteria**:
- [ ] Document architecture overview
- [ ] Document authentication flow diagrams
- [ ] Document API reference for all utilities and components
- [ ] Document configuration (environment variables)
- [ ] Document testing strategy
- [ ] Document security considerations
- [ ] Add code examples for common use cases
- [ ] Create troubleshooting guide

**Dependencies**: All previous tasks

**Estimated Effort**: L

**Priority**: Medium

**Tags**: #documentation #technical-docs

---

### TASK-057: Write User-Facing Documentation
**Description**: Create simple user guide for accessing the application.

**Acceptance Criteria**:
- [ ] Write "How to Login" guide
- [ ] Explain session duration (7 days)
- [ ] Explain rate limiting behavior
- [ ] Document logout process
- [ ] Add FAQ section
- [ ] Include screenshots
- [ ] Write in Spanish

**Dependencies**: TASK-051

**Estimated Effort**: S

**Priority**: Low

**Tags**: #documentation #user-guide

---

### TASK-058: Create README for Auth Module
**Description**: Document the authentication module for developers.

**Acceptance Criteria**:
- [ ] Write module overview
- [ ] List features and capabilities
- [ ] Provide setup instructions
- [ ] Document environment variables
- [ ] Add usage examples
- [ ] Link to full technical documentation
- [ ] Include contribution guidelines

**Dependencies**: TASK-056

**Estimated Effort**: M

**Priority**: Medium

**Tags**: #documentation #readme

---

### TASK-059: Polish UI/UX Details
**Description**: Final UI/UX improvements and refinements.

**Acceptance Criteria**:
- [ ] Review and refine all animations and transitions
- [ ] Ensure consistent spacing and typography
- [ ] Add loading states to all async operations
- [ ] Add micro-interactions (button hover effects, etc.)
- [ ] Review error messages for clarity
- [ ] Add favicon and meta tags
- [ ] Test on actual birthday person's devices
- [ ] Incorporate feedback

**Dependencies**: TASK-051

**Estimated Effort**: M

**Priority**: Low

**Tags**: #ui #ux #polish #frontend

---

### TASK-060: Security Audit and Final Review
**Description**: Conduct final security review and code audit.

**Acceptance Criteria**:
- [ ] Review all security considerations from design doc
- [ ] Verify environment variables are not exposed
- [ ] Verify birthday code uses constant-time comparison
- [ ] Review localStorage security practices
- [ ] Verify CSP headers are applied
- [ ] Review XSS protection measures
- [ ] Run security linting tools
- [ ] Document security limitations (client-side auth)
- [ ] Create security checklist for future features

**Dependencies**: All previous tasks

**Estimated Effort**: M

**Priority**: High

**Tags**: #security #audit #review

---

## Summary

**Total Tasks**: 60
**High Priority**: 38 tasks
**Medium Priority**: 17 tasks
**Low Priority**: 5 tasks

**Effort Distribution**:
- Small (S): 16 tasks
- Medium (M): 31 tasks
- Large (L): 13 tasks

**Estimated Total Effort**: 20-25 developer days

**Critical Path**: TASK-001 → TASK-002 → TASK-011/013/015 → TASK-021 → TASK-024 → TASK-031 → TASK-037 → TASK-043 → TASK-049 → TASK-050 → TASK-051

**Dependencies**: 
- Phase 1 and 2 must be completed before Phase 3
- Phase 3 must be completed before Phase 4
- Phase 5 can run in parallel with late Phase 4 tasks
- Phase 6 is final and depends on all previous phases

**Testing Strategy**:
- Write unit tests alongside implementation (Tasks 12, 14, 16, etc.)
- Write integration tests after core utilities complete (Task 19, 29)
- Write component tests after UI components complete (Task 48)
- Write E2E tests after pages are integrated (Tasks 52-55)

**Next Steps**:
1. Set up development environment
2. Begin with Phase 1: Setup & Infrastructure
3. Follow task dependencies strictly
4. Run tests continuously during development
5. Review and adjust priorities based on project timeline
