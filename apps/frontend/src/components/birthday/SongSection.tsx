import FloatingHearts from './FloatingHearts';

export default function SongSection() {
  return (
    <section className="song-section" id="song-section">
      <div className="song-section__content">
        <div className="song-section__header">
          <span className="song-section__label">🎵 Nuestra canción</span>
          <h2>La canción que nos define</h2>
          <p>
            Cada vez que la escucho pienso en ti.<br />
            Ponla, cierra los ojos, y recuerda que te quiero.
          </p>
        </div>

        <div className="song-section__player">
          <div className="song-section__vinyl" aria-hidden="true">
            <div className="vinyl__disc">
              <div className="vinyl__center">💜</div>
            </div>
          </div>

          <div className="song-section__embed">
            <iframe
              src="https://open.spotify.com/embed/track/4yNk9iz9WVJikRFle3XEvn?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Nuestra canción en Spotify"
            />
          </div>
        </div>
      </div>

      <FloatingHearts />
    </section>
  );
}
