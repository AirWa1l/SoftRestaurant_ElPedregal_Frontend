import { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { Skeleton } from 'primereact/skeleton'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { userService } from '../services/userService'
import type { CurrentUser } from '../types/profile'
import { siteContent } from '../data/siteContent'

type OrderStatus = 'Pendiente' | 'Preparación' | 'Entregado' | 'Facturado'

interface Order {
  number: string
  table: string
  products: string
  total: string
  status: OrderStatus
  time?: string
  notes?: string
  items?: Array<{ productId: string; quantity: number }>
}

export function OrdersPage() {
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Drag and Drop active column state for highlight
  const [draggedOverCol, setDraggedOverCol] = useState<string | null>(null)

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

    // Load orders
    if (typeof window !== 'undefined') {
      const cached = window.localStorage.getItem('pedregal_orders')
      if (cached) {
        try {
          setOrders(JSON.parse(cached))
        } catch {
          setOrders([])
        }
      } else {
        const initial: Order[] = []
        setOrders(initial)
        window.localStorage.setItem('pedregal_orders', JSON.stringify(initial))
      }
    }
    
    setIsLoading(false)

    return () => {
      isMounted = false
    }
  }, [])

  // Sync state helper
  function saveOrders(updatedList: Order[]) {
    setOrders(updatedList)
    window.localStorage.setItem('pedregal_orders', JSON.stringify(updatedList))
  }

  // Explicit move status (both forward and backward)
  function moveStatus(orderNumber: string, nextStatus: OrderStatus) {
    const updated = orders.map((o) => {
      if (o.number === orderNumber) {
        return { ...o, status: nextStatus }
      }
      return o
    })
    saveOrders(updated)

    toast.current?.show({
      severity: 'success',
      summary: 'Estado Actualizado',
      detail: `El pedido #${orderNumber} se movió a: ${nextStatus}`,
      life: 2000,
    })
  }

  // Delete/Cancel order
  function cancelOrder(orderNumber: string) {
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

    const updated = orders.filter((o) => o.number !== orderNumber)
    saveOrders(updated)
    toast.current?.show({
      severity: 'warn',
      summary: 'Pedido Eliminado',
      detail: `El pedido #${orderNumber} fue cancelado y se restituyó el stock.`,
      life: 2500,
    })
  }

  // HTML5 Drag handlers
  function handleDragStart(e: React.DragEvent, orderNumber: string) {
    e.dataTransfer.setData('text/plain', orderNumber)
  }

  function handleDragOver(e: React.DragEvent, colName: string) {
    e.preventDefault()
  }

  function handleDragEnter(e: React.DragEvent, colName: string) {
    e.preventDefault()
    setDraggedOverCol(colName)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setDraggedOverCol(null)
  }

  function handleDrop(e: React.DragEvent, targetStatus: OrderStatus) {
    e.preventDefault()
    setDraggedOverCol(null)
    const orderNumber = e.dataTransfer.getData('text/plain')
    if (orderNumber) {
      moveStatus(orderNumber, targetStatus)
    }
  }

  // Column divisions
  const pendingOrders = useMemo(() => orders.filter((o) => o.status === 'Pendiente'), [orders])
  const prepOrders = useMemo(() => orders.filter((o) => o.status === 'Preparación'), [orders])
  const deliveredOrders = useMemo(() => orders.filter((o) => o.status === 'Entregado'), [orders])
  const billedOrders = useMemo(() => orders.filter((o) => o.status === 'Facturado'), [orders])

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <DashboardSidebarHeader />
        <DashboardSidebarFooter
          currentUser={currentUser}
          onGoToEditProfile={() => navigate('/edit-profile')}
        />
      </aside>

      <main className="dashboard-main flex flex-column gap-3" style={{ background: '#f8fafc' }}>
        <Toast ref={toast} />

        <header className="flex justify-content-between align-items-center mb-2">
          <div>
            <span className="dashboard-eyebrow">Operaciones</span>
            <h1 className="dashboard-title text-2xl font-bold text-900 m-0">Gestión de Pedidos Activos</h1>
          </div>
          <Button
            label="Nuevo Pedido"
            icon="pi pi-plus"
            className="border-round-xl"
            style={{ background: '#1a3f66', borderColor: '#1a3f66' }}
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
              En este momento no hay pedidos activos en cocina, entrega o facturación.
            </p>
            <Button
              label="Registrar primer pedido"
              icon="pi pi-plus"
              className="border-round-3xl font-bold py-2.5 px-4"
              style={{ background: '#1a3f66', borderColor: '#1a3f66' }}
              onClick={() => navigate('/orders/new')}
            />
          </div>
        ) : (
          <div className="grid mt-2">
            
            {/* COLUMN 1: PENDIENTES */}
            <div className="col-12 md:col-4 p-2">
              <div
                className="border-round-xl p-3 flex flex-column gap-3 transition-all"
                style={{
                  background: '#fef3c7',
                  minHeight: '500px',
                  border: draggedOverCol === 'Pendiente' ? '2px dashed #d97706' : '1px solid #fde68a',
                  transform: draggedOverCol === 'Pendiente' ? 'scale(1.01)' : 'none',
                }}
                onDragOver={(e) => handleDragOver(e, 'Pendiente')}
                onDragEnter={(e) => handleDragEnter(e, 'Pendiente')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'Pendiente')}
              >
                <div className="flex justify-content-between align-items-center pb-2 border-bottom-1 border-amber-300">
                  <span className="font-extrabold text-amber-900 text-sm uppercase tracking-wider">Pendientes ({pendingOrders.length})</span>
                  <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 border-round-md">Entrantes</span>
                </div>
                
                <div className="flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: '600px' }}>
                  {pendingOrders.length === 0 ? (
                    <div className="text-center py-5 text-xs text-amber-700 font-medium">Sin pedidos pendientes. ¡Arrastra uno aquí!</div>
                  ) : (
                    pendingOrders.map((o) => (
                      <div
                        key={o.number}
                        draggable
                        onDragStart={(e) => handleDragStart(e, o.number)}
                        className="bg-white border-round-xl p-3 shadow-1 flex flex-column gap-2 border-left-3 border-amber-500 cursor-grab active:cursor-grabbing transition-all hover:shadow-3"
                      >
                        <div className="flex justify-content-between align-items-center">
                          <strong className="text-sm text-900">#{o.number} — {o.table}</strong>
                          <span className="text-xs text-500">{o.time || 'hace poco'}</span>
                        </div>
                        <p className="text-xs text-700 font-medium m-0">{o.products}</p>
                        {o.notes && <p className="text-xs text-500 italic m-0">Nota: {o.notes}</p>}
                        <div className="flex justify-content-between align-items-center mt-2 pt-2 border-top-1 surface-border">
                          <span className="font-bold text-sm text-900">{o.total}</span>
                          <div className="flex gap-2 align-items-center">
                            <Button
                              icon="pi pi-pencil"
                              severity="secondary"
                              text
                              size="small"
                              className="p-1"
                              onClick={() => navigate(`/orders/${o.number}/edit`)}
                              tooltip="Editar"
                            />
                            <Button
                              label="Preparar"
                              icon="pi pi-arrow-right"
                              iconPos="right"
                              severity="warning"
                              size="small"
                              className="font-bold text-xs py-1 px-2 border-round-lg"
                              onClick={() => moveStatus(o.number, 'Preparación')}
                            />
                            <Button
                              icon="pi pi-trash"
                              severity="danger"
                              text
                              size="small"
                              className="p-1"
                              onClick={() => cancelOrder(o.number)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN 2: EN PREPARACIÓN */}
            <div className="col-12 md:col-4 p-2">
              <div
                className="border-round-xl p-3 flex flex-column gap-3 transition-all"
                style={{
                  background: '#dbeafe',
                  minHeight: '500px',
                  border: draggedOverCol === 'Preparación' ? '2px dashed #2563eb' : '1px solid #bfdbfe',
                  transform: draggedOverCol === 'Preparación' ? 'scale(1.01)' : 'none',
                }}
                onDragOver={(e) => handleDragOver(e, 'Preparación')}
                onDragEnter={(e) => handleDragEnter(e, 'Preparación')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'Preparación')}
              >
                <div className="flex justify-content-between align-items-center pb-2 border-bottom-1 border-blue-300">
                  <span className="font-extrabold text-blue-900 text-sm uppercase tracking-wider">En Cocina ({prepOrders.length})</span>
                  <span className="text-xs bg-blue-200 text-blue-900 font-bold px-2 py-0.5 border-round-md">Preparando</span>
                </div>

                <div className="flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: '600px' }}>
                  {prepOrders.length === 0 ? (
                    <div className="text-center py-5 text-xs text-blue-700 font-medium">Sin pedidos en preparación. ¡Arrastra uno aquí!</div>
                  ) : (
                    prepOrders.map((o) => (
                      <div
                        key={o.number}
                        draggable
                        onDragStart={(e) => handleDragStart(e, o.number)}
                        className="bg-white border-round-xl p-3 shadow-1 flex flex-column gap-2 border-left-3 border-blue-500 cursor-grab active:cursor-grabbing transition-all hover:shadow-3"
                      >
                        <div className="flex justify-content-between align-items-center">
                          <strong className="text-sm text-900">#{o.number} — {o.table}</strong>
                          <span className="text-xs text-500">{o.time || 'hace poco'}</span>
                        </div>
                        <p className="text-xs text-700 font-medium m-0">{o.products}</p>
                        {o.notes && <p className="text-xs text-500 italic m-0">Nota: {o.notes}</p>}
                        <div className="flex justify-content-between align-items-center mt-2 pt-2 border-top-1 surface-border">
                          <span className="font-bold text-sm text-900">{o.total}</span>
                          <div className="flex gap-1 align-items-center">
                            <Button
                              icon="pi pi-pencil"
                              severity="secondary"
                              text
                              size="small"
                              className="p-1"
                              onClick={() => navigate(`/orders/${o.number}/edit`)}
                              tooltip="Editar"
                            />
                            <Button
                              icon="pi pi-arrow-left"
                              severity="secondary"
                              size="small"
                              outlined
                              className="font-bold text-xs py-1 px-2 border-round-lg"
                              onClick={() => moveStatus(o.number, 'Pendiente')}
                              tooltip="Mover a Pendiente"
                            />
                            <Button
                              label="Entregar"
                              icon="pi pi-arrow-right"
                              iconPos="right"
                              severity="info"
                              size="small"
                              className="font-bold text-xs py-1 px-2 border-round-lg text-white"
                              style={{ background: '#2563eb', borderColor: '#2563eb' }}
                              onClick={() => moveStatus(o.number, 'Entregado')}
                            />
                            <Button
                              icon="pi pi-trash"
                              severity="danger"
                              text
                              size="small"
                              className="p-1"
                              onClick={() => cancelOrder(o.number)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* COLUMN 3: ENTREGADOS / PARA FACTURAR */}
            <div className="col-12 md:col-4 p-2">
              <div
                className="border-round-xl p-3 flex flex-column gap-3 transition-all"
                style={{
                  background: '#dcfce7',
                  minHeight: '500px',
                  border: draggedOverCol === 'Entregado' ? '2px dashed #16a34a' : '1px solid #bbf7d0',
                  transform: draggedOverCol === 'Entregado' ? 'scale(1.01)' : 'none',
                }}
                onDragOver={(e) => handleDragOver(e, 'Entregado')}
                onDragEnter={(e) => handleDragEnter(e, 'Entregado')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'Entregado')}
              >
                <div className="flex justify-content-between align-items-center pb-2 border-bottom-1 border-green-300">
                  <span className="font-extrabold text-green-900 text-sm uppercase tracking-wider">Entregados ({deliveredOrders.length})</span>
                  <span className="text-xs bg-green-200 text-green-900 font-bold px-2 py-0.5 border-round-md">Para Cobrar</span>
                </div>

                <div className="flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: '600px' }}>
                  {deliveredOrders.length === 0 ? (
                    <div className="text-center py-5 text-xs text-green-700 font-medium">Sin pedidos entregados. ¡Arrastra uno aquí!</div>
                  ) : (
                    deliveredOrders.map((o) => (
                      <div
                        key={o.number}
                        draggable
                        onDragStart={(e) => handleDragStart(e, o.number)}
                        className="bg-white border-round-xl p-3 shadow-1 flex flex-column gap-2 border-left-3 border-green-500 cursor-grab active:cursor-grabbing transition-all hover:shadow-3"
                      >
                        <div className="flex justify-content-between align-items-center">
                          <strong className="text-sm text-900">#{o.number} — {o.table}</strong>
                          <span className="text-xs text-500">{o.time || 'hace poco'}</span>
                        </div>
                        <p className="text-xs text-700 font-medium m-0">{o.products}</p>
                        {o.notes && <p className="text-xs text-500 italic m-0">Nota: {o.notes}</p>}
                        <div className="flex justify-content-between align-items-center mt-2 pt-2 border-top-1 surface-border">
                          <span className="font-bold text-sm text-900">{o.total}</span>
                          <div className="flex gap-1 align-items-center">
                            <Button
                              icon="pi pi-pencil"
                              severity="secondary"
                              text
                              size="small"
                              className="p-1"
                              onClick={() => navigate(`/orders/${o.number}/edit`)}
                              tooltip="Editar"
                            />
                            <Button
                              icon="pi pi-arrow-left"
                              severity="secondary"
                              size="small"
                              outlined
                              className="font-bold text-xs py-1 px-2 border-round-lg"
                              onClick={() => moveStatus(o.number, 'Preparación')}
                              tooltip="Mover a Cocina"
                            />
                            <Button
                              label="Facturar"
                              icon="pi pi-dollar"
                              severity="success"
                              size="small"
                              className="font-bold text-xs py-1 px-2 border-round-lg"
                              onClick={() => moveStatus(o.number, 'Facturado')}
                            />
                            <Button
                              icon="pi pi-trash"
                              severity="danger"
                              text
                              size="small"
                              className="p-1"
                              onClick={() => cancelOrder(o.number)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* History / Billed Orders Section */}
        {!isLoading && billedOrders.length > 0 && (
          <div className="surface-card border-round-xl border-1 surface-border p-3 mt-3">
            <div className="flex justify-content-between align-items-center mb-2">
              <h3 className="text-sm font-bold text-800 m-0">Historial de Pedidos Facturados ({billedOrders.length})</h3>
              <Button
                label="Limpiar Historial"
                icon="pi pi-trash"
                size="small"
                text
                severity="danger"
                className="p-0 text-xs font-semibold"
                onClick={() => {
                  const activeOnly = orders.filter((o) => o.status !== 'Facturado')
                  saveOrders(activeOnly)
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {billedOrders.map((o) => (
                <span key={o.number} className="bg-100 text-600 text-xs px-2.5 py-1.5 border-round-lg border-1 surface-border">
                  #{o.number} ({o.table}) - <strong>{o.total}</strong> (Facturado)
                </span>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
