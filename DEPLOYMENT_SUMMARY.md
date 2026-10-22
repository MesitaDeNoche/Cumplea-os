# 🚀 Resumen de Deployment - Proyecto Cumpleaños

**Fecha**: Octubre 21, 2026  
**Estado**: ✅ Configuración completa, listo para deployment

---

## 📦 Arquitectura

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  Usuario                                               │
│     │                                                  │
│     ├─► Frontend (Next.js 16.4.2)                     │
│     │   • Vercel                                       │
│     │   • apps/frontend/                               │
│     │   • React 19, TypeScript 5                       │
│     │   • URL: https://[tu-proyecto].vercel.app        │
│     │                                                  │
│     └─► Backend (Spring Boot 3.5.14)                  │
│         • Render                                       │
│         • legacy/                                      │
│         • Java 17, Maven                               │
│         • URL: https://cumple-backend.onrender.com     │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## ✅ Cambios Realizados

### Backend (Render)

| Archivo | Acción | Propósito |
|---------|--------|-----------|
| `render.yaml` | ✅ Creado | Config automática de Render |
| `legacy/system.properties` | ✅ Creado | Define Java 17 |
| `legacy/pom.xml` | ✅ Modificado | Añadido `spring-boot-starter-actuator` |
| `legacy/src/.../WebConfig.java` | ✅ Creado | Configuración de CORS |
| `legacy/.../application.properties` | ✅ Modificado | Health check endpoints |
| `RENDER_DEPLOYMENT.md` | ✅ Creado | Guía completa de deployment |

### Frontend (Vercel)

| Archivo | Acción | Propósito |
|---------|--------|-----------|
| `.vercelignore` | ✅ Creado | Ignora archivos de pnpm del monorepo |
| `apps/frontend/vercel.json` | ✅ Modificado | Fuerza npm, configura env vars |
| `apps/frontend/package.json` | ✅ Modificado | Añadido `engines` sin pnpm |
| `apps/frontend/.npmrc` | ✅ Creado | `engine-strict=false` |
| `apps/frontend/package-lock.json` | ✅ Regenerado | Con npm en vez de pnpm |
| `apps/frontend/VERCEL_FIX.md` | ✅ Creado | Guía de troubleshooting |

---

## 🎯 Comandos para Deployment

### 1️⃣ Commit y Push

```bash
git add .
git commit -m "feat: Configure deployments for Vercel (frontend) and Render (backend)"
git push
```

---

### 2️⃣ Deploy Frontend en Vercel

#### Configuración del Dashboard

**Settings → General → Build & Development Settings:**

```yaml
Framework Preset:      Next.js
Root Directory:        apps/frontend
Build Command:         npm run build        # OVERRIDE
Install Command:       npm install          # OVERRIDE
Output Directory:      .next
Node.js Version:       20.x
```

#### Variables de Entorno

**Settings → Environment Variables → Add:**

```
Name:  NEXT_PUBLIC_BIRTHDAY_CODE
Value: 0712
Environments: ✓ Production  ✓ Preview  ✓ Development

Name:  NEXT_PUBLIC_API_URL
Value: https://cumple-backend.onrender.com
Environments: ✓ Production  ✓ Preview  ✓ Development
```

#### Redeploy

**Deployments → (último deployment) → ... → Redeploy**
- ✅ Selecciona "Redeploy without cache"

---

### 3️⃣ Deploy Backend en Render

#### Opción A: Blueprint (Recomendado)

1. **Ir a**: https://dashboard.render.com
2. **Click**: "New +" → "Blueprint"
3. **Repositorio**: `MesitaDeNoche/Cumplea-os`
4. **Rama**: `main`
5. Render detectará `render.yaml` automáticamente
6. **Click**: "Apply"

#### Opción B: Manual

1. **Ir a**: https://dashboard.render.com
2. **Click**: "New +" → "Web Service"
3. **Repositorio**: `MesitaDeNoche/Cumplea-os`
4. **Root Directory**: `legacy`
5. **Build Command**: `./mvnw clean install -DskipTests`
6. **Start Command**: `java -jar target/cumple-0.0.1-SNAPSHOT.jar`
7. **Env Vars**:
   ```
   PORT=8080
   SPRING_PROFILES_ACTIVE=prod
   JAVA_TOOL_OPTIONS=-Xmx512m -Xms256m
   ```
8. **Health Check Path**: `/actuator/health`
9. **Click**: "Create Web Service"

---

## ✅ Verificación

### Frontend (Vercel)

```bash
# 1. Verifica que el build pase
# Deberías ver en los logs:
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (4/4)
✓ Finalizing page optimization

# 2. Verifica que la app cargue
curl https://tu-proyecto.vercel.app
# Deberías ver HTML

# 3. Verifica las env vars
# En el código, console.log(process.env.NEXT_PUBLIC_BIRTHDAY_CODE)
# Deberías ver: "0712"
```

