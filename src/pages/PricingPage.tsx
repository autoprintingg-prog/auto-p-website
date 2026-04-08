import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { FAQAccordion } from '../components/FAQAccordion'
import { PricingCalculator } from '../components/PricingCalculator'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useSiteContent } from '../hooks/useSiteContent'

const pricingSignals = [
  {
    label: 'Rate source',
    value: 'Configured by print desk',
  },
  {
    label: 'Formula',
    value: 'Pages x rate x copies',
  },
  {
    label: 'Queue trigger',
    value: 'After payment confirmation',
  },
]

const pricingNotes = [
  'No fake rates are shown on the website.',
  'Users still get a clear pricing formula before payment.',
  'B&W and Color use the same transparent billing logic.',
]

export function PricingPage() {
  const { pricingComparison, pricingFaqs, pricingIntro, whatsappUrl } = useSiteContent()

  return (
    <div className="page-shell">
      <section className="section page-intro">
        <div className="two-column-grid page-hero-grid">
          <Reveal>
            <div className="page-hero-copy">
              <span className="eyebrow">{pricingIntro.eyebrow}</span>
              <h1>{pricingIntro.title}</h1>
              <p className="lead">{pricingIntro.lead}</p>
              <div className="page-hero-chip-row">
                {pricingNotes.map((item) => (
                  <span key={item} className="page-hero-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="page-hero-card">
              <span className="plan-label">Pricing Snapshot</span>
              <div className="page-hero-card-grid">
                {pricingSignals.map((item) => (
                  <div key={item.label} className="page-hero-card-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <div className="page-hero-card-bottom">
                <p>
                  The public website explains the logic. The actual amount comes from the live rate
                  configured in the deployment.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Comparison Table"
            title="B&W and Color follow the same clear calculation model"
            description="Both modes use the same pricing structure. The difference is the configured per-page rate entered by the operator or print center."
          />
        </Reveal>

        <Reveal>
          <div className="glass-card table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>B&W</th>
                  <th>Color</th>
                </tr>
              </thead>
              <tbody>
                {pricingComparison.map((row) => (
                  <tr key={row.label}>
                    <td data-label="Category">{row.label}</td>
                    <td data-label="B&W">{row.bw}</td>
                    <td data-label="Color">{row.color}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="section two-column-section">
        <div className="two-column-grid calculator-layout">
          <Reveal>
            <div className="calculator-copy">
              <SectionHeading
                eyebrow="Calculator"
                title="Estimate totals using your actual print rate"
                description="Enter the page count, copies, and the rate used in your deployment. The calculator follows the workflow pricing model exactly."
              />
              <Card className="pricing-side-card">
                <div className="summary-row">
                  <span className="summary-dot"></span>
                  <span>Designed to keep pricing honest instead of hardcoding guessed values.</span>
                </div>
                <div className="summary-row">
                  <span className="summary-dot"></span>
                  <span>Useful for both demo explanations and real operator-configured flows.</span>
                </div>
                <div className="summary-row">
                  <span className="summary-dot"></span>
                  <span>Users understand the cost logic before they reach Cashfree payment.</span>
                </div>
              </Card>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <PricingCalculator />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions users will ask before they pay"
            description="These answers keep the pricing page honest, clear, and aligned with the actual operating model of the workflow."
          />
        </Reveal>
        <Reveal>
          <FAQAccordion items={pricingFaqs} />
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <div className="glass-card cta-banner">
            <div>
              <span className="eyebrow">Start the request</span>
              <h2>Use the same formula in the real flow after sending the file in WhatsApp.</h2>
              <p>
                Once the document is submitted and the preferences are chosen, AutoPrint can move the
                request toward Cashfree payment and queueing.
              </p>
            </div>
            <div className="cta-actions">
              <Button external href={whatsappUrl} size="lg">
                Start Printing on WhatsApp
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
