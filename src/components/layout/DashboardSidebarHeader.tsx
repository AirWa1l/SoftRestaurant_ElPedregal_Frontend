import { Link } from 'react-router-dom'
import { siteContent } from '../../data/siteContent'

export function DashboardSidebarHeader() {
  return (
    <header className="dashboard-sidebar__header">
      <Link className="dashboard-brand" to="/home" aria-label={siteContent.brand}>
        <span className="dashboard-brand__name">{siteContent.brand}</span>
        <span className="dashboard-brand__tagline">{siteContent.tagline}</span>
      </Link>

      <nav className="dashboard-nav" aria-label="Navegación principal">
        {siteContent.navigation.map((link) => (
          <a key={link.label} href={link.href} className="dashboard-nav__link">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}