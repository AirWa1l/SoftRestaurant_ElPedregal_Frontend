import { useMemo, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { RadioButton } from 'primereact/radiobutton'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import type { UserRole } from '../../utils/roles'

const STAFF_REASONS = [
  { value: 'Cliente canceló el pedido', label: 'Cliente canceló el pedido' },
  { value: 'Error en el pedido', label: 'Error en el pedido' },
  { value: 'Producto agotado', label: 'Producto agotado' },
  { value: 'Demora en la preparación', label: 'Demora en la preparación' },
  { value: 'Problema de facturación', label: 'Problema de facturación' },
  { value: 'Otro', label: 'Otro' },
]

const CLIENT_REASONS = [
  { value: 'Ya no lo quiero', label: 'Ya no lo quiero' },
  { value: 'Me equivoqué en el pedido', label: 'Me equivoqué en el pedido' },
  { value: 'La demora es muy larga', label: 'La demora es muy larga' },
  { value: 'Encontré otra opción', label: 'Encontré otra opción' },
  { value: 'Otro', label: 'Otro' },
]

interface OrderSummary {
  number: string
  table: string
  products: string
  total: string
  status: string
}

interface CancelOrderDialogProps {
  visible: boolean
  onHide: () => void
  order: OrderSummary | null
  onConfirm: (reason: string) => void
  isProcessing?: boolean
  userRole: UserRole
}

export function CancelOrderDialog({
  visible,
  onHide,
  order,
  onConfirm,
  isProcessing = false,
  userRole,
}: CancelOrderDialogProps) {
  const cancelReasons = useMemo(
    () => (userRole === 'user' ? CLIENT_REASONS : STAFF_REASONS),
    [userRole]
  )
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [otherReason, setOtherReason] = useState('')

  function getFinalReason(): string {
    if (selectedReason === 'Otro') {
      return otherReason.trim() || 'Otro'
    }
    return selectedReason || ''
  }

  function isConfirmDisabled(): boolean {
    if (!selectedReason) return true
    if (selectedReason === 'Otro' && !otherReason.trim()) return true
    return false
  }

  function handleConfirm() {
    if (isConfirmDisabled()) return
    onConfirm(getFinalReason())
  }

  const statusColorMap: Record<string, string> = {
    Pendiente: '#d97706',
    'Preparación': '#2563eb',
    Entregado: '#16a34a',
    Facturado: '#6b7280',
  }

  return (
    <Dialog
      key={visible && order ? `cancel-${order.number}` : 'cancel-dialog-closed'}
      visible={visible}
      onHide={onHide}
      header={`Cancelar Pedido #${order?.number ?? ''}`}
      modal
      draggable={false}
      resizable={false}
      className="cancel-order-dialog"
      style={{ width: '90vw', maxWidth: '520px' }}
      footer={
        <div className="flex flex-column sm:flex-row justify-content-end gap-2">
          <Button
            type="button"
            label="Cancelar"
            outlined
            className="border-round-xl"
            onClick={onHide}
            disabled={isProcessing}
          />
          <Button
            type="button"
            label={isProcessing ? 'Cancelando...' : 'Confirmar cancelación'}
            severity="danger"
            className="border-round-xl"
            onClick={handleConfirm}
            loading={isProcessing}
            disabled={isConfirmDisabled()}
          />
        </div>
      }
    >
      <div className="flex flex-column gap-4">
        {/* Order Summary */}
        {order && (
          <div
            className="border-1 surface-border border-round-xl p-3 flex flex-column gap-2"
            style={{ background: '#f8fafc' }}
          >
            <span className="text-xs font-bold text-500 uppercase tracking-wider">Resumen del pedido</span>
            <div className="flex justify-content-between align-items-center">
              <span className="text-sm text-600">Pedido</span>
              <span className="text-sm font-bold text-900">#{order.number}</span>
            </div>
            <div className="flex justify-content-between align-items-center">
              <span className="text-sm text-600">Mesa</span>
              <span className="text-sm font-bold text-900">{order.table}</span>
            </div>
            <div className="flex justify-content-between align-items-center">
              <span className="text-sm text-600">Productos</span>
              <span className="text-sm text-900 text-right" style={{ maxWidth: '280px' }}>{order.products}</span>
            </div>
            <div className="flex justify-content-between align-items-center">
              <span className="text-sm text-600">Total</span>
              <span className="text-sm font-bold text-900">{order.total}</span>
            </div>
            <div className="flex justify-content-between align-items-center pt-1 border-top-1 surface-border">
              <span className="text-sm text-600">Estado</span>
              <span
                className="text-xs font-bold px-2 py-0.5 border-round-md"
                style={{
                  background: `${statusColorMap[order.status] || '#6b7280'}18`,
                  color: statusColorMap[order.status] || '#6b7280',
                }}
              >
                {order.status}
              </span>
            </div>
          </div>
        )}

        {/* Reason Selection */}
        <div className="flex flex-column gap-2">
          <label className="text-sm font-bold text-700">Motivo de cancelación</label>
          <div className="flex flex-column gap-2">
            {cancelReasons.map((reason) => (
              <div
                key={reason.value}
                className={classNames(
                  'flex align-items-center gap-2 p-2 border-round-lg cursor-pointer transition-colors',
                  {
                    'surface-200': selectedReason === reason.value,
                    'hover:surface-100': selectedReason !== reason.value,
                  }
                )}
                onClick={() => setSelectedReason(reason.value)}
              >
                <RadioButton
                  inputId={`reason-${reason.value}`}
                  value={reason.value}
                  onChange={() => setSelectedReason(reason.value)}
                  checked={selectedReason === reason.value}
                />
                <label htmlFor={`reason-${reason.value}`} className="text-sm cursor-pointer w-full">
                  {reason.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Free text when "Otro" is selected */}
        {selectedReason === 'Otro' && (
          <div className="flex flex-column gap-1">
            <label htmlFor="other-reason" className="text-xs font-bold text-500 uppercase">
              Especifica el motivo
            </label>
            <InputTextarea
              id="other-reason"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Describe el motivo de la cancelación..."
              rows={3}
              autoFocus
              className="w-full border-round-lg text-sm"
              disabled={isProcessing}
              style={{ padding: '8px 12px', resize: 'vertical' }}
            />
          </div>
        )}
      </div>
    </Dialog>
  )
}
