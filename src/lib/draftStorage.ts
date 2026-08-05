import type { Cotizacion } from '../types'
import { makeId, todayISO } from './format'
import { siteConfig } from '../siteConfig'

const STORAGE_KEY = 'cc-cotizador-draft-v1'

export function emptyCotizacion(): Cotizacion {
  return {
    tituloProyecto: '',
    cliente: '',
    fecha: todayISO(),
    resumen: '',
    partidas: [{ id: makeId(), titulo: '', items: [''], nota: '' }],
    costos: [{ id: makeId(), numero: '1.0', descripcion: '', valor: 0 }],
    plazoEjecucion: '',
    incluyeMateriales: false,
    condicionesPago:
      '40% del presupuesto al momento de iniciado los trabajos y 60% contra entrega conforme de los trabajos terminados.',
    notasAdicionales:
      'Cualquier trabajo que se solicite adicional a lo detallado será evaluado y cobrado como adicional.',
    firmaNombre: siteConfig.ownerName,
    firmaEmpresa: siteConfig.companyName,
  }
}

export function loadDraft(): Cotizacion | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Cotizacion
  } catch {
    return null
  }
}

export function saveDraft(data: Cotizacion): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — silently skip.
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
