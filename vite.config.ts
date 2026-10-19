import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const faviconPath = path.join(rootDir, 'favicon.svg')
const docsDir = path.join(rootDir, 'docs')
const cvFileName = 'Bunsal - FullStack Application.pdf'

/** Serve root favicon + gitignored docs/ CV in dev; copy into dist on build. */
function localStaticAssets(): Plugin {
  return {
    name: 'local-static-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url ?? '').split('?')[0] ?? '')

        if (url === '/favicon.svg' && fs.existsSync(faviconPath)) {
          res.setHeader('Content-Type', 'image/svg+xml')
          fs.createReadStream(faviconPath).pipe(res)
          return
        }

        if (url.startsWith('/docs/')) {
          const relative = url.slice('/docs/'.length)
          const filePath = path.normalize(path.join(docsDir, relative))
          if (
            filePath.startsWith(docsDir) &&
            fs.existsSync(filePath) &&
            fs.statSync(filePath).isFile()
          ) {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader(
              'Content-Disposition',
              `inline; filename="${path.basename(filePath)}"`,
            )
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }

        next()
      })
    },
    closeBundle() {
      const distDir = path.join(rootDir, 'dist')
      if (!fs.existsSync(distDir)) return

      if (fs.existsSync(faviconPath)) {
        fs.copyFileSync(faviconPath, path.join(distDir, 'favicon.svg'))
      }

      const cvSrc = path.join(docsDir, cvFileName)
      if (fs.existsSync(cvSrc)) {
        const cvDestDir = path.join(distDir, 'docs')
        fs.mkdirSync(cvDestDir, { recursive: true })
        fs.copyFileSync(cvSrc, path.join(cvDestDir, cvFileName))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localStaticAssets()],
})
