import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Skeleton } from 'primereact/skeleton'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { useNavigate } from 'react-router-dom'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import type { CurrentUser } from '../types/profile'
import type { Category } from '../types/category'
import { userService } from '../services/userService'
import { categoryService } from '../services/categoryService'
import type { Product } from '../types/product'
import { productService } from '../services/productService'
import { canCreateProduct, canDeleteProduct, canEditProduct } from '../utils/roles'

function ProductCardSkeleton() {
  return (
    <div className="surface-card border-1 surface-border border-round-xl p-3 flex flex-column gap-3">
      <Skeleton height="140px" borderRadius="10px" />
      <div className="flex flex-column gap-2">
        <Skeleton width="70%" height="1rem" />
        <Skeleton width="40%" height="0.75rem" />
      </div>
      <div className="flex justify-content-between align-items-center">
        <Skeleton width="50%" height="1.25rem" />
        <Skeleton width="30%" height="0.75rem" />
      </div>
      <div className="flex gap-2">
        <Skeleton height="2rem" className="flex-1" borderRadius="8px" />
        <Skeleton height="2rem" width="2.5rem" borderRadius="8px" />
      </div>
    </div>
  )
}

function EmptyState({ onCreateClick, canCreate }: { onCreateClick: () => void; canCreate: boolean }) {
  return (
    <div className="flex flex-column align-items-center justify-content-center gap-4 py-8 text-center">
      <div
        className="flex align-items-center justify-content-center border-circle surface-200 text-5xl"
        style={{ width: '5rem', height: '5rem' }}
      >
        📦
      </div>
      <div className="flex flex-column gap-1">
        <h3 className="m-0 text-xl font-bold text-900">Sin productos aún</h3>
        <p className="m-0 text-sm text-600 max-w-20rem">
          {canCreate
            ? 'Agrega tu primer producto al catálogo y empieza a gestionarlo desde aquí.'
            : 'El catálogo aún no tiene productos disponibles.'}
        </p>
      </div>
      {canCreate && (
        <Button
          label="Crear primer producto"
          icon="pi pi-plus"
          className="border-round-3xl font-bold"
          onClick={onCreateClick}
        />
      )}
    </div>
  )
}

