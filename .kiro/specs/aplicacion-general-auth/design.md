# Design Document - SPEC-000: Authentication System

## Architecture Overview

### System Architecture

The authentication system follows a client-side architecture using Next.js 14+ with TypeScript. The system is stateless from a server perspective, with all authentication state managed in the browser using localStorage.

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐        ┌──────────────┐                 │
│  │ LoginScreen  │───────▶│ AuthContext  │                 │
│  │  Component   │        │   Provider   │                 │
│  └──────────────┘        └──────┬───────┘                 │
│         │                       │                          │
│         │                       │                          │
│         ▼                       ▼                          │
│  ┌──────────────┐        ┌──────────────┐                 │
│  │   Unlock     │        │ Protected    │                 │
│  │  Animation   │        │   Routes     │                 │
│  └──────────────┘        └──────┬───────┘                 │
│                                  │                          │
│                                  ▼                          │
│                          ┌──────────────┐                  │
│                          │  Dashboard   │                  │
│                          │  Navigation  │                  │
│                          └──────────────┘                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                     Core Utilities Layer                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Session    │  │     Rate     │  │   Birthday   │    │
│  │   Manager    │  │   Limiter    │  │     Code     │    │
│  │              │  │              │  │   Validator  │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                  │                  │            │
│         └──────────────────┼──────────────────┘            │
│                            │                               │
│                            ▼                               │
│                    ┌──────────────┐                        │
│                    │  localStorage│                        │
│                    └──────────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Initial Load**:
   - App loads → AuthContext checks localStorage for valid session
   - If valid session exists → Redirect to Dashboard
   - If no valid session → Show LoginScreen

2. **Authentication Flow**:
   - User enters birthday code → LoginScreen validates format
   - RateLimiter checks attempt count
   - BirthdayCodeValidator compares with environment variable
   - On success → SessionManager creates session → UnlockAnimation plays → Redirect to Dashboard
   - On failure → Error message displayed → RateLimiter increments counter

3. **Protected Route Access**:
   - User navigates to protected route
   - ProtectedRoute wrapper checks AuthContext
   - If authenticated → Render route
   - If not authenticated → Redirect to LoginScreen

4. **Session Management**:
   - SessionManager periodically validates session expiration
   - On expiration → Clear session → Redirect to LoginScreen
   - On successful auth → Reset rate limiter

---

## Component Design

### 1. LoginScreen Component

**Purpose**: Primary authentication interface where users enter their birthday code.

**Location**: `apps/frontend/src/components/auth/LoginScreen/LoginScreen.tsx`

**Props/Interface**:
```typescript
interface LoginScreenProps {
  onSuccess?: () => void;
}
```

**State**:
```typescript
interface LoginScreenState {
  code: string;
  error: string | null;
  isLoading: boolean;
  isLocked: boolean;
  lockUntil: Date | null;
}
```

**Key Methods**:
- `handleCodeChange(value: string)`: Validates input (numeric, max 4 digits)
- `handleSubmit()`: Processes authentication attempt
- `validateFormat()`: Ensures code is exactly 4 digits
- `displayError(message: string)`: Shows user-friendly error messages
- `checkRateLimitStatus()`: Determines if user is currently locked out

**Responsibilities**:
- Render input field with proper accessibility attributes
- Validate input format in real-time
- Display error messages with appropriate styling
- Handle keyboard navigation (Tab, Enter)
- Show remaining lock time when rate limited
- Trigger UnlockAnimation on successful auth

---

### 2. AuthContext Provider

**Purpose**: Global authentication state management and session coordination.

**Location**: `apps/frontend/src/contexts/AuthContext.tsx`

**Context Interface**:
```typescript
interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  login: (code: string) => Promise<AuthResult>;
  logout: () => void;
  checkSession: () => boolean;
}

interface AuthResult {
  success: boolean;
  error?: string;
}
```

**State**:
```typescript
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  initialized: boolean;
}
```

**Key Methods**:
- `login(code: string)`: Orchestrates authentication flow
- `logout()`: Clears session and redirects to login
- `checkSession()`: Validates current session
- `initializeAuth()`: Runs on mount to restore session
- `handleSessionExpiration()`: Cleanup when session expires

**Responsibilities**:
- Maintain global authentication state
- Coordinate SessionManager, RateLimiter, and BirthdayCodeValidator
- Provide authentication methods to child components
- Handle session restoration on app load
- Manage session expiration monitoring

---

### 3. ProtectedRoute Wrapper

**Purpose**: HOC/wrapper component to guard routes requiring authentication.

**Location**: `apps/frontend/src/components/auth/ProtectedRoute/ProtectedRoute.tsx`

**Props/Interface**:
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}
```

**Key Methods**:
- `checkAuth()`: Verifies authentication status from context
- `handleRedirect()`: Redirects to login if unauthorized

**Responsibilities**:
- Check authentication status before rendering children
- Redirect to LoginScreen if not authenticated
- Show loading state while checking session
- Support custom fallback components
- Allow configuration of redirect destination

**Usage Example**:
```typescript
// In app layout or route file
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

---

### 4. RateLimiter Utility

