import type { Category, CategoryListResponse } from '../types/category'

const API_BASE_URL_RAW = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_BASE_URL = API_BASE_URL_RAW.replace(/\/auth$/, '')
const ACCESS_TOKEN_STORAGE_KEY = 'pedregal_access_token'

function getStoredAccessToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
}

export const categoryService = {
  async getAll(): Promise<CategoryListResponse> {
    try {
      const token = getStoredAccessToken()
      const response = await fetch(`${API_BASE_URL}/categories`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: 'include',
      })

      const text = await response.text()
      const data = text ? JSON.parse(text) : null

      if (!response.ok) {
        throw new Error(data?.message || 'server_error')
      }

      return {
        success: true,
        message: data.message,
        categories: data.categories.map((c: { _id: string; name: string }) => ({
          id: c._id,
          name: c.name,
        })),
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'unauthorized'
            ? 'Debe iniciar sesión de nuevo.'
            : 'No fue posible cargar las categorías.',
        categories: [],
      }
    }
  },
}
