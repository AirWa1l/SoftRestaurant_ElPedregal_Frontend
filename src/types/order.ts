export type OrderStatusFrontend = 'Pendiente' | 'Confirmado' | 'Preparación' | 'Entregado' | 'Facturado'

export interface Order {
  _id?: string
  number: string
  table: string
  products: string
  total: string
  status: OrderStatusFrontend
  time?: string
  notes?: string
  items?: Array<{ productId: string; quantity: number; name?: string; unitPrice?: number }>
  cancelReason?: string
}

export interface OrderListResponse {
  success: boolean
  message?: string
  orders: Order[]
}

export interface OrderResponse {
  success: boolean
  message?: string
  order?: Order
}

export interface CreateOrderPayload {
  items: Array<{ product: string; quantity: number }>
  table?: string
  notes?: string
}

export interface UpdateOrderPayload {
  items?: Array<{ product: string; quantity: number }>
  table?: string
  notes?: string
}
