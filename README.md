# Construcciones Cáceres — sitio web

Sitio web para Construcciones Cáceres: una página pública con la
presentación del emprendimiento y los servicios, más una herramienta
interna para generar presupuestos (cotizaciones) en PDF.

Hecho con React + TypeScript + Vite, Tailwind CSS y
[@react-pdf/renderer](https://react-pdf.org/) para generar los PDF
directamente en el navegador (no hay backend ni base de datos).

## Estructura

- **`/`** — Sitio público: hero con el eslogan, sección "Nosotros",
  servicios, y contacto (WhatsApp / correo).
- **`/cotizador-cc-10a2026`** — Cotizador interno. **Ruta no listada**:
  no aparece en ningún menú del sitio, solo es accesible con este link
  exacto. Ahí se completa un formulario (resumen del proyecto,
  partidas de trabajo, tabla de costos, términos y firma) y se genera
  un PDF de presupuesto con el mismo formato usado hasta ahora
  (ver `example-docx-backup/example.docx`, que sirvió de referencia).
  - El formulario guarda un borrador automáticamente en el navegador
    (`localStorage`), así que si se cierra la pestaña por error no se
    pierde el trabajo.
  - "Nuevo presupuesto" vacía el formulario para empezar otro.
  - Todos los datos del negocio (teléfono, correo, ciudad, nombre del
    dueño) están centralizados en `src/siteConfig.ts` — para
    actualizarlos, basta con editar ese archivo.

> La ruta del cotizador no tiene contraseña: es "seguridad por
> oscuridad" nada más (nadie la encuentra sin el link). Si en algún
> momento se necesita algo más firme, se puede agregar autenticación
> real más adelante.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build de producción

```bash
npm run build     # genera la carpeta dist/
npm run preview   # sirve dist/ localmente para revisar el build
```

`dist/` es un sitio 100% estático: se puede desplegar en Vercel,
Netlify, GitHub Pages o cualquier hosting de archivos estáticos.

## Personalización rápida

- **Textos, contacto, servicios**: `src/siteConfig.ts`
- **Colores de marca**: `src/index.css` (bloque `@theme`)
- **Logo**: `src/assets/logo.png`
- **Plantilla del PDF**: `src/pdf/CotizacionDocument.tsx`
