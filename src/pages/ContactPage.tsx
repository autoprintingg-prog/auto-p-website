import { type FormEvent, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useSiteContent } from '../hooks/useSiteContent'
import { submitContactSubmission } from '../lib/contact-submissions'

const contactSignals = [
  {
    label: 'Fastest path',
    value: 'WhatsApp entry flow',
  },
  {
    label: 'Best for discussions',
    value: 'Email draft from the form',
  },
  {
    label: 'Best use case',
    value: 'Product walkthroughs and deployment context',
  },
]

type ContactFormState = {
  email: string
  institution: string
  message: string
  name: string
}

const initialState: ContactFormState = {
  name: '',
  email: '',
  institution: '',
  message: '',
}

export function ContactPage() {
  const { contactCards, contactIntro, emailComposeUrl, whatsappUrl } = useSiteContent()
  const [form, setForm] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState(
    'Submit your inquiry and we will review it from our internal dashboard.',
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setNotice('Name, email, and message are required.')
      return
    }

    setIsSubmitting(true)

    try {
      await submitContactSubmission(form)
      setForm(initialState)
      setNotice('Inquiry submitted successfully.')
    } catch {
      setNotice('Unable to submit now. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-shell">
      <section className="section page-intro">
        <div className="two-column-grid page-hero-grid">
          <Reveal>
            <div className="page-hero-copy">
              <span className="eyebrow">{contactIntro.eyebrow}</span>
              <h1>{contactIntro.title}</h1>
              <p className="lead">{contactIntro.lead}</p>
              <div className="hero-actions">
                <Button external href={whatsappUrl} size="lg">
                  Open WhatsApp
                </Button>
                <Button href={emailComposeUrl} size="lg" variant="ghost">
                  Draft Email
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="page-hero-card">
              <span className="plan-label">Contact Snapshot</span>
              <div className="page-hero-card-grid">
                {contactSignals.map((item) => (
                  <div key={item.label} className="page-hero-card-item">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
              <div className="page-hero-card-bottom">
                <p>
                  The form stays practical by preparing a real message draft instead of pretending to
                  submit to a backend that is not part of the public product website.
                </p>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="contact-card-grid">
          {contactCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05}>
              <Card className="contact-card">
                <div className="feature-icon">
                  <card.icon size={18} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                {card.title === 'WhatsApp Entry Point' ? (
                  <Button external href={whatsappUrl} variant="ghost">
                    Open WhatsApp
                  </Button>
                ) : null}
                {card.title === 'Email Draft' ? (
                  <Button href={emailComposeUrl} variant="ghost">
                    Draft Email
                  </Button>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="two-column-grid contact-layout">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Inquiry Form"
                title="Send your message securely"
                description="This form sends your inquiry directly to our backend database."
              />

              <Card className="contact-side-card">
                <h3>Best for</h3>
                <div className="summary-row">
                  <span className="summary-dot"></span>
                  <span>Product walkthroughs and workflow explanations</span>
                </div>
                <div className="summary-row">
                  <span className="summary-dot"></span>
                  <span>Clarifying supported file formats and print options</span>
                </div>
                <div className="summary-row">
                  <span className="summary-dot"></span>
                  <span>Deployment context and implementation discussion around the system</span>
                </div>
              </Card>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="contact-form-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <label className="field">
                    <span>Name</span>
                    <input
                      onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Your name"
                      type="text"
                      value={form.name}
                    />
                  </label>

                  <label className="field">
                    <span>Email</span>
                    <input
                      onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                      placeholder="you@example.com"
                      type="email"
                      value={form.email}
                    />
                  </label>

                  <label className="field field-full">
                    <span>Institution or context</span>
                    <input
                      onChange={(event) =>
                        setForm((current) => ({ ...current, institution: event.target.value }))
                      }
                      placeholder="Organization, print desk, lab, or deployment context"
                      type="text"
                      value={form.institution}
                    />
                  </label>

                  <label className="field field-full">
                    <span>Message</span>
                    <textarea
                      onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                      placeholder="Tell the team what you want to discuss about AutoPrint."
                      rows={6}
                      value={form.message}
                    />
                  </label>
                </div>

                <div className="form-actions">
                  <Button disabled={isSubmitting} size="lg" type="submit">
                    {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
                  </Button>
                  <Button
                    className="secondary-action"
                    href={whatsappUrl}
                    size="lg"
                    variant="secondary"
                    external
                  >
                    Open WhatsApp
                  </Button>
                </div>

                <p className="form-notice">{notice}</p>
              </form>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
