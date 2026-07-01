import type { Order, OrderListResponse, OrderResponse, CreateOrderPayload, UpdateOrderPayload, OrderStatusFrontend } from '../types/order'

const API_BASE_URL_RAW = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_BASE_URL = API_BASE_URL_RAW.replace(/\/auth$/, '')
const ACCESS_TOKEN_STORAGE_KEY = 'pedregal_access_token'
const ORDERS_STORAGE_KEY = 'pedregal_orders'
const CART_STORAGE_KEY = 'pedregal_cart'
const ADJUSTMENTS_STORAGE_KEY = 'pedregal_stock_adjustments'

let cachedAccessToken: string | null = null

function getStoredAccessToken() {
  if (cachedAccessToken) return cachedAccessToken
  if (typeof window === 'undefined') return null
  cachedAccessToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
  return cachedAccessToken
}

async function requestJson<T>(path: string, options: { method?: string; body?: unknown } = {}) {
  const headers: Record<string, string> = {}
  if (options.body !== undefined) headers['Content-Type'] = 'application/json'
  const token = getStoredAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    credentials: 'include',
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })
  const text = await response.text()
  const data = text ? JSON.parse(text) : null
  if (!response.ok) {
    const message = data?.message || 'server_error'
    throw new Error(message)
  }
  return data as T
}

const STATUS_BACKEND_TO_FRONTEND: Record<string, OrderStatusFrontend> = {
  PENDIENTE: 'Pendiente',
  CONFIRMADO: 'Confirmado',
  EN_PREPARACION: 'Preparación',
  ENTREGADO: 'Entregado',
}

const STATUS_FRONTEND_TO_BACKEND: Record<string, string> = {
  Pendiente: 'PENDIENTE',
  Confirmado: 'CONFIRMADO',
  'Preparación': 'EN_PREPARACION',
  Entregado: 'ENTREGADO',
  Facturado: 'ENTREGADO',
}

function mapBackendToFrontend(backendStatus: string): OrderStatusFrontend {
  return STATUS_BACKEND_TO_FRONTEND[backendStatus] || 'Pendiente'
}

function mapFrontendToBackend(frontendStatus: string): string {
  return STATUS_FRONTEND_TO_BACKEND[frontendStatus] || 'PENDIENTE'
}

function formatCurrency(value: number): string {
  return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
}

function parseTotal(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9,]/g, '').replace(',', '.')
    return Number(cleaned) || 0
  }
  if (value && typeof value === 'object' && '$numberDecimal' in value) {
    return Number((value as any).$numberDecimal)
  }
  return 0
}

function getLocalOrders(): Order[] {
  if (typeof window === 'undefined') return []
  const cached = window.localStorage.getItem(ORDERS_STORAGE_KEY)
  if (!cached) return []
  try { return JSON.parse(cached) } catch { return [] }
}

function saveLocalOrders(orders: Order[]) {
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
}

function generateLocalOrderNumber(): string {
  const orders = getLocalOrders()
  return (orders.length + 1).toString().padStart(3, '0')
}

function buildProductsSummary(items: Array<{ name?: string; quantity: number; product?: { name?: string } }>): string {
  return items
    .map((item) => {
      const name = item.name || item.product?.name || 'Producto'
      return `${name} x${item.quantity}`
    })
    .join(' · ')
}

function mapApiOrderToLocalOrder(apiOrder: any): Order {
  const items = (apiOrder.items || []).map((item: any) => ({
    productId: item.product?._id || item.product,
    quantity: item.quantity,
    name: item.name,
    unitPrice: typeof item.unitPrice === 'number' ? item.unitPrice : parseFloat(String(item.unitPrice || 0)),
  }))

  const total = typeof apiOrder.total === 'number'
    ? apiOrder.total
    : parseFloat(String(apiOrder.total || 0))

  return {
    _id: apiOrder._id,
    number: apiOrder.number?.toString().padStart(3, '0') || generateLocalOrderNumber(),
    table: '',
    products: buildProductsSummary(apiOrder.items || []),
    total: formatCurrency(total),
    status: mapBackendToFrontend(apiOrder.status),
    time: 'hace 1 min',
    items,
  }
}