**Purpose**: Prevent brute force attacks by limiting authentication attempts.

**Location**: `apps/frontend/src/lib/auth/RateLimiter.ts`

**Interface**:
```typescript
interface RateLimiterConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs: number;
}

interface RateLimitState {
  attempts: Array<{ timestamp: number }>;
  blockedUntil: number | null;
}

class RateLimiter {
  constructor(config: RateLimiterConfig);
  
  canAttempt(): boolean;
  recordAttempt(): void;
  recordSuccess(): void;
  getRemainingTime(): number;
  getAttemptsRemaining(): number;
  reset(): void;
}
```

**Storage Key**: `auth_rate_limit`

**Configuration**:
- `maxAttempts`: 10 failed attempts
- `windowMs`: 3600000 (1 hour)
- `blockDurationMs`: 3600000 (1 hour)

**Key Methods**:
- `canAttempt()`: Returns true if user can attempt login
- `recordAttempt()`: Logs failed attempt with timestamp
- `recordSuccess()`: Clears all attempts on successful auth
- `getRemainingTime()`: Returns milliseconds until unblock
- `getAttemptsRemaining()`: Returns number of attempts left
- `cleanOldAttempts()`: Removes attempts outside time window
- `isBlocked()`: Checks if user is currently blocked
- `reset()`: Clears all rate limit data

**Responsibilities**:
- Track failed authentication attempts with timestamps
- Enforce 10 attempts per hour limit
- Calculate blocking duration
- Persist state to localStorage
- Clean up expired attempt records
- Reset on successful authentication

---

### 5. SessionManager Utility

**Purpose**: Manage session lifecycle including creation, validation, and expiration.

**Location**: `apps/frontend/src/lib/auth/SessionManager.ts`

**Interface**:
```typescript
interface Session {
  id: string;
  createdAt: number;
  expiresAt: number;
  authenticated: boolean;
}

interface SessionConfig {
  expirationDays: number;
  storageKey: string;
}

class SessionManager {
  constructor(config: SessionConfig);
  
  createSession(): Session;
  getSession(): Session | null;
  isValid(): boolean;
  clearSession(): void;
  getRemainingTime(): number;
  refreshSession(): void;
}
```

**Storage Key**: `birthday_auth_session`

**Configuration**:
- `expirationDays`: 7 days
- `storageKey`: 'birthday_auth_session'

**Key Methods**:
- `createSession()`: Generates new session with UUID and timestamps
- `getSession()`: Retrieves and parses session from localStorage
- `isValid()`: Checks if session exists and hasn't expired
- `clearSession()`: Removes session from localStorage
- `getRemainingTime()`: Returns milliseconds until expiration
- `refreshSession()`: Extends session by updating expiresAt
- `generateSessionId()`: Creates unique session identifier

**Responsibilities**:
- Create sessions with unique IDs
- Store session data securely in localStorage
- Validate session expiration (7 days)
- Provide session information to AuthContext
- Handle session cleanup
- Calculate time remaining in session

---

### 6. UnlockAnimation Component

**Purpose**: Display celebratory animation on successful authentication.

**Location**: `apps/frontend/src/components/auth/UnlockAnimation/UnlockAnimation.tsx`

**Props/Interface**:
```typescript
interface UnlockAnimationProps {
  isPlaying: boolean;
  onComplete: () => void;
  duration?: number;
  particleType?: 'confetti' | 'hearts';
  reducedMotion?: boolean;
}
```

**State**:
```typescript
interface AnimationState {
  particles: Array<{
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    color?: string;
  }>;
  progress: number;
}
```

**Key Methods**:
- `initializeParticles()`: Creates particle array with random properties
- `updateParticles()`: Updates particle positions each frame
- `render()`: Draws particles to canvas or DOM
- `handleComplete()`: Triggers callback when animation finishes
- `checkReducedMotion()`: Respects user's motion preferences

**Responsibilities**:
- Display confetti or heart particles
- Maintain 30+ FPS performance
- Duration: 1.5-3 seconds (configurable)
- Allow click-through during animation
- Support reduced motion preferences
- Cleanup resources after completion
- Trigger navigation callback on finish

**Implementation Approach**:
- Use Framer Motion for smooth animations
- Canvas API for particle rendering (better performance)
- RequestAnimationFrame for 60fps target
- Respect `prefers-reduced-motion` CSS media query

---

### 7. Navigation Component

**Purpose**: Provide consistent navigation across protected routes with logout functionality.

**Location**: `apps/frontend/src/components/layout/Navigation/Navigation.tsx`

**Props/Interface**:
```typescript
interface NavigationProps {
  currentPath: string;
  isMobile?: boolean;
  variant?: 'sidebar' | 'topbar' | 'bottom' | 'hamburger';
}

interface NavigationItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}
```

**State**:
```typescript
interface NavigationState {
  isOpen: boolean; // For mobile menu
  activeItem: string;
}
```

**Navigation Items**:
```typescript
const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <HomeIcon /> },
  { label: 'Bóveda', path: '/boveda', icon: <VaultIcon /> },
  { label: 'Playlist', path: '/playlist', icon: <MusicIcon /> },
  { label: 'Escape Room', path: '/escape-room', icon: <PuzzleIcon /> },
  { label: 'Ánimo', path: '/animo', icon: <HeartIcon /> },
  { label: 'Botiquín', path: '/botiquin', icon: <MedkitIcon /> },
];
```

