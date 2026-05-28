#!/usr/bin/env node
const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 8000
const BASE = __dirname
const BDD_PATH = path.join(BASE, 'bdd.json')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
}

const server = http.createServer((req, res) => {
  // POST /api/bdd — atomic write to bdd.json
  if (req.method === 'POST' && req.url === '/api/bdd') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        const tmp = BDD_PATH + '.tmp'
        fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8')
        fs.renameSync(tmp, BDD_PATH)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: true }))
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: false, error: e.message }))
      }
    })
    return
  }

  // Static files
  let urlPath = req.url.split('?')[0]
  // strip /groupeniort_map/ prefix if present
  if (urlPath.startsWith('/groupeniort_map/')) urlPath = urlPath.slice('/groupeniort_map'.length)
  if (urlPath === '/') urlPath = '/index.html'

  const filePath = path.join(BASE, urlPath)
  // prevent path traversal
  if (!filePath.startsWith(BASE)) {
    res.writeHead(403); res.end(); return
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not found')
      return
    }
    const ext = path.extname(filePath)
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' }
    if (['.html', '.js', '.css', '.json'].includes(ext)) {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    }
    res.writeHead(200, headers)
    res.end(data)
  })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`groupeniort_map server running on http://0.0.0.0:${PORT}`)
})
