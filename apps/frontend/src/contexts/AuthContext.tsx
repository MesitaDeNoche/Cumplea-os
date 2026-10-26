'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { createSession, getSession, clearSession, isRateLimited, recordFailedAttempt, resetRateLimit } from '@/lib/auth';

interface AuthContextType {
  authenticated: boolean;
  loading: boolean;
  error: string | null;
  rateLimited: boolean;
  rateLimitSeconds: number;
  login: (code: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  // Check session on mount
  useEffect(() => {
    const session = getSession();
    if (session?.authenticated) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Rate limit countdown
  useEffect(() => {
    if (!rateLimited || rateLimitSeconds <= 0) return;
    const timer = setInterval(() => {
      setRateLimitSeconds(prev => {
        if (prev <= 1) {
          setRateLimited(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rateLimited, rateLimitSeconds]);

  const login = useCallback((code: string): boolean => {
    setError(null);

    // Check rate limit
    const rateCheck = isRateLimited();
    if (rateCheck.limited) {
      setRateLimited(true);
      setRateLimitSeconds(rateCheck.remainingSeconds);
      setError(`Demasiados intentos. Espera ${Math.ceil(rateCheck.remainingSeconds / 60)} minutos.`);
      return false;
    }

    const validCode = process.env.NEXT_PUBLIC_BIRTHDAY_CODE || '';

    if (!validCode) {
      setError('Error de configuración del sistema.');
      return false;
    }

    if (code === validCode) {
      createSession();
      resetRateLimit();
      setAuthenticated(true);
      setError(null);
      return true;
    } else {
      const result = recordFailedAttempt();
      if (result.blocked) {
        setRateLimited(true);
        setRateLimitSeconds(result.remainingSeconds);
        setError(`Demasiados intentos. Espera ${Math.ceil(result.remainingSeconds / 60)} minutos.`);
      } else {
        setError('Código incorrecto, intenta de nuevo 🎂');
      }
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, loading, error, rateLimited, rateLimitSeconds, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
