import type { RegisterPayload, RegisterResponse } from '../types/register'
import type { RecoveryPasswordPayload, RecoveryPasswordResponse } from '../types/recoveryPassword'
import type {LoginPayload, LoginResponse} from '../types/login'
import type {
  CurrentUserResponse,
  ProfileFormData,
  ProfileResponse,
} from '../types/profile'

const API_BASE_URL = 'http://localhost:8000/api'

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
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log(`[userService.getCurrentUser] Obteniendo desde ${API_BASE_URL}/users/current`)

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

}
