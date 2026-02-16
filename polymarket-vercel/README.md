# Polymarket Analyzer - Vercel Edition

Análisis cuantitativo de Polymarket optimizado para deployment en Vercel.

## 🚀 Mejoras vs Netlify

✅ **CORS resuelto** - Sin errores de CORS usando Vercel Edge Functions
✅ **Performance mejorada** - De 10s → ~1-2s con caching inteligente
✅ **Edge Runtime** - Respuestas ultra-rápidas desde el edge más cercano
✅ **Caching automático** - CDN cache de 60s con stale-while-revalidate

## 📦 Estructura del Proyecto

```
polymarket-vercel/
├── api/
│   ├── gamma/
│   │   └── [...path].js    # Proxy para Gamma API
│   └── binance/
│       └── [...path].js    # Proxy para Binance API
├── index.html              # Frontend optimizado
├── vercel.json            # Configuración de Vercel
└── package.json
```

## 🔧 Deployment en Vercel

### Opción 1: Via Web UI (Más Fácil)

1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Importa este repositorio desde GitHub
4. Click "Deploy" (Vercel detecta la configuración automáticamente)

### Opción 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde el directorio del proyecto
vercel

# Para production
vercel --prod
```

## 🎯 Cómo Funciona

### API Proxies (Solución CORS)

Las APIs están configuradas como Edge Functions en Vercel que:
- Manejan requests desde el frontend
- Hacen fetch a las APIs externas (Polymarket Gamma, Binance)
- Retornan datos con headers CORS correctos
- Usan Edge Runtime para máxima velocidad

**Rutas:**
- `/api/gamma/*` → https://gamma-api.polymarket.com/*
- `/api/binance/*` → https://api.binance.com/*

### Caching Strategy

```javascript
Cache-Control: s-maxage=60, stale-while-revalidate=300
```

- **s-maxage=60**: Cache por 60 segundos en el edge
- **stale-while-revalidate=300**: Sirve cache viejo mientras revalida en background (5 min)

Resultado: Primera request ~1-2s, requests subsecuentes <100ms

## 🔍 Debugging

### Probar Localmente (IMPORTANTE)

Antes de deployar, prueba en local:

```bash
# Inicia el servidor de desarrollo
node server.js

# Abre http://localhost:3000
```

Esto simula las Edge Functions de Vercel localmente, sin errores CORS.

Ver guía completa: [LOCAL-TESTING.md](LOCAL-TESTING.md)

### En Vercel (después de deployar)

Si algo falla:

1. **Ver logs en tiempo real:**
   ```bash
   vercel logs [deployment-url] --follow
   ```

2. **Probar localmente:**
   ```bash
   vercel dev
   ```
   Abre http://localhost:3000

3. **Verificar que las APIs funcionan:**
   - https://tu-deployment.vercel.app/api/gamma/events?slug=bitcoin
   - https://tu-deployment.vercel.app/api/binance/api/v3/ticker/24hr?symbol=BTCUSDT

## ⚡ Performance Tips

### Edge Functions ya optimizadas:
- Runtime: `edge` (más rápido que Node.js serverless)
- Minimal code (sin dependencias innecesarias)
- Streaming responses
- Automatic HTTP/2

### Frontend:
- Sin external CORS proxies
- Requests directos a `/api/*`
- Datos cached en CDN de Vercel

## 🛠️ Configuración Avanzada

### Aumentar cache time (opcional)

Edita `api/gamma/[...path].js` y `api/binance/[...path].js`:

```javascript
// Cache por 5 minutos
res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
```

### Rate Limiting (opcional)

Vercel Pro incluye rate limiting automático. Para custom limits, usa:

```javascript
import { Ratelimit } from '@upstash/ratelimit';
```

## 📊 Monitoreo

Vercel dashboard muestra automáticamente:
- Request count
- Response times (p50, p95, p99)
- Error rates
- Bandwidth usage

## 💡 Troubleshooting

**Error: "API_FAILED"**
→ Verifica que las Edge Functions estén deployadas. Revisa logs.

**Respuestas lentas (>3s)**
→ Normal en la primera request después de inactividad (cold start).
  Las siguientes serán <100ms gracias al cache.

**CORS error persiste**
→ Asegúrate de estar usando las rutas `/api/*`, no URLs directas.

## 🎨 Customización

El frontend está en `index.html`. Para cambiar estilos o agregar features,
edita directamente ese archivo. Vercel lo sirve como static asset optimizado.

## 📝 Notas

- **Sin backend tradicional**: Todo corre en Edge Functions
- **Zero config**: `vercel.json` maneja todo
- **Infinite scale**: Vercel CDN + Edge = escalado automático
- **Gratis para hobby projects**: 100GB bandwidth/mes incluido

## 🚨 Importante

Las APIs de Polymarket y Binance son públicas pero pueden tener rate limits.
El caching ayuda a minimizar requests directos.

---

**¿Listo para deployar?** → `vercel --prod`
