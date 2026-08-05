import type { Partida } from '../../types'
import { makeId } from '../../lib/format'

const inputClass =
  'w-full rounded-md border border-brand-navy/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold'

interface Props {
  partidas: Partida[]
  onChange: (partidas: Partida[]) => void
}

export default function PartidasEditor({ partidas, onChange }: Props) {
  function updatePartida(id: string, patch: Partial<Partida>) {
    onChange(partidas.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function addPartida() {
    onChange([...partidas, { id: makeId(), titulo: '', items: [''], nota: '' }])
  }

  function removePartida(id: string) {
    onChange(partidas.filter((p) => p.id !== id))
  }

  function updateItem(partidaId: string, index: number, value: string) {
    const partida = partidas.find((p) => p.id === partidaId)
    if (!partida) return
    const items = partida.items.map((it, i) => (i === index ? value : it))
    updatePartida(partidaId, { items })
  }

  function addItem(partidaId: string) {
    const partida = partidas.find((p) => p.id === partidaId)
    if (!partida) return
    updatePartida(partidaId, { items: [...partida.items, ''] })
  }

  function removeItem(partidaId: string, index: number) {
    const partida = partidas.find((p) => p.id === partidaId)
    if (!partida) return
    updatePartida(partidaId, { items: partida.items.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-5">
      {partidas.map((p, idx) => (
        <div key={p.id} className="rounded-lg border border-brand-navy/15 bg-white p-4">
          <div className="flex items-start gap-3 mb-3">
            <span className="mt-2 text-sm font-semibold text-brand-navy/60 shrink-0">
              Partida {idx + 1}
            </span>
            <input
              className={inputClass}
              placeholder="Título de la partida (ej: Demolición de muretes y despeje)"
              value={p.titulo}
              onChange={(e) => updatePartida(p.id, { titulo: e.target.value })}
            />
            {partidas.length > 1 && (
              <button
                type="button"
                onClick={() => removePartida(p.id)}
                className="shrink-0 text-sm text-red-600 hover:text-red-800 px-2 py-2"
                aria-label="Eliminar partida"
              >
                Eliminar
              </button>
            )}
          </div>

          <div className="space-y-2 pl-0 sm:pl-4">
            {p.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-brand-gold-dark">•</span>
                <input
                  className={inputClass}
                  placeholder="Detalle del trabajo a realizar"
                  value={item}
                  onChange={(e) => updateItem(p.id, i, e.target.value)}
                />
                {p.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(p.id, i)}
                    className="shrink-0 text-red-600 hover:text-red-800 px-2"
                    aria-label="Eliminar ítem"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addItem(p.id)}
              className="text-sm font-medium text-brand-navy hover:text-brand-gold-dark"
            >
              + Agregar detalle
            </button>
          </div>

          <div className="mt-3 pl-0 sm:pl-4">
            <input
              className={inputClass}
              placeholder="Nota opcional (ej: Los sacos de escombros se dejarán acopiados en el exterior)"
              value={p.nota}
              onChange={(e) => updatePartida(p.id, { nota: e.target.value })}
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addPartida}
        className="rounded-md border border-dashed border-brand-navy/30 px-4 py-2 text-sm font-medium text-brand-navy hover:bg-brand-navy/5"
      >
        + Agregar partida
      </button>
    </div>
  )
}
