import pdf from 'pdf-parse-new'
import { analyzeResume } from '../utils/aiAnalyzer.js'

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const dataBuffer = req.file.buffer
    const data = await pdf(dataBuffer)
    const extractedText = data.text

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ message: 'Could not extract text from PDF' })
    }

    const analysis = await analyzeResume(extractedText)

    res.status(200).json({
      message: 'Resume analyzed successfully',
      extractedText,
      pageCount: data.numpages,
      analysis
    })

  } catch (err) {
    console.error('Resume processing error:', err.message)
    res.status(500).json({
      message: 'Failed to process resume',
      error: err.message
    })
  }
}