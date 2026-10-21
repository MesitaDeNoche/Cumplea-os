# Estructura del Proyecto Cumpleaños Monorepo

## 📁 Árbol de Directorios

```
cumple-monorepo/
├── .github/
│   └── workflows/              # CI/CD pipelines (pendiente)
│
├── apps/
│   ├── frontend/               # Next.js App (pendiente setup)
│   ├── backend/                # NestJS API (pendiente setup)
│   └── README.md              ✅
│
├── packages/
│   ├── shared-types/          # Types compartidos (pendiente)
│   └── README.md              ✅
│
├── docs/
│   ├── arquitectura/
│   │   ├── specs/             # Especificaciones SDD
│   │   └── adr/               # Architectural Decision Records
│   ├── memoria/               # Memoria del proyecto
│   ├── CONTEXT.md             ✅ (Migrado)
│   └── README.md              ✅
│
├── skills/
│   ├── setup.sh               ✅
│   └── README.md              ✅
│
├── legacy/
│   ├── src/                   ✅ (Spring Boot original)
│   ├── pom.xml                ✅
│   └── README.md              ✅
│
├── .gitignore                 ✅ (Actualizado)
├── .gitattributes             ✅ (Actualizado)
├── .prettierrc                ✅
├── .prettierignore            ✅
├── package.json               ✅
├── pnpm-workspace.yaml        ✅
├── tsconfig.base.json         ✅
├── README.md                  ✅
├── CONTEXT.md                 ✅ (En raíz y docs/)
└── STRUCTURE.md               ✅ (Este archivo)
```

## ✅ Estado de Migración

### Completado
- [x] Estructura de carpetas creada
- [x] Código legacy movido a `/legacy/`
- [x] Documentación organizada en `/docs/`
- [x] CONTEXT.md actualizado y migrado
- [x] README.md en cada carpeta principal
- [x] Archivos de configuración del monorepo
  - [x] `package.json` (root)
  - [x] `pnpm-workspace.yaml`
  - [x] `tsconfig.base.json`
  - [x] `.prettierrc`
  - [x] `.gitignore` actualizado
- [x] Script de setup inicial (`skills/setup.sh`)

### Pendiente
- [ ] Setup de Next.js en `apps/frontend/`
- [ ] Setup de NestJS en `apps/backend/`
- [ ] Package `shared-types` en `packages/`
- [ ] Workflows de GitHub Actions
- [ ] Documentación en `/docs/arquitectura/`
  - [ ] ARCHITECTURE.md
  - [ ] API.md
  - [ ] DEPLOYMENT.md
- [ ] Especificaciones SDD en `/docs/arquitectura/specs/`
- [ ] ADRs en `/docs/arquitectura/adr/`

## 🎯 Próximos Pasos

### 1. Ejecutar Setup
```bash
chmod +x skills/setup.sh
./skills/setup.sh
```

### 2. Inicializar Frontend (Next.js)
```bash
cd apps/frontend
pnpm create next-app@latest . --typescript --tailwind --app --no-src-dir
```

### 3. Inicializar Backend (NestJS)
```bash
cd apps/backend
pnpm add @nestjs/cli -g
nest new . --package-manager pnpm
```

### 4. Configurar Shared Types
```bash
cd packages/shared-types
# Crear estructura básica
```

### 5. Documentación
```bash
# Crear specs para cada módulo
# Crear ADRs para decisiones importantes
# Documentar API endpoints
```

## 📊 Tamaño del Proyecto

### Legacy (Spring Boot)
- **Archivos Java:** 3
- **Templates HTML:** 1
- **CSS:** ~2200 líneas
- **JavaScript:** ~500 líneas
- **Imágenes:** ~23 archivos

### Nuevo (Monorepo)
- **Estado actual:** Estructura base
- **Estimado final:**
  - Frontend: ~30-40 componentes React
  - Backend: ~10-15 módulos NestJS
  - Shared: ~20-30 types

## 🔗 Referencias Rápidas

- [README Principal](./README.md)
- [Documentación Completa](./docs/README.md)
- [Contexto del Proyecto](./docs/CONTEXT.md)
- [Código Legacy](./legacy/README.md)
- [Scripts Útiles](./skills/README.md)

## 📝 Notas

1. **Legacy Code:** El código de Spring Boot está preservado en `/legacy/` solo como referencia. No se mantendrá activamente.

2. **Documentación:** CONTEXT.md existe tanto en la raíz como en `/docs/`. La versión en docs/ es la canónica.

3. **Monorepo:** Usamos pnpm workspaces para gestionar el monorepo. Todas las dependencias se instalan desde la raíz.

4. **TypeScript:** Todo el código nuevo usa TypeScript con configuración base compartida en `tsconfig.base.json`.

5. **Git:** Los archivos `.gitignore` y `.gitattributes` están actualizados para el monorepo y excluyen correctamente los archivos generados.

---

**Última actualización:** Octubre 21, 2026  
**Versión:** 2.0.0-alpha
