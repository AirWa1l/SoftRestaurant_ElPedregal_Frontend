import type { RegisterPayload, RegisterResponse } from '../types/register'
import type { RecoveryPasswordPayload, RecoveryPasswordResponse } from '../types/recoveryPassword'
import type { LoginPayload, LoginResponse } from '../types/login'
import type { UserRole } from '../utils/roles'
import { isUserRole } from '../utils/roles'
import type {
  CurrentUserResponse,
  CurrentUser,
  DeleteAccountPayload,
  DeleteAccountResponse,
  ProfileFormData,
  ProfileResponse,
  ProfileFormErrors,
} from '../types/profile'

const API_BASE_URL_RAW = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '')
const API_BASE_URL = API_BASE_URL_RAW.replace(/\/auth$/, '')
const AUTH_API_BASE_URL = (import.meta.env.VITE_AUTH_API_BASE_URL || `${API_BASE_URL}/auth`).replace(/\/$/, '')
const ACCESS_TOKEN_STORAGE_KEY = 'pedregal_access_token'

let cachedAccessToken: string | null = null
let cachedCurrentUser: CurrentUser | null = null
const currentUserListeners: Array<(u: CurrentUser | null) => void> = []

function getStoredAccessToken() {
  if (cachedAccessToken) return cachedAccessToken
  if (typeof window === 'undefined') return null
  cachedAccessToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
  return cachedAccessToken
}

function setStoredAccessToken(token: string | null) {
  cachedAccessToken = token
  if (typeof window !== 'undefined') {
    if (token) {
      window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token)
    } else {
      window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
    }
  }
}

function buildCurrentUser(user: {
  firstName?: string
  lastName?: string
  email: string
  role?: string
}) {
  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Usuario'
  const initials = `${(user.firstName?.[0] ?? '').toUpperCase()}${(user.lastName?.[0] ?? '').toUpperCase()}` || '--'
  const role: UserRole = user.role && isUserRole(user.role) ? user.role : 'user'
  return {
    initials,
    name,
    role,
    email: user.email,
  }
}

function emitCurrentUser(u: CurrentUser | null) {
  cachedCurrentUser = u
  currentUserListeners.forEach((cb) => {
    try {
      cb(u)
    } catch (e) {
      console.warn('[userService] listener error', e)
    }
  })
}

function onCurrentUserChange(cb: (u: CurrentUser | null) => void) {
  currentUserListeners.push(cb)
  return () => {
    const idx = currentUserListeners.indexOf(cb)
    if (idx >= 0) currentUserListeners.splice(idx, 1)
  }
}

