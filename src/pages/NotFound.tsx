import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'primary.main',
        px: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        Página no encontrada
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        La página que buscas no existe o fue movida.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained" color="secondary" size="large">
        Volver al inicio
      </Button>
    </Box>
  )
}
