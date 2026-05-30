import type { RegisterPayload, RegisterResponse } from '../types/register'
import type { RecoveryPasswordPayload, RecoveryPasswordResponse } from '../types/recoveryPassword'

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
  }

}
