import { type FormEvent, useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Reveal } from '../components/Reveal'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { useSiteContent } from '../hooks/useSiteContent'

const initialAuthForm = {
  email: '',
  password: '',
  confirmPassword: '',
}

export function AdminLoginPage() {
  const { siteName } = useSiteContent()
  const { login, setupAccount, status } = useAdminAuth()
  const [authForm, setAuthForm] = useState(initialAuthForm)
  const [authNotice, setAuthNotice] = useState(
    'This admin access is stored in your browser for this project workspace.',
  )

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (status === 'setup') {
      if (authForm.password !== authForm.confirmPassword) {
        setAuthNotice('Passwords do not match.')
        return
      }

      const result = await setupAccount(authForm.email, authForm.password)
      setAuthNotice(
        result.message ?? (result.success ? 'Admin account created.' : 'Unable to create account.'),
      )

      if (result.success) {
        setAuthForm(initialAuthForm)
      }

      return
    }

    const result = await login(authForm.email, authForm.password)
    setAuthNotice(result.message ?? (result.success ? 'Signed in.' : 'Unable to sign in.'))

    if (result.success) {
      setAuthForm(initialAuthForm)
    }
  }

  return (
    <div className="admin-login-view">
      <Reveal>
        <Card className="admin-auth-card">
          <span className="eyebrow">{status === 'setup' ? 'Create Admin Access' : 'Admin Login'}</span>
          <h1>{status === 'setup' ? `Create the ${siteName} admin account.` : `Sign in to manage ${siteName}.`}</h1>
          <p className="lead">
            This login route is separate from the public website. Once you sign in, the dashboard opens
            at `/admin` and the public UI stays clean.
          </p>

          <form className="contact-form" onSubmit={handleAuthSubmit}>
            <div className="form-grid">
              <label className="field field-full">
                <span>Admin email</span>
                <input
                  onChange={(event) =>
                    setAuthForm((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="admin@autoprint.com"
                  type="email"
                  value={authForm.email}
                />
              </label>

              <label className="field field-full">
                <span>Password</span>
                <input
                  onChange={(event) =>
                    setAuthForm((current) => ({ ...current, password: event.target.value }))
                  }
                  placeholder="Minimum 6 characters"
                  type="password"
                  value={authForm.password}
                />
              </label>

              {status === 'setup' ? (
                <label className="field field-full">
                  <span>Confirm password</span>
                  <input
                    onChange={(event) =>
                      setAuthForm((current) => ({ ...current, confirmPassword: event.target.value }))
                    }
                    placeholder="Re-enter the password"
                    type="password"
                    value={authForm.confirmPassword}
                  />
                </label>
              ) : null}
            </div>

            <div className="form-actions">
              <Button size="lg" type="submit">
                {status === 'setup' ? 'Create Admin Account' : 'Sign In'}
              </Button>
              <Button size="lg" to="/" variant="secondary">
                Return to Website
              </Button>
            </div>

            <p className="form-notice">{authNotice}</p>
          </form>
        </Card>
      </Reveal>
    </div>
  )
}
