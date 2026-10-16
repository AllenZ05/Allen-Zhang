// Local-only static preview for the exported site and its browser checks.

import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".mp4": "video/mp4",
};
createServer(async (request, response) => {
  try {
    let file = resolve(root, `.${decodeURIComponent(new URL(request.url, "http://localhost").pathname)}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
      const body = await readFile(file);
      const type = types[extname(file)] || "application/octet-stream";
      // Safari only plays video from servers that answer byte-range requests, as Netlify does.
      const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range || "");
      if (range) {
        const start = range[1] ? Number(range[1]) : body.length - Number(range[2]);
        const end = range[1] && range[2] ? Math.min(Number(range[2]), body.length - 1) : body.length - 1;
        response.writeHead(206, {
          "Content-Type": type,
          "Content-Range": `bytes ${start}-${end}/${body.length}`,
          "Accept-Ranges": "bytes",
        });
        response.end(body.subarray(start, end + 1));
        return;
      }
      response.writeHead(200, { "Content-Type": type, "Accept-Ranges": "bytes" });
      response.end(body);
    } catch {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end(await readFile(resolve(root, "404.html")));
    }
  } catch {
    response.writeHead(400).end();
  }
}).listen(4175, "127.0.0.1", () => console.log("Preview: http://127.0.0.1:4175"));
