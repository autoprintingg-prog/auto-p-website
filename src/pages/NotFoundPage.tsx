import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { useSiteContent } from '../hooks/useSiteContent'

export function NotFoundPage() {
  const { siteName, whatsappUrl } = useSiteContent()

  return (
    <div className="page-shell">
      <section className="section not-found-section">
        <Reveal>
          <div className="glass-card not-found-card">
            <span className="eyebrow">404</span>
            <h1>This page is not part of the {siteName} route map.</h1>
            <p className="lead">
              The link may be outdated or incomplete. You can head back to the main site or jump
              directly into the WhatsApp entry point.
            </p>
            <div className="hero-actions">
              <Button size="lg" to="/">
                Return Home
              </Button>
              <Button external href={whatsappUrl} size="lg" variant="secondary">
                Start on WhatsApp
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
