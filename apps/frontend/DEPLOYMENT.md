# Deployment Guide - Frontend

## Vercel Deployment (Recommended for Frontend)

### Prerequisites

1. **Vercel account** (free tier works)
2. **GitHub repository** with your code
3. **Environment variables** configured

### Step 1: Prepare for Deployment

Los siguientes archivos ya están configurados:
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `.npmrc` - Forzar npm en lugar de pnpm
- ✅ `.vercelignore` - Ignorar archivos innecesarios
- ✅ `package-lock.json` - Lockfile de npm

### Step 2: Configure Vercel Project

#### Opción A: Deploy desde Vercel Dashboard

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New" → "Project"
3. Importa tu repositorio de GitHub
4. **Configuración importante**:
   ```
   Framework Preset: Next.js
   Root Directory: apps/frontend
   Build Command: npm run build
   Install Command: npm install
   Output Directory: .next
   Node.js Version: 20.x
   ```

5. **Environment Variables** (añadir en Vercel dashboard):
   ```
   NEXT_PUBLIC_BIRTHDAY_CODE=0712
   ```

6. Click "Deploy"

#### Opción B: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy desde el directorio frontend
cd apps/frontend
vercel

# Seguir prompts:
# - Set up and deploy: Yes
# - Which scope: [tu cuenta]
# - Link to existing project: No
# - Project name: birthday-app-frontend
# - Directory: ./
# - Override settings: No
```

### Step 3: Configure Environment Variables

En Vercel Dashboard → Project Settings → Environment Variables:

```
NEXT_PUBLIC_BIRTHDAY_CODE = 0712
```

**Importante**: Marca esta variable para todos los environments (Production, Preview, Development)

### Step 4: Verify Deployment

1. Vercel te dará una URL (ej: `https://birthday-app-frontend.vercel.app`)
2. Abre la URL en tu navegador
3. Verifica que:
   - ✅ La página carga correctamente
   - ✅ No hay errores en consola (F12)
   - ✅ Security headers están aplicados

### Troubleshooting Vercel Deployment

#### Error: "ERR_PNPM_UNSUPPORTED_ENGINE"

**Solución**: Ya está configurado en `vercel.json` y `.npmrc`

Si persiste:
1. Verifica que `vercel.json` existe en `apps/frontend/`
2. En Vercel Dashboard → Settings → General:
   - Install Command: `npm install`
   - Build Command: `npm run build`

#### Error: "NEXT_PUBLIC_BIRTHDAY_CODE is not defined"

**Solución**:
1. Ve a Vercel Dashboard → Settings → Environment Variables
2. Añade `NEXT_PUBLIC_BIRTHDAY_CODE` con valor `0712`
3. Marca los 3 environments (Production, Preview, Development)
4. Redeploy (Deployments → tres puntos → Redeploy)

#### Error: Build fails with TypeScript errors

**Solución**:
```bash
# Verifica localmente primero
cd apps/frontend
npm run build

# Si falla localmente, arregla los errores
npx tsc --noEmit
```

#### Error: Module not found

**Solución**: Verifica que todas las dependencias están en `package.json`:
```bash
cd apps/frontend
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push
```

### Build Performance

Expected build times on Vercel:
- **First build**: 2-4 minutes
- **Subsequent builds** (with cache): 1-2 minutes

### Custom Domain (Optional)

1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Vercel auto-configures SSL

---

## Alternative: GitHub Pages (Static Export)

Si prefieres GitHub Pages (gratis, sin limits):

### Step 1: Configure Next.js for Static Export

Actualiza `next.config.ts`:
```typescript
const nextConfig = {
  // ... existing config
  output: 'export',
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
};
```

### Step 2: Build Static Site

```bash
cd apps/frontend
npm run build
# Esto creará la carpeta 'out/' con archivos estáticos
```

### Step 3: Deploy to GitHub Pages

**Opción A: Manual**
```bash
# En la rama gh-pages
git checkout --orphan gh-pages
cp -r apps/frontend/out/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

**Opción B: GitHub Actions (Automatizado)**

Crea `.github/workflows/deploy.yml` en la raíz del repo:
```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        working-directory: ./apps/frontend
        run: npm ci
      
      - name: Build
        working-directory: ./apps/frontend
        run: npm run build
        env:
          NEXT_PUBLIC_BIRTHDAY_CODE: ${{ secrets.NEXT_PUBLIC_BIRTHDAY_CODE }}
      
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: apps/frontend/out
```

**Configure GitHub Secrets**:
1. Repository → Settings → Secrets → Actions
2. Add `NEXT_PUBLIC_BIRTHDAY_CODE` = `0712`

**Enable GitHub Pages**:
1. Repository → Settings → Pages
2. Source: Deploy from branch `gh-pages`
3. Save

Tu app estará en: `https://[tu-usuario].github.io/[repo-name]/`

---

## Alternative: Oracle Cloud (Backend + Frontend)

Para cuando implementes el backend (SPEC-006), necesitarás Oracle Cloud.

### Arquitectura Recomendada

```
┌─────────────────────────────────────┐
│     Frontend (Vercel/GitHub Pages)  │
│     https://birthday-app.vercel.app │
└─────────────┬───────────────────────┘
              │
              │ HTTPS API calls
              │
              ▼
┌─────────────────────────────────────┐
│  Backend (Oracle Cloud VM)          │
│  https://api.birthday-app.com       │
│  - NestJS API                       │
│  - Email/WhatsApp/SMS services      │
│  - SSL (Let's Encrypt)              │
└─────────────────────────────────────┘
```

**Ventajas**:
- Frontend: Deploy automático, CDN global, SSL gratis (Vercel)
- Backend: Control total, siempre activo, APIs externas (Oracle Cloud)

---

## Recommended Setup

### Para desarrollo/MVP:
✅ **Frontend**: Vercel (es el más simple y rápido)  
✅ **Backend**: Oracle Cloud VM (cuando llegues a SPEC-006)

### Para producción:
✅ **Frontend**: Vercel con dominio custom  
✅ **Backend**: Oracle Cloud con SSL (Let's Encrypt)  
✅ **Monitoring**: Vercel Analytics + Sentry

---

## Deployment Checklist

Antes de hacer deploy:

- [ ] `npm run build` funciona localmente sin errores
- [ ] `npx tsc --noEmit` pasa sin errores TypeScript
- [ ] `.env.local.example` documentado (no commitearlo)
- [ ] `vercel.json` configurado
- [ ] Environment variables listas
- [ ] Security headers verificados
- [ ] Git repo actualizado

Después de deploy:

- [ ] Página carga correctamente
- [ ] Environment variables funcionan
- [ ] No hay errores en console (F12)
- [ ] Security headers aplicados (Network tab)
- [ ] Performance aceptable (Lighthouse > 90)

---

## Quick Deploy Commands

```bash
# Deploy a Vercel (producción)
cd apps/frontend
vercel --prod

# Deploy preview (testing)
vercel

# Ver logs de deployment
vercel logs [deployment-url]

# Ver environment variables
vercel env ls

# Añadir environment variable
vercel env add NEXT_PUBLIC_BIRTHDAY_CODE production
```

---

**Last Updated**: October 21, 2026  
**Recommended**: Vercel para frontend, Oracle Cloud para backend (SPEC-006)
