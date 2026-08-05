import type { CostoItem } from '../../types'
import { makeId, formatCLP } from '../../lib/format'

const inputClass =
  'w-full rounded-md border border-brand-navy/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold'

interface Props {
  costos: CostoItem[]
  onChange: (costos: CostoItem[]) => void
}

export default function CostosTable({ costos, onChange }: Props) {
  const total = costos.reduce((sum, c) => sum + (Number(c.valor) || 0), 0)

  function update(id: string, patch: Partial<CostoItem>) {
    onChange(costos.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  function addRow() {
    const nextNum = (costos.length + 1).toFixed(1)
    onChange([...costos, { id: makeId(), numero: nextNum, descripcion: '', valor: 0 }])
  }

  function removeRow(id: string) {
    onChange(costos.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-3">
      <div className="hidden sm:grid grid-cols-[70px_1fr_140px_36px] gap-2 px-1 text-xs font-semibold text-brand-navy/60 uppercase">
        <span>Ítem</span>
        <span>Descripción</span>
        <span>Valor (CLP)</span>
        <span />
      </div>

      {costos.map((c) => (
        <div
          key={c.id}
          className="grid grid-cols-1 sm:grid-cols-[70px_1fr_140px_36px] gap-2 items-center"
        >
          <input
            className={inputClass}
            value={c.numero}
            onChange={(e) => update(c.id, { numero: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Descripción de la partida"
            value={c.descripcion}
            onChange={(e) => update(c.id, { descripcion: e.target.value })}
          />
          <input
            className={inputClass}
            type="number"
            min={0}
            step={1000}
            placeholder="0"
            value={c.valor || ''}
            onChange={(e) => update(c.id, { valor: Number(e.target.value) })}
          />
          {costos.length > 1 ? (
            <button
              type="button"
              onClick={() => removeRow(c.id)}
              className="text-red-600 hover:text-red-800 justify-self-start sm:justify-self-center"
              aria-label="Eliminar fila"
            >
              ✕
            </button>
          ) : (
            <span />
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="rounded-md border border-dashed border-brand-navy/30 px-4 py-2 text-sm font-medium text-brand-navy hover:bg-brand-navy/5"
      >
        + Agregar ítem
      </button>

      <div className="flex justify-end pt-2 border-t border-brand-navy/10">
        <p className="text-sm font-semibold text-brand-navy">
          TOTAL: <span className="text-base">{formatCLP(total)}</span>
        </p>
      </div>
    </div>
  )
}
