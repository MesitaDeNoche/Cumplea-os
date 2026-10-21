# Legacy Code

Esta carpeta contiene el código original del proyecto basado en Spring Boot + Thymeleaf.

## ⚠️ Estado: DEPRECATED

Este código ya **NO se mantiene activamente**. Se conserva únicamente como referencia histórica.

## 📁 Contenido

```
legacy/
├── src/                           # Código fuente Java
│   ├── main/
│   │   ├── java/                 # Clases Java
│   │   └── resources/            # Templates, CSS, JS, imágenes
│   └── test/                     # Tests
├── pom.xml                       # Dependencias Maven
├── Dockerfile                    # Imagen Docker
├── .dockerignore
├── mvnw, mvnw.cmd               # Maven wrapper
└── .mvn/                        # Configuración Maven
```

## 🔧 Stack Tecnológico Original

- **Backend:** Spring Boot 3.5.14
- **Template Engine:** Thymeleaf
- **Lenguaje:** Java 17
- **Build Tool:** Maven
- **Frontend:** HTML + CSS + Vanilla JavaScript

## 🚀 Ejecutar (Solo Referencia)

```bash
cd legacy

# Con Maven wrapper
./mvnw spring-boot:run

# Con Docker
docker build -t cumple-legacy .
docker run -p 8080:8080 cumple-legacy
```

## 📝 Razones para la Migración

### Problemas del Stack Anterior
1. **Frontend monolítico:** HTML/CSS/JS acoplado al backend
2. **Sin TypeScript:** Dificulta mantenimiento y escalabilidad
3. **Deployment complejo:** Requiere JVM en servidor
4. **Sin separación frontend/backend:** Dificulta el trabajo independiente

### Ventajas del Nuevo Stack
1. **Separación clara:** Frontend (Next.js) y Backend (NestJS) independientes
2. **TypeScript:** Type safety en todo el stack
3. **Deployment flexible:** Frontend estático, Backend ligero
4. **Metodología SDD:** Especificaciones antes de código
5. **Monorepo:** Compartir código fácilmente

## 🗂️ Migración de Assets

### Imágenes
Las imágenes del carrusel están en:
```
legacy/src/main/resources/static/images/
```

**Migrar a:**
```
apps/frontend/public/images/
```

### Estilos (CSS)
El CSS original está en:
```
legacy/src/main/resources/static/css/style.css
```

**Convertir a:**
- Tailwind utility classes
- CSS Modules para componentes
- Framer Motion para animaciones

### JavaScript
El código JavaScript está en:
```
legacy/src/main/resources/static/js/main.js
```

**Convertir a:**
- Componentes React (TypeScript)
- Hooks personalizados
- Context API o Zustand para estado

## 📊 Análisis del Código Legacy

### Funcionalidades Implementadas
- ✅ Lockscreen con cuenta regresiva (eliminado en v2)
- ✅ Hero section con carta
- ✅ Carrusel de 16 fotos con modal
- ✅ Embed de Spotify
- ✅ Grid de recordatorios
- ✅ Puzzle de constelación SVG
- ✅ Contador de días juntos
- ✅ Mensaje de cierre

### Código Reutilizable
- **Lógica de cálculo de días:** `main.js` líneas 400-450
- **Animaciones CSS:** `style.css` @keyframes
- **Coordenadas de constelación:** `index.html` SVG
- **Paleta de colores:** Variables CSS en `style.css`

## 🔍 Referencia para Migración

Cuando migres una funcionalidad:
1. Revisa la implementación original aquí
2. Crea una spec en `/docs/arquitectura/specs/`
3. Implementa en el nuevo stack
4. Marca como migrado en el checklist

### Checklist de Migración

- [ ] Hero Section
- [ ] Carrusel de Fotos
- [ ] Nuestra Canción
- [ ] Recordatorios
- [ ] Constelación
- [ ] Contador de Días
- [ ] Cierre

## 📚 Documentación Original

No hay documentación formal del código legacy. Para entenderlo:
- Revisa `CONTEXT.md` original (archivado)
- Lee comentarios en el código
- Analiza estructura de archivos

## ⚡ Performance del Legacy

**Métricas registradas:**
- First Contentful Paint: ~2.1s
- Time to Interactive: ~3.5s
- Bundle size: ~450KB (sin optimización)

**Objetivo en v2.0:**
- FCP: <1.5s
- TTI: <2.5s
- Bundle size: <200KB (con code splitting)

## 🗑️ Eventual Eliminación

Este código se eliminará completamente una vez que:
1. Todas las funcionalidades estén migradas
2. La nueva versión esté en producción
3. Se confirme estabilidad por al menos 1 mes

**Fecha estimada de eliminación:** TBD

---

**Nota:** Si necesitas referencia histórica después de la eliminación, revisa el historial de Git:
```bash
git log --all --full-history -- legacy/
```
