import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, Globe, Save, ShieldCheck, Undo2, Workflow } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { cloneSiteContent, type SiteContent } from '../data/site'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { useSiteContent } from '../hooks/useSiteContent'

const pageMeta = {
  '/': {
    scope: 'Landing',
    description:
      'Hero messaging, workflow preview, feature cards, use cases, pricing preview, and the main product CTA live here.',
  },
  '/how-it-works': {
    scope: 'Workflow',
    description:
      'Explains the complete WhatsApp-to-print flow, including timeline, conversation demo, and supported format coverage.',
  },
  '/pricing': {
    scope: 'Pricing',
    description:
      'Keeps billing logic transparent with a formula, comparison table, calculator, and FAQ block.',
  },
  '/about': {
    scope: 'Brand',
    description:
      'Frames AutoPrint as a product, explains the problem and solution, and highlights the team.',
  },
  '/contact': {
    scope: 'Support',
    description:
      'Provides contact channels and a form UI that drafts a real email or WhatsApp message.',
  },
} as const

type EditableObjectSection =
  | 'contactCards'
  | 'featureList'
  | 'navItems'
  | 'pricingComparison'
  | 'pricingFaqs'
  | 'supportedFormats'
  | 'timelineSteps'
  | 'useCases'
  | 'workflowPreview'

