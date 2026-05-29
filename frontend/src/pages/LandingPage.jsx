import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-cream">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="text-xl font-bold text-text-dark">ResumeAI</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-text-mid font-medium hover:text-text-dark transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-lavender text-text-dark font-semibold px-5 py-2 rounded-full hover:bg-lavender-dark transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-32">

        {/* Badge */}
        <div className="bg-rose bg-opacity-40 text-text-dark text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          🎯 AI Powered Resume Analysis
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-text-dark leading-tight max-w-2xl mb-6">
          Land Your Dream Job with
          <span className="text-lavender-dark"> AI Resume </span>
          Insights
        </h1>

        {/* Subheading */}
        <p className="text-text-mid text-lg max-w-xl mb-10 leading-relaxed">
          Upload your resume and get instant AI powered feedback.
          Know exactly what recruiters see and how to stand out.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/register"
            className="bg-lavender text-text-dark font-bold px-8 py-3 rounded-full hover:bg-lavender-dark transition-colors shadow-sm"
          >
            Try it Free
          </Link>
          <Link
            to="/login"
            className="bg-white text-text-dark font-bold px-8 py-3 rounded-full hover:bg-soft transition-colors shadow-sm border border-lavender"
          >
            Sign In
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl w-full">

          <div className="bg-white rounded-2xl p-6 shadow-sm text-left">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="font-bold text-text-dark text-lg mb-2">
              Upload Resume
            </h3>
            <p className="text-text-mid text-sm leading-relaxed">
              Simply upload your PDF resume and our system extracts everything instantly.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm text-left">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-bold text-text-dark text-lg mb-2">
              AI Analysis
            </h3>
            <p className="text-text-mid text-sm leading-relaxed">
              Our AI reads your resume like a recruiter and gives you honest actionable feedback.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm text-left">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-text-dark text-lg mb-2">
              Get Hired
            </h3>
            <p className="text-text-mid text-sm leading-relaxed">
              Apply the suggestions, stand out from the crowd, and land more interviews.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default LandingPage