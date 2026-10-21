# TODO - Plan de Implementación

## 🎯 Objetivo
Migrar completamente la aplicación de cumpleaños de Spring Boot + Thymeleaf a Next.js + NestJS siguiendo metodología SDD.

---

## ✅ Fase 1: Setup Inicial (COMPLETADA)

- [x] Crear estructura de carpetas del monorepo
- [x] Mover código legacy a `/legacy/`
- [x] Actualizar CONTEXT.md con nueva arquitectura
- [x] Crear README.md en cada carpeta
- [x] Configurar archivos del monorepo
  - [x] `package.json` root
  - [x] `pnpm-workspace.yaml`
  - [x] `tsconfig.base.json`
  - [x] `.prettierrc` / `.prettierignore`
  - [x] `.gitignore` / `.gitattributes`
- [x] Script de setup (`skills/setup.sh`)
- [x] Documentación de estructura (`STRUCTURE.md`)

---

## 🚧 Fase 2: Setup de Aplicaciones (SIGUIENTE)

### Frontend (Next.js)
- [ ] Inicializar proyecto Next.js 14+
  ```bash
  cd apps/frontend
  pnpm create next-app@latest . --typescript --tailwind --app
  ```
- [ ] Configurar Next.js
  - [ ] `next.config.js` (export estático, basePath)
  - [ ] Tailwind CSS customizado
  - [ ] Variables de entorno (`.env.example`)
- [ ] Instalar dependencias adicionales
  - [ ] `framer-motion` (animaciones)
  - [ ] `class-variance-authority` (utilidades CSS)
  - [ ] `clsx` / `tailwind-merge`
- [ ] Crear estructura de carpetas
  ```
  src/
  ├── app/
  ├── components/
  ├── lib/
  └── types/
  ```
- [ ] Configurar fuentes (Google Fonts: Playfair Display, Lato)

### Backend (NestJS)
- [ ] Inicializar proyecto NestJS
  ```bash
  cd apps/backend
  nest new . --package-manager pnpm
  ```
- [ ] Configurar NestJS
  - [ ] CORS para GitHub Pages
  - [ ] Variables de entorno
  - [ ] Swagger/OpenAPI
- [ ] Crear módulos base
  - [ ] Health module (`/health`)
  - [ ] Counter module (`/api/counter`)
  - [ ] Photos module (`/api/photos`)
- [ ] Configurar validación (class-validator)

### Shared Types
- [ ] Crear package `@cumple/shared-types`
- [ ] Definir interfaces principales
  - [ ] `PhotoDTO`
  - [ ] `CounterResponse`
  - [ ] `ReminderDTO`
- [ ] Configurar exports

---

## 📝 Fase 3: Documentación SDD (EN PARALELO)

### Especificaciones
- [ ] `SPEC-001-hero-section.md`
- [ ] `SPEC-002-carrusel-fotos.md`
- [ ] `SPEC-003-nuestra-cancion.md`
- [ ] `SPEC-004-recordatorios.md`
- [ ] `SPEC-005-constelacion.md`
- [ ] `SPEC-006-contador-dias.md`
- [ ] `SPEC-007-cierre.md`

### ADRs (Architectural Decision Records)
- [ ] `ADR-001-eleccion-nextjs.md`
- [ ] `ADR-002-eleccion-nestjs.md`
- [ ] `ADR-003-monorepo-pnpm.md`
- [ ] `ADR-004-deployment-github-pages.md`
- [ ] `ADR-005-ssl-cloudflare-tunnel.md`

### Documentación Técnica
- [ ] `ARCHITECTURE.md` - Decisiones arquitectónicas completas
- [ ] `API.md` - Documentación de endpoints
- [ ] `DEPLOYMENT.md` - Guía paso a paso de deployment

---

## 🎨 Fase 4: Implementación Frontend

### Componentes Base
- [ ] Layout principal (`app/layout.tsx`)
- [ ] Página principal (`app/page.tsx`)
- [ ] Sistema de diseño base (colores, fuentes, espaciados)

### Sección 1: Hero
- [ ] Componente `Hero`
- [ ] Animación de entrada
- [ ] Corazones flotantes (partículas)
- [ ] Smooth scroll CTA