**Key Methods**:
- `handleNavigation(path: string)`: Navigate to route
- `handleLogout()`: Call AuthContext.logout()
- `toggleMobileMenu()`: Open/close mobile navigation
- `getActiveItem()`: Determine current active item
- `renderVariant()`: Render appropriate layout based on viewport

**Responsibilities**:
- Render navigation links to all protected routes
- Highlight active/current route
- Provide logout functionality
- Adapt layout for mobile (hamburger/bottom nav) and desktop (sidebar/top nav)
- Support keyboard navigation
- Display user-friendly labels with icons
- Persist menu state during navigation

---

## Data Models

### TypeScript Interfaces

```typescript
// apps/frontend/src/types/auth.ts

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
```

---

## Authentication Flow

### Step-by-Step Authentication Process

#### 1. Initial Page Load

```
User opens app
     ↓
App.tsx renders
     ↓
AuthProvider initializes
     ↓
SessionManager.getSession()
     ↓
Session exists? ──NO──→ Show LoginScreen
     │
    YES
     ↓
SessionManager.isValid()
     ↓
Still valid? ──NO──→ SessionManager.clearSession() → Show LoginScreen
     │
    YES
     ↓
Set isAuthenticated = true
     ↓
Redirect to /dashboard (or requested protected route)
```

#### 2. Login Attempt Flow

```
User enters 4-digit code
     ↓
LoginScreen.handleSubmit()
     ↓
Validate format (exactly 4 digits)
     │
Invalid format? ──YES──→ Show "Debe ser un código de 4 dígitos"
     │                         │
    NO                         └──→ Return to input
     ↓
RateLimiter.canAttempt()
     ↓
Blocked? ──YES──→ Show "Demasiados intentos. Espera [X] minutos"
     │                    │
    NO                    └──→ Display countdown timer
     ↓
BirthdayCodeValidator.validate(code)
     ↓
Matches env var? ──NO──→ RateLimiter.recordAttempt()
     │                         ↓
     │                    Show "Código incorrecto, intenta de nuevo 🎂"
     │                         ↓
     │                    Return to input
     │
    YES
     ↓
RateLimiter.recordSuccess() (clears attempts)
     ↓
SessionManager.createSession()
     ↓
Store session in localStorage
     ↓
Set AuthContext.isAuthenticated = true
     ↓
Trigger UnlockAnimation
     ↓
UnlockAnimation plays (1.5-3s)
     ↓
Navigate to /dashboard
```

#### 3. Protected Route Access Flow

```
User navigates to /boveda (example)
     ↓
ProtectedRoute wrapper evaluates
     ↓
AuthContext.isAuthenticated? ──NO──→ router.push('/') → Show LoginScreen
     │
    YES
     ↓
SessionManager.isValid()
     ↓
Still valid? ──NO──→ SessionManager.clearSession()
     │                    ↓
     │               Set isAuthenticated = false
     │                    ↓
     │               Redirect to LoginScreen
     │
    YES
     ↓
Render protected route content
```

#### 4. Session Expiration Flow

```
User is authenticated and active
     ↓
AuthContext monitoring loop (every 60s)
     ↓
SessionManager.isValid()
     ↓
Expired? ──NO──→ Continue monitoring
     │
    YES
     ↓
SessionManager.clearSession()
     ↓
Set AuthContext.isAuthenticated = false
     ↓
Display notification: "Tu sesión ha expirado"
     ↓
Redirect to LoginScreen
```

#### 5. Logout Flow

```
User clicks "Cerrar Sesión" in Navigation
     ↓
Navigation.handleLogout()
     ↓
AuthContext.logout()
     ↓
SessionManager.clearSession()
     ↓
RateLimiter.reset() (optional, for UX)
     ↓
Set isAuthenticated = false
     ↓
Redirect to LoginScreen
```

#### 6. Rate Limiting Logic

```
Failed attempt recorded
     ↓
RateLimiter.recordAttempt()
     ↓
Add timestamp to attempts array
     ↓
Clean old attempts (> 1 hour old)
     ↓
Count recent attempts (within 1 hour)
     ↓
Count >= 10? ──NO──→ Allow next attempt
     │
    YES
     ↓
Set blockedUntil = now + 1 hour
     ↓
Store updated state to localStorage
     ↓
Block further attempts until blockedUntil
     ↓
Display remaining time to user
     ↓
Check every second and update UI
     ↓
When time expires, allow attempts again
```

---

## State Management

### Approach: React Context API

**Rationale**:
- Lightweight solution for moderate complexity
- No external dependencies (Zustand/Redux not needed)
- Sufficient for authentication-only global state
- Easy to understand and maintain
- Integrates naturally with Next.js

### Global State Structure

```typescript
// AuthContext state tree
{
  // Authentication state
  isAuthenticated: boolean,
  isLoading: boolean,
  session: Session | null,
  initialized: boolean,
  
  // Methods (not stored, provided via context)
  login: (code: string) => Promise<AuthResult>,
  logout: () => void,
  checkSession: () => boolean,
}
```

