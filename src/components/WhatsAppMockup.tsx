import { CheckCircle2, FileText, ReceiptText, ShieldCheck } from 'lucide-react'
import { useSiteContent } from '../hooks/useSiteContent'
import { Button } from './Button'

type WhatsAppMockupProps = {
  variant?: 'hero' | 'detailed'
}

const heroMessages = [
  { sender: 'system', text: 'Hi! Send a file to begin your print request.' },
  { sender: 'user', text: 'Uploading print-ready-brochure.pdf' },
  { sender: 'system', text: 'Choose color mode, copies, and duplex settings.' },
  { sender: 'user', text: 'B&W, duplex, 2 copies.' },
]

const detailedMessages = [
  { sender: 'system', text: 'File received. Format check completed.' },
  { sender: 'system', text: 'Page summary ready. Select the print settings to continue.' },
  { sender: 'user', text: 'Color, single-side, 1 copy.' },
  { sender: 'system', text: 'Payment link generated through Cashfree.' },
  { sender: 'system', text: 'Payment confirmed. Your job is entering the queue.' },
]

export function WhatsAppMockup({ variant = 'hero' }: WhatsAppMockupProps) {
  const { siteName, whatsappUrl } = useSiteContent()
  const messages = variant === 'hero' ? heroMessages : detailedMessages

  return (
    <div className={['glass-card', 'mockup', variant === 'detailed' ? 'is-detailed' : ''].join(' ')}>
      <div className="mockup-header">
        <div>
          <strong>{siteName} Bot</strong>
          <span>WhatsApp workflow</span>
        </div>
        <span className="status-pill">Live flow</span>
      </div>

      <div className="mockup-doc">
        <div className="mockup-doc-icon">
          <FileText size={18} />
        </div>
        <div>
          <strong>print-ready-brochure.pdf</strong>
          <span>12 pages ready for print validation</span>
        </div>
      </div>

      <div className="mockup-thread">
        {messages.map((message) => (
          <div
            key={`${message.sender}-${message.text}`}
            className={['message-row', message.sender === 'user' ? 'is-user' : ''].join(' ')}
          >
            <div
              className={['message-bubble', message.sender === 'user' ? 'is-user' : 'is-system'].join(
                ' ',
              )}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="message-actions">
        <span className="chip">B&W</span>
        <span className="chip">Duplex</span>
        <span className="chip">2 Copies</span>
      </div>

      <div className="mockup-status-grid">
        <div className="mockup-status">
          <ReceiptText size={16} />
          <span>Summary created</span>
        </div>
        <div className="mockup-status">
          <ShieldCheck size={16} />
          <span>Cashfree handoff</span>
        </div>
        <div className="mockup-status">
          <CheckCircle2 size={16} />
          <span>Queue ready</span>
        </div>
      </div>

      {variant === 'hero' ? (
        <div className="mockup-footer">
          <Button external href={whatsappUrl} size="sm" variant="secondary">
            Open WhatsApp
          </Button>
          <p>Designed for quick document submission without a separate app install.</p>
        </div>
      ) : null}
    </div>
  )
}
