# SPEC-003: Playlist Visual

> **Tipo**: Feature  
> **Estado**: Requirements Completed  
> **Workflow**: Requirements-First  

---
# Requirements Document - Playlist Visual

## Introduction

La Playlist Visual es un reproductor de mensajes y recuerdos interactivo que imita la interfaz de un reproductor de música moderno al estilo Spotify. Cada "pista" representa un mensaje, recuerdo o razón por la que se valora la relación. Esta feature transforma mensajes significativos en una experiencia multimedia inmersiva con controles de reproducción, gestión de favoritos, y modos de reproducción especiales que permiten a la usuaria explorar los contenidos de forma personalizada y entretenida.

## Glossary

- **Playlist_Player**: Componente principal que imita un reproductor de música
- **Mensaje**: Contenido textual individual que representa una "pista" en el reproductor
- **Track**: Representación visual y de datos de un Mensaje individual
- **Player_Controls**: Conjunto de botones para controlar la reproducción (play, pause, next, previous)
- **Progress_Bar**: Barra visual que simula el progreso de reproducción de un Mensaje
- **Album_Cover**: Imagen visual asociada a un Mensaje o conjunto de Mensajes
- **Typewriter_Animation**: Animación que muestra texto carácter por carácter
- **Autoplay_Mode**: Modo de reproducción que avanza automáticamente al siguiente Mensaje
- **Shuffle_Mode**: Modo de reproducción que presenta Mensajes en orden aleatorio
- **Favorites_List**: Colección de Mensajes marcados como favoritos por la usuaria
- **Track_Counter**: Indicador visual de posición actual en formato "X de N"
- **Dashboard**: Página principal desde donde se accede a los módulos

## Requirements

### Requirement 1: Interfaz Visual del Reproductor

**User Story:** Como usuaria, quiero ver una interfaz que imite un reproductor de música moderno, para tener una experiencia familiar y atractiva al leer los mensajes.

#### Acceptance Criteria

1. THE Playlist_Player SHALL display an Album_Cover area
2. THE Playlist_Player SHALL display a Track title
3. THE Playlist_Player SHALL display Player_Controls (play, pause, next, previous)
4. THE Playlist_Player SHALL display a Progress_Bar
5. THE Playlist_Player SHALL display a Track_Counter in "X de N" format
6. THE Playlist_Player SHALL use a visual design consistent with music player interfaces
7. THE Playlist_Player SHALL be responsive and adapt to mobile and desktop viewports

### Requirement 2: Lista de Mensajes

**User Story:** Como usuaria, quiero ver una lista de todos los mensajes disponibles con títulos creativos, para saber qué contenido está disponible en la playlist.

#### Acceptance Criteria

1. THE Playlist_Player SHALL display a list of all available Tracks
2. THE Track list SHALL display the title for each Mensaje
3. WHEN a Track in the list is clicked, THE Playlist_Player SHALL load and display that Mensaje
4. THE Track list SHALL highlight the currently playing Track
5. THE Track list SHALL display the Track_Counter position for each Track
6. THE Track list SHALL be scrollable when it exceeds the available viewport height

### Requirement 3: Reproducción de Mensajes con Animación Typewriter

**User Story:** Como usuaria, quiero hacer click en "play" para ver el mensaje completo con animación de escritura, para experimentar una revelación progresiva del contenido.

#### Acceptance Criteria

1. WHEN the play button is clicked, THE Playlist_Player SHALL display the full Mensaje text
2. THE Typewriter_Animation SHALL reveal text character by character
3. THE Typewriter_Animation SHALL complete at a readable speed between 30 and 60 milliseconds per character
4. WHEN the Typewriter_Animation is in progress, THE Progress_Bar SHALL update proportionally
5. WHEN the play button is clicked while a Mensaje is already playing, THE Playlist_Player SHALL pause the Typewriter_Animation
6. WHEN the pause button is clicked, THE Playlist_Player SHALL pause the Typewriter_Animation and maintain current text position
7. WHEN the play button is clicked after pausing, THE Playlist_Player SHALL resume the Typewriter_Animation from the paused position

### Requirement 4: Barra de Progreso Visual

**User Story:** Como usuaria, quiero ver una barra de progreso que simule la reproducción, para saber cuánto del mensaje se ha mostrado.

#### Acceptance Criteria

