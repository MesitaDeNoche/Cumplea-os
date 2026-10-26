'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const modules = [
  {
    name: 'Página de Cumpleaños',
    path: '/cumple',
    icon: '🎂',
    desc: 'Tu página especial llena de recuerdos, fotos y mensajes de amor.',
  },
  {
    name: 'Bóveda de Recuerdos',
    path: '/boveda',
    icon: '📸',
    desc: 'Un cofre de fotos y momentos que guardaremos para siempre.',
  },
  {
    name: 'Playlist Visual',
    path: '/playlist',
    icon: '🎵',
    desc: 'Las canciones que nos definen, cada una con un mensaje especial.',
  },
  {
    name: 'Escape Room',
    path: '/escape-room',
    icon: '🔐',
    desc: 'Un juego de preguntas sobre nosotros. ¿Podrás resolver todos?',
  },
  {
    name: 'Dashboard de Ánimo',
    path: '/dashboard-animo',
    icon: '💜',
    desc: 'Un espacio para saber cómo te sientes y darte lo que necesitas.',
  },
  {
    name: 'Botiquín de Emergencia',
    path: '/botiquin',
    icon: '🩹',
    desc: 'Para esos momentos difíciles. Aquí siempre hay algo para ti.',
  },
  {
    name: 'Prohibido',
    path: '/prohibido',
    icon: '🚫',
    desc: 'Zona restringida. Contenido exclusivo y privado.',
  },
];

const VISITED_KEY = 'visited_modules';

function getVisited(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(VISITED_KEY) || '[]');
  } catch {
    return [];
  }
}

function markVisited(path: string) {
  const visited = getVisited();
  if (!visited.includes(path)) {
    visited.push(path);
    localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
  }
}

export default function DashboardPage() {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getVisited());
  }, []);

  const handleClick = (path: string) => {
    markVisited(path);
    setVisited(prev => prev.includes(path) ? prev : [...prev, path]);
  };

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="app-page">
        <div className="dashboard">
          <div className="dashboard__header">
            <p className="dashboard__welcome">Bienvenida a tu espacio</p>
            <h1 className="dashboard__title">Mi Amor 💜</h1>
            <p className="dashboard__subtitle">Todo esto fue hecho pensando en ti</p>
          </div>

          <div className="dashboard__grid">
            {modules.map((mod) => (
              <Link
                key={mod.path}
                href={mod.path}
                className="module-card"
                onClick={() => handleClick(mod.path)}
              >
                {!visited.includes(mod.path) && (
                  <span className="module-card__badge">NUEVO</span>
                )}
                <span className="module-card__icon">{mod.icon}</span>
                <h3 className="module-card__name">{mod.name}</h3>
                <p className="module-card__desc">{mod.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
