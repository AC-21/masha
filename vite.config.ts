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
          // Save content JSON (site.json)
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

          // Save tokens JS (tokens-clean.js)
          if (req.method === 'POST' && req.url === '/api/tokens') {
            try {
              let body = ''
              req.on('data', (chunk) => (body += chunk))
              req.on('end', () => {
                const json = JSON.parse(body || '{}')
                const tokens = json && json.tokens ? json.tokens : json
                const out = `export const tokens = ${JSON.stringify({
                  colors: {
                    base: '#FEFEF7', text: '#000000', muted: '#4c4848', brand: '#3b5849', line: '#d4cccc'
                  },
                  fonts: tokens.fonts || { body: 'Inter, ui-sans-serif, system-ui, sans-serif', mono: 'Roboto Mono, ui-monospace, SFMono-Regular, monospace', script: 'Caveat, cursive' },
                  radius: { portraitMobile: '28px', portraitDesktop: '37px', soft: '16px', pill: '9999px' },
                  fontSize: tokens.fontSize || { body: ['14px', { lineHeight: '28px' }], small: ['12px', { lineHeight: '18px' }], h2: ['20px', { lineHeight: '24px', letterSpacing: '0.06em' }], h3: ['16px', { lineHeight: '20px', letterSpacing: '0.06em' }] },
                  spacing: tokens.spacing || { paragraph: 16, h2: { mt: 0, mb: 8 }, h3: { mt: 12, mb: 6 } }
                }, null, 2)}\n`;
                const target = path.resolve(process.cwd(), 'src/styles/tokens-clean.js')
                fs.writeFileSync(target, out, 'utf8')
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