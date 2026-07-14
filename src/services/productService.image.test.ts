import { describe, expect, it } from 'vitest'
import { resolveImageUrl } from '../services/productService'

describe('resolveImageUrl (funcional)', () => {
  const host = 'http://localhost:3000'

  it('devuelve undefined si no hay ruta', () => {
    expect(resolveImageUrl(undefined, host)).toBeUndefined()
    expect(resolveImageUrl('', host)).toBeUndefined()
  })

  it('deja intactas URLs absolutas y blob', () => {
    expect(resolveImageUrl('https://cdn.example.com/a.jpg', host)).toBe(
      'https://cdn.example.com/a.jpg',
    )
    expect(resolveImageUrl('blob:http://localhost:5173/abc', host)).toBe(
      'blob:http://localhost:5173/abc',
    )
  })

  it('prefija el host del API en rutas relativas de upload', () => {
    expect(resolveImageUrl('/uploads/products/abc.jpg', host)).toBe(
      'http://localhost:3000/uploads/products/abc.jpg',
    )
    expect(resolveImageUrl('uploads/products/abc.jpg', host)).toBe(
      'http://localhost:3000/uploads/products/abc.jpg',
    )
  })
})

describe('resolveImageUrl (no funcional - robustez)', () => {
  it('resuelve host desde URL con path /api', () => {
    expect(resolveImageUrl('/uploads/x.png', 'http://api.local:3000')).toBe(
      'http://api.local:3000/uploads/x.png',
    )
  })
})
