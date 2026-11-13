'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type RoomType = 'pregunta' | 'acrónico' | 'acertijo' | 'reveal' | 'codigo';

interface Room {
  id: number;
  type: RoomType;
  badge: string;
  question: string;
  /** Solo para tipo 'acrónico': el párrafo cifrado */
  cipher?: string;
  /** Solo para tipo 'acertijo': emoji decorativo */
  riddleIcon?: string;
  /** Respuestas válidas (normalizadas a minúsculas sin tildes opcionales) */
  validAnswers: string[];
  hints: [string, string, string];
}

// ─────────────────────────────────────────────
// Rooms data
// ─────────────────────────────────────────────
const ROOMS: Room[] = [
  {
    id: 1,
    type: 'pregunta',
    badge: 'Sala 1 · Pregunta',
    question: '¿En qué fecha especial nos conocimos?',
    validAnswers: ['7 de diciembre', '07 de diciembre', '7/12', '07/12'],
    hints: [
      'Tiene que ver con una fecha muy especial de diciembre 🗓️',
      'Es el mismo día en que naciste',
      'Es el 7 de diciembre, día de velitas 🕯️',
    ],
  },
  {
    id: 2,
    type: 'acrónico',
    badge: 'Sala 2 · Mensaje cifrado',
    question:
      'Este párrafo esconde un mensaje. Toma la primera letra de cada palabra y descúbrelo.',
    cipher:
      'Tus emociones persisten, insistiendo en nuestros secretos, ocultos, mis universos, construyendo historias, olvidadas.',
    validAnswers: ['te pienso mucho'],
    hints: [
      'Toma solo la primera letra de cada palabra del párrafo 🔤',
      'Son 3 palabras y empieza por "Te..."',
      'La frase es: "Te ___ mucho" — ¿qué verbo falta?',
    ],
  },
  {
    id: 3,
    type: 'acrónico',
    badge: 'Sala 3 · Mensaje cifrado',
    question:
      'Mismo truco que antes. Primera letra de cada palabra. ¿Qué dice este párrafo?',
    cipher:
      'Tus emociones alcanzan momentos oscuros, más allá siempre.',
    validAnswers: ['te amo mas', 'te amo más'],
    hints: [
      'Primera letra de cada palabra, igual que antes 🔤',
      'Son 3 palabras muy especiales',
      'Empieza igual que la anterior pero termina diferente: "Te amo ___"',
    ],
  },
  {
    id: 4,
    type: 'reveal',
    badge: 'Sala 4 · Revelación',
    question: '',
    validAnswers: [],
    hints: ['', '', ''],
  },
  {
    id: 5,
    type: 'pregunta',
    badge: 'Sala 5 · Pregunta',
    question:
      '¿Qué frase dije en tu casa que nos causó mucha risa? 💡 Pista: canción / Leandro',
    validAnswers: [
      'como que leandro saco una cancion',
      'como que leandro sacó una canción',
      'como que leandro saco cancion',
      'como que leandro sacó canción',
    ],
    hints: [
      'Tiene que ver con un artista que se llama Leandro 🎤',
      'Es una frase de sorpresa, como si no lo pudieras creer',
      'Empieza con "Como que Leandro sacó..."',
    ],
  },
  {
    id: 6,
    type: 'acertijo',
    badge: 'Sala 6 · Acertijo',
    riddleIcon: '🏰',
    question:
      'Soy una película de Studio Ghibli. Vivo en un castillo que camina y viaja por el mundo. ¿Cómo me llamo?',
    validAnswers: [
      'el increible castillo vagabundo',
      'el increíble castillo vagabundo',
      'castillo vagabundo',
      'howl',
      'howls moving castle',
    ],
    hints: [
      'Es una película japonesa de animación muy famosa 🎌',
      'El castillo en el título tiene un adjetivo que significa "asombroso"',
      'Se llama "El increíble..." 🏰',
    ],
  },
  {
    id: 7,
    type: 'acertijo',
    badge: 'Sala 7 · Acertijo',
    riddleIcon: '🎵',
    question:
      'Soy una canción. Mi nombre en español significa "el tiempo dorado". Mi artista es JVKE. ¿Cómo me llamo?',
    validAnswers: ['golden time'],
    hints: [
      'Es en inglés, solo dos palabras 🎧',
      'La primera palabra tiene que ver con el color del oro ✨',
      'Es "Golden ___" 🌟',
    ],
  },
  {
    id: 8,
    type: 'pregunta',
    badge: 'Sala 8 · Racha · 1/3',
    question: '¿Cómo te llamaba yo cariñosamente?',
    validAnswers: ['mamor', 'maramor', 'morcilla'],
    hints: [
      'Era un apodo especial, solo tuyo 💜',
      'Empieza con "Ma..."',
      'Era algo como "Ma_or" o "Morcilla" 💜',
    ],
  },
  {
    id: 9,
    type: 'pregunta',
    badge: 'Sala 9 · Racha · 2/3',
    question: '¿Cuánto tiempo duramos juntos?',
    validAnswers: ['3 años y 6 meses', 'tres años y seis meses', '3 años y medio'],
    hints: [
      'Fueron más de 2 años 💜',
      'Fue un número impar de años y algunos meses más',
      'Fueron 3 años y... ¿cuántos meses? (6)',
    ],
  },
  {
    id: 10,
    type: 'pregunta',
    badge: 'Sala 10 · Racha · 3/3',
    question: '¿Qué celebración colombiana coincide con el día que nos conocimos?',
    validAnswers: ['velitas', 'dia de velitas', 'día de velitas', 'noche de velitas'],
    hints: [
      'Es una celebración típica de Colombia en diciembre 🇨🇴',
      'Se celebra el 7 de diciembre con luces',
      'Se encienden ___ en la noche 🕯️',
    ],
  },
  {
    id: 11,
    type: 'codigo',
    badge: 'Sala Final · Caja Fuerte',
    question: 'Ingresa el código. Son los números que más usamos los dos.',
    validAnswers: ['07122022'],
    hints: [
      'Son 8 dígitos 🔢',
      'Tiene que ver con la fecha en que nos conocimos 📅',
      'Es la fecha 07/12/2022 sin separadores',
    ],
  },
];

