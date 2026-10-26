import FloatingHearts from './FloatingHearts';

export default function Closing() {
  return (
    <section className="closing">
      <div className="closing__content">
        <div className="closing__heart">💜</div>
        <h2>Feliz Cumpleaños</h2>
        <p>
          Que este año que comienza esté lleno de todo lo que mereces:
          alegría, paz, amor y todos tus sueños cumplidos.
          Yo estaré aquí, a tu lado, en cada paso.
        </p>
        <p className="closing__forever">Para siempre tuyo 💜</p>
      </div>

      <FloatingHearts />
    </section>
  );
}
