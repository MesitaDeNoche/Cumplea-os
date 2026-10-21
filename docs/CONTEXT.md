# CONTEXT.md

## Resumen del Proyecto

**Nombre:** Cumpleaños - Aplicación Web Interactiva de Cumpleaños  
**Tipo:** Aplicación web full-stack con Next.js + NestJS (Monorepo)  
**Propósito:** Sitio web personalizado de celebración de cumpleaños con experiencias interactivas, galería de fotos, música y elementos visuales románticos.  
**Metodología:** SDD (Specification-Driven Development)

---

## Stack Tecnológico

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript 5+
- **Estilos:** CSS Modules / Tailwind CSS
- **Animaciones:** Framer Motion
- **Fuentes:** Google Fonts (Playfair Display, Lato)
- **Estado:** React Context API / Zustand (si es necesario)

### Backend
- **Framework:** NestJS 10+
- **Lenguaje:** TypeScript 5+
- **API:** REST (JSON)
- **Validación:** class-validator + class-transformer
- **Documentación:** Swagger/OpenAPI
- **CORS:** Configurado para frontend en GitHub Pages

### DevOps & Deployment
- **Arquitectura:** Monorepo (Nx, Turborepo o pnpm workspaces)
- **Control de versiones:** Git
- **Package Manager:** pnpm (recomendado para monorepos)
- **Frontend Hosting:** GitHub Pages / Vercel / Netlify (estático)
- **Backend Hosting:** Oracle Cloud / DigitalOcean / Railway (24/7)
- **Proxy Inverso:** Nginx con SSL/TLS (Let's Encrypt)
- **CI/CD:** GitHub Actions

### Sin Base de Datos
- **Estado:** Todo en memoria o archivos JSON estáticos
- **Sesiones:** No hay autenticación por ahora
- **Persistencia:** No requerida (futuro: PostgreSQL o MongoDB)

---

## Arquitectura del Monorepo

```
cumple-monorepo/
├── .github/
│   └── workflows/              # CI/CD pipelines
│       ├── deploy-frontend.yml
│       └── deploy-backend.yml
├── apps/
│   ├── frontend/               # Next.js App
│   │   ├── .next/
│   │   ├── public/
│   │   │   └── images/        # Imágenes estáticas (futuro)
│   │   ├── src/
│   │   │   ├── app/           # App Router (Next.js 14+)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/    # Componentes React
│   │   │   │   ├── Hero/
│   │   │   │   ├── Carousel/
│   │   │   │   ├── Song/
│   │   │   │   ├── Reminders/
│   │   │   │   ├── Constellation/
│   │   │   │   ├── Counter/
│   │   │   │   └── Closing/
│   │   │   ├── lib/           # Utilidades y helpers
│   │   │   │   ├── api.ts     # Cliente HTTP para backend
│   │   │   │   ├── constants.ts
│   │   │   │   └── utils.ts
│   │   │   └── types/         # TypeScript interfaces/types
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── backend/                # NestJS API
│       ├── dist/
│       ├── src/
│       │   ├── main.ts        # Entry point
│       │   ├── app.module.ts  # Módulo principal
│       │   ├── config/        # Configuraciones
│       │   │   ├── cors.config.ts
│       │   │   └── env.config.ts
│       │   ├── modules/       # Módulos funcionales
│       │   │   ├── health/    # Health check endpoint
│       │   │   ├── photos/    # Gestión de fotos (futuro)
│       │   │   └── analytics/ # Tracking de visitas (opcional)
│       │   ├── common/        # Compartido
│       │   │   ├── dto/       # Data Transfer Objects
│       │   │   ├── filters/   # Exception filters
│       │   │   └── interceptors/
│       │   └── types/         # TypeScript types
│       ├── test/
│       ├── nest-cli.json
│       ├── tsconfig.json
│       └── package.json
│
├── packages/                   # Paquetes compartidos (opcional)
│   └── shared-types/          # Types compartidos entre frontend y backend
│       ├── src/
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
│
├── docs/
│   ├── arquitectura/          # Documentación de arquitectura
│   │   ├── ARCHITECTURE.md    # Decisiones arquitectónicas
│   │   ├── API.md             # Documentación de endpoints
│   │   └── DEPLOYMENT.md      # Guía de despliegue
│   └── memoria/               # Memoria del proyecto
│       └── PROJECT_MEMORY.md  # Decisiones y evolución
│
├── skills/                     # Skills y scripts auxiliares
│   ├── setup.sh               # Setup inicial del monorepo
│   ├── dev.sh                 # Script para desarrollo local
│   └── deploy.sh              # Script de despliegue
│
├── .gitignore
├── pnpm-workspace.yaml        # Configuración de workspaces
├── package.json               # Root package.json
├── tsconfig.base.json         # TypeScript config base
├── turbo.json                 # Turborepo config (si se usa)
└── README.md                  # Documentación principal
```

---

## Funcionalidades Principales

### ~~1. Lockscreen / Cuenta Regresiva~~ ❌ ELIMINADO
**Razón:** No es necesario para la experiencia actual del usuario.

### 1. **Hero Section / Carta de Cumpleaños**
- Mensaje personalizado de felicitación
- Diseño con gradientes radiales púrpura
- Corazones flotantes animados en el fondo
- Botón CTA con smooth scroll a la galería
- **Backend:** No requiere API (estático)

### 2. **Carrusel de Fotos Interactivo**
- **Descripción:** Galería dinámica de momentos especiales
- **Características:**
  - Carga dinámica de imágenes desde backend (futuro)
  - Navegación con botones, dots y swipe táctil
  - Modal de pantalla completa
  - Transiciones suaves
- **Backend Endpoints:**
  - `GET /api/photos` - Lista de fotos con metadata
  - `GET /api/photos/:id` - Detalle de una foto
- **Por ahora:** Imágenes hardcodeadas en frontend

### 3. **Nuestra Canción**
- Disco de vinilo animado (rotación CSS/Framer Motion)
- Embed de Spotify (iframe oficial)
- Canción: ID `4yNk9iz9WVJikRFle3XEvn`
- **Backend:** No requiere API (estático)

### 4. **Cosas que me Recuerdan a Ti**
- Grid responsivo de tarjetas (8+ elementos)
- Cada tarjeta tiene icono, título y descripción
- Efectos hover: elevación, escala, glow
- **Backend Endpoints (opcional futuro):**
  - `GET /api/reminders` - Lista de recordatorios
- **Por ahora:** Contenido hardcodeado en frontend

### 5. **Constelación Interactiva (Puzzle)**
- Canvas de estrellas con animación (Canvas API o Three.js ligero)
- Puzzle SVG: conectar estrellas en orden
- Modal con mensaje al completar
- **Backend Endpoints:**
  - `POST /api/constellation/complete` - Registrar completado (analytics)
- **Por ahora:** Lógica 100% en frontend

### 6. **Contador de Días Juntos**
- Cálculo en tiempo real desde fecha de inicio
- Desglose: años, meses, días
- Animaciones al entrar en viewport
- **Backend Endpoints:**
  - `GET /api/counter/days` - Cálculo de días (server-side para precisión)
- **Por ahora:** Cálculo en frontend con `Date` API

### 7. **Cierre / Mensaje Final**
- Mensaje de despedida romántico
- Corazón animado con efecto heartbeat
- **Backend:** No requiere API (estático)

---

## Detalles Técnicos

### Frontend (Next.js + TypeScript)

**Estructura de Componentes**
```typescript
// Ejemplo: apps/frontend/src/components/Hero/Hero.tsx
import { FC } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
  message: string;
}

export const Hero: FC<HeroProps> = ({ title, subtitle, message }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.subtitle}>{subtitle}</p>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.letter}>
          <p>{message}</p>
        </div>
      </div>
    </section>
  );
};
```

**Cliente API**
```typescript
// apps/frontend/src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.tudominio.com';

export const api = {
  async getPhotos() {
    const res = await fetch(`${API_BASE_URL}/api/photos`);
    if (!res.ok) throw new Error('Failed to fetch photos');
    return res.json();
  },
  
  async getDaysCounter() {
    const res = await fetch(`${API_BASE_URL}/api/counter/days`);
    if (!res.ok) throw new Error('Failed to fetch counter');
    return res.json();
  },
};
```

**Estilos (Tailwind + CSS Modules)**
- Variables CSS para colores y transiciones
- Animaciones con Framer Motion para interactividad compleja
- Responsive con Tailwind breakpoints

### Backend (NestJS + TypeScript)

**Módulo Principal**
```typescript
// apps/backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { PhotosModule } from './modules/photos/photos.module';
import { CounterModule } from './modules/counter/counter.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    PhotosModule,
    CounterModule,
  ],
})
export class AppModule {}
```

**Configuración CORS**
```typescript
// apps/backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS para GitHub Pages
  app.enableCors({
    origin: [
      'https://tuusuario.github.io',
      'http://localhost:3000', // desarrollo
    ],
    methods: ['GET', 'POST'],
    credentials: false,
  });
  
  app.useGlobalPipes(new ValidationPipe());
  
  const port = process.env.PORT || 8000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend running on port ${port}`);
}
bootstrap();
```

**Endpoint de Ejemplo**
```typescript
// apps/backend/src/modules/counter/counter.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('api/counter')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get('days')
  getDaysCounter() {
    return this.counterService.calculateDays();
  }
}
```

```typescript
// apps/backend/src/modules/counter/counter.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  private readonly START_DATE = new Date('2022-12-07T00:00:00');

  calculateDays() {
    const now = new Date();
    const diffMs = now.getTime() - this.START_DATE.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let years = now.getFullYear() - this.START_DATE.getFullYear();
    let months = now.getMonth() - this.START_DATE.getMonth();
    let days = now.getDate() - this.START_DATE.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return {
      totalDays,
      breakdown: { years, months, days },
      startDate: this.START_DATE.toISOString(),
    };
  }
}
```

---

## Deployment

### Frontend (GitHub Pages / Vercel / Netlify)

**Opción 1: GitHub Pages (Estático)**

1. **Build estático:**
```bash
cd apps/frontend
pnpm build
pnpm export  # Genera carpeta 'out' con HTML estático
```

2. **GitHub Actions Workflow:**
```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - 'apps/frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm --filter frontend build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./apps/frontend/out
```

3. **Configuración Next.js para GitHub Pages:**
```javascript
// apps/frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Habilita export estático
  basePath: '/nombre-repo', // Si no es raíz de dominio
  images: {
    unoptimized: true, // Requerido para export estático
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://tu-servidor.com',
  },
};

