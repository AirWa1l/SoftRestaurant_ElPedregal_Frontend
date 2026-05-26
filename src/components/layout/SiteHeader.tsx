import { siteContent } from '../../data/siteContent'

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label={siteContent.brand}>
        <span className="brand__name">{siteContent.brand}</span>
        <span className="brand__tagline">{siteContent.tagline}</span>
      </a>

      <nav className="site-nav" aria-label="Navegación principal">
        {siteContent.navigation.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}