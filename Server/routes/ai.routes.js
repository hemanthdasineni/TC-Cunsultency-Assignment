import { assistantRouter } from "../langgraph/assistant.graph.js";
import { runJobPipeline } from "../services/jobPipeline.service.js";

export default async function aiRoutes(fastify) {

  fastify.post("/chat", async (request, reply) => {
    try {
      const { message } = request.body || {};

      if (!message) {
        return reply.send({ error: "Message is required" });
      }

      // 1️⃣ Ask AI
      const aiResult = await assistantRouter(message);

      console.log("AI RESULT:", aiResult);   // ⭐ Debug

      // 2️⃣ Run pipeline USING FILTERS
      const jobData = await runJobPipeline(aiResult.filters || {});

      // 3️⃣ Return combined result
      return reply.send({
        success: true,
        reply: aiResult.reply,
        ...jobData,
      });

    } catch (error) {
      console.error("AI route error:", error);

      return reply.status(500).send({
        success: false,
        error: "AI processing failed",
      });
    }
  });

}
