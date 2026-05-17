import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Inbox,
  Loader2,
  Mail,
  MessageSquareText,
  RefreshCw,
  Search,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { type ContactSubmission, fetchContactSubmissions } from '../../lib/admin-queries'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function isToday(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  )
}

function CountCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType
  label: string
  value: number | string
  color: string
  delay: number
}) {
  return (
    <motion.div
      className="admin-stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      style={{ '--stat-color': color } as React.CSSProperties}
    >
      <div className="admin-stat-icon">
        <Icon size={20} />
      </div>
      <div className="admin-stat-body">
        <span className="admin-stat-value">{value}</span>
        <span className="admin-stat-label">{label}</span>
      </div>
    </motion.div>
  )
}

export function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  async function loadData(isRefresh = false) {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError('')
    try {
      const data = await fetchContactSubmissions()
      setSubmissions(data)
    } catch {
      setError('Could not load submissions. Check your Supabase connection.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { loadData() }, [])

  function copyEmail(email: string, id: string) {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 1800)
    })
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return submissions
    return submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.institution.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q),
    )
  }, [submissions, search])

  const todayCount = submissions.filter((s) => isToday(s.created_at)).length
  const uniqueInstitutions = new Set(submissions.map((s) => s.institution.trim())).size

  return (
    <div className="admin-dashboard">
      {/* Page header */}
      <motion.div
        className="admin-page-header"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-sub">All customer contact form submissions in one place.</p>
        </div>
        <button
          className="admin-refresh-btn"
          onClick={() => loadData(true)}
          disabled={refreshing || loading}
          title="Refresh data"
          type="button"
        >
          <RefreshCw size={15} className={refreshing ? 'admin-spin' : ''} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </motion.div>

      {/* Stat cards */}
      <div className="admin-stats-grid">
        <CountCard
          icon={Inbox}
          label="Total Inquiries"
          value={loading ? '—' : submissions.length}
          color="var(--primary)"
          delay={0.05}
        />
        <CountCard
          icon={Calendar}
          label="Today"
          value={loading ? '—' : todayCount}
          color="#9d6ef0"
          delay={0.1}
        />
        <CountCard
          icon={Building2}
          label="Unique Institutions"
          value={loading ? '—' : uniqueInstitutions}
          color="#22b4d4"
          delay={0.15}
        />
        <CountCard
          icon={Users}
          label="Latest Submission"
          value={
            loading || submissions.length === 0
              ? '—'
              : new Date(submissions[0].created_at).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                })
          }
          color="#f0a020"
          delay={0.2}
        />
      </div>

      {/* Submissions section */}
      <motion.div
        className="admin-section"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
      >
        <div className="admin-section-header">
          <div className="admin-section-title-row">
            <MessageSquareText size={18} />
            <h2 className="admin-section-title">Customer Submissions</h2>
            {!loading && (
              <span className="admin-badge">{filtered.length}</span>
            )}
          </div>

          {/* Search */}
          <div className="admin-search-wrap">
            <Search size={15} className="admin-search-icon" />
            <input
              type="search"
              placeholder="Search by name, institution or email…"
              className="admin-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="admin-loading">
            <Loader2 size={28} className="admin-spin" />
            <span>Loading submissions…</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="admin-error-banner">
            <span>{error}</span>
            <button onClick={() => loadData()} type="button">Retry</button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="admin-empty">
            <Inbox size={38} />
            <p>{search ? 'No results match your search.' : 'No submissions yet.'}</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filtered.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Institution</th>
                  <th>Date & Time</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <>
                    <motion.tr
                      key={row.id}
                      className={[
                        'admin-table-row',
                        expandedId === row.id ? 'is-expanded' : '',
                      ].join(' ')}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03 }}
                      onClick={() =>
                        setExpandedId(expandedId === row.id ? null : row.id)
                      }
                    >
                      <td className="admin-table-num">{i + 1}</td>
                      <td className="admin-table-name">{row.name}</td>
                      <td className="admin-table-email">
                        <span>{row.email}</span>
                        <button
                          className="admin-copy-btn"
                          title="Copy email"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyEmail(row.email, row.id)
                          }}
                        >
                          {copied === row.id ? (
                            <span className="admin-copy-done">✓</span>
                          ) : (
                            <ClipboardCopy size={13} />
                          )}
                        </button>
                      </td>
                      <td className="admin-table-institution">
                        <Building2 size={13} />
                        {row.institution}
                      </td>
                      <td className="admin-table-date">
                        <Mail size={12} />
                        {formatDate(row.created_at)}
                      </td>
                      <td className="admin-table-expand-cell">
                        <button
                          className="admin-expand-btn"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedId(expandedId === row.id ? null : row.id)
                          }}
                        >
                          {expandedId === row.id ? (
                            <ChevronUp size={15} />
                          ) : (
                            <ChevronDown size={15} />
                          )}
                          {expandedId === row.id ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </motion.tr>

                    {/* Expanded message row */}
                    <AnimatePresence>
                      {expandedId === row.id && (
                        <tr key={`${row.id}-expand`} className="admin-table-expanded-row">
                          <td colSpan={6}>
                            <motion.div
                              className="admin-expanded-message"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.28 }}
                            >
                              <span className="admin-expanded-label">
                                <MessageSquareText size={14} />
                                Full Message
                              </span>
                              <p>{row.message}</p>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