module.exports = nextConfig;
```

**Opción 2: Vercel (Recomendado - SSR habilitado)**
```bash
# Vercel detecta Next.js automáticamente
vercel --prod
```

### Backend (Oracle Cloud / DigitalOcean / Railway)

**Requisitos del Servidor:**
- Sistema operativo: Ubuntu 22.04 LTS (recomendado)
- RAM: 1GB mínimo
- CPU: 1 core mínimo
- Puerto: 8000 (o el que configures)
- Firewall: Puerto 8000 y 80/443 abiertos

**Paso 1: Setup del Servidor (Oracle Cloud ejemplo)**

```bash
# Conectar por SSH
ssh ubuntu@tu-ip-publica

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar pnpm
sudo npm install -g pnpm

# Instalar PM2 (gestor de procesos)
sudo npm install -g pm2
```

**Paso 2: Configurar Nginx con SSL**

```bash
# Instalar Nginx
sudo apt install nginx -y

# Instalar Certbot (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y

# Configurar Nginx
sudo nano /etc/nginx/sites-available/cumple-backend
```

```nginx
# /etc/nginx/sites-available/cumple-backend
server {
    listen 80;
    server_name api.tudominio.com;  # O tu-ip-publica

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Habilitar sitio
sudo ln -s /etc/nginx/sites-available/cumple-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Obtener certificado SSL (si tienes dominio)
sudo certbot --nginx -d api.tudominio.com
# O para IP pública (sin dominio, usar HTTP o self-signed cert)
```

**Paso 3: Desplegar Backend**

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/cumple-monorepo.git
cd cumple-monorepo

# Instalar dependencias
pnpm install

# Build del backend
pnpm --filter backend build

# Configurar variables de entorno
cd apps/backend
nano .env
```

```bash
# apps/backend/.env
NODE_ENV=production
PORT=8000
CORS_ORIGIN=https://tuusuario.github.io
```

```bash
# Iniciar con PM2
pm2 start dist/main.js --name cumple-backend
pm2 save
pm2 startup  # Seguir instrucciones para auto-start en boot

# Ver logs
pm2 logs cumple-backend
```

**Paso 4: Firewall (Oracle Cloud)**

1. **En el panel de Oracle Cloud:**
   - Ir a Networking → Virtual Cloud Networks
   - Seleccionar tu VCN → Security Lists
   - Agregar Ingress Rules:
     - Puerto 80 (HTTP)
     - Puerto 443 (HTTPS)
     - Puerto 8000 (si accedes directamente sin Nginx)

2. **En el servidor (UFW):**
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 8000/tcp  # Backend (opcional si usas Nginx)
sudo ufw enable
```

**Actualización del Backend (CI/CD opcional)**

```bash
# Manual
cd cumple-monorepo
git pull
pnpm install
pnpm --filter backend build
pm2 restart cumple-backend
```

**GitHub Actions para auto-deploy:**
```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'apps/backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ubuntu
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd cumple-monorepo
            git pull
            pnpm install
            pnpm --filter backend build
            pm2 restart cumple-backend
```

---

## Conexión Frontend ↔ Backend (HTTPS + CORS)

### Problema: Mixed Content
GitHub Pages sirve con HTTPS. Si tu backend usa HTTP, el navegador bloqueará las peticiones.

### Solución: SSL/TLS en Backend

**Opción 1: Dominio + Let's Encrypt (Recomendado)**
1. Comprar dominio barato (ej. `miapi.com` en Namecheap ~$10/año)
2. Apuntar dominio a IP del servidor
3. Usar Certbot para certificado gratuito (ver arriba)
4. Frontend conecta a `https://api.tudominio.com`

**Opción 2: Cloudflare Tunnel (Gratis, sin dominio propio)**
```bash
# Instalar cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Autenticar
cloudflared tunnel login

# Crear túnel
cloudflared tunnel create cumple-backend
cloudflared tunnel route dns cumple-backend api.tudominio.workers.dev

# Configurar
nano ~/.cloudflared/config.yml
```

```yaml
# ~/.cloudflared/config.yml
tunnel: <TUNNEL-ID>
credentials-file: /home/ubuntu/.cloudflared/<TUNNEL-ID>.json

ingress:
  - hostname: api.tudominio.workers.dev
    service: http://localhost:8000
  - service: http_status:404
```

```bash
# Iniciar túnel
cloudflared tunnel run cumple-backend

# O con PM2
pm2 start cloudflared -- tunnel run cumple-backend
```

**Opción 3: Self-Signed Certificate (Solo desarrollo)**
```bash
# Generar certificado
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Usar en NestJS
# apps/backend/src/main.ts
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};
const app = await NestFactory.create(AppModule, { httpsOptions });
```

⚠️ **Nota:** Navegadores mostrarán advertencia con certificados self-signed.

### Configuración CORS Final

```typescript
// apps/backend/src/main.ts
app.enableCors({
  origin: [
    'https://tuusuario.github.io',
    'https://tudominio-custom.com',
    'http://localhost:3000', // solo desarrollo
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
});
```

---

## Metodología SDD (Specification-Driven Development)

### Flujo de Trabajo

1. **Especificación → Diseño → Implementación → Testing**
2. Cada feature comienza con un documento de especificación en `/docs/arquitectura/specs/`
3. Documentar decisiones arquitectónicas (ADR) en `/docs/arquitectura/adr/`

### Estructura de Especificación

```markdown
# [SPEC-001] Contador de Días Juntos

## Objetivo
Mostrar el tiempo transcurrido desde el inicio de la relación de forma precisa y visualmente atractiva.

## Requisitos Funcionales
- RF-001: Calcular días totales desde 2022-12-07
- RF-002: Desglosar en años, meses, días
- RF-003: Animar números al entrar en viewport

## Requisitos No Funcionales
- RNF-001: Cálculo preciso considerando años bisiestos
- RNF-002: Animación fluida (60fps)

## API Endpoints
- GET /api/counter/days
  - Response: { totalDays, breakdown: {years, months, days}, startDate }

## UI/UX
- [Mockup o wireframe]
- Animación: ease-out cubic, 2s duration

## Testing
- Unit: Cálculo de días con fechas edge case
- Integration: Endpoint responde correctamente
- E2E: Animación se ejecuta en scroll
```

---

## Comandos Rápidos

### Desarrollo Local

```bash
# Setup inicial (desde raíz del monorepo)
pnpm install

# Desarrollo concurrente (frontend + backend)
pnpm dev

# Solo frontend
pnpm --filter frontend dev

# Solo backend
pnpm --filter backend start:dev

# Build completo
pnpm build

# Tests
pnpm test
```

### Deployment

```bash
# Frontend (export estático)
pnpm --filter frontend build
pnpm --filter frontend export

# Backend (build producción)
pnpm --filter backend build
pnpm --filter backend start:prod
```

---

## Configuración de Scripts (Root package.json)

```json
{
  "name": "cumple-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"pnpm --filter frontend dev\" \"pnpm --filter backend start:dev\"",
    "build": "pnpm --filter frontend build && pnpm --filter backend build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "format": "prettier --write \"apps/**/*.{ts,tsx,js,jsx,json,css}\""
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "prettier": "^3.1.0",
    "typescript": "^5.3.3"
  }
}
```

---

## Consideraciones de Seguridad

### Backend
- ✅ Validación de inputs con class-validator
- ✅ CORS configurado estrictamente
- ✅ Rate limiting (futuro, con @nestjs/throttler)
- ✅ Helmet para headers de seguridad
- ✅ HTTPS obligatorio en producción

### Frontend
- ✅ Variables de entorno con `NEXT_PUBLIC_` prefix
- ✅ No exponer secrets en el código cliente
- ✅ Sanitización de inputs si hay formularios (futuro)

---

## Monitoreo y Logs

### Backend (PM2)
```bash
# Ver logs en tiempo real
pm2 logs cumple-backend

# Monitoreo de recursos
pm2 monit

# Ver status
pm2 status
```

### Frontend (Vercel/GitHub Pages)
- Vercel Analytics (si se usa Vercel)
- GitHub Pages no tiene analytics integrado (usar Google Analytics si es necesario)

---

## Posibles Mejoras Futuras

### Funcionalidades
- [ ] Sistema de autenticación (NextAuth.js)
- [ ] Base de datos para persistir mensajes/comentarios
- [ ] Galería de videos además de fotos
- [ ] Modo oscuro/claro
- [ ] PWA con offline support
- [ ] Admin panel para gestionar contenido

### Técnicas
- [ ] Lazy loading de imágenes (Next.js Image)
- [ ] WebP + fallback para optimización
- [ ] Tests E2E con Playwright
- [ ] Caché con Redis (backend)
- [ ] CDN para assets estáticos (Cloudflare)
- [ ] SEO optimizado (meta tags, Open Graph)

### DevOps
- [ ] Docker Compose para desarrollo local
- [ ] Kubernetes deployment (overkill para este proyecto)
- [ ] Monitoring con Grafana + Prometheus
- [ ] Backup automatizado (si se agrega DB)

---

## Recursos y Referencias

### Documentación Oficial
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [pnpm Workspaces](https://pnpm.io/workspaces)

### Deployment
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vercel Deployment](https://vercel.com/docs)
- [Oracle Cloud Free Tier](https://www.oracle.com/cloud/free/)
- [Let's Encrypt (Certbot)](https://certbot.eff.org/)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)

### Herramientas
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PM2 Docs](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Docs](https://nginx.org/en/docs/)

---

## Notas Importantes

1. **Sin Lockscreen:** Eliminado completamente de la arquitectura
2. **Imágenes:** Sistema preparado para carga dinámica, por ahora hardcodeadas
3. **Sin DB:** Toda la lógica es stateless, fácil de escalar
4. **HTTPS obligatorio:** Por Mixed Content de GitHub Pages
5. **Monorepo:** Facilita compartir types y código común
6. **SDD:** Especificaciones primero, luego implementación
7. **API minimal:** Solo endpoints necesarios para interactividad

---

## Autor y Metadata

- **Proyecto:** Cumpleaños Interactivo
- **Versión:** 2.0.0 (Migración a Next.js + NestJS)
- **Metodología:** SDD (Specification-Driven Development)
- **Arquitectura:** Monorepo (pnpm workspaces)
- **Licencia:** Proyecto personal (privado)

---

**Última actualización:** Octubre 21, 2026  
**Estado:** 🚧 En migración a nueva arquitectura  
**Próximos pasos:**
1. Setup del monorepo con pnpm workspaces
2. Creación de specs para cada módulo
3. Implementación del frontend con Next.js
4. Implementación del backend con NestJS
5. Configuración de CI/CD
6. Deployment en Oracle Cloud + GitHub Pages
