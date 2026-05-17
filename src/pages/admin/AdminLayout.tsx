import { motion } from 'framer-motion'
import { ExternalLink, LayoutDashboard, LogOut } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

export function AdminLayout() {
  const { logout } = useAdminAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <motion.aside
        className="admin-sidebar"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Brand */}
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">
            <img src="/Logo.jpeg" alt="AutoPrint" />
          </div>
          <div className="admin-sidebar-brand-copy">
            <strong>AutoPrinting</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          <span className="admin-sidebar-nav-label">Menu</span>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              ['admin-nav-link', isActive ? 'is-active' : ''].filter(Boolean).join(' ')
            }
          >
            <LayoutDashboard size={17} />
            Dashboard
          </NavLink>
        </nav>

        {/* Bottom actions */}
        <div className="admin-sidebar-bottom">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-sidebar-action"
          >
            <ExternalLink size={15} />
            View Public Site
          </a>
          <button
            className="admin-sidebar-action admin-sidebar-logout"
            onClick={handleLogout}
            type="button"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}
