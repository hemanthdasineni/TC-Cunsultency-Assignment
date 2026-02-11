import { useState, useEffect } from "react";
import ResumeUpload from "../Componets/ResumeUpload";
import ChatAssistant from "../Componets/ChatAssistant";
import BestMatches from "../Componets/BestMatches";
import JobCard from "../Componets/JobCard";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [appliedJob, setAppliedJob] = useState(null);

  // ⭐ Debug log (SAFE PLACE)
  console.log("DATA FROM AI:", data);

  useEffect(() => {

  const checkPopup = () => {
    const saved = localStorage.getItem("lastAppliedJob");

    if (saved) {
      const job = JSON.parse(saved);
      setAppliedJob(job);
      localStorage.removeItem("lastAppliedJob");
    }
  };

  // Run once on mount
  checkPopup();

  // ⭐ Detect when user switches back to this tab
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      checkPopup();
    }
  });

}, []);

  return (
    <div className="container">
      <h1>AI Job Tracker</h1>

      <ResumeUpload />
      <ChatAssistant onResult={setData} />

      {data?.bestMatches && <BestMatches jobs={data.bestMatches} />}

     {data?.jobs?.length > 0 && (

        <>
          <h2>All Jobs</h2>
          {data.jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={(job) => {
                localStorage.setItem("lastAppliedJob", JSON.stringify(job));
              }}
            />
          ))}
        </>
      )}

      {appliedJob && (
        <div className="popup">
          <p>
            Did you apply to <b>{appliedJob.title}</b>?
          </p>
          <button onClick={() => setAppliedJob(null)}>Yes</button>
          <button onClick={() => setAppliedJob(null)}>Not Yet</button>
        </div>
      )}
    </div>
  );
}
