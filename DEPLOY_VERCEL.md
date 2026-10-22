# 🚀 Deploy Frontend con Vercel CLI

## Instrucciones Paso a Paso

### 1. Ir al directorio del frontend

```bash
cd apps/frontend
```

### 2. Login en Vercel (si no lo has hecho)

```bash
vercel login
```

Te pedirá que confirmes en el navegador.

### 3. Deploy

```bash
vercel --prod
```

**Durante el setup, responde:**

```
? Set up and deploy "apps/frontend"? [Y/n] Y
? Which scope do you want to deploy to? [Tu cuenta]
? Link to existing project? [y/N] N
? What's your project's name? cumple-frontend
? In which directory is your code located? ./ 
? Want to modify these settings? [y/N] N
```

Vercel automáticamente detectará Next.js y hará el build.

### 4. Configurar Variables de Entorno

Después del primer deploy:

```bash
vercel env add NEXT_PUBLIC_API_URL production
# Cuando pregunte, escribe: https://cumple-backend-latest.onrender.com

vercel env add NEXT_PUBLIC_BIRTHDAY_CODE production
# Cuando pregunte, escribe: 0712
```

### 5. Redeploy con las Variables

```bash
vercel --prod
```

---

## ✅ Resultado

Vercel te dará una URL como:

```
✅ Production: https://cumple-frontend.vercel.app
```

---

## 🔧 Si Hay Problemas

### Error: "No such file or directory"

Asegúrate de estar en `apps/frontend`:
```bash
pwd  # Debe mostrar: .../Cumplea-os/apps/frontend
```

### Error: "Build failed"

Verifica que el build funciona localmente:
```bash
npm run build
```

### Error: "Not authenticated"

```bash
vercel logout
vercel login
```

---

## 📚 Comandos Útiles

```bash
# Ver logs
vercel logs cumple-frontend

# Ver configuración
vercel inspect

# Ver variables de entorno
vercel env ls

# Redeploy
vercel --prod

# Deploy a preview (no producción)
vercel
```

---

**Última actualización**: Octubre 21, 2026
