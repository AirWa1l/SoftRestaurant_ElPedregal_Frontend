import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export type SalesSummaryPoint = {
  label: string
  value: string
  note: string
}

export type SalesDayPoint = {
  day: string
  value: number
}

export type PaymentMethodPoint = {
  label: string
  percent: number
  color: string
}

export type ProductSalesPoint = {
  label: string
  units: number
  amount: string
  percent: number
  color: string
}

export type ExportReportData = {
  salesSummary: SalesSummaryPoint[]
  salesByDay: SalesDayPoint[]
  paymentMethods: PaymentMethodPoint[]
  salesByProduct: ProductSalesPoint[]
}

export function exportToExcel(
  data: ExportReportData,
  fromDate: Date | null,
  onComplete?: () => void
) {
  const wb = XLSX.utils.book_new()

  const summaryData = data.salesSummary.map((item) => ({
    Indicador: item.label,
    Valor: item.value,
    Nota: item.note,
  }))
  const summarySheet = XLSX.utils.json_to_sheet(summaryData)
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Resumen')

  const daysData = data.salesByDay.map((item) => ({
    Día: item.day,
    Ventas: item.value,
  }))
  const daysSheet = XLSX.utils.json_to_sheet(daysData)
  XLSX.utils.book_append_sheet(wb, daysSheet, 'Ventas por día')

  const paymentData = data.paymentMethods.map((item) => ({
    'Medio de pago': item.label,
    Porcentaje: `${item.percent}%`,
  }))
  const paymentSheet = XLSX.utils.json_to_sheet(paymentData)
  XLSX.utils.book_append_sheet(wb, paymentSheet, 'Medios de pago')

  const productData = data.salesByProduct.map((item) => ({
    Producto: item.label,
    Unidades: item.units,
    Monto: item.amount,
    Porcentaje: `${item.percent}%`,
  }))
  const productSheet = XLSX.utils.json_to_sheet(productData)
  XLSX.utils.book_append_sheet(wb, productSheet, 'Productos')

  XLSX.writeFile(wb, `reporte_ventas_${fromDate?.toISOString().slice(0, 7)}.xlsx`)
  onComplete?.()
}

export function exportToPDF(
  data: ExportReportData,
  fromDate: Date | null,
  toDate: Date | null,
  selectedCategoryName: string,
  onComplete?: () => void
) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  doc.setFontSize(16)
  doc.text('Reporte de Ventas', pageWidth / 2, 20, { align: 'center' })
  doc.setFontSize(10)
  doc.text(`Período: ${fromDate?.toLocaleDateString('es-CO')} - ${toDate?.toLocaleDateString('es-CO')}`, pageWidth / 2, 28, { align: 'center' })
  doc.text(`Categoría: ${selectedCategoryName}`, pageWidth / 2, 34, { align: 'center' })

  doc.setFontSize(12)
  doc.text('Resumen', 14, 46)
  const summaryRows = data.salesSummary.map((item) => [item.label, item.value, item.note])
  autoTable(doc, {
    startY: 50,
    head: [['Indicador', 'Valor', 'Nota']],
    body: summaryRows,
    theme: 'grid',
  })

  doc.addPage()
  doc.setFontSize(12)
  doc.text('Ventas por día', 14, 20)
  const daysRows = data.salesByDay.map((item) => [item.day, String(item.value)])
  autoTable(doc, {
    startY: 26,
    head: [['Día', 'Ventas']],
    body: daysRows,
    theme: 'grid',
  })

  const daysTableFinalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY
  doc.setFontSize(12)
  doc.text('Ventas por medio de pago', 14, daysTableFinalY + 16)
  const paymentRows = data.paymentMethods.map((item) => [item.label, `${item.percent}%`])
  autoTable(doc, {
    startY: daysTableFinalY + 20,
    head: [['Medio de pago', 'Porcentaje']],
    body: paymentRows,
    theme: 'grid',
  })

  doc.addPage()
  doc.setFontSize(12)
  doc.text('Ventas por producto', 14, 20)
  const productRows = data.salesByProduct.map((item) => [item.label, String(item.units), item.amount, `${item.percent}%`])
  autoTable(doc, {
    startY: 26,
    head: [['Producto', 'Unidades', 'Monto', 'Porcentaje']],
    body: productRows,
    theme: 'grid',
  })

  doc.save(`reporte_ventas_${fromDate?.toISOString().slice(0, 7)}.pdf`)
  onComplete?.()
}
