import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { categoryService } from '../services/categoryService'
import { userService } from '../services/userService'
import type { Category } from '../types/category'
import type { CurrentUser } from '../types/profile'

type SalesDayPoint = {
  day: string
  value: number
  highlight?: boolean
}

type PaymentMethodPoint = {
  label: string
  percent: number
  color: string
}

type SalesSummaryPoint = {
  label: string
  value: string
  note: string
}

type SalesReportMock = {
  summary: SalesSummaryPoint[]
  salesByDay: SalesDayPoint[]
  salesByProduct: ProductSalesPoint[]
  paymentMethods: PaymentMethodPoint[]
}

type ProductSalesPoint = {
  label: string
  units: number
  amount: string
  percent: number
  color: string
}

const ALL_CATEGORIES_OPTION = { id: 'all', name: 'Todas las categorías de productos' }

function hashString(value: string): number {
  return Array.from(value).reduce((accumulator, character) => accumulator + character.charCodeAt(0), 0)
}

function getCategoryProducts(categoryName: string) {
  const catalogByName: Record<string, string[]> = {
    entradas: ['Patacones', 'Arepa con queso', 'Empanadas', 'Consomé'],
    'platos fuertes': ['Bandeja Paisa', 'Chuleta Valluna', 'Trucha al Ajillo', 'Sancocho', 'Lomo al Trapo', 'Hamburguesa'],
    bebidas: ['Limonada natural', 'Jugo de maracuyá', 'Café', 'Agua', 'Gaseosa'],
    postres: ['Brownie', 'Flan', 'Tres leches', 'Helado de vainilla'],
  }

  const key = categoryName.trim().toLowerCase()
  return catalogByName[key] ?? ['Bandeja Paisa', 'Chuleta Valluna', 'Trucha al Ajillo', 'Sancocho', 'Lomo al Trapo', 'Hamburguesa']
}

function getCategoryTopProduct(categoryName: string, seedDate: Date) {
  const products = getCategoryProducts(categoryName)
  const monthSeed = seedDate.getFullYear() * 12 + seedDate.getMonth()
  const categorySeed = hashString(categoryName)

  return products[(monthSeed + categorySeed) % products.length]
}

function buildMockSalesByDay(seedDate: Date, categoryName: string): SalesDayPoint[] {
  const monthSeed = seedDate.getFullYear() * 12 + seedDate.getMonth()
  const categorySeed = hashString(categoryName)

  return Array.from({ length: 14 }, (_, index) => {
    const day = index + 1
    const baseValue = 44 + ((monthSeed + day * 7 + categorySeed) % 44)

    return {
      day: String(day),
      value: baseValue,
      highlight: day === 3 || day === 10,
    }
  })
}

function buildMockPaymentMethods(seedDate: Date, categoryName: string): PaymentMethodPoint[] {
  const monthSeed = seedDate.getFullYear() * 12 + seedDate.getMonth()
  const categorySeed = hashString(categoryName)
  const baseValues = [48, 28, 16, 8].map((value, index) => value + ((categorySeed + index) % 3) - 1)
  const offsets = [0, 1, 2, 3].map((index) => (monthSeed + index * 5) % 4)
  const labels = ['Efectivo', 'Tarjeta débito', 'Transferencia / QR', 'Tarjeta crédito']
  const colors = ['#21466d', '#4e8fe0', '#2f8a51', '#f5a623']

  return labels.map((label, index) => ({
    label,
    percent: Math.max(5, baseValues[index] + offsets[index] - 1),
    color: colors[index],
  }))
}

function buildMockSalesByProduct(seedDate: Date, categoryName: string): ProductSalesPoint[] {
  const monthSeed = seedDate.getFullYear() * 12 + seedDate.getMonth()
  const categorySeed = hashString(categoryName)
  const labels = getCategoryProducts(categoryName)
  const colors = ['#21466d', '#4e8fe0', '#2f8a51', '#f5a623', '#6f42c1', '#d9534f']

  return labels.map((label, index) => {
    const units = 120 + ((monthSeed + index * 13 + categorySeed) % 80)
    const amount = (units * (18000 + index * 1250)).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    })

    return {
      label,
      units,
      amount,
      percent: Math.min(100, 40 + index * 9 + ((monthSeed + index) % 8)),
      color: colors[index],
    }
  })
}

