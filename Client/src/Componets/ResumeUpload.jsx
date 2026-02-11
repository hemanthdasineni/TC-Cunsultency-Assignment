import { useState } from "react";
import { uploadResume } from "../services/api";

export default function ResumeUpload() {
  const [resume, setResume] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!resume.trim()) return;
    await uploadResume(resume);
    setStatus("✅ Resume uploaded successfully");
  };

  return (
    <div className="card">
      <h3>Upload Resume</h3>
      <textarea
        rows="5"
        placeholder="Paste your resume text here..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      {status && <p>{status}</p>}
    </div>
  );
}
