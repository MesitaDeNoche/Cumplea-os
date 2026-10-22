# Especificaciones del Proyecto

Este directorio contiene todas las especificaciones (specs) de features del proyecto web de cumpleaños. Cada spec documenta los requisitos funcionales de un módulo específico siguiendo la metodología SDD (Specification-Driven Development).

## Metodología

- **Workflow**: Requirements-First
- **Formato**: EARS (Easy Approach to Requirements Syntax)
- **Standards**: INCOSE Quality Rules (active voice, testable, measurable)

## Índice de Especificaciones

### SPEC-000: Aplicación General y Sistema de Autenticación
**Archivo**: `SPEC-000-aplicacion-general-auth.md`  
**Estado**: Requirements Completed  
**Requirements**: 10

Sistema base de autenticación con código de cumpleaños, persistencia de sesión, protección de rutas y navegación entre módulos.

**Características principales**:
- Autenticación con código de 4 dígitos (DDMM)
- Persistencia de sesión (7 días)
- Rate limiting (10 intentos/hora)
- Animación de desbloqueo
- Diseño responsive

---

### SPEC-001: Dashboard Principal
**Archivo**: `SPEC-001-dashboard-principal.md`  
**Estado**: Requirements Completed  
**Requirements**: 7

Pantalla central con navegación a los cinco módulos principales mediante tarjetas visuales interactivas.

**Características principales**:
- 5 tarjetas de módulos con animación stagger
- Indicadores de estado "NUEVO"
- Header personalizado
- Logout funcional
- Grid responsivo (1/2/3 columnas)

---

### SPEC-002: Bóveda de Recuerdos
**Archivo**: `SPEC-002-boveda-recuerdos.md`  
**Estado**: Requirements Completed  
**Requirements**: 10

Timeline interactivo vertical con fotografías, fechas y anécdotas. Incluye modal de visualización y carta final.

**Características principales**:
- Timeline vertical cronológico
- Modal fullscreen para fotos
- Navegación entre imágenes (prev/next)
- Animaciones de revelación
- Lazy loading de imágenes
- Carta especial al final

---

### SPEC-003: Playlist Visual
**Archivo**: `SPEC-003-playlist-visual.md`  
**Estado**: Requirements Completed  
**Requirements**: 15

Reproductor de mensajes que imita Spotify. Cada "pista" es un mensaje o recuerdo con animación typewriter.

**Características principales**:
- Interfaz estilo reproductor de música
- Animación typewriter
- Controles play/pause/next/previous
- Modo autoplay y shuffle
- Sistema de favoritos con corazón
- Persistencia de estado
- Portadas dinámicas

---

### SPEC-004: Escape Room Romántico
**Archivo**: `SPEC-004-escape-room-romantico.md`  
**Estado**: Requirements Completed  
**Requirements**: 10

Minijuego de acertijos progresivos basados en momentos personales. Incluye sistema de pistas y puntuación.

**Características principales**:
- 3-5 acertijos secuenciales
- Validación flexible de respuestas
- Sistema de pistas opcionales
- Indicador de progreso
- Temporizador opcional
- Puntuación con bonificaciones
- Recompensa final (mensaje/video/gif)

---

### SPEC-005: Dashboard de Estados de Ánimo
**Archivo**: `SPEC-005-dashboard-animo.md`  
**Estado**: Requirements Completed  
**Requirements**: 12

Selector de estados de ánimo que devuelve contenido personalizado: recuerdos, canciones de Spotify embebidas y mensajes de apoyo.

**Características principales**:
- Selector de moods (feliz, triste, estresada, aburrida, etc.)
- Integración con Spotify (embed player)
- Contenido dinámico por mood:
  - Memory content (50-500 chars)
  - Spotify song embed
  - Support message (20-300 chars)
- Sistema de configuración sin código
- Responsive y accesible

---

### SPEC-006: Botiquín de Emergencia
**Archivo**: `SPEC-006-botiquin-emergencia.md`  
**Estado**: Requirements Completed  
**Requirements**: 20

Refugio digital con botón SOS que envía notificaciones REALES y botones de apoyo secundarios.

**Características principales**:
- **Botón SOS principal**:
  - Notificaciones REALES vía Email, WhatsApp y SMS
  - Backend NestJS con API endpoints
  - Multi-canal con fallback logic
  - Rate limiting (30 segundos)
  - Confirmación de entrega
- **Botones secundarios**:
  - "Necesito Reírme" (muestra chistes internos)
  - "Necesito Ánimo" (reproduce mensajes de voz)
- Reproductor de audio con controles
- Interfaz tipo "refugio" calmante
- Seguridad y privacidad (HTTPS, env variables)

---

## Resumen Estadístico

| Métrica | Valor |
|---------|-------|
| Total de Specs | 7 |
| Total de Requirements | 84 |
| Total de Acceptance Criteria | ~450+ |
| Specs con Backend API | 1 (SPEC-006) |
| Specs con Integraciones Externas | 2 (SPEC-005: Spotify, SPEC-006: Email/WhatsApp/SMS) |

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14+ con TypeScript
- **Despliegue**: GitHub Pages (export estático)
- **Styling**: TBD (Tailwind CSS / CSS Modules)

### Backend
- **Framework**: NestJS con TypeScript
- **Despliegue**: Oracle Cloud (VM con SSL - Let's Encrypt)
- **APIs Externas**:
  - Spotify Web API (embed player)
  - Email (SendGrid / Nodemailer / AWS SES)
  - WhatsApp (Twilio / WhatsApp Business API)
  - SMS (Twilio SMS)

### Arquitectura
- **Tipo**: Monorepo
- **Gestor de paquetes**: pnpm workspaces
- **Base de datos**: No requerida (configuración estática)

## Próximos Pasos

1. **Diseño Técnico**: Crear documentos de diseño para cada spec
2. **Task Breakdown**: Dividir requirements en tareas implementables
3. **Configuración de Entorno**: Setup de monorepo y dependencias
4. **Implementación**: Desarrollo incremental por spec
5. **Testing**: Validación de acceptance criteria
6. **Deployment**: Configuración de pipelines CI/CD

## Referencias

- [ADR-001: Elección de Next.js](../adr/ADR-001-eleccion-nextjs.md)
- [CONTEXT.md del proyecto](../../../CONTEXT.md)
- [Documentación técnica](../../README.md)

---

**Última actualización**: Octubre 21, 2026  
**Mantenido por**: Equipo de desarrollo
