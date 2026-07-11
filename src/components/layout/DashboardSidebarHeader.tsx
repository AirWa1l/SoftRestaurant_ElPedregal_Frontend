import { Link } from 'react-router-dom'
import { siteContent } from '../../data/siteContent'
import type { UserRole } from '../../utils/roles'

type Props = {
  userRole: UserRole
}

export function DashboardSidebarHeader({ userRole }: Props) {
  const visibleLinks = siteContent.navigation.filter(
    (link) => !link.roles || link.roles.includes(userRole)
  )

  return (
    <header className="dashboard-sidebar__header">
      <Link className="dashboard-brand" to="/home" aria-label={siteContent.brand}>
        <span className="dashboard-brand__name">{siteContent.brand}</span>
        <span className="dashboard-brand__tagline">{siteContent.tagline}</span>
      </Link>

      <nav className="dashboard-nav" aria-label="Navegación principal">
        {visibleLinks.map((link) => (
          <Link key={link.label} to={link.href} className="dashboard-nav__link">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}