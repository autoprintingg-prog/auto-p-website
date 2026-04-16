import { Link } from 'react-router-dom'
import { useSiteContent } from '../hooks/useSiteContent'

export function Footer() {
  const { emailComposeUrl, footerDescription, footerEyebrow, navItems, siteName, whatsappUrl } =
    useSiteContent()

  return (
    <footer className="footer">
      <div className="glass-card footer-shell">
        <div className="footer-grid">
          <div className="footer-copy">
            <span className="eyebrow">{footerEyebrow}</span>
            <img src="/logo.png" alt={siteName} className="footer-logo" />
            <h2>{siteName}</h2>
            <p>{footerDescription}</p>
            <div className="footer-format-row">
              <span className="footer-format-chip">PDF</span>
              <span className="footer-format-chip">DOCX</span>
              <span className="footer-format-chip">PPTX</span>
              <span className="footer-format-chip">JPG</span>
              <span className="footer-format-chip">PNG</span>
            </div>
          </div>

          <div className="footer-links footer-links-block">
            <span className="footer-label">Navigation</span>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>

          <div className="footer-links footer-links-block">
            <span className="footer-label">Entry Points</span>
            <a href={whatsappUrl} rel="noopener noreferrer" target="_blank">
              Open WhatsApp
            </a>
            <a href={emailComposeUrl}>autoprintingg@gmail.com</a>
            <a href="tel:+918767535697">+91 87675 35697</a>
            <a href="tel:+918010076459">+91 80100 76459</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{new Date().getFullYear()} {siteName}</span>
          <span>
            Built for clear onboarding, transparent workflow explanation, and clean entry to the
            system.
          </span>
        </div>
      </div>
    </footer>
  )
}
