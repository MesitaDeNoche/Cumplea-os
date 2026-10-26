'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import FloatingHearts from './FloatingHearts';

const TOTAL_STARS = 8;

const starData = [
  { index: 1, x: 200, y: 60 },
  { index: 2, x: 270, y: 90 },
  { index: 3, x: 320, y: 155 },
  { index: 4, x: 280, y: 220 },
  { index: 5, x: 200, y: 285 },
  { index: 6, x: 120, y: 220 },
  { index: 7, x: 80, y: 155 },
  { index: 8, x: 130, y: 90 },
];

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nextExpected, setNextExpected] = useState(1);
  const [doneStars, setDoneStars] = useState<Set<number>>(new Set());
  const [lines, setLines] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);
  const [messageOpen, setMessageOpen] = useState(false);
  const lastConnectedRef = useRef<{ x: number; y: number } | null>(null);

  // Starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let stars: Array<{ x: number; y: number; r: number; alpha: number; speed: number; dir: number }> = [];

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildStars();
    }

    function buildStars() {
      if (!canvas) return;
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.4 + 0.3,
          alpha: Math.random(),
          speed: Math.random() * 0.008 + 0.002,
          dir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    }

    function drawStars() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.alpha += s.speed * s.dir;
        if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(drawStars);
    }

    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);
    resizeCanvas();
    drawStars();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  const handleStarClick = useCallback((index: number) => {
    if (index !== nextExpected) return;

    const star = starData.find(s => s.index === index)!;
    const { x, y } = star;

    // Draw line from last connected
    if (lastConnectedRef.current) {
      setLines(prev => [...prev, { x1: lastConnectedRef.current!.x, y1: lastConnectedRef.current!.y, x2: x, y2: y }]);
    }

    // Close polygon on last star
    if (index === TOTAL_STARS) {
      const first = starData[0];
      setLines(prev => [...prev, { x1: x, y1: y, x2: first.x, y2: first.y }]);
    }

    setDoneStars(prev => new Set(prev).add(index));
    lastConnectedRef.current = { x, y };
    setNextExpected(prev => prev + 1);

    if (index === TOTAL_STARS) {
      setTimeout(() => setMessageOpen(true), 600);
    }
  }, [nextExpected]);

  const reset = () => {
    setNextExpected(1);
    setDoneStars(new Set());
    setLines([]);
    setMessageOpen(false);
    lastConnectedRef.current = null;
  };

  // Close message with Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMessageOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const getStarClass = (index: number) => {
    const classes = ['const-star'];
    if (doneStars.has(index)) classes.push('done');
    else if (index === nextExpected) classes.push('next');
    return classes.join(' ');
  };

  return (
    <section className="constellation-section" id="constellation-section">
      <canvas ref={canvasRef} className="constellation-section__starfield" aria-hidden="true" />

      <div className="constellation-section__content">
        <div className="constellation-section__header">
          <span className="constellation-section__label">🌌 El universo nos unió</span>
          <h2>Nuestra Constelación</h2>
          <p>Conecta las estrellas en orden para descubrir un mensaje</p>
        </div>

        <div className="constellation-puzzle">
          <svg
            className="constellation-svg"
            viewBox="0 0 400 340"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Puzzle de constelación"
          >
            <g className="const-lines">
              {lines.map((line, i) => (
                <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
              ))}
            </g>
            <g>
              {starData.map(star => (
                <g
                  key={star.index}
                  className={getStarClass(star.index)}
                  onClick={() => handleStarClick(star.index)}
                >
                  <circle cx={star.x} cy={star.y} r={14} className="const-star__hit" />
                  <circle cx={star.x} cy={star.y} r={5} className="const-star__glow" />
                  <circle cx={star.x} cy={star.y} r={3} className="const-star__core" />
                  <text x={star.x} y={star.y - 16} className="const-star__num">{star.index}</text>
                </g>
              ))}
            </g>
          </svg>

          <div className="constellation-progress">
            <span>
              {nextExpected > TOTAL_STARS
                ? '¡Constelación completa! 💜'
                : <>Toca la estrella <strong>{nextExpected}</strong></>
              }
            </span>
          </div>
        </div>

        <button className="constellation-reset" onClick={reset} aria-label="Reiniciar constelación">
          ↺ Reiniciar
        </button>
      </div>

      {/* Constellation message modal */}
      <div
        className={`const-message${messageOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => { if (e.target === e.currentTarget) setMessageOpen(false); }}
      >
        <div className="const-message__inner">
          <div className="const-message__stars" aria-hidden="true">✨ 💜 ✨</div>
          <h3>Lo encontraste</h3>
          <p>
            En todo el universo, con sus millones de estrellas
            y galaxias infinitas, la probabilidad de que
            dos personas se encuentren es casi imposible.
          </p>
          <p>
            Y aun así, aquí estamos.
          </p>
          <p>
            Eso no es suerte. Eso es que el universo
            entero conspiró para que yo te encontrara a ti.
          </p>
          <p className="const-message__signature">
            Y lo volvería a hacer mil veces más. 💜
          </p>
          <button className="const-message__close" onClick={() => setMessageOpen(false)}>
            Cerrar ✕
          </button>
        </div>
      </div>

      <FloatingHearts />
    </section>
  );
}
