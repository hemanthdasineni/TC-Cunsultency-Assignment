/*
  Resume Routes
  For now we store resume in memory (simple version)
*/

let savedResume = "";

export default async function resumeRoutes(fastify) {
  // Upload or update resume
  fastify.post("/upload", async (request, reply) => {
    const { resumeText } = request.body;

    if (!resumeText) {
      return reply.status(400).send({
        error: "resumeText is required",
      });
    }

    savedResume = resumeText;

    return {
      success: true,
      message: "Resume saved successfully",
    };
  });

  // Get current resume
  fastify.get("/", async () => {
    return {
      resume: savedResume,
    };
  });
}

// Export helper to use resume in matcher later
export const getResumeText = () => savedResume;
