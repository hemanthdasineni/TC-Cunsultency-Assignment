import fetch from "node-fetch";

/*
  External Job Fetch Service
  (Adzuna-style public jobs API)
*/

export const fetchExternalJobs = async () => {
  try {
    // Example public jobs API (no auth)
    const response = await fetch(
      "https://remotive.com/api/remote-jobs"
    );

    const data = await response.json();

    // Normalize job data to our format
    return data.jobs.slice(0, 10).map((job, index) => ({
      id: index + 1,
      title: job.title,
     description: (job.description || job.job_description || "")
  .replace(/<[^>]*>/g, "")   // remove HTML tags
  .slice(0, 800),            // keep prompt small

      remote: true,
      fulltime: job.job_type?.toLowerCase().includes("full"),
       applyUrl: job.url || job.apply_url || job.job_url
    }));
  } catch (error) {
    console.error("❌ Job API Error:", error.message);
    return [];
  }
};
