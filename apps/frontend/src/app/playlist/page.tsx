'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navigation from '@/components/layout/Navigation';
import Link from 'next/link';
import { useState } from 'react';

interface Song {
  id: string;
  titulo: string;
  artista: string;
  contenido: string;
  portada: string;
  spotifyUrl: string;
}

const songs: Song[] = [
  {
    id: '1',
    titulo: 'INAROW62.',
    artista: 'Álvaro Díaz',
    contenido: 'Esta canción me recuerda mucho a ti, porque a pesar de todos los problemas, malas actitudes, malos tratos y cagadas que he cometido, tú siempre estuviste y estás a mi lado, siendo un pilar de mi vida a pesar que ya no estás en ella, por eso y todo te quiero dar las gracias por existir y apoyarme siempre.',
    portada: '/images/playlist-covers/OMAKASE.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/5Yhti6baaZnDyzehjTuAwZ'
  },
  {
    id: '2',
    titulo: 'El Último Baile',
    artista: 'Álvaro Díaz',
    contenido: 'A pesar de ser melancólica, como dice la canción, contigo era perfecto todo lo imperfecto, siempre fuiste, eres y serás esa persona que me hacía sacar mi máximo potencial y que me hacía ver que todo lo que hacía valía la pena, básicamente que dentro de toda mi imperfección, había algo de perfección, por eso te sigo amando.',
    portada: '/images/playlist-covers/DIAZANTES.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/26KjVtX8XoJ4XFP5On8T1o'
  },
  {
    id: '3',
    titulo: 'YOKO',
    artista: 'Álvaro Díaz',
    contenido: 'Esta canción me recuerda bastante a ti porque para nadie es un secreto, simplemente tú me tienes loco y si por mi fuera y hubiera sido, te hubiera quedado a mi ladito para toda la vida, porque prefiero tus labios y tus besos sobre cualquier premio, como lo dice la canción.',
    portada: '/images/playlist-covers/SAYONARA.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/5JHB8QusYhTWdRw2KJekj6?si=ccc1bd2f512148ec'
  },
  {
    id: '4',
    titulo: 'MAMI 100PRE SABE (INTERLUDE)',
    artista: 'Álvaro Díaz',
    contenido: 'Ni que hablar de esta canción, siempre que suena me dan ganas de llorar, porque mami siempre sabe y sabrá que tú eras la niña de mis ojos y de mi vida, por eso siempre me pregunta por ti, porque sabe que me importas mucho y siempre quiero que estés bien.',
    portada: '/images/playlist-covers/SAYONARA.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/62n1ZpeGX7aM7hqC4NcBsJ?si=013d456571fe4221'
  },
  {
    id: '5',
    titulo: 'QUIÉN TE QUIERE COMO EL NENE',
    artista: 'Álvaro Díaz',
    contenido: 'Simplemente, quién te quiere como el nene?, porque a pesar de mis malos tratos y mis malas actitudes algunas veces, siempre me importó que estuvieras bien, siempre traté de darlo todo por ti, ser mejor y dar lo mejor por ti, por eso esta canción me hace pensar tanto en ti.',
    portada: '/images/playlist-covers/SAYONARA.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/0TaouwmpWakN1nTULu0aAK?si=13a7a0de7c924fa8'
  },
  {
    id: '6',
    titulo: 'Shh',
    artista: 'Álvaro Díaz',
    contenido: 'La canción habla sobre soltar a alguien pero no querer ni poder hacerlo, me representa, porque aunque se que ya es hora de soltar lo que eramos y proyecar nuevamente todo no soy capaz, simplemente no puedo hacerlo, por eso me represento con la frase que dice "Dice que adelante vive más gente, pero el corazón grita detente" porque mi corazón aun no te olvida.',
    portada: '/images/playlist-covers/Felicilandia.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/2FoUIyGK8ddv0LQQWrd5Ie?si=531864e6de7d4161'
  },
  {
    id: '7',
    titulo: 'JPN',
    artista: 'Álvaro Díaz',
    contenido: 'Hoy tengo ganas de extrañarte y de pensarte, eso es lo que me sucede todos los días cuando me levanto, tambien hoy tengo ganas de contarte cosas, ese pensamiento se me pasa por la cabeza cando me sucede algo y quisiera decirtelo pero no puedo, además esta canción me recuerda a tí, porque yo TE QUERIA FOR LIFE.',
    portada: '/images/playlist-covers/SAYONARA_FA.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/7a66e0TSXh1fKpSCLDQvUa?si=b84caa36143840ee'
  },
  {
    id: '8',
    titulo: 'Boleritoxx',
    artista: 'Feid',
    contenido: 'Esta canción me hace pensar bastante en ti porque es un mood tranquilo y me hace recordar a la calma que me daba estar a tu lado, pero cuando te fuiste esa calma se perdio un poco, además porque yo siempre como un ángel te queria cuidar y protegerte siempre pero no pude conseguirlo',
    portada: '/images/playlist-covers/green.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/0WaiS952DEP6HoR3Yal7aT?si=5a21c1af999a4972'
  },
  {
    id: '9',
    titulo: 'Ama de mi sol',
    artista: 'Milo J',
    contenido: 'Esta canción la elegí porque a pesar de ya no ser esa persona que está a mi lado como pareja, yo te sigo considerando parte de mi y la dueña de mi sol y mi corazón y ese puesto va a ser irremplazable, nadie más podrá dominar ese lugar al que llegaste tú',
    portada: '/images/playlist-covers/la vida.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/4GKm1QaEr1tqJwUM0EsUl3?si=de33c63c66524a6a'
  },
  {
    id: '10',
    titulo: 'Morfeo',
    artista: 'WOS',
    contenido: 'Esta cancion me hace pensar en tí porque a pesar de que eramos una rutina, me di cuenta que muchas veces esas ritunas me hacian feliz, me alegraban la vida y me hacen sentir en casa, porque hay rutinas que aplacan pero la rutina a tu lado, me salvaba la vida',
    portada: '/images/playlist-covers/morfeo.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/44fsHeGMWo6WgucLYeyONa?si=344c8cb5755f4ea3'
  },
  {
    id: '11',
    titulo: 'ARRANCÁRMELO',
    artista: 'WOS',
    contenido: 'Esta cancion a pesar de ser demasiado triste me hace pensar en todos los momentos que pasamos juntos, cuando te reías y me sacabas una sonrisa a mi, porque me hace feliz verte feliz y ver tu cara de felicidad era el mayor placer para mi alma',
    portada: '/images/playlist-covers/Arrancarmelo.jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/2GNjjWYymmIS8HEC4Xp2eu?si=71d92b96340748e4'
  },
  {
    id:'12',
    titulo:'Melon Vino',
    artista:'WOS',
    contenido:'Como ultima canción de WOS decidí poner esta, es obvio porque la puse, es la canción que más me hace acordarme de tí, de todo lo que vivimos y esta canción siempre será tuya sin importante que pase o quien llegue a mi vida',
    portada:'/images/playlist-covers/melonvino.jpg',
    spotifyUrl:'https://open.spotify.com/intl-es/track/5uHAzGa4d9j35DEbhUwGhi?si=79d38b5be0e34f8c' 
  },
  {
    id:'13',
    titulo:'esperando que vuelvas',
    artista:'Marc Seguí',
    contenido:'Esta canción la descubri curiosamente cuando te fuiste, es una canción que marco todos estos meses y siempre la esuccho cuando estoy perdiendo la esperanza de que vas a regresar, esta canción me hace pensar que hay una posibilidad pequeña de que vuelvas y cuando eso pase, no volve a dejar que te vayas, no volvere a perderte',
    portada:'/images/playlist-covers/nada.jpg',
    spotifyUrl:'https://open.spotify.com/intl-es/track/7hOpmWDACdtAeuksK2BseS?si=02704a2f65b047b3'
  },
  {
    id:'14',
    titulo:'Con Los Dos En La Cabeza',
    artista:'Pedro Guerra, Cruzzi',
    contenido:'Obviamente esta canción no podía faltar, siempre sin importar que hice las cosas con los dos en la cabeza, habia algunas situaciones donde mi ego fue más grande y me arrepiento totalmente de eso, pero siempre para mi fuiste primero aunque no lo creas y aunque muchas veces no se notara',
    portada:'/images/playlist-covers/cruzzi.jpg',
    spotifyUrl:'https://open.spotify.com/intl-es/track/4hmXvsOKB49B0hcOfMXVAi?si=ade0512fe43a4ce2'
  },
  {
    id: '15',
    titulo: 'como olvidar?',
    artista: 'Rels B',
    contenido: 'Literalmente el nombre de la canción lo dice todo, "Como olvidar?", porque no puedo olvidar nuestros recuerdos, nuestros bonitos y malos momentos, nuestras risas, cenas, momentos íntimos, todo, porque todos mis recuerdos son contigo y tú eres luz en mi oscuridad.',
    portada: '/images/playlist-covers/fill de la mar (2026).jpg',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/7hsrIlRNeYsPTc1gr1DGbO'
  },
];