### State Update Patterns

#### 1. Initial Load Pattern
```typescript
// In AuthProvider
useEffect(() => {
  const initializeAuth = () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    const session = sessionManager.getSession();
    const isValid = session ? sessionManager.isValid() : false;
    
    setAuthState({
      isAuthenticated: isValid,
      isLoading: false,
      session: isValid ? session : null,
      initialized: true,
    });
  };
  
  initializeAuth();
}, []);
```

#### 2. Login Pattern
```typescript
const login = async (code: string): Promise<AuthResult> => {
  // Check rate limit
  if (!rateLimiter.canAttempt()) {
    return {
      success: false,
      error: `Demasiados intentos. Espera ${formatTime(rateLimiter.getRemainingTime())}`,
      errorCode: 'RATE_LIMITED',
    };
  }
  
  // Validate code
  const validation = birthdayCodeValidator.validate(code);
  
  if (!validation.isValid) {
    rateLimiter.recordAttempt();
    return {
      success: false,
      error: 'Código incorrecto, intenta de nuevo 🎂',
      errorCode: 'INVALID_CODE',
    };
  }
  
  // Success: create session
  rateLimiter.recordSuccess();
  const session = sessionManager.createSession();
  
  setAuthState({
    isAuthenticated: true,
    isLoading: false,
    session,
    initialized: true,
  });
  
  return { success: true };
};
```

#### 3. Logout Pattern
```typescript
const logout = () => {
  sessionManager.clearSession();
  
  setAuthState({
    isAuthenticated: false,
    isLoading: false,
    session: null,
    initialized: true,
  });
  
  router.push('/');
};
```

#### 4. Session Monitoring Pattern
```typescript
// In AuthProvider
useEffect(() => {
  if (!authState.isAuthenticated) return;
  
  const interval = setInterval(() => {
    if (!sessionManager.isValid()) {
      logout();
    }
  }, 60000); // Check every minute
  
  return () => clearInterval(interval);
}, [authState.isAuthenticated]);
```

### localStorage State (Persisted)

```typescript
// Key: 'birthday_auth_session'
{
  version: 1,
  session: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: 1730000000000,
    expiresAt: 1730604800000, // +7 days
    authenticated: true
  }
}

// Key: 'auth_rate_limit'
{
  version: 1,
  state: {
    attempts: [
      { timestamp: 1730000000000 },
      { timestamp: 1730000030000 }
    ],
    blockedUntil: null // or timestamp
  }
}
```

---

## File Structure

```
apps/frontend/src/
│
├── app/
│   ├── layout.tsx                    # Root layout with AuthProvider
│   ├── page.tsx                      # Login page (/)
│   ├── dashboard/
│   │   └── page.tsx                  # Protected: Dashboard
│   ├── boveda/
│   │   └── page.tsx                  # Protected: Bóveda
│   ├── playlist/
│   │   └── page.tsx                  # Protected: Playlist
│   ├── escape-room/
│   │   └── page.tsx                  # Protected: Escape Room
│   ├── animo/
│   │   └── page.tsx                  # Protected: Ánimo
│   └── botiquin/
│       └── page.tsx                  # Protected: Botiquín
│
├── components/
│   ├── auth/
│   │   ├── LoginScreen/
│   │   │   ├── LoginScreen.tsx       # Main login component
│   │   │   ├── LoginScreen.module.css
│   │   │   └── index.ts
│   │   │
│   │   ├── ProtectedRoute/
│   │   │   ├── ProtectedRoute.tsx    # Route protection wrapper
│   │   │   └── index.ts
│   │   │
│   │   └── UnlockAnimation/
│   │       ├── UnlockAnimation.tsx   # Celebration animation
│   │       ├── UnlockAnimation.module.css
│   │       └── index.ts
│   │
│   └── layout/
│       └── Navigation/
│           ├── Navigation.tsx        # Main navigation component
│           ├── Navigation.module.css
│           ├── NavigationSidebar.tsx  # Desktop variant
│           ├── NavigationMobile.tsx   # Mobile variant
│           └── index.ts
│
├── contexts/
│   ├── AuthContext.tsx               # Authentication context provider
│   └── index.ts
│
├── lib/
│   └── auth/
│       ├── SessionManager.ts         # Session lifecycle management
│       ├── RateLimiter.ts            # Rate limiting logic
│       ├── BirthdayCodeValidator.ts  # Code validation
│       ├── config.ts                 # Auth configuration
│       └── index.ts
│
├── types/
│   ├── auth.ts                       # Authentication type definitions
│   └── index.ts
│
├── hooks/
│   ├── useAuth.ts                    # Hook to access AuthContext
│   ├── useProtectedRoute.ts          # Hook for route protection
│   └── index.ts
│
└── utils/
    ├── storage.ts                    # localStorage wrapper utilities
    ├── time.ts                       # Time formatting utilities
    └── index.ts
```

### Key File Descriptions

**`app/layout.tsx`**: Wraps entire app with AuthProvider

**`app/page.tsx`**: Root route, shows LoginScreen or redirects to dashboard

