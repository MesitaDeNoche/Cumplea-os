'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';

export default function PlaylistPage() {
  return (
    <ProtectedRoute>
      <Navigation />
      <div className="app-page">
        <div className="module-page">
          <Link href="/dashboard" className="module-page__back">← Volver al Dashboard</Link>
          <div className="module-page__header">
            <span className="module-page__icon">🎵</span>
            <h1 className="module-page__title">Playlist Visual</h1>
            <p className="module-page__desc">
              Cada canción cuenta nuestra historia. Un viaje musical con mensajes especiales para ti.
            </p>
          </div>
          <div className="module-page__content">
            <div className="module-page__placeholder">
              <span className="module-page__placeholder-emoji">🎶</span>
              <h3>Próximamente</h3>
              <p>Estamos armando la playlist perfecta. Pronto cada canción tendrá un mensaje dedicado especialmente para ti.</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
