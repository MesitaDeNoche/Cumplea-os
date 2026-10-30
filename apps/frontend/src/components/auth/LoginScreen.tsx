'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginScreen() {
  const [code, setCode] = useState(['', '', '', '']);
  const [showUnlock, setShowUnlock] = useState(false);
  const { login, error, rateLimited, rateLimitSeconds, authenticated } = useAuth();
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if already authenticated
  useEffect(() => {
    if (authenticated) router.replace('/dashboard');
  }, [authenticated, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 4 digits entered
    const fullCode = newCode.join('');
    if (fullCode.length === 4 && newCode.every(d => d !== '')) {
      handleSubmit(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      const fullCode = code.join('');
      if (fullCode.length === 4) handleSubmit(fullCode);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted.length === 4) {
      const newCode = pasted.split('');
      setCode(newCode);
      handleSubmit(pasted);
    }
  };

  const handleSubmit = (fullCode: string) => {
    const success = login(fullCode);
    if (success) {
      setShowUnlock(true);
      // Spawn celebration hearts
      spawnHearts();
      setTimeout(() => router.push('/dashboard'), 2000);
    } else {
      // Shake animation
      setCode(['', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  };

  const spawnHearts = () => {
    const emojis = ['💜', '✨', '🤍', '💫', '🎉', '🎂'];
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'unlock-heart';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (Math.random() * 1.5 + 1.2) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
      }, i * 50);
    }
  };

  if (showUnlock) {
    return (
      <div className="login-unlock">
        <div className="login-unlock__content">
          <div className="login-unlock__emoji">🎉</div>
          <h2>¡Bienvenida!</h2>
          <p>Preparando tu sorpresa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login">
      <div className="login__particles" />
      <div className="login__content">
        <div className="login__emoji">💜</div>
        <h1 className="login__title">Un lugar especial</h1>
        <p className="login__subtitle">Ingresa el código secreto para entrar</p>

        <div className="login__code-inputs" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="login__digit"
              aria-label={`Dígito ${i + 1} del código`}
              disabled={rateLimited}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {error && (
          <p className="login__error" role="alert">{error}</p>
        )}

        {rateLimited && (
          <p className="login__rate-limit">
            ⏳ Espera {Math.floor(rateLimitSeconds / 60)}:{String(rateLimitSeconds % 60).padStart(2, '0')}
          </p>
        )}

        <p className="login__hint">Pista: nuestro día y nuestro mes (DDMM) 💜</p>
      </div>
    </div>
  );
}
