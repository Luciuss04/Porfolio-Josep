import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// La base es absoluta porque hay rutas anidadas (/proyectos/…); el modo 'single' sigue siendo relativo
export default defineConfig(({ mode }) => ({
  base: mode === 'single' ? './' : '/Porfolio-Josep/',
  plugins: [react(), tailwindcss(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
}))
