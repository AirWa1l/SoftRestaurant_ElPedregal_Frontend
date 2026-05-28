export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>
