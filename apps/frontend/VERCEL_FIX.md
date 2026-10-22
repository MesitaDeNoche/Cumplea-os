# SOLUCIÓN FINAL: Configuración de Vercel para Monorepo

## 🔴 Problema Persistente

Vercel detecta `pnpm-workspace.yaml` en la raíz del repo y activa pnpm, causando:
```
ERR_PNPM_UNSUPPORTED_ENGINE
```

## ✅ Solución Aplicada

### Archivos Modificados:

1. **`apps/frontend/package.json`**
   - Añadido `"engines": { "node": ">=20.0.0" }`
   - SIN referencia a pnpm

2. **`apps/frontend/vercel.json`**
   - `installCommand`: `npm install`
   - `buildCommand`: `npm run build`

3. **`/.vercelignore`** (en la raíz)
   - Ignora `pnpm-workspace.yaml`
   - Ignora `package.json` de la raíz

4. **`apps/frontend/.npmrc`**
   - `engine-strict=false`

5. **`apps/frontend/package-lock.json`**
   - Regenerado con npm

---

## 🚀 Configuración en Vercel Dashboard

### CRÍTICO: Estos ajustes son OBLIGATORIOS

**Settings → General → Build & Development Settings**:

```
Framework Preset:      Next.js
Root Directory:        apps/frontend
Build Command:         npm run build
Install Command:       npm install  
Output Directory:      .next
Node.js Version:       20.x
```

**Settings → Environment Variables**:

```
Key:   NEXT_PUBLIC_BIRTHDAY_CODE
Value: 0712
✓ Production
✓ Preview  
✓ Development
```

---

## 🔧 Comandos para Aplicar la Solución

```bash
# 1. Commit todos los cambios
git add .vercelignore
git add apps/frontend/package.json
git add apps/frontend/vercel.json
git add apps/frontend/.npmrc
git add apps/frontend/package-lock.json
git add apps/frontend/VERCEL_FIX.md
git commit -m "fix: Force npm for Vercel deployment"
git push

# 2. En Vercel Dashboard:
#    - Ir a Settings → General
#    - Build & Development Settings → Edit
#    - Override los comandos como se muestra arriba
#    - Save
#
#    - Ir a Deployments → Último deployment
#    - Click en ... → Redeploy → Sin cache
```

---

## 🎯 ¿Por Qué Esto Es Necesario?

Vercel tiene esta lógica de detección:

1. ✅ Encuentra `pnpm-workspace.yaml` en la raíz → Activa pnpm
2. ❌ Lee `package.json` de la raíz → Ve `"engines": { "pnpm": ">=8.0.0" }`
3. ❌ Intenta usar pnpm pero los comandos son npm → ERROR

**Solución**: `.vercelignore` hace que Vercel ignore esos archivos de la raíz.

---

## 🧪 Verificación Local

Antes de hacer push, verifica localmente:

```bash
cd apps/frontend

# 1. Limpiar
rm -rf node_modules .next

# 2. Instalar con npm (como Vercel)
npm install

# 3. Build
npm run build

# 4. Si todo pasa, está listo
```

---

## ⚡ Si Sigue Fallando

### Opción A: Deploy Solo el Frontend (Sin Monorepo)

Crea un repo separado solo con `apps/frontend/`:

```bash
# Crear nuevo repo
mkdir birthday-frontend
cd birthday-frontend

# Copiar solo frontend
cp -r ../apps/frontend/* .

# Inicializar git
git init
git add .
git commit -m "Initial commit"

# Conectar con GitHub (nuevo repo)
git remote add origin https://github.com/tu-usuario/birthday-frontend.git
git push -u origin main

# Importar en Vercel desde este nuevo repo
```

### Opción B: Usar el Override de Vercel CLI

Si tienes Vercel CLI instalado:

```bash
cd apps/frontend

# Deploy directo
vercel --prod

# Cuando pregunte:
# - Set up and deploy: Yes
# - Link to existing: No
# - Project name: birthday-frontend
# - Directory: ./
# - Override settings: Yes
# - Build Command: npm run build
# - Output Directory: .next
# - Install Command: npm install
```

---

## 📊 Estado Esperado del Build

Si la configuración es correcta, verás:

```
> npm install
added 358 packages in 45s

> npm run build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (4/4)
✓ Finalizing page optimization

Build completed in 2m 15s
```

❌ **NO** deberías ver:
```
ERR_PNPM_UNSUPPORTED_ENGINE
```

---

## 🎯 Resumen

**El problema**: Vercel detecta pnpm del monorepo pero intentas usar npm  
**La solución**: `.vercelignore` + overrides en Vercel Dashboard  
**Alternativa**: Repo separado solo con frontend (más simple)

---

**Última actualización**: Octubre 21, 2026