function buildMockSalesSummary(seedDate: Date, categoryName: string): SalesSummaryPoint[] {
  const monthSeed = seedDate.getFullYear() * 12 + seedDate.getMonth()
  const categorySeed = hashString(categoryName)
  const salesTotal = 18000000 + ((monthSeed + categorySeed) % 9) * 250000
  const billedOrders = 780 + ((monthSeed + categorySeed) % 7) * 12
  const averageTicket = 22000 + ((monthSeed + categorySeed) % 5) * 180
  const topProduct = getCategoryTopProduct(categoryName, seedDate)
  const topProductUnits = 160 + ((monthSeed + categorySeed) % 6) * 4
  const growth = 6 + ((monthSeed + categorySeed) % 4)

  return [
    {
      label: 'Total ventas',
      value: salesTotal.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }),
      note: `↑ ${growth}% vs mes anterior`,
    },
    {
      label: 'Pedidos facturados',
      value: billedOrders.toString(),
      note: `↑ ${28 + (monthSeed % 5) * 3} pedidos más`,
    },
    {
      label: 'Ticket promedio',
      value: averageTicket.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      }),
      note: `↑ ${2 + (monthSeed % 3)}%`,
    },
    {
      label: 'Producto top',
      value: topProduct,
      note: `${topProductUnits} unidades`,
    },
  ]
}

function buildMockSalesReport(seedDate: Date, categoryName: string): SalesReportMock {
  return {
    summary: buildMockSalesSummary(seedDate, categoryName),
    salesByDay: buildMockSalesByDay(seedDate, categoryName),
    salesByProduct: buildMockSalesByProduct(seedDate, categoryName),
    paymentMethods: buildMockPaymentMethods(seedDate, categoryName),
  }
}

