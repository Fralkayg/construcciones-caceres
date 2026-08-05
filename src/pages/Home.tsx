import logo from '../assets/logo.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { siteConfig } from '../siteConfig'

const whatsappHref = `https://wa.me/${siteConfig.phoneWhatsapp}?text=${encodeURIComponent(
  `Hola, quisiera cotizar un trabajo con ${siteConfig.companyName}.`,
)}`

export default function Home() {
  return (
    <div id="top" className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy text-brand-cream">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="uppercase tracking-widest text-brand-gold text-sm font-semibold mb-4">
                Más de 10 años de experiencia
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-6">
                {siteConfig.tagline}
              </h1>
              <p className="text-lg text-brand-cream/85 mb-8">
                {siteConfig.taglineSecondary}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-navy-dark hover:bg-brand-gold-dark transition-colors"
                >
                  Cotice con nosotros
                </a>
                <a
                  href="#servicios"
                  className="rounded-full border border-brand-cream/40 px-6 py-3 font-semibold text-brand-cream hover:bg-brand-cream/10 transition-colors"
                >
                  Ver servicios
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src={logo}
                alt={siteConfig.companyName}
                className="w-64 sm:w-80 rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Nosotros */}
        <section id="nosotros" className="mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-navy mb-6">Nosotros</h2>
          <p className="text-lg leading-relaxed text-brand-ink/80">{siteConfig.about}</p>
        </section>

        {/* Servicios */}
        <section id="servicios" className="bg-brand-cream-dark/60 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-serif text-3xl font-bold text-brand-navy mb-12 text-center">
              Nuestros Servicios
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteConfig.services.map((s) => (
                <div
                  key={s.title}
                  className="rounded-xl bg-white p-6 shadow-sm border border-brand-navy/5"
                >
                  <h3 className="font-serif text-xl font-semibold text-brand-navy mb-2">
                    {s.title}
                  </h3>
                  <p className="text-brand-ink/70 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-navy mb-4">Cotice con nosotros</h2>
          <p className="text-brand-ink/70 mb-10 max-w-xl mx-auto">
            Cuéntanos qué necesitas y te responderemos a la brevedad. Trabajamos en{' '}
            {siteConfig.region}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-navy-dark hover:bg-brand-gold-dark transition-colors"
            >
              Escribir por WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-full border border-brand-navy/20 px-6 py-3 font-semibold text-brand-navy hover:bg-brand-navy/5 transition-colors"
            >
              Enviar un correo
            </a>
          </div>
          <div className="mt-8 text-sm text-brand-ink/60">
            <p>{siteConfig.phone}</p>
            <p>{siteConfig.email}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
