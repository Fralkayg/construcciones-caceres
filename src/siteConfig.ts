// Central place for business info shown across the public site and quotes.
// Edit here if any of this changes — nothing else in the app hardcodes it.

export const siteConfig = {
  companyName: 'Construcciones Cáceres',
  ownerName: 'Luis Cáceres Bigueras',
  tagline:
    'Emprendimiento familiar ligado por más de 10 años al área de la construcción.',
  taglineSecondary: 'Trabajamos pensando en que es para nuestro hogar.',
  about:
    'Bienvenid@s a Construcciones Cáceres, emprendimiento familiar nacido con más de 10 años de experiencia en el área de la construcción. Se realizan trabajos de ampliación 1° y 2° piso, revestimiento de fachadas, cambios de techumbre, cobertizos, gasfitería, electricidad entre otros, todo en construcciones menores para tu hogar.',
  phone: '+56 9 4710 7968',
  phoneWhatsapp: '56947107968', // digits only, for wa.me links
  email: 'l.eugenioo@gmail.com',
  city: 'San Bernardo',
  region: 'San Bernardo y alrededores, Región Metropolitana',
  services: [
    {
      title: 'Ampliaciones 1° y 2° piso',
      description:
        'Ampliamos tu hogar con obras de primer y segundo piso, de principio a fin.',
    },
    {
      title: 'Revestimiento de fachadas',
      description:
        'Renovamos y protegemos el exterior de tu vivienda con terminaciones de calidad.',
    },
    {
      title: 'Cambios de techumbre',
      description:
        'Reparación y reemplazo de techumbres, incluyendo zinc, tejas y estructura.',
    },
    {
      title: 'Cobertizos',
      description:
        'Construcción de cobertizos y quinchos a medida para tu patio o estacionamiento.',
    },
    {
      title: 'Gasfitería',
      description:
        'Instalaciones y reparaciones de agua potable y alcantarillado.',
    },
    {
      title: 'Electricidad',
      description:
        'Instalaciones eléctricas domiciliarias, seguras y normalizadas.',
    },
  ],
  // Unlisted route for the internal quote generator. Not linked from the
  // public nav — only reachable by whoever has this exact URL.
  cotizadorPath: '/cotizador-cc-10a2026',
}
