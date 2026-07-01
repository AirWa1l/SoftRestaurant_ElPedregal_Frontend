export interface Category {
  id: string
  name: string
}

export interface CategoryListResponse {
  success: boolean
  message?: string
  categories: Category[]
}
