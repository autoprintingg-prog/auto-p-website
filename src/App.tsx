import { AnimatePresence } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext'
import { Layout } from './components/Layout'
import { PageTransition } from './components/PageTransition'
import { ScrollToTop } from './hooks/ScrollToTop'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RefundPolicyPage } from './pages/RefundPolicyPage'
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function PublicRoutes() {
  const location = useLocation()

  return (
    <Layout>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/how-it-works" element={<PageTransition><HowItWorksPage /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><NotFoundPage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/terms-and-conditions" element={<PageTransition><TermsAndConditionsPage /></PageTransition>} />
          <Route path="/refund-policy" element={<PageTransition><RefundPolicyPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Admin routes — no public Layout wrapper */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
        </Route>

        {/* All public pages */}
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </AdminAuthProvider>
  )
}

export default App
