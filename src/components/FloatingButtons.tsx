import { Mail, MessageSquareText } from 'lucide-react'
import { useSiteContent } from '../hooks/useSiteContent'

export function FloatingButtons() {
  const { whatsappUrl } = useSiteContent()

  return (
    <div className="floating-buttons-stack">
      <a
        aria-label="Send your document via Email"
        className="floating-btn floating-btn--email"
        href="mailto:autoprintingg@gmail.com?subject=Print%20Request&body=Hi%2C%20I%20would%20like%20to%20print%20a%20document.%20Please%20find%20the%20attachment."
      >
        <Mail size={20} />
        <span>Email a Doc</span>
      </a>

      <a
        aria-label="Start printing on WhatsApp"
        className="floating-btn floating-btn--whatsapp"
        href={whatsappUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <MessageSquareText size={20} />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}
