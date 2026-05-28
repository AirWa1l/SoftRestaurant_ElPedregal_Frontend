import { SiteHeader } from '../components/layout/SiteHeader'
import { SiteFooter } from '../components/layout/SiteFooter'
import { RegisterForm } from '../components/register/RegisterForm'

export function RegisterPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main>
        <section className="section-block" style={{ paddingTop: '36px', paddingBottom: '36px' }}>
          <RegisterForm />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
