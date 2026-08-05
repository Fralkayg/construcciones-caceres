import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo from /construcciones-caceres/, not /.
  // The deploy workflow sets BASE_PATH; everywhere else (local dev, other
  // static hosts like Vercel/Netlify serving from the domain root) falls
  // back to '/'.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
