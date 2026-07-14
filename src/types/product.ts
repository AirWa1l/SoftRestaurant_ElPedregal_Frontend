export interface Product {
  id: string
  name: string
  category: string
  categoryName?: string
  price: number | null
  description?: string
  imageUrl?: string
  isAvailable: boolean
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export interface ProductFormErrors {
  name?: string
  category?: string
  price?: string
  description?: string
  imageUrl?: string
  isAvailable?: string
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
