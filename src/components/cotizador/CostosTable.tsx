import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import type { CostoItem } from '../../types'
import { makeId, formatCLP } from '../../lib/format'

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
    <Stack spacing={1.5}>
      <Box
        sx={{
          display: { xs: 'none', sm: 'grid' },
          gridTemplateColumns: '70px 1fr 160px 40px',
          gap: 1,
          px: 0.5,
        }}
      >
        {['Ítem', 'Descripción', 'Valor (CLP)', ''].map((label) => (
          <Typography key={label} variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
            {label}
          </Typography>
        ))}
      </Box>

      {costos.map((c) => (
        <Box
          key={c.id}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '70px 1fr 160px 40px' },
            gap: 1,
            alignItems: 'center',
          }}
        >
          <TextField
            size="small"
            value={c.numero}
            onChange={(e) => update(c.id, { numero: e.target.value })}
          />
          <TextField
            size="small"
            fullWidth
            placeholder="Descripción de la partida"
            value={c.descripcion}
            onChange={(e) => update(c.id, { descripcion: e.target.value })}
          />
          <TextField
            size="small"
            type="number"
            placeholder="0"
            value={c.valor || ''}
            onChange={(e) => update(c.id, { valor: Number(e.target.value) })}
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
            }}
          />
          {costos.length > 1 ? (
            <IconButton onClick={() => removeRow(c.id)} aria-label="Eliminar fila" size="small">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          ) : (
            <Box />
          )}
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addRow}
        sx={{ alignSelf: 'flex-start', borderStyle: 'dashed' }}
      >
        Agregar ítem
      </Button>

      <Divider sx={{ mt: 1 }} />
      <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
        <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>
          TOTAL:&nbsp;
          <Typography component="span" variant="h6" sx={{ fontWeight: 800 }}>
            {formatCLP(total)}
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  )
}
