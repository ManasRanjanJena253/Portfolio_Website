const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const PUBLIC_DIR = path.resolve('.');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8'
};

function send(res, status, headers, streamOrBody) {
  res.writeHead(status, {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  });
  if (streamOrBody instanceof fs.ReadStream) {
    streamOrBody.pipe(res);
  } else {
    res.end(streamOrBody);
  }
}

function safePath(requestPath) {
  const decoded = decodeURIComponent(requestPath.split('?')[0]);
  const filePath = path.normalize(path.join(PUBLIC_DIR, decoded));
  if (!filePath.startsWith(PUBLIC_DIR)) return null; // prevent path traversal
  return filePath;
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME_TYPES[ext] || 'application/octet-stream';
  const stream = fs.createReadStream(filePath);
  stream.on('error', () => send(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Internal Server Error'));
  send(res, 200, { 'Content-Type': type }, stream);
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = safePath(pathname || '/');
  if (!filePath) {
    return send(res, 400, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Bad Request');
  }

  // Default to index.html for root
  let target = filePath;
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, 'index.html');
  }

  // If file exists, serve it
  if (fs.existsSync(target) && fs.statSync(target).isFile()) {
    return serveFile(res, target);
  }

  // SPA-style fallback to index.html (anchors like #hero are client-side)
  const indexPath = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    return serveFile(res, indexPath);
  }

  return send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found');
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Dev server running at http://localhost:${PORT}`);
});
