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
}

export type ProfileFormErrors = Partial<Record<keyof ProfileFormData, string>>

export type CurrentUser = {
  initials: string
  name: string
  role: string
  email: string
}

export type CurrentUserResponse = {
  success: boolean
  message: string
  user?: CurrentUser
}
