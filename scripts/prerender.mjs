// Tras `vite build`: escribe un index.html por ruta con su título y metadatos, para que
// GitHub Pages responda 200 en cada URL y los buscadores y redes lean los datos correctos.
// También genera 404.html (la propia SPA, que muestra «página no encontrada») y sitemap.xml.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { PROJECTS } from '../src/data/projects.ts'
import { PAGES, SITE_NAME, SITE_URL } from '../src/data/site.ts'

const dist = path.resolve(import.meta.dirname, '../dist')
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const routes = [
  ...Object.values(PAGES).map((p) => ({ path: p.path, title: p.title.es, description: p.description.es })),
  ...PROJECTS.filter((p) => p.caseStudy).map((p) => ({
    path: `/proyectos/${p.slug}`,
    title: `${p.name.es} · ${SITE_NAME}`,
    description: p.summary.es,
  })),
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function render({ path: route, title, description }, { noindex = false } = {}) {
  const url = `${SITE_URL}${route === '/' ? '/' : `${route}/`}`
  const set = (html, re, value) => {
    if (!re.test(html)) throw new Error(`prerender: no se encuentra ${re} en index.html`)
    return html.replace(re, value)
  }
  let html = template
  html = set(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  html = set(html, /(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
  html = set(html, /(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
  html = set(html, /(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
  html = set(html, /(<meta property="og:url" content=")[^"]*/, `$1${url}`)
  html = set(html, /(<link rel="canonical" href=")[^"]*/, `$1${url}`)
  if (noindex) html = html.replace('</title>', '</title>\n    <meta name="robots" content="noindex" />')
  return html
}

for (const route of routes) {
  const dir = path.join(dist, route.path)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), render(route))
}

await writeFile(
  path.join(dist, '404.html'),
  render({ path: '/', title: `Página no encontrada · ${SITE_NAME}`, description: 'Esta página no existe.' }, { noindex: true }),
)

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : `${r.path}/`}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`
await writeFile(path.join(dist, 'sitemap.xml'), sitemap)

console.log(`prerender: ${routes.length} rutas, 404.html y sitemap.xml`)
