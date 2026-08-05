import { useState } from 'react'
import logo from '../assets/logo.png'
import { siteConfig } from '../siteConfig'

const links = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur border-b border-brand-cream-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-serif">
            <img src={logo} alt="" className="h-10 w-10 rounded-md object-cover" />
            <span className="text-lg font-bold text-brand-navy leading-tight">
              {siteConfig.companyName}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-brand-navy hover:text-brand-gold-dark transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy-dark hover:bg-brand-gold-dark transition-colors"
            >
              Cotice con nosotros
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-brand-navy"
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden flex flex-col gap-1 pb-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-cream-dark"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="rounded-md bg-brand-gold px-3 py-2 text-sm font-semibold text-brand-navy-dark"
            >
              Cotice con nosotros
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
