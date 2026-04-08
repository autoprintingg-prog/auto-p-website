import type { ReactNode } from 'react'
import { FloatingWhatsApp } from './FloatingWhatsApp'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <div className="ambient ambient-one"></div>
      <div className="ambient ambient-two"></div>
      <Navbar />
      <main className="site-main">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
