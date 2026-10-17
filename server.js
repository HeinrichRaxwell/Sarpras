/**
 * SaranaPrasana Asset Management - Local Application Server
 * Serves static assets, handles clean routing, and provides API/health endpoint
 * Port: 5055
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5055;
const ROOT_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  let cleanUrl = req.url.split('?')[0].split('#')[0];
  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, cleanUrl);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(`
        <div style="font-family: sans-serif; padding: 40px; text-align: center;">
          <h2 style="color: #0F172A;">404 - Halaman Tidak Ditemukan</h2>
          <p style="color: #64748B;">File <code>${cleanUrl}</code> tidak ditemukan di server.</p>
          <a href="/index.html" style="color: #1F46E5; font-weight: 600;">Kembali ke Halaman Login</a>
        </div>
      `);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('================================================================');
  console.log('   SARANAPRASANA - ASSET MANAGEMENT SYSTEM (UAS WEB 2)');
  console.log('================================================================');
  console.log(` Server berjalan di   : http://localhost:${PORT}`);
  console.log(` Port Host             : ${PORT}`);
  console.log(` Database PostgreSQL   : 127.0.0.1:5435 (Docker)`);
  console.log(` Akun Demo Login       : admin / admin123`);
  console.log('================================================================');
  console.log('Tekan Ctrl + C di terminal untuk menghentikan server.');
});
