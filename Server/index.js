import Fastify from "fastify";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.routes.js"; // ✅ default import
import jobsRoutes from "./routes/jobs.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import cors from "@fastify/cors";



dotenv.config();

const app = Fastify({
  logger: true,
});

// Root test route
app.get("/", async () => {
  return { message: "AI Job Tracker Backend Ready 🚀" };
});
await app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
});


// Register AI routes
app.register(aiRoutes, { prefix: "/api/ai" });
app.register(jobsRoutes, { prefix: "/api/jobs" });
app.register(resumeRoutes, { prefix: "/api/resume" });



// Start server
const start = async () => {
  try {
    await app.listen({ port: process.env.port });
    console.log("Server running on http://localhost:5000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