const TOTAL_ROOMS = ROOMS.length; // 11 (incluye sala final)

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function normalize(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/\s+/g, ' ');
}

function checkAnswer(input: string, validAnswers: string[]): boolean {
  const norm = normalize(input);
  return validAnswers.some((a) => normalize(a) === norm);
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function EscapeRoomPage() {
  const [roomIndex, setRoomIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [inputState, setInputState] = useState<'idle' | 'error' | 'success'>('idle');
  const [feedback, setFeedback] = useState('');
  const [completed, setCompleted] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // For código room
  const [codeDigits, setCodeDigits] = useState<string[]>(Array(8).fill(''));
  const [codeState, setCodeState] = useState<'idle' | 'error' | 'success'>('idle');
  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);

  const room = ROOMS[roomIndex];
  // Progress: out of total rooms (rooms 1-11), sala 4 (reveal) counts too
  const progressPct = Math.round((roomIndex / TOTAL_ROOMS) * 100);

  // Reset per-room state when room changes
  useEffect(() => {
    setAnswer('');
    setAttempts(0);
    setHintsShown(0);
    setInputState('idle');
    setFeedback('');
    setCodeDigits(Array(8).fill(''));
    setCodeState('idle');
  }, [roomIndex]);

  // ── Advance to next room ──
  const advance = useCallback(() => {
    setInputState('success');
    setFeedback('¡Correcto! 🎉');
    setTimeout(() => {
      if (roomIndex + 1 >= TOTAL_ROOMS) {
        // All rooms done — show final screen with hearts
        setShowHearts(true);
        setCompleted(true);
      } else {
        setRoomIndex((i) => i + 1);
      }
    }, 900);
  }, [roomIndex]);

  // ── Handle text answer submit ──
  const handleSubmit = useCallback(() => {
    if (!answer.trim()) return;

    if (checkAnswer(answer, room.validAnswers)) {
      advance();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setInputState('error');
      setFeedback('No es eso... inténtalo de nuevo 💜');

      // Show next hint after each failed attempt (max 3)
      if (newAttempts <= 3) {
        setHintsShown(Math.min(newAttempts, 3));
      }

      // Reset error state after animation
      setTimeout(() => setInputState('idle'), 600);
    }
  }, [answer, attempts, room, advance]);

  // ── Handle Enter key ──
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  // ── Handle code digit input ──
  const handleDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...codeDigits];
    next[index] = digit;
    setCodeDigits(next);
    setCodeState('idle');

    if (digit && index < 7) {
      digitRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      digitRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') handleCodeSubmit();
  };

  const handleCodeSubmit = useCallback(() => {
    const code = codeDigits.join('');
    if (code.length < 8) return;

    if (checkAnswer(code, room.validAnswers)) {
      setCodeState('success');
      setFeedback('¡Código correcto! 🔓');
      setTimeout(() => {
        setShowHearts(true);
        setCompleted(true);
      }, 900);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setCodeState('error');
      setFeedback('Código incorrecto... inténtalo de nuevo 💜');
      if (newAttempts <= 3) setHintsShown(Math.min(newAttempts, 3));
      setTimeout(() => setCodeState('idle'), 600);
    }
  }, [codeDigits, attempts, room]);

  // ── Floating hearts for final screen ──
  useEffect(() => {
    if (!showHearts) return;
    const hearts = ['💜', '✨', '🌟', '💫', '🎉', '💜', '✨'];
    hearts.forEach((h, i) => {
      setTimeout(() => {
        const el = document.createElement('span');
        el.className = 'escape-heart';
        el.textContent = h;
        el.style.left = `${Math.random() * 90 + 5}%`;
        el.style.animationDelay = `${Math.random() * 0.5}s`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
      }, i * 180);
    });
  }, [showHearts]);

  // ─────────────────────────────────────────────
  // FINAL SCREEN
  // ─────────────────────────────────────────────
  if (completed) {
    return (
      <ProtectedRoute>
        <Navigation />
        <div className="app-page">
          <div className="escape-room">
            <div className="escape-room__final">
              <div className="escape-room__final-header">
                <span className="escape-room__final-icon">🎉</span>
                <h1 className="escape-room__final-title">¡Lo lograste!</h1>
                <p className="escape-room__final-sub">
                  Completaste todas las salas. Te lo mereces 💜
                </p>
              </div>

              {/* ── CARTA FINAL ── */}
              <div className="escape-room__letter">
                <span className="escape-room__letter-label">Una carta para ti</span>
                <div className="escape-room__letter-text">
                  {/*
                   * ════════════════════════════════════════════
                   * TEXTO DE LA CARTA — rellena aquí tu mensaje
                   * Ejemplo:
                   *   <p>Carolina, si estás leyendo esto es porque...</p>
                   *   <p>Siempre te voy a querer. — André</p>
                   * ════════════════════════════════════════════
                   */}
                  <p style={{ color: 'rgba(192,132,252,0.5)', fontStyle: 'italic' }}>
                    ✍️ Carta en preparación... muy pronto estará aquí.
                  </p>
                </div>
              </div>

              {/* ── CLAVE DE /prohibido ── */}
              <div className="escape-room__key-box">
                <span className="escape-room__key-label">Tu clave para la zona prohibida 🚫</span>
                <span className="escape-room__key-value">07122022</span>
                <span className="escape-room__key-hint">
                  Úsala en la sección &ldquo;Prohibido&rdquo; del menú
                </span>
              </div>

              <Link href="/prohibido" className="escape-room__final-link">
                🚫 Ir a la zona prohibida
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ─────────────────────────────────────────────
  // REVEAL ROOM (Sala 4)
  // ─────────────────────────────────────────────
  if (room.type === 'reveal') {
    return (
      <ProtectedRoute>
        <Navigation />
        <div className="app-page">
          <div className="escape-room">
            <Link href="/dashboard" className="escape-room__back">← Volver al Dashboard</Link>

            <div className="escape-room__header">
              <span className="escape-room__header-icon">🔐</span>
              <h1>Escape Room</h1>
              <p>Un juego de preguntas sobre nosotros</p>
            </div>

            <div className="escape-room__progress">
              <div className="escape-room__progress-label">
                <span>Sala 4 de {TOTAL_ROOMS}</span>
                <span>{progressPct}%</span>
              </div>
              <div className="escape-room__progress-bar">
                <div className="escape-room__progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <div className="escape-room__card">
              <span className="escape-room__badge">🔓 Sala 4 · Revelación</span>
              <div className="escape-room__reveal">
                <p className="escape-room__reveal-label">Las dos frases que descubriste forman esto:</p>
                <p className="escape-room__reveal-phrase">Te pienso mucho, te amo más 💜</p>
                <p className="escape-room__reveal-sub">Y eso nunca va a cambiar.</p>
                <button className="escape-room__reveal-btn" onClick={() => setRoomIndex(4)}>
                  Continuar →
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ─────────────────────────────────────────────
  // CODE ROOM (Sala final)
  // ─────────────────────────────────────────────
  if (room.type === 'codigo') {
    return (
      <ProtectedRoute>
        <Navigation />
        <div className="app-page">
          <div className="escape-room">
            <Link href="/dashboard" className="escape-room__back">← Volver al Dashboard</Link>

            <div className="escape-room__header">
              <span className="escape-room__header-icon">🔐</span>
              <h1>Escape Room</h1>
              <p>Un juego de preguntas sobre nosotros</p>
            </div>

            <div className="escape-room__progress">
              <div className="escape-room__progress-label">
                <span>Sala final de {TOTAL_ROOMS}</span>
                <span>¡Ya casi! 🎉</span>
              </div>
              <div className="escape-room__progress-bar">
                <div className="escape-room__progress-fill" style={{ width: '95%' }} />
              </div>
            </div>

            <div className="escape-room__card">
              <span className="escape-room__badge">🔒 {room.badge}</span>

              <p className="escape-room__question">{room.question}</p>

              <div className="escape-room__code-wrap">
                {codeDigits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { digitRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleDigit(i, e.target.value)}
                    onKeyDown={(e) => handleDigitKeyDown(i, e)}
                    className={`escape-room__code-digit${
                      codeState === 'error' ? ' escape-room__code-digit--error' : ''
                    }${codeState === 'success' ? ' escape-room__code-digit--success' : ''}`}
                    aria-label={`Dígito ${i + 1} del código`}
                  />
                ))}
              </div>

              {feedback && (
                <p className={`escape-room__feedback escape-room__feedback--${codeState === 'success' ? 'success' : 'error'}`}>
                  {feedback}
                </p>
              )}

              <button className="escape-room__submit" onClick={handleCodeSubmit}>
                Desbloquear 🔓
              </button>

              {/* Pistas progresivas */}
              {hintsShown > 0 && (
                <div className="escape-room__hints">
                  {room.hints.slice(0, hintsShown).map((hint, i) => (
                    <div key={i} className="escape-room__hint">
                      <span className="escape-room__hint-icon">💡</span>
                      <span className="escape-room__hint-text">{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // ─────────────────────────────────────────────
  // STANDARD ROOMS (pregunta, acrónico, acertijo)
  // ─────────────────────────────────────────────
  return (
    <ProtectedRoute>
      <Navigation />
      <div className="app-page">
        <div className="escape-room">
          <Link href="/dashboard" className="escape-room__back">← Volver al Dashboard</Link>

          <div className="escape-room__header">
            <span className="escape-room__header-icon">🔐</span>
            <h1>Escape Room</h1>
            <p>Un juego de preguntas sobre nosotros</p>
          </div>

          <div className="escape-room__progress">
            <div className="escape-room__progress-label">
              <span>
                Sala {room.id} de {TOTAL_ROOMS}
              </span>
              <span>{progressPct}%</span>
            </div>
            <div className="escape-room__progress-bar">
              <div
                className="escape-room__progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="escape-room__card" key={roomIndex}>
            <span className="escape-room__badge">🔑 {room.badge}</span>

            {/* Riddle icon */}
            {room.type === 'acertijo' && room.riddleIcon && (
              <span className="escape-room__riddle-icon">{room.riddleIcon}</span>
            )}

            {/* Question */}
            <p className="escape-room__question">{room.question}</p>

            {/* Cipher paragraph */}
            {room.type === 'acrónico' && room.cipher && (
              <div className="escape-room__cipher">
                <em>&ldquo;{room.cipher}&rdquo;</em>
                <span className="escape-room__cipher-hint">
                  💡 Primera letra de cada palabra
                </span>
              </div>
            )}

            {/* Answer input */}
            <div className="escape-room__input-wrap">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu respuesta..."
                className={`escape-room__input${
                  inputState === 'error' ? ' escape-room__input--error' : ''
                }${inputState === 'success' ? ' escape-room__input--success' : ''}`}
                aria-label="Respuesta"
                autoComplete="off"
              />
              <button
                className="escape-room__submit"
                onClick={handleSubmit}
                disabled={inputState === 'success'}
              >
                Comprobar ✓
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <p
                className={`escape-room__feedback escape-room__feedback--${
                  inputState === 'success' ? 'success' : 'error'
                }`}
              >
                {feedback}
              </p>
            )}

            {/* Pistas progresivas */}
            {hintsShown > 0 && (
              <div className="escape-room__hints">
                {room.hints.slice(0, hintsShown).map((hint, i) => (
                  <div key={i} className="escape-room__hint">
                    <span className="escape-room__hint-icon">💡</span>
                    <span className="escape-room__hint-text">{hint}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
