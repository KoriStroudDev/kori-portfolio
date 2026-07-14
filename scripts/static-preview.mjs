#!/usr/bin/env node
/**
 * Production-like static preview for dist/client.
 *
 * Reproduces the Nginx semantics used in deploy/nginx/kori.tradeopsdata.com.conf:
 *   - `try_files $uri $uri/ $uri.html =404`
 *   - directory requests without a trailing slash 301-redirect to the slash form
 *   - `.rsc` files are served as `text/x-component`
 *   - unknown routes serve 404.html with a 404 status
 *
 * Usage: node scripts/static-preview.mjs [port]
 */
import { createServer } from "node:http";
import { existsSync, statSync, createReadStream, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = join(fileURLToPath(new URL("../", import.meta.url)), "dist", "client");
const port = Number(process.argv[2] ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".rsc": "text/x-component",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const compressible = new Set([".html", ".css", ".js", ".mjs", ".json", ".svg", ".txt", ".xml", ".rsc"]);

function send(req, res, status, filePath) {
  const type = types[extname(filePath)] ?? "application/octet-stream";
  const acceptsGzip = (req.headers["accept-encoding"] ?? "").includes("gzip");
  // Mirror production: Nginx serves text assets gzip-compressed.
  if (acceptsGzip && compressible.has(extname(filePath))) {
    const body = gzipSync(readFileSync(filePath));
    res.writeHead(status, { "content-type": type, "content-encoding": "gzip", "content-length": body.length });
    res.end(body);
    return;
  }
  res.writeHead(status, { "content-type": type });
  createReadStream(filePath).pipe(res);
}

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const safePath = normalize(pathname).replaceAll("\\", "/");
  if (safePath.includes("..")) {
    res.writeHead(400).end("Bad request");
    return;
  }

  // vinext's client router requests "/.rsc" for the root route; the exported
  // payload lives at /index.rsc (mirrored in the Nginx config).
  const fsPath = join(root, safePath === "/.rsc" ? "/index.rsc" : safePath);

  // try_files $uri
  if (existsSync(fsPath) && statSync(fsPath).isFile()) {
    send(req, res, 200, fsPath);
    return;
  }
  // directory handling: redirect to slash form first (nginx static module behavior)
  if (existsSync(fsPath) && statSync(fsPath).isDirectory()) {
    if (!safePath.endsWith("/")) {
      res.writeHead(301, { location: `${safePath}/${url.search}` }).end();
      return;
    }
    const index = join(fsPath, "index.html");
    if (existsSync(index)) {
      send(req, res, 200, index);
      return;
    }
  }
  // try_files $uri.html
  const htmlPath = `${fsPath}.html`;
  if (!safePath.endsWith("/") && existsSync(htmlPath) && statSync(htmlPath).isFile()) {
    send(req, res, 200, htmlPath);
    return;
  }
  // =404 with error_page 404 /404.html
  const notFound = join(root, "404.html");
  if (existsSync(notFound)) {
    send(req, res, 404, notFound);
    return;
  }
  res.writeHead(404).end("Not found");
}).listen(port, () => {
  console.log(`Static preview (nginx semantics) on http://localhost:${port}`);
});
