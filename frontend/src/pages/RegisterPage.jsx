import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

const RegisterPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

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
      await registerUser(formData)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl">✨</span>
          <h1 className="text-2xl font-extrabold text-text-dark mt-3">
            Create Account
          </h1>
          <p className="text-text-mid text-sm mt-2">
            Start analyzing your resume today
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-text-dark">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="border border-lavender rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-light focus:outline-none focus:ring-2 focus:ring-lavender bg-soft"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-text-dark">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
              className="border border-lavender rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-light focus:outline-none focus:ring-2 focus:ring-lavender bg-soft"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-lavender text-text-dark font-bold py-3 rounded-full hover:bg-lavender-dark transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-text-mid mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-lavender-dark font-semibold hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage