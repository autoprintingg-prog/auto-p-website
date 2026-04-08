import { motion } from 'framer-motion'
import { Menu, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSiteContent } from '../hooks/useSiteContent'
import { Button } from './Button'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { navCtaLabel, navItems, navMetaLabel, siteName, siteTagline, whatsappUrl } = useSiteContent()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="navbar-wrap"
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
    >
      <div className={['navbar', isScrolled ? 'is-scrolled' : ''].join(' ')}>
        <NavLink className="brand" onClick={() => setIsMenuOpen(false)} to="/">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core"></span>
          </span>
          <span className="brand-copy">
            <strong>{siteName}</strong>
            <span>{siteTagline}</span>
          </span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                ['nav-link', isActive ? 'is-active' : ''].filter(Boolean).join(' ')
              }
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="nav-meta">
            <Sparkles size={14} />
            <span>{navMetaLabel}</span>
          </div>
          <ThemeToggle />
          <Button className="nav-cta" external href={whatsappUrl} size="sm">
            {navCtaLabel}
          </Button>
          <button
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="nav-toggle"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={['mobile-panel', isMenuOpen ? 'is-open' : ''].join(' ')}>
        <div className="glass-card mobile-panel-card">
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  ['mobile-link', isActive ? 'is-active' : ''].filter(Boolean).join(' ')
                }
                to={item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-actions">
            <div className="nav-meta mobile-meta">
              <Sparkles size={14} />
              <span>{navMetaLabel}</span>
            </div>
            <Button external href={whatsappUrl}>
              {navCtaLabel}
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
