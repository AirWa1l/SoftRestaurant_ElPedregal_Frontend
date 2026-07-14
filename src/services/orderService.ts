import type { Order, OrderListResponse, OrderResponse, CreateOrderPayload, UpdateOrderPayload, OrderStatusFrontend } from '../types/order'

const API_BASE_URL_RAW = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '')
const API_BASE_URL = API_BASE_URL_RAW.replace(/\/auth$/, '')
const ACCESS_TOKEN_STORAGE_KEY = 'pedregal_access_token'
const ORDERS_STORAGE_KEY = 'pedregal_orders'

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
  FACTURADO: 'Facturado',
}

const STATUS_FRONTEND_TO_BACKEND: Record<string, string> = {
  Pendiente: 'PENDIENTE',
  Confirmado: 'CONFIRMADO',
  'Preparación': 'EN_PREPARACION',
  Entregado: 'ENTREGADO',
  Facturado: 'FACTURADO',
}

function mapBackendToFrontend(backendStatus: string): OrderStatusFrontend {
  return STATUS_BACKEND_TO_FRONTEND[backendStatus] || 'Pendiente'
}

function mapFrontendToBackend(frontendStatus: string): string {
  return STATUS_FRONTEND_TO_BACKEND[frontendStatus] || 'PENDIENTE'
}

function mapOrderError(message: string): string {
  switch (message) {
    case 'invalid_status_transition':
      return 'No se puede cambiar el pedido a ese estado desde su estado actual.'
    case 'forbidden_transition_for_role':
    case 'forbidden_not_order_owner':
    case 'forbidden':
      return 'No tienes permisos para realizar esta acción sobre el pedido.'
    case 'order_not_editable':
      return 'El pedido ya no se puede editar (está en preparación o finalizado).'
    case 'order_not_found':
      return 'El pedido no fue encontrado.'
    default:
      return 'No fue posible completar la acción sobre el pedido.'
  }
}

function formatCurrency(value: number): string {
  return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
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

// ─── Pedidos de invitado ──────────────────────────────────────────────────────
// Se guardan en sessionStorage (por pestaña): un invitado ve solo los pedidos
// que hizo en esta sesión, y se borran al cerrar la página. Nunca lee el espejo
// compartido de localStorage, para no mostrarle pedidos de otros usuarios.
const GUEST_ORDERS_KEY = 'pedregal_guest_orders'

function getGuestOrders(): Order[] {
  if (typeof window === 'undefined') return []
  const cached = window.sessionStorage.getItem(GUEST_ORDERS_KEY)
  if (!cached) return []
  try { return JSON.parse(cached) } catch { return [] }
}

function saveGuestOrders(orders: Order[]) {
  window.sessionStorage.setItem(GUEST_ORDERS_KEY, JSON.stringify(orders))
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
    table: apiOrder.table ?? apiOrder.customerName ?? '',
    products: buildProductsSummary(apiOrder.items || []),
    total: formatCurrency(total),
    status: mapBackendToFrontend(apiOrder.status),
    time: 'hace 1 min',
    notes: apiOrder.notes ?? '',
    items,
  }
}

