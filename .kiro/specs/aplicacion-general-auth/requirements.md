# Requirements Document

## Introduction

Este documento define los requisitos para la Aplicación General y Sistema de Autenticación (SPEC-000), que constituye la base del proyecto web de cumpleaños. El sistema proporciona autenticación mediante código de cumpleaños, persistencia de sesión, protección de rutas y navegación entre módulos.

Esta especificación es crítica ya que todas las demás features del proyecto dependen de este sistema base de autenticación y navegación.

## Glossary

- **Auth_System**: Sistema de autenticación que valida códigos de cumpleaños y gestiona sesiones
- **Birthday_Code**: Código numérico de 4 dígitos en formato DDMM (día y mes de nacimiento)
- **Session**: Estado de autenticación persistido en el navegador del usuario
- **Protected_Route**: Ruta de la aplicación que requiere autenticación válida para ser accedida
- **Dashboard**: Pantalla principal accesible tras autenticación exitosa
- **Login_Screen**: Pantalla de ingreso donde el usuario introduce el Birthday_Code
- **Session_Storage**: Mecanismo de almacenamiento local en el navegador (localStorage)
- **Rate_Limiter**: Mecanismo que limita el número de intentos de autenticación
- **Unlock_Animation**: Animación visual que se muestra al autenticarse exitosamente
- **Navigation_System**: Sistema que permite moverse entre diferentes módulos de la aplicación

## Requirements

### Requirement 1: Autenticación con Código de Cumpleaños

**User Story:** Como visitante, quiero ingresar un código de cumpleaños para acceder al contenido personalizado, de manera que solo la persona destinataria pueda ver el contenido.

#### Acceptance Criteria

1. THE Login_Screen SHALL display a single input field accepting exactly 4 numeric digits
2. WHEN the user submits a Birthday_Code, THE Auth_System SHALL validate the code against the configured birthday value
3. WHEN the Birthday_Code matches the configured value, THE Auth_System SHALL create a Session and redirect to the Dashboard
4. WHEN the Birthday_Code does not match, THE Auth_System SHALL display an error message and keep the user on the Login_Screen
5. THE Auth_System SHALL retrieve the valid Birthday_Code from an environment variable, not from hardcoded values
6. WHEN the Birthday_Code is successfully validated, THE Auth_System SHALL display an Unlock_Animation before redirecting

### Requirement 2: Persistencia de Sesión

**User Story:** Como usuaria autenticada, quiero que el sistema recuerde mi sesión para no tener que ingresar el código cada vez que visito la aplicación.

#### Acceptance Criteria

1. WHEN a Session is created, THE Auth_System SHALL store session data in Session_Storage with an expiration timestamp
2. THE Auth_System SHALL set the Session expiration to 7 days from the creation time
3. WHEN the application loads, THE Auth_System SHALL check Session_Storage for a valid Session
4. WHEN a valid Session exists and has not expired, THE Auth_System SHALL grant access to Protected_Routes without requiring authentication
5. WHEN a Session has expired, THE Auth_System SHALL remove the session data from Session_Storage and redirect to Login_Screen
6. THE Session SHALL include a creation timestamp and an expiration timestamp

### Requirement 3: Protección de Rutas

**User Story:** Como desarrollador, quiero proteger las rutas sensibles de la aplicación para asegurar que solo usuarios autenticados puedan accederlas.

#### Acceptance Criteria

1. THE Auth_System SHALL protect the following routes: /dashboard, /boveda, /playlist, /escape-room, /animo, /botiquin
2. WHEN a user attempts to access a Protected_Route without a valid Session, THE Auth_System SHALL redirect to the Login_Screen
3. WHEN a user has a valid Session, THE Auth_System SHALL allow access to all Protected_Routes
4. WHEN a user accesses the root path (/) without a valid Session, THE Auth_System SHALL display the Login_Screen
5. WHEN a user accesses the root path (/) with a valid Session, THE Auth_System SHALL redirect to the Dashboard

### Requirement 4: Limitación de Intentos de Autenticación

**User Story:** Como administrador del sistema, quiero limitar los intentos de autenticación para prevenir ataques de fuerza bruta.

#### Acceptance Criteria

1. THE Rate_Limiter SHALL track the number of authentication attempts per client
2. THE Rate_Limiter SHALL allow a maximum of 10 failed authentication attempts per hour
3. WHEN a client exceeds 10 failed attempts within one hour, THE Rate_Limiter SHALL block further authentication attempts for that client
4. WHEN a client is blocked by the Rate_Limiter, THE Auth_System SHALL display a message indicating the wait time before retry
5. WHEN the blocking period expires, THE Rate_Limiter SHALL allow the client to attempt authentication again
6. WHEN an authentication attempt is successful, THE Rate_Limiter SHALL reset the failed attempt counter for that client