export const orderService = {
  async remove(idOrNumber: string): Promise<OrderResponse> {
    try {
      const orders = getLocalOrders()
      const order = orders.find((o) => o._id === idOrNumber || o.number === idOrNumber)
      const filtered = orders.filter((o) => o._id !== idOrNumber && o.number !== idOrNumber)
      saveLocalOrders(filtered)
      return { success: true, message: 'Pedido eliminado.', order }
    } catch {
      return { success: false, message: 'No fue posible eliminar el pedido.' }
    }
  },

  async getAll(statusFilter?: string): Promise<OrderListResponse> {
    try {
      const orders = getLocalOrders()
      let filtered = orders
      if (statusFilter) {
        filtered = orders.filter((o) => o.status === statusFilter)
      }
      return { success: true, orders: filtered }
    } catch {
      return { success: false, message: 'No fue posible cargar los pedidos.', orders: [] }
    }
  },

  async getById(idOrNumber: string): Promise<OrderResponse> {
    try {
      const orders = getLocalOrders()
      const order = orders.find((o) => o._id === idOrNumber || o.number === idOrNumber)
      if (!order) {
        return { success: false, message: `Pedido #${idOrNumber} no encontrado.` }
      }
      return { success: true, order }
    } catch {
      return { success: false, message: 'No fue posible cargar el pedido.' }
    }
  },

  async create(payload: CreateOrderPayload): Promise<OrderResponse> {
    try {
      const result = await requestJson<{ message: string; order: any }>('/orders', {
        method: 'POST',
        body: { items: payload.items },
      })
      const localOrder = mapApiOrderToLocalOrder(result.order)
      if (payload.table) localOrder.table = payload.table
      if (payload.notes) localOrder.notes = payload.notes

      const orders = getLocalOrders()
      saveLocalOrders([localOrder, ...orders])

      return { success: true, message: 'Pedido creado correctamente.', order: localOrder }
    } catch {
      const orderNumber = generateLocalOrderNumber()
      const productsSummary = buildProductsSummary(
        (payload.items || []).map((item) => ({
          name: item.product,
          quantity: item.quantity,
        }))
      )
      const total = 0

      const newOrder: Order = {
        number: orderNumber,
        table: payload.table || '',
        products: productsSummary,
        total: formatCurrency(total),
        status: 'Pendiente',
        time: 'hace 1 min',
        notes: payload.notes || '',
        items: payload.items.map((item) => ({
          productId: item.product,
          quantity: item.quantity,
        })),
      }

      const orders = getLocalOrders()
      saveLocalOrders([newOrder, ...orders])

      return {
        success: true,
        message: 'Pedido creado en modo offline.',
        order: newOrder,
      }
    }
  },

  async updateItems(idOrNumber: string, payload: UpdateOrderPayload): Promise<OrderResponse> {
    try {
      const orders = getLocalOrders()
      const index = orders.findIndex((o) => o._id === idOrNumber || o.number === idOrNumber)
      if (index === -1) {
        return { success: false, message: 'Pedido no encontrado.' }
      }

      const updated = { ...orders[index] }
      if (payload.table !== undefined) updated.table = payload.table
      if (payload.notes !== undefined) updated.notes = payload.notes

      if (payload.items) {
        updated.items = payload.items.map((item) => ({
          productId: item.product,
          quantity: item.quantity,
        }))
        updated.products = buildProductsSummary(payload.items.map((item) => ({
          name: item.product,
          quantity: item.quantity,
        })))
      }

      orders[index] = updated
      saveLocalOrders(orders)

      return { success: true, message: 'Pedido actualizado correctamente.', order: updated }
    } catch {
      return { success: false, message: 'No fue posible actualizar el pedido.' }
    }
  },

  async updateStatus(idOrNumber: string, frontendStatus: OrderStatusFrontend, cancelReason?: string): Promise<OrderResponse> {
    const orders = getLocalOrders()
    const order = orders.find((o) => o._id === idOrNumber || o.number === idOrNumber)

    if (!order) {
      return { success: false, message: 'Pedido no encontrado.' }
    }

    const backendStatus = mapFrontendToBackend(frontendStatus)

    if (order._id) {
      try {
        await requestJson(`/orders/${order._id}/status`, {
          method: 'PATCH',
          body: { status: backendStatus },
        })
      } catch {
        // If API fails, still update localStorage (offline fallback)
      }
    }

    const updatedOrders = orders.map((o) => {
      if (o._id === idOrNumber || o.number === idOrNumber) {
        const updated = { ...o, status: frontendStatus }
        if (cancelReason) updated.cancelReason = cancelReason
        return updated
      }
      return o
    })

    if (frontendStatus === 'Facturado' || frontendStatus === 'Entregado') {
      saveLocalOrders(updatedOrders)
    } else if (frontendStatus === 'Preparación') {
      saveLocalOrders(updatedOrders)
    } else if (frontendStatus === 'Confirmado') {
      saveLocalOrders(updatedOrders)
    } else {
      saveLocalOrders(updatedOrders)
    }

    return {
      success: true,
      message: `Estado actualizado a: ${frontendStatus}`,
      order: updatedOrders.find((o) => o._id === idOrNumber || o.number === idOrNumber),
    }
  },
}
