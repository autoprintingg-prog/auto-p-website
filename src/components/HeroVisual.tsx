import { motion } from 'framer-motion'
import { CheckCircle2, CreditCard, FileText, Printer, SlidersHorizontal, Sparkles } from 'lucide-react'

const flowNodes = [
  {
    title: 'Document received',
    description: 'Supported files accepted in the request flow.',
    icon: FileText,
    className: 'hero-node top-left',
    delay: 0,
  },
  {
    title: 'Options selected',
    description: 'Color mode, duplex, and copies are confirmed.',
    icon: SlidersHorizontal,
    className: 'hero-node top-right',
    delay: 0.12,
  },
  {
    title: 'Cashfree handoff',
    description: 'Payment is verified before queue submission.',
    icon: CreditCard,
    className: 'hero-node bottom-left',
    delay: 0.2,
  },
  {
    title: 'Print queue ready',
    description: 'The automation passes the job to the print pipeline.',
    icon: Printer,
    className: 'hero-node bottom-right',
    delay: 0.28,
  },
]

const statusItems = ['PDF DOCX PPTX JPG PNG', 'No separate app install', 'Workflow-first experience']

export function HeroVisual() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="glass-card hero-visual-shell"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="hero-grid-pattern" aria-hidden="true"></div>
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.34, 0.2] }}
        className="hero-orb hero-orb-one"
        transition={{ duration: 6, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        animate={{ scale: [1.02, 1, 1.06, 1.02], opacity: [0.18, 0.25, 0.2, 0.18] }}
        className="hero-orb hero-orb-two"
        transition={{ duration: 7.2, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="hero-visual-stage">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          className="hero-core-panel"
          transition={{ duration: 4.8, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="hero-core-badge">
            <Sparkles size={16} />
            Print automation
          </span>
          <h3>AutoPrint Engine</h3>
          <p>From document upload to print-ready queueing in one guided path.</p>
        </motion.div>

        <div className="hero-connectors" aria-hidden="true">
          <span className="hero-connector connector-top-left"></span>
          <span className="hero-connector connector-top-right"></span>
          <span className="hero-connector connector-bottom-left"></span>
          <span className="hero-connector connector-bottom-right"></span>
        </div>

        {flowNodes.map((node) => (
          <motion.div
            key={node.title}
            animate={{ y: [0, -8, 0] }}
            className={node.className}
            transition={{
              duration: 4.6,
              delay: node.delay,
              ease: 'easeInOut',
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <div className="hero-node-icon">
              <node.icon size={18} />
            </div>
            <div className="hero-node-copy">
              <strong>{node.title}</strong>
              <span>{node.description}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        className="hero-status-panel"
        transition={{ duration: 10, ease: 'linear', repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="hero-status-top">
          <span className="hero-status-title">Workflow status</span>
          <span className="hero-status-pill">
            <CheckCircle2 size={14} />
            Ready
          </span>
        </div>
        <div className="hero-status-list">
          {statusItems.map((item) => (
            <span key={item} className="hero-status-chip">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
