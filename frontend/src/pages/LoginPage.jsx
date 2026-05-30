import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const { login } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await loginUser(formData)
      login(response.data.token)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#0a0612' }}
    >
      {/* Ambient blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

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
        <span>←</span> Back
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
        {/* Inner top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(183,148,232,0.6), transparent)'
          }}
        />

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
            🔑
          </div>
          <h1 className="text-2xl font-extrabold text-text-primary mb-2">
            Welcome Back
          </h1>
          <p className="text-text-secondary text-sm">
            Sign in to continue your AI resume analysis
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="text-sm px-4 py-3 rounded-xl mb-5 fade-in"
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
              placeholder="••••••••"
              required
              className="input-dark px-4 py-3 text-sm w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-3.5 text-sm mt-2 w-full disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            <span>{loading ? '✦ Signing you in...' : 'Sign In →'}</span>
          </button>

        </form>

        {/* Divider */}
        <div className="divider-glow my-6" />

        {/* Footer */}
        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="gradient-text-2 font-semibold hover:opacity-80 transition-opacity"
          >
            Create one free
          </Link>
        </p>

        {/* Bottom brand */}
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

      </div>
    </div>
  )
}

export default LoginPage