import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await registerUser(formData)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const perks = [
    { icon: '🎯', text: 'Instant AI resume scoring' },
    { icon: '💡', text: 'Actionable improvement tips' },
    { icon: '🚀', text: 'ATS compatibility check' },
  ]

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#0a0612' }}
    >
      {/* Ambient blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(183,148,232,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(183,148,232,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Back to home */}
      <Link
        to="/"
        className="fixed top-6 left-8 z-50 flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
      >
        ← Back
      </Link>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl p-8 fade-up"
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(183, 148, 232, 0.2)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 80px rgba(183,148,232,0.05)'
        }}
      >
        {/* Inner top glow line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(183,148,232,0.6), transparent)'
          }}
        />

        {/* Success state */}
        {success ? (
          <div className="text-center py-8 fade-up">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 float-y"
              style={{
                background: 'linear-gradient(135deg, rgba(184,240,212,0.2), rgba(130,232,181,0.1))',
                border: '1px solid rgba(184,240,212,0.4)',
                boxShadow: '0 0 40px rgba(130,232,181,0.3)'
              }}
            >
              ✓
            </div>
            <h2 className="text-2xl font-extrabold text-text-primary mb-2">
              Account Created!
            </h2>
            <p className="text-text-secondary text-sm">
              Redirecting you to sign in...
            </p>
            <div className="mt-4 h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #b794e8, #82e8b5)',
                  animation: 'shimmer 1.5s linear forwards',
                  width: '100%'
                }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 float-y"
                style={{
                  background: 'linear-gradient(135deg, rgba(183,148,232,0.2), rgba(255,143,171,0.1))',
                  border: '1px solid rgba(183,148,232,0.3)',
                  boxShadow: '0 0 30px rgba(183,148,232,0.2)'
                }}
              >
                ✨
              </div>
              <h1 className="text-2xl font-extrabold text-text-primary mb-2">
                Create Your Account
              </h1>
              <p className="text-text-secondary text-sm">
                Free forever. No credit card needed.
              </p>
            </div>

            {/* Perks */}
            <div
              className="rounded-2xl p-4 mb-6 flex flex-col gap-2"
              style={{
                background: 'rgba(183,148,232,0.05)',
                border: '1px solid rgba(183,148,232,0.1)'
              }}
            >
              {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-base">{perk.icon}</span>
                  <span className="text-text-secondary text-xs font-medium">
                    {perk.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div
                className="text-sm px-4 py-3 rounded-xl mb-5"
                style={{
                  background: 'rgba(255, 100, 130, 0.1)',
                  border: '1px solid rgba(255, 100, 130, 0.3)',
                  color: '#ff8fab'
                }}
              >
                ⚠ {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="input-dark px-4 py-3 text-sm w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••  (min 6 characters)"
                  required
                  className="input-dark px-4 py-3 text-sm w-full"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-3.5 text-sm mt-2 w-full"
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                <span>
                  {loading ? '✦ Creating your account...' : 'Create Free Account →'}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="divider-glow my-6" />

            {/* Footer */}
            <p className="text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                className="gradient-text-2 font-semibold hover:opacity-80 transition-opacity"
              >
                Sign in
              </Link>
            </p>

            {/* Brand */}
            <div className="text-center mt-6">
              <Link to="/" className="inline-flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center text-xs"
                  style={{ background: 'linear-gradient(135deg, #b794e8, #ff8fab)' }}
                >
                  ✦
                </div>
                <span className="text-xs font-bold gradient-text">ResumeAI</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RegisterPage