import { askAI } from "../services/groqServices.js";

const extractJSONArray = (text) => {
  const firstBracket = text.indexOf("[");
  const lastBracket = text.lastIndexOf("]");

  if (firstBracket === -1 || lastBracket === -1) {
    throw new Error("No valid JSON array found in AI response");
  }

  const jsonString = text.substring(firstBracket, lastBracket + 1);

  return JSON.parse(jsonString);
};

export const matchJobsWithResume = async (resumeText, jobs) => {
  const prompt = `
You are an AI job matching assistant.

Respond ONLY with a valid JSON array.
Do NOT include explanations.
Do NOT include markdown.
Do NOT include extra text.

Resume:
${resumeText}

Jobs:
${JSON.stringify(jobs)}

Return ONLY this format:

[
 { "id": number, "score": 0-100, "reason": "short reason" }
]
`;

  try {
    const response = await askAI(prompt);

    console.log("MATCHER RAW:", response);

    const parsed = extractJSONArray(response);

    return parsed;

  } catch (error) {
    console.error("Batch matcher error:", error.message);
    return [];
  }
};
