# Documentación

Esta carpeta contiene toda la documentación del proyecto.

## 📁 Estructura

```
docs/
├── CONTEXT.md          # Contexto completo del proyecto
├── arquitectura/       # Documentación técnica
│   ├── specs/         # Especificaciones de features (SDD)
│   ├── adr/           # Architectural Decision Records
│   ├── ARCHITECTURE.md # Decisiones arquitectónicas
│   ├── API.md         # Documentación de endpoints
│   └── DEPLOYMENT.md  # Guía de despliegue
└── memoria/           # Memoria del proyecto
    └── PROJECT_MEMORY.md  # Decisiones y evolución
```

## 📖 Documentos Principales

### CONTEXT.md
Documento maestro que describe:
- Stack tecnológico completo
- Arquitectura del monorepo
- Funcionalidades principales
- Configuración y deployment
- Metodología SDD

### arquitectura/

**ARCHITECTURE.md**
- Decisiones arquitectónicas
- Patrones de diseño utilizados
- Justificación de elecciones tecnológicas

**API.md**
- Endpoints del backend
- Request/Response schemas
- Ejemplos de uso
- Códigos de error

**DEPLOYMENT.md**
- Guía paso a paso de deployment
- Configuración de servidores
- CI/CD pipelines
- Troubleshooting

**specs/** (Specification-Driven Development)
Especificaciones por feature:
- `SPEC-000-aplicacion-general-auth.md` - Sistema de autenticación (10 requirements)
- `SPEC-001-dashboard-principal.md` - Dashboard con navegación (7 requirements)
- `SPEC-002-boveda-recuerdos.md` - Timeline interactivo (10 requirements)
- `SPEC-003-playlist-visual.md` - Reproductor de mensajes (15 requirements)
- `SPEC-004-escape-room-romantico.md` - Minijuego de acertijos (10 requirements)
- `SPEC-005-dashboard-animo.md` - Selector de estados de ánimo (12 requirements)
- `SPEC-006-botiquin-emergencia.md` - Botón SOS + apoyo (20 requirements)

[Ver índice completo de specs →](arquitectura/specs/README.md)

**adr/** (Architectural Decision Records)
Registros de decisiones:
- `ADR-001-eleccion-nextjs.md`
- `ADR-002-monorepo-pnpm.md`
- etc.

### memoria/

**PROJECT_MEMORY.md**
- Evolución del proyecto
- Problemas encontrados y soluciones
- Lecciones aprendidas
- Roadmap futuro

## 🎯 Metodología SDD

Este proyecto sigue **Specification-Driven Development**:

1. **Especificación** → Documentar requisitos en `/specs/`
2. **Diseño** → Definir arquitectura en `/adr/`
3. **Implementación** → Codificar según specs
4. **Testing** → Verificar contra especificaciones

## 📝 Cómo Contribuir a la Documentación

1. Mantén CONTEXT.md actualizado con cambios mayores
2. Crea specs antes de implementar nuevas features
3. Documenta decisiones importantes en ADRs
4. Actualiza API.md cuando agregues endpoints
5. Registra problemas y soluciones en PROJECT_MEMORY.md

## 🔗 Links Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
