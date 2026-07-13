import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Skeleton } from 'primereact/skeleton'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { CustomerNavbar } from '../components/layout/CustomerNavbar'
import { userService } from '../services/userService'
import { orderService } from '../services/orderService'
import { CancelOrderDialog } from '../components/orders/CancelOrderDialog'
import { ClientOrderTracking } from '../components/orders/ClientOrderTracking'
import { AdminOrderBoard } from '../components/orders/AdminOrderBoard'
import type { CurrentUser } from '../types/profile'
import type { Order, OrderStatusFrontend } from '../types/order'
import { canManageOrders } from '../utils/roles'

export function OrdersPage() {
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [cancelDialogVisible, setCancelDialogVisible] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  const loadOrders = useCallback(async () => {
    const response = await orderService.getAll()
    if (response.success) {
      setOrders(response.orders)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function loadCurrentUser() {
      const response = await userService.getCurrentUser()
      if (!isMounted) return
      if (response.success && response.user) {
        setCurrentUser(response.user)
      }
    }

    async function init() {
      setIsLoading(true)
      await Promise.all([loadCurrentUser(), loadOrders()])
      if (isMounted) setIsLoading(false)
    }

    void init()

    return () => {
      isMounted = false
    }
  }, [loadOrders])

  // Polling every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      void loadOrders()
    }, 10000)

    return () => clearInterval(interval)
  }, [loadOrders])

  const isStaff = currentUser ? canManageOrders(currentUser.role) : false

  async function moveStatus(orderNumber: string, nextStatus: OrderStatusFrontend) {
    await orderService.updateStatus(orderNumber, nextStatus)
    await loadOrders()
    toast.current?.show({
      severity: 'success',
      summary: 'Estado Actualizado',
      detail: `El pedido #${orderNumber} se movió a: ${nextStatus}`,
      life: 2000,
    })
  }

  function handleCancelClick(order: Order) {
    setOrderToCancel(order)
    setCancelDialogVisible(true)
  }

  async function handleConfirmCancel(reason: string) {
    if (!orderToCancel) return
    setIsCancelling(true)

    const targetOrder = orders.find((o) => o.number === orderToCancel.number)
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

    await orderService.remove(orderToCancel.number)
    await loadOrders()

    setIsCancelling(false)
    setCancelDialogVisible(false)
    setOrderToCancel(null)
    toast.current?.show({
      severity: 'warn',
      summary: 'Pedido Cancelado',
      detail: `El pedido #${orderToCancel.number} fue cancelado. Motivo: ${reason}`,
      life: 3000,
    })
  }

  async function handleClearBilled() {
    for (const billed of orders.filter((o) => o.status === 'Facturado')) {
      await orderService.remove(billed.number)
    }
    setOrders((prev) => prev.filter((o) => o.status !== 'Facturado'))
  }

  const isCustomer = currentUser?.role === 'user'

  return (
    <div className={isCustomer ? 'customer-shell' : 'dashboard-shell'}>
      {isCustomer ? (
        <CustomerNavbar />
      ) : (
        <aside className="dashboard-sidebar">
          <DashboardSidebarHeader userRole={currentUser?.role ?? 'user'} />
          <DashboardSidebarFooter
            currentUser={currentUser}
            onGoToEditProfile={() => navigate('/edit-profile')}
          />
        </aside>
      )}

      <main className={isCustomer ? 'customer-main flex flex-column gap-3' : 'dashboard-main flex flex-column gap-3'} style={{ background: '#f8fafc' }}>
        <Toast ref={toast} />

        <header className="flex justify-content-between align-items-center mb-2">
          <div>
            {!isCustomer && <span className="dashboard-eyebrow">Operaciones</span>}
            <h1 className="dashboard-title text-2xl font-bold text-900 m-0">
              {isStaff ? 'Gestión de Pedidos Activos' : 'Mis Pedidos'}
            </h1>
          </div>
          <Button
            label="Nuevo Pedido"
            icon="pi pi-plus"
            className="border-round-xl"
            style={{ background: isCustomer ? '#1e5d3b' : '#1a3f66', borderColor: isCustomer ? '#1e5d3b' : '#1a3f66' }}
            onClick={() => navigate('/orders/new')}
          />
        </header>

        {isLoading ? (
          <div className="grid">
            <div className="col-4"><Skeleton height="350px" borderRadius="16px" /></div>
            <div className="col-4"><Skeleton height="350px" borderRadius="16px" /></div>
            <div className="col-4"><Skeleton height="350px" borderRadius="16px" /></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="surface-card border-round-xl border-1 surface-border p-8 text-center flex flex-column align-items-center justify-content-center m-4">
            <span className="text-6xl mb-3">📋</span>
            <h3 className="text-xl font-bold text-900 m-0">No hay pedidos registrados</h3>
            <p className="text-sm text-500 max-w-20rem mt-2 mb-4">
              En este momento no hay pedidos en el sistema.
            </p>
            <Button
              label="Registrar primer pedido"
              icon="pi pi-plus"
              className="border-round-3xl font-bold py-2.5 px-4"
              style={{ background: isCustomer ? '#1e5d3b' : '#1a3f66', borderColor: isCustomer ? '#1e5d3b' : '#1a3f66' }}
              onClick={() => navigate('/orders/new')}
            />
          </div>
        ) : isStaff ? (
          <AdminOrderBoard
            orders={orders}
            onStatusChange={moveStatus}
            onEdit={(number) => navigate(`/orders/${number}/edit`)}
            onCancel={handleCancelClick}
            onClearBilled={handleClearBilled}
          />
        ) : (
          <ClientOrderTracking
            orders={orders}
            onEdit={(number) => navigate(`/orders/${number}/edit`)}
            onCancel={handleCancelClick}
            onNewOrder={() => navigate('/orders/new')}
          />
        )}

        <CancelOrderDialog
          visible={cancelDialogVisible}
          onHide={() => {
            setCancelDialogVisible(false)
            setOrderToCancel(null)
          }}
          order={orderToCancel}
          onConfirm={handleConfirmCancel}
          isProcessing={isCancelling}
          userRole={currentUser?.role ?? 'user'}
        />
      </main>
    </div>
  )
}
