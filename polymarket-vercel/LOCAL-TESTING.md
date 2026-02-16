# 🖥️ PROBAR EN LOCAL - Guía Rápida

## ⚡ MÉTODO FÁCIL (Con el servidor incluido)

### 1️⃣ Abre una terminal en la carpeta del proyecto

```bash
cd polymarket-vercel
```

### 2️⃣ Inicia el servidor local

```bash
node server.js
```

O usando npm:

```bash
npm start
```

Verás esto:
```
🚀 Polymarket Analyzer - Dev Server
═══════════════════════════════════════

✅ Server running at http://localhost:3000

📋 Available endpoints:
   • Main app: http://localhost:3000
   • Test page: http://localhost:3000/test.html

🔌 API Proxies (CORS enabled):
   • /api/gamma/* → https://gamma-api.polymarket.com/*
   • /api/binance/* → https://api.binance.com/*
```

### 3️⃣ Abre en tu navegador

```
http://localhost:3000
```

**¡Eso es todo!** Ya funciona sin errores CORS.

---

## 🧪 Probar

1. **Test page:**
   ```
   http://localhost:3000/test.html
   ```
   Click "Ejecutar Todos los Tests"

2. **Análisis completo:**
   - Ve a `http://localhost:3000`
   - Pega una URL de Polymarket
   - Click "Analyze"
   - Debe funcionar sin errores

---

## 🛑 Detener el servidor

Presiona `Ctrl+C` en la terminal

---

## 🐛 Si algo falla

### "Error: Cannot find module..."
```bash
# Estás en la carpeta correcta?
pwd  # Debe mostrar .../polymarket-vercel

# Si no:
cd polymarket-vercel
node server.js
```

### "Address already in use"
Otro proceso está usando el puerto 3000:

```bash
# Mata el proceso
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### "CORS error persiste"
- Asegúrate de estar usando `http://localhost:3000` (no file://)
- Verifica que el servidor esté corriendo
- Revisa la consola del servidor por errores

---

## 📝 Cómo funciona

El servidor `server.js` simula las Edge Functions de Vercel localmente:

```
Tu navegador → http://localhost:3000/api/gamma/events
                        ↓
              server.js (proxy local)
                        ↓
              https://gamma-api.polymarket.com/events
                        ↓
              Respuesta (con CORS headers)
                        ↓
              Tu navegador ✅
```

**Sin servidor:** Browser → API externa = ❌ CORS error
**Con servidor:** Browser → Proxy local → API externa = ✅ Funciona

---

## 🎯 Alternativa: Python Server (si no tienes Node)

Si no tienes Node.js instalado:

```bash
# Python 3
python3 -m http.server 8000

# Abre: http://localhost:8000
```

**NOTA:** Con Python simple server, tendrás errores CORS. 
Mejor instala Node.js: https://nodejs.org

---

## 🚀 Cuando esté listo, deploya a Vercel

```bash
vercel --prod
```

O usa el script:
```bash
./deploy.sh
```

---

## ✅ Checklist

- [ ] `node server.js` corre sin errores
- [ ] Puedo abrir `http://localhost:3000`
- [ ] Test page pasa todos los tests
- [ ] Análisis completo funciona
- [ ] Listo para deployar a Vercel

---

**¿Todo funcionando?** ¡Perfecto! Ahora deploya a Vercel para tenerlo online 🚀