**`components/auth/LoginScreen/LoginScreen.tsx`**: Main authentication UI

**`components/auth/ProtectedRoute/ProtectedRoute.tsx`**: HOC for protecting routes

**`components/auth/UnlockAnimation/UnlockAnimation.tsx`**: Success animation

**`components/layout/Navigation/Navigation.tsx`**: Adaptive navigation component

**`contexts/AuthContext.tsx`**: Global auth state and methods

**`lib/auth/SessionManager.ts`**: Session CRUD operations

**`lib/auth/RateLimiter.ts`**: Brute force protection logic

**`lib/auth/BirthdayCodeValidator.ts`**: Code validation against env var

**`types/auth.ts`**: All authentication-related TypeScript interfaces

**`hooks/useAuth.ts`**: Convenience hook to access auth context

---

## Security Considerations

### 1. Birthday Code Handling

**Threat**: Hardcoded birthday codes in client-side code

**Mitigation**:
- Store valid birthday code in `.env.local` file (not committed to git)
- Access via `process.env.NEXT_PUBLIC_BIRTHDAY_CODE`
- Validate code exists at build time
- Never expose in client bundle as raw string
- Use environment variable in comparison logic

**Implementation**:
```typescript
// lib/auth/BirthdayCodeValidator.ts
export class BirthdayCodeValidator {
  private readonly validCode: string;
  
  constructor() {
    this.validCode = process.env.NEXT_PUBLIC_BIRTHDAY_CODE || '';
    
    if (!this.validCode) {
      console.error('[Auth] Birthday code not configured');
    }
  }
  
  validate(code: string): BirthdayCodeValidation {
    if (this.validCode.length !== 4) {
      return { isValid: false, error: 'Configuration error' };
    }
    
    // Constant-time comparison to prevent timing attacks
    return {
      isValid: this.constantTimeCompare(code, this.validCode),
    };
  }
  
  private constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  }
}
```

### 2. Session Storage Security

**Threats**:
- XSS attacks accessing localStorage
- Session hijacking
- CSRF attacks

**Mitigations**:

**A. XSS Protection**:
- Next.js automatic escaping of user inputs
- No `dangerouslySetInnerHTML` usage
- Content Security Policy headers
- Sanitize any user-generated content (future features)

**B. Session Data Integrity**:
- Store minimal data in session (no sensitive info beyond auth flag)
- Use UUID v4 for session IDs (unpredictable)
- Include creation and expiration timestamps
- Validate session structure on retrieval

**C. CSRF Protection**:
- Not applicable (no server-side sessions or cookies)
- All auth state is client-side only
- No state-changing endpoints without future backend

**D. localStorage Best Practices**:
```typescript
// utils/storage.ts
export class SecureStorage {
  static set(key: string, value: unknown): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('[Storage] Failed to save:', error);
    }
  }
  
  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('[Storage] Failed to retrieve:', error);
      return null;
    }
  }
  
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('[Storage] Failed to remove:', error);
    }
  }
  
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('[Storage] Failed to clear:', error);
    }
  }
}
```

### 3. Rate Limiting Implementation

**Threat**: Brute force attacks to guess birthday code

**Mitigation Strategy**:
- Client-side rate limiting (first line of defense)
- 10 attempts per hour maximum
- 1-hour lockout after exceeding limit
- Persistent across page refreshes
- Clear attempts on successful authentication

**Limitations**:
- Client-side only (can be bypassed by clearing localStorage)
- No IP-based tracking (would require backend)
- Acceptable for low-security personal project
- Consider backend rate limiting for production

**Enhancement for Future**:
```typescript
// For future backend implementation
POST /api/auth/verify-code
Headers: X-Real-IP, X-Forwarded-For
Body: { code: string }

// Backend tracks attempts by IP
// Returns 429 Too Many Requests if rate limited
```

### 4. XSS/CSRF Protections

**XSS Prevention**:
- React/Next.js automatic escaping
- No unsafe innerHTML usage
- Validate and sanitize all inputs
- CSP headers in next.config.js

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

**CSRF Prevention**:
- Not applicable (no cookies or server sessions)
- All state is client-side localStorage
- Future backend endpoints should use CSRF tokens

### 5. Environment Variable Security

**.env.local** (never commit):
```bash
# Birthday code for authentication
NEXT_PUBLIC_BIRTHDAY_CODE=0712
```

**.gitignore**:
```
.env*.local
.env.local
```

**Validation**:
```typescript
// lib/auth/config.ts
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
      '[Auth Config] NEXT_PUBLIC_BIRTHDAY_CODE must be exactly 4 digits.'
    );
  }
}
```

---

## Performance Considerations

### 1. Optimization Strategies

#### A. Code Splitting
- Lazy load UnlockAnimation component (only on successful login)
- Dynamic imports for route components
- Separate bundle for animation library (Framer Motion)

```typescript
// Lazy load animation
const UnlockAnimation = dynamic(
  () => import('@/components/auth/UnlockAnimation'),
  { ssr: false }
);
```

#### B. localStorage Access
- Batch reads on initialization (avoid multiple `getItem` calls)
- Debounce writes to prevent excessive I/O
- Cache session state in memory after initial read