1. THE Progress_Bar SHALL display the current playback progress as a percentage
2. WHEN the Typewriter_Animation starts, THE Progress_Bar SHALL begin at 0%
3. WHEN the Typewriter_Animation completes, THE Progress_Bar SHALL reach 100%
4. THE Progress_Bar SHALL update smoothly during Typewriter_Animation playback
5. WHEN a Mensaje is paused, THE Progress_Bar SHALL freeze at the current position
6. THE Progress_Bar SHALL display elapsed time and total duration in MM:SS format

### Requirement 5: Controles de Navegación

**User Story:** Como usuaria, quiero botones para ir al mensaje anterior o siguiente, para navegar libremente por la playlist.

#### Acceptance Criteria

1. WHEN the next button is clicked, THE Playlist_Player SHALL load the next Mensaje in the sequence
2. WHEN the previous button is clicked, THE Playlist_Player SHALL load the previous Mensaje in the sequence
3. WHEN the current Track is the last in the playlist, THE next button SHALL be disabled
4. WHEN the current Track is the first in the playlist, THE previous button SHALL be disabled
5. WHEN navigating to a new Track, THE Playlist_Player SHALL reset the Progress_Bar to 0%
6. WHEN navigating to a new Track, THE Playlist_Player SHALL stop any active Typewriter_Animation

### Requirement 6: Modo Autoplay

**User Story:** Como usuaria, quiero activar un modo autoplay que pase automáticamente al siguiente mensaje, para disfrutar de una experiencia continua sin interacción manual.

#### Acceptance Criteria

1. THE Playlist_Player SHALL provide an autoplay toggle control
2. WHEN autoplay is enabled and a Mensaje completes, THE Playlist_Player SHALL automatically load the next Mensaje
3. WHEN autoplay is enabled and a Mensaje completes, THE Playlist_Player SHALL automatically begin playing the next Mensaje
4. WHEN autoplay is enabled and the last Mensaje completes, THE Playlist_Player SHALL stop playback
5. WHEN autoplay is disabled, THE Playlist_Player SHALL stop after each Mensaje completes
6. THE autoplay toggle SHALL visually indicate its current state (on/off)
7. WHEN autoplay loads a new Mensaje, THE Playlist_Player SHALL wait 1000 milliseconds before starting playback

### Requirement 7: Modo Shuffle

**User Story:** Como usuaria, quiero activar un modo aleatorio para que los mensajes se reproduzcan en orden sorpresa, para redescubrir el contenido de forma inesperada.

#### Acceptance Criteria

1. THE Playlist_Player SHALL provide a shuffle toggle control
2. WHEN shuffle is enabled, THE Playlist_Player SHALL generate a randomized playback order
3. WHEN shuffle is enabled and next button is clicked, THE Playlist_Player SHALL load the next Mensaje according to the shuffled order
4. WHEN shuffle is enabled and previous button is clicked, THE Playlist_Player SHALL load the previous Mensaje according to the shuffled order
5. WHEN shuffle is disabled, THE Playlist_Player SHALL restore the original chronological order
6. THE shuffle toggle SHALL visually indicate its current state (on/off)
7. THE shuffled order SHALL ensure all Mensajes are played once before repeating any Mensaje

### Requirement 8: Sistema de Favoritos

**User Story:** Como usuaria, quiero marcar mensajes como favoritos con un ícono de corazón, para poder identificar y acceder rápidamente a los mensajes más significativos.

#### Acceptance Criteria

1. THE Playlist_Player SHALL display a heart icon for marking favorites
2. WHEN the heart icon is clicked on an unmarked Track, THE Playlist_Player SHALL add the Mensaje to Favorites_List
3. WHEN the heart icon is clicked on a favorited Track, THE Playlist_Player SHALL remove the Mensaje from Favorites_List
4. THE heart icon SHALL visually indicate whether the current Track is favorited
5. THE Track list SHALL display a heart indicator next to favorited Tracks
6. THE Playlist_Player SHALL persist Favorites_List across browser sessions using localStorage
7. THE Playlist_Player SHALL provide a view to display only favorited Tracks

### Requirement 9: Contador de Pistas

**User Story:** Como usuaria, quiero ver un contador que muestre "Pista X de N", para saber mi posición en la playlist.

#### Acceptance Criteria

1. THE Track_Counter SHALL display the current Track position and total Track count
2. THE Track_Counter SHALL use the format "Pista X de N" where X is current position and N is total count
3. WHEN a new Track loads, THE Track_Counter SHALL update to reflect the new position
4. WHEN shuffle mode is active, THE Track_Counter SHALL display position in the shuffled order
5. THE Track_Counter SHALL be visible at all times during playback

