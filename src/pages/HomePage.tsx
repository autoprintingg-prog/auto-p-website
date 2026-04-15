import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MessageSquareText,
  Printer,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { HeroVisual } from '../components/HeroVisual'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useSiteContent } from '../hooks/useSiteContent'

const heroHighlights = [
  'Send the file in WhatsApp',
  'Choose print settings in flow',
  'Pay securely through Cashfree',
  'Move directly into print queue',
]

const heroMobileFlow = [
  {
    label: 'WhatsApp intake',
    icon: MessageSquareText,
  },
  {
    label: 'Cashfree payment',
    icon: CreditCard,
  },
  {
    label: 'Auto queue',
    icon: Printer,
  },
]

export function HomePage() {
  const { featureList, homeHero, supportedFormats, useCases, whatsappUrl, workflowPreview } =
    useSiteContent()

  return (
    <div className="page-shell">
      <section className="section hero-section">
        <div className="hero-grid hero-grid-refined">
          <Reveal className="hero-copy hero-copy-shell glass-card">
            <span className="eyebrow">{homeHero.eyebrow}</span>
            <h1>{homeHero.title}</h1>
            <p className="lead">{homeHero.lead}</p>

            <div className="hero-mobile-flow">
              <div className="hero-mobile-flow-top">
                <span className="hero-mobile-flow-label">Workflow</span>
                <span className="hero-mobile-flow-status">
                  <CheckCircle2 size={14} />
                  Ready
                </span>
              </div>
              <div className="hero-mobile-flow-grid">
                {heroMobileFlow.map((item) => (
                  <div key={item.label} className="hero-mobile-flow-item">
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-actions">
              <Button external href={whatsappUrl} size="lg">
                {homeHero.primaryCtaLabel}
              </Button>
              <Button size="lg" to="/how-it-works" variant="ghost">
                {homeHero.secondaryCtaLabel}
              </Button>
            </div>

            <div className="hero-strip">
              <div className="hero-strip-card">
                <CheckCircle2 size={18} />
                <span>Supports PDF, DOCX, PPTX, JPG, and PNG</span>
              </div>
              <div className="hero-strip-card">
                <ShieldCheck size={18} />
                <span>Cashfree payment handoff before queue entry</span>
              </div>
            </div>

            <div className="hero-proof-grid">
              {heroHighlights.map((item) => (
                <div key={item} className="hero-proof-card">
                  <CheckCircle2 size={16} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-value">5+</span>
                <span className="stat-label">File Formats</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">&lt;60s</span>
                <span className="stat-label">To Queue</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-label">Digital Flow</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">0</span>
                <span className="stat-label">App Downloads</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="hero-visual-column" delay={0.12}>
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="A product flow that keeps print requests simple"
            description="The website introduces the user journey clearly, while the automation layer handles validation, payment confirmation, and queue handoff behind the scenes."
          />
        </Reveal>

        <div className="step-grid">
          {workflowPreview.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Card className="step-card">
                <div className="step-card-top">
                  <span className="step-number">0{index + 1}</span>
                  <item.icon size={20} />
                </div>
                <div className="step-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            title="Designed like a product, not just a print form"
            description="AutoPrint reduces counter-side friction by collecting the right decisions in a familiar messaging interface before the request reaches the print process."
          />
        </Reveal>

        <div className="feature-grid">
          {featureList.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.04}>
              <Card className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={18} />
                </div>
                <div className="feature-card-body">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Where It Fits"
            title="Built for real document intake environments"
            description="AutoPrint can be framed as a startup-style workflow product because the problem is practical, repeatable, and relevant anywhere print requests need cleaner intake."
          />
        </Reveal>

        <div className="use-case-grid">
          {useCases.map((useCase, index) => (
            <Reveal key={useCase.title} delay={index * 0.05}>
              <Card className="use-case-card">
                <span className="plan-label">Use Case</span>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing Preview"
            title="Transparent formulas instead of invented rates"
            description="AutoPrint is designed to work with operator-configured print charges, so this site explains the billing logic without publishing numbers that may not match the deployment."
          />
        </Reveal>

        <div className="pricing-preview-grid">
          <Reveal>
            <Card className="pricing-card">
              <span className="plan-label">B&W Printing</span>
              <h3>Pages x B&W rate x Copies</h3>
              <p>
                Use the calculator on the pricing page with the black and white rate configured by the
                connected print desk.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="pricing-card">
              <span className="plan-label">Color Printing</span>
              <h3>Pages x Color rate x Copies</h3>
              <p>
                Estimate color jobs using the same formula while keeping the rate explicit and
                deployment-specific.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={0.16}>
            <Card className="pricing-card pricing-card-highlight">
              <span className="plan-label">Why This Matters</span>
              <h3>Clear pricing logic for real deployments</h3>
              <p>
                The website stays honest: it explains how totals are produced, while the live system
                uses the actual rates maintained by the print center.
              </p>
              <Button className="inline-button" to="/pricing" variant="ghost">
                Explore pricing <ArrowRight size={16} />
              </Button>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <div className="glass-card cta-banner">
            <div>
              <span className="eyebrow">Ready to try the flow?</span>
              <h2>Turn a simple WhatsApp message into a full print-ready request.</h2>
              <p>
                Open WhatsApp, send the document, choose the print settings, and move through payment
                in a workflow that feels clear, fast, and product-ready.
              </p>
            </div>
            <div className="cta-actions">
              <Button external href={whatsappUrl} size="lg">
                Start Printing on WhatsApp
              </Button>
              <Button size="lg" to="/contact" variant="secondary">
                Contact the team
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
