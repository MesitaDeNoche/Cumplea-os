'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BovedaPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [bovedaImages, setBovedaImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar la lista de imágenes desde la API
    fetch('/api/boveda-images')
      .then(res => res.json())
      .then(data => {
        setBovedaImages(data.images || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < bovedaImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  // Manejar teclas del teclado para navegación
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, bovedaImages.length]);

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="module-page" style={{ 
        background: 'linear-gradient(135deg, #0f1624 0%, #1a1a2e 50%, #16213e 100%)',
        minHeight: '100vh'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          padding: '2rem 1.5rem',
          paddingTop: '4rem'
        }}>
          {/* Header */}
          <div className="text-center mb-16" style={{ 
            animation: 'fadeInDown 1s ease-out'
          }}>
            <div 
              className="mb-6 transition-transform duration-500 hover:scale-110" 
              style={{ 
                fontSize: '4rem',
                filter: 'drop-shadow(0 4px 12px rgba(192, 132, 252, 0.3))',
                opacity: 0.9
              }}
            >
              📸
            </div>
            <h1 className="font-serif" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              textShadow: '0 2px 20px rgba(192, 132, 252, 0.2)',
              marginBottom: '1rem'
            }}>
              Bóveda de Recuerdos
            </h1>
            <p style={{ 
              color: 'rgba(216, 180, 254, 0.6)',
              fontSize: '1rem',
              fontStyle: 'italic',
              fontWeight: 300,
              letterSpacing: '0.03em',
              maxWidth: '600px',
              margin: '0 auto 1rem'
            }}>
              Los momentos que guardamos en el corazón,<br/>
              capturados en el tiempo para siempre
            </p>
            {bovedaImages.length > 0 && (
              <p style={{
                color: 'rgba(192, 132, 252, 0.7)',
                fontSize: '0.9rem',
                fontWeight: 300
              }}>
                {bovedaImages.length} recuerdos preciados
              </p>
            )}
          </div>

          {/* Galería */}
          {isLoading ? (
            <div className="text-center" style={{ padding: '4rem 2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>
                ⏳
              </div>
              <p style={{ color: 'rgba(216, 180, 254, 0.6)', fontWeight: 300 }}>
                Cargando tus recuerdos...
              </p>
            </div>
          ) : bovedaImages.length > 0 ? (
            <div 
              className="gallery-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
                animation: 'fadeInUp 1.2s ease-out 0.3s both'
              }}
            >
              {bovedaImages.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item"
                  onClick={() => openLightbox(index)}
                  style={{
                    position: 'relative',
                    aspectRatio: '1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(192, 132, 252, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(192, 132, 252, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.15)';
                  }}
                >
                  <Image
                    src={`/images/boveda/${image}`}
                    alt={`Recuerdo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={index < 6}
                  />
                </div>
              ))}
            </div>
          ) : (
            // Placeholder cuando no hay imágenes
            <div 
              className="text-center"
              style={{
                padding: '4rem 2rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '2px dashed rgba(192, 132, 252, 0.2)',
                borderRadius: '20px',
                animation: 'fadeInUp 1.2s ease-out 0.3s both'
              }}
            >
              <div style={{ 
                fontSize: '4rem', 
                marginBottom: '1.5rem',
                opacity: 0.5,
                filter: 'grayscale(0.3)'
              }}>
                🔒
              </div>
              <h3 className="font-serif" style={{
                fontSize: '1.5rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '1rem',
                fontWeight: 300
              }}>
                La bóveda está lista para tus recuerdos
              </h3>
              <p style={{ 
                color: 'rgba(216, 180, 254, 0.6)',
                fontSize: '0.95rem',
                lineHeight: '1.7',
                fontWeight: 300,
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Agrega tus fotos a la carpeta<br/>
                <code style={{ 
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  color: 'rgba(192, 132, 252, 0.8)'
                }}>
                  /public/images/boveda/
                </code>
                <br/>
                y aparecerán aquí automáticamente
              </p>
            </div>
          )}

          {/* Lightbox */}
          {selectedImage !== null && (
            <div
              className="lightbox"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                animation: 'fadeIn 0.3s ease-out'
              }}
              onClick={closeLightbox}
            >
              {/* Botón cerrar */}
              <button
                onClick={closeLightbox}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  zIndex: 10001
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ✕
              </button>

              {/* Botón anterior */}
              {selectedImage > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  style={{
                    position: 'absolute',
                    left: '2rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    zIndex: 10001
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ←
                </button>
              )}

              {/* Botón siguiente */}
              {selectedImage < bovedaImages.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  style={{
                    position: 'absolute',
                    right: '2rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    zIndex: 10001
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  →
                </button>
              )}

              {/* Imagen */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  width: '100%',
                  height: '100%'
                }}
              >
                <Image
                  src={`/images/boveda/${bovedaImages[selectedImage]}`}
                  alt={`Recuerdo ${selectedImage + 1}`}
                  fill
                  sizes="100vw"
                  style={{ 
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                />
              </div>

              {/* Contador */}
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '0.9rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 10001
              }}>
                {selectedImage + 1} / {bovedaImages.length}
              </div>
            </div>
          )}
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