export function AdminDashboardPage() {
  const { content, navItems, resetContent, saveContent, whatsappUrl } = useSiteContent()
  const { adminEmail } = useAdminAuth()

  const [draftContent, setDraftContent] = useState<SiteContent>(cloneSiteContent(content))
  const [saveNotice, setSaveNotice] = useState('Changes are saved only when you click Save Changes.')

  useEffect(() => {
    setDraftContent(cloneSiteContent(content))
  }, [content])

  const hasChanges = useMemo(
    () => JSON.stringify(draftContent) !== JSON.stringify(content),
    [content, draftContent],
  )

  const dashboardMetrics = useMemo(
    () => [
      {
        label: 'Public Pages',
        value: String(navItems.length).padStart(2, '0'),
        note: 'Customer-facing routes currently visible from the website navigation.',
        icon: Globe,
      },
      {
        label: 'Workflow Steps',
        value: String(draftContent.timelineSteps.length).padStart(2, '0'),
        note: 'Detailed stages available in the workflow explanation.',
        icon: Workflow,
      },
      {
        label: 'Feature Cards',
        value: String(draftContent.featureList.length).padStart(2, '0'),
        note: 'Core product capabilities shown on the website today.',
        icon: ShieldCheck,
      },
    ],
    [draftContent.featureList.length, draftContent.timelineSteps.length, navItems.length],
  )

  const pageRegistry = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        scope: pageMeta[item.path as keyof typeof pageMeta]?.scope ?? 'Page',
        description:
          pageMeta[item.path as keyof typeof pageMeta]?.description ??
          'Customer-facing content route.',
      })),
    [navItems],
  )

  const updateRootField = <K extends keyof SiteContent>(field: K, value: SiteContent[K]) => {
    setDraftContent((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateIntroField = (
    section: 'aboutIntro' | 'contactIntro' | 'howItWorksIntro' | 'pricingIntro',
    field: 'eyebrow' | 'lead' | 'title',
    value: string,
  ) => {
    setDraftContent((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }))
  }

  const updateHomeHeroField = (
    field: 'eyebrow' | 'lead' | 'primaryCtaLabel' | 'secondaryCtaLabel' | 'title',
    value: string,
  ) => {
    setDraftContent((current) => ({
      ...current,
      homeHero: {
        ...current.homeHero,
        [field]: value,
      },
    }))
  }

  const updateGuideField = (field: 'description' | 'title', value: string) => {
    setDraftContent((current) => ({
      ...current,
      projectGuideSummary: {
        ...current.projectGuideSummary,
        [field]: value,
      },
    }))
  }

  const updateObjectListField = (
    section: EditableObjectSection,
    index: number,
    field: string,
    value: string,
  ) => {
    setDraftContent((current) => {
      const nextItems = [...(current[section] as unknown as Array<Record<string, string>>)]
      const currentItem = nextItems[index] ?? {}

      nextItems[index] = {
        ...currentItem,
        [field]: value,
      }

      return {
        ...current,
        [section]: nextItems,
      } as SiteContent
    })
  }

  const updateTechStack = (value: string) => {
    updateRootField(
      'techStack',
      value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    )
  }

  const updateTeamMembers = (value: string) => {
    updateRootField(
      'teamMembers',
      value
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((name) => ({ name })),
    )
  }

  const handleSave = () => {
    saveContent(draftContent)
    setSaveNotice(`Saved changes at ${new Date().toLocaleTimeString()}.`)
  }

  const handleDiscard = () => {
    setDraftContent(cloneSiteContent(content))
    setSaveNotice('Draft changes discarded.')
  }

  const handleReset = () => {
    const shouldReset = window.confirm(
      'Reset all website content back to the default AutoPrint copy?',
    )

    if (!shouldReset) {
      return
    }

    resetContent()
    setSaveNotice('Website content reset to defaults.')
  }

  return (
    <div className="admin-page-shell">
      <section className="admin-section" id="overview">
        <Reveal>
          <div className="glass-card admin-summary-card">
            <div className="admin-summary-copy">
              <span className="eyebrow">Content Dashboard</span>
              <h1>Manage the public website content.</h1>
              <p className="lead">
                Signed in as {adminEmail}. Use this dashboard to update the live website copy, links,
                and public content structure without exposing any admin entry point on the public UI.
              </p>
            </div>

            <div className="admin-summary-actions">
              <span className={['admin-summary-state', hasChanges ? 'is-dirty' : 'is-clean'].join(' ')}>
                {hasChanges ? 'Unsaved changes' : 'All changes saved'}
              </span>
              <div className="admin-quick-link-row">
                <Button className="admin-inline-action" to="/" variant="secondary">
                  Open Website
                </Button>
                <Button className="admin-inline-action" external href={whatsappUrl}>
                  Open WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="admin-metrics-grid">
          {dashboardMetrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.05}>
              <Card className="admin-metric-card">
                <div className="admin-metric-top">
                  <div>
                    <span className="admin-metric-label">{metric.label}</span>
                    <strong className="admin-metric-value">{metric.value}</strong>
                  </div>
                  <span className="admin-metric-icon">
                    <metric.icon size={18} />
                  </span>
                </div>
                <p>{metric.note}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="glass-card admin-savebar">
        <div className="admin-savebar-copy">
          <span className="plan-label">Draft Status</span>
          <h3>{hasChanges ? 'You have unsaved changes.' : 'The website content is currently in sync.'}</h3>
          <p>{saveNotice}</p>
        </div>
        <div className="admin-savebar-actions">
          <Button onClick={handleSave} size="sm">
            <Save size={16} />
            Save Changes
          </Button>
          <Button onClick={handleDiscard} size="sm" variant="secondary">
            <Undo2 size={16} />
            Discard Draft
          </Button>
          <Button onClick={handleReset} size="sm" variant="ghost">
            Reset Defaults
          </Button>
        </div>
      </div>

      <section className="admin-section" id="global">
        <Reveal>
          <SectionHeading
            eyebrow="Global Settings"
            title="Brand, navigation, and entry links"
            description="These fields power the shared website settings used across the public experience."
          />
        </Reveal>

        <div className="admin-editor-grid">
          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Brand and entry points</h3>
              <p>Update the shared brand strings and the links used across the website.</p>
            </div>
            <div className="form-grid">
              <label className="field">
                <span>Site name</span>
                <input
                  onChange={(event) => updateRootField('siteName', event.target.value)}
                  type="text"
                  value={draftContent.siteName}
                />
              </label>
              <label className="field">
                <span>Site tagline</span>
                <input
                  onChange={(event) => updateRootField('siteTagline', event.target.value)}
                  type="text"
                  value={draftContent.siteTagline}
                />
              </label>
              <label className="field">
                <span>Navbar meta label</span>
                <input
                  onChange={(event) => updateRootField('navMetaLabel', event.target.value)}
                  type="text"
                  value={draftContent.navMetaLabel}
                />
              </label>
              <label className="field">
                <span>Navbar CTA label</span>
                <input
                  onChange={(event) => updateRootField('navCtaLabel', event.target.value)}
                  type="text"
                  value={draftContent.navCtaLabel}
                />
              </label>
              <label className="field field-full">
                <span>WhatsApp URL</span>
                <input
                  onChange={(event) => updateRootField('whatsappUrl', event.target.value)}
                  type="url"
                  value={draftContent.whatsappUrl}
                />
              </label>
              <label className="field field-full">
                <span>Email compose URL</span>
                <input
                  onChange={(event) => updateRootField('emailComposeUrl', event.target.value)}
                  type="text"
                  value={draftContent.emailComposeUrl}
                />
              </label>
              <label className="field">
                <span>Footer eyebrow</span>
                <input
                  onChange={(event) => updateRootField('footerEyebrow', event.target.value)}
                  type="text"
                  value={draftContent.footerEyebrow}
                />
              </label>
              <label className="field field-full">
                <span>Footer description</span>
                <textarea
                  onChange={(event) => updateRootField('footerDescription', event.target.value)}
                  rows={4}
                  value={draftContent.footerDescription}
                />
              </label>
            </div>
          </Card>

          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Navigation labels</h3>
              <p>The route paths stay fixed, but the public menu labels can be updated here.</p>
            </div>
            <div className="admin-array-stack">
              {draftContent.navItems.map((item, index) => (
                <div key={item.path} className="admin-array-item">
                  <label className="field">
                    <span>Label</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('navItems', index, 'label', event.target.value)
                      }
                      type="text"
                      value={item.label}
                    />
                  </label>
                  <label className="field">
                    <span>Path</span>
                    <input disabled type="text" value={item.path} />
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="admin-section" id="home">
        <Reveal>
          <SectionHeading
            eyebrow="Homepage"
            title="Hero, use cases, and feature content"
            description="Keep the first impression sharp with direct control over the homepage copy and cards."
          />
        </Reveal>

        <div className="admin-editor-grid">
          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Hero</h3>
              <p>Control the first-fold copy and CTA labels shown on the home page.</p>
            </div>
            <div className="form-grid">
              <label className="field field-full">
                <span>Eyebrow</span>
                <input
                  onChange={(event) => updateHomeHeroField('eyebrow', event.target.value)}
                  type="text"
                  value={draftContent.homeHero.eyebrow}
                />
              </label>
              <label className="field field-full">
                <span>Title</span>
                <textarea
                  onChange={(event) => updateHomeHeroField('title', event.target.value)}
                  rows={3}
                  value={draftContent.homeHero.title}
                />
              </label>
              <label className="field field-full">
                <span>Lead</span>
                <textarea
                  onChange={(event) => updateHomeHeroField('lead', event.target.value)}
                  rows={4}
                  value={draftContent.homeHero.lead}
                />
              </label>
              <label className="field">
                <span>Primary CTA</span>
                <input
                  onChange={(event) => updateHomeHeroField('primaryCtaLabel', event.target.value)}
                  type="text"
                  value={draftContent.homeHero.primaryCtaLabel}
                />
              </label>
              <label className="field">
                <span>Secondary CTA</span>
                <input
                  onChange={(event) => updateHomeHeroField('secondaryCtaLabel', event.target.value)}
                  type="text"
                  value={draftContent.homeHero.secondaryCtaLabel}
                />
              </label>
            </div>
          </Card>

          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Use cases</h3>
              <p>Update the practical environments where AutoPrint fits best.</p>
            </div>
            <div className="admin-array-stack">
              {draftContent.useCases.map((item, index) => (
                <div key={`${item.title}-${index}`} className="admin-array-item">
                  <label className="field">
                    <span>Title</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('useCases', index, 'title', event.target.value)
                      }
                      type="text"
                      value={item.title}
                    />
                  </label>
                  <label className="field field-full">
                    <span>Description</span>
                    <textarea
                      onChange={(event) =>
                        updateObjectListField('useCases', index, 'description', event.target.value)
                      }
                      rows={4}
                      value={item.description}
                    />
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="admin-editor-card">
          <div className="admin-editor-head">
            <h3>Feature cards</h3>
            <p>These cards are shown on the homepage and in the admin overview metrics.</p>
          </div>
          <div className="admin-array-stack">
            {draftContent.featureList.map((feature, index) => (
              <div key={`${feature.title}-${index}`} className="admin-array-item">
                <label className="field">
                  <span>Feature title</span>
                  <input
                    onChange={(event) =>
                      updateObjectListField('featureList', index, 'title', event.target.value)
                    }
                    type="text"
                    value={feature.title}
                  />
                </label>
                <label className="field field-full">
                  <span>Feature description</span>
                  <textarea
                    onChange={(event) =>
                      updateObjectListField('featureList', index, 'description', event.target.value)
                    }
                    rows={4}
                    value={feature.description}
                  />
                </label>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="admin-section" id="workflow">
        <Reveal>
          <SectionHeading
            eyebrow="Workflow"
            title="Flow steps, supported formats, and user journey copy"
            description="Edit the short preview and the detailed workflow page from one section."
          />
        </Reveal>

        <div className="admin-editor-grid">
          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>How It Works page intro</h3>
              <p>Edit the intro copy that appears at the top of the workflow page.</p>
            </div>
            <div className="form-grid">
              <label className="field field-full">
                <span>Eyebrow</span>
                <input
                  onChange={(event) =>
                    updateIntroField('howItWorksIntro', 'eyebrow', event.target.value)
                  }
                  type="text"
                  value={draftContent.howItWorksIntro.eyebrow}
                />
              </label>
              <label className="field field-full">
                <span>Title</span>
                <textarea
                  onChange={(event) => updateIntroField('howItWorksIntro', 'title', event.target.value)}
                  rows={3}
                  value={draftContent.howItWorksIntro.title}
                />
              </label>
              <label className="field field-full">
                <span>Lead</span>
                <textarea
                  onChange={(event) => updateIntroField('howItWorksIntro', 'lead', event.target.value)}
                  rows={4}
                  value={draftContent.howItWorksIntro.lead}
                />
              </label>
            </div>
          </Card>

          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Workflow preview</h3>
              <p>This four-step flow appears as the short product explanation on the home page.</p>
            </div>
            <div className="admin-array-stack">
              {draftContent.workflowPreview.map((item, index) => (
                <div key={`${item.title}-${index}`} className="admin-array-item">
                  <label className="field">
                    <span>Step title</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('workflowPreview', index, 'title', event.target.value)
                      }
                      type="text"
                      value={item.title}
                    />
                  </label>
                  <label className="field field-full">
                    <span>Description</span>
                    <textarea
                      onChange={(event) =>
                        updateObjectListField('workflowPreview', index, 'description', event.target.value)
                      }
                      rows={4}
                      value={item.description}
                    />
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="admin-editor-grid">
          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Timeline steps</h3>
              <p>The detailed page uses these steps to explain the complete journey.</p>
            </div>
            <div className="admin-array-stack">
              {draftContent.timelineSteps.map((item, index) => (
                <div key={`${item.title}-${index}`} className="admin-array-item">
                  <label className="field">
                    <span>Step title</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('timelineSteps', index, 'title', event.target.value)
                      }
                      type="text"
                      value={item.title}
                    />
                  </label>
                  <label className="field field-full">
                    <span>Description</span>
                    <textarea
                      onChange={(event) =>
                        updateObjectListField('timelineSteps', index, 'description', event.target.value)
                      }
                      rows={4}
                      value={item.description}
                    />
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Supported formats</h3>
              <p>Edit the labels and descriptions for the file types shown in the product flow.</p>
            </div>
            <div className="admin-array-stack">
              {draftContent.supportedFormats.map((format, index) => (
                <div key={`${format.name}-${index}`} className="admin-array-item">
                  <label className="field">
                    <span>Format name</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('supportedFormats', index, 'name', event.target.value)
                      }
                      type="text"
                      value={format.name}
                    />
                  </label>
                  <label className="field field-full">
                    <span>Description</span>
                    <textarea
                      onChange={(event) =>
                        updateObjectListField('supportedFormats', index, 'description', event.target.value)
                      }
                      rows={4}
                      value={format.description}
                    />
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="admin-section" id="pricing">
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Pricing intro, comparison rows, and FAQ content"
            description="The calculator formula stays intact while the supporting content remains editable."
          />
        </Reveal>

        <div className="admin-editor-grid">
          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Pricing page intro</h3>
              <p>Update the pricing page hero copy shown before the table and calculator.</p>
            </div>
            <div className="form-grid">
              <label className="field field-full">
                <span>Eyebrow</span>
                <input
                  onChange={(event) => updateIntroField('pricingIntro', 'eyebrow', event.target.value)}
                  type="text"
                  value={draftContent.pricingIntro.eyebrow}
                />
              </label>
              <label className="field field-full">
                <span>Title</span>
                <textarea
                  onChange={(event) => updateIntroField('pricingIntro', 'title', event.target.value)}
                  rows={3}
                  value={draftContent.pricingIntro.title}
                />
              </label>
              <label className="field field-full">
                <span>Lead</span>
                <textarea
                  onChange={(event) => updateIntroField('pricingIntro', 'lead', event.target.value)}
                  rows={4}
                  value={draftContent.pricingIntro.lead}
                />
              </label>
            </div>
          </Card>

          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Comparison table</h3>
              <p>These rows appear in the pricing table shown on the public site.</p>
            </div>
            <div className="admin-array-stack">
              {draftContent.pricingComparison.map((row, index) => (
                <div key={`${row.label}-${index}`} className="admin-array-item">
                  <label className="field">
                    <span>Row label</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('pricingComparison', index, 'label', event.target.value)
                      }
                      type="text"
                      value={row.label}
                    />
                  </label>
                  <label className="field">
                    <span>B&W value</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('pricingComparison', index, 'bw', event.target.value)
                      }
                      type="text"
                      value={row.bw}
                    />
                  </label>
                  <label className="field">
                    <span>Color value</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('pricingComparison', index, 'color', event.target.value)
                      }
                      type="text"
                      value={row.color}
                    />
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="admin-editor-card">
          <div className="admin-editor-head">
            <h3>Pricing FAQ</h3>
            <p>Keep the public answers aligned with the real deployment model.</p>
          </div>
          <div className="admin-array-stack">
            {draftContent.pricingFaqs.map((item, index) => (
              <div key={`${item.question}-${index}`} className="admin-array-item">
                <label className="field field-full">
                  <span>Question</span>
                  <input
                    onChange={(event) =>
                      updateObjectListField('pricingFaqs', index, 'question', event.target.value)
                    }
                    type="text"
                    value={item.question}
                  />
                </label>
                <label className="field field-full">
                  <span>Answer</span>
                  <textarea
                    onChange={(event) =>
                      updateObjectListField('pricingFaqs', index, 'answer', event.target.value)
                    }
                    rows={4}
                    value={item.answer}
                  />
                </label>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="admin-section" id="about">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Product story, team, and stack details"
            description="Update the public brand narrative and contributor information in one place."
          />
        </Reveal>

        <div className="admin-editor-grid">
          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>About page intro</h3>
              <p>Keep the top-level narrative aligned with the current product direction.</p>
            </div>
            <div className="form-grid">
              <label className="field field-full">
                <span>Eyebrow</span>
                <input
                  onChange={(event) => updateIntroField('aboutIntro', 'eyebrow', event.target.value)}
                  type="text"
                  value={draftContent.aboutIntro.eyebrow}
                />
              </label>
              <label className="field field-full">
                <span>Title</span>
                <textarea
                  onChange={(event) => updateIntroField('aboutIntro', 'title', event.target.value)}
                  rows={3}
                  value={draftContent.aboutIntro.title}
                />
              </label>
              <label className="field field-full">
                <span>Lead</span>
                <textarea
                  onChange={(event) => updateIntroField('aboutIntro', 'lead', event.target.value)}
                  rows={4}
                  value={draftContent.aboutIntro.lead}
                />
              </label>
            </div>
          </Card>

          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Team and stack</h3>
              <p>Use one line per item so the public site cards and badges stay clean.</p>
            </div>
            <div className="form-grid">
              <label className="field field-full">
                <span>Team members</span>
                <textarea
                  onChange={(event) => updateTeamMembers(event.target.value)}
                  rows={6}
                  value={draftContent.teamMembers.map((member) => member.name).join('\n')}
                />
              </label>
              <label className="field field-full">
                <span>Tech stack items</span>
                <textarea
                  onChange={(event) => updateTechStack(event.target.value)}
                  rows={7}
                  value={draftContent.techStack.join('\n')}
                />
              </label>
            </div>
          </Card>
        </div>

        <Card className="admin-editor-card">
          <div className="admin-editor-head">
            <h3>Product foundations card</h3>
            <p>This block powers the summary card on the public About page.</p>
          </div>
          <div className="form-grid">
            <label className="field field-full">
              <span>Title</span>
              <input
                onChange={(event) => updateGuideField('title', event.target.value)}
                type="text"
                value={draftContent.projectGuideSummary.title}
              />
            </label>
            <label className="field field-full">
              <span>Description</span>
              <textarea
                onChange={(event) => updateGuideField('description', event.target.value)}
                rows={5}
                value={draftContent.projectGuideSummary.description}
              />
            </label>
          </div>
        </Card>
      </section>

      <section className="admin-section" id="contact">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Contact intro and public communication cards"
            description="Keep the contact page practical and aligned with the real project channels."
          />
        </Reveal>

        <div className="admin-editor-grid">
          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Contact page intro</h3>
              <p>Edit the main message shown before the contact cards and form.</p>
            </div>
            <div className="form-grid">
              <label className="field field-full">
                <span>Eyebrow</span>
                <input
                  onChange={(event) => updateIntroField('contactIntro', 'eyebrow', event.target.value)}
                  type="text"
                  value={draftContent.contactIntro.eyebrow}
                />
              </label>
              <label className="field field-full">
                <span>Title</span>
                <textarea
                  onChange={(event) => updateIntroField('contactIntro', 'title', event.target.value)}
                  rows={3}
                  value={draftContent.contactIntro.title}
                />
              </label>
              <label className="field field-full">
                <span>Lead</span>
                <textarea
                  onChange={(event) => updateIntroField('contactIntro', 'lead', event.target.value)}
                  rows={4}
                  value={draftContent.contactIntro.lead}
                />
              </label>
            </div>
          </Card>

          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Contact cards</h3>
              <p>Update the public contact options and supporting explanations.</p>
            </div>
            <div className="admin-array-stack">
              {draftContent.contactCards.map((item, index) => (
                <div key={`${item.title}-${index}`} className="admin-array-item">
                  <label className="field">
                    <span>Card title</span>
                    <input
                      onChange={(event) =>
                        updateObjectListField('contactCards', index, 'title', event.target.value)
                      }
                      type="text"
                      value={item.title}
                    />
                  </label>
                  <label className="field field-full">
                    <span>Description</span>
                    <textarea
                      onChange={(event) =>
                        updateObjectListField('contactCards', index, 'description', event.target.value)
                      }
                      rows={4}
                      value={item.description}
                    />
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="admin-section" id="pages">
        <Reveal>
          <SectionHeading
            eyebrow="Route Preview"
            title="Preview every public page from the dashboard"
            description="Use these links to quickly verify the public website after saving changes."
          />
        </Reveal>

        <div className="admin-page-grid">
          {pageRegistry.map((page, index) => (
            <Reveal key={page.path} delay={index * 0.05}>
              <Card className="admin-page-card">
                <div className="admin-card-meta">
                  <span className="plan-label">{page.scope}</span>
                  <span className="admin-inline-path">{page.path}</span>
                </div>
                <h3>{page.label}</h3>
                <p>{page.description}</p>
                <Button className="inline-button" size="sm" to={page.path} variant="ghost">
                  Open Route <ExternalLink size={16} />
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
