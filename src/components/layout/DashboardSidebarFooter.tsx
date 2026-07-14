import { Button } from 'primereact/button'
import { LogoutButton } from './LogoutButton'
import type { CurrentUser } from '../../types/profile'
import { ROLE_LABELS } from '../../utils/roles'

interface Props {
  currentUser: CurrentUser | null
  onGoToEditProfile: () => void
}

export function DashboardSidebarFooter({ currentUser, onGoToEditProfile }: Props) {
  const userInitials = currentUser?.initials ?? '--'
  const userName = currentUser?.name ?? 'Cargando usuario...'
  const userRole = currentUser ? ROLE_LABELS[currentUser.role] : 'Sin rol'

  return (
    <footer className="dashboard-sidebar__footer" id="contacto">
      <div className="dashboard-user-card">
        <div className="dashboard-user">
          <div className="dashboard-user__avatar">{userInitials}</div>
          <div>
            <p className="dashboard-user__name">{userName}</p>
            <p className="dashboard-user__role">{userRole}</p>
          </div>
        </div>

        <Button
          type="button"
          icon="pi pi-cog"
          rounded
          text
          severity="secondary"
          aria-label="Editar perfil"
          className="dashboard-profile-button"
          onClick={onGoToEditProfile}
        />
      </div>

      <LogoutButton />
    </footer>
  )
}