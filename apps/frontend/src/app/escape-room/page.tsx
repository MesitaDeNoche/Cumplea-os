'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';

export default function EscapeRoomPage() {
  return (
    <ProtectedRoute>
      <Navigation />
      <div className="app-page">
        <div className="module-page">
          <Link href="/dashboard" className="module-page__back">← Volver al Dashboard</Link>
          <div className="module-page__header">
            <span className="module-page__icon">🔐</span>
            <h1 className="module-page__title">Escape Room</h1>
            <p className="module-page__desc">
              Un juego de preguntas sobre nuestra relación. Demuestra cuánto nos conocemos y desbloquea sorpresas.
            </p>
          </div>
          <div className="module-page__content">
            <div className="module-page__placeholder">
              <span className="module-page__placeholder-emoji">🧩</span>
              <h3>Próximamente</h3>
              <p>Estamos preparando las preguntas y acertijos. Pronto podrás poner a prueba cuánto sabes sobre nosotros.</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
