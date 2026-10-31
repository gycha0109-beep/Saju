import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';
import console from 'node:console';
const sourceDir = dirname(fileURLToPath(import.meta.url));
export function experienceAssets() {
  return new Map([
    ['/two-view/experience', [resolve(sourceDir, 'experience.html'), 'text/html; charset=utf-8']],
    ['/two-view/experience.mjs', [resolve(sourceDir, 'experience.mjs'), 'text/javascript']],
    ['/two-view/experience-ui.mjs', [resolve(sourceDir, 'experience-ui.mjs'), 'text/javascript']],
  ]);
}
export function createExperienceServer({ port = 8769 } = {}) {
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw Error('PORT_INVALID');
  const assets = experienceAssets();
  return createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    if (req.headers.host !== `127.0.0.1:${port}`) {
      res.writeHead(403);
      res.end('HOST_REJECTED');
      return;
    }
    if (req.method !== 'GET') {
      res.writeHead(405, { Allow: 'GET' });
      res.end('METHOD_REJECTED');
      return;
    }
    let pathname;
    try {
      pathname = new URL(req.url, `http://127.0.0.1:${port}`).pathname;
    } catch {
      res.writeHead(400);
      res.end('URL_REJECTED');
      return;
    }
    const asset = assets.get(pathname === '/' ? '/two-view/experience' : pathname);
    if (!asset) {
      res.writeHead(404);
      res.end('NOT_FOUND');
      return;
    }
    try {
      const body = await readFile(asset[0]);
      res.writeHead(200, { 'Content-Type': asset[1] });
      res.end(body);
    } catch {
      res.writeHead(503);
      res.end('EXPERIENCE_ASSET_UNAVAILABLE');
    }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = process.argv[2] === undefined ? 8769 : Number(process.argv[2]);
  const server = createExperienceServer({ port });
  server.on('error', () => {
    console.error('EXPERIENCE_SERVER_FAILED');
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () =>
    console.log(`EXPERIENCE_READY http://127.0.0.1:${port}/two-view/experience`),
  );
}
