import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Logo from './Logo'
import { siteConfig } from '../siteConfig'

const links = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'primary.dark' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <Stack
            component="a"
            href="#top"
            direction="row"
            spacing={1.25}
            sx={{ alignItems: 'center', textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
          >
            <Logo variant="mark" size={36} />
            <Typography variant="h6" noWrap sx={{ fontWeight: 800 }}>
              {siteConfig.companyName}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}
          >
            {links.map((l) => (
              <Button key={l.href} href={l.href} color="inherit" sx={{ fontWeight: 500 }}>
                {l.label}
              </Button>
            ))}
            <Button href="#contacto" variant="contained" color="secondary" sx={{ ml: 1 }}>
              Cotice con nosotros
            </Button>
          </Stack>

          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', p: 2 }}>
            <Logo variant="badge" size={32} />
            <Typography sx={{ fontWeight: 700 }}>{siteConfig.companyName}</Typography>
          </Stack>
          <List>
            {links.map((l) => (
              <ListItemButton key={l.href} component="a" href={l.href} onClick={() => setOpen(false)}>
                <ListItemText primary={l.label} />
              </ListItemButton>
            ))}
            <ListItemButton component="a" href="#contacto" onClick={() => setOpen(false)}>
              <ListItemText primary="Cotice con nosotros" sx={{ color: 'secondary.dark', fontWeight: 700 }} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
