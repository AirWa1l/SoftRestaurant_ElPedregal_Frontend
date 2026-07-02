import { useMemo } from 'react'
import { Button } from 'primereact/button'
import type { Order } from '../../types/order'

const STATUS_STYLE: Record<string, { color: string; bg: string; border: string; textClass: string }> = {
  Pendiente: { color: '#d97706', bg: '#fef3c7', border: 'border-amber-500', textClass: 'text-amber-900' },
  Confirmado: { color: '#7c3aed', bg: '#f3e8ff', border: 'border-purple-500', textClass: 'text-purple-900' },
  'Preparación': { color: '#2563eb', bg: '#dbeafe', border: 'border-blue-500', textClass: 'text-blue-900' },
  Entregado: { color: '#16a34a', bg: '#dcfce7', border: 'border-green-500', textClass: 'text-green-900' },
  Facturado: { color: '#6b7280', bg: '#f3f4f6', border: 'border-gray-500', textClass: 'text-gray-900' },
}

const STATUS_STEPS = ['Pendiente', 'Preparación', 'Entregado', 'Facturado']

function StatusStepper({ currentStatus }: { currentStatus: string }) {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus)

  return (
    <div className="flex align-items-center w-full py-1">
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className="flex align-items-center flex-1">
          <div className="flex flex-column align-items-center" style={{ flex: i === STATUS_STEPS.length - 1 ? '0 0 auto' : undefined }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: i < currentIndex ? '#16a34a' : i === currentIndex ? '#2563eb' : '#d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                transition: 'all 0.3s ease',
                boxShadow: i === currentIndex ? '0 0 0 3px rgba(37,99,235,0.2)' : 'none',
              }}
            >
              {i < currentIndex ? '✓' : i === currentIndex ? '◉' : '○'}
            </div>
            <span
              style={{
                fontSize: '9px',
                fontWeight: i === currentIndex ? 700 : 500,
                color: i <= currentIndex ? '#334155' : '#94a3b8',
                marginTop: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              {step === 'Preparación' ? 'Prep.' : step}
            </span>
          </div>
          {i < STATUS_STEPS.length - 1 && (
            <div
              style={{
                flex: 1,
                height: '2px',
                background: i < currentIndex ? '#16a34a' : i < currentIndex + 1 ? '#2563eb' : '#d1d5db',
                margin: '0 2px',
                marginBottom: '18px',
                transition: 'background 0.3s ease',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

interface ClientOrderTrackingProps {
  orders: Order[]
  onEdit: (orderNumber: string) => void
  onCancel: (order: Order) => void
  onNewOrder: () => void
}

export function ClientOrderTracking({ orders, onEdit, onCancel, onNewOrder }: ClientOrderTrackingProps) {
  const activeOrders = useMemo(() => orders.filter((o) => o.status !== 'Facturado'), [orders])
  const billedOrders = useMemo(() => orders.filter((o) => o.status === 'Facturado'), [orders])

  if (activeOrders.length === 0) {
    return (
      <div className="surface-card border-round-xl border-1 surface-border p-8 text-center flex flex-column align-items-center justify-content-center m-4">
        <span className="text-6xl mb-3">📋</span>
        <h3 className="text-xl font-bold text-900 m-0">No hay pedidos activos</h3>
        <p className="text-sm text-500 max-w-20rem mt-2 mb-4">
          Tus pedidos aparecerán aquí una vez realizados.
        </p>
        <Button
          label="Nuevo pedido"
          icon="pi pi-plus"
          className="border-round-3xl font-bold py-2.5 px-4"
          style={{ background: '#1a3f66', borderColor: '#1a3f66' }}
          onClick={onNewOrder}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-column gap-3 mt-2">
      {activeOrders.map((order) => {
        const s = STATUS_STYLE[order.status] || STATUS_STYLE.Facturado
        const borderClass = s.border

        return (
          <div
            key={order.number}
            className={`surface-card border-round-xl border-1 surface-border flex flex-column transition-all hover:shadow-3 overflow-hidden border-left-3 ${borderClass}`}
          >
            <div
              className="flex align-items-center px-3 py-2"
              style={{ background: s.bg }}
            >
              <span className={`font-bold text-sm ${s.textClass}`}>
                Pedido #{order.number}
              </span>
              <span className={`text-xs ml-2 ${s.textClass}`} style={{ opacity: 0.7 }}>
                — {order.table}
              </span>
            </div>

            <div className="p-3 flex flex-column gap-3">
              <p className="text-sm text-700 m-0">{order.products}</p>
              {order.notes && (
                <p className="text-xs text-500 italic m-0">Nota: {order.notes}</p>
              )}

              <div className="border-round-lg p-2" style={{ background: '#f8fafc' }}>
                <StatusStepper currentStatus={order.status} />
              </div>

              <div className="flex justify-content-between align-items-center pt-2 border-top-1 surface-border">
                <span className="font-bold text-lg text-900">{order.total}</span>
                <div className="flex gap-2 align-items-center">
                  <Button
                    label="Editar"
                    icon="pi pi-pencil"
                    severity="secondary"
                    outlined
                    size="small"
                    className="border-round-lg font-bold text-xs py-1.5 px-3"
                    onClick={() => onEdit(order.number)}
                  />
                  <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    severity="danger"
                    outlined
                    size="small"
                    className="border-round-lg font-bold text-xs py-1.5 px-3"
                    onClick={() => onCancel(order)}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {billedOrders.length > 0 && (
        <div className="surface-card border-round-xl border-1 surface-border p-3 mt-2">
          <h3 className="text-sm font-bold text-600 m-0 mb-2">
            Historial ({billedOrders.length} facturado{billedOrders.length !== 1 ? 's' : ''})
          </h3>
          <div className="flex flex-wrap gap-2">
            {billedOrders.map((o) => (
              <span
                key={o.number}
                className="bg-100 text-600 text-xs px-2.5 py-1.5 border-round-lg border-1 surface-border"
              >
                #{o.number} ({o.table}) — <strong>{o.total}</strong>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
