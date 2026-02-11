import JobCard from "./JobCard";

export default function BestMatches({ jobs }) {
  if (!jobs?.length) return null;

  return (
    <>
      <h2>🔥 Best Matches</h2>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
}
