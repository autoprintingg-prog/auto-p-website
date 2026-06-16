import {
  CheckCircle2,
  CreditCard,
  Mail,
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
    label: 'Email intake',
    icon: Mail,
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
  const { featureList, homeHero, useCases, whatsappUrl, workflowPreview } =
    useSiteContent()

  return (
    <div className="page-shell">
      <section className="section hero-section">
        <div className="hero-grid hero-grid-refined">
          <Reveal className="hero-copy hero-copy-shell glass-card">
            <span className="eyebrow">{homeHero.eyebrow}</span>
            <h1>Send a document.<br />Get it printed.</h1>
            <p className="lead">AutoPrinting turns <strong>WhatsApp</strong> or <strong>Email</strong> into a print intake workflow. Send a file to <a href="mailto:autoprintingg@gmail.com" className="hero-email-inline">autoprintingg@gmail.com</a>, choose print settings, pay through Cashfree, and move straight into the queue.</p>

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
                <MessageSquareText size={17} />
                {homeHero.primaryCtaLabel}
              </Button>
              <Button
                size="lg"
                href="mailto:autoprintingg@gmail.com?subject=Print%20Request&body=Hi%2C%20I%20want%20to%20print%20a%20document.%20Please%20find%20the%20attachment."
                variant="secondary"
                className="hero-email-btn"
              >
                <Mail size={17} />
                Email a Document
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
              <div className="hero-strip-card hero-strip-card--email">
                <Mail size={18} />
                <span>autoprintingg@gmail.com</span>
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

      <section className="section section-tinted">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="A product flow that keeps print requests simple"
            description="Send via WhatsApp or Email. Choose settings. Pay via Cashfree. Done. Both channels are fully automated."
          />
        </Reveal>

        <div className="step-grid">
          {workflowPreview.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Card className="step-card">
                <div className="step-card-top">
                  <span className="step-number">0{index + 1}</span>
                  <item.icon size={22} style={{ color: 'var(--primary)' }} />
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
            eyebrow="Use Cases"
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
          <div className="glass-card cta-banner">
            <div>
              <span className="eyebrow">Start your print request</span>
              <h2>Send a document. Pay online. Pick up your prints.</h2>
              <p>
                Order via WhatsApp or email your document to <strong>autoprintingg@gmail.com</strong>.
                Both channels are fully automated — no counter, no phone call, no app download needed.
              </p>
            </div>
            <div className="cta-actions">
              <Button external href={whatsappUrl} size="lg">
                Start on WhatsApp
              </Button>
              <Button
                size="lg"
                href="mailto:autoprintingg@gmail.com?subject=Print%20Request&body=Hi%2C%20I%20would%20like%20to%20print%20a%20document.%20Please%20find%20the%20attachment."
                variant="secondary"
              >
                <Mail size={16} />
                Email a Document
              </Button>
              <Button size="lg" to="/contact" variant="ghost">
                Contact the team
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
