import type { RegisterPayload, RegisterResponse } from '../types/register'
import type { RecoveryPasswordPayload, RecoveryPasswordResponse } from '../types/recoveryPassword'
import type { LoginPayload, LoginResponse } from '../types/login'
import type {
  CurrentUserResponse,
  CurrentUser,
  DeleteAccountPayload,
  DeleteAccountResponse,
  ProfileFormData,
  ProfileResponse,
  ProfileFormErrors,
} from '../types/profile'

const API_BASE_URL = 'http://localhost:8000/api'

// --- in-memory cache + pubsub for current user ---
let cachedCurrentUser: CurrentUser | null = null
const currentUserListeners: Array<(u: CurrentUser | null) => void> = []

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

export const userService = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    await new Promise((resolve) => resolve(new Promise((r) => setTimeout(r, 1500))))

    if (payload.email === 'existe@correo.com') {
      return {
        success: false,
        message: 'Ya existe una cuenta registrada con este correo electrónico.',
      }
    }

    console.log(`[userService.register] Enviando a ${API_BASE_URL}/users/register`, payload)

    return {
      success: true,
      message: 'Usuario registrado exitosamente en El Pedregal.',
      userId: crypto.randomUUID(),
    }
  },

  async recoveryPassword(payload: RecoveryPasswordPayload): Promise<RecoveryPasswordResponse> {
    await new Promise((resolve) => resolve(new Promise((r) => setTimeout(r, 1500))))

    if (payload.email === 'noexiste@correo.com') {
      return {
        success: false,
        message: 'No existe una cuenta registrada con este correo electrónico.',
      }
    }

    console.log(`[userService.recoveryPassword] Enviando a ${API_BASE_URL}/users/recovery-password`, payload)

    return {
      success: true,
      message: 'Contraseña recuperada exitosamente en El Pedregal.',
      userId: crypto.randomUUID(),
    }
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (payload.email === 'noexiste@correo.com') {
      return {
        success: false,
        message: 'No existe una cuenta con ese correo electrónico.',
      }
    }

    if (payload.password !== '12345678') {
      return {
        success: false,
        message: 'Contraseña incorrecta.',
      }
    }

    console.log(`[userService.login] Enviando a ${API_BASE_URL}/users/login`, payload)

    return {
      success: true,
      message: 'Inicio de sesión exitoso en El Pedregal.',
      userId: crypto.randomUUID(),
    }
  },

  async getProfile(): Promise<ProfileResponse> {
    await new Promise((resolve) => setTimeout(resolve, 900))

    const profile: ProfileFormData = {
      firstName: 'Carlos',
      lastName: 'Rodriguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+57 300 000 0000',
    }

    console.log(`[userService.getProfile] Obteniendo desde ${API_BASE_URL}/users/profile`)

    return {
      success: true,
      message: 'Perfil cargado exitosamente.',
      profile,
    }
  },

  async getCurrentUser(): Promise<CurrentUserResponse> {
    // If we have a cached user, return it quickly
    await new Promise((resolve) => setTimeout(resolve, 200))

    console.log(`[userService.getCurrentUser] Obteniendo desde ${API_BASE_URL}/users/current`)

    if (cachedCurrentUser) {
      return {
        success: true,
        message: 'Usuario actual cargado (cache).',
        user: cachedCurrentUser,
      }
    }

    // Default simulated response
    return {
      success: true,
      message: 'Usuario actual cargado exitosamente.',
      user: {
        initials: 'CR',
        name: 'Carlos Rodriguez',
        role: 'Cajero',
        email: 'carlos.rodriguez@email.com',
      },
    }
  },

  async updateProfile(payload: ProfileFormData): Promise<ProfileResponse> {
    console.log(`[userService.updateProfile] Enviando a ${API_BASE_URL}/users/profile`, payload)

    // Simulate network latency and simple server-side validation
    await new Promise((resolve) => setTimeout(resolve, 900))

    // Simulated server-side validation error example
    if (payload.email === 'exists@server.com') {
      const errors: ProfileFormErrors = { email: 'Este correo ya está en uso.' }
      return {
        success: false,
        message: 'Error de validación en el servidor.',
        errors,
      }
    }

    if (payload.email === 'invalid@server.com') {
      return {
        success: false,
        message: 'El correo proporcionado no es permitido por el servidor.',
      }
    }

    const updatedProfile: ProfileFormData = { ...payload }

    // Update cached current user (simple mapping: name = first + last, initials)
    const updatedUser: CurrentUser = {
      initials: `${(payload.firstName[0] ?? '').toUpperCase()}${(payload.lastName[0] ?? '').toUpperCase()}` || '??',
      name: `${payload.firstName} ${payload.lastName}`.trim() || 'Usuario',
      role: cachedCurrentUser?.role ?? 'Cajero',
      email: payload.email,
    }

    emitCurrentUser(updatedUser)

    return {
      success: true,
      message: 'Perfil actualizado en servidor (simulado).',
      profile: updatedProfile,
    }
  },

  async deleteAccount(payload: DeleteAccountPayload): Promise<DeleteAccountResponse> {
    console.log(`[userService.deleteAccount] Enviando a ${API_BASE_URL}/users/delete-account`)

    await new Promise((resolve) => setTimeout(resolve, 900))

    if (!cachedCurrentUser) {
      return {
        success: false,
        message: 'No hay una sesión activa para eliminar.',
      }
    }

    if (payload.password !== '12345678') {
      return {
        success: false,
        message: 'La contraseña no coincide.',
      }
    }

    emitCurrentUser(null)

    return {
      success: true,
      message: 'Cuenta eliminada correctamente (simulado).',
    }
  },

  // expose subscription helper
  onCurrentUserChange,
}