export function SalesPage() {
  const navigate = useNavigate()
  const today = new Date()
  const initialFromDate = new Date(today.getFullYear(), today.getMonth(), 1)
  const initialToDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const [fromDate, setFromDate] = useState<Date | null>(initialFromDate)
  const [toDate, setToDate] = useState<Date | null>(initialToDate)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(ALL_CATEGORIES_OPTION.id)
  const [categories, setCategories] = useState<Category[]>([])
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [salesReport, setSalesReport] = useState<SalesReportMock | null>(null)
  const [isLoadingReport, setIsLoadingReport] = useState(true)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  function formatMonthLabel(date: Date) {
    const rawLabel = new Intl.DateTimeFormat('es-CO', {
      month: 'long',
      year: 'numeric',
    }).format(date)

    return rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1)
  }

  const chartMonthLabel = formatMonthLabel(fromDate ?? today)
  const selectedCategoryName =
    selectedCategoryId === ALL_CATEGORIES_OPTION.id
      ? ALL_CATEGORIES_OPTION.name
      : categories.find((category) => category.id === selectedCategoryId)?.name ?? ALL_CATEGORIES_OPTION.name

  useEffect(() => {
    let isMounted = true

    async function loadCategories() {
      const response = await categoryService.getAll()

      if (!isMounted) return

      if (response.success) {
        setCategories(response.categories)
      }
    }

    void loadCategories()

    async function loadCurrentUser() {
      const response = await userService.getCurrentUser()

      if (!isMounted) return

      if (response.success && response.user) {
        setCurrentUser(response.user)
      }

      setIsLoadingUser(false)
    }

    void loadCurrentUser()

    const unsub = userService.onCurrentUserChange((u: CurrentUser | null) => {
      if (!isMounted) return
      setCurrentUser(u)
    })

    return () => {
      isMounted = false
      if (typeof unsub === 'function') unsub()
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadSalesReport() {
      setIsLoadingReport(true)

      await new Promise((resolve) => window.setTimeout(resolve, 350))

      if (!isMounted) return

      setSalesReport(buildMockSalesReport(fromDate ?? today, selectedCategoryName))
      setIsLoadingReport(false)
    }

    void loadSalesReport()

    return () => {
      isMounted = false
    }
  }, [fromDate, selectedCategoryName])

  const salesReportData = salesReport ?? buildMockSalesReport(fromDate ?? today, selectedCategoryName)
  const salesSummary = salesReportData.summary
  const salesByDay = salesReportData.salesByDay
  const salesByProduct = salesReportData.salesByProduct
  const paymentMethods = salesReportData.paymentMethods
  const isLoading = isLoadingUser || isLoadingReport

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <DashboardSidebarHeader />
        <DashboardSidebarFooter
          currentUser={currentUser}
          onGoToEditProfile={() => navigate('/edit-profile')}
        />
      </aside>

      <main className="dashboard-main">
        <header className="sales-topbar sales-toolbar">
          <div className="sales-toolbar__title-wrap">
            <h1 className="sales-title">Reportes de ventas</h1>
          </div>

          <div className="sales-actions">
            <Calendar
              value={fromDate}
              onChange={(e) => setFromDate(e.value as Date | null)}
              dateFormat="dd/mm/yy"
              showIcon
              placeholder="Desde"
              className="sales-calendar"
            />

            <Calendar
              value={toDate}
              onChange={(e) => setToDate(e.value as Date | null)}
              dateFormat="dd/mm/yy"
              showIcon
              placeholder="Hasta"
              className="sales-calendar"
            />

            <div className="sales-category-filter">
              <label className="sales-filter-label" htmlFor="sales-category">
                Categoría de productos
              </label>
              <select
                id="sales-category"
                className="sales-filter-select"
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value)
                }}
              >
                {[ALL_CATEGORIES_OPTION, ...categories].map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <Button
              label="Exportar"
              icon="pi pi-download"
              severity="warning"
              className="sales-export-button"
            />
          </div>
        </header>

        {isLoading ? (
          <section className="sales-loading-state" aria-live="polite" aria-busy="true">
            <ProgressSpinner style={{ width: '56px', height: '56px' }} strokeWidth="4" />
            <div className="sales-loading-copy">
              <p className="sales-loading-title">Cargando reportes de ventas</p>
              <p className="sales-loading-text">Consultando datos del período seleccionado...</p>
            </div>
          </section>
        ) : (
          <>
            <section className="sales-kpis" aria-label="Resumen de ventas">
              {salesSummary.map((item) => (
                <article key={item.label} className="sales-card sales-kpi-card">
                  <p className="sales-card__label">{item.label}</p>
                  <p className="sales-card__value">{item.value}</p>
                  <p className="sales-card__note">{item.note}</p>
                </article>
              ))}
            </section>

            <section className="sales-grid" aria-label="Detalle de ventas">
              <article className="sales-card sales-chart-card">
                <div className="sales-card__header">
                  <h2>Ventas por día — {chartMonthLabel}</h2>
                </div>

                <div className="sales-bar-chart" role="img" aria-label={`Ventas por día — ${chartMonthLabel}`}>
                  {salesByDay.map((item) => (
                    <div key={item.day} className="sales-bar-column">
                      <div className="sales-bar-track">
                        <div
                          className={`sales-bar${item.highlight ? ' sales-bar--highlight' : ''}`}
                          style={{ height: `${item.value}%` }}
                        />
                      </div>
                      <span className="sales-bar-label">{item.day}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="sales-card sales-payment-card">
                <div className="sales-card__header">
                  <h2>Ventas por medio de pago — {chartMonthLabel}</h2>
                </div>

                <div className="sales-payment-list" aria-label="Distribución por medio de pago">
                  {paymentMethods.map((item) => (
                    <div key={item.label} className="sales-payment-item">
                      <div className="sales-payment-row">
                        <span className="sales-payment-label">{item.label}</span>
                        <span className="sales-payment-percent">{item.percent}%</span>
                      </div>

                      <div className="sales-payment-track" aria-hidden="true">
                        <div
                          className="sales-payment-fill"
                          style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="sales-grid sales-grid--products" aria-label="Ventas por producto">
              <article className="sales-card sales-product-card">
                <div className="sales-card__header">
                  <h2>Ventas por producto — {chartMonthLabel}</h2>
                </div>

                <div className="sales-product-list" aria-label="Distribución por producto">
                  {salesByProduct.map((item) => (
                    <div key={item.label} className="sales-product-item">
                      <div className="sales-product-row">
                        <div className="sales-product-meta">
                          <span className="sales-product-label">{item.label}</span>
                          <span className="sales-product-units">{item.units} unidades</span>
                        </div>
                        <div className="sales-product-value">
                          <span className="sales-product-amount">{item.amount}</span>
                          <span className="sales-product-percent">{item.percent}%</span>
                        </div>
                      </div>

                      <div className="sales-product-track" aria-hidden="true">
                        <div
                          className="sales-product-fill"
                          style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </>
        )}
      </main>
    </div>
  )
}