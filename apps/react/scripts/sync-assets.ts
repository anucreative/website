import fs from 'node:fs'
import path from 'node:path'
import { exit } from 'node:process'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_ROOT = path.resolve(__dirname, '../../../packages/ui')
const APP_PUBLIC = path.resolve(__dirname, '../public/assets')

fs.rmSync(APP_PUBLIC, { recursive: true, force: true })
fs.mkdirSync(APP_PUBLIC, { recursive: true })

const src = path.join(COMPONENTS_ROOT, 'dist', 'assets')
const dest = path.join(APP_PUBLIC)

if (!fs.existsSync(src)) {
  console.warn(`⚠️  No assets found`)
  exit(0)
}

fs.cpSync(src, dest, { recursive: true })
console.log(`✓ Synced components css`)
