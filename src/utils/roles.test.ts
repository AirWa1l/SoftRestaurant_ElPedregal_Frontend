import { describe, expect, it } from 'vitest'
import {
  canAdvanceOrderStatus,
  canCreateProduct,
  canDeleteProduct,
  canEditProduct,
  canManageOrders,
  canViewSalesReports,
  isUserRole,
} from './roles'

describe('roles (funcional)', () => {
  it('detecta roles válidos', () => {
    expect(isUserRole('admin')).toBe(true)
    expect(isUserRole('employee')).toBe(true)
    expect(isUserRole('user')).toBe(true)
    expect(isUserRole('guest')).toBe(false)
  })

  it('aplica matriz RBAC de productos', () => {
    expect(canCreateProduct('admin')).toBe(true)
    expect(canCreateProduct('employee')).toBe(false)
    expect(canCreateProduct('user')).toBe(false)

    expect(canEditProduct('admin')).toBe(true)
    expect(canEditProduct('employee')).toBe(true)
    expect(canEditProduct('user')).toBe(false)

    expect(canDeleteProduct('admin')).toBe(true)
    expect(canDeleteProduct('employee')).toBe(false)
  })

  it('aplica matriz RBAC de pedidos y reportes', () => {
    expect(canManageOrders('admin')).toBe(true)
    expect(canManageOrders('employee')).toBe(true)
    expect(canManageOrders('user')).toBe(false)

    expect(canAdvanceOrderStatus('employee')).toBe(true)
    expect(canAdvanceOrderStatus('user')).toBe(false)

    expect(canViewSalesReports('admin')).toBe(true)
    expect(canViewSalesReports('employee')).toBe(true)
    expect(canViewSalesReports('user')).toBe(false)
  })
})
