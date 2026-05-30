import { Link } from 'react-router-dom'
import { siteContent } from '../../data/siteContent'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label={siteContent.brand}>
        <span className="brand__name">{siteContent.brand}</span>
        <span className="brand__tagline">{siteContent.tagline}</span>
      </Link>

      <nav className="site-nav" aria-label="Navegación principal">
        {siteContent.navigation.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <Link to="/register">Registro</Link>
      </nav>
    </header>
  )
}