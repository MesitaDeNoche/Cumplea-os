'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';

export default function BovedaPage() {
  return (
    <ProtectedRoute>
      <Navigation />
      <div className="app-page">
        <div className="module-page">
          <Link href="/dashboard" className="module-page__back">← Volver al Dashboard</Link>
          <div className="module-page__header">
            <span className="module-page__icon">📸</span>
            <h1 className="module-page__title">Bóveda de Recuerdos</h1>
            <p className="module-page__desc">
              Un cofre lleno de nuestros momentos más preciados. Fotos, videos y recuerdos que guardaremos para siempre.
            </p>
          </div>
          <div className="module-page__content">
            <div className="module-page__placeholder">
              <span className="module-page__placeholder-emoji">🔒</span>
              <h3>Próximamente</h3>
              <p>Estamos preparando tu bóveda de recuerdos. Pronto podrás ver aquí todas nuestras fotos y momentos especiales organizados con amor.</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
