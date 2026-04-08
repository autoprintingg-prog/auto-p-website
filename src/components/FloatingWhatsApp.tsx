import { MessageSquareText } from 'lucide-react'
import { useSiteContent } from '../hooks/useSiteContent'

export function FloatingWhatsApp() {
  const { whatsappUrl } = useSiteContent()

  return (
    <a
      aria-label="Start printing on WhatsApp"
      className="floating-whatsapp"
      href={whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <MessageSquareText size={20} />
      <span>WhatsApp</span>
    </a>
  )
}
