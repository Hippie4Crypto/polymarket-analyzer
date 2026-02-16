#!/usr/bin/env node

/**
 * LOCAL DEV SERVER - Polymarket Analyzer
 * Simula las Edge Functions de Vercel localmente
 * Corre esto para probar sin CORS errors
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 3000;

// Helper para hacer fetch a APIs externas
function fetchAPI(url, callback) {
    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                callback(null, JSON.parse(data));
            } catch (e) {
                callback(e);
            }
        });
    }).on('error', callback);
}

const server = http.createServer((req, res) => {
    // CORS headers para todo
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Gamma API Proxy
    if (req.url.startsWith('/api/gamma')) {
        const apiPath = req.url.replace('/api/gamma', '');
        const apiUrl = `https://gamma-api.polymarket.com${apiPath}`;
        
        console.log(`[GAMMA] ${apiUrl}`);
        
        fetchAPI(apiUrl, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            }
        });
        return;
    }
    
    // Binance API Proxy
    if (req.url.startsWith('/api/binance')) {
        const apiPath = req.url.replace('/api/binance', '');
        const apiUrl = `https://api.binance.com${apiPath}`;
        
        console.log(`[BINANCE] ${apiUrl}`);
        
        fetchAPI(apiUrl, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            }
        });
        return;
    }
    
    // Servir archivos estáticos
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    const extname = path.extname(filePath);
    const contentTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };
    const contentType = contentTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('');
    console.log('🚀 Polymarket Analyzer - Dev Server');
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log('');
    console.log('📋 Available endpoints:');
    console.log(`   • Main app: http://localhost:${PORT}`);
    console.log(`   • Test page: http://localhost:${PORT}/test.html`);
    console.log('');
    console.log('🔌 API Proxies (CORS enabled):');
    console.log(`   • /api/gamma/* → https://gamma-api.polymarket.com/*`);
    console.log(`   • /api/binance/* → https://api.binance.com/*`);
    console.log('');
    console.log('Press Ctrl+C to stop');
    console.log('');
});
