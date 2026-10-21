# Cumpleaños - Aplicación Web Interactiva 💜

Aplicación web personalizada de celebración de cumpleaños con experiencias interactivas, galería de fotos, música y elementos visuales románticos.

## 🏗️ Arquitectura

Este es un proyecto **monorepo** que utiliza:
- **Frontend:** Next.js 14+ con TypeScript
- **Backend:** NestJS 10+ con TypeScript
- **Metodología:** SDD (Specification-Driven Development)
- **Package Manager:** pnpm

## 📁 Estructura del Proyecto

```
cumple-monorepo/
├── apps/
│   ├── frontend/       # Aplicación Next.js
│   └── backend/        # API NestJS
├── packages/
│   └── shared-types/   # Types compartidos
├── docs/
│   ├── CONTEXT.md      # Contexto completo del proyecto
│   ├── arquitectura/   # Documentación técnica
│   └── memoria/        # Decisiones y evolución
├── skills/             # Scripts y herramientas
├── legacy/             # Código anterior (Spring Boot)
└── .github/
    └── workflows/      # CI/CD pipelines
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 20+
- pnpm 8+

### Instalación

```bash
# Instalar pnpm si no lo tienes
npm install -g pnpm

# Instalar dependencias
pnpm install

# Desarrollo (frontend + backend concurrente)
pnpm dev

# Solo frontend
pnpm --filter frontend dev

# Solo backend
pnpm --filter backend start:dev
```

## 📚 Documentación

- [📖 CONTEXT.md](./docs/CONTEXT.md) - Contexto completo del proyecto
- [🏛️ Arquitectura](./docs/arquitectura/) - Decisiones arquitectónicas
- [📝 Memoria](./docs/memoria/) - Evolución del proyecto

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia frontend + backend
pnpm build            # Build completo
pnpm test             # Tests
pnpm lint             # Linting
pnpm format           # Format con Prettier
```

## 🚢 Deployment

- **Frontend:** GitHub Pages / Vercel
- **Backend:** Oracle Cloud / DigitalOcean / Railway

Ver [guía de deployment](./docs/arquitectura/DEPLOYMENT.md) para más detalles.

## 📝 Estado del Proyecto

**Versión:** 2.0.0 (Migración a Next.js + NestJS)  
**Estado:** 🚧 En desarrollo - Migración de arquitectura  

### Próximos Pasos
- [ ] Setup inicial de Next.js frontend
- [ ] Setup inicial de NestJS backend
- [ ] Implementación de componentes UI
- [ ] API endpoints
- [ ] Configuración de CI/CD
- [ ] Deployment

## 🤝 Contribución

Este es un proyecto personal. Para consultas, ver la documentación en `/docs/`.

## 📄 Licencia

Proyecto personal (privado)

---

**Última actualización:** Octubre 21, 2026
