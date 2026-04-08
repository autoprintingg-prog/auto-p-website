import { type FormEvent, useMemo, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useSiteContent } from '../hooks/useSiteContent'

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

function buildDraftBody(values: ContactFormState) {
  return [
    'AutoPrint inquiry',
    '',
    `Name: ${values.name || 'Not provided'}`,
    `Email: ${values.email || 'Not provided'}`,
    `Institution: ${values.institution || 'Not provided'}`,
    '',
    'Message:',
    values.message || 'No message entered.',
  ].join('\n')
}

export function ContactPage() {
  const { contactCards, contactIntro, emailComposeUrl, whatsappUrl } = useSiteContent()
  const [form, setForm] = useState(initialState)
  const [notice, setNotice] = useState(
    'The contact form drafts your message in your email or WhatsApp app so it stays useful even without a website backend.',
  )

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      form.name ? `AutoPrint inquiry from ${form.name}` : 'AutoPrint inquiry',
    )
    const body = encodeURIComponent(buildDraftBody(form))

    return `mailto:?subject=${subject}&body=${body}`
  }, [form])

  const whatsappHref = useMemo(() => {
    try {
      const nextUrl = new URL(whatsappUrl)
      nextUrl.searchParams.set('text', buildDraftBody(form))
      return nextUrl.toString()
    } catch {
      return whatsappUrl
    }
  }, [form, whatsappUrl])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = mailtoHref
    setNotice('Email draft opened in your default mail client.')
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
                title="Draft your message with real actions behind the buttons"
                description="This is a UI-based contact form. Instead of pretending to submit to a backend, it prepares a ready-to-send draft for email or WhatsApp."
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
                  <Button size="lg" type="submit">
                    Draft Inquiry Email
                  </Button>
                  <Button
                    className="secondary-action"
                    href={whatsappHref}
                    size="lg"
                    variant="secondary"
                    external
                  >
                    Send via WhatsApp
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
