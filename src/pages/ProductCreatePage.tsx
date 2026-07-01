import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardSidebarHeader } from '../components/layout/DashboardSidebarHeader'
import { DashboardSidebarFooter } from '../components/layout/DashboardSidebarFooter'
import { ProductForm } from '../components/products/register/RegisterForm'
import type { CurrentUser } from '../types/profile'
import { Button } from 'primereact/button'
import { userService } from '../services/userService'
import { canCreateProduct } from '../utils/roles'

export function ProductCreatePage() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)

  useEffect(() => {
    let mounted = true

    userService.getCurrentUser().then((res) => {
      if (!mounted) return

      if (res.success && res.user) {
        setCurrentUser(res.user)
        if (!canCreateProduct(res.user.role)) {
          navigate('/products')
        }
      } else {
        navigate('/')
      }

      setIsCheckingAccess(false)
    })

    return () => { mounted = false }
  }, [navigate])

  if (isCheckingAccess) {
    return null
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
        <div className="edit-profile-layout">
          <div className="flex align-items-center gap-2 mb-4">
            <Button
              icon="pi pi-arrow-left"
              severity="secondary"
              text
              rounded
              onClick={() => navigate('/products')}
            />
            <h1 className="text-2xl font-bold text-900 m-0">Nuevo producto</h1>
          </div>

          <section className="edit-profile-card">
            <ProductForm
              onSuccess={() => navigate('/products')}
              onCancel={() => navigate('/products')}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
