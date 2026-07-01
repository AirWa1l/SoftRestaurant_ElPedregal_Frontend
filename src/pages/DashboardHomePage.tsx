import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { siteContent } from '../data/siteContent'
import { userService } from '../services/userService'
import { orderService } from '../services/orderService'
import type { CurrentUser } from '../types/profile'
import type { Order, OrderStatusFrontend } from '../types/order'

export function DashboardHomePage() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    let isMounted = true

    async function loadCurrentUser() {
      const response = await userService.getCurrentUser()

      if (!isMounted) return

      if (response.success && response.user) {
        setCurrentUser(response.user)
      }
    }

    void loadCurrentUser()

    // Subscribe to currentUser updates from userService (pubsub)
    const unsub = userService.onCurrentUserChange((u: CurrentUser | null) => {
      if (!isMounted) return
      setCurrentUser(u)
    })

    // Load orders from service (simulated via localStorage)
    async function loadOrders() {
      const response = await orderService.getAll()
      if (!isMounted) return
      if (response.success) {
        setOrders(response.orders)
      }
    }
    void loadOrders()

    return () => {
      isMounted = false
      if (typeof unsub === 'function') unsub()
    }
  }, [])

  // Derived metrics
  const pendingCount = useMemo(() => orders.filter((o) => o.status === 'Pendiente').length, [orders])
  const prepCount = useMemo(() => orders.filter((o) => o.status === 'Preparación').length, [orders])
  const activeOrdersCount = useMemo(() => orders.filter((o) => o.status !== 'Facturado').length, [orders])

  const recentOrders = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Facturado')
      .slice(0, 5)
  }, [orders])

  async function handleAdvanceStatus(orderNumber: string) {
    const order = orders.find((o) => o.number === orderNumber)
    if (!order) return

    const statusChain: OrderStatusFrontend[] = ['Pendiente', 'Preparación', 'Entregado', 'Facturado']
    const currentIdx = statusChain.indexOf(order.status)
    if (currentIdx === -1 || currentIdx >= statusChain.length - 1) return

    const nextStatus = statusChain[currentIdx + 1]
    await orderService.updateStatus(orderNumber, nextStatus)
    const response = await orderService.getAll()
    if (response.success) {
      setOrders(response.orders)
    }
  }

  async function handleRemoveOrder(orderNumber: string) {
    const targetOrder = orders.find((o) => o.number === orderNumber)
    if (targetOrder && targetOrder.items) {
      const cachedAdjustments = window.localStorage.getItem('pedregal_stock_adjustments')
      if (cachedAdjustments) {
        try {
          const adjustments = JSON.parse(cachedAdjustments)
          targetOrder.items.forEach((item: { productId: string; quantity: number }) => {
            if (adjustments[item.productId] !== undefined) {
              adjustments[item.productId] = Math.max(0, adjustments[item.productId] - item.quantity)
            }
          })
          window.localStorage.setItem('pedregal_stock_adjustments', JSON.stringify(adjustments))
        } catch {}
      }
    }

    await orderService.remove(orderNumber)
    const response = await orderService.getAll()
    if (response.success) {
      setOrders(response.orders)
    }
  }

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
        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-eyebrow">{siteContent.hero.eyebrow}</p>
            <h1 className="dashboard-title">{siteContent.hero.title}</h1>
          </div>

          <div className="dashboard-actions">
            <button
              type="button"
              className="dashboard-primary-button cursor-pointer"
              onClick={() => navigate('/orders/new')}
            >
              + Nuevo pedido
            </button>
          </div>
        </header>

        <section className="dashboard-kpis" aria-label="Resumen general">
          <article className="dashboard-card dashboard-kpi-card">
            <p className="dashboard-card__label">Ventas hoy</p>
            <p className="dashboard-card__value">
              {orders
                .filter((o) => o.status === 'Facturado' || o.status === 'Entregado')
                .reduce((acc, curr) => {
                  const val = parseFloat(curr.total.replace(/[^0-9]/g, '')) || 0
                  return acc + val
                }, 0)
                .toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }) || '$0'}
            </p>
            <p className="dashboard-card__note">Entregados y Facturados</p>
          </article>
          <article className="dashboard-card dashboard-kpi-card">
            <p className="dashboard-card__label">Pedidos activos</p>
            <p className="dashboard-card__value">{activeOrdersCount}</p>
            <p className="dashboard-card__note">{prepCount} en preparación</p>
          </article>
          <article className="dashboard-card dashboard-kpi-card">
            <p className="dashboard-card__label">Pedidos del día</p>
            <p className="dashboard-card__value">{orders.length}</p>
            <p className="dashboard-card__note">Total registrados</p>
          </article>
          <article className="dashboard-card dashboard-kpi-card">
            <p className="dashboard-card__label">Pendientes</p>
            <p className="dashboard-card__value">{pendingCount}</p>
            <p className="dashboard-card__note">Por preparar</p>
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-card dashboard-table-card flex flex-column">
            <div className="dashboard-card__header">
              <h2>Estado de pedidos</h2>
              <div className="dashboard-badges">
                <span className="dashboard-badge dashboard-badge--warn">Pendiente ({pendingCount})</span>
                <span className="dashboard-badge dashboard-badge--info">Preparación ({prepCount})</span>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="flex flex-column align-items-center justify-content-center py-6 text-center flex-1">
                <span className="text-5xl mb-3">📋</span>
                <h3 className="m-0 text-lg font-bold text-900">Sin pedidos activos</h3>
                <p className="text-sm text-600 max-w-20rem mt-1 mb-4">
                  No hay ningún pedido registrado en este momento. Comienza creando uno nuevo.
                </p>
                <Button
                  label="Crear pedido"
                  icon="pi pi-plus"
                  className="border-round-3xl font-bold"
                  onClick={() => navigate('/orders/new')}
                />
              </div>
            ) : (
              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Pedido</th>
                      <th>Mesa / Cliente</th>
                      <th>Productos</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.number}>
                        <td className="dashboard-table__strong">#{order.number}</td>
                        <td>{order.table}</td>
                        <td>{order.products}</td>
                        <td>{order.total}</td>
                        <td>
                          <span
                            className={`dashboard-status dashboard-status--${order.status.toLowerCase()} cursor-pointer`}
                            onClick={() => handleAdvanceStatus(order.number)}
                            title="Haz clic para avanzar el estado"
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <Button
                              icon="pi pi-pencil"
                              severity="info"
                              size="small"
                              text
                              onClick={() => navigate(`/orders/${order.number}/edit`)}
                              tooltip="Editar"
                            />
                            {order.status !== 'Facturado' && (
                              <Button
                                icon="pi pi-arrow-right"
                                severity="success"
                                size="small"
                                text
                                onClick={() => handleAdvanceStatus(order.number)}
                                tooltip="Avanzar estado"
                              />
                            )}
                            <Button
                              icon="pi pi-trash"
                              severity="danger"
                              size="small"
                              text
                              onClick={() => handleRemoveOrder(order.number)}
                              tooltip="Eliminar"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </article>

          <article className="dashboard-card dashboard-recent-card flex flex-column">
            <div className="dashboard-card__header">
              <h2>Pedidos recientes</h2>
            </div>

            {recentOrders.length === 0 ? (
              <div className="flex flex-column align-items-center justify-content-center py-6 text-center flex-1">
                <p className="text-sm text-500 m-0">No hay pedidos recientes activos.</p>
              </div>
            ) : (
              <div className="dashboard-recent-list">
                {recentOrders.map((order) => (
                  <div key={order.number} className={`dashboard-recent-item dashboard-recent-item--${order.status.toLowerCase()}`}>
                    <div className="dashboard-recent-item__top">
                      <strong>#{order.number}</strong>
                      <span className="dashboard-recent-item__time">{order.time || 'hace un momento'}</span>
                    </div>
                    <p className="dashboard-recent-item__products">{order.products}</p>
                    <div className="dashboard-recent-item__bottom">
                      <span className="dashboard-table__strong">{order.total}</span>
                      <span className={`dashboard-status dashboard-status--${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>
      </main>
    </div>
  )
}