# Skills

Scripts y herramientas auxiliares para el desarrollo y deployment del proyecto.

## 📁 Contenido

```
skills/
├── setup.sh          # Setup inicial del monorepo
├── dev.sh            # Script para desarrollo local
├── deploy.sh         # Script de despliegue
└── README.md         # Este archivo
```

## 🛠️ Scripts Disponibles

### setup.sh
Inicializa el proyecto desde cero:
- Instala pnpm si no está instalado
- Instala todas las dependencias
- Configura husky (git hooks)
- Genera archivos de configuración

**Uso:**
```bash
./skills/setup.sh
```

### dev.sh
Inicia el entorno de desarrollo:
- Valida que las dependencias estén instaladas
- Inicia frontend y backend concurrentemente
- Abre navegador automáticamente

**Uso:**
```bash
./skills/dev.sh
```

### deploy.sh
Automatiza el proceso de deployment:
- Build de frontend y backend
- Deploy a GitHub Pages (frontend)
- Deploy a servidor cloud (backend)
- Validación post-deployment

**Uso:**
```bash
./skills/deploy.sh [frontend|backend|all]
```

## 🐧 Compatibilidad

Los scripts están diseñados para:
- ✅ Linux
- ✅ macOS
- ✅ Windows (con Git Bash o WSL)

## 📝 Agregar Nuevos Scripts

Al crear nuevos scripts:
1. Documéntalo en este README
2. Hazlo ejecutable: `chmod +x skills/tu-script.sh`
3. Usa `set -e` para salir en errores
4. Incluye mensajes informativos con colores
5. Valida requisitos previos

**Plantilla base:**
```bash
#!/bin/bash
set -e

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}✓ Iniciando script...${NC}"

# Tu código aquí

echo -e "${GREEN}✓ Script completado!${NC}"
```

## 🔧 Herramientas Recomendadas

Instala estas herramientas globalmente para aprovechar los scripts:

```bash
# pnpm
npm install -g pnpm

# Node.js version manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# PM2 (para deployment backend)
npm install -g pm2
```

## 🤝 Contribución

Si creas un script útil, agrégalo aquí y actualiza este README.
