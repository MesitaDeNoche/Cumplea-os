'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function BotiquinPage() {
  const [sosSent, setSosSent] = useState(false);

  const handleSOS = () => {
    setSosSent(true);
    setTimeout(() => setSosSent(false), 3000);
  };

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="app-page">
        <div className="module-page">
          <Link href="/dashboard" className="module-page__back">← Volver al Dashboard</Link>
          <div className="module-page__header">
            <span className="module-page__icon">🩹</span>
            <h1 className="module-page__title">Botiquín de Emergencia</h1>
            <p className="module-page__desc">
              Para esos momentos en los que necesitas un abrazo virtual. Estoy aquí para ti, siempre.
            </p>
          </div>
          <div className="module-page__content">
            {/* SOS Button */}
            <div className="botiquin__sos">
              <button
                className="botiquin__sos-btn"
                onClick={handleSOS}
                disabled={sosSent}
              >
                {sosSent ? '💜' : 'SOS'}
              </button>
              <span className="botiquin__sos-label">
                {sosSent
                  ? '¡Mensaje enviado! Ya voy para ti 💜'
                  : 'Presiona si necesitas que esté ahí para ti'}
              </span>
            </div>

            {/* Support buttons */}
            <div className="botiquin__support-grid">
              <button
                className="botiquin__support-btn"
                onClick={() => alert('🤣 Función de risas próximamente!')}
              >
                😂 Necesito Reírme
              </button>
              <button
                className="botiquin__support-btn"
                onClick={() => alert('💜 Mensajes de ánimo próximamente!')}
              >
                💜 Necesito Ánimo
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
