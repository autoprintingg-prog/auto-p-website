import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, scale: 0.985, filter: 'blur(10px)' }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1], delay }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
    >
      {children}
    </motion.div>
  )
}
