# Packages

Paquetes compartidos entre aplicaciones del monorepo.

## 📁 Estructura

```
packages/
└── shared-types/      # TypeScript types compartidos
    ├── src/
    │   └── index.ts   # Exports principales
    ├── package.json
    └── tsconfig.json
```

## 🎯 Propósito

Los packages permiten compartir código entre frontend y backend sin duplicación:
- **Types:** Interfaces y tipos TypeScript
- **Utils:** Funciones utilitarias comunes
- **Constants:** Constantes compartidas
- **Validators:** Lógica de validación común

## 📦 shared-types

### Contenido
- Interfaces de API (Request/Response DTOs)
- Types de dominio (Photo, Counter, etc.)
- Enums compartidos
- Type guards y utilities

### Uso

**En frontend (Next.js):**
```typescript
import { PhotoDTO, CounterResponse } from '@cumple/shared-types';

const photo: PhotoDTO = {
  id: '1',
  url: '/images/foto1.jpg',
  caption: 'Momento especial',
  date: '2024-01-01'
};
```

**En backend (NestJS):**
```typescript
import { PhotoDTO } from '@cumple/shared-types';

@Get()
getPhotos(): PhotoDTO[] {
  return this.photosService.findAll();
}
```

## 🔧 Agregar Nuevos Packages

1. **Crear carpeta:**
```bash
mkdir -p packages/mi-nuevo-package/src
cd packages/mi-nuevo-package
```

2. **Crear package.json:**
```json
{
  "name": "@cumple/mi-nuevo-package",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

3. **Crear tsconfig.json:**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

4. **Agregar a pnpm-workspace.yaml** (en raíz):
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

5. **Instalar en apps:**
```bash
# Frontend
cd apps/frontend
pnpm add @cumple/mi-nuevo-package@workspace:*

# Backend
cd apps/backend
pnpm add @cumple/mi-nuevo-package@workspace:*
```

## 🎨 Convenciones

### Naming
- Package name: `@cumple/nombre-descriptivo`
- Usa kebab-case para nombres de packages
- Prefijo `@cumple/` para todos los packages internos

### Estructura de archivos
```
packages/nombre-package/
├── src/
│   ├── index.ts        # Export principal
│   ├── types.ts        # Types
│   ├── constants.ts    # Constants
│   └── utils.ts        # Utilities
├── package.json
├── tsconfig.json
└── README.md
```

### Exports
```typescript
// src/index.ts
export * from './types';
export * from './constants';
export * from './utils';
```

## ⚡ Hot Module Reload

Los packages se recompilan automáticamente en desarrollo:
```bash
# En una terminal
cd packages/shared-types
pnpm dev

# En otra terminal
cd apps/frontend
pnpm dev
```

Los cambios en packages se reflejan inmediatamente en apps.

## 📝 Documentación

Cada package debe tener su propio README.md con:
- Propósito del package
- API documentation
- Ejemplos de uso
- Consideraciones especiales

## 🔗 Referencias

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
