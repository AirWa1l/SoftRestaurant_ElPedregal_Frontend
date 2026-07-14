import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { ProductEditForm } from '../components/products/edit/EditForm'
import type { CurrentUser } from '../types/profile'
import { Button } from 'primereact/button'
import { userService } from '../services/userService'
import { canEditProduct } from '../utils/roles'

export function ProductEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)

  useEffect(() => {
    let mounted = true

    userService.getCurrentUser().then((res) => {
      if (!mounted) return

      if (res.success && res.user) {
        setCurrentUser(res.user)
        if (!canEditProduct(res.user.role)) {
          navigate('/products')
        }
      } else {
        navigate('/login')
      }

      setIsCheckingAccess(false)
    })

    return () => { mounted = false }
  }, [navigate])

  if (!id) {
    navigate('/products')
    return null
  }

  if (isCheckingAccess) {
    return null
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <DashboardSidebarHeader userRole={currentUser?.role ?? 'user'} />
        <DashboardSidebarFooter
          currentUser={currentUser}
          onGoToEditProfile={() => navigate('/edit-profile')}
        />
      </aside>

      <main className="edit-profile-main">
        <div className="edit-profile-layout">
          <div className="flex align-items-center gap-2 mb-4">
            <Button
              icon="pi pi-arrow-left"
              severity="secondary"
              text
              rounded
              onClick={() => navigate('/products')}
            />
            <h1 className="text-2xl font-bold text-900 m-0">Editar producto</h1>
          </div>

          <section className="edit-profile-card">
            <ProductEditForm
              productId={id}
              onSuccess={() => navigate('/products')}
              onCancel={() => navigate('/products')}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
