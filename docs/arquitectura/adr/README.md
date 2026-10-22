# Architectural Decision Records (ADRs)

## 🎯 ¿Qué son los ADRs?

Los **Architectural Decision Records (ADRs)** son documentos cortos que capturan **decisiones arquitectónicas importantes** junto con su contexto y consecuencias.

## 📝 ¿Cuándo crear un ADR?

Crea un ADR cuando tomes una decisión que:
- ✅ Afecta la estructura del sistema
- ✅ Es costosa de revertir
- ✅ Tiene impacto significativo en el proyecto
- ✅ Requiere justificación técnica
- ✅ Afecta a múltiples partes del código

**NO crear ADR para:**
- ❌ Decisiones triviales (nombrar una variable)
- ❌ Decisiones de implementación de bajo nivel
- ❌ Preferencias de estilo de código

## 🏗️ Estructura de un ADR

Cada ADR sigue esta estructura:

```markdown
# ADR-XXX: Título Descriptivo

## Estado
[Propuesto | Aceptado | Rechazado | Obsoleto | Reemplazado por ADR-YYY]

## Contexto
¿Qué problema estamos resolviendo? ¿Por qué necesitamos tomar esta decisión?

## Decisión
¿Qué decidimos hacer?

## Alternativas Consideradas
¿Qué otras opciones evaluamos?

### Alternativa 1: [Nombre]
- **Pros:** ...
- **Contras:** ...

### Alternativa 2: [Nombre]
- **Pros:** ...
- **Contras:** ...

## Consecuencias

### Positivas
- ✅ Beneficio 1
- ✅ Beneficio 2

### Negativas
- ⚠️ Tradeoff 1
- ⚠️ Tradeoff 2

### Riesgos
- 🔴 Riesgo 1 y mitigación
- 🔴 Riesgo 2 y mitigación

## Fecha
YYYY-MM-DD

## Autores
- Nombre(s)
```

## 📋 Índice de ADRs

| # | Título | Estado | Fecha |
|---|--------|--------|-------|
| [001](./ADR-001-eleccion-nextjs.md) | Elección de Next.js como framework frontend | Propuesto | 2026-10-21 |
| [002](./ADR-002-eleccion-nestjs.md) | Elección de NestJS como framework backend | Propuesto | 2026-10-21 |
| [003](./ADR-003-monorepo-pnpm.md) | Uso de monorepo con pnpm workspaces | Propuesto | 2026-10-21 |
| [004](./ADR-004-typescript-fullstack.md) | TypeScript en todo el stack | Propuesto | 2026-10-21 |
| [005](./ADR-005-deployment-github-pages.md) | Deployment frontend en GitHub Pages | Propuesto | 2026-10-21 |
| [006](./ADR-006-ssl-estrategia.md) | Estrategia SSL/TLS para backend | Propuesto | 2026-10-21 |

## 🔢 Numeración

Los ADRs se numeran secuencialmente:
- `ADR-001`, `ADR-002`, `ADR-003`, etc.
- Usa 3 dígitos con ceros a la izquierda
- El número se mantiene aunque el ADR sea rechazado

## 📊 Estados

| Estado | Descripción |
|--------|-------------|
| **Propuesto** | En discusión, pendiente de aprobación |
| **Aceptado** | Decisión tomada e implementada |
| **Rechazado** | Decisión considerada pero no adoptada |
| **Obsoleto** | Ya no aplica al proyecto actual |
| **Reemplazado** | Sustituido por otro ADR más reciente |

## 🔄 Proceso de Creación

1. **Identificar** una decisión arquitectónica importante
2. **Crear** nuevo archivo `ADR-XXX-titulo.md`
3. **Escribir** el ADR siguiendo el template
4. **Estado inicial:** "Propuesto"
5. **Revisar** con el equipo (o contigo mismo en proyectos personales)
6. **Actualizar estado** a "Aceptado" o "Rechazado"
7. **Actualizar** este README con el nuevo ADR

## 💡 Consejos

### Sé Específico
- ❌ "Decidimos usar una base de datos"
- ✅ "Decidimos usar PostgreSQL en lugar de MongoDB para..."

### Explica el Contexto
- ¿Qué problema específico resuelve?
- ¿Qué restricciones tenemos?
- ¿Qué requisitos debemos cumplir?

### Considera Alternativas
- Lista al menos 2-3 alternativas
- Sé honesto sobre pros y contras
- Explica POR QUÉ elegiste esta opción

### Documenta Consecuencias
- No todo son beneficios
- Menciona tradeoffs
- Identifica riesgos y mitigaciones

### Mantén la Historia
- No borres ADRs rechazados
- Si una decisión cambia, crea un NUEVO ADR
- Marca el anterior como "Reemplazado por ADR-XXX"

## 📚 Ejemplos de Decisiones que Merecen ADR

### ✅ Buenos candidatos para ADR:
- Elección de framework (React vs Vue vs Angular)
- Elección de base de datos (PostgreSQL vs MongoDB)
- Arquitectura (Monolito vs Microservicios vs Monorepo)
- Estrategia de deployment (Serverless vs Tradicional)
- Estrategia de autenticación (JWT vs Sessions)
- Estrategia de caché (Redis vs Memcached)
- Estrategia de testing (Jest vs Vitest)

### ❌ NO merecen ADR:
- Nombrar una variable `userId` vs `user_id`
- Usar `const` vs `let` en un caso específico
- Ubicación de un archivo individual
- Formato de comentarios

## 🔗 Referencias

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions - Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR Tools](https://github.com/npryce/adr-tools)

## 📝 Template

Usa [TEMPLATE.md](./TEMPLATE.md) para crear nuevos ADRs.

---

**Última actualización:** Octubre 21, 2026
