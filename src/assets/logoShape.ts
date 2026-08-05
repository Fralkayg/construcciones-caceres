// Single source of truth for the Construcciones Cáceres mark: a minimal
// house/roofline glyph. Shared between the web <Logo> component (SVG) and
// the PDF template (@react-pdf/renderer's Svg primitives), so both render
// from the exact same geometry.

export const LOGO_VIEWBOX = '0 0 64 64'

export const LOGO_BADGE_RECT = { x: 2, y: 2, width: 60, height: 60, rx: 16 }

// Roofline + walls drawn as one open stroke (no bottom edge).
export const LOGO_HOUSE_PATH = 'M14,50 L14,32 L32,14 L50,32 L50,50'

// Ground line, in the accent color.
export const LOGO_GROUND_PATH = 'M10,50 L54,50'

// Door/window accent square.
export const LOGO_WINDOW_RECT = { x: 26, y: 35, width: 12, height: 13, rx: 2 }

export const LOGO_COLORS = {
  navy: '#142236',
  amber: '#f2a93b',
  white: '#ffffff',
}
