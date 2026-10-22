# ADR-001: Elección de Next.js como Framework Frontend

## Estado
**Aceptado** - 2026-10-21

## Contexto

### Problema
Necesitamos migrar la aplicación de cumpleaños de una arquitectura monolítica (Spring Boot + Thymeleaf) a una arquitectura moderna con frontend y backend separados. El frontend debe ser:
- Interactivo y con excelente UX
- Fácil de mantener y escalar
- Desplegable como sitio estático
- Con soporte para TypeScript
- Con buena performance (< 2s Time to Interactive)

### Requisitos
- **RF-1:** Soporte para SSG (Static Site Generation) para deployment en GitHub Pages
- **RF-2:** Soporte para TypeScript
- **RF-3:** Ecosistema maduro de componentes y librerías
- **RF-4:** Buena performance out-of-the-box
- **RF-5:** Hot Module Reload en desarrollo
- **RNF-1:** Curva de aprendizaje moderada (ya tengo experiencia con React)
- **RNF-2:** Documentación completa y comunidad activa

### Restricciones
- Frontend debe ser desplegable en GitHub Pages (hosting estático gratuito)
- No hay presupuesto para servicios de hosting premium
- Debe funcionar sin backend en caso de que el servidor esté caído (contenido estático)

## Decisión

**Elegimos Next.js 14+ con App Router como framework frontend.**

### Implementación
- Usar Next.js en modo `output: 'export'` para generar sitio estático
- Configurar Tailwind CSS para estilos
- Usar Framer Motion para animaciones
- TypeScript en modo strict
- Deploy a GitHub Pages mediante GitHub Actions

## Alternativas Consideradas

### Alternativa 1: React + Vite

**Descripción:**
React puro con Vite como bundler, sin framework adicional.

**Pros:**
- ✅ Máxima flexibilidad
- ✅ Bundle más ligero
- ✅ Vite es extremadamente rápido en desarrollo
- ✅ Menos "magia" del framework
- ✅ Más control sobre la configuración

**Contras:**
- ❌ Requiere configurar muchas cosas manualmente (routing, SSG, etc.)
- ❌ No tiene opiniones fuertes sobre estructura del proyecto
- ❌ SSG requiere setup adicional
- ❌ Menos convenciones = más decisiones que tomar

**Por qué NO la elegimos:**
Next.js provee estructura y convenciones que aceleran el desarrollo. El overhead del framework es mínimo en modo export.

---

### Alternativa 2: Astro

**Descripción:**
Framework moderno enfocado en contenido estático con "islands architecture".

**Pros:**
- ✅ Extremadamente rápido (ship 0 JS por defecto)
- ✅ Excelente para sitios de contenido
- ✅ Soporta múltiples frameworks (React, Vue, Svelte)
- ✅ Built-in SSG
- ✅ Optimización automática de assets

**Contras:**
- ❌ Menos maduro que Next.js
- ❌ Ecosistema más pequeño
- ❌ Curva de aprendizaje adicional
- ❌ Puede ser overkill para una SPA interactiva
- ❌ "Islands" puede complicar componentes muy interactivos

**Por qué NO la elegimos:**
Astro es excelente para blogs y sitios de contenido, pero nuestra app es más una SPA interactiva (carousel, puzzle, animaciones). Next.js es más apropiado para este caso de uso.

---

### Alternativa 3: Vue.js + Nuxt

**Descripción:**
Vue.js con Nuxt como framework meta-framework (equivalente a Next para Vue).

**Pros:**
- ✅ Vue es simple y elegante
- ✅ Nuxt provee funcionalidad similar a Next
- ✅ Buena documentación
- ✅ Composition API es excelente

**Contras:**
- ❌ No tengo experiencia previa con Vue
- ❌ Ecosistema más pequeño que React
- ❌ Menos librerías de componentes disponibles
- ❌ Curva de aprendizaje adicional

**Por qué NO la elegimos:**
Ya tengo experiencia con React. Aprender Vue + Nuxt agregaría tiempo innecesario al proyecto. React + Next es más pragmático.

---

### Alternativa 4: SvelteKit

