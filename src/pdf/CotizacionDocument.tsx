import { Document, Page, Text, View, Svg, Path, Rect, StyleSheet } from '@react-pdf/renderer'
import type { Cotizacion } from '../types'
import { formatCLP, formatFechaLarga } from '../lib/format'
import { siteConfig } from '../siteConfig'
import {
  LOGO_VIEWBOX,
  LOGO_BADGE_RECT,
  LOGO_HOUSE_PATH,
  LOGO_GROUND_PATH,
  LOGO_WINDOW_RECT,
  LOGO_COLORS,
} from '../assets/logoShape'

function LogoSvg() {
  return (
    <Svg width={40} height={40} viewBox={LOGO_VIEWBOX}>
      <Rect
        x={LOGO_BADGE_RECT.x}
        y={LOGO_BADGE_RECT.y}
        width={LOGO_BADGE_RECT.width}
        height={LOGO_BADGE_RECT.height}
        rx={LOGO_BADGE_RECT.rx}
        fill={LOGO_COLORS.navy}
      />
      <Path
        d={LOGO_HOUSE_PATH}
        fill="none"
        stroke={LOGO_COLORS.white}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d={LOGO_GROUND_PATH} fill="none" stroke={LOGO_COLORS.amber} strokeWidth={5} strokeLinecap="round" />
      <Rect
        x={LOGO_WINDOW_RECT.x}
        y={LOGO_WINDOW_RECT.y}
        width={LOGO_WINDOW_RECT.width}
        height={LOGO_WINDOW_RECT.height}
        rx={LOGO_WINDOW_RECT.rx}
        fill={LOGO_COLORS.amber}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 10.5,
    fontFamily: 'Helvetica',
    color: '#1a1f29',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#142236',
    paddingBottom: 12,
  },
  logo: {
    marginRight: 12,
  },
  headerCompany: {
    fontSize: 14,
    fontWeight: 700,
    color: '#142236',
  },
  headerContact: {
    fontSize: 8.5,
    color: '#5b6472',
    marginTop: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#142236',
    marginBottom: 4,
  },
  meta: {
    fontSize: 9,
    color: '#5b6472',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11.5,
    fontWeight: 700,
    color: '#142236',
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  partidaTitulo: {
    fontSize: 10.5,
    fontWeight: 700,
    marginTop: 8,
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
  nota: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#5b6472',
    marginTop: 2,
    marginBottom: 4,
  },
  table: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#e3e6eb',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e6eb',
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableHeaderCell: {
    fontSize: 9.5,
    fontWeight: 700,
    color: '#fff',
    backgroundColor: '#142236',
    padding: 6,
  },
  tableCell: {
    fontSize: 9.5,
    padding: 6,
  },
  colItem: { width: '12%' },
  colDesc: { width: '63%' },
  colValor: { width: '25%', textAlign: 'right' },
  totalRow: {
    flexDirection: 'row',
    backgroundColor: '#fbead0',
  },
  totalLabel: {
    width: '75%',
    padding: 6,
    fontSize: 10,
    fontWeight: 700,
    textAlign: 'right',
  },
  totalValue: {
    width: '25%',
    padding: 6,
    fontSize: 10,
    fontWeight: 700,
    textAlign: 'right',
  },
  termRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  termLabel: {
    width: 140,
    fontSize: 10,
    fontWeight: 700,
  },
  termValue: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
  signatureBlock: {
    marginTop: 36,
    alignItems: 'flex-end',
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: '#e3e6eb',
    paddingTop: 6,
    fontSize: 8,
    color: '#8a92a1',
    textAlign: 'center',
  },
})

