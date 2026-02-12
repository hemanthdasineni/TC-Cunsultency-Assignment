// import Fastify from "fastify";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.routes.js";
import jobsRoutes from "./routes/jobs.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import cors from "@fastify/cors";

dotenv.config();

const app = Fastify({
  logger: true,
});

// Start server function
const start = async () => {
  try {
    // 1. Register CORS (Awaiting ensures it's ready before routes)
    await app.register(cors, {
      origin: "*", // Allows your Vite frontend to connect from any URL
      methods: ["GET", "POST"]
    });

    // 2. Root test route
    app.get("/", async () => {
      return { message: "AI Job Tracker Backend Ready 🚀" };
    });

    // 3. Register AI and Job routes
    await app.register(aiRoutes, { prefix: "/api/ai" });
    await app.register(jobsRoutes, { prefix: "/api/jobs" });
    await app.register(resumeRoutes, { prefix: "/api/resume" });

    // 4. Start listening
    // Note: port uses uppercase PORT for Render compatibility
    const port = process.env.PORT || 10000;
    const address = await app.listen({ 
      port: port, 
      host: '0.0.0.0' 
    });

    console.log(`Server running on ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Execute the start function
start();