### Backend (Render)

```bash
# 1. Verifica el health check
curl https://cumple-backend.onrender.com/actuator/health

# Respuesta esperada:
{
  "status": "UP"
}

# 2. Verifica que el servidor responde
curl https://cumple-backend.onrender.com

# Deberías ver la página home de Spring Boot
```

---

## 🐛 Troubleshooting

### Error: ERR_PNPM_UNSUPPORTED_ENGINE (Vercel)

**Síntoma**: Build falla con error de pnpm

**Solución**:
1. Verifica que `.vercelignore` exista en la raíz
2. Verifica la configuración en Vercel Dashboard:
   - Root Directory: `apps/frontend`
   - Install Command: `npm install` (override)
   - Build Command: `npm run build` (override)
3. Redeploy sin cache

**Documentación**: `apps/frontend/VERCEL_FIX.md`

---

### Error: Health check failed (Render)

**Síntoma**: Render marca el servicio como "Unhealthy"

**Solución**:
1. Verifica que `spring-boot-starter-actuator` esté en `pom.xml`
2. Verifica que `application.properties` tenga:
   ```properties
   management.endpoints.web.exposure.include=health,info
   ```
3. Verifica los logs en Render Dashboard

**Documentación**: `RENDER_DEPLOYMENT.md` (sección Troubleshooting)

---

### Error: CORS (Frontend → Backend)

**Síntoma**: Frontend no puede hacer requests al backend

**Solución**:
1. Verifica que `WebConfig.java` exista en `legacy/src/main/java/com/cositas/cumple/`
2. Verifica que los origins incluyan tu URL de Vercel:
   ```java
   .allowedOrigins(
       "https://*.vercel.app",  // ← Wildcards de Vercel
       "http://localhost:3000"
   )
   ```
3. Redeploy backend

---

### Cold Start (Render Free Plan)

**Síntoma**: Primera request después de 15 min toma ~30 segundos

**Explicación**: El plan Free de Render duerme los servicios después de 15 minutos de inactividad.

**Soluciones**:

**A) Hacer ping periódico** (Free):
```yaml
# GitHub Actions: .github/workflows/keep-alive.yml
name: Keep Backend Alive
on:
  schedule:
    - cron: '*/10 * * * *'  # Cada 10 minutos
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - run: curl https://cumple-backend.onrender.com/actuator/health
```

**B) Upgrade a Starter** ($7/mes):
- No duerme
- 512 MB RAM
- 0.5 CPU dedicado

---

## 📊 Costos Estimados

| Servicio | Plan | Costo | Limitaciones |
|----------|------|-------|--------------|
| **Vercel** | Hobby | $0/mes | 100 GB bandwidth, unlimited sites |
| **Render** | Free | $0/mes | Duerme después de 15 min |
| **GitHub** | Free | $0/mes | Repos públicos ilimitados |
| **Total** | | **$0/mes** | Suficiente para un proyecto personal |

### Upgrade Opcional

| Servicio | Plan | Costo | Beneficios |
|----------|------|-------|------------|
| Vercel | Pro | $20/mes | 1 TB bandwidth, analytics |
| Render | Starter | $7/mes | No duerme, 0.5 CPU dedicado |
| **Total** | | **$27/mes** | Para producción real |

---

## 📚 Documentación

- **Frontend**: `apps/frontend/VERCEL_FIX.md`
- **Backend**: `RENDER_DEPLOYMENT.md`
- **Este resumen**: `DEPLOYMENT_SUMMARY.md`

---

## 🎉 Estado Actual

### ✅ Completado

- [x] Configuración de deployment para Vercel
- [x] Configuración de deployment para Render
- [x] CORS configurado
- [x] Health checks configurados
- [x] Variables de entorno documentadas
- [x] Troubleshooting guides creadas
- [x] Blueprint de Render (render.yaml)

### ⏳ Siguiente Paso

- [ ] Commit y push de los cambios
- [ ] Deploy frontend en Vercel
- [ ] Deploy backend en Render
- [ ] Verificar que ambos servicios estén UP
- [ ] Conectar frontend con backend
- [ ] Probar la integración end-to-end

---

## 🚀 Comandos Rápidos

```bash
# 1. Commit todo
git add .
git commit -m "feat: Configure deployments for Vercel and Render"
git push

# 2. Verifica el estado de los archivos
git status

# 3. Verifica que no haya errores de sintaxis en los archivos
cat render.yaml
cat .vercelignore
```

---

**🎯 Una vez que hagas push, comparte los logs de deployment y te ayudo a verificar que todo funcione correctamente.**

---

**Última actualización**: Octubre 21, 2026