async function requestJson<T>(path: string, options: { method?: string; body?: unknown } = {}) {
  const headers: Record<string, string> = {}
  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  const token = getStoredAccessToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${AUTH_API_BASE_URL}${path}`, {
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

export const userService = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    try {
      const result = await requestJson<{ id: string }>('/register', { method: 'POST', body: payload })
      return {
        success: true,
        message: 'Usuario registrado exitosamente en El Pedregal.',
        userId: result.id,
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'email_in_use'
            ? 'Ya existe una cuenta registrada con este correo electrónico.'
            : 'Ocurrió un error al registrar el usuario.',
      }
    }
  },

  async recoveryPassword(payload: RecoveryPasswordPayload): Promise<RecoveryPasswordResponse> {
    try {
      await requestJson('/forgot-password', { method: 'POST', body: { email: payload.email } })
      return {
        success: true,
        message: 'Se envió un enlace de recuperación al correo. Revisa tu bandeja de entrada.',
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'user_not_found'
            ? 'No existe una cuenta registrada con este correo electrónico.'
            : 'Ocurrió un error al procesar tu solicitud.',
      }
    }
  },

  async resetPassword(payload: { token: string; password: string }): Promise<RecoveryPasswordResponse> {
    try {
      await requestJson('/reset-password', { method: 'POST', body: payload })
      return {
        success: true,
        message: 'Contraseña actualizada correctamente. Inicia sesión con tu nueva contraseña.',
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'invalid_or_expired_token'
            ? 'El enlace de recuperación es inválido o ha expirado.'
            : 'No fue posible actualizar la contraseña.',
      }
    }
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const result = await requestJson<{ accessToken: string }>('/login', { method: 'POST', body: payload })
      setStoredAccessToken(result.accessToken)
      const currentUserResponse = await this.getCurrentUser()
      if (currentUserResponse.success && currentUserResponse.user) {
        emitCurrentUser(currentUserResponse.user)
      }
      return {
        success: true,
        message: 'Inicio de sesión exitoso en El Pedregal.',
      }
    } catch (error) {
      setStoredAccessToken(null)
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'invalid_credentials'
            ? 'Correo o contraseña incorrectos.'
            : 'Ocurrió un error al iniciar sesión.',
      }
    }
  },

  async logout(): Promise<void> {
    try {
      await requestJson<void>('/logout', { method: 'POST' })
    } catch {
      // Ignore network errors during logout
    } finally {
      setStoredAccessToken(null)
      emitCurrentUser(null)
      // Limpia el espejo de pedidos para que el siguiente usuario no vea los del anterior.
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('pedregal_orders')
        window.sessionStorage.removeItem('pedregal_guest_orders')
      }
    }
  },

  async getProfile(): Promise<ProfileResponse> {
    try {
      const result = await requestJson<{ message: string; profile: ProfileFormData }>('/users/profile')
      return {
        success: true,
        message: result.message,
        profile: result.profile,
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'unauthorized'
            ? 'Debe iniciar sesión de nuevo.'
            : 'No fue posible cargar el perfil.',
      }
    }
  },

  async getCurrentUser(): Promise<CurrentUserResponse> {
    if (cachedCurrentUser) {
      return {
        success: true,
        message: 'Usuario actual cargado (cache).',
        user: cachedCurrentUser,
      }
    }

    try {
      const result = await requestJson<{ message: string; user: CurrentUser }>('/users/current')
      if (result.user) {
        emitCurrentUser(result.user)
      }
      return {
        success: true,
        message: result.message,
        user: result.user,
      }
    } catch (error) {
      const message = (error as Error).message
      if (message === 'unauthorized') {
        setStoredAccessToken(null)
        emitCurrentUser(null)
      }
      return {
        success: false,
        message: 'No fue posible cargar el usuario actual.',
      }
    }
  },

  async updateProfile(payload: ProfileFormData): Promise<ProfileResponse> {
    try {
      const result = await requestJson<{ message: string; profile: ProfileFormData }>('/users/profile', {
        method: 'PUT',
        body: payload,
      })

      const updatedUser = buildCurrentUser({
        ...result.profile,
        role: cachedCurrentUser?.role,
      })
      emitCurrentUser(updatedUser)

      return {
        success: true,
        message: result.message || 'Perfil actualizado correctamente.',
        profile: result.profile,
      }
    } catch (error) {
      const message = (error as Error).message
      const responseErrors: ProfileFormErrors = {}

      if (message === 'email_in_use') {
        responseErrors.email = 'Este correo ya está en uso.'
      }

      return {
        success: false,
        message: message === 'unauthorized' ? 'Debe iniciar sesión de nuevo.' : 'No fue posible guardar los cambios.',
        errors: responseErrors,
      }
    }
  },

  async deleteAccount(payload: DeleteAccountPayload): Promise<DeleteAccountResponse> {
    try {
      await requestJson<{ message: string }>('/users/delete-account', {
        method: 'POST',
        body: payload,
      })
      setStoredAccessToken(null)
      emitCurrentUser(null)

      return {
        success: true,
        message: 'Cuenta eliminada correctamente.',
      }
    } catch (error) {
      const message = (error as Error).message
      return {
        success: false,
        message:
          message === 'invalid_credentials'
            ? 'La contraseña no coincide.'
            : message === 'unauthorized'
            ? 'Debe iniciar sesión de nuevo.'
            : 'No fue posible eliminar la cuenta. Intenta de nuevo.',
      }
    }
  },

  onCurrentUserChange,
}
