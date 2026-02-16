# 🚀 QUICK START

## EN 3 PASOS:

### 1️⃣ Sube a GitHub

```bash
cd polymarket-vercel
git init
git add .
git commit -m "Initial commit - Vercel optimized"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### 2️⃣ Deploy en Vercel

**Opción A - Web (más fácil):**
1. Ve a https://vercel.com
2. Click "New Project"
3. Importa tu repo
4. Click "Deploy"
5. ¡LISTO!

**Opción B - CLI:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3️⃣ Prueba que funcione

Visita: `https://tu-proyecto.vercel.app/test.html`

Click en "Ejecutar Todos los Tests"

Si todo está verde ✅ → **¡Funcionando!**

---

## 🎯 PRUEBA COMPLETA

1. Abre tu sitio: `https://tu-proyecto.vercel.app`
2. Pega una URL de Polymarket (ejemplo: `https://polymarket.com/event/bitcoin-above-100k-by-march-1-2025`)
3. Click "Analyze"
4. **Debe tardar 1-2 segundos** (no 10s como antes)
5. Deberías ver los resultados sin errores

---

## ⚡ DIFERENCIAS CLAVE

**ANTES (Netlify):**
- ❌ CORS errors
- 🐌 10 segundos de análisis
- 🔧 Configuración compleja con _redirects

**AHORA (Vercel):**
- ✅ Sin CORS errors
- ⚡ 1-2s primera vez, <100ms con cache
- 🎯 Zero-config, todo automático

---

## 📊 ARCHIVOS DEL PROYECTO

```
polymarket-vercel/
├── api/
│   ├── gamma/[...path].js      # Edge Function para Polymarket API
│   └── binance/[...path].js    # Edge Function para Binance API
├── index.html                   # Tu frontend (ya optimizado)
├── test.html                    # Página de tests
├── vercel.json                  # Config automática
├── package.json
├── README.md                    # Documentación completa
├── DEPLOYMENT.md                # Guía detallada
└── CHECKLIST.md                 # Checklist de deployment

TOTAL: 10 archivos, listos para deploy
```

---

## 🐛 SI ALGO FALLA

**Error en deploy:**
```bash
vercel logs --follow
```

**Funciona local pero no en Vercel:**
- Verifica que los archivos estén en GitHub
- Asegúrate de que `/api` folder existe
- Re-deploy: `vercel --prod --force`

**Análisis da error:**
- Abre `https://tu-proyecto.vercel.app/test.html`
- Verifica que ambas APIs retornen JSON
- Revisa la consola del navegador (F12)

---

## ✨ NEXT LEVEL (Opcional)

1. **Custom domain:** Settings → Domains en Vercel
2. **Analytics:** Settings → Analytics → Enable
3. **More cache:** Edita `api/*/[...path].js` y aumenta `s-maxage`

---

**¿Listo para deployar?**

```bash
vercel --prod
```

**¡Eso es todo! Tu analyzer estará online en ~30 segundos.** 🎉
