export type LoginFormData = {
  email: string
  password: string
}

export type LoginPayload = LoginFormData
 
export type LoginResponse = {
  success: boolean
  message: string
  userId?: string
}

export type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>
