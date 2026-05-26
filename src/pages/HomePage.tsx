import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { siteContent } from '../data/siteContent'

export function HomePage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main>
        <section className="hero" id="inicio">
          <div>
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <h1>{siteContent.hero.title}</h1>
            <p className="hero-copy">{siteContent.hero.copy}</p>

            <div className="hero-actions" id="reservas">
              <a className="button button--primary" href="#menu">
                {siteContent.hero.primaryAction}
              </a>
              <a className="button button--secondary" href="#contacto">
                {siteContent.hero.secondaryAction}
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Datos clave del restaurante">
            {siteContent.details.map((detail) => (
              <div key={detail.label}>
                <p className="hero-panel__label">{detail.label}</p>
                <p className="hero-panel__value">{detail.value}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="section-block" id="menu" aria-labelledby="highlights-title">
          <h2 className="section-title" id="highlights-title">
            Base de estructura para el sitio
          </h2>
          <p className="section-copy">
            La organización ya queda preparada para que después agregues menú, galería,
            reservas, sucursales o cualquier otra página.
          </p>

          <div className="card-grid">
            {siteContent.highlights.map((highlight) => (
              <article className="info-card" key={highlight.title}>
                <h3 className="info-card__title">{highlight.title}</h3>
                <p className="info-card__text">{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}