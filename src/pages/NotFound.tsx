import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream text-brand-navy px-4 text-center">
      <h1 className="font-serif text-4xl font-bold mb-3">Página no encontrada</h1>
      <p className="text-brand-ink/70 mb-6">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-navy-dark hover:bg-brand-gold-dark transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
