// Session management for birthday auth
const SESSION_KEY = 'cumple_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface Session {
  authenticated: boolean;
  createdAt: number;
  expiresAt: number;
}

export function createSession(): Session {
  const now = Date.now();
  const session: Session = {
    authenticated: true,
    createdAt: now,
    expiresAt: now + SESSION_DURATION_MS,
  };
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    console.warn('[Auth] localStorage not available');
  }
  return session;
}

export function getSession(): Session | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    const session: Session = JSON.parse(data);
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    console.warn('[Auth] Could not clear session');
  }
}

export function isAuthenticated(): boolean {
  const session = getSession();
  return session !== null && session.authenticated;
}
