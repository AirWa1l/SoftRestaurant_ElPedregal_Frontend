import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { siteContent } from '../data/siteContent'
import { userService } from '../services/userService'
import type { CurrentUser } from '../types/profile'

export function DashboardHomePage() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

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
    const unsub = (userService as any).onCurrentUserChange?.((u: CurrentUser | null) => {
      if (!isMounted) return
      setCurrentUser(u)
    })

    return () => {
      isMounted = false
      if (typeof unsub === 'function') unsub()
    }
  }, [])
  
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
            <label className="dashboard-search">
              <span className="dashboard-search__icon">⌕</span>
              <input type="text" value="" placeholder="Buscar pedido o producto..." readOnly />
            </label>
            <button type="button" className="dashboard-primary-button">
              + Nuevo pedido
            </button>
          </div>
        </header>

        <section className="dashboard-kpis" aria-label="Resumen general">
          {siteContent.metrics.map((metric) => (
            <article key={metric.label} className="dashboard-card dashboard-kpi-card">
              <p className="dashboard-card__label">{metric.label}</p>
              <p className="dashboard-card__value">{metric.value}</p>
              <p className="dashboard-card__note">{metric.note}</p>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-card dashboard-table-card">
            <div className="dashboard-card__header">
              <h2>Estado de pedidos</h2>
              <div className="dashboard-badges">
                <span className="dashboard-badge dashboard-badge--warn">Pendiente (5)</span>
                <span className="dashboard-badge dashboard-badge--info">Preparación (3)</span>
              </div>
            </div>

            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Mesa</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {siteContent.orders.map((order) => (
                    <tr key={order.number}>
                      <td className="dashboard-table__strong">#{order.number}</td>
                      <td>{order.table}</td>
                      <td>{order.products}</td>
                      <td>{order.total}</td>
                      <td>
                        <span className={`dashboard-status dashboard-status--${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="dashboard-card dashboard-recent-card">
            <div className="dashboard-card__header">
              <h2>Pedidos recientes</h2>
            </div>

            <div className="dashboard-recent-list">
              {siteContent.recentOrders.map((order) => (
                <div key={order.number} className={`dashboard-recent-item dashboard-recent-item--${order.status.toLowerCase()}`}>
                  <div className="dashboard-recent-item__top">
                    <strong>#{order.number}</strong>
                    <span className="dashboard-recent-item__time">{order.time}</span>
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
          </article>
        </section>
      </main>
    </div>
  )
}