// This tells your React app to talk to the cloud instead of your computer
const BASE_URL = "https://tc-cunsultency-assignment.onrender.com";

export const uploadResume = async (resumeText) => {
  const res = await fetch(`${BASE_URL}/api/resume/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText }),
  });
  return res.json();
};

export const chatWithAI = async (message) => {
  const res = await fetch(`${BASE_URL}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
};
