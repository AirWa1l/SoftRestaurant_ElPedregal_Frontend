import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Skeleton } from 'primereact/skeleton'
import { useNavigate } from 'react-router-dom'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import type { CurrentUser } from '../types/profile'
import { userService } from '../services/userService'
import type { Product } from '../types/product'
import { productService } from '../services/productService'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_OPTIONS = [
  { label: 'Todas las categorías', value: '' },
  { label: 'Bebidas', value: 'bebidas' },
  { label: 'Carnes', value: 'carnes' },
  { label: 'Lácteos', value: 'lacteos' },
  { label: 'Panadería', value: 'panaderia' },
  { label: 'Frutas y Verduras', value: 'frutas_verduras' },
  { label: 'Snacks', value: 'snacks' },
  { label: 'Aseo y Limpieza', value: 'aseo' },
  { label: 'Otros', value: 'otros' },
]

// ─── Skeleton card ────────────────────────────────────────────────────────────

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

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
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
          Agrega tu primer producto al catálogo y empieza a gestionarlo desde aquí.
        </p>
      </div>
      <Button
        label="Crear primer producto"
        icon="pi pi-plus"
        className="border-round-3xl font-bold"
        onClick={onCreateClick}
      />
    </div>
  )
}

// ─── Product card ─────────────────────────────────────────────────────────────

function ProductCard({ product, onEdit, onDelete }: {
  product: Product
  onEdit: (p: Product) => void
  onDelete: (p: Product) => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="surface-card border-1 surface-border border-round-xl p-3 flex flex-column gap-3">
      {/* Image */}
      <div
        className="border-round-lg overflow-hidden surface-100 flex align-items-center justify-content-center"
        style={{ height: '140px' }}
      >
        {product.imageUrl && !imgError ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-4xl">🛒</span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-column gap-1">
        <span className="font-bold text-900 text-sm line-clamp-1">{product.name}</span>
      </div>

      {/* Price & stock */}
      <div className="flex justify-content-between align-items-center">
        <span className="text-primary font-bold text-base">
          {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
        </span>
        <span className={`text-xs font-semibold px-2 py-1 border-round-lg ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
          {product.stock > 0 ? `${product.stock} unid.` : 'Agotado'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          label="Editar"
          icon="pi pi-pencil"
          severity="secondary"
          outlined
          size="small"
          className="flex-1 border-round-lg font-semibold"
          onClick={() => onEdit(product)}
        />
        <Button
          icon="pi pi-trash"
          severity="danger"
          outlined
          size="small"
          className="border-round-lg"
          onClick={() => onDelete(product)}
          tooltip="Eliminar"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProductsPage() {
  const navigate = useNavigate()
  const toast = useRef<any>(null)

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  // Load user & products
  useEffect(() => {
    let mounted = true

    async function load() {
      setIsLoading(true)
      try {
        const userRes = await userService.getCurrentUser()
        if (mounted && userRes.success && userRes.user) {
          setCurrentUser(userRes.user)
        }

        const res = await productService.getAll()
        if (mounted) {
          if (res.success) {
            setProducts(res.products || [])
          } else {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: res.message, life: 4000 })
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

  // Filter
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

  function handleDelete(product: Product) {
    // TODO: wire up DeleteProductDialog
    toast.current?.show({ severity: 'warn', summary: 'Eliminar', detail: `Función próximamente: ${product.name}`, life: 3000 })
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

        <div className="edit-profile-layout">
          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="flex align-items-start justify-content-between flex-wrap gap-3 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-900 m-0">Productos</h1>
              <p className="text-sm text-600 m-0 mt-1">
                {isLoading ? 'Cargando catálogo…' : `${products.length} producto${products.length !== 1 ? 's' : ''} en total`}
              </p>
            </div>

            <Button
              label="Nuevo producto"
              icon="pi pi-plus"
              className="border-round-3xl font-bold"
              onClick={() => navigate('/products/create')}
            />
          </div>

          {/* ── Filters ─────────────────────────────────────────────────── */}
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
                options={CATEGORY_OPTIONS}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.value)}
                placeholder="Categoría"
                className="border-round-xl"
                style={{ minWidth: '180px' }}
              />
            </div>
          )}

          {/* ── Grid ────────────────────────────────────────────────────── */}
          {isLoading ? (
            <div className="grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="col-12 sm:col-6 md:col-4 lg:col-3">
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 && products.length === 0 ? (
            <EmptyState onCreateClick={() => navigate('/products/create')} />
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
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}