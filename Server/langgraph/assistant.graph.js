import { askGemini } from "../services/gemini.services.js";

export const assistantRouter = async (message) => {
  try {
    const prompt = `
You are an AI assistant inside a job tracker app.

User message:
"${message}"

Return ONLY JSON:

{
  "intent": "search | filter | help",
  "filters": {
    "remote": boolean,
    "fulltime": boolean,
    "highMatch": boolean
  },
  "reply": "short helpful message"
}
`;

    const response = await askGemini(prompt);

    // ⭐ SAFE JSON EXTRACTION
    const jsonMatch = response.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Assistant graph error:", error);

    return {
      intent: "help",
      filters: {},
      reply: "Sorry, I couldn't understand that.",
    };
  }
};
