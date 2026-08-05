import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { siteConfig } from './siteConfig'

// Code-split: @react-pdf/renderer is heavy and only ever needed on this
// route, so public site visitors never download it.
const Cotizador = lazy(() => import('./pages/Cotizador'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path={siteConfig.cotizadorPath}
        element={
          <Suspense fallback={<div className="p-8 text-center text-brand-navy">Cargando…</div>}>
            <Cotizador />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
