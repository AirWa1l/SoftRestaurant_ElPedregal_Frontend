import { Button } from 'primereact/button'
import { siteContent } from '../../data/siteContent'
import { LogoutButton } from './LogoutButton'

export function DashboardSidebarFooter() {
  const { dashboardUser } = siteContent

  return (
    <footer className="dashboard-sidebar__footer" id="contacto">
      <div className="dashboard-user-card">
        <div className="dashboard-user">
          <div className="dashboard-user__avatar">{dashboardUser.initials}</div>
          <div>
            <p className="dashboard-user__name">{dashboardUser.name}</p>
            <p className="dashboard-user__role">{dashboardUser.role}</p>
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
        />
      </div>

      <LogoutButton />
    </footer>
  )
}