function ProductCard({ product, onEdit, onDelete, onAddToCart, quantityInCart, showActions, canEdit, canDelete, }: { product: Product; onEdit?: (p: Product) => void; onDelete?: (p: Product) => void; onAddToCart?: (p: Product) => void; quantityInCart?: number; showActions?: boolean; canEdit?: boolean; canDelete?: boolean }) {
  const [imgError, setImgError] = useState(false)

  const badgeClass = product.isAvailable ? 'text-xs font-semibold px-2 py-1 border-round-lg bg-green-100 text-green-700' : 'text-xs font-semibold px-2 py-1 border-round-lg bg-red-100 text-red-600'

  return (
    <div className="surface-card border-1 surface-border border-round-xl p-3 flex flex-column gap-3">
      <div className="border-round-lg overflow-hidden surface-100 flex align-items-center justify-content-center" style={{ height: '140px' }}>
        {product.imageUrl && !imgError ? (
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={() => setImgError(true)} />
        ) : (
          <span className="text-4xl">🛒</span>
        )}
      </div>

      <div className="flex flex-column gap-1">
        <span className="font-bold text-900 text-sm line-clamp-1">{product.name}</span>
        {product.categoryName && <span className="text-xs text-500">{product.categoryName}</span>}
      </div>

      <div className="flex justify-content-between align-items-center">
        <span className="text-primary font-bold text-base">{(product.price || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</span>
        <span className={badgeClass}>{product.isAvailable ? 'Disponible' : 'No disponible'}</span>
      </div>

      <div className="flex justify-content-between align-items-center gap-2 text-xs text-600">
        <span>{product.stock > 0 ? product.stock + ' en stock' : 'Agotado'}</span>
        {quantityInCart ? <span>{quantityInCart} en pedido</span> : null}
      </div>

      <div className="flex gap-2">
        {showActions && (
          <div className="flex gap-2">
            {canEdit && (
              <Button label="Editar" icon="pi pi-pencil" severity="secondary" outlined size="small" className="flex-1 border-round-lg font-semibold" onClick={() => onEdit && onEdit(product)} />
            )}
            {canDelete && (
              <Button icon="pi pi-trash" severity="danger" outlined size="small" className="border-round-lg" onClick={() => onDelete && onDelete(product)} tooltip="Eliminar" tooltipOptions={{ position: 'top' }} />
            )}
          </div>
        )}

        {!showActions && onAddToCart && (
          <Button label={quantityInCart ? ('Añadir de nuevo (' + quantityInCart + ')') : 'Agregar al pedido'} icon="pi pi-shopping-cart" severity="success" className="w-full border-round-lg" disabled={!product.isAvailable || product.stock === 0 || (quantityInCart || 0) >= product.stock} onClick={() => onAddToCart(product)} />
        )}
      </div>
    </div>
  )
}

export function ProductsPage() {
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [cartItems, setCartItems] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const userRole = currentUser?.role ?? 'user'
  const cartCount = useMemo(
    () => Object.values(cartItems).reduce((sum, value) => sum + value, 0),
    [cartItems]
  )
  const canCreate = canCreateProduct(userRole)
  const canEdit = canEditProduct(userRole)
  const canDelete = canDeleteProduct(userRole)
  const showActions = canEdit || canDelete

  const categoryOptions = useMemo(
    () => [
      { label: 'Todas las categorías', value: '' },
      ...categories.map((c) => ({ label: c.name, value: c.id })),
    ],
    [categories]
  )

  useEffect(() => {
    let mounted = true

    async function load() {
      setIsLoading(true)
      try {
        const userRes = await userService.getCurrentUser()
        if (mounted && userRes.success && userRes.user) {
          setCurrentUser(userRes.user)
        }

        if (typeof window !== 'undefined') {
          const cachedCart = window.localStorage.getItem('pedregal_cart')
          if (cachedCart) {
            try {
              setCartItems(JSON.parse(cachedCart))
            } catch {
              setCartItems({})
            }
          }
        }

        const [productsRes, categoriesRes] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
        ])

        if (mounted) {
          if (categoriesRes.success) {
            setCategories(categoriesRes.categories)
          }

          let adjustments: Record<string, number> = {}
          const cachedAdjustments = window.localStorage.getItem('pedregal_stock_adjustments')
          if (cachedAdjustments) {
            try {
              adjustments = JSON.parse(cachedAdjustments)
            } catch {}
          }

          if (productsRes.success) {
            const adjusted = (productsRes.products || []).map((p) => {
              const adj = adjustments[p.id] || 0
              return {
                ...p,
                stock: Math.max(0, p.stock - adj),
              }
            })
            setProducts(adjusted)
          } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: productsRes.message, life: 4000 })
            setProducts([])
          }
        }
      } catch {
        if (mounted) {
          toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos.', life: 4000 })
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    void load()
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = !categoryFilter || p.category === categoryFilter
      return matchSearch && matchCategory
    })
  }, [products, search, categoryFilter])

  function handleEdit(product: Product) {
    navigate(`/products/${product.id}/edit`)
  }

  function handleAddToCart(product: Product) {
    const currentQty = cartItems[product.id] ?? 0
    if (!product.isAvailable || product.stock === 0 || currentQty >= product.stock) {
      toast.current?.show({
        severity: 'warn',
        summary: 'No disponible',
        detail: 'No se puede agregar más de este producto al pedido.',
        life: 3000,
      })
      return
    }

    const nextCart = {
      ...cartItems,
      [product.id]: currentQty + 1,
    }
    setCartItems(nextCart)
    window.localStorage.setItem('pedregal_cart', JSON.stringify(nextCart))
    toast.current?.show({
      severity: 'success',
      summary: 'Agregado',
      detail: `${product.name} se agregó al pedido.`,
      life: 3000,
    })
  }

  function handleDelete(product: Product) {
    confirmDialog({
      message: `¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: async () => {
        const result = await productService.remove(product.id)
        if (result.success) {
          setProducts((prev) => prev.filter((p) => p.id !== product.id))
          toast.current?.show({ severity: 'success', summary: 'Eliminado', detail: result.message, life: 3000 })
        } else {
          toast.current?.show({ severity: 'error', summary: 'Error', detail: result.message, life: 4000 })
        }
      },
    })
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

      <main className="edit-profile-main">
        <Toast ref={toast} />
        <ConfirmDialog />

        <div className="edit-profile-layout">
          <div className="flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-900 m-0">Productos</h1>
              <p className="text-sm text-600 m-0 mt-1">
                {isLoading ? 'Cargando catálogo…' : `${products.length} producto${products.length !== 1 ? 's' : ''} en total`}
                {!isLoading && userRole === 'user' && cartCount > 0 && ` · ${cartCount} en tu pedido`}
              </p>
            </div>

            {canCreate && (
              <Button
                label="Nuevo producto"
                icon="pi pi-plus"
                className="border-round-3xl font-bold"
                onClick={() => navigate('/products/create')}
              />
            )}
          </div>

          {!isLoading && products.length > 0 && (
            <div className="flex gap-3 flex-wrap mb-4">
              <span className="p-input-icon-left flex-1" style={{ minWidth: '180px' }}>
                <i className="pi pi-search" />
                <InputText
                  placeholder="Buscar por nombre…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-round-xl"
                />
              </span>
              <Dropdown
                options={categoryOptions}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.value)}
                placeholder="Categoría"
                className="border-round-xl"
                style={{ minWidth: '180px' }}
              />
            </div>
          )}

          {isLoading ? (
            <div className="grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="col-12 sm:col-6 md:col-4 lg:col-3">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 && products.length === 0 ? (
            <EmptyState onCreateClick={() => navigate('/products/create')} canCreate={canCreate} />
          ) : filtered.length === 0 ? (
            <div className="flex flex-column align-items-center justify-content-center gap-3 py-8 text-center">
              <span className="text-4xl">🔍</span>
              <p className="text-sm text-600 m-0">Sin resultados para <strong>"{search || categoryFilter}"</strong></p>
              <Button
                label="Limpiar filtros"
                severity="secondary"
                outlined
                className="border-round-3xl"
                onClick={() => { setSearch(''); setCategoryFilter('') }}
              />
            </div>
          ) : (
            <div className="grid">
              {filtered.map((product) => (
                <div key={product.id} className="col-12 sm:col-6 md:col-4 lg:col-3">
                  <ProductCard
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onAddToCart={!showActions ? handleAddToCart : undefined}
                    quantityInCart={cartItems[product.id] ?? 0}
                    showActions={showActions}
                    canEdit={canEdit}
                    canDelete={canDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating banner/button for new order if cart count > 0 */}
        {!showActions && cartCount > 0 && (
          <div
            className="fixed bottom-0 right-0 m-4 p-3 border-round-xl shadow-6 flex align-items-center gap-3 z-5"
            style={{
              minWidth: '300px',
              background: 'linear-gradient(135deg, #1e446c 0%, #1a3f66 100%)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex flex-column flex-1">
              <span className="font-bold text-sm">Pedido en curso</span>
              <span className="text-xs text-200">{cartCount} producto{cartCount !== 1 ? 's' : ''} seleccionado{cartCount !== 1 ? 's' : ''}</span>
            </div>
            <Button
              label="Crear Pedido"
              icon="pi pi-arrow-right"
              severity="success"
              className="border-round-lg font-bold text-xs"
              onClick={() => navigate('/orders/new')}
            />
          </div>
        )}
      </main>
    </div>
  )
}
