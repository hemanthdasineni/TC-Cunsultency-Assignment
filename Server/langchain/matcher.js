import { askGemini } from "../services/gemini.services.js";

export const matchJobsWithResume = async (resumeText, jobs) => {
  const prompt = `
You are an AI job matching assistant.

Resume:
${resumeText}

Jobs:
${JSON.stringify(jobs)}

Return ONLY JSON array like:

[
 { "id": number, "score": 0-100, "reason": "short reason" }
]
`;

  try {
    const response = await askGemini(prompt);
    const cleaned = response.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Batch matcher error:", error.message);
    return [];
  }
};
