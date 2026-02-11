import { useState } from "react";
import { chatWithAI } from "../services/api";

export default function ChatAssistant({ onResult }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    const res = await chatWithAI(message);
    onResult(res);
    setMessage("");
    setLoading(false);
  };

  return (
    <div className="card ai-card">
      <h3>AI Assistant</h3>
      <input
        placeholder="Try: Show remote jobs with high match score"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
