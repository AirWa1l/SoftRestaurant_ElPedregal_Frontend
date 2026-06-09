export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  description?: string
  imageUrl?: string
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export interface ProductFormErrors {
  name?: string
  sku?: string
  category?: string
  price?: string
  stock?: string
  description?: string
  imageUrl?: string
}

// ─── Service responses ────────────────────────────────────────────────────────

export interface ProductListResponse {
  success: boolean
  message?: string
  products: Product[]
}

export interface ProductResponse {
  success: boolean
  message?: string
  product?: Product
  errors?: ProductFormErrors
}

export interface ProductDeleteResponse {
  success: boolean
  message?: string
}