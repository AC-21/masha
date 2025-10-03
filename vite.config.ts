import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false,
    setup: (server) => {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/content') {
          try {
            let body = ''
            req.on('data', (chunk) => (body += chunk))
            req.on('end', () => {
              // write to src/content/site.json and public/content/site.json to expose in prod
              const targetA = path.resolve(process.cwd(), 'src/content/site.json')
              const targetB = path.resolve(process.cwd(), 'public/content/site.json')
              fs.writeFileSync(targetA, body, 'utf8')
              fs.writeFileSync(targetB, body, 'utf8')
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
            })
          } catch (e: any) {
            res.statusCode = 500
            res.end(JSON.stringify({ ok: false, error: e?.message || 'write_failed' }))
          }
          return
        }
        next()
      })
    }
  }
})