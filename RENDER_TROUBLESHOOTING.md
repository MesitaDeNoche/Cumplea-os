# 🐛 Troubleshooting: Render Deployment

## Error: "sh: 1: next: not found" + ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL

### 🔴 Síntoma

```
yarn run v1.22.22
$ pnpm --filter frontend build && pnpm --filter backend build
> frontend@0.1.0 build /opt/render/project/src/apps/frontend
> next build
sh: 1: next: not found
```

### 🔍 Causa

Render detectó el `package.json` en la raíz del monorepo y asumió que es un **proyecto Node.js**, cuando en realidad el backend es **Java (Spring Boot)**.

**¿Por qué pasó esto?**
1. Render busca `package.json` en la raíz
2. Encuentra el archivo del monorepo
3. Asume que debe usar yarn/npm
4. Intenta ejecutar el script `build` que usa pnpm
5. El script intenta hacer build del frontend (Next.js) y backend (vacío)
6. Falla porque Next.js no está instalado en el root

### ✅ Solución

**Usar Docker** en lugar de detectar automáticamente el runtime.

---

## 🔧 Pasos para Arreglar

### 1. Archivos Creados/Modificados

#### `render.yaml` (raíz)
```yaml
services:
  - type: web
    name: cumple-backend
    env: docker                          # ← Fuerza Docker
    dockerfilePath: ./legacy/Dockerfile  # ← Dockerfile específico
    dockerContext: ./legacy              # ← Contexto del build
    envVars:
      - key: PORT
        value: 8080
```

#### `legacy/Dockerfile`
```dockerfile
# Multi-stage build
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/cumple-0.0.1-SNAPSHOT.jar app.jar
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_TOOL_OPTIONS="-Xmx512m -Xms256m"
ENTRYPOINT ["sh", "-c", "java $JAVA_TOOL_OPTIONS -Dserver.port=${PORT:-8080} -jar app.jar"]
```

#### `legacy/.dockerignore`
```
# Ignorar archivos de Node.js
node_modules/
package.json
package-lock.json
yarn.lock
pnpm-lock.yaml
apps/
```

### 2. Commit y Push

```bash
git add .
git commit -m "fix: Configure Render to use Docker instead of Node.js"
git push
```

### 3. Redeploy en Render

**Opción A: Si ya tienes un servicio creado**
1. Dashboard → Tu servicio
2. Settings → Redeploy
3. ✅ Ahora usará Docker

**Opción B: Si aún NO creaste el servicio**
1. Dashboard → New + → Blueprint
2. Conectar repo: `MesitaDeNoche/Cumplea-os`
3. Render detectará `render.yaml`
4. Click "Apply"

---

## ✅ Resultado Esperado

### Logs de Build (Correcto)

```
==> Building image from Dockerfile
Step 1/12 : FROM maven:3.9-eclipse-temurin-17-alpine AS build
Step 2/12 : WORKDIR /app
Step 3/12 : COPY pom.xml .
...
[INFO] Building jar: /app/target/cumple-0.0.1-SNAPSHOT.jar
[INFO] BUILD SUCCESS
...
==> Pushing image to registry
==> Deploy successful!
```

### Logs de Startup (Correcto)

```
Starting application...

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::               (v3.5.14)

Started CumpleApplication in 3.456 seconds
Tomcat started on port(s): 8080 (http)
```

---

## 🐛 Otros Errores Comunes

### Error: "The JAVA_HOME environment variable is not defined"

**Causa**: No tienes Java instalado localmente (en tu máquina).

**Solución**: 
- ✅ **No necesitas instalar Java localmente**
- El Dockerfile ya incluye Java 17
- Render compilará en su servidor con el Dockerfile

---

### Error: "Cannot find module 'next'"

**Causa**: Render está intentando usar Node.js en lugar de Docker.

**Solución**: 
1. Verifica que `render.yaml` tenga `env: docker`
2. Verifica que `dockerfilePath` esté correcto
3. Redeploy

---

### Error: "docker: Error response from daemon: Dockerfile not found"

**Causa**: Render no encuentra el Dockerfile.

**Solución**:
Verifica en `render.yaml`:
```yaml
dockerfilePath: ./legacy/Dockerfile  # ← Debe empezar con ./
dockerContext: ./legacy              # ← Contexto relativo a la raíz
```

---

### Error: "Health check failed"

**Síntoma**: Render marca el servicio como "Unhealthy" después de deployar.

**Causa**: El endpoint `/actuator/health` no responde.

**Solución**:
1. Verifica que `spring-boot-starter-actuator` esté en `pom.xml`
2. Verifica `application.properties`:
```properties
management.endpoints.web.exposure.include=health,info
```
3. Verifica los logs: ¿La app inició correctamente?
4. Prueba manualmente: `curl https://tu-backend.onrender.com/actuator/health`

---

### Error: "Port 8080 already in use"

**Causa**: El puerto está hardcoded y no usa la variable `$PORT` de Render.

**Solución**:
Verifica en el Dockerfile:
```dockerfile
ENTRYPOINT ["sh", "-c", "java ... -Dserver.port=${PORT:-8080} -jar app.jar"]
#                                               ^^^^^^^^^^^^
#                                    Usa $PORT si existe, sino 8080
```

---

### Warning: "pnpm appears to be invalid"

**Síntoma**: 
```
warning cumple-monorepo@2.0.0: The engine "pnpm" appears to be invalid.
```

**Causa**: Render ve el `package.json` de la raíz antes de usar Docker.

**Solución**: 
- ✅ **Ignorar este warning**
- Es solo un warning, no afecta el build
- Docker ya no usa ese `package.json`
- Si molesta, puedes añadir `.renderignore` en la raíz:
```
package.json
node_modules/
apps/
```

---

## 📚 Recursos

- **Render Docker Docs**: https://render.com/docs/docker
- **Render Blueprint Spec**: https://render.com/docs/blueprint-spec
- **Spring Boot Docs**: https://spring.io/guides/gs/spring-boot-docker/

---

## 🎯 Checklist de Verificación

Antes de deployar, verifica:

- [ ] `render.yaml` existe en la raíz
- [ ] `render.yaml` tiene `env: docker`
- [ ] `legacy/Dockerfile` existe
- [ ] `legacy/.dockerignore` existe (opcional pero recomendado)
- [ ] `pom.xml` tiene `spring-boot-starter-actuator`
- [ ] `application.properties` expone `/actuator/health`
- [ ] Commit y push completos

Después de deployar, verifica:

- [ ] Build exitoso (sin errores en logs)
- [ ] App inició correctamente (logs muestran "Started CumpleApplication")
- [ ] Health check pasa: `curl https://tu-backend.onrender.com/actuator/health`
- [ ] Responde `{"status":"UP"}`

---

**Si sigues teniendo problemas, comparte los logs completos de Render y te ayudo.** 🚀
