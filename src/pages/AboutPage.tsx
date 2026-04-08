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
                <h3>{member.name}</h3>
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
