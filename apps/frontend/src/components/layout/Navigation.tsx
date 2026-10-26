'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

const modules = [
  { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
  { name: 'Cumpleaños', path: '/cumple', icon: '🎂' },
  { name: 'Bóveda', path: '/boveda', icon: '📸' },
  { name: 'Playlist', path: '/playlist', icon: '🎵' },
  { name: 'Escape Room', path: '/escape-room', icon: '🔐' },
  { name: 'Ánimo', path: '/dashboard-animo', icon: '💜' },
  { name: 'Botiquín', path: '/botiquin', icon: '🩹' },
  { name: 'Prohibido', path: '/prohibido', icon: '🚫' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      
      // En desktop, inicialmente cerrado
      if (desktop) {
        setMenuOpen(false);
      }
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMouseEnter = () => {
    if (isDesktop) {
      setMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    // En mobile, cerrar el menú
    if (!isDesktop) {
      setMenuOpen(false);
    }
    // En desktop, también cerrar después de hacer clic
    else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        className="nav-hamburger"
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        aria-label="Menú de navegación"
      >
        <span className={`nav-hamburger__line${menuOpen ? ' open' : ''}`} />
        <span className={`nav-hamburger__line${menuOpen ? ' open' : ''}`} />
        <span className={`nav-hamburger__line${menuOpen ? ' open' : ''}`} />
      </button>

      {/* Sidebar */}
      <nav 
        className={`nav-sidebar${menuOpen ? ' nav-sidebar--open' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="nav-sidebar__header">
          <span className="nav-sidebar__logo">💜</span>
          <span className="nav-sidebar__title">Mi Amor</span>
        </div>

        <ul className="nav-sidebar__list">
          {modules.map(mod => (
            <li key={mod.path}>
              <Link
                href={mod.path}
                className={`nav-sidebar__link${pathname === mod.path ? ' nav-sidebar__link--active' : ''}`}
                onClick={handleLinkClick}
              >
                <span className="nav-sidebar__icon">{mod.icon}</span>
                <span className="nav-sidebar__label">{mod.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button className="nav-sidebar__logout" onClick={logout}>
          🚪 Cerrar sesión
        </button>
      </nav>

      {/* Overlay for mobile only */}
      {!isDesktop && menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
