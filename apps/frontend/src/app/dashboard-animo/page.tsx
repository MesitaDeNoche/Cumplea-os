'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';
import { useState } from 'react';

const moodLevels = [
  { emoji: '😢', label: 'Muy mal', color: '#dc2626' },
  { emoji: '😟', label: 'Mal', color: '#f97316' },
  { emoji: '😐', label: 'Regular', color: '#eab308' },
  { emoji: '🙂', label: 'Bien', color: '#84cc16' },
  { emoji: '😊', label: 'Muy bien', color: '#22c55e' },
];

export default function DashboardAnimoPage() {
  const [mood, setMood] = useState(2); // 0-4 index

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="app-page">
        <div className="module-page">
          <Link href="/dashboard" className="module-page__back">← Volver al Dashboard</Link>
          <div className="module-page__header">
            <span className="module-page__icon">💜</span>
            <h1 className="module-page__title">Dashboard de Ánimo</h1>
            <p className="module-page__desc">
              Un espacio seguro para expresar cómo te sientes. Estoy aquí para ti siempre.
            </p>
          </div>
          <div className="module-page__content">
            {/* Mood Bar */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(192,132,252,0.2)',
              borderRadius: 'var(--app-radius)',
              padding: '2rem 1.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--app-text-muted)', marginBottom: '1.5rem', fontSize: '1rem' }}>
                ¿Cómo te sientes hoy?
              </p>

              {/* Emoji display */}
              <div style={{ fontSize: '4rem', marginBottom: '1rem', transition: 'transform 0.3s ease' }}>
                {moodLevels[mood].emoji}
              </div>
              <p style={{
                color: 'var(--app-white)',
                fontFamily: 'var(--app-font-serif)',
                fontSize: '1.3rem',
                marginBottom: '1.5rem',
              }}>
                {moodLevels[mood].label}
              </p>

              {/* Slider bar */}
              <div style={{ padding: '0 1rem' }}>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={1}
                  value={mood}
                  onChange={e => setMood(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: moodLevels[mood].color,
                    height: '8px',
                    cursor: 'pointer',
                  }}
                />
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '0.5rem',
                }}>
                  {moodLevels.map((level, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '1.2rem',
                        opacity: mood === i ? 1 : 0.4,
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onClick={() => setMood(i)}
                    >
                      {level.emoji}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Placeholder for songs/content */}
            <div className="module-page__placeholder">
              <span className="module-page__placeholder-emoji">🎵</span>
              <h3>Canciones y mensajes</h3>
              <p>Pronto aquí aparecerán canciones y mensajes personalizados según cómo te sientas. Siempre habrá algo lindo esperándote.</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
