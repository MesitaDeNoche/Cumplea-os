#!/bin/bash
set -e

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Cumpleaños Monorepo - Setup Inicial    ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

# Verificar Node.js
echo -e "${YELLOW}→${NC} Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js no está instalado${NC}"
    echo "  Instala Node.js 20+ desde: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${RED}✗ Node.js versión $NODE_VERSION detectada. Se requiere 20+${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js $(node -v) detectado"

# Verificar/Instalar pnpm
echo -e "${YELLOW}→${NC} Verificando pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}  pnpm no detectado. Instalando...${NC}"
    npm install -g pnpm
    echo -e "${GREEN}✓${NC} pnpm instalado"
else
    echo -e "${GREEN}✓${NC} pnpm $(pnpm -v) detectado"
fi

# Instalar dependencias raíz
echo -e "${YELLOW}→${NC} Instalando dependencias del monorepo..."
pnpm install
echo -e "${GREEN}✓${NC} Dependencias instaladas"

# Verificar estructura de carpetas
echo -e "${YELLOW}→${NC} Verificando estructura del proyecto..."
REQUIRED_DIRS=("apps" "apps/frontend" "apps/backend" "packages" "docs" "skills")
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo -e "${YELLOW}  Creando carpeta: $dir${NC}"
        mkdir -p "$dir"
    fi
done
echo -e "${GREEN}✓${NC} Estructura verificada"

# Configurar Git hooks (si existe husky)
if [ -f "package.json" ] && grep -q "husky" package.json; then
    echo -e "${YELLOW}→${NC} Configurando Git hooks..."
    pnpm prepare 2>/dev/null || true
    echo -e "${GREEN}✓${NC} Git hooks configurados"
fi

# Crear archivos .env de ejemplo si no existen
echo -e "${YELLOW}→${NC} Creando archivos de configuración de ejemplo..."

if [ ! -f "apps/frontend/.env.example" ]; then
    cat > apps/frontend/.env.example << 'EOF'
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
    echo -e "${GREEN}✓${NC} apps/frontend/.env.example creado"
fi

if [ ! -f "apps/backend/.env.example" ]; then
    cat > apps/backend/.env.example << 'EOF'
# Backend Environment Variables
NODE_ENV=development
PORT=8000
CORS_ORIGIN=http://localhost:3000
EOF
    echo -e "${GREEN}✓${NC} apps/backend/.env.example creado"
fi

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✓ Setup completado exitosamente     ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Próximos pasos:${NC}"
echo -e "  1. Configura apps/frontend (Next.js)"
echo -e "  2. Configura apps/backend (NestJS)"
echo -e "  3. Copia .env.example a .env en cada app y ajusta valores"
echo -e "  4. Ejecuta: ${YELLOW}pnpm dev${NC} para iniciar desarrollo"
echo ""
echo -e "${BLUE}Comandos útiles:${NC}"
echo -e "  ${YELLOW}pnpm dev${NC}              - Desarrollo (frontend + backend)"
echo -e "  ${YELLOW}pnpm build${NC}            - Build producción"
echo -e "  ${YELLOW}pnpm test${NC}             - Ejecutar tests"
echo -e "  ${YELLOW}pnpm lint${NC}             - Linting"
echo -e "  ${YELLOW}pnpm format${NC}           - Format código"
echo ""
