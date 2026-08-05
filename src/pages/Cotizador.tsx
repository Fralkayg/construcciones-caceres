import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pdf, PDFViewer } from '@react-pdf/renderer'
import logo from '../assets/logo.png'
import type { Cotizacion } from '../types'
import { emptyCotizacion, loadDraft, saveDraft, clearDraft } from '../lib/draftStorage'
import PartidasEditor from '../components/cotizador/PartidasEditor'
import CostosTable from '../components/cotizador/CostosTable'
import CotizacionDocument from '../pdf/CotizacionDocument'
import { siteConfig } from '../siteConfig'

const inputClass =
  'w-full rounded-md border border-brand-navy/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold'
const labelClass = 'block text-sm font-semibold text-brand-navy mb-1'

export default function Cotizador() {
  const [data, setData] = useState<Cotizacion>(() => loadDraft() ?? emptyCotizacion())
  const [showPreview, setShowPreview] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [savedAt, setSavedAt] = useState<Date | null>(null)

  useEffect(() => {
    saveDraft(data)
    setSavedAt(new Date())
  }, [data])

  function patch(fields: Partial<Cotizacion>) {
    setData((d) => ({ ...d, ...fields }))
  }

  async function handleDownload() {
    setDownloading(true)
    try {
      const blob = await pdf(<CotizacionDocument data={data} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const safeTitle = (data.tituloProyecto || 'presupuesto')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9áéíóúñ]+/gi, '-')
        .replace(/(^-|-$)/g, '')
      a.href = url
      a.download = `presupuesto-${safeTitle || 'construcciones-caceres'}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(false)
    }
  }

  function handleNuevo() {
    if (!confirm('¿Vaciar el formulario y empezar un presupuesto nuevo? Se perderá el borrador actual.')) {
      return
    }
    clearDraft()
    setData(emptyCotizacion())
    setShowPreview(false)
  }

  return (
    <div className="min-h-screen bg-brand-cream-dark/40">
      <header className="sticky top-0 z-40 bg-brand-navy text-brand-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="" className="h-9 w-9 rounded object-cover" />
            <span className="font-serif font-bold hidden sm:inline">
              {siteConfig.companyName} — Cotizador
            </span>
            <span className="font-serif font-bold sm:hidden">Cotizador</span>
          </Link>
          <div className="text-xs text-brand-cream/60">
            {savedAt ? `Borrador guardado ${savedAt.toLocaleTimeString('es-CL')}` : ''}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
        {/* Datos generales */}
        <section className="rounded-lg bg-white p-5 border border-brand-navy/10">
          <h2 className="font-serif text-lg font-bold text-brand-navy mb-4">Datos generales</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Título del proyecto</label>
              <input
                className={inputClass}
                placeholder="Ej: Modificación de quincho"
                value={data.tituloProyecto}
                onChange={(e) => patch({ tituloProyecto: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Cliente (opcional)</label>
              <input
                className={inputClass}
                placeholder="Nombre del cliente"
                value={data.cliente}
                onChange={(e) => patch({ cliente: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Fecha</label>
              <input
                type="date"
                className={inputClass}
                value={data.fecha}
                onChange={(e) => patch({ fecha: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Resumen */}
        <section className="rounded-lg bg-white p-5 border border-brand-navy/10">
          <h2 className="font-serif text-lg font-bold text-brand-navy mb-4">
            1. Resumen del Proyecto
          </h2>
          <textarea
            className={inputClass}
            rows={4}
            placeholder="Describe brevemente en qué consiste el proyecto..."
            value={data.resumen}
            onChange={(e) => patch({ resumen: e.target.value })}
          />
        </section>

        {/* Partidas */}
        <section className="rounded-lg bg-white p-5 border border-brand-navy/10">
          <h2 className="font-serif text-lg font-bold text-brand-navy mb-4">
            2. Detalle de las Partidas de Trabajo
          </h2>
          <PartidasEditor
            partidas={data.partidas}
            onChange={(partidas) => patch({ partidas })}
          />
        </section>

        {/* Costos */}
        <section className="rounded-lg bg-white p-5 border border-brand-navy/10">
          <h2 className="font-serif text-lg font-bold text-brand-navy mb-4">
            3. Costo del Servicio (Mano de Obra)
          </h2>
          <CostosTable costos={data.costos} onChange={(costos) => patch({ costos })} />
        </section>

        {/* Términos */}
        <section className="rounded-lg bg-white p-5 border border-brand-navy/10">
          <h2 className="font-serif text-lg font-bold text-brand-navy mb-4">
            4. Términos y Condiciones
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Plazo de ejecución</label>
              <input
                className={inputClass}
                placeholder="Ej: El proyecto completo se ejecutará en 5 días trabajados."
                value={data.plazoEjecucion}
                onChange={(e) => patch({ plazoEjecucion: e.target.value })}
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-brand-ink/80">
              <input
                type="checkbox"
                checked={data.incluyeMateriales}
                onChange={(e) => patch({ incluyeMateriales: e.target.checked })}
              />
              El presupuesto incluye materiales (si no se marca, se indicará que es solo mano de
              obra)
            </label>
            <div>
              <label className={labelClass}>Condiciones de pago</label>
              <textarea
                className={inputClass}
                rows={2}
                value={data.condicionesPago}
                onChange={(e) => patch({ condicionesPago: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Notas adicionales (opcional)</label>
              <textarea
                className={inputClass}
                rows={2}
                value={data.notasAdicionales}
                onChange={(e) => patch({ notasAdicionales: e.target.value })}
              />
            </div>
          </div>
        </section>

        {/* Firma */}
        <section className="rounded-lg bg-white p-5 border border-brand-navy/10">
          <h2 className="font-serif text-lg font-bold text-brand-navy mb-4">Firma</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nombre</label>
              <input
                className={inputClass}
                value={data.firmaNombre}
                onChange={(e) => patch({ firmaNombre: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Empresa</label>
              <input
                className={inputClass}
                value={data.firmaEmpresa}
                onChange={(e) => patch({ firmaEmpresa: e.target.value })}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Barra de acciones */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-brand-navy/10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex flex-wrap gap-3 justify-end">
          <button
            type="button"
            onClick={handleNuevo}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-brand-navy border border-brand-navy/20 hover:bg-brand-navy/5"
          >
            Nuevo presupuesto
          </button>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-brand-navy border border-brand-navy/20 hover:bg-brand-navy/5"
          >
            {showPreview ? 'Ocultar vista previa' : 'Vista previa'}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-navy-dark hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
          >
            {downloading ? 'Generando…' : 'Descargar PDF'}
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-8">
          <PDFViewer style={{ width: '100%', height: '85vh', borderRadius: 8 }}>
            <CotizacionDocument data={data} />
          </PDFViewer>
        </div>
      )}
    </div>
  )
}