### Sección 2: Carrusel de Fotos
- [ ] Componente `Carousel`
- [ ] Componente `CarouselSlide`
- [ ] Componente `CarouselControls` (prev/next/dots)
- [ ] Modal de pantalla completa
- [ ] Navegación con teclado
- [ ] Soporte táctil (swipe)
- [ ] Auto-play

### Sección 3: Nuestra Canción
- [ ] Componente `Song`
- [ ] Disco de vinilo animado
- [ ] Integración Spotify embed

### Sección 4: Recordatorios
- [ ] Componente `Reminders`
- [ ] Componente `ReminderCard`
- [ ] Grid responsivo
- [ ] Animaciones hover

### Sección 5: Constelación
- [ ] Componente `Constellation`
- [ ] Canvas de estrellas (animación)
- [ ] Puzzle SVG interactivo
- [ ] Lógica de conexión de estrellas
- [ ] Modal de mensaje final

### Sección 6: Contador de Días
- [ ] Componente `Counter`
- [ ] Lógica de cálculo
- [ ] Animación de números
- [ ] Intersection Observer

### Sección 7: Cierre
- [ ] Componente `Closing`
- [ ] Animación de corazón
- [ ] Mensaje final

### Utilidades
- [ ] Cliente API (`lib/api.ts`)
- [ ] Hooks personalizados
  - [ ] `useIntersectionObserver`
  - [ ] `useSwipe`
  - [ ] `useCounter`
- [ ] Helpers de animación
- [ ] Constantes globales

---

## ⚙️ Fase 5: Implementación Backend

### Módulos Core
- [ ] Health Module
  - [ ] Endpoint `GET /health`
  - [ ] Health checks

### Counter Module
- [ ] Service: Cálculo de días
- [ ] Controller: `GET /api/counter/days`
- [ ] DTO: `CounterResponse`
- [ ] Tests unitarios

### Photos Module (Futuro)
- [ ] Service: Gestión de fotos
- [ ] Controller: `GET /api/photos`
- [ ] Controller: `GET /api/photos/:id`
- [ ] DTO: `PhotoDTO`, `PhotoListResponse`

### Analytics Module (Opcional)
- [ ] Tracking de visitas
- [ ] Eventos de interacción
- [ ] Endpoint: `POST /api/analytics/event`

### Configuración
- [ ] CORS configurado correctamente
- [ ] Rate limiting (@nestjs/throttler)
- [ ] Helmet (security headers)
- [ ] Logger personalizado
- [ ] Swagger documentation

---

## 🧪 Fase 6: Testing

### Frontend
- [ ] Tests unitarios de componentes (Jest + React Testing Library)
- [ ] Tests de integración
- [ ] Tests E2E (Playwright)
- [ ] Tests de accesibilidad

### Backend
- [ ] Tests unitarios de services
- [ ] Tests de integración de controllers
- [ ] Tests E2E de API
- [ ] Coverage > 80%

---

## 🚀 Fase 7: CI/CD

### GitHub Actions
- [ ] Workflow: Deploy Frontend
  - [ ] Build Next.js
  - [ ] Export estático
  - [ ] Deploy a GitHub Pages
  - [ ] Trigger: push a `main` en `apps/frontend/**`
- [ ] Workflow: Deploy Backend
  - [ ] Build NestJS
  - [ ] SSH a servidor
  - [ ] PM2 restart
  - [ ] Trigger: push a `main` en `apps/backend/**`
- [ ] Workflow: Tests
  - [ ] Linting
  - [ ] Tests unitarios
  - [ ] Tests E2E
  - [ ] Trigger: PR a `main`
- [ ] Workflow: Release
  - [ ] Semantic versioning
  - [ ] Changelog automático
  - [ ] Git tags

---

## 🌐 Fase 8: Deployment

### Frontend (GitHub Pages)
- [ ] Configurar GitHub Pages en repo
- [ ] Build y export Next.js
- [ ] Desplegar primera versión
- [ ] Verificar HTTPS funcionando
- [ ] Configurar dominio custom (opcional)

