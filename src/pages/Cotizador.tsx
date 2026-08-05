import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { pdf, PDFViewer } from '@react-pdf/renderer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Logo from '../components/Logo'
import type { Cotizacion } from '../types'
import { emptyCotizacion, loadDraft, saveDraft, clearDraft } from '../lib/draftStorage'
import PartidasEditor from '../components/cotizador/PartidasEditor'
import CostosTable from '../components/cotizador/CostosTable'
import CotizacionDocument from '../pdf/CotizacionDocument'
import { siteConfig } from '../siteConfig'

function SectionPaper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2.5, sm: 3.5 } }}>
      <Typography variant="h6" sx={{ color: 'primary.main', mb: 2.5 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  )
}

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
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              spacing={1.25}
              sx={{ alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
            >
              <Logo variant="mark" size={32} />
              <Typography sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                {siteConfig.companyName} — Cotizador
              </Typography>
              <Typography sx={{ fontWeight: 700, display: { xs: 'block', sm: 'none' } }}>
                Cotizador
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              {savedAt ? `Borrador guardado ${savedAt.toLocaleTimeString('es-CL')}` : ''}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <SectionPaper title="Datos generales">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2.5,
              }}
            >
              <TextField
                label="Título del proyecto"
                placeholder="Ej: Modificación de quincho"
                value={data.tituloProyecto}
                onChange={(e) => patch({ tituloProyecto: e.target.value })}
              />
              <TextField
                label="Cliente (opcional)"
                placeholder="Nombre del cliente"
                value={data.cliente}
                onChange={(e) => patch({ cliente: e.target.value })}
              />
              <TextField
                label="Fecha"
                type="date"
                value={data.fecha}
                onChange={(e) => patch({ fecha: e.target.value })}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
          </SectionPaper>

          <SectionPaper title="1. Resumen del Proyecto">
            <TextField
              fullWidth
              multiline
              minRows={4}
              placeholder="Describe brevemente en qué consiste el proyecto..."
              value={data.resumen}
              onChange={(e) => patch({ resumen: e.target.value })}
            />
          </SectionPaper>

          <SectionPaper title="2. Detalle de las Partidas de Trabajo">
            <PartidasEditor partidas={data.partidas} onChange={(partidas) => patch({ partidas })} />
          </SectionPaper>

          <SectionPaper title="3. Costo del Servicio (Mano de Obra)">
            <CostosTable costos={data.costos} onChange={(costos) => patch({ costos })} />
          </SectionPaper>

          <SectionPaper title="4. Términos y Condiciones">
            <Stack spacing={2.5}>
              <TextField
                label="Plazo de ejecución"
                fullWidth
                placeholder="Ej: El proyecto completo se ejecutará en 5 días trabajados."
                value={data.plazoEjecucion}
                onChange={(e) => patch({ plazoEjecucion: e.target.value })}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.incluyeMateriales}
                    onChange={(e) => patch({ incluyeMateriales: e.target.checked })}
                  />
                }
                label="El presupuesto incluye materiales (si no se marca, se indicará que es solo mano de obra)"
              />
              <TextField
                label="Condiciones de pago"
                fullWidth
                multiline
                minRows={2}
                value={data.condicionesPago}
                onChange={(e) => patch({ condicionesPago: e.target.value })}
              />
              <TextField
                label="Notas adicionales (opcional)"
                fullWidth
                multiline
                minRows={2}
                value={data.notasAdicionales}
                onChange={(e) => patch({ notasAdicionales: e.target.value })}
              />
            </Stack>
          </SectionPaper>

          <SectionPaper title="Firma">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2.5,
              }}
            >
              <TextField
                label="Nombre"
                value={data.firmaNombre}
                onChange={(e) => patch({ firmaNombre: e.target.value })}
              />
              <TextField
                label="Empresa"
                value={data.firmaEmpresa}
                onChange={(e) => patch({ firmaEmpresa: e.target.value })}
              />
            </Box>
          </SectionPaper>
        </Stack>
      </Container>

      <AppBar
        position="fixed"
        color="inherit"
        elevation={3}
        sx={{ top: 'auto', bottom: 0, bgcolor: 'background.paper' }}
      >
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1.5, py: 1 }}>
            <Button variant="outlined" onClick={handleNuevo}>
              Nuevo presupuesto
            </Button>
            <Button variant="outlined" onClick={() => setShowPreview((v) => !v)}>
              {showPreview ? 'Ocultar vista previa' : 'Vista previa'}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDownload} disabled={downloading}>
              {downloading ? 'Generando…' : 'Descargar PDF'}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {showPreview && (
        <Container maxWidth="md" sx={{ pb: 4 }}>
          <PDFViewer style={{ width: '100%', height: '85vh', borderRadius: 8, border: 'none' }}>
            <CotizacionDocument data={data} />
          </PDFViewer>
        </Container>
      )}
    </Box>
  )
}