**Descripción:**
Svelte con SvelteKit como framework (equivalente a Next).

**Pros:**
- ✅ Svelte es muy performante (compila a vanilla JS)
- ✅ Menos boilerplate que React
- ✅ SvelteKit es moderno y potente
- ✅ Bundle size muy pequeño

**Contras:**
- ❌ Ecosistema mucho más pequeño
- ❌ No tengo experiencia con Svelte
- ❌ Menos librerías de terceros
- ❌ Menos recursos/tutoriales disponibles

**Por qué NO la elegimos:**
Similar a Vue, la curva de aprendizaje no justifica los beneficios para este proyecto de corto plazo.

## Consecuencias

### Positivas
- ✅ **Desarrollo rápido:** App Router + Server Components aceleran desarrollo
- ✅ **Performance:** Optimizaciones automáticas (Image, Font, Bundle)
- ✅ **TypeScript first:** Excelente soporte out-of-the-box
- ✅ **Ecosistema:** Acceso a todo el ecosistema de React
- ✅ **Experiencia:** Ya conozco React, menos fricción
- ✅ **Deploy simple:** `next export` genera sitio estático listo para GitHub Pages
- ✅ **Mantenimiento:** Vercel mantiene Next.js activamente, actualizaciones frecuentes
- ✅ **Escalabilidad:** Si en el futuro necesitamos SSR, Next.js ya lo soporta

### Negativas
- ⚠️ **Bundle size:** Next.js agrega ~90KB gzipped (React Runtime + Next Router)
- ⚠️ **Overhead:** Algunas features de Next (Server Components, RSC) no se usan en export mode
- ⚠️ **Vendor lock-in leve:** Algunas APIs son específicas de Next
- ⚠️ **Actualizaciones breaking:** Next tiene breaking changes entre major versions

### Riesgos
- 🔴 **Riesgo 1:** Next.js podría deprecar `output: 'export'` en el futuro
  - **Mitigación:** Es poco probable (comunidad grande lo usa). Si sucede, migramos a Vite + React.
  
- 🔴 **Riesgo 2:** GitHub Pages tiene límites (1GB, 100GB bandwidth/month)
  - **Mitigación:** Para este proyecto personal, los límites son más que suficientes. Si crece, migramos a Vercel (gratis también).

- 🔴 **Riesgo 3:** Curva de aprendizaje del App Router (nuevo en Next 13+)
  - **Mitigación:** App Router está bien documentado. Hay muchos ejemplos y tutoriales.

### Impacto

**En el equipo:**
- Solo yo trabajo en esto, así que la decisión es pragmática
- Aprovecho mi experiencia existente con React

**En el producto:**
- Los usuarios finales no notarán que es Next.js
- Performance será excelente gracias a optimizaciones automáticas
- Sitio será 100% estático, carga rápida garantizada

**En el deployment:**
- GitHub Actions + GitHub Pages = deployment automático gratis
- Build time ~1-2 minutos para un proyecto de este tamaño
- Cache de dependencias acelera builds subsecuentes

**En el mantenimiento:**
- Next.js es estable y bien mantenido
- Actualizaciones regulares de Vercel
- Documentación excelente para debugging

## Notas Adicionales

### Configuración clave de Next.js
```javascript
// next.config.js
module.exports = {
  output: 'export',  // Genera sitio estático
  images: {
    unoptimized: true,  // Requerido para export
  },
  basePath: '/repo-name',  // Si no es root de dominio
};
```

### Referencias
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Next.js vs Create React App](https://nextjs.org/docs/migrating/from-create-react-app)
- [GitHub Pages Deployment](https://github.com/peaceiris/actions-gh-pages)

### Decisiones Relacionadas
- Ver [ADR-004](./ADR-004-typescript-fullstack.md) - TypeScript en todo el stack
- Ver [ADR-005](./ADR-005-deployment-github-pages.md) - Deployment en GitHub Pages

## Fecha
2026-10-21

## Autores
- André (Desarrollador Principal)

## Revisores
- N/A (Proyecto personal)

---

## Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2026-10-21 | Estado cambiado a Aceptado | André |
| 2026-10-21 | Creación inicial | André |
