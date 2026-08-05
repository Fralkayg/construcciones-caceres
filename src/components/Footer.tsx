import logo from '../assets/logo.png'
import { siteConfig } from '../siteConfig'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy-dark text-brand-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-10 w-10 rounded-md object-cover" />
          <div>
            <p className="font-serif font-bold">{siteConfig.companyName}</p>
            <p className="text-sm text-brand-cream/70">{siteConfig.region}</p>
          </div>
        </div>

        <div className="text-sm text-brand-cream/80 flex flex-col gap-1 sm:items-end">
          <a href={`tel:${siteConfig.phoneWhatsapp}`} className="hover:text-brand-gold">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-gold">
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="border-t border-brand-cream/10 py-4 text-center text-xs text-brand-cream/50">
        © {year} {siteConfig.companyName}. Todos los derechos reservados.
      </div>
    </footer>
  )
}
