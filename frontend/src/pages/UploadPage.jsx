import { useState } from 'react'
import { uploadResume } from '../services/resumeService'
import { useAuth } from '../context/AuthContext'

const UploadPage = () => {
  const { logout } = useAuth()
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

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

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const response = await uploadResume(file)
      setResult(response.data)
    } catch (err) {
      if (err.response?.status === 401) {
        logout()
      }
      setError(err.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const ScoreCircle = ({ score, label, color }) => (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-extrabold text-white ${color}`}>
        {score}
      </div>
      <span className="text-xs font-semibold text-text-mid">{label}</span>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <span className="text-xl font-bold text-text-dark">ResumeAI</span>
        </div>
        <button
          onClick={logout}
          className="text-text-mid font-medium hover:text-text-dark transition-colors text-sm"
        >
          Sign Out
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-text-dark mb-2">
            Upload Your Resume
          </h1>
          <p className="text-text-mid">
            Get instant AI powered feedback on your resume
          </p>
        </div>

        {/* Drop Zone */}
        {!result && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('fileInput').click()}
            className="border-2 border-dashed border-lavender rounded-3xl p-12 text-center bg-white cursor-pointer hover:bg-soft transition-colors"
          >
            <div className="text-5xl mb-4">
              {file ? '📄' : '☁️'}
            </div>
            <p className="text-text-dark font-semibold text-lg mb-1">
              {file ? file.name : 'Drop your resume here'}
            </p>
            <p className="text-text-light text-sm">
              {file
                ? `${(file.size / 1024).toFixed(1)} KB`
                : 'or click to browse — PDF only'}
            </p>
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
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mt-4">
            {error}
          </div>
        )}

        {/* Upload Button */}
        {file && !result && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-lavender text-text-dark font-bold py-4 rounded-full hover:bg-lavender-dark transition-colors mt-6 disabled:opacity-50 text-lg"
          >
            {loading ? '🤖 Analyzing with AI...' : 'Analyze Resume ✨'}
          </button>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center mt-8">
            <div className="text-text-mid text-sm animate-pulse">
              AI is reading your resume — this takes a few seconds...
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="flex flex-col gap-6">

            {/* Score Cards */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-text-dark mb-6 text-center">
                Your Resume Score
              </h2>
              <div className="flex items-center justify-center gap-12">
                <ScoreCircle
                  score={result.analysis.overallScore}
                  label="Overall Score"
                  color="bg-lavender-dark"
                />
                <ScoreCircle
                  score={result.analysis.atsScore}
                  label="ATS Score"
                  color="bg-rose-dark"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-extrabold text-text-dark mb-3">
                📋 Summary
              </h3>
              <p className="text-text-mid leading-relaxed">
                {result.analysis.summary}
              </p>
            </div>

            {/* Strengths */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-extrabold text-text-dark mb-4">
                💪 Strengths
              </h3>
              <div className="flex flex-col gap-3">
                {result.analysis.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-mint bg-opacity-30 rounded-xl p-4"
                  >
                    <span className="text-mint-dark font-bold text-lg">✓</span>
                    <p className="text-text-dark text-sm leading-relaxed">
                      {strength}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-extrabold text-text-dark mb-4">
                🚀 Areas to Improve
              </h3>
              <div className="flex flex-col gap-3">
                {result.analysis.improvements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-peach bg-opacity-30 rounded-xl p-4"
                  >
                    <span className="text-peach-dark font-bold text-lg">→</span>
                    <p className="text-text-dark text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-extrabold text-text-dark mb-4">
                🏷️ Keywords Found
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.analysis.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-lavender bg-opacity-40 text-text-dark text-sm font-semibold px-4 py-2 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Upload Another */}
            <button
              onClick={() => {
                setFile(null)
                setResult(null)
              }}
              className="w-full border-2 border-lavender text-text-dark font-bold py-4 rounded-full hover:bg-soft transition-colors"
            >
              Analyze Another Resume
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default UploadPage