export default function PlaylistPage() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="app-page playlist-page">
        <div className="playlist-container">
          <Link href="/dashboard" className="playlist-page__back">← Volver al Dashboard</Link>
          
          <div className="playlist-header">
            <h1 className="playlist-header__title">🎵 Canciones que me recuerdan a ti</h1>
            <p className="playlist-header__subtitle">
              Cada canción tiene un momento especial y un mensaje para ti
            </p>
          </div>

          {/* Song Grid */}
          <div className="playlist-grid">
            {songs.map((song) => (
              <div 
                key={song.id}
                className="song-card"
                onClick={() => setSelectedSong(song)}
              >
                <div className="song-card__cover">
                  <img
                    src={song.portada} 
                    alt={`${song.titulo} - ${song.artista}`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.song-card__cover-fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'song-card__cover-fallback';
                        fallback.innerHTML = '<span class="song-card__cover-icon">🎵</span>';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  <div className="song-card__overlay">
                    <span className="song-card__view-btn">Ver mensaje 💜</span>
                  </div>
                </div>
                <div className="song-card__info">
                  <h3 className="song-card__title">{song.titulo}</h3>
                  <p className="song-card__artist">{song.artista}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Próximamente */}
          <div className="playlist-coming-soon">
            <span className="playlist-coming-soon__icon">🎶</span>
            <p className="playlist-coming-soon__text">
              Próximamente más canciones...
            </p>
            <p className="playlist-coming-soon__sub">
              Son demasiadas y cada una merece su momento 💜
            </p>
          </div>

          {/* Modal with song details */}
          {selectedSong && (
            <div className="song-modal" onClick={() => setSelectedSong(null)}>
              <div className="song-modal__content" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="song-modal__close"
                  onClick={() => setSelectedSong(null)}
                >
                  ✕
                </button>
                
                <div className="song-modal__cover">
                  <img 
                    src={selectedSong.portada} 
                    alt={`${selectedSong.titulo} - ${selectedSong.artista}`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.song-modal__cover-fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'song-modal__cover-fallback';
                        fallback.innerHTML = '<span class="song-modal__cover-icon">🎵</span>';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>

                <div className="song-modal__info">
                  <h2 className="song-modal__title">{selectedSong.titulo}</h2>
                  <p className="song-modal__artist">{selectedSong.artista}</p>
                </div>

                <div className="song-modal__message">
                  <p>{selectedSong.contenido}</p>
                </div>

                <a 
                  href={selectedSong.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="song-modal__spotify-btn"
                >
                  🎧 Escuchar en Spotify
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
