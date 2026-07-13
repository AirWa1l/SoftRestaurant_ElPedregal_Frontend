import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { userService } from '../../services/userService'
import { useEffect, useState } from 'react'

interface Props {
  cartCount?: number
}

export function CustomerNavbar({ cartCount = 0 }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeCartCount, setActiveCartCount] = useState(cartCount)

  // Listen to localstorage or parameter updates for cart
  useEffect(() => {
    if (cartCount > 0) {
      setActiveCartCount(cartCount)
      return
    }

    const updateCart = () => {
      if (typeof window !== 'undefined') {
        const cachedCart = window.localStorage.getItem('pedregal_cart')
        if (cachedCart) {
          try {
            const cartItems = JSON.parse(cachedCart)
            const count = Object.values(cartItems).reduce((sum: number, val: any) => sum + (Number(val) || 0), 0) as number
            setActiveCartCount(count)
          } catch {
            setActiveCartCount(0)
          }
        } else {
          setActiveCartCount(0)
        }
      }
    }

    updateCart()
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pedregal_cart') {
        updateCart()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('pedregal_cart_update', updateCart)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('pedregal_cart_update', updateCart)
    }
  }, [cartCount])

  async function handleLogout() {
    await userService.logout()
    navigate('/')
  }

  const isLinkActive = (path: string) => location.pathname === path

  return (
    <header className="customer-header">
      <div className="customer-header__container flex align-items-center justify-content-between">
        <div className="flex align-items-center gap-5">
          <Link to="/products" className="customer-brand no-underline">
            <span className="customer-brand__name">El Pedregal</span>
          </Link>

          <nav className="customer-nav flex align-items-center gap-4">
            <Link
              to="/products"
              className={`customer-nav__link no-underline ${isLinkActive('/products') ? 'active' : ''}`}
            >
              Menú
            </Link>
            <Link
              to="/orders"
              className={`customer-nav__link no-underline ${isLinkActive('/orders') ? 'active' : ''}`}
            >
              Mis pedidos
            </Link>
            <Link
              to="/edit-profile"
              className={`customer-nav__link no-underline ${isLinkActive('/edit-profile') ? 'active' : ''}`}
            >
              Mi cuenta
            </Link>
          </nav>
        </div>

        <div className="flex align-items-center gap-3">
          {activeCartCount > 0 && (
            <Button
              label={`Carrito (${activeCartCount})`}
              icon="pi pi-shopping-cart"
              className="customer-cart-btn border-round-3xl py-2 px-3 text-sm font-semibold"
              onClick={() => navigate('/orders/new')}
            />
          )}

          {isLinkActive('/edit-profile') ? (
            <Button
              label="Cerrar sesión"
              icon="pi pi-sign-out"
              outlined
              className="customer-logout-btn border-round-3xl py-2 px-3 text-sm font-semibold"
              onClick={handleLogout}
            />
          ) : (
            <Button
              label="Mi cuenta"
              className="customer-account-btn border-round-3xl py-2 px-3 text-sm font-semibold"
              onClick={() => navigate('/edit-profile')}
            />
          )}
        </div>
      </div>
    </header>
  )
}