```typescript
// Optimized session check
class SessionManager {
  private cachedSession: Session | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5000; // 5 seconds
  
  getSession(): Session | null {
    const now = Date.now();
    
    // Return cached version if recent
    if (this.cachedSession && (now - this.cacheTimestamp) < this.CACHE_TTL) {
      return this.cachedSession;
    }
    
    // Fetch from localStorage
    const data = SecureStorage.get<SessionStorageData>(this.storageKey);
    this.cachedSession = data?.session || null;
    this.cacheTimestamp = now;
    
    return this.cachedSession;
  }
}
```

#### C. Component Memoization
- Memo Navigation component (re-renders only on route change)
- Memo ProtectedRoute wrapper
- UseMemo for expensive calculations (rate limit countdown)

```typescript
// Memoized Navigation
export const Navigation = React.memo(({ currentPath }: NavigationProps) => {
  // Component implementation
});

// Memoized countdown calculation
const remainingTime = useMemo(() => {
  return rateLimiter.getRemainingTime();
}, [rateLimiter, triggerUpdate]);
```

### 2. Loading States

#### A. Initial Auth Check
```typescript
// Show spinner during auth initialization
{authState.isLoading && (
  <div className="loading-screen">
    <Spinner />
    <p>Verificando sesión...</p>
  </div>
)}
```

#### B. Login Submission
```typescript
// Disable button and show loading during login
<button
  disabled={isLoading}
  onClick={handleSubmit}
>
  {isLoading ? 'Verificando...' : 'Ingresar'}
</button>
```

#### C. Route Transitions
```typescript
// Show skeleton while loading protected route
<ProtectedRoute fallback={<DashboardSkeleton />}>
  <DashboardPage />
</ProtectedRoute>
```

### 3. Animation Performance

#### A. UnlockAnimation Optimization
- Use CSS transforms (GPU-accelerated)
- RequestAnimationFrame for smooth updates
- Canvas API for particle rendering (better than DOM)
- Limit particle count (50-100 max)
- Cleanup resources after animation

```typescript
// Optimized particle animation
class ParticleSystem {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationFrame: number = 0;
  
  start(): void {
    this.particles = this.generateParticles(75); // Balanced count
    this.animate();
  }
  
  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles = this.particles.filter(particle => {
      particle.update();
      particle.draw(this.ctx);
      return particle.isAlive();
    });
    
    if (this.particles.length > 0) {
      this.animationFrame = requestAnimationFrame(this.animate);
    } else {
      this.onComplete();
    }
  };
  
  stop(): void {
    cancelAnimationFrame(this.animationFrame);
    this.particles = [];
  }
}
```

#### B. Respect User Preferences
```typescript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Use simpler animation or skip entirely
{!prefersReducedMotion ? (
  <UnlockAnimation />
) : (
  <SimpleFade />
)}
```

### 4. Bundle Size Optimization

**Target Bundle Sizes**:
- Total initial bundle: < 200kb gzipped
- Auth components bundle: < 50kb gzipped
- Animation bundle: < 30kb gzipped (lazy loaded)

**Strategies**:
- Tree-shaking unused code
- Dynamic imports for heavy components
- Minimize animation library usage
- Use Next.js built-in optimizations

```javascript
// next.config.js
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
};
```

---

## Testing Strategy

### 1. Unit Tests

#### A. SessionManager Tests
**File**: `lib/auth/__tests__/SessionManager.test.ts`

```typescript
describe('SessionManager', () => {
  test('creates session with correct expiration', () => {
    const session = sessionManager.createSession();
    const expectedExpiry = Date.now() + (7 * 24 * 60 * 60 * 1000);
    
    expect(session.expiresAt).toBeCloseTo(expectedExpiry, -3);
    expect(session.authenticated).toBe(true);
  });
  
  test('validates unexpired session', () => {
    sessionManager.createSession();
    expect(sessionManager.isValid()).toBe(true);
  });
  
  test('invalidates expired session', () => {
    // Mock expired session
    const expiredSession = {
      id: 'test-id',
      createdAt: Date.now() - (8 * 24 * 60 * 60 * 1000),
      expiresAt: Date.now() - (1 * 24 * 60 * 60 * 1000),
      authenticated: true,
    };
    
    localStorage.setItem('birthday_auth_session', JSON.stringify({
      version: 1,
      session: expiredSession,
    }));
    
    expect(sessionManager.isValid()).toBe(false);
  });
  
  test('clears session from storage', () => {
    sessionManager.createSession();
    sessionManager.clearSession();
    
    expect(localStorage.getItem('birthday_auth_session')).toBeNull();
  });
});
```

#### B. RateLimiter Tests
**File**: `lib/auth/__tests__/RateLimiter.test.ts`

