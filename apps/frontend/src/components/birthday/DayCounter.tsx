'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import FloatingHearts from './FloatingHearts';

const START_DATE = new Date('2022-12-07T00:00:00');

function calculate() {
  const now = new Date();
  const diffMs = now.getTime() - START_DATE.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let y = now.getFullYear() - START_DATE.getFullYear();
  let m = now.getMonth() - START_DATE.getMonth();
  let d = now.getDate() - START_DATE.getDate();

  if (d < 0) {
    m--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    d += prevMonth.getDate();
  }
  if (m < 0) { y--; m += 12; }

  return { totalDays, y, m, d };
}

export default function DayCounter() {
  const [values, setValues] = useState({ totalDays: 0, y: 0, m: 0, d: 0 });
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const displayRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});

  const animateNumber = useCallback((el: HTMLSpanElement, target: number, duration: number) => {
    const start = performance.now();
    const update = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.floor(target * eased));
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = String(target);
    };
    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          const v = calculate();
          setValues(v);

          if (displayRefs.current.totalDays) animateNumber(displayRefs.current.totalDays, v.totalDays, 2000);
          if (displayRefs.current.years) animateNumber(displayRefs.current.years, v.y, 1200);
          if (displayRefs.current.months) animateNumber(displayRefs.current.months, v.m, 1400);
          if (displayRefs.current.days) animateNumber(displayRefs.current.days, v.d, 1600);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [animated, animateNumber]);

  return (
    <section className="counter-section" id="counter-section" ref={sectionRef}>
      <div className="counter-section__content">
        <div className="counter-section__header">
          <span className="counter-section__label">💜 Desde aquel día</span>
          <h2>Llevamos juntos</h2>
        </div>

        <div className="counter-section__days-wrap">
          <span
            className="counter-section__days"
            ref={el => { displayRefs.current.totalDays = el; }}
          >
            0
          </span>
          <span className="counter-section__days-label">días</span>
        </div>

        <div className="counter-section__breakdown">
          <div className="counter-breakdown__item">
            <span className="counter-breakdown__num" ref={el => { displayRefs.current.years = el; }}>0</span>
            <span className="counter-breakdown__lbl">años</span>
          </div>
          <div className="counter-breakdown__sep">·</div>
          <div className="counter-breakdown__item">
            <span className="counter-breakdown__num" ref={el => { displayRefs.current.months = el; }}>0</span>
            <span className="counter-breakdown__lbl">meses</span>
          </div>
          <div className="counter-breakdown__sep">·</div>
          <div className="counter-breakdown__item">
            <span className="counter-breakdown__num" ref={el => { displayRefs.current.days = el; }}>0</span>
            <span className="counter-breakdown__lbl">días</span>
          </div>
        </div>

        <p className="counter-section__since">
          Desde el <strong>7 de diciembre de 2022</strong>{' '}
          soy el hombre más feliz del mundo ✨
        </p>
      </div>

      <FloatingHearts />
    </section>
  );
}
