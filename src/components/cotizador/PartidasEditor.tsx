import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import type { Partida } from '../../types'
import { makeId } from '../../lib/format'

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
    <Stack spacing={2.5}>
      {partidas.map((p, idx) => (
        <Paper key={p.id} variant="outlined" sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start', mb: 2 }}>
            <Typography
              variant="body2"
              sx={{ mt: 1.75, fontWeight: 700, color: 'text.secondary', flexShrink: 0 }}
            >
              Partida {idx + 1}
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Título de la partida (ej: Demolición de muretes y despeje)"
              value={p.titulo}
              onChange={(e) => updatePartida(p.id, { titulo: e.target.value })}
            />
            {partidas.length > 1 && (
              <IconButton
                onClick={() => removePartida(p.id)}
                aria-label="Eliminar partida"
                color="error"
                size="small"
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>

          <Stack spacing={1.25} sx={{ pl: { xs: 0, sm: 5 } }}>
            {p.items.map((item, i) => (
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }} key={i}>
                <Typography sx={{ color: 'secondary.dark' }}>•</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Detalle del trabajo a realizar"
                  value={item}
                  onChange={(e) => updateItem(p.id, i, e.target.value)}
                />
                {p.items.length > 1 && (
                  <IconButton
                    onClick={() => removeItem(p.id, i)}
                    aria-label="Eliminar ítem"
                    size="small"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            ))}
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => addItem(p.id)}
              sx={{ alignSelf: 'flex-start' }}
            >
              Agregar detalle
            </Button>
          </Stack>

          <Box sx={{ pl: { xs: 0, sm: 5 }, mt: 1.5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Nota opcional (ej: Los sacos de escombros se dejarán acopiados en el exterior)"
              value={p.nota}
              onChange={(e) => updatePartida(p.id, { nota: e.target.value })}
            />
          </Box>
        </Paper>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addPartida}
        sx={{ alignSelf: 'flex-start', borderStyle: 'dashed' }}
      >
        Agregar partida
      </Button>
    </Stack>
  )
}
