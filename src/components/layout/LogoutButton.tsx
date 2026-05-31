import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

export function LogoutButton() {
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/')
  }

  return (
    <Button
      type="button"
      label="Cerrar sesión"
      icon="pi pi-sign-out"
      iconPos="right"
      outlined
      className="dashboard-logout-button p-button-sm p-button-rounded"
      onClick={handleLogout}
    />
  )
}