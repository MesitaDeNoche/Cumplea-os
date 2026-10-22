'use client';

import { useEffect, useState } from 'react';
import { checkBackendHealth, API_URL } from '@/lib/api';

interface HealthStatus {
  status: 'UP' | 'DOWN';
  error?: string;
}

export default function BackendStatus() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      setLoading(true);
      try {
        const result = await checkBackendHealth();
        setHealth(result);
      } catch (error) {
        setHealth({ status: 'DOWN', error: String(error) });
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-500" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Backend Status
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Checking connection...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isUp = health?.status === 'UP';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <div
          className={`h-3 w-3 rounded-full ${
            isUp ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Backend Status
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isUp ? 'Connected' : 'Disconnected'}
          </p>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-medium">API URL:</span>{' '}
          <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">
            {API_URL}
          </code>
        </p>
        {health?.error && (
          <p className="mt-1 text-red-600 dark:text-red-400">
            Error: {health.error}
          </p>
        )}
      </div>
    </div>
  );
}
