# Apps

Esta carpeta contiene las aplicaciones principales del monorepo.

## 📁 Estructura

```
apps/
├── frontend/       # Next.js 14+ Application
└── backend/        # NestJS 10+ API
```

## Frontend (Next.js)

Aplicación web con experiencia de usuario interactiva.

**Stack:**
- Next.js 14+ (App Router)
- TypeScript 5+
- Tailwind CSS
- Framer Motion

**Comandos:**
```bash
cd frontend
pnpm dev        # Desarrollo
pnpm build      # Build producción
pnpm start      # Servidor producción
pnpm lint       # Linting
```

## Backend (NestJS)

API REST para interactividad y gestión de datos.

**Stack:**
- NestJS 10+
- TypeScript 5+
- class-validator
- Swagger/OpenAPI

**Comandos:**
```bash
cd backend
pnpm start:dev  # Desarrollo
pnpm build      # Build producción
pnpm start:prod # Servidor producción
pnpm test       # Tests
```

## Desarrollo Conjunto

Desde la raíz del monorepo:
```bash
pnpm dev  # Inicia frontend + backend simultáneamente
```

## Comunicación Frontend ↔ Backend

- **Desarrollo:** Frontend en `http://localhost:3000`, Backend en `http://localhost:8000`
- **Producción:** Frontend en GitHub Pages (HTTPS), Backend en servidor cloud (HTTPS)
- **CORS:** Configurado en backend para permitir peticiones desde frontend

Ver [documentación de API](../docs/arquitectura/API.md) para endpoints disponibles.
