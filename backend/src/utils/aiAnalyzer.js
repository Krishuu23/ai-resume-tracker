import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const analyzeResume = async (resumeText) => {

    console.log(process.env.GROQ_API_KEY);

  const prompt = `
You are an expert resume reviewer and career coach.

Analyze this resume and return ONLY valid JSON in this format:

{
  "overallScore": number,
  "summary": "text",
  "strengths": ["point1", "point2", "point3"],
  "improvements": ["point1", "point2", "point3"],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "atsScore": number
}

Resume:
${resumeText}
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.3,
  });

  const responseText =
    completion.choices[0]?.message?.content;

  return JSON.parse(responseText);
};