import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useSiteContent } from '../hooks/useSiteContent'

const principles = [
  {
    title: 'Problem',
    description:
      'Traditional print counters often require repetitive manual coordination for file sharing, print options, payment, and queue handoff.',
  },
  {
    title: 'Solution',
    description:
      'AutoPrint brings those decisions into one guided WhatsApp flow so the user experience stays simple while the automation handles the operational steps separately.',
  },
]

export function AboutPage() {
  const { aboutIntro, projectGuideSummary, teamMembers, techStack, whatsappUrl } = useSiteContent()

  return (
    <div className="page-shell">
      <section className="section page-intro">
        <Reveal>
          <span className="eyebrow">{aboutIntro.eyebrow}</span>
          <h1>{aboutIntro.title}</h1>
          <p className="lead">{aboutIntro.lead}</p>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Why It Exists"
            title="Built to reduce friction between file submission and print execution"
            description="The product focuses on making print requests easier to initiate, easier to configure, and easier to move into a validated queue."
          />
        </Reveal>

        <div className="two-column-grid">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <Card className="info-card large-card">
                <span className="plan-label">{item.title}</span>
                <h3>{item.title === 'Problem' ? 'Manual print coordination slows users down' : 'One guided flow creates a cleaner experience'}</h3>
                <p>{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Tech Stack"
            title="Website and system capabilities presented together"
            description="The site uses a modern frontend stack, while the product story reflects the real workflow components involved in messaging, payment, and print automation."
          />
        </Reveal>

        <Reveal>
          <div className="badge-row">
            {techStack.map((item) => (
              <span key={item} className="badge">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Core Team"
            title="People shaping the AutoPrint experience"
            description="The team section stays simple and product-focused so contributors are clear at a glance."
          />
        </Reveal>

        <div className="team-grid team-grid-simple">
          {teamMembers.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.06}>
              <Card className="team-card team-name-card">
                <span className="team-index">0{index + 1}</span>
                <div className="team-avatar-wrap">
                  <img
                    alt={member.name}
                    className="team-avatar"
                    src={member.photo}
                  />
                </div>
                <h3>{member.name}</h3>
                <div className="team-contact-list">
                  <a className="team-contact-item" href={`mailto:${member.email}`}>
                    <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
                      <rect height="16" rx="2" ry="2" width="20" x="2" y="4" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {member.email}
                  </a>
                  <a className="team-contact-item" href={`tel:${member.mobile.replace(/\s/g, '')}`}>
                    <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1.16h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.65A16 16 0 0 0 15.35 16.1l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {member.mobile}
                  </a>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal>
          <SectionHeading
            eyebrow="Product Foundations"
            title={projectGuideSummary.title}
            description="The public site stays focused on product clarity, while the system itself is backed by structured engineering work and review."
          />
        </Reveal>

        <Reveal>
          <Card className="guide-card">
            <p>{projectGuideSummary.description}</p>
            <div className="cta-actions">
              <Button external href={whatsappUrl} size="lg">
                Start on WhatsApp
              </Button>
              <Button size="lg" to="/contact" variant="secondary">
                Contact the team
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  )
}
