import { useCallback, useEffect, useMemo, useState } from 'react'
import { Globe, Save, Undo2 } from 'lucide-react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Reveal } from '../components/Reveal'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { fetchContactSubmissions, type ContactSubmissionRecord } from '../lib/contact-submissions'
import { useSiteContent } from '../hooks/useSiteContent'

export function AdminDashboardPage() {
  const { navItems, whatsappUrl } = useSiteContent()
  const { adminEmail } = useAdminAuth()

  const [saveNotice, setSaveNotice] = useState('Welcome to the admin dashboard.')
  const [submissions, setSubmissions] = useState<ContactSubmissionRecord[]>([])
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true)
  const [submissionError, setSubmissionError] = useState('')

  const dashboardMetrics = useMemo(
    () => [
      {
        label: 'Public Pages',
        value: String(navItems.length).padStart(2, '0'),
        note: 'Customer-facing routes currently visible from the website navigation.',
        icon: Globe,
      },
    ],
    [navItems.length],
  )

  const loadSubmissions = useCallback(async () => {
    setIsLoadingSubmissions(true)
    setSubmissionError('')

    try {
      const nextSubmissions = await fetchContactSubmissions(100)
      setSubmissions(nextSubmissions)
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Unable to load submissions right now.')
    } finally {
      setIsLoadingSubmissions(false)
    }
  }, [])

  useEffect(() => {
    void loadSubmissions()
  }, [loadSubmissions])

  const handleSave = () => {
    void loadSubmissions()
    setSaveNotice(`Submissions refreshed at ${new Date().toLocaleTimeString()}.`)
  }

  const handleDiscard = () => {
    setSubmissionError('')
    setSaveNotice('Dashboard ready.')
  }

  return (
    <div className="admin-page-shell">
      <section className="admin-section" id="overview">
        <Reveal>
          <div className="glass-card admin-summary-card">
            <div className="admin-summary-copy">
              <span className="eyebrow">Admin Dashboard</span>
              <h1>Welcome to the admin panel.</h1>
              <p className="lead">
                Signed in as {adminEmail}. You have full access to manage the website configuration.
              </p>
            </div>

            <div className="admin-summary-actions">
              <span className={['admin-summary-state', 'is-clean'].join(' ')}>
                Dashboard online
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
          <span className="plan-label">Status</span>
          <h3>Dashboard is ready.</h3>
          <p>{saveNotice}</p>
        </div>
        <div className="admin-savebar-actions">
          <Button onClick={handleSave} size="sm">
            <Save size={16} />
            Refresh Submissions
          </Button>
          <Button onClick={handleDiscard} size="sm" variant="secondary">
            <Undo2 size={16} />
            Clear Notice
          </Button>
        </div>
      </div>

      <section className="admin-section" id="submissions">
        <Reveal>
          <Card className="admin-editor-card">
            <div className="admin-editor-head">
              <h3>Contact Form Submissions</h3>
              <p>This data is visible only in the authenticated admin area.</p>
            </div>

            {isLoadingSubmissions ? <p>Loading submissions...</p> : null}
            {submissionError ? <p className="form-notice">{submissionError}</p> : null}

            {!isLoadingSubmissions && !submissionError && submissions.length === 0 ? (
              <p>No submissions found yet.</p>
            ) : null}

            {!isLoadingSubmissions && !submissionError && submissions.length > 0 ? (
              <div className="admin-array-stack">
                {submissions.map((submission) => (
                  <div className="admin-array-item" key={submission.id}>
                    <div className="form-grid">
                      <label className="field">
                        <span>Name</span>
                        <input readOnly type="text" value={submission.name} />
                      </label>
                      <label className="field">
                        <span>Email</span>
                        <input readOnly type="text" value={submission.email} />
                      </label>
                      <label className="field field-full">
                        <span>Institution</span>
                        <input readOnly type="text" value={submission.institution || 'Not provided'} />
                      </label>
                      <label className="field field-full">
                        <span>Message</span>
                        <textarea readOnly rows={5} value={submission.message || 'No message'} />
                      </label>
                      <label className="field field-full">
                        <span>Submitted</span>
                        <input
                          readOnly
                          type="text"
                          value={
                            submission.submittedAt
                              ? new Date(submission.submittedAt).toLocaleString()
                              : 'Unknown time'
                          }
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </Card>
        </Reveal>
      </section>
    </div>
  )
}
