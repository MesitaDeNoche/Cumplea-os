# 🔗 Conectar Frontend y Backend

## 📋 Resumen

- **Frontend**: Next.js en Vercel
- **Backend**: Spring Boot en Render
- **Conexión**: Variable de entorno `NEXT_PUBLIC_API_URL`

---

## ✅ Paso 1: Obtener URL del Backend

1. Ve a tu servicio en Render Dashboard: https://dashboard.render.com
2. Copia la URL del backend (arriba):
   ```
   https://cumple-backend.onrender.com
   ```

---

## ✅ Paso 2: Configurar Variable en Vercel

### 2.1 Ir a Vercel Dashboard

https://vercel.com/dashboard

### 2.2 Seleccionar tu Proyecto

Click en tu proyecto del frontend

### 2.3 Añadir Variable de Entorno

**Settings → Environment Variables → Add New:**

```
Name:  NEXT_PUBLIC_API_URL
Value: https://cumple-backend.onrender.com
```

**Selecciona los 3 ambientes:**
- ✅ Production
- ✅ Preview  
- ✅ Development

**Click:** Save

---

## ✅ Paso 3: Commit y Push Cambios del Frontend

Los archivos que acabo de crear necesitan ser committeados:

```bash
git add apps/frontend/
git commit -m "feat: Add backend connection and status component"
git push
```

**Archivos creados:**
- ✅ `apps/frontend/src/lib/api.ts` - Cliente de API
- ✅ `apps/frontend/src/components/BackendStatus.tsx` - Componente de estado
- ✅ `apps/frontend/src/app/page.tsx` - Página actualizada
- ✅ `apps/frontend/.env.local.example` - Ejemplo de env vars

---

## ✅ Paso 4: Redeploy en Vercel

Después de hacer push, Vercel redesplegará automáticamente.

**O manualmente:**
1. Dashboard → Deployments
2. Click en el último deployment
3. ... → Redeploy
4. ✅ Use existing build cache (más rápido)

---

## ✅ Paso 5: Verificar la Conexión

### 5.1 Abrir el Frontend

```
https://tu-proyecto.vercel.app
```

### 5.2 Buscar el Indicador de Estado

Deberías ver un recuadro con:

```
● Backend Status
  Connected
  
API URL: https://cumple-backend.onrender.com
```

- **● Verde (Connected)**: ✅ Todo funciona
- **● Rojo (Disconnected)**: ❌ Hay un problema

---

## 🐛 Troubleshooting

### ❌ Error: "Backend Status: Disconnected"

#### Causa 1: Variable de entorno no configurada

**Síntoma**: La API URL muestra `http://localhost:8080`

**Solución**:
1. Verifica en Vercel: Settings → Environment Variables
2. Debe existir: `NEXT_PUBLIC_API_URL=https://cumple-backend.onrender.com`
3. Redeploy

---

#### Causa 2: CORS bloqueando la conexión

**Síntoma**: Error en consola del navegador:
```
Access to fetch at 'https://cumple-backend.onrender.com/actuator/health' 
from origin 'https://tu-proyecto.vercel.app' has been blocked by CORS
```

**Solución**: Actualizar WebConfig.java

El CORS ya está configurado para aceptar `*.vercel.app`, pero si tu dominio es diferente:

```java
// legacy/src/main/java/com/cositas/cumple/WebConfig.java
.allowedOrigins(
    "https://*.vercel.app",           // ← Wildcards de Vercel
    "https://tu-dominio-exacto.com",  // ← O tu dominio específico
    "http://localhost:3000"
)
```

Después:
```bash
git add legacy/src/main/java/com/cositas/cumple/WebConfig.java
git commit -m "fix: Update CORS origins"
git push
```

Render redesplegará automáticamente.

---

#### Causa 3: Backend está durmiendo (Plan Free)

**Síntoma**: Primera request toma ~30 segundos, luego funciona

**Explicación**: El plan Free de Render duerme después de 15 minutos

**Solución A - Esperar**: 
- Espera 30-45 segundos
- Recarga la página
- Debería conectar

**Solución B - Upgrade**:
- Render Starter ($7/mes) → Nunca duerme

**Solución C - Keep-Alive Gratuito**:
Ver `RENDER_TROUBLESHOOTING.md` sección "Cold Start"

---

#### Causa 4: Backend tiene error

**Síntoma**: El backend no responde en absoluto

**Solución**:
1. Ve a Render Dashboard → Tu servicio → Logs
2. Busca errores en los logs
3. Verifica que diga "Started CumpleApplication"
4. Prueba manualmente: `curl https://cumple-backend.onrender.com/actuator/health`

---

### ❌ Error: "Module not found: Can't resolve '@/lib/api'"

**Causa**: TypeScript no encuentra el path alias

**Solución**: Verifica `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Si no existe, añádelo y reinicia el dev server.

---

## 📊 Verificación Manual

### Backend Health Check

```bash
curl https://cumple-backend.onrender.com/actuator/health
```

**Respuesta esperada:**
```json
{
  "status": "UP"
}
```

### Frontend puede alcanzar el Backend

Abre la consola del navegador (F12) en tu frontend y ejecuta:

```javascript
fetch('https://cumple-backend.onrender.com/actuator/health')
  .then(r => r.json())
  .then(console.log)
```

**Resultado esperado:**
```
{ status: "UP" }
```

---

## 🎯 Cómo Usar la API en tu Código

### Ejemplo 1: Hacer GET Request

```typescript
// En cualquier componente o página
import { fetchFromBackend } from '@/lib/api';

async function getData() {
  try {
    const data = await fetchFromBackend('/api/tu-endpoint');
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Ejemplo 2: Hacer POST Request

```typescript
import { fetchFromBackend } from '@/lib/api';

async function sendData(payload: any) {
  try {
    const result = await fetchFromBackend('/api/tu-endpoint', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### Ejemplo 3: En un Componente React

```typescript
'use client';

import { useState, useEffect } from 'react';
import { fetchFromBackend } from '@/lib/api';

export default function MiComponente() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromBackend('/api/tu-endpoint')
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  
  return <div>{/* Renderizar data */}</div>;
}
```

---

## 🔐 Variables de Entorno

### En Desarrollo (Local)

Crea `apps/frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_BIRTHDAY_CODE=0712
```

### En Producción (Vercel)

**Vercel Dashboard → Settings → Environment Variables:**

```
NEXT_PUBLIC_API_URL=https://cumple-backend.onrender.com
NEXT_PUBLIC_BIRTHDAY_CODE=0712
```

---

## ✅ Checklist Final

Después de configurar todo:

- [ ] Variable `NEXT_PUBLIC_API_URL` configurada en Vercel
- [ ] Variable `NEXT_PUBLIC_BIRTHDAY_CODE` configurada en Vercel
- [ ] Código del frontend commiteado y pusheado
- [ ] Frontend redesplegado en Vercel
- [ ] Backend corriendo en Render (verde en dashboard)
- [ ] Abrir frontend → Ver "Backend Status: Connected" en verde
- [ ] Health check manual funciona: `curl https://backend.onrender.com/actuator/health`
- [ ] No hay errores de CORS en la consola del navegador

---

## 🎉 ¡Listo!

Tu frontend y backend están conectados. Ahora puedes:

1. Crear endpoints en Spring Boot
2. Llamarlos desde Next.js con `fetchFromBackend()`
3. Ambos se redesplegarán automáticamente al hacer push

---

## 📚 Recursos

- **Spring Boot CORS**: https://spring.io/guides/gs/rest-service-cors/
- **Next.js Environment Variables**: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

**Última actualización**: Octubre 21, 2026
