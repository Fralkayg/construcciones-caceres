export interface Partida {
  id: string
  titulo: string
  items: string[]
  nota: string
}

export interface CostoItem {
  id: string
  numero: string
  descripcion: string
  valor: number
}

export interface Cotizacion {
  tituloProyecto: string
  cliente: string
  fecha: string // yyyy-mm-dd
  resumen: string
  partidas: Partida[]
  costos: CostoItem[]
  plazoEjecucion: string
  incluyeMateriales: boolean
  condicionesPago: string
  notasAdicionales: string
  firmaNombre: string
  firmaEmpresa: string
}