export default function CotizacionDocument({ data }: { data: Cotizacion }) {
  const total = data.costos.reduce((sum, c) => sum + (Number(c.valor) || 0), 0)

  return (
    <Document
      title={`Presupuesto ${data.tituloProyecto || ''}`.trim()}
      author={siteConfig.companyName}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.logo}>
            <LogoSvg />
          </View>
          <View>
            <Text style={styles.headerCompany}>{siteConfig.companyName}</Text>
            <Text style={styles.headerContact}>
              {siteConfig.phone} · {siteConfig.email} · {siteConfig.region}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>
          Presupuesto{data.tituloProyecto ? ` — ${data.tituloProyecto}` : ''}
        </Text>
        <Text style={styles.meta}>
          {data.cliente ? `Cliente: ${data.cliente}   ·   ` : ''}
          Fecha: {formatFechaLarga(data.fecha)}
        </Text>

        {data.resumen ? (
          <>
            <Text style={styles.sectionTitle}>1. Resumen del Proyecto</Text>
            <Text style={styles.paragraph}>{data.resumen}</Text>
          </>
        ) : null}

        {data.partidas.some((p) => p.titulo || p.items.some((i) => i)) ? (
          <>
            <Text style={styles.sectionTitle}>2. Detalle de las Partidas de Trabajo</Text>
            {data.partidas.map((p, idx) => {
              const items = p.items.filter((i) => i.trim())
              if (!p.titulo && items.length === 0) return null
              return (
                <View key={p.id} wrap={false}>
                  <Text style={styles.partidaTitulo}>
                    Partida {idx + 1}
                    {p.titulo ? `: ${p.titulo}` : ''}
                  </Text>
                  {items.map((item, i) => (
                    <View style={styles.bulletRow} key={i}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{item}</Text>
                    </View>
                  ))}
                  {p.nota ? <Text style={styles.nota}>Nota: {p.nota}</Text> : null}
                </View>
              )
            })}
          </>
        ) : null}

        {data.costos.some((c) => c.descripcion || c.valor) ? (
          <>
            <Text style={styles.sectionTitle}>3. Costo del Servicio (Mano de Obra)</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeaderCell, styles.colItem]}>Ítem</Text>
                <Text style={[styles.tableHeaderCell, styles.colDesc]}>
                  Descripción de la Partida
                </Text>
                <Text style={[styles.tableHeaderCell, styles.colValor]}>Valor</Text>
              </View>
              {data.costos.map((c, idx) => (
                <View
                  style={idx === data.costos.length - 1 ? styles.tableRowLast : styles.tableRow}
                  key={c.id}
                >
                  <Text style={[styles.tableCell, styles.colItem]}>{c.numero}</Text>
                  <Text style={[styles.tableCell, styles.colDesc]}>{c.descripcion}</Text>
                  <Text style={[styles.tableCell, styles.colValor]}>{formatCLP(c.valor)}</Text>
                </View>
              ))}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TOTAL — VALOR NETO MANO DE OBRA</Text>
                <Text style={styles.totalValue}>{formatCLP(total)}</Text>
              </View>
            </View>
          </>
        ) : null}

        <Text style={styles.sectionTitle}>4. Términos y Condiciones</Text>
        {data.plazoEjecucion ? (
          <View style={styles.termRow}>
            <Text style={styles.termLabel}>Plazo de Ejecución:</Text>
            <Text style={styles.termValue}>{data.plazoEjecucion}</Text>
          </View>
        ) : null}
        <View style={styles.termRow}>
          <Text style={styles.termLabel}>Suministro de Materiales:</Text>
          <Text style={styles.termValue}>
            {data.incluyeMateriales
              ? 'El presente presupuesto incluye materiales.'
              : 'El presente presupuesto corresponde exclusivamente a Mano de Obra, no incluye materiales.'}
          </Text>
        </View>
        {data.condicionesPago ? (
          <View style={styles.termRow}>
            <Text style={styles.termLabel}>Condiciones de Pago:</Text>
            <Text style={styles.termValue}>{data.condicionesPago}</Text>
          </View>
        ) : null}
        {data.notasAdicionales ? (
          <Text style={[styles.paragraph, { marginTop: 4 }]}>{data.notasAdicionales}</Text>
        ) : null}

        <View style={styles.signatureBlock} wrap={false}>
          <Text style={styles.signatureText}>{data.firmaNombre}.</Text>
          <Text style={styles.signatureText}>{data.firmaEmpresa}.</Text>
          <Text style={styles.signatureText}>{formatFechaLarga(data.fecha)}.</Text>
        </View>

        <Text style={styles.footer} fixed>
          {siteConfig.companyName} · {siteConfig.phone} · {siteConfig.email}
        </Text>
      </Page>
    </Document>
  )
}
