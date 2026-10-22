# 🚀 Guía de Deployment: Backend Java en Render

## 📋 Arquitectura de Deployment

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Frontend (Next.js)  →  Vercel                     │
│  Backend (Spring Boot)  →  Render                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Backend en Render (Spring Boot)

### Prerequisitos

- ✅ Cuenta en [Render.com](https://render.com)
- ✅ Repositorio conectado a GitHub
- ✅ Java 17 configurado en `system.properties`
- ✅ Spring Boot Actuator añadido al `pom.xml`

---

## 🔧 Configuración Automática (Opción A - Recomendada)

### 1. Usar render.yaml

Ya se creó el archivo `render.yaml` en la raíz del proyecto con la configuración:

```yaml
services:
  - type: web
    name: cumple-backend
    runtime: java
    buildCommand: cd legacy && ./mvnw clean install -DskipTests
    startCommand: cd legacy && java -jar target/cumple-0.0.1-SNAPSHOT.jar
```

### 2. Deploy desde Dashboard

1. **Ir a Render Dashboard** → https://dashboard.render.com
2. **Click en "New +"** → "Blueprint"
3. **Conectar repositorio**: `MesitaDeNoche/Cumplea-os`
4. **Seleccionar rama**: `main`
5. **Render detectará** `render.yaml` automáticamente
6. **Click "Apply"**

**✅ Listo**. Render hará:
- Clone del repo
- `cd legacy && ./mvnw clean install`
- Crear imagen Docker
- Ejecutar `java -jar target/cumple-0.0.1-SNAPSHOT.jar`
- Asignar URL: `https://cumple-backend.onrender.com`

---

## 🔧 Configuración Manual (Opción B)

Si prefieres configurar manualmente:

### 1. Crear Web Service

**Dashboard → New + → Web Service**

### 2. Configurar Repositorio

```
Repository:     MesitaDeNoche/Cumplea-os
Branch:         main
Root Directory: legacy
```

### 3. Configurar Build

```
Name:            cumple-backend
Runtime:         Docker (o Java si está disponible)
Build Command:   ./mvnw clean install -DskipTests
Start Command:   java -jar target/cumple-0.0.1-SNAPSHOT.jar
```

### 4. Configurar Variables de Entorno

```
PORT=8080
SPRING_PROFILES_ACTIVE=prod
JAVA_TOOL_OPTIONS=-Xmx512m -Xms256m
```

### 5. Configurar Health Check

```
Health Check Path: /actuator/health
```

### 6. Plan

```
Instance Type: Free (512 MB RAM, sleeps after 15 min inactivity)
Region:        Oregon (US West)
```

### 7. Click "Create Web Service"

---

## ✅ Verificación del Deployment

### 1. Logs de Build

Deberías ver:

```bash
[INFO] Building jar: target/cumple-0.0.1-SNAPSHOT.jar
[INFO] BUILD SUCCESS
```

### 2. Logs de Inicio

```
Started CumpleApplication in 3.456 seconds
Tomcat started on port(s): 8080 (http)
```

### 3. Health Check

```bash
curl https://cumple-backend.onrender.com/actuator/health
```

Respuesta esperada:
```json
{
  "status": "UP"
}
```

---

## 🌐 Conectar Frontend con Backend

Una vez que el backend esté en Render, actualiza el frontend:

### 1. Actualizar Variable de Entorno en Vercel

**Vercel Dashboard → Settings → Environment Variables**

```
Key:   NEXT_PUBLIC_API_URL
Value: https://cumple-backend.onrender.com
```

### 2. Configurar CORS en Backend

Edita `legacy/src/main/java/com/cositas/cumple/` y crea:

**`WebConfig.java`**:
```java
package com.cositas.cumple;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                    "https://tu-proyecto.vercel.app",
                    "http://localhost:3000"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### 3. Redeploy

Commit y push los cambios. Render y Vercel se redeployarán automáticamente.

---

## ⚠️ Limitaciones del Plan Free de Render

- ✅ 512 MB RAM
- ✅ 0.1 CPU compartido
- ⚠️ **Duerme después de 15 minutos de inactividad**
- ⚠️ Primera request después de dormir toma ~30 segundos
- ✅ 750 horas/mes gratis (suficiente para un proyecto personal)

### Solución para el "Cold Start"

**Opción 1**: Usar un cron job para hacer ping cada 10 minutos
```bash
# Desde otro servicio o GitHub Actions
curl https://cumple-backend.onrender.com/actuator/health
```

**Opción 2**: Upgrader a plan Starter ($7/mes)
- No duerme
- 512 MB RAM
- 0.5 CPU dedicado

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Síntoma**:
```
Error: Could not find or load main class
```

**Solución**: Verifica que `legacy/pom.xml` tenga:
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

---

### Error: "Health check failed"

**Síntoma**:
```
Health check endpoint returned 404
```

**Solución**: 
1. Verifica que `spring-boot-starter-actuator` esté en `pom.xml`
2. Verifica que `application.properties` tenga:
```properties
management.endpoints.web.exposure.include=health,info
```

---

### Error: "Out of memory"

**Síntoma**:
```
java.lang.OutOfMemoryError: Java heap space
```

**Solución**: Ajusta las variables de entorno:
```
JAVA_TOOL_OPTIONS=-Xmx400m -Xms256m
```

---

## 📊 Estructura Final del Proyecto

```
/
├── apps/
│   └── frontend/           # Next.js → Vercel
├── legacy/
│   ├── src/                # Spring Boot → Render
│   ├── pom.xml
│   ├── system.properties   # Java 17
│   └── mvnw
├── render.yaml             # Configuración de Render
├── .vercelignore           # Ignora archivos para Vercel
└── package.json            # Monorepo config
```

---

## 🎯 Checklist Final

### Backend (Render)

- [ ] `render.yaml` creado en la raíz
- [ ] `system.properties` con Java 17
- [ ] `spring-boot-starter-actuator` en `pom.xml`
- [ ] `application.properties` con health check config
- [ ] Repositorio conectado a Render
- [ ] Blueprint aplicado
- [ ] URL del backend: `https://cumple-backend.onrender.com`

### Frontend (Vercel)

- [ ] `.vercelignore` creado
- [ ] `apps/frontend/vercel.json` configurado
- [ ] Root Directory: `apps/frontend`
- [ ] Build Command: `npm run build`
- [ ] Install Command: `npm install`
- [ ] Environment Variable: `NEXT_PUBLIC_BIRTHDAY_CODE=0712`
- [ ] Environment Variable: `NEXT_PUBLIC_API_URL=https://cumple-backend.onrender.com`

### Integración

- [ ] CORS configurado en backend
- [ ] Frontend hace requests a backend
- [ ] Health checks pasando
- [ ] Ambos deployments exitosos

---

## 🚀 Siguiente Paso

1. **Commit estos cambios**:
```bash
git add render.yaml legacy/system.properties legacy/pom.xml legacy/src/main/resources/application.properties
git commit -m "feat: Configure backend for Render deployment"
git push
```

2. **Deploy en Render**: Sigue "Opción A" arriba

3. **Una vez el backend esté live**: Conecta el frontend

---

**Última actualización**: Octubre 21, 2026