### Backend (Oracle Cloud)
- [ ] Provisionar servidor (Ubuntu 22.04)
- [ ] Instalar Node.js 20+
- [ ] Instalar pnpm
- [ ] Instalar PM2
- [ ] Clonar repositorio
- [ ] Build backend
- [ ] Configurar variables de entorno
- [ ] Iniciar con PM2
- [ ] Configurar Nginx
  - [ ] Proxy reverso
  - [ ] SSL con Let's Encrypt o Cloudflare Tunnel
  - [ ] HTTPS obligatorio
- [ ] Configurar firewall
- [ ] Verificar CORS funcionando
- [ ] Pruebas de conexión frontend ↔ backend

### Monitoring
- [ ] PM2 monitoring en backend
- [ ] Health check endpoint
- [ ] Logs configurados
- [ ] Alertas (opcional)

---

## 🎨 Fase 9: Pulido Final

### UX/UI
- [ ] Responsive design validado (móvil, tablet, desktop)
- [ ] Animaciones optimizadas (60fps)
- [ ] Loading states
- [ ] Error handling UX
- [ ] Accesibilidad (WCAG 2.1 AA)
  - [ ] Keyboard navigation
  - [ ] ARIA labels
  - [ ] Color contrast
  - [ ] Screen reader testing

### Performance
- [ ] Lighthouse score > 90
- [ ] Lazy loading de imágenes
- [ ] Code splitting
- [ ] Bundle size optimizado
- [ ] Cache strategy

### SEO
- [ ] Meta tags
- [ ] Open Graph
- [ ] Sitemap.xml
- [ ] robots.txt

---

## 📚 Fase 10: Documentación Final

- [ ] Actualizar README.md con instrucciones finales
- [ ] Completar DEPLOYMENT.md con troubleshooting
- [ ] Actualizar CONTEXT.md con decisiones finales
- [ ] Screenshots/GIFs de la aplicación
- [ ] Video demo (opcional)
- [ ] Documentación de API completa
- [ ] Guía de contribución

---

## 🗑️ Fase 11: Limpieza

- [ ] Eliminar código legacy (después de 1 mes en producción estable)
- [ ] Limpiar dependencias no utilizadas
- [ ] Optimizar configuraciones
- [ ] Archivar documentación obsoleta

---

## 🎯 Métricas de Éxito

### Performance
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 2.5s
- [ ] Lighthouse Performance > 90
- [ ] Bundle size < 200KB (gzipped)

### Calidad
- [ ] Test coverage > 80%
- [ ] Cero errores críticos en producción
- [ ] 100% de funcionalidades migradas
- [ ] Accesibilidad WCAG 2.1 AA

### DevOps
- [ ] CI/CD funcionando
- [ ] Deployment automatizado
- [ ] Rollback plan documentado
- [ ] Monitoring activo

---

## 📅 Timeline Estimado

| Fase | Duración | Dependencias |
|------|----------|--------------|
| 1. Setup Inicial | ✅ Completado | - |
| 2. Setup Apps | 1-2 días | Fase 1 |
| 3. Documentación SDD | 2-3 días | - (paralelo) |
| 4. Frontend | 5-7 días | Fase 2, 3 |
| 5. Backend | 2-3 días | Fase 2, 3 |
| 6. Testing | 2-3 días | Fase 4, 5 |
| 7. CI/CD | 1-2 días | Fase 6 |
| 8. Deployment | 1-2 días | Fase 7 |
| 9. Pulido | 2-3 días | Fase 8 |
| 10. Documentación | 1 día | Fase 9 |
| 11. Limpieza | 1 día | Fase 10 |

**Total estimado:** 18-28 días de desarrollo

---

## 🚀 Inicio Rápido - Próximos 3 Pasos

1. **Ejecutar setup:**
   ```bash
   chmod +x skills/setup.sh
   ./skills/setup.sh
   ```

2. **Crear especificaciones:**
   - Documenta cada sección en `/docs/arquitectura/specs/`
   - Sigue el template de CONTEXT.md

3. **Inicializar apps:**
   ```bash
   # Frontend
   cd apps/frontend
   pnpm create next-app@latest . --typescript --tailwind --app
   
   # Backend
   cd apps/backend
   nest new . --package-manager pnpm
   ```

---

**Última actualización:** Octubre 21, 2026  
**Estado:** Fase 1 completada, listo para Fase 2
