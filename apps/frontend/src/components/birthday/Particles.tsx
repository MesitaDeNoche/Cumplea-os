'use client';

import { useEffect, useRef } from 'react';

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#c084fc', '#a855f7', '#e9d5ff', '#7c3aed', '#ffffff'];
    const count = 35;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');

      const size = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const dur = (Math.random() * 10 + 6).toFixed(1);
      const delay = (Math.random() * 12).toFixed(1);

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        bottom: -10px;
        --dur: ${dur}s;
        --delay: ${delay}s;
        box-shadow: 0 0 ${size * 2}px ${color};
      `;
      container.appendChild(p);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div className="particles" id="particles" ref={containerRef} />;
}
