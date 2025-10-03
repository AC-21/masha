import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'content-writer',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/content') {
            try {
              let body = ''
              req.on('data', (chunk) => (body += chunk))
              req.on('end', () => {
                const targetA = path.resolve(process.cwd(), 'src/content/site.json')
                const targetB = path.resolve(process.cwd(), 'public/content/site.json')
                fs.writeFileSync(targetA, body, 'utf8')
                fs.writeFileSync(targetB, body, 'utf8')
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: true }))
              })
            } catch (e) {
              res.statusCode = 500
              res.end(JSON.stringify({ ok: false }))
            }
            return
          }
          next()
        })
      }
    }
  ]
})