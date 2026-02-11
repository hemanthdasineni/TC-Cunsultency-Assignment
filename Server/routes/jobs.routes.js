import { matchJobsWithResume } from "../langchain/matcher.js";
import { getResumeText } from "./resume.routes.js";
import { fetchExternalJobs } from "../services/jobs.service.js";

export default async function jobsRoutes(fastify) {
  fastify.get("/", async (request) => {
    const jobs = await fetchExternalJobs();
    const resumeText = getResumeText();

    const matches = await matchJobsWithResume(resumeText, jobs);

    const scoredJobs = jobs.map((job) => {
      const match = matches.find((m) => m.id === job.id) || {};
      return {
        ...job,
        matchScore: match.score || 0,
        reason: match.reason || "No match info",
      };
    });

    // 🔥 Sort by score
    const sortedJobs = scoredJobs.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    // 🔥 Best matches
    const bestMatches = sortedJobs.filter((job) => job.matchScore >= 70);

    // 🔥 Apply filters
    const { remote, highMatch } = request.query || {};
    let filteredJobs = sortedJobs;

    if (highMatch === "true") {
      filteredJobs = filteredJobs.filter((job) => job.matchScore >= 70);
    }

    if (remote === "true") {
      filteredJobs = filteredJobs.filter((job) =>
        job.description.toLowerCase().includes("remote")
      );
    }

    return {
      success: true,
      bestMatches,
      jobs: filteredJobs,
    };
  });
}
