import { CheckCircle2, CreditCard, FileCheck2, Printer, SlidersHorizontal, Workflow } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { WhatsAppMockup } from '../components/WhatsAppMockup'
import { useSiteContent } from '../hooks/useSiteContent'

const automationNotes = [
  {
    title: 'File intake',
    description: 'The user begins from WhatsApp, which keeps the entry point familiar and low friction.',
    icon: FileCheck2,
  },
  {
    title: 'Payment confirmation',
    description: 'Cashfree confirms the transaction before the print automation proceeds.',
    icon: CreditCard,
  },
  {
    title: 'Queue handoff',
    description: 'Successful requests move into the print process without repeating the same information manually.',
    icon: Workflow,
  },
]

export function HowItWorksPage() {
  const { howItWorksIntro, supportedFormats, timelineSteps, whatsappUrl } = useSiteContent()

  return (
    <div className="page-shell">
      <section className="section page-intro">
        <Reveal>
          <span className="eyebrow">{howItWorksIntro.eyebrow}</span>
          <h1>{howItWorksIntro.title}</h1>
          <p className="lead">{howItWorksIntro.lead}</p>
          <div className="hero-actions">
            <Button external href={whatsappUrl} size="lg">
              Start on WhatsApp
            </Button>
            <Button size="lg" to="/pricing" variant="ghost">
              View pricing logic
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="6-Step Timeline"
            title="Each step exists to keep the print process clear and reliable"
            description="The website is the explanation layer. The actual automation, file handling, and print execution are handled by the AutoPrint workflow system."
          />
        </Reveal>

        <div className="timeline">
          {timelineSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <div className="timeline-item">
                <div className="timeline-rail">
                  <span className="timeline-marker">0{index + 1}</span>
                  {index < timelineSteps.length - 1 ? <span className="timeline-line"></span> : null}
                </div>
                <Card className="timeline-card">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section two-column-section">
        <Reveal>
          <SectionHeading
            eyebrow="Conversation Demo"
            title="The WhatsApp UI keeps the workflow understandable"
            description="Users do not need to learn a new app. The chat flow makes configuration, payment, and print status easier to follow."
          />
        </Reveal>

        <div className="two-column-grid">
          <Reveal>
            <WhatsAppMockup variant="detailed" />
          </Reveal>

          <div className="stack-grid">
            {automationNotes.map((note, index) => (
              <Reveal key={note.title} delay={index * 0.06}>
                <Card className="info-card">
                  <div className="feature-icon">
                    <note.icon size={18} />
                  </div>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                </Card>
              </Reveal>
            ))}

            <Reveal delay={0.18}>
              <Card className="info-card summary-card">
                <div className="summary-row">
                  <SlidersHorizontal size={18} />
                  <span>Print settings selected inside the flow</span>
                </div>
                <div className="summary-row">
                  <CheckCircle2 size={18} />
                  <span>Payment completes before the request enters the queue</span>
                </div>
                <div className="summary-row">
                  <Printer size={18} />
                  <span>The automation is designed for direct progression to print processing</span>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Supported Files"
            title="Formats prepared for print-oriented workflows"
            description="The system accepts both document and image formats so users can submit notes, reports, slides, diagrams, and visual assets from the same entry point."
          />
        </Reveal>

        <div className="format-grid">
          {supportedFormats.map((format, index) => (
            <Reveal key={format.name} delay={index * 0.05}>
              <Card className="format-card">
                <div className="feature-icon">
                  <format.icon size={18} />
                </div>
                <h3>{format.name}</h3>
                <p>{format.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
