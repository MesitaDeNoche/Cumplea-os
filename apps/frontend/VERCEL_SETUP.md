# Vercel Setup - Quick Start

## ⚡ Quick Fix para el Error Actual

Tu error: `ERR_PNPM_UNSUPPORTED_ENGINE`

**Solución aplicada**:
- ✅ Creado `vercel.json` con configuración npm
- ✅ Creado `.npmrc` para forzar npm
- ✅ Creado `.vercelignore` para ignorar pnpm workspace
- ✅ Generado `package-lock.json` para npm

## 🚀 Pasos para Desplegar Ahora

### 1. Commit los cambios nuevos

```bash
git add apps/frontend/vercel.json
git add apps/frontend/.npmrc
git add apps/frontend/.vercelignore
git add apps/frontend/package-lock.json
git add apps/frontend/DEPLOYMENT.md
git add apps/frontend/VERCEL_SETUP.md
git commit -m "Configure Vercel deployment with npm"
git push
```

### 2. Reconfigura el proyecto en Vercel

En el Dashboard de Vercel:

1. **Settings** → **General** → **Build & Development Settings**:
   - Framework Preset: `Next.js`
   - Root Directory: `apps/frontend` ⚠️ IMPORTANTE
   - Build Command: `npm run build` (override)
   - Install Command: `npm install` (override)
   - Output Directory: `.next` (default está bien)

2. **Settings** → **General** → **Node.js Version**:
   - Selecciona: `20.x` (recomendado)

3. **Settings** → **Environment Variables**:
   - Añade: `NEXT_PUBLIC_BIRTHDAY_CODE` = `0712`
   - Marca: Production, Preview, Development (los 3)

### 3. Redeploy

- Ve a **Deployments**
- Click en los 3 puntos del último deployment
- **Redeploy**

### 4. Verificar

Una vez que el deployment termine:
- Abre la URL que te da Vercel
- Deberías ver la página de Next.js por defecto
- Abre Console (F12) → no deberían haber errores

---

## 🔍 Si Sigue Fallando

### Error: "Root Directory not found"

**Solución**: En Vercel Settings → General:
```
Root Directory: apps/frontend
```
(NO dejes en blanco)

### Error: "Module not found @/..."

**Solución**: Verifica que `package-lock.json` esté en el repositorio:
```bash
git add apps/frontend/package-lock.json
git commit -m "Add package-lock for Vercel"
git push
```

### Error: "NEXT_PUBLIC_BIRTHDAY_CODE is not defined"

**Solución**: 
1. Vercel Dashboard → Settings → Environment Variables
2. Añade la variable con valor `0712`
3. Marca los 3 environments
4. Redeploy

---

## 📊 Estado Esperado del Deployment

### Build Output (si todo sale bien):

```
✓ Compiling...
✓ Compiled successfully
✓ Running TypeScript...
✓ Generating static pages...
✓ Finalizing page optimization...

Build completed in 2m 34s
```

### URLs Generadas:

- **Production**: https://[tu-proyecto].vercel.app
- **Preview** (cada push): https://[tu-proyecto]-[hash].vercel.app

---

## ⚙️ Configuración Recomendada de Vercel

```json
// vercel.json (ya está creado)
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

---

## 🎯 Respuesta a tu Pregunta

> ¿Está bien correr el front en Vercel o debería correrlo en otro lado?

**✅ SÍ, Vercel es PERFECTO para el frontend Next.js**

**Ventajas de Vercel para frontend**:
- ✅ Deploy automático en cada push
- ✅ SSL gratis (HTTPS)
- ✅ CDN global (rápido en todo el mundo)
- ✅ Optimizaciones automáticas de Next.js
- ✅ Gratis para proyectos personales
- ✅ Dominios custom gratis
- ✅ Preview deployments (testing antes de producción)

**Cuándo necesitarás Oracle Cloud**:
- 🔄 **Después**, para el backend (SPEC-006: Botiquín de Emergencia)
- 🔄 Backend NestJS con APIs de Email/WhatsApp/SMS
- 🔄 Servicios que necesitan estar 24/7 activos

**Arquitectura recomendada**:
```
Frontend (Vercel) ←→ Backend (Oracle Cloud)
  Next.js               NestJS + APIs
  Estático              Dinámico
  Global CDN            Servidor dedicado
```

---

## ✅ Checklist Rápido

Antes de redeploy en Vercel:

- [x] `vercel.json` existe
- [x] `.npmrc` existe
- [x] `package-lock.json` existe y tiene contenido
- [ ] Cambios commiteados y pusheados a GitHub
- [ ] Root Directory en Vercel = `apps/frontend`
- [ ] Environment variable `NEXT_PUBLIC_BIRTHDAY_CODE` configurada
- [ ] Node.js version = 20.x

---

## 🆘 Necesitas Ayuda

Si después de seguir estos pasos sigue fallando:

1. **Comparte el error completo** del build log en Vercel
2. **Screenshot** del error
3. **Verifica** la configuración en Settings

---

**TLDR**: Has el commit de los archivos nuevos, configura Root Directory en Vercel como `apps/frontend`, y redeploy. Debería funcionar. 🚀
