import type { UserRole } from '../utils/roles'

export type ProfileFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type ProfilePayload = ProfileFormData

export type ProfileResponse = {
  success: boolean
  message: string
  profile?: ProfileFormData
  errors?: ProfileFormErrors
}

export type ProfileFormErrors = Partial<Record<keyof ProfileFormData, string>>

export type DeleteAccountPayload = {
  password: string
}

export type DeleteAccountResponse = {
  success: boolean
  message: string
}

export type CurrentUser = {
  initials: string
  name: string
  role: UserRole
  email: string
}

export type CurrentUserResponse = {
  success: boolean
  message: string
  user?: CurrentUser
}
