import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import Logo from './Logo'
import { siteConfig } from '../siteConfig'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white' }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Logo variant="mark" size={36} />
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{siteConfig.companyName}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {siteConfig.region}
              </Typography>
            </Box>
          </Stack>

          <Stack spacing={0.5} sx={{ alignItems: { xs: 'flex-start', sm: 'flex-end' } }}>
            <Link href={`tel:${siteConfig.phoneWhatsapp}`} color="inherit" underline="hover" sx={{ opacity: 0.85 }}>
              {siteConfig.phone}
            </Link>
            <Link href={`mailto:${siteConfig.email}`} color="inherit" underline="hover" sx={{ opacity: 0.85 }}>
              {siteConfig.email}
            </Link>
          </Stack>
        </Stack>
      </Container>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <Typography variant="caption" align="center" sx={{ display: 'block', py: 2, opacity: 0.5 }}>
        © {year} {siteConfig.companyName}. Todos los derechos reservados.
      </Typography>
    </Box>
  )
}
