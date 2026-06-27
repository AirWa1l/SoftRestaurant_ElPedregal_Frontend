import { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Skeleton } from 'primereact/skeleton'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { userService } from '../services/userService'
import { categoryService } from '../services/categoryService'
import { productService } from '../services/productService'
import type { CurrentUser } from '../types/profile'
import type { Category } from '../types/category'
import type { Product } from '../types/product'

interface CartItem {
  product: Product
  quantity: number
}

// Helper to resolve food emoji based on product info
function getProductEmoji(name: string, category: string): string {
  const n = name.toLowerCase()
  const c = (category || '').toLowerCase()
  
  if (n.includes('bandeja') || n.includes('paisa')) return '🍱'
  if (n.includes('sancocho') || n.includes('sopa') || n.includes('gallina')) return '🍲'
  if (n.includes('trucha') || n.includes('pescado') || n.includes('salmon')) return '🐟'
  if (n.includes('chuleta') || n.includes('costilla') || n.includes('carne') || n.includes('asado') || n.includes('lomo')) return '🥩'
  if (n.includes('limonada') || n.includes('jugo') || n.includes('gaseosa') || n.includes('agua') || n.includes('bebida')) return '🥤'
  if (n.includes('cerveza') || n.includes('club') || n.includes('pola')) return '🍺'
  if (n.includes('postre') || n.includes('flan') || n.includes('tres leches') || n.includes('helado')) return '🍰'
  if (n.includes('empanada') || n.includes('arepa') || n.includes('patacon') || n.includes('entrada')) return '🥟'
  if (c.includes('bebida')) return '🥤'
  if (c.includes('postre')) return '🍰'
  if (c.includes('entrada')) return '🥟'
  return '🍽️'
}

// Helper to resolve card header background color
function getProductBgColor(categoryName: string): string {
  const c = (categoryName || '').toLowerCase()
  if (c.includes('plato') || c.includes('fuerte') || c.includes('carne') || c.includes('almuerzo')) {
    return '#fdf0ea' // Soft peach/orange
  }
  if (c.includes('bebida')) {
    return '#eef6fc' // Soft blue
  }
  if (c.includes('entrada') || c.includes('sopa') || c.includes('sopas')) {
    return '#fcecef' // Soft pink/red
  }
  if (c.includes('postre')) {
    return '#f6eefc' // Soft purple
  }
  return '#f3f4f6' // Neutral grey
}

