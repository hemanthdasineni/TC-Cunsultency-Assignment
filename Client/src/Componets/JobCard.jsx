export default function JobCard({ job, onApply }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <p className="reason">{job.reason}</p>

      {/* ⭐ Match Score Bar */}
      <div className="match-wrapper">
        <div className="match-bar">
          <div
            className="match-fill"
            style={{ width: `${job.matchScore}%` }}
          ></div>
        </div>
        <span>{job.matchScore}% match</span>
      </div>

      {job.applyUrl && (
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onApply(job)}
        >
          <button className="apply-btn">Apply</button>
        </a>
      )}
    </div>
  );
}
