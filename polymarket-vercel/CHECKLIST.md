# ✅ CHECKLIST DE DEPLOYMENT

## Pre-Deploy

- [ ] Código revisado y optimizado
- [ ] Edge Functions creadas en `/api/gamma` y `/api/binance`
- [ ] `vercel.json` configurado correctamente
- [ ] `index.html` actualizado (sin proxies externos)

## Deploy

- [ ] Código en GitHub (o alternativa)
- [ ] Proyecto creado en Vercel
- [ ] Build exitoso (sin errores)
- [ ] URLs generadas correctamente

## Post-Deploy Tests

- [ ] **Sitio carga:** `https://tu-proyecto.vercel.app`
- [ ] **API Gamma funciona:** `https://tu-proyecto.vercel.app/api/gamma/events?slug=bitcoin`
- [ ] **API Binance funciona:** `https://tu-proyecto.vercel.app/api/binance/api/v3/ticker/24hr?symbol=BTCUSDT`
- [ ] **Test page:** `https://tu-proyecto.vercel.app/test.html`
- [ ] **Análisis completo:** Pega una URL de Polymarket y click en "Analyze"

## Performance Check

- [ ] Primera request: <2 segundos
- [ ] Requests con cache: <100ms
- [ ] Sin errores CORS
- [ ] Sin errores 500 en logs

## Optional (Mejoras)

- [ ] Dominio custom configurado
- [ ] Vercel Analytics habilitado
- [ ] Environment variables (si las necesitas)
- [ ] Rate limiting configurado

## Troubleshooting

Si algo falla:

```bash
# Ver logs en tiempo real
vercel logs https://tu-proyecto.vercel.app --follow

# Re-deploy
vercel --prod --force
```

## Success Metrics

Tu proyecto está bien si:

✅ Análisis completo en 1-2 segundos (primera vez)
✅ Cache funciona (<100ms en requests siguientes)
✅ Sin errores CORS
✅ Sin errores 500
✅ Logs limpios

---

**Last updated:** $(date)