```typescript
describe('RateLimiter', () => {
  test('allows attempts under limit', () => {
    for (let i = 0; i < 9; i++) {
      rateLimiter.recordAttempt();
    }
    
    expect(rateLimiter.canAttempt()).toBe(true);
  });
  
  test('blocks after 10 failed attempts', () => {
    for (let i = 0; i < 10; i++) {
      rateLimiter.recordAttempt();
    }
    
    expect(rateLimiter.canAttempt()).toBe(false);
  });
  
  test('resets attempts on success', () => {
    rateLimiter.recordAttempt();
    rateLimiter.recordAttempt();
    rateLimiter.recordSuccess();
    
    expect(rateLimiter.getAttemptsRemaining()).toBe(10);
  });
  
  test('cleans old attempts outside time window', () => {
    // Mock old timestamp (2 hours ago)
    const oldTimestamp = Date.now() - (2 * 60 * 60 * 1000);
    
    localStorage.setItem('auth_rate_limit', JSON.stringify({
      version: 1,
      state: {
        attempts: [{ timestamp: oldTimestamp }],
        blockedUntil: null,
      },
    }));
    
    // This should clean old attempts
    expect(rateLimiter.canAttempt()).toBe(true);
    expect(rateLimiter.getAttemptsRemaining()).toBe(10);
  });
});
```

#### C. BirthdayCodeValidator Tests
**File**: `lib/auth/__tests__/BirthdayCodeValidator.test.ts`

```typescript
describe('BirthdayCodeValidator', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_BIRTHDAY_CODE = '0712';
  });
  
  test('validates correct code', () => {
    const result = validator.validate('0712');
    expect(result.isValid).toBe(true);
  });
  
  test('rejects incorrect code', () => {
    const result = validator.validate('1234');
    expect(result.isValid).toBe(false);
  });
  
  test('handles missing configuration', () => {
    delete process.env.NEXT_PUBLIC_BIRTHDAY_CODE;
    const newValidator = new BirthdayCodeValidator();
    
    const result = newValidator.validate('0712');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Configuration error');
  });
  
  test('uses constant-time comparison', () => {
    // Timing attack test (simplified)
    const start1 = performance.now();
    validator.validate('0000');
    const time1 = performance.now() - start1;
    
    const start2 = performance.now();
    validator.validate('0712');
    const time2 = performance.now() - start2;
    
    // Times should be similar (within 2ms)
    expect(Math.abs(time1 - time2)).toBeLessThan(2);
  });
});
```

### 2. Integration Tests

#### A. AuthContext Integration
**File**: `contexts/__tests__/AuthContext.integration.test.tsx`

```typescript
describe('AuthContext Integration', () => {
  test('initializes with no session', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.session).toBeNull();
  });
  
  test('successful login flow', async () => {
    process.env.NEXT_PUBLIC_BIRTHDAY_CODE = '0712';
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    
    const loginResult = await result.current.login('0712');
    
    expect(loginResult.success).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.session).not.toBeNull();
  });
  
  test('failed login increments rate limiter', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    
    await result.current.login('0000');
    
    const rateLimitData = JSON.parse(
      localStorage.getItem('auth_rate_limit') || '{}'
    );
    
    expect(rateLimitData.state.attempts.length).toBe(1);
  });
  
  test('logout clears session', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('birthday_auth_session')).toBeNull();
  });
});
```

#### B. ProtectedRoute Integration
**File**: `components/auth/__tests__/ProtectedRoute.integration.test.tsx`

```typescript
describe('ProtectedRoute Integration', () => {
  test('redirects to login when not authenticated', () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({
      push: mockPush,
    });
    
    render(
      <AuthProvider>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </AuthProvider>
    );
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });
  
  test('renders children when authenticated', () => {
    // Mock authenticated state
    jest.spyOn(require('@/hooks/useAuth'), 'useAuth').mockReturnValue({
      isAuthenticated: true,
      session: { id: 'test', createdAt: Date.now(), expiresAt: Date.now() + 1000000, authenticated: true },
    });
    
    const { getByText } = render(
      <AuthProvider>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </AuthProvider>
    );
    
    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
```

### 3. E2E Test Scenarios

#### A. Complete Login Flow
**File**: `e2e/auth/login.spec.ts` (Playwright)

```typescript
test.describe('Login Flow', () => {
  test('successful login with correct code', async ({ page }) => {
    await page.goto('/');
    
    // Should show login screen
    await expect(page.locator('input[type="text"]')).toBeVisible();
    
    // Enter birthday code
    await page.fill('input[type="text"]', '0712');
    await page.click('button[type="submit"]');
    
    // Should see unlock animation
    await expect(page.locator('.unlock-animation')).toBeVisible();
    
    // Wait for animation to complete
    await page.waitForTimeout(3000);
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
  
  test('shows error for incorrect code', async ({ page }) => {
    await page.goto('/');
    
    await page.fill('input[type="text"]', '0000');
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('text=Código incorrecto')).toBeVisible();
    
    // Should remain on login screen
    await expect(page).toHaveURL('/');
  });
  
  test('blocks after 10 failed attempts', async ({ page }) => {
    await page.goto('/');
    
    // Make 10 failed attempts
    for (let i = 0; i < 10; i++) {
      await page.fill('input[type="text"]', '0000');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(100);
    }
    
    // Should show rate limit message
    await expect(page.locator('text=Demasiados intentos')).toBeVisible();
    
    // Input should be disabled
    await expect(page.locator('input[type="text"]')).toBeDisabled();
  });
});
```