export const orderService = {
  // Cancelar = transición a CANCELADO en el backend (queda historial).
  async remove(idOrNumber: string): Promise<OrderResponse> {
    const token = getStoredAccessToken()

    // Invitado: cancela solo en su sesión.
    if (!token) {
      const orders = getGuestOrders()
      const order = orders.find((o) => o._id === idOrNumber || o.number === idOrNumber)
      saveGuestOrders(orders.filter((o) => o._id !== idOrNumber && o.number !== idOrNumber))
      return { success: true, message: 'Pedido cancelado.', order }
    }

    const orders = getLocalOrders()
    const order = orders.find((o) => o._id === idOrNumber || o.number === idOrNumber)
    if (!order?._id) {
      return { success: false, message: 'No se encontró el pedido para cancelar.' }
    }

    try {
      await requestJson(`/orders/${order._id}/status`, {
        method: 'PATCH',
        body: { status: 'CANCELADO' },
      })
      saveLocalOrders(orders.filter((o) => o._id !== idOrNumber && o.number !== idOrNumber))
      return { success: true, message: 'Pedido cancelado.', order }
    } catch (error) {
      return { success: false, message: mapOrderError((error as Error).message) }
    }
  },

  async getAll(statusFilter?: string): Promise<OrderListResponse> {
    const token = getStoredAccessToken()

    // Invitado: solo sus pedidos de esta sesión; nunca el espejo compartido.
    if (!token) {
      let orders = getGuestOrders()
      if (statusFilter) orders = orders.filter((o) => o.status === statusFilter)
      return { success: true, orders }
    }

    try {
      const result = await requestJson<{ message: string; orders: any[] }>('/orders')
      const mapped = (result.orders || []).map(mapApiOrderToLocalOrder)

      // Espejo local: mantiene el _id disponible para las acciones (cancelar, estado).
      saveLocalOrders(mapped)

      let filtered = mapped
      if (statusFilter) {
        filtered = mapped.filter((o) => o.status === statusFilter)
      }
      return { success: true, orders: filtered }
    } catch {
      // Sin conexión con el backend: usamos el último espejo local conocido.
      const orders = getLocalOrders()
      let filtered = orders
      if (statusFilter) {
        filtered = orders.filter((o) => o.status === statusFilter)
      }
      return { success: true, orders: filtered }
    }
  },

  async getById(idOrNumber: string): Promise<OrderResponse> {
    const token = getStoredAccessToken()

    if (token) {
      try {
        const result = await requestJson<{ message: string; order: any }>(`/orders/${idOrNumber}`)
        return { success: true, order: mapApiOrderToLocalOrder(result.order) }
      } catch {
        // Cae al respaldo local del espejo.
      }
    }

    const pool = token ? getLocalOrders() : getGuestOrders()
    const order = pool.find((o) => o._id === idOrNumber || o.number === idOrNumber)
    if (!order) {
      return { success: false, message: `Pedido #${idOrNumber} no encontrado.` }
    }
    return { success: true, order }
  },

  async create(payload: CreateOrderPayload): Promise<OrderResponse> {
    const token = getStoredAccessToken()

    try {
      const result = await requestJson<{ message: string; order: any }>('/orders', {
        method: 'POST',
        body: {
          items: payload.items,
          ...(payload.customerName ? { customerName: payload.customerName } : {}),
          ...(payload.customerPhone ? { customerPhone: payload.customerPhone } : {}),
          ...(payload.table ? { table: payload.table } : {}),
          ...(payload.notes ? { notes: payload.notes } : {}),
        },
      })
      const localOrder = mapApiOrderToLocalOrder(result.order)
      if (payload.table) localOrder.table = payload.table
      if (payload.notes) localOrder.notes = payload.notes

      // Autenticado → espejo local; invitado → su sesión (sessionStorage).
      if (token) {
        saveLocalOrders([localOrder, ...getLocalOrders()])
      } else {
        saveGuestOrders([localOrder, ...getGuestOrders()])
      }

      return { success: true, message: 'Pedido creado correctamente.', order: localOrder }
    } catch {
      const orderNumber = generateLocalOrderNumber()
      const productsSummary = buildProductsSummary(
        (payload.items || []).map((item) => ({
          name: item.name || item.product,
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
          name: item.name,
        })),
      }

      if (token) {
        saveLocalOrders([newOrder, ...getLocalOrders()])
      } else {
        saveGuestOrders([newOrder, ...getGuestOrders()])
      }

      return {
        success: true,
        message: 'Pedido creado en modo offline.',
        order: newOrder,
      }
    }
  },

  async updateItems(idOrNumber: string, payload: UpdateOrderPayload): Promise<OrderResponse> {
    const token = getStoredAccessToken()

    // Invitado: edita en su sesión.
    if (!token) {
      const orders = getGuestOrders()
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
          name: item.name,
        }))
        updated.products = buildProductsSummary(payload.items.map((item) => ({
          name: item.name || item.product,
          quantity: item.quantity,
        })))
      }
      orders[index] = updated
      saveGuestOrders(orders)
      return { success: true, message: 'Pedido actualizado correctamente.', order: updated }
    }

    // Autenticado: edita en el backend.
    if (!payload.items) {
      return { success: false, message: 'No hay ítems para actualizar.' }
    }
    try {
      const result = await requestJson<{ message: string; order: any }>(`/orders/${idOrNumber}`, {
        method: 'PATCH',
        body: {
          items: payload.items.map((item) => ({ product: item.product, quantity: item.quantity })),
          ...(payload.table !== undefined ? { table: payload.table } : {}),
          ...(payload.notes !== undefined ? { notes: payload.notes } : {}),
        },
      })
      return { success: true, message: 'Pedido actualizado correctamente.', order: mapApiOrderToLocalOrder(result.order) }
    } catch (error) {
      return { success: false, message: mapOrderError((error as Error).message) }
    }
  },

  async updateStatus(idOrNumber: string, frontendStatus: OrderStatusFrontend, cancelReason?: string): Promise<OrderResponse> {
    const token = getStoredAccessToken()
    const backendStatus = mapFrontendToBackend(frontendStatus)

    // Invitado: solo en su sesión.
    if (!token) {
      const orders = getGuestOrders()
      const updated = orders.map((o) =>
        o._id === idOrNumber || o.number === idOrNumber
          ? { ...o, status: frontendStatus, ...(cancelReason ? { cancelReason } : {}) }
          : o
      )
      saveGuestOrders(updated)
      return {
        success: true,
        message: `Estado actualizado a: ${frontendStatus}`,
        order: updated.find((o) => o._id === idOrNumber || o.number === idOrNumber),
      }
    }

    const orders = getLocalOrders()
    const order = orders.find((o) => o._id === idOrNumber || o.number === idOrNumber)
    if (!order?._id) {
      return { success: false, message: 'No se encontró el pedido.' }
    }

    try {
      await requestJson(`/orders/${order._id}/status`, {
        method: 'PATCH',
        body: { status: backendStatus },
      })
    } catch (error) {
      return { success: false, message: mapOrderError((error as Error).message) }
    }

    const updatedOrders = orders.map((o) =>
      o._id === idOrNumber || o.number === idOrNumber
        ? { ...o, status: frontendStatus, ...(cancelReason ? { cancelReason } : {}) }
        : o
    )
    saveLocalOrders(updatedOrders)

    return {
      success: true,
      message: `Estado actualizado a: ${frontendStatus}`,
      order: updatedOrders.find((o) => o._id === idOrNumber || o.number === idOrNumber),
    }
  },
}
