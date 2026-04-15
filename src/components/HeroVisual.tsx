import { motion } from 'framer-motion'
import { CheckCircle2, CreditCard, FileText, Printer, SlidersHorizontal, Sparkles, Zap } from 'lucide-react'

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
    delay: 0.18,
  },
  {
    title: 'Cashfree handoff',
    description: 'Payment is verified before queue submission.',
    icon: CreditCard,
    className: 'hero-node bottom-left',
    delay: 0.36,
  },
  {
    title: 'Print queue ready',
    description: 'The automation passes the job to the print pipeline.',
    icon: Printer,
    className: 'hero-node bottom-right',
    delay: 0.54,
  },
]

const statusItems = ['PDF · DOCX · PPTX · JPG · PNG', 'No app download needed', 'Workflow-first design']

export function HeroVisual() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="glass-card hero-visual-shell"
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-grid-pattern" aria-hidden="true"></div>
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.22, 0.42, 0.22],
          x: [0, 10, 0],
        }}
        className="hero-orb hero-orb-one"
        transition={{ duration: 7, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        animate={{
          scale: [1.04, 1, 1.12, 1.04],
          opacity: [0.2, 0.32, 0.22, 0.2],
          x: [0, -12, 0],
        }}
        className="hero-orb hero-orb-two"
        transition={{ duration: 8.5, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="hero-visual-stage">
        <motion.div
          animate={{ y: [0, -8, 0], boxShadow: [
            'var(--shadow-md), 0 0 60px rgba(34, 212, 106, 0.08)',
            'var(--shadow-md), 0 0 80px rgba(34, 212, 106, 0.18)',
            'var(--shadow-md), 0 0 60px rgba(34, 212, 106, 0.08)',
          ]}}
          className="hero-core-panel"
          transition={{ duration: 5, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
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
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 3, ease: 'linear', repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
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

        {flowNodes.map((node) => (
          <motion.div
            key={node.title}
            animate={{ y: [0, -10, 0] }}
            className={node.className}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              y: {
                duration: 5,
                delay: node.delay,
                ease: 'easeInOut',
                repeat: Number.POSITIVE_INFINITY,
              },
              opacity: { duration: 0.6, delay: node.delay * 0.5 },
              scale: { duration: 0.6, delay: node.delay * 0.5, type: 'spring', stiffness: 200 },
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

      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        className="hero-status-panel"
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
              transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
