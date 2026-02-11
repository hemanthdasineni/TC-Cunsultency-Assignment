const BASE_URL = "http://localhost:5000";

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
