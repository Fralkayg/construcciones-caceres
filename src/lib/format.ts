export function formatCLP(value: number): string {
  if (Number.isNaN(value)) return '$0'
  return '$' + Math.round(value).toLocaleString('es-CL')
}

export function formatFechaLarga(isoDate: string): string {
  if (!isoDate) return ''
  const [y, m, d] = isoDate.split('-').map(Number)
  const date = new Date(y, (m ?? 1) - 1, d ?? 1)
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export function todayISO(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

let counter = 0
export function makeId(): string {
  counter += 1
  return `${Date.now().toString(36)}-${counter}`
}