### Requirement 5: Navegación entre Módulos

**User Story:** Como usuaria autenticada, quiero navegar libremente entre los diferentes módulos de la aplicación sin perder mi sesión.

#### Acceptance Criteria

1. THE Navigation_System SHALL provide navigation links to all available modules: Dashboard, Bóveda, Playlist, Escape Room, Ánimo, Botiquín
2. WHEN a user clicks a navigation link, THE Navigation_System SHALL navigate to the corresponding Protected_Route
3. THE Navigation_System SHALL indicate the current active module visually
4. THE Navigation_System SHALL be accessible from all Protected_Routes
5. THE Navigation_System SHALL include a logout option that clears the Session and redirects to Login_Screen

### Requirement 6: Animación de Desbloqueo

**User Story:** Como usuaria, quiero ver una animación celebratoria cuando ingreso el código correcto para que la experiencia sea más alegre y personalizada.

#### Acceptance Criteria

1. WHEN authentication is successful, THE Unlock_Animation SHALL display confetti or heart particles on the screen
2. THE Unlock_Animation SHALL have a duration between 1.5 and 3 seconds
3. WHEN the Unlock_Animation completes, THE Auth_System SHALL navigate to the Dashboard
4. THE Unlock_Animation SHALL not block user interaction if the user clicks during the animation
5. THE Unlock_Animation SHALL be visually smooth with a frame rate of at least 30 frames per second

### Requirement 7: Diseño Responsive

**User Story:** Como usuaria, quiero acceder a la aplicación desde cualquier dispositivo (móvil, tablet, desktop) y tener una experiencia visual adecuada.

#### Acceptance Criteria

1. THE Login_Screen SHALL adapt its layout for mobile devices (width less than 768 pixels)
2. THE Login_Screen SHALL adapt its layout for tablet devices (width between 768 and 1024 pixels)
3. THE Login_Screen SHALL adapt its layout for desktop devices (width greater than 1024 pixels)
4. THE Dashboard SHALL adapt its layout and Navigation_System for mobile, tablet, and desktop viewports
5. WHEN viewed on mobile devices, THE Navigation_System SHALL use a hamburger menu or bottom navigation pattern
6. WHEN viewed on desktop devices, THE Navigation_System SHALL use a sidebar or top navigation pattern

### Requirement 8: Rendimiento de Carga

**User Story:** Como usuaria, quiero que la aplicación cargue rápidamente para no tener que esperar mucho tiempo al acceder.

#### Acceptance Criteria

1. THE Login_Screen SHALL achieve First Contentful Paint (FCP) in less than 2 seconds on a standard 3G connection
2. THE Dashboard SHALL achieve First Contentful Paint (FCP) in less than 2 seconds on a standard 3G connection
3. THE Auth_System SHALL complete Session validation from Session_Storage in less than 100 milliseconds
4. THE Auth_System SHALL complete Birthday_Code validation in less than 200 milliseconds
5. THE Unlock_Animation SHALL load all required assets in less than 500 milliseconds

### Requirement 9: Manejo de Errores

**User Story:** Como usuaria, quiero recibir mensajes claros cuando algo sale mal para entender qué debo hacer.

#### Acceptance Criteria

1. WHEN the Birthday_Code is incorrect, THE Auth_System SHALL display the message "Código incorrecto, intenta de nuevo 🎂"
2. WHEN the Rate_Limiter blocks attempts, THE Auth_System SHALL display a message indicating the remaining wait time
3. WHEN Session_Storage is not available, THE Auth_System SHALL display a warning and require authentication on every visit
4. WHEN a network error occurs during authentication, THE Auth_System SHALL display "Error de conexión, por favor intenta nuevamente"
5. IF the environment variable for Birthday_Code is not configured, THEN THE Auth_System SHALL log an error and prevent authentication attempts

### Requirement 10: Accesibilidad

**User Story:** Como usuaria con necesidades especiales, quiero poder usar la aplicación con lectores de pantalla y navegación por teclado.

#### Acceptance Criteria

1. THE Login_Screen SHALL support keyboard navigation with Tab key for focusing the input field and Enter key for submission
2. THE Login_Screen input field SHALL have an accessible label describing its purpose
3. THE Navigation_System SHALL support keyboard navigation with Tab and Enter keys
4. THE Auth_System error messages SHALL be announced by screen readers when displayed
5. THE Unlock_Animation SHALL not trigger motion for users who have enabled reduced motion preferences

