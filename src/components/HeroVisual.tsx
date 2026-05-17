import { motion } from 'framer-motion'
import { CheckCircle2, CreditCard, FileText, Printer, SlidersHorizontal, Sparkles, Zap } from 'lucide-react'

const flowNodes = [
  {
    title: 'Document received',
    description: 'Supported files accepted in the request flow.',
    icon: FileText,
    className: 'hero-node top-left',
    delay: 0.1,
    floatDelay: 0,
  },
  {
    title: 'Options selected',
    description: 'Color mode, duplex, and copies are confirmed.',
    icon: SlidersHorizontal,
    className: 'hero-node top-right',
    delay: 0.22,
    floatDelay: 1.2,
  },
  {
    title: 'Cashfree handoff',
    description: 'Payment is verified before queue submission.',
    icon: CreditCard,
    className: 'hero-node bottom-left',
    delay: 0.34,
    floatDelay: 2.4,
  },
  {
    title: 'Print queue ready',
    description: 'The automation passes the job to the print pipeline.',
    icon: Printer,
    className: 'hero-node bottom-right',
    delay: 0.46,
    floatDelay: 3.6,
  },
]

const statusItems = ['PDF · DOCX · PPTX · JPG · PNG', 'No app download needed', 'Workflow-first design']

export function HeroVisual() {
  return (
    <motion.div
      className="glass-card hero-visual-shell"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
    >
      <div className="hero-grid-pattern" aria-hidden="true"></div>

      {/* Ambient orbs — pure CSS animation, no framer-motion conflict */}
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="hero-visual-stage">
        {/* Central core panel */}
        <motion.div
          className="hero-core-panel"
          animate={{
            y: [0, -7, 0],
          }}
          transition={{ duration: 5, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        >
          <span className="hero-core-badge">
            <Sparkles size={15} />
            Print automation
          </span>
          <h3>AutoPrint Engine</h3>
          <p>From document upload to print-ready queueing in one guided path.</p>
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)',
              }}
            >
              <Zap size={13} fill="currentColor" />
              <span>Live</span>
            </motion.div>
            <div style={{
              flex: 1, height: '4px', borderRadius: '99px',
              background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 2.8, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.8, delay: 0.6 }}
                style={{
                  height: '100%', borderRadius: '99px',
                  background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                }}
              />
            </div>
          </div>
        </motion.div>

        <div className="hero-connectors" aria-hidden="true">
          <span className="hero-connector connector-top-left"></span>
          <span className="hero-connector connector-top-right"></span>
          <span className="hero-connector connector-bottom-left"></span>
          <span className="hero-connector connector-bottom-right"></span>
        </div>

        {/* Flow nodes — enter once, then float continuously */}
        {flowNodes.map((node) => (
          <motion.div
            key={node.title}
            className={node.className}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -9, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: node.delay },
              scale: { duration: 0.5, delay: node.delay, ease: [0.34, 1.56, 0.64, 1] },
              y: {
                duration: 4.8,
                delay: node.floatDelay,
                ease: 'easeInOut',
                repeat: Number.POSITIVE_INFINITY,
              },
            }}
          >
            <div className="hero-node-icon">
              <node.icon size={17} />
            </div>
            <div className="hero-node-copy">
              <strong>{node.title}</strong>
              <span>{node.description}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status panel */}
      <motion.div
        className="hero-status-panel"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 12, ease: 'linear', repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="hero-status-top">
          <span className="hero-status-title">Workflow status</span>
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
            className="hero-status-pill"
          >
            <CheckCircle2 size={13} />
            Ready
          </motion.span>
        </div>
        <div className="hero-status-list">
          {statusItems.map((item, i) => (
            <motion.span
              key={item}
              className="hero-status-chip"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.7 + i * 0.1 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
