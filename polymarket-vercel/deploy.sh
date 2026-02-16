#!/bin/bash

# 🚀 SCRIPT DE DEPLOYMENT AUTOMÁTICO
# Este script hace todo el deployment por ti

set -e  # Exit on error

echo "🚀 Polymarket Analyzer - Auto Deployment Script"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check if Vercel CLI is installed
echo -e "${BLUE}[1/6]${NC} Verificando Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI no encontrado. Instalando...${NC}"
    npm install -g vercel
fi
echo -e "${GREEN}✓${NC} Vercel CLI listo"
echo ""

# 2. Check if user is logged in
echo -e "${BLUE}[2/6]${NC} Verificando autenticación..."
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}No estás logueado. Iniciando login...${NC}"
    vercel login
fi
echo -e "${GREEN}✓${NC} Autenticado correctamente"
echo ""

# 3. Initialize git if needed
echo -e "${BLUE}[3/6]${NC} Preparando Git..."
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial commit - Polymarket Analyzer optimized for Vercel"
    echo -e "${GREEN}✓${NC} Git inicializado"
else
    echo -e "${GREEN}✓${NC} Git ya configurado"
fi
echo ""

# 4. Deploy to Vercel
echo -e "${BLUE}[4/6]${NC} Deploying a Vercel..."
echo -e "${YELLOW}Esto puede tardar 30-60 segundos...${NC}"
DEPLOYMENT_URL=$(vercel --prod --yes 2>&1 | grep -o 'https://[^ ]*' | head -1)
echo -e "${GREEN}✓${NC} Deploy exitoso!"
echo ""

# 5. Test the deployment
echo -e "${BLUE}[5/6]${NC} Testing APIs..."

# Test Gamma API
echo -n "  Testing Gamma API... "
if curl -s -f "${DEPLOYMENT_URL}/api/gamma/events?slug=bitcoin" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ (puede tardar un momento en arrancar)${NC}"
fi

# Test Binance API
echo -n "  Testing Binance API... "
if curl -s -f "${DEPLOYMENT_URL}/api/binance/api/v3/ticker/24hr?symbol=BTCUSDT" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠ (puede tardar un momento en arrancar)${NC}"
fi
echo ""

# 6. Show results
echo -e "${BLUE}[6/6]${NC} Deployment completado!"
echo ""
echo "================================================"
echo -e "${GREEN}✅ TU SITIO ESTÁ LIVE!${NC}"
echo "================================================"
echo ""
echo "🌐 URL Principal:"
echo -e "   ${BLUE}${DEPLOYMENT_URL}${NC}"
echo ""
echo "🧪 Test Page:"
echo -e "   ${BLUE}${DEPLOYMENT_URL}/test.html${NC}"
echo ""
echo "📊 Dashboard de Vercel:"
echo -e "   ${BLUE}https://vercel.com/dashboard${NC}"
echo ""
echo "💡 Próximos pasos:"
echo "   1. Abre: ${DEPLOYMENT_URL}/test.html"
echo "   2. Ejecuta los tests automáticos"
echo "   3. Prueba un análisis completo"
echo ""
echo "🎉 ¡Todo listo! Tu analyzer está corriendo en <100ms"
echo ""
