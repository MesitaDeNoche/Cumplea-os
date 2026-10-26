import FloatingHearts from './FloatingHearts';

export default function Reminders() {
  return (
    <section className="reminders-section" id="reminders-section">
      <div className="reminders-section__content">
        <div className="reminders-section__header">
          <span className="reminders-section__label">✨ Pequeñas cosas</span>
          <h2>Cosas que me recuerdan a ti</h2>
          <p>No hace falta que estés presente para sentirte cerca</p>
        </div>

        <div className="reminders-grid">
          <div className="reminder-card">
            <div className="reminder-card__icon reminder-card__icon--img reminder-card__icon--cro">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/cro-logo.png" alt="Logo de Cro" className="reminder-card__logo reminder-card__logo--cro" />
            </div>
            <h3>CRO</h3>
            <p>Cada vez que veo este logo o escucho una de sus canciones pienso en ti, porque se lo mucho que te gusta.</p>
          </div>

          <div className="reminder-card">
            <div className="reminder-card__icon reminder-card__icon--img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/bts-logo.png" alt="Logo de BTS" className="reminder-card__logo" />
            </div>
            <h3>BTS</h3>
            <p>Cada canción, cada video, cada detalle de ellos me recuerda a ti y a todo lo que los amas.</p>
          </div>

          <div className="reminder-card">
            <div className="reminder-card__icon reminder-card__icon--img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/golden-logo.jpg" alt="Logo de golden" className="reminder-card__logo" />
            </div>
            <h3>Nuestra canción</h3>
            <p>Cuando suena en cualquier lugar, el mundo se detiene un segundo y solo existes tú.</p>
          </div>

          <div className="reminder-card">
            <div className="reminder-card__icon">💜</div>
            <h3>El color morado</h3>
            <p>Desde que te conozco, el morado dejó de ser un color y se convirtió en ti.</p>
          </div>

          <div className="reminder-card">
            <div className="reminder-card__icon reminder-card__icon--img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/snoopy-logo.png" alt="Logo de Snoopy" className="reminder-card__logo" />
            </div>
            <h3>Snoopy</h3>
            <p>Cada vez que veo a un Snoopy eres lo primero que se me viene a la mente, sin importar que Snoopy sea siempre te veo a ti.</p>
          </div>

          <div className="reminder-card">
            <div className="reminder-card__icon reminder-card__icon--img">
              <svg className="reminder-card__logo reminder-card__svg-tulip" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M50 130 Q50 85 50 70" stroke="#a855f7" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <path d="M50 95 Q30 80 28 60 Q42 72 50 85" fill="#c084fc" opacity="0.85"/>
                <path d="M50 95 Q70 80 72 60 Q58 72 50 85" fill="#c084fc" opacity="0.85"/>
                <path d="M50 70 Q22 60 20 30 Q35 45 50 55" fill="#e9d5ff"/>
                <path d="M50 70 Q78 60 80 30 Q65 45 50 55" fill="#e9d5ff"/>
                <path d="M50 68 Q30 55 32 20 Q44 38 50 52" fill="#c084fc"/>
                <path d="M50 68 Q70 55 68 20 Q56 38 50 52" fill="#c084fc"/>
                <path d="M50 68 Q40 45 50 10 Q60 45 50 68" fill="#a855f7"/>
              </svg>
            </div>
            <h3>Los tulipanes</h3>
            <p>Cada vez que veo un tulipán pienso en ti, en tu delicadeza y en lo bonita que eres.</p>
          </div>

          <div className="reminder-card">
            <div className="reminder-card__icon reminder-card__icon--img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/zenitsu-logo.jpg" alt="Logo de zenitsu" className="reminder-card__logo" />
            </div>
            <h3>Zenitsu</h3>
            <p>Cada vez que veo este personaje te recuerdo, porque te parecer mucho a el y ademas es tu favorito.</p>
          </div>

          <div className="reminder-card">
            <div className="reminder-card__icon reminder-card__icon--img">
              <svg className="reminder-card__logo reminder-card__svg-lasagna" viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="8" y="70" width="104" height="14" rx="5" fill="#7c3aed"/>
                <rect x="4" y="74" width="112" height="6" rx="3" fill="#6d28d9"/>
                <rect x="14" y="58" width="92" height="10" rx="3" fill="#e9d5ff"/>
                <rect x="14" y="50" width="92" height="9" rx="2" fill="#c084fc"/>
                <path d="M14 54 Q28 50 42 54 Q56 58 70 54 Q84 50 106 54" stroke="#a855f7" strokeWidth="1.5" fill="none"/>
                <rect x="14" y="41" width="92" height="10" rx="3" fill="#e9d5ff"/>
                <rect x="14" y="33" width="92" height="9" rx="2" fill="#c084fc"/>
                <path d="M14 37 Q28 33 42 37 Q56 41 70 37 Q84 33 106 37" stroke="#a855f7" strokeWidth="1.5" fill="none"/>
                <rect x="14" y="24" width="92" height="10" rx="3" fill="#f3e8ff"/>
                <rect x="14" y="15" width="92" height="10" rx="4" fill="#fde68a"/>
                <ellipse cx="35" cy="18" rx="8" ry="5" fill="#fbbf24" opacity="0.7"/>
                <ellipse cx="60" cy="17" rx="10" ry="5" fill="#fbbf24" opacity="0.6"/>
                <ellipse cx="85" cy="19" rx="7" ry="4" fill="#fbbf24" opacity="0.7"/>
                <path d="M20 15 Q40 10 60 13 Q80 16 100 12" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>La lasaña</h3>
            <p>Honestamente, muchas comidas ricas me recuerdan a ti pero especialmente la lasaña.</p>
          </div>
        </div>
      </div>

      <FloatingHearts />
    </section>
  );
}
