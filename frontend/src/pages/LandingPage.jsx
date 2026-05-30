import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const LandingPage = () => {
  const revealRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    revealRefs.current.forEach(ref => { if (ref) observer.observe(ref) })
    return () => observer.disconnect()
  }, [])

  const addRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  const features = [
    {
      emoji: '📄',
      title: 'Smart Upload',
      desc: 'Drop your PDF resume and watch our engine extract every detail in milliseconds.',
      glow: 'rgba(255, 143, 171, 0.3)',
      border: 'rgba(255, 181, 200, 0.2)',
      iconBg: 'rgba(255, 181, 200, 0.1)',
    },
    {
      emoji: '🤖',
      title: 'AI Deep Analysis',
      desc: 'Our AI thinks like a senior recruiter — scoring, critiquing, and advising in real time.',
      glow: 'rgba(183, 148, 232, 0.3)',
      border: 'rgba(212, 184, 240, 0.2)',
      iconBg: 'rgba(212, 184, 240, 0.1)',
    },
    {
      emoji: '🚀',
      title: 'Get Hired Faster',
      desc: 'Precise suggestions that make you stand out from hundreds of other applicants.',
      glow: 'rgba(130, 191, 255, 0.3)',
      border: 'rgba(181, 216, 255, 0.2)',
      iconBg: 'rgba(181, 216, 255, 0.1)',
    },
  ]

  const stats = [
    { number: '10K+', label: 'Resumes Analyzed', emoji: '📄' },
    { number: '94%', label: 'Success Rate', emoji: '🎯' },
    { number: '2s', label: 'Analysis Time', emoji: '⚡' },
    { number: '4.9★', label: 'User Rating', emoji: '💜' },
  ]

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: '#0a0612' }}
    >
      {/* Ambient background blobs */}
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

      {/* ===== NAVBAR ===== */}
      <nav className="navbar sticky top-0 z-50 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2 fade-in d-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{
              background: 'linear-gradient(135deg, #b794e8, #ff8fab)',
              boxShadow: '0 0 20px rgba(183,148,232,0.5)'
            }}
          >
            ✦
          </div>
          <span className="text-lg font-extrabold gradient-text tracking-tight">
            ResumeAI
          </span>
        </div>

        <div className="flex items-center gap-3 fade-in d-2">
          <Link
            to="/login"
            className="text-text-secondary font-medium px-4 py-2 rounded-full transition-all duration-300 hover:text-text-primary hover:bg-white hover:bg-opacity-5"
          >
            Sign In
          </Link>
          <Link to="/register" className="btn-primary px-6 py-2.5 text-sm">
            <span>Get Started Free →</span>
          </Link>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-28 pb-24">

        {/* Glow badge */}
        <div className="glow-badge text-sm font-semibold px-5 py-2 rounded-full mb-8 fade-up d-1 inline-flex items-center gap-2">
          <span className="rotate-slow inline-block">✦</span>
          Powered by Advanced AI
        </div>

        {/* Main heading */}
        <h1 className="fade-up d-2 font-extrabold leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', maxWidth: '820px' }}
        >
          <span style={{ color: '#f0eaff' }}>Your Resume.</span>
          <br />
          <span className="gradient-text">Reimagined by AI.</span>
        </h1>

        {/* Subheading */}
        <p className="fade-up d-3 text-text-secondary text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
          Upload your PDF and get an instant, brutally honest AI analysis.
          Know your score. Fix your gaps. Land the interview.
        </p>

        {/* CTA row */}
        <div className="fade-up d-4 flex flex-col sm:flex-row items-center gap-4 mb-20">
          <Link to="/register" className="btn-primary px-10 py-4 text-base">
            <span>Analyze My Resume 🚀</span>
          </Link>
          <Link to="/login" className="btn-secondary px-10 py-4 text-base">
            Sign In
          </Link>
        </div>

        {/* Stats row */}
        <div className="fade-up d-5 flex flex-wrap items-center justify-center gap-4 mb-24">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card rounded-2xl px-6 py-4 text-center"
              style={{ minWidth: '120px' }}
            >
              <div className="text-xl mb-1">{stat.emoji}</div>
              <div className="text-xl font-extrabold gradient-text">{stat.number}</div>
              <div className="text-xs text-text-muted font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-glow w-full max-w-3xl mb-24" />

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl w-full mb-24">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={addRef}
              className="reveal glass-card rounded-3xl p-8 text-left"
              style={{
                transitionDelay: `${i * 0.15}s`,
                borderColor: feature.border,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 float-y"
                style={{
                  background: feature.iconBg,
                  border: `1px solid ${feature.border}`,
                  animationDelay: `${i * 0.5}s`,
                  boxShadow: `0 0 20px ${feature.glow}`
                }}
              >
                {feature.emoji}
              </div>
              <h3 className="font-extrabold text-text-primary text-lg mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.desc}
              </p>
              <div
                className="mt-5 h-px w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${feature.glow}, transparent)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          ref={addRef}
          className="reveal w-full max-w-3xl rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: 'rgba(183, 148, 232, 0.06)',
            border: '1px solid rgba(183, 148, 232, 0.2)',
            boxShadow: '0 0 80px rgba(183, 148, 232, 0.08)'
          }}
        >
          {/* inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(183,148,232,0.15) 0%, transparent 70%)'
            }}
          />

          <div className="relative z-10">
            <div className="text-5xl mb-5 float-y">🌟</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 leading-tight">
              Ready to land your
              <span className="gradient-text"> dream job</span>?
            </h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Join thousands of professionals who transformed their careers with ResumeAI
            </p>
            <Link to="/register" className="btn-primary px-12 py-4 text-base inline-block">
              <span>Start for Free — No Card Required ✨</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-text-muted text-sm">
          Made with{' '}
          <span className="gradient-text-2 font-semibold">💜</span>
          {' '}for ambitious job seekers
        </div>

      </section>
    </div>
  )
}

export default LandingPage