#### B. Session Persistence
**File**: `e2e/auth/session.spec.ts`

```typescript
test.describe('Session Persistence', () => {
  test('maintains session across page refresh', async ({ page }) => {
    // Login
    await page.goto('/');
    await page.fill('input[type="text"]', '0712');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // Refresh page
    await page.reload();
    
    // Should still be on dashboard (not redirected to login)
    await expect(page).toHaveURL('/dashboard');
  });
  
  test('allows navigation between protected routes', async ({ page }) => {
    // Login
    await page.goto('/');
    await page.fill('input[type="text"]', '0712');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // Navigate to other protected routes
    await page.click('text=Bóveda');
    await expect(page).toHaveURL('/boveda');
    
    await page.click('text=Playlist');
    await expect(page).toHaveURL('/playlist');
  });
  
  test('logout clears session and redirects', async ({ page }) => {
    // Login
    await page.goto('/');
    await page.fill('input[type="text"]', '0712');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // Click logout
    await page.click('button:has-text("Cerrar Sesión")');
    
    // Should redirect to login
    await expect(page).toHaveURL('/');
    
    // Try to access protected route
    await page.goto('/dashboard');
    
    // Should redirect back to login
    await expect(page).toHaveURL('/');
  });
});
```

#### C. Accessibility Tests
**File**: `e2e/auth/accessibility.spec.ts`

```typescript
test.describe('Authentication Accessibility', () => {
  test('supports keyboard navigation on login screen', async ({ page }) => {
    await page.goto('/');
    
    // Tab to input
    await page.keyboard.press('Tab');
    await expect(page.locator('input[type="text"]')).toBeFocused();
    
    // Type code
    await page.keyboard.type('0712');
    
    // Enter to submit
    await page.keyboard.press('Enter');
    
    // Should redirect to dashboard
    await page.waitForURL('/dashboard');
  });
  
  test('announces errors to screen readers', async ({ page }) => {
    await page.goto('/');
    
    await page.fill('input[type="text"]', '0000');
    await page.click('button[type="submit"]');
    
    // Error should have aria-live="polite" or role="alert"
    const error = page.locator('[role="alert"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(/Código incorrecto/);
  });
  
  test('respects prefers-reduced-motion', async ({ page, context }) => {
    // Set reduced motion preference
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        value: (query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        }),
      });
    });
    
    await page.goto('/');
    await page.fill('input[type="text"]', '0712');
    await page.click('button[type="submit"]');
    
    // Should not show particle animation
    await expect(page.locator('.confetti-particle')).not.toBeVisible();
    
    // Should redirect faster (no animation delay)
    await page.waitForURL('/dashboard', { timeout: 1000 });
  });
});
```

### 4. Test Coverage Goals

**Target Coverage**:
- Unit tests: 90%+ for utilities and business logic
- Integration tests: 80%+ for component interactions
- E2E tests: Critical user paths (login, logout, navigation)

**Test Execution**:
```bash
# Unit + Integration tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

---

## Implementation Checklist

### Phase 1: Core Infrastructure
- [ ] Create file structure
- [ ] Define TypeScript interfaces
- [ ] Implement SecureStorage utility
- [ ] Implement SessionManager
- [ ] Implement RateLimiter
- [ ] Implement BirthdayCodeValidator
- [ ] Write unit tests for utilities

### Phase 2: Authentication Context
- [ ] Create AuthContext
- [ ] Implement login method
- [ ] Implement logout method
- [ ] Implement session monitoring
- [ ] Create useAuth hook
- [ ] Write integration tests

### Phase 3: UI Components
- [ ] Build LoginScreen component
- [ ] Build ProtectedRoute wrapper
- [ ] Build UnlockAnimation component
- [ ] Build Navigation component
- [ ] Style components (CSS Modules / Tailwind)
- [ ] Test responsive layouts

### Phase 4: Route Protection
- [ ] Wrap app with AuthProvider
- [ ] Protect dashboard route
- [ ] Protect all module routes
- [ ] Handle root path (/) logic
- [ ] Test navigation flows

### Phase 5: Polish & Optimization
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Optimize animation performance
- [ ] Add accessibility features
- [ ] Test with screen readers
- [ ] Write E2E tests
- [ ] Performance audit

### Phase 6: Documentation
- [ ] Document environment variables
- [ ] Create usage examples
- [ ] Write troubleshooting guide
- [ ] Document testing procedures

---

## Conclusion

This design document provides a comprehensive blueprint for implementing SPEC-000: Authentication System. The architecture prioritizes security, user experience, and maintainability while remaining lightweight and appropriate for a personal project.

Key architectural decisions:
1. **Client-side only**: No backend required, using localStorage
2. **React Context API**: Sufficient for authentication state management
3. **Rate limiting**: Client-side brute force protection
4. **7-day sessions**: Balance between convenience and security
5. **Responsive design**: Mobile-first approach with adaptive navigation
6. **Accessibility**: WCAG compliance with keyboard navigation and screen reader support

The implementation follows Next.js 14+ best practices, TypeScript strict mode, and modern React patterns. All requirements from the requirements document are addressed with specific technical solutions.
