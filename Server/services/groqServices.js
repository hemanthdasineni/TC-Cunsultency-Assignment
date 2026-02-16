import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Simple in-memory cache
const cache = new Map();

export const askAI = async (prompt) => {
  try {
    // ✅ Check cache first
    if (cache.has(prompt)) {
      console.log("⚡ Returning cached response");
      return cache.get(prompt);
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.1-8b-instant", // Best lightweight model
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    // Store in cache
    cache.set(prompt, reply);

    return reply;

  } catch (error) {
    console.error("🔥 GROQ ERROR:", error.message);
    throw error;
  }
};
