import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { userService } from '../../services/userService'

export function LogoutButton() {
  const navigate = useNavigate()

  async function handleLogout() {
    await userService.logout()
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