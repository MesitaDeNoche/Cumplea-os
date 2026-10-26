'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import FloatingHearts from './FloatingHearts';

const slides = [
  { img: '/images/foto19.jpg', date: '📅 Nuestro primer día', desc: 'El día que todo empezó. Recuerdo que estaba nervioso porque conocerias a mis papás, tambien recuerdo esa sonrisa tuya, hermosa como simepre. Desde ese día sabia lo especial que serias para mi.' },
  { img: '/images/foto18.jpg', date: '📅 Un momento especial', desc: 'Esta foto es considerada una de las mas importantes para los dos eso es porque es la foto de nuestro primer beso como pareja. Y tambien es una foto muy hermosa por el Beily peludo en medio.' },
  { img: '/images/foto20.jpg', date: '📅 Un día para recordar', desc: 'Este fue un día muy especial ya fue nuestro primer 31 como pareja, ese día me hiciste más feliz de lo que te puedes imaginar. Y todavia lo haces muy seguido.' },
  { img: '/images/foto17.jpg', date: '📅 Siempre juntos', desc: 'Esta foto me recuerda que no importa el día, el momento, o lo que pase, siempre y cuando estemos juntos como este día en el que nos mojamos pero la pasamos bien como pareja. Pero estabamos juntos que fue lo más importante para mi.' },
  { img: '/images/foto16.jpg', date: '📅 Un día para recordar', desc: 'Otro de los días mas especiales que hemos tenido como pareja nuestro segundo año juntos después de todo un año. Fuí muy feliz por poder compartir contigo todo el año.' },
  { img: '/images/foto15.jpg', date: '📅 Otro dia para recordar', desc: 'Este es otro de los días importantes para mi, otro día de diciembre que vivimos juntos. Otra vez fui muy feliz contigo a tu lado.' },
  { img: '/images/foto13.jpg', date: '📅 Tu sonrisa', desc: 'Tu sonrisa en esta foto lo dice todo. Es la imagen que más me gusta guardar en el corazón.' },
  { img: '/images/foto14.jpg', date: '📅 Dia importante para mi', desc: 'Este es uno de los días mas importantes para mi, el día de mi cumpleaños que me acompañaste y me hiciste muy feliz.' },
  { img: '/images/foto12.jpg', date: '📅 Tu día importante', desc: 'Este es un recuerdo muy importante para los dos, el día de tu cumpleaños, un día que pasamos juntos y celebramos tu cumpleaños como pareja.' },
  { img: '/images/foto11.jpg', date: '📅 Recuerdo memorables', desc: 'Este es uno de los recuedos mamorables que tengo contigo. Tus grados, ese día te veias demasiado hermosa, como siempre te ves.' },
  { img: '/images/foto10.jpg', date: '📅 Un día perfecto', desc: 'Este fue un día perfecto a tu lado, celebramos tus grados y fuimos muy felices todos, tu, yo y tu familia. Te amo demasiado y sigo orgulloso por ese logro que conseguiste.' },
  { img: '/images/foto7.jpg', date: '📅 Unas de mis fotos favoritas', desc: 'Claro tampoco puedo olvidarme de tu familia, me siento muy feliz de coincidir contigo y poder compartir espacios y tiempos con tu familia que tanto me agrada y quiero.' },
  { img: '/images/foto5.jpg', date: '📅 Recuerdos que guardo', desc: 'Hay recuerdos que no necesitan foto para quedarse, como este día tan genial que vimos una pelicula de tu serie de anime favorita y que disfrutamos tanto, por eso me alegra tener esta para volver a vivirlo.' },
  { img: '/images/foto3.jpg', date: '📅 Tú', desc: 'Tú, simplemente tú, con tu sonrisa, tu carisma, tu belleza y todo lo eres y te define en una sola foto, basicamente tú.' },
  { img: '/images/foto2.jpg', date: '📅 Momentos de felicidad', desc: 'La felicidad no es un lugar al que se llega, es esto: estar contigo en momentos como este, en celebraciones importantes, como en nuestro aniversario, soy feliz de tenerte a mi lado un año más.' },
  { img: '/images/foto1.jpg', date: '📅 La persona que más amo', desc: 'Por ultimo, esta está foto, donde se ve la persona más maravillosa de este mundo, la persona que más amo, que deseo tener siempre todos los días de mi vida, mi persona favorita en todo el universo.\n\nTE AMO DEMASIADO CIELO, FELIZ CUMPLEAÑOS 💜' },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCurrent, setModalCurrent] = useState(0);
  const [modalImgOpacity, setModalImgOpacity] = useState(1);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef(0);
  const total = slides.length;

  const goTo = useCallback((index: number) => {
    setCurrent(((index % total) + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    autoTimerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 5000);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [total]);

  const resetAuto = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 5000);
  }, [total]);

  const handlePrev = () => { goTo(current - 1); resetAuto(); };
  const handleNext = () => { goTo(current + 1); resetAuto(); };

  // Modal
  const openModal = (index: number) => {
    setModalCurrent(((index % total) + total) % total);
    setModalImgOpacity(1);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  const modalGoTo = (index: number) => {
    const next = ((index % total) + total) % total;
    setModalImgOpacity(0);
    setTimeout(() => {
      setModalCurrent(next);
      setModalImgOpacity(1);
    }, 180);
  };

  // Keyboard handling for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') modalGoTo(modalCurrent - 1);
      if (e.key === 'ArrowRight') modalGoTo(modalCurrent + 1);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  });

  // Touch swipe for carousel track
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAuto();
    }
  };

  return (
    <>
      <section className="carousel-section" id="carousel-section">
        <div className="carousel-section__header">
          <h2>Nuestros Momentos</h2>
          <p>Cada foto guarda una historia que atesoro en el corazón</p>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-btn carousel-btn--prev" onClick={handlePrev} aria-label="Foto anterior">‹</button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {slides.map((slide, i) => (
                <div className="carousel-slide" key={i}>
                  <div className="carousel-card">
                    <div className="carousel-card__img-wrapper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slide.img}
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.svg'; }}
                        alt={`Foto ${i + 1}`}
                        style={{ cursor: 'zoom-in' }}
                        onClick={() => openModal(i)}
                      />
                      <button
                        className="carousel-card__fullscreen-btn"
                        aria-label="Ver en pantalla completa"
                        onClick={() => openModal(i)}
                      >
                        ⛶
                      </button>
                    </div>
                    <div className="carousel-card__body">
                      <span className="carousel-card__date">{slide.date}</span>
                      <p className="carousel-card__desc">{slide.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn carousel-btn--next" onClick={handleNext} aria-label="Foto siguiente">›</button>
        </div>

        <div className="carousel-dots" aria-label="Indicadores de diapositiva">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === current ? ' active' : ''}`}
              aria-label={`Ir a la foto ${i + 1}`}
              onClick={() => { goTo(i); resetAuto(); }}
            />
          ))}
        </div>

        <FloatingHearts />
      </section>

      {/* Fullscreen Photo Modal */}
      <div
        className={`photo-modal${modalOpen ? ' open' : ''}`}
        id="photoModal"
        role="dialog"
        aria-modal="true"
        aria-label="Foto en pantalla completa"
        onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      >
        <div className="photo-modal__inner">
          <button className="photo-modal__close" onClick={closeModal} aria-label="Cerrar">✕</button>
          <button className="photo-modal__nav photo-modal__nav--prev" onClick={() => modalGoTo(modalCurrent - 1)} aria-label="Foto anterior">‹</button>

          <div className="photo-modal__img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[modalCurrent].img}
              alt={`Foto ${modalCurrent + 1}`}
              style={{ opacity: modalImgOpacity, transition: 'opacity 0.18s ease' }}
            />
          </div>

          <div className="photo-modal__caption">
            <span className="carousel-card__date">{slides[modalCurrent].date}</span>
            <p>{slides[modalCurrent].desc}</p>
          </div>

          <span className="photo-modal__counter">{modalCurrent + 1} / {total}</span>

          <button className="photo-modal__nav photo-modal__nav--next" onClick={() => modalGoTo(modalCurrent + 1)} aria-label="Foto siguiente">›</button>
        </div>
      </div>
    </>
  );
}
