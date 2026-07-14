import { format } from 'date-fns'

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

function getApiBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/auth$/, '').replace(/\/$/, '')
}

function getDownloadBaseUrl() {
  return getApiBaseUrl().replace(/\/api$/, '')
}

function getAccessToken() {
  return typeof window !== 'undefined' ? window.localStorage.getItem('pedregal_access_token') : null
}

function formatDateForApi(date: Date | null) {
  return date ? format(date, 'yyyy-MM-dd') : ''
}

async function pollReportExportStatus(statusUrl: string, onComplete?: () => void) {
  const token = getAccessToken()
  const baseUrl = getApiBaseUrl().replace(/\/$/, '')
  const normalizedStatusPath = statusUrl.startsWith('http')
    ? statusUrl
    : `${baseUrl}${statusUrl.replace(/^\/api/, '')}`
  const start = Date.now()
  const timeoutMs = 30_000
  const intervalMs = 1000

  while (Date.now() - start < timeoutMs) {
    const response = await fetch(normalizedStatusPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: 'include',
    })

    const payload = await response.json().catch(() => null)
    if (!response.ok) {
      throw new Error(payload?.message || 'No fue posible consultar el estado del reporte')
    }

    if (payload?.status === 'completed' && payload?.result?.downloadUrl) {
      const absoluteUrl = new URL(payload.result.downloadUrl, `${getDownloadBaseUrl()}/`).toString()
      window.open(absoluteUrl, '_blank', 'noopener,noreferrer')
      onComplete?.()
      return
    }

    if (payload?.status === 'failed') {
      throw new Error(payload?.error || 'La generación del reporte falló')
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs))
  }

  throw new Error('El reporte aún se está procesando. Por favor inténtalo de nuevo en unos segundos.')
}

async function requestReportExport(format: 'pdf' | 'xlsx', fromDate: Date | null, toDate: Date | null, onComplete?: () => void) {
  const token = getAccessToken()
  const response = await fetch(`${getApiBaseUrl()}/reports/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    body: JSON.stringify({
      format,
      fromDate: formatDateForApi(fromDate),
      toDate: formatDateForApi(toDate),
      restaurantName: 'El Pedregal',
    }),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.message || 'No fue posible generar el reporte')
  }

  if (payload?.downloadUrl) {
    const absoluteUrl = new URL(payload.downloadUrl, `${getDownloadBaseUrl()}/`).toString()
    window.open(absoluteUrl, '_blank', 'noopener,noreferrer')
    onComplete?.()
    return
  }

  if (payload?.statusUrl) {
    await pollReportExportStatus(payload.statusUrl, onComplete)
    return
  }

  if (payload?.status === 'queued' || payload?.status === 'processing') {
    await pollReportExportStatus(`/api/reports/export/${payload.jobId}`, onComplete)
    return
  }

  onComplete?.()
}

export function exportToExcel(
  _data: ExportReportData,
  fromDate: Date | null,
  onComplete?: () => void
) {
  void requestReportExport('xlsx', fromDate, fromDate, onComplete)
}

export function exportToPDF(
  _data: ExportReportData,
  fromDate: Date | null,
  toDate: Date | null,
  _selectedCategoryName: string,
  onComplete?: () => void
) {
  void requestReportExport('pdf', fromDate, toDate, onComplete)
}
