'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export default function Lockscreen() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: '00', minutes: '00', seconds: '00' });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const isBirthday = useCallback(() => {
    const now = new Date();
    return now.getMonth() === 5 && now.getDate() === 7; // June 7
  }, []);

  const getBirthday = useCallback(() => {
    const now = new Date();
    const target = new Date(now.getFullYear(), 5, 7, 0, 0, 0);
    if (!isBirthday() && now >= target) {
      return new Date(now.getFullYear() + 1, 5, 7, 0, 0, 0);
    }
    return target;
  }, [isBirthday]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const spawnHearts = useCallback(() => {
    const emojis = ['💜', '✨', '🤍', '💫', '💜'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.classList.add('unlock-heart');
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 1.5 + 1.2) + 's';
        el.style.animationDelay = (Math.random() * 0.8) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
      }, i * 60);
    }
  }, []);

  const unlock = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    spawnHearts();
    document.body.classList.remove('locked');
    setIsUnlocked(true);
  }, [spawnHearts]);

  useEffect(() => {
    // Create lockscreen particles
    const container = particlesRef.current;
    if (container) {
      const colors = ['#c084fc', '#a855f7', '#e9d5ff', '#7c3aed', '#ffffff'];
      for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `
          width:${size}px; height:${size}px;
          background:${color};
          left:${Math.random() * 100}%;
          bottom:-10px;
          --dur:${(Math.random() * 10 + 6).toFixed(1)}s;
          --delay:${(Math.random() * 12).toFixed(1)}s;
          box-shadow:0 0 ${size * 2}px ${color};
        `;
        container.appendChild(p);
      }
    }

    if (isBirthday()) {
      unlock();
      return;
    }

    document.body.classList.add('locked');

    const updateCountdown = () => {
      if (isBirthday()) { unlock(); return; }

      const now = new Date();
      const target = getBirthday();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) { unlock(); return; }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    };

    updateCountdown();
    timerRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isBirthday, getBirthday, unlock]);

  const handleUnlock = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    document.body.classList.remove('locked');
    setIsUnlocked(true);
    // Scroll to hero
    setTimeout(() => {
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className={`lockscreen${isUnlocked ? ' unlocked' : ''}`} id="lockscreen">
      <div className="lockscreen__particles" ref={particlesRef} />

      <div className="lockscreen__content">
        <p className="lockscreen__pre">Algo especial se acerca…</p>
        <h1 className="lockscreen__title">💜</h1>

        <div className="lockscreen__countdown">
          <div className="lockscreen__unit">
            <span className="lockscreen__num">{countdown.days}</span>
            <span className="lockscreen__lbl">días</span>
          </div>
          <div className="lockscreen__sep">:</div>
          <div className="lockscreen__unit">
            <span className="lockscreen__num">{countdown.hours}</span>
            <span className="lockscreen__lbl">horas</span>
          </div>
          <div className="lockscreen__sep">:</div>
          <div className="lockscreen__unit">
            <span className="lockscreen__num">{countdown.minutes}</span>
            <span className="lockscreen__lbl">minutos</span>
          </div>
          <div className="lockscreen__sep">:</div>
          <div className="lockscreen__unit">
            <span className="lockscreen__num">{countdown.seconds}</span>
            <span className="lockscreen__lbl">segundos</span>
          </div>
        </div>

        <p className="lockscreen__hint">
          Vuelve el <strong>7 de junio</strong> para ver tu sorpresa 💜
        </p>

        <button className="lockscreen__unlock-btn" onClick={handleUnlock}>
          Ver la página 💜
        </button>
      </div>
    </div>
  );
}
