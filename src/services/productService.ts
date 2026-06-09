import type {
  Product,
  ProductListResponse,
  ProductResponse,
  ProductDeleteResponse,
} from '../types/product'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const ACCESS_TOKEN_STORAGE_KEY = 'pedregal_access_token'

// ─── Token helper (shared pattern with userService) ───────────────────────────

let cachedAccessToken: string | null = null

function getStoredAccessToken() {
  if (cachedAccessToken) return cachedAccessToken
  if (typeof window === 'undefined') return null
  cachedAccessToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
  return cachedAccessToken
}

// ─── Core fetch helper ────────────────────────────────────────────────────────

async function requestJson<T>(path: string, options: { method?: string; body?: unknown } = {}) {
  const headers: Record<string, string> = {}

  const isFormData = options.body instanceof FormData

  if (options.body !== undefined && !isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  const token = getStoredAccessToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    credentials: 'include',
    body:
      options.body !== undefined
        ? options.body instanceof FormData
          ? options.body
          : JSON.stringify(options.body)
        : undefined,
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    const message = data?.message || 'server_error'
    throw new Error(message)
  }

  return data as T
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const productService = {
  async getAll(): Promise<ProductListResponse> {
    try {
      const result = await requestJson<{ message: string; products: Product[] }>('/products')
      return {
        success: true,
        message: result.message,
        products: result.products,
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'unauthorized'
            ? 'Debe iniciar sesión de nuevo.'
            : 'No fue posible cargar los productos.',
        products: [],
      }
    }
  },

  async getById(id: string): Promise<ProductResponse> {
    try {
      const result = await requestJson<{ message: string; product: Product }>(`/products/${id}`)
      return {
        success: true,
        message: result.message,
        product: result.product,
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'product_not_found'
            ? 'El producto no fue encontrado.'
            : message === 'unauthorized'
            ? 'Debe iniciar sesión de nuevo.'
            : 'No fue posible cargar el producto.',
      }
    }
  },

  async create(payload: Product | FormData): Promise<ProductResponse> {
    try {
      const result = await requestJson<{ message: string; product: Product }>('/products', {
        method: 'POST',
        body: payload,
      })
      return {
        success: true,
        message: result.message || 'Producto creado correctamente.',
        product: result.product,
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'id'
            ? 'Ya existe un producto registrado con este SKU.'
            : message === 'unauthorized'
            ? 'Debe iniciar sesión de nuevo.'
            : 'Ocurrió un error al crear el producto.',
      }
    }
  },

  async update(id: string, payload: Product): Promise<ProductResponse> {
    try {
      const result = await requestJson<{ message: string; product: Product }>(`/products/${id}`, {
        method: 'PUT',
        body: payload,
      })
      return {
        success: true,
        message: result.message || 'Producto actualizado correctamente.',
        product: result.product,
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'sku_in_use'
            ? 'Ya existe otro producto con este SKU.'
            : message === 'product_not_found'
            ? 'El producto no fue encontrado.'
            : message === 'unauthorized'
            ? 'Debe iniciar sesión de nuevo.'
            : 'No fue posible actualizar el producto.',
      }
    }
  },

  async remove(id: string): Promise<ProductDeleteResponse> {
    try {
      await requestJson<{ message: string }>(`/products/${id}`, { method: 'DELETE' })
      return {
        success: true,
        message: 'Producto eliminado correctamente.',
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'product_not_found'
            ? 'El producto no fue encontrado.'
            : message === 'unauthorized'
            ? 'Debe iniciar sesión de nuevo.'
            : 'No fue posible eliminar el producto.',
      }
    }
  },
}