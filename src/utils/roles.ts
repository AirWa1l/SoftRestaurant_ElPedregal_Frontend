export type UserRole = 'admin' | 'employee' | 'user'

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrador',
  employee: 'Empleado',
  user: 'Cliente',
}

export function isUserRole(value: string): value is UserRole {
  return value === 'admin' || value === 'employee' || value === 'user'
}

export function canCreateProduct(role: UserRole) {
  return role === 'admin'
}

export function canEditProduct(role: UserRole) {
  return role === 'admin' || role === 'employee'
}

export function canDeleteProduct(role: UserRole) {
  return role === 'admin'
}
