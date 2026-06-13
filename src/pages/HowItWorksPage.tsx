import { CheckCircle2, CreditCard, FileCheck2, Mail, Printer, SlidersHorizontal, Workflow } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { WhatsAppMockup } from '../components/WhatsAppMockup'
import { useSiteContent } from '../hooks/useSiteContent'

const automationNotes = [
  {
    title: 'Dual-channel intake',
    description: 'Customers send files via WhatsApp chat or by emailing autoprintingg@gmail.com. Both channels are processed by the same automation engine.',
    icon: FileCheck2,
  },
  {
    title: 'Payment before print',
    description: 'Cashfree confirms payment before the print job is queued. No exceptions — the document only prints after the transaction succeeds.',
    icon: CreditCard,
  },
  {
    title: 'Automatic queue handoff',
    description: 'Successful payments trigger an automatic queue entry. No manual re-entry at the printer desk required.',
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
            eyebrow="6-Step Process"
            title="WhatsApp and Email — same steps, different entry points"
            description="Both channels follow the same core flow: send a file, choose settings, pay via Cashfree, and the job is queued for printing automatically."
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
            eyebrow="Channels"
            title="WhatsApp — conversational, instant, guided"
            description="Send a file to our WhatsApp number. The chatbot walks you through color, duplex, copies, and payment. Everything happens in the chat."
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
                  <span>Print settings confirmed before any payment is requested</span>
                </div>
                <div className="summary-row">
                  <CheckCircle2 size={18} />
                  <span>Payment completes before the request enters the queue</span>
                </div>
                <div className="summary-row">
                  <Printer size={18} />
                  <span>Works via WhatsApp chat or email to autoprintingg@gmail.com</span>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Email Channel"
            title="Email — send a doc, get a confirmation link"
            description="Email your document to autoprintingg@gmail.com. The system picks it up automatically, processes the file, and emails you a secure link to confirm settings and pay."
          />
        </Reveal>

        <div className="step-grid">
          {[
            { num: '01', title: 'Email the document', desc: 'Send your PDF, Word, PowerPoint, or image as an attachment to autoprintingg@gmail.com.' },
            { num: '02', title: 'System processes the file', desc: 'AutoPrinting validates the format, counts pages, and converts files to print-ready PDF.' },
            { num: '03', title: 'Confirmation link sent', desc: 'You receive an email with a secure link. Open it to review the file and choose print settings.' },
            { num: '04', title: 'Choose settings & pay', desc: 'Select color, duplex, copies. The price is calculated live. Click Pay Now to go to Cashfree.' },
            { num: '05', title: 'Payment confirmed', desc: 'Cashfree confirms payment and the job is queued for printing automatically.' },
            { num: '06', title: 'Completion email sent', desc: 'You receive an email: your prints are ready for collection.' },
          ].map((step) => (
            <Reveal key={step.num}>
              <Card className="step-card">
                <div className="step-card-top">
                  <span className="step-number">{step.num}</span>
                  <Mail size={20} style={{ color: '#818cf8' }} />
                </div>
                <div className="step-card-body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass-card" style={{ padding: '28px 32px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div>
              <span className="eyebrow">Email Channel</span>
              <h3 style={{ margin: '8px 0 4px' }}>Ready to try email ordering?</h3>
              <p style={{ margin: 0, color: 'var(--text-soft)' }}>Attach your document and send it now.</p>
            </div>
            <Button
              href="mailto:autoprintingg@gmail.com?subject=Print%20Request&body=Hi%2C%20I%20would%20like%20to%20print%20a%20document.%20Please%20find%20the%20attachment."
              size="lg"
              variant="secondary"
            >
              <Mail size={16} />
              Email autoprintingg@gmail.com
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Supported Files"
            title="Every common document format is supported"
            description="The system accepts PDF, Word, PowerPoint, and image files so users can send notes, reports, slides, diagrams, and photos from the same entry point."
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
