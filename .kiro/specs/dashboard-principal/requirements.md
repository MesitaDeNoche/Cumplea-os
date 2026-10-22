# Requirements Document

## Introduction

El Dashboard Principal es la pantalla central del proyecto web de cumpleaños. Funciona como punto de entrada después de la autenticación, proporcionando navegación a los cinco módulos principales del sistema: Bóveda de Recuerdos, Playlist Visual, Escape Room Romántico, Dashboard de Ánimo y Botiquín de Emergencia. El dashboard debe ofrecer una experiencia visual atractiva, clara orientación sobre el contenido disponible e indicadores de progreso de exploración.

## Glossary

- **Dashboard**: La pantalla principal que contiene las tarjetas de navegación a los módulos
- **Módulo**: Cada una de las cinco funcionalidades principales del sistema (Bóveda, Playlist, Escape Room, Dashboard de Ánimo, Botiquín)
- **Tarjeta_de_Módulo**: Elemento visual clickeable que representa un módulo, conteniendo nombre, icono y descripción
- **Badge_de_Estado**: Indicador visual que muestra si un módulo es "NUEVO" (no visitado) o ha sido explorado
- **Sistema**: El dashboard principal y sus componentes de interfaz
- **Usuaria**: Persona autenticada que accede al dashboard
- **Grid_Responsivo**: Sistema de disposición que adapta el número de columnas según el tamaño de pantalla
- **Stagger_Effect**: Animación escalonada donde elementos aparecen secuencialmente con pequeños retrasos

## Requirements

### Requirement 1: Visualización de Módulos

**User Story:** Como usuaria autenticada, quiero ver todos los módulos disponibles en un solo lugar, para poder entender qué contenido puedo explorar.

#### Acceptance Criteria

1. THE Sistema SHALL display exactly five Tarjetas_de_Módulo in the Dashboard
2. FOR EACH Tarjeta_de_Módulo, THE Sistema SHALL display a module name, an icon, and a description
3. THE Sistema SHALL display the Tarjetas_de_Módulo for the following modules in order: Bóveda de Recuerdos, Playlist Visual, Escape Room Romántico, Dashboard de Ánimo, and Botiquín de Emergencia
4. WHEN the Dashboard loads, THE Sistema SHALL apply a Stagger_Effect animation where each Tarjeta_de_Módulo appears with a 100ms delay from the previous one

### Requirement 2: Navegación a Módulos

**User Story:** Como usuaria, quiero navegar fácilmente al módulo que me interese, para acceder rápidamente al contenido que deseo explorar.

#### Acceptance Criteria

1. THE Sistema SHALL make each Tarjeta_de_Módulo clickeable
2. WHEN the Usuaria clicks the Bóveda de Recuerdos Tarjeta_de_Módulo, THE Sistema SHALL navigate to the /boveda route
3. WHEN the Usuaria clicks the Playlist Visual Tarjeta_de_Módulo, THE Sistema SHALL navigate to the /playlist route
4. WHEN the Usuaria clicks the Escape Room Romántico Tarjeta_de_Módulo, THE Sistema SHALL navigate to the /escape-room route
5. WHEN the Usuaria clicks the Dashboard de Ánimo Tarjeta_de_Módulo, THE Sistema SHALL navigate to the /dashboard-animo route
6. WHEN the Usuaria clicks the Botiquín de Emergencia Tarjeta_de_Módulo, THE Sistema SHALL navigate to the /botiquin route
7. WHEN the Usuaria hovers over a Tarjeta_de_Módulo, THE Sistema SHALL apply an elevation effect and glow visual feedback

### Requirement 3: Indicadores de Estado de Exploración

**User Story:** Como usuaria, quiero saber qué módulos aún no he explorado, para orientarme sobre mi progreso en el sitio.

#### Acceptance Criteria

1. WHEN a Tarjeta_de_Módulo represents a module that the Usuaria has not visited, THE Sistema SHALL display a Badge_de_Estado with the text "NUEVO"
2. WHEN a Tarjeta_de_Módulo represents a module that the Usuaria has previously visited, THE Sistema SHALL display the Tarjeta_de_Módulo without a Badge_de_Estado
3. THE Sistema SHALL persist the visited status of each module across browser sessions for the authenticated Usuaria

### Requirement 4: Header Personalizado

**User Story:** Como usuaria autenticada, quiero ver un mensaje de bienvenida personalizado, para sentirme reconocida en la experiencia.

#### Acceptance Criteria

1. THE Sistema SHALL display a header section at the top of the Dashboard
2. THE Sistema SHALL display a personalized welcome message in the header containing the Usuaria's name
3. WHEN the Dashboard loads, THE Sistema SHALL fade in the header message before animating the Tarjetas_de_Módulo

### Requirement 5: Funcionalidad de Cierre de Sesión

**User Story:** Como usuaria, quiero poder cerrar sesión si lo necesito, para proteger mi privacidad cuando termine de usar la aplicación.

#### Acceptance Criteria

1. THE Sistema SHALL display a logout button in the top right corner of the Dashboard
2. THE Sistema SHALL render the logout button with a discrete visual style that does not compete with module Tarjetas_de_Módulo
3. WHEN the Usuaria clicks the logout button, THE Sistema SHALL display a confirmation dialog
4. WHEN the Usuaria confirms logout, THE Sistema SHALL terminate the session and navigate to the /login route
5. WHEN the Usuaria cancels logout, THE Sistema SHALL close the confirmation dialog and maintain the current session

### Requirement 6: Diseño Responsivo

**User Story:** Como usuaria, quiero que el dashboard se vea bien en cualquier dispositivo, para poder acceder desde mi teléfono, tablet o computadora.

#### Acceptance Criteria

1. WHEN the viewport width is less than 768px, THE Sistema SHALL display Tarjetas_de_Módulo in a Grid_Responsivo with one column
2. WHEN the viewport width is between 768px and 1024px, THE Sistema SHALL display Tarjetas_de_Módulo in a Grid_Responsivo with two columns
3. WHEN the viewport width is 1024px or greater, THE Sistema SHALL display Tarjetas_de_Módulo in a Grid_Responsivo with three columns
4. THE Sistema SHALL maintain readability and appropriate spacing of all Dashboard elements across all supported viewport sizes

### Requirement 7: Redirección Post-Autenticación

**User Story:** Como usuaria que acaba de autenticarme, quiero llegar automáticamente al dashboard, para comenzar a explorar el contenido inmediatamente.

#### Acceptance Criteria

1. WHEN authentication completes successfully, THE Sistema SHALL redirect the Usuaria to the Dashboard route
2. WHEN the Usuaria accesses the Dashboard route without authentication, THE Sistema SHALL redirect to the /login route
3. THE Sistema SHALL complete the Dashboard load and render all Tarjetas_de_Módulo within 2 seconds of navigation
