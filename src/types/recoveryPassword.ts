export type RecoveryPasswordFormData = {
  email: string
  password: string
  confirmPassword: string
}

export type RecoveryPasswordPayload = Omit<RecoveryPasswordFormData, 'confirmPassword'>

export type RecoveryPasswordResponse = {
  success: boolean
  message: string
  userId?: string
}

export type RecoveryPasswordFormErrors = Partial<Record<keyof RecoveryPasswordFormData, string>>