### Requirement 10: Gestión de Datos de Mensajes

**User Story:** Como desarrollador, quiero una estructura de datos clara para los mensajes, para poder mantener y extender la funcionalidad fácilmente.

#### Acceptance Criteria

1. THE Mensaje SHALL contain an id field of type string
2. THE Mensaje SHALL contain a titulo field of type string with maximum length of 100 characters
3. THE Mensaje SHALL contain a contenido field of type string with maximum length of 2000 characters
4. THE Mensaje SHALL contain a duracion field of type number representing simulated seconds
5. THE Mensaje SHALL contain an optional portada field of type string representing an image URL
6. WHEN Mensaje data is invalid, THE Playlist_Player SHALL log an error and skip that Mensaje
7. THE Playlist_Player SHALL validate that duracion is a positive number between 5 and 300 seconds

### Requirement 11: Portada de Álbum Dinámica

**User Story:** Como usuaria, quiero ver una imagen de portada que cambie con cada mensaje, para enriquecer la experiencia visual del reproductor.

#### Acceptance Criteria

1. WHEN a Mensaje includes a portada URL, THE Playlist_Player SHALL display that image in the Album_Cover area
2. WHEN a Mensaje does not include a portada URL, THE Playlist_Player SHALL display a default placeholder image
3. WHEN a new Track loads, THE Album_Cover SHALL transition smoothly to the new image
4. THE Album_Cover transition SHALL complete within 300 milliseconds
5. THE Album_Cover SHALL display alt text for accessibility
6. WHEN an Album_Cover image fails to load, THE Playlist_Player SHALL display the default placeholder

### Requirement 12: Navegación de Retorno

**User Story:** Como usuaria, quiero un botón para volver al Dashboard, para poder navegar fácilmente a otras secciones.

#### Acceptance Criteria

1. THE Playlist_Player SHALL display a "Volver al Dashboard" button
2. THE "Volver al Dashboard" button SHALL be visible at all times
3. WHEN the "Volver al Dashboard" button is clicked, THE Playlist_Player SHALL navigate to the Dashboard route
4. WHEN navigating away from the Playlist_Player, THE Playlist_Player SHALL pause any active playback

### Requirement 13: Control de Acceso

**User Story:** Como usuaria, quiero que la Playlist Visual requiera autenticación, para mantener privados nuestros mensajes especiales.

#### Acceptance Criteria

1. WHEN an unauthenticated user attempts to access the Playlist_Player, THE Playlist_Player SHALL redirect to the authentication page
2. WHEN an authenticated user accesses the Playlist_Player, THE Playlist_Player SHALL render normally
3. THE Playlist_Player SHALL verify authentication status before loading Mensaje data

### Requirement 14: Persistencia de Estado de Reproducción

**User Story:** Como usuaria, quiero que el reproductor recuerde mi última posición, para poder continuar donde lo dejé en mi próxima visita.

#### Acceptance Criteria

1. WHEN the Playlist_Player loads, THE Playlist_Player SHALL restore the last played Track from localStorage
2. WHEN a Track is loaded, THE Playlist_Player SHALL save the Track id to localStorage
3. WHEN the Playlist_Player is closed during playback, THE Playlist_Player SHALL save the current playback state to localStorage
4. THE Playlist_Player SHALL restore autoplay and shuffle preferences from localStorage
5. WHEN no previous state exists in localStorage, THE Playlist_Player SHALL load the first Track by default

### Requirement 15: Responsividad y Accesibilidad

**User Story:** Como usuaria, quiero que el reproductor funcione bien en diferentes dispositivos y sea accesible, para poder usarlo cómodamente desde cualquier lugar.

#### Acceptance Criteria

1. THE Playlist_Player SHALL be fully functional on mobile devices with minimum screen width of 320 pixels
2. THE Playlist_Player SHALL be fully functional on desktop devices with minimum screen width of 1024 pixels
3. THE Player_Controls SHALL be touch-friendly with minimum tap target size of 44x44 pixels
4. THE Playlist_Player SHALL support keyboard navigation for all interactive controls
5. WHEN the space bar is pressed, THE Playlist_Player SHALL toggle play/pause state
6. WHEN the right arrow key is pressed, THE Playlist_Player SHALL load the next Track
7. WHEN the left arrow key is pressed, THE Playlist_Player SHALL load the previous Track
8. THE Playlist_Player SHALL provide ARIA labels for all interactive controls
9. THE Playlist_Player SHALL provide screen reader announcements for Track changes and playback state changes

