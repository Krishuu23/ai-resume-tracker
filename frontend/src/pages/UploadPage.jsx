import { useState } from 'react'
import { uploadResume } from '../services/resumeService'
import { useAuth } from '../context/AuthContext'

const UploadPage = () => {
  const { logout } = useAuth()
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.type === 'application/pdf') {
      setFile(selected)
      setError('')
    } else {
      setError('Please select a PDF file')
      setFile(null)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped)
      setError('')
    } else {
      setError('Please drop a PDF file')
    }
  }

  const handleDragOver = (e) => e.preventDefault()

  const handleSubmit = async () => {
    if (!file) return setError('Please select a file first')
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const response = await uploadResume(file)
      setResult(response.data)
      setActiveTab('overview')
    } catch (err) {
      if (err.response?.status === 401) logout()
      setError(err.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const ScoreRing = ({ score, label, color, size = 'normal' }) => {
    const isLarge = size === 'large'
    const dim = isLarge ? 140 : 90
    const r = isLarge ? 54 : 34
    const circumference = 2 * Math.PI * r
    const offset = circumference - (score / 100) * circumference

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative" style={{ width: dim, height: dim }}>
          <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
            <circle
              cx={dim / 2} cy={dim / 2} r={r}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={isLarge ? 10 : 7}
            />
            <circle
              cx={dim / 2} cy={dim / 2} r={r}
              fill="none"
              stroke={color}
              strokeWidth={isLarge ? 10 : 7}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
              style={{
                filter: `drop-shadow(0 0 8px ${color})`,
                transition: 'stroke-dashoffset 1.5s ease'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-extrabold"
              style={{
                fontSize: isLarge ? '2rem' : '1.1rem',
                color: color,
                textShadow: `0 0 20px ${color}`
              }}
            >
              {score}
            </span>
          </div>
        </div>
        <span className="text-xs font-semibold text-text-secondary text-center">
          {label}
        </span>
      </div>
    )
  }

  const ScoreBar = ({ label, score }) => {
    const getColor = (s) => {
      if (s >= 80) return '#82e8b5'
      if (s >= 60) return '#b794e8'
      if (s >= 40) return '#ffb882'
      return '#ff8fab'
    }
    const color = getColor(score)
    return (
      <div className="flex items-center gap-4">
        <span className="text-xs text-text-secondary w-24 shrink-0">{label}</span>
        <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${score}%`,
              background: color,
              boxShadow: `0 0 10px ${color}`
            }}
          />
        </div>
        <span className="text-xs font-bold w-8 text-right" style={{ color }}>
          {score}
        </span>
      </div>
    )
  }

  const tabs = ['overview', 'strengths', 'improvements', 'keywords', 'sections']

  const analysis = result?.analysis

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: '#0a0612' }}
    >
      {/* Blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Grid */}
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

      {/* Navbar */}
      <nav
        className="navbar sticky top-0 z-50 flex items-center justify-between px-8 py-4"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{
              background: 'linear-gradient(135deg, #b794e8, #ff8fab)',
              boxShadow: '0 0 20px rgba(183,148,232,0.5)'
            }}
          >
            ✦
          </div>
          <span className="text-lg font-extrabold gradient-text">ResumeAI</span>
        </div>
        <button
          onClick={logout}
          className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-5"
        >
          Sign Out
        </button>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">

        {/* Page header */}
        {!result && (
          <div className="text-center mb-12 fade-up">
            <h1
              className="font-extrabold text-text-primary mb-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              Analyze Your{' '}
              <span className="gradient-text">Resume</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-md mx-auto">
              Get a deep, expert-level AI analysis in seconds
            </p>
          </div>
        )}

        {/* Upload zone */}
        {!result && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('fileInput').click()}
            className="upload-zone rounded-3xl p-16 text-center cursor-pointer fade-up d-2 relative overflow-hidden"
          >
            {/* inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(183,148,232,0.08) 0%, transparent 70%)'
              }}
            />
            <div className="relative z-10">
              <div
                className="text-6xl mb-5 float-y inline-block"
                style={{ animationDuration: '3s' }}
              >
                {file ? '📄' : '☁️'}
              </div>
              <p className="text-text-primary font-bold text-xl mb-2">
                {file ? file.name : 'Drop your resume here'}
              </p>
              <p className="text-text-muted text-sm">
                {file
                  ? `${(file.size / 1024).toFixed(1)} KB · PDF ready`
                  : 'Click to browse or drag and drop · PDF only · Max 5MB'
                }
              </p>
            </div>
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="text-sm px-5 py-4 rounded-2xl mt-4 fade-in"
            style={{
              background: 'rgba(255,100,130,0.1)',
              border: '1px solid rgba(255,100,130,0.3)',
              color: '#ff8fab'
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* Upload button */}
        {file && !result && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary w-full py-4 text-base mt-6 fade-up"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            <span>
              {loading ? '🤖 AI is analyzing your resume...' : 'Analyze My Resume ✦'}
            </span>
          </button>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center mt-8 fade-in">
            <div className="flex flex-col items-center gap-3">
              {[
                'Extracting resume content...',
                'Scoring impact and clarity...',
                'Identifying keyword gaps...',
                'Generating expert insights...'
              ].map((step, i) => (
                <div
                  key={i}
                  className="text-text-muted text-sm fade-up"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== RESULTS ===== */}
        {result && analysis && (
          <div className="fade-up flex flex-col gap-6">

            {/* Result header */}
            <div
              className="rounded-3xl p-8 relative overflow-hidden"
              style={{
                background: 'rgba(183,148,232,0.06)',
                border: '1px solid rgba(183,148,232,0.2)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(183,148,232,0.12) 0%, transparent 70%)'
                }}
              />
              <div className="relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          background: 'rgba(183,148,232,0.15)',
                          border: '1px solid rgba(183,148,232,0.3)',
                          color: '#d4b8f0'
                        }}
                      >
                        {analysis.experienceLevel}
                      </span>
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          background: 'rgba(130,191,255,0.1)',
                          border: '1px solid rgba(130,191,255,0.3)',
                          color: '#b5d8ff'
                        }}
                      >
                        {analysis.topRole}
                      </span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-text-primary">
                      Analysis Complete
                    </h2>
                    <p className="text-text-secondary text-sm mt-1">
                      {result.pageCount} page resume · Analyzed by AI
                    </p>
                  </div>

                  {/* Score rings */}
                  <div className="flex items-center gap-8">
                    <ScoreRing
                      score={analysis.overallScore}
                      label="Overall Score"
                      color="#b794e8"
                      size="large"
                    />
                    <ScoreRing
                      score={analysis.atsScore}
                      label="ATS Score"
                      color="#ff8fab"
                    />
                  </div>
                </div>

                {/* Verdict banner */}
                <div
                  className="rounded-2xl px-5 py-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Expert Verdict
                  </span>
                  <p className="text-text-primary font-semibold mt-1 leading-relaxed">
                    "{analysis.verdict}"
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div
              className="flex gap-1 p-1.5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(183,148,232,0.1)'
              }}
            >
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all duration-300"
                  style={{
                    background: activeTab === tab
                      ? 'linear-gradient(135deg, rgba(183,148,232,0.3), rgba(255,143,171,0.2))'
                      : 'transparent',
                    color: activeTab === tab ? '#f0eaff' : '#6b5f8a',
                    border: activeTab === tab
                      ? '1px solid rgba(183,148,232,0.3)'
                      : '1px solid transparent'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-5 fade-up">

                {/* Summary */}
                <div
                  className="rounded-3xl p-7"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(183,148,232,0.15)'
                  }}
                >
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">
                    📋 Expert Summary
                  </h3>
                  <p className="text-text-primary leading-relaxed">
                    {analysis.summary}
                  </p>
                </div>

                {/* Score breakdown */}
                <div
                  className="rounded-3xl p-7"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(183,148,232,0.15)'
                  }}
                >
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">
                    📊 Score Breakdown
                  </h3>
                  <div className="flex flex-col gap-4">
                    {Object.entries(analysis.scoreBreakdown).map(([key, val]) => (
                      <ScoreBar
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        score={val}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick wins */}
                <div
                  className="rounded-3xl p-7"
                  style={{
                    background: 'rgba(184,240,212,0.04)',
                    border: '1px solid rgba(130,232,181,0.15)'
                  }}
                >
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">
                    ⚡ Quick Wins — Do These Today
                  </h3>
                  <div className="flex flex-col gap-3">
                    {analysis.quickWins.map((win, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{
                            background: 'rgba(130,232,181,0.2)',
                            border: '1px solid rgba(130,232,181,0.4)',
                            color: '#82e8b5'
                          }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-text-primary text-sm leading-relaxed">{win}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* STRENGTHS TAB */}
            {activeTab === 'strengths' && (
              <div className="flex flex-col gap-4 fade-up">
                <div
                  className="rounded-3xl p-7"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(183,148,232,0.15)'
                  }}
                >
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">
                    💪 What You're Doing Right
                  </h3>
                  <div className="flex flex-col gap-4">
                    {analysis.strengths.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 rounded-2xl p-4"
                        style={{
                          background: 'rgba(130,232,181,0.06)',
                          border: '1px solid rgba(130,232,181,0.15)'
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                          style={{
                            background: 'rgba(130,232,181,0.15)',
                            color: '#82e8b5',
                            boxShadow: '0 0 15px rgba(130,232,181,0.2)'
                          }}
                        >
                          ✓
                        </div>
                        <p className="text-text-primary text-sm leading-relaxed pt-1">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* IMPROVEMENTS TAB */}
            {activeTab === 'improvements' && (
              <div className="flex flex-col gap-4 fade-up">
                <div
                  className="rounded-3xl p-7"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(183,148,232,0.15)'
                  }}
                >
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">
                    🚀 Critical Improvements
                  </h3>
                  <div className="flex flex-col gap-4">
                    {analysis.improvements.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 rounded-2xl p-4"
                        style={{
                          background: 'rgba(255,143,171,0.06)',
                          border: '1px solid rgba(255,143,171,0.15)'
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                          style={{
                            background: 'rgba(255,143,171,0.15)',
                            color: '#ff8fab',
                            boxShadow: '0 0 15px rgba(255,143,171,0.2)'
                          }}
                        >
                          {i + 1}
                        </div>
                        <p className="text-text-primary text-sm leading-relaxed pt-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KEYWORDS TAB */}
            {activeTab === 'keywords' && (
              <div className="flex flex-col gap-5 fade-up">

                <div
                  className="rounded-3xl p-7"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(183,148,232,0.15)'
                  }}
                >
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">
                    ✅ Keywords Found in Your Resume
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywordsFound.map((kw, i) => (
                      <span
                        key={i}
                        className="text-sm font-semibold px-4 py-2 rounded-full"
                        style={{
                          background: 'rgba(183,148,232,0.15)',
                          border: '1px solid rgba(183,148,232,0.3)',
                          color: '#d4b8f0'
                        }}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-3xl p-7"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,143,171,0.15)'
                  }}
                >
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">
                    ❌ Missing Keywords — Add These
                  </h3>
                  <p className="text-text-muted text-xs mb-4">
                    These are commonly searched by recruiters hiring for your target role
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywordsMissing.map((kw, i) => (
                      <span
                        key={i}
                        className="text-sm font-semibold px-4 py-2 rounded-full"
                        style={{
                          background: 'rgba(255,143,171,0.1)',
                          border: '1px solid rgba(255,143,171,0.25)',
                          color: '#ff8fab'
                        }}
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SECTIONS TAB */}
            {activeTab === 'sections' && (
              <div className="flex flex-col gap-4 fade-up">
                {Object.entries(analysis.sectionFeedback).map(([section, feedback]) => (
                  <div
                    key={section}
                    className="rounded-3xl p-7"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(183,148,232,0.15)'
                    }}
                  >
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-3 capitalize"
                      style={{ color: '#b794e8' }}
                    >
                      {section === 'experience' && '💼'} 
                      {section === 'education' && '🎓'} 
                      {section === 'skills' && '🛠'} 
                      {section === 'summary' && '📝'} 
                      {' '}{section}
                    </h3>
                    <p className="text-text-primary text-sm leading-relaxed">
                      {feedback}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Analyze another */}
            <button
              onClick={() => { setFile(null); setResult(null) }}
              className="btn-secondary w-full py-4 text-sm mt-2"
            >
              ↑ Analyze Another Resume
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default UploadPage