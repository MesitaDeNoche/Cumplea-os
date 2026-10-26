'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import { useState } from 'react';

export default function ProhibidoPage() {
  const [videoUrl, setVideoUrl] = useState('');

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="module-page" style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        minHeight: '100vh'
      }}>
        <div className="module-page__content" style={{ 
          maxWidth: '1100px', 
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}>
          {/* Título con corazón café */}
          <div className="text-center mb-20" style={{ 
            animation: 'fadeInDown 1.2s ease-out'
          }}>
            <div 
              className="mb-8 transition-transform duration-500 hover:scale-110" 
              style={{ 
                fontSize: '5rem',
                color: '#8B4513',
                filter: 'drop-shadow(0 4px 12px rgba(139, 69, 19, 0.3))',
                opacity: 0.9
              }}
            >
              🤎
            </div>
            <h1 className="font-serif leading-relaxed" style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
              color: '#e5e5e5',
              fontWeight: 300,
              letterSpacing: '0.02em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              marginBottom: '1rem',
              lineHeight: '1.4'
            }}>
              Estuve cerca de tener
            </h1>
            <h1 className="font-serif leading-relaxed" style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
              color: '#e5e5e5',
              fontWeight: 300,
              letterSpacing: '0.02em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              lineHeight: '1.4'
            }}>
              el amor de mi vida...
            </h1>
          </div>

          {/* Área de video */}
          <div className="w-full space-y-6 mb-16" style={{
            animation: 'fadeInUp 1.4s ease-out 0.3s both'
          }}>
            {videoUrl ? (
              <div 
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: '16/9',
                  borderRadius: '16px',
                  background: '#000',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 80px rgba(139, 69, 19, 0.15)',
                  border: '1px solid rgba(139, 69, 19, 0.2)'
                }}
              >
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  autoPlay
                  style={{
                    filter: 'brightness(0.95) contrast(1.05)'
                  }}
                >
                  Tu navegador no soporta la reproducción de videos.
                </video>
              </div>
            ) : (
              <div 
                className="relative w-full flex items-center justify-center transition-all duration-500 hover:border-opacity-50"
                style={{ 
                  aspectRatio: '16/9',
                  backgroundColor: '#0a0a0a',
                  borderRadius: '16px',
                  border: '2px dashed rgba(100, 100, 100, 0.3)',
                  boxShadow: 'inset 0 2px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div className="text-center space-y-5 p-8">
                  <div 
                    className="transition-transform duration-500 hover:scale-110" 
                    style={{ 
                      fontSize: '4rem', 
                      color: '#3a3a3a',
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
                    }}
                  >
                    🎬
                  </div>
                  <p style={{ 
                    color: '#888', 
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    letterSpacing: '0.03em'
                  }}>
                    Un espacio para los recuerdos que no fueron
                  </p>
                  <p style={{ 
                    color: '#555', 
                    fontSize: '0.9rem',
                    fontStyle: 'italic'
                  }}>
                    Ingresa la URL del video para comenzar
                  </p>
                </div>
              </div>
            )}

            {/* Input para URL del video */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="URL del video (MP4, WebM, MOV...)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-1 transition-all duration-300 focus:scale-[1.01]"
                style={{
                  padding: '1rem 1.5rem',
                  color: '#e5e5e5',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid rgba(139, 69, 19, 0.2)',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
                  fontWeight: 300,
                  letterSpacing: '0.02em'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(139, 69, 19, 0.4)';
                  e.target.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(139, 69, 19, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(139, 69, 19, 0.2)';
                  e.target.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.3)';
                }}
              />
              {videoUrl && (
                <button
                  onClick={() => setVideoUrl('')}
                  className="transition-all duration-300 hover:scale-105"
                  style={{ 
                    padding: '1rem 2rem',
                    color: '#bbb',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(100, 100, 100, 0.3)',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: 300,
                    cursor: 'pointer',
                    letterSpacing: '0.05em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                    e.currentTarget.style.color = '#e5e5e5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                    e.currentTarget.style.color = '#bbb';
                  }}
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Nota adicional */}
          <div className="text-center mt-20" style={{
            animation: 'fadeIn 2s ease-out 0.8s both'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              borderTop: '1px solid rgba(139, 69, 19, 0.2)',
              borderBottom: '1px solid rgba(139, 69, 19, 0.2)'
            }}>
              <p style={{ 
                color: '#666', 
                fontSize: '0.9rem',
                fontStyle: 'italic',
                fontWeight: 300,
                letterSpacing: '0.05em',
                lineHeight: '1.6'
              }}>
                Los sueños que casi se hicieron realidad<br/>
                permanecen en el silencio de lo que pudo ser
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </ProtectedRoute>
  );
}