export function EditOrderPage() {
  const { number } = useParams<{ number: string }>()
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Order Original state (to calculate stock difference)
  const [originalItemsMap, setOriginalItemsMap] = useState<Record<string, number>>({})

  // Order Details (Editable)
  const [customerName, setCustomerName] = useState('')
  const [notes, setNotes] = useState('')
  const [cart, setCart] = useState<Record<string, CartItem>>({})
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [orderStatus, setOrderStatus] = useState<'Pendiente' | 'Preparación' | 'Entregado' | 'Facturado'>('Pendiente')
  const [orderTime, setOrderTime] = useState('hace 1 min')

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        // 1. Fetch user context
        const userRes = await userService.getCurrentUser()
        if (mounted && userRes.success && userRes.user) {
          setCurrentUser(userRes.user)
        }

        // 2. Fetch all products & categories
        const [productsRes, categoriesRes] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
        ])

        if (!mounted) return

        if (categoriesRes.success) {
          setCategories(categoriesRes.categories)
        }

        let fetchedProducts: Product[] = []
        if (productsRes.success) {
          fetchedProducts = productsRes.products || []
        } else {
          throw new Error('No se pudieron cargar los productos de la base de datos.')
        }

        // 3. Retrieve order from localStorage
        const cachedOrders = window.localStorage.getItem('pedregal_orders')
        if (!cachedOrders) {
          throw new Error('No se encontró ningún pedido en la base de datos local.')
        }

        const orderList = JSON.parse(cachedOrders) as any[]
        const orderToEdit = orderList.find((o) => o.number === number)

        if (!orderToEdit) {
          throw new Error(`El pedido #${number} no existe en el sistema.`)
        }

        // Save metadata
        setCustomerName(orderToEdit.table)
        setNotes(orderToEdit.notes || '')
        setOrderStatus(orderToEdit.status)
        setOrderTime(orderToEdit.time || 'hace 1 min')

        // 4. Map original items
        const origMap: Record<string, number> = {}
        const initialCart: Record<string, CartItem> = {}

        const itemsList = orderToEdit.items || []
        // Fallback parser if items array is empty but we have summary string
        if (itemsList.length === 0 && orderToEdit.products) {
          // Attempt to parse e.g. "Bandeja Paisa x2 · Limonada Natural x1"
          const tokens = orderToEdit.products.split(' · ')
          tokens.forEach((t: string) => {
            const match = t.match(/(.+) x(\d+)/)
            if (match) {
              const name = match[1].trim()
              const qty = parseInt(match[2], 10)
              const matchedProd = fetchedProducts.find((p) => p.name.toLowerCase() === name.toLowerCase())
              if (matchedProd) {
                origMap[matchedProd.id] = qty
                initialCart[matchedProd.id] = {
                  product: matchedProd,
                  quantity: qty,
                }
              }
            }
          })
        } else {
          itemsList.forEach((item: { productId: string; quantity: number }) => {
            const prod = fetchedProducts.find((p) => p.id === item.productId)
            if (prod) {
              origMap[item.productId] = item.quantity
              initialCart[item.productId] = {
                product: prod,
                quantity: item.quantity,
              }
            }
          })
        }

        setOriginalItemsMap(origMap)

        // 5. Load adjustments and set adjusted products stock
        let adjustments: Record<string, number> = {}
        const cachedAdjustments = window.localStorage.getItem('pedregal_stock_adjustments')
        if (cachedAdjustments) {
          try {
            adjustments = JSON.parse(cachedAdjustments)
          } catch {}
        }

        const adjustedProducts = fetchedProducts.map((p) => {
          const origQty = origMap[p.id] || 0
          const adj = adjustments[p.id] || 0
          // Stock available for this order is current stock plus what this order originally reserved
          const adjustedStock = p.stock - adj + origQty
          return {
            ...p,
            stock: Math.max(0, adjustedStock),
          }
        })

        setProducts(adjustedProducts)
        setCart(initialCart)

      } catch (err) {
        if (mounted) {
          setErrorMessage((err as Error).message || 'Ocurrió un error inesperado al cargar el pedido.')
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    void loadData()
    return () => {
      mounted = false
    }
  }, [number])

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = !activeCategory || p.category === activeCategory
      const matchSearch = !searchQuery.trim() || p.name.toLowerCase().includes(searchQuery.toLowerCase())
      return p.isAvailable && matchCategory && matchSearch
    })
  }, [products, activeCategory, searchQuery])

  // Calculation of totals
  const subtotal = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0)
  }, [cart])

  const totalItemCount = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)
  }, [cart])

  function handleAddToCart(product: Product) {
    setCart((prev) => {
      const existing = prev[product.id]
      const currentQty = existing ? existing.quantity : 0
      if (currentQty >= product.stock) {
        toast.current?.show({
          severity: 'warn',
          summary: 'Stock límite',
          detail: `Solo hay ${product.stock} unidades de ${product.name} en stock para este pedido.`,
          life: 2500,
        })
        return prev
      }

      return {
        ...prev,
        [product.id]: {
          product,
          quantity: currentQty + 1,
        },
      }
    })
  }

  function handleRemoveOne(productId: string) {
    setCart((prev) => {
      const existing = prev[productId]
      if (!existing) return prev

      let nextCart = { ...prev }
      if (existing.quantity <= 1) {
        delete nextCart[productId]
      } else {
        nextCart[productId] = {
          ...existing,
          quantity: existing.quantity - 1,
        }
      }
      return nextCart
    })
  }

  function handleClearProduct(productId: string) {
    setCart((prev) => {
      const nextCart = { ...prev }
      delete nextCart[productId]
      return nextCart
    })
  }

  async function handleSubmitOrder(e: React.FormEvent) {
    e.preventDefault()

    if (!customerName.trim()) {
      toast.current?.show({
        severity: 'error',
        summary: 'Mesa Requerida',
        detail: 'Por favor ingresa la mesa o ubicación.',
        life: 3000,
      })
      return
    }

    if (totalItemCount === 0) {
      toast.current?.show({
        severity: 'error',
        summary: 'Pedido vacío',
        detail: 'Por favor selecciona al menos un producto.',
        life: 3000,
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API update
    setTimeout(() => {
      try {
        const cachedOrders = window.localStorage.getItem('pedregal_orders')
        if (!cachedOrders) throw new Error('No hay pedidos registrados en el sistema.')

        const orderList = JSON.parse(cachedOrders) as any[]
        const index = orderList.findIndex((o) => o.number === number)

        if (index === -1) throw new Error('El pedido no fue encontrado para actualizar.')

        // Build product summary string
        const productsSummary = Object.values(cart)
          .map((item) => `${item.product.name} x${item.quantity}`)
          .join(' · ')

        // 1. Calculate stock difference and update local adjustments
        const cachedAdjustments = window.localStorage.getItem('pedregal_stock_adjustments')
        let adjustments: Record<string, number> = {}
        if (cachedAdjustments) {
          try {
            adjustments = JSON.parse(cachedAdjustments)
          } catch {}
        }

        // Refund all original items first
        Object.entries(originalItemsMap).forEach(([prodId, origQty]) => {
          if (adjustments[prodId] !== undefined) {
            adjustments[prodId] = Math.max(0, adjustments[prodId] - origQty)
          }
        })

        // Apply new cart items adjustments
        Object.values(cart).forEach((item) => {
          adjustments[item.product.id] = (adjustments[item.product.id] || 0) + item.quantity
        })

        window.localStorage.setItem('pedregal_stock_adjustments', JSON.stringify(adjustments))

        // 2. Update order values
        const updatedOrder = {
          ...orderList[index],
          table: customerName.trim(),
          products: productsSummary,
          total: subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }),
          notes: notes.trim(),
          items: Object.values(cart).map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }

        orderList[index] = updatedOrder
        window.localStorage.setItem('pedregal_orders', JSON.stringify(orderList))

        toast.current?.show({
          severity: 'success',
          summary: 'Pedido Actualizado',
          detail: `Pedido #${number} modificado con éxito.`,
          life: 3000,
        })

        setTimeout(() => {
          navigate('/orders') // Redirect to OrdersPage
        }, 800)

      } catch (err) {
        setIsSubmitting(false)
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: (err as Error).message || 'Hubo un problema actualizando el pedido.',
          life: 3000,
        })
      }
    }, 1200)
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <DashboardSidebarHeader />
        <DashboardSidebarFooter
          currentUser={currentUser}
          onGoToEditProfile={() => navigate('/edit-profile')}
        />
      </aside>

      <main className="dashboard-main flex flex-column gap-3" style={{ background: '#f8fafc' }}>
        <Toast ref={toast} />

        <header className="flex justify-content-between align-items-center mb-2">
          <div>
            <span className="dashboard-eyebrow">Operaciones</span>
            <h1 className="dashboard-title text-2xl font-bold text-900 m-0">Editar Pedido #{number}</h1>
          </div>
          <Button
            label="Regresar"
            icon="pi pi-arrow-left"
            className="p-button-secondary border-round-xl"
            outlined
            onClick={() => navigate('/orders')}
            disabled={isSubmitting}
          />
        </header>

        {isLoading ? (
          <div className="grid mt-4">
            <div className="col-12 md:col-8">
              <Skeleton height="80px" className="mb-3" />
              <div className="grid">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="col-12 sm:col-6 md:col-4">
                    <Skeleton height="160px" borderRadius="12px" />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 md:col-4">
              <Skeleton height="400px" borderRadius="16px" />
            </div>
          </div>
        ) : errorMessage ? (
          <div className="surface-card border-round-xl border-1 border-red-200 p-6 text-center m-4 bg-red-50">
            <span className="text-5xl">⚠️</span>
            <h3 className="text-xl font-bold text-red-900 m-0 mt-3">Error al cargar pedido</h3>
            <p className="text-sm text-red-700 max-w-20rem mx-auto mt-2 mb-4">{errorMessage}</p>
            <Button
              label="Volver a Pedidos"
              icon="pi pi-arrow-left"
              className="p-button-danger border-round-xl font-bold"
              onClick={() => navigate('/orders')}
            />
          </div>
        ) : (
          <div className="grid align-items-stretch" style={{ minHeight: 'calc(100vh - 40px)' }}>
            
            {/* LEFT COLUMN: Catalog */}
            <div className="col-12 lg:col-8 flex flex-column gap-3 p-3">
              
              <div className="flex align-items-center justify-content-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-xl font-bold text-900 m-0">
                    Modificar Ítems — {customerName || 'Mesa'}
                  </h1>
                </div>
                <div className="p-input-icon-left" style={{ width: '240px' }}>
                  <i className="pi pi-search" />
                  <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar producto..."
                    className="w-full border-round-xl text-sm py-2"
                  />
                </div>
              </div>

              {/* Categories Navigation */}
              <div className="flex gap-2 overflow-x-auto py-1" style={{ scrollbarWidth: 'none' }}>
                <button
                  type="button"
                  onClick={() => setActiveCategory('')}
                  className="px-4 py-2 border-none border-round-3xl font-bold text-sm cursor-pointer whitespace-nowrap"
                  style={{
                    background: activeCategory === '' ? '#1a3f66' : '#fff',
                    color: activeCategory === '' ? '#fff' : '#64748b',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-4 py-2 border-none border-round-3xl font-bold text-sm cursor-pointer whitespace-nowrap"
                    style={{
                      background: activeCategory === cat.id ? '#1a3f66' : '#fff',
                      color: activeCategory === cat.id ? '#fff' : '#64748b',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Product grid displaying actual image */}
              {filteredProducts.length === 0 ? (
                <div className="surface-card border-round-xl border-1 surface-border p-8 text-center flex flex-column align-items-center justify-content-center">
                  <span className="text-5xl mb-3">🍽️</span>
                  <p className="text-base font-bold text-900 m-0">Sin productos disponibles</p>
                  <p className="text-sm text-500 m-0 mt-1">No hay productos en esta categoría.</p>
                </div>
              ) : (
                <div className="grid">
                  {filteredProducts.map((prod) => {
                    const inCart = cart[prod.id]?.quantity || 0
                    const emoji = getProductEmoji(prod.name, prod.categoryName || '')
                    const headerBg = getProductBgColor(prod.categoryName || '')
                    
                    return (
                      <div key={prod.id} className="col-12 sm:col-6 md:col-4">
                        <div
                          className="surface-card border-1 border-round-xl overflow-hidden flex flex-column justify-content-between h-full transition-all hover:shadow-2"
                          style={{
                            borderColor: inCart > 0 ? '#1a3f66' : '#e2e8f0',
                            borderWidth: inCart > 0 ? '2px' : '1px',
                            boxShadow: inCart > 0 ? '0 10px 15px -3px rgba(26, 63, 102, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)',
                            background: '#fff',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleAddToCart(prod)}
                        >
                          {/* Upper colored area or actual image */}
                          <div
                            className="flex align-items-center justify-content-center overflow-hidden"
                            style={{ height: '110px', background: prod.imageUrl ? 'transparent' : headerBg, position: 'relative' }}
                          >
                            {prod.imageUrl ? (
                              <img src={prod.imageUrl} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <span className="text-4xl select-none">{emoji}</span>
                            )}
                            
                            {inCart > 0 && (
                              <span
                                className="absolute top-0 right-0 m-2 bg-primary text-white border-circle flex align-items-center justify-content-center text-xs font-bold"
                                style={{ width: '22px', height: '22px', backgroundColor: '#1a3f66', zIndex: 2 }}
                              >
                                {inCart}
                              </span>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="p-3 flex flex-column gap-1 flex-1">
                            <span className="text-900 font-bold text-sm line-clamp-1">{prod.name}</span>
                            <span className="text-xs text-500 line-clamp-2" style={{ minHeight: '32px', lineHeight: '1.3' }}>
                              {prod.description}
                            </span>
                            
                            <div className="flex align-items-center justify-content-between mt-2 pt-2 border-top-1 surface-border">
                              <span className="font-bold text-sm text-900">
                                {(prod.price || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                              </span>
                              <span className="text-xs text-500 font-semibold">Stock: {prod.stock}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Edit Checkout Card */}
            <div className="col-12 lg:col-4 p-3">
              <form
                onSubmit={handleSubmitOrder}
                className="surface-card border-1 surface-border border-round-xl p-4 flex flex-column gap-4 shadow-2 h-full justify-content-between"
                style={{ background: '#fff', minHeight: '560px' }}
              >
                <div className="flex flex-column gap-4">
                  
                  {/* Receipt Header */}
                  <div className="flex justify-content-between align-items-center">
                    <h2 className="text-base font-extrabold text-900 m-0">Editar Pedido #{number}</h2>
                    <span className="bg-blue-100 text-primary-800 text-xs font-bold px-2 py-1 border-round-lg" style={{ color: '#1a3f66', background: '#dbeafe' }}>
                      {totalItemCount} item{totalItemCount !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Mesa / Ubicación input */}
                  <div className="flex flex-column gap-1">
                    <label htmlFor="customer" className="text-xs font-bold text-500 uppercase">Mesa / Ubicación</label>
                    <InputText
                      id="customer"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Mesa 4"
                      className="w-full border-round-lg text-sm"
                      disabled={isSubmitting}
                      required
                      style={{ padding: '8px 12px' }}
                    />
                  </div>

                  {/* Notas input */}
                  <div className="flex flex-column gap-1">
                    <label htmlFor="notes" className="text-xs font-bold text-500 uppercase">Notas (Opcional)</label>
                    <InputText
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ej: sin cebolla, extra salsa..."
                      className="w-full border-round-lg text-sm"
                      disabled={isSubmitting}
                      style={{ padding: '8px 12px' }}
                    />
                  </div>

                  {/* Selected products list */}
                  <div className="flex flex-column gap-2 border-top-1 border-bottom-1 surface-border py-3">
                    {totalItemCount === 0 ? (
                      <div className="text-center py-6 text-xs text-500 flex flex-column align-items-center gap-2">
                        <span>🛒</span>
                        <span>Ningún producto agregado todavía. Selecciona del catálogo de la izquierda.</span>
                      </div>
                    ) : (
                      <div className="flex flex-column gap-3 max-h-15rem overflow-y-auto pr-1">
                        {Object.values(cart).map((item) => {
                          const emoji = getProductEmoji(item.product.name, item.product.categoryName || '')
                          return (
                            <div key={item.product.id} className="flex align-items-center justify-content-between gap-2">
                              
                              {/* Left item details */}
                              <div className="flex align-items-center gap-2 flex-1">
                                {item.product.imageUrl ? (
                                  <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '6px' }}
                                  />
                                ) : (
                                  <span className="text-xl select-none">{emoji}</span>
                                )}
                                <div className="flex flex-column">
                                  <span className="text-xs font-bold text-900 line-clamp-1">{item.product.name}</span>
                                  <span className="text-xs text-500">
                                    {(item.product.price || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })} c/u
                                  </span>
                                </div>
                              </div>
                              
                              {/* Quantity Selector Pill */}
                              <div
                                className="flex align-items-center bg-100 border-round-3xl px-2 py-1"
                                style={{ background: '#f1f5f9' }}
                              >
                                <Button
                                  icon="pi pi-minus"
                                  size="small"
                                  text
                                  className="p-0 text-700 font-bold"
                                  style={{ width: '20px', height: '20px', minWidth: '20px', fontSize: '0.7rem' }}
                                  onClick={(e) => { e.stopPropagation(); handleRemoveOne(item.product.id) }}
                                  disabled={isSubmitting}
                                  type="button"
                                />
                                <span className="text-xs font-bold px-2 text-center" style={{ minWidth: '16px' }}>{item.quantity}</span>
                                <Button
                                  icon="pi pi-plus"
                                  size="small"
                                  text
                                  className="p-0 text-700 font-bold"
                                  style={{ width: '20px', height: '20px', minWidth: '20px', fontSize: '0.7rem' }}
                                  onClick={(e) => { e.stopPropagation(); handleAddToCart(item.product) }}
                                  disabled={isSubmitting || item.quantity >= item.product.stock}
                                  type="button"
                                />
                                <Button
                                  icon="pi pi-trash"
                                  size="small"
                                  severity="danger"
                                  className="w-1rem h-1rem p-0 ml-1 border-none text-xs"
                                  onClick={(e) => { e.stopPropagation(); handleClearProduct(item.product.id) }}
                                  disabled={isSubmitting}
                                  type="button"
                                  text
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtotal, Total and Action Buttons */}
                <div className="flex flex-column gap-3 mt-auto">
                  <div className="flex flex-column gap-2">
                    <div className="flex justify-content-between text-sm text-600">
                      <span>Subtotal</span>
                      <span>{subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-content-between text-base font-bold text-900 border-top-1 surface-border pt-2">
                      <span>Total</span>
                      <span className="text-lg text-primary-800" style={{ color: '#1a3f66' }}>
                        {subtotal.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-column gap-2 mt-2">
                    <Button
                      label={isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
                      icon={isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
                      className="w-full border-round-xl font-bold py-3 text-sm"
                      style={{ background: '#1a3f66', borderColor: '#1a3f66' }}
                      type="submit"
                      disabled={isSubmitting || totalItemCount === 0}
                    />
                    <Button
                      label="Cancelar"
                      className="w-full border-round-xl font-bold py-3 text-sm p-button-secondary"
                      outlined
                      style={{ color: '#64748b', borderColor: '#cbd5e1' }}
                      type="button"
                      onClick={() => navigate('/orders')}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

              </form>
            </div>

          </div>
        )}

      </main>
    </div>
  )
}
