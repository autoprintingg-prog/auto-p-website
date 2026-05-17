import { motion } from 'framer-motion'
import { AlertCircle, Eye, EyeOff, Lock, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

export function AdminLoginPage() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    setTimeout(() => {
      const success = login(password)
      setIsLoading(false)
      if (success) {
        navigate('/admin/dashboard')
      } else {
        setError('Incorrect password. Please try again.')
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 600)
        setPassword('')
      }
    }, 600)
  }

  return (
    <div className="admin-login-shell">
      <div className="admin-login-bg" aria-hidden="true">
        <div className="admin-login-orb admin-login-orb-1" />
        <div className="admin-login-orb admin-login-orb-2" />
        <div className="admin-login-grid" />
      </div>

      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-login-logo">
            <img src="/Logo.jpeg" alt="AutoPrint" />
          </div>
          <div className="admin-login-title-group">
            <span className="admin-login-eyebrow">
              <Sparkles size={13} />
              AutoPrinting
            </span>
            <h1 className="admin-login-title">Admin Panel</h1>
            <p className="admin-login-subtitle">Enter your password to access the dashboard.</p>
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          animate={isShaking ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
          className="admin-login-form"
        >
          <div className="admin-login-field">
            <label htmlFor="admin-password" className="admin-login-label">
              <Lock size={14} />
              Password
            </label>
            <div className="admin-login-input-wrap">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="admin-login-input"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-login-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              className="admin-login-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AlertCircle size={15} />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={isLoading || !password}
          >
            {isLoading ? (
              <span className="admin-login-spinner" />
            ) : (
              'Sign In'
            )}
          </button>
        </motion.form>

        <p className="admin-login-footer-note">
          Access restricted to authorized operators only.
        </p>
      </motion.div>
    </div>
  )
}
