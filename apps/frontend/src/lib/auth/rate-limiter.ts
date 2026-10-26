// Rate limiter for auth attempts
const RATE_KEY = 'cumple_rate';
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface RateData {
  attempts: number;
  firstAttemptAt: number;
  blockedUntil: number | null;
}

function getRateData(): RateData {
  try {
    const data = localStorage.getItem(RATE_KEY);
    if (!data) return { attempts: 0, firstAttemptAt: 0, blockedUntil: null };
    return JSON.parse(data);
  } catch {
    return { attempts: 0, firstAttemptAt: 0, blockedUntil: null };
  }
}

function saveRateData(data: RateData): void {
  try {
    localStorage.setItem(RATE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function isRateLimited(): { limited: boolean; remainingSeconds: number } {
  const data = getRateData();
  const now = Date.now();

  // Check if blocked
  if (data.blockedUntil && now < data.blockedUntil) {
    return { limited: true, remainingSeconds: Math.ceil((data.blockedUntil - now) / 1000) };
  }

  // Reset if window expired
  if (data.firstAttemptAt && now - data.firstAttemptAt > WINDOW_MS) {
    saveRateData({ attempts: 0, firstAttemptAt: 0, blockedUntil: null });
    return { limited: false, remainingSeconds: 0 };
  }

  return { limited: false, remainingSeconds: 0 };
}

export function recordFailedAttempt(): { blocked: boolean; remainingSeconds: number } {
  const data = getRateData();
  const now = Date.now();

  // Reset if window expired
  if (data.firstAttemptAt && now - data.firstAttemptAt > WINDOW_MS) {
    data.attempts = 0;
    data.firstAttemptAt = 0;
    data.blockedUntil = null;
  }

  if (!data.firstAttemptAt) {
    data.firstAttemptAt = now;
  }

  data.attempts++;

  if (data.attempts >= MAX_ATTEMPTS) {
    data.blockedUntil = now + WINDOW_MS;
    saveRateData(data);
    return { blocked: true, remainingSeconds: Math.ceil(WINDOW_MS / 1000) };
  }

  saveRateData(data);
  return { blocked: false, remainingSeconds: 0 };
}

export function resetRateLimit(): void {
  try {
    localStorage.removeItem(RATE_KEY);
  } catch {
    // ignore
  }
}
