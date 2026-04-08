import type { ReactNode } from 'react'
import {
  BadgeInfo,
  CreditCard,
  House,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings2,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { useSiteContent } from '../hooks/useSiteContent'
import { Button } from './Button'
import { ThemeToggle } from './ThemeToggle'

const adminSections = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    id: 'global',
    label: 'Global',
    icon: Settings2,
  },
  {
    id: 'home',
    label: 'Home',
    icon: House,
  },
  {
    id: 'workflow',
    label: 'Workflow',
    icon: Workflow,
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: CreditCard,
  },
  {
    id: 'about',
    label: 'About',
    icon: BadgeInfo,
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
  },
]

export function AdminLayout({ children }: { children: ReactNode }) {
  const { adminEmail, logout, status } = useAdminAuth()
  const { siteName } = useSiteContent()

  if (status !== 'authenticated') {
    return (
      <div className="site-shell admin-shell-root">
        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>

        <div className="admin-auth-shell">
          <header className="glass-card admin-auth-header">
            <Link className="brand admin-brand" to="/">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark-core"></span>
              </span>
              <span className="brand-copy">
                <strong>{siteName}</strong>
                <span>Admin access</span>
              </span>
            </Link>
            <ThemeToggle />
          </header>

          <main className="admin-auth-main">{children}</main>
        </div>
      </div>
    )
  }

  return (
    <div className="site-shell admin-shell-root">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>

      <div className="admin-shell">
        <aside className="glass-card admin-sidebar">
          <Link className="brand admin-brand" to="/">
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-core"></span>
            </span>
            <span className="brand-copy">
              <strong>{siteName}</strong>
              <span>Website control center</span>
            </span>
          </Link>

          <div className="admin-sidebar-copy">
            <span className="eyebrow">Admin</span>
            <h2>Website content</h2>
            <p>Update the public AutoPrint experience from one private workspace.</p>
          </div>

          <nav className="admin-sidebar-nav" aria-label="Admin sections">
            {adminSections.map((section) => (
              <a key={section.id} className="admin-side-link" href={`#${section.id}`}>
                <section.icon size={16} />
                <span>{section.label}</span>
              </a>
            ))}
          </nav>

          <div className="admin-sidebar-actions">
            <Button size="sm" to="/" variant="secondary">
              Open Website
            </Button>
          </div>
        </aside>

        <div className="admin-main">
          <header className="glass-card admin-topbar">
            <div className="admin-topbar-copy">
              <div className="admin-topbar-title">
                <strong>Dashboard</strong>
                <p>Simple, focused controls for the public website content.</p>
                {adminEmail ? <span className="admin-session-copy">Signed in as {adminEmail}</span> : null}
              </div>
            </div>

            <div className="admin-topbar-actions">
              <Button size="sm" to="/" variant="ghost">
                Exit Dashboard
              </Button>
              <Button onClick={logout} size="sm" variant="secondary">
                <LogOut size={16} />
                Sign Out
              </Button>
              <ThemeToggle />
            </div>
          </header>

          <main className="admin-content">{children}</main>
        </div>
      </div>
    </div>
  )
}
