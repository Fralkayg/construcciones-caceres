import {
  LOGO_VIEWBOX,
  LOGO_BADGE_RECT,
  LOGO_HOUSE_PATH,
  LOGO_GROUND_PATH,
  LOGO_WINDOW_RECT,
  LOGO_COLORS,
} from '../assets/logoShape'

interface LogoProps {
  /** "badge" draws its own navy rounded-square background (for use on any
   * background). "mark" is transparent — only use on a dark/navy background. */
  variant?: 'badge' | 'mark'
  size?: number
  className?: string
}

export default function Logo({ variant = 'badge', size = 40, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={LOGO_VIEWBOX}
      className={className}
      role="img"
      aria-label="Construcciones Cáceres"
    >
      {variant === 'badge' && <rect {...LOGO_BADGE_RECT} fill={LOGO_COLORS.navy} />}
      <path
        d={LOGO_HOUSE_PATH}
        fill="none"
        stroke={LOGO_COLORS.white}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={LOGO_GROUND_PATH}
        fill="none"
        stroke={LOGO_COLORS.amber}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <rect {...LOGO_WINDOW_RECT} fill={LOGO_COLORS.amber} />
    </svg>
  )
}
