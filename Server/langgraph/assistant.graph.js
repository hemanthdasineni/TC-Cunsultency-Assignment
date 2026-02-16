import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Safely extract JSON from AI response
 */
const extractJSON = (text) => {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found in AI response");
  }

  const jsonString = text.substring(firstBrace, lastBrace + 1);

  return JSON.parse(jsonString);
};
;

export const runAssistant = async (message) => {
  try {
    const prompt = `
You are a job assistant.

Respond ONLY in valid JSON.
Do NOT include explanations.
Do NOT include markdown.
Do NOT include extra text.

Return this exact format:

{
  "intent": "search | filter | help",
  "filters": {
    "remote": boolean,
    "fulltime": boolean,
    "highMatch": boolean
  },
  "reply": "string"
}

User message:
${message}
`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You respond ONLY with JSON." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0
      // ❌ removed response_format
    });

    const rawResponse = completion.choices[0].message.content;

    console.log("AI RAW RESPONSE:", rawResponse);

    const parsed = extractJSON(rawResponse);

    console.log("AI PARSED RESULT:", parsed);

    return parsed;

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);

    return {
      intent: "help",
      filters: {
        remote: false,
        fulltime: false,
        highMatch: false
      },
      reply: "Something went wrong. Please try again."
    };
  }
};
