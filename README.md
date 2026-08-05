# Construcciones Cáceres — sitio web

Sitio web para Construcciones Cáceres: una página pública con la
presentación del emprendimiento y los servicios, más una herramienta
interna para generar presupuestos (cotizaciones) en PDF.

Hecho con React + TypeScript + Vite, Tailwind CSS + MUI (Material UI)
para los componentes, y [@react-pdf/renderer](https://react-pdf.org/)
para generar los PDF directamente en el navegador (no hay backend ni
base de datos).

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

## Despliegue en GitHub Pages

`.github/workflows/deploy.yml` construye y publica el sitio en GitHub
Pages automáticamente en cada push a `main`. Dos detalles necesarios
porque GitHub Pages sirve este repo desde `/construcciones-caceres/`
(no desde la raíz del dominio):

- El build de ese workflow pasa `BASE_PATH=/construcciones-caceres/`,
  que `vite.config.ts` usa como `base` (assets) y que `main.tsx` reusa
  como `basename` del router (rutas). Sin esto, ni los archivos ni las
  rutas cargarían bien bajo el subpath. Localmente y en otros hosts
  (Vercel/Netlify, que sirven desde la raíz) no hace falta setearlo.
- El workflow copia `index.html` a `404.html` en `dist/` para que las
  rutas del lado del cliente (incluida la URL no listada del
  cotizador) funcionen al abrirlas directamente, ya que GitHub Pages
  no tiene servidor que redirija todo a `index.html`.

**Configuración única en el repo**: en GitHub, ir a *Settings → Pages*
y en "Build and deployment" elegir **Source: GitHub Actions** (en vez
de "Deploy from a branch"). Sin este paso el workflow corre pero el
sitio no queda publicado.

## Personalización rápida

- **Textos, contacto, servicios**: `src/siteConfig.ts`
- **Colores de marca** ("navy & amber"): `src/theme.ts` (tema de MUI) y
  `src/index.css` (mismos tokens para Tailwind, bloque `@theme`) —
  mantener ambos en sync si se cambia la paleta.
- **Logo**: es un ícono vectorial (no una imagen), definido una sola
  vez en `src/assets/logoShape.ts` y usado tanto por
  `src/components/Logo.tsx` (web) como por `src/pdf/CotizacionDocument.tsx`
  (PDF), así que ambos quedan siempre iguales. `public/favicon.svg` es
  una copia estática del mismo dibujo para el ícono de la pestaña.
- **Plantilla del PDF**: `src/pdf/CotizacionDocument.tsx`
