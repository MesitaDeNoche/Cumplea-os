import FloatingHearts from './FloatingHearts';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <p className="hero__subtitle">Hoy, en tu día especial…</p>
        <h1 className="hero__title">Feliz Cumpleaños,<br /><span className="hero__name">Mi Amor</span></h1>

        <div className="hero__letter">
          <p>
            Hay personas que llegan a tu vida y la cambian para siempre,
            sin avisar, sin pedir permiso, simplemente aparecen y de repente
            el mundo tiene más color, más sentido, más calor.
          </p>
          <p>
            Tú eres esa persona para mí.
          </p>
          <p>
            Cada día a tu lado es un regalo que no merezco pero que cuido
            con todo lo que tengo. Tu risa es mi canción favorita,
            tu mirada es el lugar donde más quiero estar,
            y tu amor es la cosa más bonita que me ha pasado.
          </p>
          <p>
            Hoy celebro el día en que llegaste al mundo,
            porque sin ese día, yo no tendría el mío.
          </p>
          <p className="hero__letter-signature">Con todo mi amor, siempre. 💜</p>
        </div>

        <a href="#carousel-section" className="hero__cta">Ver nuestros momentos ↓</a>
      </div>

      <FloatingHearts />
    </section>
  );
}
