import { fetchExternalJobs } from "../services/jobs.service.js";
import { matchJobsWithResume } from "../langchain/matcher.js";
import { getResumeText } from "../routes/resume.routes.js";

/*
  FINAL JOB PIPELINE
  - Fetch jobs
  - Match with resume
  - Apply filters
  - Return bestMatches + jobs
*/

export const runJobPipeline = async (filters = {}) => {
  try {
    // 🔥 Fetch external jobs
    const jobs = await fetchExternalJobs();

    // 🔥 Get resume text saved earlier
    const resumeText = getResumeText();

    // 🔥 Get AI match results
    const matches = await matchJobsWithResume(resumeText, jobs);

    // 🔥 Combine jobs with match scores
   const scoredJobs = jobs.map((job, index) => {
  const match = matches[index] || {};

  return {
    ...job,
    matchScore: match.score ?? 0,
    reason: match.reason ?? "No match info",
  };
});

      

    // 🔥 Sort by highest match
    const sortedJobs = scoredJobs.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    // =============================
    // APPLY FILTERS
    // =============================

    let filteredJobs = sortedJobs;
console.log("FILTERS RECIVED",filters);
    if (filters.highMatch) {
      filteredJobs = filteredJobs.filter(
        (job) => job.matchScore >= 50   // ⭐ lowered threshold for stability
      );
    }

    if (filters.remote) {
      filteredJobs = filteredJobs.filter((job) =>
        job.description?.toLowerCase().includes("remote")
      );
    }

    if (filters.fulltime) {
      filteredJobs = filteredJobs.filter((job) =>
        job.description?.toLowerCase().includes("full")
      );
    }

    // =============================
    // BEST MATCHES SECTION
    // =============================

    // ⭐ Always show top 3 jobs as best matches
// =============================
// BEST MATCHES SECTION
// =============================

let bestMatches = filteredJobs.filter(
  (job) => job.matchScore >= 60
);

if (bestMatches.length === 0) {
  bestMatches = filteredJobs.slice(0, 2);
}

return {
  bestMatches,
  jobs: filteredJobs
};
  } catch (error) {
    console.error("Job pipeline error:", error);

    return {
      bestMatches: [],
      jobs: [],
    };
  }
};
