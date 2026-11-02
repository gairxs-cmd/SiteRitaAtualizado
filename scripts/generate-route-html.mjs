import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { specialties } from '../src/data/specialties.js'

const base = await readFile('dist/index.html', 'utf8')
const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

for (const specialty of specialties) {
  const title = escapeHtml(`${specialty.title} | Dra. Rita de Cássia`)
  const description = escapeHtml(specialty.summary)
  const html = base
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${description}$2`)
  const directory = join('dist', 'especialidades', specialty.slug)
  await mkdir(directory, { recursive: true })
  await writeFile(join(directory, 'index.html'), html)
}
