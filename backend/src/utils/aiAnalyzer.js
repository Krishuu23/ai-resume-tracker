import dotenv from 'dotenv'
dotenv.config()

import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export const analyzeResume = async (resumeText) => {
  const prompt = `
You are a world-class career coach and senior technical recruiter with 15+ years of experience hiring at FAANG companies, top startups, and Fortune 500 firms. You have reviewed over 50,000 resumes.

Analyze the following resume with the depth and precision of a real expert. Be specific, honest, and actionable. Reference actual content from the resume — names, technologies, companies, roles — not generic advice.

Return ONLY a valid JSON object with exactly this structure. No markdown, no explanation, just JSON:

{
  "overallScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "experienceLevel": <"Entry Level" | "Mid Level" | "Senior Level" | "Executive">,
  "topRole": <"Best job title this resume targets, e.g. Frontend Developer">,

  "summary": <"3-4 sentence expert assessment. Be direct. Mention specific things from the resume. What is this person's strongest selling point? What is the single biggest thing holding them back?">,

  "scoreBreakdown": {
    "impact": <number 0-100>,
    "clarity": <number 0-100>,
    "relevance": <number 0-100>,
    "formatting": <number 0-100>,
    "keywords": <number 0-100>
  },

  "strengths": [
    <"Specific strength 1 — reference actual resume content">,
    <"Specific strength 2 — reference actual resume content">,
    <"Specific strength 3 — reference actual resume content">,
    <"Specific strength 4 — reference actual resume content">
  ],

  "improvements": [
    <"Specific critical issue 1 with exact fix — reference actual resume content">,
    <"Specific critical issue 2 with exact fix">,
    <"Specific critical issue 3 with exact fix">,
    <"Specific critical issue 4 with exact fix">
  ],

  "keywordsFound": [<"keyword1">, <"keyword2">, <"keyword3">, <"keyword4">, <"keyword5">, <"keyword6">],
  "keywordsMissing": [<"important missing keyword1">, <"missing keyword2">, <"missing keyword3">, <"missing keyword4">],

  "sectionFeedback": {
    "experience": <"Specific feedback on their work experience section">,
    "education": <"Specific feedback on education section">,
    "skills": <"Specific feedback on skills section">,
    "summary": <"Feedback on their resume summary/objective if present, or note it is missing">
  },

  "quickWins": [
    <"One small change they can make today for immediate improvement">,
    <"Another quick win">,
    <"Another quick win">
  ],

  "verdict": <"One punchy sentence. Would you shortlist this resume? Be honest.">
}

Resume to analyze:
${resumeText}
`

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.4,
    max_tokens: 2000,
  })

  const responseText = completion.choices[0]?.message?.content

  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No valid JSON in AI response')

  return JSON.parse(jsonMatch[0])
}