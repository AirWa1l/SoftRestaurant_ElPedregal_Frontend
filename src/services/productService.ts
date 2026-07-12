import type {
  Product,
  ProductListResponse,
  ProductResponse,
  ProductDeleteResponse,
} from '../types/product'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '')
const API_HOST = API_BASE_URL.replace(/\/api$/, '')
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveImageUrl(path?: string): string | undefined {
  if (!path) return undefined
  if (path.startsWith('http') || path.startsWith('blob:')) return path
  return `${API_HOST}${path.startsWith('/') ? path : `/${path}`}`
}

function mapApiErrorMessage(message: string, fallback: string): string {
  if (message === 'product_name_already_exists_in_category') {
    return 'Ya existe un producto con ese nombre en esta categoría.'
  }
  if (message === 'product_not_found') {
    return 'El producto no fue encontrado.'
  }
  if (message === 'unauthorized') {
    return 'Debe iniciar sesión de nuevo.'
  }
  if (message === 'forbidden') {
    return 'No tienes permisos para realizar esta acción.'
  }
  return fallback
}

function parsePrice(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (typeof value === 'string') return Number(value)

  // Detectar si es un objeto Decimal128 de MongoDB ({ $numberDecimal: "..." })
  if (value && typeof value === 'object' && '$numberDecimal' in value) {
    return Number((value as any).$numberDecimal)
  }

  if (value && typeof (value as any).toString === 'function') {
    const parsed = Number((value as any).toString())
    return Number.isNaN(parsed) ? null : parsed
  }
  return null
}


function parseStock(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

function mapProductFromApi(apiProduct: any): Product {
  return {
    id: apiProduct._id || apiProduct.id,
    name: apiProduct.name,
    category: apiProduct.category?._id || apiProduct.category,
    categoryName: apiProduct.category?.name,
    price: parsePrice(apiProduct.price),
    description: apiProduct.description,
    imageUrl: resolveImageUrl(apiProduct.image ?? apiProduct.imageUrl),
    isAvailable: apiProduct.isAvailable ?? true,
    stock: parseStock(apiProduct.stock),
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const productService = {
  async getAll(): Promise<ProductListResponse> {
    try {
      const result = await requestJson<{ message: string; products: any[] }>('/products')
      return {
        success: true,
        message: result.message,
        products: result.products.map(mapProductFromApi),
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message: mapApiErrorMessage(message, 'No fue posible cargar los productos.'),
        products: [],
      }
    }
  },

  async getById(id: string): Promise<ProductResponse> {
    try {
      const result = await requestJson<{ message: string; product: any }>(`/products/${id}`)
      return {
        success: true,
        message: result.message,
        product: mapProductFromApi(result.product),
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message: mapApiErrorMessage(message, 'No fue posible cargar el producto.'),
      }
    }
  },

  async create(payload: Partial<Product> | FormData): Promise<ProductResponse> {
    try {
      const result = await requestJson<{ message: string; product: any }>('/products', {
        method: 'POST',
        body: payload,
      })
      return {
        success: true,
        message: result.message || 'Producto creado correctamente.',
        product: mapProductFromApi(result.product),
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message: mapApiErrorMessage(message, 'Ocurrió un error al crear el producto.'),
      }
    }
  },

  async update(id: string, payload: Partial<Product> | FormData): Promise<ProductResponse> {
    try {
      const result = await requestJson<{ message: string; product: any }>(`/products/${id}`, {
        method: 'PATCH',
        body: payload,
      })
      return {
        success: true,
        message: result.message || 'Producto actualizado correctamente.',
        product: mapProductFromApi(result.product),
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message: mapApiErrorMessage(message, 'No fue posible actualizar el producto.'),
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
        message: mapApiErrorMessage(message, 'No fue posible eliminar el producto.'),
      }
    }
  },
}