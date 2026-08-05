import { createTheme } from '@mui/material/styles'

// Keep in sync with the Tailwind `@theme` tokens in index.css — both
// describe the same "refined navy & amber" palette.
export const palette = {
  navy: '#142236',
  navyDark: '#0b131f',
  navyLight: '#22375a',
  amber: '#f2a93b',
  amberDark: '#d98f1f',
  bg: '#f6f7f9',
  surface: '#ffffff',
  border: '#e3e6eb',
  ink: '#1a1f29',
  muted: '#5b6472',
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: palette.navy, light: palette.navyLight, dark: palette.navyDark, contrastText: '#ffffff' },
    secondary: { main: palette.amber, light: '#f6c473', dark: palette.amberDark, contrastText: palette.navy },
    background: { default: palette.bg, paper: palette.surface },
    text: { primary: palette.ink, secondary: palette.muted },
    divider: palette.border,
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Segoe UI", Roboto, system-ui, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingLeft: 20, paddingRight: 20 },
        sizeLarge: { paddingTop: 10, paddingBottom: 10 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
})

export default theme
