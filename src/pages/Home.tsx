import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { siteConfig } from '../siteConfig'

const whatsappHref = `https://wa.me/${siteConfig.phoneWhatsapp}?text=${encodeURIComponent(
  `Hola, quisiera cotizar un trabajo con ${siteConfig.companyName}.`,
)}`

export default function Home() {
  return (
    <Box id="top" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box component="main" sx={{ flex: 1 }}>
        {/* Hero */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <Container maxWidth="lg" sx={{ py: { xs: 8, sm: 12 } }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
                gap: { xs: 6, md: 8 },
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2 }}
                >
                  Más de 10 años de experiencia
                </Typography>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.25rem', sm: '3rem' }, mb: 3, lineHeight: 1.15 }}>
                  {siteConfig.tagline}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.85, mb: 4 }}>
                  {siteConfig.taglineSecondary}
                </Typography>
                <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
                  <Button
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    Cotice con nosotros
                  </Button>
                  <Button
                    href="#servicios"
                    variant="outlined"
                    size="large"
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
                  >
                    Ver servicios
                  </Button>
                </Stack>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  <Logo variant="badge" size={200} />
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Nosotros */}
        <Container maxWidth="md" sx={{ py: { xs: 8, sm: 10 }, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 3, fontSize: { xs: '1.9rem', sm: '2.4rem' } }}>
            Nosotros
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: 1.7, color: 'text.secondary' }}>
            {siteConfig.about}
          </Typography>
        </Container>

        {/* Servicios */}
        <Box id="servicios" sx={{ bgcolor: 'background.default', py: { xs: 8, sm: 10 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              sx={{ color: 'primary.main', mb: 6, textAlign: 'center', fontSize: { xs: '1.9rem', sm: '2.4rem' } }}
            >
              Nuestros Servicios
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
                gap: 3,
              }}
            >
              {siteConfig.services.map((s) => (
                <Card key={s.title} variant="outlined" sx={{ borderColor: 'divider' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                      {s.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {s.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Contacto */}
        <Container id="contacto" maxWidth="sm" sx={{ py: { xs: 8, sm: 10 }, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'primary.main', mb: 2, fontSize: { xs: '1.9rem', sm: '2.4rem' } }}>
            Cotice con nosotros
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 5 }}>
            Cuéntanos qué necesitas y te responderemos a la brevedad. Trabajamos en {siteConfig.region}.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            sx={{ justifyContent: 'center', flexWrap: 'wrap', mb: 4 }}
          >
            <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="contained" color="secondary" size="large">
              Escribir por WhatsApp
            </Button>
            <Button href={`mailto:${siteConfig.email}`} variant="outlined" size="large">
              Enviar un correo
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {siteConfig.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {siteConfig.email}
          </Typography>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
