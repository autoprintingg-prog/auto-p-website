import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AdminLayout } from './components/AdminLayout'
import { Layout } from './components/Layout'
import { PageTransition } from './components/PageTransition'
import { ScrollToTop } from './hooks/ScrollToTop'
import { useAdminAuth } from './hooks/useAdminAuth'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PricingPage } from './pages/PricingPage'
import { RefundPolicyPage } from './pages/RefundPolicyPage'
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const { status } = useAdminAuth()

  const content = (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/how-it-works"
            element={
              <PageTransition>
                <HowItWorksPage />
              </PageTransition>
            }
          />
          <Route
            path="/pricing"
            element={
              <PageTransition>
                <PricingPage />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <AboutPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <PageTransition>
                <TermsAndConditionsPage />
              </PageTransition>
            }
          />
          <Route
            path="/refund-policy"
            element={
              <PageTransition>
                <RefundPolicyPage />
              </PageTransition>
            }
          />
          <Route
            path="/admin"
            element={
              <PageTransition>
                {status === 'authenticated' ? (
                  <AdminDashboardPage />
                ) : (
                  <Navigate replace to="/admin/login" />
                )}
              </PageTransition>
            }
          />
          <Route
            path="/admin/login"
            element={
              <PageTransition>
                {status === 'authenticated' ? <Navigate replace to="/admin" /> : <AdminLoginPage />}
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFoundPage />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  )

  return isAdminRoute ? <AdminLayout>{content}</AdminLayout> : <Layout>{content}</Layout>
}

export default App
