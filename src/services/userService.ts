import type { RegisterPayload, RegisterResponse } from '../types/register'

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
  }

}
